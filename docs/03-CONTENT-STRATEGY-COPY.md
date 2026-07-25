# 03 — Content Strategy & Copy

## Voice & tone

Confident, precise, and human — the register of a company that doesn't need to oversell because the numbers speak for themselves. Closer to Stripe's documentation clarity than to typical "we are passionate about excellence" corporate copy.

**Do:**
- Short, declarative sentences. Lead with the fact, not the adjective.
- Specific numbers over vague superlatives ("42 facilities across 6 countries" beats "a global leader").
- Active voice, present tense for capability statements.
- Let photography and data carry emotional weight; let copy stay precise.

**Don't:**
- "World-class," "cutting-edge," "synergy," "passionate about excellence" — banned words.
- Exclamation points.
- Consumer-marketing urgency ("Don't miss out," "Limited time").
- Overlong paragraphs — 2–3 sentences max before a break, stat, or image.

## Writing for translation

All English copy is the canonical source that gets translated into the site's five other languages (Arabic, Chinese, Spanish, French, German — see `04-AI-FEATURES-SPEC.md` for the full multilingual approach). This voice already translates well since it's plain and declarative, but a few extra habits make translation cheaper and more accurate:

- Avoid idioms and culturally-specific metaphors ("home run," "moving the needle") — they either don't translate or need a translator to invent a workaround, which introduces drift from the source meaning.
- Keep sentences syntactically simple (one clause where possible) — easier to translate accurately, and Arabic/Chinese sentence structures diverge more from English the more nested a sentence gets.
- Never bake certification names, numbers, or units into a sentence in a way that requires reordering to translate (e.g. prefer "GOTS-certified since 2019" over a sentence structure where "GOTS" is buried mid-clause) — this makes it easy for a translator (or the AI assistant, per `04`) to preserve those terms untouched.
- Flag any wordplay-dependent copy (puns, alliteration in headlines) as English-only if it won't survive translation — better to note "this headline is English-only, needs a fresh one per locale" than to force a literal translation that reads oddly.

## Messaging pillars (every page should reinforce at least one)

1. **Scale & Reliability** — "We can take your order from concept to container, at the volume global brands require."
2. **Innovation, including AI** — "We build the tools that make sourcing decisions faster and more transparent."
3. **Sustainability & Ethics** — "Verified impact data, not claims." Certifications, water/carbon figures, worker welfare programs.
4. **Partnership, not vendor relationship** — "We work inside your product development process, not just your purchase orders."

## Homepage copy outline

1. **Hero**: Headline (≤6 words) stating category + differentiator. e.g. `[TAGLINE — e.g. "Manufacturing, engineered for what's next."]` Subhead: one sentence naming categories (wovens, knits, denim, baby wear) + scale. Primary CTA: "Contact Us." Secondary: "Explore Products."
2. **Stat bar**: 4 numbers — facilities, countries, employees, years in operation.
3. **Products preview**: 4 cards (Wovens / Knits / Denim / Baby Wear) linking to category pages.
4. **AI assistant teaser**: "Ask our sourcing assistant what we can build for you" — live mini-demo of the chat widget embedded inline (the widget itself is global/persistent site-wide; this section just gives it a moment of visibility on Home).
5. **Impact proof**: 3 headline metrics (e.g. water saved, renewable energy %, certified facilities) + link to `/our-impact`.
6. **Facility teaser**: dark map section, "See where we manufacture" → `/facility`.
7. **Brand partner trust strip**: logos (use only if real client permission exists — otherwise use category language: "Trusted by leading activewear, denim, and lifestyle brands").
8. **Closing CTA band**: dark section, single line + "Contact Us" button.

## Products pages (per category: Wovens / Knits / Denim)

1. Hero: category name + one-line positioning.
2. Process overview: from-fiber-to-finished-garment steps, visual timeline.
3. Technical specs: machinery, certifications, capacity ranges (present as a clean data table, not marketing prose).
4. Sustainability angle specific to this category (e.g. denim → water reduction techniques).
5. Related innovation, if relevant (e.g. a material innovation note).
6. CTA: "Discuss a [Category] Program" → `/contact`.

## Products / Baby Wear page — additional outline

Baby Wear follows the same template as the other three categories (hero, process, specs, sustainability angle) plus one additional section:

7. **Catalogue section** ("Browse the Baby Wear Catalogue"): one line of context copy, the embedded e-catalogue viewer (see `02-SITE-ARCHITECTURE.md` and `06-COMPONENT-LIBRARY-SPEC.md` for the component spec), a "Download PDF" fallback button, and a closing "Request This Catalogue" CTA to `/contact` with the product category pre-filled.

## Our Impact hub copy outline

1. Hero stat block (biggest 3–4 ESG numbers).
2. Three pillars: Environment / People & Communities / Governance & Certifications, each with its own metrics and a link to the deeper page.
3. Downloadable ESG report CTA (gated or ungated — recommend ungated for trust; gate only if lead-gen is a priority).
4. Certifications grid, presented within the Governance & Certifications section (certifications no longer have a separate top-level page).

## AI features — no dedicated page

There is no standalone "Innovation & AI" page in this version of the site. The AI features (sourcing assistant, capability matcher, sustainability estimator, smart search) are distributed components embedded directly into the pages they're most useful on — see `04-AI-FEATURES-SPEC.md` for exactly where each one lives now. When writing copy for any page that includes one of these components, keep the same framing used previously: these are *decision tools for buyers*, not novelties, and any AI-generated figures should carry a brief, honest disclaimer about data sources.

## Contact (conversion page) copy outline

1. Short hero: "Tell us what you're building."
2. Form fields: Company name, contact name, email, brand/company website, product category (wovens/knits/denim/baby wear/multiple), estimated annual volume (ranges, not exact numbers), sustainability requirements (checkboxes), message.
3. What happens next: 3-step expectation setter ("We respond within 2 business days," etc.) — reduces friction, very Stripe-like in its plainness.
4. Alternative contact: regional sales contacts / email, for buyers who don't want to use a form.

## CTA vocabulary (use consistently, never mix with e-commerce language)

Primary: **Contact Us**
Secondary: **Explore Products**, **View Facility**, **Download ESG Report**, **Request This Catalogue**, **Request a Product Deck**

Never use: Buy, Shop, Add to Cart, Order Now, Checkout, Price.
