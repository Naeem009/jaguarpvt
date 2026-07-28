import Image from "next/image";
import type { CustomerLogo } from "@/lib/customers/logos";
import { cn } from "@/lib/utils";

export function CustomerLogoMarquee({
  logos,
  className,
}: {
  logos: CustomerLogo[];
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
      aria-label="Customer brand logos"
    >
      <ul className="flex w-max animate-customer-marquee items-center gap-10 py-2 motion-reduce:animate-none md:gap-16">
        {loop.map((logo, index) => (
          <li
            key={`${logo.src}-${index}`}
            className="flex h-12 w-32 shrink-0 items-center justify-center md:h-14 md:w-40"
          >
            <Image
              src={logo.src}
              alt=""
              width={160}
              height={56}
              sizes="160px"
              className="max-h-12 w-auto object-contain opacity-70 grayscale transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-14"
            />
          </li>
        ))}
      </ul>

      <span className="sr-only">
        {logos.map((logo) => logo.alt).join(", ")}
      </span>
    </div>
  );
}
