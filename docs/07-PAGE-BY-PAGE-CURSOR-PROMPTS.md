# 07 — Page-by-Page Cursor Prompts

Copy each block into Cursor's chat/composer for that page. Cursor can `@`-reference the doc files directly if you're using `@docs/...` mentions — include those mentions so it actually reads them rather than relying on the `.cursorrules` summary alone.

---

## Global setup prompt (run once, before any page)

```
Read @docs/00-PROJECT-OVERVIEW.md, @docs/01-BRAND-DESIGN-SYSTEM.md,
@docs/02-SITE-ARCHITECTURE.md, and @docs/06-COMPONENT-LIBRARY-SPEC.md.

Set up the Next.js 14 App Router project per @docs/05-TECHNICAL-SPEC-STACK.md:
- TypeScript, Tailwind CSS configured with the design tokens from the design
  system doc as CSS variables and a Tailwind theme extension.
- Install and configure Framer Motion.
- Create the folder structure exactly as laid out in the "Repo structure"
  section of the tech spec doc.
- Build the primitive components first (Button, Badge, Card, SectionHeading,
  StatNumber) per @docs/06-COMPONENT-LIBRARY-SPEC.md, with full TypeScript
  prop types.
- Do not build any page content yet — this pass is setup and primitives only.
```

---

## Home page

```
Read @docs/03-CONTENT-STRATEGY-COPY.md (Homepage copy outline section) and
@docs/06-COMPONENT-LIBRARY-SPEC.md.

Build the Home page at /app/(marketing)/page.tsx using these sections in order:
Hero (variant="home"), StatBar, CapabilityGrid (3-card teaser: Wovens, Knits,
Denim), an embedded AIChatWidget teaser section with 2-3 example prompt chips,
a sustainability proof StatBar variant with a link to /sustainability, a
FacilityMap teaser (static/non-interactive preview linking to
/global-footprint), a trust strip, a NewsroomGrid preview (3 latest), and a
closing CTASection.

Use placeholder copy in the tone and structure defined in the content
strategy doc — do not invent real client names or fabricated statistics,
use clearly-marked placeholder values like [X] facilities that I will
replace with real data.

This is a B2B manufacturer site — no e-commerce UI patterns anywhere.
```

---

## Capabilities hub + category pages

```
Read @docs/02-SITE-ARCHITECTURE.md and @docs/03-CONTENT-STRATEGY-COPY.md
(Capabilities pages section).

Build:
1. /app/(marketing)/capabilities/page.tsx — hub page with a Hero (variant="inner")
   and a full CapabilityGrid linking to Wovens, Knits, Denim, Design &
   Product Development, Quality & Compliance.
2. /app/(marketing)/capabilities/wovens/page.tsx — following the per-category
   copy outline: Hero, TimelineSection (fiber-to-garment process), a specs
   data table component, a sustainability callout, related-innovation link,
   closing CTASection.
3. Repeat the same page template for /capabilities/knits and
   /capabilities/denim, reusing all the same section components with
   category-specific placeholder copy.

Use a shared CapabilityPageTemplate component so the three category pages
stay structurally consistent and easy to maintain.
```

---

## Sustainability hub

```
Read @docs/03-CONTENT-STRATEGY-COPY.md (Sustainability hub outline) and
@docs/04-AI-FEATURES-SPEC.md (Feature 3: Sustainability Impact Estimator).

Build /app/(marketing)/sustainability/page.tsx with: Hero (variant="inner"),
a StatBar of the 3-4 top ESG metrics, three pillar cards (Environment /
People / Governance) each linking to a deeper page, the embedded
SustainabilityEstimator component (client-side calculation per the AI
features spec — do not call an LLM for the numeric output, only for the
short narrative sentence beneath it), a CertificationGrid, and a closing
CTASection with a "Download ESG Report" primary action.
```

---

## Innovation & AI hub

```
Read @docs/04-AI-FEATURES-SPEC.md in full — this page is the showcase for
all 6 AI features.

Build /app/(marketing)/innovation/ai/page.tsx with:
- Hero (variant="inner") framing these as decision tools for sourcing
  professionals, not novelties.
- An embedded, functional AIChatWidget (mode="embedded") wired to
  /api/ai/assistant.
- The CapabilityMatcher multi-step component wired to /api/ai/matcher.
- The SustainabilityEstimator (can reuse the one built for the
  Sustainability page).
- A feature grid section listing all 6 features per the table in
  04-AI-FEATURES-SPEC.md, with "Try it" CTAs that scroll/link to the
  relevant interactive component or page.
- A short "how this works" transparency block explaining these tools use
  AI grounded in our published data, per the spec's guidance on honesty
  about data sources.

Also implement the three API routes (/api/ai/assistant, /api/ai/matcher,
/api/ai/search) per the backend pattern in @docs/05-TECHNICAL-SPEC-STACK.md.
Use placeholder/mock retrieval (a local JSON knowledge base) for now if a
real vector store isn't configured yet — structure the retrieval function
so swapping in Pinecone/pgvector later is a drop-in change.
```

---

## Global Footprint (facility map)

```
Read @docs/04-AI-FEATURES-SPEC.md (Feature 4) and @docs/06-COMPONENT-LIBRARY-SPEC.md
(FacilityMap component).

Build /app/(marketing)/global-footprint/page.tsx with a Hero (variant="inner"),
the full interactive FacilityMap component with filterEnabled=true, and a
list/grid fallback view below the map (for accessibility and mobile) showing
all facilities as cards. Use a placeholder facilities.json with 8-10 example
facilities (name, country, city, capabilities, certifications, employees,
established year) that I will replace with real data. Wire the natural-
language filter box to /api/ai/search scoped to facility data.
```

---

## Partner With Us (conversion page)

```
Read @docs/03-CONTENT-STRATEGY-COPY.md (Partner With Us outline) and
@docs/06-COMPONENT-LIBRARY-SPEC.md (PartnerForm).

Build /app/(marketing)/partner/page.tsx with a short Hero, the PartnerForm
component (React Hook Form + Zod validation) with the fields specified in
the content strategy doc, a 3-step "what happens next" expectation setter,
and alternative contact details. Support pre-filling form fields from query
params (for hand-off from the CapabilityMatcher tool). Build the
/api/partner-form route to validate and forward submissions to a webhook
URL from an environment variable (stub this with a console.log + TODO if
no real CRM webhook is configured yet).
```

---

## Company / About, Certifications, Newsroom, Careers

```
Read @docs/02-SITE-ARCHITECTURE.md for structure and @docs/03-CONTENT-STRATEGY-COPY.md
for voice.

Build these remaining pages using the existing component library — do not
create new one-off section components unless a page genuinely needs one:
1. /app/(marketing)/company/about/page.tsx — Hero, mission statement block,
   StatBar, TimelineSection for company history, CTASection.
2. /app/(marketing)/certifications/page.tsx — Hero, CertificationGrid (full),
   short explanatory copy per certification on click/hover.
3. /app/(marketing)/newsroom/page.tsx and /newsroom/[slug]/page.tsx — CMS-
   driven listing and article detail pages using NewsroomGrid/NewsroomCard.
   Stub the CMS client with typed mock data for now per the lib/cms.ts
   pattern in the tech spec doc.
4. /app/(marketing)/careers/page.tsx — Hero, a short culture/values section,
   and a simple department list linking out to an external ATS URL
   (placeholder link) rather than building a full application flow.
```

---

## Global nav, footer, and command search (do last, after all pages exist)

```
Read @docs/02-SITE-ARCHITECTURE.md and @docs/04-AI-FEATURES-SPEC.md (Feature 6).

Build the Navbar with the mega-menu structure exactly as specified (Capabilities,
Innovation, Sustainability mega-menus with per-item imagery/icons), the sticky
transparent-to-solid scroll behavior, and the persistent "Partner With Us" CTA
button. Build the Footer per the 4-column structure. Build the CommandSearch
overlay (Cmd/Ctrl+K) wired to /api/ai/search, and mount both Navbar and Footer
in the (marketing) route group layout so they appear on every page built so far.
```
