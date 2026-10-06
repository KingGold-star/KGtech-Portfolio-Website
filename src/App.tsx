/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';

// Code-split subpages so the initial homepage bundle is featherweight & loads instantly
const ServicesIndexPage = lazy(() => import('./pages/ServicesIndexPage').then(m => ({ default: m.ServicesIndexPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const InsightsIndexPage = lazy(() => import('./pages/InsightsIndexPage').then(m => ({ default: m.InsightsIndexPage })));
const InsightDetailPage = lazy(() => import('./pages/InsightDetailPage').then(m => ({ default: m.InsightDetailPage })));
const StudPalCaseStudy = lazy(() => import('./pages/StudPalCaseStudy').then(m => ({ default: m.StudPalCaseStudy })));
const AurenixCaseStudy = lazy(() => import('./pages/AurenixCaseStudy').then(m => ({ default: m.AurenixCaseStudy })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ResumePage = lazy(() => import('./pages/ResumePage').then(m => ({ default: m.ResumePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

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
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          {renderCurrentView()}
        </Suspense>
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
