import { HrJobsList } from "@/components/hr/HrJobsList";
import { Button } from "@/components/ui/Button";
import { loadCmsJobOpenings } from "@/lib/careers/store";

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
            Use the × on a row to delete a job immediately, even if it is expired or still active.
          </p>
        </div>
        <Button href="/hr/jobs/new" size="lg">
          New opening
        </Button>
      </div>

      <HrJobsList openings={sorted} />
    </main>
  );
}
