import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "stat" | "interactive";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  children: ReactNode;
};

const variantStyles: Record<CardVariant, string> = {
  default: "border border-ink/8 bg-white shadow-[var(--shadow-card)]",
  stat: "border border-ink/8 bg-white p-8 shadow-[var(--shadow-card)]",
  interactive:
    "border border-ink/8 bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]",
};

export function Card({
  variant = "default",
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card-lg)] p-8",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
