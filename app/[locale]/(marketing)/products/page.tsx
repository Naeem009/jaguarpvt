import { setRequestLocale } from "next-intl/server";
import { CapabilityMatcher, Hero, ProductGrid } from "@/components/sections";
import { productHubGridItems } from "@/lib/products/content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <Hero
        variant="inner"
        headline="Products"
        subhead="Four core categories — wovens, knits, denim, and baby wear — supported by integrated manufacturing, compliance systems, and development capability."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Explore categories", href: "#categories" }}
        media={{
          type: "image",
          src: "/images/products/wovens/hero.svg",
          alt: "Apparel product categories across wovens, knits, denim, and baby wear",
        }}
      />

      <div id="categories">
        <ProductGrid
          eyebrow="Categories"
          title="Select a product category"
          subhead="Each category page outlines process steps, technical specs, and sustainability programs — with baby wear including a browsable catalogue."
          items={productHubGridItems}
        />
      </div>

      <CapabilityMatcher />
    </main>
  );
}
