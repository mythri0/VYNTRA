import React, { useState } from 'react';
import {
  BUSINESS_OUTCOMES,
  VALUE_CREATION_CYCLE_STAGES,
  BusinessOutcome
} from '../data/outcomeData';
import {
  TrendingUp,
  ArrowRight,
  Calculator,
  Workflow,
  Activity,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Sliders
} from 'lucide-react';

interface OutcomeKpiWorkspaceProps {
  navigate: (route: string) => void;
  onSelectOutcome?: (outcomeId: string) => void;
}

export const OutcomeKpiWorkspace: React.FC<OutcomeKpiWorkspaceProps> = ({ navigate }) => {
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<string>("productivity-throughput");
  const [selectedKPIIndex, setSelectedKPIIndex] = useState<number>(0);

  // User input workspace values for active KPI
  const [baselineValue, setBaselineValue] = useState<number>(52.5);
  const [targetValue, setTargetValue] = useState<number>(75.0);
  const [annualVolume, setAnnualVolume] = useState<number>(120000);
  const [unitCost, setUnitCost] = useState<number>(45);
  const [investmentCost, setInvestmentCost] = useState<number>(65000);

  const activeOutcome = BUSINESS_OUTCOMES.find(o => o.id === selectedOutcomeId) || BUSINESS_OUTCOMES[0];
  const activeKPI = activeOutcome.kpis[selectedKPIIndex] || activeOutcome.kpis[0];

  // Mathematical Delta calculations
  const absoluteDelta = targetValue - baselineValue;
  const percentageDelta = baselineValue > 0 ? (absoluteDelta / baselineValue) * 100 : 0;

  // Financial Estimation model
  // If throughput/quality improves by X%, estimate annual direct savings
  const annualCapacityUpliftUnits = Math.round((annualVolume * Math.abs(percentageDelta)) / 100);
  const estimatedGrossAnnualBenefit = Math.round((annualCapacityUpliftUnits * unitCost) * 0.15); // conservative 15% margin
  const estimatedNetBenefit = estimatedGrossAnnualBenefit - investmentCost;
  const estimatedROI = investmentCost > 0 ? (estimatedNetBenefit / investmentCost) * 100 : 0;
  const paybackMonths = estimatedGrossAnnualBenefit > 0
    ? parseFloat(((investmentCost / (estimatedGrossAnnualBenefit / 12))).toFixed(1))
    : null;

  const handleOutcomeChange = (id: string) => {
    setSelectedOutcomeId(id);
    setSelectedKPIIndex(0);
    // Set sensible default baseline/targets based on outcome
    if (id === 'cost-reduction') {
      setBaselineValue(48.5);
      setTargetValue(41.0);
    } else if (id === 'quality-defect-reduction') {
      setBaselineValue(4.2);
      setTargetValue(0.8);
    } else if (id === 'cycle-time-lead-time') {
      setBaselineValue(18.5);
      setTargetValue(7.2);
    } else if (id === 'working-capital-inventory') {
      setBaselineValue(450);
      setTargetValue(220);
    } else {
      setBaselineValue(52.5);
      setTargetValue(75.0);
    }
  };

  return (
    <div className="space-y-12">
      
      {/* Workspace Header & Intro */}
      <div className="border-b border-slate-200 pb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono border border-blue-100">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Operational Decision Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] section-heading-serif">
            Business Outcome &amp; KPI Definition Workspace
          </h2>
          <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
            Select an operational outcome, inspect validated mathematical formulations, model baseline-to-target variances, and seamlessly transition into digital simulation sandboxes.
          </p>
        </div>

        {/* Six-Stage Lifecycle connection badge */}
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm">
          <span className="text-cyan-400 font-bold">Lifecycle Stage:</span>
          <span className="text-slate-300">S0 Frame → S1 Baseline → S2 Model</span>
        </div>
      </div>

      {/* STEP 1: Select the Business Outcome */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
              Step 01
            </span>
            <h3 className="text-lg font-bold text-[#0F172A]">
              Select Target Business Outcome (8 Core Domains)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">Click any card to load metrics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_OUTCOMES.map((out) => {
            const isSelected = out.id === selectedOutcomeId;
            return (
              <button
                key={out.id}
                type="button"
                onClick={() => handleOutcomeChange(out.id)}
                aria-pressed={isSelected}
                className={`outcome-card-item min-h-[300px] group ${
                  isSelected ? 'is-selected' : ''
                }`}
              >
                {/* Top & Middle Content Stack */}
                <div className="flex flex-col space-y-4 w-full">
                  
                  {/* Row 1: Category Label & KPI count on same top baseline */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100/90 w-full">
                    <span className={`card-category-label px-2.5 py-1 rounded-md transition-colors ${
                      isSelected
                        ? 'bg-blue-900/80 text-blue-200 border border-blue-400/30'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {out.category}
                    </span>
                    <span className={`card-kpi-count font-medium ${
                      isSelected ? 'text-blue-200' : 'text-slate-500'
                    }`}>
                      {out.kpis.length} measurable KPIs
                    </span>
                  </div>

                  {/* Row 2: Card Title */}
                  <h4 className="card-title-heading text-left">
                    {out.title}
                  </h4>

                  {/* Row 3: Card Description */}
                  <p className="card-desc-text text-left">
                    {out.shortDesc}
                  </p>
                </div>

                {/* Flexible spacer to push metric footer neatly to bottom */}
                <div className="flex-1 min-h-[16px]" />

                {/* Bottom: Separated Primary KPI section with consistent padding & borders */}
                <div className="w-full pt-4 mt-4 border-t border-slate-100/90 space-y-3">
                  <div className={`p-3.5 rounded-xl border transition-colors card-kpi-box ${
                    isSelected
                      ? 'bg-blue-900/60 border-blue-400/30'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}>
                    <div className="space-y-1">
                      <span className={`card-kpi-label block ${
                        isSelected ? 'text-blue-300' : 'text-slate-500'
                      }`}>
                        Primary Metric:
                      </span>
                      <p className={`card-kpi-desc leading-snug ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}>
                        {out.primaryKPI}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className={`font-semibold card-action-text ${
                      isSelected ? 'text-blue-200' : 'text-blue-600 group-hover:text-blue-700'
                    }`}>
                      {isSelected ? '● Active Target Selected' : 'Select to Configure'}
                    </span>
                    <span className={`text-[11px] font-mono ${
                      isSelected ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      {isSelected ? 'Step 2 Ready →' : 'Click to Load'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Choose the KPI */}
      <div className="space-y-5 pt-8 border-t border-slate-200">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Step 02
          </span>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Choose Mathematical KPI for <span className="text-blue-600">{activeOutcome.title}</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Select a formulation to load its statistical definition, required inputs, and baseline calculator.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {activeOutcome.kpis.map((kpi, idx) => (
            <button
              key={kpi.name}
              onClick={() => setSelectedKPIIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                selectedKPIIndex === idx
                  ? 'bg-[#0F172A] text-white border border-slate-800 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedKPIIndex === idx ? 'bg-cyan-400' : 'bg-slate-300'}`} />
              <span className="font-sans">{kpi.name}</span>
              <span className="font-mono text-xs opacity-80">({kpi.unit})</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 3: Define Baseline & Target (Balanced 2-Column Desktop Grid) */}
      <div className="space-y-6 pt-8 border-t border-slate-200">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Step 03
          </span>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Define Baseline &amp; Model Target Improvement
          </h3>
          <p className="text-sm text-slate-500 mt-1">Evaluate the mathematical performance gap and compute direct annual financial uplift.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (50%): KPI Definition, Formula, Inputs & Limitations */}
          <div className="lg:col-span-6 vyntra-card space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-blue-600">Metric Specification</span>
                <h4 className="text-base font-bold text-[#0F172A]">{activeKPI.name}</h4>
              </div>
              <span className="text-xs font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-md border border-blue-100 font-semibold">
                Unit: {activeKPI.unit}
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">Operational Definition</span>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">{activeKPI.definition}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono space-y-1">
              <span className="text-[11px] text-blue-700 font-bold block uppercase tracking-wider">Governed Mathematical Formula:</span>
              <p className="text-slate-900 font-bold text-sm">{activeKPI.formula}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">Required Baseline Data Inputs (S1)</span>
              <div className="flex flex-wrap gap-2">
                {activeKPI.requiredInputs.map((inp, iIdx) => (
                  <span key={iIdx} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono text-slate-700">
                    {inp}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-slate-500 text-xs">
              <span className="font-semibold text-slate-700">Mathematical Limitation:</span> {activeKPI.limitations}
            </div>
          </div>

          {/* Right Column (50%): Dynamic Inputs & Performance Shift Canvas */}
          <div className="lg:col-span-6 vyntra-dark-panel space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">Dynamic Gap Simulation</span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {activeKPI.name} Value Projection
                </h4>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded font-mono border border-slate-700">
                Audited Calculation
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-600/80 shadow-inner">
                <label className="block text-xs font-mono text-slate-200 mb-2 font-bold tracking-wide">
                  Measured S1 Baseline ({activeKPI.unit})
                </label>
                <input
                  type="number"
                  value={baselineValue}
                  onChange={(e) => setBaselineValue(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border-2 border-slate-600 rounded-lg px-3.5 py-2.5 text-xl font-bold font-mono text-white focus:outline-none focus:border-cyan-400 focus:bg-black transition-colors"
                />
                <span className="text-[11px] text-slate-400 mt-1.5 block font-mono">Plant baseline reference</span>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-xl border border-cyan-800/60 shadow-inner">
                <label className="block text-xs font-mono text-cyan-300 mb-2 font-bold tracking-wide">
                  Target S2 Improvement ({activeKPI.unit})
                </label>
                <input
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border-2 border-cyan-700/80 rounded-lg px-3.5 py-2.5 text-xl font-bold font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 focus:bg-black transition-colors"
                />
                <span className="text-[11px] text-cyan-400/80 mt-1.5 block font-mono">Discrete model target</span>
              </div>
            </div>

            {/* Calculated Performance Shifts */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-700/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Absolute Shift</span>
                <span className="text-xl font-bold text-white block">
                  {absoluteDelta > 0 ? `+${absoluteDelta.toFixed(1)}` : absoluteDelta.toFixed(1)} {activeKPI.unit}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Relative Shift</span>
                <span className={`text-xl font-bold block ${percentageDelta >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {percentageDelta > 0 ? `+${percentageDelta.toFixed(1)}%` : `${percentageDelta.toFixed(1)}%`}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Gross Benefit</span>
                <span className="text-xl font-bold text-cyan-400 block">
                  ${estimatedGrossAnnualBenefit.toLocaleString()}
                </span>
              </div>
            </div>

            {paybackMonths && (
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1">
                <span>Estimated Payback Horizon:</span>
                <span className="text-white font-bold">{paybackMonths} Months @ 15% Margin</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* STEP 4: Choose the Appropriate Analysis Tool */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
            Step 04
          </span>
          <h3 className="text-lg font-bold text-[#0F172A]">
            Launch Corresponding Simulation &amp; Analytical Tool
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Test queue accumulation, cycle variations, or Six Sigma defect rates directly in your browser.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('calculator')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calculator className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#0F172A]">Lean Sigma Calculator</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Compute DPMO, Z-yield, availability %, and scrap costs.</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-600 mt-4 flex items-center gap-1">
              <span>Open Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => navigate('vsm')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Workflow className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#0F172A]">Value Stream Mapping</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Map workcells, Takt time, PCE %, and flag 8 DOWNTIME wastes.</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 mt-4 flex items-center gap-1">
              <span>Open VSM Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => navigate('simulator')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-violet-500 hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#0F172A]">Discrete Event Simulator</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Simulate line buffers, machine starvation, and bottleneck pace.</p>
            </div>
            <span className="text-xs font-mono font-bold text-violet-600 mt-4 flex items-center gap-1">
              <span>Launch Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};
