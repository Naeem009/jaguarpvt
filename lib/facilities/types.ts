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
  /** Resolved public path for card / list thumbnails. */
  thumbnail: string;
};

export const FACILITY_PLACEHOLDER_IMAGE = "/images/facility/facility-thumb-01.jpg";
export const FACILITY_MAP_BACKGROUND = "/images/facility/map-background.svg";
export const FACILITY_HERO_IMAGE = "/images/facility/hero.jpg";

/** Legacy numbered thumbs — kept for backwards compatibility with uploaded assets. */
export const LEGACY_FACILITY_THUMBS: Record<string, string> = {
  "city-unit": "facility-thumb-01",
  "dyeing-unit": "facility-thumb-02",
};

/** Client-safe candidate order when resolving or falling back to the next asset. */
export function getFacilityThumbnailCandidates(slug: string): string[] {
  const candidates = [
    `/images/facility/${slug}.jpg`,
    `/images/facility/${slug}.webp`,
    `/images/facility/${slug}.png`,
  ];

  const legacyBase = LEGACY_FACILITY_THUMBS[slug];
  if (legacyBase) {
    candidates.push(
      `/images/facility/${legacyBase}.jpg`,
      `/images/facility/${legacyBase}.webp`,
      `/images/facility/${legacyBase}.png`,
    );
  }

  candidates.push(FACILITY_PLACEHOLDER_IMAGE);
  return [...new Set(candidates)];
}
