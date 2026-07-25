import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const contacts = [
  {
    region: "Americas",
    email: "americas@[company-domain]",
    note: "North and Latin America sourcing inquiries",
  },
  {
    region: "EMEA",
    email: "emea@[company-domain]",
    note: "Europe, Middle East, and Africa programs",
  },
  {
    region: "Asia Pacific",
    email: "apac@[company-domain]",
    note: "Asia Pacific manufacturing and development inquiries",
  },
];

export function AlternativeContact({ className }: { className?: string }) {
  return (
    <Card className={cn("h-fit", className)}>
      <h2 className="font-display text-xl font-semibold text-ink">Prefer email?</h2>
      <p className="mt-3 text-sm leading-relaxed text-graphite">
        Reach a regional contact directly if you would rather not use the form.
      </p>
      <ul className="mt-6 space-y-4">
        {contacts.map((contact) => (
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
