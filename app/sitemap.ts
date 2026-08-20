import type { MetadataRoute } from "next";
import { getActiveOpenings } from "@/lib/careers/query";
import { buildAlternateLanguages, marketingRoutes, siteUrl } from "@/lib/seo/config";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const careerOpeningRoutes = (await getActiveOpenings()).map((opening) => `/careers/${opening.slug}`);
  const routes = [...marketingRoutes, ...careerOpeningRoutes];

  for (const route of routes) {
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
