import { JsonLd } from "./JsonLd";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/json-ld";

export function SiteJsonLd({ locale }: { locale: string }) {
  return (
    <>
      <JsonLd data={buildOrganizationJsonLd()} />
      <JsonLd data={buildWebSiteJsonLd(locale)} />
    </>
  );
}
