import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import {
  buildAlternateLanguages,
  pageMetadata,
  pageOgImages,
  siteName,
  siteUrl,
  type PageMetadataKey,
} from "@/lib/seo/config";

const openGraphLocales: Record<string, string> = {
  en: "en_US",
  ar: "ar_SA",
  zh: "zh_CN",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
};

export async function createPageMetadata(page: PageMetadataKey): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const locale = await getLocale();
  const entry = pageMetadata[page];
  const pageTitle = t(`${page}.title`);
  const title = `${siteName} | ${pageTitle}`;
  const description = t(`${page}.description`);
  const languages = buildAlternateLanguages(entry.path);
  const canonical = languages[locale] ?? languages.en;
  const ogImage = pageOgImages[page];
  const keywords = entry.keywords;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": languages.en,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName,
      locale: openGraphLocales[locale] ?? "en_US",
      alternateLocale: ["ar_SA", "zh_CN", "es_ES", "fr_FR", "de_DE"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    category: "business",
  };
}

export const rootSiteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
