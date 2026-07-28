import Image from "next/image";
import type { CertificationLogo } from "@/lib/certifications/logos";
import { cn } from "@/lib/utils";

export function CertificationMarquee({
  logos,
  className,
}: {
  logos: CertificationLogo[];
  className?: string;
}) {
  if (logos.length === 0) {
    return null;
  }

  const loop = [...logos, ...logos];

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
      aria-label="Certification logos"
    >
      <ul className="flex w-max animate-customer-marquee items-center gap-12 py-3 motion-reduce:animate-none md:gap-16 md:py-4">
        {loop.map((logo, index) => (
          <li
            key={`${logo.src}-${index}`}
            className="flex h-14 w-36 shrink-0 items-center justify-center md:h-16 md:w-40"
          >
            <Image
              src={logo.src}
              alt=""
              width={160}
              height={64}
              sizes="160px"
              className="max-h-14 w-auto object-contain opacity-60 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 md:max-h-16"
            />
          </li>
        ))}
      </ul>

      <span className="sr-only">{logos.map((logo) => logo.alt).join(", ")}</span>
    </div>
  );
}
