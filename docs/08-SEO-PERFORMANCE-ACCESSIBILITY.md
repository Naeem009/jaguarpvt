# 08 — SEO, Performance & Accessibility

## SEO

- **Metadata**: use Next.js Metadata API per-page; unique `title`/`description` for every route, template: `"{Page Title} | [COMPANY NAME]"`.
- **Structured data (JSON-LD)**:
  - `Organization` schema on Home (name, logo, sameAs social links, founding date).
  - `LocalBusiness`/`Place` schema per facility on `/global-footprint` if facility pages get their own URLs later.
  - `Article` schema on Newsroom detail pages.
  - `BreadcrumbList` on all inner pages.
- **Sitemap**: generate `sitemap.xml` via `next-sitemap` or a route handler, including CMS-driven Newsroom slugs.
- **robots.txt**: allow all except `/api/*`.
- **Canonical URLs** on every page; watch for duplicate content between category pages.
- **Open Graph / Twitter Card** images per page — custom OG image per Capability category and Newsroom article, not one generic site-wide image.
- **Internal linking**: every Capability/Sustainability page should link to `/partner` at least once and to at least one related page (cross-linking Wovens ↔ Material Lab, etc.).
- **Keyword targets** (informational starting point, refine with real research): "apparel manufacturer [region]", "[category] manufacturing partner", "sustainable apparel manufacturing", "vertically integrated garment manufacturer", "AI supply chain apparel".

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
- [ ] Static/ISR generation for all content pages; only AI API routes and the Partner form are true dynamic/server endpoints.
- [ ] Bundle analysis (`@next/bundle-analyzer`) run before launch to catch oversized dependencies (especially Mapbox and any chart libraries).
- [ ] Third-party scripts (analytics, CRM webhook) loaded via `next/script` with `strategy="afterInteractive"` or `"lazyOnload"`.

## Accessibility (WCAG 2.1 AA)

- [ ] Color contrast: body text ≥ 4.5:1, large text/headlines ≥ 3:1 — verify accent-on-white and white-on-charcoal combinations from the design system doc.
- [ ] All interactive elements reachable and operable by keyboard alone, visible focus states (custom focus ring using `--color-accent`, not browser default removed without replacement).
- [ ] `AIChatWidget` streaming responses announced via an `aria-live="polite"` region; loading state announced too.
- [ ] `CommandSearch` overlay traps focus while open, returns focus to trigger on close, closes on `Escape`.
- [ ] `FacilityMap` has a non-map fallback list (already specified in the component spec) so map content isn't only accessible via mouse/hover.
- [ ] All images have meaningful `alt` text; decorative images use `alt=""`.
- [ ] Form fields (`PartnerForm`, `CapabilityMatcher`) have associated `<label>`s, inline error messages linked via `aria-describedby`.
- [ ] Heading hierarchy is strictly sequential per page (one `h1`, logical `h2`/`h3` nesting) — audit each page template against this.
- [ ] `prefers-reduced-motion` respected across all Framer Motion animations and count-up effects (per `01-BRAND-DESIGN-SYSTEM.md`).
- [ ] Run automated audits (axe-core / Lighthouse a11y) in CI on every PR, plus at least one manual screen-reader pass (VoiceOver or NVDA) before launch on Home, Partner, and the AI hub.

## Pre-launch QA pass

- [ ] Lighthouse run (Performance/SEO/Accessibility/Best Practices) on Home, Capabilities/Wovens, Sustainability, Innovation/AI, Partner — all ≥ 90.
- [ ] Broken-link check across full sitemap.
- [ ] Mobile pass (375px width minimum) on every page — mega-menu must collapse to a usable mobile nav pattern.
- [ ] All `[COMPANY NAME]` and placeholder data instances replaced or explicitly flagged as intentional placeholders in a `TODO.md`.
