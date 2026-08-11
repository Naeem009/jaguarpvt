import { routing } from "@/i18n/routing";
import { pageMetadata, siteName, siteUrl, type PageMetadataKey } from "./config";

const LINKEDIN_URL = "https://www.linkedin.com/company/jaguar-pvt-ltd/";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/images/home/hero.jpg`,
    description:
      "Vertically integrated apparel manufacturer specializing in wovens, knits, and baby wear for global brands.",
    sameAs: [LINKEDIN_URL],
    knowsAbout: [
      "Apparel manufacturing",
      "Garment production",
      "Wovens",
      "Knits",
      "Baby wear",
      "Sustainable textile manufacturing",
      "Supply chain compliance",
    ],
  };
}

export function buildWebSiteJsonLd(locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}${prefix}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbJsonLd(
  locale: string,
  crumbs: Array<{ name: string; path: string }>,
) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${prefix}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

export function buildWebPageJsonLd(
  locale: string,
  page: PageMetadataKey,
  title: string,
  description: string,
) {
  const entry = pageMetadata[page];
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const path = entry.path || "/";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteUrl}${prefix}${path === "/" ? "" : path}`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}
