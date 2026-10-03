import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  ArrowLeft, 
  Printer, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Check, 
  Copy, 
  Download, 
  ArrowUpRight 
} from 'lucide-react';
import { downloadCVPdf } from '../utils/cvPdfGenerator';

export const ResumePage: React.FC = () => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    trackEvent('cv_download_click', { format: 'pdf_document' });
    try {
      setIsDownloading(true);
      downloadCVPdf('Praise_Egburedi_CV_SiteNoble_Nexus.pdf');
    } catch (err) {
      console.error('Failed to generate PDF document:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('egburedipraise@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Praise Egburedi',
    jobTitle: 'Lead Web Developer & UI/UX Architect',
    worksFor: {
      '@type': 'Organization',
      name: 'SiteNoble',
      url: 'https://sitenoble.com'
    },
    url: 'https://sitenoble.com/resume',
    email: 'egburedipraise@gmail.com',
    sameAs: [
      'https://github.com/PraiseEgburedi'
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'UI/UX Architecture',
      'Web Application Development',
      'Firebase',
      'Next.js',
      'REST APIs',
      'Frontend Performance Optimization'
    ]
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <SEOHead
        title="Praise Egburedi – Lead Web Developer & UI/UX Architect | SiteNoble"
        description="Professional background, technical stack, and verified experience of Praise Egburedi, Lead Web Developer and UI/UX Architect at SiteNoble."
        canonicalPath="/resume"
        schema={personSchema}
      />
      {/* Top action bar (hidden in print) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <button
          onClick={() => navigate('/')}
          className="btn-glass-secondary inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 rounded-xl transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={handleCopyEmail}
            className="btn-glass-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 rounded-xl transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Email Copied' : 'Copy Email'}</span>
          </button>

          <button
            onClick={handleDownloadCV}
            disabled={isDownloading}
            className="btn-glass-primary inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-xl transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-80"
            title="Download PDF version of CV"
          >
            {isDownloading ? (
              <>
                <Check className="w-4 h-4 text-white animate-pulse" />
                <span>Downloading PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <ScrollReveal direction="up" distance={24} duration={600}>
        <article className="max-w-4xl mx-auto px-5 sm:px-10 md:px-12 py-8 sm:py-10 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-8 sm:space-y-10 text-left print:border-none print:shadow-none print:p-0">
          
          {/* Header */}
          <header className="border-b border-slate-200 pb-8 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-[#0B0B0F]">
                Praise Egburedi
              </h1>
              <span className="text-sm font-medium text-[#2D62FF]">
                Lead Web Developer &amp; UI/UX Architect &nbsp;·&nbsp; SiteNoble
              </span>
            </div>

            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              "At SiteNoble, we design and build digital experiences that move businesses forward. With Praise Egburedi directing web development and UI/UX architecture, we help founders and growing enterprises establish commanding digital presence through high-performance websites, intuitive interfaces, and scalable web applications."
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                egburedipraise@gmail.com
              </span>
              <span aria-hidden="true">·</span>
              <span>Agency: SiteNoble</span>
              <span aria-hidden="true">·</span>
              <span>Available for Client Engagements Worldwide</span>
            </div>
          </header>

          {/* Section: Technical Competencies */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
              Technical Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Core Development</span>
                <p className="text-slate-600">HTML5, CSS3, JavaScript (ESNext), TypeScript</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Frontend &amp; UI</span>
                <p className="text-slate-600">React, Component Architecture, State Management, Responsive Design</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Styling &amp; Systems</span>
                <p className="text-slate-600">Tailwind CSS, Design Systems, Typography, WCAG Accessibility</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Backend &amp; Data</span>
                <p className="text-slate-600">Firebase Firestore, Firebase Authentication, Cloud Functions integration</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Workflow &amp; Tooling</span>
                <p className="text-slate-600">Git, GitHub, Vite, AI-assisted development</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Deployment</span>
                <p className="text-slate-600">Vercel, Netlify, Cloud Run, Production Optimization, SEO best practices</p>
              </div>
            </div>
          </section>

          {/* Section: Featured Projects & Case Studies */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
              Featured Projects &amp; Implementation
            </h2>

            {/* Project 1: StudPal */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">StudPal</h3>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-[#2D62FF] font-medium">Personalized Study Companion</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">React · TypeScript · Firebase</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designed and developed a personalized study platform concept combining active deep-work timing, curriculum progress tracking, dependency roadmaps, and AI-assisted concept synthesis.
              </p>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
                <li>Engineered high-accuracy timestamp interval calculations to prevent timer throttling across browser tabs.</li>
                <li>Architected Firestore schema for persistent study milestones with secure access control.</li>
                <li>Crafted distraction-free responsive UI with Apple-inspired minimalist aesthetics.</li>
              </ul>
            </div>

            {/* Project 2: Aurenix Research */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Aurenix Research</h3>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-[#2D62FF] font-medium">Energy &amp; Climate Platform</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">React · TypeScript · Tailwind CSS</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured research platform concept connecting climate hardware innovation, scientific benchmarks, and open-access publications.
              </p>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
                <li>Designed modular information architecture with clean tabular data display for complex energy benchmarks.</li>
                <li>Built multi-vector domain filter controls allowing zero-latency querying across photovoltaic, microgrid, and hydrogen sectors.</li>
                <li>Ensured full accessibility with semantic HTML5 tags and high-contrast color distribution.</li>
              </ul>
            </div>
          </section>

          {/* Section: Professional Services & Practice */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
              Core Service Offerings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">Business Websites &amp; Redesigns</span>
                <p className="text-slate-600">Clean, responsive websites that communicate business value, build credibility, and convert visitors into qualified leads.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">Web Application Development</span>
                <p className="text-slate-600">Interactive web apps with modular React/TypeScript architectures, database sync, and intuitive user experiences.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">Conversion Landing Pages</span>
                <p className="text-slate-600">Focused landing pages engineered around clear messaging, user journeys, fast load times, and conversion goals.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-900 block">UI/UX Design Systems</span>
                <p className="text-slate-600">Wireframes, interactive mockups, and cohesive design systems that make digital products clear and easy to navigate.</p>
              </div>
            </div>
          </section>

          {/* Section: Development Process */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
              Methodology &amp; Working Philosophy
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Our approach starts with understanding the problem, the people using the product, and the outcome the business wants to achieve. We translate those requirements into clear interfaces, responsive experiences, and maintainable implementations: Discover → Design → Develop → Launch &amp; Refine."
            </p>
          </section>

          {/* CTA (hidden in print) */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
            <span className="text-xs text-slate-500">
              Ready to discuss your project?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className="btn-glass-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 rounded-xl transition-colors cursor-pointer disabled:opacity-80"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>{isDownloading ? 'Downloading...' : 'Download CV'}</span>
              </button>
              <button
                onClick={() => {
                  trackEvent('project_cta_click', { source: 'resume_bottom' });
                  navigate('/contact');
                }}
                className="btn-glass-primary inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-medium text-white rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </article>
      </ScrollReveal>
    </div>
  );
};
