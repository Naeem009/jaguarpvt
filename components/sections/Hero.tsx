import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type HeroMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export type HeroCTA = {
  label: string;
  href: string;
};

export type HeroProps = {
  headline: string;
  subhead: string;
  primaryCTA: HeroCTA;
  secondaryCTA?: HeroCTA;
  media: HeroMedia;
  variant?: "home" | "inner";
};

export function Hero({
  headline,
  subhead,
  primaryCTA,
  secondaryCTA,
  media,
  variant = "home",
}: HeroProps) {
  const isHome = variant === "home";

  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden bg-charcoal text-white",
        isHome ? "min-h-screen" : "min-h-[60vh]",
      )}
    >
      <div className="absolute inset-0">
        {media.type === "video" ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={media.poster}
            className="h-full w-full object-cover"
            aria-label={media.alt}
          >
            <source src={media.src} />
          </video>
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="max-w-2xl text-lg text-white/80 md:text-xl">{subhead}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href={primaryCTA.href} size="lg">
              {primaryCTA.label}
            </Button>
            {secondaryCTA ? (
              <Button href={secondaryCTA.href} variant="secondary" size="lg" className="border-white/20 text-white hover:border-white hover:text-white">
                {secondaryCTA.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
