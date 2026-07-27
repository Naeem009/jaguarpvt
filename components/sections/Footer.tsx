"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ESG_REPORT_URL } from "@/lib/our-impact/content";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("company"),
      links: [
        { label: tNav("about"), href: "/about" as const },
        { label: tNav("careers"), href: "/careers" as const },
        { label: tNav("facility"), href: "/facility" as const },
      ],
    },
    {
      title: t("products"),
      links: [
        { label: t("wovens"), href: "/products/wovens" as const },
        { label: t("knits"), href: "/products/knits" as const },
        { label: t("babyWear"), href: "/products/baby-wear" as const },
      ],
    },
    {
      title: t("ourImpact"),
      links: [
        { label: t("environment"), href: "/our-impact/environment" as const },
        { label: t("people"), href: "/our-impact/people" as const },
        { label: t("governance"), href: "/our-impact/governance" as const },
        { label: t("esgReports"), href: ESG_REPORT_URL, external: true },
      ],
    },
    {
      title: t("connect"),
      links: [
        { label: tCommon("contact"), href: "/contact" as const },
        {
          label: t("linkedin"),
          href: "https://www.linkedin.com/company/placeholder",
          external: true,
        },
      ],
    },
  ];

  const legalLinks = [
    { label: t("privacy"), href: "#privacy" },
    { label: t("terms"), href: "#terms" },
    { label: t("cookies"), href: "#cookies" },
    { label: t("modernSlavery"), href: "#modern-slavery" },
  ];

  return (
    <footer className={cn("border-t border-ink/8 bg-charcoal text-white", className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-white/70">
                {column.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher variant="chips" inverted />
          </div>

          <div className="mt-4 flex flex-col gap-1.5 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <p>{t("copyright", { year })}</p>
            <p>{t("footprint")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
