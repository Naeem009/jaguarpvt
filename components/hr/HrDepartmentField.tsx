"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type HrDepartmentFieldProps = {
  value: string;
  departments: string[];
  onChange: (value: string) => void;
  onDepartmentsChange: (departments: string[]) => void;
};

export function HrDepartmentField({
  value,
  departments,
  onChange,
  onDepartmentsChange,
}: HrDepartmentFieldProps) {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"add" | "remove" | null>(null);

  const options = departments.map((name) => ({ value: name, label: name }));
  if (value && !departments.includes(value)) {
    options.unshift({ value, label: value });
  }

  async function addDepartment() {
    const name = newName.trim();
    if (!name) {
      setError("Enter a department name.");
      return;
    }

    setBusy("add");
    setError(null);

    try {
      const response = await fetch("/api/hr/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = (await response.json()) as { error?: string; departments?: string[]; name?: string };
      if (!response.ok || !data.departments) {
        throw new Error(data.error ?? "Unable to add this department.");
      }
      onDepartmentsChange(data.departments);
      onChange(data.name ?? name);
      setNewName("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to add this department.");
    } finally {
      setBusy(null);
    }
  }

  async function removeDepartment(name: string) {
    if (!window.confirm(`Remove department “${name}” from the dropdown?`)) {
      return;
    }

    setBusy("remove");
    setError(null);

    try {
      const response = await fetch(`/api/hr/departments?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string; departments?: string[] };
      if (!response.ok || !data.departments) {
        throw new Error(data.error ?? "Unable to remove this department.");
      }
      onDepartmentsChange(data.departments);
      if (value === name) {
        onChange(data.departments[0] ?? "");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to remove this department.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-3">
      <Select
        label="Department"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        options={options}
        placeholder="Select a department"
        required
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Add a department"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="e.g. Information Technology"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void addDepartment();
              }
            }}
          />
        </div>
        <Button type="button" variant="secondary" onClick={() => void addDepartment()} disabled={busy !== null}>
          {busy === "add" ? "Adding..." : "Add"}
        </Button>
      </div>
      {departments.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {departments.map((name) => (
            <li
              key={name}
              className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-paper py-1 ps-3 pe-1 text-xs font-medium text-graphite"
            >
              <span>{name}</span>
              <button
                type="button"
                onClick={() => void removeDepartment(name)}
                disabled={busy !== null}
                className="inline-flex size-6 items-center justify-center rounded-full text-graphite hover:bg-ink/5 hover:text-error"
                aria-label={`Remove ${name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className="text-sm text-error">{error}</p> : null}
    </div>
  );
}
