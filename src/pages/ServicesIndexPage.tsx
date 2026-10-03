/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { SERVICES_DATA } from '../data/servicesData';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Layout, 
  Layers, 
  RefreshCw, 
  Palette, 
  ShoppingBag, 
  Wrench,
  Bot
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  'business-websites': Layout,
  'landing-pages': Sparkles,
  'web-applications': Code2,
  'website-redesign': RefreshCw,
  'ui-ux-design': Palette,
  'ecommerce-development': ShoppingBag,
  'website-maintenance': Wrench,
  'ai-integration': Bot,
  'saas-development': Layers
};

export const ServicesIndexPage: React.FC = () => {
  const { navigate } = useRouter();
  const servicesList = Object.values(SERVICES_DATA);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'KGtech Nexus Digital Services & Capabilities',
    description: 'Comprehensive web development, UI/UX design, SaaS, and AI integration services by KGtech Nexus.',
    itemListElement: servicesList.map((srv, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: srv.title,
      url: `https://kgtechnexus.com/services/${srv.slug}`
    }))
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 sm:pb-32 bg-white">
      <SEOHead
        title="Web Development & Digital Product Services | KGtech Nexus"
        description="Explore custom web development, UI/UX design, SaaS engineering, e-commerce, and AI integration services by KGtech Nexus. Engineered for high performance."
        canonicalPath="/services"
        schema={schema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header Section */}
        <ScrollReveal direction="up" distance={24}>
          <header className="max-w-3xl text-left mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-[#2D62FF] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Capabilities &amp; Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B0B0F] leading-[1.12]">
              Engineering Purpose-Built Digital Solutions
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-1">
              From high-converting corporate websites and focused landing pages to complex full-stack web applications and SaaS platforms—KGtech Nexus turns commercial objectives into high-performing digital realities.
            </p>
          </header>
        </ScrollReveal>

        {/* Services Grid (All 9 Core Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => {
            const Icon = iconMap[service.slug] || Layout;

            return (
              <ScrollReveal
                key={service.slug}
                direction="up"
                distance={28}
                delay={idx * 60}
                className="h-full"
              >
                <article className="h-full p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#2D62FF]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 text-left relative overflow-hidden">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2D62FF] flex items-center justify-center group-hover:bg-[#2D62FF] group-hover:text-white transition-all shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                        {service.category}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-[#0B0B0F] tracking-tight group-hover:text-[#2D62FF] transition-colors">
                        <a 
                          href={`/services/${service.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            trackEvent('service_cta_click', { service: service.shortTitle });
                            navigate(`/services/${service.slug}`);
                          }}
                          className="focus:outline-none"
                        >
                          {service.shortTitle}
                        </a>
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                        {service.overview}
                      </p>
                    </div>

                    {/* Core Deliverables Preview */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-900 block">
                        Core Deliverables:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {service.deliverables.slice(0, 3).map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`/services/${service.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        trackEvent('service_cta_click', { service: service.shortTitle });
                        navigate(`/services/${service.slug}`);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D62FF] hover:text-[#1E4ED8] transition-colors cursor-pointer"
                    >
                      <span>View Service Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <button
                      onClick={() => {
                        trackEvent('project_cta_click', { source: `services_index_${service.slug}` });
                        navigate('/contact', { preselectedService: service.projectType });
                      }}
                      className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <ScrollReveal direction="up" distance={32} duration={800}>
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3 z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Custom Requirements?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Need a Tailored Digital Architecture?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Whether you have a complex enterprise integration, specialized API needs, or a multi-platform concept, KGtech Nexus provides technical direction and bespoke software engineering.
              </p>
            </div>

            <div className="shrink-0 z-10">
              <button
                onClick={() => {
                  trackEvent('project_cta_click', { source: 'services_index_bottom_banner' });
                  navigate('/contact');
                }}
                className="btn-glass-primary px-8 py-4 text-sm font-semibold text-white rounded-2xl cursor-pointer whitespace-nowrap"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
