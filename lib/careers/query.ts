import { isClosingSoon, isDeadlineOpen } from "./deadline";
import { loadJobOpenings } from "./store";
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

export async function getAllOpenings(): Promise<JobOpening[]> {
  return loadJobOpenings();
}

export async function getActiveOpenings(now = new Date()): Promise<PublicOpening[]> {
  const openings = await loadJobOpenings();
  return openings
    .filter((opening) => isOpeningActive(opening, now))
    .sort(compareOpenings)
    .map((opening) => toPublicOpening(opening, now));
}

export async function getOpeningBySlug(slug: string): Promise<JobOpening | undefined> {
  const openings = await loadJobOpenings();
  return openings.find((opening) => opening.slug === slug);
}

export async function getAllOpeningSlugs(): Promise<string[]> {
  const openings = await loadJobOpenings();
  return openings.filter((opening) => opening.published).map((opening) => opening.slug);
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
