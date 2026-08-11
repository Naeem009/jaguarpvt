import type { Facility } from "./types";

/** Matches map-background.svg viewBox="0 0 950 620". */
export const FACILITY_MAP_VIEWBOX = { width: 950, height: 620 } as const;

/**
 * Linear lat/lng → pixel mapping for the South Asia region on map-background.svg.
 * Calibrated to country path placement (not equirectangular).
 */
const MAP_GEO_BOUNDS = {
  west: 61,
  east: 77,
  north: 37,
  south: 23,
} as const;

const MAP_PIXEL_BOUNDS = {
  left: 565,
  top: 220,
  right: 680,
  bottom: 320,
} as const;

export function projectFacilityToMapPosition(facility: Facility) {
  if (facility.mapX != null && facility.mapY != null) {
    return { x: facility.mapX, y: facility.mapY };
  }

  const xRatio =
    (facility.longitude - MAP_GEO_BOUNDS.west) /
    (MAP_GEO_BOUNDS.east - MAP_GEO_BOUNDS.west);
  const yRatio =
    (MAP_GEO_BOUNDS.north - facility.latitude) /
    (MAP_GEO_BOUNDS.north - MAP_GEO_BOUNDS.south);

  const xPx =
    MAP_PIXEL_BOUNDS.left +
    xRatio * (MAP_PIXEL_BOUNDS.right - MAP_PIXEL_BOUNDS.left);
  const yPx =
    MAP_PIXEL_BOUNDS.top +
    yRatio * (MAP_PIXEL_BOUNDS.bottom - MAP_PIXEL_BOUNDS.top);

  return {
    x: (xPx / FACILITY_MAP_VIEWBOX.width) * 100,
    y: (yPx / FACILITY_MAP_VIEWBOX.height) * 100,
  };
}
