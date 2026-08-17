"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type SearchResult = {
  id: string;
  title: string;
  href: string;
  snippet: string;
};

export function CommandSearch() {
  const t = useTranslations("search");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/ai/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, scope: "global", locale }),
        });

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = (await response.json()) as { results: SearchResult[] };
        setResults(data.results ?? []);
        setActiveIndex(0);
      } catch {
        setError(t("error"));
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => window.clearTimeout(timeout);
  }, [locale, open, query, t]);

  const hasResults = results.length > 0;
  const helperText = useMemo(() => {
    if (loading) return t("searching");
    if (error) return error;
    if (!query) return t("suggested");
    if (!hasResults) return t("noResults");
    return t("navigateHint");
  }, [error, hasResults, loading, query, t]);

  function navigateToResult(result: SearchResult) {
    setOpen(false);
    router.push(result.href);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      navigateToResult(results[activeIndex]);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-charcoal/50 px-4 py-16 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0"
        aria-label={t("closeOverlay")}
        onClick={() => setOpen(false)}
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper shadow-[var(--shadow-card-hover)]">
        <div className="border-b border-ink/8 px-4 py-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={t("placeholder")}
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-graphite"
            aria-label={t("ariaLabel")}
          />
          <p className="mt-2 text-xs text-graphite">{helperText}</p>
        </div>

        <ul className="max-h-[min(60vh,420px)] overflow-y-auto py-2">
          {results.map((result, index) => (
            <li key={result.id}>
              <button
                type="button"
                onClick={() => navigateToResult(result)}
                className={cn(
                  "flex w-full flex-col gap-1 px-4 py-3 text-start transition-colors",
                  index === activeIndex ? "bg-paper" : "hover:bg-ink/5",
                )}
              >
                <span className="font-medium text-ink">{result.title}</span>
                <span className="text-sm text-graphite">{result.snippet}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-ink/8 px-4 py-3 text-xs text-graphite">
          {t("footerHint", {
            esc: t("esc"),
            ctrlK: `${t("ctrl")}+${t("k")}`,
          })}
        </div>
      </div>
    </div>
  );
}
