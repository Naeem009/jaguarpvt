import { z } from "zod";

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
