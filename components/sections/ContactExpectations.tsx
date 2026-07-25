import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "We review your inquiry",
    body: "Your submission is routed to the team best suited to your category, volume, and compliance requirements.",
  },
  {
    title: "We respond within 2 business days",
    body: "Expect a direct reply with clarifying questions or a suggested next step — not an automated quote.",
  },
  {
    title: "We align on scope and documentation",
    body: "If there is a fit, we follow up with capability detail, certification scope, and the right contacts for your program.",
  },
];

export function ContactExpectations({ className }: { className?: string }) {
  return (
    <Card className={cn("h-fit", className)}>
      <h2 className="font-display text-xl font-semibold text-ink">What happens next</h2>
      <ol className="mt-6 space-y-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-tint text-sm font-semibold text-accent-dark">
              {index + 1}
            </span>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-graphite">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
