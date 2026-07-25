import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ImpactSubPageTemplate } from "@/components/sections";
import { environmentContent } from "@/lib/our-impact/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("environment");
}

export default async function EnvironmentPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impact.environment");
  const tCommon = await getTranslations("common");
  const blocks = t.raw("blocks") as Array<{ title: string; body: string; imageAlt: string }>;

  return (
    <main className="flex-1">
      <ImpactSubPageTemplate
        headline={t("headline")}
        subhead={t("subhead")}
        heroImage={environmentContent.heroImage}
        stats={[
          { value: 0, placeholder: "[X]M", label: t("stats.waterRecycled") },
          { value: 0, placeholder: "[X]%", label: t("stats.renewableEnergy") },
          { value: 0, placeholder: "[X]", label: t("stats.waterTreatment") },
        ]}
        blocks={blocks.map((block, index) => ({
          ...block,
          image: environmentContent.blocks[index]?.image,
        }))}
        cta={{
          title: t("cta.title"),
          href: "/contact",
          label: tCommon("contactUs"),
        }}
      />
    </main>
  );
}
