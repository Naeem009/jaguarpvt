# 04 — AI Features Specification

All AI features are **B2B decision-support tools for sourcing/brand professionals**, not consumer chat gimmicks. Each should feel like it belongs on Stripe (precise, useful, slightly technical) rather than on a retail site. Where a feature would need live ERP/production data that doesn't exist yet, build it against clearly-labeled **representative/demo data** rather than faking real-time claims — this is a trust site; never misrepresent data as live if it isn't.

---

## 1. AI Sourcing & Capability Assistant (chat widget)

**Location**: persistent widget (bottom-right), plus embedded full-width demo on `/innovation/ai` and homepage teaser.

**Purpose**: Let a sourcing manager ask natural-language questions ("Can you produce organic cotton knit t-shirts at 200,000 units/month with GOTS certification?") and get an accurate, grounded answer plus a next-step CTA.

**Functional spec**:
- RAG (retrieval-augmented generation) over a curated knowledge base: capability pages, certifications, facility data, FAQ content — all content that already lives on the site plus an internal-only knowledge doc.
- Backend: serverless API route → Claude API with the retrieved context injected into the system prompt. Do not let the model answer from general knowledge about the company; ground every answer in retrieved content, and have it say "I don't have that information — let's connect you with our team" when the knowledge base doesn't cover it.
- UI: streaming text response, source citations shown as small chips under the answer ("Source: Wovens Capability Page"), a persistent "Talk to a human" button, and a suggested-next-question chip row.
- Guardrails: system prompt should explicitly refuse to quote prices/MOQs it isn't certain of, refuse to make commitments on the company's behalf, and always offer the `/partner` form as the next step for anything requiring a real quote.

**Data note to display**: small caption — "Answers are generated from our published capability data and may not reflect real-time capacity."

---

## 2. AI Capability Matcher (interactive tool)

**Location**: `/innovation/ai`, linked from homepage and Capabilities hub.

**Purpose**: A short guided form → AI-generated match summary, replacing "browse and guess" with a structured recommendation.

**Functional spec**:
- Multi-step form: product category → estimated monthly volume → key materials → sustainability requirements (organic/recycled/certifications needed) → target region for delivery.
- On submit, call the AI model with these structured inputs plus the capability knowledge base, and generate a short narrative match: which category/division fits, which certifications are relevant, an honest caveat about lead times varying by season.
- Output includes a CTA: "Send this match summary to our team" which pre-fills the `/partner` form with the tool's inputs — this is the single highest-value AI feature for lead quality, since it produces a semi-qualified lead automatically.
- Keep it to 4–5 steps max; each step one question (Apple-style, one idea per screen).

---

## 3. Sustainability Impact Estimator

**Location**: `/sustainability` and `/innovation/ai`.

**Purpose**: Let a buyer estimate the environmental profile of an order at their scale, reinforcing the sustainability messaging pillar with something interactive rather than static.

**Functional spec**:
- Inputs: product category, order volume, material choice (conventional vs. certified organic/recycled).
- Output: comparative estimate (e.g., water use, estimated CO2e) framed explicitly as **modeled/representative figures based on published industry and internal benchmark data**, not a guarantee — include a visible disclaimer and a link to the full ESG methodology/report.
- Visual: simple animated bar/number comparison (conventional vs. this company's process), count-up animation on scroll/submit.
- Can be a lightweight client-side calculation (no LLM call needed) using a documented formula/lookup table — cheaper and more defensible than having an LLM "estimate" numbers. Reserve LLM calls for the narrative explanation text around the numbers, not the numbers themselves.

---

## 4. Global Footprint Intelligence (map + AI narrative)

**Location**: `/global-footprint`.

**Purpose**: Turn a static facility map into something that answers "where would my order actually be made, and why."

**Functional spec**:
- Interactive dark-mode world map (see `06-COMPONENT-LIBRARY-SPEC.md` for the `FacilityMap` component) with facility markers; clicking a marker shows a card (location, capabilities, certifications, headcount, established year).
- Optional AI layer: a small natural-language filter box above the map — "Show me GOTS-certified knit facilities in South Asia" — filters the map pins via the same RAG assistant from Feature 1, applied to structured facility data instead of free text.
- This should be clearly a filter/search convenience, not a promise of real-time capacity data.

---

## 5. AI-Curated Innovation & Trends Digest

**Location**: `/newsroom` sidebar, and a dedicated `/innovation/material-lab` section.

**Purpose**: Position the company as forward-looking by surfacing a regularly-updated, AI-assisted summary of textile innovation and industry trends relevant to buyers — genuinely useful content, not filler.

**Functional spec**:
- Editorial workflow: a human editor curates source material (industry reports, internal R&D notes); an AI drafting step (Claude API, run as an internal/admin tool, not user-facing) helps produce first-draft summaries which are always human-reviewed before publishing via the CMS.
- On the live site this appears as ordinary curated content — do not expose "AI-generated" labeling to visitors for edited editorial content; the AI is a drafting aid, not a live user-facing feature, so it belongs in this spec for completeness but not in the AI feature grid on `/innovation/ai`.

---

## 6. Smart Site Search

**Location**: global nav search icon → command-palette style overlay (Stripe/Linear-style `Cmd+K`).

**Purpose**: Let time-poor sourcing professionals find the exact page/fact they need instantly instead of navigating the sitemap.

**Functional spec**:
- Natural-language query → semantic search over site content (same vector index as Feature 1) → ranked results with page title, snippet, and jump link; falls back to keyword match for exact terms (certification names, facility names).
- Keyboard-first UX: `Cmd/Ctrl+K` opens overlay from anywhere on the site, arrow keys to navigate results, `Enter` to go.
- This is the one AI feature that should feel invisible/instant rather than conversational — no chat bubble UI, just fast search.

---

## Feature grid for `/innovation/ai` (summary for the page itself)

| Feature | One-line value prop | Try-it CTA |
|---|---|---|
| AI Sourcing Assistant | "Ask what we can build for you" | Inline chat demo |
| Capability Matcher | "Get matched to the right production line in under a minute" | Start matcher |
| Sustainability Estimator | "See the environmental profile of your order before you place it" | Run estimate |
| Global Footprint Intelligence | "Search our facilities in plain language" | Explore map |
| Innovation Digest | "What's next in textile innovation" | Read latest |
| Smart Search | "Find anything on this site in seconds" | Press ⌘K |

## Implementation notes (also see `05-TECHNICAL-SPEC-STACK.md`)

- All LLM calls go through a serverless API route — never expose an API key client-side.
- Rate-limit the chat and matcher endpoints per IP/session to control cost and prevent abuse.
- Log queries (without PII) to improve the knowledge base over time; disclose this in the privacy policy.
- Every AI output that references facts about the company must be grounded in retrieved content (RAG), never freely generated — this is a credibility site, hallucinated capability claims are a real reputational risk.
- Provide a graceful non-AI fallback (static FAQ / contact form) if the AI backend is down.
