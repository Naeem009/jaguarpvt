import { cn } from "@/lib/utils";

export type MatcherInput = {
  category: string;
  volume: string;
  materials: string[];
  sustainability: string[];
  region: string;
  locale?: string;
};

export type MatcherResult = {
  summary: string;
  recommendedCategory: string;
  certifications: string[];
  caveat: string;
};

const categoryLabels: Record<string, string> = {
  "casual-wear": "Casual Wear",
  streetwear: "Streetwear",
  activewear: "Activewear",
  denim: "Denim",
  kidswear: "Kidswear",
  boutique: "Boutique",
};

const certificationMap: Record<string, string[]> = {
  "casual-wear": ["OEKO-TEX", "WRAP"],
  streetwear: ["OEKO-TEX", "WRAP"],
  activewear: ["GOTS", "OEKO-TEX"],
  denim: ["OEKO-TEX", "WRAP"],
  kidswear: ["GOTS", "OEKO-TEX", "WRAP"],
  boutique: ["GOTS", "OEKO-TEX"],
};

export function buildMatcherResult(input: MatcherInput): MatcherResult {
  const categoryLabel = categoryLabels[input.category] ?? input.category;
  const certs = new Set(certificationMap[input.category] ?? ["OEKO-TEX"]);

  for (const requirement of input.sustainability) {
    if (requirement.includes("gots")) certs.add("GOTS");
    if (requirement.includes("oeko")) certs.add("OEKO-TEX");
    if (requirement.includes("wrap")) certs.add("WRAP");
    if (requirement.includes("recycled")) certs.add("GRS");
  }

  const certificationList = Array.from(certs);
  const materials = input.materials.length > 0 ? input.materials.join(", ") : "your specified materials";
  const sustainability =
    input.sustainability.length > 0
      ? input.sustainability.join(", ")
      : "standard compliance requirements";

  const summary = [
    `Based on your inputs, ${categoryLabel} appears to be the best fit for a program at ${input.volume} units per month using ${materials}.`,
    `Relevant certifications to discuss for this profile include ${certificationList.join(", ")}.`,
    `Delivery planning for ${input.region} should be confirmed with our team — lead times vary by season, capacity, and finishing requirements (${sustainability}).`,
  ].join(" ");

  return {
    summary,
    recommendedCategory: input.category,
    certifications: certificationList,
    caveat:
      "This match summary is generated from published capability data and representative ranges. It is not a quote, capacity guarantee, or commitment.",
  };
}

export function validateMatcherInput(input: Partial<MatcherInput>): input is MatcherInput {
  return Boolean(
    input.category &&
      input.volume &&
      Array.isArray(input.materials) &&
      Array.isArray(input.sustainability) &&
      input.region,
  );
}
