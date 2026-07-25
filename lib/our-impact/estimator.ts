export type EstimatorCategory = "wovens" | "knits" | "denim" | "baby-wear";

export type EstimatorMaterial = "conventional" | "organic-cotton" | "recycled";

export type EstimatorVolume = "under-10k" | "10k-50k" | "50k-200k" | "200k-plus";

export type EstimatorInput = {
  category: EstimatorCategory;
  volume: EstimatorVolume;
  material: EstimatorMaterial;
  locale?: string;
};

export type EstimatorOutput = {
  units: number;
  companyWaterLiters: number;
  industryWaterLiters: number;
  companyCo2Kg: number;
  industryCo2Kg: number;
  waterSavingsPercent: number;
  co2SavingsPercent: number;
};

const volumeToUnits: Record<EstimatorVolume, number> = {
  "under-10k": 7500,
  "10k-50k": 30000,
  "50k-200k": 125000,
  "200k-plus": 250000,
};

const categoryBenchmarks: Record<
  EstimatorCategory,
  { waterPerUnit: number; co2PerUnit: number; industryWaterPerUnit: number; industryCo2PerUnit: number }
> = {
  wovens: {
    waterPerUnit: 2.4,
    co2PerUnit: 3.1,
    industryWaterPerUnit: 3.2,
    industryCo2PerUnit: 4.0,
  },
  knits: {
    waterPerUnit: 2.8,
    co2PerUnit: 2.9,
    industryWaterPerUnit: 3.6,
    industryCo2PerUnit: 3.8,
  },
  denim: {
    waterPerUnit: 7.5,
    co2PerUnit: 5.2,
    industryWaterPerUnit: 10.2,
    industryCo2PerUnit: 7.1,
  },
  "baby-wear": {
    waterPerUnit: 2.2,
    co2PerUnit: 2.6,
    industryWaterPerUnit: 2.9,
    industryCo2PerUnit: 3.4,
  },
};

const materialFactors: Record<EstimatorMaterial, { water: number; co2: number }> = {
  conventional: { water: 1, co2: 1 },
  "organic-cotton": { water: 0.9, co2: 0.94 },
  recycled: { water: 0.78, co2: 0.68 },
};

export function calculateImpactEstimate(input: EstimatorInput): EstimatorOutput {
  const units = volumeToUnits[input.volume];
  const benchmark = categoryBenchmarks[input.category];
  const material = materialFactors[input.material];

  const companyWaterLiters = Math.round(
    units * benchmark.waterPerUnit * 1000 * material.water,
  );
  const industryWaterLiters = Math.round(units * benchmark.industryWaterPerUnit * 1000);
  const companyCo2Kg = Math.round(units * benchmark.co2PerUnit * material.co2);
  const industryCo2Kg = Math.round(units * benchmark.industryCo2PerUnit);

  const waterSavingsPercent = Math.round(
    ((industryWaterLiters - companyWaterLiters) / industryWaterLiters) * 100,
  );
  const co2SavingsPercent = Math.round(
    ((industryCo2Kg - companyCo2Kg) / industryCo2Kg) * 100,
  );

  return {
    units,
    companyWaterLiters,
    industryWaterLiters,
    companyCo2Kg,
    industryCo2Kg,
    waterSavingsPercent: Math.max(waterSavingsPercent, 0),
    co2SavingsPercent: Math.max(co2SavingsPercent, 0),
  };
}

export function validateEstimatorInput(input: Partial<EstimatorInput>): input is EstimatorInput {
  return Boolean(input.category && input.volume && input.material);
}
