import { buildEstimatorNarrative } from "@/lib/ai/estimator-narrative";
import {
  calculateImpactEstimate,
  validateEstimatorInput,
} from "@/lib/our-impact/estimator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = {
      category: body.category,
      volume: body.volume,
      material: body.material,
      locale: body.locale,
    };

    if (!validateEstimatorInput(input)) {
      return Response.json({ error: "Missing required estimator fields." }, { status: 400 });
    }

    const result = calculateImpactEstimate(input);
    const narrative = buildEstimatorNarrative(input, result);

    return Response.json({ narrative });
  } catch {
    return Response.json({ error: "Unable to generate estimator narrative." }, { status: 500 });
  }
}
