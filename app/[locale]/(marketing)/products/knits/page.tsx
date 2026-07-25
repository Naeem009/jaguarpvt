import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ProductPageTemplate } from "@/components/sections";
import { productCategories } from "@/lib/products/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata() {
  return createPageMetadata("knits");
}

export default async function KnitsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <ProductPageTemplate content={productCategories.knits} />
    </main>
  );
}
