import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export async function ContactExpectations({ className }: { className?: string }) {
  const t = await getTranslations("contactPage.expectations");
  const steps = t.raw("steps") as Array<{ title: string; body: string }>;

  return (
    <Card className={cn("h-fit", className)}>
      <h2 className="font-display text-xl font-semibold text-ink">{t("title")}</h2>
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
