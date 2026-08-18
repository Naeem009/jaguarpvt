import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CTASection } from "./CTASection";
import { Hero } from "./Hero";
import { StatBar } from "./StatBar";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { sectionPaddingClass } from "@/lib/layout/section";
import { cn } from "@/lib/utils";
import type { ImpactContentBlock } from "@/lib/our-impact/content";
import type { StatBarItem } from "./StatBar";
import { heroVideoMedia } from "@/lib/media/hero-media";
import type { HeroVideoKey } from "@/lib/media/hero-videos";

export type ImpactSubPageTemplateProps = {
  headline: string;
  subhead: string;
  heroImage: string;
  heroVideo?: HeroVideoKey;
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
  heroVideo = "sustainability",
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
        media={heroVideoMedia(heroImage, t("heroAlt", { headline }), heroVideo)}
      />

      <StatBar stats={stats} variant="impact" />

      {intro ? (
        <section className={cn("bg-paper", sectionPaddingClass)}>
          <SectionContainer width="narrow">
            <p className="text-xl leading-relaxed text-graphite">{intro}</p>
          </SectionContainer>
        </section>
      ) : null}

      {blocks.map((block, index) => (
        <section key={block.title} className={cn("bg-paper", sectionPaddingClass)}>
          <SectionContainer className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
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
          </SectionContainer>
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
