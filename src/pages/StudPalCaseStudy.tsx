import React from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { ProjectMockupStudPal } from '../components/ProjectMockupStudPal';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Clock, 
  Sparkles,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

export const StudPalCaseStudy: React.FC = () => {
  const { navigate } = useRouter();

  const studpalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'StudPal Web Application Case Study | SiteNoble',
        description: 'Comprehensive case study on StudPal, a personalized study companion and productivity web application engineered by SiteNoble.',
        url: 'https://sitenoble.com/projects/studpal'
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
            name: 'StudPal Case Study',
            item: 'https://sitenoble.com/projects/studpal'
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <SEOHead
        title="StudPal Web Application Case Study | SiteNoble"
        description="Comprehensive case study on StudPal, a personalized study companion and productivity web application engineered by SiteNoble."
        canonicalPath="/projects/studpal"
        schema={studpalSchema}
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
              Web Application
            </span>
            <span aria-hidden="true">·</span>
            <span>Product Design &amp; Full-Stack Engineering</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 font-medium">Core Prototype Completed</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0B0F] max-w-3xl leading-tight">
            StudPal: A personalized study companion built around smarter learning.
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed pt-1">
            A personalized study platform concept combining structured planning, active deep-work sessions, curriculum dependency tracking, and AI-assisted concept synthesis.
          </p>

          {/* Project Meta Bar (Unboxed clean metadata) */}
          <div className="pt-6 pb-8 border-y border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Agency &amp; Role</span>
              <span className="font-semibold text-slate-900">SiteNoble (Praise, Lead Dev)</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Timeline</span>
              <span className="font-semibold text-slate-900">Concept &amp; Implementation</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Core Stack</span>
              <span className="font-semibold text-slate-900">React · TypeScript · Firebase</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block mb-1">Deliverables</span>
              <span className="font-semibold text-slate-900">UI Design, Architecture, Prototype</span>
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
                Interactive Prototype Demonstration
              </span>
              <span className="text-xs text-slate-500">
                Try toggling tasks and inspecting UI components
              </span>
            </div>
            <ProjectMockupStudPal />
          </div>
        </section>
      </ScrollReveal>

      {/* Main Case Study Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-16">
        
        {/* Section 1: Project Objective */}
        <ScrollReveal direction="up" distance={20} duration={500}>
          <section className="space-y-4 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
              The Objective &amp; Problem Space
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Students and technical professionals often juggle fragmented tools: calendar apps for scheduling, notes apps for summaries, and timer apps for focus. This fragmentation creates friction, cognitive load, and loss of study momentum.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              The objective of StudPal was to bring these disparate activities into a single, uncluttered workspace. Rather than over-gamifying with loud animations, StudPal was architected to be an unobtrusive companion that stays focused on deep comprehension and consistent progress.
            </p>
          </section>
        </ScrollReveal>

        {/* Section 2: Design Approach */}
        <ScrollReveal direction="up" distance={20} duration={500}>
          <section className="space-y-4 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
              Design Approach &amp; Visual System
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Inspired by Apple's minimalist hardware aesthetics and editorial publication grids, the interface is anchored in a pristine neutral canvas. High-contrast typography guides the eye, while color is deployed strictly for functional feedback:
            </p>
            <ul className="space-y-3 pt-2 text-slate-700 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D62FF] shrink-0 mt-0.5" />
                <span>
                  <strong>Distraction-Free Focus:</strong> Reduced extraneous toolbars during active focus sessions, leaving only elapsed time and current target concept visible.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D62FF] shrink-0 mt-0.5" />
                <span>
                  <strong>Zero-Pill Metadata:</strong> Avoided messy pill enclosures; session durations and topic tags are styled as clean, unboxed text with typography separators.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D62FF] shrink-0 mt-0.5" />
                <span>
                  <strong>Optimistic Client-Side Feedback:</strong> Instant state updates for task completions and timer toggles with zero UI latency.
                </span>
              </li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Section 3: Technical Implementation */}
        <section className="space-y-6">
          <ScrollReveal direction="up" distance={20} duration={500}>
            <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
              Technical Implementation &amp; Architecture
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal direction="up" distance={24} duration={550} delay={0}>
              <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2D62FF]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Precision Timing Math
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard JavaScript <code className="text-[#2D62FF]">setInterval</code> drifts when tabs are throttled. StudPal calculates elapsed duration via high-resolution timestamp deltas (<code className="text-[#2D62FF]">Date.now()</code> and <code className="text-[#2D62FF]">performance.now()</code>), preserving second-accuracy across backgrounded browser tabs.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={24} duration={550} delay={100}>
              <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2D62FF]">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Firebase Firestore Sync
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structured Firestore document collections capture session logs, topic milestones, and user study presets with granular security rules preventing unauthorized reads.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={24} duration={550} delay={200}>
              <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2D62FF]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  AI Synthesis Pipeline
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Integrated structured concept extraction pipelines that distill lengthy curriculum notes into concise bullet summaries and active-recall prompt cards.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 4: Key Challenges & Solutions */}
        <ScrollReveal direction="up" distance={20} duration={500}>
          <section className="space-y-4 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
              Engineering Challenges &amp; Solutions
            </h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Challenge: Data Persistence vs Offline Resiliency</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Network interruptions shouldn't lose a 45-minute focus session. We implemented an offline-first indexed cache that batches session telemetry locally, syncing seamlessly to Firestore as soon as connectivity resumes.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-[#2D62FF]" />
                  <span>Challenge: Avoiding Visual Cognitive Overload</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Too many widgets make studying stressful. We tested multiple information architectures and adopted a single active card focal model with collapsible secondary drawers.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Section 5: Current Status & Roadmap */}
        <ScrollReveal direction="up" distance={24} duration={600}>
          <section className="p-8 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#2D62FF] uppercase tracking-wider">
                  Current Status
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Core Prototype Completed · Architecture Validated
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-xl">
                  The foundational application architecture, state engine, and responsive interface system are fully operational. Planned expansions include peer study rooms and spaced repetition flashcards.
                </p>
              </div>
              <button
                onClick={() => {
                  trackEvent('project_cta_click', { source: 'studpal_discuss_similar' });
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
              onClick={() => navigate('/projects/aurenix')}
              className="btn-glass-secondary group inline-flex items-center gap-3 p-4 rounded-2xl transition-all text-right cursor-pointer"
            >
              <div>
                <span className="text-xs text-slate-400 block">Next Case Study</span>
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#2D62FF] transition-colors">
                  Aurenix Research →
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
