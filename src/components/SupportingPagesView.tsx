import React, { useState } from 'react';
import {
  BUSINESS_OUTCOMES,
  INDUSTRIES_DETAILED,
  VALUE_SERVICES,
  USE_CASES_DATA,
  VALUE_CREATION_CYCLE_STAGES
} from '../data/outcomeData';
import { ContactWorkshopForm } from './ContactWorkshopForm';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Activity,
  Workflow,
  Calculator,
  Sliders,
  AlertCircle,
  FileCheck,
  Clock,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface SupportingPagesProps {
  route: string;
  navigate: (route: string) => void;
}

export const SupportingPagesView: React.FC<SupportingPagesProps> = ({ route, navigate }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>("manufacturing-production");
  const [selectedUseCaseId, setSelectedUseCaseId] = useState<string>("reducing-manufacturing-bottlenecks");

  /* =============================================================
     1. OUTCOMES VIEW
  ============================================================= */
  if (route === 'outcomes') {
    return (
      <div className="space-y-0 pb-16">
        
        {/* Page Hero Intro */}
        <section className="vyntra-section bg-white border-b border-slate-200">
          <div className="vyntra-container">
            <div className="max-w-3xl space-y-4">
              <span className="section-label">OUTCOME-FIRST ARCHITECTURE</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] section-heading-serif tracking-tight leading-[1.12]">
                Eight Core Business Outcomes &amp; KPI Directory
              </h1>
              <p className="section-lead text-slate-600">
                Every operational engagement is defined by an unambiguous business outcome, measurable KPIs, required baseline data, and an audited proof mechanism.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>8 Defined Domains</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Empirical Baselines</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span>Audited P&amp;L Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Listing Section */}
        <section className="vyntra-section vyntra-section-alt">
          <div className="vyntra-container space-y-12 lg:space-y-16">
            {BUSINESS_OUTCOMES.map((out) => (
              <div key={out.id} className="vyntra-card space-y-8">
                
                <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                      {out.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{out.title}</h2>
                    <p className="text-sm text-slate-500">{out.shortDesc}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-right">
                    <span className="text-xs font-mono text-slate-400 block uppercase mb-0.5">Primary KPI</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{out.primaryKPI}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-sm">
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-blue-700 block font-mono text-[11px] uppercase tracking-wider">Business Problem:</span>
                    <p className="text-slate-700 leading-relaxed text-sm">{out.problem}</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-blue-700 block font-mono text-[11px] uppercase tracking-wider">Baseline Data Required:</span>
                    <p className="text-slate-700 leading-relaxed text-sm">{out.baselineRequirement}</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-blue-700 block font-mono text-[11px] uppercase tracking-wider">Illustrative Target:</span>
                    <p className="text-slate-700 leading-relaxed text-sm">{out.illustrativeTarget}</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-blue-700 block font-mono text-[11px] uppercase tracking-wider">Value Validation Method:</span>
                    <p className="text-slate-700 leading-relaxed text-sm">{out.validationMethod}</p>
                  </div>
                </div>

                {/* KPI formulas table with spacious padding */}
                <div className="pt-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 mb-4">
                    Documented Mathematical KPI Formulations ({out.kpis.length} Metrics)
                  </h3>
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/70 text-slate-700 font-semibold uppercase border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-4 font-mono">Metric Name</th>
                          <th className="py-3.5 px-4 font-mono">Unit</th>
                          <th className="py-3.5 px-4 font-mono">Formula</th>
                          <th className="py-3.5 px-4 font-mono">Inputs</th>
                          <th className="py-3.5 px-4 font-mono">Limitations</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {out.kpis.map((kpi, kIdx) => (
                          <tr key={kIdx} className="hover:bg-slate-50/70">
                            <td className="py-3 px-4 font-sans font-bold text-slate-900">{kpi.name}</td>
                            <td className="py-3 px-4 text-blue-600 font-bold">{kpi.unit}</td>
                            <td className="py-3 px-4 text-slate-800">{kpi.formula}</td>
                            <td className="py-3 px-4 text-slate-600">{kpi.requiredInputs.join(", ")}</td>
                            <td className="py-3 px-4 font-sans text-slate-500 text-[11px] leading-relaxed">{kpi.limitations}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    );
  }

  /* =============================================================
     2. INDUSTRIES VIEW (8 SPECIFIC SECTORS)
  ============================================================= */
  if (route === 'industries') {
    const currentInd = INDUSTRIES_DETAILED.find(i => i.id === selectedIndustryId) || INDUSTRIES_DETAILED[0];

    return (
      <div className="space-y-0 pb-16">
        
        {/* Hero Section - Balanced 2-column layout with industrial engineering digital twin visual */}
        <section className="vyntra-section bg-white border-b border-slate-200">
          <div className="vyntra-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Heading and Context */}
              <div className="lg:col-span-7 space-y-4">
                <span className="section-label">OPERATIONAL SECTOR PRACTICE</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] section-heading-serif tracking-tight leading-[1.12]">
                  Eight Targeted Industry Practice Domains
                </h1>
                <p className="section-lead max-w-2xl text-slate-600">
                  Each industry sector presents distinct physical constraints, compliance requirements, and operational dynamics. VYNTRA applies targeted Lean engineering and AI-guided digital twin simulation to isolate bottlenecks and validate financial value.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>8 Practice Verticals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Audited Value Baselines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>Monte Carlo Validated</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Realistic Modern Automated Facility Photograph (Clean, zero text/graphics) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                  <img 
                    src="/industries-facility-hero.jpg" 
                    alt="Modern automated manufacturing facility and logistics lines"
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Practice Domains Workspace */}
        <section className="vyntra-section vyntra-section-alt">
          <div className="vyntra-container space-y-12">
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-blue-600 tracking-wider">Practice Directory</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] section-heading-serif mt-1">
                    Select an Industry Vertical
                  </h2>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Active Practice: <strong className="text-slate-800">{currentInd.name}</strong>
                </p>
              </div>

              {/* Industry Cards Responsive 3-Column Desktop Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INDUSTRIES_DETAILED.map((ind, idx) => {
                  const isSelected = ind.id === selectedIndustryId;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setSelectedIndustryId(ind.id)}
                      aria-pressed={isSelected}
                      className={`outcome-card-item min-h-[220px] group ${
                        isSelected ? 'is-selected' : ''
                      }`}
                    >
                      <div className="flex flex-col space-y-3 w-full">
                        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100/90 w-full">
                          <span className={`card-category-label px-2.5 py-0.5 rounded transition-colors ${
                            isSelected ? 'bg-blue-900/80 text-blue-200 border border-blue-400/30' : 'bg-slate-100 text-slate-700'
                          }`}>
                            Vertical 0{idx + 1}
                          </span>
                          <span className={`card-kpi-count ${isSelected ? 'text-blue-200' : 'text-slate-400 group-hover:text-blue-600'}`}>
                            {isSelected ? '● Active Practice' : 'Explore →'}
                          </span>
                        </div>
                        <h3 className="card-title-heading text-left">{ind.name}</h3>
                        <p className="card-desc-text text-left">
                          {ind.subtitle}
                        </p>
                      </div>

                      <div className="flex-1 min-h-[12px]" />

                      <div className={`mt-4 pt-3 border-t w-full text-xs flex items-center justify-between ${
                        isSelected ? 'border-blue-500/80 text-blue-200' : 'border-slate-100 text-slate-500'
                      }`}>
                        <span className="font-medium">{ind.operationalFinancialKPIs.length} Benchmark KPIs</span>
                        <span className="font-semibold">Lean + AI Simulation</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Industry Full Detail Workspace */}
            <div className="space-y-8">
              
              {/* Workspace Header Card */}
              <div className="vyntra-card border border-slate-200/90 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                  <div className="space-y-2 max-w-2xl min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-blue-700 uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                        Domain Engineering Specification
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        Vertical ID: {currentInd.id.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] section-heading-serif">
                      {currentInd.name}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {currentInd.subtitle} — Tailored Lean Six Sigma workflows, targeted operational metrics, and digital twin simulation parameters.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('contact')}
                    className="btn-vyntra-navy text-xs py-3.5 px-6 flex items-center justify-center gap-2 font-bold shadow-sm whitespace-nowrap self-start md:self-auto"
                  >
                    <span>Schedule Practice Discovery</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                </div>

                {/* 4 Core Pillars Grid with Generous Padding */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-8">
                  
                  {/* Panel 1: Common Operational Challenges */}
                  <div className="bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <h3 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                          1. Common Operational Challenges
                        </h3>
                      </div>
                      <ul className="space-y-3.5 text-sm text-slate-700">
                        {currentInd.commonChallenges.map((ch, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-red-500 font-bold mt-0.5 flex-shrink-0 text-base leading-none">•</span>
                            <span className="leading-relaxed">{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Panel 2: Applicable Lean & Engineering Methods */}
                  <div className="bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <h3 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                          2. Applicable Lean &amp; Engineering Methods
                        </h3>
                      </div>
                      <ul className="space-y-3.5 text-sm text-slate-700">
                        {currentInd.leanEngineeringMethods.map((lm, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{lm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Panel 3: Potential AI & Simulation Applications */}
                  <div className="bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-cyan-600" />
                        <h3 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                          3. Potential AI &amp; Simulation Applications
                        </h3>
                      </div>
                      <ul className="space-y-3.5 text-sm text-slate-700">
                        {currentInd.aiSimulationApplications.map((ai, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-cyan-600 font-bold mt-0.5 flex-shrink-0 text-base leading-none">›</span>
                            <span className="leading-relaxed">{ai}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Panel 4: Target Operational & Financial KPIs */}
                  <div className="bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <h3 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                          4. Target Operational &amp; Financial KPIs
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {currentInd.operationalFinancialKPIs.map((k, idx) => (
                          <span key={idx} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-mono text-slate-800 shadow-sm">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Standalone, Distinct Dark Panel: Value Validation & Assurance (Separate Box with Generous Padding) */}
              <div className="vyntra-dark-panel p-8 sm:p-10 space-y-8 border border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Audit Governance &amp; Assurance Gate
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    S4 Bank → S5 Assure
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-3 min-w-0">
                    <span className="text-cyan-400 font-mono font-bold block text-xs tracking-wider uppercase">
                      5. Value Validation Approach
                    </span>
                    <p className="text-slate-200 leading-relaxed text-sm">
                      {currentInd.valueValidationApproach}
                    </p>
                  </div>
                  <div className="space-y-3 min-w-0">
                    <span className="text-cyan-400 font-mono font-bold block text-xs tracking-wider uppercase">
                      6. Risk, Governance &amp; Assurance
                    </span>
                    <ul className="space-y-2.5 text-slate-200 text-sm">
                      {currentInd.riskAssuranceConsiderations.map((rc, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-cyan-500 flex-shrink-0 mt-0.5">•</span>
                          <span className="leading-relaxed">{rc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    );
  }

  /* =============================================================
     3. SERVICES VIEW (VALUE-ORIENTED PORTFOLIO)
  ============================================================= */
  if (route === 'services') {
    return (
      <div className="space-y-0 pb-16">
        
        {/* Hero Section - Balanced 2-Column with Process Engineering visual */}
        <section className="vyntra-section bg-white border-b border-slate-200">
          <div className="vyntra-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="section-label">VALUE DELIVERY SERVICES</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] section-heading-serif tracking-tight leading-[1.12]">
                  Value Engineering Services Tied to Measured Outcomes
                </h1>
                <p className="section-lead max-w-2xl text-slate-600">
                  Structured engagement capabilities that move client teams systematically from baseline measurement through to audited financial realization. Every practice phase is anchored by statistical verification and discrete-event simulation.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>S0–S5 Governance Framework</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>100% P&amp;L Audited Delivery</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Realistic Engineering & Analytics Collaboration Photograph (Clean, zero text/graphics) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                  <img 
                    src="/services-collaboration-hero.jpg" 
                    alt="Engineers and operational analysts collaborating on process improvements"
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="vyntra-section vyntra-section-alt">
          <div className="vyntra-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {VALUE_SERVICES.map((srv, idx) => (
                <div key={srv.id} className="vyntra-card flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                        {srv.cycleStage}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Step 0{idx + 1}</span>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">{srv.name}</h2>
                      <p className="text-xs font-semibold text-blue-600 mt-1">{srv.tagline}</p>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed pt-1">{srv.problemSolved}</p>

                    <div className="space-y-3 pt-3">
                      <p className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500">Deliverables:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                        {srv.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block mb-1">Business Relevance</span>
                      <p className="text-xs font-medium text-slate-800 leading-relaxed">{srv.measurableBusinessRelevance}</p>
                    </div>
                    <button
                      onClick={() => navigate('contact')}
                      className="w-full btn-vyntra-navy text-xs py-3"
                    >
                      Engage Practice
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    );
  }

  /* =============================================================
     4. USE CASES VIEW (EVIDENCE-BASED 7-STAGE FLOW)
  ============================================================= */
  if (route === 'usecases') {
    const currentCase = USE_CASES_DATA.find(u => u.id === selectedUseCaseId) || USE_CASES_DATA[0];

    return (
      <div className="space-y-0 pb-16">
        
        {/* Hero Section - Balanced 2-Column with 7-Stage Flow Visual Accent */}
        <section className="vyntra-section bg-white border-b border-slate-200">
          <div className="vyntra-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="section-label">EVIDENCE-BASED IMPLEMENTATIONS</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] section-heading-serif tracking-tight leading-[1.12]">
                  Operational Engineering Use Cases
                </h1>
                <p className="section-lead max-w-2xl text-slate-600">
                  Every use case follows the strict evidence sequence: Business Problem → Baseline → Intervention → Simulation / Pilot → KPI Comparison → Financial Impact → Assurance.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>7-Stage Evidence Chain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Audit Validated Deltas</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Realistic Operations Team on Factory Floor Photograph (Clean, zero text/graphics) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                  <img 
                    src="/usecases-team-hero.jpg" 
                    alt="Industrial operations team reviewing production workflow on the factory floor"
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Case Workspace */}
        <section className="vyntra-section vyntra-section-alt">
          <div className="vyntra-container space-y-10">
            
            {/* Use Case Tabs: Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {USE_CASES_DATA.map((uc) => {
                const isSelected = uc.id === selectedUseCaseId;
                return (
                  <button
                    key={uc.id}
                    type="button"
                    onClick={() => setSelectedUseCaseId(uc.id)}
                    aria-pressed={isSelected}
                    className={`outcome-card-item min-h-[140px] group ${
                      isSelected ? 'is-selected' : ''
                    }`}
                  >
                    <div className="space-y-2 w-full">
                      <span className={`card-category-label block ${
                        isSelected ? 'text-blue-200' : 'text-blue-700'
                      }`}>
                        {uc.industry}
                      </span>
                      <h3 className="card-kpi-desc font-bold text-left line-clamp-2">
                        {uc.title}
                      </h3>
                    </div>

                    <div className={`mt-3 pt-2 border-t w-full text-[11px] flex items-center justify-between ${
                      isSelected ? 'border-blue-500/80 text-blue-200' : 'border-slate-100 text-slate-400'
                    }`}>
                      <span>Case Evidence</span>
                      <span className="font-semibold">{isSelected ? '● Selected' : 'View →'}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Use Case Breakdown */}
            <div className="space-y-8">
              
              <div className="vyntra-card border border-slate-200/90 shadow-sm space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div className="space-y-1.5 min-w-0">
                    <span className="text-xs font-mono font-bold text-blue-700 uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                      {currentCase.industry}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] section-heading-serif">
                      {currentCase.title}
                    </h2>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                    Demonstration Model
                  </span>
                </div>

                <div className="space-y-8">
                  
                  {/* 1. Problem & Baseline */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    <div className="lg:col-span-7 bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 min-w-0">
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <h3 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                          1. Business Problem
                        </h3>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-sans">{currentCase.businessProblem}</p>
                    </div>

                    <div className="lg:col-span-5 bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 min-w-0">
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <h3 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                          2. Measured Baseline (S1)
                        </h3>
                      </div>
                      <div className="space-y-3 text-xs sm:text-sm font-mono">
                        {currentCase.baselineMetrics.map((bm, idx) => (
                          <div key={idx} className="flex justify-between border-b border-slate-200/80 pb-2">
                            <span className="text-slate-500">{bm.label}:</span>
                            <span className="font-bold text-slate-900">{bm.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. Intervention & Simulation Method */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    <div className="lg:col-span-6 bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 min-w-0">
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                        <h3 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                          3. Proposed Operational Intervention
                        </h3>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-sans">{currentCase.proposedIntervention}</p>
                    </div>

                    <div className="lg:col-span-6 bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 min-w-0">
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-cyan-600" />
                        <h3 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                          4. Simulation &amp; Pilot Testing Method (S3)
                        </h3>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-sans">{currentCase.simulationPilotMethod}</p>
                    </div>
                  </div>

                  {/* 3. Before vs After Comparison Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-100/90 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-800">
                        5. Before vs After KPI Comparison
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">Statistically Verified</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm font-mono">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
                          <tr>
                            <th className="py-3.5 px-6 font-sans">Metric Measured</th>
                            <th className="py-3.5 px-6 text-slate-700">Baseline Before</th>
                            <th className="py-3.5 px-6 text-blue-600">Simulated / Pilot After</th>
                            <th className="py-3.5 px-6 text-right">Performance Delta</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {currentCase.kpiComparison.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/50">
                              <td className="py-3.5 px-6 font-sans font-bold text-slate-900">{row.metric}</td>
                              <td className="py-3.5 px-6">{row.before}</td>
                              <td className="py-3.5 px-6 text-blue-700 font-bold">{row.after}</td>
                              <td className="py-3.5 px-6 text-right text-emerald-600 font-bold">{row.delta}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>

              {/* Standalone Dark Financial Impact & Assurance Panel */}
              <div className="vyntra-dark-panel p-8 sm:p-10 space-y-6 border border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      Financial Reconciliation Gate
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    S4 Bank → S5 Assure
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-2.5 min-w-0">
                    <span className="text-cyan-400 font-bold block font-mono text-xs uppercase tracking-wider">
                      6. Financial Value Quantification (S4 Bank):
                    </span>
                    <p className="text-slate-200 leading-relaxed text-sm font-sans">
                      {currentCase.financialImpact}
                    </p>
                  </div>
                  <div className="space-y-2.5 min-w-0">
                    <span className="text-cyan-400 font-bold block font-mono text-xs uppercase tracking-wider">
                      7. Governance &amp; Ongoing Assurance (S5 Assure):
                    </span>
                    <p className="text-slate-200 leading-relaxed text-sm font-sans">
                      {currentCase.assuranceMechanism}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    );
  }

  /* =============================================================
     5. ABOUT US VIEW (SPACIOUS 4-SECTION INDEPENDENT ARCHITECTURE)
  ============================================================= */
  return (
    <div className="space-y-0 pb-16">
      
      {/* SECTION A: Page Introduction (Dedicated Clean White Hero Space) */}
      <section className="vyntra-section bg-white border-b border-slate-200">
        <div className="vyntra-container">
          <div className="max-w-3xl space-y-3.5">
            <span className="section-label">ABOUT VYNTRA</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] section-heading-serif">
              From Complexity to Clarity.
            </h1>
            <p className="section-lead">
              We bring engineering discipline, mathematical modeling, and operational assurance to enterprise transformation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION B: Company Approach Section (Spacious 55/45 Two-Column with Light Grey Alt Background) */}
      <section className="vyntra-section vyntra-section-alt">
        <div className="vyntra-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column (55%): Explanatory paragraphs with comfortable line-height */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
                  Engineering Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight">
                  The Intersection of Lean, Industrial Engineering, AI &amp; Simulation
                </h2>
              </div>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed max-w-2xl">
                <p>
                  Organizations frequently struggle with artificial intelligence initiatives because technology is implemented onto broken, un-stabilized operational processes. This creates digital illusions of progress while unit costs and lead times remain unchanged.
                </p>
                <p>
                  VYNTRA was founded to unite classical Lean Six Sigma and Theory of Constraints rigor with modern discrete-event simulation, process mining, and governed multi-tier agentic systems. We test every hypothesis in a digital sandbox before advising capital allocation, ensuring every change is measurable, verifiable, and bankable.
                </p>
              </div>
            </div>

            {/* Right Column (45%): Operational Principles Dark Executive Panel with generous padding */}
            <div className="lg:col-span-5 vyntra-dark-panel space-y-5">
              <div className="pb-3 border-b border-slate-700/80">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block text-xs font-mono">
                  Core Operational Tenets
                </span>
                <p className="text-slate-400 text-xs mt-0.5">Non-negotiable practice principles</p>
              </div>

              <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
                <div className="space-y-1">
                  <p className="text-white font-bold text-sm font-sans flex items-center gap-2">
                    <span className="text-blue-400">01.</span> Lead With Outcomes
                  </p>
                  <p className="text-slate-400 pl-6">Never deploy technology without an explicit business outcome and validated baseline.</p>
                </div>

                <div className="space-y-1">
                  <p className="text-white font-bold text-sm font-sans flex items-center gap-2">
                    <span className="text-indigo-400">02.</span> Respect Constraints
                  </p>
                  <p className="text-slate-400 pl-6">An hour saved at a non-bottleneck is an illusion. Focus AI on the primary system constraint.</p>
                </div>

                <div className="space-y-1">
                  <p className="text-white font-bold text-sm font-sans flex items-center gap-2">
                    <span className="text-violet-400">03.</span> Simulate First
                  </p>
                  <p className="text-slate-400 pl-6">Test queue accumulation, blocking, and starvation in digital models before physical changes.</p>
                </div>

                <div className="space-y-1">
                  <p className="text-white font-bold text-sm font-sans flex items-center gap-2">
                    <span className="text-cyan-400">04.</span> Bank the Value
                  </p>
                  <p className="text-slate-400 pl-6">Separate simulated projections from audited P&amp;L savings signed off by Finance.</p>
                </div>

                <div className="space-y-1">
                  <p className="text-white font-bold text-sm font-sans flex items-center gap-2">
                    <span className="text-emerald-400">05.</span> Continuous Assurance
                  </p>
                  <p className="text-slate-400 pl-6">Maintain strict Tier 0 PLC deterministic boundaries and lifelong model drift governance.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION C: Six-Stage Methodology Section (Distinct White Section, Balanced 3x2 Grid) */}
      <section className="vyntra-section bg-white border-b border-slate-200">
        <div className="vyntra-container">
          
          <div className="section-header max-w-3xl">
            <span className="section-label">METHODOLOGY FRAMEWORK</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
              The Approved Six-Stage AI Value Creation Cycle
            </h2>
            <p className="section-lead">
              A disciplined, gate-governed delivery cycle moving enterprise operations from baseline diagnosis to audited P&amp;L realization.
            </p>
          </div>

          {/* 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {VALUE_CREATION_CYCLE_STAGES.map((stg) => (
              <div 
                key={stg.stageId} 
                className="vyntra-card flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                      {stg.stageId}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Governance Gate</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A]">
                    {stg.name}
                  </h3>

                  <p className="text-xs font-medium text-blue-600">
                    {stg.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {stg.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-6 space-y-2 text-xs">
                  <p className="font-mono text-slate-500">
                    <strong className="text-slate-700">Tool Link:</strong> {stg.toolConnection}
                  </p>
                  <p className="font-mono text-slate-500 text-[11px]">
                    <strong className="text-slate-700">Gate:</strong> {stg.governanceGates}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION D: Workshop Form Section (Dedicated Card with generous vertical separation) */}
      <section className="vyntra-section vyntra-section-alt">
        <div className="vyntra-container">
          <div className="max-w-3xl mx-auto space-y-8">
            
            <div className="text-center space-y-3">
              <span className="section-label">EXECUTIVE ENGAGEMENT</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
                Schedule an Outcome Discovery Workshop
              </h2>
              <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Connect with our Lean AI Value Engineering practice lead. We evaluate your operational baseline and configure simulation models before proposing capital deployment.
              </p>
            </div>

            <div className="vyntra-card shadow-lg p-6 sm:p-10">
              <ContactWorkshopForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
