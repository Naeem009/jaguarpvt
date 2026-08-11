import { JsonLd } from "./JsonLd";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo/json-ld";
import type { PageMetadataKey } from "@/lib/seo/config";

export type PageJsonLdProps = {
  locale: string;
  page: PageMetadataKey;
  title: string;
  description: string;
  breadcrumbs: Array<{ name: string; path: string }>;
};

export function PageJsonLd({ locale, page, title, description, breadcrumbs }: PageJsonLdProps) {
  return (
    <>
      <JsonLd data={buildWebPageJsonLd(locale, page, title, description)} />
      <JsonLd data={buildBreadcrumbJsonLd(locale, breadcrumbs)} />
    </>
  );
}
