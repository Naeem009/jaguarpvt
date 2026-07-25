# 05 — Technical Specification & Stack

## Core stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSG/ISR for content pages, API routes for AI features, great image optimization |
| Language | TypeScript | Type safety across CMS content, form data, AI response shapes |
| Styling | Tailwind CSS + CSS variables for design tokens from `01-BRAND-DESIGN-SYSTEM.md` | Matches the token-based system directly |
| Motion | Framer Motion | Scroll-triggered reveals, count-ups, chat streaming UI |
| CMS | Sanity (recommended) or Contentful | Newsroom/Insights, structured facility data for the map, structured capability data for the AI knowledge base |
| Hosting | Vercel | Native Next.js support, edge functions for AI routes |
| AI | Claude API (Anthropic) via serverless routes | Chat assistant, capability matcher narrative, digest drafting tool |
| Vector store | Pinecone, Weaviate, or Vercel-native (e.g. `@vercel/postgres` + `pgvector`) | RAG index over capability/sustainability/facility content |
| Maps | Mapbox GL JS (custom dark style) or a hand-built SVG world map for full design control | `01`'s "stylized dark map" direction — avoid default Google Maps chrome |
| Forms | React Hook Form + Zod validation, submit to serverless route → CRM webhook (HubSpot/Salesforce) or email | `/partner` conversion form |
| Analytics | Plausible or Fathom (privacy-first) or GA4 | B2B buyers are wary of heavy tracking; privacy-first fits the trust positioning |

## Repo structure (suggested)

```
/app
  /(marketing)
    /page.tsx                        → Home
    /company/...
    /capabilities/...
    /innovation/
      /page.tsx
      /ai/page.tsx
      /material-lab/page.tsx
    /sustainability/...
    /global-footprint/page.tsx
    /certifications/page.tsx
    /newsroom/
      /page.tsx
      /[slug]/page.tsx
    /careers/page.tsx
    /partner/page.tsx
  /api
    /ai/
      /assistant/route.ts            → Feature 1
      /matcher/route.ts              → Feature 2
      /search/route.ts               → Feature 6
    /partner-form/route.ts
/components
  /ui                                → buttons, cards, inputs (design-system primitives)
  /sections                          → Hero, StatBar, FacilityMap, CapabilityGrid, AIChatWidget, etc.
/lib
  /cms.ts                            → CMS client + typed content fetchers
  /ai.ts                             → Claude API client wrapper, RAG retrieval helper
  /analytics.ts
/docs                                → this doc set
/public
```

## AI backend pattern (all three AI API routes)

```ts
// /app/api/ai/assistant/route.ts (illustrative shape)
export async function POST(req: Request) {
  const { query, history } = await req.json();
  const context = await retrieveRelevantContent(query); // vector search over CMS content
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 800,
    system: buildGroundedSystemPrompt(context), // instructs model to only use provided context
    messages: [...history, { role: "user", content: query }],
  });
  return streamResponse(response);
}
```

Never call the Claude API directly from the client — API key stays server-side only.

## Performance targets

- Lighthouse Performance ≥ 90 on Home, Capabilities, Sustainability, AI hub.
- LCP < 2.0s, CLS < 0.05, INP < 200ms.
- All hero/section imagery served via `next/image` with responsive `sizes`, AVIF/WebP.
- Facility map and AI chat widget lazy-loaded (`next/dynamic`, `ssr:false` where appropriate) so they don't block initial content paint.
- Total JS on first load kept lean — mega-menu and chat widget code-split.

## Accessibility

- WCAG 2.1 AA baseline (full checklist in `08-SEO-PERFORMANCE-ACCESSIBILITY.md`).
- All interactive AI components (chat, matcher, search) must be fully keyboard-operable and screen-reader announced (ARIA live regions for streaming AI responses).

## Environments

- `main` → production (Vercel)
- `staging` → preview deployments per PR
- Environment variables: `ANTHROPIC_API_KEY`, `CMS_API_TOKEN`, `MAPBOX_TOKEN`, `CRM_WEBHOOK_URL` — all server-side only, never `NEXT_PUBLIC_*` for secrets.

## Testing

- Component tests: Vitest + React Testing Library for `/components/ui` and `/components/sections`.
- E2E: Playwright — critical paths are the `/partner` form submission and the AI assistant happy path.
- Visual regression optional (Chromatic) given the design-heavy nature of the site.
