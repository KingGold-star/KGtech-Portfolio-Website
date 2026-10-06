import React from 'react';
import { Smartphone, Monitor, ShoppingBag } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const ShowcaseCards: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 lg:gap-7 items-center lg:items-end w-full max-w-[340px] sm:max-w-[400px] xl:max-w-[430px] pointer-events-auto">
      
      {/* ========================================================================= */}
      {/* CARD 1 — UI/UX DESIGNER */}
      {/* ========================================================================= */}
      <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.12)" className="w-full group select-none rounded-2xl sm:rounded-3xl">
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-[0_14px_36px_rgba(0,0,0,0.08)] border border-slate-100 group-hover:shadow-[0_20px_44px_rgba(45,98,255,0.16)] transition-all duration-300">
          {/* Showcase Preview Image */}
          <div className="rounded-xl sm:rounded-2xl h-36 sm:h-44 xl:h-48 flex items-center justify-center relative overflow-hidden bg-slate-100 border border-slate-100/80">
            <picture>
              <source srcSet="/images/card1_showcase.webp" type="image/webp" />
              <img 
                src="/images/card1_showcase.png" 
                alt="UI/UX Design Showcase" 
                className="w-full h-full object-cover object-top rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        {/* Floating Pill Label with Diamond Connector */}
        <div className="flex flex-col items-center -mt-2.5 relative z-10">
          <div className="w-2 h-2 bg-slate-400 rotate-45 mb-0.5 shadow-xs" />
          <div className="bg-white px-5 sm:px-6 py-2 rounded-full shadow-[0_4px_18px_rgba(0,0,0,0.07)] border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#2D62FF] transition-colors whitespace-nowrap flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#2D62FF]" />
            <span>UI/UX Designer</span>
          </div>
        </div>
      </SpotlightCard>

      {/* ========================================================================= */}
      {/* CARD 2 — LANDING PAGE */}
      {/* ========================================================================= */}
      <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.12)" className="w-full group select-none rounded-2xl sm:rounded-3xl">
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-[0_14px_36px_rgba(0,0,0,0.08)] border border-slate-100 group-hover:shadow-[0_20px_44px_rgba(45,98,255,0.16)] transition-all duration-300">
          {/* Showcase Preview Image */}
          <div className="rounded-xl sm:rounded-2xl h-36 sm:h-44 xl:h-48 flex items-center justify-center relative overflow-hidden bg-slate-100 border border-slate-100/80">
            <picture>
              <source srcSet="/images/card2_showcase.webp" type="image/webp" />
              <img 
                src="/images/card2_showcase.png" 
                alt="Project Showcase" 
                className="w-full h-full object-cover object-top rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        {/* Floating Pill Label with Diamond Connector */}
        <div className="flex flex-col items-center -mt-2.5 relative z-10">
          <div className="w-2 h-2 bg-slate-400 rotate-45 mb-0.5 shadow-xs" />
          <div className="bg-white px-5 sm:px-6 py-2 rounded-full shadow-[0_4px_18px_rgba(0,0,0,0.07)] border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#2D62FF] transition-colors whitespace-nowrap flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#2D62FF]" />
            <span>Landing Page</span>
          </div>
        </div>
      </SpotlightCard>

      {/* ========================================================================= */}
      {/* CARD 3 — E-COMMERCE WEBSITE */}
      {/* ========================================================================= */}
      <SpotlightCard spotlightColor="rgba(45, 98, 255, 0.12)" className="w-full group select-none rounded-2xl sm:rounded-3xl">
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-[0_14px_36px_rgba(0,0,0,0.08)] border border-slate-100 group-hover:shadow-[0_20px_44px_rgba(45,98,255,0.16)] transition-all duration-300">
          {/* Showcase Preview Image */}
          <div className="rounded-xl sm:rounded-2xl h-36 sm:h-44 xl:h-48 flex items-center justify-center relative overflow-hidden bg-slate-100 border border-slate-100/80">
            <picture>
              <source srcSet="/images/card3_showcase.webp" type="image/webp" />
              <img 
                src="/images/card3_showcase.png" 
                alt="E-commerce Showcase" 
                className="w-full h-full object-cover object-top rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        {/* Floating Pill Label with Diamond Connector */}
        <div className="flex flex-col items-center -mt-2.5 relative z-10">
          <div className="w-2 h-2 bg-slate-400 rotate-45 mb-0.5 shadow-xs" />
          <div className="bg-white px-5 sm:px-6 py-2 rounded-full shadow-[0_4px_18px_rgba(0,0,0,0.07)] border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#2D62FF] transition-colors whitespace-nowrap flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#2D62FF]" />
            <span>E-commerce Website</span>
          </div>
        </div>
      </SpotlightCard>

    </div>
  );
};
