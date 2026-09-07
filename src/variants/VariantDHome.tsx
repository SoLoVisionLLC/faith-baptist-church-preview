import React, { useState, useEffect } from 'react';
import { 
  Clock, MapPin, Calendar, Volume2, ShieldCheck, Heart, 
  ArrowRight, Play, Pause, Sun, Copy, Check, CheckCircle2,
  ExternalLink, Sparkles, Navigation, Users, Baby, BookOpen, Share2
} from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';
import { StatusResult } from '../utils/hours';

interface VariantDHomeProps {
  status: StatusResult;
  onNavigate: (path: string) => void;
  onOpenInquiry: (mode?: 'visit' | 'prayer' | 'question') => void;
}

export const VariantDHome: React.FC<VariantDHomeProps> = ({
  status,
  onNavigate,
  onOpenInquiry
}) => {
  // 1. Live Countdown Calculation to Next Gathering
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      // Target next gathering: Next Sunday 10:00 AM or Wed 7:00 PM
      const day = now.getDay(); // 0 is Sunday, 3 is Wed
      const target = new Date(now);

      if (day === 0 && now.getHours() < 10) {
        // Today Sunday before 10am
        target.setHours(10, 0, 0, 0);
      } else if (day === 0 && now.getHours() < 18) {
        // Today Sunday before 6pm
        target.setHours(18, 0, 0, 0);
      } else if (day < 3 || (day === 3 && now.getHours() < 19)) {
        // Before Wednesday 7pm
        const diffDays = (3 - day + 7) % 7;
        target.setDate(now.getDate() + diffDays);
        target.setHours(19, 0, 0, 0);
      } else {
        // Next Sunday 10am
        const diffDays = (7 - day) % 7 || 7;
        target.setDate(now.getDate() + diffDays);
        target.setHours(10, 0, 0, 0);
      }

      const diffMs = target.getTime() - now.getTime();
      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const seconds = Math.floor((diffMs / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Interactive Audio Waveform State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(14); // seconds

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => (prev >= 180 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // 3. Interactive What-To-Expect Chips
  const [activeChip, setActiveChip] = useState<'dress' | 'bible' | 'music' | 'parking'>('dress');

  // 4. Scripture Copy State
  const [copiedVerse, setCopiedVerse] = useState(false);

  const handleCopyVerse = () => {
    navigator.clipboard.writeText('"For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." — 2 Timothy 1:7 (KJV)');
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2500);
  };

  const expectations = {
    dress: {
      title: "Dress Comfortably",
      badge: "No Dress Code",
      text: "You will see everything from Sunday suits to business casual and clean jeans. We care about your spiritual walk, not your wardrobe.",
      stat: "100% Come-as-you-are"
    },
    bible: {
      title: "King James Bible Preaching",
      badge: "Expository Truth",
      text: "Clear, verse-by-verse exposition straight from the preserved Word of God. Practical messages with timeless spiritual meat.",
      stat: "Verse-by-Verse"
    },
    music: {
      title: "Christ-Honoring Hymns",
      badge: "Reverent & Joyful",
      text: "Congregational singing of traditional hymns and spiritual anthems that lift the name of Jesus without concert theatrics.",
      stat: "Choir & Piano Accompanied"
    },
    parking: {
      title: "Dedicated Guest Parking",
      badge: "Front-Door Access",
      text: "Reserved visitor parking right in front of the main glass doors under the steeple. Easy ramp and grade-level accessible entryway.",
      stat: "Reserved Stalls"
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-10 lg:py-14 px-4 sm:px-6 lg:px-8 selection:bg-brand-crimson selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Concept Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/15 text-brand-crimson border border-brand-crimson/30 text-xs font-bold tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse" />
              Live Campus Command Center • Bento Mode
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Faith Baptist Church <span className="text-brand-gold">Fostoria</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Real-time schedule, interactive media, visitor logistics, and gospel community at a single glance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenInquiry('visit')}
              className="px-5 py-2.5 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-glow-crimson transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>RSVP First Visit</span>
            </button>
            <button
              onClick={() => onNavigate('/visit.html')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs uppercase tracking-wider border border-slate-700 transition-all flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-brand-gold" />
              <span>Campus Map</span>
            </button>
          </div>
        </div>

        {/* ----------------- BENTO GRID ----------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

          {/* TILE 1: (2 cols) HERO LIVE COUNTDOWN & SERVICE STATUS */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-950 via-brand-navyDark to-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col justify-between group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-crimson/15 transition-all duration-700" />
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold text-brand-gold">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                  <span>{status.badgeText}</span>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-black/40 px-3 py-1 rounded-lg border border-slate-800">
                  EST • Fostoria, Ohio
                </div>
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-brand-crimson font-bold">
                Next Upcoming Gathering
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
                Sunday Morning Worship & Preaching
              </h2>
              <p className="text-slate-300 text-sm max-w-xl mb-6">
                Join us for reverent congregational praise, heartfelt prayer, and powerful verse-by-verse preaching from the King James Bible.
              </p>

              {/* Ticking Countdown Digit Blocks */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md my-4">
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 sm:p-4 text-center">
                  <span className="text-2xl sm:text-4xl font-mono font-black text-white">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">Days</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 sm:p-4 text-center">
                  <span className="text-2xl sm:text-4xl font-mono font-black text-brand-gold">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">Hours</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 sm:p-4 text-center">
                  <span className="text-2xl sm:text-4xl font-mono font-black text-brand-crimson">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">Mins</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 sm:p-4 text-center">
                  <span className="text-2xl sm:text-4xl font-mono font-black text-white animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">Secs</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Hero Tile */}
            <div className="relative z-10 pt-6 mt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-brand-crimson shrink-0" />
                <span>{CHURCH_DATA.location.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={CHURCH_DATA.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/15 transition-all flex items-center gap-1.5"
                >
                  <span>1-Click GPS</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
                </a>
                <button
                  onClick={() => onOpenInquiry('visit')}
                  className="px-4 py-2 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Pre-Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* TILE 2: LIVE WEATHER & FOSTORIA SUNDAY ADVISORY */}
          <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <Sun className="w-4 h-4 text-brand-gold" />
                  <span>Campus Weather</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  Live Fostoria, OH
                </span>
              </div>

              <div className="flex items-baseline gap-3 my-2">
                <span className="text-5xl font-black font-mono text-white">68°</span>
                <span className="text-base font-semibold text-slate-300">Partly Sunny</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Comfortable conditions anticipated for Sunday gatherings. Light outerwear recommended for morning arrival.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Auditorium Climate:</span>
                <span className="font-semibold text-white">Controlled 70°F</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Main Entrance:</span>
                <span className="font-semibold text-brand-gold">Paved & Ramp Accessible</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Sunday School:</span>
                <span className="font-semibold text-white">9:00 AM (Coffee provided)</span>
              </div>
            </div>
          </div>

          {/* TILE 3: (2 cols) INTERACTIVE AUDIO WAVEFORM SERMON TEASER */}
          <div className="md:col-span-2 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-brand-crimson" />
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-crimson font-bold">
                    Featured Pulpit Message
                  </span>
                </div>
                <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full font-mono">
                  Audio Snippet
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                "Standing Fast in Perilous Times"
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-4">
                Exposition from 2 Timothy 3:1-17 • Preached by Pastor Brad Smith
              </p>

              {/* Animated Waveform Visualizer */}
              <div className="bg-black/50 rounded-2xl p-4 border border-slate-800 flex items-center gap-4">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-12 h-12 rounded-xl bg-brand-crimson hover:bg-brand-crimsonDark text-white flex items-center justify-center shrink-0 shadow-glow-crimson transition-all active:scale-95"
                  title={isPlayingAudio ? "Pause Message" : "Play Message"}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                {/* Bars */}
                <div className="flex-1 flex items-center gap-1 sm:gap-1.5 h-12 overflow-hidden">
                  {[40, 65, 80, 50, 90, 75, 45, 100, 85, 60, 40, 70, 95, 55, 30, 85, 90, 45, 65, 75, 50, 80, 60, 40, 95, 70, 50, 30, 85, 60].map((h, i) => {
                    const isPassed = i * 6 <= audioProgress;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          isPassed ? 'bg-brand-crimson' : 'bg-slate-700'
                        } ${isPlayingAudio ? 'animate-pulse' : ''}`}
                        style={{
                          height: isPlayingAudio ? `${Math.max(15, (h + (i % 3) * 15) % 100)}%` : `${h}%`
                        }}
                      />
                    );
                  })}
                </div>

                <span className="text-xs font-mono text-slate-300 shrink-0">
                  {Math.floor(audioProgress / 60)}:{String(audioProgress % 60).padStart(2, '0')} / 34:20
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Full sermon archives available with outlines</span>
              <button
                onClick={() => onNavigate('/sermons.html')}
                className="text-brand-gold hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
              >
                <span>Browse All Sermons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TILE 4: KIDS & NURSERY SAFETY VERIFICATION */}
          <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-crimson/15 text-brand-crimson border border-brand-crimson/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Parent Peace of Mind
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                100% Vetted Children's Care
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your kids' safety and spiritual nourishment are our sacred trust. We operate structured, loving nurseries and classrooms during all main services.
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Secure check-in with parent pagers</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Sanitized toys & nursery (&lt;2 yrs)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Age-graded Bible stories & crafts</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/ministries.html')}
              className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Baby className="w-4 h-4 text-brand-gold" />
              <span>Explore Kids Ministry</span>
            </button>
          </div>

          {/* TILE 5: (3 cols) INTERACTIVE "WHAT TO EXPECT" CHIP MATRIX */}
          <div className="lg:col-span-3 bg-gradient-to-b from-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
                  Zero Surprise Guarantee
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                  What to Expect on Your First Visit
                </h3>
              </div>

              {/* Selector Chips */}
              <div className="flex flex-wrap gap-2">
                {(['dress', 'bible', 'music', 'parking'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveChip(key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeChip === key
                        ? 'bg-brand-crimson text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {key.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Chip Detail Display */}
            <div className="bg-black/40 rounded-2xl p-6 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-bold">
                  {expectations[activeChip].badge}
                </div>
                <h4 className="text-xl font-bold text-white">
                  {expectations[activeChip].title}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {expectations[activeChip].text}
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-center min-w-[200px] shrink-0">
                <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 block mb-1">Standard</span>
                <span className="text-base font-black text-brand-gold">{expectations[activeChip].stat}</span>
              </div>
            </div>
          </div>

          {/* TILE 6: WEEKLY SCRIPTURE MEMORY CARD */}
          <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-gold font-bold">
                  <BookOpen className="w-4 h-4" />
                  <span>Verse of the Week</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  KJV
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-serif italic text-slate-100 leading-relaxed border-l-2 border-brand-crimson pl-4 my-3">
                "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind."
              </blockquote>
              <span className="block text-right text-xs font-mono text-brand-gold font-bold mt-2">
                — 2 Timothy 1:7
              </span>
            </div>

            <button
              onClick={handleCopyVerse}
              className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2"
            >
              {copiedVerse ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Scripture Verse</span>
                </>
              )}
            </button>
          </div>

          {/* TILE 7: (2 cols) FULL GATHERING SCHEDULE & INQUIRY */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  <span>Weekly Gathering Times</span>
                </div>
                <span className="text-xs text-brand-crimson font-bold">All Welcome</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
                  <span className="text-xs font-bold text-brand-gold block">Sunday School</span>
                  <span className="text-lg font-black font-mono text-white block mt-0.5">{CHURCH_DATA.schedule.sundaySchool}</span>
                  <span className="text-[11px] text-slate-400">Classes for all ages from nursery through adult</span>
                </div>

                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
                  <span className="text-xs font-bold text-brand-crimson block">Morning Worship</span>
                  <span className="text-lg font-black font-mono text-white block mt-0.5">{CHURCH_DATA.schedule.sundayMorningWorship}</span>
                  <span className="text-[11px] text-slate-400">Congregational singing & expository preaching</span>
                </div>

                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block">Sunday Evening</span>
                  <span className="text-lg font-black font-mono text-white block mt-0.5">{CHURCH_DATA.schedule.sundayEvening}</span>
                  <span className="text-[11px] text-slate-400">Family fellowship, youth studies & evening worship</span>
                </div>

                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block">Wednesday Prayer</span>
                  <span className="text-lg font-black font-mono text-white block mt-0.5">{CHURCH_DATA.schedule.wednesdayService}</span>
                  <span className="text-[11px] text-slate-400">Midweek devotional Bible study & church prayer</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">Need a ride or have a special prayer request?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenInquiry('prayer')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all"
                >
                  Prayer Request
                </button>
                <button
                  onClick={() => onOpenInquiry('visit')}
                  className="px-4 py-2 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Plan Visit
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
