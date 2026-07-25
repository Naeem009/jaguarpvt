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
  categories: string[];
  certifications: string[];
  employees: number;
  establishedYear: number;
  description: string;
};

export const FACILITY_PLACEHOLDER_IMAGE = "/images/facility/facility-thumb-01.svg";
export const FACILITY_MAP_BACKGROUND = "/images/facility/map-background.svg";
export const FACILITY_HERO_IMAGE = "/images/facility/map-background.svg";

export function getFacilities(): Facility[] {
  return facilitiesData as Facility[];
}

export function getFacilityById(id: string): Facility | undefined {
  return getFacilities().find((facility) => facility.id === id);
}

export function getFacilityThumbnailPath(slug: string) {
  return `/images/facility/${slug}.jpg`;
}

export function projectFacilityToMapPosition(facility: Facility) {
  return {
    x: ((facility.longitude + 180) / 360) * 100,
    y: ((90 - facility.latitude) / 180) * 100,
  };
}

export function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
