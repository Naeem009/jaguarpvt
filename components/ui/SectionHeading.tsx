import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionHeadingAlign = "start" | "center";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subhead?: string;
  align?: SectionHeadingAlign;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subhead,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.06em] text-graphite">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
        {title}
      </h2>
      {subhead ? (
        <p className="text-lg text-graphite md:text-xl">{subhead}</p>
      ) : null}
    </div>
  );
}
