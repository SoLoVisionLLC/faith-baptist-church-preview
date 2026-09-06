import React from 'react';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';

interface MobileBottomNavProps {
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
  onNavigate: (path: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenInquiry,
  onNavigate
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-2 px-3">
      <div className="grid grid-cols-4 gap-1">
        {/* Call Church */}
        <a
          href={`tel:${CHURCH_DATA.location.tel}`}
          className="flex flex-col items-center justify-center text-center p-1 rounded-lg text-slate-700 hover:text-brand-crimson active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy mb-1">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold">Call</span>
        </a>

        {/* Directions */}
        <a
          href={CHURCH_DATA.location.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center text-center p-1 rounded-lg text-slate-700 hover:text-brand-crimson active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-brand-crimson/10 flex items-center justify-center text-brand-crimson mb-1">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold">Directions</span>
        </a>

        {/* Service Schedule */}
        <button
          onClick={() => onNavigate('/visit.html')}
          className="flex flex-col items-center justify-center text-center p-1 rounded-lg text-slate-700 hover:text-brand-crimson active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold mb-1">
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <span className="text-[10px] font-semibold">Schedule</span>
        </button>

        {/* Prayer / Inquire */}
        <button
          onClick={() => onOpenInquiry('prayer')}
          className="flex flex-col items-center justify-center text-center p-1 rounded-lg text-slate-700 hover:text-brand-crimson active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-1">
            <Heart className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold">Prayer</span>
        </button>
      </div>
    </div>
  );
};
