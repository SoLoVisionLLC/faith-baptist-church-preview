import React, { useState } from 'react';
import { Users, Baby, BookOpen, Heart, Sparkles, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';
import { CHURCH_DATA, MinistryItem } from '../data/siteData';

interface MinistriesPageProps {
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const MinistriesPage: React.FC<MinistriesPageProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Kids' | 'Youth' | 'Adults' | 'Family'>('All');

  const filteredMinistries = selectedCategory === 'All'
    ? CHURCH_DATA.ministries
    : CHURCH_DATA.ministries.filter(m => m.category === selectedCategory || m.category === 'Family');

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            Discipleship For All Generations
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Ministries at Faith Baptist
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            From the nursery cradle through senior adulthood, our ministries exist to equip believers in God’s Word and build strong Christian homes.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['All', 'Kids', 'Youth', 'Adults', 'Family'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-crimson text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Ministries' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ministries List */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredMinistries.map((min, idx) => (
          <div
            key={min.id}
            id={min.id}
            className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-card-elevated transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 ${
              idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}
          >
            {/* Image Column */}
            <div className={`lg:col-span-5 rounded-2xl overflow-hidden shadow-md bg-slate-100 h-64 sm:h-80 ${
              idx % 2 === 1 ? 'lg:col-start-8' : ''
            }`}>
              <img
                src={min.image}
                alt={min.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Column */}
            <div className={`lg:col-span-7 space-y-4 ${
              idx % 2 === 1 ? 'lg:col-start-1' : ''
            }`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-brand-navy text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {min.ageRange}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-brand-crimson">
                  <Clock className="w-3.5 h-3.5" /> {min.schedule}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {min.title}
              </h3>

              {min.scriptureQuote && (
                <blockquote className="text-xs sm:text-sm text-slate-600 font-serif italic border-l-4 border-brand-crimson pl-3 py-1 bg-slate-50 rounded-r-lg">
                  “{min.scriptureQuote.text}”
                  <span className="block text-[11px] text-brand-crimson not-italic font-bold mt-0.5">
                    — {min.scriptureQuote.reference}
                  </span>
                </blockquote>
              )}

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {min.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Ministry Highlights:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {min.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenInquiry('visit')}
                  className="px-5 py-2.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Join This Ministry</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
