/** Shared horizontal rhythm for marketing sections. */
export const sectionContainerClass = "mx-auto w-full max-w-7xl px-4 md:px-6";

export const sectionPaddingClass = "py-16 md:py-24";

export const sectionPaddingCompactClass = "py-12 md:py-16";

/** Even column layout for 1–4 items (stat bars, card grids, etc.). */
export function evenGridColumnsClass(count: number): string {
  switch (Math.min(Math.max(count, 1), 4)) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 3:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    default:
      return "grid-cols-2 lg:grid-cols-4";
  }
}

/** Responsive product/feature grids based on item count. */
export function evenCardGridClass(count: number): string {
  if (count >= 4) {
    return "sm:grid-cols-2 xl:grid-cols-4";
  }
  if (count === 3) {
    return "sm:grid-cols-2 lg:grid-cols-3";
  }
  if (count === 2) {
    return "sm:grid-cols-2";
  }
  return "grid-cols-1";
}
