import { JsonLd } from "@/components/seo/JsonLd";
import { validThroughIso } from "@/lib/careers/deadline";
import type { JobOpening } from "@/lib/careers/types";
import { siteName, siteUrl } from "@/lib/seo/config";

type JobPostingJsonLdProps = {
  opening: JobOpening;
  locale: string;
  url: string;
};

export function JobPostingJsonLd({ opening, locale, url }: JobPostingJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opening.title,
    description: opening.overview.join(" "),
    datePosted: "2026-08-01",
    validThrough: validThroughIso(opening.applicationDeadline),
    employmentType:
      opening.employmentType === "internship"
        ? "INTERN"
        : opening.employmentType === "contract"
          ? "CONTRACTOR"
          : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: siteName,
      sameAs: siteUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: opening.location,
        addressCountry: "PK",
      },
    },
    url,
    inLanguage: locale,
  };

  return <JsonLd data={data} />;
}
