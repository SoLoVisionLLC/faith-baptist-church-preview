import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { InquiryModal } from './components/InquiryModal';
import { VariantSwitcher, VariantType } from './components/VariantSwitcher';

import { VariantAHome } from './variants/VariantAHome';
import { VariantBHome } from './variants/VariantBHome';
import { VariantCHome } from './variants/VariantCHome';

import { VisitPage } from './pages/VisitPage';
import { BeliefsPage } from './pages/BeliefsPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { EventsPage } from './pages/EventsPage';
import { SermonsPage } from './pages/SermonsPage';
import { ContactPage } from './pages/ContactPage';

import { getChurchServiceStatus } from './utils/hours';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState<'visit' | 'prayer' | 'question'>('visit');
  const [status] = useState(() => getChurchServiceStatus());

  // Determine active variant
  const [activeVariant, setActiveVariant] = useState<VariantType>(() => {
    // 1. URL Query Param: ?variant=a | b | c
    const urlParams = new URLSearchParams(window.location.search);
    const vParam = urlParams.get('variant')?.toLowerCase();
    if (vParam === 'a' || vParam === 'b' || vParam === 'c') {
      return vParam as VariantType;
    }

    // 2. Domain / Hostname detection
    const hostname = window.location.hostname.toLowerCase();
    if (hostname.includes('antigravity-b') || hostname.includes('variant-b')) {
      return 'b';
    }
    if (hostname.includes('antigravity-c') || hostname.includes('variant-c')) {
      return 'c';
    }
    if (hostname.includes('antigravity-a') || hostname.includes('variant-a')) {
      return 'a';
    }

    // 3. LocalStorage
    try {
      const stored = localStorage.getItem('fbc_variant');
      if (stored === 'a' || stored === 'b' || stored === 'c') {
        return stored as VariantType;
      }
    } catch {
      // ignore
    }

    return 'a';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectVariant = (v: VariantType) => {
    setActiveVariant(v);
    try {
      localStorage.setItem('fbc_variant', v);
    } catch {
      // ignore
    }
    // Update query param cleanly
    const url = new URL(window.location.href);
    url.searchParams.set('variant', v);
    window.history.replaceState({}, '', url.toString());
  };

  const navigate = (path: string) => {
    let cleanPath = path;
    if (cleanPath === '') cleanPath = '/';
    window.history.pushState({}, '', cleanPath);
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (mode: 'visit' | 'prayer' | 'question' = 'visit') => {
    setInquiryMode(mode);
    setInquiryOpen(true);
  };

  // Router renderer
  const renderCurrentView = () => {
    const p = currentPath.toLowerCase();

    if (p.includes('visit')) {
      return <VisitPage onOpenInquiry={handleOpenInquiry} />;
    }
    if (p.includes('belief') || p.includes('salvation')) {
      return <BeliefsPage onOpenInquiry={handleOpenInquiry} />;
    }
    if (p.includes('ministr')) {
      return <MinistriesPage onOpenInquiry={handleOpenInquiry} />;
    }
    if (p.includes('event')) {
      return <EventsPage onOpenInquiry={handleOpenInquiry} />;
    }
    if (p.includes('sermon')) {
      return <SermonsPage onOpenInquiry={handleOpenInquiry} />;
    }
    if (p.includes('contact')) {
      return <ContactPage />;
    }

    // Default Home view based on variant
    if (activeVariant === 'b') {
      return (
        <VariantBHome
          status={status}
          onNavigate={navigate}
          onOpenInquiry={handleOpenInquiry}
        />
      );
    }

    if (activeVariant === 'c') {
      return (
        <VariantCHome
          status={status}
          onNavigate={navigate}
          onOpenInquiry={handleOpenInquiry}
        />
      );
    }

    return (
      <VariantAHome
        status={status}
        onNavigate={navigate}
        onOpenInquiry={handleOpenInquiry}
      />
    );
  };

  const variantLabel = activeVariant === 'a' 
    ? 'Variant A: Heritage' 
    : activeVariant === 'b' 
    ? 'Variant B: Visitor Guide' 
    : 'Variant C: Rooted & Rising';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenInquiry={handleOpenInquiry}
        variantTitle={variantLabel}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigate}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Mobile Sticky Bottom Action Dock */}
      <MobileBottomNav
        onOpenInquiry={handleOpenInquiry}
        onNavigate={navigate}
      />

      {/* Floating Variant Switcher Preview Pill */}
      <VariantSwitcher
        activeVariant={activeVariant}
        onSelectVariant={handleSelectVariant}
      />

      {/* Interactive Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialMode={inquiryMode}
      />
    </div>
  );
}

export default App;
