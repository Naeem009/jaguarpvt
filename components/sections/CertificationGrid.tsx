import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const certificationLogos = [
  "/certifications/cert-01.svg",
  "/certifications/cert-02.svg",
  "/certifications/cert-03.svg",
  "/certifications/cert-04.svg",
];

export type CertificationGridProps = {
  className?: string;
};

export async function CertificationGrid({ className }: CertificationGridProps) {
  const t = await getTranslations("impact.governance.certifications");
  const items = t.raw("items") as Array<{
    name: string;
    description: string;
    issuer: string;
  }>;

  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subhead={t("subhead")}
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((certification, index) => (
            <Card
              key={certification.name}
              variant="interactive"
              className="group flex flex-col items-center p-6 text-center"
            >
              <div className="relative mb-5 h-16 w-full max-w-[120px]">
                <Image
                  src={certificationLogos[index] ?? certificationLogos[0]}
                  alt={t("logoAlt", { name: certification.name })}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">{certification.name}</h3>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.06em] text-graphite">
                {certification.issuer}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-graphite">{certification.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
