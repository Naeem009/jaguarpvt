import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type ProductGridItem = {
  title: string;
  image: string;
  href: string;
  description: string;
  badge?: string;
};

export type ProductGridProps = {
  eyebrow?: string;
  title?: string;
  subhead?: string;
  items: ProductGridItem[];
  className?: string;
};

export function ProductGrid({
  eyebrow = "Products",
  title = "Built across four core categories",
  subhead = "From woven shirting to certified baby wear, each category is supported by integrated manufacturing and quality systems.",
  items,
  className,
}: ProductGridProps) {
  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} subhead={subhead} className="mb-12 md:mb-16" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group block h-full">
              <Card variant="interactive" className="flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                    {item.badge ? <Badge tone="accent">{item.badge}</Badge> : null}
                  </div>
                  <p className="text-sm leading-relaxed text-graphite">{item.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
