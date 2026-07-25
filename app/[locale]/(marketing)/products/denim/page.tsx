import { setRequestLocale } from "next-intl/server";
import { ProductPageTemplate } from "@/components/sections";
import { productCategories } from "@/lib/products/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DenimPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <ProductPageTemplate content={productCategories.denim} />
    </main>
  );
}
