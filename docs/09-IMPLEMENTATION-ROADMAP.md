# 09 — Implementation Roadmap

## Phase 0 — Foundations (½–1 day)

- Run the "Global setup prompt" from `07-PAGE-BY-PAGE-CURSOR-PROMPTS.md` — this now includes the `next-intl` locale routing setup, so the `/app/[locale]/` structure exists from day one rather than being retrofitted later (retrofitting locale routing onto an already-built page tree is significantly more painful than starting with it).
- Confirm design tokens render correctly (build a temporary `/dev/style-guide` page showing all colors, type scale, buttons, cards — delete before launch or keep behind a flag).
- Set up environment variables, CMS project (even if empty), and Vercel project linked to the repo.
- Decide on final locale list (default assumption: English + Arabic + Chinese + Spanish + French + German — see `04-AI-FEATURES-SPEC.md`) before Phase 2 starts; adding a locale later is cheap, but confirming the list now avoids restructuring the `/messages` folder mid-build.

## Phase 1 — Design system & shared shell (1–2 days)

- Build all primitives from `06-COMPONENT-LIBRARY-SPEC.md`.
- Build `Navbar`, `Footer`, `Hero`, `StatBar`, `ProductGrid`, `CTASection`, `TimelineSection`.
- Mount `Navbar`/`Footer` in the marketing layout so every subsequent page automatically has the shell.

## Phase 2 — Core content pages (3–5 days)

Build in this order (matches priority list in `02-SITE-ARCHITECTURE.md`):
1. Home (placeholder copy/data is fine at this stage)
2. Products hub + Wovens/Knits/**Baby Wear (with catalogue embed section, placeholder state until the PDF is uploaded)**
3. Our Impact hub + Environment/People/Governance & Certifications
4. Facility (static map first, interactivity in Phase 4) — **including the "Process & Capabilities" section (15 departments across 5 categories) with placeholder capacities and department photo placeholders; real capacity figures and photos come in Phase 3 below**
5. Contact (form functional, webhook can be stubbed)
6. About
7. Careers

**Checkpoint**: at the end of this phase, the site should be fully navigable and coherent with zero AI features — this is your fallback if AI work runs long.

## Phase 3 — Real content (parallel with Phase 2, ongoing)

- Replace placeholder copy per `03-CONTENT-STRATEGY-COPY.md` outlines with real company facts, figures, and approved photography.
- Upload the real Baby Wear e-catalogue PDF to `/public/catalogues/baby-wear-catalogue.pdf` — the `CatalogueEmbed` component built in Phase 2 should pick it up with no code changes once it's in place.
- Populate `facilities.json` (or CMS facility model) with real facility data.
- Populate `departments.json` with real capacity figures (replacing every `[X]` placeholder) and drop real photos into each `/public/images/facility/departments/<slug>/photo.jpg` — the `DepartmentCard` components built in Phase 2 pick these up automatically.
- Finalize real color/typography values in `01-BRAND-DESIGN-SYSTEM.md` if not already locked.

## Phase 4 — AI features (3–5 days)

Build in this order (simplest/lowest-risk first):
1. `SustainabilityEstimator` (client-side calc, no LLM dependency for numbers) — lowest risk, ship first, lives on Our Impact.
2. `/api/ai/assistant` + `AIChatWidget` — start with a local JSON knowledge base for retrieval; upgrade to a real vector store once content is finalized.
3. `CapabilityMatcher` + `/api/ai/matcher` — lives on Products, wire the "send to Contact form" hand-off.
4. `CommandSearch` + `/api/ai/search`.
5. `FacilityMap` natural-language filter (reuses the search infrastructure from step 4).

## Phase 4.5 — Multilingual & localization (2–3 days)

Run the "Multilingual: LanguageSwitcher, RTL, and localized AI" prompt from `07-PAGE-BY-PAGE-CURSOR-PROMPTS.md`:
1. Build `LanguageSwitcher` and wire it into the Navbar and Footer.
2. Audit and fix RTL rendering (Arabic) on Navbar, mega-menus, `FacilityMap`, and `AIChatWidget`.
3. Add locale handling to all three AI API routes and the `AIChatWidget`'s in-panel language selector.
4. Sweep every page built so far for hardcoded UI strings and move them into `next-intl` message files.
5. Get real translations in place for `/messages/{locale}.json` (English content can ship first; the other five files can go live as translations are completed, since the fallback-to-English pattern means nothing breaks in the meantime).

**Checkpoint**: at the end of this phase, switching languages via the nav should correctly translate UI chrome, mirror layout in Arabic, and produce AI responses in the selected language — this is the point to do a full manual pass in at least English + Arabic before moving on.

## Phase 5 — Polish, performance, accessibility (2–3 days)

- Work through the full checklist in `08-SEO-PERFORMANCE-ACCESSIBILITY.md`, including the multilingual SEO checklist (hreflang tags, localized sitemap).
- Cross-browser and mobile QA pass — include at least one RTL locale in this pass.
- Load-test the AI API routes and set sane rate limits.
- Remove any dev-only pages (style guide, etc.) or gate them behind auth.

## Phase 6 — Launch

- Final content review — confirm no `[COMPANY NAME]`/placeholder text remains outside intentional TODOs, and confirm which locales are launching with full translations vs. English-fallback (it's fine to launch with some locales still on fallback text, but know which ones and communicate that to stakeholders).
- Verify all environment variables are set in the Vercel production environment.
- Submit sitemap to Google Search Console, and verify `hreflang` tags via the International Targeting report once locales are live.
- Monitor AI API costs and error rates for the first week; have the non-AI fallback (per `04-AI-FEATURES-SPEC.md`) verified working in case the AI backend needs to be temporarily disabled.

## Suggested milestones

| Milestone | Target |
|---|---|
| Design system + shell complete | End of Week 1 |
| All core content pages live (staging) | End of Week 2 |
| AI features functional (staging) | End of Week 3 |
| Multilingual (LanguageSwitcher, RTL, localized AI) functional (staging) | Mid Week 4 |
| Full QA pass complete | End of Week 4 |
| Production launch | Start of Week 5 |

Adjust timeline based on team size — this assumes 1–2 developers working with Cursor as an accelerant, not a full team. Translation turnaround for the five non-English locales is the one task on this timeline that isn't developer-bound — start sourcing translations (professional service or in-house bilingual review, not machine translation alone for anything customer-facing and credibility-sensitive) as early as Phase 2, in parallel with page-building, so they're ready by Phase 4.5.
