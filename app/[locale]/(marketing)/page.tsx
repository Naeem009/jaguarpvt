import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  AIChatWidget,
  CTASection,
  FacilityMapTeaser,
  Hero,
  ProductGrid,
  StatBar,
  TrustStrip,
} from "@/components/sections";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata() {
  return createPageMetadata("home");
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <Hero
        variant="home"
        headline="Manufacturing, engineered for what's next."
        subhead="Vertically integrated production across wovens, knits, denim, and baby wear — serving global brands at [X] facilities in [Y] countries."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Explore Products", href: "/products" }}
        media={{
          type: "image",
          src: "/images/home/hero.svg",
          alt: "Wide-angle view of a modern apparel manufacturing facility",
        }}
      />

      <StatBar
        stats={[
          { value: 0, placeholder: "[6]", label: "Facilities" },
          { value: 0, placeholder: "[5]", label: "Countries" },
          { value: 0, placeholder: "[900]+", label: "Employees" },
          { value: 0, placeholder: "[40]", label: "Years in operation" },
        ]}
      />

      <ProductGrid
        items={[
          {
            title: "Wovens",
            href: "/products/wovens",
            image: "/images/products/wovens/hero.svg",
            description:
              "Structured shirting, bottoms, and uniform programs with integrated cutting, sewing, and finishing.",
          },
          {
            title: "Knits",
            href: "/products/knits",
            image: "/images/products/knits/hero.svg",
            description:
              "Jersey, fleece, and performance knits with capacity for large programs and certified organic options.",
          },
          {
            title: "Denim",
            href: "/products/denim",
            image: "/images/products/denim/hero.svg",
            description:
              "Denim development, washing, and finishing with process control from fabric through garment.",
          },
          {
            title: "Baby Wear",
            href: "/products/baby-wear",
            image: "/images/products/baby-wear/hero.svg",
            description:
              "Soft-hand baby and infant apparel with compliance-focused construction and finishing.",
            badge: "Catalogue",
          },
        ]}
      />

      <AIChatWidget
        mode="embedded"
        context="Homepage preview — select a sample question to see how grounded responses will appear once the assistant is connected."
      />

      <StatBar
        variant="impact"
        stats={[
          { value: 0, placeholder: "[X]M", label: "Liters of water saved annually" },
          { value: 0, placeholder: "[X]%", label: "Renewable energy share" },
          { value: 0, placeholder: "[X]", label: "Certified facilities" },
        ]}
        footerLink={{ href: "/our-impact", label: "Explore our impact" }}
      />

      <FacilityMapTeaser image="/images/home/facility-teaser.svg" />

      <TrustStrip
        categories={[
          {
            label: "Activewear programs",
            image: "/logos/logo-mark.svg",
            alt: "Jaguar logo mark",
          },
          {
            label: "Denim programs",
            image: "/logos/logo-mark.svg",
            alt: "Jaguar logo mark",
          },
          {
            label: "Lifestyle apparel",
            image: "/logos/logo-mark.svg",
            alt: "Jaguar logo mark",
          },
          {
            label: "Footwear & accessories",
            image: "/logos/logo-mark.svg",
            alt: "Jaguar logo mark",
          },
        ]}
      />

      <CTASection
        title="Ready to start a sourcing conversation?"
        subhead="Tell us what you're building. Our team responds to qualified RFIs and RFQs with clear next steps."
        cta={{ label: "Contact Us", href: "/contact" }}
      />
    </main>
  );
}
