import React from 'react';
import { useRouter, scrollToPageSection } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { HeroReferenceLayout } from '../components/HeroReferenceLayout';
import { CapabilityStrip } from '../components/CapabilityStrip';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { SpotlightCard } from '../components/SpotlightCard';
import { ProjectType } from '../types';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Code2, 
  Layout, 
  Layers, 
  RefreshCw, 
  Palette, 
  ShoppingBag, 
  Wrench,
  CheckCircle2, 
  Mail, 
  GitBranch, 
  Cloud, 
  Server, 
  Terminal,
  ExternalLink,
  UserCheck,
  Sparkles,
  Bot
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        scrollToPageSection(hash);
      }, 100);
    }
  }, []);

  const handleStartProject = (source: string, preselectedService?: ProjectType) => {
    trackEvent('project_cta_click', { source });
    navigate('/contact', { preselectedService });
  };

  const services: Array<{
    title: string;
    slug: string;
    description: string;
    icon: React.ElementType;
    projectType: ProjectType;
  }> = [
    {
      title: 'Business Websites',
      slug: 'business-websites',
      description: 'Professional, responsive websites that communicate value, establish credibility, and help customers take action.',
      icon: Layout,
      projectType: 'Business Website'
    },
    {
      title: 'Landing Pages',
      slug: 'landing-pages',
      description: 'Focused landing pages designed around clear messaging, user journeys, and conversion objectives.',
      icon: ArrowUpRight,
      projectType: 'Landing Page'
    },
    {
      title: 'Web Applications',
      slug: 'web-applications',
      description: 'Interactive digital products with functional interfaces, application logic, and backend integrations.',
      icon: Code2,
      projectType: 'Web Application'
    },
    {
      title: 'Website Redesigns',
      slug: 'website-redesign',
      description: 'Modernize outdated websites through improved visual design, navigation, responsiveness, and usability.',
      icon: RefreshCw,
      projectType: 'Website Redesign'
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'Thoughtful interface systems, wireframes, layouts, and user flows that make digital products easier to use.',
      icon: Palette,
      projectType: 'UI/UX Design'
    },
    {
      title: 'E-commerce Websites',
      slug: 'ecommerce-development',
      description: 'Online storefront experiences with product presentation, shopping flows, and appropriate commerce integrations.',
      icon: ShoppingBag,
      projectType: 'E-commerce Website'
    },
    {
      title: 'Website Maintenance',
      slug: 'website-maintenance',
      description: 'Ongoing updates, bug fixes, content changes, and technical improvements.',
      icon: Wrench,
      projectType: 'Website Maintenance'
    },
    {
      title: 'AI Integration & Automation',
      slug: 'ai-integration',
      description: 'Practical AI integrations, automated workflows, document synthesizers, and knowledge-grounded assistants.',
      icon: Bot,
      projectType: 'Other'
    },
    {
      title: 'SaaS & Digital Products',
      slug: 'saas-development',
      description: 'Scalable multi-tenant SaaS platforms, subscription portals, and custom web products engineered for performance, security, and growth.',
      icon: Layers,
      projectType: 'SaaS & Digital Product Development'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discover',
      description: 'Understand objectives, audience, requirements, and constraints.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Establish the structure, user experience, visual direction, and interface.'
    },
    {
      number: '03',
      title: 'Develop',
      description: 'Build responsive interfaces, integrate functionality, and test the implementation.'
    },
    {
      number: '04',
      title: 'Launch & Refine',
      description: 'Deploy the solution, address launch issues, and support agreed improvements.'
    }
  ];

  const homepageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KGtech Nexus',
    url: 'https://kgtechnexus.com',
    description: 'Web Development & Digital Solutions Agency',
    publisher: {
      '@type': 'Organization',
      name: 'KGtech Nexus',
      url: 'https://kgtechnexus.com',
      logo: 'https://kgtechnexus.com/favicon.png'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kgtechnexus.com/services?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="KGtech Nexus | Web Development & Digital Solutions Agency"
        description="KGtech Nexus designs and develops professional websites, web applications, and digital experiences that help businesses strengthen their online presence."
        canonicalPath="/"
        schema={homepageSchema}
      />

      {/* ========================================================================= */}
      {/* SECTION 01 — HERO (DESIGN MATCHING USER REFERENCE) */}
      {/* ========================================================================= */}
      <ScrollReveal direction="none" duration={800}>
        <HeroReferenceLayout />
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* SECTION 02 — CAPABILITY STRIP */}
      {/* ========================================================================= */}
      <ScrollReveal direction="up" distance={20} duration={600} delay={100}>
        <CapabilityStrip />
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* SECTION 02 — SERVICES */}
      {/* ========================================================================= */}
      <section id="services" className="py-24 bg-[#F5F7FB]/60 border-y border-slate-100 scroll-mt-20" aria-label="Services Section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <ScrollReveal direction="up" distance={24}>
            <div className="max-w-3xl mb-16 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2D62FF] block mb-2">
                Agency Capabilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0B0F]">
                What We Can Help You Build
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                From a business website that establishes credibility to a fully functional web application, KGtech Nexus brings design and development together to create digital solutions with purpose.
              </p>
            </div>
          </ScrollReveal>

          {/* 9 Services Cards Grid (Clean 3x3 Layout with crawlable internal links) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <ScrollReveal
                  key={srv.title}
                  direction="up"
                  distance={28}
                  delay={idx * 60}
                  className="h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(45, 98, 255, 0.12)"
                    className="h-full p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4 text-left">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center group-hover:bg-[#2D62FF] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="text-lg font-bold text-[#0B0B0F] tracking-tight group-hover:text-[#2D62FF] transition-colors">
                        <a
                          href={`/services/${srv.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            trackEvent('service_cta_click', { service: srv.title });
                            navigate(`/services/${srv.slug}`);
                          }}
                        >
                          {srv.title}
                        </a>
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={`/services/${srv.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          trackEvent('service_cta_click', { service: srv.title });
                          navigate(`/services/${srv.slug}`);
                        }}
                        className="text-xs font-semibold text-[#2D62FF] group-hover:text-[#1E4ED8] flex items-center gap-1"
                      >
                        <span>Explore Service</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>

                      <button
                        onClick={() => {
                          trackEvent('project_cta_click', { source: `service_card_${srv.slug}` });
                          handleStartProject(`service_${srv.title}`, srv.projectType);
                        }}
                        className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal direction="up" distance={20} delay={200}>
            <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleStartProject('services_bottom')}
                className="btn-glass-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white text-sm font-semibold cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/services');
                }}
                className="btn-glass-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-slate-700 text-sm font-semibold cursor-pointer"
              >
                <span>View All Capabilities &amp; Deliverables</span>
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — ABOUT */}
      {/* ========================================================================= */}
      <section id="about" className="py-24 sm:py-32 scroll-mt-20" aria-label="About Section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Professional Portrait Placeholder */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="left" distance={36} duration={800}>
                <div className="relative mx-auto max-w-md rounded-3xl bg-[#F5F7FB] border border-slate-200/90 p-4 shadow-sm">
                  
                  {/* Clean Editorial Portrait Container */}
                  <div className="aspect-[4/5] w-full rounded-2xl bg-gradient-to-b from-slate-100 via-slate-50 to-white flex flex-col items-center justify-end p-3 text-center relative overflow-hidden border border-slate-200/60">
                    
                    {/* Photo of Praise */}
                    <img
                      src="/images/praise_portrait.png"
                      alt="Praise Egburedi - Lead Developer"
                      referrerPolicy="no-referrer"
                      className="w-full h-72 object-contain drop-shadow-md relative z-10"
                    />

                    <div className="w-full bg-white/95 backdrop-blur-xs rounded-xl p-3 border border-slate-200/80 shadow-xs relative z-20 mt-1">
                      <h4 className="text-base font-bold text-slate-900">
                        Praise Egburedi
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Lead Web Developer &amp; UI/UX Architect
                      </p>
                      <p className="text-[11px] font-semibold text-[#2D62FF] mt-0.5">
                        KGtech Nexus Agency
                      </p>
                      
                      <span className="mt-2.5 inline-block px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-medium">
                        Technical Leadership
                      </span>
                    </div>
                  </div>

                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-500">
                      Driving digital product excellence · Operating globally
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Exact Copy from Section 05 adapted for KGtech Nexus & Praise */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <ScrollReveal direction="right" distance={36} duration={800}>
                <div className="space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2D62FF] block">
                    About KGtech Nexus &amp; Leadership
                  </span>

                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0B0F] leading-tight">
                    More Than Just Writing Code. Engineering with Purpose.
                  </h2>

                  <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                    <p>
                      At <strong className="text-slate-900 font-semibold">KGtech Nexus</strong>, we bridge the gap between creative visual design and robust software engineering.
                    </p>
                    <p>
                      At the core of the agency is <strong className="text-slate-900 font-semibold">Praise Egburedi</strong>, who directs our web development and UI/UX design architecture. Praise's engineering philosophy drives every project we ship:
                    </p>
                    <p className="italic text-slate-700 border-l-2 border-[#2D62FF] pl-4 py-1">
                      "Our approach starts with understanding the problem, the people using the product, and the outcome the business wants to achieve. We then translate those requirements into clear interfaces, responsive experiences, and maintainable implementations."
                    </p>
                    <p>
                      Whether KGtech Nexus is delivering a high-converting corporate website or developing a sophisticated web application, our standard remains uncompromising: purposeful design, reliable functionality, and relentless attention to detail.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => navigate('/resume')}
                      className="btn-glass-secondary inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-slate-800 text-sm font-semibold cursor-pointer"
                    >
                      <span>Praise’s Background &amp; Résumé</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleStartProject('about_cta')}
                      className="btn-glass-primary inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-sm font-semibold cursor-pointer"
                    >
                      <span>Start an Agency Project</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05B — PRICING PLANS */}
      {/* ========================================================================= */}
      <ScrollReveal direction="up" distance={30} duration={750}>
        <PricingSection />
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* SECTION 04B — TESTIMONIALS */}
      {/* ========================================================================= */}
      <ScrollReveal direction="up" distance={30} duration={750}>
        <TestimonialsSection />
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* SECTION 06 — TECHNICAL EXPERTISE */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-24 bg-[#F5F7FB]/60 border-y border-slate-100 scroll-mt-20" aria-label="Technical Expertise">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <ScrollReveal direction="up" distance={24}>
            <div className="max-w-3xl mb-16 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2D62FF] block mb-2">
                Technology Stack
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0B0F]">
                Tools Behind the Experience
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                At KGtech Nexus, we use modern web technologies and robust development workflows to build responsive, maintainable, and scalable digital products.
              </p>
            </div>
          </ScrollReveal>

          {/* Grouped Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            {/* Core Development */}
            <ScrollReveal direction="up" distance={24} delay={0}>
              <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.1)" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Core Development
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    HTML5
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    CSS3
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    JavaScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    TypeScript
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>

            {/* Frontend */}
            <ScrollReveal direction="up" distance={24} delay={60}>
              <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.1)" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center">
                    <Layout className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Frontend
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    React
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Component Systems
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    State Management
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>

            {/* Styling */}
            <ScrollReveal direction="up" distance={24} delay={120}>
              <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.1)" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Styling
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Tailwind CSS
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Responsive Grids
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Fluid Typography
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>

            {/* Backend and Data */}
            <ScrollReveal direction="up" distance={24} delay={180}>
              <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.1)" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Backend and Data
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Firebase
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Firestore
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Firebase Authentication
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>

            {/* Development Workflow */}
            <ScrollReveal direction="up" distance={24} delay={240}>
              <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.1)" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Development Workflow
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Git
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    GitHub
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    AI-assisted development
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>

            {/* Deployment */}
            <ScrollReveal direction="up" distance={24} delay={300}>
              <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.1)" className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2D62FF] flex items-center justify-center">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Deployment
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Vercel/Netlify
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Production Bundling &amp; Optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF]" />
                    Performance Auditing
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — DEVELOPMENT PROCESS */}
      {/* ========================================================================= */}
      <section id="process" className="py-24 sm:py-32 scroll-mt-20" aria-label="Development Process">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <ScrollReveal direction="up" distance={24}>
            <div className="max-w-3xl mb-16 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2D62FF] block mb-2">
                Methodology
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0B0F]">
                A Clear Process. From Idea to Execution.
              </h2>
            </div>
          </ScrollReveal>

          {/* 4 Distinct Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {processSteps.map((step, idx) => (
              <ScrollReveal
                key={step.number}
                direction="up"
                distance={28}
                delay={idx * 80}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(45, 98, 255, 0.12)"
                  className="h-full p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#2D62FF]/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl font-extrabold font-mono text-[#2D62FF] block mb-4">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-[#0B0B0F] tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 08 — FREQUENTLY ASKED QUESTIONS (PROCESS & TIMELINES) */}
      {/* ========================================================================= */}
      <ScrollReveal direction="up" distance={30} duration={750}>
        <FAQSection />
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* SECTION 09 — CONTACT CTA */}
      {/* ========================================================================= */}
      <section 
        className="py-24 relative overflow-hidden" 
        style={{ backgroundColor: '#ffffff' }}
        aria-label="Contact Call to Action"
      >
        <ScrollReveal direction="up" distance={32} duration={800}>
          <div className="max-w-5xl mx-auto px-6 md:px-8 text-center relative z-10 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2D62FF] block">
              Let's Collaborate with KGtech Nexus
            </span>

            <h2 
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight"
              style={{ color: '#030000' }}
            >
              Have a Project in Mind?
            </h2>

            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#59677e' }}
            >
              Whether you're building a new web application, modernizing an existing business site, or seeking technical direction for your digital product, let's discuss what KGtech Nexus and Praise can engineer for you.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleStartProject('closing_cta')}
                className="btn-glass-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl cursor-pointer"
              >
                <span>Start an Agency Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=egburedipraise@gmail.com&su=Project%20Inquiry%20%E2%80%93%20KGtech%20Nexus&body=Hello%20Praise%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0A"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('contact_email_click', { source: 'closing_section' })}
                className="btn-glass-dark w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-medium text-slate-200 hover:text-white rounded-2xl cursor-pointer"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Email Praise &amp; KGtech Nexus</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
