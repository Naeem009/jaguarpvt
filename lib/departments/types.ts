export type Department = {
  slug: string;
  name: string;
  category: string;
  description: string;
  capacityValue: string | null;
  capacityUnit: string;
  image: string;
  /** Resolved public path — prefers photo.jpg when uploaded, else photo.svg placeholder. */
  resolvedImage: string;
  facilityId?: string;
};

export const DEPARTMENT_CATEGORY_ORDER = [
  "Raw Material & Testing",
  "Fabric Production",
  "Embellishment",
  "Cut, Sew & Wet Processing",
  "Finishing & Quality Assurance",
] as const;

export function isPlaceholderCapacity(value: string | null): boolean {
  return value === null || value.includes("[X]");
}
