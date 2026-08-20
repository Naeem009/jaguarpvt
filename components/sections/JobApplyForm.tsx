"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { MAX_CV_BYTES } from "@/lib/careers/schema";
import { cn } from "@/lib/utils";

type JobApplyFormProps = {
  jobSlug: string;
  jobTitle: string;
  className?: string;
};

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  coverLetter: string;
  companyWebsite: string;
};

export function JobApplyForm({ jobSlug, jobTitle, className }: JobApplyFormProps) {
  const t = useTranslations("careers.apply");
  const tCommon = useTranslations("common");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().trim().min(1, t("validation.nameRequired")),
        email: z.string().trim().email(t("validation.emailInvalid")),
        phone: z.string().trim().min(7, t("validation.phoneRequired")),
        city: z.string().trim().min(1, t("validation.cityRequired")),
        coverLetter: z.string().trim().max(4000).optional().or(z.literal("")),
        companyWebsite: z.string().optional(),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      coverLetter: "",
      companyWebsite: "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (!cvFile) {
      setCvError(t("validation.cvRequired"));
      return;
    }

    if (cvFile.size > MAX_CV_BYTES) {
      setCvError(t("validation.cvSize"));
      return;
    }

    setCvError(null);
    setSubmitState("submitting");
    setSubmitError(null);

    const payload = new FormData();
    payload.set("jobSlug", jobSlug);
    payload.set("fullName", values.fullName);
    payload.set("email", values.email);
    payload.set("phone", values.phone);
    payload.set("city", values.city);
    payload.set("coverLetter", values.coverLetter ?? "");
    payload.set("companyWebsite", values.companyWebsite ?? "");
    payload.set("cv", cvFile);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? t("submitError"));
      }

      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setSubmitError(error instanceof Error ? error.message : t("submitError"));
    }
  }

  if (submitState === "success") {
    return (
      <div id="apply" className={cn("rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper p-8", className)}>
        <h2 className="font-display text-2xl font-semibold text-ink">{t("successTitle")}</h2>
        <p className="mt-4 text-sm leading-relaxed text-graphite">
          {t("successBody", { role: jobTitle })}
        </p>
      </div>
    );
  }

  return (
    <div
      id="apply"
      className={cn("rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper p-8", className)}
    >
      <h2 className="font-display text-2xl font-semibold text-ink">{t("title")}</h2>
      <p className="mt-2 text-sm text-graphite">{t("subhead", { role: jobTitle })}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        <Input
          label={t("fullName")}
          autoComplete="name"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <Input
          label={t("email")}
          type="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label={t("phone")}
          type="tel"
          autoComplete="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input
          label={t("city")}
          autoComplete="address-level2"
          {...register("city")}
          error={errors.city?.message}
        />

        <label className="block space-y-2">
          <span className="text-sm font-medium text-ink">{t("cv")}</span>
          <input
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => {
              setCvFile(event.target.files?.[0] ?? null);
              setCvError(null);
            }}
            className={cn(
              "w-full rounded-[var(--radius-card)] border border-ink/10 bg-paper px-4 py-3 text-sm text-ink file:me-4 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink",
              cvError && "border-error",
            )}
            aria-invalid={Boolean(cvError)}
            aria-describedby={cvError ? "cv-error" : "cv-hint"}
          />
          <span id="cv-hint" className="block text-xs text-graphite">
            {t("cvHint")}
          </span>
          {cvError ? (
            <span id="cv-error" className="block text-sm text-error">
              {cvError}
            </span>
          ) : null}
        </label>

        <Textarea label={t("coverLetter")} {...register("coverLetter")} />

        <div className="hidden" aria-hidden="true">
          <Input label="Company website" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
        </div>

        {submitError ? <p className="text-sm text-error">{submitError}</p> : null}

        <Button type="submit" size="lg" disabled={submitState === "submitting"}>
          {submitState === "submitting" ? tCommon("submitting") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
