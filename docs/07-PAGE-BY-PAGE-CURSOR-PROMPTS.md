# 07 — Page-by-Page Cursor Prompts

Copy each block into Cursor's chat/composer for that page. Cursor can `@`-reference the doc files directly if you're using `@docs/...` mentions — include those mentions so it actually reads them rather than relying on the `.cursorrules` summary alone.

**Image paths note**: every page prompt below tells Cursor which `/public/images/...` subfolder to pull imagery from (per the structure in `05-TECHNICAL-SPEC-STACK.md`). Add your real photos to those folders using the exact filenames referenced (e.g. `hero.jpg`, `process-01.jpg`) either before or after running each prompt — Cursor will wire up the `<Image>` components to those paths either way, and a missing file just means an empty/placeholder box until you drop the real image in.

---

## Global setup prompt (run once, before any page)

```
Read @docs/00-PROJECT-OVERVIEW.md, @docs/01-BRAND-DESIGN-SYSTEM.md,
@docs/02-SITE-ARCHITECTURE.md, and @docs/06-COMPONENT-LIBRARY-SPEC.md.

Set up the Next.js 14 App Router project per @docs/05-TECHNICAL-SPEC-STACK.md:
- TypeScript, Tailwind CSS configured with the design tokens from the design
  system doc as CSS variables and a Tailwind theme extension. The primary
  accent color is #7EBB42 (brand green) — use the exact token values from
  01-BRAND-DESIGN-SYSTEM.md, not a rough approximation.
- Install and configure Framer Motion.
- Install and configure `next-intl` per the "Multilingual / i18n setup" section of the tech
  spec doc: locale-prefixed routing under /app/[locale]/, the middleware.ts
  for locale detection, /i18n.ts config, and a /messages folder with
  en.json fully populated and ar.json/zh.json/es.json/fr.json/de.json
  created as English-copy placeholders for now (I will get these translated
  and swap the content in later — the file structure and locale switching
  need to work today even with placeholder text).
- Set default locale to English (localePrefix: "as-needed" so English
  doesn't force a visible /en in the URL).
- Create the folder structure exactly as laid out in the "Repo structure"
  section of the tech spec doc, INCLUDING the full /public/images subfolder
  structure listed there (one folder per page/section) AND the /public/catalogues
  folder for the Baby Wear e-catalogue PDF.
- For every image referenced in that structure that doesn't exist yet, add a
  simple placeholder file (a solid brand-color .svg with the folder name as
  centered text is fine) so every <Image> component has something to render
  and nothing 404s during development.
- Add a .gitignore per the "GitHub repository & push workflow" section of the
  tech spec doc.
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

Build the Home page at /app/[locale]/(marketing)/page.tsx using these sections in order:
Hero (variant="home"), StatBar, ProductGrid (4-card teaser: Wovens, Knits,
Denim, Baby Wear), an embedded AIChatWidget teaser section with 2-3 example
prompt chips, an impact-proof StatBar variant with a link to /our-impact, a
FacilityMap teaser (static/non-interactive preview linking to /facility), a
trust strip, and a closing CTASection.

Use placeholder copy in the tone and structure defined in the content
strategy doc — do not invent real client names or fabricated statistics,
use clearly-marked placeholder values like [X] facilities that I will
replace with real data.

Pull imagery from /public/images/home/: hero.jpg (or hero.mp4 if using a
background video) for the Hero, facility-teaser.jpg for the map teaser
section, and any trust-strip logos from /public/logos/. Use next/image
throughout with proper sizes/alt text.

This is a B2B manufacturer site — no e-commerce UI patterns anywhere.
```

---

## Products hub + category pages (including Baby Wear catalogue)

```
Read @docs/02-SITE-ARCHITECTURE.md and @docs/03-CONTENT-STRATEGY-COPY.md
(Products pages section and the Products / Baby Wear additional outline).

Build:
1. /app/[locale]/(marketing)/products/page.tsx — hub page with a Hero (variant="inner")
   and a full ProductGrid linking to Wovens, Knits, Denim, and Baby Wear
   (give the Baby Wear card a small "Catalogue" badge). Also embed the
   CapabilityMatcher component on this hub page per @docs/04-AI-FEATURES-SPEC.md
   Feature 2, wired to /api/ai/matcher.
2. /app/[locale]/(marketing)/products/wovens/page.tsx — following the per-category
   copy outline: Hero, TimelineSection (fiber-to-garment process), a specs
   data table component, a sustainability callout, closing CTASection
   linking to /contact.
3. Repeat the same page template for /products/knits and /products/denim,
   reusing all the same section components with category-specific
   placeholder copy.
4. /app/[locale]/(marketing)/products/baby-wear/page.tsx — same template as the other
   three categories, PLUS the CatalogueEmbed component (per
   @docs/06-COMPONENT-LIBRARY-SPEC.md) in a dedicated section titled
   "Browse the Baby Wear Catalogue", positioned after the sustainability
   callout and before the closing CTASection. Point CatalogueEmbed at
   /catalogues/baby-wear-catalogue.pdf — this file does not exist yet, so
   build and verify the empty/placeholder state ("Catalogue coming soon")
   renders cleanly; the moment I upload the real PDF to that path it should
   work with no further code changes.

Use a shared ProductPageTemplate component so the four category pages stay
structurally consistent and easy to maintain, with Baby Wear simply adding
the one extra catalogue section on top of the shared template.

Pull imagery per category from /public/images/products/<category>/: hero.jpg
for each page's Hero, and process-01.jpg, process-02.jpg, etc. for the
TimelineSection steps. The hub page pulls one representative thumbnail per
category from the same folders for its ProductGrid cards.
```

---

## Our Impact hub (Environment, People, Governance & Certifications)

```
Read @docs/03-CONTENT-STRATEGY-COPY.md (Our Impact hub outline) and
@docs/04-AI-FEATURES-SPEC.md (Feature 3: Sustainability Impact Estimator).

Build /app/[locale]/(marketing)/our-impact/page.tsx with: Hero (variant="inner"), a
StatBar of the 3-4 top ESG metrics, three pillar cards (Environment / People
& Communities / Governance & Certifications) each linking to a deeper page,
the embedded SustainabilityEstimator component (client-side calculation per
the AI features spec — do not call an LLM for the numeric output, only for
the short narrative sentence beneath it), and a closing CTASection with a
"Download ESG Report" primary action.

Also build the three sub-pages: /our-impact/environment/page.tsx,
/our-impact/people/page.tsx, and /our-impact/governance/page.tsx (the
governance page includes the full CertificationGrid — certifications no
longer have their own top-level route).

Pull the hub Hero image from /public/images/our-impact/environment/hero.jpg,
sub-page images from their respective /our-impact/<section>/ folders, and
certification logos from /public/certifications/.
```

---

## Facility (interactive map)

```
Read @docs/04-AI-FEATURES-SPEC.md (Feature 4: Facility Intelligence) and
@docs/06-COMPONENT-LIBRARY-SPEC.md (FacilityMap component).

Build /app/[locale]/(marketing)/facility/page.tsx with a Hero (variant="inner"), the
full interactive FacilityMap component with filterEnabled=true, and a
list/grid fallback view below the map (for accessibility and mobile) showing
all facilities as cards. Use a placeholder facilities.json with 8-10 example
facilities (name, country, city, product categories, certifications,
employees, established year) that I will replace with real data. Wire the
natural-language filter box to /api/ai/search scoped to facility data.

Pull the Hero image from /public/images/facility/hero.jpg. If the map is
hand-built SVG rather than Mapbox, reference a base map asset from the same
folder; the per-facility card thumbnails can pull from
/public/images/facility/<facility-slug>.jpg once available, falling back to
a generic facility placeholder image in the same folder.
```

---

## Contact (conversion page)

```
Read @docs/03-CONTENT-STRATEGY-COPY.md (Contact page outline) and
@docs/06-COMPONENT-LIBRARY-SPEC.md (ContactForm).

Build /app/[locale]/(marketing)/contact/page.tsx with a short Hero, the ContactForm
component (React Hook Form + Zod validation) with the fields specified in
the content strategy doc, a 3-step "what happens next" expectation setter,
and alternative contact details. Support pre-filling form fields from query
params — both `?category=<name>` (for hand-off from the Baby Wear catalogue's
"Request This Catalogue" CTA) and the fuller pre-fill from the
CapabilityMatcher tool on the Products page. Build the /api/contact-form
route to validate and forward submissions to a webhook URL from an
environment variable (stub this with a console.log + TODO if no real CRM
webhook is configured yet).

If a Hero image is used, pull it from /public/images/contact/hero.jpg — this
page is form-first, so keep imagery minimal/optional here.
```

---

## About and Careers

```
Read @docs/02-SITE-ARCHITECTURE.md for structure and @docs/03-CONTENT-STRATEGY-COPY.md
for voice.

Build these remaining pages using the existing component library — do not
create new one-off section components unless a page genuinely needs one:
1. /app/[locale]/(marketing)/about/page.tsx — single scrollable page with sections for
   Hero, mission statement block, StatBar, TimelineSection for company
   history, a leadership section (if headshots are available), an awards/
   recognition section, and a closing CTASection.
2. /app/[locale]/(marketing)/careers/page.tsx — Hero, a short culture/values section,
   and a simple department list linking out to an external ATS URL
   (placeholder link) rather than building a full application flow.

Pull imagery from /public/images/about/ (hero, mission-block, history
process shots, leadership headshots) for About, and /public/images/careers/
(hero, culture photos) for Careers.
```

---

## Global nav, footer, and command search (do last, after all pages exist)

```
Read @docs/02-SITE-ARCHITECTURE.md and @docs/04-AI-FEATURES-SPEC.md (Feature 6).

Build the Navbar with exactly these items in this order: Home, About,
Products (mega-menu: Wovens, Knits, Denim, Baby Wear — with a small
"Catalogue" badge on Baby Wear), Our Impact (mega-menu: Environment, People
& Communities, Governance & Certifications, plus a "Download ESG Report"
CTA), Facility, Careers, the LanguageSwitcher component, and a persistent
solid-accent "Contact" button. Home, Facility, and Careers are flat links
with no dropdown. Implement the sticky transparent-to-solid scroll behavior
and the mobile slide-out menu per the doc, including the language row in
the mobile menu. Build the Footer per the 4-column structure (Company /
Products / Our Impact / Connect), also including the LanguageSwitcher as a
secondary access point. Build the CommandSearch overlay (Cmd/Ctrl+K) wired
to /api/ai/search, and mount both Navbar and Footer in the
[locale]/(marketing) route group layout so they appear on every page built
so far.
```

---

## Multilingual: LanguageSwitcher, RTL, and localized AI (do after nav/footer, before final polish)

```
Read @docs/04-AI-FEATURES-SPEC.md (Multilingual behavior section),
@docs/05-TECHNICAL-SPEC-STACK.md (Multilingual / i18n setup section), and
@docs/06-COMPONENT-LIBRARY-SPEC.md (LanguageSwitcher and the "Multilingual
notes affecting several components" section).

1. Build the LanguageSwitcher component per spec: dropdown on desktop
   (navbar), horizontal chip list on mobile (slide-out menu), showing each
   language in its own native label. Selecting a language sets a cookie and
   client-navigates to the SAME current page under the new locale prefix —
   verify this explicitly, don't let it redirect to the homepage.
2. Wire up dir="rtl" on the root <html> element when locale === "ar", set
   via the /app/[locale]/layout.tsx root layout using next-intl's locale
   param. Audit the Navbar, mega-menus, FacilityMap popovers, and
   AIChatWidget panel specifically for RTL correctness — these are called
   out in the doc as the most likely places to have hardcoded left/right
   assumptions instead of Tailwind logical properties.
3. Add the in-panel language selector to AIChatWidget (defaults to matching
   site locale, overridable). Update /api/ai/assistant, /api/ai/matcher, and
   /api/ai/search to accept a `locale` field in the request body and pass it
   into the system prompt per the pattern in 05-TECHNICAL-SPEC-STACK.md —
   include the guardrail instructing the model to preserve certification
   names, numbers, and proper nouns untranslated regardless of response
   language.
4. Confirm every static UI string across all pages built so far (nav
   labels, button text, form labels, CatalogueEmbed's "Download PDF" /
   "Request This Catalogue" text, etc.) is pulled from next-intl's
   useTranslations()/getTranslations() and /messages/{locale}.json rather
   than hardcoded — flag any hardcoded strings you find and fix them.
```

---

## Git checkpoint (run after each phase — Setup, Core Pages, AI Features, Polish)

```
Stage and commit the current work per the "GitHub repository & push workflow"
section of @docs/05-TECHNICAL-SPEC-STACK.md. Write a short conventional
commit message summarizing what was built in this phase, then push to
origin main (repo: https://github.com/Naeem009/jaguarpvt.git). Confirm the
remote is set correctly before pushing, and do not push if there are
uncommitted secrets in .env files — check .gitignore is excluding them first.
```
