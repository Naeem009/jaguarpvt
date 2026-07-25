import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ProductPageTemplate } from "@/components/sections";
import { getProductCategories } from "@/lib/products/get-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("wovens");
}

export default async function WovensPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const categories = await getProductCategories();

  return (
    <main className="flex-1">
      <ProductPageTemplate content={categories.wovens} />
    </main>
  );
}
