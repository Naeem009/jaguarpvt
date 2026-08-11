# 02 — Site Architecture & Navigation

## Sitemap

Every route below is served under a locale prefix (`/en/...`, `/ar/...`, `/zh/...`, `/es/...`, `/fr/...`, `/de/...`) via `next-intl` — see `05-TECHNICAL-SPEC-STACK.md` for the routing/middleware setup. The paths below are shown without the prefix for readability; English is configured as the default and doesn't force a visible `/en` in the URL.

```
Home (/)
├── About (/about)
│   └── (sections on one page: Company Overview, Leadership, History, Awards —
│        kept as a single scrollable page rather than sub-pages, see note below)
├── Products (/products)
│   ├── Wovens (/products/wovens)
│   ├── Knits (/products/knits)
│   └── Baby Wear (/products/baby-wear)          — includes embedded e-catalogue, see below
├── Our Impact (/our-impact)                       — sustainability/ESG + certifications
│   ├── Environment (/our-impact/environment)
│   ├── People & Communities (/our-impact/people)
│   └── Governance & Certifications (/our-impact/governance)
├── Facility (/facility)                           — interactive global facility map,
│                                                       PLUS an in-depth "Process & Capabilities"
│                                                       section covering every production stage
│                                                       (see below)
├── Careers (/careers)
│   └── /careers/[department]
└── Contact (/contact)                             — primary conversion page (RFI/RFQ form)
```

**Note on collapsing the IA**: this is a leaner structure than earlier drafts of this doc. Certifications and the AI/Innovation hub are no longer standalone nav items — certifications now live as a section inside **Our Impact → Governance**, and the AI features (chat assistant, capability matcher, sustainability estimator, smart search) are now *distributed components embedded within the relevant pages* rather than a dedicated "Innovation" page (see `04-AI-FEATURES-SPEC.md` for the updated per-feature locations). Newsroom/Insights is not part of the primary nav in this version — treat it as optional, footer-linked-only content for a later phase, not a v1 requirement.

## Primary navigation (desktop)

```
[Logo]   Home   About   Products ▾   Our Impact ▾   Facility   Careers   [🌐 EN ▾]   [Contact →]
```

- **Home**, **Facility**, and **Careers** are flat links — no dropdown.
- **Products** opens a mega-menu with 3 columns: Wovens, Knits, Baby Wear — each with a small representative image + one-line description (Stripe's product-menu pattern). Baby Wear's menu item can carry a small "Catalogue" badge to hint at the embedded e-catalogue on that page.
- **Our Impact** opens a mega-menu with 3 items: Environment, People & Communities, Governance & Certifications, plus a "Download ESG Report" CTA pinned at the bottom.
- **`[🌐 EN ▾]`** is the `LanguageSwitcher` (see `06-COMPONENT-LIBRARY-SPEC.md`) — a small dropdown showing the current language and revealing the other five on click, positioned just before the Contact button.
- **Contact** is the persistent primary CTA button in the nav, styled solid-accent (`--color-accent`), present on every page — this replaces the earlier "Partner With Us" button; the RFI/RFQ form now lives at `/contact` directly rather than a separate `/partner` route.
- Nav is sticky; transparent over the hero on Home, solid `--color-white` with hairline border once scrolled or on inner pages. In RTL locales the entire nav mirrors (logo right-aligned, menu order reversed) rather than just the text direction flipping.

## Mobile navigation

Collapse to a standard slide-out/hamburger menu in the same order as desktop: Home, About, Products (expandable to show the 4 categories), Our Impact (expandable to show the 3 sections), Facility, Careers, a language row (same `LanguageSwitcher`, shown as a horizontal list of language chips rather than a dropdown on mobile), Contact (as a full-width button at the bottom of the menu, not just a link).

## Footer structure

4-column footer (Apple/Stripe pattern):

| Company | Products | Our Impact | Connect |
|---|---|---|---|
| About | Wovens | Environment | Contact |
| Careers | Knits | People & Communities | LinkedIn |
| Facility | Baby Wear | Governance & Certifications | — |
| — | — | ESG Reports | — |

Below: legal row (Privacy Policy, Terms, Cookie Preferences, Modern Slavery Statement — apparel manufacturers are expected to publish this), copyright, global footprint mini-stat ("XX facilities · XX countries · XX,000+ employees"). Optionally repeat the `LanguageSwitcher` in the footer as a secondary access point — cheap to add once the nav version exists, and helps visitors who scroll straight to the footer without noticing the nav control.

## URL & content model notes

- Use static generation (SSG/ISR) for About, Products, and Our Impact pages — content changes infrequently.
- `Products/Baby Wear` needs one dynamic piece: the embedded e-catalogue file (see below) — everything else on that page is static.
- Careers can start as a simple listing page linking out to an ATS (Greenhouse/Lever) rather than building a full application flow — keep v1 scope tight.
- `/contact` is the single most important conversion point on the site — every CTA across the site ("Contact Us," "Request a Catalogue," "Start a Conversation") routes here or opens a variant of this form as a modal.

## Baby Wear e-catalogue — space reservation

On `/products/baby-wear`, reserve a dedicated full-width section (below the standard hero/process/specs sections that every Products category page has) titled something like **"Browse the Baby Wear Catalogue"**:

- Layout: a contained panel (max-width ~960px, centered, `Card` styling with a slightly taller shadow to lift it off the page) housing an embedded document viewer.
- File: a single PDF uploaded to `/public/catalogues/baby-wear-catalogue.pdf` (see `05-TECHNICAL-SPEC-STACK.md` for the exact component and embed approach).
- Above the embed: one line of context copy ("Explore our full Baby Wear range — fabrics, sizing, and finishing options.") and a **Download PDF** button as a fallback for anyone who'd rather not scroll an embedded viewer.
- Below the embed: the standard Contact/RFQ CTA, since browsing the catalogue is exactly the moment a buyer is most likely to want to start a conversation.
- Until the real file is uploaded, show a clearly-labeled placeholder state ("Catalogue coming soon") rather than a broken embed — see the component spec for the empty-state pattern.

## Facility — "Process & Capabilities" section

Below the interactive facility map on `/facility`, add a second major section covering every production stage in detail, with capacity data and imagery. This is the site's deepest proof-of-scale content — sourcing managers reading this page want to see exactly what happens on the floor, not just where the floor is.

**Grouping** (5 categories, 15 departments total — matches the natural production flow, not alphabetical order):

1. **Raw Material & Testing**: Yarn Warehouse, Dyeing Lab
2. **Fabric Production**: Knitting, Dyeing
3. **Embellishment**: Screen Printing, Embroidery
4. **Cut, Sew & Wet Processing**: Cutting, Stitching, Garment Dyeing, Garment Washing
5. **Finishing & Quality Assurance**: Finishing, Quality Control (QC), Metal Detection, Audits, Packing

**Layout**: category tabs or an accordion (5 groups) so the section doesn't read as an undifferentiated wall of 15 cards — each category expands to reveal its department cards. Within a category, department cards render in a grid (`DepartmentGrid`/`DepartmentCard`, see `06-COMPONENT-LIBRARY-SPEC.md`).

**Per department, show**:
- Name and a one-line description of what happens at that stage.
- A capacity stat (machine count, daily/monthly output, storage volume, or similar — whatever's the most meaningful number for that specific department; see the data structure in `05-TECHNICAL-SPEC-STACK.md`).
- One representative photo (to be uploaded — placeholder image until then, per the standard placeholder pattern used elsewhere).
- "Audits" is the one department without a throughput-style capacity — show its scope instead (which audit types/standards, and frequency) rather than forcing a fake numeric stat onto it.

**Placement note**: this section describes the flagship/primary facility's internal process flow. If the company later documents multiple sites each with different department configurations, this section can be adapted to render per-facility (selected via the map) rather than as one fixed list — build the data structure in `05-TECHNICAL-SPEC-STACK.md` with that extension in mind (a `facilityId` field on each department entry, even if only one facility's data exists at first).

**Data readiness**: capacities and images are marked as placeholders until real figures/photos are provided — never publish an invented capacity number.

## Page priority for v1 launch

1. Home
2. Products (hub + Wovens, Knits, **Baby Wear with catalogue embed**)
3. Our Impact (hub + Environment/People/Governance)
4. Facility (map + **Process & Capabilities**)
5. Contact
6. About
7. Careers (can launch as a simple page, expand later)
