import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type CTASectionProps = {
  title: string;
  subhead?: string;
  cta: {
    label: string;
    href: string;
  };
  className?: string;
};

export function CTASection({ title, subhead, cta, className }: CTASectionProps) {
  return (
    <section className={cn("bg-sky py-20 text-ink md:py-28", className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <SectionHeading title={title} subhead={subhead} />
        <Button href={cta.href} size="lg" className="shrink-0">
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
