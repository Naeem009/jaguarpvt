import { getTranslations } from "next-intl/server";
import { Hero } from "./Hero";
import { heroVideoMedia } from "@/lib/media/hero-media";

export type ContactPageHeroProps = {
  className?: string;
};

export async function ContactPageHero(_props: ContactPageHeroProps = {}) {
  const t = await getTranslations("contactPage.hero");

  return (
    <Hero
      variant="inner"
      headline={t("headline")}
      subhead={t("body")}
      primaryCTA={{ label: t("cta"), href: "#contact-form" }}
      media={heroVideoMedia("/images/contact/hero.jpg", t("alt"), "contact")}
    />
  );
}
