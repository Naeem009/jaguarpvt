"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
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

const stepIds = ["category", "volume", "materials", "sustainability", "region"] as const;

const categoryValues = ["wovens", "knits", "baby-wear"] as const;
const volumeValues = ["under-10k", "10k-50k", "50k-200k", "200k-plus"] as const;
const materialValues = ["cotton", "organic-cotton", "polyester", "recycled-fiber"] as const;
const sustainabilityValues = ["gots", "oeko-tex", "wrap", "recycled-content", "low-impact-finishing"] as const;
const regionValues = ["north-america", "europe", "asia", "middle-east", "global"] as const;

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
  const t = useTranslations("matcher");
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<MatcherFormState>(initialState);
  const [result, setResult] = useState<MatcherResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(
    () => stepIds.map((id) => ({ id, title: t(`steps.${id}`) })),
    [t],
  );

  const categoryOptions = useMemo(
    () => categoryValues.map((value) => ({ value, label: t(`categories.${value}`) })),
    [t],
  );

  const volumeOptions = useMemo(
    () => volumeValues.map((value) => ({ value, label: t(`volumes.${value}`) })),
    [t],
  );

  const materialOptions = useMemo(
    () => materialValues.map((value) => ({ value, label: t(`materials.${value}`) })),
    [t],
  );

  const sustainabilityOptions = useMemo(
    () => sustainabilityValues.map((value) => ({ value, label: t(`sustainability.${value}`) })),
    [t],
  );

  const regionOptions = useMemo(
    () => regionValues.map((value) => ({ value, label: t(`regions.${value}`) })),
    [t],
  );

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
      setError(t("error"));
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
              eyebrow={t("result.eyebrow")}
              title={t("result.title")}
              subhead={t("result.subhead")}
              className="mb-6"
            />
            <p className="text-base leading-relaxed text-ink">{result.summary}</p>
            <p className="mt-4 text-sm text-graphite">{result.caveat}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={buildContactHref(form, result.summary)}>{t("result.sendToTeam")}</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setResult(null);
                  setStepIndex(0);
                  setForm(initialState);
                }}
              >
                {t("result.startOver")}
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
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          subhead={t("heading.subhead")}
          className="mb-10 md:mb-12"
        />

        <Card className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-graphite">
              {t("progress", { current: stepIndex + 1, total: steps.length })}
            </p>
            <div className="flex gap-2">
              {steps.map((step, index) => (
                <span
                  key={step.id}
                  className={cn(
                    "h-2 w-10 rounded-full",
                    index <= stepIndex ? "bg-tech" : "bg-ink/10",
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
              {t("back")}
            </Button>
            <Button onClick={handleNext} disabled={!canContinue() || isSubmitting}>
              {isSubmitting ? t("generating") : isLastStep ? t("generateMatch") : t("continue")}
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
              ? "border-tech bg-tech-tint text-tech"
              : "border-ink/10 bg-white text-graphite hover:border-tech",
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
                ? "border-tech bg-tech-tint text-tech"
                : "border-ink/10 bg-white text-graphite hover:border-tech",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
