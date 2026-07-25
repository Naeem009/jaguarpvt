"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MegaMenu } from "./MegaMenu";
import {
  impactMegaMenuItems,
  primaryNavItems,
  productsMegaMenuItems,
} from "@/lib/navigation/content";
import { ESG_REPORT_URL } from "@/lib/our-impact/content";
import { cn } from "@/lib/utils";
import { routing, type Locale } from "@/i18n/routing";

function useIsHomePage() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return (
    segments.length === 0 ||
    (segments.length === 1 && routing.locales.includes(segments[0] as Locale))
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = useIsHomePage();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileImpactOpen, setMobileImpactOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled;
  const logoSrc = transparent ? "/logos/logo-light.svg" : "/logos/logo-dark.svg";

  const linkClass = cn(
    "text-sm font-medium transition-colors",
    transparent ? "text-white hover:text-white/80" : "text-ink hover:text-accent",
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          transparent
            ? "bg-transparent"
            : "border-b border-ink/8 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link href="/" className="relative block h-8 w-36 shrink-0">
            <Image src={logoSrc} alt="Jaguar (Pvt) Ltd." fill sizes="144px" className="object-contain object-start" priority />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            <Link href="/" className={linkClass}>
              Home
            </Link>
            <Link href="/about" className={linkClass}>
              About
            </Link>
            <MegaMenu
              label="Products"
              items={productsMegaMenuItems}
              inverted={transparent}
            />
            <MegaMenu
              label="Our Impact"
              items={impactMegaMenuItems}
              footerAction={{ label: "Download ESG Report", href: ESG_REPORT_URL }}
              inverted={transparent}
            />
            {primaryNavItems
              .filter((item) => item.href === "/facility" || item.href === "/careers")
              .map((item) => (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            <LanguageSwitcher inverted={transparent} />
            <Button href="/contact">Contact</Button>
          </nav>

          <button
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full border lg:hidden",
              transparent ? "border-white/20 text-white" : "border-ink/10 text-ink",
            )}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/50"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col bg-white shadow-[var(--shadow-card-hover)]">
            <div className="flex items-center justify-between border-b border-ink/8 px-4 py-4">
              <p className="font-medium text-ink">Menu</p>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="space-y-4">
                <Link href="/" className="block text-base font-medium text-ink" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="block text-base font-medium text-ink" onClick={() => setMobileOpen(false)}>
                  About
                </Link>

                <div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-base font-medium text-ink"
                    aria-expanded={mobileProductsOpen}
                    onClick={() => setMobileProductsOpen((value) => !value)}
                  >
                    Products
                    <span aria-hidden>{mobileProductsOpen ? "−" : "+"}</span>
                  </button>
                  {mobileProductsOpen ? (
                    <ul className="mt-3 space-y-2 ps-4">
                      {productsMegaMenuItems.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="block text-sm text-graphite" onClick={() => setMobileOpen(false)}>
                            {item.title}
                            {item.badge ? ` · ${item.badge}` : ""}
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
                    Our Impact
                    <span aria-hidden>{mobileImpactOpen ? "−" : "+"}</span>
                  </button>
                  {mobileImpactOpen ? (
                    <ul className="mt-3 space-y-2 ps-4">
                      {impactMegaMenuItems.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="block text-sm text-graphite" onClick={() => setMobileOpen(false)}>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <a href={ESG_REPORT_URL} className="block text-sm text-accent">
                          Download ESG Report
                        </a>
                      </li>
                    </ul>
                  ) : null}
                </div>

                <Link href="/facility" className="block text-base font-medium text-ink" onClick={() => setMobileOpen(false)}>
                  Facility
                </Link>
                <Link href="/careers" className="block text-base font-medium text-ink" onClick={() => setMobileOpen(false)}>
                  Careers
                </Link>

                <div className="pt-2">
                  <p className="mb-3 text-sm font-medium text-graphite">Language</p>
                  <LanguageSwitcher variant="chips" />
                </div>
              </div>
            </div>

            <div className="border-t border-ink/8 p-4">
              <Button href="/contact" className="w-full">
                Contact
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
