import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CertificationGrid, ImpactSubPageTemplate } from "@/components/sections";
import { certifications, governanceContent } from "@/lib/our-impact/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata() {
  return createPageMetadata("governance");
}

export default async function GovernancePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <ImpactSubPageTemplate
        headline="Governance & Certifications"
        subhead="Certifications, compliance systems, and governance structures that support buyer audit and due diligence."
        heroImage={governanceContent.heroImage}
        stats={governanceContent.stats}
        intro={governanceContent.intro}
        cta={{
          title: "Request certification scope for your program",
          subhead: "Confirm which credentials apply to your product category, facility, and compliance requirements.",
          href: "/contact",
          label: "Contact Us",
        }}
      >
        <CertificationGrid certifications={certifications} />
      </ImpactSubPageTemplate>
    </main>
  );
}
