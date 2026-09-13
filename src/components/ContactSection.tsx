import { useState, useEffect, FormEvent } from 'react';
import {
  Send,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  Copy,
  Sparkles,
  ArrowUpRight,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import SocialLinks from './SocialLinks';

interface ContactSectionProps {
  initialSubject?: string;
}

export default function ContactSection({ initialSubject = '' }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialSubject || 'Digital Marketing & Web Development',
    budget: '$199 (High-Performance Web & 3D)',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({
        ...prev,
        service: initialSubject,
        // Auto-select corresponding budget if plan matches
        budget: initialSubject.toLowerCase().includes('99') && !initialSubject.toLowerCase().includes('199') && !initialSubject.toLowerCase().includes('299')
          ? '$99 (SEO & Growth Sprint)'
          : initialSubject.toLowerCase().includes('199')
          ? '$199 (High-Performance Web & 3D Site)'
          : initialSubject.toLowerCase().includes('299')
          ? '$299 (Full Growth Engine & Custom Platform)'
          : prev.budget,
      }));
    }
  }, [initialSubject]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
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
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      {/* Dynamic Background Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1000px] h-[650px] bg-gradient-to-tr from-[#923FFF]/15 via-[#583FFF]/12 to-[#7DBFFF]/10 rounded-full blur-[160px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#583FFF]/10 rounded-full blur-[130px] -z-10"
      />

      <div className="max-w-6xl mx-auto w-full">
        {/* Large Gradient Headline */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start a Conversation</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.12]"
          >
            <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent inline-block">
              Let’s Build Something Great Together.
            </span>
          </motion.h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Have an upcoming project, want to scale your organic search rankings, or need an immersive
            high-converting web experience? Send a message directly below.
          </p>
        </div>

        {/* Form & Direct Contact Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info & Social Links with Glowing Hover States */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#7DBFFF]" />
                <span>Direct Channels</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Whether you prefer email, LinkedIn, or scheduling a sprint, I generally respond within 12 hours.
              </p>

              {/* Direct WhatsApp Chat Card */}
              <a
                id="contact-whatsapp-direct-link"
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-emerald-900/30 to-teal-950/40 hover:from-emerald-900/70 hover:to-teal-900/50 border border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 text-white group cursor-pointer shadow-lg shadow-emerald-950/40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#25D366] to-[#128C7E] flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-950/60 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-400 block font-medium">Instant Response</span>
                    <span className="text-xs sm:text-sm font-bold text-white block">WhatsApp: {PERSONAL_INFO.whatsapp}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Direct Email Card with 1-click Copy */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-[#923FFF]/50 transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-md shadow-[#923FFF]/30">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] text-zinc-400 block">Direct Email</span>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-[#7DBFFF] transition-colors truncate block"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <button
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer shrink-0"
                  >
                    {copiedEmail ? (
                      <CheckCircle2 className="w-4 h-4 text-[#7DBFFF]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {copiedEmail && (
                  <span className="text-[11px] text-[#7DBFFF] font-mono mt-2 block font-medium">
                    ✓ Email copied to clipboard!
                  </span>
                )}
              </div>

              {/* Response Time Guarantee */}
              <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1">
                <Clock className="w-4 h-4 text-[#7DBFFF] shrink-0" />
                <span>Average response time: within 12 hours</span>
              </div>

              {/* Official Social Media Channels */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Official Social Channels
                  </p>
                  <span className="text-[10px] font-mono text-[#7DBFFF]">6 Platforms</span>
                </div>

                <SocialLinks variant="icons-bar" className="justify-start gap-2.5" />
              </div>
            </div>
          </div>

          {/* Right Side: Glassmorphic Contact Form with Floating Labels */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-brand shadow-2xl shadow-black/90">
              <div className="bg-zinc-950/90 backdrop-blur-2xl rounded-[23px] p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 text-center space-y-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center mx-auto shadow-xl shadow-[#923FFF]/40">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        Message Dispatched Successfully!
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out, <span className="text-[#7DBFFF] font-semibold">{formData.name}</span>.
                        Akteruzzaman will review your project brief and get back to you promptly at{' '}
                        <span className="text-white font-medium">{formData.email}</span>.
                      </p>
                      <button
                        id="send-another-msg-btn"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            service: 'Digital Marketing & Web Development',
                            budget: '$3k - $5k',
                            message: '',
                          });
                        }}
                        className="px-6 py-2.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        Send Another Note
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {errorMessage && (
                        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                          {errorMessage}
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Floating Label: Full Name */}
                        <div className="relative">
                          <input
                            type="text"
                            id="floating-name"
                            required
                            placeholder=" "
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="peer w-full px-4 pt-6 pb-2 bg-zinc-900/60 rounded-2xl border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#923FFF] focus:ring-1 focus:ring-[#923FFF] text-sm transition-all"
                          />
                          <label
                            htmlFor="floating-name"
                            className="absolute left-4 top-2 text-[11px] font-medium text-zinc-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#7DBFFF] pointer-events-none"
                          >
                            Your Full Name *
                          </label>
                        </div>

                        {/* Floating Label: Email */}
                        <div className="relative">
                          <input
                            type="email"
                            id="floating-email"
                            required
                            placeholder=" "
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="peer w-full px-4 pt-6 pb-2 bg-zinc-900/60 rounded-2xl border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#923FFF] focus:ring-1 focus:ring-[#923FFF] text-sm transition-all"
                          />
                          <label
                            htmlFor="floating-email"
                            className="absolute left-4 top-2 text-[11px] font-medium text-zinc-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-[#7DBFFF] pointer-events-none"
                          >
                            Email Address *
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Service Selection */}
                        <div className="relative">
                          <select
                            id="contact-service-select"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-4 pt-6 pb-2 bg-zinc-900/60 rounded-2xl border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF] focus:ring-1 focus:ring-[#923FFF] transition-all appearance-none cursor-pointer"
                          >
                            {/* Dynamically display pre-filled plan or project title if selected */}
                            {formData.service && ![
                              "SEO Strategy & Organic Growth",
                              "Digital Marketing & Full-Funnel Growth",
                              "Modern React Web Development",
                              "3D Websites & Immersive UI",
                              "High-Converting Landing Pages",
                              "Analytics & Conversion Optimization",
                              "AI-Powered Web Solutions",
                              "Custom Project Consultation"
                            ].includes(formData.service) && (
                              <option value={formData.service}>{formData.service}</option>
                            )}
                            <option value="SEO Strategy & Organic Growth">SEO Strategy & Organic Growth ($99 Plan)</option>
                            <option value="Digital Marketing & Full-Funnel Growth">Digital Marketing & Full-Funnel Growth</option>
                            <option value="Modern React Web Development">Modern React Web Development ($199 Plan)</option>
                            <option value="3D Websites & Immersive UI">3D Websites & Immersive UI ($199 Plan)</option>
                            <option value="Full Growth Engine & Custom Platform">Full Growth Engine & Platform ($299 Plan)</option>
                            <option value="High-Converting Landing Pages">High-Converting Landing Pages</option>
                            <option value="Analytics & Conversion Optimization">Analytics & Conversion Optimization</option>
                            <option value="AI-Powered Web Solutions">AI-Powered Web Solutions</option>
                            <option value="Custom Project Consultation">Custom Project Consultation</option>
                          </select>
                          <label
                            htmlFor="contact-service-select"
                            className="absolute left-4 top-2 text-[11px] font-medium text-zinc-400 pointer-events-none"
                          >
                            Project Focus Area
                          </label>
                        </div>

                        {/* Budget Range */}
                        <div className="relative">
                          <select
                            id="contact-budget-select"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full px-4 pt-6 pb-2 bg-zinc-900/60 rounded-2xl border border-white/10 text-white text-sm focus:outline-none focus:border-[#923FFF] focus:ring-1 focus:ring-[#923FFF] transition-all appearance-none cursor-pointer"
                          >
                            <option value="$99 (SEO & Growth Sprint)">$99 (SEO & Growth Sprint)</option>
                            <option value="$199 (High-Performance Web & 3D Site)">$199 (High-Performance Web & 3D Site)</option>
                            <option value="$299 (Full Growth Engine & Custom Platform)">$299 (Full Growth Engine & Custom Platform)</option>
                            <option value="$300 - $1,000 (Multi-Sprint / Monthly Retainer)">$300 - $1,000 (Multi-Sprint / Retainer)</option>
                            <option value="Custom / Enterprise Solution">Custom / Enterprise Solution</option>
                          </select>
                          <label
                            htmlFor="contact-budget-select"
                            className="absolute left-4 top-2 text-[11px] font-medium text-zinc-400 pointer-events-none"
                          >
                            Target Investment Range
                          </label>
                        </div>
                      </div>

                      {/* Floating Label: Message */}
                      <div className="relative">
                        <textarea
                          id="floating-message"
                          required
                          rows={4}
                          placeholder=" "
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="peer w-full px-4 pt-6 pb-3 bg-zinc-900/60 rounded-2xl border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#923FFF] focus:ring-1 focus:ring-[#923FFF] text-sm transition-all resize-none"
                        ></textarea>
                        <label
                          htmlFor="floating-message"
                          className="absolute left-4 top-2 text-[11px] font-medium text-zinc-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-[#7DBFFF] pointer-events-none"
                        >
                          Project Details & Goals *
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        id="contact-submit-btn"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-full font-bold text-base text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/40 hover:shadow-[#923FFF]/70 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Dispatching Brief...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#7DBFFF]" />
                            <span>Send Project Proposal</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
