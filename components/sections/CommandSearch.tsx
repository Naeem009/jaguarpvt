"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SearchResult = {
  id: string;
  title: string;
  href: string;
  snippet: string;
};

export function CommandSearch() {
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
          body: JSON.stringify({ query, scope: "global" }),
        });

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = (await response.json()) as { results: SearchResult[] };
        setResults(data.results ?? []);
        setActiveIndex(0);
      } catch {
        setError("Unable to search right now.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => window.clearTimeout(timeout);
  }, [open, query]);

  const hasResults = results.length > 0;
  const helperText = useMemo(() => {
    if (loading) return "Searching...";
    if (error) return error;
    if (!query) return "Suggested pages";
    if (!hasResults) return "No results found.";
    return "Navigate with ↑ ↓ and press Enter";
  }, [error, hasResults, loading, query]);

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
        aria-label="Close search overlay"
        onClick={() => setOpen(false)}
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-white shadow-[var(--shadow-card-hover)]">
        <div className="border-b border-ink/8 px-4 py-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search pages, products, certifications, facilities..."
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-graphite"
            aria-label="Site search"
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
                  index === activeIndex ? "bg-accent-tint" : "hover:bg-mist",
                )}
              >
                <span className="font-medium text-ink">{result.title}</span>
                <span className="text-sm text-graphite">{result.snippet}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-ink/8 px-4 py-3 text-xs text-graphite">
          Press <kbd className="rounded bg-mist px-1.5 py-0.5">Esc</kbd> to close ·{" "}
          <kbd className="rounded bg-mist px-1.5 py-0.5">Ctrl</kbd>+
          <kbd className="rounded bg-mist px-1.5 py-0.5">K</kbd> to open
        </div>
      </div>
    </div>
  );
}
