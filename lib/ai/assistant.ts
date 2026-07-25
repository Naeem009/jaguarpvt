import { buildAssistantAnswer, retrieveKnowledge } from "@/lib/ai/knowledge-base";

type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function generateAssistantResponse({
  query,
  locale = "en",
}: {
  query: string;
  locale?: string;
  history?: AssistantMessage[];
}) {
  const matches = retrieveKnowledge(query);
  return buildAssistantAnswer(query, locale, matches);
}
