"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatApplyByDate } from "@/lib/careers/deadline";
import { listStatus } from "@/lib/careers/status";
import type { JobOpening } from "@/lib/careers/types";
import { displayDepartment } from "@/lib/hr/labels";

const statusCopy = {
  live: "Live on Career page",
  draft: "Draft — not visible",
  expired: "Past last date — hidden",
} as const;

type HrJobsListProps = {
  openings: JobOpening[];
};

export function HrJobsList({ openings }: HrJobsListProps) {
  const router = useRouter();
  const [items, setItems] = useState(openings);
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function removeOpening(opening: JobOpening) {
    if (!window.confirm(`Remove “${opening.title}” from the list and the Career page? This cannot be undone.`)) {
      return;
    }

    setPendingSlug(opening.slug);
    setError(null);

    try {
      const response = await fetch(`/api/hr/jobs/${opening.slug}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to remove this opening.");
      }
      setItems((current) => current.filter((item) => item.slug !== opening.slug));
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to remove this opening.");
    } finally {
      setPendingSlug(null);
    }
  }

  if (items.length === 0) {
    return <p className="text-base text-graphite">No openings yet. Create the first role to list it on the Career page.</p>;
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-sm text-error">{error}</p> : null}
      <ul className="divide-y divide-ink/8 border-y border-ink/8">
        {items.map((opening) => {
          const status = listStatus(opening);
          const removing = pendingSlug === opening.slug;
          return (
            <li key={opening.slug} className="flex items-start gap-3 py-6">
              <Link
                href={`/hr/jobs/${opening.slug}`}
                className="min-w-0 flex-1 space-y-2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-semibold text-ink">{opening.title}</h2>
                  <Badge tone={status === "live" ? "accent" : "neutral"}>{statusCopy[status]}</Badge>
                </div>
                <p className="text-sm text-graphite">
                  {displayDepartment(opening.department)} · {opening.location} · Apply by{" "}
                  {formatApplyByDate(opening.applicationDeadline, "en")}
                </p>
              </Link>
              <button
                type="button"
                onClick={() => void removeOpening(opening)}
                disabled={removing}
                className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-xl leading-none text-graphite hover:border-error hover:text-error disabled:opacity-50"
                aria-label={`Delete ${opening.title}`}
                title="Delete this job"
              >
                {removing ? "…" : "×"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
