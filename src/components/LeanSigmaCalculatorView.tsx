import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator,
  ArrowRight,
  RotateCcw,
  Download,
  Printer,
  Sparkles,
  Info,
  AlertTriangle,
  TrendingUp,
  Percent,
  Clock,
  DollarSign,
  ShieldAlert,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import {
  LeanSigmaInputs,
  DEFAULT_LEAN_SIGMA_INPUTS,
  calculateLeanSigmaMetrics
} from '../utils/leanSigmaEngine';
import { analytics } from '../services/analyticsService';

export const LeanSigmaCalculatorView: React.FC = () => {
  const [inputs, setInputs] = useState<LeanSigmaInputs>(DEFAULT_LEAN_SIGMA_INPUTS);
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);
  const mountTimeRef = useRef<number>(Date.now());

  // Track calculator tool use on mount and on unmount
  useEffect(() => {
    analytics.trackCalculatorUse();
    return () => {
      const duration = Math.round((Date.now() - mountTimeRef.current) / 1000);
      analytics.trackCalculatorUse(duration);
    };
  }, []);

  const results = calculateLeanSigmaMetrics(inputs);

  const handleInputChange = (field: keyof LeanSigmaInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: isNaN(value) ? 0 : Math.max(0, value)
    }));
  };

  const resetToDefaults = () => {
    setInputs(DEFAULT_LEAN_SIGMA_INPUTS);
  };

  const loadAutomotiveSample = () => {
    analytics.trackCtaClick('Load Automotive Sample', '/calculator');
    setInputs({
      totalUnitsProduced: 25000,
      defectiveUnits: 375,
      totalProductionTimeHours: 320,
      productiveOperatingTimeHours: 290,
      totalProcessCycleTimeMin: 38,
      totalLeadTimeHours: 36,
      totalOperatingCost: 480000,
      costPerDefect: 210,
      baselineThroughputPerHour: 78,
      improvedThroughputPerHour: 95,
      opportunitiesPerUnit: 6,
      investmentCost: 90000,
      valueAddedTimeMin: 28
    });
  };

  const handleExportCSV = () => {
    analytics.trackCtaClick('Export CSV Calculator', '/calculator');
    const csvContent = [
      ["Metric Name", "Calculated Value", "Unit / Basis"],
      ["Defect Rate", `${results.defectRatePct}%`, "Defective Units / Total Units"],
      ["First Pass Yield (FPY)", `${results.firstPassYieldPct}%`, "Non-reworked good units"],
      ["Production Throughput", `${results.productionThroughputUnitsPerHour}`, "Units per operating hour"],
      ["Process Cycle Efficiency (PCE)", `${results.processCycleEfficiencyPct}%`, "Value-Added Time / Total Lead Time"],
      ["Availability", `${results.availabilityPct}%`, "Operating Time / Planned Production Time"],
      ["Estimated Scrap & Rework Cost", `$${results.estimatedScrapReworkCost.toLocaleString()}`, "Defects * Cost per Defect"],
      ["Six Sigma DPMO", `${results.dpmo.toLocaleString()}`, "Defects per Million Opportunities"],
      ["Estimated Sigma Level", `${results.estimatedSigmaLevel} σ`, "Documented 1.5-sigma shift conversion"],
      ["Estimated Time Saved per Unit", `${results.estimatedTimeSavedHoursPerUnit} hrs`, "Baseline vs Proposed Throughput"],
      ["Estimated Total Time Saved", `${results.estimatedTotalTimeSavedHours} hrs`, "Over Total Production Volume"],
      ["Estimated Net Cost Savings", `$${results.estimatedCostSavings.toLocaleString()}`, "Direct scrap & cycle reduction"],
      ["Estimated ROI", `${results.estimatedRoiPct}%`, "Net Benefit / Investment Cost"],
      ["Estimated Payback Period", results.estimatedPaybackPeriodMonths ? `${results.estimatedPaybackPeriodMonths} Months` : "N/A", "Initial Investment / Periodic Net Benefit"]
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Lean_Sigma_Calculator_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    analytics.trackCtaClick('Print Calculator', '/calculator');
    window.print();
  };

  return (
    <div className="space-y-0 pb-16">
      
      {/* Tool Header Section */}
      <section className="vyntra-section bg-white border-b border-slate-200">
        <div className="vyntra-container">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="section-label">INTERACTIVE OPERATIONAL TOOL</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] section-heading-serif">
                Lean Sigma Analytical Calculator
              </h1>
              <p className="section-lead">
                Statistically validated computational model for Defect Rates, First Pass Yield (FPY), Process Cycle Efficiency (PCE), Six Sigma DPMO, Throughput uplift, and ROI payback. Usable without registration.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={loadAutomotiveSample}
                className="btn-secondary text-xs py-2.5 px-3.5 flex items-center gap-1.5"
                title="Load Automotive Manufacturing Sample Data"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Load Sample</span>
              </button>
              <button
                onClick={resetToDefaults}
                className="btn-secondary text-xs py-2.5 px-3.5 flex items-center gap-1.5"
                title="Reset all inputs to default values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="btn-secondary text-xs py-2.5 px-3.5 flex items-center gap-1.5"
                title="Export calculations as CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handlePrint}
                className="btn-secondary text-xs py-2.5 px-3.5 flex items-center gap-1.5"
                title="Print or save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Body Workspace */}
      <section className="vyntra-section vyntra-section-alt">
        <div className="vyntra-container space-y-8">
          
          {/* Validation warnings if any */}
          {results.validationWarnings.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold">Input Validation Warning:</p>
                <ul className="list-disc list-inside space-y-0.5 mt-1 text-xs">
                  {results.validationWarnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Inputs Workspace */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h2 className="text-lg font-bold text-[#0B1220] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Process Parameters & Assumptions</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">13 Inputs</span>
            </div>

            <div className="space-y-4">
              {/* Group 1: Production Volume & Defect Units */}
              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200/80 space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Volume & Quality Units</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Units Produced (N)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={inputs.totalUnitsProduced}
                    onChange={(e) => handleInputChange('totalUnitsProduced', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Defective Units (D)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={inputs.defectiveUnits}
                      onChange={(e) => handleInputChange('defectiveUnits', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Opportunities / Unit (O)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={inputs.opportunitiesPerUnit}
                      onChange={(e) => handleInputChange('opportunitiesPerUnit', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Production Time & Lead Time */}
              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200/80 space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Time, Flow & Efficiency</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Planned Time (Hrs)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={inputs.totalProductionTimeHours}
                      onChange={(e) => handleInputChange('totalProductionTimeHours', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Operating Time (Hrs)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={inputs.productiveOperatingTimeHours}
                      onChange={(e) => handleInputChange('productiveOperatingTimeHours', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Lead Time (Hours)
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      value={inputs.totalLeadTimeHours}
                      onChange={(e) => handleInputChange('totalLeadTimeHours', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Value-Added Time (Min)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={inputs.valueAddedTimeMin}
                      onChange={(e) => handleInputChange('valueAddedTimeMin', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Group 3: Financial & Throughput Assumptions */}
              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200/80 space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Costs & Throughput Uplift</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Cost per Defect ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={inputs.costPerDefect}
                      onChange={(e) => handleInputChange('costPerDefect', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Operating Cost ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={inputs.totalOperatingCost}
                      onChange={(e) => handleInputChange('totalOperatingCost', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Baseline Rate (Units/Hr)
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      value={inputs.baselineThroughputPerHour}
                      onChange={(e) => handleInputChange('baselineThroughputPerHour', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Rate (Units/Hr)
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      value={inputs.improvedThroughputPerHour}
                      onChange={(e) => handleInputChange('improvedThroughputPerHour', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Transformation Investment Cost ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={inputs.investmentCost}
                    onChange={(e) => handleInputChange('investmentCost', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Computed KPI Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Primary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            {/* Defect Rate */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Defect Rate</span>
                <Percent className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] font-mono">
                {results.defectRatePct}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Defects ÷ Total Units × 100
              </p>
            </div>

            {/* First Pass Yield */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>First Pass Yield</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                {results.firstPassYieldPct}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Units passing without rework
              </p>
            </div>

            {/* Six Sigma Level */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Six Sigma Level</span>
                <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-mono flex items-baseline gap-1">
                <span>{results.estimatedSigmaLevel}</span>
                <span className="text-sm font-sans font-medium text-slate-500">σ</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                DPMO: {results.dpmo.toLocaleString()}
              </p>
            </div>

            {/* Process Cycle Efficiency */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Process Cycle Eff. (PCE)</span>
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-700 font-mono">
                {results.processCycleEfficiencyPct}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                VA Time ÷ Lead Time × 100
              </p>
            </div>

            {/* Production Throughput */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Effective Throughput</span>
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] font-mono">
                {results.productionThroughputUnitsPerHour}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Good units / operating hr
              </p>
            </div>

            {/* Availability */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Availability</span>
                <Percent className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono">
                {results.availabilityPct}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Operating ÷ Planned Time
              </p>
            </div>

          </div>

          {/* Financial Value & ROI Impact Section */}
          <div className="bg-gradient-to-br from-[#0B1220] to-[#111C33] text-white p-6 rounded-xl border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-lg">Financial Value & Payback Quantification</h3>
              </div>
              <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                Transparent Assumptions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Estimated Scrap / Defect Cost</p>
                <p className="text-2xl font-bold font-mono text-red-400 mt-1">
                  ${results.estimatedScrapReworkCost.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {inputs.defectiveUnits} units @ ${inputs.costPerDefect}/defect
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Estimated Net Savings</p>
                <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  ${results.estimatedCostSavings.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Scrap reduction + {results.estimatedTotalTimeSavedHours} hrs labor freed
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Projected Transformation ROI</p>
                <p className="text-2xl font-bold font-mono text-cyan-300 mt-1">
                  {results.estimatedRoiPct}%
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Payback: {results.estimatedPaybackPeriodMonths ? `${results.estimatedPaybackPeriodMonths} Months` : "N/A"}
                </p>
              </div>

            </div>
          </div>

          {/* Detailed Interpretation and Improvement Directives */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0B1220] mb-3 flex items-center justify-between">
              <span>Operational Interpretation & Improvement Direction</span>
              <button
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                {showFormulaDetails ? "Hide Formulas" : "View Formulas"}
              </button>
            </h3>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-800">Process Quality:</strong> At <strong>{results.defectRatePct}% defect rate</strong>, the process operates at approximately <strong>{results.estimatedSigmaLevel} Sigma</strong> ({results.dpmo.toLocaleString()} DPMO). Standard industrial benchmarks target &ge; 4.0 Sigma for stable subassemblies and &ge; 6.0 Sigma for safety-critical components.
              </p>
              <p>
                <strong className="text-slate-800">Flow Efficiency:</strong> The current Process Cycle Efficiency is <strong>{results.processCycleEfficiencyPct}%</strong>. In unoptimized manufacturing lines, PCE is commonly below 10%, indicating that over 90% of total lead time is consumed by waiting, batch queueing, and staging buffers rather than direct transformation.
              </p>
              <p>
                <strong className="text-slate-800">Recommended Action:</strong> Combine Lean setup reduction (SMED) to shrink lot sizes with AI-driven inline defect classification. This simultaneously drives PCE toward 25%+ and cuts scrap costs by an estimated ${Math.round(results.estimatedScrapReworkCost * 0.4).toLocaleString()}.
              </p>
            </div>

            {showFormulaDetails && (
              <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono space-y-1.5 text-slate-700 bg-slate-50 p-4 rounded-lg">
                <p className="font-bold text-slate-900 mb-1">Mathematical Documentation:</p>
                <p>• Defect Rate = Defective Units ÷ Total Units × 100</p>
                <p>• First Pass Yield = (Total Units - Defective Units) ÷ Total Units × 100</p>
                <p>• Production Throughput = Good Units ÷ Elapsed Operating Hours</p>
                <p>• Process Cycle Efficiency (PCE) = Value-Added Time (min) ÷ Total Lead Time (min) × 100</p>
                <p>• Availability = Productive Operating Hours ÷ Planned Production Hours × 100</p>
                <p>• DPMO = Defects ÷ (Total Units × Opportunities per Unit) × 1,000,000</p>
                <p>• ROI = (Estimated Net Annual Benefit − Transformation Investment) ÷ Investment × 100</p>
                <p>• Payback Period = Transformation Investment ÷ Monthly Net Operational Benefit</p>
              </div>
            )}
          </div>

        </div>

          </div>
        </div>
      </section>

    </div>
  );
};
