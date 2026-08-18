import Image from "next/image";
import { StatNumber } from "@/components/ui/StatNumber";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { evenGridColumnsClass, sectionPaddingCompactClass } from "@/lib/layout/section";
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
      className={cn("relative overflow-hidden bg-paper text-ink", sectionPaddingCompactClass, className)}
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

      <SectionContainer className="relative">
        <div className={cn("grid justify-items-center gap-8 text-center", evenGridColumnsClass(stats.length))}>
          {stats.map((stat) => (
            <StatNumber
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              placeholder={stat.placeholder}
              label={stat.label}
              align="center"
              className={
                isImpact
                  ? "[&_p:first-child]:!text-accent-dark [&_p:last-child]:!text-graphite"
                  : undefined
              }
            />
          ))}
        </div>

        {footerLink ? (
          <div className="mt-10 flex justify-center">
            <Button href={footerLink.href} variant="secondary" className="shrink-0">
              {footerLink.label}
            </Button>
          </div>
        ) : null}
      </SectionContainer>
    </section>
  );
}
