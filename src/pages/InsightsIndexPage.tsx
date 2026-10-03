/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { INSIGHTS_DATA } from '../data/insightsData';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Calendar, 
  BookOpen, 
  User, 
  CheckCircle2 
} from 'lucide-react';

export const InsightsIndexPage: React.FC = () => {
  const { navigate } = useRouter();
  const articlesList = Object.values(INSIGHTS_DATA);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'SiteNoble Engineering & Digital Strategy Insights',
    description: 'Expert technical insights on web development, UI/UX architecture, performance optimization, and SaaS development by Praise Egburedi & SiteNoble.',
    url: 'https://sitenoble.com/insights',
    blogPost: articlesList.map((art) => ({
      '@type': 'BlogPosting',
      headline: art.title,
      description: art.excerpt,
      url: `https://sitenoble.com/insights/${art.slug}`,
      datePublished: art.publishedDate,
      dateModified: art.updatedDate,
      author: {
        '@type': 'Person',
        name: art.author.name
      }
    }))
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 sm:pb-32 bg-white text-left">
      <SEOHead
        title="Insights & Web Engineering Articles | SiteNoble"
        description="Technical insights, web performance audits, UI/UX principles, and digital product strategies by Praise Egburedi and SiteNoble."
        canonicalPath="/insights"
        schema={schema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header Section */}
        <ScrollReveal direction="up" distance={24}>
          <header className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-[#2D62FF] text-xs font-semibold tracking-wide">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Articles &amp; Industry Perspectives</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B0B0F] leading-[1.12]">
              Engineering &amp; Digital Strategy Insights
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-1">
              Practical analyses on modern web architecture, Core Web Vitals, user-centered interface design, SaaS engineering, and AI integration for growing businesses.
            </p>
          </header>
        </ScrollReveal>

        {/* Featured First Article Grid */}
        {articlesList.length > 0 && (
          <ScrollReveal direction="up" distance={28} delay={100} className="mb-12">
            <div
              onClick={() => {
                trackEvent('project_cta_click', { source: `insight_featured_${articlesList[0].slug}` });
                navigate(`/insights/${articlesList[0].slug}`);
              }}
              className="p-8 sm:p-12 rounded-3xl bg-[#F5F7FB] border border-slate-200 hover:border-[#2D62FF]/50 transition-all cursor-pointer group shadow-2xs hover:shadow-lg"
            >
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-[#2D62FF] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    Featured Insight · {articlesList[0].category}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {articlesList[0].readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0B0B0F] group-hover:text-[#2D62FF] transition-colors leading-tight">
                  {articlesList[0].title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {articlesList[0].excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <User className="w-4 h-4 text-[#2D62FF]" />
                    <span>{articlesList[0].author.name}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2D62FF] group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articlesList.slice(1).map((article, idx) => (
            <ScrollReveal
              key={article.slug}
              direction="up"
              distance={28}
              delay={idx * 60}
              className="h-full"
            >
              <article
                onClick={() => {
                  trackEvent('project_cta_click', { source: `insight_card_${article.slug}` });
                  navigate(`/insights/${article.slug}`);
                }}
                className="h-full p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#2D62FF]/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-[#2D62FF] uppercase tracking-wider bg-blue-50/80 px-2 py-0.5 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0B0B0F] tracking-tight group-hover:text-[#2D62FF] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {article.author.name}
                  </span>

                  <span className="font-bold text-[#2D62FF] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
};
