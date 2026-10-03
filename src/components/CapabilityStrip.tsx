/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout, Code2, Smartphone, CheckCircle2 } from 'lucide-react';

export const CapabilityStrip: React.FC = () => {
  const capabilities = [
    {
      icon: Layout,
      title: 'Thoughtful UI/UX',
      desc: 'Intuitive user flows & design systems'
    },
    {
      icon: Code2,
      title: 'Modern Development',
      desc: 'Clean TypeScript & React architecture'
    },
    {
      icon: Smartphone,
      title: 'Responsive Experiences',
      desc: 'Seamless across mobile, tablet & desktop'
    },
    {
      icon: CheckCircle2,
      title: 'Functional Solutions',
      desc: 'Engineered for real business outcomes'
    }
  ];

  return (
    <section className="border-y border-slate-100 bg-[#F5F7FB]/60 py-6 sm:py-8" aria-label="Core Capabilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-2.5 sm:gap-3.5 group cursor-default">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-[#2D62FF] shrink-0 shadow-2xs group-hover:bg-[#2D62FF] group-hover:text-white transition-colors duration-200">
                  <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#0B0B0F] group-hover:text-[#2D62FF] transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 hidden xs:block sm:block truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
