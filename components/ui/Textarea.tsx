import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <textarea
        id={textareaId}
        className={cn(
          "min-h-32 w-full rounded-[var(--radius-card)] border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent",
          error && "border-error",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${textareaId}-error`} className="block text-sm text-error">
          {error}
        </span>
      ) : null}
    </label>
  );
}
