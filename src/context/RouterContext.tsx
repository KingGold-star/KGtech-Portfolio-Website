/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProjectType, BudgetRange } from '../types';
import { trackEvent } from '../utils/analytics';

export const scrollToPageSection = (hash: string): boolean => {
  if (typeof window === 'undefined') return false;
  const targetHash = hash.startsWith('#') ? hash : '#' + hash;
  const targetId = targetHash.replace('#', '');

  if (!targetId || targetId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }

  if (targetId === 'pricing') {
    const cardsEl = document.getElementById('pricing-plans') || document.getElementById('pricing');
    if (cardsEl) {
      const rect = cardsEl.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const navbarOffset = 75;

      let targetTop: number;
      if (elementHeight < windowHeight - navbarOffset) {
        targetTop = absoluteTop - navbarOffset - ((windowHeight - navbarOffset) - elementHeight) / 2;
      } else {
        targetTop = absoluteTop - navbarOffset - 16;
      }
      if (targetTop < 0) targetTop = 0;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      return true;
    }
    return false;
  }

  const el = document.getElementById(targetId) || document.querySelector(targetHash);
  if (el) {
    const navbarOffset = 80;
    const targetTop = el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
    return true;
  }
  return false;
};

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, options?: { preselectedService?: ProjectType; preselectedBudget?: BudgetRange }) => void;
  preselectedService?: ProjectType;
  preselectedBudget?: BudgetRange;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#/')) {
        return hash.replace('#', '');
      }
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [preselectedService, setPreselectedService] = useState<ProjectType | undefined>(undefined);
  const [preselectedBudget, setPreselectedBudget] = useState<BudgetRange | undefined>(undefined);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#/')) {
        setCurrentPath(hash.replace('#', ''));
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    trackEvent('page_view', { page_path: currentPath, page_location: window.location.href });
  }, [currentPath]);

  const navigate = (path: string, options?: { preselectedService?: ProjectType; preselectedBudget?: BudgetRange }) => {
    if (options?.preselectedService) {
      setPreselectedService(options.preselectedService);
    }
    if (options?.preselectedBudget) {
      setPreselectedBudget(options.preselectedBudget);
    }

    // Check if it's a hash anchor on current page
    if (path.startsWith('#') && (currentPath === '/' || currentPath === '')) {
      scrollToPageSection(path);
      try {
        window.history.pushState({}, '', path);
      } catch {}
      return;
    }

    // If navigating to homepage with hash (e.g. from /contact, /resume, etc.)
    if (path.startsWith('/#') || (path.startsWith('#') && currentPath !== '/')) {
      const hash = path.replace('/', '');
      try {
        window.history.pushState({}, '', '/' + hash);
      } catch {}
      setCurrentPath('/');

      const pollScroll = (retries = 10) => {
        const scrolled = scrollToPageSection(hash);
        if (!scrolled && retries > 0) {
          setTimeout(() => pollScroll(retries - 1), 50);
        }
      };

      setTimeout(() => pollScroll(10), 60);
      return;
    }

    try {
      window.history.pushState({}, '', path);
    } catch {
      window.location.hash = '#' + path;
    }

    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, preselectedService, preselectedBudget }}>
      {children}
    </RouterContext.Provider>
  );
};
