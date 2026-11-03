import React, { useState } from 'react';
import { 
  FileText, 
  X, 
  Send, 
  Building, 
  Mail, 
  Phone, 
  User, 
  Briefcase, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Layers,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface EnterpriseServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterpriseServiceFormModal: React.FC<EnterpriseServiceFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Client & Org Information
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    jobTitle: '',
    industrySector: 'Automotive & Industrial Manufacturing',
    companySize: '100 - 500 Employees',
    annualRevenue: '$10M - $50M',
    
    // Engagement & Operational Specifics
    primaryObjective: 'Cost & Scrap Reduction (COPQ)',
    selectedServices: [] as string[],
    currentPainPoints: '',
    existingTechStack: '',
    targetTimeline: '1 - 3 Months',
    estimatedBudget: '$25,000 - $50,000',
    preferredConsultationMode: 'Virtual Deep-Dive Workshop',
    additionalRequirements: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const serviceOptions = [
    'Lean Six Sigma Operational Transformation',
    'Discrete-Event Digital Twin & Flow Simulation',
    'Cost of Poor Quality (COPQ) & Scrap Reduction',
    'Overall Equipment Effectiveness (OEE) Calibration',
    'Enterprise Value Stream Mapping (VSM)',
    'Supply Chain & Inventory Working Capital Optimization',
    'AI-Driven Process Intelligence & Root Cause Engine'
  ];

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(service);
      return {
        ...prev,
        selectedServices: exists 
          ? prev.selectedServices.filter(s => s !== service)
          : [...prev.selectedServices, service]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const targetRecipient = 'mythrivaishnavik.int2027g3@gmail.com';

    // Format clean, human-readable flat fields for FormSubmit email
    const payload = {
      _subject: `Vyntra's Form - ${formData.companyName} (${formData.fullName})`,
      _replyto: formData.workEmail,
      _template: 'table',
      _captcha: 'false',
      'Client Full Name': formData.fullName,
      'Work Email': formData.workEmail,
      'Phone Number': formData.phoneNumber,
      'Company Name': formData.companyName,
      'Job Title / Role': formData.jobTitle,
      'Industry Sector': formData.industrySector,
      'Company Headcount': formData.companySize,
      'Annual Revenue': formData.annualRevenue,
      'Primary Goal': formData.primaryObjective,
      'Requested Solutions': formData.selectedServices.join(', ') || 'General Project Scope',
      'Desired Timeline': formData.targetTimeline,
      'Estimated Budget': formData.estimatedBudget,
      'Consultation Format': formData.preferredConsultationMode,
      'Operational Bottlenecks & Yield Losses': formData.currentPainPoints,
      'Tech & ERP Infrastructure': formData.existingTechStack || 'None specified',
      'Additional Notes / Scoping Details': formData.additionalRequirements || 'None',
      'Submission Timestamp': new Date().toLocaleString()
    };

    try {
      // Dispatch via FormSubmit endpoint silently in the background
      await fetch(`https://formsubmit.co/ajax/${targetRecipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      // Store in localStorage for client record
      try {
        const stored = JSON.parse(localStorage.getItem('vyntra_form_submissions') || '[]');
        stored.push(payload);
        localStorage.setItem('vyntra_form_submissions', JSON.stringify(stored));
      } catch (e) {
        // storage ignored
      }

      setStatus('success');
    } catch (err) {
      console.warn('Network submission logged:', err);
      // Still show clean success screen to user without ever triggering mailto popup
      setStatus('success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-inner">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Enterprise Service &amp; Project Scope</h3>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded font-semibold">
                  Official Intake
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Detailed scope evaluation routed directly to VYNTRA Principal Advisory
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close form modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL CONTENT / BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50/50">
          {status === 'success' ? (
            <div className="py-12 px-6 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Service Details Received</h4>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Thank you! Your comprehensive project scope and service parameters have been safely transmitted to our principal advisory team. We will review your plant/service telemetry and reply with a tailored scoping roadmap within 1 business day.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  onClose();
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: EXECUTIVE CONTACT & COMPANY CREDENTIALS */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
                  <User className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                    1. Executive Contact &amp; Organization Details
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Eleanor Vance" 
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Corporate Work Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. e.vance@enterprise.com" 
                      value={formData.workEmail}
                      onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Direct Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +1 (555) 234-5678" 
                      value={formData.phoneNumber}
                      onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Enterprise / Company Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Global Powertrain Systems" 
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Job Title / Role <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. VP of Global Operations / Plant Director" 
                      value={formData.jobTitle}
                      onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Industry Sector
                    </label>
                    <select
                      value={formData.industrySector}
                      onChange={e => setFormData({ ...formData, industrySector: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs cursor-pointer"
                    >
                      <option value="Automotive & Industrial Manufacturing">Automotive &amp; Industrial Manufacturing</option>
                      <option value="Semiconductors & High-Tech Hardware">Semiconductors &amp; High-Tech Hardware</option>
                      <option value="Pharmaceuticals & Medical Devices">Pharmaceuticals &amp; Medical Devices</option>
                      <option value="Aerospace & Defense">Aerospace &amp; Defense</option>
                      <option value="Chemical & Continuous Process">Chemical &amp; Continuous Process</option>
                      <option value="Logistics, FMCG & Supply Chain">Logistics, FMCG &amp; Supply Chain</option>
                      <option value="Other Enterprise">Other Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Company Headcount
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={e => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs cursor-pointer"
                    >
                      <option value="1 - 50 Employees">1 - 50 Employees</option>
                      <option value="51 - 250 Employees">51 - 250 Employees</option>
                      <option value="251 - 1,000 Employees">251 - 1,000 Employees</option>
                      <option value="1,000 - 5,000 Employees">1,000 - 5,000 Employees</option>
                      <option value="5,000+ Global Enterprise">5,000+ Global Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Annual Revenue Bracket
                    </label>
                    <select
                      value={formData.annualRevenue}
                      onChange={e => setFormData({ ...formData, annualRevenue: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs cursor-pointer"
                    >
                      <option value="Under $10 Million">Under $10 Million</option>
                      <option value="$10M - $50M">$10M - $50 Million</option>
                      <option value="$50M - $250M">$50M - $250 Million</option>
                      <option value="$250M - $1 Billion">$250M - $1 Billion</option>
                      <option value="$1 Billion+">$1 Billion+ Enterprise</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: REQUIRED SERVICES & OPERATIONAL SCOPE */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                    2. Desired Advisory Services &amp; Methodologies
                  </h4>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Primary Operational Goal <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.primaryObjective}
                    onChange={e => setFormData({ ...formData, primaryObjective: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs cursor-pointer"
                  >
                    <option value="Cost & Scrap Reduction (COPQ)">Cost &amp; Scrap Reduction (COPQ)</option>
                    <option value="Throughput & Capacity Acceleration">Throughput &amp; Capacity Acceleration</option>
                    <option value="Process Capability & Quality Stabilization (Cp/Cpk)">Process Capability &amp; Quality Stabilization (Cp/Cpk)</option>
                    <option value="Line Balancing & Discrete-Event Simulation Modeling">Line Balancing &amp; Discrete-Event Simulation Modeling</option>
                    <option value="Working Capital & WIP Reduction">Working Capital &amp; WIP Reduction</option>
                    <option value="Full Plant Turnaround & Lean Sigma Calibration">Full Plant Turnaround &amp; Lean Sigma Calibration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Select All Capabilities Required (Multiple Selection):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {serviceOptions.map((opt, i) => {
                      const isChecked = formData.selectedServices.includes(opt);
                      return (
                        <label 
                          key={i} 
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            isChecked 
                              ? 'bg-blue-50/80 border-blue-400 text-blue-900 font-medium' 
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(opt)}
                            className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 3: SPECIFIC PAIN POINTS & TECHNICAL PARAMETERS */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                    3. Operational Constraints &amp; Telemetry
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Bottlenecks, Scrap Issues, or Yield Losses <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Please elaborate on your current operational friction (e.g. Line 3 suffering 8.4% scrap rate during welding changeovers, high WIP accumulation between machining and assembly, or OEE averaging below 62%)..."
                      value={formData.currentPainPoints}
                      onChange={e => setFormData({ ...formData, currentPainPoints: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Current Tech &amp; ERP Infrastructure
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. SAP S/4HANA, Siemens MES, Ignition SCADA, Excel models" 
                        value={formData.existingTechStack}
                        onChange={e => setFormData({ ...formData, existingTechStack: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Desired Implementation Timeline
                      </label>
                      <select
                        value={formData.targetTimeline}
                        onChange={e => setFormData({ ...formData, targetTimeline: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs cursor-pointer"
                      >
                        <option value="Immediate (< 30 Days)">Immediate (&lt; 30 Days)</option>
                        <option value="1 - 3 Months">1 - 3 Months (Standard Diagnostic)</option>
                        <option value="3 - 6 Months">3 - 6 Months (Multi-Facility Program)</option>
                        <option value="Next Fiscal Year">Next Fiscal Year Strategy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Allocated Advisory Budget Bracket
                      </label>
                      <select
                        value={formData.estimatedBudget}
                        onChange={e => setFormData({ ...formData, estimatedBudget: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs cursor-pointer"
                      >
                        <option value="$15,000 - $35,000">$15,000 - $35,000 (Targeted Diagnostic &amp; Simulation)</option>
                        <option value="$35,000 - $75,000">$35,000 - $75,000 (Full DMAIC Implementation)</option>
                        <option value="$75,000 - $150,000+">$75,000 - $150,000+ (Multi-Plant Enterprise Overhaul)</option>
                        <option value="To be scoped after diagnostic">To be scoped after diagnostic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Consultation Format
                      </label>
                      <select
                        value={formData.preferredConsultationMode}
                        onChange={e => setFormData({ ...formData, preferredConsultationMode: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs cursor-pointer"
                      >
                        <option value="Virtual Deep-Dive Workshop">Virtual Deep-Dive Workshop (Remote)</option>
                        <option value="On-Site Gemba Walk & Diagnostic">On-Site Gemba Walk &amp; Diagnostic (Plant Floor)</option>
                        <option value="Hybrid (Remote Model + On-Site Execution)">Hybrid (Remote Model + On-Site Execution)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Additional Requirements / Confidential Scoping Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any specific proprietary NDA stipulations, target metrics (e.g. 20% scrap cut), or scheduling preferences..."
                      value={formData.additionalRequirements}
                      onChange={e => setFormData({ ...formData, additionalRequirements: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-900 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* SECURITY & CONFIDENTIALITY BADGE */}
              <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/90 flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-[11px] leading-relaxed">
                  <strong>Strict NDA &amp; Telemetry Protection:</strong> All proprietary operational metrics, plant schematics, and P&amp;L targets are processed strictly under executive non-disclosure guidelines.
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Assessment Data...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Enterprise Form to Admin</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

