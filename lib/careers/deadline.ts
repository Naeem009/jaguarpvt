/** Pakistan Standard Time is UTC+5 year-round (no DST). */
export const CAREERS_TIME_ZONE = "Asia/Karachi";
const KARACHI_OFFSET = "+05:00";

const CLOSING_SOON_DAYS = 7;

export function endOfDeadlineInKarachi(date: string): Date {
  return new Date(`${date}T23:59:59.999${KARACHI_OFFSET}`);
}

export function isDeadlineOpen(date: string, now = new Date()): boolean {
  return endOfDeadlineInKarachi(date).getTime() >= now.getTime();
}

export function isClosingSoon(date: string, now = new Date()): boolean {
  if (!isDeadlineOpen(date, now)) {
    return false;
  }

  const msLeft = endOfDeadlineInKarachi(date).getTime() - now.getTime();
  return msLeft <= CLOSING_SOON_DAYS * 24 * 60 * 60 * 1000;
}

export function formatApplyByDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: CAREERS_TIME_ZONE,
  }).format(new Date(`${date}T12:00:00${KARACHI_OFFSET}`));
}

export function validThroughIso(date: string): string {
  return endOfDeadlineInKarachi(date).toISOString();
}
