import { ESG_REPORT_URL } from "@/lib/our-impact/content";
import { productCategories } from "@/lib/products/content";

export const productsMegaMenuItems = [
  {
    title: productCategories.wovens.name,
    href: "/products/wovens",
    description: productCategories.wovens.gridDescription,
    image: productCategories.wovens.heroImage,
  },
  {
    title: productCategories.knits.name,
    href: "/products/knits",
    description: productCategories.knits.gridDescription,
    image: productCategories.knits.heroImage,
  },
  {
    title: productCategories.denim.name,
    href: "/products/denim",
    description: productCategories.denim.gridDescription,
    image: productCategories.denim.heroImage,
  },
  {
    title: productCategories["baby-wear"].name,
    href: "/products/baby-wear",
    description: productCategories["baby-wear"].gridDescription,
    image: productCategories["baby-wear"].heroImage,
    badge: "Catalogue",
  },
];

export const impactMegaMenuItems = [
  {
    title: "Environment",
    href: "/our-impact/environment",
    description: "Water stewardship, renewable energy, and waste reduction programs.",
  },
  {
    title: "People & Communities",
    href: "/our-impact/people",
    description: "Worker welfare, training, and community programs.",
  },
  {
    title: "Governance & Certifications",
    href: "/our-impact/governance",
    description: "Certifications, compliance systems, and governance structures.",
  },
];

export const primaryNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Facility", href: "/facility" },
  { label: "Careers", href: "/careers" },
] as const;

export const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Facility", href: "/facility" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Wovens", href: "/products/wovens" },
      { label: "Knits", href: "/products/knits" },
      { label: "Denim", href: "/products/denim" },
      { label: "Baby Wear", href: "/products/baby-wear" },
    ],
  },
  {
    title: "Our Impact",
    links: [
      { label: "Environment", href: "/our-impact/environment" },
      { label: "People & Communities", href: "/our-impact/people" },
      { label: "Governance & Certifications", href: "/our-impact/governance" },
      { label: "ESG Reports", href: ESG_REPORT_URL },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/placeholder", external: true },
    ],
  },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Cookie Preferences", href: "#cookies" },
  { label: "Modern Slavery Statement", href: "#modern-slavery" },
] as const;

export const localeOptions = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
  { code: "es", label: "Spanish", nativeLabel: "Español" },
  { code: "fr", label: "French", nativeLabel: "Français" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
] as const;
