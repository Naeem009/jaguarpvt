import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type SustainabilityCalloutProps = {
  eyebrow?: string;
  title: string;
  body: string;
  className?: string;
};

export async function SustainabilityCallout({
  eyebrow,
  title,
  body,
  className,
}: SustainabilityCalloutProps) {
  const t = await getTranslations("sections.sustainabilityCallout");

  return (
    <section className={cn("bg-mist py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl space-y-4">
          <SectionHeading eyebrow={eyebrow ?? t("eyebrow")} title={title} />
          <p className="text-base leading-relaxed text-graphite md:text-lg">{body}</p>
        </div>
      </div>
    </section>
  );
}
