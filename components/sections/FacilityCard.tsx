"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  FACILITY_PLACEHOLDER_IMAGE,
  formatCategoryLabel,
  getFacilityThumbnailPath,
  type Facility,
} from "@/lib/facilities";
import { cn } from "@/lib/utils";

export type FacilityCardProps = {
  facility: Facility;
  variant?: "popover" | "list";
  className?: string;
  onFocusMarker?: () => void;
};

export function FacilityCard({
  facility,
  variant = "list",
  className,
  onFocusMarker,
}: FacilityCardProps) {
  const [imageSrc, setImageSrc] = useState(getFacilityThumbnailPath(facility.slug));

  return (
    <Card
      variant={variant === "list" ? "interactive" : "default"}
      className={cn(
        variant === "popover" ? "max-w-sm p-0 overflow-hidden shadow-[var(--shadow-card-hover)]" : "p-0 overflow-hidden",
        className,
      )}
      onMouseEnter={onFocusMarker}
      onFocus={onFocusMarker}
    >
      <div className={cn("relative", variant === "popover" ? "aspect-[16/10]" : "aspect-[16/9]")}>
        <Image
          src={imageSrc}
          alt={`${facility.name} facility`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover"
          onError={() => setImageSrc(FACILITY_PLACEHOLDER_IMAGE)}
        />
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="font-display text-xl font-semibold text-ink">{facility.name}</h3>
          <p className="text-sm text-graphite">
            {facility.city}, {facility.country}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-graphite">{facility.description}</p>

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-graphite">Employees</dt>
            <dd className="text-ink">{facility.employees.toLocaleString()}+</dd>
          </div>
          <div>
            <dt className="font-medium text-graphite">Established</dt>
            <dd className="text-ink">{facility.establishedYear}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-2">
          {facility.categories.map((category) => (
            <Badge key={category} tone="neutral">
              {formatCategoryLabel(category)}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {facility.certifications.map((certification) => (
            <Badge key={certification} tone="accent">
              {certification}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
