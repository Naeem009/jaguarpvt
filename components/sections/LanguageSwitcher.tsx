"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeOptions } from "@/lib/navigation/content";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export function LanguageSwitcher({
  variant = "dropdown",
  inverted = false,
  className,
}: {
  variant?: "dropdown" | "chips";
  inverted?: boolean;
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function switchLocale(nextLocale: Locale) {
    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  }

  if (variant === "chips") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {localeOptions.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => switchLocale(option.code as Locale)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              option.code === locale
                ? inverted
                  ? "border-white bg-white/10 text-white"
                  : "border-accent bg-accent-tint text-accent-dark"
                : inverted
                  ? "border-white/20 text-white/80 hover:border-white"
                  : "border-ink/10 text-graphite hover:border-accent",
            )}
          >
            {option.nativeLabel}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors",
          inverted
            ? "border-white/20 text-white hover:border-white"
            : "border-ink/10 text-ink hover:border-accent",
        )}
      >
        <span aria-hidden>🌐</span>
        <span>{current.code.toUpperCase()}</span>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute end-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-white py-2 shadow-[var(--shadow-card-hover)]"
        >
          {localeOptions.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={option.code === locale}
                onClick={() => switchLocale(option.code as Locale)}
                className={cn(
                  "flex w-full px-4 py-2 text-start text-sm transition-colors hover:bg-mist",
                  option.code === locale ? "font-medium text-accent-dark" : "text-graphite",
                )}
              >
                {option.nativeLabel}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
