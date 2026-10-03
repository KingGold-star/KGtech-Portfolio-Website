import React from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { ProjectMockupAurenix } from '../components/ProjectMockupAurenix';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Zap, 
  FileText,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export const AurenixCaseStudy: React.FC = () => {
  const { navigate } = useRouter();

  const aurenixSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Aurenix Research Platform Case Study | SiteNoble',
        description: 'Case study on the design and frontend engineering of Aurenix Research Platform by SiteNoble, featuring complex data visualizations.',
        url: 'https://sitenoble.com/projects/aurenix'
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
            name: 'Aurenix Research Case Study',
            item: 'https://sitenoble.com/projects/aurenix'
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <SEOHead
        title="Aurenix Research Platform Case Study | SiteNoble"
        description="Case study on the design and frontend engineering of Aurenix Research Platform by SiteNoble, featuring complex data visualizations."
        keywords={[
          'Aurenix Research Case Study',
          'Data Visualization Web App',
          'React Scientific Platform',
          'UI/UX Architecture Case Study',
          'SiteNoble Case Studies'
        ]}
        canonicalPath="/projects/aurenix"
        schema={aurenixSchema}
      />
      {/* Back button and breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 mb-8">
        <button
          onClick={() => navigate('/')}
          className="btn-glass-secondary inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </button>
      </div>

      {/* Case Study Header */}
      <ScrollReveal direction="up" distance={24} duration={600}>
        <header className="max-w-5xl mx-auto px-6 md:px-8 space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-semibold text-[#2D62FF] uppercase tracking-wider">
              Research Platform
            </span>
            <span aria-hidden="true">·</span>
            <span>UI/UX &amp; Web Development</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 font-medium">Architecture &amp; Interface Completed</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0B0F] max-w-3xl leading-tight">
            Aurenix Research: Connecting energy research, innovation, and opportunity.
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed pt-1">
            A research platform concept focused on energy and climate technology, structured research experiences, and accessible information architecture.
          </p>

          {/* Project Meta Bar (Clean unboxed metadata) */}
          <div className="pt-6 pb-8 border-y border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Agency &amp; Role</span>
              <span className="font-semibold text-slate-900">SiteNoble (Praise, Lead Dev)</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Domain</span>
              <span className="font-semibold text-slate-900">Energy &amp; Climate Tech</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Core Stack</span>
              <span className="font-semibold text-slate-900">React · TypeScript · Tailwind CSS</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Deliverables</span>
              <span className="font-semibold text-slate-900">Design System, Frontend Platform</span>
            </div>
          </div>
        </header>
      </ScrollReveal>

      {/* Interactive Mockup Presentation Showcase */}
      <ScrollReveal direction="up" distance={28} duration={650} delay={100}>
        <section className="max-w-5xl mx-auto px-6 md:px-8 my-12" aria-label="Interactive Interface Showcase">
          <div className="bg-[#F5F7FB] p-4 sm:p-8 rounded-3xl border border-slate-200/80">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Platform Interface Demonstration
              </span>
              <span className="text-xs text-slate-500">
                Try switching domains: Photovoltaics, Microgrids, Green Hydrogen
              </span>
            </div>
            <ProjectMockupAurenix />
          </div>
        </section>
      </ScrollReveal>

      {/* Main Case Study Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-16">
        
        {/* Section 1: Objective & Context */}
        <ScrollReveal direction="up" distance={20} duration={500}>
          <section className="space-y-4 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
              Platform Objective &amp; Information Architecture
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Breakthroughs in renewable energy and climate hardware often remain trapped in static PDF repositories or impenetrable academic journal databases. Investors, founders, and engineers struggle to extract actionable technological benchmarks.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Aurenix Research was conceived as an open-access digital nexus. The primary architectural objective was to translate dense thermodynamic, chemical, and electrical data into scannable knowledge briefs without losing scientific rigor.
            </p>
          </section>
        </ScrollReveal>

        {/* Section 2: Design Approach */}
        <ScrollReveal direction="up" distance={20} duration={500}>
          <section className="space-y-4 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
              Design System &amp; Editorial Typography
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Scientific clarity requires an editorial touch. We paired a generous 12-column grid with strict typographic scale:
            </p>
            <ul className="space-y-3 pt-2 text-slate-700 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D62FF] shrink-0 mt-0.5" />
                <span>
                  <strong>Tabular Numerals:</strong> Metric figures (efficiency percentages, megawatt outputs, cost curves) use monospaced figures for precise vertical reading.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D62FF] shrink-0 mt-0.5" />
                <span>
                  <strong>Instant Domain Facets:</strong> Fluid client-side filtering across energy domains without page reloads or jarring layout shifts.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D62FF] shrink-0 mt-0.5" />
                <span>
                  <strong>Accessible Contrast Scrims:</strong> Strict WCAG AA compliance across text layers and subtle hairline borders for optical separation.
                </span>
              </li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Section 3: Technical Implementation */}
        <section className="space-y-6">
          <ScrollReveal direction="up" distance={20} duration={500}>
            <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
              Architecture &amp; Component System
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal direction="up" distance={24} duration={550} delay={0}>
              <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2D62FF]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Multi-Facet Filtering
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Implemented reactive memoized search filters in TypeScript that cross-reference author credentials, technological readiness levels (TRL), and energy storage vectors.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={24} duration={550} delay={100}>
              <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2D62FF]">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Structured Research Briefs
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Modular card layouts with clear typographic hierarchy: title, primary researchers, validated efficiency benchmark, and estimated reading time.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={24} duration={550} delay={200}>
              <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2D62FF]">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Global Open Access
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero paywalls or friction. Optimized for rapid delivery across global networks with semantic HTML5 tags and automated JSON-LD research markup.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 4: Current Status & Next Steps */}
        <ScrollReveal direction="up" distance={24} duration={600}>
          <section className="p-8 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#2D62FF] uppercase tracking-wider">
                  Current Status
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Platform Architecture &amp; UI System Completed
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-xl">
                  The visual identity, component library, and research indexing schemas are built and documented. Ready for data ingestion and partner publication onboarding.
                </p>
              </div>
              <button
                onClick={() => {
                  trackEvent('project_cta_click', { source: 'aurenix_discuss_similar' });
                  navigate('/contact', { preselectedService: 'Web Application' });
                }}
                className="btn-glass-primary px-6 py-3 rounded-xl text-white font-medium text-sm transition-all whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
              >
                Discuss a Similar Project
              </button>
            </div>
          </section>
        </ScrollReveal>

        {/* Next Project Navigation */}
        <ScrollReveal direction="up" distance={20} duration={500}>
          <div className="pt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => navigate('/')}
              className="btn-glass-secondary inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Projects</span>
            </button>

            <button
              onClick={() => navigate('/projects/studpal')}
              className="btn-glass-secondary group inline-flex items-center gap-3 p-4 rounded-2xl transition-all text-right cursor-pointer"
            >
              <div>
                <span className="text-xs text-slate-400 block">Next Case Study</span>
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#2D62FF] transition-colors">
                  StudPal Companion →
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100/80 group-hover:bg-[#2D62FF]/10 text-slate-700 group-hover:text-[#2D62FF] flex items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
