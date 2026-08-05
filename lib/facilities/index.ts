import facilitiesData from "@/data/facilities.json";

export type Facility = {
  id: string;
  slug: string;
  name: string;
  country: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  /** Optional percent position (0–100) on map-background.svg when lat/lng overlap or need fine tuning. */
  mapX?: number;
  mapY?: number;
  categories: string[];
  certifications: string[];
  employees: number;
  establishedYear: number;
  description: string;
};

export const FACILITY_PLACEHOLDER_IMAGE = "/images/facility/facility-thumb-01.jpg";
export const FACILITY_MAP_BACKGROUND = "/images/facility/map-background.svg";
export const FACILITY_HERO_IMAGE = "/images/facility/hero.jpg";

export function getFacilities(): Facility[] {
  return facilitiesData as Facility[];
}

export function getFacilityById(id: string): Facility | undefined {
  return getFacilities().find((facility) => facility.id === id);
}

const FACILITY_THUMBNAILS: Record<string, string> = {
  "city-unit": "/images/facility/facility-thumb-01.jpg",
  "dyeing-unit": "/images/facility/facility-thumb-02.jpg",
};

export function getFacilityThumbnailPath(slug: string) {
  return FACILITY_THUMBNAILS[slug] ?? FACILITY_PLACEHOLDER_IMAGE;
}

export { projectFacilityToMapPosition } from "./map-projection";

export function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
