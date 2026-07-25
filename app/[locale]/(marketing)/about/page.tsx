import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  CTASection,
  Hero,
  StatBar,
  TimelineSection,
} from "@/components/sections";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/about/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata() {
  return createPageMetadata("about");
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { hero, mission, stats, history, leadership, awards, cta } = aboutContent;

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline={hero.headline}
        subhead={hero.subhead}
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        media={{ type: "image", src: hero.image, alt: hero.alt }}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 shadow-[var(--shadow-card)]">
            <Image
              src={mission.image}
              alt={mission.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <SectionHeading eyebrow={mission.eyebrow} title={mission.title} subhead={mission.body} />
        </div>
      </section>

      <StatBar stats={stats} variant="impact" />

      <TimelineSection
        eyebrow="History"
        title={history.title}
        subhead={history.subhead}
        steps={history.steps}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Leadership"
            title="Experienced operators across manufacturing and commercial functions"
            subhead="Replace placeholder names and headshots with approved leadership profiles before publishing."
            className="mb-12 md:mb-16"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((leader) => (
              <Card key={leader.title} className="overflow-hidden p-0">
                <div className="relative aspect-[4/5] bg-mist">
                  <Image
                    src={leader.image}
                    alt={leader.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">{leader.name}</h3>
                  <p className="text-sm text-graphite">{leader.title}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Recognition"
            title="Awards and industry recognition"
            subhead="Placeholder entries below — replace with verified awards and issuing organizations before publishing."
            className="mb-12 md:mb-16"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {awards.map((award) => (
              <Card key={award.title}>
                <Badge tone="accent" className="mb-4">
                  {award.year}
                </Badge>
                <h3 className="font-display text-xl font-semibold text-ink">{award.title}</h3>
                <p className="mt-3 text-sm text-graphite">{award.issuer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={cta.title} subhead={cta.subhead} cta={{ label: cta.label, href: cta.href }} />
    </main>
  );
}
