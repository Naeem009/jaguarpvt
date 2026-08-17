"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type StatNumberProps = {
  value: number;
  suffix?: string;
  placeholder?: string;
  animateOnView?: boolean;
  className?: string;
  label?: string;
};

function formatValue(value: number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(value);
}

export function StatNumber({
  value,
  suffix,
  placeholder,
  animateOnView = true,
  className,
  label,
}: StatNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animateOnView && !prefersReducedMotion && !placeholder;
  const [animatedValue, setAnimatedValue] = useState(shouldAnimate ? 0 : value);

  useEffect(() => {
    if (placeholder || !shouldAnimate) {
      setAnimatedValue(value);
      return;
    }

    if (!isInView) {
      return;
    }

    const duration = 600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isInView, placeholder, shouldAnimate, value]);

  return (
    <div ref={ref} className={cn("space-y-1.5", className)}>
      <p className="font-mono text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {placeholder ?? formatValue(animatedValue)}
        {!placeholder && suffix ? <span>{suffix}</span> : null}
      </p>
      {label ? (
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-graphite">{label}</p>
      ) : null}
    </div>
  );
}
