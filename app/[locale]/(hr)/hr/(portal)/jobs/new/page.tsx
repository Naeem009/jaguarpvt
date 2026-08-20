import { HrJobForm } from "@/components/hr/HrJobForm";
import { Button } from "@/components/ui/Button";
import { loadCmsJobDepartments, loadCmsJobOpenings, uniqueDepartmentNames } from "@/lib/careers/store";
import { displayDepartment } from "@/lib/hr/labels";

export default async function HrNewJobPage() {
  const [catalog, openings] = await Promise.all([loadCmsJobDepartments(), loadCmsJobOpenings()]);
  const departments = uniqueDepartmentNames([
    ...catalog,
    ...openings.map((opening) => displayDepartment(opening.department)),
  ]);

  return (
    <main className="space-y-8">
      <div className="space-y-3">
        <Button href="/hr" variant="tertiary">
          All openings
        </Button>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink">New opening</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-graphite">
          Fill the form and publish. The role is listed on the Career page until the last date of application.
        </p>
      </div>
      <HrJobForm mode="create" departments={departments} />
    </main>
  );
}
