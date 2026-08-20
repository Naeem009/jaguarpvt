export const EMPLOYMENT_TYPES = ["full-time", "contract", "internship"] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export type JobOpening = {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  experience?: string;
  vacancies: number;
  pinned: boolean;
  published: boolean;
  /** Calendar date `YYYY-MM-DD`, valid through end of that day in Asia/Karachi. */
  applicationDeadline: string;
  overview: string[];
  requirements: string[];
};

export type PublicOpening = {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  applicationDeadline: string;
  pinned: boolean;
  closingSoon: boolean;
};
