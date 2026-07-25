import { cn } from "@/lib/utils";

export type ContactPageHeroProps = {
  className?: string;
};

export function ContactPageHero({ className }: ContactPageHeroProps) {
  return (
    <section className={cn("border-b border-ink/8 bg-paper py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.06em] text-graphite">Contact</p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
            Tell us what you&apos;re building.
          </h1>
          <p className="text-lg leading-relaxed text-graphite">
            Share your program requirements and our team will respond with clear next steps — no automated quotes,
            no retail checkout flow.
          </p>
        </div>
      </div>
    </section>
  );
}
