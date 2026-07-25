import { setRequestLocale } from "next-intl/server";
import { ImpactSubPageTemplate } from "@/components/sections";
import { peopleContent } from "@/lib/our-impact/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PeoplePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <ImpactSubPageTemplate
        headline="People & Communities"
        subhead="Worker welfare, training, and community programs across the manufacturing communities we operate in."
        heroImage={peopleContent.heroImage}
        stats={peopleContent.stats}
        blocks={peopleContent.blocks}
        cta={{
          title: "Discuss social compliance requirements",
          href: "/contact",
          label: "Contact Us",
        }}
      />
    </main>
  );
}
