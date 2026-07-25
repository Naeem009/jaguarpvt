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
}: {
  label: string;
  items: MegaMenuItem[];
  footerAction?: { label: string; href: string };
  inverted?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (!open) return;

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-accent"
      >
        {label}
        <span aria-hidden>▾</span>
      </button>

      <div
        className={cn(
          "absolute start-0 top-full z-[200] pt-2",
          open ? "block" : "hidden",
        )}
      >
        <div className="w-[min(calc(100vw-2rem),720px)] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-white shadow-[var(--shadow-card-hover)]">
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
      </div>
    </div>
  );
}
