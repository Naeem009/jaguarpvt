"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatApplyByDate } from "@/lib/careers/deadline";
import type { DepartmentId, PublicOpening } from "@/lib/careers/types";
import { cn } from "@/lib/utils";

const FILTER_THRESHOLD = 5;

type FilterValue = "all" | "internship" | DepartmentId;

type CurrentOpeningsProps = {
  openings: PublicOpening[];
};

export function CurrentOpenings({ openings }: CurrentOpeningsProps) {
  const t = useTranslations("careers");
  const locale = useLocale();
  const [filter, setFilter] = useState<FilterValue>("all");

  const departmentIds = useMemo(() => {
    return Array.from(new Set(openings.map((opening) => opening.department)));
  }, [openings]);

  const hasInternships = openings.some((opening) => opening.employmentType === "internship");
  const showFilters = openings.length >= FILTER_THRESHOLD;

  const visible = useMemo(() => {
    if (filter === "all") {
      return openings;
    }
    if (filter === "internship") {
      return openings.filter((opening) => opening.employmentType === "internship");
    }
    return openings.filter((opening) => opening.department === filter);
  }, [filter, openings]);

  const pills: Array<{ value: FilterValue; label: string }> = [
    { value: "all", label: t("openRoles.filterAll") },
    ...departmentIds.map((id) => ({
      value: id,
      label: t(`departments.${id}`),
    })),
    ...(hasInternships
      ? [{ value: "internship" as const, label: t("employmentTypes.internship") }]
      : []),
  ];

  return (
    <section id="open-roles" className="bg-mist py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("openRoles.eyebrow")}
            title={t("openRoles.title")}
            subhead={t("openRoles.subhead")}
            className="mb-0"
          />
          {openings.length > 0 ? (
            <p className="shrink-0 font-mono text-sm text-graphite md:pb-1">
              {t("openRoles.roleCount", { count: openings.length })}
            </p>
          ) : null}
        </div>

        {openings.length === 0 ? (
          <div className="max-w-2xl space-y-4 py-8">
            <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
              {t("openRoles.emptyTitle")}
            </h3>
            <p className="text-base leading-relaxed text-graphite">{t("openRoles.emptyBody")}</p>
          </div>
        ) : (
          <>
            {showFilters ? (
              <div
                role="tablist"
                aria-label={t("openRoles.filterAria")}
                className="mb-8 flex flex-wrap gap-2"
              >
                {pills.map((pill) => {
                  const isActive = filter === pill.value;
                  return (
                    <button
                      key={pill.value}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setFilter(pill.value)}
                      className={cn(
                        "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "border-accent bg-accent text-white"
                          : "border-ink/10 bg-paper text-graphite hover:border-accent hover:text-accent-dark",
                      )}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {visible.length === 0 ? (
              <p className="py-8 text-base text-graphite">{t("openRoles.filterEmpty")}</p>
            ) : (
              <ul className="border-t border-ink/8">
                {visible.map((opening) => (
                  <li key={opening.slug}>
                    <Link
                      href={`/careers/${opening.slug}`}
                      className="group flex min-h-14 items-start justify-between gap-6 border-b border-ink/8 py-6 outline-none transition-transform duration-300 ease-[var(--ease-out-expo)] hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rtl:hover:-translate-x-1"
                    >
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink md:text-3xl">
                            {opening.title}
                          </h3>
                          {opening.closingSoon ? (
                            <Badge tone="accent">{t("openRoles.closingSoon")}</Badge>
                          ) : null}
                        </div>
                        <p className="text-sm text-graphite">
                          {t(`departments.${opening.department}`)}
                          <span aria-hidden> · </span>
                          {opening.location}
                          <span aria-hidden> · </span>
                          {t(`employmentTypes.${opening.employmentType}`)}
                        </p>
                        <p className="text-sm text-graphite">
                          {t("openRoles.applyBy", {
                            date: formatApplyByDate(opening.applicationDeadline, locale),
                          })}
                        </p>
                      </div>
                      <span className="hidden shrink-0 items-center gap-2 pt-1 text-base font-medium text-accent group-hover:text-accent-dark md:inline-flex">
                        {t("openRoles.viewRole")}
                        <span aria-hidden>→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}
