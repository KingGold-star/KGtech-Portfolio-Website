/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useRouter, scrollToPageSection } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState<string>('Home');

  const isLinkActive = (link: { label: string; href: string }) => {
    if (currentPath === '/') {
      return activeSection === link.label;
    }
    if (link.label === 'Services' && currentPath.startsWith('/services')) return true;
    if (link.label === 'Insights' && currentPath.startsWith('/insights')) return true;
    if (link.label === 'About' && currentPath.startsWith('/resume')) return true;
    return activeSection === link.label;
  };

  useEffect(() => {
    let ticking = false;

    const updateActiveState = () => {
      const currentY = window.scrollY;
      setIsScrolled((prev) => {
        // Hysteresis threshold to eliminate chatter/jitter around the transition point
        if (!prev && currentY > 30) return true;
        if (prev && currentY < 12) return false;
        return prev;
      });

      // Scroll Spy for active section highlighting on homepage
      if (currentPath === '/') {
        if (currentY < 180) {
          setActiveSection('Home');
        } else {
          // Check if reached very bottom of page
          const isAtBottom = window.innerHeight + currentY >= document.documentElement.scrollHeight - 60;
          if (isAtBottom) {
            setActiveSection('FAQ');
          } else {
            // Priority ordered sections from top to bottom
            const sections = [
              { id: 'faq', label: 'FAQ' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
            ];

            const viewportFocus = 140;
            let matched = 'Home';

            for (const sec of sections) {
              const el = document.getElementById(sec.id);
              if (el) {
                const rect = el.getBoundingClientRect();
                // Element is spanning across the viewport focus line
                if (rect.top <= viewportFocus && rect.bottom > viewportFocus) {
                  matched = sec.label;
                  break;
                }
              }
            }

            // If between section gaps, match the closest visible section
            if (matched === 'Home' && currentY >= 180) {
              let bestSec = 'Services';
              let minDistance = Infinity;
              for (const sec of sections) {
                const el = document.getElementById(sec.id);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  if (rect.top <= viewportFocus + 260 && rect.bottom > 0) {
                    const dist = Math.abs(rect.top - viewportFocus);
                    if (dist < minDistance) {
                      minDistance = dist;
                      bestSec = sec.label;
                    }
                  }
                }
              }
              matched = bestSec;
            }

            setActiveSection(matched);
          }
        }
      } else {
        if (currentPath.startsWith('/services')) {
          setActiveSection('Services');
        } else if (currentPath.startsWith('/insights')) {
          setActiveSection('Insights');
        } else if (currentPath.startsWith('/resume')) {
          setActiveSection('About');
        } else {
          setActiveSection('');
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveState();
          ticking = false;
        });
        ticking = true;
      }
    };

    if (currentPath.startsWith('/services')) {
      setActiveSection('Services');
    } else if (currentPath.startsWith('/insights')) {
      setActiveSection('Insights');
    } else if (currentPath.startsWith('/resume')) {
      setActiveSection('About');
    } else if (currentPath === '/') {
      setActiveSection('Home');
    } else {
      setActiveSection('');
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial state on mount
    updateActiveState();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const handleNavClick = (href: string, label: string, e?: React.MouseEvent) => {
    // Allow default for modifier keys (open in new tab)
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
      return;
    }
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '/') {
      setActiveSection('Home');
      if (currentPath !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        try {
          window.history.pushState(null, '', '/');
        } catch {}
      }
      return;
    }

    if (href.startsWith('#')) {
      setActiveSection(label);
      if (currentPath !== '/') {
        navigate('/' + href);
      } else {
        scrollToPageSection(href);
        try {
          window.history.pushState(null, '', href);
        } catch {}
      }
    } else {
      setActiveSection(label);
      navigate(href);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-300 ease-out">
      <div 
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-out ${
          isScrolled ? 'pt-3 sm:pt-4' : 'pt-2 sm:pt-3'
        }`}
      >
        {/* Floating Island Navbar */}
        <div
          className={`pointer-events-auto flex items-center justify-between rounded-2xl transition-all duration-300 ease-out ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-3 sm:px-6 py-2 sm:py-3'
              : 'bg-transparent border border-transparent shadow-none px-2 sm:px-4 py-2.5 sm:py-3.5'
          }`}
        >
          {/* Zone 1: Brand text element */}
          <button
            onClick={() => handleNavClick('/', 'Home')}
            className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#0B0B0F] hover:text-[#2D62FF] transition-colors focus:outline-none flex items-center cursor-pointer flex-shrink-0 mr-1 sm:mr-2"
            aria-label="SiteNoble Homepage"
          >
            <span>SiteNoble</span>
            <span className="text-[#2D62FF]">.</span>
          </button>

          {/* Zone 2: Clean text navigation links with interactive hover & active effects */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 xl:gap-2 text-[13px] lg:text-[14px] xl:text-[14.5px] font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, link.label, e)}
                  className={`group relative px-2.5 lg:px-3 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex flex-col items-center justify-center select-none active:scale-95 whitespace-nowrap ${
                    isActive
                      ? 'text-[#2D62FF] font-semibold bg-blue-50/80 shadow-2xs'
                      : 'text-slate-600 hover:text-[#2D62FF] hover:bg-slate-100/70'
                  }`}
                >
                  <span className="relative z-10 transition-colors duration-150">
                    {link.label}
                  </span>
                  {/* Subtle active/hover indicator bar */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full transition-all duration-200 pointer-events-none ${
                      isActive
                        ? 'w-5 bg-[#2D62FF] opacity-100 shadow-[0_1px_4px_rgba(45,98,255,0.4)]'
                        : 'w-0 bg-[#2D62FF] opacity-0 group-hover:w-4 group-hover:opacity-75'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action - Pill LET'S TALK */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                trackEvent('project_cta_click', { source: 'navbar_lets_talk' });
                navigate('/contact');
              }}
              className="btn-glass-primary px-6 lg:px-7 py-2.5 text-xs font-bold tracking-wider text-white uppercase rounded-full whitespace-nowrap active:translate-y-0 cursor-pointer"
            >
              LET'S TALK
            </button>
          </div>

          {/* Mobile Hamburger Button & Action */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                trackEvent('project_cta_click', { source: 'mobile_top_lets_talk' });
                navigate('/contact');
              }}
              className="btn-glass-primary px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-white rounded-xl cursor-pointer whitespace-nowrap"
            >
              Let's Talk
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-glass-secondary p-1.5 sm:p-2 text-slate-700 hover:text-slate-900 rounded-xl focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Accessible Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pointer-events-auto mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xl px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, link.label, e)}
                    className={`text-[15px] font-medium px-4 py-2.5 rounded-xl transition-all duration-150 flex items-center justify-between cursor-pointer active:scale-[0.98] ${
                      isActive
                        ? 'text-[#2D62FF] font-semibold bg-blue-50/80 shadow-2xs border-l-4 border-[#2D62FF]'
                        : 'text-slate-700 hover:text-[#2D62FF] hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#2D62FF] shadow-[0_0_8px_rgba(45,98,255,0.6)]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0" />
                    )}
                  </a>
                );
              })}
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackEvent('project_cta_click', { source: 'mobile_menu_start_project' });
                  navigate('/contact');
                }}
                className="btn-glass-primary w-full flex items-center justify-center gap-2 py-3 px-4 text-center font-semibold text-white rounded-xl cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
