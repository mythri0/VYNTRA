import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Layers, 
  TrendingUp, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface WelcomeToastProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onOpenFormModal?: () => void;
}

interface RouteIntelligence {
  name: string;
  badge: string;
  insight: string;
  highlight: string;
  suggestedAction?: {
    label: string;
    targetRoute?: string;
    isModal?: boolean;
  };
}

const ROUTE_CONTEXT_MAP: Record<string, RouteIntelligence> = {
  outcomes: {
    name: 'Executive Value Workspace',
    badge: 'Transformation Hub',
    insight: 'Explore real-world industrial impact models and KPI acceleration.',
    highlight: 'Active Focus: Multi-Echelon Margin & OEE Expansion',
    suggestedAction: { label: 'Explore Diagnostic Tools', targetRoute: 'calculator' }
  },
  calculator: {
    name: 'Lean Sigma ROI Calculator',
    badge: 'Interactive Instrument',
    insight: 'Simulate Defect Reductions, Cost-of-Poor-Quality, and Scrap recovery.',
    highlight: 'Ready for parametric scenario modelling',
    suggestedAction: { label: 'Map Value Stream', targetRoute: 'vsm' }
  },
  vsm: {
    name: 'Value Stream Mapping Studio',
    badge: 'Diagnostic Flow',
    insight: 'Visualise bottlenecks, cycle times, lead latency, and non-value-add steps.',
    highlight: 'Cycle Time vs Takt Analysis Enabled',
    suggestedAction: { label: 'Open Live Simulator', targetRoute: 'simulator' }
  },
  simulator: {
    name: 'Dynamic Operations Simulator',
    badge: 'Real-Time Simulation',
    insight: 'Run predictive line stress tests and buffer sensitivity analyses.',
    highlight: 'Monte Carlo throughput modeling activated',
    suggestedAction: { label: 'Book Advisory Session', targetRoute: 'contact' }
  },
  contact: {
    name: 'Consultation & Discovery Desk',
    badge: 'Advisory Access',
    insight: 'Connect directly with senior operations advisors for scoped scoping.',
    highlight: 'Direct SLA: 24h Response Commitment',
    suggestedAction: { label: 'Fill Scoping Form', isModal: true }
  },
  pricing: {
    name: 'Engagement Framework & Tiers',
    badge: 'Commercial Models',
    insight: 'Inspect diagnostic sprints, enterprise deployments, and pilot options.',
    highlight: 'Transparent Value-Linked Engagements',
    suggestedAction: { label: 'Consult Our Team', targetRoute: 'contact' }
  },
  usecases: {
    name: 'Industry Blueprint Library',
    badge: 'Verified Deployments',
    insight: 'Review production-validated blueprints across discrete manufacturing & logistics.',
    highlight: 'Case Studies: 30%+ Waste Reductions',
    suggestedAction: { label: 'Simulate My Line', targetRoute: 'calculator' }
  },
  about: {
    name: 'About VYNTRA Advisory',
    badge: 'Executive Practice',
    insight: 'Learn about our Lean Six Sigma practitioners, engineering lineage, and methodology.',
    highlight: 'Founded by Industrial Transformation Leaders',
    suggestedAction: { label: 'Connect With Leadership', targetRoute: 'contact' }
  }
};

export const WelcomeToast: React.FC<WelcomeToastProps> = ({
  currentRoute,
  navigate,
  onOpenFormModal
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isReturningUser, setIsReturningUser] = useState<boolean>(false);
  const [visitCount, setVisitCount] = useState<number>(1);
  const [pagesVisitedCount, setPagesVisitedCount] = useState<number>(1);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Initialize and handle visit tracking on mount
  useEffect(() => {
    try {
      const storedVisits = parseInt(localStorage.getItem('vyntra_site_visits') || '0', 10);
      const newVisitCount = storedVisits + 1;
      localStorage.setItem('vyntra_site_visits', newVisitCount.toString());

      if (storedVisits > 0) {
        setIsReturningUser(true);
      } else {
        setIsReturningUser(false);
      }
      setVisitCount(newVisitCount);

      // Show toast after brief natural delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);

      return () => clearTimeout(timer);
    } catch {
      setIsOpen(true);
    }
  }, []);

  // Update page counter whenever route changes
  useEffect(() => {
    try {
      const storedPages = parseInt(sessionStorage.getItem('vyntra_session_page_views') || '0', 10);
      const newPageCount = storedPages + 1;
      sessionStorage.setItem('vyntra_session_page_views', newPageCount.toString());
      setPagesVisitedCount(newPageCount);

      // If user navigated and toast was previously closed or minimized, gently reopen with the new page context
      setIsOpen(true);
      setIsMinimized(false);
    } catch {
      setPagesVisitedCount(prev => prev + 1);
    }
  }, [currentRoute]);

  const cleanRoute = (currentRoute || 'outcomes').toLowerCase().trim();
  const routeContext = ROUTE_CONTEXT_MAP[cleanRoute] || {
    name: cleanRoute.charAt(0).toUpperCase() + cleanRoute.slice(1).replace('-', ' '),
    badge: 'Active Exploration',
    insight: 'Explore VYNTRA operations intelligence, diagnostics, and value stream accelerators.',
    highlight: 'Tailored for Operational Leaders'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-3 sm:right-5 z-50 max-w-[310px] w-full transition-all duration-300 animate-in fade-in slide-in-from-top-3">
      <div className="bg-white/95 backdrop-blur-md text-slate-800 rounded-xl p-3 shadow-xl border border-slate-200/90 ring-1 ring-slate-900/5">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              isReturningUser 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-emerald-600 text-white shadow-sm'
            }`}>
              {isReturningUser ? (
                <RotateCcw className="w-3.5 h-3.5" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold tracking-wider uppercase text-blue-600 font-mono">
                  {isReturningUser ? `Visit #${visitCount}` : 'First Session'}
                </span>
                <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono border border-slate-200">
                  Pg {pagesVisitedCount}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                {isReturningUser ? 'Welcome back!' : 'Welcome to VYNTRA!'}
              </h4>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded hover:bg-slate-100 transition-colors cursor-pointer text-xs font-mono"
              title={isMinimized ? 'Expand' : 'Collapse'}
            >
              {isMinimized ? '+' : '−'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-rose-600 p-0.5 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close welcome banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Context Body (Collapsible) */}
        {!isMinimized && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-2 text-xs">
            {/* Dynamic Page Indicator */}
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-200/80">
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-blue-600" />
                  <span className="truncate max-w-[170px]">{routeContext.name}</span>
                </span>
                <span className="text-[8.5px] font-mono font-semibold text-blue-700 bg-blue-100/70 border border-blue-200 px-1.5 py-0.2 rounded shrink-0">
                  {routeContext.badge}
                </span>
              </div>
              <p className="text-[10.5px] text-slate-600 leading-relaxed">
                {routeContext.insight}
              </p>
            </div>

            {/* Live Highlight Bar */}
            <div className="flex items-center gap-1.5 text-[10.5px] text-slate-700 font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{routeContext.highlight}</span>
            </div>

            {/* Quick Action Link */}
            {routeContext.suggestedAction && (
              <button
                onClick={() => {
                  if (routeContext.suggestedAction?.isModal && onOpenFormModal) {
                    onOpenFormModal();
                  } else if (routeContext.suggestedAction?.targetRoute) {
                    navigate(routeContext.suggestedAction.targetRoute);
                  }
                }}
                className="w-full mt-1.5 py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-1 text-[11px] transition-colors cursor-pointer shadow-sm"
              >
                <span>{routeContext.suggestedAction.label}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}

            {/* Footer Stats Note */}
            <div className="flex items-center justify-between text-[9.5px] text-slate-400 pt-0.5">
              <span>Viewed {pagesVisitedCount} {pagesVisitedCount === 1 ? 'page' : 'pages'}</span>
              <span className="text-blue-600 font-medium font-mono">Live Guide</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

