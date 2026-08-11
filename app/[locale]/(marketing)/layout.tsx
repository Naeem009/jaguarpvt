import { headers } from "next/headers";
import { AIChatWidgetLazy } from "@/components/sections/AIChatWidgetLazy";
import { CommandSearch } from "@/components/sections/CommandSearch";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { DynamicPageJsonLd } from "@/components/seo/DynamicPageJsonLd";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";

type MarketingLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function MarketingLayout({ children, params }: MarketingLayoutProps) {
  const { locale } = await params;
  const pathname = (await headers()).get("x-pathname") ?? "/";

  return (
    <div className="flex flex-1 flex-col">
      <SiteJsonLd locale={locale} />
      <DynamicPageJsonLd locale={locale} pathname={pathname} />
      <Navbar />
      {children}
      <Footer className="mt-auto shrink-0" />
      <CommandSearch />
      <AIChatWidgetLazy />
    </div>
  );
}
