"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
      setSubmitError(error instanceof Error ? error.message : "Unable to submit the form right now.");
    }
  }

  if (submitState === "success") {
    return (
      <Card className={cn("max-w-3xl", className)}>
        <h2 className="font-display text-2xl font-semibold text-ink">Thank you — we received your inquiry.</h2>
        <p className="mt-4 text-sm leading-relaxed text-graphite">
          A member of our team will review your request and respond within 2 business days with clear next steps.
        </p>
      </Card>
    );
  }

  return (
    <Card className={cn("max-w-3xl", className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Company name"
            {...register("companyName")}
            error={errors.companyName?.message}
            autoComplete="organization"
          />
          <Input
            label="Contact name"
            {...register("contactName")}
            error={errors.contactName?.message}
            autoComplete="name"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            autoComplete="email"
          />
          <Input
            label="Brand / company website"
            type="url"
            placeholder="https://"
            {...register("website")}
            error={errors.website?.message}
            autoComplete="url"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Select
            label="Product category"
            options={productCategoryValues.map((value) => ({
              value,
              label: productCategoryLabels[value],
            }))}
            {...register("category")}
            error={errors.category?.message}
          />
          <Select
            label="Estimated annual volume"
            options={annualVolumeValues.map((value) => ({
              value,
              label: annualVolumeLabels[value],
            }))}
            {...register("annualVolume")}
            error={errors.annualVolume?.message}
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-ink">Sustainability requirements</legend>
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
          label="Message"
          placeholder="Tell us what you're building — product type, timing, compliance needs, and any context we should know."
          {...register("message")}
          error={errors.message?.message}
        />

        <input type="hidden" {...register("matchSummary")} />
        <input type="hidden" {...register("matcherVolume")} />
        <input type="hidden" {...register("matcherMaterials")} />
        <input type="hidden" {...register("matcherRegion")} />

        {submitError ? <p className="text-sm text-error">{submitError}</p> : null}

        <Button type="submit" size="lg" disabled={submitState === "submitting"}>
          {submitState === "submitting" ? "Submitting..." : "Contact Us"}
        </Button>
      </form>
    </Card>
  );
}
