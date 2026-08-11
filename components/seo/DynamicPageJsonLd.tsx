import { getTranslations } from "next-intl/server";
import { PageJsonLd } from "./PageJsonLd";
import { siteName } from "@/lib/seo/config";
import { getBreadcrumbsForPage, resolvePageKeyFromPath } from "@/lib/seo/resolve-page";

export async function DynamicPageJsonLd({
  locale,
  pathname,
}: {
  locale: string;
  pathname: string;
}) {
  const page = resolvePageKeyFromPath(pathname);
  if (!page) {
    return null;
  }

  const t = await getTranslations("metadata");
  const title = `${siteName} | ${t(`${page}.title`)}`;
  const description = t(`${page}.description`);

  return (
    <PageJsonLd
      locale={locale}
      page={page}
      title={title}
      description={description}
      breadcrumbs={getBreadcrumbsForPage(page)}
    />
  );
}
