"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { isPlaceholderCapacity, type Department } from "@/lib/departments/types";
import { cn } from "@/lib/utils";

export type DepartmentCardProps = {
  department: Department;
  className?: string;
};

export function DepartmentCard({ department, className }: DepartmentCardProps) {
  const [imageSrc, setImageSrc] = useState(department.resolvedImage);
  const placeholderSvg = `/images/facility/departments/${department.slug}/photo.svg`;
  const showCapacityStat =
    department.capacityValue !== null && !isPlaceholderCapacity(department.capacityValue);

  return (
    <Card className={cn("overflow-hidden p-0", className)}>
      <div className="relative aspect-[4/3] bg-paper">
        <Image
          src={imageSrc}
          alt={department.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain object-center p-1"
          onError={() => {
            if (imageSrc !== placeholderSvg) {
              setImageSrc(placeholderSvg);
            }
          }}
        />
      </div>

      <div className="space-y-3 p-6">
        <h3 className="font-display text-xl font-semibold text-ink">{department.name}</h3>
        <p className="text-sm leading-relaxed text-graphite">{department.description}</p>

        {showCapacityStat ? (
          <div className="rounded-[var(--radius-card)] bg-accent-tint px-4 py-3">
            <p className="font-mono text-2xl font-bold tracking-tight text-accent-dark">
              {department.capacityValue}
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-graphite">
              {department.capacityUnit}
            </p>
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-graphite">{department.capacityUnit}</p>
        )}
      </div>
    </Card>
  );
}
