import React, { useState } from 'react';
import { EnterpriseStandardPageData } from '../types/enterprisePageTypes';
import { analytics } from '../services/analyticsService';
import {
  AlertTriangle,
  ArrowRight,
  Compass,
  Calculator,
  Calendar,
  Building2,
  CheckCircle2,
  PhoneCall,
  DollarSign,
  Workflow,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface EnterpriseStandardPageViewProps {
  data: EnterpriseStandardPageData;
  navigate: (route: string) => void;
}

export const EnterpriseStandardPageView: React.FC<EnterpriseStandardPageViewProps> = ({
  data,
  navigate
}) => {
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(0);

  const handleCta = (actionName: string, targetRoute: string) => {
    analytics.trackCtaClick(actionName, `/${data.route}`);
    navigate(targetRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen antialiased overflow-x-hidden">
      
      {/* =========================================================================
          HERO & HEADER BANNER
          ========================================================================= */}
      <section className="bg-white border-b border-slate-200/90 pt-16 sm:pt-20 pb-16 sm:pb-20 relative">
        <div className="vyntra-container">
          
          {/* Breadcrumb & Pillar Badge */}
          <div className="flex items-center gap-2.5 mb-6 flex-wrap">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-bold">
              {data.category}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-slate-500 font-mono tracking-tight">
              {data.tagline}
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-5">
              {data.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mb-7">
              {data.executiveSummary}
            </p>

            {/* Quick Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => handleCta('Hero Primary Consult', data.cta.primaryActionRoute)}
                className="btn-vyntra-navy text-xs sm:text-sm py-3.5 px-7 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 flex-shrink-0" />
                <span>{data.cta.primaryText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>

              <button
                onClick={() => handleCta('Hero Launch Accelerator', data.cta.acceleratorToolRoute)}
                className="bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-xs sm:text-sm font-semibold py-3.5 px-6 rounded-lg border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Launch {data.cta.acceleratorToolName}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: BUSINESS CHALLENGE & OPERATIONAL FRICTION
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80">
        <div className="vyntra-container">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              Section 1 — The Executive Dilemma
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              The Root-Cause Operational Friction Facing Leadership
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              {data.challenge.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {data.challenge.frictionModes.map((mode, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="w-2 h-full bg-rose-500 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs font-mono mb-5 border border-rose-100">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2.5">
                    {mode.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {mode.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: VYNTRA SOLUTION & CLOSED-LOOP METHODOLOGY
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="vyntra-container">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              Section 2 — The Strategic Intervention
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Closed-Loop Transformation Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              {data.solution.approach}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {data.solution.stages.map((stg, idx) => (
              <div
                key={idx}
                className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/90 hover:border-blue-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-100/70 px-2.5 py-1 rounded-md">
                      {stg.stage}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Phase 0{idx + 1}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2.5">
                    {stg.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {stg.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: AUDITED KPI IMPACT MATRIX
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80">
        <div className="vyntra-container">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Calculator className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                Section 3 — Audited Performance Metrics
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Primary KPIs & Mathematical Impact
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs self-start md:self-auto">
              *Statistically validated with 95% confidence intervals
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {data.kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Metric 0{idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-4 min-h-[44px] flex items-center">
                    {kpi.name}
                  </h4>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Typical Baseline:</span>
                      <span className="font-mono font-semibold text-slate-700">{kpi.baseline}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-700 font-medium">Proven Target Δ:</span>
                      <span className="font-mono font-bold text-emerald-600">{kpi.targetDelta}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-100 text-[11.5px] space-y-2">
                  <div className="font-mono text-slate-500 text-[10.5px] truncate" title={kpi.formula}>
                    Formula: {kpi.formula}
                  </div>
                  <div className="text-blue-700 font-medium leading-snug">
                    {kpi.financialImpact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: EXPECTED OUTCOMES (PHASED VALUE HORIZON)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="vyntra-container">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              Section 4 — Value Realization Roadmap
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Time-Phased Operational Outcomes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {data.outcomesTimeline.map((phase, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3.5 py-1 rounded-full bg-slate-900 text-white font-mono text-[11px] font-bold mb-4">
                    {phase.timeframe}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-5 min-h-[48px]">
                    {phase.title}
                  </h4>
                  <ul className="space-y-3">
                    {phase.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CROSS-INDUSTRY APPLICATIONS
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80">
        <div className="vyntra-container">
          <div className="mb-8 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
              Section 5 — Cross-Sector Depth
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Sector-Specific Transformation Applications
            </h2>
          </div>

          {/* Responsive Tab Selector */}
          <div className="flex gap-2.5 overflow-x-auto pb-3 mb-8 scrollbar-thin">
            {data.industryApplications.map((ind, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndustryIdx(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeIndustryIdx === idx
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {ind.sector}
              </button>
            ))}
          </div>

          {/* Active Sector Card */}
          {data.industryApplications[activeIndustryIdx] && (
            <div className="bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-7 animate-in fade-in duration-150">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
                  Operating Environment
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-2.5">
                  {data.industryApplications[activeIndustryIdx].sector}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {data.industryApplications[activeIndustryIdx].environment}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1.5">
                  Tailored Intervention
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-2.5">
                  Applied Lean AI Playbook
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {data.industryApplications[activeIndustryIdx].intervention}
                </p>
              </div>

              <div className="bg-emerald-50/70 p-6 rounded-xl border border-emerald-100 flex flex-col justify-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1.5">
                  Verified Outcome
                </span>
                <div className="text-base sm:text-lg font-bold text-emerald-950 mb-1">
                  {data.industryApplications[activeIndustryIdx].measuredResult}
                </div>
                <span className="text-xs text-emerald-700">Audited operational telemetry</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: HARD-DOLLAR BUSINESS BENEFITS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="vyntra-container">
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              Section 6 — Financial Realization
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Quantified P&L and Balance Sheet Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {data.businessBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50/90 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
                    {benefit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
                    {benefit.summary}
                  </p>
                </div>
                <div className="space-y-2.5 pt-4 border-t border-slate-200">
                  {benefit.impactMetrics.map((met, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      <span>{met}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: VERIFIED CASE EVIDENCE & PROVEN USE CASES
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80">
        <div className="vyntra-container">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Workflow className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                Section 7 — Engagement Proof
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Verified Transformation Case Evidence
              </h2>
            </div>
            <button
              onClick={() => handleCta('Explore All Case Studies', 'usecases')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group self-start md:self-auto cursor-pointer"
            >
              Browse All Use Cases <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {data.relatedUseCases.map((uc, idx) => (
              <div
                key={idx}
                className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-bold tracking-wider mb-2">
                    {uc.clientProfile}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
                    {uc.problemStatement}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {uc.interventionSummary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-emerald-700 font-mono font-bold text-xs sm:text-sm">
                    {uc.verifiedRoi}
                  </div>
                  <button
                    onClick={() => handleCta(`Case Study ${idx + 1}`, uc.route)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    View Case <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: ENTERPRISE CALL TO ACTION
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-[#0B0F17] text-white">
        <div className="vyntra-container text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Section 8 — Executive Consultation
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
              Partner with VYNTRA to Modernize Your Operating Model
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Eliminate operational friction, simulate line changes before capital spend, and secure audited P&L returns. Connect with a Practice Director today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleCta('Section 8 Primary Consult', data.cta.primaryActionRoute)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-600/30 text-xs sm:text-sm flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 flex-shrink-0" />
                <span>{data.cta.primaryText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>

              <button
                onClick={() => handleCta('Section 8 Launch Tool', data.cta.acceleratorToolRoute)}
                className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold py-3.5 px-7 rounded-xl border border-slate-700 text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Run {data.cta.acceleratorToolName}</span>
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-slate-400 font-mono">
              <span>✓ Confidential & NDA-Protected</span>
              <span>✓ Direct Managing Director Lead</span>
              <span>✓ Audited ROI Methodology</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
