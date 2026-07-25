"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MegaMenu } from "./MegaMenu";
import { ESG_REPORT_URL } from "@/lib/our-impact/content";

const LOGO_SRC = "/logos/logo-dark.svg";

const navLinkClass = "text-sm font-medium text-ink transition-colors hover:text-accent";

export function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tProducts = useTranslations("productCategories");
  const tNavigation = useTranslations("navigation");
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileImpactOpen, setMobileImpactOpen] = useState(false);

  const productsMegaMenuItems = [
    {
      title: tProducts("wovens.name"),
      href: "/products/wovens" as const,
      description: tProducts("wovens.gridDescription"),
      image: "/images/products/wovens/hero.svg",
    },
    {
      title: tProducts("knits.name"),
      href: "/products/knits" as const,
      description: tProducts("knits.gridDescription"),
      image: "/images/products/knits/hero.svg",
    },
    {
      title: tProducts("baby-wear.name"),
      href: "/products/baby-wear" as const,
      description: tProducts("baby-wear.gridDescription"),
      image: "/images/products/baby-wear/hero.svg",
      badge: tProducts("catalogueBadge"),
    },
  ];

  const impactMegaMenuItems = (
    tNavigation.raw("impactMenu") as Array<{ title: string; description: string }>
  ).map((item, index) => ({
    ...item,
    href: (["/our-impact/environment", "/our-impact/people", "/our-impact/governance"] as const)[index],
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setMobileOpen(false);
    setMobileProductsOpen(false);
    setMobileImpactOpen(false);
  }, [pathname]);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileProductsOpen(false);
    setMobileImpactOpen(false);
  }

  const mobileMenu =
    mobileOpen && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[9999] lg:hidden" role="dialog" aria-modal="true" aria-label={t("menu")}>
            <button
              type="button"
              className="absolute inset-0 bg-charcoal/50"
              aria-label={t("closeMenuOverlay")}
              onClick={closeMobileMenu}
            />
            <div className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col bg-white shadow-[var(--shadow-card-hover)]">
              <div className="flex items-center justify-between border-b border-ink/8 px-4 py-4">
                <p className="font-medium text-ink">{t("menu")}</p>
                <button type="button" onClick={closeMobileMenu} aria-label={t("closeMenu")}>
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <Link
                  href="/"
                  className="relative mb-6 block h-[3.6rem] w-[240px]"
                  onClick={closeMobileMenu}
                >
                  <Image
                    src={LOGO_SRC}
                    alt="Jaguar (Pvt) Ltd."
                    fill
                    sizes="240px"
                    className="object-contain object-start"
                  />
                </Link>

                <div className="space-y-4">
                  <Link href="/" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("home")}
                  </Link>
                  <Link href="/about" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("about")}
                  </Link>

                  <div>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between text-base font-medium text-ink"
                      aria-expanded={mobileProductsOpen}
                      onClick={() => setMobileProductsOpen((value) => !value)}
                    >
                      {t("products")}
                      <span aria-hidden>{mobileProductsOpen ? "−" : "+"}</span>
                    </button>
                    {mobileProductsOpen ? (
                      <ul className="mt-3 space-y-2 ps-4">
                        {productsMegaMenuItems.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block text-sm text-graphite"
                              onClick={closeMobileMenu}
                            >
                              {item.title}
                              {item.badge ? ` · ${t("catalogueBadge")}` : ""}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between text-base font-medium text-ink"
                      aria-expanded={mobileImpactOpen}
                      onClick={() => setMobileImpactOpen((value) => !value)}
                    >
                      {t("ourImpact")}
                      <span aria-hidden>{mobileImpactOpen ? "−" : "+"}</span>
                    </button>
                    {mobileImpactOpen ? (
                      <ul className="mt-3 space-y-2 ps-4">
                        {impactMegaMenuItems.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block text-sm text-graphite"
                              onClick={closeMobileMenu}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <a href={ESG_REPORT_URL} className="block text-sm text-accent">
                            {t("downloadEsg")}
                          </a>
                        </li>
                      </ul>
                    ) : null}
                  </div>

                  <Link href="/facility" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("facility")}
                  </Link>
                  <Link href="/careers" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("careers")}
                  </Link>

                  <div className="pt-2">
                    <p className="mb-3 text-sm font-medium text-graphite">{t("language")}</p>
                    <LanguageSwitcher variant="chips" />
                  </div>
                </div>
              </div>

              <div className="border-t border-ink/8 p-4">
                <Button href="/contact" className="w-full">
                  {tCommon("contact")}
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/8 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">
          <Link
            href="/"
            className="relative block h-[3.6rem] w-[min(62.4vw,240px)] shrink-0 sm:h-[4.2rem] sm:w-[264px] lg:h-[5.4rem] lg:w-[408px]"
          >
            <Image
              src={LOGO_SRC}
              alt="Jaguar (Pvt) Ltd."
              fill
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 264px, 408px"
              className="object-contain object-start"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            <Link href="/" className={navLinkClass}>
              {t("home")}
            </Link>
            <Link href="/about" className={navLinkClass}>
              {t("about")}
            </Link>
            <MegaMenu label={t("products")} items={productsMegaMenuItems} />
            <MegaMenu
              label={t("ourImpact")}
              items={impactMegaMenuItems}
              footerAction={{ label: t("downloadEsg"), href: ESG_REPORT_URL }}
            />
            <Link href="/facility" className={navLinkClass}>
              {t("facility")}
            </Link>
            <Link href="/careers" className={navLinkClass}>
              {t("careers")}
            </Link>
            <LanguageSwitcher />
            <Button href="/contact">{tCommon("contact")}</Button>
          </nav>

          <button
            type="button"
            className="inline-flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-ink/10 bg-white text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            onPointerUp={(event) => {
              event.preventDefault();
              setMobileOpen((value) => !value);
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
