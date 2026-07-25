# 06 — Component Library Specification

All components consume tokens from `01-BRAND-DESIGN-SYSTEM.md`. Build as typed React components in `/components/ui` (primitives) and `/components/sections` (page-section-level compositions).

## Primitives (`/components/ui`)

| Component | Props (key ones) | Notes |
|---|---|---|
| `Button` | `variant: 'primary' \| 'secondary' \| 'tertiary'`, `size`, `href?`, `onClick?` | Primary = solid accent; secondary = outline; tertiary = text + arrow |
| `Badge` | `tone: 'neutral' \| 'accent' \| 'tech'` | Used for certification chips, category labels, and the small "Catalogue" badge on the Products mega-menu |
| `Card` | `variant: 'default' \| 'stat' \| 'interactive'` | Hairline border, 16–24px radius |
| `Input` / `Select` / `Checkbox` | standard RHF-compatible | Used in Contact form and AI Matcher |
| `StatNumber` | `value`, `suffix?`, `animateOnView` | Count-up animation, mono/display font |
| `SectionHeading` | `eyebrow?`, `title`, `subhead?`, `align` | Consistent heading pattern across all sections |
| `Modal` | `open`, `onClose` | Used for embedded Contact form pop-up |

## Section components (`/components/sections`)

### `Hero`
- Props: `headline`, `subhead`, `primaryCTA`, `secondaryCTA`, `media` (image or video), `variant: 'home' | 'inner'`.
- Home variant: full-viewport height, dark overlay gradient, sticky-transparent nav sits on top.
- Inner-page variant: shorter (60vh), used on About/Products/Our Impact/Facility/Careers/Contact.

### `StatBar`
- Props: `stats: { value, label, suffix? }[]`.
- Row of 3–4 `StatNumber`s, count up when scrolled into view.

### `ProductGrid`
- Props: `items: { title, image, href, description, badge? }[]`.
- Used on Home (4-card teaser: Wovens/Knits/Denim/Baby Wear) and the Products hub (full grid). Pass `badge="Catalogue"` on the Baby Wear item so the card carries the same small badge used in the nav mega-menu.

### `CatalogueEmbed`
- Props: `fileUrl: string`, `title?`, `emptyState?: boolean`.
- Purpose-built for the Baby Wear catalogue section on `/products/baby-wear` (and reusable later for any other product line that gets its own catalogue).
- Structure: a `Card`-style contained panel (max-width ~960px, centered) containing:
  1. A short context line (`SectionHeading` in "eyebrow + title" mode, no big display type here — this section is a tool, not a hero).
  2. The embedded viewer itself — implement as an `<iframe>` pointing at the PDF path (`/catalogues/baby-wear-catalogue.pdf`) using the browser's native PDF viewer, which is the simplest, most reliable, zero-dependency option. If a richer flip-book feel is wanted later, swap in `react-pdf` or a dedicated flipbook library, but ship the plain iframe embed first.
  3. A **"Download PDF"** secondary button (`<a href={fileUrl} download>`) directly below the embed, always present regardless of whether the iframe renders correctly on the visitor's device/browser.
  4. A closing `Button` (primary): **"Request This Catalogue"**, linking to `/contact?category=baby-wear`.
- Empty state (`emptyState=true`, or simply when `fileUrl` resolves to a 404): render a neutral placeholder card — icon + "Catalogue coming soon" + the same "Request This Catalogue" CTA — instead of a broken/blank iframe. Check for file existence at build time if possible (e.g. `fs.existsSync` in a server component) rather than relying on the iframe failing silently.
- Accessibility: give the iframe a descriptive `title` attribute ("Baby Wear product catalogue, PDF"); the Download button ensures the content is reachable even for assistive tech that struggles with embedded PDFs.

### `FacilityMap`
- Props: `facilities: Facility[]`, `filterEnabled?: boolean`.
- Dark stylized world map (Mapbox custom style or hand-built SVG), accent-colored markers, hover/click opens a `FacilityCard` popover.
- If `filterEnabled`, renders the natural-language filter input above the map (AI Feature 4, Facility Intelligence).
- Must lazy-load; heaviest component on the site.

### `AIChatWidget`
- Props: `mode: 'floating' | 'embedded'`, `context?: string` (page-specific hint for the assistant), `locale` (defaults to site locale, overridable via the widget's own language selector — see multilingual notes below).
- Floating mode: bottom-right launcher, present on every page, expands to chat panel, streams responses, shows source citation chips, persistent "Talk to a human" link to `/contact`.
- Embedded mode: full-width inline version used on the Home page teaser, pre-seeded with 2–3 example questions as clickable chips.

### `CapabilityMatcher`
- Multi-step form (see AI Feature 2 spec), 4–5 steps, progress indicator, animated step transitions.
- Lives on `/products`. Final step renders AI-generated match summary + "Send to our team" CTA that pre-fills `ContactForm`.

### `SustainabilityEstimator`
- Inputs (category, volume, material) → animated comparative output (see AI Feature 3).
- Lives on `/our-impact`. Client-side calculation + short AI-generated narrative sentence.

### `TimelineSection`
- Props: `steps: { title, description, image? }[]`.
- Used for "from fiber to finished garment" process explainers on Products category pages, and on About for company history.

### `CertificationGrid`
- Props: `certifications: { name, logo, description, issuer }[]`.
- Grid of certification logos with hover detail — used in the Governance & Certifications section of `/our-impact` (certifications no longer have their own top-level page).

### `TestimonialQuote`
- Props: `quote`, `attribution` (role/title level, avoid fabricating named individuals unless real and approved), `companyType` (e.g. "Global Activewear Brand") — use role/category attribution if real named quotes aren't available yet.

### `CTASection`
- Dark full-width band, `SectionHeading` + single `Button`, used as page-closer across the site.

### `ContactForm`
- React Hook Form + Zod, fields per `03-CONTENT-STRATEGY-COPY.md` Contact page spec, supports pre-fill from `CapabilityMatcher` output and from the Baby Wear catalogue's "Request This Catalogue" CTA via query params or shared state.

### `CommandSearch`
- `Cmd/Ctrl+K` overlay, powered by AI Feature 6 (Smart Search), keyboard navigable, renders `SearchResultItem` list.

### `Navbar` / `MegaMenu` / `Footer`
- Per structure in `02-SITE-ARCHITECTURE.md`: flat links for Home/Facility/Careers, mega-menus for Products and Our Impact, solid-accent Contact button, and `LanguageSwitcher` (below) placed at the end of the nav, just before the Contact button. Navbar transitions from transparent to solid on scroll (`useScroll` from Framer Motion). Built with Tailwind logical properties throughout so it mirrors correctly in RTL.

### `LanguageSwitcher`
- Props: `currentLocale`, `locales: { code, label, nativeLabel }[]`.
- A small globe-icon dropdown/button in the navbar (desktop) and as a row inside the mobile slide-out menu. Shows each language in its own native label (e.g. "العربية" not "Arabic") so visitors can recognize their language even if the current UI language isn't one they read.
- On selection: sets a locale cookie and client-side navigates to the same current page under the new locale prefix (e.g. `/en/products/denim` → `/ar/products/denim`), not back to the homepage — losing the visitor's place when they switch languages is a real friction point worth avoiding.
- Keyboard-operable dropdown, closes on `Escape`, focus returns to the trigger on close (same pattern as `CommandSearch`).

## Multilingual notes affecting several components above

- `AIChatWidget`: add a small in-panel language selector (reuses the same locale list as `LanguageSwitcher`) so a visitor can chat in a language other than the current site locale without switching the whole page. Defaults to matching site locale.
- `CapabilityMatcher` and `ContactForm`: all labels/options/validation messages come from the `next-intl` message files, not hardcoded strings — this is what makes the component actually translate rather than just the surrounding page chrome.
- `CommandSearch`: placeholder text and "no results" messaging are translated; the query itself and its results work across languages per the multilingual embeddings setup in `05-TECHNICAL-SPEC-STACK.md`.
- `FacilityMap`: `FacilityCard` popover content pulls from CMS locale fields with English fallback (see `05`'s i18n section) rather than being hardcoded English.

## Component build order

Build in this order so later components can compose earlier ones: `Button`, `Badge`, `Card`, `SectionHeading`, `StatNumber` → `Navbar`/`Footer`/`LanguageSwitcher` → `Hero`, `StatBar`, `ProductGrid`, `CTASection`, `TimelineSection` → `ContactForm`, `Modal` → `CatalogueEmbed`, `FacilityMap`, `CertificationGrid` → `AIChatWidget`, `CapabilityMatcher`, `SustainabilityEstimator`, `CommandSearch`.
