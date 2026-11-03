
import React, { useState, useEffect, useRef } from 'react';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { LeanSigmaCalculatorView } from './components/LeanSigmaCalculatorView';
import { ValueStreamMappingView } from './components/ValueStreamMappingView';
import { ValueStreamSimulatorView } from './components/ValueStreamSimulatorView';
import { SupportingPagesView } from './components/SupportingPagesView';
import { EnterpriseStandardPageView } from './components/EnterpriseStandardPageView';
import { ENTERPRISE_OUTCOMES_PAGES } from './data/enterpriseOutcomesData';
import { ExecutiveChatbot } from './components/ExecutiveChatbot';
import { EnterpriseServiceFormModal } from './components/EnterpriseServiceFormModal';
import { WelcomeToast } from './components/WelcomeToast';
import { FileEdit } from 'lucide-react';

import { analytics } from './services/analyticsService';
import { VyntraReportGenerator } from './services/reportService';

export function App() {

  // -------------------------------------------------------------------------
  // ROUTING
  // -------------------------------------------------------------------------

  const getRouteFromHash = (): string => {
    const hash = window.location.hash
      .replace(/^#\/?/, '')
      .split('?')[0];

    return hash || 'outcomes';
  };

  const [route, setRoute] = useState<string>(getRouteFromHash);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  // -------------------------------------------------------------------------
  // SESSION REFERENCES
  // -------------------------------------------------------------------------

  const sessionStartRef = useRef<number>(Date.now());

  const pageVisitRef = useRef<number>(Date.now());

  const sessionPageCountRef = useRef<number>(0);

  const lastTrackedRouteRef = useRef<string>('');

  const sessionStartedRef = useRef<boolean>(false);

  // -------------------------------------------------------------------------
  // PAGE VIEW TRACKING
  // -------------------------------------------------------------------------

  useEffect(() => {

    const normalizedRoute = route || 'outcomes';

    // Prevent duplicate tracking of the same route.
    if (lastTrackedRouteRef.current === normalizedRoute) {
      return;
    }

    lastTrackedRouteRef.current = normalizedRoute;

    const page = `/${normalizedRoute}`;

    // Track page duration before moving to the next page.
    const now = Date.now();

    const previousDuration = Math.round(
      (now - pageVisitRef.current) / 1000
    );

    pageVisitRef.current = now;

    sessionPageCountRef.current += 1;

    // Track current page.
    analytics.trackPageView(page);

    // Start session once.
    if (!sessionStartedRef.current) {
      analytics.trackSessionStart(page);
      sessionStartedRef.current = true;
      sessionStartRef.current = now;

      // Automatically check and dispatch scheduled Daily, Weekly, and Monthly intelligence reports
      try {
        VyntraReportGenerator.checkAndTriggerScheduledReports();
      } catch (e) {
        console.warn('Scheduled report cycle:', e);
      }
    }

    console.info('[VYNTRA] Page view tracked:', {
      route: normalizedRoute,
      page,
      pageCount: sessionPageCountRef.current,
      previousPageDuration: previousDuration
    });

  }, [route]);

  // -------------------------------------------------------------------------
  // BROWSER BACK / FORWARD NAVIGATION
  // -------------------------------------------------------------------------

  useEffect(() => {

    const handleHashChange = () => {

      const newRoute = getRouteFromHash();

      setRoute((currentRoute) => {
        return currentRoute === newRoute
          ? currentRoute
          : newRoute;
      });

    };

    window.addEventListener('hashchange', handleHashChange);

    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };

  }, []);

  // -------------------------------------------------------------------------
  // SESSION END TRACKING
  // -------------------------------------------------------------------------

  useEffect(() => {

    const handleUnload = () => {

      const sessionDuration = Math.round(
        (Date.now() - sessionStartRef.current) / 1000
      );

      const exitPage = `/${route || 'outcomes'}`;

      analytics.trackSessionEnd(
        sessionDuration,
        sessionPageCountRef.current,
        exitPage
      );

    };

    window.addEventListener('pagehide', handleUnload);

    return () => {
      window.removeEventListener('pagehide', handleUnload);
    };

  }, [route]);

  // -------------------------------------------------------------------------
  // NAVIGATION FUNCTION
  // -------------------------------------------------------------------------

  const navigate = (newRoute: string) => {

    if (!newRoute) return;

    const normalizedRoute = newRoute
      .replace(/^#\/?/, '')
      .replace(/^\/+|\/+$/g, '')
      .split('?')[0] || 'outcomes';

    const currentHash = `#/${normalizedRoute}`;

    // Avoid unnecessary navigation and duplicate events.
    if (route === normalizedRoute) {
      return;
    }

    // Update URL and React state.
    window.location.hash = currentHash;

    setRoute(normalizedRoute);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  };

  // -------------------------------------------------------------------------
  // PAGE RENDERING
  // -------------------------------------------------------------------------

  const isSupportingPage = [
    'industries',
    'services',
    'usecases',
    'about',
    'contact'
  ].includes(route);

  return (

    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-blue-600 selection:text-white">

      {/* UNIVERSAL NAVIGATION */}
      <Navbar
        currentRoute={route}
        navigate={navigate}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1">

        {(route === 'outcomes' || route === 'home' || route === '') && (
          <HomePage navigate={navigate} />
        )}

        {ENTERPRISE_OUTCOMES_PAGES[route] && (
          <EnterpriseStandardPageView
            data={ENTERPRISE_OUTCOMES_PAGES[route]}
            navigate={navigate}
          />
        )}

        {route === 'calculator' && (
          <LeanSigmaCalculatorView />
        )}

        {route === 'vsm' && (
          <ValueStreamMappingView />
        )}

        {route === 'simulator' && (
          <ValueStreamSimulatorView />
        )}

        {isSupportingPage && (
          <SupportingPagesView
            route={route}
            navigate={navigate}
          />
        )}

      </main>

      {/* FOOTER */}
      <Footer navigate={navigate} />

      {/* FLOATING ACTION ICONS */}
      <div className="fixed bottom-6 right-22 sm:right-24 z-50 flex items-center gap-3">
        {/* Floating Form Trigger Button */}
        <button
          onClick={() => {
            setIsFormModalOpen(true);
            analytics.trackCtaClick('Open Enterprise Service Intake Form', window.location.hash || '/');
          }}
          className="relative p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-xl hover:scale-105 transition-all duration-300 ring-4 ring-emerald-500/20 flex items-center justify-center cursor-pointer group"
          title="Open Enterprise Service Intake Form"
          aria-label="Open Enterprise Service Intake Form"
        >
          <FileEdit className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-9 right-0 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Service Intake Form
          </span>
        </button>
      </div>

      {/* FLOATING EXECUTIVE CHATBOT */}
      <ExecutiveChatbot 
        navigate={navigate} 
        onOpenFormModal={() => setIsFormModalOpen(true)} 
      />

      {/* ENTERPRISE SERVICE INTAKE FORM MODAL */}
      <EnterpriseServiceFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      />

      {/* DYNAMIC WELCOME & PAGE INTELLIGENCE POPUP */}
      <WelcomeToast
        currentRoute={route}
        navigate={navigate}
        onOpenFormModal={() => setIsFormModalOpen(true)}
      />

    </div>
  );
}

export default App;
