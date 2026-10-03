/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Calendar, 
  Layers, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'schedule' | 'analytics' | 'modules'>('schedule');

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 lg:mt-16 group">
      {/* Subtle background glow effect (restrained) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#2D62FF]/10 via-indigo-500/5 to-[#2D62FF]/10 rounded-[28px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Browser Mockup Frame */}
      <div className="relative bg-white rounded-2xl md:rounded-[22px] border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Safari-style Browser Chrome Top Bar */}
        <div className="bg-[#F8FAFC] border-b border-slate-200/80 px-4 py-3 flex items-center justify-between gap-4 select-none">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
          </div>

          {/* Browser Address Pill */}
          <div className="flex-1 max-w-md mx-auto bg-white border border-slate-200 rounded-lg px-3.5 py-1 text-xs text-slate-500 flex items-center justify-center gap-2 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono text-[11px] text-slate-700 tracking-tight">
              studpal.app/workspace/active
            </span>
          </div>

          {/* Quick Action in chrome */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-[11px] font-medium text-[#2D62FF] bg-[#2D62FF]/5 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D62FF] animate-pulse" />
              Live Workspace
            </span>
          </div>
        </div>

        {/* Browser Viewport Content: Real Digital Product UI */}
        <div className="p-4 sm:p-6 bg-slate-50/50">
          
          {/* App Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2D62FF] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                SP
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                  StudPal &nbsp;·&nbsp; Personalized Study System
                </h4>
                <p className="text-xs text-slate-500">
                  Focus Session 03 &nbsp;·&nbsp; Advanced Systems Engineering
                </p>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === 'schedule'
                    ? 'bg-[#2D62FF] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === 'modules'
                    ? 'bg-[#2D62FF] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-[#2D62FF] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Metrics
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Active Timer Card */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium text-slate-700">Deep Work Cycle</span>
                    <Clock className="w-3.5 h-3.5 text-[#2D62FF]" />
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
                    42:18
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Distributed Systems &amp; Concurrency
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Session in progress
                  </span>
                  <button 
                    onClick={() => navigate('/projects/studpal')}
                    className="text-[11px] text-[#2D62FF] hover:underline font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>

              {/* Today's Milestones */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs md:col-span-2">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-medium text-slate-700">Sprint Milestones</span>
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2D62FF]" />
                      <span className="font-medium text-slate-800">
                        Interactive Knowledge Graph Model
                      </span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">Completed</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/60 border border-blue-100/80 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2D62FF] animate-ping" />
                      <span className="font-medium text-[#2D62FF]">
                        Firebase Cloud Functions Integration
                      </span>
                    </div>
                    <span className="text-[#2D62FF] font-medium text-[11px]">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Module 01: Core Architecture</span>
                  <span className="text-emerald-600 font-medium">92% Finished</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#2D62FF] h-1.5 rounded-full w-[92%]" />
                </div>
                <p className="text-slate-500 text-[11px]">
                  State management, asynchronous sync, and client-side indexing.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Module 02: Responsive Design System</span>
                  <span className="text-slate-600 font-medium">100% Ready</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-full" />
                </div>
                <p className="text-slate-500 text-[11px]">
                  Fluid grid, accessible typography, high contrast, and keyboard navigation.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-500">Core Web Vitals</p>
                <p className="text-2xl font-bold text-emerald-600 font-mono mt-1">99/100</p>
                <p className="text-[11px] text-slate-400 mt-1">LCP &lt; 0.8s</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-500">Interface Latency</p>
                <p className="text-2xl font-bold text-[#2D62FF] font-mono mt-1">&lt; 16ms</p>
                <p className="text-[11px] text-slate-400 mt-1">60 FPS smooth curves</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-500">Accessibility (a11y)</p>
                <p className="text-2xl font-bold text-slate-900 font-mono mt-1">100%</p>
                <p className="text-[11px] text-slate-400 mt-1">WCAG 2.1 AA Compliant</p>
              </div>
            </div>
          )}

          {/* Bottom Bar inside Mockup */}
          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>KGtech Nexus Platform · Lead Engineer Praise Egburedi</span>
            </span>
            <button
              onClick={() => navigate('/projects/studpal')}
              className="inline-flex items-center gap-1 text-[#2D62FF] font-medium hover:text-[#1E4ED8]"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Floating Glass Badge Accent (Subtle & Restrained) */}
      <div className="hidden lg:flex absolute -bottom-6 -left-6 glass-card px-4.5 py-3 rounded-2xl border border-slate-200/80 shadow-lg items-center gap-3 animate-in fade-in duration-300">
        <div className="w-9 h-9 rounded-xl bg-[#2D62FF]/10 text-[#2D62FF] flex items-center justify-center shrink-0">
          <Sparkles className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-900 leading-tight">
            High Engineering Standard
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            React · TypeScript · Scalable Codebase
          </p>
        </div>
      </div>

      <div className="hidden lg:flex absolute -top-5 -right-5 glass-card px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-lg items-center gap-2.5 animate-in fade-in duration-300">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span className="text-xs font-medium text-slate-800">
          Conversion-Focused Engineering
        </span>
      </div>
    </div>
  );
};
