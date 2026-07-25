import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { CTASection } from "./CTASection";
import { Hero } from "./Hero";
import { InnovationNote } from "./InnovationNote";
import { ProductSpecsTable } from "./ProductSpecsTable";
import { SustainabilityCallout } from "./SustainabilityCallout";
import { TimelineSection } from "./TimelineSection";
import type { ProductCategoryContent } from "@/lib/products/content";

export type ProductPageTemplateProps = {
  content: ProductCategoryContent;
  catalogueSection?: ReactNode;
};

export async function ProductPageTemplate({ content, catalogueSection }: ProductPageTemplateProps) {
  const t = await getTranslations("productCategories");
  const contactHref = `/contact?category=${content.slug}`;
  const discussLabel = t("discussProgram", { category: content.name });
  const discussTitle = t("discussProgramLower", { category: content.name });

  return (
    <>
      <Hero
        variant="inner"
        headline={content.headline}
        subhead={content.subhead}
        primaryCTA={{
          label: discussLabel,
          href: contactHref,
        }}
        media={{
          type: "image",
          src: content.heroImage,
          alt: t("heroAlt", { category: content.name }),
        }}
      />

      <TimelineSection steps={content.timelineSteps} />

      <ProductSpecsTable rows={content.specs} />

      <SustainabilityCallout title={content.sustainability.title} body={content.sustainability.body} />

      {content.innovation ? (
        <InnovationNote title={content.innovation.title} body={content.innovation.body} />
      ) : null}

      {catalogueSection}

      <CTASection
        title={discussTitle}
        subhead={t("discussSubhead")}
        cta={{
          label: discussLabel,
          href: contactHref,
        }}
      />
    </>
  );
}
