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
    snippet: "Manufacturing capability across wovens, knits, and baby wear.",
    keywords: ["home", "manufacturing", "apparel", "capabilities"],
  },
  {
    id: "about",
    title: "About",
    href: "/about",
    snippet: "Company overview, history, leadership, and recognition.",
    keywords: ["about", "company", "history", "leadership", "mission"],
  },
  {
    id: "products",
    title: "Products",
    href: "/products",
    snippet: "Product categories and capability matcher.",
    keywords: ["products", "categories", "capability matcher"],
  },
  {
    id: "wovens",
    title: "Wovens",
    href: "/products/wovens",
    snippet: "Structured shirting, bottoms, and uniform programs.",
    keywords: ["wovens", "shirting", "uniform", "woven"],
  },
  {
    id: "knits",
    title: "Knits",
    href: "/products/knits",
    snippet: "Jersey, fleece, and performance knit programs.",
    keywords: ["knits", "jersey", "fleece", "organic cotton"],
  },
  {
    id: "baby-wear",
    title: "Baby Wear",
    href: "/products/baby-wear",
    snippet: "Baby wear programs and downloadable catalogue.",
    keywords: ["baby wear", "catalogue", "infant", "GOTS"],
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
    snippet: "Open roles by department and workplace culture.",
    keywords: ["careers", "jobs", "hiring", "culture"],
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
