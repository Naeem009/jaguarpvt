import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type TrustStripCategory = {
  label: string;
  image: string;
  alt: string;
};

export type TrustStripProps = {
  title?: string;
  categories: TrustStripCategory[];
  className?: string;
};

export async function TrustStrip({ title, categories, className }: TrustStripProps) {
  const t = await getTranslations("sections.trustStrip");

  return (
    <section className={cn("border-y border-ink/8 bg-mist py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={title ?? t("defaultTitle")}
          align="center"
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.label}
              className="flex flex-col items-center gap-4 rounded-[var(--radius-card-lg)] bg-white p-6 text-center shadow-[var(--shadow-card)]"
            >
              <div className="relative h-12 w-full max-w-[140px] opacity-70 grayscale">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="140px"
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-graphite">{category.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
