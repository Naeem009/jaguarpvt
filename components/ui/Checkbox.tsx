import { cn } from "@/lib/utils";

export type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  className?: string;
};

export function Checkbox({ label, checked, onChange, name, value, className }: CheckboxProps) {
  return (
    <label className={cn("flex items-start gap-3 text-sm text-graphite", className)}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-1 size-4 rounded border-ink/20 text-accent focus:ring-accent"
      />
      <span>{label}</span>
    </label>
  );
}
