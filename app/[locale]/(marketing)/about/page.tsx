import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { heroVideoMedia } from "@/lib/media/hero-media";
import {
  CTASection,
  Hero,
  StatBar,
  TimelineSection,
} from "@/components/sections";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("about");
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const historySteps = t.raw("history.steps") as Array<{ title: string; description: string }>;
  const awards = t.raw("recognition.awards") as Array<{ title: string; year: string; issuer: string }>;
  const leaders = t.raw("leadership.members") as Array<{ name: string; role: string; alt: string }>;
  const leaderImages = [
    "/images/about/leadership-01.png",
    "/images/about/leadership-02.png",
    "/images/about/leadership-03.png",
  ];

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={heroVideoMedia("/images/about/hero.jpg", t("hero.alt"), "manufacturing")}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 shadow-[var(--shadow-card)]">
            <Image
              src="/images/about/mission-block.jpg"
              alt={t("mission.alt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <SectionHeading eyebrow={t("mission.eyebrow")} title={t("mission.title")} subhead={t("mission.body")} />
        </div>
      </section>

      <StatBar
        stats={[
          { value: 0, placeholder: "[X]", label: t("stats.facilities") },
          { value: 0, placeholder: "[Y]", label: t("stats.countries") },
          { value: 0, placeholder: "[Z]+", label: t("stats.employees") },
          { value: 0, placeholder: "[N]", label: t("stats.yearsInOperation") },
        ]}
        variant="impact"
      />

      <TimelineSection
        eyebrow={t("history.eyebrow")}
        title={t("history.title")}
        subhead={t("history.subhead")}
        steps={historySteps.map((step, index) => ({
          ...step,
          image: `/images/about/history-0${index + 1}.jpg`,
        }))}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={t("leadership.eyebrow")}
            title={t("leadership.title")}
            className="mb-12 md:mb-16"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, index) => (
              <Card key={`${leader.name}-${index}`} className="overflow-hidden p-0">
                <div className="relative aspect-[4/5] bg-mist">
                  <Image
                    src={leaderImages[index]}
                    alt={leader.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">{leader.name}</h3>
                  <p className="text-sm text-graphite">{leader.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={t("recognition.eyebrow")}
            title={t("recognition.title")}
            subhead={t("recognition.subhead")}
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

      <CTASection
        title={t("cta.title")}
        subhead={t("cta.subhead")}
        cta={{ label: tCommon("contactUs"), href: "/contact" }}
      />
    </main>
  );
}
