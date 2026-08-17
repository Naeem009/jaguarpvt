import type { PageMetadataKey } from "@/lib/seo/config";
import { getHeroVideo, type HeroVideoKey } from "./hero-videos";
import { pageOgImages } from "@/lib/seo/config";

/** Page-specific background clips for the compact pre-footer video band. */
export const PAGE_VIDEO_KEYS: Record<PageMetadataKey, HeroVideoKey> = {
  home: "home",
  about: "manufacturing",
  careers: "careers",
  contact: "contact",
  facility: "manufacturing",
  ourImpact: "sustainability",
  environment: "sustainability",
  people: "careers",
  governance: "sustainability",
  products: "products",
  wovens: "products",
  knits: "products",
  babyWear: "products",
};

export function getPageVideoMedia(page: PageMetadataKey) {
  const videoKey = PAGE_VIDEO_KEYS[page];
  return {
    src: getHeroVideo(videoKey),
    poster: pageOgImages[page],
    videoKey,
  };
}
