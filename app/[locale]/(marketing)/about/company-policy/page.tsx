import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { AboutSubPageTemplate } from "@/components/sections";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutSubPageImages } from "@/lib/about/content";
import { sectionPaddingClass } from "@/lib/layout/section";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("aboutCompanyPolicy");
}

export default async function CompanyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.companyPolicy");
  const tCommon = await getTranslations("common");
  const blocks = t.raw("blocks") as Array<{ title: string; body: string; imageAlt: string }>;
  const policies = t.raw("policies") as Array<{ title: string; description: string }>;
  const images = aboutSubPageImages["company-policy"];

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
              eyebrow={t("policiesSection.eyebrow")}
              title={t("policiesSection.title")}
              className="mb-12 md:mb-16"
            />
            <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3")}>
              {policies.map((policy) => (
                <Card key={policy.title}>
                  <h3 className="font-display text-lg font-semibold text-ink">{policy.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{policy.description}</p>
                </Card>
              ))}
            </div>
          </SectionContainer>
        </section>
      </AboutSubPageTemplate>
    </main>
  );
}
