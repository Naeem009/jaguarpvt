import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { AboutSubPageTemplate } from "@/components/sections";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutSubPageImages } from "@/lib/about/content";
import { evenCardGridClass, sectionPaddingClass } from "@/lib/layout/section";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("aboutStrategy");
}

export default async function StrategyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.strategy");
  const tCommon = await getTranslations("common");
  const blocks = t.raw("blocks") as Array<{ title: string; body: string; imageAlt: string }>;
  const pillars = t.raw("pillars") as Array<{ title: string; description: string }>;
  const images = aboutSubPageImages.strategy;

  return (
    <main>
      <AboutSubPageTemplate
        headline={t("headline")}
        subhead={t("subhead")}
        heroImage={images.hero}
        intro={t("intro")}
        blocks={blocks.map((block, index) => ({
          ...block,
          image: images.blocks[index],
        }))}
        cta={{
          title: t("cta.title"),
          subhead: t("cta.subhead"),
          label: tCommon("contactUs"),
          href: "/contact",
        }}
      >
        <section className={cn("bg-paper", sectionPaddingClass)}>
          <SectionContainer>
            <SectionHeading
              eyebrow={t("pillarsSection.eyebrow")}
              title={t("pillarsSection.title")}
              className="mb-12 md:mb-16"
            />
            <div className={cn("grid gap-6", evenCardGridClass(pillars.length))}>
              {pillars.map((pillar) => (
                <Card key={pillar.title}>
                  <h3 className="font-display text-xl font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-graphite">{pillar.description}</p>
                </Card>
              ))}
            </div>
          </SectionContainer>
        </section>
      </AboutSubPageTemplate>
    </main>
  );
}
