export const HR_DEPARTMENT_OPTIONS = [
  { value: "manufacturing", label: "Manufacturing Operations" },
  { value: "quality", label: "Quality & Compliance" },
  { value: "productDevelopment", label: "Product Development" },
  { value: "sustainability", label: "Sustainability" },
  { value: "commercial", label: "Commercial & Corporate" },
  { value: "hr", label: "People & HR" },
] as const;

export const HR_EMPLOYMENT_OPTIONS = [
  { value: "full-time", label: "Full-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
] as const;

export function departmentLabel(value: string) {
  return HR_DEPARTMENT_OPTIONS.find((item) => item.value === value)?.label ?? value;
}

export function employmentLabel(value: string) {
  return HR_EMPLOYMENT_OPTIONS.find((item) => item.value === value)?.label ?? value;
}
