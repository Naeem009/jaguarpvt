import type { Facility } from "@/lib/facilities";

export type FacilitySearchResult = {
  facilityIds: string[];
  explanation: string;
};

const regionAliases: Record<string, string[]> = {
  "south asia": ["South Asia"],
  "southeast asia": ["Southeast Asia"],
  "east asia": ["East Asia"],
  "middle east": ["Middle East & North Africa", "Europe & Middle East"],
  "north africa": ["Middle East & North Africa"],
  "europe": ["Europe & Middle East"],
  "central america": ["Central America"],
  "north america": ["North America"],
  africa: ["Africa"],
  usa: ["North America"],
  "united states": ["North America"],
  china: ["East Asia"],
  india: ["South Asia"],
  bangladesh: ["South Asia"],
  pakistan: ["South Asia"],
  vietnam: ["Southeast Asia"],
  turkey: ["Europe & Middle East"],
};

const categoryAliases: Record<string, string[]> = {
  knit: ["knits"],
  knits: ["knits"],
  woven: ["wovens"],
  wovens: ["wovens"],
  "baby wear": ["baby-wear"],
  "baby-wear": ["baby-wear"],
};

const certificationAliases = ["gots", "oeko-tex", "oeko", "wrap", "iso"];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function matchesRegion(query: string, facility: Facility) {
  return Object.entries(regionAliases).some(([alias, regions]) => {
    if (!query.includes(alias)) return false;
    return regions.includes(facility.region) || query.includes(facility.country.toLowerCase());
  });
}

function matchesCategory(query: string, facility: Facility) {
  return Object.entries(categoryAliases).some(([alias, categories]) => {
    if (!query.includes(alias)) return false;
    return categories.some((category) => facility.categories.includes(category));
  });
}

function matchesCertification(query: string, facility: Facility) {
  return facility.certifications.some((certification) => {
    const cert = certification.toLowerCase();
    return query.includes(cert) || (query.includes("oeko") && cert.includes("oeko"));
  });
}

function scoreFacility(query: string, facility: Facility) {
  const haystack = normalize(
    [
      facility.name,
      facility.city,
      facility.country,
      facility.region,
      facility.description,
      ...facility.categories,
      ...facility.certifications,
    ].join(" "),
  );

  let score = 0;
  const tokens = query.split(" ").filter(Boolean);

  for (const token of tokens) {
    if (haystack.includes(token)) score += 2;
  }

  if (matchesRegion(query, facility)) score += 5;
  if (matchesCategory(query, facility)) score += 5;
  if (matchesCertification(query, facility)) score += 4;

  for (const alias of certificationAliases) {
    if (query.includes(alias) && matchesCertification(query, facility)) {
      score += 2;
    }
  }

  return score;
}

export function searchFacilities(query: string, facilities: Facility[]): FacilitySearchResult {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return {
      facilityIds: facilities.map((facility) => facility.id),
      explanation: "Showing all published facilities.",
    };
  }

  const scored = facilities
    .map((facility) => ({ facility, score: scoreFacility(normalizedQuery, facility) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      facilityIds: [],
      explanation:
        "No facilities matched that query against our published facility data. Try broader terms such as a region, category, or certification name.",
    };
  }

  return {
    facilityIds: scored.map((entry) => entry.facility.id),
    explanation: `Showing ${scored.length} facilit${scored.length === 1 ? "y" : "ies"} matching "${query}" against published capability data — not a real-time capacity filter.`,
  };
}
