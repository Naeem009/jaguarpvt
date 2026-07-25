import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CatalogueEmbed, ProductPageTemplate } from "@/components/sections";
import { BABY_WEAR_CATALOGUE_URL, productCategories } from "@/lib/products/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata() {
  return createPageMetadata("babyWear");
}

export default async function BabyWearPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <ProductPageTemplate
        content={productCategories["baby-wear"]}
        catalogueSection={<CatalogueEmbed fileUrl={BABY_WEAR_CATALOGUE_URL} />}
      />
    </main>
  );
}
