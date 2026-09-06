import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';
import { getChurchServiceStatus, StatusResult } from '../utils/hours';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
  variantTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenInquiry,
  variantTitle
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<StatusResult>(getChurchServiceStatus());

  useEffect(() => {
    // Update live status every 60 seconds
    const interval = setInterval(() => {
      setStatus(getChurchServiceStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plan Your Visit', path: '/visit.html' },
    { name: 'Beliefs & Salvation', path: '/beliefs.html' },
    { name: 'Ministries', path: '/ministries.html' },
    { name: 'Events', path: '/events.html' },
    { name: 'Sermons', path: '/sermons.html' },
    { name: 'Contact', path: '/contact.html' },
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isLinkActive = (path: string) => {
    if (path === '/' && (currentPath === '/' || currentPath === '/index.html' || currentPath === '')) {
      return true;
    }
    return currentPath.includes(path.replace('.html', '').replace('/', ''));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Banner: Service Status & Quick Contact */}
      <div className="bg-brand-navy text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.isServiceActive ? 'bg-emerald-400' : 'bg-brand-gold'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status.isServiceActive ? 'bg-emerald-500' : 'bg-brand-gold'}`}></span>
            </span>
            <span className="font-medium tracking-wide">
              {status.badgeText}
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300 text-[11px]">
              {status.subText}
            </span>
          </div>

          {/* Quick Contact & Address */}
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <a 
              href={`tel:${CHURCH_DATA.location.tel}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-brand-gold" />
              <span>{CHURCH_DATA.location.phone}</span>
            </a>
            <a 
              href={CHURCH_DATA.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-brand-gold" />
              <span>11275 W. Twp. Rd. 116, Fostoria, OH</span>
            </a>
            {variantTitle && (
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-brand-gold font-mono uppercase tracking-wider">
                {variantTitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Church Brand Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick('/', e)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <img 
              src={CHURCH_DATA.images.logo} 
              alt="Faith Baptist Church Logo" 
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                // Fallback to stylized icon if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-extrabold text-xl md:text-2xl text-brand-navy tracking-tight group-hover:text-brand-crimson transition-colors">
                  Faith Baptist
                </span>
                <span className="font-serif font-light text-xl md:text-2xl text-slate-600">
                  Church
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-crimson">
                Fostoria, Ohio • KJV 1611
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isLinkActive(link.path)
                    ? 'text-brand-crimson bg-brand-crimson/10 shadow-sm'
                    : 'text-slate-700 hover:text-brand-navy hover:bg-slate-100'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Plan Visit Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenInquiry('prayer')}
              className="px-3 py-2 text-xs font-semibold text-brand-navy hover:text-brand-crimson hover:bg-slate-100 rounded-lg transition-colors"
            >
              Prayer Request
            </button>
            <button
              onClick={() => onOpenInquiry('visit')}
              className="px-5 py-2.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-glow-crimson transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Your Visit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenInquiry('visit')}
              className="px-3 py-1.5 bg-brand-crimson text-white text-xs font-semibold rounded-md shadow-sm"
            >
              Plan Visit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-navy hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isLinkActive(link.path)
                    ? 'bg-brand-crimson/10 text-brand-crimson font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry('prayer');
              }}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold text-center transition-colors"
            >
              Prayer Request
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry('visit');
              }}
              className="w-full py-2.5 px-3 bg-brand-crimson hover:bg-brand-crimsonDark text-white rounded-lg text-xs font-semibold text-center transition-colors shadow"
            >
              Plan Your Visit
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-slate-500">
            <p>11275 W. Twp. Rd. 116, Fostoria, OH 44830</p>
            <a href={`tel:${CHURCH_DATA.location.tel}`} className="font-semibold text-brand-navy">
              Call: {CHURCH_DATA.location.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
