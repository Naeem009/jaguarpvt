import type { EstimatorInput, EstimatorOutput } from "@/lib/our-impact/estimator";

const categoryLabels: Record<string, string> = {
  "casual-wear": "casual wear",
  streetwear: "streetwear",
  activewear: "activewear",
  denim: "denim",
  kidswear: "kidswear",
  boutique: "boutique",
};

const materialLabels: Record<string, string> = {
  conventional: "conventional materials",
  "organic-cotton": "certified organic cotton",
  recycled: "recycled fiber inputs",
};

export function buildEstimatorNarrative(input: EstimatorInput, output: EstimatorOutput) {
  const category = categoryLabels[input.category] ?? input.category;
  const material = materialLabels[input.material] ?? input.material;

  return [
    `At approximately ${output.units.toLocaleString()} units, modeled water use for ${category} programs using ${material} is about ${output.waterSavingsPercent}% lower than a conventional industry baseline in this estimator.`,
    `Modeled CO2e follows a similar pattern at roughly ${output.co2SavingsPercent}% below the baseline — based on published internal benchmarks, not a guarantee for any specific order.`,
  ].join(" ");
}
