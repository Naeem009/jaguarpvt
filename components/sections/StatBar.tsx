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
      className={cn(
        "relative overflow-hidden py-16 md:py-24",
        isImpact ? "bg-brand-dark text-white" : "bg-paper text-ink",
        className,
      )}
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
          <div className="absolute inset-0 bg-brand-dark/80" aria-hidden />
        </>
      ) : null}

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={cn(
            "grid gap-10",
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
              className={isImpact ? "[&_p:first-child]:!text-accent-bright [&_p:last-child]:!text-white/75" : undefined}
            />
          ))}
        </div>

        {footerLink ? (
          <div className="mt-12 flex justify-center md:justify-start">
            <Button href={footerLink.href} variant="secondary" className="border-white/20 text-white hover:border-white hover:text-white">
              {footerLink.label}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
