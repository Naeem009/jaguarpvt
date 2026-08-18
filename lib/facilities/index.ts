import fs from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import facilitiesData from "@/data/facilities.json";
import {
  FACILITY_HERO_IMAGE,
  FACILITY_MAP_BACKGROUND,
  FACILITY_PLACEHOLDER_IMAGE,
  getFacilityThumbnailCandidates,
  type Facility,
} from "./types";

export type { Facility } from "./types";
export {
  FACILITY_HERO_IMAGE,
  FACILITY_MAP_BACKGROUND,
  FACILITY_PLACEHOLDER_IMAGE,
  getFacilityThumbnailCandidates,
} from "./types";

function resolveFacilityThumbnail(slug: string): string {
  const baseDir = path.join(process.cwd(), "public", "images", "facility");

  for (const candidate of getFacilityThumbnailCandidates(slug)) {
    const relativePath = candidate.replace(/^\/images\/facility\//, "");
    if (fs.existsSync(path.join(baseDir, relativePath))) {
      return candidate;
    }
  }

  return FACILITY_PLACEHOLDER_IMAGE;
}

function mapFacilityRecord(
  facility: Omit<Facility, "thumbnail">,
  name: string,
  description: string,
): Facility {
  return {
    ...facility,
    name,
    description,
    thumbnail: resolveFacilityThumbnail(facility.slug),
  };
}

export async function getFacilities(): Promise<Facility[]> {
  const t = await getTranslations("facilities");

  return (facilitiesData as Omit<Facility, "thumbnail">[]).map((facility) =>
    mapFacilityRecord(facility, t(`${facility.slug}.name`), t(`${facility.slug}.description`)),
  );
}

export async function getFacilityById(id: string): Promise<Facility | undefined> {
  const facilities = await getFacilities();
  return facilities.find((facility) => facility.id === id);
}

/** @deprecated Use `facility.thumbnail` from `getFacilities()` instead. */
export function getFacilityThumbnailPath(slug: string) {
  return resolveFacilityThumbnail(slug);
}

export { projectFacilityToMapPosition } from "./map-projection";

export function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
