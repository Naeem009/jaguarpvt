import { generateAssistantResponse } from "@/lib/ai/assistant";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body.query === "string" ? body.query.trim() : "";
    const locale = typeof body.locale === "string" ? body.locale : "en";
    const history = Array.isArray(body.history) ? body.history : [];

    if (!query) {
      return Response.json({ error: "Query is required." }, { status: 400 });
    }

    const response = await generateAssistantResponse({ query, locale, history });

    return Response.json({
      answer: response.answer,
      citations: response.citations.map((entry) => ({
        title: entry.source,
        href: entry.href,
      })),
    });
  } catch {
    return Response.json({ error: "Unable to generate assistant response." }, { status: 500 });
  }
}
