# 08 — SEO, Performance & Accessibility

## SEO

- **Metadata**: use Next.js Metadata API per-page; unique `title`/`description` for every route, template: `"{Page Title} | Jaguar (Private) Limited"`.
- **Structured data (JSON-LD)**:
  - `Organization` schema on Home (name, logo, sameAs social links, founding date).
  - `LocalBusiness`/`Place` schema per facility on `/facility` if facility pages get their own URLs later.
  - `BreadcrumbList` on all inner pages.
- **Sitemap**: generate `sitemap.xml` via `next-sitemap` or a route handler.
- **robots.txt**: allow all except `/api/*`.
- **Canonical URLs** on every page; watch for duplicate content between category pages.
- **Open Graph / Twitter Card** images per page — custom OG image per Product category, not one generic site-wide image. The Baby Wear page's OG image can be a catalogue cover shot.
- **Internal linking**: every Products/Our Impact page should link to `/contact` at least once and to at least one related page.
- **Keyword targets** (informational starting point, refine with real research): "apparel manufacturer [region]", "[category] manufacturing partner", "baby wear manufacturer", "sustainable apparel manufacturing", "vertically integrated garment manufacturer", "AI supply chain apparel".

## Multilingual SEO

- **`hreflang` tags**: every page emits `<link rel="alternate" hreflang="{locale}" href="..."/>` for all six locales plus an `x-default` pointing at the English version — `next-intl` combined with the Next.js Metadata API's `alternates.languages` field handles this per-page. Missing or incorrect `hreflang` tags are one of the most common multilingual SEO mistakes; verify with Google Search Console's International Targeting report after launch.
- **Localized sitemap**: `sitemap.xml` should include every locale × page combination, not just the English URLs — most `next-sitemap`-style generators support this via an `alternateRefs` option per entry.
- **Localized metadata**: `title`/`description` per page should be genuinely translated (via the CMS locale fields or `/messages/{locale}.json`), not just the page body — a page with English body copy but an Arabic `<title>` (or vice versa) reads as broken to both users and search engines.
- **Don't auto-redirect based on IP geolocation** for SEO reasons — let the locale middleware's `Accept-Language` detection handle the first visit, and always leave the `LanguageSwitcher` visible so the visitor's choice overrides any guess. Search engines penalize sites that redirect crawlers away from the URL they're trying to index.

## Performance (Core Web Vitals)

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.0s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.05 |
| TTFB | < 600ms (SSG/ISR pages) |

Checklist:
- [ ] All images through `next/image`, explicit width/height or `fill` with sized container to prevent layout shift.
- [ ] Hero video (if used) compressed, muted, `preload="metadata"`, poster image set, lazy-loads below-the-fold instances.
- [ ] `FacilityMap` and `AIChatWidget` dynamically imported (`next/dynamic`, `ssr:false`) so they don't block first paint.
- [ ] Fonts self-hosted or via `next/font` (avoid render-blocking external font requests).
- [ ] Static/ISR generation for all content pages; only AI API routes and the Contact form are true dynamic/server endpoints.
- [ ] Bundle analysis (`@next/bundle-analyzer`) run before launch to catch oversized dependencies (especially Mapbox and any chart libraries).
- [ ] Third-party scripts (analytics, CRM webhook) loaded via `next/script` with `strategy="afterInteractive"` or `"lazyOnload"`.

## Accessibility (WCAG 2.1 AA)

- [ ] Color contrast: body text ≥ 4.5:1, large text/headlines ≥ 3:1 — verify accent-on-white and white-on-charcoal combinations from the design system doc.
- [ ] All interactive elements reachable and operable by keyboard alone, visible focus states (custom focus ring using `--color-accent`, not browser default removed without replacement).
- [ ] `AIChatWidget` streaming responses announced via an `aria-live="polite"` region; loading state announced too.
- [ ] `CommandSearch` overlay traps focus while open, returns focus to trigger on close, closes on `Escape`.
- [ ] `DepartmentCategoryTabs` on the Facility page use proper ARIA tab/tabpanel roles and are operable with arrow keys, not just click/tap.
- [ ] `FacilityMap` has a non-map fallback list (already specified in the component spec) so map content isn't only accessible via mouse/hover.
- [ ] All images have meaningful `alt` text; decorative images use `alt=""`.
- [ ] Form fields (`ContactForm`, `CapabilityMatcher`) have associated `<label>`s, inline error messages linked via `aria-describedby`.
- [ ] `CatalogueEmbed`'s iframe has a descriptive `title` attribute, and the "Download PDF" fallback button is present and keyboard-reachable regardless of whether the iframe renders.
- [ ] Heading hierarchy is strictly sequential per page (one `h1`, logical `h2`/`h3` nesting) — audit each page template against this.
- [ ] `prefers-reduced-motion` respected across all Framer Motion animations and count-up effects (per `01-BRAND-DESIGN-SYSTEM.md`).
- [ ] Run automated audits (axe-core / Lighthouse a11y) in CI on every PR, plus at least one manual screen-reader pass (VoiceOver or NVDA) before launch on Home, Products/Baby Wear (catalogue embed), and Contact — run the screen-reader pass in both English and Arabic (RTL) at least once.
- [ ] `LanguageSwitcher` is keyboard-operable, announces the current language and available options to screen readers, and `<html lang>`/`dir` update correctly when the locale changes.
- [ ] Verify RTL rendering (Arabic) on Navbar/mega-menus, `FacilityMap` popovers, and `AIChatWidget` — these are the components most likely to have hardcoded left/right assumptions.

## Pre-launch QA pass

- [ ] Lighthouse run (Performance/SEO/Accessibility/Best Practices) on Home, Products/Wovens, Products/Baby Wear, Our Impact, Contact — all ≥ 90.
- [ ] Broken-link check across full sitemap.
- [ ] Mobile pass (375px width minimum) on every page — mega-menu must collapse to a usable mobile nav pattern.
- [ ] All `[COMPANY NAME]` and placeholder data instances replaced or explicitly flagged as intentional placeholders in a `TODO.md`.
