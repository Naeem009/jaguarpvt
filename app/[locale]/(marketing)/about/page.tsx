import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CTASection, Hero, ProductGrid } from "@/components/sections";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getAboutHubGridItems } from "@/lib/about/get-content";
import { aboutHubHeroImage } from "@/lib/about/content";
import { heroVideoMedia } from "@/lib/media/hero-media";
import { sectionPaddingClass } from "@/lib/layout/section";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("about");
}

export default async function AboutHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.hub");
  const tCommon = await getTranslations("common");
  const aboutItems = await getAboutHubGridItems();

  return (
    <main>
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        secondaryCTA={{ label: t("hero.exploreSections"), href: "#sections" }}
        media={heroVideoMedia(aboutHubHeroImage, t("hero.alt"), "manufacturing")}
      />

      <section className={cn("bg-paper", sectionPaddingClass)}>
        <SectionContainer width="narrow">
          <h2 className="font-display text-3xl font-semibold text-ink">{t("overview.title")}</h2>
          <p className="mt-6 text-lg leading-relaxed text-graphite">{t("overview.body")}</p>
        </SectionContainer>
      </section>

      <div id="sections">
        <ProductGrid
          eyebrow={t("grid.eyebrow")}
          title={t("grid.title")}
          subhead={t("grid.subhead")}
          items={aboutItems}
        />
      </div>

      <CTASection
        title={t("cta.title")}
        subhead={t("cta.subhead")}
        cta={{ label: tCommon("contactUs"), href: "/contact" }}
      />
    </main>
  );
}
