import React, { useState } from 'react';
import { 
  Heart, Users, Baby, BookOpen, Clock, MapPin, 
  Phone, ArrowRight, CheckCircle2, ShieldCheck, 
  Send, Sparkles, Coffee, Car, HelpCircle, ChevronDown, 
  ChevronUp, HeartHandshake, Globe, Bus
} from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';
import { StatusResult } from '../utils/hours';

interface VariantDHomeProps {
  status: StatusResult;
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

type LifeStageKey = 'young-families' | 'students' | 'adults' | 'fellowship' | 'seniors' | 'seeking';

interface LifeStageInfo {
  id: LifeStageKey;
  label: string;
  badge: string;
  headline: string;
  description: string;
  image: string;
  meetingTime: string;
  location: string;
  reassurances: string[];
  ctaText: string;
  ctaAction: 'visit' | 'prayer' | 'question';
}

export const VariantDHome: React.FC<VariantDHomeProps> = ({
  status,
  onNavigate,
  onOpenInquiry
}) => {
  // 1. Life Stage Compass State
  const [activeStage, setActiveStage] = useState<LifeStageKey>('young-families');

  // 2. Interactive Prayer Form State
  const [prayerName, setPrayerName] = useState('');
  const [prayerText, setPrayerText] = useState('');
  const [prayerConfidential, setPrayerConfidential] = useState(false);
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  // 3. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) return;
    setPrayerSubmitted(true);
    setTimeout(() => {
      setPrayerName('');
      setPrayerText('');
      setPrayerConfidential(false);
    }, 4000);
  };

  const lifeStages: Record<LifeStageKey, LifeStageInfo> = {
    'young-families': {
      id: 'young-families',
      label: 'Families & Nursery',
      badge: 'Nursery to 5th Grade',
      headline: 'A Safe, Nurturing Sanctuary for Your Little Ones',
      description: 'We know how much trust it takes to leave your children with someone new. Our nursery and children’s ministries provide clean, secure, age-appropriate care where toddlers and elementary kids learn foundational Bible stories in a fun, gentle environment.',
      image: '/assets/tots_nursery.jpg',
      meetingTime: 'Sunday 9:00 AM (Sunday School) & 10:00 AM (Worship & Junior Church)',
      location: 'Children’s Education Wing (Directly left of main lobby)',
      reassurances: [
        'All nursery volunteers are screened, vetted church members',
        'Clean, sanitized toys, cribs, and changing stations every service',
        'Quiet, sound-proof cry room with live audio feed for nursing mothers',
        'Secure parent check-in and silent notification system'
      ],
      ctaText: 'Plan a Visit for Your Family',
      ctaAction: 'visit'
    },
    'students': {
      id: 'students',
      label: 'Kids & Teens',
      badge: 'Grades 6–12 & Patch Club',
      headline: 'Faith, Fun, & Strong Christian Character for the Next Generation',
      description: 'Our youth ministry helps middle school and high school students navigate the pressures of modern life with unwavering biblical confidence. From weekly scripture memory to annual youth conferences, teen rallies, and service projects, students find real friendships anchored in Christ.',
      image: '/assets/sunday_school_class.jpg',
      meetingTime: 'Sunday 9:00 AM (Youth Classes) & Wednesday 7:00 PM (Youth Bible Study)',
      location: 'Youth Fellowship Room',
      reassurances: [
        'Grounded in timeless scripture, not entertainment gimmicks',
        'Safe, supervised social activities and summer camp opportunities',
        'Mentorship from mature Christian leaders who genuinely care',
        'Encouraging peers who uplift one another in faith'
      ],
      ctaText: 'Connect Your Teen with Our Youth Leader',
      ctaAction: 'question'
    },
    'adults': {
      id: 'adults',
      label: 'Young Adults & Couples',
      badge: 'Singles, Newlyweds & Parents',
      headline: 'Navigating Life, Marriage, & Careers with Biblical Clarity',
      description: 'Building a Christ-centered home in today’s world takes intentional community. Our adult Bible classes offer verse-by-verse scriptural insights that apply directly to your marriage, career decisions, parenting challenges, and daily walk with God.',
      image: '/assets/fellowship_family.jpg',
      meetingTime: 'Sunday 9:00 AM (Adult Bible Fellowships) & Wednesday 7:00 PM',
      location: 'Main Fellowship Hall & Classrooms',
      reassurances: [
        'Practical life applications straight from the King James Bible',
        'Welcoming to singles, dating couples, and young parents alike',
        'Regular fellowship dinners, game nights, and home hospitality',
        'Honest, supportive community where you can grow at your own pace'
      ],
      ctaText: 'Join an Adult Bible Class This Sunday',
      ctaAction: 'visit'
    },
    'fellowship': {
      id: 'fellowship',
      label: 'Men’s & Ladies’ Circles',
      badge: 'Discipleship & Outreach',
      headline: 'Iron Sharpening Iron: Brotherhood and Sisterhood in Faith',
      description: 'Through monthly Men’s Prayer Breakfasts, work days, and Ladies’ Missionary Fellowship circles, our men and women build deep bonds of mutual encouragement. We pray for our missionaries, support our community, and spur one another on to good works.',
      image: '/assets/church_exterior_front.jpg',
      meetingTime: 'Monthly Saturday Breakfasts & Scheduled Evening Circles',
      location: 'Fellowship Hall & Church Kitchen',
      reassurances: [
        'Monthly Men’s Fellowship Breakfast with scripture devotionals',
        'Ladies’ Missionary Society packing care packages for global workers',
        'Practical service projects assisting widows and shut-ins in Seneca County',
        'Meaningful prayer partnerships that pray through life’s storms'
      ],
      ctaText: 'Ask About Upcoming Fellowship Events',
      ctaAction: 'question'
    },
    'seniors': {
      id: 'seniors',
      label: 'Golden Saints (55+)',
      badge: 'Wisdom & Heritage',
      headline: 'The Loving Pillars & Heritage of Our Church Family',
      description: 'Our senior saints are the spiritual backbone of Faith Baptist Church. With decades of faithful prayer, wisdom, and steadfast love, they model a lifelong dedication to the Lord. We provide accessible facilities, regular fellowship luncheons, and dedicated pastoral visits.',
      image: '/assets/worship_choir.jpg',
      meetingTime: 'Sunday Morning Services & Special Senior Day Trips',
      location: 'Sanctuary & Ground-Level Fellowship Center',
      reassurances: [
        '100% ground-level, wheelchair-accessible entry with zero steps',
        'Personal assisted-listening headsets available at the welcome desk',
        'Traditional congregational hymn singing with choir and piano',
        'Faithful pastoral visitation for hospital stays or homebound periods'
      ],
      ctaText: 'Schedule a Pastoral Visit or Ride',
      ctaAction: 'question'
    },
    'seeking': {
      id: 'seeking',
      label: 'New to Faith / Questions',
      badge: 'No Judgment • Just Truth',
      headline: 'Searching for Peace, Purpose, and Truth? You Are Welcome Here.',
      description: 'You don’t need to have your life all figured out, and you don’t need a background in church to walk through our doors. If you have questions about God, salvation, eternity, or how to read the Bible, Pastor Brad would love to sit down with you over coffee—zero pressure, ever.',
      image: '/assets/pastor_pulpit.jpg',
      meetingTime: 'Any Sunday or by Private Pastoral Appointment',
      location: 'Pastor’s Study or Local Fostoria Coffee Shop',
      reassurances: [
        'No public singling out or embarrassing spotlight on visitors',
        'Straightforward answers directly from the preserved Word of God',
        'Clear, simple explanation of the gospel of Jesus Christ',
        'Free visitor packet and King James Bible if you need one'
      ],
      ctaText: 'Reach Out to Pastor Brad Directly',
      ctaAction: 'prayer'
    }
  };

  const activeStageData = lifeStages[activeStage];

  const faqs = [
    {
      q: "What should I wear when I visit?",
      a: "Come in whatever you feel comfortable wearing. On any given Sunday, you will see men in suits, women in dresses, and others in clean jeans, casual shirts, and work boots. What matters most to God—and to us—is your heart, not your wardrobe."
    },
    {
      q: "Which Bible translation do you preach from?",
      a: "We preach and teach exclusively from the King James Version (KJV) of the Bible. We believe it is the preserved Word of God for the English-speaking people. If you do not have a Bible of your own, we have Bibles in every pew, and we will happily give you one to keep as our gift!"
    },
    {
      q: "Where do my children go during the Sunday service?",
      a: "During the 9:00 AM hour, we have age-graded Sunday school classes for all ages. During the 10:00 AM main worship service, infants and toddlers are cared for in our clean, monitored nursery, while elementary children may participate in Junior Church or sit with you in the main sanctuary—whatever your family prefers!"
    },
    {
      q: "Will I be expected to give money during the offering?",
      a: "Absolutely not. As our guest, you are under no obligation whatsoever to put anything in the offering plate. The offering is for our church members and regular attenders who joyfully support the local work and global missions of our church."
    }
  ];

  return (
    <div className="bg-[#FAF9F5] text-slate-800 min-h-screen selection:bg-brand-crimson selection:text-white">

      {/* -------------------------------------------------------------
          1. WELCOMING HERO: THE FRONT PORCH
      ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FDFBF7] to-[#FAF9F5] pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-crimson/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill: Community Status */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-semibold text-brand-navy">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{status.badgeText}</span>
            </div>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              • 11275 W. Twp. Rd. 116, Fostoria, Ohio
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Headline & Family Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-crimson bg-brand-crimson/10 px-3 py-1 rounded-md">
                  Independent • Bible-Believing • Welcoming All Generations
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.12]">
                  A church you can <br />
                  <span className="text-brand-crimson underline decoration-brand-gold/50 decoration-4 underline-offset-6">
                    call home.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed pt-2">
                  Whether you are raising a young family, searching for biblical truth and salvation, or simply longing for warm Christian fellowship—you have a seat saved for you this Sunday in Fostoria.
                </p>
              </div>

              {/* Service Schedule Quick Bar */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="border-r border-stone-100 last:border-0 pr-2">
                  <span className="block text-[11px] uppercase font-bold text-stone-500 tracking-wider">Sunday School</span>
                  <span className="text-base font-extrabold text-brand-navy">9:00 AM</span>
                  <span className="block text-[10px] text-stone-400">All Ages</span>
                </div>
                <div className="sm:border-r border-stone-100 pr-2">
                  <span className="block text-[11px] uppercase font-bold text-brand-crimson tracking-wider">Morning Worship</span>
                  <span className="text-base font-extrabold text-brand-crimson">10:00 AM</span>
                  <span className="block text-[10px] text-stone-400">Nursery + Jr Church</span>
                </div>
                <div className="border-r border-stone-100 last:border-0 pr-2">
                  <span className="block text-[11px] uppercase font-bold text-stone-500 tracking-wider">Sunday Evening</span>
                  <span className="text-base font-extrabold text-brand-navy">6:00 PM</span>
                  <span className="block text-[10px] text-stone-400">Hymns & Message</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-stone-500 tracking-wider">Wednesday</span>
                  <span className="text-base font-extrabold text-brand-navy">7:00 PM</span>
                  <span className="block text-[10px] text-stone-400">Prayer & Study</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenInquiry('visit')}
                  className="px-6 py-3.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
                  <span>Plan Your First Visit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenInquiry('prayer')}
                  className="px-5 py-3.5 bg-white hover:bg-stone-50 text-brand-navy font-bold rounded-xl text-sm border border-stone-300 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 text-brand-crimson" />
                  <span>Request Prayer</span>
                </button>

                <a
                  href="tel:+14193482171"
                  className="px-4 py-3.5 text-stone-600 hover:text-brand-navy font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-stone-400" />
                  <span>(419) 348-2171</span>
                </a>
              </div>

              {/* 4 Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-200/80">
                <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Vetted Nursery Care</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                  <BookOpen className="w-4 h-4 text-brand-navy shrink-0" />
                  <span>KJV Bible Preaching</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                  <Users className="w-4 h-4 text-brand-crimson shrink-0" />
                  <span>No Dress Code</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                  <Coffee className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Warm Fellowship</span>
                </div>
              </div>

            </div>

            {/* Right Column: Warm Visual Family Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-3 shadow-xl border border-stone-200/90 relative group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100">
                  <img 
                    src="/assets/fellowship_family.jpg" 
                    alt="Faith Baptist Church fellowship and family worship" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  
                  {/* Floating badge over photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-crimson text-white text-[10px] font-extrabold uppercase tracking-wider mb-1">
                      Loving Generations
                    </span>
                    <p className="text-sm font-semibold text-white drop-shadow-sm">
                      "Growing together in grace, truth, and love right here in Seneca County."
                    </p>
                  </div>
                </div>

                {/* Pastor Brad Quote in Card Footer */}
                <div className="p-4 pt-3 flex items-center gap-3">
                  <img 
                    src="/assets/pastor_pulpit.jpg" 
                    alt="Pastor Brad Smith" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold shadow-sm shrink-0"
                  />
                  <div>
                    <h2 className="text-sm font-bold text-brand-navy">Pastor Brad Smith</h2>
                    <p className="text-xs text-stone-500">Senior Pastor • Faith Baptist Church</p>
                  </div>
                  <button
                    onClick={() => onOpenInquiry('question')}
                    className="ml-auto text-xs font-bold text-brand-crimson hover:underline shrink-0"
                  >
                    Say Hello →
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* -------------------------------------------------------------
          2. INTERACTIVE FEATURE: LIFE-STAGE MINISTRY COMPASS
      ------------------------------------------------------------- */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Ministry for Every Stage of Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Find Your Family at Faith
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            No matter your age or where you are in your spiritual walk, there is an intentional place for you to grow, belong, and serve. Click your life stage below:
          </p>
        </div>

        {/* Life Stage Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {(Object.keys(lifeStages) as LifeStageKey[]).map((key) => {
            const stage = lifeStages[key];
            const isActive = activeStage === key;
            return (
              <button
                key={key}
                onClick={() => setActiveStage(key)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-brand-navy text-white shadow-md ring-2 ring-brand-gold/50'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200 shadow-sm'
                }`}
              >
                {key === 'young-families' && <Baby className="w-4 h-4 text-brand-crimson" />}
                {key === 'students' && <BookOpen className="w-4 h-4 text-brand-gold" />}
                {key === 'adults' && <Users className="w-4 h-4 text-emerald-600" />}
                {key === 'fellowship' && <HeartHandshake className="w-4 h-4 text-amber-600" />}
                {key === 'seniors' && <Coffee className="w-4 h-4 text-blue-500" />}
                {key === 'seeking' && <HelpCircle className="w-4 h-4 text-purple-600" />}
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Dynamic Showcase Card */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-lg p-6 sm:p-8 lg:p-10 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Visual Photography */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 relative shadow-md">
                <img 
                  src={activeStageData.image} 
                  alt={activeStageData.headline} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-navy shadow-sm">
                  {activeStageData.badge}
                </div>
              </div>

              {/* Schedule & Location Quick Snippet */}
              <div className="bg-[#FAF9F5] rounded-xl p-4 border border-stone-200 text-xs space-y-2">
                <div className="flex items-start gap-2 text-stone-700">
                  <Clock className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-brand-navy">Gathering Schedule:</strong>
                    <span>{activeStageData.meetingTime}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-stone-700 pt-1 border-t border-stone-200/60">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-brand-navy">Campus Room:</strong>
                    <span>{activeStageData.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content, Reassurances, and CTA */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-crimson">
                  {activeStageData.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                  {activeStageData.headline}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed pt-1">
                  {activeStageData.description}
                </p>
              </div>

              {/* Reassurances Checklist */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  What You & Your Loved Ones Can Expect:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStageData.reassurances.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenInquiry(activeStageData.ctaAction)}
                  className="px-6 py-3 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{activeStageData.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/ministries.html')}
                  className="px-4 py-3 text-stone-600 hover:text-brand-navy font-semibold text-xs sm:text-sm underline underline-offset-4 transition-colors cursor-pointer"
                >
                  View All Church Ministries →
                </button>
              </div>

            </div>

          </div>
        </div>

      </section>


      {/* -------------------------------------------------------------
          3. REASSURANCE FEATURE: 4-STEP FRONT PORCH WALKTHROUGH
      ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-crimson">
              Zero Guesswork • 100% Peace of Mind
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy">
              What Happens on Your First Visit
            </h2>
            <p className="text-stone-600 text-sm">
              We remove the awkwardness and uncertainty of visiting a new church. Here is exactly what your morning looks like:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  01
                </div>
                <div className="flex items-center gap-2 text-brand-navy font-bold text-lg">
                  <Car className="w-5 h-5 text-brand-crimson" />
                  <span>Pull In & Park</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Dedicated guest parking stalls are located directly in front of the main entrance under the steeple. Easy ramp and grade-level access for strollers and wheelchairs.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-200/60 mt-4 text-[11px] font-semibold text-stone-500">
                ✓ Front-door guest spots
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  02
                </div>
                <div className="flex items-center gap-2 text-brand-navy font-bold text-lg">
                  <HeartHandshake className="w-5 h-5 text-brand-crimson" />
                  <span>Warm Greeters</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  You’ll be met at the door with a friendly smile, a worship bulletin, and directions to coffee or our clean, secure nursery check-in for your little ones.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-200/60 mt-4 text-[11px] font-semibold text-stone-500">
                ✓ Escorted kids check-in
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  03
                </div>
                <div className="flex items-center gap-2 text-brand-navy font-bold text-lg">
                  <BookOpen className="w-5 h-5 text-brand-crimson" />
                  <span>Worship & Truth</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Join in traditional Christ-honoring hymns with choir and piano, followed by a clear, verse-by-verse expository message straight from the King James Bible.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-200/60 mt-4 text-[11px] font-semibold text-stone-500">
                ✓ Bibles provided in pews
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  04
                </div>
                <div className="flex items-center gap-2 text-brand-navy font-bold text-lg">
                  <Coffee className="w-5 h-5 text-brand-crimson" />
                  <span>No Pressure</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  We never single out or embarrass visitors. After the benediction, Pastor Brad and our church family look forward to greeting you personally with a free welcome gift.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-200/60 mt-4 text-[11px] font-semibold text-stone-500">
                ✓ Free welcome gift packet
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onOpenInquiry('visit')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Let Us Know You’re Coming (Optional)</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </button>
          </div>

        </div>
      </section>


      {/* -------------------------------------------------------------
          4. COMMUNITY HEART: HOW WE SERVE FOSTORIA
      ------------------------------------------------------------- */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-crimson">
              Loving Seneca & Surrounding Counties
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight mt-1">
              Serving Fostoria & Reaching the World
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md">
            Our faith is not confined to Sunday morning. Through active outreach, bus routes, benevolence, and global missions, we share the hope of Christ every week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Outreach 1: Bus Ministry */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-base">Free Sunday Bus Ministry</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We provide free, safe transportation for boys, girls, and seniors across Fostoria who want to attend Sunday school and church services.
            </p>
            <button
              onClick={() => onOpenInquiry('question')}
              className="text-xs font-bold text-brand-crimson hover:underline cursor-pointer"
            >
              Request a Ride →
            </button>
          </div>

          {/* Outreach 2: Global Missions */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-base">40+ Worldwide Missionaries</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Through faith-promise giving, our church actively supports missionary families preaching the gospel across 5 continents and in US church plants.
            </p>
            <button
              onClick={() => onNavigate('/ministries.html')}
              className="text-xs font-bold text-brand-crimson hover:underline cursor-pointer"
            >
              See Our Missions →
            </button>
          </div>

          {/* Outreach 3: Community Benevolence */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-base">Local Family Assistance</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Seasonal food pantries, emergency benevolence, and holiday care boxes distributed to local families facing sudden hardships in Seneca County.
            </p>
            <button
              onClick={() => onOpenInquiry('prayer')}
              className="text-xs font-bold text-brand-crimson hover:underline cursor-pointer"
            >
              Connect with Care →
            </button>
          </div>

          {/* Outreach 4: Senior & Shut-in Care */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-brand-navy text-base">Nursing Home Visitation</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bringing uplifting hymns, friendly conversation, and the comforting promises of God’s Word to elderly shut-ins and nursing care residents.
            </p>
            <button
              onClick={() => onOpenInquiry('question')}
              className="text-xs font-bold text-brand-crimson hover:underline cursor-pointer"
            >
              Request a Visit →
            </button>
          </div>

        </div>

      </section>


      {/* -------------------------------------------------------------
          5. INTERACTIVE FEATURE: COMMUNITY PRAYER & PASTORAL CARE
      ------------------------------------------------------------- */}
      <section className="py-16 bg-gradient-to-b from-[#FAF9F5] to-white border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-crimson/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Pastoral Promise */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Confidential Pastoral Care</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  How Can We Pray for You This Week?
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  You don’t have to carry your burdens alone. Whether it’s a health challenge, family worry, or spiritual question, Pastor Brad and our faithful prayer chain personally pray over every request submitted here.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <img 
                    src="/assets/pastor_pulpit.jpg" 
                    alt="Pastor Brad" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold shrink-0"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-white">Pastor Brad Smith</p>
                    <p className="text-slate-400">"The effectual fervent prayer of a righteous man availeth much." — James 5:16</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div className="lg:col-span-6">
                <div className="bg-white text-slate-800 rounded-2xl p-6 shadow-lg">
                  {prayerSubmitted ? (
                    <div className="text-center py-8 space-y-3 animate-fadeIn">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-extrabold text-brand-navy">Prayer Request Received</h4>
                      <p className="text-xs text-stone-600 max-w-sm mx-auto">
                        Thank you for sharing your heart. Pastor Brad and our prayer team will be lifting you up in prayer this week.
                      </p>
                      <button
                        onClick={() => setPrayerSubmitted(false)}
                        className="text-xs font-bold text-brand-crimson hover:underline pt-2 inline-block cursor-pointer"
                      >
                        Submit another prayer request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handlePrayerSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-navy mb-1">
                          Your Name (Optional / First name is fine)
                        </label>
                        <input
                          type="text"
                          value={prayerName}
                          onChange={(e) => setPrayerName(e.target.value)}
                          placeholder="e.g., Sarah or Anonymous"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-brand-crimson focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-navy mb-1">
                          Your Prayer Need or Question *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={prayerText}
                          onChange={(e) => setPrayerText(e.target.value)}
                          placeholder="How can we pray for you or your family?"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-brand-crimson focus:outline-none resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="confidential"
                          checked={prayerConfidential}
                          onChange={(e) => setPrayerConfidential(e.target.checked)}
                          className="rounded text-brand-crimson focus:ring-brand-crimson"
                        />
                        <label htmlFor="confidential" className="text-[11px] text-stone-600 font-medium">
                          Keep confidential (Pastor Brad eyes only)
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Prayer Request to Pastor</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------------------------------------------------
          6. COMMON QUESTIONS ACCORDION
      ------------------------------------------------------------- */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-crimson">
            Helpful Information
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            Questions Guests Often Ask
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-brand-navy text-sm cursor-pointer hover:bg-stone-50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand-crimson shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* -------------------------------------------------------------
          7. BOTTOM PRE-VISIT INVITATION BANNER
      ------------------------------------------------------------- */}
      <section className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-navy">
              Join Us This Sunday at Faith Baptist Church
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Sunday School at 9:00 AM • Morning Worship at 10:00 AM • 11275 W. Twp. Rd. 116, Fostoria, OH
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenInquiry('visit')}
              className="px-6 py-3 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
            >
              Plan Your Visit
            </button>
            <a
              href={CHURCH_DATA.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-brand-navy font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
