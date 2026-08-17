import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        id={inputId}
        className={cn(
          "w-full rounded-[var(--radius-card)] border border-ink/10 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent",
          error && "border-error",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${inputId}-error`} className="block text-sm text-error">
          {error}
        </span>
      ) : null}
    </label>
  );
}
