/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { InsightsIndexPage } from './pages/InsightsIndexPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { StudPalCaseStudy } from './pages/StudPalCaseStudy';
import { AurenixCaseStudy } from './pages/AurenixCaseStudy';
import { ContactPage } from './pages/ContactPage';
import { ResumePage } from './pages/ResumePage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const renderCurrentView = () => {
    // 1. Clean path without trailing slash (except root)
    const cleanPath = currentPath.length > 1 && currentPath.endsWith('/') 
      ? currentPath.slice(0, -1) 
      : currentPath;

    // 2. Specific static routes
    if (cleanPath === '/' || cleanPath === '') {
      return <HomePage />;
    }
    if (cleanPath === '/services') {
      return <ServicesIndexPage />;
    }
    if (cleanPath === '/insights') {
      return <InsightsIndexPage />;
    }
    if (cleanPath === '/contact') {
      return <ContactPage />;
    }
    if (cleanPath === '/resume' || cleanPath === '/about') {
      return <ResumePage />;
    }
    if (cleanPath === '/projects/studpal') {
      return <StudPalCaseStudy />;
    }
    if (cleanPath === '/projects/aurenix') {
      return <AurenixCaseStudy />;
    }

    // 3. Dynamic Service Pages (/services/:slug)
    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '').trim();
      return <ServiceDetailPage slug={slug} />;
    }

    // 4. Dynamic Insight Articles (/insights/:slug)
    if (cleanPath.startsWith('/insights/')) {
      const slug = cleanPath.replace('/insights/', '').trim();
      return <InsightDetailPage slug={slug} />;
    }

    // 5. 404 Fallback
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B0B0F]">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
