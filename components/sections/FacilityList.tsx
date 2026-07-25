import { FacilityCard } from "./FacilityCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Facility } from "@/lib/facilities";
import { cn } from "@/lib/utils";

export type FacilityListProps = {
  facilities: Facility[];
  visibleIds?: string[] | null;
  selectedId?: string | null;
  onSelect?: (facilityId: string) => void;
  className?: string;
};

export function FacilityList({
  facilities,
  visibleIds,
  selectedId,
  onSelect,
  className,
}: FacilityListProps) {
  const filteredFacilities =
    visibleIds == null
      ? facilities
      : facilities.filter((facility) => visibleIds.includes(facility.id));

  return (
    <section className={cn("bg-paper py-16 md:py-24", className)} aria-label="Facility list">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="All facilities"
          title="Browse the full facility list"
          subhead="Accessible list view of every published facility — useful on mobile or for keyboard and screen-reader users."
          className="mb-10 md:mb-12"
        />

        {filteredFacilities.length === 0 ? (
          <p className="rounded-[var(--radius-card-lg)] border border-ink/8 bg-white p-8 text-sm text-graphite">
            No facilities match the current filter. Clear the search to view all locations.
          </p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredFacilities.map((facility) => (
              <li key={facility.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(facility.id)}
                  className={cn(
                    "block w-full text-start",
                    selectedId === facility.id && "ring-2 ring-accent ring-offset-2 rounded-[var(--radius-card-lg)]",
                  )}
                  aria-current={selectedId === facility.id ? "true" : undefined}
                >
                  <FacilityCard facility={facility} variant="list" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
