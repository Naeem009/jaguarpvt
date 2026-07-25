"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const previewMarkers = [
  { top: "34%", insetInlineStart: "22%" },
  { top: "48%", insetInlineStart: "54%" },
  { top: "62%", insetInlineStart: "71%" },
  { top: "38%", insetInlineStart: "83%" },
];

export type FacilityMapTeaserProps = {
  title?: string;
  subhead?: string;
  image: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
};

export function FacilityMapTeaser({
  title,
  subhead,
  image,
  href = "/facility",
  ctaLabel,
  className,
}: FacilityMapTeaserProps) {
  const t = useTranslations("sections.facilityMapTeaser");

  const resolvedTitle = title ?? t("title");
  const resolvedSubhead = subhead ?? t("subhead");
  const resolvedCtaLabel = ctaLabel ?? t("cta");

  return (
    <section className={cn("bg-charcoal py-16 text-white md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={resolvedTitle}
            subhead={resolvedSubhead}
            className="[&_h2]:text-white [&_p]:text-white/75"
          />
          <Button href={href} variant="secondary" className="shrink-0 border-white/20 text-white hover:border-white hover:text-white">
            {resolvedCtaLabel}
          </Button>
        </div>

        <Link
          href={href}
          className="group relative block overflow-hidden rounded-[var(--radius-card-lg)] border border-white/10"
          aria-label={`${resolvedTitle} — ${resolvedCtaLabel}`}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={image}
              alt={t("mapAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

            {previewMarkers.map((marker, index) => (
              <span
                key={index}
                className="absolute size-3 rounded-full bg-accent shadow-[0_0_0_6px_rgba(126,187,66,0.25)]"
                style={{ top: marker.top, insetInlineStart: marker.insetInlineStart }}
                aria-hidden
              />
            ))}

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6 md:p-8">
              <p className="text-sm text-white/70">{t("previewNote")}</p>
              <span className="hidden text-sm font-medium text-accent md:inline-flex md:items-center md:gap-2">
                {resolvedCtaLabel}
                <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
