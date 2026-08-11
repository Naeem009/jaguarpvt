import { AIChatWidgetLazy } from "@/components/sections/AIChatWidgetLazy";
import { CommandSearch } from "@/components/sections/CommandSearch";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      {children}
      <Footer className="mt-auto shrink-0" />
      <CommandSearch />
      <AIChatWidgetLazy />
    </div>
  );
}
