/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, Home, Sparkles, MessageSquare, Briefcase, BookOpen } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-32 pb-24 bg-white text-center px-6">
      <SEOHead
        title="404 – Page Not Found | SiteNoble"
        description="The requested page could not be found on SiteNoble."
        canonicalPath="/404"
        noindex={true}
      />

      <div className="max-w-xl mx-auto space-y-6">
        <span className="text-6xl sm:text-8xl font-black text-[#2D62FF] block tracking-tighter">
          404
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B0B0F] tracking-tight">
          Page Not Found
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Explore our core sections below:
        </p>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-4">
          <button
            onClick={() => navigate('/')}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#2D62FF] hover:bg-blue-50/20 transition-all flex items-center gap-3 cursor-pointer"
          >
            <Home className="w-5 h-5 text-[#2D62FF]" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Homepage</span>
              <span className="text-[11px] text-slate-500">Return to agency home</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/services')}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#2D62FF] hover:bg-blue-50/20 transition-all flex items-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#2D62FF]" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Services</span>
              <span className="text-[11px] text-slate-500">View digital capabilities</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/insights')}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#2D62FF] hover:bg-blue-50/20 transition-all flex items-center gap-3 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-[#2D62FF]" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Insights</span>
              <span className="text-[11px] text-slate-500">Read technical articles</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#2D62FF] hover:bg-blue-50/20 transition-all flex items-center gap-3 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 text-[#2D62FF]" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Contact</span>
              <span className="text-[11px] text-slate-500">Start an agency project</span>
            </div>
          </button>
        </div>

        <div className="pt-6">
          <button
            onClick={() => navigate('/')}
            className="btn-glass-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
