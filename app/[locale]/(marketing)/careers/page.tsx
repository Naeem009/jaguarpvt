import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/sections";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CAREERS_ATS_URL } from "@/lib/careers/content";
import { heroVideoMedia } from "@/lib/media/hero-media";

const departmentHrefs = [
  `${CAREERS_ATS_URL}?department=manufacturing-operations`,
  `${CAREERS_ATS_URL}?department=quality-compliance`,
  `${CAREERS_ATS_URL}?department=product-development`,
  `${CAREERS_ATS_URL}?department=sustainability`,
  `${CAREERS_ATS_URL}?department=commercial-corporate`,
];

const cultureImages = [
  "/images/careers/culture-01.jpg",
  "/images/careers/culture-02.jpg",
];

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("careers");
}

export default async function CareersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("careers");
  const tCommon = await getTranslations("common");
  const cultureValues = t.raw("culture.values") as Array<{ title: string; body: string; alt: string }>;
  const departments = t.raw("departments") as Array<{ name: string; description: string }>;

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: t("hero.viewRoles"), href: "#open-roles" }}
        secondaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={heroVideoMedia("/images/careers/hero.jpg", t("hero.alt"), "manufacturing")}
      />

      <section className="bg-white py-16 md:py-24">
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
                    src={cultureImages[index] ?? cultureImages[0]}
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

      <section id="open-roles" className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={t("openRoles.eyebrow")}
            title={t("openRoles.title")}
            subhead={t("openRoles.subhead")}
            className="mb-12 md:mb-16"
          />

          <ul className="grid gap-4 md:grid-cols-2">
            {departments.map((department, index) => (
              <li key={department.name}>
                <Card variant="interactive" className="flex h-full flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <h3 className="font-display text-xl font-semibold text-ink">{department.name}</h3>
                    <p className="text-sm leading-relaxed text-graphite">{department.description}</p>
                  </div>
                  <a
                    href={departmentHrefs[index] ?? CAREERS_ATS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent hover:text-accent-dark"
                  >
                    {t("openRoles.viewOpenings")}
                    <span aria-hidden>→</span>
                  </a>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
