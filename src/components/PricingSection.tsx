/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { BudgetRange } from '../types';
import { SpotlightCard } from './SpotlightCard';
import { Rocket, Star, Crown, CheckCircle2, ArrowRight, Settings, Link2, Code2, Boxes } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  price: string;
  period: string;
  icon: React.ElementType;
  featuresTitle: string;
  features: string[];
  ctaText: string;
}

export const PricingSection: React.FC = () => {
  const { navigate } = useRouter();

  const handleSelectPlan = (planName: string) => {
    trackEvent('project_cta_click', { source: `pricing_plan_${planName.toLowerCase()}` });
    let budget: BudgetRange = 'Basic ($299)';
    if (planName === 'Basic') budget = 'Basic ($299)';
    if (planName === 'Standard') budget = 'Standard ($599)';
    if (planName === 'Premium') budget = 'Premium ($999)';
    if (planName === 'Enterprise') budget = 'Enterprise ($1,500+)';
    navigate('/contact', { preselectedBudget: budget });
  };

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for small businesses and personal brands looking for a professional online presence.',
      price: '$299',
      period: 'One-time project fee',
      icon: Rocket,
      featuresTitle: "What you'll achieve",
      features: [
        'Modern, responsive website',
        'Up to 5 pages',
        'Clean and professional design',
        'Basic SEO setup',
        '1 month of free support'
      ],
      ctaText: 'Start a Project'
    },
    {
      id: 'standard',
      name: 'Standard',
      isPopular: true,
      badge: 'Recommended',
      description: 'Ideal for growing businesses that need more features, better engagement, and a stronger digital presence.',
      price: '$599',
      period: 'One-time project fee',
      icon: Star,
      featuresTitle: "What you'll achieve",
      features: [
        'Everything in Basic, plus:',
        'Up to 10 pages',
        'Advanced UI/UX design',
        'Blog integration',
        'Analytics setup',
        '3 months of free support'
      ],
      ctaText: 'Start a Project'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For established businesses that need advanced functionality, custom solutions, and ongoing support.',
      price: '$999',
      period: 'One-time project fee',
      icon: Crown,
      featuresTitle: "What you'll achieve",
      features: [
        'Everything in Standard, plus:',
        'Custom web applications',
        'E-commerce integration',
        'Advanced security & performance',
        'Priority support',
        '6 months of free support'
      ],
      ctaText: 'Start a Project'
    }
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#F8FAFC]/70 border-t border-slate-100 scroll-mt-20" aria-label="Pricing Plans">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2D62FF] block mb-2">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0B0F] leading-tight">
            Simple, Value-Driven Investment Plans.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Choose the right tier to bring your product or website to life with transparent scope, committed timelines, and zero hidden costs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div id="pricing-plans" className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6 items-center pt-4 sm:pt-6 pb-4 scroll-mt-24">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isStandard = plan.isPopular;

            return (
              <SpotlightCard
                key={plan.id}
                spotlightColor={isStandard ? 'rgba(45, 98, 255, 0.16)' : 'rgba(45, 98, 255, 0.08)'}
                className={`relative rounded-3xl flex flex-col justify-between text-left ${
                  isStandard
                    ? 'bg-white border-2 border-[#2D62FF] p-6 sm:p-10 lg:py-12 lg:px-10 shadow-[0_25px_60px_-15px_rgba(45,98,255,0.22),0_12px_24px_-8px_rgba(15,23,42,0.08)] lg:scale-105 lg:-translate-y-4 ring-4 ring-[#2D62FF]/10 z-20 animate-glow-pulse'
                    : 'bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-9 shadow-xs hover:border-slate-300 hover:shadow-md z-10'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#2D62FF]">
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 stroke-[2]" />
                    </div>

                    {plan.badge && (
                      <span className="px-3 py-1 rounded-full bg-[#2D62FF] text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B0B0F] tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[36px] sm:min-h-[44px]">
                    {plan.description}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B0B0F]">
                        {plan.price}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 mt-1 block">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 space-y-3 sm:space-y-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      {plan.featuresTitle}
                    </h4>
                    <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#2D62FF] shrink-0 mt-0.5" />
                          <span className={idx === 0 && feature.includes('plus:') ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-100">
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full py-3 sm:py-3.5 px-5 rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer ${
                      isStandard
                        ? 'btn-glass-primary text-white'
                        : 'btn-glass-secondary text-[#2D62FF] hover:text-[#1E4ED8]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </SpotlightCard>
            );
          })}
        </div>

        {/* Enterprise Full-Width Card */}
        <div className="mt-6 sm:mt-8 bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/90 p-5 sm:p-8 lg:p-10 shadow-[0_12px_36px_rgba(15,23,42,0.03)] hover:border-slate-300 transition-all text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            
            {/* Left: Title & Subtitle */}
            <div className="space-y-1 min-w-[180px]">
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#0B0B0F] tracking-tight">
                Enterprise
              </h3>
              <p className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight">
                Custom Pricing
              </p>
            </div>

            {/* Middle: 4 Features with Icons and Captions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 flex-1 max-w-3xl">
              {/* Feature 1 */}
              <div className="flex flex-col items-start space-y-1.5 sm:space-y-2">
                <Settings className="w-4 sm:w-5 h-4 sm:h-5 text-slate-800 stroke-[1.8]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  Custom platforms
                </span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start space-y-1.5 sm:space-y-2">
                <Link2 className="w-4 sm:w-5 h-4 sm:h-5 text-slate-800 stroke-[1.8]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  Advanced integrations
                </span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start space-y-1.5 sm:space-y-2">
                <Code2 className="w-4 sm:w-5 h-4 sm:h-5 text-slate-800 stroke-[1.8]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  Dedicated development
                </span>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-start space-y-1.5 sm:space-y-2">
                <Boxes className="w-4 sm:w-5 h-4 sm:h-5 text-slate-800 stroke-[1.8]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  Scalable architecture
                </span>
              </div>
            </div>

            {/* Right: Action Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleSelectPlan('Enterprise')}
                className="btn-glass-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
