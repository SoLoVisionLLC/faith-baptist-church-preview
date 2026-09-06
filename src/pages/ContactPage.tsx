import React, { useState } from 'react';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle2, MessageSquare, Navigation } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('First Visit Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || (!email.trim() && !phone.trim())) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Contact Faith Baptist Church
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Have a question about services, location, prayer needs, or our statement of faith? We are here to serve you.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Address Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Church Information
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Physical Address</span>
                    <p>{CHURCH_DATA.location.fullAddress}</p>
                    <a
                      href={CHURCH_DATA.location.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-crimson font-bold text-xs hover:underline flex items-center gap-1 mt-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-crimson/10 text-brand-crimson flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Church Phone</span>
                    <a
                      href={`tel:${CHURCH_DATA.location.tel}`}
                      className="text-brand-navy font-bold text-base hover:text-brand-crimson"
                    >
                      {CHURCH_DATA.location.phone}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Call anytime for questions, pastoral care, or directions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Weekly Service Schedule</span>
                    <p className="text-xs mt-0.5">Sunday School: 9:00 AM</p>
                    <p className="text-xs">Sunday Morning Worship: 10:00 AM</p>
                    <p className="text-xs">Sunday Evening: 6:00 PM</p>
                    <p className="text-xs">Wednesday Prayer & Study: 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & History Box */}
            <div className="bg-brand-navy text-white p-6 rounded-3xl space-y-3">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                Formerly Dillon Road Baptist
              </span>
              <h3 className="font-serif font-bold text-lg text-white">
                Same Biblical Foundation, Renewed Vision
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Faith Baptist Church continues the same faithful legacy of gospel preaching that has served Seneca County families for decades.
              </p>
              <div className="pt-2">
                <a
                  href={CHURCH_DATA.location.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Visit Our Facebook Page
                </a>
              </div>
            </div>
          </div>

          {/* Right: Validated Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-900">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to Faith Baptist Church. Pastor Brad Smith or a member of our ministry team will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2.5 bg-brand-navy text-white rounded-lg text-xs font-semibold hover:bg-brand-navyLight"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 mb-6">
                  <h2 className="text-2xl font-serif font-bold text-slate-900">Send a Message</h2>
                  <p className="text-xs text-slate-500">We respond promptly to every inquiry.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(419) 555-0123"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Topic / Reason
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50"
                    >
                      <option>First-Time Visitor Question</option>
                      <option>Confidential Prayer Request</option>
                      <option>Question for Pastor Brad</option>
                      <option>Nursery & Children's Ministry</option>
                      <option>Youth Camp or VBS Details</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help or pray for you today?"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-bold rounded-xl text-sm shadow hover:shadow-glow-crimson transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Directly</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
