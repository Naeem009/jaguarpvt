"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type ExamplePrompt = {
  question: string;
  answer: string;
};

export type AIChatWidgetProps = {
  mode: "floating" | "embedded";
  context?: string;
  locale?: string;
  title?: string;
  subhead?: string;
  examplePrompts?: ExamplePrompt[];
  className?: string;
};

const defaultPrompts: ExamplePrompt[] = [
  {
    question: "Can you produce GOTS-certified organic cotton knits at [X] units per month?",
    answer:
      "Based on our published capability data, we support certified organic cotton knits across selected facilities. Capacity varies by season and program — connect with our team for a current availability review.",
  },
  {
    question: "Which of your facilities handle denim finishing and washing?",
    answer:
      "Denim finishing and washing are listed among our denim category capabilities. Specific facility assignments depend on order profile and compliance requirements.",
  },
  {
    question: "What sustainability certifications do you currently hold?",
    answer:
      "Certifications including GOTS, OEKO-TEX, and WRAP appear in our published governance materials. Certification scope varies by facility and product line.",
  },
];

export function AIChatWidget({
  mode,
  context,
  title = "Ask our sourcing assistant",
  subhead = "Get grounded answers about capabilities, certifications, and categories — then route complex requests to our team.",
  examplePrompts = defaultPrompts,
  className,
}: AIChatWidgetProps) {
  if (mode === "floating") {
    return null;
  }

  return (
    <EmbeddedAIChatTeaser
      context={context}
      title={title}
      subhead={subhead}
      examplePrompts={examplePrompts}
      className={className}
    />
  );
}

function EmbeddedAIChatTeaser({
  context,
  title,
  subhead,
  examplePrompts,
  className,
}: {
  context?: string;
  title: string;
  subhead: string;
  examplePrompts: ExamplePrompt[];
  className?: string;
}) {
  const [activePrompt, setActivePrompt] = useState<ExamplePrompt | null>(
    examplePrompts[0] ?? null,
  );

  return (
    <section className={cn("bg-accent-tint py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="AI sourcing assistant"
          title={title}
          subhead={subhead}
          className="mb-10 md:mb-12"
        />

        <Card className="mx-auto max-w-4xl overflow-hidden p-0">
          <div className="border-b border-ink/8 bg-white px-6 py-4">
            <p className="text-sm font-medium text-ink">Sourcing assistant</p>
            {context ? <p className="mt-1 text-sm text-graphite">{context}</p> : null}
          </div>

          <div className="space-y-6 bg-paper px-6 py-8">
            <div className="flex flex-wrap gap-3">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt.question}
                  type="button"
                  onClick={() => setActivePrompt(prompt)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-left text-sm transition-colors",
                    activePrompt?.question === prompt.question
                      ? "border-accent bg-accent-tint text-accent-dark"
                      : "border-ink/10 bg-white text-graphite hover:border-accent hover:text-accent-dark",
                  )}
                >
                  {prompt.question}
                </button>
              ))}
            </div>

            {activePrompt ? (
              <div className="space-y-4 rounded-[var(--radius-card-lg)] border border-ink/8 bg-white p-6">
                <p className="text-sm font-medium text-graphite">You asked</p>
                <p className="text-base text-ink">{activePrompt.question}</p>
                <p className="text-sm font-medium text-graphite">Assistant</p>
                <p className="text-base leading-relaxed text-ink">{activePrompt.answer}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-graphite">
                    Source: Products capability data
                  </span>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-graphite">
                    Source: Governance & Certifications
                  </span>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-4 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-graphite">
                Answers are generated from our published capability data and may not reflect
                real-time capacity.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" variant="secondary" size="sm">
                  Talk to a human
                </Button>
                <Link href="/contact" className="text-sm font-medium text-accent hover:text-accent-dark">
                  Start a conversation →
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
