import { notFound } from "next/navigation";
import { HrJobForm } from "@/components/hr/HrJobForm";
import { Button } from "@/components/ui/Button";
import { loadCmsJobOpenings } from "@/lib/careers/store";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function HrEditJobPage({ params }: PageProps) {
  const { slug } = await params;
  const openings = await loadCmsJobOpenings();
  const opening = openings.find((item) => item.slug === slug);

  if (!opening) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <div className="space-y-3">
        <Button href="/hr" variant="tertiary">
          All openings
        </Button>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink">Edit opening</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-graphite">
          Unpublish to hide this role immediately. After the last date it leaves the Career page on its own.
        </p>
      </div>
      <HrJobForm mode="edit" initial={opening} />
    </main>
  );
}
