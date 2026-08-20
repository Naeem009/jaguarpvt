import Link from "next/link";
import { loadCmsJobOpenings, listStatus } from "@/lib/careers/store";
import { formatApplyByDate } from "@/lib/careers/deadline";
import { departmentLabel } from "@/lib/hr/labels";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const statusCopy = {
  live: "Live on Career page",
  draft: "Draft — not visible",
  expired: "Past last date — hidden",
} as const;

export default async function HrJobsPage() {
  const openings = await loadCmsJobOpenings();
  const sorted = [...openings].sort((a, b) => a.applicationDeadline.localeCompare(b.applicationDeadline));

  return (
    <main className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.06em] text-graphite">Openings</p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink">Career jobs</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-graphite">
            Published roles appear on the Career page until the last date of application (end of that day, Pakistan time).
            Unpublish to hide a role early.
          </p>
        </div>
        <Button href="/hr/jobs/new" size="lg">
          New opening
        </Button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-base text-graphite">No openings yet. Create the first role to list it on the Career page.</p>
      ) : (
        <ul className="divide-y divide-ink/8 border-y border-ink/8">
          {sorted.map((opening) => {
            const status = listStatus(opening);
            return (
              <li key={opening.slug} className="py-6">
                <Link href={`/hr/jobs/${opening.slug}`} className="block space-y-2 outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl font-semibold text-ink">{opening.title}</h2>
                    <Badge tone={status === "live" ? "accent" : "neutral"}>{statusCopy[status]}</Badge>
                  </div>
                  <p className="text-sm text-graphite">
                    {departmentLabel(opening.department)} · {opening.location} · Apply by{" "}
                    {formatApplyByDate(opening.applicationDeadline, "en")}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
