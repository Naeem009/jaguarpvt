import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternateLanguages, pageMetadata, siteName, type PageMetadataKey } from "@/lib/seo/config";

export async function createPageMetadata(page: PageMetadataKey): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const entry = pageMetadata[page];
  const title = `${t(`${page}.title`)} | ${siteName}`;
  const description = t(`${page}.description`);
  const languages = buildAlternateLanguages(entry.path);

  return {
    title,
    description,
    alternates: {
      canonical: languages.en,
      languages: {
        ...languages,
        "x-default": languages.en,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}
