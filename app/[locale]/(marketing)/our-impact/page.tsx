import { getTranslations, setRequestLocale } from "next-intl/server";
import { prepareLocale } from "@/lib/i18n/prepare-locale";
import { createPageMetadata } from "@/lib/seo/metadata";
import { heroVideoMedia } from "@/lib/media/hero-media";
import {
  CTASection,
  Hero,
  ImpactPillarGrid,
  StatBar,
  SustainabilityEstimator,
} from "@/components/sections";
import { ESG_REPORT_URL } from "@/lib/our-impact/content";
import { buildImpactHubStats } from "@/lib/stats/impact-hub-stats";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  await prepareLocale(params);
  return createPageMetadata("ourImpact");
}

export default async function OurImpactHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impact.hub");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const impactStats = buildImpactHubStats({
    waterSaved: t("stats.waterSaved"),
    renewableEnergy: t("stats.renewableEnergy"),
    certifiedFacilities: t("stats.certifiedFacilities"),
    workerPrograms: t("stats.workerPrograms"),
  });

  return (
    <main>
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tNav("downloadEsg"), href: ESG_REPORT_URL }}
        secondaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={heroVideoMedia("/images/our-impact/environment/hero.jpg", t("hero.alt"), "sustainability")}
      />

      <StatBar stats={impactStats} variant="impact" />

      <ImpactPillarGrid />

      <SustainabilityEstimator />

      <CTASection
        title={t("cta.title")}
        subhead={t("cta.subhead")}
        cta={{ label: tNav("downloadEsg"), href: ESG_REPORT_URL }}
      />
    </main>
  );
}
