import { routing } from "@/i18n/routing";

export const siteName = "Jaguar (Pvt) Ltd.";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaguarpvt.com";

export const marketingRoutes = [
  "",
  "/about",
  "/careers",
  "/contact",
  "/facility",
  "/our-impact",
  "/our-impact/environment",
  "/our-impact/people",
  "/our-impact/governance",
  "/products",
  "/products/wovens",
  "/products/knits",
  "/products/baby-wear",
] as const;

export type PageMetadataKey =
  | "home"
  | "about"
  | "careers"
  | "contact"
  | "facility"
  | "ourImpact"
  | "environment"
  | "people"
  | "governance"
  | "products"
  | "wovens"
  | "knits"
  | "babyWear";

export const pageMetadata: Record<
  PageMetadataKey,
  { path: string; title: string; description: string }
> = {
  home: {
    path: "",
    title: "Vertically Integrated Apparel Manufacturer",
    description:
      "Manufacturing partnerships across wovens, knits, and baby wear for global brands.",
  },
  about: {
    path: "/about",
    title: "About",
    description: "Company overview, history, leadership, and manufacturing footprint.",
  },
  careers: {
    path: "/careers",
    title: "Careers",
    description: "Explore manufacturing, quality, sustainability, and commercial opportunities.",
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description: "Submit an RFI or RFQ and start a sourcing conversation with our team.",
  },
  facility: {
    path: "/facility",
    title: "Facility",
    description: "Explore our global manufacturing footprint and facility capabilities.",
  },
  ourImpact: {
    path: "/our-impact",
    title: "Our Impact",
    description: "ESG programs across environment, people, and governance.",
  },
  environment: {
    path: "/our-impact/environment",
    title: "Environment",
    description: "Water stewardship, renewable energy, and environmental programs.",
  },
  people: {
    path: "/our-impact/people",
    title: "People & Communities",
    description: "Worker welfare and community programs across manufacturing locations.",
  },
  governance: {
    path: "/our-impact/governance",
    title: "Governance & Certifications",
    description: "Certifications, compliance systems, and governance structures.",
  },
  products: {
    path: "/products",
    title: "Products",
    description: "Explore wovens, knits, and baby wear manufacturing capabilities.",
  },
  wovens: {
    path: "/products/wovens",
    title: "Wovens",
    description: "Structured shirting, bottoms, and uniform manufacturing programs.",
  },
  knits: {
    path: "/products/knits",
    title: "Knits",
    description: "Jersey, fleece, and performance knit manufacturing programs.",
  },
  babyWear: {
    path: "/products/baby-wear",
    title: "Baby Wear",
    description: "Baby wear manufacturing programs and product catalogue.",
  },
};

export function buildAlternateLanguages(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      locale === routing.defaultLocale ? `${siteUrl}${path || "/"}` : `${siteUrl}/${locale}${path}`,
    ]),
  );
}
