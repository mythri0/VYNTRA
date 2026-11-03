import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Layers,
  TrendingUp,
  AlertOctagon,
  Clock,
  Package,
  Download,
  Info,
  Sliders,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import {
  SimulatorStation,
  SimulatorConfig,
  DEFAULT_SIM_STATIONS,
  DiscreteEventSimulator,
  SimulatorKPIs
} from '../utils/simulatorEngine';
import { analytics } from '../services/analyticsService';

export const ValueStreamSimulatorView: React.FC = () => {
  const [stations, setStations] = useState<SimulatorStation[]>(DEFAULT_SIM_STATIONS);
  const [config, setConfig] = useState<SimulatorConfig>({
    releaseRateSec: 15,
    simDurationSec: 3600,
    speedMultiplier: 2
  });

  const [isRunning, setIsRunning] = useState(false);
  const [activeScenario, setActiveScenario] = useState<'baseline' | 'reducedBottleneck' | 'conwip'>('baseline');

  // Ref to hold simulation engine instance
  const simRef = useRef<DiscreteEventSimulator>(new DiscreteEventSimulator(DEFAULT_SIM_STATIONS, {
    releaseRateSec: 15,
    simDurationSec: 3600,
    speedMultiplier: 2
  }));

  const [kpis, setKpis] = useState<SimulatorKPIs>(simRef.current.getKPIs());

  // Analytics: track simulator open/close with duration
  const mountTimeRef = useRef<number>(Date.now());
  useEffect(() => {
    analytics.trackSimulatorUse();
    return () => {
      const duration = Math.round((Date.now() - mountTimeRef.current) / 1000);
      analytics.trackSimulatorUse(duration);
    };
  }, []);

  // Animation / simulation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (isRunning) {
        const deltaMs = currentTime - lastTime;
        // Sim time elapsed: delta in seconds * speed multiplier
        const dtSec = (deltaMs / 1000) * config.speedMultiplier;

        if (dtSec > 0.05) {
          simRef.current.tick(dtSec);
          setStations([...simRef.current.stations]);
          setKpis(simRef.current.getKPIs());
          lastTime = currentTime;
        }
      } else {
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, config.speedMultiplier]);

  const handleStart = () => { analytics.trackCtaClick('Simulator Play', '/simulator'); setIsRunning(true); };
  const handlePause = () => { analytics.trackCtaClick('Simulator Pause', '/simulator'); setIsRunning(false); };

  const handleReset = () => {
    analytics.trackCtaClick('Simulator Reset', '/simulator');
    setIsRunning(false);
    simRef.current = new DiscreteEventSimulator(stations, config);
    setStations([...simRef.current.stations]);
    setKpis(simRef.current.getKPIs());
  };

  const handleScenarioChange = (scenario: 'baseline' | 'reducedBottleneck' | 'conwip') => {
    analytics.trackCtaClick('Simulator Scenario: ' + scenario, '/simulator');
    setIsRunning(false);
    setActiveScenario(scenario);

    let updatedStations = JSON.parse(JSON.stringify(DEFAULT_SIM_STATIONS));
    let updatedConfig = { ...config };

    if (scenario === 'reducedBottleneck') {
      // Station 2 is CNC (Bottleneck at 24s -> reduce to 15s)
      updatedStations[1].baseCycleTimeSec = 15;
      updatedStations[1].uptimePct = 96;
    } else if (scenario === 'conwip') {
      // Paced release rate aligned with bottleneck
      updatedConfig.releaseRateSec = 24;
      // Cap buffer sizes
      updatedStations = updatedStations.map((s: SimulatorStation) => ({
        ...s,
        bufferCapacity: 8
      }));
    }

    setStations(updatedStations);
    setConfig(updatedConfig);
    simRef.current = new DiscreteEventSimulator(updatedStations, updatedConfig);
    setKpis(simRef.current.getKPIs());
  };

  const handleExportCSV = () => {
    analytics.trackCtaClick('Export CSV Simulator', '/simulator');
    const csvContent = [
      ["Metric Name", "Observed Value", "Unit / Basis"],
      ["Elapsed Simulation Time", `${kpis.elapsedSimSeconds} s`, "Simulated time in line"],
      ["Total Completed Units", `${kpis.totalCompletedUnits}`, "Good units discharged"],
      ["Simulation Throughput", `${kpis.throughputPerHour} u/hr`, "Calculated run rate"],
      ["Total System WIP", `${kpis.totalSystemWip} units`, "In buffers & active stations"],
      ["Average Flow Time", `${kpis.averageFlowTimeSec} s`, "Little's Law observed average"],
      ["Primary Bottleneck Station", `"${kpis.bottleneckStationName}"`, "Highest utilization station"],
      ["Bottleneck Utilization", `${kpis.bottleneckUtilizationPct}%`, "Active processing time ratio"],
      ["System Starvation Rate", `${kpis.starvationPct}%`, "Station idle with empty buffer"],
      ["System Blocking Rate", `${kpis.blockingPct}%`, "Station finished but downstream buffer full"]
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `VSM_Discrete_Simulation_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-0 pb-16">
      
      {/* Tool Header Section */}
      <section className="vyntra-section bg-white border-b border-slate-200">
        <div className="vyntra-container space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="section-label">INTERACTIVE OPERATIONAL TOOL</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] section-heading-serif">
                Value Stream Discrete-Event Simulator
              </h1>
              <p className="section-lead">
                Dynamic physical flow simulation showing queue build-up, station starvation, downstream blocking, and stochastic cycle time variations across the manufacturing line.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="btn-secondary text-xs py-2.5 px-3.5 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Execution Body Section */}
      <section className="vyntra-section vyntra-section-alt">
        <div className="vyntra-container space-y-8">
          
          {/* Simulation Control Bar */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-6">
            
            {/* Controls: Start/Pause/Reset */}
            <div className="flex flex-wrap items-center gap-3">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-sm font-semibold"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Simulation</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2 bg-amber-600 hover:bg-amber-700 shadow-sm font-semibold"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-2 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Speed Multipliers */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 ml-1">
              {[1, 2, 5, 10].map(s => (
                <button
                  key={s}
                  onClick={() => setConfig({ ...config, speedMultiplier: s })}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                    config.speedMultiplier === s ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-500 uppercase font-mono tracking-wider">Scenario:</span>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
              <button
                onClick={() => handleScenarioChange('baseline')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeScenario === 'baseline' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Baseline Line
              </button>
              <button
                onClick={() => handleScenarioChange('reducedBottleneck')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeScenario === 'reducedBottleneck' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Debottleneck CNC
              </button>
              <button
                onClick={() => handleScenarioChange('conwip')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeScenario === 'conwip' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                CONWIP Pull Pace
              </button>
            </div>
          </div>

          {/* Elapsed Sim Clock */}
          <div className="font-mono text-xs text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 font-medium">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Sim Time: <strong className="text-slate-900">{kpis.elapsedSimSeconds}s</strong></span>
          </div>

        </div>

        {/* Live KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">Completed Output</p>
            <p className="text-2xl font-bold font-mono text-emerald-600">{kpis.totalCompletedUnits} u</p>
            <p className="text-[11px] text-slate-400">Total units finished</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">Throughput Rate</p>
            <p className="text-2xl font-bold font-mono text-[#0B1220]">{kpis.throughputPerHour} u/hr</p>
            <p className="text-[11px] text-slate-400">Hourly run rate</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">Total System WIP</p>
            <p className="text-2xl font-bold font-mono text-blue-600">{kpis.totalSystemWip} units</p>
            <p className="text-[11px] text-slate-400">Active + queue units</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">Active Bottleneck</p>
            <p className="text-sm font-bold text-red-600 truncate pt-1" title={kpis.bottleneckStationName}>
              {kpis.bottleneckStationName}
            </p>
            <p className="text-[11px] text-slate-400 font-mono">{kpis.bottleneckUtilizationPct}% utilization</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">Line Starvation</p>
            <p className="text-2xl font-bold font-mono text-amber-600">{kpis.starvationPct}%</p>
            <p className="text-[11px] text-slate-400">Idle with empty queue</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">Line Blocking</p>
            <p className="text-2xl font-bold font-mono text-purple-600">{kpis.blockingPct}%</p>
            <p className="text-[11px] text-slate-400">Downstream buffer full</p>
          </div>
        </div>

      {/* Visual Simulation Canvas */}
      <div className="bg-[#0B132B] p-8 rounded-3xl border border-slate-700/80 text-white mb-10 shadow-2xl">
        <div className="flex items-center justify-between pb-5 border-b border-slate-700/80 mb-8">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <h3 className="font-bold text-sm tracking-wider uppercase font-mono text-cyan-300">
              Live Production Flow Visualizer
            </h3>
          </div>
          <span className="text-xs text-cyan-300 font-mono bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
            Release Interval: Every {config.releaseRateSec}s
          </span>
        </div>

        {/* Station Lanes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stations.map((st, index) => {
            const isBottleneck = st.name === kpis.bottleneckStationName;
            const queueRatio = Math.min(100, (st.currentQueue / st.bufferCapacity) * 100);

            return (
              <div
                key={st.id}
                className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  isBottleneck
                    ? 'bg-slate-900 border-red-500 shadow-lg shadow-red-950/50 ring-1 ring-red-500/40'
                    : 'bg-slate-900/90 border-slate-700/80'
                }`}
              >
                <div>
                  {/* Station header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 font-medium">Station 0{index + 1}</span>
                    {isBottleneck ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white uppercase font-mono tracking-wider">
                        BOTTLENECK
                      </span>
                    ) : st.isBlocked ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white uppercase font-mono tracking-wider">
                        BLOCKED
                      </span>
                    ) : st.isStarved ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white uppercase font-mono tracking-wider">
                        STARVED
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase font-mono tracking-wider">
                        RUNNING
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-base text-white mb-4 h-12 leading-snug">
                    {st.name}
                  </h4>

                  {/* Queue accumulation visualizer */}
                  <div className="mb-4 bg-slate-950/90 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs mb-2 font-mono">
                      <span className="text-slate-400">Queue Buffer:</span>
                      <span className={st.currentQueue >= st.bufferCapacity ? 'text-red-400 font-bold' : 'text-cyan-300 font-bold'}>
                        {st.currentQueue} / {st.bufferCapacity} u
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          queueRatio > 80 ? 'bg-red-500' : queueRatio > 50 ? 'bg-amber-400' : 'bg-cyan-400'
                        }`}
                        style={{ width: `${queueRatio}%` }}
                      />
                    </div>
                  </div>

                  {/* Processing Unit Visual */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 mb-4 text-center">
                    <span className="text-[11px] text-slate-400 uppercase font-mono font-semibold block mb-1.5">Station State</span>
                    {st.inProgress ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-spin border-t border-cyan-200" />
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          Active ({Math.round(st.timeRemainingSec)}s left)
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono text-slate-400 italic">
                        {st.isBlocked ? 'Blocked by Downstream' : 'Waiting for Input'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Statistics Footer */}
                <div className="text-xs font-mono text-slate-300 space-y-1.5 pt-3 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cycle Time:</span>
                    <span className="text-white font-semibold">{st.baseCycleTimeSec}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Discharged:</span>
                    <span className="text-white font-semibold">{st.totalProcessedCount} u</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Availability:</span>
                    <span className="text-emerald-400 font-semibold">{st.uptimePct}%</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

        {/* Mathematical Modeling Transparency & Integrity Notice */}
        <div className="vyntra-card space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold">
              Mathematical Modeling Transparency &amp; Integrity Policy
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            This workspace executes a genuine discrete-event mathematical model running directly in browser memory. Every queue count, blocked duration, and starved interval is computed dynamically from your configured cycle times, buffer capacities, and release rates ($dt$ time steps).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2 text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Authentic Simulation Mechanics:</span>
              <p>Station blocking occurs only when downstream buffer capacity is mathematically reached. Starvation triggers only when upstream queues are completely exhausted.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Zero Fabricated Predictions:</span>
              <p>Simulated throughput is derived from actual discharged units ($Units \div Elapsed\ Time$), not arbitrary counters. Results represent scenario estimates and require plant baseline validation.</p>
            </div>
          </div>
        </div>

        </div>
      </section>

    </div>
  );
};
