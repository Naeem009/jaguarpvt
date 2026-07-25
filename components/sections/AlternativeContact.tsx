import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export async function AlternativeContact({ className }: { className?: string }) {
  const t = await getTranslations("contactPage.alternative");
  const regions = t.raw("regions") as Array<{ region: string; email: string; note: string }>;

  return (
    <Card className={cn("h-fit", className)}>
      <h2 className="font-display text-xl font-semibold text-ink">{t("title")}</h2>
      <p className="mt-3 text-sm leading-relaxed text-graphite">{t("body")}</p>
      <ul className="mt-6 space-y-4">
        {regions.map((contact) => (
          <li key={contact.region} className="border-t border-ink/8 pt-4 first:border-t-0 first:pt-0">
            <p className="text-sm font-medium text-ink">{contact.region}</p>
            <a href={`mailto:${contact.email}`} className="mt-1 block text-sm text-accent hover:text-accent-dark">
              {contact.email}
            </a>
            <p className="mt-1 text-xs text-graphite">{contact.note}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
