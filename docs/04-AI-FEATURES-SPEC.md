# 04 — AI Features Specification

All AI features are **B2B decision-support tools for sourcing/brand professionals**, not consumer chat gimmicks. Each should feel like it belongs on Stripe (precise, useful, slightly technical) rather than on a retail site. Where a feature would need live ERP/production data that doesn't exist yet, build it against clearly-labeled **representative/demo data** rather than faking real-time claims — this is a trust site; never misrepresent data as live if it isn't.

## Multilingual behavior (applies to every AI feature below)

Supported languages (default set — adjust freely, this is just adding/removing a translation file, see `05-TECHNICAL-SPEC-STACK.md`): **English (default), Arabic, Chinese (Simplified), Spanish, French, German**. Arabic is RTL and needs to be treated as such everywhere, not just in static UI — including inside the chat panel and matcher form.

- **Response language defaults to the visitor's current site locale** (i.e. if they're browsing `/ar/products`, the chat widget opens already replying in Arabic) but every AI component also carries its own small language selector, since a buyer might browse the site in English but prefer to chat in French — site locale and AI response language are related but independently overridable.
- **Source content stays in one canonical language (English) in the knowledge base and vector store.** Do not maintain separate per-language RAG indexes — that multiplies content-maintenance work and risks the translated indexes drifting out of sync with the real English source of truth. Instead: retrieve in English, then have the model translate its grounded answer into the target response language as the final generation step. This keeps "one source of truth" intact while still serving every language.
- **Never translate**: certification names/acronyms (GOTS, OEKO-TEX, WRAP, etc.), numbers, units, facility names, and proper nouns. The system prompt for every AI feature should explicitly instruct the model to preserve these verbatim regardless of response language — a mistranslated certification name is a credibility problem, not a cosmetic one.
- **Embeddings**: use a multilingual embedding model (e.g. `voyage-multilingual-2` or OpenAI `text-embedding-3-large`, both handle cross-lingual retrieval well) so a query typed in Arabic or Chinese still retrieves the right English source passages. Don't assume English-only embeddings will work once non-English queries start arriving.
- **Disclose language limitations honestly**: if the model's confidence in a less-common target language is lower, or if a query is ambiguous because of translation, it should say so rather than guessing — same "ground everything, admit what you don't know" principle as the rest of this spec, just applied across languages too.
- **Language switch itself is a UI concern, not an AI one** — see the new `LanguageSwitcher` component in `06-COMPONENT-LIBRARY-SPEC.md` and the i18n routing setup in `05-TECHNICAL-SPEC-STACK.md`.

---

## 1. AI Sourcing & Capability Assistant (chat widget)

**Location**: persistent widget (bottom-right) on every page, plus an embedded full-width demo on the Home page and on the Products hub.

**Purpose**: Let a sourcing manager ask natural-language questions ("Can you produce organic cotton knit t-shirts at 200,000 units/month with GOTS certification?") and get an accurate, grounded answer plus a next-step CTA.

**Functional spec**:
- RAG (retrieval-augmented generation) over a curated knowledge base: Products pages, certifications, facility data, the 15-department process/capacity breakdown (`departments.json`, see `05-TECHNICAL-SPEC-STACK.md`), FAQ content — all content that already lives on the site plus an internal-only knowledge doc.
- Backend: serverless API route → Claude API with the retrieved context injected into the system prompt. Do not let the model answer from general knowledge about the company; ground every answer in retrieved content, and have it say "I don't have that information — let's connect you with our team" when the knowledge base doesn't cover it.
- UI: streaming text response, source citations shown as small chips under the answer ("Source: Wovens Product Page"), a persistent "Talk to a human" button, and a suggested-next-question chip row.
- Guardrails: system prompt should explicitly refuse to quote prices/MOQs it isn't certain of, refuse to make commitments on the company's behalf, and always offer the `/contact` form as the next step for anything requiring a real quote.
- **Language**: pass the target response language into the system prompt on every call (from site locale by default, or the widget's own language selector if overridden). Source citations ("Source: Wovens Product Page") stay as links to the localized page URL when a translated version of that page exists, falling back to the English page with a small "(English)" note if it doesn't.

**Data note to display**: small caption — "Answers are generated from our published capability data and may not reflect real-time capacity."

---

## 2. AI Capability Matcher (interactive tool)

**Location**: `/products` hub page, linked from Home.

**Purpose**: A short guided form → AI-generated match summary, replacing "browse and guess" with a structured recommendation.

**Functional spec**:
- Multi-step form: product category (wovens/knits/baby wear) → estimated monthly volume → key materials → sustainability requirements (organic/recycled/certifications needed) → target region for delivery.
- On submit, call the AI model with these structured inputs plus the Products knowledge base, and generate a short narrative match: which category fits, which certifications are relevant, an honest caveat about lead times varying by season.
- Output includes a CTA: "Send this match summary to our team" which pre-fills the `/contact` form with the tool's inputs — this is the single highest-value AI feature for lead quality, since it produces a semi-qualified lead automatically.
- Keep it to 4–5 steps max; each step one question (Apple-style, one idea per screen).
- **Language**: the entire multi-step form (labels, options, the generated narrative match) renders in the visitor's current site locale. The match summary handed off to `/contact` should be generated in that same language, but the underlying structured data sent to the CRM (category, volume, certifications) stays as language-neutral codes/enums, not translated free text — the sales team's CRM shouldn't end up with six different spellings of "wovens" across languages.

---

## 3. Sustainability Impact Estimator

**Location**: `/our-impact`.

**Purpose**: Let a buyer estimate the environmental profile of an order at their scale, reinforcing the sustainability messaging pillar with something interactive rather than static.

**Functional spec**:
- Inputs: product category, order volume, material choice (conventional vs. certified organic/recycled).
- Output: comparative estimate (e.g., water use, estimated CO2e) framed explicitly as **modeled/representative figures based on published industry and internal benchmark data**, not a guarantee — include a visible disclaimer and a link to the full ESG methodology/report.
- Visual: simple animated bar/number comparison (conventional vs. this company's process), count-up animation on scroll/submit.
- Can be a lightweight client-side calculation (no LLM call needed) using a documented formula/lookup table — cheaper and more defensible than having an LLM "estimate" numbers. Reserve LLM calls for the narrative explanation text around the numbers, not the numbers themselves.
- **Language**: the calculation and its labels/units are locale-independent (numbers don't need translation, just locale-appropriate number formatting — e.g. decimal vs. comma separators). Only the LLM-generated narrative sentence needs the response-language treatment described above.

---

## 4. Facility Intelligence (map + AI narrative)

**Location**: `/facility`.

**Purpose**: Turn a static facility map into something that answers "where would my order actually be made, and why."

**Functional spec**:
- Interactive dark-mode world map (see `06-COMPONENT-LIBRARY-SPEC.md` for the `FacilityMap` component) with facility markers; clicking a marker shows a card (location, capabilities, certifications, headcount, established year).
- Optional AI layer: a small natural-language filter box above the map — "Show me GOTS-certified knit facilities in South Asia" — filters the map pins via the same RAG assistant from Feature 1, applied to structured facility data instead of free text.
- This should be clearly a filter/search convenience, not a promise of real-time capacity data.
- **Process & Capabilities grounding**: `departments.json` (the 15-department production process breakdown — see `05-TECHNICAL-SPEC-STACK.md`) is part of this feature's RAG knowledge base, alongside facility location data. This lets both the map filter and the global Sourcing Assistant (Feature 1) answer capacity/process questions accurately — e.g. "Do you have in-house embroidery?" or "What's your metal detection capacity?" — grounded in the real `departments.json` figures rather than guessed. Same rule as everywhere else in this doc: if a capacity field is still a `[X]` placeholder, the assistant should say it doesn't have that figure yet rather than inventing a number.
- **Language**: the natural-language filter box accepts queries in any supported language (multilingual embeddings per the section above); facility card content (location, capability names) and department names/descriptions render from localized data where available, falling back to English fields.

---

## 5. AI-Curated Innovation & Trends Digest (deferred — not v1)

**Location**: none in the current 7-item nav. This feature depended on a Newsroom/Insights section and a dedicated Material Lab page, neither of which are part of the v1 IA per `02-SITE-ARCHITECTURE.md`. Keep this spec for a later phase if/when a Newsroom is added back; do not build it against the current sitemap.

**Purpose**: Position the company as forward-looking by surfacing a regularly-updated, AI-assisted summary of textile innovation and industry trends relevant to buyers — genuinely useful content, not filler.

**Functional spec** (for future reference):
- Editorial workflow: a human editor curates source material (industry reports, internal R&D notes); an AI drafting step (Claude API, run as an internal/admin tool, not user-facing) helps produce first-draft summaries which are always human-reviewed before publishing via the CMS.
- On the live site this would appear as ordinary curated content — do not expose "AI-generated" labeling to visitors for edited editorial content; the AI is a drafting aid, not a live user-facing feature.

---

## 6. Smart Site Search

**Location**: global nav search icon → command-palette style overlay (Stripe/Linear-style `Cmd+K`).

**Purpose**: Let time-poor sourcing professionals find the exact page/fact they need instantly instead of navigating the sitemap.

**Functional spec**:
- Natural-language query → semantic search over site content (same vector index as Feature 1) → ranked results with page title, snippet, and jump link; falls back to keyword match for exact terms (certification names, facility names).
- Keyboard-first UX: `Cmd/Ctrl+K` opens overlay from anywhere on the site, arrow keys to navigate results, `Enter` to go.
- This is the one AI feature that should feel invisible/instant rather than conversational — no chat bubble UI, just fast search.
- **Language**: accepts queries in any supported language against the single English-source index (multilingual embeddings), and returns results linking to the localized version of each page when one exists. The overlay's own UI chrome (placeholder text, "no results" message) is translated via the standard UI string files, not the AI layer.

---

## Feature summary and where each one now lives

Since there's no dedicated "Innovation & AI" page in this IA, use this table to keep track of where each feature is actually embedded:

| Feature | One-line value prop | Lives on | Language behavior |
|---|---|---|---|
| AI Sourcing Assistant | "Ask what we can build for you" | Global widget (every page) + embedded demo on Home | Responds in site locale, overridable in-widget |
| Capability Matcher | "Get matched to the right product line in under a minute" | `/products` | Form + narrative match localized; structured data stays language-neutral |
| Sustainability Estimator | "See the environmental profile of your order before you place it" | `/our-impact` | Numbers locale-formatted; narrative sentence localized |
| Facility Intelligence | "Search our facilities in plain language" | `/facility` | Multilingual query input, localized facility cards |
| Innovation Digest | *(deferred, not v1)* | — | — |
| Smart Search | "Find anything on this site in seconds" | Global, `Cmd/Ctrl+K` from any page | Multilingual query input, links to localized pages |

## Implementation notes (also see `05-TECHNICAL-SPEC-STACK.md`)

- All LLM calls go through a serverless API route — never expose an API key client-side.
- Rate-limit the chat and matcher endpoints per IP/session to control cost and prevent abuse.
- Log queries (without PII) to improve the knowledge base over time; disclose this in the privacy policy.
- Every AI output that references facts about the company must be grounded in retrieved content (RAG), never freely generated — this is a credibility site, hallucinated capability claims are a real reputational risk.
- Provide a graceful non-AI fallback (static FAQ / contact form) if the AI backend is down.
- Pass the target response language explicitly in every API call's request body (`{ query, history, locale }`) — never infer it solely from browser headers server-side, since the visitor's own in-widget language choice should always win over `Accept-Language` guesses.
- Test each feature's guardrails (certification names, numbers, proper nouns staying untranslated) in at least Arabic and Chinese during QA, not just the Romance/Germanic languages — RTL and non-Latin scripts are where translation bugs most commonly hide.
