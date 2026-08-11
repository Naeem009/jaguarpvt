"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  FACILITY_PLACEHOLDER_IMAGE,
  getFacilityThumbnailCandidates,
  type Facility,
} from "@/lib/facilities/types";
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
  const t = useTranslations("facilityMap");
  const tCategories = useTranslations("facilityMap.categories");
  const candidates = useMemo(
    () => getFacilityThumbnailCandidates(facility.slug),
    [facility.slug],
  );
  const [candidateIndex, setCandidateIndex] = useState(() =>
    Math.max(0, candidates.indexOf(facility.thumbnail)),
  );
  const imageSrc = candidates[candidateIndex] ?? FACILITY_PLACEHOLDER_IMAGE;

  function handleImageError() {
    setCandidateIndex((current) => {
      const next = current + 1;
      return next < candidates.length ? next : current;
    });
  }

  return (
    <Card
      variant={variant === "list" ? "interactive" : "default"}
      className={cn(
        "overflow-hidden p-0",
        variant === "list" && "flex h-full w-full flex-col",
        variant === "popover" && "w-full max-w-md shadow-[var(--shadow-card-hover)]",
        className,
      )}
      onMouseEnter={onFocusMarker}
      onFocus={onFocusMarker}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-ink/5">
        <Image
          src={imageSrc}
          alt={t("card.facilityAlt", { name: facility.name })}
          fill
          sizes={variant === "popover" ? "320px" : "(max-width: 768px) 100vw, 400px"}
          className="object-cover object-center"
          onError={handleImageError}
        />
      </div>

      <div
        className={cn(
          "space-y-4 p-6",
          variant === "list" && "flex flex-1 flex-col",
        )}
      >
        <div className="space-y-2">
          <h3 className="font-display text-xl font-semibold text-ink">{facility.name}</h3>
          <p className="text-sm text-graphite">
            {facility.city}, {facility.country}
          </p>
        </div>

        <p
          className={cn(
            "text-sm leading-relaxed text-graphite",
            variant === "list" && "line-clamp-3",
          )}
        >
          {facility.description}
        </p>

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-graphite">{t("card.employees")}</dt>
            <dd className="text-ink">{facility.employees.toLocaleString()}+</dd>
          </div>
          <div>
            <dt className="font-medium text-graphite">{t("card.established")}</dt>
            <dd className="text-ink">{facility.establishedYear}</dd>
          </div>
        </dl>

        <div className={cn("space-y-4", variant === "list" && "mt-auto")}>
          <div className="flex min-h-8 flex-wrap gap-2">
            {facility.categories.map((category) => (
              <Badge key={category} tone="neutral">
                {tCategories(category as "wovens" | "knits" | "baby-wear")}
              </Badge>
            ))}
          </div>

          <div className="flex min-h-8 flex-wrap gap-2">
            {facility.certifications.map((certification) => (
              <Badge key={certification} tone="accent">
                {certification}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
