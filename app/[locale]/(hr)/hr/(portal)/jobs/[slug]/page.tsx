import { notFound } from "next/navigation";
import { HrJobForm } from "@/components/hr/HrJobForm";
import { Button } from "@/components/ui/Button";
import { loadCmsJobDepartments, loadCmsJobOpenings, uniqueDepartmentNames } from "@/lib/careers/store";
import { displayDepartment } from "@/lib/hr/labels";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function HrEditJobPage({ params }: PageProps) {
  const { slug } = await params;
  const [catalog, openings] = await Promise.all([loadCmsJobDepartments(), loadCmsJobOpenings()]);
  const opening = openings.find((item) => item.slug === slug);

  if (!opening) {
    notFound();
  }

  const departments = uniqueDepartmentNames([
    ...catalog,
    ...openings.map((item) => displayDepartment(item.department)),
  ]);

  return (
    <main className="space-y-8">
      <div className="space-y-3">
        <Button href="/hr" variant="tertiary">
          All openings
        </Button>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink">Edit opening</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-graphite">
          Unpublish to hide this role immediately. After the last date it leaves the Career page on its own. The × on the
          jobs list deletes a role from the Career page at once.
        </p>
      </div>
      <HrJobForm mode="edit" initial={opening} departments={departments} />
    </main>
  );
}
