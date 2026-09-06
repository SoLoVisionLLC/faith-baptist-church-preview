import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Heart, Sparkles, CheckCircle2, ChevronDown, ExternalLink } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';

interface BeliefsPageProps {
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const BeliefsPage: React.FC<BeliefsPageProps> = ({ onOpenInquiry }) => {
  const [openDoctrineId, setOpenDoctrineId] = useState<string | null>('scripture');

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      {/* Page Header */}
      <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            Doctrinal Conviction
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            What We Believe & The Gospel
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Faith Baptist Church stands firmly on the infallible Word of God, preaching the King James Bible and the glorious gospel of grace.
          </p>
        </div>
      </section>

      {/* Plan of Salvation Showcase — Verbatim From Customer Printed Handout */}
      <section id="salvation" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-crimson">
              Official Printed Handout Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              The Bible Way to Heaven
            </h2>
            <blockquote className="text-sm sm:text-base text-slate-600 font-serif italic max-w-lg mx-auto pt-2">
              “{CHURCH_DATA.keySalvationVerse.verse}” <br />
              <span className="text-xs text-brand-crimson not-italic font-bold">— {CHURCH_DATA.keySalvationVerse.reference}</span>
            </blockquote>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {CHURCH_DATA.salvationSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-slate-50 rounded-2xl border-2 border-slate-200 p-6 sm:p-8 space-y-4 hover:border-brand-crimson/40 hover:shadow-card-elevated transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-brand-crimson text-white font-bold flex items-center justify-center font-serif text-lg">
                    {step.stepNumber}
                  </span>
                  <span className="text-xs font-bold text-brand-navy bg-white px-3 py-1 rounded-full border border-slate-200 font-mono">
                    {step.scriptureRef}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-900">
                  {step.title}
                </h3>

                <blockquote className="text-xs sm:text-sm text-slate-700 italic border-l-4 border-brand-crimson pl-3 py-1 bg-white p-2 rounded-r-lg">
                  {step.scriptureText}
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.explanation}
                </p>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-brand-navy block text-[11px] uppercase tracking-wider">
                    Heart Response:
                  </span>
                  <p className="italic">{step.prayerPrompt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sinner's Prayer & Acceptance Callout */}
          <div className="bg-gradient-to-br from-brand-navy to-brand-navyDark text-white p-8 rounded-3xl shadow-xl space-y-4 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              An Invitation of Eternal Grace
            </span>
            <h3 className="text-2xl font-serif font-bold text-white">
              Would You Like to Receive Christ Today?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto">
              If you understand that you are a sinner and believe that Jesus died for your sins and rose again, you can call upon Him in faith right now. Pray this sincere prayer from your heart:
            </p>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-sm sm:text-base italic text-amber-200 font-serif max-w-lg mx-auto">
              “Dear Jesus, I know that I am a sinner. I believe You died on the cross for my sins and rose again. Right now, I turn from my sin and invite You into my heart as my personal Lord and Savior. Thank You for saving my soul. Amen.”
            </div>
            <div className="pt-2">
              <button
                onClick={() => onOpenInquiry('prayer')}
                className="px-6 py-3 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
              >
                I Prayed This Prayer / I Have Questions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Doctrinal Statement */}
      <section id="doctrine" className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Articles of Faith
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Our Statement of Faith
            </h2>
            <p className="text-sm text-slate-600">
              Historical Baptist distinctives founded upon the King James Bible.
            </p>
          </div>

          <div className="space-y-4">
            {CHURCH_DATA.doctrinalPoints.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenDoctrineId(openDoctrineId === doc.id ? null : doc.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-slate-900 hover:text-brand-crimson transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-brand-crimson uppercase tracking-wider block">
                      Scripture: {doc.scripture}
                    </span>
                    <span className="text-lg sm:text-xl text-slate-900 block">{doc.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      openDoctrineId === doc.id ? 'rotate-180 text-brand-crimson' : ''
                    }`}
                  />
                </button>

                {openDoctrineId === doc.id && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 space-y-3">
                    <p className="font-semibold text-slate-900">{doc.summary}</p>
                    <p className="text-slate-600">{doc.fullText}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* King James Version Distinction Banner */}
          <div className="mt-12 bg-white rounded-2xl border-2 border-brand-navy/20 p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-brand-crimson">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="font-serif font-bold text-lg text-brand-navy">
                Our Conviction on the King James Bible (KJV 1611)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We believe that God has preserved His infallible, inerrant words for English-speaking people in the Authorized King James Version. We do not use modern paraphrases or altered dynamic translations in our pulpit preaching, Sunday School classes, or memory work. You can bring your King James Bible with total confidence that we will read and study the exact same words together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
