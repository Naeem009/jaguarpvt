"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export type DepartmentCategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
};

export function DepartmentCategoryTabs({
  categories,
  activeCategory,
  onChange,
  className,
}: DepartmentCategoryTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = useCallback((index: number) => {
    tabRefs.current[index]?.focus();
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % categories.length;
        event.preventDefault();
        onChange(categories[nextIndex]);
        focusTab(nextIndex);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + categories.length) % categories.length;
        event.preventDefault();
        onChange(categories[nextIndex]);
        focusTab(nextIndex);
        break;
      case "Home":
        event.preventDefault();
        onChange(categories[0]);
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        onChange(categories[categories.length - 1]);
        focusTab(categories.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Desktop: horizontal tabs */}
      <div
        role="tablist"
        aria-label="Production department categories"
        className="hidden flex-wrap gap-2 md:flex"
      >
        {categories.map((category, index) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`department-tab-${slugifyCategory(category)}`}
              aria-selected={isActive}
              aria-controls={`department-panel-${slugifyCategory(category)}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(category)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-ink/10 bg-white text-graphite hover:border-accent hover:text-accent-dark",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Mobile: stacked accordion-style selectors */}
      <div className="space-y-2 md:hidden" role="tablist" aria-label="Production department categories">
        {categories.map((category, index) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`department-tab-${slugifyCategory(category)}`}
              aria-selected={isActive}
              aria-controls={`department-panel-${slugifyCategory(category)}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(category)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "flex w-full items-center justify-between rounded-[var(--radius-card)] border px-4 py-3 text-start text-sm font-medium transition-colors",
                isActive
                  ? "border-accent bg-accent-tint text-accent-dark"
                  : "border-ink/10 bg-white text-graphite",
              )}
            >
              <span>{category}</span>
              <span aria-hidden className="text-graphite">
                {isActive ? "−" : "+"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
