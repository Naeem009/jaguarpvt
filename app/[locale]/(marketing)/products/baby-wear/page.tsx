import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CatalogueEmbed, ProductPageTemplate } from "@/components/sections";
import { BABY_WEAR_CATALOGUE_URL } from "@/lib/products/content";
import { getProductCategories } from "@/lib/products/get-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("babyWear");
}

export default async function BabyWearPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const categories = await getProductCategories();

  return (
    <main className="flex-1">
      <ProductPageTemplate
        content={categories["baby-wear"]}
        catalogueSection={<CatalogueEmbed fileUrl={BABY_WEAR_CATALOGUE_URL} />}
      />
    </main>
  );
}
