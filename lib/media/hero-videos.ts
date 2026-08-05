/** Stock hero background videos — replace files in public/videos/ when brand footage is ready. */
export const HERO_VIDEOS = {
  home: "/videos/home/hero-stitching.mp4",
  manufacturing: "/videos/heroes/manufacturing.mp4",
  sustainability: "/videos/heroes/sustainability.mp4",
  products: "/videos/heroes/products.mp4",
} as const;

export type HeroVideoKey = keyof typeof HERO_VIDEOS;

export function getHeroVideo(key: HeroVideoKey) {
  return HERO_VIDEOS[key];
}
