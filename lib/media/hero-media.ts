import { HERO_VIDEOS, type HeroVideoKey } from "./hero-videos";

export type HeroVideoMedia = {
  type: "video";
  src: string;
  poster: string;
  alt: string;
};

/** Build a hero video media object; swap the MP4 in public/videos/ when brand footage is ready. */
export function heroVideoMedia(
  poster: string,
  alt: string,
  videoKey: HeroVideoKey = "manufacturing",
): HeroVideoMedia {
  return {
    type: "video",
    src: HERO_VIDEOS[videoKey],
    poster,
    alt,
  };
}
