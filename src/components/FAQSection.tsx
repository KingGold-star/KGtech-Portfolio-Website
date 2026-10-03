/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { 
  ChevronDown, 
  Clock, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'process' | 'timeline' | 'general';
  question: string;
  answer: string;
  badge?: string;
}

export const FAQSection: React.FC = () => {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState<'all' | 'process' | 'timeline'>('all');
  const [openId, setOpenId] = useState<string | null>('timeline-1'); // Exactly one open item by default

  const toggleItem = (id: string) => {
    // If the clicked item is already open, close it; otherwise open only the clicked item
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqData: FAQItem[] = [
    {
      id: 'timeline-1',
      category: 'timeline',
      question: 'How long does a typical project take from start to launch?',
      badge: 'Timelines',
      answer: 'Project durations vary according to functionality and depth:\n• Conversion Landing Pages: 1 to 2 weeks\n• Custom Business Websites (5–10 pages): 3 to 5 weeks\n• E-commerce Storefronts: 4 to 6 weeks\n• Web Applications & SaaS MVPs: 6 to 10 weeks\n\nEvery project includes a dedicated kickoff roadmap with committed milestone delivery dates before engineering begins.',
    },
    {
      id: 'process-1',
      category: 'process',
      question: 'What does your design and development process look like?',
      badge: 'Process',
      answer: 'We follow a four-stage engineering methodology:\n1. Discovery & Architecture: We map out your goals, target audience, functional specifications, and content structure.\n2. UI/UX & Interactive Design: We craft responsive design systems, typography hierarchy, and interactive prototypes for your review.\n3. Modern Frontend & Backend Development: We engineer production code with React, TypeScript, Tailwind CSS, and scalable databases.\n4. Quality QA, Launch & Optimization: Cross-device testing, SEO optimization, performance auditing, and deployment to production hosting.',
    },
    {
      id: 'timeline-2',
      category: 'timeline',
      question: 'Can you accommodate urgent deadlines or expedited delivery?',
      badge: 'Expedited',
      answer: 'Yes. When schedule bandwidth permits, we offer sprint-based fast-track timelines for time-sensitive launches (such as investor pitches, product debuts, or seasonal marketing campaigns). Fast-track engagements allocate dedicated focus to accelerate delivery without sacrificing code hygiene, accessibility, or security standards.',
    },
    {
      id: 'process-2',
      category: 'process',
      question: 'How do revisions, feedback, and milestone approvals work?',
      badge: 'Collaboration',
      answer: 'You have complete visibility throughout the build. We structure formal checkpoints at wireframing, high-fidelity UI review, and coded staging. Each phase includes two comprehensive rounds of revisions to incorporate your team’s feedback before proceeding, ensuring there are zero surprises at final delivery.',
    },
    {
      id: 'process-3',
      category: 'process',
      question: 'How will we communicate and track progress during the project?',
      badge: 'Communication',
      answer: 'We prioritize prompt, transparent, async-friendly communication. You receive a private project channel (Slack or WhatsApp), regular milestone video walkthroughs, and live staging URLs to interact with real working software as milestones are achieved.',
    },
    {
      id: 'timeline-3',
      category: 'timeline',
      question: 'What factors might cause a project to be delayed?',
      badge: 'Timelines',
      answer: 'The most common delays stem from slow feedback turnaround during approval gates or delays in providing brand assets, copywriting, and third-party API credentials. We provide an upfront onboarding checklist so all dependencies are clear before the clock starts.',
    },
    {
      id: 'process-4',
      category: 'process',
      question: 'What deliverables do I own once the project is completed?',
      badge: 'Ownership',
      answer: 'You retain 100% intellectual property ownership. Upon completion, you receive the full Git source code repository, production hosting configuration (Vercel, Cloud Run, etc.), UI design assets and design tokens, and documentation on how to update content and maintain the application.',
    },
    {
      id: 'timeline-4',
      category: 'timeline',
      question: 'Do you offer ongoing support and maintenance after the website goes live?',
      badge: 'Post-Launch',
      answer: 'Every deployment includes a 30-day post-launch warranty covering bug fixes and technical adjustments. For clients seeking continuous peace of mind, SiteNoble offers monthly retainer tiers covering ongoing feature development, performance audits, security patches, and priority technical support.',
    },
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter((item) => item.category === activeCategory);

  return (
    <section 
      id="faq" 
      className="py-24 sm:py-32 bg-slate-50/60 border-t border-slate-200/80 scroll-mt-20 relative overflow-hidden" 
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2D62FF] text-xs font-semibold tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Client Questions Answered</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0B0F]">
            Design Process &amp; Project Timelines
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Clear expectations lead to great digital products. Here is how Praise and SiteNoble manage design iterations, milestones, and delivery schedules.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'btn-glass-primary text-white'
                  : 'btn-glass-secondary text-slate-700'
              }`}
            >
              All Questions ({faqData.length})
            </button>
            <button
              onClick={() => setActiveCategory('process')}
              className={`inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeCategory === 'process'
                  ? 'btn-glass-primary text-white'
                  : 'btn-glass-secondary text-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Design Process</span>
            </button>
            <button
              onClick={() => setActiveCategory('timeline')}
              className={`inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeCategory === 'timeline'
                  ? 'btn-glass-primary text-white'
                  : 'btn-glass-secondary text-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timelines &amp; Delivery</span>
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 text-left">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-[#2D62FF]/40 shadow-[0_8px_24px_rgba(45,98,255,0.06)]' 
                    : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D62FF]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-lg font-bold text-[#0B0B0F] tracking-tight">
                      {faq.question}
                    </span>
                    {faq.badge && (
                      <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                        {faq.badge}
                      </span>
                    )}
                  </div>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen 
                        ? 'bg-blue-50 text-[#2D62FF] rotate-180' 
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? Help Card */}
        <div className="mt-12 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#2D62FF]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2D62FF]">
                Have a unique timeline or scope requirement?
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B0B0F]">
              Need an estimated project timeline for your roadmap?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Tell us about your target launch date, required integrations, and current design assets. We will provide a structured proposal and milestones breakdown within 24 hours.
            </p>
          </div>

          <button
            onClick={() => {
              trackEvent('project_cta_click', { source: 'faq_bottom_help' });
              navigate('/contact');
            }}
            className="btn-glass-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-2xl whitespace-nowrap cursor-pointer"
          >
            <span>Request Project Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
