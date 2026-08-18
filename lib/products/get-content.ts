import { getTranslations } from "next-intl/server";
import { CATALOGUE_CATEGORY_SLUG, PRODUCT_CATEGORY_SLUGS } from "./categories";
import type { ProductCategoryContent, ProductCategorySlug } from "./content";

const processImages = (category: ProductCategorySlug) => ({
  step1: `/images/products/${category}/process-01.jpg`,
  step2: `/images/products/${category}/process-02.jpg`,
  step3: `/images/products/${category}/process-03.jpg`,
});

function buildCategory(
  slug: ProductCategorySlug,
  t: Awaited<ReturnType<typeof getTranslations>>,
): ProductCategoryContent {
  const images = processImages(slug);
  const steps = t.raw(`${slug}.timelineSteps`) as Array<{ title: string; description: string }>;
  const specs = t.raw(`${slug}.specs`) as Array<{ label: string; value: string }>;

  return {
    slug,
    name: t(`${slug}.name`),
    headline: t(`${slug}.headline`),
    subhead: t(`${slug}.subhead`),
    heroImage: `/images/products/${slug}/hero.jpg`,
    gridDescription: t(`${slug}.gridDescription`),
    timelineSteps: steps.map((step, index) => ({
      ...step,
      image: images[`step${index + 1}` as keyof typeof images],
    })),
    specs,
    sustainability: {
      title: t(`${slug}.sustainability.title`),
      body: t(`${slug}.sustainability.body`),
    },
    innovation: {
      title: t(`${slug}.innovation.title`),
      body: t(`${slug}.innovation.body`),
    },
  };
}

export async function getProductCategories(): Promise<Record<ProductCategorySlug, ProductCategoryContent>> {
  const t = await getTranslations("productCategories");

  return Object.fromEntries(
    PRODUCT_CATEGORY_SLUGS.map((slug) => [slug, buildCategory(slug, t)]),
  ) as Record<ProductCategorySlug, ProductCategoryContent>;
}

export async function getProductHubGridItems() {
  const t = await getTranslations("productCategories");
  const categories = await getProductCategories();

  return PRODUCT_CATEGORY_SLUGS.map((slug) => ({
    title: categories[slug].name,
    href: `/products/${slug}` as const,
    image: categories[slug].heroImage,
    description: categories[slug].gridDescription,
    badge: slug === CATALOGUE_CATEGORY_SLUG ? t("catalogueBadge") : undefined,
  }));
}
