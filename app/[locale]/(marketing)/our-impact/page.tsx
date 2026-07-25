import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  CTASection,
  Hero,
  ImpactPillarGrid,
  StatBar,
  SustainabilityEstimator,
} from "@/components/sections";
import { ESG_REPORT_URL } from "@/lib/our-impact/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("ourImpact");
}

export default async function OurImpactHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impact.hub");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tNav("downloadEsg"), href: ESG_REPORT_URL }}
        secondaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={{
          type: "image",
          src: "/images/our-impact/environment/hero.svg",
          alt: t("hero.alt"),
        }}
      />

      <StatBar
        stats={[
          { value: 0, placeholder: "[X]M", label: t("stats.waterSaved") },
          { value: 0, placeholder: "[X]%", label: t("stats.renewableEnergy") },
          { value: 0, placeholder: "[X]", label: t("stats.certifiedFacilities") },
          { value: 0, placeholder: "[X]", label: t("stats.workerPrograms") },
        ]}
        variant="impact"
      />

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
