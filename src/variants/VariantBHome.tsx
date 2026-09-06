import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle2, Users, Baby, Sparkles, Navigation, HeartHandshake, BookOpen, ShieldCheck } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';
import { StatusResult } from '../utils/hours';

interface VariantBHomeProps {
  status: StatusResult;
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

type PartyType = 'single' | 'couple' | 'family-kids' | 'family-teens';
type ServiceSlot = 'sunday-10am' | 'sunday-9am' | 'sunday-6pm' | 'wed-7pm';

export const VariantBHome: React.FC<VariantBHomeProps> = ({
  status,
  onNavigate,
  onOpenInquiry
}) => {
  // Interactive 60-Second Visit Planner State
  const [partyType, setPartyType] = useState<PartyType>('family-kids');
  const [serviceSlot, setServiceSlot] = useState<ServiceSlot>('sunday-10am');

  const getCustomizedPlan = () => {
    let arrivalTime = "9:45 AM (15 minutes early)";
    let parkingTip = "Park in the front or west lot near the main glass doors under the steeple.";
    let kidsNote = "Our greeters will walk you directly to the Nursery or Children's Church registration desk.";
    let serviceTitle = "Sunday Morning Worship & Preaching";

    if (serviceSlot === 'sunday-9am') {
      arrivalTime = "8:50 AM";
      serviceTitle = "Sunday School (All Ages)";
      kidsNote = "Age-graded classrooms for nursery (<2), toddlers (2-4), primary, junior & teens.";
    } else if (serviceSlot === 'sunday-6pm') {
      arrivalTime = "5:50 PM";
      serviceTitle = "Sunday Evening Service & Youth Discipleship";
      kidsNote = "Teens & youth gather for fellowship and biblical study; nursery is provided.";
    } else if (serviceSlot === 'wed-7pm') {
      arrivalTime = "6:50 PM";
      serviceTitle = "Midweek Prayer & Bible Study";
      kidsNote = "Nursery is provided; youth and adults participate in prayer and Bible exposition.";
    }

    if (partyType === 'single') {
      kidsNote = "Greeters will introduce you to friendly members of your age group and help you find comfortable seating.";
    } else if (partyType === 'couple') {
      kidsNote = "Sit wherever you feel comfortable in our spacious auditorium with clear sightlines.";
    }

    return { arrivalTime, parkingTip, kidsNote, serviceTitle };
  };

  const plan = getCustomizedPlan();

  return (
    <div className="bg-slate-50 text-slate-900 font-sans">
      {/* High-Impact Modern Hero Banner */}
      <section className="relative bg-gradient-to-br from-brand-navyDark via-brand-navy to-brand-crimsonDark text-white py-14 lg:py-20 overflow-hidden">
        {/* Abstract Glowing Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-crimson/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-navyLight/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold text-brand-gold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{status.badgeText}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Find Your Church Home <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-gold to-amber-200 bg-clip-text text-transparent">
                Right Here in Fostoria
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Real community, sound King James Bible preaching, safe nursery care, and Christ-centered worship for every generation.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => onOpenInquiry('visit')}
                className="px-8 py-3.5 bg-brand-crimson hover:bg-brand-crimsonLight text-white font-bold rounded-xl shadow-lg hover:shadow-glow-crimson transition-all flex items-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Visitor Welcome Gift</span>
              </button>
              <a
                href={CHURCH_DATA.location.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 text-sm"
              >
                <Navigation className="w-4 h-4 text-brand-gold" />
                <span>Get Directions (11275 Twp. Rd. 116)</span>
              </a>
            </div>
          </div>

          {/* Quick-Action Visitor Matrix Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-crimson/30 flex items-center justify-center text-brand-gold mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">When We Meet</h3>
              <p className="text-xs text-slate-300 mt-1">Sundays 9:00 & 10:00 AM, 6:00 PM • Wednesdays 7:00 PM</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center text-blue-200 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Where to Find Us</h3>
              <p className="text-xs text-slate-300 mt-1">11275 W. Twp. Rd. 116, Fostoria, OH 44830</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-200 mb-3">
                <Baby className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Safe Nursery & Kids</h3>
              <p className="text-xs text-slate-300 mt-1">Infant & toddler nursery provided during all Sunday services.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-200 mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">What We Believe</h3>
              <p className="text-xs text-slate-300 mt-1">100% Biblical King James Bible preaching & gospel salvation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 60-Second Visit Planner Utility */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-brand-crimson bg-brand-crimson/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Tool
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              60-Second First Visit Planner
            </h2>
            <p className="text-sm text-slate-600">
              Select your family details to get an instant customized arrival guide.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            {/* Step 1: Who is attending? */}
            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Who will be joining us?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'single', label: 'Single Adult', icon: Users },
                  { id: 'couple', label: 'Couple', icon: HeartHandshake },
                  { id: 'family-kids', label: 'Family with Kids/Nursery', icon: Baby },
                  { id: 'family-teens', label: 'Family with Teens', icon: Users },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPartyType(item.id as PartyType)}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all ${
                      partyType === item.id
                        ? 'border-brand-crimson bg-brand-crimson text-white shadow-md'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Preferred Service */}
            <div className="space-y-3 mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Which service are you considering?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'sunday-10am', label: 'Sunday 10:00 AM', sub: 'Morning Worship' },
                  { id: 'sunday-9am', label: 'Sunday 9:00 AM', sub: 'Sunday School' },
                  { id: 'sunday-6pm', label: 'Sunday 6:00 PM', sub: 'Evening Service' },
                  { id: 'wed-7pm', label: 'Wednesday 7:00 PM', sub: 'Midweek Study' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setServiceSlot(item.id as ServiceSlot)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      serviceSlot === item.id
                        ? 'border-brand-navy bg-brand-navy text-white shadow-md'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-xs font-bold">{item.label}</span>
                    <span className={`block text-[11px] ${serviceSlot === item.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Customized Plan Result Box */}
            <div className="bg-white rounded-2xl border-2 border-brand-navy/20 p-6 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] uppercase font-bold text-brand-crimson tracking-wider">
                    Your Personalized Plan
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 font-serif">
                    {plan.serviceTitle}
                  </h4>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Verified FBC Protocol
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider block">Recommended Arrival</span>
                  <p className="font-bold text-brand-navy text-sm">{plan.arrivalTime}</p>
                  <p className="text-slate-600">Allows time to park, meet our greeters, and get settled.</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider block">Parking & Doors</span>
                  <p className="font-bold text-slate-800 text-sm">Main Front Entrance</p>
                  <p className="text-slate-600">{plan.parkingTip}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider block">Children & Care</span>
                  <p className="font-bold text-slate-800 text-sm">Secure Check-in</p>
                  <p className="text-slate-600">{plan.kidsNote}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No awkward spotlights or visitor embarrassment. You are our honored guest.</span>
                </div>
                <button
                  onClick={() => onOpenInquiry('visit')}
                  className="w-full sm:w-auto px-6 py-2.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-lg text-xs transition-colors shadow"
                >
                  Confirm This Plan & Let Us Know
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Ministry Matrix */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                Discipleship for Every Age
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Ministries That Strengthen Families
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/ministries.html')}
              className="text-brand-crimson font-bold text-sm hover:underline flex items-center gap-1"
            >
              <span>View All Ministries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHURCH_DATA.ministries.slice(0, 3).map((min) => (
              <div 
                key={min.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-card-elevated transition-all flex flex-col"
              >
                <div className="h-48 overflow-hidden bg-slate-100 relative">
                  <img
                    src={min.image}
                    alt={min.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {min.ageRange}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-slate-900">{min.title}</h3>
                    <p className="text-xs font-semibold text-brand-crimson mt-1">{min.schedule}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{min.description}</p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    {min.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Proof / Real Faces */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Real Stories from Seneca County
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Why Families Call Faith Baptist Home
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHURCH_DATA.testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 flex flex-col justify-between space-y-4"
              >
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                  “{test.content}”
                </p>
                <div className="pt-3 border-t border-white/15">
                  <span className="font-bold text-white text-sm block">{test.name}</span>
                  <span className="text-[11px] text-brand-gold font-medium">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
