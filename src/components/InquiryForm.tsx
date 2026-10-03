/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ProjectType, 
  ProjectStage, 
  BudgetRange, 
  Timeline, 
  ContactMethod 
} from '../types';
import { submitProjectInquiry, isFirebaseConfigured } from '../utils/storage';
import { trackEvent } from '../utils/analytics';
import { useRouter } from '../context/RouterContext';
import { 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  Send, 
  Sparkles,
  Database
} from 'lucide-react';

interface InquiryFormProps {
  initialProjectType?: ProjectType;
  initialBudgetRange?: BudgetRange;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ initialProjectType, initialBudgetRange }) => {
  const { navigate } = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hasStarted, setHasStarted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    projectType: (initialProjectType || '') as ProjectType | '',
    otherProjectType: '',
    projectStage: '' as ProjectStage | '',
    name: '',
    company: '',
    email: '',
    preferredContact: 'Email' as ContactMethod,
    description: '',
    budget: '',
    budgetRange: (initialBudgetRange || '') as BudgetRange | '',
    timeline: 'Flexible.' as Timeline,
    existingWebsite: '',
    referenceUrl: ''
  });

  React.useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  React.useEffect(() => {
    if (initialBudgetRange) {
      setFormData((prev) => ({ ...prev, budgetRange: initialBudgetRange }));
    }
  }, [initialBudgetRange]);

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionSource, setSubmissionSource] = useState<'formspree' | 'firestore' | 'local'>('formspree');

  const projectTypes: ProjectType[] = [
    'Business Website',
    'Landing Page',
    'Web Application',
    'Website Redesign',
    'E-commerce Website',
    'UI/UX Design',
    'Website Maintenance',
    'SaaS & Digital Product Development',
    'Other'
  ];

  const projectStages: ProjectStage[] = [
    'I have an idea and need help planning it.',
    'I know what I need and want to begin.',
    'I have an existing website that needs improvement.',
    'I am comparing developers before deciding.'
  ];

  const budgetOptions: BudgetRange[] = [
    'Basic ($299)',
    'Standard ($599)',
    'Premium ($999)',
    'Enterprise ($1,500+)'
  ];

  const formContainerRef = React.useRef<HTMLDivElement>(null);

  const ensureFormInView = () => {
    if (formContainerRef.current) {
      const rect = formContainerRef.current.getBoundingClientRect();
      if (rect.top < 80) {
        const navbarOffset = 90;
        const targetTop = window.pageYOffset + rect.top - navbarOffset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      }
    }
  };

  const timelineOptions: Timeline[] = [
    'As soon as possible.',
    'Within 2–4 weeks.',
    'Within 1–3 months.',
    'Flexible.'
  ];

  const markStarted = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('inquiry_form_start', { step: 1 });
    }
  };

  // Step 1 Validation & Proceed
  const handleStep1Continue = () => {
    const errs: Record<string, string> = {};
    if (!formData.projectType) {
      errs.projectType = 'Please select what type of project you want to build.';
    } else if (formData.projectType === 'Other' && !formData.otherProjectType.trim()) {
      errs.otherProjectType = 'Please specify what you want to build.';
    }

    if (!formData.projectStage) {
      errs.projectStage = 'Please select the current stage of your project.';
    }

    if (!formData.budgetRange) {
      errs.budgetRange = 'Please select a budget or investment tier.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    trackEvent('inquiry_step_complete', { step: 1, projectType: formData.projectType });
    setStep(2);
    ensureFormInView();
  };

  // Step 2 Validation & Proceed
  const handleStep2Continue = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Professional email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    trackEvent('inquiry_step_complete', { step: 2 });
    setStep(3);
    ensureFormInView();
  };

  // Step 3 Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.description.trim()) {
      errs.description = 'Please provide a brief description of what you want to build.';
    } else if (formData.description.trim().length < 15) {
      errs.description = 'Please write at least a couple of sentences so we can understand your requirements.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let fullDescription = formData.description.trim();
      if (formData.projectType === 'Other' && formData.otherProjectType.trim()) {
        fullDescription = `[Custom Project Specification: ${formData.otherProjectType.trim()}]\n\n${fullDescription}`;
      }
      if (formData.budget.trim()) {
        fullDescription = `[Client Specified Budget: ${formData.budget.trim()}]\n\n${fullDescription}`;
      }

      const res = await submitProjectInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        projectType: formData.projectType as ProjectType,
        projectStage: formData.projectStage as ProjectStage,
        description: fullDescription,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        preferredContact: formData.preferredContact,
        existingWebsite: formData.existingWebsite.trim() || undefined,
        referenceUrl: formData.referenceUrl.trim() || undefined
      });

      setSubmissionSource(res.source);
      setIsSuccess(true);
      trackEvent('inquiry_submit_success', { 
        projectType: formData.projectType,
        storageSource: res.source 
      });
      ensureFormInView();
    } catch (err: unknown) {
      console.error('Inquiry submission error:', err);
      const msg = err instanceof Error ? err.message : 'Unable to submit your inquiry at this moment.';
      setSubmitError(msg);
      trackEvent('inquiry_submit_error', { error: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE (Section 11 exact requirements)
  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm text-left animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0B0F]">
          Your project inquiry is in.
        </h3>
        
        <p className="mt-3 text-slate-600 text-base leading-relaxed max-w-xl">
          Thank you for sharing your project details. Your inquiry has been submitted successfully.
        </p>

        {/* Section: What happens next? */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D62FF] mb-5">
            What Happens Next — What We Will Discuss
          </h4>
          <ol className="space-y-4 text-sm text-slate-700 max-w-lg">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#2D62FF]/10 text-[#2D62FF] font-semibold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <span className="pt-0.5">
                <strong className="text-slate-900 font-semibold">Vision &amp; Strategy:</strong> We dissect your core goals, user journey, and market advantage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#2D62FF]/10 text-[#2D62FF] font-semibold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <span className="pt-0.5">
                <strong className="text-slate-900 font-semibold">Scope, Stack &amp; Timelines:</strong> We lock in exact deliverables, fixed pricing, and launch milestones.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#2D62FF]/10 text-[#2D62FF] font-semibold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <span className="pt-0.5">
                <strong className="text-slate-900 font-semibold">Execution Blueprint:</strong> Zero fluff. We finalize the roadmap and begin building immediately.
              </span>
            </li>
          </ol>
        </div>

        <div className="mt-10 pt-6 flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/')}
            className="btn-glass-primary px-6 py-3 rounded-xl text-white font-medium text-sm transition-all shadow-xs"
          >
            Back to Portfolio
          </button>
          <button
            onClick={() => {
              setIsSuccess(false);
              setStep(1);
              setFormData({
                projectType: '',
                otherProjectType: '',
                projectStage: '',
                name: '',
                company: '',
                email: '',
                preferredContact: 'Email',
                description: '',
                budgetRange: "Let's discuss the scope first.",
                timeline: 'Flexible.',
                existingWebsite: '',
                referenceUrl: ''
              });
            }}
            className="btn-glass-secondary px-5 py-3 rounded-xl text-slate-700 font-medium text-sm transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={formContainerRef} className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.02)] overflow-hidden text-left">
      {/* 3-Step Progress Indicator */}
      <div className="bg-slate-50/70 border-b border-slate-100 px-6 sm:px-8 py-4.5">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === 1
                  ? 'bg-[#2D62FF] text-white'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              {step > 1 ? '✓' : '1'}
            </span>
            <span className={`text-xs font-medium hidden sm:inline ${step === 1 ? 'text-slate-900' : 'text-slate-500'}`}>
              Requirements
            </span>
          </div>

          <div className={`h-0.5 w-12 sm:w-16 ${step >= 2 ? 'bg-[#2D62FF]' : 'bg-slate-200'}`} />

          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === 2
                  ? 'bg-[#2D62FF] text-white'
                  : step > 2
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {step > 2 ? '✓' : '2'}
            </span>
            <span className={`text-xs font-medium hidden sm:inline ${step === 2 ? 'text-slate-900' : 'text-slate-500'}`}>
              Contact
            </span>
          </div>

          <div className={`h-0.5 w-12 sm:w-16 ${step === 3 ? 'bg-[#2D62FF]' : 'bg-slate-200'}`} />

          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === 3
                  ? 'bg-[#2D62FF] text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              3
            </span>
            <span className={`text-xs font-medium hidden sm:inline ${step === 3 ? 'text-slate-900' : 'text-slate-500'}`}>
              Details
            </span>
          </div>
        </div>
      </div>

      {/* Backend Status Notice */}
      <div className="px-6 sm:px-8 pt-4 pb-0 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isFirebaseConfigured() ? 'bg-emerald-500' : 'bg-blue-500'}`} />
          <span>
            {isFirebaseConfigured()
              ? 'Firestore Cloud Database: Active'
              : 'Local Inquiry Storage: Active · Production ready'}
          </span>
        </span>
        <span className="text-slate-400">Step {step} of 3</span>
      </div>

      <div className="p-6 sm:p-8 md:p-10">
        {/* STEP 1: PROJECT REQUIREMENTS */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B0B0F]">
                What are you looking to build?
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Select the project type and current development stage to help us prepare for our discussion.
              </p>
            </div>

            {/* Project Type Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Project Type <span className="text-[#2D62FF]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypes.map((type) => {
                  const isSelected = formData.projectType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        markStarted();
                        setFormData({ ...formData, projectType: type });
                        if (errors.projectType) {
                          setErrors({ ...errors, projectType: '' });
                        }
                      }}
                      className={`p-3.5 rounded-xl text-left text-sm font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'btn-glass-primary text-white shadow-xs'
                          : 'btn-glass-secondary text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span>{type}</span>
                      {isSelected && <CheckCircle className="w-4 h-4 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {errors.projectType && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.projectType}
                </p>
              )}

              {/* Dynamic Input when "Other" is selected */}
              {formData.projectType === 'Other' && (
                <div className="pt-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    What would you like to build? <span className="text-[#2D62FF]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.otherProjectType}
                    onChange={(e) => {
                      setFormData({ ...formData, otherProjectType: e.target.value });
                      if (errors.otherProjectType) {
                        setErrors({ ...errors, otherProjectType: '' });
                      }
                    }}
                    placeholder="Type what you want to build"
                    autoFocus
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent ${
                      errors.otherProjectType
                        ? 'border-rose-300 ring-1 ring-rose-300'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  />
                  {errors.otherProjectType && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.otherProjectType}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Project Stage */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Current Stage <span className="text-[#2D62FF]">*</span>
              </label>
              <div className="space-y-2">
                {projectStages.map((stage) => {
                  const isSelected = formData.projectStage === stage;
                  return (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => {
                        markStarted();
                        setFormData({ ...formData, projectStage: stage });
                        if (errors.projectStage) {
                          setErrors({ ...errors, projectStage: '' });
                        }
                      }}
                      className={`w-full p-3.5 rounded-xl text-left text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'btn-glass-primary text-white font-medium shadow-xs'
                          : 'btn-glass-secondary text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span>{stage}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-white bg-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.projectStage && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.projectStage}
                </p>
              )}
            </div>

            {/* Fixed Budget & Plan Selector */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Budget / Investment Tier <span className="text-[#2D62FF]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {budgetOptions.map((opt) => {
                  const isSelected = formData.budgetRange === opt;

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        markStarted();
                        setFormData({ ...formData, budgetRange: opt });
                        if (errors.budgetRange) {
                          setErrors({ ...errors, budgetRange: '' });
                        }
                      }}
                      className={`p-3.5 rounded-xl text-left text-sm transition-all duration-150 flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'btn-glass-primary text-white font-semibold shadow-xs'
                          : 'btn-glass-secondary text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span className="whitespace-normal leading-tight">{opt}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-white bg-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.budgetRange && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.budgetRange}
                </p>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleStep1Continue}
                className="btn-glass-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CONTACT INFORMATION */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B0B0F]">
                Your Contact Information
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                How can we reach you to review your project brief?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name <span className="text-[#2D62FF]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                />
                {errors.name && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Company / Organization <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Acme Tech Studio"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Professional Email <span className="text-[#2D62FF]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
              />
              {errors.email && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-slate-700">
                Preferred Contact Method <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="flex gap-4">
                {(['Email', 'WhatsApp'] as ContactMethod[]).map((method) => {
                  const isSelected = formData.preferredContact === method;
                  return (
                    <label
                      key={method}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-colors ${
                        isSelected
                          ? 'btn-glass-primary text-white font-medium shadow-2xs'
                          : 'btn-glass-secondary text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={() => setFormData({ ...formData, preferredContact: method })}
                        className="text-[#2D62FF] focus:ring-[#2D62FF]"
                      />
                      <span>{method}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Buttons: Back, Continue */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-glass-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-700 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleStep2Continue}
                className="btn-glass-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium text-sm transition-all shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROJECT DETAILS */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B0B0F]">
                Project Scope &amp; Details
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Tell us about the problem you are solving, your timeline, and parameters.
              </p>
            </div>

            {/* Project Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Project Description <span className="text-[#2D62FF]">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: '' });
                }}
                placeholder="Briefly describe what you want to build, the problem you're trying to solve, and what you would like to achieve."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF] leading-relaxed resize-y"
              />
              {errors.description && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Budget & Timeline Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Budget */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Estimated Budget <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value as BudgetRange })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                >
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeline */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Desired Timeline <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value as Timeline })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                >
                  {timelineOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional URL fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Existing Website URL <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.existingWebsite}
                  onChange={(e) => setFormData({ ...formData, existingWebsite: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Inspiration / Reference Link <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.referenceUrl}
                  onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                  placeholder="https://inspiration.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF]"
                />
              </div>
            </div>

            {submitError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Buttons: Back, Submit Project Inquiry */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setStep(2)}
                className="btn-glass-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-700 text-sm font-medium transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glass-primary inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white font-medium text-sm transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Project Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
