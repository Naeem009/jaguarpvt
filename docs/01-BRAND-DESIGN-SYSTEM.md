# 01 — Brand & Design System

## Design philosophy

Three forces, blended:

1. **Apple discipline** — one idea per screen, generous whitespace, large confident type, cinematic full-bleed imagery, scroll-triggered reveals instead of clutter.
2. **Stripe polish** — precise 8pt grid, subtle gradient/mesh backgrounds behind key sections, restrained micro-interactions, typography that reads like great documentation: clear, technical, never breathless.
3. **Industrial credibility** (MAS/Crystal/Interloop/Artistic Milliners) — real facility photography, global footprint maps, hard numbers (facilities, employees, countries, tonnage, water saved), certification logos treated as trust signals, not badges bolted onto a template.

Avoid at all costs: stock-photo "smiling worker at sewing machine" clichés, clip-art icons, generic corporate blue-and-gray palettes, dense unstructured paragraphs.

## Color system

Define as CSS variables / Tailwind theme extension. Replace hex values with actual brand colors — these are placeholder directions.

```css
:root {
  /* Neutrals — do most of the work, Apple-style */
  --color-ink: #0B0B0C;         /* near-black, primary text */
  --color-charcoal: #1C1D1F;    /* dark sections, footer */
  --color-graphite: #4A4B4E;    /* secondary text */
  --color-mist: #E8E8E6;        /* light section backgrounds */
  --color-paper: #FAFAF9;       /* page background */
  --color-white: #FFFFFF;

  /* Brand accent — pick ONE confident color, use sparingly (Stripe-style restraint) */
  --color-accent: #0F62FE;      /* CTAs, links, active states, data highlights */
  --color-accent-dark: #0043CE;
  --color-accent-tint: #EAF1FF; /* accent backgrounds, chips */

  /* Sustainability/ESG accent — secondary, used only on Sustainability content */
  --color-earth: #1E5B3D;
  --color-earth-tint: #E6F0EA;

  /* Semantic */
  --color-success: #1E7D3C;
  --color-warning: #B8860B;
  --color-error: #C0392B;
}
```

Rules:
- Neutrals do 90% of the visual work. The accent color appears only on CTAs, links, active nav states, and data highlights — never as large background fills.
- Dark sections (`--color-charcoal`) are used for high-impact statement moments (hero, big stat blocks, footer) — Apple-style contrast breaks, not more than 2–3 per page.
- No gradients as decoration for their own sake — reserve subtle mesh/gradient backgrounds (Stripe-style) for the homepage hero and AI feature sections only, to make those feel distinctly "technology" moments against the more editorial rest of the site.

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

- Commission or license real facility photography: wide architectural shots of factory floors, close-up material/texture macro shots (denim weave, fabric rolls), workers in modern PPE shown with dignity and context (not posed/staged smiling).
- Sustainability imagery: solar panel installations, water treatment facilities, real data dashboards — not leaves and green hands.
- Global footprint: use a stylized dark world map, not a literal Google Maps embed.
- Never use generic stock photography that could belong to any company — every image should look like it could only belong to this manufacturer.

## Dark mode

Not required for launch (B2B sites are overwhelmingly viewed in light mode during business hours), but the charcoal-section pattern above means the design system already has a dark palette ready if dark mode is added later.
