import type { ReactNode } from "react";
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

export function ProductPageTemplate({ content, catalogueSection }: ProductPageTemplateProps) {
  const contactHref = `/contact?category=${content.slug}`;

  return (
    <>
      <Hero
        variant="inner"
        headline={content.headline}
        subhead={content.subhead}
        primaryCTA={{
          label: `Discuss a ${content.name} Program`,
          href: contactHref,
        }}
        media={{
          type: "image",
          src: content.heroImage,
          alt: `${content.name} manufacturing and product development`,
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
        title={`Discuss a ${content.name} program with our team`}
        subhead="Share your volume, material, and compliance requirements. We respond to qualified RFIs with clear next steps."
        cta={{
          label: `Discuss a ${content.name} Program`,
          href: contactHref,
        }}
      />
    </>
  );
}
