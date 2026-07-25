import type { MetadataRoute } from "next";
import { marketingRoutes, siteUrl } from "@/lib/seo/config";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of marketingRoutes) {
    for (const locale of routing.locales) {
      const localizedPath =
        locale === routing.defaultLocale
          ? route || "/"
          : `/${locale}${route}`;

      entries.push({
        url: `${siteUrl}${localizedPath === "/" ? "" : localizedPath}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
