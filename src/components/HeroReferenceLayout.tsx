/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { HeroPortrait } from './HeroPortrait';
import { ShowcaseCards } from './ShowcaseCards';
import { FloatingChromeTorus, FloatingChromeSphere } from './FloatingChrome3D';
import { Mail, Globe, Check } from 'lucide-react';

export const HeroReferenceLayout: React.FC = () => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('egburedipraise@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-32 pb-10 sm:pb-14 overflow-hidden bg-white flex items-center" aria-label="Hero Section">
      {/* Seamless Ambient Radial Halo behind the portrait - 100% smooth blend */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] lg:w-[900px] h-[600px] sm:h-[750px] lg:h-[900px] rounded-full pointer-events-none -z-0"
        style={{
          background: 'radial-gradient(circle closest-side, rgba(226, 232, 240, 0.4) 0%, rgba(241, 245, 249, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(40px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: GREETING, BOLD NAME, BIO, EMAIL PILL & SOCIAL ICONS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-6 relative flex flex-col items-center lg:items-start order-2 lg:order-1">
            
            {/* Top-Left Floating 3D Chrome Torus Ring */}
            <FloatingChromeTorus className="absolute -top-12 -left-12 xl:-left-16 hidden xl:block" />

            <div className="relative z-10 space-y-2">
              {/* Live Status Radar Beacon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-medium text-slate-700 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="status-beacon-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for Select Client Projects</span>
              </div>

              {/* Greeting */}
              <span className="text-lg sm:text-2xl font-medium text-slate-800 tracking-tight block pt-1">
                Hello, I'm
              </span>

              {/* Bold Display Name with Layered Depth Shadow matching reference */}
              <h1 
                className="text-5xl sm:text-7xl xl:text-[84px] font-black tracking-tight text-[#1E293B] uppercase leading-none select-none break-words"
                style={{
                  textShadow: '0 4px 12px rgba(15, 23, 42, 0.12), 0 1px 2px rgba(15, 23, 42, 0.08)'
                }}
              >
                PRAISE
              </h1>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm font-normal">
              Lead Web Developer &amp; UI/UX Architect at <strong className="font-semibold text-slate-900">KGtech Nexus</strong>. Building modern web applications, high-converting digital platforms, and intuitive interfaces that move businesses forward.
            </p>

            {/* Floating Email Callout Bubble with Pointer */}
            <div className="pt-2 flex flex-col items-center lg:items-start">
              <div className="relative group">
                <button
                  onClick={handleCopyEmail}
                  className="btn-glass-secondary px-5 py-2 rounded-full text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                  title="Click to copy email address"
                >
                  <span>{copied ? 'Copied to Clipboard!' : 'egburedipraise@gmail.com'}</span>
                  {copied && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                {/* Speech Bubble Pointer Caret */}
                <div className="w-2.5 h-2.5 bg-white/80 backdrop-blur-md border-b border-r border-slate-200/60 rotate-45 mx-auto lg:ml-7 -mt-1.5 shadow-2xs" />
              </div>

              {/* Social Icons Row matching reference */}
              <div className="mt-3 flex items-center gap-3">
                {/* Email Circle (Primary Blue Glass) */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=egburedipraise@gmail.com&su=Project%20Inquiry%20%E2%80%93%20KGtech%20Nexus&body=Hello%20Praise%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0A"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('contact_email_click', { source: 'hero_circle_icon' })}
                  className="btn-glass-primary w-10 h-10 rounded-full text-white flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Send Email to Praise via Gmail"
                >
                  <Mail className="w-4.5 h-4.5" />
                </a>

                {/* Capabilities / Globe Circle (Secondary Glass) */}
                <button
                  onClick={() => {
                    const el = document.querySelector('#services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-glass-secondary w-10 h-10 rounded-full text-slate-700 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Explore Services & Capabilities"
                >
                  <Globe className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Bottom-Left Floating 3D Chrome Sphere */}
            <FloatingChromeSphere className="absolute -bottom-10 left-4 hidden xl:block" />

          </div>

          {/* ========================================================================= */}
          {/* CENTER COLUMN: PRAISE HERO PORTRAIT IN FRONT OF HALO */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 xl:col-span-4 flex justify-center items-end relative order-1 lg:order-2 -mt-3 lg:-mt-5">
            <HeroPortrait className="z-10" />
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 3 FLOATING SHOWCASE CARDS (UI/UX, 3D, REACT) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-end order-3 pt-2 lg:pt-4">
            <ShowcaseCards />
          </div>

        </div>
      </div>
    </section>
  );
};
