export type AboutContentBlock = {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

export type AboutSubPageSlug = "at-a-glance" | "strategy" | "mission" | "company-policy";

export const aboutSubPageImages: Record<
  AboutSubPageSlug,
  { hero: string; blocks: string[] }
> = {
  "at-a-glance": {
    hero: "/images/about/at-a-glance/hero.jpg",
    blocks: [
      "/images/about/at-a-glance/global-footprint.jpg",
      "/images/about/at-a-glance/operations.jpg",
    ],
  },
  strategy: {
    hero: "/images/about/strategy/hero.jpg",
    blocks: ["/images/about/strategy/growth.jpg", "/images/about/strategy/innovation.jpg"],
  },
  mission: {
    hero: "/images/about/mission/hero.jpg",
    blocks: ["/images/about/mission/purpose.jpg", "/images/about/mission/partnership.jpg"],
  },
  "company-policy": {
    hero: "/images/about/company-policy/hero.jpg",
    blocks: [
      "/images/about/company-policy/ethics.jpg",
      "/images/about/company-policy/compliance.jpg",
    ],
  },
};

export const aboutHubHeroImage = "/images/about/hero.jpg";

export const aboutHistoryImages = [
  "/images/about/history-01.jpg",
  "/images/about/history-02.jpg",
  "/images/about/history-03.jpg",
];

export const aboutLeadershipImages = [
  "/images/about/leadership-01.png",
  "/images/about/leadership-02.png",
  "/images/about/leadership-03.png",
];
