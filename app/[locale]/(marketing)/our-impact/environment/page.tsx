import { setRequestLocale } from "next-intl/server";
import { ImpactSubPageTemplate } from "@/components/sections";
import { environmentContent } from "@/lib/our-impact/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function EnvironmentPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <ImpactSubPageTemplate
        headline="Environment"
        subhead="Water stewardship, renewable energy, and waste reduction programs tracked against published internal benchmarks."
        heroImage={environmentContent.heroImage}
        stats={environmentContent.stats}
        blocks={environmentContent.blocks}
        cta={{
          title: "Discuss environmental requirements for your program",
          href: "/contact",
          label: "Contact Us",
        }}
      />
    </main>
  );
}
