/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Globe, Filter, FileText, Share2, Layers } from 'lucide-react';

export const ProjectMockupAurenix: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<'all' | 'solar' | 'grid' | 'hydrogen'>('all');

  const researchPapers = [
    {
      id: 1,
      domain: 'solar',
      title: 'Perovskite-Silicon Tandem Photovoltaics at Scale',
      authors: 'Clean Energy Labs & Dr. H. Vance',
      impact: '29.8% Efficiency',
      readTime: '6 min read'
    },
    {
      id: 2,
      domain: 'grid',
      title: 'Decentralized Microgrid Balancing with Edge Compute',
      authors: 'Aurenix Power Systems Group',
      impact: 'Zero Inverter Curtailment',
      readTime: '9 min read'
    },
    {
      id: 3,
      domain: 'hydrogen',
      title: 'Low-Temperature Electrolysis in Offshore Wind Farms',
      authors: 'Global Energy Institute',
      impact: '48 kWh/kg H2',
      readTime: '7 min read'
    }
  ];

  const filtered = activeDomain === 'all' 
    ? researchPapers 
    : researchPapers.filter(p => p.domain === activeDomain);

  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden text-left">
      {/* Mock Browser Header */}
      <div className="bg-[#F8FAFC] border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-3 py-0.5 rounded-md">
          aurenix.org/research/index
        </div>
        <span className="text-[10px] text-[#2D62FF] font-medium">Platform Architecture</span>
      </div>

      {/* Main Research Interface */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#F5F7FB]/50 space-y-4">
        {/* Research Portal Top Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              AR
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-900 block leading-tight">
                Aurenix Research Portal
              </span>
              <span className="text-[10px] text-slate-500">
                Energy &amp; Climate Innovation Knowledge Base
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              <Globe className="w-3 h-3 text-slate-500" />
              Global Open Access
            </span>
          </div>
        </div>

        {/* Search & Domain Filter Segmented Control */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              readOnly
              value="Filter research topics, authors, or energy vectors..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-500 cursor-default"
            />
          </div>

          {/* Clean Segmented Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveDomain('all')}
              className={`px-3 py-1 rounded-md transition-colors font-medium whitespace-nowrap cursor-pointer ${
                activeDomain === 'all'
                  ? 'btn-glass-primary text-white shadow-2xs'
                  : 'btn-glass-secondary text-slate-600 hover:text-slate-900'
              }`}
            >
              All Domains
            </button>
            <button
              onClick={() => setActiveDomain('solar')}
              className={`px-3 py-1 rounded-md transition-colors font-medium whitespace-nowrap cursor-pointer ${
                activeDomain === 'solar'
                  ? 'btn-glass-primary text-white shadow-2xs'
                  : 'btn-glass-secondary text-slate-600 hover:text-slate-900'
              }`}
            >
              Photovoltaics
            </button>
            <button
              onClick={() => setActiveDomain('grid')}
              className={`px-3 py-1 rounded-md transition-colors font-medium whitespace-nowrap cursor-pointer ${
                activeDomain === 'grid'
                  ? 'btn-glass-primary text-white shadow-2xs'
                  : 'btn-glass-secondary text-slate-600 hover:text-slate-900'
              }`}
            >
              Microgrids
            </button>
            <button
              onClick={() => setActiveDomain('hydrogen')}
              className={`px-3 py-1 rounded-md transition-colors font-medium whitespace-nowrap cursor-pointer ${
                activeDomain === 'hydrogen'
                  ? 'btn-glass-primary text-white shadow-2xs'
                  : 'btn-glass-secondary text-slate-600 hover:text-slate-900'
              }`}
            >
              Green Hydrogen
            </button>
          </div>
        </div>

        {/* Research Paper Briefs */}
        <div className="space-y-2">
          {filtered.map((paper) => (
            <div
              key={paper.id}
              className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#2D62FF]/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-slate-900 leading-snug">
                    {paper.title}
                  </h5>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{paper.authors}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">{paper.impact}</span>
                    <span aria-hidden="true">·</span>
                    <span>{paper.readTime}</span>
                  </div>
                </div>
                <div className="p-1 rounded-md bg-slate-50 text-slate-400 hover:text-slate-600 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
