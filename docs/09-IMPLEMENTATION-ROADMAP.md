# 09 — Implementation Roadmap

## Phase 0 — Foundations (½–1 day)

- Run the "Global setup prompt" from `07-PAGE-BY-PAGE-CURSOR-PROMPTS.md`.
- Confirm design tokens render correctly (build a temporary `/dev/style-guide` page showing all colors, type scale, buttons, cards — delete before launch or keep behind a flag).
- Set up environment variables, CMS project (even if empty), and Vercel project linked to the repo.

## Phase 1 — Design system & shared shell (1–2 days)

- Build all primitives from `06-COMPONENT-LIBRARY-SPEC.md`.
- Build `Navbar`, `Footer`, `Hero`, `StatBar`, `CapabilityGrid`, `CTASection`, `TimelineSection`.
- Mount `Navbar`/`Footer` in the marketing layout so every subsequent page automatically has the shell.

## Phase 2 — Core content pages (3–5 days)

Build in this order (matches priority list in `02-SITE-ARCHITECTURE.md`):
1. Home (placeholder copy/data is fine at this stage)
2. Capabilities hub + Wovens/Knits/Denim
3. Sustainability hub
4. Global Footprint (static map first, interactivity in Phase 4)
5. Partner With Us (form functional, webhook can be stubbed)
6. About / Company
7. Certifications
8. Newsroom (mock CMS data acceptable initially)
9. Careers

**Checkpoint**: at the end of this phase, the site should be fully navigable and coherent with zero AI features — this is your fallback if AI work runs long.

## Phase 3 — Real content (parallel with Phase 2, ongoing)

- Replace placeholder copy per `03-CONTENT-STRATEGY-COPY.md` outlines with real company facts, figures, and approved photography.
- Populate `facilities.json` (or CMS facility model) with real facility data.
- Finalize real color/typography values in `01-BRAND-DESIGN-SYSTEM.md` if not already locked.

## Phase 4 — AI features (3–5 days)

Build in this order (simplest/lowest-risk first):
1. `SustainabilityEstimator` (client-side calc, no LLM dependency for numbers) — lowest risk, ship first.
2. `/api/ai/assistant` + `AIChatWidget` — start with a local JSON knowledge base for retrieval; upgrade to a real vector store once content is finalized.
3. `CapabilityMatcher` + `/api/ai/matcher` — wire the "send to Partner form" hand-off.
4. `CommandSearch` + `/api/ai/search`.
5. `FacilityMap` natural-language filter (reuses the search infrastructure from step 4).
6. Innovation Digest editorial workflow (internal tool, not user-facing — lowest priority, can slip past launch).

## Phase 5 — Polish, performance, accessibility (2–3 days)

- Work through the full checklist in `08-SEO-PERFORMANCE-ACCESSIBILITY.md`.
- Cross-browser and mobile QA pass.
- Load-test the AI API routes and set sane rate limits.
- Remove any dev-only pages (style guide, etc.) or gate them behind auth.

## Phase 6 — Launch

- Final content review — confirm no `[COMPANY NAME]`/placeholder text remains outside intentional TODOs.
- Verify all environment variables are set in the Vercel production environment.
- Submit sitemap to Google Search Console.
- Monitor AI API costs and error rates for the first week; have the non-AI fallback (per `04-AI-FEATURES-SPEC.md`) verified working in case the AI backend needs to be temporarily disabled.

## Suggested milestones

| Milestone | Target |
|---|---|
| Design system + shell complete | End of Week 1 |
| All core content pages live (staging) | End of Week 2 |
| AI features functional (staging) | End of Week 3 |
| Full QA pass complete | Mid Week 4 |
| Production launch | End of Week 4 |

Adjust timeline based on team size — this assumes 1–2 developers working with Cursor as an accelerant, not a full team.
