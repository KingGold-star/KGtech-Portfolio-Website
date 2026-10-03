/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { InquiryForm } from '../components/InquiryForm';
import { trackEvent } from '../utils/analytics';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { preselectedService, preselectedBudget } = useRouter();

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Start an Agency Project | SiteNoble',
    description: 'Get in touch with SiteNoble to discuss your web development, UI/UX design, or digital product requirements.',
    url: 'https://sitenoble.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'SiteNoble',
      url: 'https://sitenoble.com',
      email: 'egburedipraise@gmail.com'
    }
  };

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 sm:pb-32 bg-white overflow-hidden">
      <SEOHead
        title="Start a Project & Contact SiteNoble | Web Development Agency"
        description="Ready to build your next web application or high-converting website? Get in touch with Praise and SiteNoble for project scoping and estimates."
        keywords={[
          'Contact Web Development Agency',
          'Hire Web Developer',
          'Web Design Project Inquiry',
          'Custom Software Agency Contact',
          'SiteNoble Contact'
        ]}
        canonicalPath="/contact"
        schema={contactSchema}
      />

      {/* Subtle Ambient Background Gradients */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none -z-0 opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle closest-side, rgba(45, 98, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)'
        }}
      />
      <div 
        className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full pointer-events-none -z-0 opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle closest-side, rgba(139, 92, 246, 0.06) 0%, rgba(255, 255, 255, 0) 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Column: Premium Editorial Brief & Direct Channels */}
          <div className="lg:col-span-5 text-left">
            <ScrollReveal direction="left" distance={30} duration={750}>
              <div className="space-y-10">
                {/* Header Block */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-[#2D62FF] text-xs font-semibold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Start a Project</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl xl:text-[52px] font-black tracking-tight text-[#0B0B0F] leading-[1.12]">
                    Let’s Build Something Remarkable.
                  </h1>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-1 font-normal">
                    Whether you're developing a custom web application, scaling a SaaS platform, or launching a modern high-converting website — we're ready to engineer your vision.
                  </p>
                </div>

                {/* Direct Connect Cards */}
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Direct Channels
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {/* Gmail Direct */}
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=egburedipraise@gmail.com&su=Project%20Inquiry%20%E2%80%93%20SiteNoble%20Nexus&body=Hello%20Praise%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0A"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('contact_email_click', { source: 'contact_page_left' })}
                      className="btn-glass-secondary flex items-center justify-between p-4 rounded-2xl hover:shadow-[0_8px_24px_rgba(45,98,255,0.08)] transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">Email (Gmail)</span>
                          <span className="text-sm font-bold text-slate-900 group-hover:text-[#2D62FF] transition-colors">
                            egburedipraise@gmail.com
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#2D62FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>

                    {/* WhatsApp Direct */}
                    <a
                      href="https://wa.link/0e1owh"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('contact_whatsapp_click' as any, { source: 'contact_page_left' })}
                      className="btn-glass-secondary flex items-center justify-between p-4 rounded-2xl hover:shadow-[0_8px_24px_rgba(16,185,129,0.08)] transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">WhatsApp</span>
                          <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            Chat with Praise
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  </div>
                </div>

                {/* Core Commitments List */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    What You Can Expect
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong className="text-slate-900 font-semibold">24-Hour Response</strong> with concrete next steps.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong className="text-slate-900 font-semibold">Strict Confidentiality</strong> on all specs &amp; business briefs.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong className="text-slate-900 font-semibold">Zero Pressure</strong> — transparent scoping and feasibility review.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Clean Premium Inquiry Card */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" distance={30} duration={750} delay={100}>
              <InquiryForm 
                initialProjectType={preselectedService} 
                initialBudgetRange={preselectedBudget}
              />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
};
