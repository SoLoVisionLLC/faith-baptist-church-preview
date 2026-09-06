import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Heart, Sparkles, Play, Volume2, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';
import { StatusResult } from '../utils/hours';

interface VariantCHomeProps {
  status: StatusResult;
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const VariantCHome: React.FC<VariantCHomeProps> = ({
  status,
  onNavigate,
  onOpenInquiry
}) => {
  const [activeSalvationStep, setActiveSalvationStep] = useState(0);
  const [isPlayingSermon, setIsPlayingSermon] = useState(false);

  return (
    <div className="bg-brand-navyDark text-slate-100 font-sans selection:bg-brand-crimson selection:text-white">
      {/* Immersive Editorial Hero — High Craft, Deep Navy & Crimson Atmosphere */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Atmospheric Lighting & Geometry */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-crimson/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brand-navyLight/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Bold Editorial Headlines */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pulsing Status Pill */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold text-brand-gold shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson animate-ping" />
                <span>ROOTED & RISING • {status.badgeText}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-fraunces font-black tracking-tight text-white leading-[1.05]">
                UNSHAKABLE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-crimsonLight via-rose-300 to-brand-gold">
                  TRUTH.
                </span>{" "}
                GENUINE <br />
                <span className="italic font-normal font-serif">HOPE.</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A vibrant, multi-generational family in Fostoria, Ohio anchored in the King James Bible and proclaiming the life-changing gospel of Jesus Christ.
              </p>

              {/* Dual Action Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenInquiry('visit')}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-crimson hover:bg-brand-crimsonLight text-white font-extrabold rounded-xl shadow-glow-crimson transition-all flex items-center justify-center gap-2 text-sm tracking-wide active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Plan Your First Sunday</span>
                </button>
                <button
                  onClick={() => onNavigate('/beliefs.html')}
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>The Plan of Salvation</span>
                </button>
              </div>

              {/* Glass Stat Badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="text-xl sm:text-2xl font-black text-brand-gold block font-fraunces">100%</span>
                  <span className="text-[11px] text-slate-300 font-semibold">KJV Bible Driven</span>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="text-xl sm:text-2xl font-black text-rose-300 block font-fraunces">All Ages</span>
                  <span className="text-[11px] text-slate-300 font-semibold">Nursery & Teens</span>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="text-xl sm:text-2xl font-black text-emerald-300 block font-fraunces">Seneca Co.</span>
                  <span className="text-[11px] text-slate-300 font-semibold">Fostoria, OH</span>
                </div>
              </div>
            </div>

            {/* Right: Rich Atmospheric Media Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Sanctuary & Choir Image */}
                <div className="rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-brand-navy">
                  <img
                    src={CHURCH_DATA.images.worshipBanner}
                    alt="Faith Baptist Church Choir and Sanctuary"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="p-5 bg-gradient-to-t from-black via-black/80 to-transparent absolute inset-x-0 bottom-0 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                      Sunday Morning Worship • 10:00 AM
                    </span>
                    <p className="text-base font-bold font-serif text-white">
                      Preaching, Traditional Hymns & Warm Fellowship
                    </p>
                  </div>
                </div>

                {/* Floating Steeple Badge */}
                <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 bg-brand-navy/95 backdrop-blur-lg border border-white/20 p-3.5 rounded-2xl shadow-2xl">
                  <img
                    src={CHURCH_DATA.images.steeplePortrait}
                    alt="Church Steeple"
                    className="w-12 h-12 rounded-xl object-cover border border-white/15"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-brand-crimsonLight block">
                      Bible Believing
                    </span>
                    <span className="text-xs font-bold text-white font-fraunces">
                      Faith Baptist Church
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      11275 W. Twp. Rd. 116
                    </span>
                  </div>
                </div>

                {/* Floating Pastor Pulpit Badge */}
                <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-brand-navy/95 backdrop-blur-lg border border-white/20 p-3.5 rounded-2xl shadow-2xl">
                  <img
                    src={CHURCH_DATA.images.pastorPulpit}
                    alt="Pastor Brad Smith"
                    className="w-12 h-12 rounded-xl object-cover border border-white/15"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">
                      Senior Pastor
                    </span>
                    <span className="text-xs font-bold text-white">
                      Pastor Brad Smith
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      KJV Expository Preaching
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Step Plan of Salvation Explorer (From Customer Handout) */}
      <section className="py-20 bg-slate-900/80 border-t border-slate-800 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-crimsonLight bg-brand-crimson/20 px-3.5 py-1 rounded-full border border-brand-crimson/30">
              The Most Important Question
            </span>
            <h2 className="text-3xl sm:text-4xl font-fraunces font-bold text-white">
              The Bible Way to Heaven
            </h2>
            <p className="text-sm text-slate-300 italic max-w-xl mx-auto">
              “{CHURCH_DATA.keySalvationVerse.verse}” <br />
              <span className="text-xs text-brand-gold not-italic font-bold">— {CHURCH_DATA.keySalvationVerse.reference}</span>
            </p>
          </div>

          {/* Interactive Step Navigator */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {CHURCH_DATA.salvationSteps.map((step, idx) => (
              <button
                key={step.stepNumber}
                onClick={() => setActiveSalvationStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  activeSalvationStep === idx
                    ? 'border-brand-crimson bg-gradient-to-b from-brand-crimson/30 to-brand-crimson/10 text-white shadow-glow-crimson'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className={`text-2xl font-black font-fraunces block mb-1 ${activeSalvationStep === idx ? 'text-brand-gold' : 'text-slate-600'}`}>
                  0{step.stepNumber}
                </span>
                <span className="font-bold text-xs sm:text-sm text-white block">
                  {step.title}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {step.scriptureRef}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Content Showcase */}
          {(() => {
            const step = CHURCH_DATA.salvationSteps[activeSalvationStep];
            return (
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      Step 0{step.stepNumber} of 4
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-fraunces font-bold text-white mt-1">
                      {step.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-white/10 text-brand-gold text-xs font-mono rounded-full border border-white/10">
                    {step.scriptureRef}
                  </span>
                </div>

                <blockquote className="text-base sm:text-lg text-amber-200/90 font-serif italic border-l-4 border-brand-crimson pl-4 py-1">
                  {step.scriptureText}
                </blockquote>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {step.explanation}
                </p>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-brand-crimsonLight uppercase tracking-wider block">
                    A Prayer from the Heart:
                  </span>
                  <p className="text-xs sm:text-sm text-white font-medium italic">
                    {step.prayerPrompt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    {activeSalvationStep > 0 && (
                      <button
                        onClick={() => setActiveSalvationStep(activeSalvationStep - 1)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold"
                      >
                        ← Previous Step
                      </button>
                    )}
                    {activeSalvationStep < 3 && (
                      <button
                        onClick={() => setActiveSalvationStep(activeSalvationStep + 1)}
                        className="px-4 py-2 bg-brand-crimson hover:bg-brand-crimsonLight text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow"
                      >
                        <span>Next Step</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenInquiry('prayer')}
                    className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1"
                  >
                    <span>Talk to Pastor Brad About Salvation</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Media & Sermon Preview Showcase */}
      <section className="py-20 bg-brand-navy relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Message Audio Player Mockup */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                Preaching & Teaching
              </span>
              <h2 className="text-3xl sm:text-4xl font-fraunces font-bold text-white">
                Hear God’s Word Proclaimed
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pastor Brad Smith opens the King James Bible each week with clarity, conviction, and practical warmth. Experience real teaching that transforms hearts.
              </p>

              {/* Interactive Audio Player Card */}
              <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingSermon(!isPlayingSermon)}
                      className="w-12 h-12 rounded-full bg-brand-crimson hover:bg-brand-crimsonLight text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                      aria-label={isPlayingSermon ? "Pause sermon" : "Play sermon"}
                    >
                      <Play className={`w-5 h-5 ml-0.5 ${isPlayingSermon ? 'animate-pulse text-brand-gold' : ''}`} />
                    </button>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Recent Message: “The Certainty of Our Faith”
                      </span>
                      <span className="text-[11px] text-brand-gold font-mono">
                        Pastor Brad Smith • Romans 10:9–17
                      </span>
                    </div>
                  </div>
                  <Volume2 className="w-5 h-5 text-slate-400" />
                </div>

                {/* Progress bar visualizer */}
                <div className="space-y-1">
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-crimson to-brand-gold transition-all duration-300"
                      style={{ width: isPlayingSermon ? '65%' : '15%' }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{isPlayingSermon ? '18:42' : '04:15'}</span>
                    <span>38:10</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Recorded Live in the FBC Sanctuary</span>
                  <button
                    onClick={() => onNavigate('/sermons.html')}
                    className="text-brand-crimsonLight hover:underline font-bold text-xs flex items-center gap-1"
                  >
                    <span>Browse All Sermons</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Church Identity & Photo Gallery Collage */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={CHURCH_DATA.images.fellowship}
                  alt="Faith Baptist Fellowship"
                  className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={CHURCH_DATA.images.sundaySchool}
                  alt="Sunday School Class"
                  className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={CHURCH_DATA.images.nursery}
                  alt="Loving Nursery Care"
                  className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={CHURCH_DATA.images.sanctuaryCross}
                  alt="Sanctuary Cross"
                  className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
