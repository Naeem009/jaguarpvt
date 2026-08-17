"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  calculateImpactEstimate,
  type EstimatorCategory,
  type EstimatorMaterial,
  type EstimatorOutput,
  type EstimatorVolume,
} from "@/lib/our-impact/estimator";
import { ESG_REPORT_URL } from "@/lib/our-impact/content";

const categoryValues: EstimatorCategory[] = ["wovens", "knits", "baby-wear"];
const volumeValues: EstimatorVolume[] = ["under-10k", "10k-50k", "50k-200k", "200k-plus"];
const materialValues: EstimatorMaterial[] = ["conventional", "organic-cotton", "recycled"];

function formatLiters(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M L`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K L`;
  }
  return `${value.toLocaleString()} L`;
}

function ComparisonBar({
  label,
  conventionalValue,
  companyValue,
  baselineLabel,
  companyLabel,
  formatter,
}: {
  label: string;
  conventionalValue: number;
  companyValue: number;
  baselineLabel: string;
  companyLabel: string;
  formatter: (value: number) => string;
}) {
  const max = Math.max(conventionalValue, companyValue, 1);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-ink">{label}</p>
      <div className="space-y-2">
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-graphite">
            <span>{baselineLabel}</span>
            <span>{formatter(conventionalValue)}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-paper">
            <motion.div
              className="h-full rounded-full bg-graphite/40"
              initial={{ width: 0 }}
              animate={{ width: `${(conventionalValue / max) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-graphite">
            <span>{companyLabel}</span>
            <span>{formatter(companyValue)}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-paper">
            <motion.div
              className="h-full rounded-full bg-tech"
              initial={{ width: 0 }}
              animate={{ width: `${(companyValue / max) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SustainabilityEstimator({ className }: { className?: string }) {
  const t = useTranslations("estimator");
  const [category, setCategory] = useState<EstimatorCategory>("knits");
  const [volume, setVolume] = useState<EstimatorVolume>("50k-200k");
  const [material, setMaterial] = useState<EstimatorMaterial>("organic-cotton");
  const [result, setResult] = useState<EstimatorOutput | null>(null);
  const [narrative, setNarrative] = useState<string | null>(null);
  const [isLoadingNarrative, setIsLoadingNarrative] = useState(false);

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

  const preview = useMemo(
    () => calculateImpactEstimate({ category, volume, material }),
    [category, volume, material],
  );

  async function handleEstimate() {
    const estimate = calculateImpactEstimate({ category, volume, material });
    setResult(estimate);
    setNarrative(null);
    setIsLoadingNarrative(true);

    try {
      const response = await fetch("/api/ai/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, volume, material }),
      });

      if (response.ok) {
        const data = (await response.json()) as { narrative: string };
        setNarrative(data.narrative);
      }
    } finally {
      setIsLoadingNarrative(false);
    }
  }

  const activeResult = result ?? preview;

  return (
    <section className={cn("bg-paper py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("heading.eyebrow")}
          title={t("heading.title")}
          subhead={t("heading.subhead")}
          className="mb-10 md:mb-12 [&_h2]:text-tech"
        />

        <Card className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <FieldSelect
                label={t("fields.category")}
                value={category}
                options={categoryOptions}
                onChange={(value) => setCategory(value as EstimatorCategory)}
              />
              <FieldSelect
                label={t("fields.volume")}
                value={volume}
                options={volumeOptions}
                onChange={(value) => setVolume(value as EstimatorVolume)}
              />
              <FieldSelect
                label={t("fields.material")}
                value={material}
                options={materialOptions}
                onChange={(value) => setMaterial(value as EstimatorMaterial)}
              />
              <Button onClick={handleEstimate}>{t("calculate")}</Button>
            </div>

            <div className="space-y-6 rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper p-6">
              <ComparisonBar
                label={t("comparison.water")}
                conventionalValue={activeResult.industryWaterLiters}
                companyValue={activeResult.companyWaterLiters}
                baselineLabel={t("comparison.baseline")}
                companyLabel={t("comparison.company")}
                formatter={formatLiters}
              />
              <ComparisonBar
                label={t("comparison.co2")}
                conventionalValue={activeResult.industryCo2Kg}
                companyValue={activeResult.companyCo2Kg}
                baselineLabel={t("comparison.baseline")}
                companyLabel={t("comparison.company")}
                formatter={(value) => `${value.toLocaleString()} kg`}
              />

              {narrative ? (
                <p className="border-t border-ink/8 pt-4 text-sm leading-relaxed text-graphite">
                  {narrative}
                </p>
              ) : isLoadingNarrative ? (
                <p className="border-t border-ink/8 pt-4 text-sm text-graphite">
                  {t("generating")}
                </p>
              ) : null}

              <p className="text-xs leading-relaxed text-graphite">
                {t("disclaimerPrefix")}{" "}
                <Link href={ESG_REPORT_URL} className="font-medium text-tech hover:text-tech/80">
                  {t("esgReport")}
                </Link>{" "}
                {t("disclaimerSuffix")}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[var(--radius-card)] border border-ink/10 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-tech"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
