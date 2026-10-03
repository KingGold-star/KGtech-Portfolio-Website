/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const FloatingChromeTorus: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-11 h-11 sm:w-13 sm:h-13 drop-shadow-[0_10px_20px_rgba(0,0,0,0.14)] opacity-90 transition-transform duration-700 hover:rotate-12"
      >
        <defs>
          <linearGradient id="torusGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F1F5F9" />
            <stop offset="0.3" stopColor="#CBD5E1" />
            <stop offset="0.6" stopColor="#94A3B8" />
            <stop offset="0.85" stopColor="#64748B" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>
          <radialGradient id="torusHighlight" cx="35" cy="30" r="30" fx="35" fy="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* 3D Torus Ring Outer & Inner path */}
        <path
          d="M 50 15 A 35 25 35 1 0 50 85 A 35 25 35 1 0 50 15 Z M 50 32 A 18 12 35 1 1 50 68 A 18 12 35 1 1 50 32 Z"
          fill="url(#torusGrad)"
        />
        <path
          d="M 50 15 A 35 25 35 1 0 50 85 A 35 25 35 1 0 50 15 Z M 50 32 A 18 12 35 1 1 50 68 A 18 12 35 1 1 50 32 Z"
          fill="url(#torusHighlight)"
        />
      </svg>
    </div>
  );
};

export const FloatingChromeSphere: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 80 80"
        className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] opacity-85 transition-transform duration-700 hover:scale-110"
      >
        <defs>
          <radialGradient id="sphereGrad" cx="35%" cy="30%" r="65%" fx="35%" fy="30%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="55%" stopColor="#94A3B8" />
            <stop offset="85%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="32" fill="url(#sphereGrad)" />
        {/* Soft highlight crescent */}
        <ellipse cx="32" cy="26" rx="14" ry="9" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 32 26)" />
      </svg>
    </div>
  );
};
