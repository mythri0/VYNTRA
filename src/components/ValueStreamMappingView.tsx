import React, { useState, useEffect, useRef } from 'react';
import {
  Workflow,
  Plus,
  Trash2,
  ArrowRight,
  Download,
  RotateCcw,
  AlertTriangle,
  Flame,
  CheckCircle,
  HelpCircle,
  Layers,
  Sparkles,
  BarChart,
  Clock,
  Package,
  Activity
} from 'lucide-react';
import {
  VsmProcessStep,
  VsmParameters,
  DEFAULT_VSM_STEPS,
  DEFAULT_VSM_PARAMETERS,
  analyzeValueStream
} from '../utils/vsmEngine';
import { analytics } from '../services/analyticsService';

export const ValueStreamMappingView: React.FC = () => {
  const [steps, setSteps] = useState<VsmProcessStep[]>(DEFAULT_VSM_STEPS);
  const [params, setParams] = useState<VsmParameters>(DEFAULT_VSM_PARAMETERS);
  const [activeTab, setActiveTab] = useState<'map' | 'waste' | 'futureState'>('map');
  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    analytics.trackVsmUse();
    return () => {
      const duration = Math.round((Date.now() - mountTimeRef.current) / 1000);
      analytics.trackVsmUse(duration);
    };
  }, []);

  // Future state hypothetical adjustments
  const [futureStateImprovementPct, setFutureStateImprovementPct] = useState(30);

  const currentAnalysis = analyzeValueStream(steps, params);

  // Computed future state steps
  const futureSteps: VsmProcessStep[] = steps.map(s => {
    const isBottleneck = s.id === currentAnalysis.bottleneckStepId;
    return {
      ...s,
      cycleTimeSec: isBottleneck ? Math.round(s.cycleTimeSec * (1 - futureStateImprovementPct / 100)) : s.cycleTimeSec,
      waitingTimeMin: Math.round(s.waitingTimeMin * (1 - (futureStateImprovementPct * 1.2) / 100)),
      wipInventoryUnits: Math.round(s.wipInventoryUnits * (1 - (futureStateImprovementPct * 1.2) / 100)),
      defectRatePct: parseFloat((s.defectRatePct * 0.5).toFixed(1))
    };
  });
  const futureAnalysis = analyzeValueStream(futureSteps, params);

  const handleStepChange = (id: string, field: keyof VsmProcessStep, value: any) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleAddStep = () => {
    const newId = `step-${Date.now()}`;
    const newStep: VsmProcessStep = {
      id: newId,
      name: `New Process Step ${steps.length + 1}`,
      cycleTimeSec: 40,
      changeoverTimeMin: 15,
      uptimeAvailabilityPct: 95,
      operatorsCount: 1,
      waitingTimeMin: 60,
      wipInventoryUnits: 50,
      defectRatePct: 1.0,
      isValueAdded: true
    };
    setSteps([...steps, newStep]);
  };

  const handleDeleteStep = (id: string) => {
    if (steps.length <= 1) return;
    setSteps(steps.filter(s => s.id !== id));
  };

  const handleReset = () => {
    setSteps(DEFAULT_VSM_STEPS);
    setParams(DEFAULT_VSM_PARAMETERS);
  };

  const handleExportCSV = () => {
    analytics.trackCtaClick('Export CSV VSM', '/vsm');
    const headers = ["Step ID", "Step Name", "Cycle Time (s)", "Wait Time (min)", "WIP Units", "Uptime %", "Defect %", "Value Added"];
    const rows = steps.map(s => [
      s.id,
      `"${s.name}"`,
      s.cycleTimeSec,
      s.waitingTimeMin,
      s.wipInventoryUnits,
      s.uptimeAvailabilityPct,
      s.defectRatePct,
      s.isValueAdded ? "Yes" : "No"
    ].join(","));

    const summary = [
      "",
      "--- VSM ANALYTICAL SUMMARY ---",
      `Total Lead Time Hours,${currentAnalysis.totalLeadTimeHours}`,
      `Total Value Added Min,${currentAnalysis.totalValueAddedTimeMin}`,
      `Process Cycle Efficiency (PCE),${currentAnalysis.processCycleEfficiencyPct}%`,
      `Takt Time Sec,${currentAnalysis.taktTimeSec}`,
      `Bottleneck Step,"${currentAnalysis.bottleneckStepName}"`,
      `System Throughput Units/Hr,${currentAnalysis.systemThroughputUnitsPerHour}`,
      `Little's Law Lead Time Hours,${currentAnalysis.littlesLawEstimatedLeadTimeHours}`
    ].join("\n");

    const blob = new Blob([[headers.join(","), ...rows, summary].join("\n")], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Value_Stream_Mapping_Analysis_${new Date().toISOString().slice(0, 10)}.csv`;
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
                Value Stream Mapping &amp; 8-Waste Analytics
              </h1>
              <p className="section-lead">
                Interactive process flow canvas connecting Supplier, Workcells, Buffers, and Customer Demand. Identifies constraints via Little's Law, computes Takt time, flags DOWNTIME waste, and projects future-state gains.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="btn-secondary text-xs py-2.5 px-3.5 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="btn-secondary text-xs py-2.5 px-3.5 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Primary KPI Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Total Lead Time</p>
              <p className="text-xl font-bold font-mono text-[#0B1220]">{currentAnalysis.totalLeadTimeHours} hrs</p>
              <p className="text-[11px] text-slate-400">Sum of wait + cycle</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Process Cycle Eff.</p>
              <p className="text-xl font-bold font-mono text-cyan-600">{currentAnalysis.processCycleEfficiencyPct}%</p>
              <p className="text-[11px] text-slate-400">VA time / Lead time</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Takt Time</p>
              <p className="text-xl font-bold font-mono text-blue-600">{currentAnalysis.taktTimeSec} s</p>
              <p className="text-[11px] text-slate-400">Paced customer demand</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Bottleneck</p>
              <p className="text-base font-bold font-mono text-red-600 truncate" title={currentAnalysis.bottleneckStepName}>
                {currentAnalysis.bottleneckStepName}
              </p>
              <p className="text-[11px] text-slate-400">Pace-limiting station</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Max Throughput</p>
              <p className="text-xl font-bold font-mono text-emerald-600">{currentAnalysis.systemThroughputUnitsPerHour} u/hr</p>
              <p className="text-[11px] text-slate-400">Bottleneck capacity</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Little's Law Lead</p>
              <p className="text-xl font-bold font-mono text-indigo-600">{currentAnalysis.littlesLawEstimatedLeadTimeHours} hrs</p>
              <p className="text-[11px] text-slate-400">WIP ÷ Throughput</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Canvas & Analytics Section */}
      <section className="vyntra-section vyntra-section-alt">
        <div className="vyntra-container space-y-8">
          
          {/* View Tabs */}
          <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('map')}
            className={`pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'map'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>Value Stream Map Visualizer</span>
          </button>

          <button
            onClick={() => setActiveTab('waste')}
            className={`pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'waste'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>8-Waste DOWNTIME Flags ({currentAnalysis.wasteFlags.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('futureState')}
            className={`pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'futureState'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Future-State Scenario Comparison</span>
          </button>
        </div>

      {/* TAB 1: VISUAL VALUE STREAM MAP */}
      {activeTab === 'map' && (
        <div className="space-y-8">
          
          {/* Visual Process Flow Canvas */}
          <div className="bg-[#0B1220] p-6 rounded-xl border border-slate-800 text-white overflow-x-auto">
            <div className="min-w-[850px]">
              
              {/* Flow header: Supplier & Customer */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 mb-6">
                <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2.5 rounded-lg border border-slate-700">
                  <Package className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono">Input Source</span>
                    <p className="text-sm font-bold text-white">Tier-1 Suppliers (Raw Mat.)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <span className="animate-pulse">●</span>
                  <span>MATERIAL & INFORMATION FLOW</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2.5 rounded-lg border border-slate-700">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono">Customer Destination</span>
                    <p className="text-sm font-bold text-white">Demand: {params.customerDemandUnitsPerDay} Units/Day</p>
                  </div>
                </div>
              </div>

              {/* Steps Flow Chain */}
              <div className="flex items-stretch gap-4 pb-4">
                {steps.map((step, index) => {
                  const isBottleneck = step.id === currentAnalysis.bottleneckStepId;
                  return (
                    <React.Fragment key={step.id}>
                      {/* Workcell Card */}
                      <div className={`flex-1 min-w-[190px] rounded-lg p-3.5 transition-all flex flex-col justify-between ${
                        isBottleneck
                          ? 'bg-red-950/40 border-2 border-red-500/80 shadow-lg shadow-red-900/20'
                          : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
                      }`}>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              Step {index + 1}
                            </span>
                            {isBottleneck && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                <span>BOTTLENECK</span>
                              </span>
                            )}
                          </div>

                          <h4 className="text-xs font-bold text-white mb-2 line-clamp-2 h-8">
                            {step.name}
                          </h4>

                          <div className="space-y-1 text-[11px] text-slate-300 font-mono bg-slate-950/60 p-2 rounded border border-slate-800/80">
                            <div className="flex justify-between">
                              <span className="text-slate-500">C/T:</span>
                              <span className="font-semibold text-cyan-300">{step.cycleTimeSec}s</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Wait:</span>
                              <span>{step.waitingTimeMin}m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">WIP:</span>
                              <span>{step.wipInventoryUnits}u</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Uptime:</span>
                              <span>{step.uptimeAvailabilityPct}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Defects:</span>
                              <span className={step.defectRatePct > 2 ? 'text-amber-400 font-bold' : ''}>{step.defectRatePct}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] flex items-center justify-between">
                          <span className={step.isValueAdded ? 'text-emerald-400' : 'text-slate-400'}>
                            {step.isValueAdded ? "Value-Added" : "Non-Value Added"}
                          </span>
                          <span className="text-slate-500">{step.operatorsCount} Op</span>
                        </div>

                      </div>

                      {/* Buffer Connector Arrow */}
                      {index < steps.length - 1 && (
                        <div className="flex flex-col items-center justify-center px-1 text-slate-600">
                          <ArrowRight className="w-4 h-4 text-cyan-500/70" />
                          <span className="text-[9px] font-mono text-slate-500 mt-1">
                            {steps[index + 1].waitingTimeMin}m
                          </span>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Sawtooth Lead Time Ladder Diagram */}
              <div className="mt-8 pt-4 border-t border-slate-800 font-mono text-xs">
                <p className="text-xs text-slate-400 font-sans font-semibold mb-2">Lead Time Ladder (Waiting vs Value-Added):</p>
                <div className="grid grid-cols-6 gap-2">
                  {steps.map(s => (
                    <div key={s.id} className="text-center p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-amber-400">Wait: {s.waitingTimeMin}m</div>
                      <div className="h-0.5 bg-slate-700 my-1"></div>
                      <div className="text-[10px] text-cyan-400 font-bold">VA: {s.isValueAdded ? `${s.cycleTimeSec}s` : '0s'}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Steps Data Editor Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0B1220]">
                Process Step Data Editor
              </h3>
              <button
                onClick={handleAddStep}
                className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Process Step</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Step Name</th>
                    <th className="py-2.5 px-3">Cycle Time (s)</th>
                    <th className="py-2.5 px-3">Wait Time (m)</th>
                    <th className="py-2.5 px-3">WIP (Units)</th>
                    <th className="py-2.5 px-3">Uptime (%)</th>
                    <th className="py-2.5 px-3">Defects (%)</th>
                    <th className="py-2.5 px-3">Classification</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {steps.map(step => (
                    <tr key={step.id} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 font-sans">
                        <input
                          type="text"
                          value={step.name}
                          onChange={(e) => handleStepChange(step.id, 'name', e.target.value)}
                          className="px-2 py-1 text-xs border border-slate-300 rounded w-full font-medium"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          min="1"
                          value={step.cycleTimeSec}
                          onChange={(e) => handleStepChange(step.id, 'cycleTimeSec', parseFloat(e.target.value))}
                          className="px-2 py-1 text-xs border border-slate-300 rounded w-16"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          min="0"
                          value={step.waitingTimeMin}
                          onChange={(e) => handleStepChange(step.id, 'waitingTimeMin', parseFloat(e.target.value))}
                          className="px-2 py-1 text-xs border border-slate-300 rounded w-16"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          min="0"
                          value={step.wipInventoryUnits}
                          onChange={(e) => handleStepChange(step.id, 'wipInventoryUnits', parseFloat(e.target.value))}
                          className="px-2 py-1 text-xs border border-slate-300 rounded w-16"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={step.uptimeAvailabilityPct}
                          onChange={(e) => handleStepChange(step.id, 'uptimeAvailabilityPct', parseFloat(e.target.value))}
                          className="px-2 py-1 text-xs border border-slate-300 rounded w-16"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={step.defectRatePct}
                          onChange={(e) => handleStepChange(step.id, 'defectRatePct', parseFloat(e.target.value))}
                          className="px-2 py-1 text-xs border border-slate-300 rounded w-16"
                        />
                      </td>
                      <td className="py-2 px-3 font-sans">
                        <select
                          value={step.isValueAdded ? "true" : "false"}
                          onChange={(e) => handleStepChange(step.id, 'isValueAdded', e.target.value === "true")}
                          className="px-2 py-1 text-xs border border-slate-300 rounded font-medium"
                        >
                          <option value="true">Value-Added</option>
                          <option value="false">Non-Value Added</option>
                        </select>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => handleDeleteStep(step.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded"
                          title="Delete step"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: 8-WASTE FLAGS */}
      {activeTab === 'waste' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#0B1220] mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>DOWNTIME Waste Detection Alerts</span>
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Automated heuristics mapped directly from current cycle times, buffer delays, and scrap rates against Lean Six Sigma industrial tolerances.
            </p>

            {currentAnalysis.wasteFlags.length === 0 ? (
              <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold">No critical waste anomalies flagged.</p>
                <p className="text-xs">Process operates within normal baseline tolerances.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentAnalysis.wasteFlags.map((flag, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>{flag.wasteCategory}</span>
                      </span>
                      <span className="text-xs font-mono font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {flag.stepName}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700">
                      <strong>Observed Evidence:</strong> {flag.evidence}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Operational Impact:</strong> {flag.impact}
                    </p>
                    <div className="pt-2 border-t border-amber-200 text-xs text-slate-800 flex items-center justify-between">
                      <span><strong>Fix:</strong> {flag.suggestedImprovement}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: FUTURE STATE COMPARISON */}
      {activeTab === 'futureState' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#0B1220]">
                  Future-State Transformation Modeler
                </h3>
                <p className="text-sm text-slate-600">
                  Simulate targeted bottleneck debottlenecking, SMED setup reduction, and queue buffer compression.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">Improvement Target:</span>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={futureStateImprovementPct}
                  onChange={(e) => setFutureStateImprovementPct(parseInt(e.target.value))}
                  className="w-32 cursor-pointer"
                />
                <span className="font-mono text-sm font-bold text-blue-600">{futureStateImprovementPct}%</span>
              </div>
            </div>

            {/* Before and After Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Metric / Dimension</th>
                    <th className="py-3 px-4 text-slate-700">Current State</th>
                    <th className="py-3 px-4 text-emerald-600">Proposed Future State</th>
                    <th className="py-3 px-4 text-right">Variance / Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs">
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-800">Total Lead Time (Hours)</td>
                    <td className="py-3 px-4">{currentAnalysis.totalLeadTimeHours} hrs</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">{futureAnalysis.totalLeadTimeHours} hrs</td>
                    <td className="py-3 px-4 text-right text-emerald-600 font-bold">
                      -{(currentAnalysis.totalLeadTimeHours - futureAnalysis.totalLeadTimeHours).toFixed(1)} hrs
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-800">Process Cycle Efficiency (PCE)</td>
                    <td className="py-3 px-4">{currentAnalysis.processCycleEfficiencyPct}%</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">{futureAnalysis.processCycleEfficiencyPct}%</td>
                    <td className="py-3 px-4 text-right text-emerald-600 font-bold">
                      +{(futureAnalysis.processCycleEfficiencyPct - currentAnalysis.processCycleEfficiencyPct).toFixed(1)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-800">System Throughput (Units/Hr)</td>
                    <td className="py-3 px-4">{currentAnalysis.systemThroughputUnitsPerHour}</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">{futureAnalysis.systemThroughputUnitsPerHour}</td>
                    <td className="py-3 px-4 text-right text-emerald-600 font-bold">
                      +{(futureAnalysis.systemThroughputUnitsPerHour - currentAnalysis.systemThroughputUnitsPerHour).toFixed(1)} u/hr
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-800">Work in Progress (WIP Units)</td>
                    <td className="py-3 px-4">{currentAnalysis.totalWipUnits} units</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">{futureAnalysis.totalWipUnits} units</td>
                    <td className="py-3 px-4 text-right text-emerald-600 font-bold">
                      -{currentAnalysis.totalWipUnits - futureAnalysis.totalWipUnits} units
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
              <strong>Transformation Summary:</strong> By addressing the primary bottleneck (<strong>{currentAnalysis.bottleneckStepName}</strong>) and pulling WIP levels tighter, overall flow time shrinks from <strong>{currentAnalysis.totalLeadTimeHours}h</strong> to <strong>{futureAnalysis.totalLeadTimeHours}h</strong>, driving a significant PCE boost without capital-intensive line expansions.
            </div>

          </div>
        </div>
      )}

        </div>
      </section>

    </div>
  );
};
