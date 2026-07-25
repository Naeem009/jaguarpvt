import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
};

export function Select({
  label,
  options,
  placeholder = "Select an option",
  error,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <select
        id={selectId}
        className={cn(
          "w-full rounded-[var(--radius-card)] border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent",
          error && "border-error",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <span id={`${selectId}-error`} className="block text-sm text-error">
          {error}
        </span>
      ) : null}
    </label>
  );
}
