import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  AIChatWidget,
  CTASection,
  FacilityMapTeaser,
  Hero,
  ProductGrid,
  StatBar,
  TrustStrip,
} from "@/components/sections";
import { getProductHubGridItems } from "@/lib/products/get-content";
import { buildCompanyStats } from "@/lib/stats/company-stats";
import { buildImpactHubStats } from "@/lib/stats/impact-hub-stats";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("home");
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tImpactStats = await getTranslations("impact.hub.stats");
  const productItems = await getProductHubGridItems();
  const companyStats = buildCompanyStats({
    facilities: t("stats.facilities"),
    countries: t("stats.countries"),
    employees: t("stats.employees"),
    yearsInOperation: t("stats.yearsInOperation"),
  });
  const impactStats = buildImpactHubStats({
    waterSaved: tImpactStats("waterSaved"),
    renewableEnergy: tImpactStats("renewableEnergy"),
    certifiedFacilities: tImpactStats("certifiedFacilities"),
    workerPrograms: tImpactStats("workerPrograms"),
  });

  return (
    <main>
      <Hero
        variant="home"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        secondaryCTA={{ label: tCommon("exploreProducts"), href: "/products" }}
        media={{
          type: "video",
          src: "/videos/home/hero-stitching.mp4",
          poster: "/images/home/hero.jpg",
          alt: t("hero.heroAlt"),
        }}
      />

      <StatBar stats={companyStats} />

      <ProductGrid items={productItems} />

      <AIChatWidget mode="embedded" context={t("aiContext")} />

      <StatBar
        variant="impact"
        stats={impactStats}
        footerLink={{ href: "/our-impact", label: t("impactStats.exploreImpact") }}
      />

      <FacilityMapTeaser image="/images/home/facility-teaser.jpg" />

      <TrustStrip />

      <CTASection
        title={t("cta.title")}
        subhead={t("cta.subhead")}
        cta={{ label: tCommon("contactUs"), href: "/contact" }}
      />
    </main>
  );
}
