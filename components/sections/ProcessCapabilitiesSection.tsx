"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DepartmentCategoryTabs } from "./DepartmentCategoryTabs";
import { DepartmentGrid } from "./DepartmentGrid";
import type { Department } from "@/lib/departments/types";
import { cn } from "@/lib/utils";

export type ProcessCapabilitiesSectionProps = {
  departments: Department[];
  categories: string[];
  className?: string;
};

export function ProcessCapabilitiesSection({
  departments,
  categories,
  className,
}: ProcessCapabilitiesSectionProps) {
  const t = useTranslations("facility.processCapabilities");
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "");

  const filteredDepartments = useMemo(
    () => departments.filter((department) => department.category === activeCategory),
    [activeCategory, departments],
  );

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className={cn("bg-paper py-16 md:py-24", className)} aria-labelledby="process-capabilities-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subhead={t("subhead")}
          className="mb-10 md:mb-12"
        />

        <DepartmentCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
          className="mb-8 md:mb-10"
        />

        <DepartmentGrid departments={filteredDepartments} category={activeCategory} />

        <div className="mt-12 flex justify-center md:mt-16">
          <Button href="/contact" size="lg">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
