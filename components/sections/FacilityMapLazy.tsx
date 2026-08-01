"use client";

import { FacilityMap } from "./FacilityMap";
import type { Facility } from "@/lib/facilities";

export function FacilityMapLazy({
  facilities,
  filterEnabled,
}: {
  facilities: Facility[];
  filterEnabled?: boolean;
}) {
  return <FacilityMap facilities={facilities} filterEnabled={filterEnabled} />;
}
