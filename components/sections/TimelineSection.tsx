import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type TimelineStep = {
  title: string;
  description: string;
  image?: string;
};

export type TimelineSectionProps = {
  eyebrow?: string;
  title?: string;
  subhead?: string;
  steps: TimelineStep[];
  className?: string;
};

export function TimelineSection({
  eyebrow = "Process",
  title = "From fiber to finished garment",
  subhead = "Integrated steps across cutting, sewing, finishing, and quality control — managed under one manufacturing system.",
  steps,
  className,
}: TimelineSectionProps) {
  return (
    <section className={cn("bg-paper py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} subhead={subhead} className="mb-12 md:mb-16" />

        <ol className="space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "grid items-center gap-8 md:grid-cols-2 md:gap-12",
                index % 2 === 1 && "md:[&>*:first-child]:order-2",
              )}
            >
              {step.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-white shadow-[var(--shadow-card)]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.06em] text-accent">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-graphite">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
