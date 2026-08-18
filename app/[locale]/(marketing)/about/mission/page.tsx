import { getTranslations, setRequestLocale } from "next-intl/server";
import { prepareLocale } from "@/lib/i18n/prepare-locale";
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

export async function generateMetadata({ params }: PageProps) {
  await prepareLocale(params);
  return createPageMetadata("aboutMission");
}

export default async function MissionPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.mission");
  const tCommon = await getTranslations("common");
  const blocks = t.raw("blocks") as Array<{ title: string; body: string; imageAlt: string }>;
  const values = t.raw("values") as Array<{ title: string; description: string }>;
  const images = aboutSubPageImages.mission;

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
          <SectionContainer width="narrow">
            <SectionHeading
              eyebrow={t("visionSection.eyebrow")}
              title={t("visionSection.title")}
              className="mb-8"
            />
            <p className="text-xl leading-relaxed text-graphite">{t("vision")}</p>
          </SectionContainer>
        </section>

        <section className={cn("bg-paper", sectionPaddingClass)}>
          <SectionContainer>
            <SectionHeading
              eyebrow={t("valuesSection.eyebrow")}
              title={t("valuesSection.title")}
              className="mb-12 md:mb-16"
            />
            <div className={cn("grid gap-6", evenCardGridClass(values.length))}>
              {values.map((value) => (
                <Card key={value.title}>
                  <h3 className="font-display text-xl font-semibold text-ink">{value.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-graphite">{value.description}</p>
                </Card>
              ))}
            </div>
          </SectionContainer>
        </section>
      </AboutSubPageTemplate>
    </main>
  );
}
