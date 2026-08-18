import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  AboutSubPageTemplate,
  TimelineSection,
} from "@/components/sections";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  aboutHistoryImages,
  aboutLeadershipImages,
  aboutSubPageImages,
} from "@/lib/about/content";
import { evenCardGridClass, sectionPaddingClass } from "@/lib/layout/section";
import { buildCompanyStats } from "@/lib/stats/company-stats";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("atAGlance");
}

export default async function AtAGlancePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.atAGlance");
  const tStats = await getTranslations("about.stats");
  const tCommon = await getTranslations("common");
  const blocks = t.raw("blocks") as Array<{ title: string; body: string; imageAlt: string }>;
  const historySteps = t.raw("history.steps") as Array<{ title: string; description: string }>;
  const leaders = t.raw("leadership.members") as Array<{ name: string; role: string; alt: string }>;
  const awards = t.raw("recognition.awards") as Array<{ title: string; year: string; issuer: string }>;
  const images = aboutSubPageImages["at-a-glance"];

  const companyStats = buildCompanyStats({
    facilities: tStats("facilities"),
    countries: tStats("countries"),
    employees: tStats("employees"),
    yearsInOperation: tStats("yearsInOperation"),
  });

  return (
    <main>
      <AboutSubPageTemplate
        headline={t("headline")}
        subhead={t("subhead")}
        heroImage={images.hero}
        stats={companyStats}
        intro={t("intro")}
        blocks={blocks.map((block, index) => ({
          ...block,
          image: images.blocks[index],
        }))}
        cta={{
          title: t("cta.title"),
          subhead: t("cta.subhead"),
          label: tCommon("learnMore"),
          href: "/about/strategy",
        }}
      >
        <TimelineSection
          eyebrow={t("history.eyebrow")}
          title={t("history.title")}
          subhead={t("history.subhead")}
          steps={historySteps.map((step, index) => ({
            ...step,
            image: aboutHistoryImages[index],
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
                <Card key={leader.name} className="overflow-hidden p-0">
                  <div className="relative aspect-[4/5] bg-paper">
                    <Image
                      src={aboutLeadershipImages[index]}
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
      </AboutSubPageTemplate>
    </main>
  );
}
