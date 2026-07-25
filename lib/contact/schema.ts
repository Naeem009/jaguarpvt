import { z } from "zod";

export const productCategoryValues = [
  "wovens",
  "knits",
  "denim",
  "baby-wear",
  "multiple",
] as const;

export const annualVolumeValues = [
  "under-50k",
  "50k-250k",
  "250k-1m",
  "1m-plus",
] as const;

export const sustainabilityValues = [
  "gots",
  "oeko-tex",
  "wrap",
  "recycled-content",
  "low-impact-finishing",
] as const;

export const contactFormSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required."),
  contactName: z.string().trim().min(1, "Contact name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  website: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value) || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(value),
      "Enter a valid website URL.",
    ),
  category: z.enum(productCategoryValues, {
    message: "Select a product category.",
  }),
  annualVolume: z.enum(annualVolumeValues, {
    message: "Select an estimated annual volume range.",
  }),
  sustainability: z.array(z.enum(sustainabilityValues)).default([]),
  message: z.string().trim().min(10, "Please add a short message (at least 10 characters)."),
  matchSummary: z.string().trim().optional(),
  matcherVolume: z.string().trim().optional(),
  matcherMaterials: z.string().trim().optional(),
  matcherRegion: z.string().trim().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const productCategoryLabels: Record<(typeof productCategoryValues)[number], string> = {
  wovens: "Wovens",
  knits: "Knits",
  denim: "Denim",
  "baby-wear": "Baby Wear",
  multiple: "Multiple categories",
};

export const annualVolumeLabels: Record<(typeof annualVolumeValues)[number], string> = {
  "under-50k": "Under 50,000 units / year",
  "50k-250k": "50,000 – 250,000 units / year",
  "250k-1m": "250,000 – 1,000,000 units / year",
  "1m-plus": "1,000,000+ units / year",
};

export const sustainabilityLabels: Record<(typeof sustainabilityValues)[number], string> = {
  gots: "GOTS certification required",
  "oeko-tex": "OEKO-TEX required",
  wrap: "WRAP required",
  "recycled-content": "Recycled content targets",
  "low-impact-finishing": "Low-impact finishing",
};

export function mapMatcherVolumeToAnnual(volume?: string | null) {
  switch (volume) {
    case "under-10k":
      return "under-50k" as const;
    case "10k-50k":
      return "50k-250k" as const;
    case "50k-200k":
      return "250k-1m" as const;
    case "200k-plus":
      return "1m-plus" as const;
    default:
      return undefined;
  }
}

export function parseCategoryParam(value?: string | null) {
  if (!value) return undefined;
  if (value === "baby wear") return "baby-wear" as const;
  return productCategoryValues.find((category) => category === value);
}

export function parseSustainabilityParam(value?: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is (typeof sustainabilityValues)[number] =>
      sustainabilityValues.includes(item as (typeof sustainabilityValues)[number]),
    );
}
