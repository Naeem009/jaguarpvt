import { Link } from "@/i18n/navigation";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  secondary:
    "border border-ink/10 bg-transparent text-ink hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  tertiary:
    "bg-transparent px-0 text-accent hover:text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-6 text-base",
  lg: "min-h-12 px-8 text-base",
};

const sharedStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

function ButtonContent({
  variant,
  children,
}: {
  variant: ButtonVariant;
  children: ReactNode;
}) {
  if (variant !== "tertiary") {
    return children;
  }

  return (
    <>
      {children}
      <span aria-hidden="true">→</span>
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    children,
    className,
    ...rest
  } = props;

  const classes = cn(
    sharedStyles,
    variantStyles[variant],
    variant === "tertiary" ? "min-h-11" : sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        <ButtonContent variant={variant}>{children}</ButtonContent>
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = rest as ButtonAsButton;

  return (
    <button className={classes} {...buttonProps}>
      <ButtonContent variant={variant}>{children}</ButtonContent>
    </button>
  );
}
