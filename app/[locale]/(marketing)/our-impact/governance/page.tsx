import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CertificationGrid, ImpactSubPageTemplate } from "@/components/sections";
import { governanceContent } from "@/lib/our-impact/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("governance");
}

export default async function GovernancePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impact.governance");
  const tCommon = await getTranslations("common");

  return (
    <main className="flex-1">
      <ImpactSubPageTemplate
        headline={t("headline")}
        subhead={t("subhead")}
        heroImage={governanceContent.heroImage}
        stats={[
          { value: 0, placeholder: "[X]", label: t("stats.certifications") },
          { value: 0, placeholder: "[X]", label: t("stats.auditFacilities") },
          { value: 0, placeholder: "[X]", label: t("stats.policyReviews") },
        ]}
        intro={t("intro")}
        cta={{
          title: t("cta.title"),
          subhead: t("cta.subhead"),
          href: "/contact",
          label: tCommon("contactUs"),
        }}
      >
        <CertificationGrid />
      </ImpactSubPageTemplate>
    </main>
  );
}
