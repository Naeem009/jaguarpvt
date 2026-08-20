export type SiteSearchEntry = {
  id: string;
  title: string;
  href: string;
  snippet: string;
  keywords: string[];
};

export type SiteSearchResult = {
  id: string;
  title: string;
  href: string;
  snippet: string;
};

const siteSearchIndex: SiteSearchEntry[] = [
  {
    id: "home",
    title: "Home",
    href: "/",
    snippet: "Manufacturing capability across casual wear, streetwear, activewear, denim, kidswear, and boutique.",
    keywords: ["home", "manufacturing", "apparel", "capabilities"],
  },
  {
    id: "about",
    title: "About",
    href: "/about",
    snippet: "Company hub — overview, strategy, mission, and policies.",
    keywords: ["about", "company", "overview"],
  },
  {
    id: "about-at-a-glance",
    title: "Jaguar at a Glance",
    href: "/about/at-a-glance",
    snippet: "Footprint, leadership, history, and company scale.",
    keywords: ["about", "glance", "overview", "history", "leadership", "footprint"],
  },
  {
    id: "about-strategy",
    title: "Our Strategy",
    href: "/about/strategy",
    snippet: "Strategic priorities — capacity, categories, and compliance-led growth.",
    keywords: ["strategy", "growth", "investment", "capacity", "compliance"],
  },
  {
    id: "about-mission",
    title: "Mission",
    href: "/about/mission",
    snippet: "Purpose, values, and partnership principles.",
    keywords: ["mission", "values", "purpose", "partnership"],
  },
  {
    id: "about-company-policy",
    title: "Company Policy",
    href: "/about/company-policy",
    snippet: "Ethics, labor standards, environmental responsibility, and governance.",
    keywords: ["policy", "ethics", "compliance", "governance", "labor", "standards"],
  },
  {
    id: "products",
    title: "Products",
    href: "/products",
    snippet: "Product categories and capability matcher.",
    keywords: ["products", "categories", "capability matcher"],
  },
  {
    id: "casual-wear",
    title: "Casual Wear",
    href: "/products/casual-wear",
    snippet: "Everyday apparel — tees, polos, loungewear, and soft-hand separates.",
    keywords: ["casual wear", "lounge wear", "basics", "everyday apparel"],
  },
  {
    id: "streetwear",
    title: "Streetwear",
    href: "/products/streetwear",
    snippet: "Urban apparel with premium construction and brand-led drops.",
    keywords: ["streetwear", "urban apparel", "drops", "hoodies"],
  },
  {
    id: "activewear",
    title: "Activewear",
    href: "/products/activewear",
    snippet: "Performance leggings, training tops, and sport layers.",
    keywords: ["activewear", "sportswear", "leggings", "performance apparel"],
  },
  {
    id: "denim",
    title: "Denim",
    href: "/products/denim",
    snippet: "Jeans, jackets, and skirts with wash development and shade control.",
    keywords: ["denim", "jeans", "denim wash", "five pocket"],
  },
  {
    id: "kidswear",
    title: "Kidswear",
    href: "/products/kidswear",
    snippet: "Children's apparel with soft-hand construction and compliance focus.",
    keywords: ["kidswear", "children's apparel", "kids clothing"],
  },
  {
    id: "boutique",
    title: "Boutique",
    href: "/products/boutique",
    snippet: "Small-batch programs with low minimums and refined construction.",
    keywords: ["boutique", "low moq", "small batch"],
  },
  {
    id: "our-impact",
    title: "Our Impact",
    href: "/our-impact",
    snippet: "ESG metrics, sustainability estimator, and impact pillars.",
    keywords: ["impact", "esg", "sustainability", "environment"],
  },
  {
    id: "environment",
    title: "Environment",
    href: "/our-impact/environment",
    snippet: "Water stewardship and renewable energy programs.",
    keywords: ["environment", "water", "renewable", "solar"],
  },
  {
    id: "people",
    title: "People & Communities",
    href: "/our-impact/people",
    snippet: "Worker welfare and community programs.",
    keywords: ["people", "communities", "worker welfare", "training"],
  },
  {
    id: "governance",
    title: "Governance & Certifications",
    href: "/our-impact/governance",
    snippet: "GOTS, OEKO-TEX, WRAP, and compliance programs.",
    keywords: ["governance", "certifications", "GOTS", "OEKO-TEX", "WRAP", "compliance"],
  },
  {
    id: "facility",
    title: "Facility",
    href: "/facility",
    snippet: "Global facility map and location intelligence.",
    keywords: ["facility", "facilities", "map", "footprint", "locations"],
  },
  {
    id: "careers",
    title: "Careers",
    href: "/careers",
    snippet: "Current openings, internships, and workplace culture.",
    keywords: ["careers", "jobs", "hiring", "culture", "openings", "internship"],
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact",
    snippet: "RFI and RFQ form for sourcing conversations.",
    keywords: ["contact", "rfi", "rfq", "inquiry", "sourcing"],
  },
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

export function searchSiteContent(query: string): SiteSearchResult[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return siteSearchIndex.slice(0, 8).map(({ id, title, href, snippet }) => ({
      id,
      title,
      href,
      snippet,
    }));
  }

  const tokens = normalizedQuery.split(" ").filter(Boolean);

  return siteSearchIndex
    .map((entry) => {
      const haystack = normalize([entry.title, entry.snippet, ...entry.keywords].join(" "));
      let score = 0;

      if (haystack.includes(normalizedQuery)) score += 8;
      for (const token of tokens) {
        if (haystack.includes(token)) score += 2;
      }

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ entry }) => ({
      id: entry.id,
      title: entry.title,
      href: entry.href,
      snippet: entry.snippet,
    }));
}
