/**
 * Discrete-Event Value Stream Simulator Engine
 * Models queue formation, stochastic variability, starvation, blocking, WIP accumulation, and throughput.
 */

export interface SimulatorStation {
  id: string;
  name: string;
  baseCycleTimeSec: number;
  variabilityPct: number; // e.g. 15% standard deviation
  bufferCapacity: number; // Max queue size before upstream is blocked
  uptimePct: number; // 0 - 100
  // Runtime state
  currentQueue: number;
  inProgress: boolean;
  timeRemainingSec: number;
  isBlocked: boolean;
  isStarved: boolean;
  totalProcessedCount: number;
  totalActiveTimeSec: number;
  totalBlockedTimeSec: number;
  totalStarvedTimeSec: number;
}

export interface SimulatorConfig {
  releaseRateSec: number; // new raw material release interval
  simDurationSec: number; // total target simulation seconds
  speedMultiplier: number; // 1x, 2x, 5x, 10x
}

export interface SimulatorKPIs {
  elapsedSimSeconds: number;
  totalCompletedUnits: number;
  throughputPerHour: number;
  totalSystemWip: number;
  averageFlowTimeSec: number;
  averageQueueTimeSec: number;
  bottleneckStationName: string;
  bottleneckUtilizationPct: number;
  starvationPct: number;
  blockingPct: number;
}

export const DEFAULT_SIM_STATIONS: SimulatorStation[] = [
  {
    id: "st-1",
    name: "Material Staging & Cut",
    baseCycleTimeSec: 12,
    variabilityPct: 10,
    bufferCapacity: 20,
    uptimePct: 98,
    currentQueue: 5,
    inProgress: false,
    timeRemainingSec: 0,
    isBlocked: false,
    isStarved: false,
    totalProcessedCount: 0,
    totalActiveTimeSec: 0,
    totalBlockedTimeSec: 0,
    totalStarvedTimeSec: 0
  },
  {
    id: "st-2",
    name: "CNC Precision Milling",
    baseCycleTimeSec: 24, // Limiting station (bottleneck)
    variabilityPct: 20,
    bufferCapacity: 15,
    uptimePct: 90,
    currentQueue: 8,
    inProgress: false,
    timeRemainingSec: 0,
    isBlocked: false,
    isStarved: false,
    totalProcessedCount: 0,
    totalActiveTimeSec: 0,
    totalBlockedTimeSec: 0,
    totalStarvedTimeSec: 0
  },
  {
    id: "st-3",
    name: "Precision Robotic Welding",
    baseCycleTimeSec: 16,
    variabilityPct: 15,
    bufferCapacity: 15,
    uptimePct: 95,
    currentQueue: 3,
    inProgress: false,
    timeRemainingSec: 0,
    isBlocked: false,
    isStarved: false,
    totalProcessedCount: 0,
    totalActiveTimeSec: 0,
    totalBlockedTimeSec: 0,
    totalStarvedTimeSec: 0
  },
  {
    id: "st-4",
    name: "Quality Gate & Packing",
    baseCycleTimeSec: 14,
    variabilityPct: 10,
    bufferCapacity: 25,
    uptimePct: 99,
    currentQueue: 2,
    inProgress: false,
    timeRemainingSec: 0,
    isBlocked: false,
    isStarved: false,
    totalProcessedCount: 0,
    totalActiveTimeSec: 0,
    totalBlockedTimeSec: 0,
    totalStarvedTimeSec: 0
  }
];

export class DiscreteEventSimulator {
  stations: SimulatorStation[];
  config: SimulatorConfig;
  elapsedSeconds: number;
  totalCompletedUnits: number;
  releaseTimer: number;

  constructor(stations: SimulatorStation[], config: SimulatorConfig) {
    this.stations = JSON.parse(JSON.stringify(stations));
    this.config = config;
    this.elapsedSeconds = 0;
    this.totalCompletedUnits = 0;
    this.releaseTimer = 0;
  }

  // Advance simulation by dt seconds
  tick(dtSec: number): void {
    this.elapsedSeconds += dtSec;
    this.releaseTimer += dtSec;

    // Release work to station 1 according to release interval
    if (this.releaseTimer >= this.config.releaseRateSec) {
      const unitsToRelease = Math.floor(this.releaseTimer / this.config.releaseRateSec);
      this.releaseTimer %= this.config.releaseRateSec;
      if (this.stations.length > 0) {
        this.stations[0].currentQueue += unitsToRelease;
      }
    }

    // Process each station from downstream to upstream to evaluate blocking correctly
    for (let i = this.stations.length - 1; i >= 0; i--) {
      const st = this.stations[i];
      const nextSt = i < this.stations.length - 1 ? this.stations[i + 1] : null;

      // Check if station is blocked by full downstream buffer
      const isDownstreamFull = nextSt ? nextSt.currentQueue >= nextSt.bufferCapacity : false;

      // If station has active unit in progress
      if (st.inProgress) {
        if (st.timeRemainingSec > dtSec) {
          st.timeRemainingSec -= dtSec;
          st.totalActiveTimeSec += dtSec;
          st.isBlocked = false;
          st.isStarved = false;
        } else {
          // Job is finishing
          if (isDownstreamFull) {
            // Cannot discharge unit, becomes blocked
            st.isBlocked = true;
            st.totalBlockedTimeSec += dtSec;
          } else {
            // Discharge unit
            st.inProgress = false;
            st.timeRemainingSec = 0;
            st.totalProcessedCount += 1;
            st.totalActiveTimeSec += dtSec;
            st.isBlocked = false;

            if (nextSt) {
              nextSt.currentQueue += 1;
            } else {
              // Final station, unit completes system
              this.totalCompletedUnits += 1;
            }
          }
        }
      }

      // If station is not in progress and has work in queue
      if (!st.inProgress && st.currentQueue > 0) {
        // Check machine uptime availability stochastic factor
        const isOperational = Math.random() * 100 <= st.uptimePct;

        if (isOperational) {
          st.currentQueue -= 1;
          st.inProgress = true;
          // Apply cycle time variability Gaussian-like perturbation
          const spread = (Math.random() - 0.5) * 2 * (st.variabilityPct / 100);
          const actualCycle = Math.max(1, st.baseCycleTimeSec * (1 + spread));
          st.timeRemainingSec = actualCycle;
          st.isStarved = false;
        } else {
          st.isStarved = true;
          st.totalStarvedTimeSec += dtSec;
        }
      } else if (!st.inProgress && st.currentQueue === 0) {
        st.isStarved = true;
        st.totalStarvedTimeSec += dtSec;
      }
    }
  }

  getKPIs(): SimulatorKPIs {
    let totalWip = 0;
    let maxUtilization = 0;
    let bottleneckName = "N/A";
    let sumActive = 0;
    let sumBlocked = 0;
    let sumStarved = 0;

    this.stations.forEach((st) => {
      totalWip += st.currentQueue + (st.inProgress ? 1 : 0);
      const active = st.totalActiveTimeSec;
      const totalTime = Math.max(1, this.elapsedSeconds);
      const util = (active / totalTime) * 100;

      sumActive += st.totalActiveTimeSec;
      sumBlocked += st.totalBlockedTimeSec;
      sumStarved += st.totalStarvedTimeSec;

      if (util > maxUtilization) {
        maxUtilization = util;
        bottleneckName = st.name;
      }
    });

    const elapsedHours = Math.max(0.001, this.elapsedSeconds / 3600);
    const throughputPerHour = this.totalCompletedUnits / elapsedHours;

    // Little's Law average flow time = WIP / Throughput(units/sec)
    const throughputPerSec = Math.max(0.0001, this.totalCompletedUnits / Math.max(1, this.elapsedSeconds));
    const averageFlowTimeSec = this.totalCompletedUnits > 0
      ? totalWip / throughputPerSec
      : 0;

    const totalTrackedTime = Math.max(1, sumActive + sumBlocked + sumStarved);

    return {
      elapsedSimSeconds: Math.round(this.elapsedSeconds),
      totalCompletedUnits: this.totalCompletedUnits,
      throughputPerHour: parseFloat(throughputPerHour.toFixed(1)),
      totalSystemWip: totalWip,
      averageFlowTimeSec: Math.round(averageFlowTimeSec),
      averageQueueTimeSec: Math.round(Math.max(0, averageFlowTimeSec - 50)),
      bottleneckStationName: bottleneckName,
      bottleneckUtilizationPct: parseFloat(Math.min(100, maxUtilization).toFixed(1)),
      starvationPct: parseFloat(((sumStarved / totalTrackedTime) * 100).toFixed(1)),
      blockingPct: parseFloat(((sumBlocked / totalTrackedTime) * 100).toFixed(1))
    };
  }
}
