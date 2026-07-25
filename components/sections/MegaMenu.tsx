"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type MegaMenuItem = {
  title: string;
  href: string;
  description: string;
  image?: string;
  badge?: string;
};

export function MegaMenu({
  label,
  items,
  footerAction,
  inverted = false,
}: {
  label: string;
  items: MegaMenuItem[];
  footerAction?: { label: string; href: string };
  inverted?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex min-h-10 items-center gap-1 text-sm font-medium transition-colors",
          inverted ? "text-white hover:text-white/80" : "text-ink hover:text-accent",
        )}
      >
        {label}
        <span aria-hidden>▾</span>
      </button>

      {open ? (
        <div className="absolute start-0 top-full z-50 mt-3 w-[min(100vw-2rem,720px)] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-white shadow-[var(--shadow-card-hover)]">
          <div className="grid gap-1 p-2 sm:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-[var(--radius-card)] p-3 transition-colors hover:bg-mist"
              >
                {item.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-mist">
                    <Image src={item.image} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-[var(--radius-card)] bg-mist" />
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink">{item.title}</p>
                    {item.badge ? <Badge tone="accent">{item.badge}</Badge> : null}
                  </div>
                  <p className="text-sm leading-relaxed text-graphite">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {footerAction ? (
            <div className="border-t border-ink/8 bg-paper px-4 py-3">
              <Button href={footerAction.href} size="sm">
                {footerAction.label}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
