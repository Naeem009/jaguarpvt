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
  const productItems = await getProductHubGridItems();

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

      <StatBar
        stats={[
          { value: 0, placeholder: "[6]", label: t("stats.facilities") },
          { value: 0, placeholder: "[5]", label: t("stats.countries") },
          { value: 0, placeholder: "[900]+", label: t("stats.employees") },
          { value: 0, placeholder: "[40]", label: t("stats.yearsInOperation") },
        ]}
      />

      <ProductGrid items={productItems} />

      <AIChatWidget mode="embedded" context={t("aiContext")} />

      <StatBar
        variant="impact"
        stats={[
          { value: 0, placeholder: "[X]M", label: t("impactStats.waterSaved") },
          { value: 0, placeholder: "[X]%", label: t("impactStats.renewableEnergy") },
          { value: 0, placeholder: "[X]", label: t("impactStats.certifiedFacilities") },
        ]}
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
