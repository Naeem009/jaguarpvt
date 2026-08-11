"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DepartmentCard } from "./DepartmentCard";
import type { Department } from "@/lib/departments/types";
import { cn } from "@/lib/utils";

export type DepartmentGridProps = {
  departments: Department[];
  category: string;
  className?: string;
};

export function DepartmentGrid({ departments, category, className }: DepartmentGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
          className,
        )}
        role="tabpanel"
        id={`department-panel-${slugifyCategory(category)}`}
        aria-labelledby={`department-tab-${slugifyCategory(category)}`}
      >
        {departments.map((department) => (
          <DepartmentCard key={department.slug} department={department} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
