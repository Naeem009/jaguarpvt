import type { ProductCategorySlug } from "./categories";

export type { ProductCategorySlug } from "./categories";
export {
  BOUTIQUE_CATALOGUE_URL,
  CATALOGUE_CATEGORY_SLUG,
  PRODUCT_CATEGORY_SLUGS,
  PRODUCT_METADATA_KEY,
  isProductCategorySlug,
} from "./categories";

export type ProductCategoryContent = {
  slug: ProductCategorySlug;
  name: string;
  headline: string;
  subhead: string;
  heroImage: string;
  gridDescription: string;
  timelineSteps: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  specs: Array<{ label: string; value: string }>;
  sustainability: { title: string; body: string };
  innovation?: { title: string; body: string };
};
