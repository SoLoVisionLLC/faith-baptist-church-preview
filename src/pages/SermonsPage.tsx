import React, { useState } from 'react';
import { Play, BookOpen, Clock, Calendar, Volume2, User, Sparkles, ArrowRight } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';

interface SermonsPageProps {
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const SermonsPage: React.FC<SermonsPageProps> = ({ onOpenInquiry }) => {
  const [activeTrack, setActiveTrack] = useState<number | null>(0);

  const sermons = [
    {
      title: "The Certainty of Our Faith",
      passage: "Romans 10:9–17",
      series: "Rooted in Romans",
      date: "Recent Lord’s Day",
      speaker: "Pastor Brad Smith",
      description: "How biblical faith comes by hearing the Word of God, and the unfailing promise of salvation for all who call upon the name of the Lord Jesus Christ.",
      duration: "38 min"
    },
    {
      title: "Holding Fast the Faithful Word",
      passage: "Titus 1:5–9 & 2 Timothy 3:16",
      series: "Standing on the Promises",
      date: "Recent Lord’s Day",
      speaker: "Pastor Brad Smith",
      description: "Why the King James Bible remains the trustworthy, preserved anchor for the church in a world filled with shifting doctrines.",
      duration: "42 min"
    },
    {
      title: "Train Up a Child in God's Truth",
      passage: "Proverbs 22:6 & Deuteronomy 6:4–9",
      series: "Christian Home & Family",
      date: "Recent Lord’s Day",
      speaker: "Pastor Brad Smith",
      description: "Biblical principles for Christian parents guiding children through the critical stages of spiritual growth.",
      duration: "36 min"
    },
    {
      title: "The Power of Persistent Prayer",
      passage: "James 5:13–18 & Luke 18:1–8",
      series: "Midweek Spiritual Strength",
      date: "Wednesday Evening",
      speaker: "Pastor Brad Smith",
      description: "Encouragement from the Scriptures on approaching God's throne of grace with boldness and confidence.",
      duration: "29 min"
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            Preaching the Word
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Sermons & Bible Teaching
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Expositional, verse-by-verse preaching from the King James Bible by Pastor Brad Smith and guest speakers.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Featured Sermon Player */}
        <div className="bg-brand-navyDark text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 bg-brand-crimson text-white rounded-full text-xs font-bold uppercase tracking-wider">
              Featured Message
            </span>
            <span className="text-xs font-mono text-brand-gold">
              Pastor Brad Smith • Romans 10:9–17
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              The Certainty of Our Faith
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-2xl">
              An encouraging exposition on why we can have absolute confidence in God's promises, the power of the gospel, and our eternal security in Christ Jesus.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTrack(activeTrack === 0 ? null : 0)}
                className="w-12 h-12 rounded-full bg-brand-crimson hover:bg-brand-crimsonLight text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                aria-label="Play message"
              >
                <Play className="w-5 h-5 ml-0.5 text-white" />
              </button>
              <div>
                <span className="text-sm font-bold text-white block">Listen to Full Sermon</span>
                <span className="text-xs text-slate-400">Audio Recording • 38 minutes</span>
              </div>
            </div>
            <Volume2 className="w-5 h-5 text-brand-gold hidden sm:block" />
          </div>
        </div>

        {/* Sermon Library List */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-slate-900">
            Recent Preaching Series
          </h3>

          <div className="space-y-3">
            {sermons.map((s, idx) => (
              <div
                key={s.title}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-brand-crimson">{s.series}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{s.date}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-brand-navy">{s.speaker}</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{s.description}</p>
                  <div className="pt-1 text-[11px] font-mono text-brand-navy font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Scripture: {s.passage}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTrack(idx)}
                    className="px-4 py-2 bg-slate-100 hover:bg-brand-crimson hover:text-white rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{s.duration}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
