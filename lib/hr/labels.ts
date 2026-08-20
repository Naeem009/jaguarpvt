export const HR_EMPLOYMENT_OPTIONS = [
  { value: "full-time", label: "Full-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
] as const;

const LEGACY_DEPARTMENT_NAMES: Record<string, string> = {
  manufacturing: "Manufacturing Operations",
  quality: "Quality & Compliance",
  productDevelopment: "Product Development",
  sustainability: "Sustainability",
  commercial: "Commercial & Corporate",
  hr: "People & HR",
};

export function displayDepartment(value: string) {
  return LEGACY_DEPARTMENT_NAMES[value] ?? value;
}

export function employmentLabel(value: string) {
  return HR_EMPLOYMENT_OPTIONS.find((item) => item.value === value)?.label ?? value;
}
