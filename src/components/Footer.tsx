/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { ArrowUp, Sparkles, X } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('project_cta_click', { source: 'footer_scroll_to_top' });
  };

  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="w-full bg-white pt-2 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Outer Card Container matching Reference Design */}
      <ScrollReveal direction="up" distance={24} duration={600}>
        <div className="max-w-7xl mx-auto bg-slate-50/50 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] border border-slate-200/80 shadow-[0_20px_60px_rgba(15,23,42,0.04),0_1px_3px_rgba(15,23,42,0.02)] p-6 sm:p-10 lg:p-14 relative overflow-hidden text-left">
          
          {/* Ambient Top Subtle Glow inside Card */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-100/25 rounded-full blur-3xl pointer-events-none" />

          {/* ========================================================================= */}
          {/* TOP BAR: BRAND LOGO + BACK TO TOP */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-between pb-8 sm:pb-10 border-b border-slate-100/90 relative z-10">
            
            {/* Brand Logo & Name */}
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <img 
                src="/favicon.png" 
                alt="KGtech Nexus Logo" 
                className="w-8 h-8 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform" 
              />
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                KGtech <span className="text-[#2D62FF]">Nexus</span>
              </span>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="btn-glass-secondary px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#2D62FF] transition-all cursor-pointer group"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* MAIN CONTENT GRID: MISSION / ADDRESS + 3 LINK COLUMNS */}
          {/* ========================================================================= */}
          <div className="pt-8 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
            
            {/* Left Column: Mission Statement & Address */}
            <div className="lg:col-span-6 space-y-5 max-w-lg">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                KGtech Nexus gives modern enterprises and fast-growing ventures a dedicated software engineering and product design partner — signal-aware, always on, zero overhead.
              </p>

              <div className="space-y-1 pt-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900 block">
                  Address:
                </span>
                <p className="text-xs sm:text-sm text-slate-500 font-normal">
                  London, United Kingdom &amp; Remote Globally
                </p>
              </div>
            </div>

            {/* Right Column: 3 Link Columns (Services, Insights & Work, Company & Contact) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-xs sm:text-sm">
              
              {/* Services Column */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Services
                </h4>
                <ul className="space-y-2 text-slate-500">
                  <li>
                    <a
                      href="/services/business-websites"
                      onClick={(e) => handleNav('/services/business-websites', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      Business Websites
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/web-applications"
                      onClick={(e) => handleNav('/services/web-applications', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      Web Applications
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/saas-development"
                      onClick={(e) => handleNav('/services/saas-development', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      SaaS Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/landing-pages"
                      onClick={(e) => handleNav('/services/landing-pages', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      Landing Pages
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/ui-ux-design"
                      onClick={(e) => handleNav('/services/ui-ux-design', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      UI/UX Design
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      onClick={(e) => handleNav('/services', e)}
                      className="font-semibold text-[#2D62FF] hover:underline transition-colors block pt-1"
                    >
                      All 9 Services →
                    </a>
                  </li>
                </ul>
              </div>

              {/* Insights & Selected Work */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Insights &amp; Work
                </h4>
                <ul className="space-y-2 text-slate-500">
                  <li>
                    <a
                      href="/insights"
                      onClick={(e) => handleNav('/insights', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      Insights Hub
                    </a>
                  </li>
                  <li>
                    <a
                      href="/projects/studpal"
                      onClick={(e) => handleNav('/projects/studpal', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      StudPal Case Study
                    </a>
                  </li>
                  <li>
                    <a
                      href="/projects/aurenix"
                      onClick={(e) => handleNav('/projects/aurenix', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      Aurenix Research
                    </a>
                  </li>
                  <li>
                    <a
                      href="/insights/why-website-performance-matters-for-business"
                      onClick={(e) => handleNav('/insights/why-website-performance-matters-for-business', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      Core Web Vitals
                    </a>
                  </li>
                  <li>
                    <a
                      href="/insights/how-to-choose-a-website-development-agency"
                      onClick={(e) => handleNav('/insights/how-to-choose-a-website-development-agency', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      Agency Selection
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company & Contact Column */}
              <div className="space-y-3 col-span-2 sm:col-span-1">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Connect
                </h4>
                <ul className="space-y-2 text-slate-500">
                  <li>
                    <a
                      href="/resume"
                      onClick={(e) => handleNav('/resume', e)}
                      className="hover:text-slate-900 transition-colors"
                    >
                      About Leadership
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      onClick={(e) => handleNav('/contact', e)}
                      className="hover:text-slate-900 transition-colors font-semibold text-slate-900"
                    >
                      Start an Inquiry
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=egburedipraise@gmail.com&su=Project%20Inquiry%20%E2%80%93%20KGtech%20Nexus&body=Hello%20Praise%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0A"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('contact_email_click', { source: 'footer' })}
                      className="hover:text-slate-900 transition-colors"
                    >
                      Email (Gmail)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.link/0e1owh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-slate-900 transition-colors text-emerald-600 font-medium"
                    >
                      WhatsApp Chat
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* GIANT ATMOSPHERIC WATERMARK GRAPHIC (Matching Reference Design) */}
          {/* ========================================================================= */}
          <div className="relative w-full overflow-hidden flex items-center justify-center my-4 sm:my-8 pointer-events-none select-none max-w-full">
            <span 
              className="text-[64px] xs:text-[90px] sm:text-[160px] md:text-[220px] lg:text-[270px] xl:text-[290px] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#8B9FF8]/30 via-[#A4B5FF]/20 to-[#D4DCFF]/5 opacity-90 blur-[0.5px] max-w-full truncate"
              style={{
                WebkitTextStroke: '1px rgba(139, 159, 248, 0.15)'
              }}
            >
              Nexus
            </span>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM SUB-BAR: COPYRIGHT + LEGAL POLICIES */}
          {/* ========================================================================= */}
          <div className="pt-6 sm:pt-8 border-t border-slate-100/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-slate-400 relative z-10">
            
            <p>
              ©{currentYear} KGtech Nexus. All rights reserved
            </p>

            <div className="flex items-center gap-4 sm:gap-6 text-slate-500">
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Terms of Services
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('cookies')}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Cookie Policy
              </button>
            </div>

          </div>

        </div>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* MODAL POPUP FOR LEGAL POLICIES */}
      {/* ========================================================================= */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 text-left space-y-4 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 capitalize">
                {activeModal === 'terms' && 'Terms of Service'}
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'cookies' && 'Cookie Policy'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="btn-glass-secondary w-8 h-8 rounded-full flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {activeModal === 'terms' && (
                <>
                  <p>
                    By accessing and using this portfolio and digital agency website for KGtech Nexus, you agree to comply with and be bound by applicable engineering contract standards and terms of engagement.
                  </p>
                  <p>
                    All project case studies, client code architectures, and technical deliverables are protected under international copyright and technical property agreements.
                  </p>
                </>
              )}
              {activeModal === 'privacy' && (
                <>
                  <p>
                    Your privacy is respected. Any information submitted through our inquiry and project discovery forms is kept strictly confidential and used exclusively for project communication and consultation.
                  </p>
                  <p>
                    We do not sell, rent, or distribute personal data to third parties.
                  </p>
                </>
              )}
              {activeModal === 'cookies' && (
                <>
                  <p>
                    This website uses essential browser storage and privacy-focused telemetry solely to optimize performance, remember project preferences, and provide seamless sub-second page transitions.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="btn-glass-dark px-5 py-2 rounded-xl text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
