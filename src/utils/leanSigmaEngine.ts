/**
 * Lean Sigma Calculation Engine
 * Pure, tested mathematical implementation conforming to Lean Six Sigma & TOC standards.
 */

export interface LeanSigmaInputs {
  totalUnitsProduced: number;
  defectiveUnits: number;
  totalProductionTimeHours: number;
  productiveOperatingTimeHours: number;
  totalProcessCycleTimeMin: number;
  totalLeadTimeHours: number;
  totalOperatingCost: number;
  costPerDefect: number;
  baselineThroughputPerHour: number;
  improvedThroughputPerHour: number;
  opportunitiesPerUnit: number; // for DPMO
  investmentCost: number; // for ROI / Payback
  valueAddedTimeMin: number; // for Process Cycle Efficiency (PCE)
}

export interface LeanSigmaResults {
  defectRatePct: number;
  firstPassYieldPct: number;
  productionThroughputUnitsPerHour: number;
  processCycleEfficiencyPct: number;
  availabilityPct: number;
  estimatedScrapReworkCost: number;
  dpmo: number;
  estimatedSigmaLevel: number; // Documented standard conversion
  estimatedTimeSavedHoursPerUnit: number;
  estimatedTotalTimeSavedHours: number;
  estimatedCostSavings: number;
  estimatedRoiPct: number;
  estimatedPaybackPeriodMonths: number | null;
  validationWarnings: string[];
}

export const DEFAULT_LEAN_SIGMA_INPUTS: LeanSigmaInputs = {
  totalUnitsProduced: 10000,
  defectiveUnits: 240,
  totalProductionTimeHours: 160,
  productiveOperatingTimeHours: 136,
  totalProcessCycleTimeMin: 45,
  totalLeadTimeHours: 24, // 1440 min
  totalOperatingCost: 150000,
  costPerDefect: 125,
  baselineThroughputPerHour: 62.5,
  improvedThroughputPerHour: 78.0,
  opportunitiesPerUnit: 5,
  investmentCost: 45000,
  valueAddedTimeMin: 32 // value added portion
};

/**
 * Standard Six Sigma DPMO to Sigma conversion approximation table (with 1.5 sigma shift)
 * Defect per Million Opportunities -> Sigma level
 */
export function convertDpmoToSigmaLevel(dpmo: number): number {
  if (dpmo <= 0) return 6.0;
  if (dpmo <= 3.4) return 6.0;
  if (dpmo <= 233) return 5.0;
  if (dpmo <= 6210) return 4.0;
  if (dpmo <= 66807) return 3.0;
  if (dpmo <= 308537) return 2.0;
  if (dpmo <= 690000) return 1.0;
  return 0.5;
}

export function calculateLeanSigmaMetrics(inputs: LeanSigmaInputs): LeanSigmaResults {
  const warnings: string[] = [];

  // 1. Defect Rate (%) = Defective Units ÷ Total Units × 100
  let defectRatePct = 0;
  if (inputs.totalUnitsProduced > 0) {
    if (inputs.defectiveUnits > inputs.totalUnitsProduced) {
      warnings.push("Defective units cannot exceed total units produced.");
      defectRatePct = 100;
    } else {
      defectRatePct = (inputs.defectiveUnits / inputs.totalUnitsProduced) * 100;
    }
  } else {
    warnings.push("Total units produced must be greater than zero.");
  }

  // 2. First Pass Yield (%) = Units passing without rework ÷ Total units × 100
  const goodUnits = Math.max(0, inputs.totalUnitsProduced - inputs.defectiveUnits);
  let firstPassYieldPct = 0;
  if (inputs.totalUnitsProduced > 0) {
    firstPassYieldPct = (goodUnits / inputs.totalUnitsProduced) * 100;
  }

  // 3. Production Throughput = Good units produced ÷ Elapsed productive operating time
  let productionThroughputUnitsPerHour = 0;
  if (inputs.productiveOperatingTimeHours > 0) {
    productionThroughputUnitsPerHour = goodUnits / inputs.productiveOperatingTimeHours;
  } else if (inputs.totalProductionTimeHours > 0) {
    productionThroughputUnitsPerHour = goodUnits / inputs.totalProductionTimeHours;
  }

  // 4. Process Cycle Efficiency (PCE) % = Value-Added Time ÷ Total Lead Time × 100
  // Convert Total Lead Time to minutes
  const totalLeadTimeMin = inputs.totalLeadTimeHours * 60;
  let processCycleEfficiencyPct = 0;
  if (totalLeadTimeMin > 0) {
    if (inputs.valueAddedTimeMin > totalLeadTimeMin) {
      warnings.push("Value-added time cannot exceed total lead time.");
      processCycleEfficiencyPct = 100;
    } else {
      processCycleEfficiencyPct = (inputs.valueAddedTimeMin / totalLeadTimeMin) * 100;
    }
  }

  // 5. Availability (%) = Operating Time ÷ Planned Production Time × 100
  let availabilityPct = 0;
  if (inputs.totalProductionTimeHours > 0) {
    if (inputs.productiveOperatingTimeHours > inputs.totalProductionTimeHours) {
      warnings.push("Productive operating time cannot exceed total planned production time.");
      availabilityPct = 100;
    } else {
      availabilityPct = (inputs.productiveOperatingTimeHours / inputs.totalProductionTimeHours) * 100;
    }
  }

  // 6. Estimated Scrap & Rework Cost = Defective units × Cost per defect
  const estimatedScrapReworkCost = inputs.defectiveUnits * Math.max(0, inputs.costPerDefect);

  // 7. Six Sigma DPMO = Defects ÷ (Units × Opportunities per Unit) × 1,000,000
  let dpmo = 0;
  const oppsPerUnit = Math.max(1, inputs.opportunitiesPerUnit);
  const totalOpportunities = inputs.totalUnitsProduced * oppsPerUnit;
  if (totalOpportunities > 0) {
    dpmo = (inputs.defectiveUnits / totalOpportunities) * 1_000_000;
  }
  const estimatedSigmaLevel = convertDpmoToSigmaLevel(dpmo);

  // 8. Time Saved (Minutes to Hours)
  // Baseline throughput vs improved throughput per unit time
  let estimatedTimeSavedHoursPerUnit = 0;
  if (inputs.baselineThroughputPerHour > 0 && inputs.improvedThroughputPerHour > 0) {
    const baselineCycleHours = 1 / inputs.baselineThroughputPerHour;
    const improvedCycleHours = 1 / inputs.improvedThroughputPerHour;
    estimatedTimeSavedHoursPerUnit = Math.max(0, baselineCycleHours - improvedCycleHours);
  }
  const estimatedTotalTimeSavedHours = estimatedTimeSavedHoursPerUnit * inputs.totalUnitsProduced;

  // 9. Cost Savings & Financial ROI
  // Cost savings derived from scrap reduction and throughput uplift
  const estimatedHourlyOpCost = inputs.productiveOperatingTimeHours > 0
    ? inputs.totalOperatingCost / inputs.productiveOperatingTimeHours
    : 100;
  const directLaborTimeCostSavings = estimatedTotalTimeSavedHours * estimatedHourlyOpCost;
  // Assume a conservative 40% defect reduction target from Lean Six Sigma intervention
  const scrapSavings = estimatedScrapReworkCost * 0.40;
  const estimatedCostSavings = directLaborTimeCostSavings + scrapSavings;

  // 10. Estimated ROI (%) = (Net Benefit ÷ Investment Cost) × 100
  let estimatedRoiPct = 0;
  let estimatedPaybackPeriodMonths: number | null = null;
  if (inputs.investmentCost > 0) {
    const netBenefit = estimatedCostSavings - inputs.investmentCost;
    estimatedRoiPct = (netBenefit / inputs.investmentCost) * 100;

    // Monthly net benefit = estimated annual benefit / 12
    const monthlyBenefit = estimatedCostSavings / 12;
    if (monthlyBenefit > 0) {
      estimatedPaybackPeriodMonths = parseFloat((inputs.investmentCost / monthlyBenefit).toFixed(1));
    }
  }

  return {
    defectRatePct: parseFloat(defectRatePct.toFixed(2)),
    firstPassYieldPct: parseFloat(firstPassYieldPct.toFixed(2)),
    productionThroughputUnitsPerHour: parseFloat(productionThroughputUnitsPerHour.toFixed(1)),
    processCycleEfficiencyPct: parseFloat(processCycleEfficiencyPct.toFixed(2)),
    availabilityPct: parseFloat(availabilityPct.toFixed(2)),
    estimatedScrapReworkCost: Math.round(estimatedScrapReworkCost),
    dpmo: Math.round(dpmo),
    estimatedSigmaLevel,
    estimatedTimeSavedHoursPerUnit: parseFloat(estimatedTimeSavedHoursPerUnit.toFixed(4)),
    estimatedTotalTimeSavedHours: Math.round(estimatedTotalTimeSavedHours),
    estimatedCostSavings: Math.round(estimatedCostSavings),
    estimatedRoiPct: parseFloat(estimatedRoiPct.toFixed(1)),
    estimatedPaybackPeriodMonths,
    validationWarnings: warnings
  };
}
