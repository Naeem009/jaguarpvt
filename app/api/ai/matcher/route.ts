import { buildMatcherResult, validateMatcherInput } from "@/lib/ai/matcher";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = {
      category: body.category,
      volume: body.volume,
      materials: body.materials ?? [],
      sustainability: body.sustainability ?? [],
      region: body.region,
      locale: body.locale,
    };

    if (!validateMatcherInput(input)) {
      return Response.json({ error: "Missing required matcher fields." }, { status: 400 });
    }

    const result = buildMatcherResult(input);

    return Response.json(result);
  } catch {
    return Response.json({ error: "Unable to generate match summary." }, { status: 500 });
  }
}
