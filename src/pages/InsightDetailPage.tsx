/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { INSIGHTS_DATA, InsightArticle } from '../data/insightsData';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  CheckCircle2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface InsightDetailPageProps {
  slug: string;
}

export const InsightDetailPage: React.FC<InsightDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();

  const article: InsightArticle | undefined = INSIGHTS_DATA[slug];

  if (!article) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="text-3xl font-bold text-slate-900">Article Not Found</h1>
        <p className="mt-2 text-slate-600">The requested insight article could not be found.</p>
        <button
          onClick={() => navigate('/insights')}
          className="mt-6 btn-glass-primary px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
        >
          View All Insights
        </button>
      </div>
    );
  }

  // Generate Article Schema & Breadcrumbs Schema
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedDate,
        dateModified: article.updatedDate,
        mainEntityOfPage: `https://sitenoble.com/insights/${article.slug}`,
        author: {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role,
          url: 'https://sitenoble.com/resume'
        },
        publisher: {
          '@type': 'Organization',
          name: 'SiteNoble',
          url: 'https://sitenoble.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://sitenoble.com/favicon.png'
          }
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
            name: 'Insights',
            item: 'https://sitenoble.com/insights'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: `https://sitenoble.com/insights/${article.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 sm:pb-32 bg-white text-left">
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        canonicalPath={`/insights/${article.slug}`}
        ogType="article"
        schema={schema}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* Breadcrumb */}
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
            href="/insights"
            onClick={(e) => {
              e.preventDefault();
              navigate('/insights');
            }}
            className="hover:text-slate-900 transition-colors"
          >
            Insights
          </a>
          <span>/</span>
          <span className="text-[#2D62FF] font-semibold truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <ScrollReveal direction="up" distance={24} duration={600}>
          <header className="space-y-6 pb-10 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-bold text-[#2D62FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedDate}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B0B0F] leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {article.excerpt}
            </p>

            {/* Author Byline */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D62FF] text-white flex items-center justify-center font-bold text-xs">
                  PE
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 block">
                    {article.author.name}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    {article.author.role}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      url: window.location.href
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
                className="btn-glass-secondary p-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs flex items-center gap-1.5 cursor-pointer"
                title="Share this article"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </header>
        </ScrollReveal>

        {/* Table of Contents */}
        <ScrollReveal direction="up" distance={20} duration={500} delay={100}>
          <section className="my-10 p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
              Table of Contents
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              {article.tableOfContents.map((toc) => (
                <li key={toc.id}>
                  <a
                    href={`#${toc.id}`}
                    className="hover:text-[#2D62FF] transition-colors block py-0.5"
                  >
                    {toc.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        {/* Article Body Content */}
        <div className="prose max-w-none space-y-12">
          {article.content.map((sec) => (
            <ScrollReveal key={sec.sectionId} direction="up" distance={24} duration={550}>
              <section id={sec.sectionId} className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0B0F] tracking-tight">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-[17px] text-slate-700 leading-relaxed font-normal">
                    {p}
                  </p>
                ))}

                {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                  <div className="p-5 my-4 rounded-xl bg-blue-50/60 border border-blue-100/90 space-y-2">
                    <span className="text-xs font-bold text-[#2D62FF] uppercase tracking-wider block">
                      Key Strategy Takeaways
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium">
                      {sec.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#2D62FF] shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </ScrollReveal>
          ))}
        </div>

        {/* Related Services Contextual Links */}
        <ScrollReveal direction="up" distance={20} duration={500}>
          <section className="mt-16 pt-8 border-t border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
              Related Agency Capabilities
            </span>
            <div className="flex flex-wrap gap-3">
              {article.relatedServices.map((rel) => (
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

        {/* Author Bio Box */}
        <ScrollReveal direction="up" distance={24} duration={550}>
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#2D62FF] text-white flex items-center justify-center font-extrabold text-xl shrink-0 shadow-md">
              PE
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-base font-bold text-slate-900">
                Written by Praise Egburedi
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Praise Egburedi leads web engineering and UI/UX architecture at SiteNoble, designing high-performance web applications and digital platforms for international startups and brands.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => navigate('/resume')}
                  className="text-xs font-semibold text-[#2D62FF] hover:underline"
                >
                  View Professional Résumé &amp; Experience →
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Next Project CTA */}
        <ScrollReveal direction="up" distance={24} duration={600}>
          <div className="mt-12 p-8 rounded-3xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Have questions or a project to build?</h4>
              <p className="text-xs text-slate-400">Let’s discuss your technical architecture and requirements.</p>
            </div>
            <button
              onClick={() => {
                trackEvent('project_cta_click', { source: `insight_closing_${article.slug}` });
                navigate('/contact');
              }}
              className="btn-glass-primary px-6 py-3 rounded-xl text-white text-xs font-semibold cursor-pointer shrink-0"
            >
              Start an Agency Project
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
