import fs from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
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

export async function CatalogueEmbed({
  fileUrl,
  title,
  emptyState,
  className,
}: CatalogueEmbedProps) {
  const t = await getTranslations("catalogue");
  const resolvedTitle = title ?? t("defaultTitle");
  const hasFile = !emptyState && catalogueExists(fileUrl);

  return (
    <section className={cn("bg-paper py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Card className="mx-auto max-w-4xl shadow-[var(--shadow-card-hover)]">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={resolvedTitle}
            subhead={t("subhead")}
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
                  {t("downloadPdf")}
                </a>
                <Button href="/contact?category=baby-wear">{t("requestCatalogue")}</Button>
              </div>
            </>
          ) : (
            <div className="rounded-[var(--radius-card-lg)] border border-dashed border-ink/15 bg-paper px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-paper text-2xl text-graphite">
                📄
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">{t("comingSoonTitle")}</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-graphite">
                {t("comingSoonBody")}
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/contact?category=baby-wear">{t("requestCatalogue")}</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
