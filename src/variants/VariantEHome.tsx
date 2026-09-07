import React, { useState } from 'react';
import { 
  Heart, Coffee, Calendar, MapPin, Phone, Clock, ArrowRight, 
  CheckCircle2, Users, Baby, BookOpen, Quote, Sparkles, Navigation,
  MessageCircle, HelpCircle, ChevronDown
} from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';
import { StatusResult } from '../utils/hours';

interface VariantEHomeProps {
  status: StatusResult;
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

type GenerationTab = 'mom' | 'teen' | 'senior';

export const VariantEHome: React.FC<VariantEHomeProps> = ({
  status,
  onNavigate,
  onOpenInquiry
}) => {
  const [activeTab, setActiveTab] = useState<GenerationTab>('mom');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = {
    mom: {
      name: "Sarah M.",
      role: "Mother of Two (Ages 3 & 6)",
      quote: "Finding a church where our toddlers are truly cherished, safe, and taught the Bible was our highest prayer. The nursery workers treated our kids like their own grandchildren from day one.",
      badge: "Young Family"
    },
    teen: {
      name: "Caleb R.",
      role: "High School Junior",
      quote: "The youth group here is real. We study the actual scriptures, talk about real life pressures, and have genuine Christian friends who encourage me to stand strong in my faith at school.",
      badge: "Youth Ministry"
    },
    senior: {
      name: "Elder Thomas & Martha G.",
      role: "Members for 28 Years",
      quote: "Through health trials, family celebrations, and decades of life in Seneca County, Faith Baptist has been our steady anchor. Pastor preaches the unchanging truth with unwavering love.",
      badge: "Multi-Decade Anchor"
    }
  };

  const timeline = [
    {
      time: "9:00 AM",
      title: "Hot Coffee & Sunday School",
      desc: "Fresh coffee, cider donuts, and warm greetings. Age-graded Bible classes for toddlers, youth, and adults to dig into practical scripture.",
      icon: Coffee
    },
    {
      time: "10:00 AM",
      title: "Voices Lifted in Hymns",
      desc: "The piano begins and the congregation joins as one voice. Cherished hymns of the faith that lift the soul without rock concert darkness.",
      icon: Heart
    },
    {
      time: "10:35 AM",
      title: "Life-Giving Bible Exposition",
      desc: "Pastor Brad opens the King James Bible with verse-by-verse clarity, convicting truth, and practical hope for your everyday life.",
      icon: BookOpen
    },
    {
      time: "11:45 AM",
      title: "Front-Porch Handshakes",
      desc: "No rush out the door. Members linger in the foyer, exchange prayer requests, and invite guests to Sunday dinner.",
      icon: Users
    }
  ];

  const faqs = [
    {
      q: "What if my toddler gets fussy during the preaching?",
      a: "We love the sound of babies and children in church! A crying baby is the sound of a church with a future. We also provide a clean, secure, staffed nursery with silent parent pagers if you ever want to slip away."
    },
    {
      q: "Will I be singled out or asked to stand in front of everyone?",
      a: "Never. We want you to feel completely comfortable, relax, worship, and hear the Word of God at your own pace without feeling put on the spot."
    },
    {
      q: "What should I wear to Sunday service?",
      a: "You will see a comfortable mix across our congregation—some men wear suits and some wear clean jeans; women wear dresses or slacks. We care about your heart, not a dress code."
    },
    {
      q: "Do I need to bring anything with me?",
      a: "Just yourself! If you have a Bible, bring it along so you can follow along as we study. If not, we have Bibles right in every pew for you to use."
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-slate-900 font-sans min-h-screen selection:bg-brand-crimson selection:text-white">
      
      {/* ----------------- SECTION 1: WARM WELCOME & JOURNAL HERO ----------------- */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80 overflow-hidden">
        {/* Subtle Paper Texture Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#d6cebe_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-300 shadow-sm text-xs font-serif italic text-brand-navy">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>A Warm Community Journal • Fostoria, Ohio</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Handwritten Warmth & Pastoral Welcome */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-navy tracking-tight leading-[1.1]">
                Pull up a chair. <br />
                <span className="italic text-brand-crimson font-serif font-normal">
                  There’s a seat at our table for you.
                </span>
              </h1>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md relative">
                {/* Washi Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-brand-gold/30 rotate-[-1deg] border-t border-b border-stone-300/50 backdrop-blur-sm" />

                <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-serif italic">
                  "Life is noisy and the world can feel overwhelming. At Faith Baptist Church, we believe the local church should feel like coming home to a warm, Bible-anchored family that loves Christ, prays for one another, and welcomes everyone with open arms."
                </p>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-brand-navy text-sm">Pastor Brad Smith</span>
                    <span className="text-xs text-stone-500">Senior Pastor • Faith Baptist Church</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-crimson">
                    <Heart className="w-4 h-4 fill-brand-crimson" />
                    <span>Welcome Home</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenInquiry('visit')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Plan Your First Sunday</span>
                </button>
                <button
                  onClick={() => onNavigate('/visit.html')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-100 text-brand-navy font-semibold rounded-xl border border-stone-300 shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  <span>Directions & Service Times</span>
                </button>
              </div>
            </div>

            {/* Right: Offset Polaroid Photo Stack */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                
                {/* Background Shadow Card */}
                <div className="absolute inset-0 bg-stone-300 rounded-2xl rotate-3 transform translate-x-2 translate-y-2" />

                {/* Main Polaroid Frame */}
                <div className="relative bg-white p-4 pb-6 rounded-2xl border border-stone-200 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  {/* Photo Pin Top */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-brand-crimson border-2 border-white shadow-md flex items-center justify-center text-white text-[10px]">
                    ★
                  </div>

                  <img
                    src={CHURCH_DATA.images.fellowship}
                    alt="Faith Baptist Church Fellowship"
                    className="w-full h-64 object-cover rounded-xl border border-stone-100"
                  />

                  <div className="mt-4 text-center">
                    <span className="font-serif italic font-bold text-stone-800 text-sm block">
                      "A Church Family in Fostoria, Ohio"
                    </span>
                    <span className="text-[11px] text-stone-500 uppercase tracking-widest block mt-0.5">
                      Sunday Morning Fellowship
                    </span>
                  </div>
                </div>

                {/* Mini Stamp Badge */}
                <div className="absolute -bottom-4 -right-4 bg-brand-navy text-white px-4 py-2 rounded-xl shadow-lg border border-white/20 rotate-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                  <span className="text-xs font-bold">{status.badgeText}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------- SECTION 2: "A SUNDAY IN THE LIFE" STORY TIMELINE ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-crimson">
            What a Sunday Morning Feels Like
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy mt-1">
            A Sunday in the Life: From 9:00 AM to Noon
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            No guessing, no surprises. Here is exactly what you will experience from the moment you pull into our parking lot.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {timeline.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-stone-100 text-brand-navy border border-stone-200">
                      {step.time}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-brand-crimson/10 text-brand-crimson flex items-center justify-center group-hover:bg-brand-crimson group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-brand-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span>Step 0{idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-brand-crimson transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- SECTION 3: PHOTOJOURNALISTIC POLAROID MOSAIC ----------------- */}
      <section className="py-16 bg-stone-100/70 border-t border-b border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-crimson">
                Real People • Real Fellowship
              </span>
              <h2 className="text-3xl font-serif font-bold text-brand-navy mt-1">
                Life & Ministry at Faith Baptist
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/ministries.html')}
              className="text-xs font-bold text-brand-navy hover:text-brand-crimson transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore All Church Ministries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Polaroid 1: Preaching */}
            <div className="bg-white p-3.5 pb-5 rounded-2xl border border-stone-200 shadow-md rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300">
              <img
                src={CHURCH_DATA.images.pastorPulpit}
                alt="Pulpit Preaching"
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="mt-3 text-center">
                <span className="font-serif font-bold text-brand-navy text-xs block">
                  Verse-by-Verse Preaching
                </span>
                <span className="text-[11px] text-stone-500">Unchanging King James Bible</span>
              </div>
            </div>

            {/* Polaroid 2: Nursery */}
            <div className="bg-white p-3.5 pb-5 rounded-2xl border border-stone-200 shadow-md rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
              <img
                src={CHURCH_DATA.images.nursery}
                alt="Safe Nursery"
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="mt-3 text-center">
                <span className="font-serif font-bold text-brand-navy text-xs block">
                  Loving Nursery Care
                </span>
                <span className="text-[11px] text-stone-500">Safe, clean, sanitized rooms</span>
              </div>
            </div>

            {/* Polaroid 3: Sunday School */}
            <div className="bg-white p-3.5 pb-5 rounded-2xl border border-stone-200 shadow-md rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
              <img
                src={CHURCH_DATA.images.sundaySchool}
                alt="Sunday School Class"
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="mt-3 text-center">
                <span className="font-serif font-bold text-brand-navy text-xs block">
                  Children & Youth Classes
                </span>
                <span className="text-[11px] text-stone-500">Faithful teachers every Sunday</span>
              </div>
            </div>

            {/* Polaroid 4: Church Building */}
            <div className="bg-white p-3.5 pb-5 rounded-2xl border border-stone-200 shadow-md rotate-[2deg] hover:rotate-0 transition-transform duration-300">
              <img
                src={CHURCH_DATA.images.churchMain}
                alt="Church Exterior"
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="mt-3 text-center">
                <span className="font-serif font-bold text-brand-navy text-xs block">
                  The White Steeple
                </span>
                <span className="text-[11px] text-stone-500">Township Rd 116, Fostoria</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------- SECTION 4: 3-GENERATION TESTIMONIAL VOICES ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold font-mono">
            Stories of Grace
          </span>
          <h2 className="text-3xl font-serif font-bold text-brand-navy mt-1">
            Hear from Our Church Family
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 mb-8">
          {(['mom', 'teen', 'senior'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white text-stone-600 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              {testimonials[tab].badge}
            </button>
          ))}
        </div>

        {/* Active Testimonial Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl relative">
          <Quote className="w-12 h-12 text-brand-crimson/20 absolute top-6 right-6 pointer-events-none" />
          
          <p className="text-stone-800 text-base sm:text-xl font-serif italic leading-relaxed mb-6">
            "{testimonials[activeTab].quote}"
          </p>

          <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
            <div className="w-10 h-10 rounded-full bg-brand-crimson/15 text-brand-crimson font-bold flex items-center justify-center font-serif">
              {testimonials[activeTab].name[0]}
            </div>
            <div>
              <span className="font-bold text-brand-navy text-sm block">{testimonials[activeTab].name}</span>
              <span className="text-xs text-stone-500">{testimonials[activeTab].role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 5: "CUP OF COFFEE" CONVERSATIONAL FAQ ----------------- */}
      <section className="py-16 bg-white border-t border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-serif italic text-brand-crimson mb-2">
              <Coffee className="w-4 h-4" />
              <span>Answers Over a Cup of Coffee</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-brand-navy">
              Frequently Asked Visitor Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 overflow-hidden transition-all bg-[#FAF8F5]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-brand-navy hover:text-brand-crimson transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-crimson' : 'text-stone-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Warm Contact CTA */}
          <div className="mt-12 text-center bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200">
            <h3 className="font-serif font-bold text-xl text-brand-navy mb-2">
              Have a question we didn't cover here?
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mb-6">
              Pastor Brad or one of our church deacons would love to answer your questions personally.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={CHURCH_DATA.location.tel}
                className="px-5 py-2.5 bg-white hover:bg-stone-100 text-brand-navy font-semibold rounded-xl border border-stone-300 text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-brand-crimson" />
                <span>{CHURCH_DATA.location.phone}</span>
              </a>
              <button
                onClick={() => onOpenInquiry('question')}
                className="px-5 py-2.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Send a Personal Note</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
