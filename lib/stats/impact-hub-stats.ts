import type { StatBarItem } from "@/components/sections/StatBar";

export const IMPACT_HUB_STAT_PLACEHOLDERS = {
  waterSaved: "500 M",
  renewableEnergy: "25 %",
  certifiedFacilities: "04",
  workerPrograms: "12",
} as const;

export type ImpactHubStatLabels = {
  waterSaved: string;
  renewableEnergy: string;
  certifiedFacilities: string;
  workerPrograms: string;
};

export function buildImpactHubStats(labels: ImpactHubStatLabels): StatBarItem[] {
  return [
    { value: 0, placeholder: IMPACT_HUB_STAT_PLACEHOLDERS.waterSaved, label: labels.waterSaved },
    {
      value: 0,
      placeholder: IMPACT_HUB_STAT_PLACEHOLDERS.renewableEnergy,
      label: labels.renewableEnergy,
    },
    {
      value: 0,
      placeholder: IMPACT_HUB_STAT_PLACEHOLDERS.certifiedFacilities,
      label: labels.certifiedFacilities,
    },
    {
      value: 0,
      placeholder: IMPACT_HUB_STAT_PLACEHOLDERS.workerPrograms,
      label: labels.workerPrograms,
    },
  ];
}
