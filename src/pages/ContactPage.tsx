import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Mail, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Clock, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';
import SocialLinks from '../components/SocialLinks';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const preSubject = searchParams.get('subject') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(preSubject || 'High-Performance Web & 3D Site');
  const [budget, setBudget] = useState('$199 (Popular)');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Please provide your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service,
          budget,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#923FFF]/15 border border-[#923FFF]/30 text-[#7DBFFF] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Inquiry</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading"
        >
          Let’s Build Something{' '}
          <span className="text-gradient-brand">
            Extraordinary
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed"
        >
          Whether you want to launch an interactive 3D web platform, dominate organic search results, or scale your acquisition funnels — send a direct note or book a calendar consultation below.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Information & Appointment Callout */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Book Appointment Highlight */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#923FFF]/20 via-zinc-900 to-zinc-950 border border-[#923FFF]/40 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center p-0.5 shadow-md shadow-[#923FFF]/30">
                <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#7DBFFF]" />
                </div>
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Fastest Response
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Book an Appointment</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              Prefer a direct video conversation? Pick an exact date and available time slot on my live calendar.
            </p>

            <Link
              id="contact-page-book-btn"
              to="/book-appointment"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-sm font-semibold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#7DBFFF]" />
              <span>Schedule 1-on-1 Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: WhatsApp Quick Chat Highlight */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-teal-950/40 border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#128C7E] flex items-center justify-center p-0.5 shadow-md shadow-emerald-950/50">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400">Direct Messaging</span>
                <h3 className="text-base font-bold text-white">WhatsApp Chat</h3>
                <span className="text-xs font-mono text-emerald-300 font-semibold">{PERSONAL_INFO.whatsapp}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              Need quick answers or want to discuss project requirements immediately? Message me directly on WhatsApp at <strong className="text-white font-mono">{PERSONAL_INFO.whatsapp}</strong>.
            </p>
            <a
              id="contact-page-whatsapp-btn"
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md transition-all"
            >
              <span>Chat on WhatsApp ({PERSONAL_INFO.whatsapp})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Direct Coordinates */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">Direct WhatsApp & Phone</span>
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-semibold text-white hover:text-emerald-400 transition-colors font-mono"
                >
                  {PERSONAL_INFO.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#7DBFFF]" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">Direct Email</span>
                <a
                  href="mailto:akteruzzaman.inf@gmail.com"
                  className="text-sm sm:text-base font-semibold text-white hover:text-[#7DBFFF] transition-colors font-mono"
                >
                  akteruzzaman.inf@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">Response SLA</span>
                <span className="text-sm font-semibold text-white">Under 24 hours guaranteed</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-[#923FFF]" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">Availability</span>
                <span className="text-sm font-semibold text-white">Worldwide / Remote Consulting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-white/10 shadow-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Thank you for reaching out, {name}. I will review your project requirements and get back to you within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-zinc-300 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold text-white mb-2">Send a Message</h2>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Service Category
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF] cursor-pointer"
                    >
                      <option value="High-Performance Web & 3D Site">High-Performance Web & 3D Site</option>
                      <option value="SEO & Organic Search Domination">SEO & Organic Search Domination</option>
                      <option value="Full-Funnel Digital Marketing">Full-Funnel Digital Marketing</option>
                      <option value="Conversion Rate Optimization (CRO)">Conversion Rate Optimization (CRO)</option>
                      <option value="Custom Platform / Enterprise Web App">Custom Platform / Enterprise Web App</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Approximate Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF] cursor-pointer"
                    >
                      <option value="$99 (SEO Sprint)">$99 (SEO Sprint)</option>
                      <option value="$199 (Popular)">$199 (Web & 3D Site - Popular)</option>
                      <option value="$299 (Full Growth Engine)">$299 (Full Growth Engine)</option>
                      <option value="$500+ (Custom Scope)">$500+ (Custom Scope)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Message / Project Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your business, current marketing challenges, or goals..."
                    className="w-full p-4 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 disabled:opacity-50 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Official Social Media Channels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7DBFFF]">
                Connect With AKTERUZZAMAN
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Official Social Media Channels
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              Follow for daily digital marketing experiments, full-stack web development tips, 3D design explorations, and client project breakdowns.
            </p>
          </div>

          <SocialLinks variant="grid" />
        </div>
      </div>
    </div>
  );
}
