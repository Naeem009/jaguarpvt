import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JobApplyForm } from "@/components/sections/JobApplyForm";
import { JobPostingJsonLd } from "@/components/seo/JobPostingJsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatApplyByDate } from "@/lib/careers/deadline";
import { getAllOpeningSlugs, getOpeningBySlug, isOpeningActive } from "@/lib/careers/query";
import { buildAlternateLanguages, siteName, siteUrl } from "@/lib/seo/config";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllOpeningSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const opening = await getOpeningBySlug(slug);

  if (!opening) {
    return {};
  }

  const closed = !isOpeningActive(opening);
  const title = `${siteName} | ${opening.title}`;
  const description = opening.overview[0] ?? opening.title;
  const languages = buildAlternateLanguages(`/careers/${opening.slug}`);
  const canonical = languages[locale] ?? languages.en;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": languages.en,
      },
    },
    robots: closed
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName,
    },
  };
}

export default async function CareerOpeningPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("careers");
  const opening = await getOpeningBySlug(slug);

  if (!opening) {
    notFound();
  }

  const closed = !isOpeningActive(opening);
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const pageUrl = `${siteUrl}${prefix}/careers/${opening.slug}`;
  const applyBy = formatApplyByDate(opening.applicationDeadline, locale);

  return (
    <main className={closed ? undefined : "pb-24 md:pb-0"}>
      {!closed ? <JobPostingJsonLd opening={opening} locale={locale} url={pageUrl} /> : null}

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-8">
            <Link
              href="/careers#open-roles"
              className="text-sm font-medium text-accent hover:text-accent-dark"
            >
              {t("role.backToOpenings")}
            </Link>
          </p>

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)] lg:gap-16">
            <article className="space-y-10">
              <header className="space-y-4">
                {closed ? (
                  <Badge tone="neutral">{t("role.closed")}</Badge>
                ) : null}
                <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
                  {opening.title}
                </h1>
                <p className="text-base text-graphite">
                  {t(`departments.${opening.department}`)}
                  <span aria-hidden> · </span>
                  {opening.location}
                  <span aria-hidden> · </span>
                  {t(`employmentTypes.${opening.employmentType}`)}
                </p>
                <p className="text-base text-graphite">
                  {t("openRoles.applyBy", { date: applyBy })}
                  {opening.experience ? (
                    <>
                      <span aria-hidden> · </span>
                      {t("role.experience")}: {opening.experience}
                    </>
                  ) : null}
                  <span aria-hidden> · </span>
                  {t("role.vacancies", { count: opening.vacancies })}
                </p>
              </header>

              {closed ? (
                <div className="max-w-2xl space-y-4">
                  <p className="text-base leading-relaxed text-graphite">{t("role.closedBody")}</p>
                  <Button href="/careers#open-roles" variant="secondary">
                    {t("role.seeOther")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h2 className="font-display text-2xl font-semibold text-ink">{t("role.overview")}</h2>
                    {opening.overview.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-relaxed text-graphite">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h2 className="font-display text-2xl font-semibold text-ink">{t("role.requirements")}</h2>
                    <ul className="list-disc space-y-2 ps-5 text-base leading-relaxed text-graphite">
                      {opening.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </article>

            <aside className="lg:sticky lg:top-28">
              {closed ? (
                <div className="rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper p-8">
                  <h2 className="font-display text-2xl font-semibold text-ink">{t("role.closed")}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-graphite">{t("role.closedBody")}</p>
                </div>
              ) : (
                <>
                  <JobApplyForm jobSlug={opening.slug} jobTitle={opening.title} />
                  <a
                    href="#apply"
                    className="fixed bottom-4 start-4 end-24 z-30 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-base font-medium text-white shadow-[var(--shadow-card-hover)] md:hidden"
                  >
                    {t("role.applyCta")}
                  </a>
                </>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
