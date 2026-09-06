import React, { useState } from 'react';
import { X, Send, Heart, Calendar, HelpCircle, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { CHURCH_DATA } from '../data/siteData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'visit' | 'prayer' | 'question';
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, initialMode = 'visit' }) => {
  const [mode, setMode] = useState<'visit' | 'prayer' | 'question'>(initialMode);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [attendingDate, setAttendingDate] = useState('This Sunday (10:00 AM)');
  const [familyCount, setFamilyCount] = useState('1-2 Adults');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-navyLight p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold bg-white/10 px-2.5 py-1 rounded-full">
              Faith Baptist Church
            </span>
          </div>
          <h3 className="text-xl font-bold font-serif">
            {mode === 'visit' && 'Plan Your First Visit'}
            {mode === 'prayer' && 'Share a Confidential Prayer Request'}
            {mode === 'question' && 'Ask Pastor Brad or Leadership'}
          </h3>
          <p className="text-sm text-slate-200 mt-1">
            {mode === 'visit' && 'We would love to greet you and reserve a welcome packet for your family.'}
            {mode === 'prayer' && 'Our pastoral staff and prayer warriors will pray over your request.'}
            {mode === 'question' && 'Have a question about services, beliefs, or our location? Let us know.'}
          </p>
        </div>

        {/* Tab Selection */}
        {!submitted && (
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => setMode('visit')}
              className={`flex-1 py-3 px-3 text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                mode === 'visit' 
                  ? 'border-brand-crimson text-brand-crimson bg-white' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" /> Plan Visit
            </button>
            <button
              onClick={() => setMode('prayer')}
              className={`flex-1 py-3 px-3 text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                mode === 'prayer' 
                  ? 'border-brand-crimson text-brand-crimson bg-white' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-4 h-4" /> Prayer Need
            </button>
            <button
              onClick={() => setMode('question')}
              className={`flex-1 py-3 px-3 text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                mode === 'question' 
                  ? 'border-brand-crimson text-brand-crimson bg-white' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> Question
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 font-serif">Thank You, {name}!</h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                {mode === 'visit' && "We are looking forward to meeting you! Our greeters will have a visitor packet ready for you this Sunday."}
                {mode === 'prayer' && "Your prayer request has been received with care and will be lifted up before the Lord by Pastor Brad and our church."}
                {mode === 'question' && "We have received your question and someone from our church will be in touch shortly."}
              </p>
              
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p>Church Location: {CHURCH_DATA.location.street}, Fostoria, OH</p>
                <p>Need immediate directions? Call {CHURCH_DATA.location.phone}</p>
              </div>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-brand-navy hover:bg-brand-navyLight text-white rounded-lg font-medium text-sm transition-colors shadow"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Miller"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50 focus:border-brand-crimson transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Phone or Email Address *
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. (419) 555-0199 or john@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50 focus:border-brand-crimson transition-all"
                />
              </div>

              {mode === 'visit' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Expected Service
                    </label>
                    <select
                      value={attendingDate}
                      onChange={(e) => setAttendingDate(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50"
                    >
                      <option>Sunday School (9:00 AM)</option>
                      <option>Sunday Worship (10:00 AM)</option>
                      <option>Sunday Evening (6:00 PM)</option>
                      <option>Wednesday Prayer (7:00 PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Who is Coming?
                    </label>
                    <select
                      value={familyCount}
                      onChange={(e) => setFamilyCount(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50"
                    >
                      <option>Just Myself</option>
                      <option>Couple</option>
                      <option>Family with Nursery & Kids</option>
                      <option>Family with Teens</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  {mode === 'visit' && 'Any Special Needs, Kids Ages, or Questions? (Optional)'}
                  {mode === 'prayer' && 'Prayer Request Details (Kept Confidential)'}
                  {mode === 'question' && 'How Can We Help You?'}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    mode === 'visit'
                      ? "e.g. Bringing a 2-year old and 8-year old, wondering about parking..."
                      : mode === 'prayer'
                      ? "Please pray for healing / guidance / family peace..."
                      : "Your message or question..."
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-crimson/50 focus:border-brand-crimson transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-brand-crimson hover:bg-brand-crimsonDark text-white font-semibold rounded-lg shadow-md hover:shadow-glow-crimson flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  {mode === 'visit' && 'Confirm My Visit Plan'}
                  {mode === 'prayer' && 'Submit Prayer Request'}
                  {mode === 'question' && 'Send Message to Church'}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <a 
                  href={`tel:${CHURCH_DATA.location.tel}`} 
                  className="flex items-center gap-1 hover:text-brand-crimson"
                >
                  <Phone className="w-3 h-3" /> {CHURCH_DATA.location.phone}
                </a>
                <a 
                  href={CHURCH_DATA.location.mapsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-brand-crimson"
                >
                  <MapPin className="w-3 h-3" /> Fostoria, OH
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
