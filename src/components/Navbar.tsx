import React, { useState, useRef, useEffect } from 'react';
import { VyntraLogo } from './VyntraLogo';
import { analytics } from '../services/analyticsService';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  TrendingDown,
  Gauge,
  Award,
  Users,
  BrainCircuit,
  Cpu,
  Compass,
  FileSpreadsheet,
  Workflow,
  Activity,
  Layers,
  Database,
  Bot,
  Building2,
  Stethoscope,
  Landmark,
  ShoppingBag,
  Truck,
  Building,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  LineChart,
  BarChart3,
  Search,
  Crosshair,
  ShieldAlert,
  Zap,
  Target
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

type ActiveMegaMenu = 'outcomes' | 'offerings' | 'industries' | 'usecases' | 'tools' | 'about' | null;

interface OutcomeCategoryDetail {
  id: string;
  name: string;
  route: string;
  headline: string;
  badge: string;
  metrics: string;
  recommendedFor: string[];
  businessImpact: string[];
  capabilities: {
    icon: any;
    title: string;
    tag: string;
    desc: string;
    route: string;
  }[];
}

const OUTCOMES_STRUCTURED_DATA: Record<string, OutcomeCategoryDetail> = {
  'cost-reduction': {
    id: 'cost-reduction',
    name: 'Cost Reduction',
    route: 'outcomes/cost-reduction',
    headline: 'Enterprise Cost Reduction & Waste Elimination',
    badge: '6 Capabilities',
    metrics: '-15% to -28% COPQ Elimination',
    recommendedFor: ['Manufacturing', 'Healthcare', 'Banking & FinServ', 'Supply Chain'],
    businessImpact: ['EBITDA Recovery', 'Direct Unit Cost Cut', 'Scrap Bleed Halved'],
    capabilities: [
      {
        icon: TrendingDown,
        title: 'Forensic Waste Audit (DOWNTIME)',
        tag: 'LEAN DIAGNOSTIC',
        desc: 'Plant-wide GEMBA diagnostic, classifying and eliminating 8 operational wastes across workcells.',
        route: 'outcomes/cost-reduction'
      },
      {
        icon: DollarSign,
        title: 'COPQ & Defect Bleed Eradication',
        tag: 'P&L RECOVERY',
        desc: 'Quantify scrap, rework, and warranty liabilities with direct audited ledger reconciliation.',
        route: 'outcomes/cost-reduction'
      },
      {
        icon: LineChart,
        title: 'Unit Cost Benchmark & Variance',
        tag: 'COSTING ENGINE',
        desc: 'Establish true standard cost baselines and eliminate variance creep across high-volume SKUs.',
        route: 'outcomes/cost-reduction'
      },
      {
        icon: Activity,
        title: 'Working Capital & WIP Release',
        tag: 'CASH FLOW',
        desc: 'Compress buffer inventory and trapped WIP cash using Little\'s Law and pull replenishment.',
        route: 'outcomes/cost-reduction'
      },
      {
        icon: ShieldAlert,
        title: 'Expedite Freight & Crisis Eradication',
        tag: 'LOGISTICS STABILITY',
        desc: 'Stop premium emergency logistics spending triggered by downstream production bottlenecks.',
        route: 'outcomes/cost-reduction'
      },
      {
        icon: Target,
        title: 'SMED Rapid Changeover Architecture',
        tag: 'EQUIPMENT UPTIME',
        desc: 'Slash setup changeover times by 50%+ to run smaller batch sizes without margin penalties.',
        route: 'outcomes/cost-reduction'
      }
    ]
  },
  'productivity-improvement': {
    id: 'productivity-improvement',
    name: 'Productivity Improvement',
    route: 'outcomes/productivity-improvement',
    headline: 'Throughput Scaling & Capacity Optimization',
    badge: '6 Capabilities',
    metrics: '+20% to +45% Throughput Lift',
    recommendedFor: ['Assembly Operations', 'High-Volume Production', 'Distribution Centers'],
    businessImpact: ['Higher Line Utilization', 'Labor Productivity', 'Zero-CapEx Scaling'],
    capabilities: [
      {
        icon: Gauge,
        title: 'Theory of Constraints Bottleneck Relief',
        tag: 'TOC ACCELERATOR',
        desc: 'Isolate primary system pacing constraints and elevate output before investing capital.',
        route: 'outcomes/productivity-improvement'
      },
      {
        icon: Workflow,
        title: 'Line Balancing & Takt Alignment',
        tag: 'CYCLE TIME',
        desc: 'Synchronize multi-station operator cycle times directly to customer demand cadence.',
        route: 'outcomes/productivity-improvement'
      },
      {
        icon: BarChart3,
        title: 'OEE Uplift & Availability Engineering',
        tag: 'ASSET PRODUCTIVITY',
        desc: 'Drive Overall Equipment Effectiveness from low 60s baseline to 85%+ world-class benchmark.',
        route: 'outcomes/productivity-improvement'
      },
      {
        icon: Crosshair,
        title: 'Process Cycle Efficiency (PCE) Maximizer',
        tag: 'FLOW OPTIMIZATION',
        desc: 'Double value-added time ratio across end-to-end transformation steps.',
        route: 'outcomes/productivity-improvement'
      },
      {
        icon: Zap,
        title: 'Standard Work & Motion Economy',
        tag: 'HUMAN WORKFLOW',
        desc: 'Eliminate wasted operator motion, transit steps, and ergonomics bottlenecks.',
        route: 'outcomes/productivity-improvement'
      },
      {
        icon: LineChart,
        title: 'Stochastic Discrete-Event Simulation',
        tag: 'DIGITAL SANDBOX',
        desc: 'Test layout alterations and buffer sizing in digital models prior to physical implementation.',
        route: 'simulator'
      }
    ]
  },
  'quality-excellence': {
    id: 'quality-excellence',
    name: 'Quality Excellence',
    route: 'outcomes/quality-excellence',
    headline: 'Defect Reduction, Cpk Shifts & Zero-Defect Culture',
    badge: '6 Capabilities',
    metrics: '99.4% First Pass Yield Target',
    recommendedFor: ['Medical Devices', 'Automotive Tier-1', 'Precision Engineering', 'Pharma'],
    businessImpact: ['Zero Warranty Escapes', 'Cpk > 1.67 Shift', 'Audited Compliance'],
    capabilities: [
      {
        icon: Award,
        title: 'First Pass Yield (FPY) Optimization',
        tag: 'YIELD MAXIMIZER',
        desc: 'Prevent downstream scrap cascade by catching and resolving root causes at generation.',
        route: 'outcomes/quality-excellence'
      },
      {
        icon: ShieldAlert,
        title: 'Statistical Process Control (SPC)',
        tag: 'REAL-TIME CONTROL',
        desc: 'Deploy automated Shewhart control charts and multi-rule Nelson violation alarms.',
        route: 'outcomes/quality-excellence'
      },
      {
        icon: Crosshair,
        title: 'Process Capability Shift (Cp / Cpk)',
        tag: 'TOLERANCE STABILITY',
        desc: 'Shift process capability indices past 1.67, virtually eliminating out-of-spec incidents.',
        route: 'outcomes/quality-excellence'
      },
      {
        icon: Target,
        title: 'Poka-Yoke & Mistake-Proofing Fixtures',
        tag: 'HUMAN ERROR SHIELD',
        desc: 'Implement sensor-gated mechanical interlocks that make defective assembly physically impossible.',
        route: 'outcomes/quality-excellence'
      },
      {
        icon: Search,
        title: 'Failure Mode & Effects Analysis (FMEA)',
        tag: 'RISK MITIGATION',
        desc: 'Systematically rank and suppress Severity, Occurrence, and Detection RPN scores.',
        route: 'outcomes/quality-excellence'
      },
      {
        icon: CheckCircle2,
        title: 'DMAIC Six Sigma Project Execution',
        tag: 'BLACK BELT RIGOR',
        desc: 'Data-driven problem-solving governance to permanently eradicate chronic quality issues.',
        route: 'outcomes/quality-excellence'
      }
    ]
  },
  'customer-experience': {
    id: 'customer-experience',
    name: 'Customer Experience',
    route: 'outcomes/customer-experience',
    headline: 'Service Journey Friction Removal & CSAT Optimization',
    badge: '6 Capabilities',
    metrics: '+35 Net Promoter Score Shift',
    recommendedFor: ['B2B Services', 'Omnichannel Retail', 'Digital Banking', 'Healthcare Systems'],
    businessImpact: ['Reduced Churn', 'Higher Retention', 'Shorter SLA Resolution'],
    capabilities: [
      {
        icon: Users,
        title: 'Service Journey Friction Mapping',
        tag: 'JOURNEY DIAGNOSTIC',
        desc: 'Identify client pain points, handover friction, and communication drop-offs.',
        route: 'outcomes/customer-experience'
      },
      {
        icon: Zap,
        title: 'First-Contact Resolution (FCR) Engineering',
        tag: 'SLA ACCELERATION',
        desc: 'Empower front-line teams with decision playbooks to resolve client inquiries instantly.',
        route: 'outcomes/customer-experience'
      },
      {
        icon: BarChart3,
        title: 'CSAT / NPS Voice of Customer Telemetry',
        tag: 'SENTIMENT ENGINE',
        desc: 'Transform raw feedback into prioritized operational work orders that prevent defection.',
        route: 'outcomes/customer-experience'
      },
      {
        icon: Workflow,
        title: 'Omnichannel Handover Standardization',
        tag: 'CROSS-CHANNEL FLOW',
        desc: 'Ensure seamless context persistence across digital portal, phone, and in-person touchpoints.',
        route: 'outcomes/customer-experience'
      },
      {
        icon: Activity,
        title: 'Client Onboarding SLA Compression',
        tag: 'TIME TO VALUE',
        desc: 'Cut time-to-first-value from weeks down to hours through automated verification steps.',
        route: 'outcomes/customer-experience'
      },
      {
        icon: Target,
        title: 'Service Failure Recovery Playbooks',
        tag: 'CHURN SHIELD',
        desc: 'Standardized protocols to rapidly convert service failures into brand loyalty moments.',
        route: 'outcomes/customer-experience'
      }
    ]
  },
  'ai-decision-making': {
    id: 'ai-decision-making',
    name: 'AI-Powered Decisions',
    route: 'outcomes/ai-decision-making',
    headline: 'Predictive Operations, Decision Intelligence & Forecasting',
    badge: '6 Capabilities',
    metrics: '94% Demand Forecast Accuracy',
    recommendedFor: ['Discrete Manufacturing', 'Omnichannel Retail', 'High-Mix Supply Chains'],
    businessImpact: ['Zero Stockouts', 'Predictive Maintenance', 'Autonomous Scheduling'],
    capabilities: [
      {
        icon: BrainCircuit,
        title: 'Predictive Demand & Safety Stock Engine',
        tag: 'NEURAL FORECASTING',
        desc: 'Machine learning algorithms that predict order volatility and dynamically right-size buffers.',
        route: 'outcomes/ai-decision-making'
      },
      {
        icon: Cpu,
        title: 'Predictive Equipment Health & Anomaly Detection',
        tag: 'IIOT TELEMETRY',
        desc: 'Sensor stream ML models that catch thermal drift and vibration before unplanned downtime.',
        route: 'outcomes/ai-decision-making'
      },
      {
        icon: LineChart,
        title: 'Autonomous Scheduling & Line Optimization',
        tag: 'DISPATCH OPTIMIZER',
        desc: 'Dynamic genetic algorithms that re-sequence job queues when shifts or materials shift.',
        route: 'outcomes/ai-decision-making'
      },
      {
        icon: Crosshair,
        title: 'Computer Vision Automated Inspection',
        tag: 'IN-LINE QUALITY',
        desc: 'Edge AI visual models detecting micro-defects at full line speed with 99.8% precision.',
        route: 'outcomes/ai-decision-making'
      },
      {
        icon: Bot,
        title: 'Operational Copilots & SOP Query Agents',
        tag: 'OPERATOR ASSISTANT',
        desc: 'Domain-trained LLMs providing plant technicians instant troubleshooting procedures.',
        route: 'outcomes/ai-decision-making'
      },
      {
        icon: Target,
        title: 'Dynamic Pricing & Margin Yield Intelligence',
        tag: 'REVENUE PRESERVATION',
        desc: 'Algorithmic models balancing capacity utilization with maximum gross margin per hour.',
        route: 'outcomes/ai-decision-making'
      }
    ]
  },
  'operational-excellence': {
    id: 'operational-excellence',
    name: 'Operational Excellence',
    route: 'outcomes/operational-excellence',
    headline: 'Lean Management Systems & Culture of Continuous Improvement',
    badge: '6 Capabilities',
    metrics: '100% Audited Process Governance',
    recommendedFor: ['Enterprise Global Ops', 'Multi-Site Plants', 'Shared Services'],
    businessImpact: ['Institutionalized Kaizen', 'Cross-Site Parity', 'Sustained EBITDA Gains'],
    capabilities: [
      {
        icon: Compass,
        title: 'Tiered Daily Management System (DMS)',
        tag: 'TIER 1-4 GOVERNANCE',
        desc: 'Structured 15-minute standup cadences from shop floor to executive board with red/green tracking.',
        route: 'outcomes/operational-excellence'
      },
      {
        icon: Layers,
        title: 'Leader Standard Work (LSW) & Gemba Walks',
        tag: 'LEADERSHIP CADENCE',
        desc: 'Systematize executive presence where value is created, auditing key control behaviors daily.',
        route: 'outcomes/operational-excellence'
      },
      {
        icon: Workflow,
        title: 'End-to-End Value Stream Architecture',
        tag: 'FLOW DESIGN',
        desc: 'Comprehensive multi-site mapping linking raw material intake to customer cash realization.',
        route: 'outcomes/operational-excellence'
      },
      {
        icon: CheckCircle2,
        title: 'Kaizen Event Execution & A3 Problem Solving',
        tag: 'RAPID SPRINT',
        desc: 'High-intensity 5-day structured cross-functional workshops delivering immediate 25%+ improvements.',
        route: 'outcomes/operational-excellence'
      },
      {
        icon: Database,
        title: 'Operational Maturity Index (OMI) Audit',
        tag: 'BENCHMARK AUDIT',
        desc: 'Rigorous 100-point diagnostic scoring system benchmarking your operations against industry top quartile.',
        route: 'outcomes/operational-excellence'
      },
      {
        icon: Target,
        title: 'Hoshin Kanri Strategic Policy Deployment',
        tag: 'STRATEGY ALIGNMENT',
        desc: 'Cascade 3-year board objectives into breakthrough targets and monthly frontline metrics.',
        route: 'outcomes/operational-excellence'
      }
    ]
  }
};

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMegaMenu>(null);
  const [activeOutcomeTab, setActiveOutcomeTab] = useState<string>('cost-reduction');
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const selectedOutcome = OUTCOMES_STRUCTURED_DATA[activeOutcomeTab] || OUTCOMES_STRUCTURED_DATA['cost-reduction'];

  // Clear dropdown timer on unmount & handle outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (menu: ActiveMegaMenu) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 220);
  };

  const handleNavClick = (route: string, label?: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(null);
    setMobileMenuOpen(false);

    const currentPage = window.location.hash.replace(/^#/, '') || '/';
    const destination = `/${route}`;
    const menuLabel = label ?? route;

    analytics.trackNavClick(menuLabel, currentPage, destination);
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCtaClick = (ctaName: string, route: string) => {
    const currentPage = window.location.hash.replace(/^#/, '') || '/';
    analytics.trackCtaClick(ctaName, currentPage);
    handleNavClick(route, ctaName);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all">
      <div className="vyntra-container relative" ref={navContainerRef}>
        <div className="flex items-center justify-between h-20">

          {/* LEFT: BRAND MONOGRAM & IDENTITY */}
          <div
            onClick={() => handleNavClick('outcomes', 'VYNTRA Logo Nav')}
            className="cursor-pointer py-1 flex-shrink-0 group flex items-center gap-2"
          >
            <VyntraLogo size="md" showTagline={true} lightMode={true} />
          </div>

          {/* DESKTOP MEGA-MENU NAVIGATION BAR */}
          <nav className="hidden xl:flex items-center gap-2">
            
            {/* 1. OUTCOMES MEGA MENU */}
            <div>
              <button
                onClick={() => handleNavClick('outcomes', 'Outcomes Hub')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-semibold tracking-tight transition-colors rounded-lg cursor-pointer ${
                  activeMenu === 'outcomes' || currentRoute.startsWith('outcomes')
                    ? 'text-blue-600 bg-blue-50/90'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
                onMouseEnter={() => handleMouseEnter('outcomes')}
                onMouseLeave={handleMouseLeave}
              >
                <span>Outcomes</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'outcomes' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {activeMenu === 'outcomes' && (
                <div 
                  className="hidden xl:block fixed left-0 right-0 top-20 z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
                  onMouseEnter={() => handleMouseEnter('outcomes')}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Backdrop overlay (invisible click-catcher, no blur) */}
                  <div 
                    className="fixed inset-0 -z-10" 
                    onClick={() => setActiveMenu(null)}
                  />

                  {/* Centered container with responsive margins */}
                  <div className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 ring-1 ring-slate-900/5 overflow-hidden flex flex-col">
                      
                      {/* Two-Column Flex Layout */}
                      <div className="flex flex-col lg:flex-row items-stretch">
                        
                        {/* ASIDE: LEFT CATEGORIES (w-[260px] xl:w-[275px]) */}
                        <aside className="w-full lg:w-[260px] xl:w-[275px] bg-slate-50/95 text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between shrink-0 border-r border-slate-200/80">
                          <div className="space-y-2">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-600 block">
                                TRANSFORMATION ARCHITECTURE
                              </span>
                              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading tracking-tight mt-0.5">
                                Outcomes
                              </h2>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                                Board-level financial &amp; operational realization across 6 core practices.
                              </p>
                            </div>

                            <nav className="pt-0.5 space-y-1">
                              {Object.values(OUTCOMES_STRUCTURED_DATA).map((item) => {
                                const isSelected = activeOutcomeTab === item.id;
                                return (
                                  <div
                                    key={item.id}
                                    onMouseEnter={() => setActiveOutcomeTab(item.id)}
                                    onClick={() => handleNavClick(item.route, `${item.name} Nav`)}
                                    className={`w-full group px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-between cursor-pointer border ${
                                      isSelected
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/25'
                                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/90 border-transparent'
                                    }`}
                                  >
                                    <span className="truncate block text-xs font-bold tracking-tight">
                                      {item.name}
                                    </span>
                                    <ChevronRight
                                      className={`w-3.5 h-3.5 transition-transform duration-150 shrink-0 ${
                                        isSelected ? 'text-white translate-x-0.5' : 'text-slate-400 group-hover:text-blue-600'
                                      }`}
                                    />
                                  </div>
                                );
                              })}
                            </nav>
                          </div>

                          <div className="pt-2 border-t border-slate-200/70 mt-3">
                            <button
                              onClick={() => handleNavClick('outcomes', 'View All Outcomes')}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
                            >
                              <span>View All Outcomes</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </aside>

                        {/* MAIN: RIGHT CAPABILITIES MATRIX */}
                        <main className="flex-1 bg-white p-3 sm:p-4 flex flex-col justify-between">
                          <div className="space-y-2">
                            
                            {/* Capabilities Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-1.5 shrink-0">
                              <div>
                                <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                                  OFFERING CAPABILITIES
                                </span>
                                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading tracking-tight">
                                  {selectedOutcome.name}
                                </h3>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
                                  {selectedOutcome.capabilities.length} Items
                                </span>
                                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60">
                                  {selectedOutcome.metrics}
                                </span>
                              </div>
                            </div>

                            {/* 6 Capabilities In 2-Column Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 content-start">
                              {selectedOutcome.capabilities.map((cap, idx) => {
                                const CapIcon = cap.icon;
                                return (
                                  <div
                                    key={idx}
                                    onClick={() => handleNavClick(cap.route, `${cap.title} Nav`)}
                                    className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-blue-600 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                      <CapIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div>
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                            {cap.title}
                                          </span>
                                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
                                            {cap.tag}
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                          {cap.desc}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                          </div>

                          {/* Recommended For & Business Impact Bar */}
                          <div className="mt-2.5 p-2.5 px-3 rounded-xl bg-blue-50/40 border border-blue-100/80 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs shrink-0">
                            <div className="space-y-0.5 text-[11px] text-slate-600">
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                <span className="font-bold text-slate-800">Recommended For:</span>
                                {selectedOutcome.recommendedFor.map((rec, i) => (
                                  <span key={i} className="inline-flex items-center gap-1 font-medium text-slate-700">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span>{rec}</span>
                                    {i < selectedOutcome.recommendedFor.length - 1 && (
                                      <span className="text-slate-300">•</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                <span className="font-bold text-slate-800">Business Impact:</span>
                                {selectedOutcome.businessImpact.map((imp, i) => (
                                  <span key={i} className="inline-flex items-center gap-1 font-medium text-slate-700">
                                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                    <span>{imp}</span>
                                    {i < selectedOutcome.businessImpact.length - 1 && (
                                      <span className="text-slate-300">•</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={() => handleNavClick(selectedOutcome.route, `Explore Architecture ${selectedOutcome.name}`)}
                              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                            >
                              <span>Explore Architecture</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>

                        </main>

                      </div>

                      {/* Bottom Global Banner */}
                      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-slate-700 text-xs">
                          Want to understand how we would approach your business challenge?
                        </span>
                        <button
                          onClick={() => handleCtaClick('Nav Bottom Discovery Call', 'book-discovery-call')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Schedule an Introductory Call</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. OFFERINGS MEGA MENU */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('offerings')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('services', 'Offerings Hub')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-semibold tracking-tight transition-colors rounded-lg cursor-pointer ${
                  activeMenu === 'offerings' || currentRoute === 'services'
                    ? 'text-blue-600 bg-blue-50/90'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>Offerings</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'offerings' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {activeMenu === 'offerings' && (
                <div 
                  className="hidden xl:block fixed left-0 right-0 top-16 lg:top-20 z-40 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
                  onMouseEnter={() => handleMouseEnter('offerings')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div 
                    className="fixed inset-0 -z-10" 
                    onClick={() => setActiveMenu(null)}
                  />

                  <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pt-1">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 ring-1 ring-slate-900/5 overflow-hidden flex flex-col">
                      
                      <div className="flex flex-col lg:flex-row items-stretch">
                        
                        {/* ASIDE: LEFT CONSULTING PILLARS */}
                        <aside className="w-full lg:w-[260px] xl:w-[275px] bg-slate-50/95 text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between shrink-0 border-r border-slate-200/80">
                          <div className="space-y-2">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-600 block">
                                PRACTICE SPECIALIZATION
                              </span>
                              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading tracking-tight mt-0.5">
                                Offerings
                              </h2>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                                Four core transformation advisory practices engineered for measurable P&amp;L impact.
                              </p>
                            </div>

                            <nav className="pt-0.5 space-y-1">
                              {[
                                { id: 'op-ex', name: 'Operational Excellence', route: 'services' },
                                { id: 'data-analytics', name: 'Data & Analytics', route: 'services' },
                                { id: 'ai-transform', name: 'AI Transformation', route: 'services' },
                                { id: 'digital-transform', name: 'Digital Transformation', route: 'services' }
                              ].map((practice, pIdx) => (
                                <div
                                  key={practice.id}
                                  onClick={() => handleNavClick(practice.route, `${practice.name} Nav`)}
                                  className={`w-full group px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-between cursor-pointer border ${
                                    pIdx === 0
                                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/25'
                                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/90 border-transparent'
                                  }`}
                                >
                                  <span className="truncate block text-xs font-bold tracking-tight">
                                    {practice.name}
                                  </span>
                                  <ChevronRight
                                    className={`w-3.5 h-3.5 transition-transform duration-150 shrink-0 ${
                                      pIdx === 0 ? 'text-white translate-x-0.5' : 'text-slate-400 group-hover:text-blue-600'
                                    }`}
                                  />
                                </div>
                              ))}
                            </nav>
                          </div>

                          <div className="pt-2 border-t border-slate-200/70 mt-3">
                            <button
                              onClick={() => handleNavClick('services', 'View All Practices')}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
                            >
                              <span>View All Consulting Practices</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </aside>

                        {/* MAIN: 4 PRACTICES IN BALANCED GRID */}
                        <main className="flex-1 bg-white p-3 sm:p-4 flex flex-col justify-between">
                          <div className="space-y-2">
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-1.5 shrink-0">
                              <div>
                                <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                                  PRACTICE DOMAINS
                                </span>
                                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading tracking-tight">
                                  Full-Spectrum Operational Advisory &amp; Deployment
                                </h3>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
                                  4 Pillars
                                </span>
                                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60">
                                  Target Operating Model
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              <div
                                onClick={() => handleNavClick('services', 'Operational Excellence Practice')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-blue-600 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Layers className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                      Operational Excellence
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
                                      LEAN SIX SIGMA
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Process diagnostics, Lean Six Sigma deployment, improvement roadmaps, and continuous improvement programs.
                                  </p>
                                </div>
                              </div>

                              <div
                                onClick={() => handleNavClick('services', 'Data Analytics Practice')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-emerald-600 group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Database className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                                      Data &amp; Analytics
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
                                      BI &amp; TELEMETRY
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Audited KPI management, operational BI architectures, variance telemetry, and predictive modeling.
                                  </p>
                                </div>
                              </div>

                              <div
                                onClick={() => handleNavClick('services', 'AI Transformation Practice')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-indigo-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Bot className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                                      AI Transformation
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0">
                                      AGENTIC WORKFLOWS
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    AI readiness diagnostics, high-ROI opportunity discovery, intelligent automation, and process optimization.
                                  </p>
                                </div>
                              </div>

                              <div
                                onClick={() => handleNavClick('services', 'Digital Transformation Practice')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-cyan-600 group-hover:bg-cyan-600 group-hover:border-cyan-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Cpu className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors truncate">
                                      Digital Transformation
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-cyan-600 transition-colors shrink-0">
                                      STP &amp; MODERNIZATION
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Target operating model design, paperless STP digitization, smart operations, and maturity audits.
                                  </p>
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="mt-2.5 p-2.5 px-3 rounded-xl bg-blue-50/40 border border-blue-100/80 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs shrink-0">
                            <div className="space-y-0.5 text-[11px] text-slate-600">
                              <span className="font-bold text-slate-800">Engagement Framework:</span>
                              <span className="text-slate-600 ml-1.5">
                                Fixed-fee diagnostics • Value verification milestones • Audited P&amp;L impact
                              </span>
                            </div>

                            <button
                              onClick={() => handleNavClick('services', 'Explore All Offerings')}
                              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                            >
                              <span>Explore All Offerings</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>

                        </main>

                      </div>

                      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-slate-700 text-xs">
                          Need an advisory squad deployed to evaluate your operating model?
                        </span>
                        <button
                          onClick={() => handleCtaClick('Offerings Discovery Call', 'book-discovery-call')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Schedule an Introductory Call</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. INDUSTRIES MEGA MENU */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('industries', 'Industries Hub')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-semibold tracking-tight transition-colors rounded-lg cursor-pointer ${
                  activeMenu === 'industries' || currentRoute === 'industries'
                    ? 'text-blue-600 bg-blue-50/90'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>Industries</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'industries' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {activeMenu === 'industries' && (
                <div 
                  className="hidden xl:block fixed left-0 right-0 top-16 lg:top-20 z-40 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
                  onMouseEnter={() => handleMouseEnter('industries')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div 
                    className="fixed inset-0 -z-10" 
                    onClick={() => setActiveMenu(null)}
                  />

                  <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pt-1">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 ring-1 ring-slate-900/5 overflow-hidden flex flex-col">
                      
                      <div className="flex flex-col lg:flex-row items-stretch">
                        
                        {/* ASIDE: LEFT SECTOR PILLARS */}
                        <aside className="w-full lg:w-[260px] xl:w-[275px] bg-slate-50/95 text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between shrink-0 border-r border-slate-200/80">
                          <div className="space-y-2">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-600 block">
                                INDUSTRY PLAYBOOKS
                              </span>
                              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading tracking-tight mt-0.5">
                                Industries
                              </h2>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                                Domain-specific operational excellence and AI deployment models.
                              </p>
                            </div>

                            <nav className="pt-0.5 space-y-1">
                              {[
                                'Manufacturing & Discrete Plants',
                                'Healthcare & Clinical Flow',
                                'Banking & Financial Services',
                                'Retail & Omnichannel E-Com',
                                'Supply Chain & Logistics',
                                'Public Sector & Shared Services'
                              ].map((sectorName, sIdx) => (
                                <div
                                  key={sIdx}
                                  onClick={() => handleNavClick('industries', `${sectorName} Nav`)}
                                  className={`w-full group px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-between cursor-pointer border ${
                                    sIdx === 0
                                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/25'
                                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/90 border-transparent'
                                  }`}
                                >
                                  <span className="truncate block text-xs font-bold tracking-tight">
                                    {sectorName}
                                  </span>
                                  <ChevronRight
                                    className={`w-3.5 h-3.5 transition-transform duration-150 shrink-0 ${
                                      sIdx === 0 ? 'text-white translate-x-0.5' : 'text-slate-400 group-hover:text-blue-600'
                                    }`}
                                  />
                                </div>
                              ))}
                            </nav>
                          </div>

                          <div className="pt-2 border-t border-slate-200/70 mt-3">
                            <button
                              onClick={() => handleNavClick('industries', 'View All Industries')}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
                            >
                              <span>View All Industry Solutions</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </aside>

                        {/* MAIN: 6 SECTOR CARDS IN 2-COLUMN GRID */}
                        <main className="flex-1 bg-white p-3 sm:p-4 flex flex-col justify-between">
                          <div className="space-y-2">
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-1.5 shrink-0">
                              <div>
                                <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                                  SECTOR SOLUTIONS
                                </span>
                                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading tracking-tight">
                                  Domain-Calibrated Operational Excellence
                                </h3>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
                                  6 Sectors
                                </span>
                                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60">
                                  Regulatory &amp; Compliance Calibrated
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 content-start">
                              <div
                                onClick={() => handleNavClick('industries', 'Manufacturing Nav')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-blue-600 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Building2 className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                      Manufacturing &amp; Automotive
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
                                      OEE &amp; COPQ
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Smart factory telemetry, thermal drift stabilization, scrap containment, and rapid SMED setups.
                                  </p>
                                </div>
                              </div>

                              <div
                                onClick={() => handleNavClick('industries', 'Healthcare Nav')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-emerald-600 group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Stethoscope className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                                      Healthcare &amp; Life Sciences
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
                                      PATIENT FLOW
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Operating room turnover acceleration, ED wait-time triage, and clinical staff scheduling models.
                                  </p>
                                </div>
                              </div>

                              <div
                                onClick={() => handleNavClick('industries', 'Banking FinServ Nav')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-amber-600 group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Landmark className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                                      Banking &amp; Financial Services
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-600 transition-colors shrink-0">
                                      STP DIGITIZATION
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Straight-through loan processing, KYC customer onboarding velocity, and operational risk mitigation.
                                  </p>
                                </div>
                              </div>

                              <div
                                onClick={() => handleNavClick('industries', 'Retail E-Commerce Nav')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-rose-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-rose-600 group-hover:bg-rose-600 group-hover:border-rose-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors truncate">
                                      Retail &amp; Omnichannel E-Com
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-rose-600 transition-colors shrink-0">
                                      VELOCITY &amp; CSAT
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Micro-fulfillment node velocity, multi-echelon buffer replenishment, and stockout eradication.
                                  </p>
                                </div>
                              </div>

                              <div
                                onClick={() => handleNavClick('industries', 'Supply Chain Nav')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-indigo-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Truck className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                                      Supply Chain &amp; Logistics
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0">
                                      NETWORK CADENCE
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Freight lane optimization, dynamic cross-docking scheduling, and terminal throughput modeling.
                                  </p>
                                </div>
                              </div>

                              <div
                                onClick={() => handleNavClick('industries', 'Public Sector Nav')}
                                className="group p-3 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-cyan-400 hover:shadow-xs transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-cyan-600 group-hover:bg-cyan-600 group-hover:border-cyan-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                                  <Building className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors truncate">
                                      Public Sector &amp; Services
                                    </span>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-cyan-600 transition-colors shrink-0">
                                      BACKLOG RESOLUTION
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 group-hover:text-slate-600">
                                    Citizen journey digitization, agency backlog elimination, and cross-departmental Lean operations.
                                  </p>
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="mt-2.5 p-2.5 px-3 rounded-xl bg-blue-50/40 border border-blue-100/80 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs shrink-0">
                            <div className="space-y-0.5 text-[11px] text-slate-600">
                              <span className="font-bold text-slate-800">Industry Deliverables:</span>
                              <span className="text-slate-600 ml-1.5">
                                Compliance-tested blueprints • Benchmark operating metrics • Zero regulatory disruption
                              </span>
                            </div>

                            <button
                              onClick={() => handleNavClick('industries', 'Explore All Industries')}
                              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                            >
                              <span>Explore All Industries</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>

                        </main>

                      </div>

                      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-slate-700 text-xs">
                          Need an industry-specialized transformation advisory team?
                        </span>
                        <button
                          onClick={() => handleCtaClick('Industries Discovery Call', 'book-discovery-call')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Schedule an Introductory Call</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. USE CASES DIRECT LINK */}
            <button
              onClick={() => handleNavClick('usecases', 'Use Cases')}
              className={`px-4 py-2.5 text-[14px] font-semibold tracking-tight transition-colors rounded-lg cursor-pointer whitespace-nowrap ${
                currentRoute === 'usecases'
                  ? 'text-blue-600 bg-blue-50/90 font-bold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Use Cases
            </button>

            {/* 5. TOOLS & ASSESSMENTS MEGA MENU */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('tools')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-semibold tracking-tight transition-colors rounded-lg cursor-pointer ${
                  activeMenu === 'tools' || ['calculator', 'vsm', 'simulator'].includes(currentRoute)
                    ? 'text-blue-600 bg-blue-50/90 font-bold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'tools' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {activeMenu === 'tools' && (
                <div 
                  className="absolute left-0 top-full pt-4 w-[660px] -ml-40 z-50 pointer-events-auto"
                  onMouseEnter={() => handleMouseEnter('tools')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl ring-1 ring-slate-900/10 space-y-4 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-mono tracking-widest text-blue-600 uppercase font-bold">Consulting Accelerators</span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">Rapid Diagnostic Instruments &amp; Simulators</h4>
                      </div>
                      <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md font-mono font-semibold">Interactive</span>
                    </div>

                    <div
                      onClick={() => handleNavClick('calculator', 'Lean Sigma Calculator Nav')}
                      className="p-4.5 rounded-2xl hover:bg-blue-50/50 cursor-pointer transition-all flex items-start gap-4 border border-slate-150 hover:border-blue-200 hover:shadow-md group"
                    >
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex-shrink-0 mt-0.5">
                        <FileSpreadsheet className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h5 className="text-[14px] font-bold text-slate-900 group-hover:text-blue-600">Lean Six Sigma Calculator</h5>
                          <span className="text-[9.5px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">DPMO &amp; COPQ</span>
                        </div>
                        <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Quantify scrap cost, DPMO, First Pass Yield, and labor hour payback in real time.</p>
                      </div>
                    </div>

                    <div
                      onClick={() => handleNavClick('vsm', 'Value Stream Mapping Nav')}
                      className="p-4.5 rounded-2xl hover:bg-indigo-50/50 cursor-pointer transition-all flex items-start gap-4 border border-slate-150 hover:border-indigo-200 hover:shadow-md group"
                    >
                      <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex-shrink-0 mt-0.5">
                        <Workflow className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h5 className="text-[14px] font-bold text-slate-900 group-hover:text-indigo-600">Value Stream Mapping Analytics</h5>
                          <span className="text-[9.5px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">8-Waste &amp; PCE</span>
                        </div>
                        <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Calculate Takt time, Process Cycle Efficiency, and locate multi-workcell bottleneck limits.</p>
                      </div>
                    </div>

                    <div
                      onClick={() => handleNavClick('simulator', 'Value Stream Simulator Nav')}
                      className="p-4.5 rounded-2xl hover:bg-emerald-50/50 cursor-pointer transition-all flex items-start gap-4 border border-slate-150 hover:border-emerald-200 hover:shadow-md group"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex-shrink-0 mt-0.5">
                        <Activity className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h5 className="text-[14px] font-bold text-slate-900 group-hover:text-emerald-600">Discrete-Event Flow Simulator</h5>
                          <span className="text-[9.5px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">Queue &amp; WIP</span>
                        </div>
                        <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">Simulate stochastic production runs, starvation, blocking, and WIP accumulation dynamics.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. ABOUT LINK */}
            <button
              onClick={() => handleNavClick('about', 'About Us')}
              className={`px-4 py-2.5 text-[14px] font-semibold tracking-tight transition-colors rounded-lg cursor-pointer ${
                currentRoute === 'about'
                  ? 'text-blue-600 bg-blue-50/90 font-bold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              About
            </button>
          </nav>

          {/* DESKTOP RIGHT CALL-TO-ACTIONS */}
          <div className="hidden lg:flex items-center gap-3.5 flex-shrink-0">
            {/* Quick Diagnostic Accelerator Trigger */}
            <button
              onClick={() => handleCtaClick('Nav Diagnostic Tool', 'calculator')}
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              <span>Diagnostic Tools</span>
            </button>

            {/* High-Intent Executive Discovery Call */}
            <button
              onClick={() => handleCtaClick('Nav Book Discovery', 'contact')}
              className="btn-vyntra-navy text-xs py-2.5 px-4.5 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Book Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => handleCtaClick('Mobile Consult CTA', 'contact')}
              className="btn-vyntra-navy text-xs py-1.5 px-3"
            >
              Consultation
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 sm:px-6 pt-4 pb-8 space-y-5 shadow-lg animate-in fade-in duration-150">
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Transformation Outcomes
            </p>
            {[
              { label: 'Cost Reduction & Waste Elimination', route: 'outcomes/cost-reduction' },
              { label: 'Productivity & Capacity Improvement', route: 'outcomes/productivity-improvement' },
              { label: 'Quality Excellence & Process Sigma', route: 'outcomes/quality-excellence' },
              { label: 'Customer Experience & Journey Optimization', route: 'outcomes/customer-experience' },
              { label: 'AI-Powered Decision Intelligence', route: 'outcomes/ai-decision-making' },
              { label: 'Operational Excellence & Lean Management', route: 'outcomes/operational-excellence' }
            ].map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route, item.label)}
                className={`w-full text-left px-3.5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  currentRoute === item.route
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Practice Areas &amp; Discovery
            </p>
            {[
              { label: 'Consulting Practices (Services)', route: 'services' },
              { label: 'Industry Verticals', route: 'industries' },
              { label: 'Evidence & Use Cases', route: 'usecases' },
              { label: 'About VYNTRA', route: 'about' },
              { label: 'Book Discovery Consultation', route: 'contact' }
            ].map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route, item.label)}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Consulting Accelerators
            </p>
            <div className="space-y-1.5">
              <button
                onClick={() => handleNavClick('calculator', 'Lean Sigma Calculator Mobile')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  Lean Six Sigma Calculator
                </span>
                <span className="text-[10px] font-mono text-slate-400">DPMO &amp; COPQ</span>
              </button>
              <button
                onClick={() => handleNavClick('vsm', 'Value Stream Mapping Mobile')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Workflow className="w-4 h-4 text-indigo-600" />
                  Value Stream Mapping Canvas
                </span>
                <span className="text-[10px] font-mono text-slate-400">8-Waste &amp; PCE</span>
              </button>
              <button
                onClick={() => handleNavClick('simulator', 'Value Stream Simulator Mobile')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Value Stream Flow Simulator
                </span>
                <span className="text-[10px] font-mono text-slate-400">Discrete Queue</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
