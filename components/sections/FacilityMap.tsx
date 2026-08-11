"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FacilityCard } from "./FacilityCard";
import { FacilityList } from "./FacilityList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectFacilityToMapPosition } from "@/lib/facilities/map-projection";
import { FACILITY_MAP_BACKGROUND, type Facility } from "@/lib/facilities/types";
import { cn } from "@/lib/utils";

export type FacilityMapProps = {
  facilities: Facility[];
  filterEnabled?: boolean;
  className?: string;
};

type SearchResponse = {
  facilityIds: string[];
  explanation: string;
};

export function FacilityMap({ facilities, filterEnabled = false, className }: FacilityMapProps) {
  const t = useTranslations("facilityMap");
  const [selectedId, setSelectedId] = useState<string | null>(facilities[0]?.id ?? null);
  const [visibleIds, setVisibleIds] = useState<string[] | null>(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [searchExplanation, setSearchExplanation] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const displayedFacilities = useMemo(() => {
    if (visibleIds === null) return facilities;
    return facilities.filter((facility) => visibleIds.includes(facility.id));
  }, [facilities, visibleIds]);

  const selectedFacility = facilities.find((facility) => facility.id === selectedId) ?? null;

  async function handleFilterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: filterQuery, scope: "facilities" }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = (await response.json()) as SearchResponse;
      setVisibleIds(data.facilityIds);
      setSearchExplanation(data.explanation);

      if (data.facilityIds.length > 0) {
        setSelectedId(data.facilityIds[0]);
      } else {
        setSelectedId(null);
      }
    } catch {
      setSearchError(t("error"));
    } finally {
      setIsSearching(false);
    }
  }

  function handleClearFilter() {
    setFilterQuery("");
    setVisibleIds(null);
    setSearchExplanation(null);
    setSearchError(null);
    setSelectedId(facilities[0]?.id ?? null);
  }

  return (
    <div className={cn("bg-charcoal text-white", className)}>
      <section className="py-16 md:py-24" aria-label={t("list.ariaLabel")}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={t("heading.eyebrow")}
            title={t("heading.title")}
            subhead={t("heading.subhead")}
            className="mb-8 md:mb-10 [&_h2]:text-white [&_p]:text-white/75"
          />

          {filterEnabled ? (
            <form onSubmit={handleFilterSubmit} className="mb-8 space-y-3">
              <label htmlFor="facility-filter" className="block text-sm font-medium text-white/80">
                {t("filterLabel")}
              </label>
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  id="facility-filter"
                  value={filterQuery}
                  onChange={(event) => setFilterQuery(event.target.value)}
                  placeholder={t("filterPlaceholder")}
                  className="min-h-12 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 outline-none focus:border-accent"
                />
                <div className="flex gap-3">
                  <Button type="submit" disabled={isSearching}>
                    {isSearching ? t("filtering") : t("filterButton")}
                  </Button>
                  <Button type="button" variant="secondary" className="border-white/20 text-white hover:border-white hover:text-white" onClick={handleClearFilter}>
                    {t("clear")}
                  </Button>
                </div>
              </div>
              {searchExplanation ? (
                <p className="text-sm text-white/70">{searchExplanation}</p>
              ) : null}
              {searchError ? <p className="text-sm text-error">{searchError}</p> : null}
              <p className="text-xs text-white/50">{t("disclaimer")}</p>
            </form>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] border border-white/10 bg-charcoal">
              <div className="relative aspect-[950/620] w-full">
                <Image
                  src={FACILITY_MAP_BACKGROUND}
                  alt={t("mapAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-contain object-center opacity-90"
                  priority
                />

                {displayedFacilities.map((facility) => {
                  const position = projectFacilityToMapPosition(facility);
                  const isSelected = selectedId === facility.id;

                  return (
                    <button
                      key={facility.id}
                      type="button"
                      aria-label={`${facility.name}, ${facility.city}, ${facility.country}`}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedId(facility.id)}
                      className={cn(
                        "absolute z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition-transform hover:scale-125 focus:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal",
                        isSelected
                          ? "bg-accent-bright shadow-[0_0_0_8px_rgba(126,187,66,0.35)]"
                          : "bg-accent-bright/90 shadow-[0_0_0_6px_rgba(126,187,66,0.2)]",
                      )}
                      style={{
                        top: `${position.y}%`,
                        insetInlineStart: `${position.x}%`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block">
              {selectedFacility ? (
                <FacilityCard facility={selectedFacility} variant="popover" />
              ) : (
                <div className="rounded-[var(--radius-card-lg)] border border-white/10 bg-white/5 p-8 text-sm text-white/70">
                  {t("emptySelection")}
                </div>
              )}
            </div>
          </div>

          {selectedFacility ? (
            <div className="mt-6 lg:hidden">
              <FacilityCard facility={selectedFacility} variant="popover" />
            </div>
          ) : null}
        </div>
      </section>

      <FacilityList
        facilities={facilities}
        visibleIds={visibleIds}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
