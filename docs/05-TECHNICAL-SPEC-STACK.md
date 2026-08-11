# 05 — Technical Specification & Stack

## Core stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSG/ISR for content pages, API routes for AI features, great image optimization |
| Language | TypeScript | Type safety across CMS content, form data, AI response shapes |
| i18n | `next-intl` | Locale-prefixed routing (`/en`, `/ar`, ...), server + client translation, plays well with App Router and RSC; handles RTL-aware formatting utilities out of the box |
| Styling | Tailwind CSS + CSS variables for design tokens from `01-BRAND-DESIGN-SYSTEM.md` | Matches the token-based system directly; use CSS logical properties (`ms-`/`me-`/`ps-`/`pe-` in Tailwind, not `ml-`/`mr-`) throughout so RTL locales don't need a separate stylesheet |
| Motion | Framer Motion | Scroll-triggered reveals, count-ups, chat streaming UI |
| CMS | Sanity (recommended) or Contentful | Structured facility data for the map, structured product data for the AI knowledge base, with field-level localization enabled (Sanity's `@sanity/document-internationalization` or Contentful's native locale fields) (Newsroom is deferred, not v1 — see `02-SITE-ARCHITECTURE.md`) |
| Hosting | Vercel | Native Next.js support, edge functions for AI routes |
| AI | Claude API (Anthropic) via serverless routes | Chat assistant, capability matcher narrative — target response language passed explicitly in every request, see `04-AI-FEATURES-SPEC.md` |
| Vector store | Pinecone, Weaviate, or Vercel-native (e.g. `@vercel/postgres` + `pgvector`) | RAG index over Products/Our Impact/Facility content, built with a multilingual embedding model (see below) so non-English queries retrieve correctly against the single English-source index |
| Maps | Mapbox GL JS (custom dark style) or a hand-built SVG world map for full design control | `01`'s "stylized dark map" direction — avoid default Google Maps chrome |
| Forms | React Hook Form + Zod validation, submit to serverless route → CRM webhook (HubSpot/Salesforce) or email | `/contact` conversion form, localized labels/validation messages via `next-intl` |
| Analytics | Plausible or Fathom (privacy-first) or GA4 | B2B buyers are wary of heavy tracking; privacy-first fits the trust positioning |

## Repo structure (suggested)

```
/app
  /[locale]
    /(marketing)
      /page.tsx                        → Home
      /about/page.tsx
      /products/
        /page.tsx                      → Products hub
        /wovens/page.tsx
        /knits/page.tsx
        /baby-wear/page.tsx            → includes CatalogueEmbed section
      /our-impact/
        /page.tsx                      → hub
        /environment/page.tsx
        /people/page.tsx
        /governance/page.tsx           → includes CertificationGrid
      /facility/page.tsx
      /careers/page.tsx
      /contact/page.tsx
  /api
    /ai/
      /assistant/route.ts            → Feature 1
      /matcher/route.ts              → Feature 2
      /search/route.ts               → Feature 6
    /contact-form/route.ts
  middleware.ts                        → next-intl locale detection/redirect (runs before every route)
/messages
  en.json                              → all UI strings for English
  ar.json
  zh.json
  es.json
  fr.json
  de.json
/i18n.ts                               → next-intl config: locale list, default locale, routing config
/components
  /ui                                → buttons, cards, inputs (design-system primitives)
  /sections                          → Hero, StatBar, FacilityMap, ProductGrid, CatalogueEmbed, AIChatWidget, etc.
/lib
  /cms.ts                            → CMS client + typed content fetchers
  /ai.ts                             → Claude API client wrapper, RAG retrieval helper
  /analytics.ts
/docs                                → this doc set
/public
  /images
    /home                            → hero.jpg/mp4, stat-bar-bg, facility-teaser, trust-strip logos
    /about                           → hero, mission-block, history process shots, leadership headshots (if used)
    /products
      /wovens                        → hero, process-step-1..n, texture macro shots
      /knits                         → hero, process-step-1..n, texture macro shots
      /baby-wear                     → hero, process-step-1..n, texture macro shots
    /our-impact
      /environment                   → hero, solar/water-treatment photos
      /people                        → hero, community/worker program photos
      /governance                    → hero (certification logos live in /public/certifications, not here)
    /facility
      hero.jpg, map background asset (if not code-generated), facility thumbnails
      /departments
        /yarn-warehouse                → representative photo(s)
        /knitting
        /dyeing
        /dyeing-lab
        /screen-printing
        /embroidery
        /cutting
        /stitching
        /garment-dyeing
        /garment-washing
        /finishing
        /quality-control
        /metal-detection
        /audits
        /packing
    /careers                         → hero, culture photos
    /contact                         → hero (optional, page is form-first)
  /catalogues
    baby-wear-catalogue.pdf          → the uploaded Baby Wear e-catalogue (see note below)
  /certifications                    → certification logos (svg/png, transparent bg)
  /logos                             → company logo (svg, light + dark variants), favicon source
  /icons                             → any custom SVG icons not covered by lucide-react
  favicon.ico
  robots.txt                         → if not generated at build time
```

**Image sourcing convention**: every page-level folder above should contain a `hero.*` file at minimum. Name files descriptively and consistently (`hero.jpg`, `process-01.jpg`, `process-02.jpg`, not `IMG_4821.jpg`) so Cursor-generated code can reference predictable paths like `/images/products/wovens/hero.jpg`. Until real photography is available, use clearly-named placeholder files (e.g. a solid brand-color `.svg` placeholder) rather than external stock-photo URLs, so nothing depends on a third-party domain at build or run time.

**Facility department images**: each of the 15 `/public/images/facility/departments/<slug>/` folders should contain one file named `photo.jpg` (or `.webp`) — the `DepartmentCard` component (see `06-COMPONENT-LIBRARY-SPEC.md`) references this exact path, so dropping a real photo into the folder with that filename is the entire upload workflow, no code changes needed. Use the placeholder-SVG pattern for any department whose photo hasn't been uploaded yet.

**Baby Wear catalogue file**: reserve `/public/catalogues/baby-wear-catalogue.pdf` now, even before the real file is ready — build the `CatalogueEmbed` component (see `06-COMPONENT-LIBRARY-SPEC.md`) to reference this exact path so the day the real PDF is uploaded, it just works with no code changes. Keep the PDF reasonably sized (under ~15MB) for a smooth in-browser preview; if the real catalogue is much larger, consider a compressed "web preview" version for the embed alongside a full-resolution version behind the Download button.

**Formats**: prefer `.webp`/`.avif` for photos (with a `.jpg` fallback source if the export pipeline needs one), `.svg` for logos/icons/illustrations. Keep hero images under ~400KB after compression; `next/image` will handle responsive resizing but the source shouldn't be multi-MB.

## Facility departments data structure

Store as `departments.json` (swap for a CMS collection later if desired — the shape stays the same). This is the single source of truth for the Facility page's "Process & Capabilities" section, and for what the Facility Intelligence AI feature can answer questions about.

```json
[
  {
    "slug": "yarn-warehouse",
    "name": "Yarn Warehouse",
    "category": "Raw Material & Testing",
    "description": "Climate-controlled storage and inventory management for incoming yarn stock ahead of knitting.",
    "capacityValue": "[X]",
    "capacityUnit": "metric tons storage",
    "image": "/images/facility/departments/yarn-warehouse/photo.jpg"
  },
  {
    "slug": "knitting",
    "name": "Knitting",
    "category": "Fabric Production",
    "description": "In-house circular knitting for single jersey, double jersey, and rib fabrics.",
    "capacityValue": "[X]",
    "capacityUnit": "machines / [X] kg per day",
    "image": "/images/facility/departments/knitting/photo.jpg"
  },
  {
    "slug": "dyeing",
    "name": "Dyeing",
    "category": "Fabric Production",
    "description": "Fabric dyeing with batch-controlled color matching.",
    "capacityValue": "[X]",
    "capacityUnit": "kg per batch / [X] tons per day",
    "image": "/images/facility/departments/dyeing/photo.jpg"
  },
  {
    "slug": "dyeing-lab",
    "name": "Dyeing Lab",
    "category": "Raw Material & Testing",
    "description": "Color matching, shade approval, and fastness testing ahead of bulk dyeing.",
    "capacityValue": "[X]",
    "capacityUnit": "lab dips per day",
    "image": "/images/facility/departments/dyeing-lab/photo.jpg"
  },
  {
    "slug": "screen-printing",
    "name": "Screen Printing",
    "category": "Embellishment",
    "description": "In-house screen printing for graphic and placement prints.",
    "capacityValue": "[X]",
    "capacityUnit": "stations / [X] pieces per day",
    "image": "/images/facility/departments/screen-printing/photo.jpg"
  },
  {
    "slug": "embroidery",
    "name": "Embroidery",
    "category": "Embellishment",
    "description": "Multi-head embroidery for logos and decorative detailing.",
    "capacityValue": "[X]",
    "capacityUnit": "heads / [X] pieces per day",
    "image": "/images/facility/departments/embroidery/photo.jpg"
  },
  {
    "slug": "cutting",
    "name": "Cutting",
    "category": "Cut, Sew & Wet Processing",
    "description": "Automated and manual fabric cutting per marker and size spec.",
    "capacityValue": "[X]",
    "capacityUnit": "layers per day",
    "image": "/images/facility/departments/cutting/photo.jpg"
  },
  {
    "slug": "stitching",
    "name": "Stitching",
    "category": "Cut, Sew & Wet Processing",
    "description": "Sewing lines for garment assembly.",
    "capacityValue": "[X]",
    "capacityUnit": "machines / [X] lines / [X] pieces per day",
    "image": "/images/facility/departments/stitching/photo.jpg"
  },
  {
    "slug": "garment-dyeing",
    "name": "Garment Dyeing",
    "category": "Cut, Sew & Wet Processing",
    "description": "Piece-dyeing of finished garments for solid and washed-color effects.",
    "capacityValue": "[X]",
    "capacityUnit": "pieces per batch",
    "image": "/images/facility/departments/garment-dyeing/photo.jpg"
  },
  {
    "slug": "garment-washing",
    "name": "Garment Washing",
    "category": "Cut, Sew & Wet Processing",
    "description": "Washing and finishing treatments (enzyme, stone, silicone, etc.) for finished garments.",
    "capacityValue": "[X]",
    "capacityUnit": "washing machines / [X] pieces per day",
    "image": "/images/facility/departments/garment-washing/photo.jpg"
  },
  {
    "slug": "finishing",
    "name": "Finishing",
    "category": "Finishing & Quality Assurance",
    "description": "Pressing, folding, and final garment presentation ahead of QC.",
    "capacityValue": "[X]",
    "capacityUnit": "pieces per day",
    "image": "/images/facility/departments/finishing/photo.jpg"
  },
  {
    "slug": "quality-control",
    "name": "Quality Control (QC)",
    "category": "Finishing & Quality Assurance",
    "description": "In-line and final inspection against AQL standards.",
    "capacityValue": "[X]",
    "capacityUnit": "inspection stations",
    "image": "/images/facility/departments/quality-control/photo.jpg"
  },
  {
    "slug": "metal-detection",
    "name": "Metal Detection",
    "category": "Finishing & Quality Assurance",
    "description": "100% metal detection scanning before packing, per buyer compliance requirements.",
    "capacityValue": "[X]",
    "capacityUnit": "units per hour",
    "image": "/images/facility/departments/metal-detection/photo.jpg"
  },
  {
    "slug": "audits",
    "name": "Audits",
    "category": "Finishing & Quality Assurance",
    "description": "Social compliance and quality audits — replace with actual standards held (e.g. WRAP, BSCI, Sedex/SMETA) and audit frequency.",
    "capacityValue": null,
    "capacityUnit": "[audit standards + frequency, not a throughput number]",
    "image": "/images/facility/departments/audits/photo.jpg"
  },
  {
    "slug": "packing",
    "name": "Packing",
    "category": "Finishing & Quality Assurance",
    "description": "Final packing per buyer packing specifications ahead of dispatch.",
    "capacityValue": "[X]",
    "capacityUnit": "cartons per day",
    "image": "/images/facility/departments/packing/photo.jpg"
  }
]
```

Every `[X]` is a placeholder — replace with real figures before launch, and never let the AI Facility Intelligence feature (per `04-AI-FEATURES-SPEC.md`) state a capacity number that isn't sourced from this file. If multiple facilities are added later, add a `facilityId` field to each entry so departments can be filtered/grouped per site.

## AI backend pattern (all three AI API routes)

```ts
// /app/api/ai/assistant/route.ts (illustrative shape)
export async function POST(req: Request) {
  const { query, history, locale } = await req.json(); // locale e.g. "ar", "en"
  const context = await retrieveRelevantContent(query); // multilingual-embedding vector search over CMS content
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 800,
    system: buildGroundedSystemPrompt(context, locale), // instructs model to only use provided context AND respond in `locale`, preserving certification names/numbers/proper nouns verbatim
    messages: [...history, { role: "user", content: query }],
  });
  return streamResponse(response);
}
```

Never call the Claude API directly from the client — API key stays server-side only.

## Multilingual / i18n setup

- **Routing**: `next-intl`'s middleware handles locale detection (from `Accept-Language` header on first visit) and prefixes every route with a locale segment (`/en/products`, `/ar/products`, ...). Store the visitor's explicit choice in a cookie so a returning visitor isn't re-redirected based on browser headers after they've picked a language.
- **Default locale**: English, served at both `/` and `/en` (configure `next-intl`'s `localePrefix: 'as-needed'` so the default locale doesn't force a visible `/en` prefix while all others do).
- **Static UI strings** (nav labels, buttons, form labels, error messages): live in `/messages/{locale}.json`, loaded via `next-intl`'s `useTranslations()`/`getTranslations()`. Start with `en.json` fully populated; the other five files can start as English copies and be translated incrementally — better to ship English text in an untranslated locale than to block launch on having every string translated.
- **Page content** (Products copy, Our Impact copy, facility descriptions): lives in the CMS with locale-specific fields. Build every content page to gracefully fall back to the English CMS field if a translation is missing, rather than rendering blank — same principle as the UI strings.
- **RTL**: when `locale === 'ar'`, set `dir="rtl"` on the root `<html>` element (via the `[locale]/layout.tsx` root layout). Because the design system already specifies Tailwind logical properties (`ms-`/`me-`/`ps-`/`pe-`) instead of physical ones, most components should mirror automatically — but explicitly test the Navbar, mega-menus, `FacilityMap` popovers, and `AIChatWidget` panel in RTL, since these are the components most likely to have hardcoded left/right assumptions (icon positions, dropdown alignment).
- **Language switcher**: see the `LanguageSwitcher` component in `06-COMPONENT-LIBRARY-SPEC.md` — lives in the navbar, persists choice to a cookie, and triggers a client-side route transition to the same page under the new locale prefix (not a full reload to the homepage).
- **hreflang / SEO**: see `08-SEO-PERFORMANCE-ACCESSIBILITY.md` for the `alternate`/`hreflang` tag requirements once multiple locales are live.

## Performance targets

- Lighthouse Performance ≥ 90 on Home, Products, Our Impact, Facility — run this check against at least one RTL locale (Arabic) in addition to English, since RTL layout bugs can introduce their own CLS issues.
- LCP < 2.0s, CLS < 0.05, INP < 200ms.
- All hero/section imagery served via `next/image` with responsive `sizes`, AVIF/WebP.
- Facility map and AI chat widget lazy-loaded (`next/dynamic`, `ssr:false` where appropriate) so they don't block initial content paint.
- Total JS on first load kept lean — mega-menu and chat widget code-split.

## Accessibility

- WCAG 2.1 AA baseline (full checklist in `08-SEO-PERFORMANCE-ACCESSIBILITY.md`).
- All interactive AI components (chat, matcher, search) must be fully keyboard-operable and screen-reader announced (ARIA live regions for streaming AI responses).
- Set `lang` attribute on `<html>` to match the active locale (not hardcoded to `en`), and `dir="rtl"` for Arabic — screen readers use both to choose correct pronunciation rules.

## Environments

- `main` → production (Vercel)
- `staging` → preview deployments per PR
- Environment variables: `ANTHROPIC_API_KEY`, `CMS_API_TOKEN`, `MAPBOX_TOKEN`, `CRM_WEBHOOK_URL` — all server-side only, never `NEXT_PUBLIC_*` for secrets.

## Testing

- Component tests: Vitest + React Testing Library for `/components/ui` and `/components/sections`.
- E2E: Playwright — critical paths are the `/contact` form submission, the Baby Wear catalogue embed/download, and the AI assistant happy path.
- Visual regression optional (Chromatic) given the design-heavy nature of the site.

## GitHub repository & push workflow

Repository: **`https://github.com/Naeem009/jaguarpvt.git`**

### One-time setup (run in terminal, not Cursor chat)

```bash
# From inside your project folder, if the folder isn't a git repo yet:
git init
git remote add origin https://github.com/Naeem009/jaguarpvt.git

# If the repo already has content (e.g. a README created on GitHub),
# pull it first to avoid a conflicting-history error:
git pull origin main --allow-unrelated-histories

# If it's a brand-new empty repo, just set the branch and continue:
git branch -M main
```

Authenticate with GitHub via a Personal Access Token (classic or fine-grained) or the GitHub CLI (`gh auth login`) — do not commit credentials into the repo. If prompted for a password over HTTPS, use the token, not your GitHub account password.

### `.gitignore` (create at repo root before the first commit)

```
node_modules/
.next/
.env
.env.local
.env*.local
.vercel
*.log
.DS_Store
```

Never commit `.env`/`.env.local` — this is where `ANTHROPIC_API_KEY`, `CMS_API_TOKEN`, `MAPBOX_TOKEN`, and `CRM_WEBHOOK_URL` live.

### Branch strategy

- `main` — production, deploys to the live site via Vercel's GitHub integration.
- `staging` (optional) — integration branch if more than one person is working, gets its own Vercel preview URL.
- `feature/<short-description>` — one branch per page or feature (e.g. `feature/products-pages`, `feature/baby-wear-catalogue`, `feature/ai-assistant`), matching the phases in `09-IMPLEMENTATION-ROADMAP.md`. Merge into `main` (or `staging`) via pull request once a phase checkpoint is reached.

### Commit convention

Use short, conventional-style messages so history stays readable:

```
feat: add homepage hero and stat bar
feat: build products hub and category pages
feat: add baby wear catalogue embed section
feat: wire AI sourcing assistant to /api/ai/assistant
fix: correct facility map marker positioning
chore: add public/images folder structure and placeholders
docs: update docs with real facility data
```

### Standard push workflow

```bash
git add .
git commit -m "feat: <what you just built>"
git push origin main          # or: git push origin feature/<branch-name>
```

### Using Cursor for commits

Cursor can stage, commit, and push through its built-in Source Control panel (same as VS Code) or you can ask Cursor's chat to run the git commands above via its terminal integration — Cursor will not push automatically on its own, this is always an explicit, confirmed action. After each phase in `09-IMPLEMENTATION-ROADMAP.md` (design system, core pages, AI features, polish), commit and push as a checkpoint so you always have a working state to roll back to on GitHub.

### Connecting to Vercel

Once pushed, import `Naeem009/jaguarpvt` into Vercel (New Project → Import Git Repository), set the environment variables from the list above in the Vercel project settings, and every push to `main` will auto-deploy to production, with pull requests getting their own preview deployment URLs.
