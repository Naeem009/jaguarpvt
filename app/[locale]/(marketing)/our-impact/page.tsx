import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  CTASection,
  Hero,
  ImpactPillarGrid,
  StatBar,
  SustainabilityEstimator,
} from "@/components/sections";
import {
  ESG_REPORT_URL,
  impactPillars,
  ourImpactHubStats,
} from "@/lib/our-impact/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata() {
  return createPageMetadata("ourImpact");
}

export default async function OurImpactHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline="Our Impact"
        subhead="Verified programs across environment, people, and governance — measured against published benchmarks and audit-ready documentation."
        primaryCTA={{ label: "Download ESG Report", href: ESG_REPORT_URL }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
        media={{
          type: "image",
          src: "/images/our-impact/environment/hero.svg",
          alt: "Solar and water stewardship programs at manufacturing facilities",
        }}
      />

      <StatBar stats={ourImpactHubStats} variant="impact" />

      <ImpactPillarGrid pillars={impactPillars} />

      <SustainabilityEstimator />

      <CTASection
        title="Review our full impact reporting"
        subhead="Download the latest ESG report for methodology, facility-level programs, and certification scope."
        cta={{ label: "Download ESG Report", href: ESG_REPORT_URL }}
      />
    </main>
  );
}
