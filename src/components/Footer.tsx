import React from 'react';
import { VyntraLogo } from './VyntraLogo';
import { analytics } from '../services/analyticsService';
import { ArrowUpRight, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (route: string, label?: string) => {
    if (label) analytics.trackNavClick(label + ' Footer', window.location.pathname || '/');
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800 text-sm">
      <div className="vyntra-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <VyntraLogo size="lg" showTagline={true} lightMode={false} />
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm pt-2">
              From Complexity to Clarity. VYNTRA unites Lean Six Sigma, industrial analytics, and discrete-event simulation to uncover operational losses, test improvements, and quantify business value.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>S0 Frame → S1 Baseline → S2 Model → S3 Prove → S4 Bank → S5 Assure</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('outcomes', 'Outcomes')} className="hover:text-blue-400 transition-colors text-left">
                  1. Outcomes & KPIs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries', 'Industries')} className="hover:text-blue-400 transition-colors text-left">
                  2. Industries (8 Sectors)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services', 'Services')} className="hover:text-blue-400 transition-colors text-left">
                  3. Value Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('usecases', 'Use Cases')} className="hover:text-blue-400 transition-colors text-left">
                  4. Evidence Use Cases
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about', 'About Us')} className="hover:text-blue-400 transition-colors text-left">
                  5. About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Simulation Tools */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 font-mono">
              Simulation Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('calculator', 'Lean Sigma Calculator')} className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1">
                  <span>Lean Sigma Calculator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('vsm', 'Value Stream Mapping')} className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1">
                  <span>Value Stream Mapping</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('simulator', 'Value Stream Simulator')} className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1">
                  <span>Value Stream Simulator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </li>
            </ul>
          </div>

          {/* Assurance & Intake */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 font-mono">
              Assurance & Intake
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => { analytics.trackCtaClick('Schedule Workshop Footer', window.location.pathname || '/'); handleNav('contact', 'Schedule Workshop'); }}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 font-semibold text-blue-400"
                >
                  <span>Schedule Workshop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <span className="text-slate-500 block text-xs">Deterministic Tier 0 Safety</span>
              </li>
              <li>
                <span className="text-slate-500 block text-xs">Audited P&L Verification</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Tagline & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-mono text-slate-400">
            VYNTRA — <span className="text-slate-300">From Complexity to Clarity.</span>
          </p>
          <div className="flex items-center gap-6">
            <span>Enterprise Confidentiality</span>
            <span>Non-Disclosure Compliant</span>
            <span>© {new Date().getFullYear()} VYNTRA.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
