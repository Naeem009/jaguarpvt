import type { StatBarItem } from "@/components/sections/StatBar";

export const COMPANY_STAT_PLACEHOLDERS = {
  facilities: "6",
  countries: "5",
  employees: "900+",
  yearsInOperation: "40",
} as const;

export type CompanyStatLabels = {
  facilities: string;
  countries: string;
  employees: string;
  yearsInOperation: string;
};

export function buildCompanyStats(labels: CompanyStatLabels): StatBarItem[] {
  return [
    { value: 0, placeholder: COMPANY_STAT_PLACEHOLDERS.facilities, label: labels.facilities },
    { value: 0, placeholder: COMPANY_STAT_PLACEHOLDERS.countries, label: labels.countries },
    { value: 0, placeholder: COMPANY_STAT_PLACEHOLDERS.employees, label: labels.employees },
    {
      value: 0,
      placeholder: COMPANY_STAT_PLACEHOLDERS.yearsInOperation,
      label: labels.yearsInOperation,
    },
  ];
}
