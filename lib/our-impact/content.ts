export type ImpactPillar = {
  title: string;
  href: string;
  image: string;
  description: string;
  metrics: Array<{ placeholder: string; label: string }>;
};

export type Certification = {
  name: string;
  logo: string;
  description: string;
  issuer: string;
};

export type ImpactContentBlock = {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

export const ESG_REPORT_URL = "/reports/esg-report.pdf";

export const ourImpactHubStats = [
  { value: 0, placeholder: "[X]M", label: "Liters of water saved annually" },
  { value: 0, placeholder: "[X]%", label: "Renewable energy share" },
  { value: 0, placeholder: "[X]", label: "Certified facilities" },
  { value: 0, placeholder: "[X]", label: "Worker welfare programs" },
];

export const impactPillars: ImpactPillar[] = [
  {
    title: "Environment",
    href: "/our-impact/environment",
    image: "/images/our-impact/environment/solar.jpg",
    description:
      "Water stewardship, renewable energy, and waste reduction programs measured against published benchmarks — not marketing claims.",
    metrics: [
      { placeholder: "[X]M", label: "Liters water recycled annually" },
      { placeholder: "[X]%", label: "Renewable energy at selected sites" },
    ],
  },
  {
    title: "People & Communities",
    href: "/our-impact/people",
    image: "/images/our-impact/people/community.jpg",
    description:
      "Worker welfare, training, and community programs across manufacturing communities — documented and auditable.",
    metrics: [
      { placeholder: "[X]", label: "Worker welfare programs" },
      { placeholder: "[X]+", label: "Training hours delivered annually" },
    ],
  },
  {
    title: "Governance & Certifications",
    href: "/our-impact/governance",
    image: "/images/our-impact/governance/hero.jpg",
    description:
      "Certifications, compliance systems, and governance structures that support buyer audit requirements.",
    metrics: [
      { placeholder: "[X]", label: "Active certifications site-wide" },
      { placeholder: "[X]", label: "Facilities under audit programs" },
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "GOTS",
    logo: "/certifications/cert-01.jpg",
    description: "Organic fiber handling and chemical management for certified organic programs.",
    issuer: "Global Organic Textile Standard",
  },
  {
    name: "OEKO-TEX Standard 100",
    logo: "/certifications/cert-02.jpg",
    description: "Product-level testing for harmful substances across selected product lines.",
    issuer: "OEKO-TEX Association",
  },
  {
    name: "WRAP",
    logo: "/certifications/cert-03.jpg",
    description: "Social compliance principles covering labor practices and facility standards.",
    issuer: "Worldwide Responsible Accredited Production",
  },
  {
    name: "ISO 14001",
    logo: "/certifications/cert-04.jpg",
    description: "Environmental management systems at selected manufacturing facilities.",
    issuer: "International Organization for Standardization",
  },
];

export const environmentContent = {
  heroImage: "/images/our-impact/environment/hero.jpg",
  stats: [
    { value: 0, placeholder: "[X]M", label: "Liters of water recycled annually" },
    { value: 0, placeholder: "[X]%", label: "Renewable energy share" },
    { value: 0, placeholder: "[X]", label: "Sites with water treatment systems" },
  ],
  blocks: [
    {
      title: "Water stewardship",
      body: "Water use in textile manufacturing is measurable and manageable. Our published programs include low-liquor processing, recycling at selected facilities, and internal benchmarks tracked against [X] baseline targets — confirm current metrics with our sustainability team.",
      image: "/images/our-impact/environment/water-treatment.jpg",
      imageAlt: "Water treatment infrastructure at a manufacturing facility",
    },
    {
      title: "Renewable energy",
      body: "Solar and other renewable installations at selected sites contribute to a reported [X]% renewable energy share across the footprint — facility-level coverage varies by location and program.",
      image: "/images/our-impact/environment/solar.jpg",
      imageAlt: "Solar panel installation at a manufacturing site",
    },
  ] satisfies ImpactContentBlock[],
};

export const peopleContent = {
  heroImage: "/images/our-impact/people/hero.jpg",
  stats: [
    { value: 0, placeholder: "[X]", label: "Worker welfare programs" },
    { value: 0, placeholder: "[X]+", label: "Employees covered by training initiatives" },
    { value: 0, placeholder: "[X]", label: "Community partnerships active" },
  ],
  blocks: [
    {
      title: "Worker welfare and safety",
      body: "Manufacturing communities are the foundation of reliable production. Programs cover safety training, fair workplace standards, and grievance mechanisms aligned with buyer audit expectations — scope and coverage vary by facility.",
      image: "/images/our-impact/people/worker-program.jpg",
      imageAlt: "Worker training and welfare program",
    },
    {
      title: "Communities",
      body: "Community initiatives include education support, health programs, and local partnerships at selected manufacturing locations — documented in our published impact materials.",
      image: "/images/our-impact/people/community.jpg",
      imageAlt: "Community engagement program",
    },
  ] satisfies ImpactContentBlock[],
};

export const governanceContent = {
  heroImage: "/images/our-impact/governance/hero.jpg",
  stats: [
    { value: 0, placeholder: "[X]", label: "Active certifications" },
    { value: 0, placeholder: "[X]", label: "Facilities under compliance audit" },
    { value: 0, placeholder: "[X]", label: "Policy reviews completed annually" },
  ],
  intro:
    "Governance and certification programs provide the audit trail global brands require. Certification scope varies by facility, product line, and program — always confirm applicability for your order profile.",
};
