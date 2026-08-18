import { getTranslations, setRequestLocale } from "next-intl/server";
import { prepareLocale } from "@/lib/i18n/prepare-locale";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ImpactSubPageTemplate } from "@/components/sections";
import { peopleContent } from "@/lib/our-impact/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  await prepareLocale(params);
  return createPageMetadata("people");
}

export default async function PeoplePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impact.people");
  const tCommon = await getTranslations("common");
  const blocks = t.raw("blocks") as Array<{ title: string; body: string; imageAlt: string }>;

  return (
    <main>
      <ImpactSubPageTemplate
        headline={t("headline")}
        subhead={t("subhead")}
        heroImage={peopleContent.heroImage}
        stats={[
          { value: 0, placeholder: "[X]", label: t("stats.workerPrograms") },
          { value: 0, placeholder: "[X]+", label: t("stats.training") },
          { value: 0, placeholder: "[X]", label: t("stats.community") },
        ]}
        blocks={blocks.map((block, index) => ({
          ...block,
          image: peopleContent.blocks[index]?.image,
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
