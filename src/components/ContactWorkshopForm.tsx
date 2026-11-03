import React, { useState } from 'react';
import { analytics } from '../services/analyticsService';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building,
  Mail,
  User,
  Briefcase,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactWorkshopForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    organization: '',
    jobTitle: '',
    industry: 'Manufacturing & Industrial',
    areaOfInterest: 'AI Value Discovery',
    businessChallenge: '',
    preferredContactMethod: 'Email',
    consentPrivacy: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.workEmail.trim() || !formData.workEmail.includes('@')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }
    if (!formData.organization.trim()) {
      setErrorMsg('Please provide your organization or company name.');
      return;
    }
    if (!formData.consentPrivacy) {
      setErrorMsg('Please acknowledge and consent to the privacy policy.');
      return;
    }

    // Prevent duplicate submits
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Send to Google Apps Script webhook and await the real response
    const result = await analytics.trackContactLeadAsync({
      name:              formData.fullName,
      email:             formData.workEmail,
      organization:      formData.organization,
      role:              formData.jobTitle,
      industry:          formData.industry,
      areaOfInterest:    formData.areaOfInterest,
      businessChallenge: formData.businessChallenge,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMsg(result.errorMessage ?? 'Submission failed. Please try again.');
      return;
    }

    // Success
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore confetti errors
    }
    if (onSuccess) onSuccess();
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center max-w-lg mx-auto">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#0B1220] mb-2">
          Discovery Workshop Request Received
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Thank you, <strong>{formData.fullName}</strong>. Our AI Value Engineering practice lead will review your operational focus area (<strong>{formData.areaOfInterest}</strong>) and contact you at <strong>{formData.workEmail}</strong> within one business day.
        </p>
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 font-mono text-left space-y-1">
          <p><strong>Tracking Reference:</strong> VYN-VAL-{(Math.random() * 1000000).toFixed(0)}</p>
          <p><strong>Organization:</strong> {formData.organization}</p>
          <p><strong>Area:</strong> {formData.areaOfInterest}</p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary text-xs mt-6"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
      
      {errorMsg && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              required
              placeholder="e.g. Dr. Eleanor Vance"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Work Email *
          </label>
          <input
            type="email"
            name="workEmail"
            required
            placeholder="eleanor@enterprise.com"
            value={formData.workEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Organization / Company *
          </label>
          <input
            type="text"
            name="organization"
            required
            placeholder="e.g. Global Powertrain Ltd"
            value={formData.organization}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Job Title (Optional)
          </label>
          <input
            type="text"
            name="jobTitle"
            placeholder="e.g. VP Operations / Plant Director"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Industry Sector
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>Manufacturing & Industrial</option>
            <option>Automotive & EV</option>
            <option>Energy & Utilities</option>
            <option>Healthcare & Life Sciences</option>
            <option>Financial Services</option>
            <option>Technology & Telecom</option>
            <option>Supply Chain & Logistics</option>
            <option>Retail & Consumer</option>
            <option>Public Sector</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Area of Interest
          </label>
          <select
            name="areaOfInterest"
            value={formData.areaOfInterest}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>AI Value Discovery</option>
            <option>AI Value Engineering</option>
            <option>AI Value Delivery</option>
            <option>AI Value Optimization</option>
            <option>Lean Sigma Calculator</option>
            <option>Value Stream Mapping</option>
            <option>Value Stream Simulation</option>
            <option>Manufacturing AI & Agentic Systems</option>
            <option>Other Operational Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Operational Challenge or Objectives (Optional)
        </label>
        <textarea
          name="businessChallenge"
          rows={3}
          placeholder="Briefly describe your current process constraints, cycle time challenges, or AI transformation goals..."
          value={formData.businessChallenge}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          id="consentPrivacy"
          name="consentPrivacy"
          checked={formData.consentPrivacy}
          onChange={handleChange}
          className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
        />
        <label htmlFor="consentPrivacy" className="text-xs text-slate-600 leading-normal">
          I consent to having VYNTRA process my contact information in accordance with enterprise confidentiality standards. No data will be shared with third parties.
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-vyntra-navy py-3 text-sm flex items-center justify-center gap-2 font-bold shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span>Sending to VYNTRA...</span>
          </>
        ) : (
          <>
            <span>Schedule Discovery Workshop</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
        <span>Enterprise Confidentiality & Non-Disclosure Compliant</span>
      </div>

    </form>
  );
};
