import Image from "next/image";
import { StatNumber } from "@/components/ui/StatNumber";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type StatBarItem = {
  value: number;
  label: string;
  suffix?: string;
  placeholder?: string;
};

export type StatBarProps = {
  stats: StatBarItem[];
  variant?: "default" | "impact";
  backgroundImage?: string;
  footerLink?: {
    href: string;
    label: string;
  };
  className?: string;
};

export function StatBar({
  stats,
  variant = "default",
  backgroundImage,
  footerLink,
  className,
}: StatBarProps) {
  const isImpact = variant === "impact";

  return (
    <section
      className={cn("relative overflow-hidden bg-paper py-12 text-ink md:py-16", className)}
    >
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            aria-hidden
          />
          <div className="absolute inset-0 bg-paper/85" aria-hidden />
        </>
      ) : null}

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={cn(
            "grid gap-8",
            stats.length === 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {stats.map((stat) => (
            <StatNumber
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              placeholder={stat.placeholder}
              label={stat.label}
              className={
                isImpact
                  ? "[&_p:first-child]:!text-accent-dark [&_p:last-child]:!text-graphite"
                  : undefined
              }
            />
          ))}
        </div>

        {footerLink ? (
          <div className="mt-10 flex justify-center md:justify-start">
            <Button href={footerLink.href} variant="secondary" className="shrink-0">
              {footerLink.label}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
