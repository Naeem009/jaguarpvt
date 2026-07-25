"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type MatcherFormState = {
  category: string;
  volume: string;
  materials: string[];
  sustainability: string[];
  region: string;
};

type MatcherResponse = {
  summary: string;
  recommendedCategory: string;
  certifications: string[];
  caveat: string;
};

const steps = [
  { id: "category", title: "Product category" },
  { id: "volume", title: "Estimated monthly volume" },
  { id: "materials", title: "Key materials" },
  { id: "sustainability", title: "Sustainability requirements" },
  { id: "region", title: "Target delivery region" },
] as const;

const categoryOptions = [
  { value: "wovens", label: "Wovens" },
  { value: "knits", label: "Knits" },
  { value: "denim", label: "Denim" },
  { value: "baby-wear", label: "Baby Wear" },
];

const volumeOptions = [
  { value: "under-10k", label: "Under 10,000 units / month" },
  { value: "10k-50k", label: "10,000 – 50,000 units / month" },
  { value: "50k-200k", label: "50,000 – 200,000 units / month" },
  { value: "200k-plus", label: "200,000+ units / month" },
];

const materialOptions = [
  { value: "cotton", label: "Cotton" },
  { value: "organic-cotton", label: "Organic cotton" },
  { value: "polyester", label: "Polyester / blends" },
  { value: "denim-indigo", label: "Denim / indigo" },
  { value: "recycled-fiber", label: "Recycled fiber inputs" },
];

const sustainabilityOptions = [
  { value: "gots", label: "GOTS certification required" },
  { value: "oeko-tex", label: "OEKO-TEX required" },
  { value: "wrap", label: "WRAP required" },
  { value: "recycled-content", label: "Recycled content targets" },
  { value: "low-impact-finishing", label: "Low-impact finishing" },
];

const regionOptions = [
  { value: "north-america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
  { value: "middle-east", label: "Middle East" },
  { value: "global", label: "Global / multi-region" },
];

const initialState: MatcherFormState = {
  category: "",
  volume: "",
  materials: [],
  sustainability: [],
  region: "",
};

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function buildContactHref(form: MatcherFormState, summary: string) {
  const params = new URLSearchParams({
    category: form.category,
    volume: form.volume,
    materials: form.materials.join(","),
    sustainability: form.sustainability.join(","),
    region: form.region,
    matchSummary: summary,
  });

  return `/contact?${params.toString()}`;
}

export function CapabilityMatcher({ className }: { className?: string }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<MatcherFormState>(initialState);
  const [result, setResult] = useState<MatcherResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  async function handleNext() {
    if (!isLastStep) {
      setStepIndex((current) => current + 1);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Matcher request failed");
      }

      const data = (await response.json()) as MatcherResponse;
      setResult(data);
    } catch {
      setError("We could not generate a match summary right now. Try again or contact our team directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBack() {
    if (stepIndex > 0) {
      setStepIndex((current) => current - 1);
    }
  }

  function canContinue() {
    switch (currentStep.id) {
      case "category":
        return Boolean(form.category);
      case "volume":
        return Boolean(form.volume);
      case "materials":
        return form.materials.length > 0;
      case "sustainability":
        return form.sustainability.length > 0;
      case "region":
        return Boolean(form.region);
      default:
        return false;
    }
  }

  if (result) {
    return (
      <section className={cn("bg-mist py-16 md:py-24", className)}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Card className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Capability match"
              title="Your program match summary"
              subhead="Review this summary with our team to confirm capacity, certifications, and lead times."
              className="mb-6"
            />
            <p className="text-base leading-relaxed text-ink">{result.summary}</p>
            <p className="mt-4 text-sm text-graphite">{result.caveat}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={buildContactHref(form, result.summary)}>Send to our team</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setResult(null);
                  setStepIndex(0);
                  setForm(initialState);
                }}
              >
                Start over
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-mist py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Capability matcher"
          title="Find the right manufacturing fit"
          subhead="Answer five short questions to generate a grounded match summary based on our published capability data."
          className="mb-10 md:mb-12"
        />

        <Card className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-graphite">
              Step {stepIndex + 1} of {steps.length}
            </p>
            <div className="flex gap-2">
              {steps.map((step, index) => (
                <span
                  key={step.id}
                  className={cn(
                    "h-2 w-10 rounded-full",
                    index <= stepIndex ? "bg-accent" : "bg-ink/10",
                  )}
                  aria-hidden
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <h3 className="font-display text-2xl font-semibold text-ink">{currentStep.title}</h3>

              {currentStep.id === "category" ? (
                <OptionGrid
                  options={categoryOptions}
                  selected={form.category}
                  onSelect={(value) => setForm((current) => ({ ...current, category: value }))}
                />
              ) : null}

              {currentStep.id === "volume" ? (
                <OptionGrid
                  options={volumeOptions}
                  selected={form.volume}
                  onSelect={(value) => setForm((current) => ({ ...current, volume: value }))}
                />
              ) : null}

              {currentStep.id === "materials" ? (
                <MultiOptionGrid
                  options={materialOptions}
                  selected={form.materials}
                  onToggle={(value) =>
                    setForm((current) => ({
                      ...current,
                      materials: toggleValue(current.materials, value),
                    }))
                  }
                />
              ) : null}

              {currentStep.id === "sustainability" ? (
                <MultiOptionGrid
                  options={sustainabilityOptions}
                  selected={form.sustainability}
                  onToggle={(value) =>
                    setForm((current) => ({
                      ...current,
                      sustainability: toggleValue(current.sustainability, value),
                    }))
                  }
                />
              ) : null}

              {currentStep.id === "region" ? (
                <OptionGrid
                  options={regionOptions}
                  selected={form.region}
                  onSelect={(value) => setForm((current) => ({ ...current, region: value }))}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>

          {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="secondary" onClick={handleBack} disabled={stepIndex === 0}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canContinue() || isSubmitting}>
              {isSubmitting ? "Generating..." : isLastStep ? "Generate match" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

function OptionGrid({
  options,
  selected,
  onSelect,
}: {
  options: Array<{ value: string; label: string }>;
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className={cn(
            "rounded-[var(--radius-card)] border px-4 py-4 text-start text-sm transition-colors",
            selected === option.value
              ? "border-accent bg-accent-tint text-accent-dark"
              : "border-ink/10 bg-white text-graphite hover:border-accent",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function MultiOptionGrid({
  options,
  selected,
  onToggle,
}: {
  options: Array<{ value: string; label: string }>;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            className={cn(
              "rounded-[var(--radius-card)] border px-4 py-4 text-start text-sm transition-colors",
              isSelected
                ? "border-accent bg-accent-tint text-accent-dark"
                : "border-ink/10 bg-white text-graphite hover:border-accent",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
