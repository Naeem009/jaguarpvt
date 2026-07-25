"use client";

import dynamic from "next/dynamic";
import type { Facility } from "@/lib/facilities";

const FacilityMap = dynamic(
  () => import("./FacilityMap").then((module) => module.FacilityMap),
  {
    ssr: false,
    loading: () => (
      <div className="bg-charcoal py-24 text-center text-white/70">
        Loading interactive facility map...
      </div>
    ),
  },
);

export function FacilityMapLazy({
  facilities,
  filterEnabled,
}: {
  facilities: Facility[];
  filterEnabled?: boolean;
}) {
  return <FacilityMap facilities={facilities} filterEnabled={filterEnabled} />;
}
