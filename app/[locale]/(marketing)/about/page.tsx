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
import { SectionContainer } from "@/components/ui/SectionContainer";
import { evenCardGridClass, sectionPaddingClass } from "@/lib/layout/section";
import { buildCompanyStats } from "@/lib/stats/company-stats";
import { cn } from "@/lib/utils";

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
  const companyStats = buildCompanyStats({
    facilities: t("stats.facilities"),
    countries: t("stats.countries"),
    employees: t("stats.employees"),
    yearsInOperation: t("stats.yearsInOperation"),
  });
  const leaderImages = [
    "/images/about/leadership-01.png",
    "/images/about/leadership-02.png",
    "/images/about/leadership-03.png",
  ];

  return (
    <main>
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={heroVideoMedia("/images/about/hero.jpg", t("hero.alt"), "manufacturing")}
      />

      <section className={cn("bg-paper", sectionPaddingClass)}>
        <SectionContainer className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
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
        </SectionContainer>
      </section>

      <StatBar stats={companyStats} />

      <TimelineSection
        eyebrow={t("history.eyebrow")}
        title={t("history.title")}
        subhead={t("history.subhead")}
        steps={historySteps.map((step, index) => ({
          ...step,
          image: `/images/about/history-0${index + 1}.jpg`,
        }))}
      />

      <section className={cn("bg-paper", sectionPaddingClass)}>
        <SectionContainer>
          <SectionHeading
            eyebrow={t("leadership.eyebrow")}
            title={t("leadership.title")}
            className="mb-12 md:mb-16"
          />

          <div className={cn("grid gap-6", evenCardGridClass(leaders.length))}>
            {leaders.map((leader, index) => (
              <Card key={`${leader.name}-${index}`} className="overflow-hidden p-0">
                <div className="relative aspect-[4/5] bg-paper">
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
        </SectionContainer>
      </section>

      <section className={cn("bg-paper", sectionPaddingClass)}>
        <SectionContainer>
          <SectionHeading
            eyebrow={t("recognition.eyebrow")}
            title={t("recognition.title")}
            subhead={t("recognition.subhead")}
            className="mb-12 md:mb-16"
          />

          <div className={cn("grid gap-6", evenCardGridClass(awards.length))}>
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
        </SectionContainer>
      </section>

      <CTASection
        title={t("cta.title")}
        subhead={t("cta.subhead")}
        cta={{ label: tCommon("contactUs"), href: "/contact" }}
      />
    </main>
  );
}
