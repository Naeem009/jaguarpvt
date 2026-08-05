export const CAREERS_ATS_URL = "https://www.linkedin.com/company/jaguar-pvt-ltd";

export const careersContent = {
  hero: {
    headline: "Careers",
    subhead:
      "Join a global manufacturing organization where precision, compliance, and continuous improvement are operational standards — not talking points.",
    image: "/images/careers/hero.jpg",
    alt: "Team members at an apparel manufacturing facility",
  },
  culture: {
    eyebrow: "Culture",
    title: "Built for people who care about how things are made",
    subhead:
      "We hire for craft, accountability, and respect for the communities our facilities operate in.",
    values: [
      {
        title: "Safety and dignity at work",
        body: "Modern facilities, clear standards, and training programs that treat production teams as skilled professionals.",
        image: "/images/careers/culture-01.jpg",
        alt: "Manufacturing team culture and workplace standards",
      },
      {
        title: "Continuous improvement",
        body: "Process discipline across quality, sustainability, and technology — with room to grow across functions and regions.",
        image: "/images/careers/culture-02.jpg",
        alt: "Continuous improvement and team collaboration",
      },
    ],
  },
  departments: [
    {
      name: "Manufacturing Operations",
      description: "Cut-and-sew, finishing, and production leadership across woven, knit, and baby wear lines.",
      href: `${CAREERS_ATS_URL}?department=manufacturing-operations`,
    },
    {
      name: "Quality & Compliance",
      description: "Inline quality systems, audit readiness, and certification program management.",
      href: `${CAREERS_ATS_URL}?department=quality-compliance`,
    },
    {
      name: "Product Development",
      description: "Technical design, sampling, and buyer-facing development support.",
      href: `${CAREERS_ATS_URL}?department=product-development`,
    },
    {
      name: "Sustainability",
      description: "Environmental programs, reporting, and buyer-facing impact documentation.",
      href: `${CAREERS_ATS_URL}?department=sustainability`,
    },
    {
      name: "Commercial & Corporate",
      description: "Sourcing partnerships, account management, finance, and regional commercial teams.",
      href: `${CAREERS_ATS_URL}?department=commercial-corporate`,
    },
  ],
};
