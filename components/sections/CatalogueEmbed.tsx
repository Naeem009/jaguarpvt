import fs from "node:fs";
import path from "node:path";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type CatalogueEmbedProps = {
  fileUrl: string;
  title?: string;
  emptyState?: boolean;
  className?: string;
};

function catalogueExists(fileUrl: string) {
  const relativePath = fileUrl.replace(/^\//, "");
  const absolutePath = path.join(process.cwd(), "public", relativePath);
  return fs.existsSync(absolutePath);
}

export function CatalogueEmbed({
  fileUrl,
  title = "Browse the Baby Wear Catalogue",
  emptyState,
  className,
}: CatalogueEmbedProps) {
  const hasFile = !emptyState && catalogueExists(fileUrl);

  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Card className="mx-auto max-w-4xl shadow-[var(--shadow-card-hover)]">
          <SectionHeading
            eyebrow="Catalogue"
            title={title}
            subhead="Explore our full Baby Wear range — fabrics, sizing, and finishing options."
            className="mb-8"
          />

          {hasFile ? (
            <>
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-ink/8">
                <iframe
                  src={fileUrl}
                  title="Baby Wear product catalogue, PDF"
                  className="aspect-[4/3] w-full bg-paper md:aspect-[16/10]"
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={fileUrl}
                  download
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/10 bg-transparent px-6 text-base font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Download PDF
                </a>
                <Button href="/contact?category=baby-wear">Request This Catalogue</Button>
              </div>
            </>
          ) : (
            <div className="rounded-[var(--radius-card-lg)] border border-dashed border-ink/15 bg-paper px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-mist text-2xl text-graphite">
                📄
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">Catalogue coming soon</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-graphite">
                The Baby Wear e-catalogue will be available here once uploaded. Request a copy from
                our team in the meantime.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/contact?category=baby-wear">Request This Catalogue</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
