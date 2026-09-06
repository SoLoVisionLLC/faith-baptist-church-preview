import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Clock, ArrowRight, ShieldCheck, Heart, BookOpen, Users, ChevronDown, CheckCircle2 } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';
import { StatusResult } from '../utils/hours';

interface VariantAHomeProps {
  status: StatusResult;
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const VariantAHome: React.FC<VariantAHomeProps> = ({
  status,
  onNavigate,
  onOpenInquiry
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section — Classic Authority / Heritage & Warmth */}
      <section className="relative bg-gradient-to-b from-brand-navyDark via-brand-navy to-brand-navyDark text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Subtle Accents */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold text-brand-gold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                <span>{status.badgeText}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                A Church Family Built on the <span className="text-brand-gold italic">Living Word</span> of God
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Welcome to Faith Baptist Church in Fostoria, Ohio. We are an independent, Bible-believing, gospel-driven congregation preaching Christ crucified, risen, and coming again.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenInquiry('visit')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-lg shadow-lg hover:shadow-glow-crimson transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Plan Your First Sunday Visit</span>
                </button>
                <button
                  onClick={() => onNavigate('/beliefs.html')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <BookOpen className="w-4 h-4 text-brand-gold" />
                  <span>What We Believe</span>
                </button>
              </div>

              {/* Quick Details Bar */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Sunday School</span>
                  <span className="text-sm font-semibold text-white">9:00 AM • All Ages</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Morning Worship</span>
                  <span className="text-sm font-semibold text-white">10:00 AM • Preaching & Choir</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Nursery Care</span>
                  <span className="text-sm font-semibold text-brand-gold">Provided Every Service</span>
                </div>
              </div>
            </div>

            {/* Right Column: Framed Photography with Authentic Steeple Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Framed Church Image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-900">
                  <img
                    src={CHURCH_DATA.images.heroLandscape}
                    alt="Faith Baptist Church Building in Fostoria, Ohio"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="p-4 bg-brand-navyDark text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold font-serif text-white">11275 W. Twp. Rd. 116</p>
                      <p className="text-[11px] text-slate-400">Fostoria, Seneca County, OH</p>
                    </div>
                    <a
                      href={CHURCH_DATA.location.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-brand-crimson hover:bg-brand-crimsonDark rounded text-xs font-semibold flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" /> Map
                    </a>
                  </div>
                </div>

                {/* Floating Steeple Inset Badge */}
                <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white text-slate-900 p-3 rounded-xl shadow-xl border border-slate-200">
                  <img
                    src={CHURCH_DATA.images.steeplePortrait}
                    alt="White Steeple and Cross"
                    className="w-14 h-14 rounded-lg object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-crimson block">
                      A Beacon of Truth
                    </span>
                    <span className="text-xs font-bold font-serif text-brand-navy">
                      Uncompromising KJV Faith
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Pastor Brad Smith
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pastor Welcome Letter Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 text-center">
              <div className="relative inline-block">
                <img
                  src={CHURCH_DATA.pastor.image}
                  alt={CHURCH_DATA.pastor.name}
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover shadow-lg mx-auto border-4 border-slate-100"
                />
                <div className="mt-3">
                  <h4 className="font-serif font-bold text-lg text-brand-navy">{CHURCH_DATA.pastor.name}</h4>
                  <p className="text-xs font-semibold text-brand-crimson">{CHURCH_DATA.pastor.title}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-crimson bg-brand-crimson/10 px-3 py-1 rounded-full">
                <Heart className="w-3.5 h-3.5" /> From Our Pastor's Heart
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {CHURCH_DATA.pastor.welcomeTitle}
              </h2>
              <blockquote className="text-sm sm:text-base text-slate-600 leading-relaxed italic border-l-4 border-brand-crimson pl-4 py-1">
                “{CHURCH_DATA.pastor.welcomeLetter}”
              </blockquote>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verse-by-Verse Preaching
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Traditional Hymns & Choir
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Welcoming Congregation
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Core Pillars Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-crimson">
              Our Core Foundation
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Three Pillars of Faith Baptist Church
            </h2>
            <p className="text-sm text-slate-600">
              Standing steadfast in the faith once delivered unto the saints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-elevated transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900">1. Bible-Believing Truth</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We preach and teach exclusively from the preserved King James Bible. No modern trends or theological compromises—just sound doctrine for everyday Christian living.
              </p>
              <div className="text-xs font-semibold text-brand-navy pt-2">
                2 Timothy 3:16–17
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-elevated transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-crimson/10 text-brand-crimson flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900">2. Gospel-Driven Grace</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Salvation is through repentance and faith in the Lord Jesus Christ alone. We hold high the cross of Calvary and proclaim the free gift of eternal life.
              </p>
              <div className="text-xs font-semibold text-brand-crimson pt-2">
                Romans 10:9–13
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-elevated transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900">3. Family & Discipleship</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From our clean, attentive nursery to energetic teen youth nights and adult Bible fellowships, we build up families to stand strong in God’s truth.
              </p>
              <div className="text-xs font-semibold text-amber-800 pt-2">
                Proverbs 22:6
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Weekly Schedule Matrix */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Join Us This Week
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Complete Gathering Schedule
            </h2>
            <p className="text-sm text-slate-600">
              All services take place at 11275 W. Twp. Rd. 116 in Fostoria, OH.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
              <span className="font-serif font-bold text-base">Service Times</span>
              <span className="text-xs text-brand-gold font-medium">America/New_York (Eastern Time)</span>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[11px] font-bold rounded-full mb-1">
                    Sunday Morning
                  </span>
                  <h4 className="font-serif font-bold text-base text-slate-900">Sunday School for All Ages</h4>
                  <p className="text-xs text-slate-500">Classes for Nursery (under 2 yrs), Toddlers, Primary, Junior, Teens & Adults</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-serif text-brand-navy">9:00 AM</span>
                </div>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-brand-crimson/5 hover:bg-brand-crimson/10 transition-colors">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-brand-crimson text-white text-[11px] font-bold rounded-full mb-1">
                    Main Gathering
                  </span>
                  <h4 className="font-serif font-bold text-base text-slate-900">Sunday Morning Worship & Preaching</h4>
                  <p className="text-xs text-slate-600">Congregational hymns, special choir music, Children’s Church & nursery</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-serif text-brand-crimson">10:00 AM</span>
                </div>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-purple-100 text-purple-800 text-[11px] font-bold rounded-full mb-1">
                    Sunday Evening
                  </span>
                  <h4 className="font-serif font-bold text-base text-slate-900">Evening Service & Youth Discipleship</h4>
                  <p className="text-xs text-slate-500">In-depth Bible teaching, teen fellowship (September – May)</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-serif text-slate-800">6:00 PM</span>
                </div>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full mb-1">
                    Midweek Gathering
                  </span>
                  <h4 className="font-serif font-bold text-base text-slate-900">Wednesday Prayer Meeting & Bible Study</h4>
                  <p className="text-xs text-slate-500">Midweek spiritual recharge, prayer list & practical Scripture study</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-serif text-slate-800">7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-crimson">
              First-Time Questions
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {CHURCH_DATA.faqs.map((faq, idx) => (
              <div 
                key={faq.question}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-semibold text-slate-900 hover:text-brand-crimson transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-brand-crimson' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Help CTA */}
          <div className="mt-10 text-center bg-brand-navy text-white p-6 rounded-2xl space-y-3">
            <h3 className="text-xl font-serif font-bold">Have another question we didn't answer?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Pastor Brad and our team are here to help. Reach out directly or submit an inquiry.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-1">
              <button
                onClick={() => onOpenInquiry('question')}
                className="px-5 py-2.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white text-xs font-bold rounded-lg transition-colors"
              >
                Ask a Question
              </button>
              <a
                href={`tel:${CHURCH_DATA.location.tel}`}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Call: {CHURCH_DATA.location.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
