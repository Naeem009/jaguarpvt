import { z } from "zod";
import { EMPLOYMENT_TYPES } from "./types";

export const jobOpeningSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase slug with hyphens."),
  title: z.string().trim().min(1).max(120),
  department: z.string().trim().min(1).max(80),
  location: z.string().trim().min(1).max(80),
  employmentType: z.enum(EMPLOYMENT_TYPES),
  experience: z.string().trim().max(80).optional(),
  vacancies: z.coerce.number().int().min(1).max(99),
  pinned: z.boolean().default(false),
  published: z.boolean().default(false),
  applicationDeadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a YYYY-MM-DD date."),
  overview: z.array(z.string().trim().min(1)).min(1),
  requirements: z.array(z.string().trim().min(1)).min(1),
});

export const MAX_CV_BYTES = 5 * 1024 * 1024;

export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

export const jobApplicationFieldsSchema = z.object({
  jobSlug: z.string().trim().min(1),
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(40),
  city: z.string().trim().min(1).max(80),
  coverLetter: z.string().trim().max(4000).optional(),
  companyWebsite: z.string().optional(),
});

export type JobApplicationFields = z.infer<typeof jobApplicationFieldsSchema>;

export function hasAllowedCvType(file: { name: string; type: string }): boolean {
  if (ALLOWED_CV_TYPES.includes(file.type as (typeof ALLOWED_CV_TYPES)[number])) {
    return true;
  }

  const lower = file.name.toLowerCase();
  return ALLOWED_CV_EXTENSIONS.some((extension) => lower.endsWith(extension));
}
