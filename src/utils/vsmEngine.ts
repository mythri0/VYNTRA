/**
 * Value Stream Mapping Analytical Engine
 * Supports process steps, Little's Law, bottleneck detection, takt time, and 8-waste flagging.
 */

export interface VsmProcessStep {
  id: string;
  name: string;
  cycleTimeSec: number; // Process time per unit
  changeoverTimeMin: number;
  uptimeAvailabilityPct: number; // 0 - 100
  operatorsCount: number;
  waitingTimeMin: number; // Queue/Buffer wait time before this step
  wipInventoryUnits: number; // WIP buffer before this step
  defectRatePct: number; // scrap or rework %
  isValueAdded: boolean;
  notes?: string;
}

export interface VsmParameters {
  customerDemandUnitsPerDay: number;
  availableOperatingHoursPerDay: number; // Net available time
  shiftCount: number;
  batchSizeUnits: number;
}

export interface WasteFlag {
  stepId: string;
  stepName: string;
  wasteCategory: string; // DOWNTIME letter & name
  evidence: string;
  impact: string;
  suggestedImprovement: string;
  relevantKPI: string;
}

export interface VsmAnalysisResult {
  totalLeadTimeHours: number;
  totalLeadTimeMin: number;
  totalValueAddedTimeMin: number;
  totalNonValueAddedTimeMin: number;
  processCycleEfficiencyPct: number;
  taktTimeSec: number;
  systemThroughputUnitsPerHour: number;
  bottleneckStepId: string;
  bottleneckStepName: string;
  bottleneckCycleTimeSec: number;
  totalWipUnits: number;
  littlesLawEstimatedLeadTimeHours: number;
  wasteFlags: WasteFlag[];
}

export const DEFAULT_VSM_PARAMETERS: VsmParameters = {
  customerDemandUnitsPerDay: 480,
  availableOperatingHoursPerDay: 8, // 480 min
  shiftCount: 1,
  batchSizeUnits: 25
};

export const DEFAULT_VSM_STEPS: VsmProcessStep[] = [
  {
    id: "step-1",
    name: "Raw Material Ingestion & Laser Cut",
    cycleTimeSec: 42,
    changeoverTimeMin: 35,
    uptimeAvailabilityPct: 92,
    operatorsCount: 2,
    waitingTimeMin: 180, // waiting in raw stage
    wipInventoryUnits: 150,
    defectRatePct: 1.5,
    isValueAdded: true,
    notes: "High sheet changeover time"
  },
  {
    id: "step-2",
    name: "CNC Precision Machining & Milling",
    cycleTimeSec: 68, // Limiting step (bottleneck)
    changeoverTimeMin: 45,
    uptimeAvailabilityPct: 84,
    operatorsCount: 3,
    waitingTimeMin: 240,
    wipInventoryUnits: 210,
    defectRatePct: 2.8,
    isValueAdded: true,
    notes: "Primary capacity constraint"
  },
  {
    id: "step-3",
    name: "Manual Deburr & Clean Gate",
    cycleTimeSec: 30,
    changeoverTimeMin: 0,
    uptimeAvailabilityPct: 98,
    operatorsCount: 1,
    waitingTimeMin: 120,
    wipInventoryUnits: 90,
    defectRatePct: 0.8,
    isValueAdded: false, // necessary NVA
    notes: "Ergonomic repetitive strain risk"
  },
  {
    id: "step-4",
    name: "Automated Robotic Welding & Assembly",
    cycleTimeSec: 54,
    changeoverTimeMin: 15,
    uptimeAvailabilityPct: 94,
    operatorsCount: 2,
    waitingTimeMin: 150,
    wipInventoryUnits: 125,
    defectRatePct: 1.2,
    isValueAdded: true,
    notes: "Fixture repositioning delay"
  },
  {
    id: "step-5",
    name: "Surface Coating & Cure Oven",
    cycleTimeSec: 48,
    changeoverTimeMin: 20,
    uptimeAvailabilityPct: 96,
    operatorsCount: 1,
    waitingTimeMin: 90,
    wipInventoryUnits: 80,
    defectRatePct: 0.5,
    isValueAdded: true,
    notes: "Oven batching cadence"
  },
  {
    id: "step-6",
    name: "Quality Gate & Functional Test",
    cycleTimeSec: 36,
    changeoverTimeMin: 5,
    uptimeAvailabilityPct: 99,
    operatorsCount: 2,
    waitingTimeMin: 60,
    wipInventoryUnits: 45,
    defectRatePct: 3.2,
    isValueAdded: false, // Non-value added inspection
    notes: "High scrap detection point"
  }
];

export function analyzeValueStream(steps: VsmProcessStep[], params: VsmParameters): VsmAnalysisResult {
  // 1. Takt Time = Available Operating Seconds / Customer Demand Units
  const availableOperatingSec = params.availableOperatingHoursPerDay * 3600;
  const taktTimeSec = params.customerDemandUnitsPerDay > 0
    ? availableOperatingSec / params.customerDemandUnitsPerDay
    : 0;

  // 2. Times & WIP calculation
  let totalCycleTimeSec = 0;
  let totalValueAddedSec = 0;
  let totalNonValueAddedSec = 0;
  let totalWaitingMin = 0;
  let totalWipUnits = 0;

  let maxEffectiveCycleSec = 0;
  let bottleneckStepId = "";
  let bottleneckStepName = "";

  const wasteFlags: WasteFlag[] = [];

  steps.forEach((step) => {
    const cycleSec = Math.max(0, step.cycleTimeSec);
    totalCycleTimeSec += cycleSec;

    if (step.isValueAdded) {
      totalValueAddedSec += cycleSec;
    } else {
      totalNonValueAddedSec += cycleSec;
    }

    const waitMin = Math.max(0, step.waitingTimeMin);
    totalWaitingMin += waitMin;

    const wip = Math.max(0, step.wipInventoryUnits);
    totalWipUnits += wip;

    // Effective cycle time considers availability: effective = cycleTime / (uptime / 100)
    const uptimeRatio = Math.max(0.1, step.uptimeAvailabilityPct / 100);
    const effectiveCycle = cycleSec / uptimeRatio;

    if (effectiveCycle > maxEffectiveCycleSec) {
      maxEffectiveCycleSec = effectiveCycle;
      bottleneckStepId = step.id;
      bottleneckStepName = step.name;
    }

    // 8-Waste Detection Rules (DOWNTIME)
    // D - Defects
    if (step.defectRatePct > 2.0) {
      wasteFlags.push({
        stepId: step.id,
        stepName: step.name,
        wasteCategory: "Defects (D)",
        evidence: `Defect rate is ${step.defectRatePct}% (industry alert threshold >2.0%).`,
        impact: "Generates scrap, costly rework loops, and capacity cannibalization.",
        suggestedImprovement: "Implement Poka-Yoke error proofing and inline automated vision inspection.",
        relevantKPI: "First Pass Yield (FPY), DPMO"
      });
    }

    // W - Waiting
    if (step.waitingTimeMin > 120) {
      wasteFlags.push({
        stepId: step.id,
        stepName: step.name,
        wasteCategory: "Waiting (W)",
        evidence: `Waiting buffer time is ${step.waitingTimeMin} min before processing.`,
        impact: "Extends customer lead time and ties up working capital in queue buffers.",
        suggestedImprovement: "Balance upstream feed line and implement dynamic buffer pull signaling.",
        relevantKPI: "Queue-to-Touch Time Ratio, WIP Days"
      });
    }

    // I - Inventory
    if (step.wipInventoryUnits > 100) {
      wasteFlags.push({
        stepId: step.id,
        stepName: step.name,
        wasteCategory: "Inventory (I)",
        evidence: `Accumulated WIP is ${step.wipInventoryUnits} units prior to station.`,
        impact: "Risks material obsolescence, transit damage, and floor space congestion.",
        suggestedImprovement: "Establish strict CONWIP (Constant WIP) limits or electronic Kanban loops.",
        relevantKPI: "Days Inventory Outstanding, WIP Turn Rate"
      });
    }

    // E - Extra-Processing (e.g. non-value added step with significant cycle time)
    if (!step.isValueAdded && step.cycleTimeSec > 25) {
      wasteFlags.push({
        stepId: step.id,
        stepName: step.name,
        wasteCategory: "Extra-Processing (E)",
        evidence: `Step flagged as Non-Value-Added with long cycle time (${step.cycleTimeSec}s).`,
        impact: "Adds unnecessary labor cost and delays flow without customer value creation.",
        suggestedImprovement: "Evaluate automated verification or eliminate redundant processing via Value Engineering.",
        relevantKPI: "Non-Value Added Processing Time (NVAT)"
      });
    }

    // O - Overproduction (cycle time significantly faster than takt with high WIP)
    if (taktTimeSec > 0 && step.cycleTimeSec < taktTimeSec * 0.6 && step.wipInventoryUnits > 100) {
      wasteFlags.push({
        stepId: step.id,
        stepName: step.name,
        wasteCategory: "Overproduction (O)",
        evidence: `Processing ${Math.round(taktTimeSec - step.cycleTimeSec)}s faster than Takt while queueing excess WIP.`,
        impact: "Floods downstream buffers before downstream bottleneck is ready to receive.",
        suggestedImprovement: "Pace station to pull demand and reallocate operator capacity.",
        relevantKPI: "Overproduction Index, Heijunka Adherence"
      });
    }
  });

  // Total Lead Time = Waiting Time (converted to hours) + Processing Cycle Time
  const totalWaitHours = totalWaitingMin / 60;
  const totalCycleHours = totalCycleTimeSec / 3600;
  const totalLeadTimeHours = totalWaitHours + totalCycleHours;
  const totalLeadTimeMin = totalLeadTimeHours * 60;

  const totalValueAddedMin = totalValueAddedSec / 60;
  const totalNonValueAddedMin = (totalNonValueAddedSec / 60) + totalWaitingMin;

  // Process Cycle Efficiency (PCE) % = Value-Added Time ÷ Total Lead Time × 100
  let processCycleEfficiencyPct = 0;
  if (totalLeadTimeMin > 0) {
    processCycleEfficiencyPct = (totalValueAddedMin / totalLeadTimeMin) * 100;
  }

  // System throughput is dictated by the primary bottleneck:
  // Capacity = 3600 / Bottleneck Cycle Time
  const systemThroughputUnitsPerHour = maxEffectiveCycleSec > 0
    ? 3600 / maxEffectiveCycleSec
    : 0;

  // Little's Law: Lead Time = WIP ÷ Throughput
  let littlesLawEstimatedLeadTimeHours = 0;
  if (systemThroughputUnitsPerHour > 0) {
    littlesLawEstimatedLeadTimeHours = totalWipUnits / systemThroughputUnitsPerHour;
  }

  return {
    totalLeadTimeHours: parseFloat(totalLeadTimeHours.toFixed(2)),
    totalLeadTimeMin: Math.round(totalLeadTimeMin),
    totalValueAddedTimeMin: parseFloat(totalValueAddedMin.toFixed(1)),
    totalNonValueAddedTimeMin: parseFloat(totalNonValueAddedMin.toFixed(1)),
    processCycleEfficiencyPct: parseFloat(processCycleEfficiencyPct.toFixed(2)),
    taktTimeSec: parseFloat(taktTimeSec.toFixed(1)),
    systemThroughputUnitsPerHour: parseFloat(systemThroughputUnitsPerHour.toFixed(1)),
    bottleneckStepId,
    bottleneckStepName,
    bottleneckCycleTimeSec: Math.round(maxEffectiveCycleSec),
    totalWipUnits,
    littlesLawEstimatedLeadTimeHours: parseFloat(littlesLawEstimatedLeadTimeHours.toFixed(2)),
    wasteFlags
  };
}
