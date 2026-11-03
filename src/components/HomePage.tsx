import React, { useState } from 'react';
import {
  BUSINESS_OUTCOMES,
  VALUE_CREATION_CYCLE_STAGES,
  BusinessOutcome
} from '../data/outcomeData';
import { OutcomeKpiWorkspace } from './OutcomeKpiWorkspace';
import { ContactWorkshopForm } from './ContactWorkshopForm';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Calculator,
  Activity,
  Layers,
  Sparkles,
  TrendingUp,
  Cpu,
  BarChart3,
  Search,
  ChevronRight,
  Flame,
  Clock,
  Sliders,
  DollarSign,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [activeCycleStageIndex, setActiveCycleStageIndex] = useState<number>(0);
  const [selectedOutcomeCardId, setSelectedOutcomeCardId] = useState<string>("cost-reduction");

  const activeStage = VALUE_CREATION_CYCLE_STAGES[activeCycleStageIndex];
  const activeDetailOutcome = BUSINESS_OUTCOMES.find(o => o.id === selectedOutcomeCardId) || BUSINESS_OUTCOMES[0];

  return (
    <div className="space-y-0 pb-16 w-full overflow-x-hidden">
      
      {/* ========================================================
          SECTION 1: HERO (LIGHT-SLATE LUXURY EXECUTIVE BANNER)
      ======================================================== */}
      <section className="relative overflow-hidden bg-white pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-slate-200">
        
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-100/15 blur-3xl pointer-events-none -z-10" />

        <div className="vyntra-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Clean Title, Subheading & Three Questions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-blue-700 font-bold">VYNTRA</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">From Complexity to Clarity</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] leading-[1.2] tracking-tight">
                Turn Operational Complexity Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600">Measurable Business Value.</span>
              </h1>

              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-2xl">
                VYNTRA combines Lean methods, industrial engineering, AI, simulation, and value verification to help organizations identify operational losses, test improvements in digital sandboxes, and measure bottom-line business impact.
              </p>

              {/* Three Core Questions Immediately Answered */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 pb-5 border-t border-slate-200">
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <span className="text-blue-700 font-bold block font-mono text-[11px] uppercase tracking-wider mb-2.5">
                    1. What We Improve
                  </span>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    Unit cost, throughput, First Pass Yield, lead times, and WIP cash.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <span className="text-indigo-700 font-bold block font-mono text-[11px] uppercase tracking-wider mb-2.5">
                    2. How We Measure
                  </span>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    Statistically validated KPIs: PCE %, DPMO, Takt, OEE, and Little's Law.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <span className="text-violet-700 font-bold block font-mono text-[11px] uppercase tracking-wider mb-2.5">
                    3. How Value is Proven
                  </span>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    Discrete-event line simulation before capital spend + audited P&amp;L reconciliation.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('outcomes-dashboard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-vyntra-navy text-xs sm:text-sm py-3 px-6 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Business Outcomes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('simulator')}
                  className="btn-vyntra-secondary text-xs sm:text-sm py-3 px-6 flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <span>Explore Simulation Tools</span>
                </button>
              </div>

            </div>

            {/* Right Column: High-Impact Enterprise Digital Transformation Graphic */}
            <div className="lg:col-span-5">
              <div className="relative group overflow-hidden rounded-2xl border border-slate-200/90 shadow-[0_12px_35px_rgba(0,0,0,0.08)] bg-white">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/enterprise-digital-transformation.jpg"
                    alt="VYNTRA Enterprise Digital Transformation & Operations Architecture"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent pointer-events-none" />
                </div>
                
                {/* Overlay Badge */}
                <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-slate-150 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span className="font-bold text-slate-900 font-mono text-[11px] tracking-wide">
                      CONNECTED ENTERPRISE ARCHITECTURE
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold border border-blue-100">
                    Real-Time Telemetry
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: EIGHT CORE BUSINESS OUTCOMES (WORKSPACE)
      ======================================================== */}
      <section id="outcomes-dashboard" className="vyntra-section bg-[#F8FAFC]">
        <div className="vyntra-container">
          
          <div className="section-header max-w-3xl">
            <span className="section-label">Measurable Outcomes</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Eight Core Business Outcomes We Engineer
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
              Every engagement begins with an explicit operational challenge, a validated baseline KPI, and an audited value validation approach.
            </p>
          </div>

          <OutcomeKpiWorkspace navigate={navigate} />

        </div>
      </section>

      {/* ========================================================
          SECTION 3: APPROVED SIX-STAGE VALUE CREATION CYCLE
      ======================================================== */}
      <section className="vyntra-section bg-white border-t border-slate-200">
        <div className="vyntra-container">
          
          <div className="section-header max-w-3xl">
            <span className="section-label">Our Methodology</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              The Six-Stage AI Value Creation Cycle
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
              From initial problem framing to audited financial realization and ongoing model governance.
            </p>
          </div>

          {/* Stepper Navigator */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {VALUE_CREATION_CYCLE_STAGES.map((stg, idx) => (
              <button
                key={stg.stageId}
                onClick={() => setActiveCycleStageIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeCycleStageIndex === idx
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600/20'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[11px] font-mono font-bold block mb-1 ${
                  activeCycleStageIndex === idx ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {stg.stageId}
                </span>
                <span className="text-xs sm:text-sm font-bold block truncate">
                  {stg.name.replace(/^S\d\s*-\s*/, '')}
                </span>
              </button>
            ))}
          </div>

          {/* Active Stage Detailed Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-block px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-mono font-bold">
                  {activeStage.stageId} — {activeStage.name}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                  {activeStage.subtitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeStage.description}
                </p>
              </div>

              <div className="lg:w-80 p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Stage Output Deliverables
                </span>
                <ul className="text-xs text-slate-800 space-y-1.5 font-medium">
                  {activeStage.deliverables.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-emerald-700 font-medium pt-2 border-t border-slate-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Audited by Finance &amp; Operations</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 4: SIMULATION SUITE CALLOUT
      ======================================================== */}
      <section className="vyntra-section bg-[#0F172A] text-white">
        <div className="vyntra-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                Consulting Accelerators
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Simulate Operational Changes Before Committing Capital
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Our discrete-event line simulator and analytical calculators test process interventions in risk-free digital sandboxes. Eliminate line starvation, balance buffers, and prove financial ROI before physical reconfiguration.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => navigate('simulator')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Activity className="w-4 h-4" />
                <span>Launch Line Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('calculator')}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold py-3.5 px-6 rounded-xl border border-slate-700 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>Open Lean Sigma Calculator</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: ENTERPRISE CONSULTATION & DIAGNOSTIC REQUEST FORM
      ======================================================== */}
      <section id="book-consultation" className="vyntra-section bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200">
        <div className="vyntra-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Enterprise Engagement Guarantee */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Executive Engagement Protocol</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Request an Audited Operational Diagnostic
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Connect with our senior industrial engineering and operations practice leads. We evaluate your plant, clinical flow, or service pipeline telemetry under strict NDA, establishing empirical baseline KPIs and a verified financial realization model.
              </p>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white space-y-4 shadow-xl border border-slate-800">
                <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase font-bold block">
                  ENTERPRISE ENGAGEMENT GUARANTEE
                </span>
                
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero-Pressure Diagnostic:</strong> Direct consultation with Senior Operations Principals, never junior sales reps.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Strict NDA &amp; Data Security:</strong> Full enterprise confidentiality protection for proprietary plant and yield data.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>ERP &amp; SCADA Compatible:</strong> Integrates directly with SAP, Oracle, MES telemetry, and Snowflake data pools.</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Turnaround Window: <strong>1 Business Day</strong></span>
                  <span className="text-emerald-400 font-mono font-semibold">100% Confidential</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tailored Consultation Lead Form */}
            <div className="lg:col-span-7">
              <ContactWorkshopForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
