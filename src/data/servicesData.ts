/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectType } from '../types';

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  projectType: ProjectType;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  targetAudience: string[];
  challengesSolved: {
    title: string;
    description: string;
  }[];
  deliverables: {
    title: string;
    description: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  technologies: string[];
  outcomes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedProjects?: {
    title: string;
    slug: string;
    type: string;
    description: string;
  }[];
  relatedServices: {
    title: string;
    slug: string;
  }[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  'business-websites': {
    slug: 'business-websites',
    title: 'Business Website Development Services',
    shortTitle: 'Business Websites',
    category: 'Corporate & Brand Platforms',
    projectType: 'Business Website',
    heroSubtitle: 'Custom, high-performance corporate websites designed to establish enterprise authority, articulate value propositions, and convert qualified business prospects.',
    metaTitle: 'Business Website Development Agency | KGtech Nexus',
    metaDescription: 'Custom business website development services by KGtech Nexus. Fast, responsive, SEO-ready corporate websites engineered for credibility and conversion.',
    overview: 'In modern B2B and consumer markets, your website is your primary brand touchpoint. KGtech Nexus designs and engineers tailor-made business websites that combine strategic visual design, fluid responsiveness, and clean semantic architecture. We replace generic website templates with purpose-built digital assets that clearly convey your capabilities and drive inbound inquiries.',
    targetAudience: [
      'B2B companies seeking enterprise credibility and inbound lead generation',
      'Professional service firms, agencies, and consultancies needing authority positioning',
      'Established businesses modernizing their legacy digital presence'
    ],
    challengesSolved: [
      {
        title: 'Outdated Visual Impression',
        description: 'Eliminate clunky legacy aesthetics with crisp typography, balanced whitespace, and brand-aligned interface design.'
      },
      {
        title: 'Poor Mobile Performance & High Bounce Rates',
        description: 'Ensure rapid sub-second page loads across mobile, tablet, and desktop viewports to retain high-intent visitors.'
      },
      {
        title: 'Unclear Conversion Journeys',
        description: 'Architect intuitive page flows, persuasive value statements, and friction-free inquiry touchpoints.'
      }
    ],
    deliverables: [
      {
        title: 'Bespoke UI/UX & Layout Architecture',
        description: 'Custom Figma designs and interactive prototypes crafted to match your brand positioning.'
      },
      {
        title: 'Responsive Frontend Engineering',
        description: 'Clean React and TypeScript components styled with Tailwind CSS for pixel-perfect fidelity across all devices.'
      },
      {
        title: 'On-Page Technical SEO & Schema',
        description: 'Structured JSON-LD schema markup, meta optimization, OpenGraph social cards, and semantic HTML5 landmarks.'
      },
      {
        title: 'Inquiry & Lead Capture Integration',
        description: 'Secure, spam-protected inquiry forms, email routing, and optional CRM webhooks.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Information Architecture',
        description: 'We analyze your commercial goals, target client personas, competitive positioning, and sitemap requirements.'
      },
      {
        step: '02',
        title: 'UI Design & Content Layout',
        description: 'We craft high-fidelity wireframes and layout compositions focusing on visual hierarchy and messaging clarity.'
      },
      {
        step: '03',
        title: 'Component Engineering & Integration',
        description: 'We code the website using modern frontend standards with zero layout shifts and optimized asset loading.'
      },
      {
        step: '04',
        title: 'QA, SEO Audit & Global Launch',
        description: 'Comprehensive cross-browser testing, Core Web Vitals optimization, and production deployment on Vercel.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3', 'Vercel'],
    outcomes: [
      'Sub-second page load speeds meeting Core Web Vitals thresholds',
      'Enhanced international brand perception and client trust',
      'Higher inquiry conversion rates with clear call-to-action funnels',
      'Maintainable, extensible frontend codebase'
    ],
    faqs: [
      {
        question: 'How long does a typical business website project take?',
        answer: 'Most custom business website projects take between 2 to 4 weeks depending on the number of unique templates, page count, and custom interactive components required.'
      },
      {
        question: 'Do you use WordPress or custom code?',
        answer: 'We engineer custom frontend architectures using React, TypeScript, and Tailwind CSS. This guarantees superior speed, zero plugin vulnerabilities, and bespoke design flexibility.'
      },
      {
        question: 'Will our business website be optimized for mobile devices and search engines?',
        answer: 'Yes. Every website we build is 100% mobile-first, responsive, and includes on-page technical SEO, semantic HTML, structured data markup, and sitemaps.'
      }
    ],
    relatedProjects: [
      {
        title: 'Aurenix Research Platform',
        slug: 'aurenix',
        type: 'Web Platform',
        description: 'Modern scientific research platform with complex data interfaces and clean brand presence.'
      }
    ],
    relatedServices: [
      { title: 'Website Redesign Services', slug: 'website-redesign' },
      { title: 'UI/UX Design Services', slug: 'ui-ux-design' },
      { title: 'Landing Page Development', slug: 'landing-pages' }
    ]
  },

  'landing-pages': {
    slug: 'landing-pages',
    title: 'High-Converting Landing Page Development',
    shortTitle: 'Landing Pages',
    category: 'Conversion Optimization',
    projectType: 'Landing Page',
    heroSubtitle: 'Laser-focused landing pages engineered for product launches, ad campaigns, and high-conversion marketing funnels.',
    metaTitle: 'Landing Page Design & Development Agency | KGtech Nexus',
    metaDescription: 'High-converting landing page development services by KGtech Nexus. Fast loading, responsive landing pages crafted for paid media and product launches.',
    overview: 'A landing page has one job: turn clicks into qualified inquiries or customers. KGtech Nexus designs and develops focused landing pages that eliminate distractions, highlight value propositions, and guide visitors toward a single, compelling action. We integrate visual storytelling with rapid loading times to maximize return on advertising spend.',
    targetAudience: [
      'Startups launching digital products, SaaS betas, or waitlists',
      'Marketing teams running paid ad campaigns (Google Ads, Meta, LinkedIn)',
      'Enterprises introducing specialized service packages or seasonal offers'
    ],
    challengesSolved: [
      {
        title: 'Low Campaign Conversion Rates',
        description: 'Restructure page copy and layout around proven conversion design principles to maximize lead capture.'
      },
      {
        title: 'Slow Loading Times Killing Paid Traffic',
        description: 'Deliver ultra-lightweight bundles that render instantly on mobile networks, preventing bounce before engagement.'
      },
      {
        title: 'Weak Mobile Usability',
        description: 'Ensure forms, CTAs, and interactive elements are tap-friendly and effortless to complete on smartphones.'
      }
    ],
    deliverables: [
      {
        title: 'High-Impact Hero Section',
        description: 'Engaging value statement, clear call to action, and interactive or visual proof above the fold.'
      },
      {
        title: 'Social Proof & Trust Architecture',
        description: 'Integrated testimonial carousels, client metrics, verified badges, and trust indicators.'
      },
      {
        title: 'Conversion Funnel & Form Engineering',
        description: 'Multi-step or single-step validated forms, instant feedback states, and tracking webhooks.'
      },
      {
        title: 'Analytics & Event Tracking',
        description: 'Google Analytics 4 custom event tracking (CTA clicks, form starts, completions) for granular ROI measurement.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Offer & Audience Analysis',
        description: 'We identify your primary audience pain points, unique selling points, and target conversion action.'
      },
      {
        step: '02',
        title: 'Wireframing & Copy Alignment',
        description: 'We map out a cohesive storytelling flow: hook, problem, solution, proof, and closing incentive.'
      },
      {
        step: '03',
        title: 'High-Speed Frontend Coding',
        description: 'We code the page with lightweight assets, hardware-accelerated animations, and responsive layouts.'
      },
      {
        step: '04',
        title: 'Conversion QA & Tracking Validation',
        description: 'We verify form delivery, validate analytics events, and launch on production infrastructure.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GA4 Event API'],
    outcomes: [
      'Higher visitor-to-lead conversion rates across paid and organic traffic',
      'Instant mobile page load under 1.2s',
      'Accurate conversion tracking in Google Analytics',
      'Seamless brand alignment with campaign messaging'
    ],
    faqs: [
      {
        question: 'Can you integrate our landing page with our email or CRM software?',
        answer: 'Yes. We support direct integration with Formspree, HubSpot, Mailchimp, custom webhooks, or serverless endpoints.'
      },
      {
        question: 'How fast can a landing page be designed and deployed?',
        answer: 'Standard landing page engagements are typically completed within 5 to 10 business days from discovery to production launch.'
      }
    ],
    relatedProjects: [
      {
        title: 'StudPal Personalized Learning',
        slug: 'studpal',
        type: 'Product Launch',
        description: 'Interactive product landing experience with live feature previews and student workflows.'
      }
    ],
    relatedServices: [
      { title: 'Business Website Development', slug: 'business-websites' },
      { title: 'UI/UX Design Services', slug: 'ui-ux-design' },
      { title: 'Web Application Development', slug: 'web-applications' }
    ]
  },

  'web-applications': {
    slug: 'web-applications',
    title: 'Custom Web Application Development Services',
    shortTitle: 'Web Applications',
    category: 'Full-Stack Software Engineering',
    projectType: 'Web Application',
    heroSubtitle: 'Custom, scalable, and responsive web applications engineered with modern React, TypeScript, and cloud architectures.',
    metaTitle: 'Custom Web Application Development Agency | KGtech Nexus',
    metaDescription: 'Custom web application development services by KGtech Nexus. Scalable, secure, high-performance web apps built with React, TypeScript, and modern backends.',
    overview: 'When off-the-shelf software falls short, custom web applications provide tailored workflows, superior performance, and complete intellectual property ownership. KGtech Nexus engineers robust web apps with modular frontend architectures, reliable state management, and secure cloud integrations designed to scale alongside your organization.',
    targetAudience: [
      'Startups building minimum viable products (MVPs) or enterprise-ready digital products',
      'Companies automating complex internal operations and employee portals',
      'Businesses creating customer dashboards, subscription platforms, or workflow tools'
    ],
    challengesSolved: [
      {
        title: 'Rigid Off-The-Shelf Software Limitations',
        description: 'Develop custom logic, specific user permissions, and custom workflows tailored exactly to your business model.'
      },
      {
        title: 'Poor UI Responsiveness in Complex Applications',
        description: 'Engineer performant client-side state, optimistic UI updates, and efficient rendering without lag.'
      },
      {
        title: 'Technical Debt & Fragile Architecture',
        description: 'Write type-safe, thoroughly structured TypeScript and component hierarchies that are easy to maintain and expand.'
      }
    ],
    deliverables: [
      {
        title: 'Architecture & Component Design',
        description: 'Modular application blueprint, data flow diagrams, and reusable UI design system.'
      },
      {
        title: 'Single-Page & Dynamic Web Application',
        description: 'High-performance React frontend with seamless routing, modal systems, and responsive data displays.'
      },
      {
        title: 'Authentication & Database Integration',
        description: 'Secure user authentication (Firebase Auth, JWT), relational or NoSQL database schemas, and API handlers.'
      },
      {
        title: 'Interactive Data Visualizations & Dashboards',
        description: 'Dynamic charts, metric summaries, real-time status monitors, and export utilities.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Technical Scoping & Data Modeling',
        description: 'We define user roles, core workflows, database schemas, state management, and third-party APIs.'
      },
      {
        step: '02',
        title: 'UX Wireframes & Component Design',
        description: 'We design the interactive application layouts, navigation hierarchy, tables, forms, and error states.'
      },
      {
        step: '03',
        title: 'Full-Stack Development & Testing',
        description: 'We build the frontend and backend integration with TypeScript, unit testing, and performance validation.'
      },
      {
        step: '04',
        title: 'Security Audit & Cloud Deployment',
        description: 'We review authentication guards, validate environment security, and deploy to modern cloud hosting.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Firestore', 'Node.js', 'Vite'],
    outcomes: [
      'A bespoke digital product tailored to your operational needs',
      'Fast, responsive interactions with zero page reload delays',
      'Enterprise-grade security and secure role-based data access',
      'Full source code ownership and comprehensive documentation'
    ],
    faqs: [
      {
        question: 'Can you build both the frontend and backend for our web application?',
        answer: 'Yes. KGtech Nexus provides end-to-end full-stack engineering, including interface design, React frontend logic, API integrations, authentication, and database modeling.'
      },
      {
        question: 'How do you handle data security and user permissions?',
        answer: 'We implement strict security rules, encrypted transmission over HTTPS, token validation, and granular role-based access control (RBAC).'
      }
    ],
    relatedProjects: [
      {
        title: 'StudPal Web Application',
        slug: 'studpal',
        type: 'Productivity Platform',
        description: 'Comprehensive study management platform with active session tools, timers, and progress tracking.'
      },
      {
        title: 'Aurenix Research Platform',
        slug: 'aurenix',
        type: 'Scientific Dashboard',
        description: 'Data-intensive research platform with complex interactive visualizations and analytical models.'
      }
    ],
    relatedServices: [
      { title: 'SaaS & Digital Product Development', slug: 'saas-development' },
      { title: 'UI/UX Design Services', slug: 'ui-ux-design' },
      { title: 'AI Integration Services', slug: 'ai-integration' }
    ]
  },

  'website-redesign': {
    slug: 'website-redesign',
    title: 'Website Redesign & Modernization Services',
    shortTitle: 'Website Redesigns',
    category: 'Brand & UX Evolution',
    projectType: 'Website Redesign',
    heroSubtitle: 'Transform outdated, slow websites into fast, modern, and high-converting digital assets without losing search equity.',
    metaTitle: 'Website Redesign Services Agency | KGtech Nexus',
    metaDescription: 'Professional website redesign services by KGtech Nexus. Modernize your brand visuals, improve Core Web Vitals, and preserve existing SEO rankings.',
    overview: 'As your business evolves, an aging website can undermine your credibility, frustrate mobile users, and stifle conversions. KGtech Nexus revitalizes your digital presence by updating visual aesthetics, streamlining navigation, optimizing Core Web Vitals, and executing careful SEO migration to preserve and elevate your organic search visibility.',
    targetAudience: [
      'Companies with websites built 3+ years ago suffering from outdated visuals',
      'Businesses rebranding or expanding their service offerings',
      'Websites with slow loading speeds, poor mobile UX, or declining conversion rates'
    ],
    challengesSolved: [
      {
        title: 'Loss of Brand Authority',
        description: 'Elevate your online image to match the true quality and maturity of your products and services.'
      },
      {
        title: 'Risk of SEO Traffic Drops During Redesign',
        description: 'Preserve existing URL equity through meticulous redirect mapping, structured data, and on-page optimization.'
      },
      {
        title: 'Cluttered Information Architecture',
        description: 'Restructure navigation and content hierarchies to make key information effortlessly discoverable.'
      }
    ],
    deliverables: [
      {
        title: 'Comprehensive UX & Technical Audit',
        description: 'Detailed review of current usability bottlenecks, speed metrics, and SEO performance.'
      },
      {
        title: 'Modern Brand-Aligned UI Redesign',
        description: 'Fresh design system featuring refined typography, color palettes, and responsive layouts.'
      },
      {
        title: 'Clean Modern Frontend Rebuild',
        description: 'Rebuild from the ground up using React and Tailwind CSS for lightning-fast delivery.'
      },
      {
        title: 'SEO Migration & 301 Redirect Architecture',
        description: 'Preserve your indexed rankings with accurate canonical URLs, meta transfers, and sitemaps.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Current Site Audit & Strategy',
        description: 'We evaluate existing analytics, high-performing pages, user feedback, and technical deficits.'
      },
      {
        step: '02',
        title: 'UX Re-Architecture & Wireframing',
        description: 'We reorganize the sitemap and page layouts to prioritize user clarity and conversion funnels.'
      },
      {
        step: '03',
        title: 'Modern Component Rebuild',
        description: 'We code the new site with modern frontend standards, clean assets, and responsive precision.'
      },
      {
        step: '04',
        title: 'Redirect Verification & Safe Launch',
        description: 'We verify canonical URLs, test all forms, check 301 redirects, and execute a zero-downtime deployment.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Schema.org JSON-LD'],
    outcomes: [
      'Noticeable lift in user engagement, time-on-page, and inquiry volume',
      'Dramatic improvement in Google Core Web Vitals performance scores',
      'Protection of existing organic search rankings during transition',
      'A refreshed, modern brand appearance across all devices'
    ],
    faqs: [
      {
        question: 'Will a website redesign hurt my existing Google search rankings?',
        answer: 'When executed properly by technical SEO specialists, a redesign preserves and improves rankings. We audit your top-performing URLs, maintain keyword topical authority, implement 301 redirects where paths change, and improve Core Web Vitals—a confirmed Google ranking signal.'
      },
      {
        question: 'Can we keep our existing content while redesigning the interface?',
        answer: 'Yes. We can migrate your existing content while refining formatting, typography, and callouts to make it significantly easier to read.'
      }
    ],
    relatedProjects: [
      {
        title: 'Aurenix Research Modernization',
        slug: 'aurenix',
        type: 'Platform Redesign',
        description: 'Transformed complex technical research workflows into a clean, modern interface system.'
      }
    ],
    relatedServices: [
      { title: 'Business Website Development', slug: 'business-websites' },
      { title: 'UI/UX Design Services', slug: 'ui-ux-design' },
      { title: 'Website Maintenance Services', slug: 'website-maintenance' }
    ]
  },

  'ui-ux-design': {
    slug: 'ui-ux-design',
    title: 'UI/UX Design & Design Systems Services',
    shortTitle: 'UI/UX Design',
    category: 'Product & Visual Design',
    projectType: 'UI/UX Design',
    heroSubtitle: 'Intuitive user interface systems, research-backed UX architecture, and cohesive design systems that simplify complex digital products.',
    metaTitle: 'UI/UX Design Agency & Design Systems | KGtech Nexus',
    metaDescription: 'User-centered UI/UX design and design system services by KGtech Nexus. Wireframing, interactive prototyping, and component libraries for modern digital products.',
    overview: 'Great software starts with exceptional user experience. KGtech Nexus designs intuitive digital interfaces that balance visual elegance with pragmatic usability. Led by Praise Egburedi, our UI/UX methodology prioritizes user empathy, design systems consistency, and technical feasibility to ensure your designs transition seamlessly into production code.',
    targetAudience: [
      'Tech startups designing their initial product interface or client portal',
      'Product teams needing a scalable Figma design system and component library',
      'Enterprises seeking to simplify complex data workflows and user interactions'
    ],
    challengesSolved: [
      {
        title: 'Confusing User Navigation & Drop-Offs',
        description: 'Streamline interaction pathways, reduce cognitive load, and design intuitive navigation patterns.'
      },
      {
        title: 'Inconsistent UI Across Product Screens',
        description: 'Establish unified design systems with reusable typography, tokens, colors, and UI component standards.'
      },
      {
        title: 'Design-to-Engineering Friction',
        description: 'Deliver developer-ready Figma specifications that translate directly into clean React and Tailwind components.'
      }
    ],
    deliverables: [
      {
        title: 'User Flow & Information Architecture',
        description: 'Comprehensive sitemaps, journey maps, and interaction blueprints.'
      },
      {
        title: 'Figma UI Component System',
        description: 'Design system with auto-layout, atomic components, dark/light modes, and interactive states.'
      },
      {
        title: 'Interactive Clickable Prototypes',
        description: 'Realistic user testing prototypes for stakeholder review, user feedback, and investor demos.'
      },
      {
        title: 'Developer Handoff Documentation',
        description: 'Precise spacing tokens, typographic scales, assets, and responsive layout specifications.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'User Research & Problem Definition',
        description: 'We analyze target user habits, workflow requirements, and primary friction points.'
      },
      {
        step: '02',
        title: 'Low-Fidelity Wireframes',
        description: 'We explore rapid layout concepts and test navigation structure before committing to visual styling.'
      },
      {
        step: '03',
        title: 'High-Fidelity Interface & Design System',
        description: 'We craft pixel-perfect visual styling, micro-interactions, responsive states, and reusable components.'
      },
      {
        step: '04',
        title: 'Prototype Validation & Developer Handoff',
        description: 'We validate the prototype with real user workflows and package the design system for engineering.'
      }
    ],
    technologies: ['Figma', 'Design Systems', 'Responsive Grids', 'Tailwind Tokens', 'Prototyping'],
    outcomes: [
      'Significantly higher user satisfaction and product adoption',
      'Faster development cycles through reusable UI components',
      'Consistent, enterprise-grade brand presence across every screen',
      'Reduced user onboarding friction and support tickets'
    ],
    faqs: [
      {
        question: 'Do you provide design files in Figma?',
        answer: 'Yes. All UI/UX design deliverables are provided as fully organized, structured Figma files utilizing auto-layout, component variants, and design tokens.'
      },
      {
        question: 'Can you also code the designs you create?',
        answer: 'Yes. As a dual design and full-stack engineering agency, KGtech Nexus seamlessly implements our designs into production React and Tailwind CSS code.'
      }
    ],
    relatedProjects: [
      {
        title: 'StudPal Study Interface',
        slug: 'studpal',
        type: 'UI/UX Design',
        description: 'Minimalist study companion interface engineered for focus and reduced cognitive fatigue.'
      },
      {
        title: 'Aurenix Research Platform',
        slug: 'aurenix',
        type: 'Data Visualization UX',
        description: 'Complex scientific modeling interface with intuitive parameter controls and graphs.'
      }
    ],
    relatedServices: [
      { title: 'Web Application Development', slug: 'web-applications' },
      { title: 'SaaS & Digital Product Development', slug: 'saas-development' },
      { title: 'Business Website Development', slug: 'business-websites' }
    ]
  },

  'ecommerce-development': {
    slug: 'ecommerce-development',
    title: 'Custom E-Commerce Website Development',
    shortTitle: 'E-commerce Websites',
    category: 'Digital Commerce Platforms',
    projectType: 'E-commerce Website',
    heroSubtitle: 'Fast, secure, and intuitive e-commerce storefronts designed for smooth browsing, frictionless checkout, and scalable revenue growth.',
    metaTitle: 'Custom E-Commerce Website Development Agency | KGtech Nexus',
    metaDescription: 'Custom e-commerce website development by KGtech Nexus. Fast, mobile-first online stores with frictionless checkout and secure payment flows.',
    overview: 'Modern online shoppers demand speed, trust, and frictionless shopping experiences. KGtech Nexus designs and builds custom e-commerce websites that present products elegantly, load instantaneously on mobile devices, and guide customers effortlessly through product discovery to completed payment.',
    targetAudience: [
      'Direct-to-consumer (D2C) brands seeking a custom, high-converting digital storefront',
      'B2B suppliers and wholesalers modernizing order placement and product catalogs',
      'Retail businesses expanding into international digital commerce'
    ],
    challengesSolved: [
      {
        title: 'High Mobile Cart Abandonment',
        description: 'Optimize checkout flows, reduce form fields, and ensure responsive 1-click checkout options.'
      },
      {
        title: 'Slow Catalog Browsing & Filtering',
        description: 'Engineer fast client-side filtering, search, and dynamic product grids that respond without lag.'
      },
      {
        title: 'Security Concerns & Trust Gaps',
        description: 'Implement SSL encryption, trust badges, verified client reviews, and compliant payment gateways.'
      }
    ],
    deliverables: [
      {
        title: 'Custom Storefront UI/UX',
        description: 'Branded homepage, collection pages, product detail pages (PDPs), and cart drawers.'
      },
      {
        title: 'Product Catalog & Filter Engine',
        description: 'Fast faceted search, category filtering, variant selectors, and inventory display.'
      },
      {
        title: 'Secure Payment Gateway Integration',
        description: 'Integration with Stripe, PayPal, Paystack, or customized payment processors.'
      },
      {
        title: 'E-Commerce Schema & Product SEO',
        description: 'Product, Offer, and Review JSON-LD structured data for Google Shopping and search snippets.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Commerce Strategy & Catalog Architecture',
        description: 'We review product hierarchy, payment requirements, shipping zones, and customer journeys.'
      },
      {
        step: '02',
        title: 'Storefront UI/UX & Flow Design',
        description: 'We design high-converting product pages, intuitive cart interactions, and frictionless checkout screens.'
      },
      {
        step: '03',
        title: 'Frontend & Checkout Engineering',
        description: 'We build the store with React, integrate payment gateways, and optimize image asset delivery.'
      },
      {
        step: '04',
        title: 'Payment QA & Global Deployment',
        description: 'We test live transactions, verify order routing, check mobile responsiveness, and launch.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'Vite', 'Schema.org JSON-LD'],
    outcomes: [
      'Faster shopping experience with instantaneous catalog navigation',
      'Higher checkout completion rates on mobile devices',
      'Enhanced product visibility in Google Search with rich snippet markup',
      'Secure, reliable transaction handling'
    ],
    faqs: [
      {
        question: 'Which payment gateways can you integrate?',
        answer: 'We support all major payment providers including Stripe, PayPal, Paystack, Flutterwave, and custom API gateways.'
      },
      {
        question: 'How do you ensure our store is secure for client transactions?',
        answer: 'All transaction data is processed through PCI-DSS compliant payment gateways with end-to-end HTTPS encryption and zero local storage of sensitive credit card details.'
      }
    ],
    relatedProjects: [
      {
        title: 'Modern Brand Storefront',
        slug: 'studpal',
        type: 'Digital Commerce',
        description: 'Fast product catalog with interactive feature breakdowns and subscription tiers.'
      }
    ],
    relatedServices: [
      { title: 'Business Website Development', slug: 'business-websites' },
      { title: 'Landing Page Development', slug: 'landing-pages' },
      { title: 'Website Maintenance Services', slug: 'website-maintenance' }
    ]
  },

  'website-maintenance': {
    slug: 'website-maintenance',
    title: 'Website Maintenance, Optimization & Support',
    shortTitle: 'Website Maintenance',
    category: 'Ongoing Technical Care',
    projectType: 'Website Maintenance',
    heroSubtitle: 'Proactive website maintenance, speed optimization, security monitoring, and feature updates so your business never experiences downtime.',
    metaTitle: 'Website Maintenance & Performance Support | KGtech Nexus',
    metaDescription: 'Proactive website maintenance and optimization services by KGtech Nexus. Regular updates, bug fixes, speed enhancements, and technical support.',
    overview: 'A digital product is an evolving business asset that requires ongoing care. KGtech Nexus provides proactive maintenance, performance monitoring, continuous SEO hygiene, and rapid technical support to keep your web properties fast, secure, and functioning flawlessly.',
    targetAudience: [
      'Businesses requiring a dependable technical team to manage ongoing web updates',
      'Companies needing routine performance tuning and Core Web Vitals monitoring',
      'Organizations wanting regular content updates, security patches, and feature additions'
    ],
    challengesSolved: [
      {
        title: 'Unexpected Website Breakages & Downtime',
        description: 'Proactive monitoring and rapid resolution before issues impact visitors and revenue.'
      },
      {
        title: 'Gradual Performance Degradation',
        description: 'Continuous optimization of asset compression, scripts, and dependencies to preserve sub-second speed.'
      },
      {
        title: 'Lack of Internal Technical Bandwidth',
        description: 'A dedicated engineering team on call for ad-hoc adjustments, new pages, and updates.'
      }
    ],
    deliverables: [
      {
        title: 'Performance & Uptime Monitoring',
        description: 'Regular Core Web Vitals audits, latency checks, and availability monitoring.'
      },
      {
        title: 'Continuous Bug Fixes & Code Updates',
        description: 'Immediate remediation of broken layouts, form issues, or script errors.'
      },
      {
        title: 'Content & Layout Additions',
        description: 'Fast rollout of new landing pages, service sections, banners, or case studies.'
      },
      {
        title: 'SEO & Technical Hygiene',
        description: 'Regular sitemap updates, broken link audits, and structured data validation.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Initial Health & Security Audit',
        description: 'We inspect your existing codebase, dependencies, performance scores, and hosting environment.'
      },
      {
        step: '02',
        title: 'Baseline Optimization',
        description: 'We clean up legacy technical debt, patch outdated libraries, and establish performance baselines.'
      },
      {
        step: '03',
        title: 'Ongoing Monitoring & Support',
        description: 'We track uptime, performance metrics, and handle maintenance tickets with priority turnaround.'
      },
      {
        step: '04',
        title: 'Monthly Review & Strategy',
        description: 'We provide clear summaries of work completed, speed metrics, and recommended enhancements.'
      }
    ],
    technologies: ['Vite', 'React', 'TypeScript', 'Vercel Monitoring', 'Lighthouse CI', 'Git'],
    outcomes: [
      '99.9% web availability and peace of mind for your team',
      'Consistently fast page load times and optimal SEO health',
      'Rapid turnaround on critical business updates and new pages',
      'Lower total cost of ownership compared to emergency repairs'
    ],
    faqs: [
      {
        question: 'Do you offer monthly maintenance retainers?',
        answer: 'Yes. We offer flexible monthly maintenance arrangements that cover dedicated developer hours, proactive monitoring, speed audits, and continuous updates.'
      },
      {
        question: 'Can you maintain a website that was built by another developer or agency?',
        answer: 'Yes. We conduct a preliminary codebase review to understand the architecture, then assume ongoing maintenance and optimization responsibilities.'
      }
    ],
    relatedProjects: [
      {
        title: 'Aurenix Ongoing Engineering',
        slug: 'aurenix',
        type: 'Continuous Maintenance',
        description: 'Ongoing technical optimization, responsive refinements, and feature updates.'
      }
    ],
    relatedServices: [
      { title: 'Business Website Development', slug: 'business-websites' },
      { title: 'Website Redesign Services', slug: 'website-redesign' },
      { title: 'AI Integration Services', slug: 'ai-integration' }
    ]
  },

  'ai-integration': {
    slug: 'ai-integration',
    title: 'AI Integration & Intelligent Automation Services',
    shortTitle: 'AI Integration',
    category: 'Intelligent Web Solutions',
    projectType: 'Other',
    heroSubtitle: 'Supercharge your web applications with practical AI integrations, intelligent assistants, automated workflows, and generative tools.',
    metaTitle: 'AI Integration & Web Automation Agency | KGtech Nexus',
    metaDescription: 'Practical AI integration and web automation services by KGtech Nexus. Integrate modern LLMs, automated workflows, and intelligent features into your web apps.',
    overview: 'Artificial intelligence is most valuable when seamlessly woven into real-world business workflows. KGtech Nexus builds practical AI integrations—from intelligent customer assistants and document processors to generative content tools and automated business workflows—engineered for speed, reliability, and measurable ROI.',
    targetAudience: [
      'Businesses looking to automate repetitive data entry, inquiries, or workflow steps',
      'Startups building AI-powered digital products or interactive copilots',
      'Companies wanting to enhance user engagement with contextual search and smart recommendations'
    ],
    challengesSolved: [
      {
        title: 'High Support Overhead on Repetitive Questions',
        description: 'Deploy AI-driven conversational assistants trained on your knowledge base to resolve customer questions 24/7.'
      },
      {
        title: 'Manual Data Synthesis Bottlenecks',
        description: 'Automate content summarization, document analysis, and data extraction using modern AI APIs.'
      },
      {
        title: 'Complex AI Implementation Hurdles',
        description: 'Bridge the gap between complex AI model APIs and intuitive, responsive web interfaces.'
      }
    ],
    deliverables: [
      {
        title: 'Custom AI Assistant & Copilot Interfaces',
        description: 'Streaming chat interfaces, contextual suggestion chips, and responsive modal assistants.'
      },
      {
        title: 'API Integration & Pipeline Engineering',
        description: 'Secure serverless integration with OpenAI, Google Gemini, Anthropic, or specialized AI models.'
      },
      {
        title: 'Prompt Engineering & Grounding',
        description: 'Carefully engineered system prompts, guardrails, and knowledge retrieval logic.'
      },
      {
        title: 'Automated Business Workflows',
        description: 'Automated data transformation, lead qualification, and reporting pipelines.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Use Case Identification & Feasibility',
        description: 'We evaluate where AI delivers genuine business leverage rather than superficial novelty.'
      },
      {
        step: '02',
        title: 'Prompt Engineering & Architecture Design',
        description: 'We test model responses, define fallback behaviors, and structure secure API middleware.'
      },
      {
        step: '03',
        title: 'Frontend UI Integration & Streaming',
        description: 'We build responsive, stream-enabled chat and assistant interfaces with real-time feedback.'
      },
      {
        step: '04',
        title: 'Testing, Safety Guardrails & Launch',
        description: 'We validate token limits, error handling, safety filters, and deploy to production.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Google Gemini API', 'OpenAI API', 'Serverless Functions', 'Tailwind CSS'],
    outcomes: [
      'Substantial reduction in manual operational and customer support time',
      'Engaging, modern digital product experiences that differentiate your brand',
      'Secure, controlled API usage with predictable token costs',
      'Immediate business value without unnecessary infrastructure complexity'
    ],
    faqs: [
      {
        question: 'Which AI models do you integrate?',
        answer: 'We work with leading AI models including Google Gemini, OpenAI (GPT-4o), Anthropic Claude, and custom open-source models deployed on cloud endpoints.'
      },
      {
        question: 'How do you keep API keys and proprietary company data secure?',
        answer: 'All AI API interactions are routed through secure, server-side environments. API keys are never exposed in client-side code, and system prompts enforce strict data isolation.'
      }
    ],
    relatedProjects: [
      {
        title: 'StudPal AI Concept Synthesizer',
        slug: 'studpal',
        type: 'AI-Powered Platform',
        description: 'Integrated intelligent study assistant that breaks down complex subjects into bite-sized summaries.'
      }
    ],
    relatedServices: [
      { title: 'Web Application Development', slug: 'web-applications' },
      { title: 'SaaS & Digital Product Development', slug: 'saas-development' },
      { title: 'UI/UX Design Services', slug: 'ui-ux-design' }
    ]
  },

  'saas-development': {
    slug: 'saas-development',
    title: 'SaaS & Digital Product Development Services',
    shortTitle: 'SaaS & Digital Products',
    category: 'Product Engineering',
    projectType: 'SaaS & Digital Product Development',
    heroSubtitle: 'End-to-end SaaS engineering—from MVP prototyping to scalable multi-tenant architectures, subscription billing, and user dashboards.',
    metaTitle: 'SaaS & Digital Product Development Agency | KGtech Nexus',
    metaDescription: 'End-to-end SaaS and digital product development by KGtech Nexus. Fast prototyping, scalable architecture, billing integration, and intuitive dashboards.',
    overview: 'Launching a successful Software-as-a-Service (SaaS) platform requires more than code—it requires thoughtful product architecture, intuitive user onboarding, reliable subscription billing, and a technical stack that scales smoothly. KGtech Nexus partners with founders and companies to take SaaS products from concept to revenue-generating production.',
    targetAudience: [
      'SaaS founders developing MVPs to validate product-market fit and attract investors',
      'Established companies transitioning service models into scalable SaaS subscription offerings',
      'Tech ventures modernizing existing digital product architectures for global scale'
    ],
    challengesSolved: [
      {
        title: 'Slow Time-to-Market',
        description: 'Rapid, agile sprint development that delivers working software in weeks rather than quarters.'
      },
      {
        title: 'Complex Subscription & Billing Logic',
        description: 'Seamless integration with Stripe Billing, customer portal management, and tiered usage permissions.'
      },
      {
        title: 'High User Churn From Clunky UX',
        description: 'Intuitive onboarding flows, contextual tooltips, and responsive dashboards that retain active subscribers.'
      }
    ],
    deliverables: [
      {
        title: 'Multi-Tenant Product Architecture',
        description: 'Scalable frontend structure, state management, and role-based data isolation.'
      },
      {
        title: 'Interactive User & Admin Dashboards',
        description: 'Feature-rich user management, analytics graphs, settings portals, and activity logging.'
      },
      {
        title: 'Stripe Billing & Subscription Engine',
        description: 'Tiered pricing tables, automated checkout, webhook sync, and self-serve customer billing portals.'
      },
      {
        title: 'User Authentication & Security',
        description: 'Multi-factor authentication, social logins, password recovery, and secure session management.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Product Scoping & MVP Roadmap',
        description: 'We prioritize core revenue-generating features and eliminate scope bloat for fast delivery.'
      },
      {
        step: '02',
        title: 'UI/UX Design & Onboarding Flow',
        description: 'We design intuitive product screens, subscription flows, and friction-free user onboarding.'
      },
      {
        step: '03',
        title: 'Full-Stack Development & Billing Integration',
        description: 'We build the application with React, TypeScript, database models, and Stripe subscription pipelines.'
      },
      {
        step: '04',
        title: 'Beta Testing & Production Launch',
        description: 'We conduct end-to-end user testing, verify payment processing, and launch on scalable cloud infrastructure.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Firestore', 'Stripe API', 'Vite'],
    outcomes: [
      'Fast, successful market launch within 4 to 8 weeks',
      'Automated recurring revenue handling with zero manual billing intervention',
      'Scalable, clean codebase ready for future feature expansion',
      'Intuitive product UX that drives user activation and retention'
    ],
    faqs: [
      {
        question: 'How quickly can we build and launch a SaaS MVP?',
        answer: 'Depending on feature complexity, our streamlined agile sprints allow us to design, engineer, and deploy a fully functional SaaS MVP within 4 to 8 weeks.'
      },
      {
        question: 'Do we own all the source code and IP?',
        answer: 'Yes, 100%. Upon project completion, you retain complete, unencumbered ownership of all source code, design assets, and intellectual property.'
      }
    ],
    relatedProjects: [
      {
        title: 'StudPal Study Platform',
        slug: 'studpal',
        type: 'SaaS Platform',
        description: 'Multi-feature digital study tool with personalized planning, active tracking, and timers.'
      },
      {
        title: 'Aurenix Research Platform',
        slug: 'aurenix',
        type: 'Web Application',
        description: 'Complex scientific modeling platform with multi-parameter controls and live dashboards.'
      }
    ],
    relatedServices: [
      { title: 'Web Application Development', slug: 'web-applications' },
      { title: 'UI/UX Design Services', slug: 'ui-ux-design' },
      { title: 'AI Integration Services', slug: 'ai-integration' }
    ]
  }
};
