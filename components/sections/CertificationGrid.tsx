import { getTranslations } from "next-intl/server";
import { CertificationMarquee } from "@/components/sections/CertificationMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCertificationLogos } from "@/lib/certifications/logos";
import { cn } from "@/lib/utils";

export type CertificationGridProps = {
  className?: string;
};

export async function CertificationGrid({ className }: CertificationGridProps) {
  const t = await getTranslations("impact.governance.certifications");
  const logos = getCertificationLogos();

  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subhead={t("subhead")}
          align="center"
          className="mb-10 md:mb-12"
        />

        {logos.length > 0 ? <CertificationMarquee logos={logos} /> : null}
      </div>
    </section>
  );
}
