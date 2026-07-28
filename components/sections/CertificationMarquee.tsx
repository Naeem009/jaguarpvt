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
      <ul className="flex w-max animate-customer-marquee items-center gap-6 py-5 motion-reduce:animate-none md:gap-8 md:py-8">
        {loop.map((logo, index) => (
          <li
            key={`${logo.src}-${index}`}
            className="flex h-64 w-80 shrink-0 items-center justify-center"
          >
            <Image
              src={logo.src}
              alt=""
              width={400}
              height={280}
              sizes="500px"
              className="max-h-56 w-auto max-w-full object-contain opacity-60 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>

      <span className="sr-only">{logos.map((logo) => logo.alt).join(", ")}</span>
    </div>
  );
}
