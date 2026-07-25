import type { Metadata } from "next";
import { buildAlternateLanguages, pageMetadata, siteName, type PageMetadataKey } from "@/lib/seo/config";

export function createPageMetadata(page: PageMetadataKey): Metadata {
  const entry = pageMetadata[page];
  const title = `${entry.title} | ${siteName}`;
  const languages = buildAlternateLanguages(entry.path);

  return {
    title,
    description: entry.description,
    alternates: {
      canonical: languages.en,
      languages: {
        ...languages,
        "x-default": languages.en,
      },
    },
    openGraph: {
      title,
      description: entry.description,
      type: "website",
    },
  };
}
