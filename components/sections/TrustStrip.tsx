import { getTranslations } from "next-intl/server";
import { CustomerLogoMarquee } from "@/components/sections/CustomerLogoMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCustomerLogos } from "@/lib/customers/logos";
import { cn } from "@/lib/utils";

export type TrustStripProps = {
  title?: string;
  className?: string;
};

export async function TrustStrip({ title, className }: TrustStripProps) {
  const t = await getTranslations("sections.trustStrip");
  const logos = getCustomerLogos();

  if (logos.length === 0) {
    return null;
  }
  return (
    <section className={cn("border-y border-ink/8 bg-mist py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={title ?? t("defaultTitle")}
          align="center"
          className="mb-10 md:mb-12"
        />

        <CustomerLogoMarquee logos={logos} />
      </div>
    </section>
  );
}
