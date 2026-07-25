import { setRequestLocale } from "next-intl/server";
import { CatalogueEmbed, ProductPageTemplate } from "@/components/sections";
import { BABY_WEAR_CATALOGUE_URL, productCategories } from "@/lib/products/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

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
