import { routing } from "@/i18n/routing";

export const siteName = "Jaguar (Pvt) Ltd.";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaguarpvt.com";

export const marketingRoutes = [
  "",
  "/about",
  "/about/at-a-glance",
  "/about/strategy",
  "/about/mission",
  "/about/company-policy",
  "/careers",
  "/contact",
  "/facility",
  "/our-impact",
  "/our-impact/environment",
  "/our-impact/people",
  "/our-impact/governance",
  "/products",
  "/products/casual-wear",
  "/products/streetwear",
  "/products/activewear",
  "/products/denim",
  "/products/kidswear",
  "/products/boutique",
] as const;

export type PageMetadataKey =
  | "home"
  | "about"
  | "atAGlance"
  | "aboutStrategy"
  | "aboutMission"
  | "aboutCompanyPolicy"
  | "careers"
  | "contact"
  | "facility"
  | "ourImpact"
  | "environment"
  | "people"
  | "governance"
  | "products"
  | "casualWear"
  | "streetwear"
  | "activewear"
  | "denim"
  | "kidswear"
  | "boutique";

export const pageMetadata: Record<
  PageMetadataKey,
  { path: string; title: string; description: string; keywords: string[] }
> = {
  home: {
    path: "",
    title: "Vertically Integrated Apparel Manufacturer",
    description:
      "Jaguar (Pvt) Ltd. is a vertically integrated apparel manufacturer delivering casual wear, streetwear, activewear, denim, kidswear, and boutique programs for global brands with audited compliance and scalable production.",
    keywords: [
      "apparel manufacturer",
      "garment manufacturer",
      "vertically integrated apparel manufacturer",
      "clothing manufacturing partner",
      "global apparel supplier",
    ],
  },
  about: {
    path: "/about",
    title: "About",
    description:
      "Learn about Jaguar (Pvt) Ltd.—our history, leadership, manufacturing footprint, and long-term partnerships with international apparel brands.",
    keywords: ["about jaguar apparel", "garment company history", "textile manufacturer profile"],
  },
  atAGlance: {
    path: "/about/at-a-glance",
    title: "Jaguar at a Glance",
    description:
      "Company overview of Jaguar (Pvt) Ltd.—six facilities across five countries, leadership, history, and integrated apparel manufacturing at scale.",
    keywords: ["jaguar apparel overview", "garment manufacturer footprint", "textile company profile"],
  },
  aboutStrategy: {
    path: "/about/strategy",
    title: "Our Strategy",
    description:
      "Jaguar strategic priorities—category depth, geographic optionality, and compliance-led growth for long-term brand partnerships.",
    keywords: ["apparel manufacturing strategy", "textile growth strategy", "garment industry strategy"],
  },
  aboutMission: {
    path: "/about/mission",
    title: "Mission",
    description:
      "Jaguar mission and values—manufacturing partnerships built on proof, integration, and long-term program delivery for global brands.",
    keywords: ["jaguar mission", "apparel manufacturer values", "ethical manufacturing mission"],
  },
  aboutCompanyPolicy: {
    path: "/about/company-policy",
    title: "Company Policy",
    description:
      "Jaguar company policies—ethics, labor standards, environmental responsibility, health and safety, and governance commitments.",
    keywords: ["garment factory policies", "apparel compliance policy", "textile ethics policy"],
  },
  careers: {
    path: "/careers",
    title: "Careers",
    description:
      "Explore careers at Jaguar (Pvt) Ltd. in manufacturing operations, quality, sustainability, product development, and commercial teams.",
    keywords: ["apparel manufacturing jobs", "textile factory careers", "garment industry jobs"],
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description:
      "Contact Jaguar (Pvt) Ltd. to submit an RFI or RFQ for casual wear, streetwear, activewear, denim, kidswear, or boutique programs. Our sourcing team responds within two business days.",
    keywords: [
      "apparel manufacturer contact",
      "garment sourcing inquiry",
      "RFQ apparel manufacturing",
      "clothing supplier quote",
    ],
  },
  facility: {
    path: "/facility",
    title: "Facility",
    description:
      "Explore Jaguar manufacturing facilities, process capabilities, and production departments—from yarn intake through packing and quality assurance.",
    keywords: [
      "apparel factory locations",
      "garment manufacturing facilities",
      "textile production capabilities",
      "Faisalabad apparel factory",
    ],
  },
  ourImpact: {
    path: "/our-impact",
    title: "Our Impact",
    description:
      "Review Jaguar (Pvt) Ltd. ESG impact across environment, people and communities, and governance with certifications and compliance programs.",
    keywords: ["sustainable apparel manufacturing", "ESG garment factory", "ethical textile production"],
  },
  environment: {
    path: "/our-impact/environment",
    title: "Environment",
    description:
      "Environmental programs at Jaguar facilities including water stewardship, renewable energy, and waste reduction for responsible apparel manufacturing.",
    keywords: ["sustainable textile factory", "water stewardship apparel", "green garment manufacturing"],
  },
  people: {
    path: "/our-impact/people",
    title: "People & Communities",
    description:
      "Worker welfare, safety training, and community programs across Jaguar apparel manufacturing locations.",
    keywords: ["factory worker welfare", "apparel workforce programs", "ethical manufacturing people"],
  },
  governance: {
    path: "/our-impact/governance",
    title: "Governance & Certifications",
    description:
      "Governance, audit readiness, and certifications including GOTS, OEKO-TEX, WRAP, and ISO programs at Jaguar manufacturing sites.",
    keywords: ["GOTS certified manufacturer", "OEKO-TEX apparel factory", "WRAP certified garment supplier"],
  },
  products: {
    path: "/products",
    title: "Products",
    description:
      "Explore Jaguar product manufacturing across casual wear, streetwear, activewear, denim, kidswear, and boutique programs.",
    keywords: ["apparel product categories", "garment manufacturing capabilities", "clothing production programs"],
  },
  casualWear: {
    path: "/products/casual-wear",
    title: "Casual Wear",
    description:
      "Casual wear manufacturing for tees, polos, loungewear, and everyday separates with integrated cutting, sewing, and finishing.",
    keywords: ["casual wear manufacturer", "everyday apparel supplier", "lounge wear factory"],
  },
  streetwear: {
    path: "/products/streetwear",
    title: "Streetwear",
    description:
      "Streetwear manufacturing for urban apparel, premium trims, and brand-led drops with specialized construction and wash programs.",
    keywords: ["streetwear manufacturer", "urban apparel factory", "streetwear supplier"],
  },
  activewear: {
    path: "/products/activewear",
    title: "Activewear",
    description:
      "Activewear manufacturing for leggings, training tops, and performance layers with stretch recovery and moisture management.",
    keywords: ["activewear manufacturer", "performance apparel factory", "sportswear supplier"],
  },
  denim: {
    path: "/products/denim",
    title: "Denim",
    description:
      "Denim manufacturing for jeans, jackets, and skirts with wash development, shade control, and brand-ready finishing.",
    keywords: ["denim manufacturer", "jeans factory", "denim wash supplier"],
  },
  kidswear: {
    path: "/products/kidswear",
    title: "Kidswear",
    description:
      "Kidswear manufacturing with soft-hand construction, secure attachments, and compliance-focused finishing.",
    keywords: ["kidswear manufacturer", "children's apparel factory", "kids clothing supplier"],
  },
  boutique: {
    path: "/products/boutique",
    title: "Boutique",
    description:
      "Boutique and small-batch apparel programs with low minimums, refined construction, and catalogue-ready styles.",
    keywords: ["boutique clothing manufacturer", "low moq apparel factory", "small batch garment supplier"],
  },
};

export const pageOgImages: Record<PageMetadataKey, string> = {
  home: "/images/home/hero.jpg",
  about: "/images/about/hero.jpg",
  atAGlance: "/images/about/at-a-glance/hero.jpg",
  aboutStrategy: "/images/about/strategy/hero.jpg",
  aboutMission: "/images/about/mission/hero.jpg",
  aboutCompanyPolicy: "/images/about/company-policy/hero.jpg",
  careers: "/images/careers/hero.jpg",
  contact: "/images/contact/hero.jpg",
  facility: "/images/facility/hero.jpg",
  ourImpact: "/images/our-impact/environment/hero.jpg",
  environment: "/images/our-impact/environment/hero.jpg",
  people: "/images/our-impact/people/hero.jpg",
  governance: "/images/our-impact/governance/hero.jpg",
  products: "/images/products/casual-wear/hero.jpg",
  casualWear: "/images/products/casual-wear/hero.jpg",
  streetwear: "/images/products/streetwear/hero.jpg",
  activewear: "/images/products/activewear/hero.jpg",
  denim: "/images/products/denim/hero.jpg",
  kidswear: "/images/products/kidswear/hero.jpg",
  boutique: "/images/products/boutique/hero.jpg",
};

export function buildAlternateLanguages(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      locale === routing.defaultLocale ? `${siteUrl}${path || "/"}` : `${siteUrl}/${locale}${path}`,
    ]),
  );
}
