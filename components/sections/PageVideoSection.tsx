import { getTranslations } from "next-intl/server";
import { getPageVideoMedia } from "@/lib/media/page-videos";
import type { PageMetadataKey } from "@/lib/seo/config";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { sectionPaddingClass } from "@/lib/layout/section";
import { cn } from "@/lib/utils";

export async function PageVideoSection({
  pageKey,
  className,
}: {
  pageKey: PageMetadataKey;
  className?: string;
}) {
  const t = await getTranslations("sections.pageVideo");
  const tPage = await getTranslations(`sections.pageVideo.pages.${pageKey}`);
  const { src, poster } = getPageVideoMedia(pageKey);

  return (
    <section
      aria-labelledby={`page-video-${pageKey}`}
      className={cn("bg-paper", sectionPaddingClass, className)}
    >
      <SectionContainer>
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.06em] text-graphite">{t("eyebrow")}</p>
          <h2
            id={`page-video-${pageKey}`}
            className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink md:text-3xl"
          >
            {tPage("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-graphite md:text-lg">{tPage("subhead")}</p>
        </header>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-ink/8 bg-paper shadow-sm">
          <div className="relative aspect-[21/9] w-full max-h-[min(22rem,42vw)] bg-paper">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              className="h-full w-full object-cover"
              aria-label={tPage("videoAlt")}
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
