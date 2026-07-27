import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export type ContactPageHeroProps = {
  className?: string;
};

export async function ContactPageHero({ className }: ContactPageHeroProps) {
  const t = await getTranslations("contactPage.hero");

  return (
    <section className={cn("border-b border-ink/8 bg-paper py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.06em] text-graphite">{t("eyebrow")}</p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
            {t("headline")}
          </h1>
          <p className="font-display text-lg leading-relaxed text-graphite">{t("body")}</p>
        </div>
      </div>
    </section>
  );
}
