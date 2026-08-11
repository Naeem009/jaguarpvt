# 01 — Brand & Design System

## Design philosophy

Three forces, blended:

1. **Apple discipline** — one idea per screen, generous whitespace, large confident type, cinematic full-bleed imagery, scroll-triggered reveals instead of clutter.
2. **Stripe polish** — precise 8pt grid, subtle gradient/mesh backgrounds behind key sections, restrained micro-interactions, typography that reads like great documentation: clear, technical, never breathless.
3. **Industrial credibility** (MAS/Crystal/Interloop/Artistic Milliners) — real facility photography, global footprint maps, hard numbers (facilities, employees, countries, tonnage, water saved), certification logos treated as trust signals, not badges bolted onto a template.

Avoid at all costs: stock-photo "smiling worker at sewing machine" clichés, clip-art icons, generic corporate blue-and-gray palettes, dense unstructured paragraphs.

## Color system

Derived directly from the Jaguar logo green, per your spec: **`#7EBB42`**. Contrast ratios below are calculated against pure white/near-black per WCAG 2.1 — the raw logo green only passes contrast checks on dark backgrounds, so two deepened working variants are defined for use on light backgrounds/white text.

```css
:root {
  /* Neutrals — do most of the work, Apple-style */
  --color-ink: #0B0C0B;         /* near-black, primary text */
  --color-charcoal: #16181A;    /* dark sections, footer */
  --color-graphite: #55585A;    /* secondary text — matches the logo's own subtext gray */
  --color-mist: #EEF0EC;        /* light section backgrounds, warm-neutral undertone */
  --color-paper: #FAFAF8;       /* page background */
  --color-white: #FFFFFF;

  /* Brand green — #7EBB42, now the site's primary accent */
  --color-accent-bright: #7EBB42; /* exact brand green — logo, icons, chart highlights, accents on dark backgrounds ONLY (2.3:1 vs white — not for text/small UI on light backgrounds) */
  --color-accent: #3F7A1A;        /* CTAs, primary buttons (white text) — 5.2:1 vs white, passes AA */
  --color-accent-dark: #3A6E18;   /* hover/pressed states, and accent used as TEXT/links on white — 6.1:1 vs white */
  --color-accent-tint: #EEF5E4;   /* accent backgrounds, chips, subtle section washes */

  /* Technology accent — used ONLY on AI-powered components (chat, matcher,
     estimator) to create a distinct "this is the tech layer" moment, so the
     site isn't all-green */
  --color-tech: #1F3FAD;
  --color-tech-tint: #EAF0FE;

  /* Semantic */
  --color-success: #3A6E18;      /* reuses accent-dark — brand green already reads as "success/growth" */
  --color-warning: #B8860B;
  --color-error: #C0392B;
}
```

Rules:
- Neutrals still do ~90% of the visual work. Brand green appears on CTAs, links, active nav states, icon accents, and data highlights — never as a large background fill (that would tip the site from "elegant corporate" into "logo soup").
- `--color-accent-bright` (the exact brand green, `#7EBB42`) is reserved for the logo itself, small icon fills, and accents placed on dark charcoal backgrounds, where it reads as vivid and premium (8.5:1 contrast vs near-black). It is not accessible enough for body text or UI on light backgrounds — use `--color-accent` or `--color-accent-dark` there instead.
- Dark sections (`--color-charcoal`) remain the high-impact statement moments (hero, big stat blocks, footer). This is also where `--color-accent-bright` gets to shine at full saturation against the dark background — e.g. stat numbers or a subtle glowing accent line.
- `--color-tech` (deep indigo) is scoped only to the AI-powered components — the sourcing chat widget, capability matcher, sustainability estimator, command search — wherever they appear across pages. It gives those tools a distinct, technical identity without diluting green as the singular brand color everywhere else.
- Sustainability content deliberately does **not** get its own separate green (a previous draft of this doc used a distinct "earth green" for ESG content — that's now redundant since the brand's primary color already reads as natural/sustainable). Differentiate sustainability sections through imagery and calmer motion instead of a second color.
- No gradients as decoration for their own sake. Reserve the subtle green-tinted mesh (homepage hero) and indigo-tinted mesh (`--color-tech`, AI-powered components) backgrounds for those specific moments — everywhere else stays flat and editorial, Apple-style.

## Logo usage

- Source file: `jaguar_logo.pdf` → export as `/public/logos/jaguar-logo.svg` (full color, for light backgrounds), `/public/logos/jaguar-logo-white.svg` (reversed to white/light gray, for use on `--color-charcoal` and hero-over-imagery contexts), and `/public/logos/jaguar-mark.svg` (icon/monogram only, if one exists, for the favicon and any square-format placement).
- Minimum clear space around the logo: equal to the height of the "J" in the wordmark, on all sides.
- Minimum display size: 120px wide in the nav, 80px wide in the footer — below that the "PRIVATE LIMITED" subtext stops being legible and the mark alone should be used instead.
- Never place the full-color logo over a busy photograph without a solid or gradient-scrim backing — use the white/reversed variant over imagery instead.
- Favicon: derive from the mark/monogram only, not the full wordmark, at 32×32 and 180×180 (apple-touch-icon) sizes.

## Typography

```css
--font-display: "Inter Tight", "SF Pro Display", -apple-system, sans-serif; /* headlines */
--font-body: "Inter", "SF Pro Text", -apple-system, sans-serif;             /* body */
--font-mono: "IBM Plex Mono", "SF Mono", monospace;                        /* stats, data, AI outputs */
```

Type scale (desktop / mobile):

| Role | Desktop | Mobile | Weight | Notes |
|---|---|---|---|---|
| Hero headline | 72–96px | 40–48px | 600 | Tight tracking (-0.02em), max 6 words |
| Section headline | 48–56px | 32px | 600 | One idea per headline |
| Subhead | 24–28px | 20px | 500 | Supporting statement under headline |
| Body large | 19–20px | 17px | 400 | Intro paragraphs |
| Body | 16px | 16px | 400 | Standard copy, line-height 1.6 |
| Caption/label | 13–14px | 13px | 500 | Uppercase, letter-spacing 0.06em, used for eyebrows/labels |
| Stat number | 56–80px | 40px | 700 | `--font-mono` or display font, used in stat blocks |

## Spacing & grid

- Base unit: 8px. All spacing in multiples of 8 (8/16/24/32/48/64/96/128/160).
- 12-column grid, max content width 1280px, gutters 24px (desktop), 16px (mobile).
- Section vertical rhythm: 96–160px padding top/bottom on desktop, 64px on mobile. Generosity here is what makes it feel like Apple rather than a generic template.

## Components — styling principles

- **Buttons**: pill or 8px-radius rectangle, one primary style (solid accent, white text), one secondary (ghost/outline), one tertiary (text + arrow, Stripe-style "Learn more →"). No more than one primary CTA visible per screen.
- **Cards**: 1px hairline border (`rgba(0,0,0,0.08)`) or soft shadow (`0 1px 3px rgba(0,0,0,0.06)`), 16–24px radius, generous internal padding (32px+).
- **Nav**: sticky, transparent-over-hero then solidifies on scroll (Apple pattern), mega-menu for Capabilities with imagery per category (Stripe's product-menu pattern).
- **Stat blocks**: huge mono/display numbers with small caption underneath, arranged in a row of 3–4, used to open Home, About, and Sustainability sections.
- **Facility/world map**: dark background, accent-colored dot markers, hover reveals facility card — this is the site's signature "we are global and real" moment, treat it as a hero-level component, not an afterthought.

## Motion principles

- Scroll-triggered fade + 16px translate-up on section entry (Framer Motion, `whileInView`), duration 0.5–0.6s, ease `[0.22, 1, 0.36, 1]`.
- Stat numbers count up from 0 when scrolled into view.
- No parallax excess — one subtle parallax layer max per page (hero imagery only).
- AI features get slightly more "alive" motion (typing indicators, streaming text, subtle glow/pulse on the AI chat trigger) to differentiate them as the technology layer of the site.
- Respect `prefers-reduced-motion` everywhere — disable scroll animation and count-ups, snap to final state.

## Imagery direction

- Commission or license real facility photography: wide architectural shots of factory floors, close-up material/texture macro shots (woven and knit fabric weave, fabric rolls), workers in modern PPE shown with dignity and context (not posed/staged smiling).
- Sustainability imagery: solar panel installations, water treatment facilities, real data dashboards — not leaves and green hands.
- Global footprint: use a stylized dark world map, not a literal Google Maps embed.
- Never use generic stock photography that could belong to any company — every image should look like it could only belong to this manufacturer.
- Optional finishing touch: a very slight, consistent color grade toward the neutral end (not a green filter over everything) keeps photography cohesive, with brand green reserved for UI elements layered on top rather than baked into the images themselves.

## Dark mode

Not required for launch (B2B sites are overwhelmingly viewed in light mode during business hours), but the charcoal-section pattern above means the design system already has a dark palette ready if dark mode is added later.
