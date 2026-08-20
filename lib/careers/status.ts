import type { JobOpening } from "./types";

export function listStatus(opening: JobOpening, now = new Date()) {
  if (!opening.published) {
    return "draft" as const;
  }

  const deadline = new Date(`${opening.applicationDeadline}T23:59:59.999+05:00`);
  if (deadline.getTime() < now.getTime()) {
    return "expired" as const;
  }

  return "live" as const;
}
