import { setRequestLocale } from "next-intl/server";
import { FacilityMapLazy, Hero } from "@/components/sections";
import { FACILITY_HERO_IMAGE, getFacilities } from "@/lib/facilities";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function FacilityPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const facilities = getFacilities();

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline="Facility"
        subhead="Explore our global manufacturing footprint — location, capabilities, certifications, and headcount from published facility data."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        media={{
          type: "image",
          src: FACILITY_HERO_IMAGE,
          alt: "Global map of apparel manufacturing facilities",
        }}
      />

      <FacilityMapLazy facilities={facilities} filterEnabled />
    </main>
  );
}
