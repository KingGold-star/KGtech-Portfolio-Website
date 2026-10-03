/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const JobDisplaySection: React.FC = () => {
  const { navigate } = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 3-Phone Mobile Suite default

  const projects = [
    {
      id: 'studpal',
      title: 'Mobile Ecosystem & Fintech Suite',
      subtitle: 'iOS & Android Financial Ecosystem',
      image: '/images/carousel_card_0.png',
      route: '/projects/studpal'
    },
    {
      id: 'akafinance',
      title: 'AkaFinanced Loan Platform',
      subtitle: 'Instant Pre-Approval & Banking Match',
      image: '/images/carousel_card_1.png',
      route: '/projects/aurenix'
    },
    {
      id: 'atelier',
      title: 'BOTOP Collections Storefront',
      subtitle: 'Bespoke Luxury Headless E-Commerce',
      image: '/images/carousel_card_2.png',
      route: '/contact'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    trackEvent('portfolio_project_view', { project: 'carousel_prev' });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    trackEvent('portfolio_project_view', { project: 'carousel_next' });
  };

  // Helper to determine slide position: 'center', 'left', or 'right'
  const getCardPosition = (cardIndex: number): 'center' | 'left' | 'right' => {
    if (cardIndex === currentIndex) return 'center';
    if (cardIndex === (currentIndex + 1) % 3) return 'right';
    return 'left';
  };

  const getCardClasses = (position: 'center' | 'left' | 'right'): string => {
    switch (position) {
      case 'center':
        return 'relative z-30 scale-100 opacity-100 blur-0 translate-x-0 w-full max-w-4xl lg:max-w-5xl cursor-default pointer-events-auto';
      case 'left':
        return 'absolute z-10 w-full max-w-4xl lg:max-w-5xl scale-[0.78] sm:scale-[0.81] lg:scale-[0.84] opacity-75 blur-[2px] hover:blur-none hover:opacity-100 -translate-x-[26%] sm:-translate-x-[23%] lg:-translate-x-[20%] cursor-pointer pointer-events-auto';
      case 'right':
        return 'absolute z-10 w-full max-w-4xl lg:max-w-5xl scale-[0.78] sm:scale-[0.81] lg:scale-[0.84] opacity-75 blur-[2px] hover:blur-none hover:opacity-100 translate-x-[26%] sm:translate-x-[23%] lg:translate-x-[20%] cursor-pointer pointer-events-auto';
    }
  };

  return (
    <div className="relative w-full py-4 select-none overflow-hidden">
      {/* Ambient background glow to blend with section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(45,98,255,0.03)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />
      
      {/* 3D Stage Viewport with ample margin for side curved edges */}
      <div className="relative w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Floating Left Navigation Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Project"
          className="absolute left-2 sm:left-5 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.14)] text-slate-700 hover:text-[#2D62FF] hover:border-[#2D62FF]/40 hover:scale-110 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Floating Right Navigation Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Project"
          className="absolute right-2 sm:right-5 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.14)] text-slate-700 hover:text-[#2D62FF] hover:border-[#2D62FF]/40 hover:scale-110 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Main 3-Card Deck Container */}
        <div className="relative min-h-[360px] sm:min-h-[480px] lg:min-h-[540px] flex items-center justify-center">
          {projects.map((proj, idx) => {
            const position = getCardPosition(idx);
            const isCenter = position === 'center';

            return (
              <div
                key={proj.id}
                onClick={() => !isCenter && setCurrentIndex(idx)}
                className={`transition-all duration-500 ease-out ${getCardClasses(position)}`}
              >
                {/* Image Card Container with Curved Rounded Corners & Elevation Shadow */}
                <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden shadow-[0_25px_60px_rgba(15,23,42,0.12),0_2px_6px_rgba(15,23,42,0.03)] border border-slate-200/70 bg-white relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-auto object-cover object-center block select-none"
                    loading="eager"
                  />

                  {/* Center Card Click Action Overlay */}
                  {isCenter && (
                    <div
                      onClick={() => {
                        trackEvent('portfolio_project_view', { project: proj.id });
                        navigate(proj.route);
                      }}
                      className="absolute inset-0 cursor-pointer"
                      title={`View ${proj.title}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Indicator Pills */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setCurrentIndex(idx);
                trackEvent('portfolio_project_view', { project: `carousel_slide_${idx}` });
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#2D62FF] shadow-xs'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
