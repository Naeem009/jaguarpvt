import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { FacilityMapLazy, Hero } from "@/components/sections";
import { FACILITY_HERO_IMAGE, getFacilities } from "@/lib/facilities";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("facility");
}

export default async function FacilityPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("facility");
  const tCommon = await getTranslations("common");
  const facilities = getFacilities();

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={{
          type: "image",
          src: FACILITY_HERO_IMAGE,
          alt: t("hero.alt"),
        }}
      />

      <FacilityMapLazy facilities={facilities} filterEnabled />
    </main>
  );
}
