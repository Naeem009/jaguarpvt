import type { ReactNode } from "react";
import {
  sectionContainerClass,
  sectionPaddingClass,
  sectionPaddingCompactClass,
} from "@/lib/layout/section";
import { cn } from "@/lib/utils";

export type SectionContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "content";
  as?: "div" | "section";
  padding?: "default" | "compact" | "none";
};

const widthClass = {
  default: sectionContainerClass,
  narrow: "mx-auto w-full max-w-3xl px-4 md:px-6",
  content: "mx-auto w-full max-w-5xl px-4 md:px-6",
} as const;

export function SectionContainer({
  children,
  className,
  width = "default",
  as: Tag = "div",
  padding = "none",
}: SectionContainerProps) {
  return (
    <Tag
      className={cn(
        widthClass[width],
        padding === "default" && sectionPaddingClass,
        padding === "compact" && sectionPaddingCompactClass,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
