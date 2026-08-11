import knowledgeBase from "@/data/knowledge-base.json";
import { getDepartmentKnowledgeEntries } from "@/lib/departments/knowledge";

export type KnowledgeEntry = {
  id: string;
  title: string;
  source: string;
  href: string;
  keywords: string[];
  content: string;
};

const entries = [...(knowledgeBase as KnowledgeEntry[]), ...getDepartmentKnowledgeEntries()];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

export function retrieveKnowledge(query: string, limit = 3) {
  const normalizedQuery = normalize(query);
  const tokens = normalizedQuery.split(" ").filter(Boolean);

  return entries
    .map((entry) => {
      const haystack = normalize([entry.title, entry.content, ...entry.keywords].join(" "));
      let score = 0;
      if (haystack.includes(normalizedQuery)) score += 8;
      for (const token of tokens) {
        if (haystack.includes(token)) score += 2;
      }
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}

export function buildAssistantAnswer(query: string, locale: string, matches: KnowledgeEntry[]) {
  if (matches.length === 0) {
    return {
      answer:
        locale === "en"
          ? "I don't have that information in our published capability data. Let's connect you with our team through the Contact page for a direct answer."
          : "I don't have that information in our published capability data. Please use the Contact page so our team can help directly.",
      citations: [] as KnowledgeEntry[],
    };
  }

  const intro =
    locale === "en"
      ? "Based on our published capability data:"
      : "Based on our published capability data (response language: " + locale + "):";

  const body = matches.map((entry) => entry.content).join(" ");
  const caveat =
    "I cannot quote prices, confirm real-time capacity, or make commitments on the company's behalf. For anything requiring a real quote, use the Contact form.";

  return {
    answer: `${intro} ${body} ${caveat}`,
    citations: matches,
  };
}
