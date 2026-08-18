import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CatalogueEmbed, ProductPageTemplate } from "@/components/sections";
import {
  BOUTIQUE_CATALOGUE_URL,
  CATALOGUE_CATEGORY_SLUG,
  PRODUCT_CATEGORY_SLUGS,
  PRODUCT_METADATA_KEY,
  isProductCategorySlug,
} from "@/lib/products/content";
import { getProductCategories } from "@/lib/products/get-content";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return PRODUCT_CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!isProductCategorySlug(slug)) {
    return {};
  }
  return createPageMetadata(PRODUCT_METADATA_KEY[slug]);
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isProductCategorySlug(slug)) {
    notFound();
  }

  const categories = await getProductCategories();
  const content = categories[slug];

  return (
    <main>
      <ProductPageTemplate
        content={content}
        catalogueSection={
          slug === CATALOGUE_CATEGORY_SLUG ? (
            <CatalogueEmbed fileUrl={BOUTIQUE_CATALOGUE_URL} />
          ) : undefined
        }
      />
    </main>
  );
}
