import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CTASection } from "./CTASection";
import { Hero } from "./Hero";
import { StatBar } from "./StatBar";
import { cn } from "@/lib/utils";
import type { ImpactContentBlock } from "@/lib/our-impact/content";
import type { StatBarItem } from "./StatBar";

export type ImpactSubPageTemplateProps = {
  headline: string;
  subhead: string;
  heroImage: string;
  stats: StatBarItem[];
  blocks?: ImpactContentBlock[];
  intro?: string;
  children?: ReactNode;
  cta?: {
    title: string;
    subhead?: string;
    label: string;
    href: string;
  };
};

export async function ImpactSubPageTemplate({
  headline,
  subhead,
  heroImage,
  stats,
  blocks = [],
  intro,
  children,
  cta,
}: ImpactSubPageTemplateProps) {
  const t = await getTranslations("impact.impactSubPage");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Hero
        variant="inner"
        headline={headline}
        subhead={subhead}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={{
          type: "image",
          src: heroImage,
          alt: t("heroAlt", { headline }),
        }}
      />

      <StatBar stats={stats} variant="impact" />

      {intro ? (
        <section className="bg-paper py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <p className="text-lg leading-relaxed text-graphite">{intro}</p>
          </div>
        </section>
      ) : null}

      {blocks.map((block, index) => (
        <section
          key={block.title}
          className={index % 2 === 0 ? "bg-white py-16 md:py-24" : "bg-paper py-16 md:py-24"}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
            {block.image ? (
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 shadow-[var(--shadow-card)]",
                  index % 2 === 1 && "md:order-2",
                )}
              >
                <Image
                  src={block.image}
                  alt={block.imageAlt ?? block.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-semibold text-ink">{block.title}</h2>
              <p className="text-base leading-relaxed text-graphite">{block.body}</p>
            </div>
          </div>
        </section>
      ))}

      {children}

      <CTASection
        title={cta?.title ?? t("defaultCtaTitle")}
        subhead={cta?.subhead ?? t("defaultCtaSubhead")}
        cta={{
          label: cta?.label ?? tCommon("contactUs"),
          href: cta?.href ?? "/contact",
        }}
      />
    </>
  );
}
