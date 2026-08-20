"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { HR_DEPARTMENT_OPTIONS, HR_EMPLOYMENT_OPTIONS } from "@/lib/hr/labels";
import type { JobOpening } from "@/lib/careers/types";

type HrJobFormProps = {
  mode: "create" | "edit";
  initial?: JobOpening;
};

export function HrJobForm({ mode, initial }: HrJobFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [department, setDepartment] = useState(initial?.department ?? "manufacturing");
  const [location, setLocation] = useState(initial?.location ?? "Faisalabad");
  const [employmentType, setEmploymentType] = useState(initial?.employmentType ?? "full-time");
  const [experience, setExperience] = useState(initial?.experience ?? "");
  const [vacancies, setVacancies] = useState(String(initial?.vacancies ?? 1));
  const [deadline, setDeadline] = useState(initial?.applicationDeadline ?? "");
  const [pinned, setPinned] = useState(initial?.pinned ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [overview, setOverview] = useState((initial?.overview ?? []).join("\n\n"));
  const [requirements, setRequirements] = useState((initial?.requirements ?? []).join("\n"));
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setNotice(null);

    const payload = {
      title,
      slug,
      department,
      location,
      employmentType,
      experience,
      vacancies: Number(vacancies),
      applicationDeadline: deadline,
      pinned,
      published,
      overview,
      requirements,
    };

    try {
      const response = await fetch(mode === "create" ? "/api/hr/jobs" : `/api/hr/jobs/${initial?.slug}`, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        error?: string;
        opening?: JobOpening;
        persistedVia?: "filesystem" | "github";
      };
      if (!response.ok || !data.opening) {
        throw new Error(data.error ?? "Unable to save this opening.");
      }

      const waitNote =
        data.persistedVia === "github"
          ? " Saved to GitHub. The public Career page updates after the site rebuild finishes."
          : " Visible on the Career page now if the last date is still in the future.";

      if (mode === "create") {
        router.push(`/hr/jobs/${data.opening.slug}?saved=1`);
        router.refresh();
        return;
      }

      setNotice(`Saved.${waitNote}`);
      if (data.opening.slug !== initial?.slug) {
        router.replace(`/hr/jobs/${data.opening.slug}`);
      }
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save this opening.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete() {
    if (!initial || !window.confirm(`Remove “${initial.title}”? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/hr/jobs/${initial.slug}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to remove this opening.");
      }
      router.push("/hr");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to remove this opening.");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input label="Job title" value={title} onChange={(event) => setTitle(event.target.value)} required />
      <Input
        label="URL slug (optional)"
        value={slug}
        onChange={(event) => setSlug(event.target.value)}
        placeholder="quality-assurance-officer"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Department"
          value={department}
          onChange={(event) => setDepartment(event.target.value as JobOpening["department"])}
          options={HR_DEPARTMENT_OPTIONS.map((item) => ({ value: item.value, label: item.label }))}
          required
        />
        <Select
          label="Employment type"
          value={employmentType}
          onChange={(event) => setEmploymentType(event.target.value as JobOpening["employmentType"])}
          options={HR_EMPLOYMENT_OPTIONS.map((item) => ({ value: item.value, label: item.label }))}
          required
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Input label="Location" value={location} onChange={(event) => setLocation(event.target.value)} required />
        <Input
          label="Last date to apply"
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          required
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Experience (optional)"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
          placeholder="2–4 years"
        />
        <Input
          label="Vacancies"
          type="number"
          min={1}
          max={99}
          value={vacancies}
          onChange={(event) => setVacancies(event.target.value)}
          required
        />
      </div>
      <Textarea
        label="Role overview"
        value={overview}
        onChange={(event) => setOverview(event.target.value)}
        placeholder="One short paragraph per line or blank line."
        required
      />
      <Textarea
        label="Requirements"
        value={requirements}
        onChange={(event) => setRequirements(event.target.value)}
        placeholder="One requirement per line."
        required
      />
      <div className="space-y-3">
        <Checkbox
          label="Publish on the Career page (hidden automatically after the last date)"
          checked={published}
          onChange={setPublished}
        />
        <Checkbox label="Pin this role to the top of the list" checked={pinned} onChange={setPinned} />
      </div>
      {error ? <p className="text-sm text-error">{error}</p> : null}
      {notice ? <p className="text-sm text-accent-dark">{notice}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={submitting || deleting}>
          {submitting ? "Saving..." : mode === "create" ? "Create opening" : "Save changes"}
        </Button>
        {mode === "edit" ? (
          <Button type="button" variant="secondary" size="lg" onClick={onDelete} disabled={submitting || deleting}>
            {deleting ? "Removing..." : "Remove"}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
