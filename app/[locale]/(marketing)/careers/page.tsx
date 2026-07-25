import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { careersContent, CAREERS_ATS_URL } from "@/lib/careers/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CareersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { hero, culture, departments } = careersContent;

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline={hero.headline}
        subhead={hero.subhead}
        primaryCTA={{ label: "View open roles", href: "#open-roles" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
        media={{ type: "image", src: hero.image, alt: hero.alt }}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={culture.eyebrow}
            title={culture.title}
            subhead={culture.subhead}
            className="mb-12 md:mb-16"
          />

          <div className="space-y-16">
            {culture.values.map((value, index) => (
              <div
                key={value.title}
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                  index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 shadow-[var(--shadow-card)]">
                  <Image
                    src={value.image}
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
            eyebrow="Open roles"
            title="Explore opportunities by department"
            subhead="Applications are handled through our external applicant tracking system — select a department to view current openings."
            className="mb-12 md:mb-16"
          />

          <ul className="grid gap-4 md:grid-cols-2">
            {departments.map((department) => (
              <li key={department.name}>
                <Card variant="interactive" className="flex h-full flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <h3 className="font-display text-xl font-semibold text-ink">{department.name}</h3>
                    <p className="text-sm leading-relaxed text-graphite">{department.description}</p>
                  </div>
                  <a
                    href={department.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent hover:text-accent-dark"
                  >
                    View openings
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
