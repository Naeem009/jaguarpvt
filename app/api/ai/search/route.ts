import { searchFacilities } from "@/lib/ai/facility-search";
import { searchSiteContent } from "@/lib/ai/site-search";
import { getFacilities } from "@/lib/facilities";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body.query === "string" ? body.query : "";
    const scope = typeof body.scope === "string" ? body.scope : "global";

    if (scope === "facilities") {
      const result = searchFacilities(query, getFacilities());
      return Response.json(result);
    }

    if (scope === "global") {
      const results = searchSiteContent(query);
      return Response.json({ results });
    }

    return Response.json({ error: "Unsupported search scope." }, { status: 400 });
  } catch {
    return Response.json({ error: "Unable to perform search." }, { status: 500 });
  }
}
