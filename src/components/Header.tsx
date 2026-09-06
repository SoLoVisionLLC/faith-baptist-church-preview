import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Calendar, ChevronRight, Palette } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';
import { getChurchServiceStatus, StatusResult } from '../utils/hours';
import { PaletteType } from '../App';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
  variantTitle?: string;
  colorPalette?: PaletteType;
  onTogglePalette?: (palette: PaletteType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenInquiry,
  variantTitle,
  colorPalette = 'americana',
  onTogglePalette
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<StatusResult>(getChurchServiceStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getChurchServiceStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About & Beliefs', path: '/beliefs.html' },
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
    if (path === '/') {
      return currentPath === '/' || currentPath === '/index.html' || currentPath === '';
    }
    const cleanPath = path.replace('.html', '').replace('/', '');
    if (!cleanPath) return false;
    return currentPath.toLowerCase().includes(cleanPath);
  };

  const activeLogo = colorPalette === 'royal-gold' 
    ? CHURCH_DATA.images.emblem 
    : CHURCH_DATA.images.logo;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-white/10 text-white transition-all shadow-md">
      {/* Top Banner: Service Status, Quick Contact & Palette Switcher */}
      <div className="bg-black/40 border-b border-white/5 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.isServiceActive ? 'bg-emerald-400' : 'bg-brand-gold'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status.isServiceActive ? 'bg-emerald-500' : 'bg-brand-gold'}`}></span>
            </span>
            <span className="font-semibold tracking-wide text-slate-200 text-[11px] sm:text-xs">
              {status.badgeText}
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              {status.subText}
            </span>
          </div>

          {/* Contact, Address & Palette Toggle */}
          <div className="flex items-center gap-3.5 text-[11px] text-slate-300">
            <a 
              href={`tel:${CHURCH_DATA.location.tel}`} 
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-brand-gold" />
              <span>{CHURCH_DATA.location.phone}</span>
            </a>
            <a 
              href={CHURCH_DATA.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-brand-gold" />
              <span>11275 W. Twp. Rd. 116, Fostoria</span>
            </a>
            {variantTitle && (
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-brand-gold font-mono uppercase tracking-wider">
                {variantTitle}
              </span>
            )}

            {/* Quick Header Palette Toggle */}
            {onTogglePalette && (
              <div className="flex items-center gap-1 bg-black/40 rounded-full p-0.5 border border-white/15 shrink-0">
                <button
                  onClick={() => onTogglePalette('americana')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    colorPalette === 'americana'
                      ? 'bg-[#B31942] text-white shadow-sm ring-1 ring-white/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Americana Palette: Crimson & Navy"
                >
                  <span className="w-2 h-2 rounded-full bg-[#B31942] inline-block border border-white/60"></span>
                  <span className="hidden sm:inline">Americana</span>
                </button>
                <button
                  onClick={() => onTogglePalette('royal-gold')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    colorPalette === 'royal-gold'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5922C] text-[#021C5E] font-extrabold shadow-sm ring-1 ring-white/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Emblem Palette: Royal Blue & Imperial Gold"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F3BE50] inline-block border border-[#021C5E]"></span>
                  <span className="hidden sm:inline">Royal & Gold</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Church Brand Logo - Unified Title Lockup */}
          <a
            href="/"
            onClick={(e) => handleLinkClick('/', e)}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <img 
              src={activeLogo} 
              alt="Faith Baptist Church" 
              style={{ width: 48, height: 48 }}
              className="w-12 h-12 object-contain group-hover:scale-105 shrink-0 rounded-full drop-shadow-sm transition-transform"
              onError={(e) => {
                if (colorPalette === 'royal-gold') {
                  e.currentTarget.src = CHURCH_DATA.images.logo;
                } else {
                  e.currentTarget.style.display = 'none';
                }
              }}
            />
            <div className="flex flex-col justify-center">
              <span className="font-serif font-bold text-lg sm:text-xl xl:text-2xl text-white tracking-tight group-hover:text-brand-gold transition-colors whitespace-nowrap leading-snug">
                Faith Baptist Church
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold/90 mt-0.5 whitespace-nowrap">
                {colorPalette === 'royal-gold' ? 'Fostoria, Ohio • Romans 10:17' : 'Fostoria, Ohio • KJV 1611'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links - Curated & Clean */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleLinkClick(link.path, e)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap relative ${
                    active
                      ? 'text-white font-semibold bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-crimson rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions & Singular Plan Your Visit CTA */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onOpenInquiry('prayer')}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap"
            >
              Prayer Request
            </button>
            <a
              href="/visit.html"
              onClick={(e) => handleLinkClick('/visit.html', e)}
              className={`px-4 py-2 bg-brand-crimson hover:bg-brand-crimsonDark text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg hover:shadow-glow-crimson transition-all flex items-center gap-1.5 theme-accent-btn whitespace-nowrap ${
                currentPath.toLowerCase().includes('visit') ? 'ring-2 ring-white/60 shadow-glow-crimson' : ''
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Your Visit</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="/visit.html"
              onClick={(e) => handleLinkClick('/visit.html', e)}
              className="px-3 py-1.5 bg-brand-crimson text-white text-xs font-semibold rounded-lg shadow-sm theme-accent-btn"
            >
              Plan Visit
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl px-4 pt-2 pb-6 space-y-3 animate-fadeIn text-white">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleLinkClick(link.path, e)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active
                      ? 'bg-brand-crimson/20 text-white font-bold border-l-2 border-brand-crimson'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry('prayer');
              }}
              className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold text-center transition-colors"
            >
              Prayer Request
            </button>
            <a
              href="/visit.html"
              onClick={(e) => handleLinkClick('/visit.html', e)}
              className="w-full py-2.5 px-3 bg-brand-crimson hover:bg-brand-crimsonDark text-white rounded-lg text-xs font-semibold text-center transition-colors shadow theme-accent-btn flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan Visit</span>
            </a>
          </div>

          {/* Mobile Palette Selector */}
          {onTogglePalette && (
            <div className="pt-3 pb-1 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-brand-gold" />
                <span>Color Palette:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    onTogglePalette('americana');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    colorPalette === 'americana'
                      ? 'bg-[#B31942] text-white shadow-sm ring-1 ring-white/30'
                      : 'bg-white/10 text-slate-300 hover:bg-white/15'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#B31942] inline-block border border-white/60"></span>
                  <span>Americana</span>
                </button>
                <button
                  onClick={() => {
                    onTogglePalette('royal-gold');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    colorPalette === 'royal-gold'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5922C] text-[#021C5E] font-extrabold shadow-sm ring-1 ring-white/40'
                      : 'bg-white/10 text-slate-300 hover:bg-white/15'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#F3BE50] inline-block border border-[#021C5E]"></span>
                  <span>Royal & Gold</span>
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 text-center text-xs text-slate-400">
            <p>11275 W. Twp. Rd. 116, Fostoria, OH 44830</p>
            <a href={`tel:${CHURCH_DATA.location.tel}`} className="font-semibold text-brand-gold">
              Call: {CHURCH_DATA.location.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
