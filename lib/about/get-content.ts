import { getTranslations } from "next-intl/server";
import { aboutSubPageImages, type AboutSubPageSlug } from "./content";

const ABOUT_SLUGS: AboutSubPageSlug[] = [
  "at-a-glance",
  "strategy",
  "mission",
  "company-policy",
];

const ABOUT_HREFS: Record<AboutSubPageSlug, `/about/${string}`> = {
  "at-a-glance": "/about/at-a-glance",
  strategy: "/about/strategy",
  mission: "/about/mission",
  "company-policy": "/about/company-policy",
};

const MENU_KEYS: Record<AboutSubPageSlug, "atAGlance" | "strategy" | "mission" | "companyPolicy"> = {
  "at-a-glance": "atAGlance",
  strategy: "strategy",
  mission: "mission",
  "company-policy": "companyPolicy",
};

export async function getAboutHubGridItems() {
  const t = await getTranslations("about.menu");

  return ABOUT_SLUGS.map((slug) => ({
    title: t(`${MENU_KEYS[slug]}.title`),
    href: ABOUT_HREFS[slug],
    image: aboutSubPageImages[slug].hero,
    description: t(`${MENU_KEYS[slug]}.description`),
  }));
}
