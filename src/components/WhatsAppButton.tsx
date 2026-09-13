import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCheck, Sparkles, MessageCircle, ChevronUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [customMsg, setCustomMsg] = useState('Hi AKTERUZZAMAN, I visited your portfolio and would like to discuss a project!');

  const cleanPhone = '8801736683282';
  const displayPhone = '+880 1736683282';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 260) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleOpenWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMsg || 'Hi AKTERUZZAMAN, I visited your portfolio!')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <aside
      aria-label="WhatsApp Contact Widget"
      id="whatsapp-widget-container"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end"
    >
      {/* Quick Chat Popover (Positioned on the Right) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="whatsapp-chat-card"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="mb-3 w-80 sm:w-88 rounded-2xl bg-[#0a1814]/98 border border-[#25D366]/60 shadow-2xl shadow-[#25D366]/20 backdrop-blur-2xl overflow-hidden text-left z-50 origin-bottom-right"
          >
            {/* Bright WhatsApp Header */}
            <div className="bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#128C7E] p-4 text-white flex items-center justify-between border-b border-[#25D366]/40 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden bg-black/40 shadow-md">
                    <img
                      src={PERSONAL_INFO.avatarImage}
                      alt={PERSONAL_INFO.name}
                      className="w-full h-full object-cover object-[center_20%]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-lime-300 border-2 border-[#128C7E] rounded-full animate-pulse shadow-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight text-white leading-tight drop-shadow-sm">
                    {PERSONAL_INFO.name}
                  </h4>
                  <p className="text-[11px] text-white/95 flex items-center gap-1 font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-300" />
                    {displayPhone}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/90 hover:text-white hover:bg-black/25 transition-colors cursor-pointer"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Deep Body */}
            <div className="p-4 bg-[#051A16]/95 border-b border-white/5 space-y-3">
              <div className="bg-[#082923]/95 rounded-2xl rounded-tl-none p-3.5 text-xs text-zinc-100 border border-[#0D7364]/40 shadow-inner">
                <p className="font-semibold text-white mb-1">
                  আসসালামু আলাইকুম! 👋
                </p>
                <p className="text-emerald-100/90 text-[12px] leading-relaxed">
                  Looking for SEO dominance, a high-converting landing page, or a bespoke modern 3D website? Message me directly on WhatsApp!
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-emerald-300/80">
                  <span>Replies in 5 mins</span>
                  <CheckCheck className="w-3 h-3 text-emerald-400" />
                </div>
              </div>

              {/* Message Input / Presets */}
              <form onSubmit={handleOpenWhatsApp} className="space-y-2">
                <label className="block text-[11px] text-emerald-200/80 font-medium">
                  Your message to AKTERUZZAMAN:
                </label>
                <textarea
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  rows={2}
                  className="w-full text-xs bg-[#020F0C] border border-[#0D7364]/50 rounded-xl p-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E] resize-none"
                  placeholder="Type your message..."
                />

                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCustomMsg('Hi Akteruzzaman, I want to book a project consultation.')}
                    className="text-[10px] px-2 py-1 rounded-md bg-[#09332B] hover:bg-[#0E493E] text-emerald-100 border border-[#0D7364]/40 transition-colors cursor-pointer"
                  >
                    🚀 Book Consultation
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomMsg('Hi Akteruzzaman, could you share your service pricing details?')}
                    className="text-[10px] px-2 py-1 rounded-md bg-[#09332B] hover:bg-[#0E493E] text-emerald-100 border border-[#0D7364]/40 transition-colors cursor-pointer"
                  >
                    💰 Pricing Query
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomMsg('Hi Akteruzzaman, আমি আপনার সাথে প্রজেক্ট নিয়ে বাংলায় কথা বলতে চাই।')}
                    className="text-[10px] px-2 py-1 rounded-md bg-[#0A3D34] hover:bg-[#0D5246] text-emerald-200 border border-emerald-500/40 transition-colors cursor-pointer"
                  >
                    🇧🇩 বাংলায় কথা বলুন
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] via-[#20bd5a] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0e7568] text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all cursor-pointer active:scale-98 border border-white/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start Chat on WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Bottom info */}
            <div className="px-4 py-2 bg-[#05110d] flex items-center justify-between text-[10px] text-zinc-300">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Quick 5-min response
              </span>
              <span className="text-zinc-400">Fast & Confidential</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Icon placed directly above WhatsApp chat button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mb-3 relative group flex items-center justify-end"
          >
            {/* Tooltip on hover */}
            <span className="pointer-events-none absolute right-full mr-2.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-white bg-zinc-900/95 border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Back to Top
            </span>

            {/* Glowing ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-[var(--color-primary)]/40 blur-sm group-hover:bg-[var(--color-primary)]/70 transition-all duration-300 opacity-70"
            />

            <motion.button
              type="button"
              id="back-to-top-btn"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to Top"
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-950/90 text-white border border-white/20 hover:border-[var(--color-primary)] shadow-xl shadow-black/70 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-glow)] stroke-[2.5]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button (Positioned Bottom-Right) with Bright WhatsApp Green */}
      <div className="relative group">
        {/* Bright pulsing ring aura */}
        <div
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full bg-[#25D366]/70 blur-md group-hover:bg-[#25D366]/90 transition-all duration-500 animate-pulse"
        />

        <motion.button
          type="button"
          id="whatsapp-floating-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open WhatsApp Chat"
          className="relative flex items-center gap-2.5 px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-[#25D366] via-[#20bd5a] to-[#128C7E] text-zinc-950 shadow-2xl shadow-[#25D366]/60 hover:shadow-[#25D366]/80 border border-white/30 cursor-pointer"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-6 h-6 fill-current text-white flex-shrink-0 drop-shadow-sm"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>

          {/* Desktop label */}
          <div className="hidden sm:flex flex-col items-start leading-none pr-1 text-left">
            <span className="text-[10px] text-zinc-900 font-semibold tracking-wide uppercase">
              Quick Chat
            </span>
            <span className="text-xs font-black text-black">
              WhatsApp
            </span>
          </div>

          {/* Online badge */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-sm" />
          </span>
        </motion.button>
      </div>
    </aside>
  );
}
