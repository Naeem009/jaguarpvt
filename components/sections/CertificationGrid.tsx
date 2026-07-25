import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Certification } from "@/lib/our-impact/content";

export type CertificationGridProps = {
  certifications: Certification[];
  className?: string;
};

export function CertificationGrid({ certifications, className }: CertificationGridProps) {
  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Certifications"
          title="Audit-ready credentials"
          subhead="Certification scope varies by facility and product line — confirm applicability for your program with our team."
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((certification) => (
            <Card
              key={certification.name}
              variant="interactive"
              className="group flex flex-col items-center p-6 text-center"
            >
              <div className="relative mb-5 h-16 w-full max-w-[120px]">
                <Image
                  src={certification.logo}
                  alt={`${certification.name} certification logo`}
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
