import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CurrentOpenings } from "@/components/sections/CurrentOpenings";
import { Hero } from "@/components/sections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getActiveOpenings } from "@/lib/careers/query";
import { careersCultureImages } from "@/lib/careers/content";
import { heroVideoMedia } from "@/lib/media/hero-media";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("careers");
}

export const revalidate = 3600;

export default async function CareersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("careers");
  const tCommon = await getTranslations("common");
  const cultureValues = t.raw("culture.values") as Array<{ title: string; body: string; alt: string }>;
  const benefits = t.raw("benefits.items") as Array<{ title: string; body: string }>;
  const openings = getActiveOpenings();

  return (
    <main>
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: t("hero.viewRoles"), href: "#open-roles" }}
        secondaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={heroVideoMedia("/images/careers/hero.jpg", t("hero.alt"), "careers")}
      />

      <CurrentOpenings openings={openings} />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={t("culture.eyebrow")}
            title={t("culture.title")}
            subhead={t("culture.subhead")}
            className="mb-12 md:mb-16"
          />

          <div className="space-y-16">
            {cultureValues.map((value, index) => (
              <div
                key={value.title}
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                  index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 shadow-[var(--shadow-card)]">
                  <Image
                    src={careersCultureImages[index] ?? careersCultureImages[0]}
                    alt={value.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                    {value.title}
                  </h3>
                  <p className="text-base leading-relaxed text-graphite">{value.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={t("internships.eyebrow")}
            title={t("internships.title")}
            subhead={t("internships.subhead")}
            className="mb-8"
          />
          <p className="max-w-3xl text-base leading-relaxed text-graphite">{t("internships.body")}</p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={t("benefits.eyebrow")}
            title={t("benefits.title")}
            subhead={t("benefits.subhead")}
            className="mb-12 md:mb-16"
          />
          <ul className="divide-y divide-ink/8 border-y border-ink/8">
            {benefits.map((item) => (
              <li key={item.title} className="grid gap-4 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12">
                <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{item.title}</h3>
                <p className="text-base leading-relaxed text-graphite">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
