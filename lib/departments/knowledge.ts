import type { KnowledgeEntry } from "@/lib/ai/knowledge-base";
import { getDepartments, isPlaceholderCapacity } from "@/lib/departments";

export function getDepartmentKnowledgeEntries(): KnowledgeEntry[] {
  return getDepartments().map((department) => {
    const capacityText =
      department.capacityValue === null || isPlaceholderCapacity(department.capacityValue)
        ? `Capacity detail: ${department.capacityUnit}. Published capacity figures may still be placeholders — do not quote specific numbers until confirmed with the team.`
        : `Capacity: ${department.capacityValue} ${department.capacityUnit}.`;

    return {
      id: `department-${department.slug}`,
      title: department.name,
      source: "Process & Capabilities",
      href: "/facility",
      keywords: [
        department.slug,
        department.name,
        department.category,
        ...department.name.toLowerCase().split(/\s+/),
        ...department.description.toLowerCase().split(/\s+/).filter((word) => word.length > 3),
      ],
      content: `${department.name} (${department.category}): ${department.description} ${capacityText}`,
    };
  });
}
