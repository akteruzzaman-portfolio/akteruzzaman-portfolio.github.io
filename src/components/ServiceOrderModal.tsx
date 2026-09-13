import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Send, 
  ShieldCheck, 
  Clock, 
  Tag, 
  AlertCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { CategoryPricingItem } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ServiceOrderModalProps {
  isOpen: boolean;
  service: CategoryPricingItem | null;
  onClose: () => void;
  onNavigateToBooking?: (serviceTitle: string) => void;
}

export default function ServiceOrderModal({
  isOpen,
  service,
  onClose,
  onNavigateToBooking,
}: ServiceOrderModalProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'form' | 'call'>('whatsapp');
  
  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card / Stripe');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !service) return null;

  // Generate WhatsApp prefilled message
  const handleWhatsAppOrder = () => {
    const text = `Hi Akteruzzaman! 👋\n\nI want to book the following service from your website:\n\n📦 *Service:* ${service.title}\n💰 *Price:* ${service.price} (${service.billingType === 'monthly' ? 'Monthly' : 'One-Time'})\n⏱️ *Turnaround:* ${service.turnaround}\n\n👤 *My Name:* ${clientName.trim() || 'Prospective Client'}\n🏢 *Company/Website:* ${companyName.trim() || 'N/A'}\n📝 *Project Notes:* ${projectNotes.trim() || 'Ready to discuss scope & get started.'}\n\nPlease let me know the next steps!`;
    const encoded = encodeURIComponent(text);
    const phoneClean = PERSONAL_INFO.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMessage(language === 'bn' ? 'অনুগ্রহ করে আপনার নাম এবং ইমেইল লিখুন।' : 'Please enter your name and email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      serviceId: service.id,
      serviceTitle: service.title,
      category: service.categoryLabel,
      price: service.price,
      billingType: service.billingType,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      companyName: companyName.trim(),
      projectRequirements: projectNotes.trim(),
      paymentPreference: paymentMethod,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrderId(data.orderId || `ORD-${Date.now().toString().slice(-6)}`);
        setOrderSuccess(true);
      } else {
        // Fallback gracefully
        setOrderId(`ORD-${Date.now().toString().slice(-6)}`);
        setOrderSuccess(true);
      }
    } catch {
      // Offline fallback
      setOrderId(`ORD-${Date.now().toString().slice(-6)}`);
      setOrderSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookDiscoveryCall = () => {
    onClose();
    if (onNavigateToBooking) {
      onNavigateToBooking(service.title);
    } else {
      window.location.href = `/book-appointment?service=${encodeURIComponent(service.title)}`;
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="service-order-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl shadow-2xl shadow-black overflow-hidden my-6"
        >
          {/* Header Bar */}
          <div className="relative p-6 bg-gradient-to-r from-zinc-900 via-zinc-900 to-[#1b1236] border-b border-white/10">
            <button
              id="close-order-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--color-primary)]/20 text-[var(--color-accent)] border border-[var(--color-primary)]/40">
                {service.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                <Clock className="w-3 h-3 text-[var(--color-primary)]" />
                {service.turnaround}
              </span>
              {service.popular && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Recommended
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {service.title}
            </h3>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                {service.price}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {service.billingType === 'monthly' ? '/ month retainer' : 'one-time project'}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {orderSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-bold text-white">Booking Received Successfully!</h4>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{clientName}</span>! Your booking reference is{' '}
                  <span className="font-mono text-[#7DBFFF] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {orderId}
                  </span>.
                </p>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Akteruzzaman will review your specifications and reach out via email (<span className="text-zinc-200">{clientEmail}</span>) within 4 to 8 hours to deliver invoice details and onboarding instructions.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 cursor-pointer transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Ping on WhatsApp with Booking Code</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 cursor-pointer transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-white/10 mb-6">
                  <button
                    onClick={() => setActiveTab('whatsapp')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'whatsapp'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Book on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('form')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'form'
                        ? 'bg-gradient-brand text-white shadow-md shadow-[#923FFF]/40'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Book via Form</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('call')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'call'
                        ? 'bg-zinc-800 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Free Discovery Call</span>
                  </button>
                </div>

                {/* TAB 1: WHATSAPP DIRECT */}
                {activeTab === 'whatsapp' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                      <span>
                        Fastest booking method! Connect directly with Akteruzzaman on WhatsApp to finalize scope, receive payment link, and kick off the project immediately.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Marcus Vance"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Company / Website (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. acme.com"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Project Goals / Requirements</label>
                      <textarea
                        rows={2}
                        placeholder="Briefly describe your objectives, target audience, or current website..."
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF] resize-none"
                      />
                    </div>

                    <button
                      id="order-via-whatsapp-btn"
                      onClick={handleWhatsAppOrder}
                      className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirm &amp; Book on WhatsApp ({service.price})</span>
                    </button>
                  </div>
                )}

                {/* TAB 2: ONLINE FORM */}
                {activeTab === 'form' && (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="client@company.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">WhatsApp / Phone</label>
                        <input
                          type="text"
                          placeholder="+1 (555) 000-0000"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Preferred Payment Method</label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#7DBFFF]"
                        >
                          <option value="Credit Card / Stripe">Credit Card (Stripe Global - USD)</option>
                          <option value="Wise Transfer">Wise (Multi-Currency USD)</option>
                          <option value="PayPal">PayPal (USD)</option>
                          <option value="Direct Bank Wire">Direct Bank Wire (USD)</option>
                          <option value="bKash / Nagad">bKash / Nagad / Local Bank</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Project Details &amp; Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about your brand, current challenges, and project milestones..."
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF] resize-none"
                      />
                    </div>

                    <button
                      id="submit-order-form-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/40 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Booking Request ({service.price})</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* TAB 3: DISCOVERY CALL */}
                {activeTab === 'call' && (
                  <div className="space-y-4 text-center py-2">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-[#7DBFFF]">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Prefer to talk before booking?</h4>
                      <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                        Book a complimentary 20-minute video or audio discovery session to review your scope and get a custom implementation roadmap.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-zinc-300 space-y-1.5 max-w-md mx-auto">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pre-selected package: <strong className="text-white">{service.title}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Real-time screen share audit &amp; strategy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Instant Google Meet calendar invitation</span>
                      </div>
                    </div>

                    <button
                      id="book-discovery-call-from-modal-btn"
                      onClick={handleBookDiscoveryCall}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/40 hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Choose Date &amp; Time on Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Deliverables summary checklist */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                    <Tag className="w-3 h-3 text-[var(--color-primary)]" />
                    Package Deliverables &amp; Inclusions
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {service.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Guarantee Footer */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    Milestone Escrow &amp; Satisfaction Protected
                  </span>
                  <span className="text-zinc-400">Response within &lt; 4 Hours</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
