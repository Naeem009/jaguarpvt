import type { MetadataRoute } from "next";
import { buildAlternateLanguages, marketingRoutes, siteUrl } from "@/lib/seo/config";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of marketingRoutes) {
    const path = route || "/";
    const languages = buildAlternateLanguages(route);
    const defaultUrl =
      languages[routing.defaultLocale] ?? `${siteUrl}${path === "/" ? "" : path}`;

    entries.push({
      url: defaultUrl,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : route === "/contact" ? "monthly" : "monthly",
      priority: route === "" ? 1 : route === "/contact" ? 0.9 : route.startsWith("/products") ? 0.85 : 0.7,
      alternates: {
        languages,
      },
    });
  }

  return entries;
}
