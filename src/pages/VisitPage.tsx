import React from 'react';
import { MapPin, Phone, Clock, Calendar, CheckCircle2, Navigation, ShieldCheck, Car, Baby, Shirt, HelpCircle } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';

interface VisitPageProps {
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const VisitPage: React.FC<VisitPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Page Header */}
      <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            Plan Your Visit
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            We Can't Wait to Welcome You
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know for your first Sunday at Faith Baptist Church in Fostoria, Ohio.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenInquiry('visit')}
              className="px-6 py-3 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl shadow-lg transition-all text-sm"
            >
              Let Us Know You're Coming
            </button>
          </div>
        </div>
      </section>

      {/* 4-Point Arrival Checklist */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            What to Expect on Your First Visit
          </h2>
          <p className="text-sm text-slate-600">
            We want your visit to be refreshing, uplifting, and completely stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-navy flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">1. Convenient Parking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We have ample on-site parking surrounding our building. Friendly greeters at the front doors will welcome you and guide you inside.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-brand-crimson flex items-center justify-center">
              <Baby className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">2. Safe Nursery & Kids</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Loving, clean nursery care for infants and toddlers (under 2 and 2–4). Older children enjoy Sunday School at 9:00 AM and Children’s Church at 10:00 AM.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Shirt className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">3. Dress Code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You will see everything from suits and dresses to modest casual attire. Come as you are to worship God with us—we care about you, not your wardrobe.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">4. No Pressure</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You will never be singled out, made to stand up, or pressured for money. You are our honored guest, and we want you to feel right at home.
            </p>
          </div>
        </div>
      </section>

      {/* Location, Map & Schedule Split */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Map & Driving Directions */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-crimson">
                Easy to Reach from Anywhere in Seneca County
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Directions & Driving Information
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Faith Baptist Church is located at <strong className="text-slate-900">11275 W. Twp. Rd. 116, Fostoria, OH 44830</strong>. We are readily accessible from Fostoria, Tiffin, Findlay, and Carey.
              </p>

              {/* Driving details cards */}
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-brand-navy block text-sm mb-1">From Downtown Fostoria (5–7 Minutes)</strong>
                  <p className="text-slate-600">Head south toward US-23/OH-12 corridor, turning onto Township Road 116. The church building and white steeple will be clearly visible on your right.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-brand-navy block text-sm mb-1">From Tiffin (18–20 Minutes)</strong>
                  <p className="text-slate-600">Take OH-18 West toward Fostoria, connecting to US-23 North and turning west onto Township Road 116.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-brand-navy block text-sm mb-1">From Findlay (20–22 Minutes)</strong>
                  <p className="text-slate-600">Follow OH-12 East into Seneca County, turning onto Township Road 116 directly toward the church property.</p>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <a
                  href={CHURCH_DATA.location.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-brand-navyLight text-white font-semibold rounded-xl text-sm shadow transition-colors"
                >
                  <Navigation className="w-4 h-4 text-brand-gold" />
                  <span>Open Turn-by-Turn in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Right: Service Times Schedule Card */}
            <div className="lg:col-span-5 bg-brand-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  Weekly Schedule
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  Service Hours
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="border-b border-white/10 pb-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span>Sunday School (All Ages)</span>
                    <span className="text-brand-gold">9:00 AM</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">Classes for nursery, toddlers, kids, teens & adults</p>
                </div>

                <div className="border-b border-white/10 pb-3">
                  <div className="flex justify-between items-center text-sm font-bold text-rose-200">
                    <span>Morning Worship & Preaching</span>
                    <span className="text-brand-gold">10:00 AM</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">Congregational hymns, choir, preaching & Children’s Church</p>
                </div>

                <div className="border-b border-white/10 pb-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span>Sunday Evening Service</span>
                    <span className="text-brand-gold">6:00 PM</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">Youth & teen discipleship (September – May)</p>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span>Wednesday Prayer & Bible Study</span>
                    <span className="text-brand-gold">7:00 PM</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">Midweek prayer list & chapter-by-chapter Bible exposition</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 text-center">
                <p className="text-xs text-slate-300 mb-3">Questions before you visit?</p>
                <a
                  href={`tel:${CHURCH_DATA.location.tel}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg border border-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>Call {CHURCH_DATA.location.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
