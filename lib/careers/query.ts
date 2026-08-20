import { isClosingSoon, isDeadlineOpen } from "./deadline";
import { jobOpenings } from "./openings";
import type { JobOpening, PublicOpening } from "./types";

function compareOpenings(a: JobOpening, b: JobOpening): number {
  if (a.pinned !== b.pinned) {
    return a.pinned ? -1 : 1;
  }

  const byDeadline = a.applicationDeadline.localeCompare(b.applicationDeadline);
  if (byDeadline !== 0) {
    return byDeadline;
  }

  return a.title.localeCompare(b.title);
}

export function isOpeningActive(opening: JobOpening, now = new Date()): boolean {
  return opening.published && isDeadlineOpen(opening.applicationDeadline, now);
}

export function getActiveOpenings(now = new Date()): PublicOpening[] {
  return jobOpenings
    .filter((opening) => isOpeningActive(opening, now))
    .sort(compareOpenings)
    .map((opening) => toPublicOpening(opening, now));
}

export function getOpeningBySlug(slug: string): JobOpening | undefined {
  return jobOpenings.find((opening) => opening.slug === slug);
}

export function getAllOpeningSlugs(): string[] {
  return jobOpenings.filter((opening) => opening.published).map((opening) => opening.slug);
}

export function toPublicOpening(opening: JobOpening, now = new Date()): PublicOpening {
  return {
    slug: opening.slug,
    title: opening.title,
    department: opening.department,
    location: opening.location,
    employmentType: opening.employmentType,
    applicationDeadline: opening.applicationDeadline,
    pinned: opening.pinned,
    closingSoon: isClosingSoon(opening.applicationDeadline, now),
  };
}
