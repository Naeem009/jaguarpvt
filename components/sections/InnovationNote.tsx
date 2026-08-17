import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type InnovationNoteProps = {
  title: string;
  body: string;
  className?: string;
};

export async function InnovationNote({ title, body, className }: InnovationNoteProps) {
  const t = await getTranslations("sections.innovation");

  return (
    <section className={cn("border-y border-ink/8 bg-paper py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl space-y-4">
          <SectionHeading eyebrow={t("eyebrow")} title={title} />
          <p className="text-base leading-relaxed text-graphite md:text-lg">{body}</p>
        </div>
      </div>
    </section>
  );
}
