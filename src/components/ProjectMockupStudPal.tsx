/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Search, Sparkles, User, Flame } from 'lucide-react';

export const ProjectMockupStudPal: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revise Distributed Consensus (Raft & Paxos)', done: true, time: '35m' },
    { id: 2, title: 'Synthesize Neural Network Pruning Paper', done: false, time: '45m' },
    { id: 3, title: 'Implement React Query Cache Invalidation', done: false, time: '20m' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

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
          studpal.app/student/dashboard
        </div>
        <span className="text-[10px] text-emerald-600 font-medium">Concept UI</span>
      </div>

      {/* Main Workspace Frame */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#F5F7FB]/50 space-y-4">
        {/* Top bar inside app */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2D62FF] text-white flex items-center justify-center font-bold text-xs">
              SP
            </div>
            <span className="text-xs font-semibold text-slate-900">StudPal Companion</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1 text-amber-600 font-medium">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              14 Day Streak
            </span>
            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <User className="w-3 h-3 text-slate-600" />
            </div>
          </div>
        </div>

        {/* Dynamic Study Hub Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Smart Focus Timer Card */}
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="font-medium text-slate-700">Adaptive Pomodoro</span>
              <Clock className="w-3.5 h-3.5 text-[#2D62FF]" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              25:00
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Next break: 5 min stretch &amp; recall
            </p>
            <div className="mt-3 flex gap-2">
              <button 
                type="button"
                className="btn-glass-primary px-2.5 py-1 text-[11px] text-white rounded-md font-medium cursor-pointer"
              >
                Start Session
              </button>
              <button 
                type="button"
                className="btn-glass-secondary px-2.5 py-1 text-[11px] text-slate-600 rounded-md font-medium cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* AI Concept Digest Card */}
          <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-100 text-xs">
            <div className="flex items-center justify-between text-[#2D62FF] mb-1.5 font-medium">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AI Smart Summarizer
              </span>
              <span className="text-[10px] bg-blue-100/80 text-[#2D62FF] px-1.5 py-0.5 rounded">Active</span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              "Key takeaway: Raft decomposes consensus into leader election, log replication, and safety guarantees."
            </p>
            <div className="mt-2 text-[10px] text-slate-500">
              Source: Distributed Systems Paper v2
            </div>
          </div>
        </div>

        {/* Interactive Checklist */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2.5">
            <span>Today's Study Plan</span>
            <span className="text-[11px] font-normal text-slate-500">Click to toggle</span>
          </div>
          <div className="space-y-1.5">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => toggleTask(task.id)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors text-left border border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      task.done
                        ? 'bg-[#2D62FF] border-[#2D62FF] text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {task.done && <CheckCircle className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-xs ${
                      task.done ? 'line-through text-slate-400' : 'text-slate-800 font-medium'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{task.time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
