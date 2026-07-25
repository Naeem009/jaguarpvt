import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type ProductSpecRow = {
  label: string;
  value: string;
};

export type ProductSpecsTableProps = {
  eyebrow?: string;
  title?: string;
  subhead?: string;
  rows: ProductSpecRow[];
  className?: string;
};

export async function ProductSpecsTable({
  eyebrow,
  title,
  subhead,
  rows,
  className,
}: ProductSpecsTableProps) {
  const t = await getTranslations("sections.productSpecs");

  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={eyebrow ?? t("eyebrow")}
          title={title ?? t("title")}
          subhead={subhead ?? t("subhead")}
          className="mb-10 md:mb-12"
        />

        <div className="overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 shadow-[var(--shadow-card)]">
          <table className="w-full border-collapse text-start">
            <thead className="bg-mist">
              <tr>
                <th scope="col" className="px-6 py-4 text-sm font-medium uppercase tracking-[0.06em] text-graphite">
                  {t("specHeader")}
                </th>
                <th scope="col" className="px-6 py-4 text-sm font-medium uppercase tracking-[0.06em] text-graphite">
                  {t("detailsHeader")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.label} className={index % 2 === 0 ? "bg-white" : "bg-paper"}>
                  <th scope="row" className="border-t border-ink/8 px-6 py-4 align-top text-sm font-medium text-ink">
                    {row.label}
                  </th>
                  <td className="border-t border-ink/8 px-6 py-4 align-top text-sm leading-relaxed text-graphite">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
