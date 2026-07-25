import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type SustainabilityCalloutProps = {
  eyebrow?: string;
  title: string;
  body: string;
  className?: string;
};

export function SustainabilityCallout({
  eyebrow = "Sustainability",
  title,
  body,
  className,
}: SustainabilityCalloutProps) {
  return (
    <section className={cn("bg-earth-tint py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl space-y-4">
          <SectionHeading eyebrow={eyebrow} title={title} className="[&_h2]:text-earth" />
          <p className="text-base leading-relaxed text-graphite md:text-lg">{body}</p>
        </div>
      </div>
    </section>
  );
}
