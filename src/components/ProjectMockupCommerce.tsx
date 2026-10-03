/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Star, Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const ProjectMockupCommerce: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/50 overflow-hidden text-left">
      {/* Mock Browser Header */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-3 py-0.5 rounded-md flex items-center gap-1.5">
          <span className="text-emerald-500 text-xs">🔒</span>
          atelier-elegance.store/collection/spring-couture
        </div>
        <span className="text-[10px] text-[#2D62FF] font-semibold tracking-wide">E-Commerce</span>
      </div>

      {/* Main Showcase Image Preview */}
      <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden group/img">
        <img
          src="/images/card3_showcase.png"
          alt="Atelier Luxury Storefront"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
        />
        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-[10px] font-medium text-white">
                Spring / Summer '26
              </span>
              <div className="flex items-center text-amber-400 text-xs gap-0.5">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="text-[11px] font-semibold text-white">4.95 (1.4k reviews)</span>
              </div>
            </div>
            <h4 className="text-lg font-bold text-white tracking-tight">
              Cashmere Sartorial Trench Coat
            </h4>
          </div>
        </div>
      </div>

      {/* Interactive Micro-Storefront Controls */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#F8FAFC] space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Retail Price</div>
            <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>$485.00</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                In Stock · Express Ships
              </span>
            </div>
          </div>

          {/* Size Selector */}
          <div className="flex items-center gap-1.5">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Live CTA Button */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                : 'bg-[#2D62FF] hover:bg-[#1E4ED8] text-white shadow-md shadow-blue-500/20 hover:-translate-y-0.5'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Luxury Bag ({selectedSize})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Quick Add to Bag · Instant Checkout</span>
              </>
            )}
          </button>
          
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500 font-medium px-2 py-1 bg-white rounded-lg border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Stripe Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
