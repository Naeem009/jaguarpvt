"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { getContactFormDefaults } from "@/lib/contact/prefill";
import {
  annualVolumeLabels,
  annualVolumeValues,
  contactFormSchema,
  productCategoryLabels,
  productCategoryValues,
  sustainabilityLabels,
  sustainabilityValues,
  type ContactFormValues,
} from "@/lib/contact/schema";
import { cn } from "@/lib/utils";

const defaultValues: ContactFormValues = {
  companyName: "",
  contactName: "",
  email: "",
  website: "",
  category: "wovens",
  annualVolume: "50k-250k",
  sustainability: [],
  message: "",
  matchSummary: "",
  matcherVolume: "",
  matcherMaterials: "",
  matcherRegion: "",
};

export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const searchParams = useSearchParams();
  const prefill = useMemo(() => getContactFormDefaults(searchParams), [searchParams]);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      ...defaultValues,
      ...prefill,
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState("submitting");
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Submission failed");
      }

      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setSubmitError(error instanceof Error ? error.message : t("submitError"));
    }
  }

  if (submitState === "success") {
    return (
      <Card className={cn("max-w-3xl", className)}>
        <h2 className="font-display text-2xl font-semibold text-ink">{t("successTitle")}</h2>
        <p className="mt-4 text-sm leading-relaxed text-graphite">{t("successBody")}</p>
      </Card>
    );
  }

  return (
    <Card className={cn("max-w-3xl", className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label={t("companyName")}
            {...register("companyName")}
            error={errors.companyName?.message}
            autoComplete="organization"
          />
          <Input
            label={t("contactName")}
            {...register("contactName")}
            error={errors.contactName?.message}
            autoComplete="name"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label={t("email")}
            type="email"
            {...register("email")}
            error={errors.email?.message}
            autoComplete="email"
          />
          <Input
            label={t("website")}
            type="url"
            placeholder={t("websitePlaceholder")}
            {...register("website")}
            error={errors.website?.message}
            autoComplete="url"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Select
            label={t("category")}
            options={productCategoryValues.map((value) => ({
              value,
              label: productCategoryLabels[value],
            }))}
            {...register("category")}
            error={errors.category?.message}
          />
          <Select
            label={t("annualVolume")}
            options={annualVolumeValues.map((value) => ({
              value,
              label: annualVolumeLabels[value],
            }))}
            {...register("annualVolume")}
            error={errors.annualVolume?.message}
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-ink">{t("sustainability")}</legend>
          <Controller
            name="sustainability"
            control={control}
            render={({ field }) => (
              <div className="grid gap-3 sm:grid-cols-2">
                {sustainabilityValues.map((value) => {
                  const checked = field.value?.includes(value) ?? false;
                  return (
                    <Checkbox
                      key={value}
                      label={sustainabilityLabels[value]}
                      checked={checked}
                      onChange={(isChecked) => {
                        const next = isChecked
                          ? [...(field.value ?? []), value]
                          : (field.value ?? []).filter((item) => item !== value);
                        field.onChange(next);
                      }}
                    />
                  );
                })}
              </div>
            )}
          />
        </fieldset>

        <Textarea
          label={t("message")}
          placeholder={t("messagePlaceholder")}
          {...register("message")}
          error={errors.message?.message}
        />

        <input type="hidden" {...register("matchSummary")} />
        <input type="hidden" {...register("matcherVolume")} />
        <input type="hidden" {...register("matcherMaterials")} />
        <input type="hidden" {...register("matcherRegion")} />

        {submitError ? <p className="text-sm text-error">{submitError}</p> : null}

        <Button type="submit" size="lg" disabled={submitState === "submitting"}>
          {submitState === "submitting" ? tCommon("submitting") : tCommon("contactUs")}
        </Button>
      </form>
    </Card>
  );
}
