import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CapabilityMatcher, Hero, ProductGrid } from "@/components/sections";
import { getProductHubGridItems } from "@/lib/products/get-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("products");
}

export default async function ProductsHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("productsHub");
  const tCommon = await getTranslations("common");
  const productItems = await getProductHubGridItems();

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        secondaryCTA={{ label: t("hero.exploreCategories"), href: "#categories" }}
        media={{
          type: "image",
          src: "/images/products/wovens/hero.svg",
          alt: t("hero.alt"),
        }}
      />

      <div id="categories">
        <ProductGrid
          eyebrow={t("grid.eyebrow")}
          title={t("grid.title")}
          subhead={t("grid.subhead")}
          items={productItems}
        />
      </div>

      <CapabilityMatcher />
    </main>
  );
}
