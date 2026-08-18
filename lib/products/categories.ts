export const PRODUCT_CATEGORY_SLUGS = [
  "casual-wear",
  "streetwear",
  "activewear",
  "denim",
  "kidswear",
  "boutique",
] as const;

export type ProductCategorySlug = (typeof PRODUCT_CATEGORY_SLUGS)[number];

export type ProductMetadataKey =
  | "casualWear"
  | "streetwear"
  | "activewear"
  | "denim"
  | "kidswear"
  | "boutique";

export const PRODUCT_METADATA_KEY: Record<ProductCategorySlug, ProductMetadataKey> = {
  "casual-wear": "casualWear",
  streetwear: "streetwear",
  activewear: "activewear",
  denim: "denim",
  kidswear: "kidswear",
  boutique: "boutique",
};

export function isProductCategorySlug(value: string): value is ProductCategorySlug {
  return (PRODUCT_CATEGORY_SLUGS as readonly string[]).includes(value);
}
