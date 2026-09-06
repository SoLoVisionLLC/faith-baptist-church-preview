import React from 'react';
import { Phone, MapPin, Mail, Heart, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <footer className="bg-brand-navyDark text-slate-300 border-t border-slate-800">
      {/* Top Banner: Callout */}
      <div className="bg-gradient-to-r from-brand-crimson to-brand-crimsonDark text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-2xl font-bold font-serif">Planning to Join Us This Sunday?</h3>
            <p className="text-slate-100 text-sm max-w-xl">
              Sunday School begins at 9:00 AM, followed by Morning Worship at 10:00 AM. Loving nursery care and children’s classes are provided!
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => onOpenInquiry('visit')}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-brand-crimson font-bold rounded-lg shadow transition-all flex items-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Your Visit</span>
            </button>
            <a
              href={CHURCH_DATA.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-brand-navy/60 hover:bg-brand-navy text-white font-semibold rounded-lg transition-all flex items-center gap-2 text-sm border border-white/20"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About & Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={CHURCH_DATA.images.logo} 
                alt="Faith Baptist Church Logo" 
                className="h-10 w-auto object-contain brightness-200"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="font-serif font-bold text-xl text-white">
                Faith Baptist Church
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A Christ-centered, gospel-driven local assembly in Fostoria, Ohio. Preaching the uncompromised truth of God's Word from the King James Bible since our founding as Dillon Road Baptist Church.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{CHURCH_DATA.location.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href={`tel:${CHURCH_DATA.location.tel}`} className="hover:text-white font-semibold">
                  {CHURCH_DATA.location.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Service Schedule */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-semibold text-base tracking-wide border-b border-slate-800 pb-2">
              Weekly Gatherings
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex justify-between items-start border-b border-slate-800/50 pb-2">
                <div>
                  <span className="font-bold text-white block">Sunday School</span>
                  <span className="text-slate-400 text-[11px]">Nursery, Kids, Teens & Adults</span>
                </div>
                <span className="text-brand-gold font-semibold">9:00 AM</span>
              </li>
              <li className="flex justify-between items-start border-b border-slate-800/50 pb-2">
                <div>
                  <span className="font-bold text-white block">Morning Worship</span>
                  <span className="text-slate-400 text-[11px]">Congregational Worship & Preaching</span>
                </div>
                <span className="text-brand-gold font-semibold">10:00 AM</span>
              </li>
              <li className="flex justify-between items-start border-b border-slate-800/50 pb-2">
                <div>
                  <span className="font-bold text-white block">Evening Service</span>
                  <span className="text-slate-400 text-[11px]">Youth & Discipleship (Sept–May)</span>
                </div>
                <span className="text-brand-gold font-semibold">6:00 PM</span>
              </li>
              <li className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-white block">Midweek Prayer & Study</span>
                  <span className="text-slate-400 text-[11px]">Wednesday Night Bible Hour</span>
                </div>
                <span className="text-brand-gold font-semibold">7:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-semibold text-base tracking-wide border-b border-slate-800 pb-2">
              Explore & Connect
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Plan Your Visit', path: '/visit.html' },
                { name: 'Plan of Salvation', path: '/beliefs.html' },
                { name: 'What We Believe (Doctrinal Statement)', path: '/beliefs.html#doctrine' },
                { name: 'Sunday School & Nursery Care', path: '/ministries.html#sunday-school' },
                { name: 'Teens for Christ Youth Group', path: '/ministries.html#teen-ministry' },
                { name: 'Sermon Messages & Notes', path: '/sermons.html' },
                { name: 'Church Events Calendar', path: '/events.html' },
                { name: 'Contact Pastor & Directions', path: '/contact.html' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    className="flex items-center gap-1.5 hover:text-white transition-colors text-slate-300"
                  >
                    <ArrowRight className="w-3 h-3 text-brand-crimson" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Gospel Message & Assurance */}
          <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-brand-gold">
              <ShieldCheck className="w-5 h-5 text-brand-crimson" />
              <span className="font-serif font-bold text-white text-sm">The Good News</span>
            </div>
            <p className="text-xs text-slate-300 italic">
              “For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.”
              <br />
              <span className="text-[11px] text-brand-gold not-italic font-semibold">— John 3:16</span>
            </p>
            <p className="text-xs text-slate-400">
              Salvation is God’s free gift through faith in Jesus Christ alone. Need prayer or have spiritual questions?
            </p>
            <button
              onClick={() => onOpenInquiry('prayer')}
              className="w-full py-2 px-3 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-semibold rounded text-xs transition-colors shadow"
            >
              Request Confidential Prayer
            </button>
          </div>
        </div>

        {/* Bottom Attribution & Confidentiality Notice */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center md:flex md:justify-between text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Faith Baptist Church • 11275 W. Twp. Rd. 116, Fostoria, OH 44830</p>
          <p className="mt-2 md:mt-0">
            Preview build • Authorized Client Deployment • <span className="text-slate-400">robots: noindex, nofollow</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
