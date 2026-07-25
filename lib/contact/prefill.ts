import type { ReadonlyURLSearchParams } from "next/navigation";
import {
  mapMatcherVolumeToAnnual,
  parseCategoryParam,
  parseSustainabilityParam,
  type ContactFormValues,
} from "@/lib/contact/schema";

function buildPrefillMessage(searchParams: ReadonlyURLSearchParams) {
  const parts: string[] = [];
  const matchSummary = searchParams.get("matchSummary");

  if (matchSummary) {
    parts.push(`Capability match summary:\n${matchSummary}`);
  }

  const materials = searchParams.get("materials");
  if (materials) {
    parts.push(`Preferred materials: ${materials.replace(/,/g, ", ")}`);
  }

  const region = searchParams.get("region");
  if (region) {
    parts.push(`Target delivery region: ${region.replace(/-/g, " ")}`);
  }

  const matcherVolume = searchParams.get("volume");
  if (matcherVolume) {
    parts.push(`Estimated monthly volume (from matcher): ${matcherVolume.replace(/-/g, " ")}`);
  }

  const category = searchParams.get("category");
  if (category && category !== "multiple") {
    parts.push(`Interested in: ${category.replace(/-/g, " ")}`);
  }

  return parts.join("\n\n");
}

export function getContactFormDefaults(
  searchParams: ReadonlyURLSearchParams,
): Partial<ContactFormValues> {
  const category = parseCategoryParam(searchParams.get("category"));
  const annualVolume = mapMatcherVolumeToAnnual(searchParams.get("volume"));
  const sustainability = parseSustainabilityParam(searchParams.get("sustainability"));
  const message = buildPrefillMessage(searchParams);

  return {
    category,
    annualVolume,
    sustainability,
    message: message || undefined,
    matchSummary: searchParams.get("matchSummary") ?? undefined,
    matcherVolume: searchParams.get("volume") ?? undefined,
    matcherMaterials: searchParams.get("materials") ?? undefined,
    matcherRegion: searchParams.get("region") ?? undefined,
  };
}
