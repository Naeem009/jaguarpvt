# 00 — Project Overview & How To Use These Docs

## What this project is

`Jagur Pvt Limited` is a corporate website for a **vertically-integrated apparel manufacturer** — the same category as MAS Holdings, Crystal International, Interloop, and Artistic Milliners. It sells nothing directly to consumers. There is no cart, no checkout, no product listings with prices.

Its job is to do three things extremely well:

1. **Prove scale and capability** to sourcing directors and brand executives at global apparel/footwear brands (Nike, Lululemon, Levi's, Uniqlo, Patagonia-type buyers).
2. **Prove trustworthiness** — ethical manufacturing, sustainability data, certifications, compliance — to buyers whose own brands are under public scrutiny for supply chain practices.
3. **Prove modernity** — that this is a technology-forward manufacturer, not a legacy factory operator, largely through a set of genuinely useful AI features (not gimmicks).

This is a **B2B lead-generation and trust-building site**, not e-commerce.

## Reference sites and what to borrow from each

| Reference | What to study | What to borrow |
|---|---|---|
| **MAS Holdings** | Scale storytelling, design-innovation narrative, sustainability metrics presentation | Confident "design-to-delivery" positioning, sustainability data visualization |
| **Crystal International** | Global facility footprint, investor-grade credibility, ESG reporting | Facility map treatment, ESG report structure, stat-heavy proof sections |
| **Interloop** | Vertical integration story, category breadth (hosiery, apparel, denim, packaging) | Division/category architecture, manufacturing process explainers |
| **Artistic Milliners** | Denim innovation storytelling, craft + technology tone, strong photography | Innovation lab framing, tactile product/material photography direction |
| **Apple** | Restraint, whitespace, scroll-triggered storytelling, product photography as hero, one idea per screen | Editorial pacing, large type, cinematic imagery, minimal chrome |
| **Stripe** | Technical polish, gradient/mesh backgrounds, precise grid system, docs-quality clarity, subtle motion | Design system rigor, micro-interactions, developer-grade component polish applied to a non-dev product |

The site's visual identity should feel like **Apple's storytelling discipline + Stripe's technical polish, applied to an industrial/manufacturing subject matter** — not a typical "corporate factory" website with stock photos and clipart icons.

## Explicit non-goals

- No shopping cart, pricing pages, or SKU-level product catalog.
- No consumer marketing tone ("Shop now," "Add to bag", "Get A Quote").
- No fake urgency/scarcity patterns.
- AI features are **decision-support and trust-building tools for B2B buyers**, not chatbots for retail customer service.

## Tech stack (recommended default — see `05-TECHNICAL-SPEC-STACK.md`)

- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for motion
- Headless CMS (Sanity or Contentful) for Newsroom/Insights
- Vercel hosting
- Serverless API routes for AI features, calling the Claude API

## Document set (this folder)

| # | File | Purpose |
|---|---|---|
| 00 | `00-PROJECT-OVERVIEW.md` | This file — start here |
| 01 | `01-BRAND-DESIGN-SYSTEM.md` | Visual identity, tokens, typography, motion |
| 02 | `02-SITE-ARCHITECTURE.md` | Sitemap, navigation, URL structure |
| 03 | `03-CONTENT-STRATEGY-COPY.md` | Voice, messaging pillars, page copy outlines |
| 04 | `04-AI-FEATURES-SPEC.md` | The 6 AI features, functional specs |
| 05 | `05-TECHNICAL-SPEC-STACK.md` | Stack, folder structure, performance/a11y targets |
| 06 | `06-COMPONENT-LIBRARY-SPEC.md` | Reusable component specs |
| 07 | `07-PAGE-BY-PAGE-CURSOR-PROMPTS.md` | Ready-to-paste Cursor prompts per page |
| 08 | `08-SEO-PERFORMANCE-ACCESSIBILITY.md` | SEO, Core Web Vitals, WCAG checklist |
| 09 | `09-IMPLEMENTATION-ROADMAP.md` | Build order, phases, milestones |

## How to use this in Cursor

1. Create a `/docs` folder at the root of your repo and drop all 10 files in.
2. In Cursor, open **Settings → Rules for AI** (or create a `.cursorrules` file at the repo root) and paste this:

   ```
   Before generating any code for this project, read /docs/00-PROJECT-OVERVIEW.md,
   /docs/01-BRAND-DESIGN-SYSTEM.md, and /docs/06-COMPONENT-LIBRARY-SPEC.md.
   This is a B2B apparel manufacturer website — never add e-commerce patterns
   (cart, checkout, pricing, "buy now"). Follow the design system tokens exactly.
   Match the voice defined in /docs/03-CONTENT-STRATEGY-COPY.md.
   ```

3. Build in the order laid out in `09-IMPLEMENTATION-ROADMAP.md` — design system and shared components first, pages second, AI features last.
4. For each page, open `07-PAGE-BY-PAGE-CURSOR-PROMPTS.md`, copy the relevant prompt block into Cursor's chat/composer, and let it reference the other docs by path (Cursor can `@`-mention files in `/docs`).
5. Replace every `Jagur Pvt Limited`, and bracketed placeholder before publishing — these docs are deliberately generic so you can drop in your real brand.
