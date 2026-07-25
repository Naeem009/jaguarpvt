# 02 — Site Architecture & Navigation

## Sitemap

```
Home (/)
├── Company (/company)
│   ├── About Us (/company/about)
│   ├── Leadership (/company/leadership)
│   ├── Our History (/company/history)
│   └── Awards & Recognition (/company/awards)
├── Capabilities (/capabilities)
│   ├── Wovens (/capabilities/wovens)
│   ├── Knits (/capabilities/knits)
│   ├── Denim (/capabilities/denim)
│   ├── Design & Product Development (/capabilities/design-development)
│   └── Quality & Compliance (/capabilities/quality-compliance)
├── Innovation & Technology (/innovation)
│   ├── AI in Manufacturing (/innovation/ai) — see 04-AI-FEATURES-SPEC.md
│   ├── R&D and Material Innovation (/innovation/material-lab)
│   └── Digital Supply Chain (/innovation/digital-supply-chain)
├── Sustainability (/sustainability)
│   ├── Environmental Impact (/sustainability/environment)
│   ├── People & Communities (/sustainability/people)
│   ├── Governance & Ethics (/sustainability/governance)
│   └── ESG Reports & Downloads (/sustainability/reports)
├── Global Footprint (/global-footprint)      — interactive facility map
├── Certifications & Compliance (/certifications)
├── Newsroom / Insights (/newsroom)
│   └── /newsroom/[slug]
├── Careers (/careers)
│   └── /careers/[department]
├── Partner With Us (/partner)                 — primary conversion page (RFI/RFQ form)
└── Contact (/contact)
```

## Primary navigation (desktop mega-menu)

```
[Logo]   Capabilities ▾   Innovation ▾   Sustainability ▾   Global Footprint   Newsroom   [Partner With Us →]
```

- **Capabilities** mega-menu: 5 columns (Wovens, Knits, Denim, Design & Development, Quality & Compliance), each with a small representative image + one-line description — Stripe's product-menu pattern applied to manufacturing categories.
- **Innovation** mega-menu: 3 items (AI in Manufacturing, Material Lab, Digital Supply Chain), each with icon + description.
- **Sustainability** mega-menu: 4 items plus a "Download 2025 ESG Report" CTA pinned at the bottom.
- **Partner With Us** is the persistent primary CTA button in the nav, styled solid-accent, present on every page.
- Nav is sticky; transparent over the hero on Home, solid `--color-white` with hairline border once scrolled or on inner pages.

## Footer structure

4-column footer (Apple/Stripe pattern):

| Company | Capabilities | Resources | Connect |
|---|---|---|---|
| About | Wovens | Newsroom | Contact |
| Leadership | Knits | ESG Reports | Partner With Us |
| Careers | Denim | Certifications | LinkedIn |
| Awards | Design & Development | Careers | — |

Below: legal row (Privacy Policy, Terms, Cookie Preferences, Modern Slavery Statement — apparel manufacturers are expected to publish this), copyright, global footprint mini-stat ("XX facilities · XX countries · XX,000+ employees").

## URL & content model notes

- Use static generation (SSG/ISR) for all Capability, Sustainability, and Company pages — content changes infrequently.
- Newsroom uses the CMS with dynamic routes; support categories (Sustainability, Innovation, Company News, Awards).
- Careers can start as a simple listing page linking out to an ATS (Greenhouse/Lever) rather than building a full application flow — keep v1 scope tight.
- `/partner` is the single most important conversion point on the site — every CTA across the site ("Partner With Us," "Request Capability Deck," "Start a Conversation") routes here or opens a variant of this form as a modal.

## Page priority for v1 launch

1. Home
2. Capabilities (hub + 3 category pages: Wovens, Knits, Denim)
3. Sustainability (hub)
4. Innovation & AI (hub)
5. Global Footprint (map)
6. Partner With Us
7. About / Company
8. Certifications
9. Newsroom (can launch with 3–5 seed articles)
10. Careers (can launch as a simple page, expand later)
