# 06 — Component Library Specification

All components consume tokens from `01-BRAND-DESIGN-SYSTEM.md`. Build as typed React components in `/components/ui` (primitives) and `/components/sections` (page-section-level compositions).

## Primitives (`/components/ui`)

| Component | Props (key ones) | Notes |
|---|---|---|
| `Button` | `variant: 'primary' \| 'secondary' \| 'tertiary'`, `size`, `href?`, `onClick?` | Primary = solid accent; secondary = outline; tertiary = text + arrow |
| `Badge` | `tone: 'neutral' \| 'accent' \| 'earth'` | Used for certification chips, category labels |
| `Card` | `variant: 'default' \| 'stat' \| 'interactive'` | Hairline border, 16–24px radius |
| `Input` / `Select` / `Checkbox` | standard RHF-compatible | Used in Partner form and AI Matcher |
| `StatNumber` | `value`, `suffix?`, `animateOnView` | Count-up animation, mono/display font |
| `SectionHeading` | `eyebrow?`, `title`, `subhead?`, `align` | Consistent heading pattern across all sections |
| `Modal` | `open`, `onClose` | Used for embedded Partner form pop-up |

## Section components (`/components/sections`)

### `Hero`
- Props: `headline`, `subhead`, `primaryCTA`, `secondaryCTA`, `media` (image or video), `variant: 'home' | 'inner'`.
- Home variant: full-viewport height, dark overlay gradient, sticky-transparent nav sits on top.
- Inner-page variant: shorter (60vh), used on Capabilities/Sustainability/etc.

### `StatBar`
- Props: `stats: { value, label, suffix? }[]`.
- Row of 3–4 `StatNumber`s, count up when scrolled into view.

### `CapabilityGrid`
- Props: `items: { title, image, href, description }[]`.
- Used on Home (3-card teaser) and Capabilities hub (full grid).

### `FacilityMap`
- Props: `facilities: Facility[]`, `filterEnabled?: boolean`.
- Dark stylized world map (Mapbox custom style or hand-built SVG), accent-colored markers, hover/click opens a `FacilityCard` popover.
- If `filterEnabled`, renders the natural-language filter input above the map (AI Feature 4).
- Must lazy-load; heaviest component on the site.

### `AIChatWidget`
- Props: `mode: 'floating' | 'embedded'`, `context?: string` (page-specific hint for the assistant).
- Floating mode: bottom-right launcher, expands to chat panel, streams responses, shows source citation chips, persistent "Talk to a human" link to `/partner`.
- Embedded mode: full-width inline version used on `/innovation/ai` and homepage teaser, pre-seeded with 2–3 example questions as clickable chips.

### `CapabilityMatcher`
- Multi-step form (see AI Feature 2 spec), 4–5 steps, progress indicator, animated step transitions.
- Final step renders AI-generated match summary + "Send to our team" CTA that pre-fills `PartnerForm`.

### `SustainabilityEstimator`
- Inputs (category, volume, material) → animated comparative output (see AI Feature 3).
- Client-side calculation + short AI-generated narrative sentence.

### `TimelineSection`
- Props: `steps: { title, description, image? }[]`.
- Used for "from fiber to finished garment" process explainers on Capability pages, and Company History.

### `CertificationGrid`
- Props: `certifications: { name, logo, description, issuer }[]`.
- Grid of certification logos with hover detail — used on Certifications page and Sustainability hub.

### `NewsroomCard` / `NewsroomGrid`
- Standard CMS-driven article card: image, category badge, title, date, excerpt.

### `TestimonialQuote`
- Props: `quote`, `attribution` (role/title level, avoid fabricating named individuals unless real and approved), `companyType` (e.g. "Global Activewear Brand") — use role/category attribution if real named quotes aren't available yet.

### `CTASection`
- Dark full-width band, `SectionHeading` + single `Button`, used as page-closer across the site.

### `PartnerForm`
- React Hook Form + Zod, fields per `03-CONTENT-STRATEGY-COPY.md` Partner page spec, supports pre-fill from `CapabilityMatcher` output via query params or shared state.

### `CommandSearch`
- `Cmd/Ctrl+K` overlay, powered by AI Feature 6, keyboard navigable, renders `SearchResultItem` list.

### `Navbar` / `MegaMenu` / `Footer`
- Per structure in `02-SITE-ARCHITECTURE.md`. Navbar transitions from transparent to solid on scroll (`useScroll` from Framer Motion).

## Component build order

Build in this order so later components can compose earlier ones: `Button`, `Badge`, `Card`, `SectionHeading`, `StatNumber` → `Navbar`/`Footer` → `Hero`, `StatBar`, `CapabilityGrid`, `CTASection`, `TimelineSection` → `PartnerForm`, `Modal` → `FacilityMap`, `CertificationGrid`, `NewsroomCard` → `AIChatWidget`, `CapabilityMatcher`, `SustainabilityEstimator`, `CommandSearch`.
