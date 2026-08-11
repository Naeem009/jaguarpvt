import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  AlternativeContact,
  ContactExpectations,
  ContactForm,
  ContactPageHero,
} from "@/components/sections";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return createPageMetadata("contact");
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <main>
      <ContactPageHero />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 md:px-6">
          <Suspense
            fallback={
              <div className="max-w-3xl rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper p-8 text-sm text-graphite">
                {t("loading")}
              </div>
            }
          >
            <ContactForm />
          </Suspense>

          <aside className="space-y-6">
            <ContactExpectations />
            <AlternativeContact />
          </aside>
        </div>
      </section>
    </main>
  );
}
