/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { SERVICES_DATA, ServiceDetail } from '../data/servicesData';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Layers, 
  Code2, 
  Clock, 
  ExternalLink,
  Briefcase
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service: ServiceDetail | undefined = SERVICES_DATA[slug];

  if (!service) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="text-3xl font-bold text-slate-900">Service Not Found</h1>
        <p className="mt-2 text-slate-600">The requested service page does not exist.</p>
        <button
          onClick={() => navigate('/services')}
          className="mt-6 btn-glass-primary px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
        >
          View All Services
        </button>
      </div>
    );
  }

  // Generate Service Schema JSON-LD & BreadcrumbList Schema
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        serviceType: service.category,
        provider: {
          '@type': 'Organization',
          name: 'SiteNoble',
          url: 'https://sitenoble.com'
        },
        description: service.overview,
        areaServed: 'Worldwide',
        offers: {
          '@type': 'Offer',
          url: `https://sitenoble.com/services/${service.slug}`
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://sitenoble.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://sitenoble.com/services'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.shortTitle,
            item: `https://sitenoble.com/services/${service.slug}`
          }
        ]
      }
    ]
  };

  const handleStartInquiry = () => {
    trackEvent('project_cta_click', { source: `service_detail_${service.slug}` });
    navigate('/contact', { preselectedService: service.projectType });
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 sm:pb-32 bg-white text-left">
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        canonicalPath={`/services/${service.slug}`}
        schema={schema}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="hover:text-slate-900 transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              navigate('/services');
            }}
            className="hover:text-slate-900 transition-colors"
          >
            Services
          </a>
          <span>/</span>
          <span className="text-[#2D62FF] font-semibold">{service.shortTitle}</span>
        </nav>

        {/* Hero Section */}
        <ScrollReveal direction="up" distance={24} duration={600}>
          <header className="space-y-5 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-[#2D62FF] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0B0F] leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal pt-1">
              {service.heroSubtitle}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleStartInquiry}
                className="btn-glass-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white text-sm font-semibold cursor-pointer"
              >
                <span>Start an Agency Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#deliverables"
                className="btn-glass-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-slate-700 text-sm font-semibold cursor-pointer"
              >
                <span>Explore Deliverables</span>
              </a>
            </div>
          </header>
        </ScrollReveal>

        {/* Quick Highlights Bar */}
        <ScrollReveal direction="up" distance={20} duration={500} delay={100}>
          <div className="my-12 py-6 px-6 sm:px-8 bg-[#F5F7FB] rounded-2xl border border-slate-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Service Type</span>
              <span className="font-bold text-slate-900">{service.shortTitle}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Standard Delivery</span>
              <span className="font-bold text-slate-900">2 – 4 Weeks</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Core Tech Stack</span>
              <span className="font-bold text-slate-900">{service.technologies.slice(0, 3).join(' · ')}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Global Delivery</span>
              <span className="font-bold text-emerald-600">Worldwide (Remote)</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Section: Overview & Target Audience */}
        <ScrollReveal direction="up" distance={24} duration={600}>
          <section className="my-16 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D62FF] block">
                  Overview &amp; Purpose
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0B0F]">
                  Engineered for Impact and Longevity
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  {service.overview}
                </p>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Ideal For:
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {service.targetAudience.map((audience, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2D62FF] shrink-0 mt-0.5" />
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Section: Business Challenges Solved */}
        <section className="my-16 space-y-8">
          <ScrollReveal direction="up" distance={20} duration={500}>
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D62FF] block">
                Problem &amp; Solution
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0B0F]">
                Key Business Challenges We Solve
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.challengesSolved.map((challenge, idx) => (
              <ScrollReveal key={idx} direction="up" distance={24} duration={550} delay={idx * 90}>
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 h-full">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2D62FF] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Section: Deliverables */}
        <section id="deliverables" className="my-16 space-y-8 scroll-mt-24">
          <ScrollReveal direction="up" distance={20} duration={500}>
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D62FF] block">
                Specifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0B0F]">
                What You Receive as Deliverables
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" distance={24} duration={550} delay={idx * 80}>
                <div className="p-7 rounded-2xl bg-[#F5F7FB]/70 border border-slate-200/90 space-y-2.5 h-full">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Section: Process Steps */}
        <section className="my-16 space-y-8">
          <ScrollReveal direction="up" distance={20} duration={500}>
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D62FF] block">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0B0F]">
                How We Execute Your Project
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <ScrollReveal key={step.step} direction="up" distance={24} duration={550} delay={idx * 90}>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 h-full">
                  <span className="text-2xl font-bold font-mono text-[#2D62FF] block">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Section: Related Projects / Case Studies if available */}
        {service.relatedProjects && service.relatedProjects.length > 0 && (
          <section className="my-16 space-y-6">
            <ScrollReveal direction="up" distance={20} duration={500}>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D62FF] block">
                  Proof &amp; Application
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
                  Relevant Case Study Demonstrations
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.relatedProjects.map((proj, idx) => (
                <ScrollReveal key={proj.slug} direction="up" distance={24} duration={550} delay={idx * 100}>
                  <div
                    onClick={() => navigate(`/projects/${proj.slug}`)}
                    className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#2D62FF] transition-all cursor-pointer group flex flex-col justify-between h-full"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#2D62FF] uppercase tracking-wider">
                        {proj.type}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2D62FF] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2D62FF]">
                      <span>View Interactive Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Section: Structured FAQs */}
        <section className="my-16 space-y-6">
          <ScrollReveal direction="up" distance={20} duration={500}>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D62FF] block">
                Clarity &amp; Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0B0F]">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <ScrollReveal key={idx} direction="up" distance={16} duration={450} delay={idx * 60}>
                  <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900 hover:text-[#2D62FF] cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#2D62FF] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Section: Contextual Internal Links to Related Services */}
        <ScrollReveal direction="up" distance={20} duration={500}>
          <section className="my-16 pt-8 border-t border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
              Explore Related Capabilities
            </span>
            <div className="flex flex-wrap gap-3">
              {service.relatedServices.map((rel) => (
                <a
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/services/${rel.slug}`);
                  }}
                  className="btn-glass-secondary px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#2D62FF] transition-colors"
                >
                  {rel.title} →
                </a>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Sticky Closing CTA Card */}
        <ScrollReveal direction="up" distance={28} duration={650}>
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to build your {service.shortTitle}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Schedule a discovery session with Praise and SiteNoble to review your technical requirements and receive an engineering roadmap.
              </p>
            </div>

            <button
              onClick={handleStartInquiry}
              className="btn-glass-primary px-8 py-4 rounded-2xl text-white text-sm font-semibold cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>Inquire About {service.shortTitle}</span>
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
