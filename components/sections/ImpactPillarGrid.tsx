import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const pillarConfig = [
  {
    key: "environment",
    href: "/our-impact/environment",
    image: "/images/our-impact/environment/solar.jpg",
    placeholders: ["[X]M", "[X]%"],
  },
  {
    key: "people",
    href: "/our-impact/people",
    image: "/images/our-impact/people/community.jpg",
    placeholders: ["[X]", "[X]+"],
  },
  {
    key: "governance",
    href: "/our-impact/governance",
    image: "/images/our-impact/governance/hero.jpg",
    placeholders: ["[X]", "[X]"],
  },
] as const;

export type ImpactPillarGridProps = {
  className?: string;
};

export async function ImpactPillarGrid({ className }: ImpactPillarGridProps) {
  const t = await getTranslations("impact.hub.pillars");

  const pillars = pillarConfig.map((config) => {
    const metrics = t.raw(`${config.key}.metrics`) as string[];

    return {
      title: t(`${config.key}.title`),
      href: config.href,
      image: config.image,
      description: t(`${config.key}.description`),
      metrics: metrics.map((label, index) => ({
        label,
        placeholder: config.placeholders[index] ?? "[X]",
      })),
    };
  });

  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subhead={t("subhead")}
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link key={pillar.href} href={pillar.href} className="group block h-full">
              <Card variant="interactive" className="flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-semibold text-ink">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-graphite">{pillar.description}</p>
                  </div>
                  <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-ink/8 pt-5">
                    {pillar.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="font-mono text-2xl font-bold text-accent">{metric.placeholder}</dt>
                        <dd className="mt-1 text-xs font-medium uppercase tracking-[0.06em] text-graphite">
                          {metric.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
