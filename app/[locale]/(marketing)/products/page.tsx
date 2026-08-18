import { getTranslations, setRequestLocale } from "next-intl/server";
import { prepareLocale } from "@/lib/i18n/prepare-locale";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CapabilityMatcher, Hero, ProductGrid } from "@/components/sections";
import { getProductHubGridItems } from "@/lib/products/get-content";
import { heroVideoMedia } from "@/lib/media/hero-media";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  await prepareLocale(params);
  return createPageMetadata("products");
}

export default async function ProductsHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("productsHub");
  const tCommon = await getTranslations("common");
  const productItems = await getProductHubGridItems();

  return (
    <main>
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        secondaryCTA={{ label: t("hero.exploreCategories"), href: "#categories" }}
        media={heroVideoMedia("/images/products/casual-wear/hero.jpg", t("hero.alt"), "products")}
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
