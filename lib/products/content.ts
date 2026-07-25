export type ProductCategorySlug = "wovens" | "knits" | "denim" | "baby-wear";

export type ProductCategoryContent = {
  slug: ProductCategorySlug;
  name: string;
  headline: string;
  subhead: string;
  heroImage: string;
  gridDescription: string;
  timelineSteps: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  specs: Array<{ label: string; value: string }>;
  sustainability: { title: string; body: string };
  innovation?: { title: string; body: string };
};

const processImages = (category: ProductCategorySlug) => ({
  step1: `/images/products/${category}/process-01.svg`,
  step2: `/images/products/${category}/process-02.svg`,
  step3: `/images/products/${category}/process-03.svg`,
});

export const productCategories: Record<ProductCategorySlug, ProductCategoryContent> = {
  wovens: {
    slug: "wovens",
    name: "Wovens",
    headline: "Wovens",
    subhead: "Structured shirting, bottoms, and uniform programs with integrated cutting, sewing, and finishing.",
    heroImage: "/images/products/wovens/hero.svg",
    gridDescription:
      "Structured shirting, bottoms, and uniform programs with integrated cutting, sewing, and finishing.",
    timelineSteps: [
      {
        title: "Fabric sourcing and inspection",
        description:
          "Incoming woven fabrics are inspected against agreed specifications before release to cutting — supporting consistent hand-feel, shade, and shrinkage control across programs.",
        image: processImages("wovens").step1,
      },
      {
        title: "Cutting, sewing, and assembly",
        description:
          "Marker planning, automated spreading, and modular sewing lines handle shirting, bottoms, and workwear programs with inline quality checkpoints.",
        image: processImages("wovens").step2,
      },
      {
        title: "Finishing, packing, and dispatch",
        description:
          "Pressing, trimming, final audit, and export-ready packing complete the flow — with traceability documentation prepared for buyer compliance reviews.",
        image: processImages("wovens").step3,
      },
    ],
    specs: [
      { label: "Monthly capacity range", value: "[X] – [Y] units per month (program-dependent)" },
      { label: "Primary machinery", value: "Automated spreaders, CNC cutting, modular sewing lines, finishing tunnels" },
      { label: "Certifications", value: "GOTS, OEKO-TEX, WRAP — scope varies by facility and program" },
      { label: "Typical constructions", value: "Poplin, twill, oxford, chino, uniform-weight wovens" },
      { label: "Quality systems", value: "Inline QC, AQL final audit, shade and measurement control" },
    ],
    sustainability: {
      title: "Lower-impact finishing for woven programs",
      body: "Woven finishing can be water- and energy-intensive. Our published programs include low-liquor finishing options, shade-right-first protocols, and waste-reduction targets at selected facilities — confirm current metrics with our sustainability team.",
    },
    innovation: {
      title: "Material development support",
      body: "Collaborative fabric development for shirting and bottom-weight programs — from base construction trials through bulk approval — supports brands refining hand-feel, durability, and compliance requirements.",
    },
  },
  knits: {
    slug: "knits",
    name: "Knits",
    headline: "Knits",
    subhead: "Jersey, fleece, and performance knits with capacity for large programs and certified organic options.",
    heroImage: "/images/products/knits/hero.svg",
    gridDescription:
      "Jersey, fleece, and performance knits with capacity for large programs and certified organic options.",
    timelineSteps: [
      {
        title: "Yarn and fabric preparation",
        description:
          "Knit programs begin with yarn approval and fabric testing — covering weight, recovery, spirality, and color standards before bulk knitting.",
        image: processImages("knits").step1,
      },
      {
        title: "Knitting, linking, and sewing",
        description:
          "Circular knitting, linking, and cut-and-sew modules support jersey, fleece, and performance constructions with inline measurement checks.",
        image: processImages("knits").step2,
      },
      {
        title: "Wash, finish, and pack",
        description:
          "Garment washing, soft-hand finishing, labeling, and packing follow buyer specifications — with compliance documentation for restricted substances.",
        image: processImages("knits").step3,
      },
    ],
    specs: [
      { label: "Monthly capacity range", value: "[X] – [Y] units per month (program-dependent)" },
      { label: "Primary machinery", value: "Circular knitting, overlock modules, linking, garment wash units" },
      { label: "Certifications", value: "GOTS, OEKO-TEX, WRAP — scope varies by facility and program" },
      { label: "Typical constructions", value: "Single jersey, fleece, pique, performance blends" },
      { label: "Organic programs", value: "Certified organic cotton and recycled polyester options where approved" },
    ],
    sustainability: {
      title: "Certified materials and controlled processing",
      body: "Knit programs often carry elevated material compliance requirements. We support GOTS-track organic cotton and recycled inputs at selected facilities, with documented chemical management aligned to OEKO-TEX and buyer RSL standards.",
    },
    innovation: {
      title: "Performance knit development",
      body: "Development support for moisture management, stretch recovery, and hand-feel targets — from lab dips through bulk validation for activewear and lifestyle programs.",
    },
  },
  denim: {
    slug: "denim",
    name: "Denim",
    headline: "Denim",
    subhead: "Denim development, washing, and finishing with process control from fabric through garment.",
    heroImage: "/images/products/denim/hero.svg",
    gridDescription:
      "Denim development, washing, and finishing with process control from fabric through garment.",
    timelineSteps: [
      {
        title: "Fabric development and approval",
        description:
          "Denim programs start with fabric trials — weight, weave, indigo shade, and shrinkage profiles are locked before cutting to protect wash consistency.",
        image: processImages("denim").step1,
      },
      {
        title: "Cutting, sewing, and dry processes",
        description:
          "Cutting, sewing, and dry finishing (hand-sand, laser, whisker) are sequenced to buyer wash recipes with shade and measurement control.",
        image: processImages("denim").step2,
      },
      {
        title: "Washing, finishing, and audit",
        description:
          "Garment washing and finishing follow approved recipes — with water-recycling systems at selected facilities and final audit before dispatch.",
        image: processImages("denim").step3,
      },
    ],
    specs: [
      { label: "Monthly capacity range", value: "[X] – [Y] units per month (program-dependent)" },
      { label: "Primary machinery", value: "Laser finishing, ozone/wash units, drying tunnels, modular sewing" },
      { label: "Certifications", value: "GOTS, OEKO-TEX, WRAP — scope varies by facility and program" },
      { label: "Wash capabilities", value: "Indigo, black, grey, eco-wash recipes — facility-specific" },
      { label: "Water management", value: "Recycling and low-liquor systems at [X] selected denim facilities" },
    ],
    sustainability: {
      title: "Water reduction in denim finishing",
      body: "Denim washing is the highest-impact stage in many programs. Our published approach includes low-liquor wash recipes, water recycling at selected facilities, and ongoing measurement against internal benchmarks — not a guarantee of outcomes for every order.",
    },
    innovation: {
      title: "Wash recipe and shade consistency",
      body: "Development support for wash recipes, shade continuity across bulk, and finishing techniques that reduce re-wash rates — supporting brands with consistent denim storytelling at scale.",
    },
  },
  "baby-wear": {
    slug: "baby-wear",
    name: "Baby Wear",
    headline: "Baby Wear",
    subhead: "Soft-hand baby and infant apparel with compliance-focused construction and finishing.",
    heroImage: "/images/products/baby-wear/hero.svg",
    gridDescription:
      "Soft-hand baby and infant apparel with compliance-focused construction and finishing.",
    timelineSteps: [
      {
        title: "Material selection and compliance review",
        description:
          "Baby wear programs begin with restricted-substance review, soft-hand material selection, and trim approval against buyer and regulatory requirements.",
        image: processImages("baby-wear").step1,
      },
      {
        title: "Construction and safety-focused sewing",
        description:
          "Flat seams, secure attachments, and size-graded construction are managed with enhanced inline checks for infant and toddler programs.",
        image: processImages("baby-wear").step2,
      },
      {
        title: "Finishing, testing documentation, and pack",
        description:
          "Soft-hand finishing, labeling, and packing follow buyer specs — with test documentation and traceability prepared for compliance reviews.",
        image: processImages("baby-wear").step3,
      },
    ],
    specs: [
      { label: "Monthly capacity range", value: "[X] – [Y] units per month (program-dependent)" },
      { label: "Primary machinery", value: "Fine-gauge sewing, soft-hand finishing, secure-trim processes" },
      { label: "Certifications", value: "GOTS, OEKO-TEX, WRAP — scope varies by facility and program" },
      { label: "Typical products", value: "Bodysuits, rompers, sets, sleepwear, gift sets" },
      { label: "Compliance focus", value: "Restricted substances, secure attachments, soft-hand construction" },
    ],
    sustainability: {
      title: "Certified materials for sensitive categories",
      body: "Baby wear programs typically require stricter chemical management and material traceability. We support certified organic and OEKO-TEX-aligned inputs at selected facilities — confirm scope and certification coverage for your program.",
    },
    innovation: {
      title: "Sizing, fit, and soft-hand development",
      body: "Development support for size grading, fit consistency, and hand-feel targets across infant and toddler ranges — from sample through bulk validation.",
    },
  },
};

export const productHubGridItems = (Object.keys(productCategories) as ProductCategorySlug[]).map(
  (slug) => {
    const category = productCategories[slug];
    return {
      title: category.name,
      href: `/products/${slug}`,
      image: category.heroImage,
      description: category.gridDescription,
      badge: slug === "baby-wear" ? "Catalogue" : undefined,
    };
  },
);

export const BABY_WEAR_CATALOGUE_URL = "/catalogues/baby-wear-catalogue.pdf";
