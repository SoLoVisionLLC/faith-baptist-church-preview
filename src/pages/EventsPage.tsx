import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';

interface EventsPageProps {
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onOpenInquiry }) => {
  const recurringEvents = [
    {
      title: "Sunday Morning Sunday School",
      time: "Sundays at 9:00 AM",
      location: "FBC Classrooms (All Ages)",
      desc: "Nursery, toddler, elementary, teen, and adult Bible fellowship classes.",
      badge: "Weekly Rhythms"
    },
    {
      title: "Sunday Morning Worship & Children’s Church",
      time: "Sundays at 10:00 AM",
      location: "Main Auditorium",
      desc: "Congregational singing of traditional hymns, special choir music, and sound KJV preaching.",
      badge: "Core Service"
    },
    {
      title: "Sunday Evening Service & Youth Discipleship",
      time: "Sundays at 6:00 PM (Sept–May)",
      location: "Main Auditorium & Youth Room",
      desc: "In-depth Bible teaching, testimonies, and teen youth group activities.",
      badge: "Evening Fellowship"
    },
    {
      title: "Wednesday Night Prayer Meeting & Bible Study",
      time: "Wednesdays at 7:00 PM",
      location: "Fellowship Hall / Sanctuary",
      desc: "Midweek congregational prayer time followed by chapter-by-chapter exposition.",
      badge: "Midweek Oasis"
    }
  ];

  const seasonalEvents = [
    {
      title: "Annual Summer Vacation Bible School (VBS)",
      date: "Summer Rhythms",
      desc: "A high-energy week of Bible lessons, scripture memory, songs, crafts, and games for children throughout Fostoria.",
      badge: "Children & Community"
    },
    {
      title: "Youth Camp & Teen Retreat",
      date: "Summer Camp Season",
      desc: "Life-changing summer camp week for teens with spiritual preaching, teamwork, and Christian friendships.",
      badge: "Teens for Christ"
    },
    {
      title: "Church Family Fellowship Dinners",
      date: "Monthly Gatherings",
      desc: "Enjoying good home-cooked food, conversation, and encouraging one another in the faith.",
      badge: "Church Family"
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            Gatherings & Calendar
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Events & Announcements
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            There is always a place for you to grow, worship, and connect at Faith Baptist Church.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Weekly Recurring Gatherings */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-crimson">
              Ongoing Ministry
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Weekly Gathering Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recurringEvents.map((evt) => (
              <div
                key={evt.title}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-0.5 bg-brand-navy/10 text-brand-navy text-[11px] font-bold rounded-full">
                    {evt.badge}
                  </span>
                  <span className="text-xs font-semibold text-brand-crimson flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {evt.time}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{evt.desc}</p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{evt.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal & Special Highlights */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Special Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Seasonal Programs & Youth Activities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalEvents.map((evt) => (
              <div
                key={evt.title}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 bg-brand-crimson/10 text-brand-crimson text-[11px] font-bold rounded-full">
                    {evt.badge}
                  </span>
                  <h3 className="text-base font-serif font-bold text-slate-900">{evt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{evt.desc}</p>
                </div>
                <div className="pt-2 text-xs font-semibold text-slate-500">
                  {evt.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact Callout */}
        <div className="bg-brand-navy text-white p-8 rounded-3xl text-center space-y-3">
          <h3 className="text-xl font-serif font-bold">Have an announcement or need event details?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Get in touch with our church office for registration, VBS dates, or youth camp information.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenInquiry('question')}
              className="px-6 py-2.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white rounded-lg text-xs font-bold shadow"
            >
              Contact the Church Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
