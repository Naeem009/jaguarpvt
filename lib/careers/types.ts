export const DEPARTMENT_IDS = [
  "manufacturing",
  "quality",
  "productDevelopment",
  "sustainability",
  "commercial",
  "hr",
] as const;

export type DepartmentId = (typeof DEPARTMENT_IDS)[number];

export const EMPLOYMENT_TYPES = ["full-time", "contract", "internship"] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export type JobOpening = {
  slug: string;
  title: string;
  department: DepartmentId;
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
  department: DepartmentId;
  location: string;
  employmentType: EmploymentType;
  applicationDeadline: string;
  pinned: boolean;
  closingSoon: boolean;
};
