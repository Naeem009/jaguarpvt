import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type InnovationNoteProps = {
  title: string;
  body: string;
  className?: string;
};

export function InnovationNote({ title, body, className }: InnovationNoteProps) {
  return (
    <section className={cn("border-y border-ink/8 bg-white py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl space-y-4">
          <SectionHeading eyebrow="Innovation" title={title} />
          <p className="text-base leading-relaxed text-graphite md:text-lg">{body}</p>
        </div>
      </div>
    </section>
  );
}
