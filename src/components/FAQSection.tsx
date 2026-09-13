import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Calendar,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQ_DATA } from '../data/faqData';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface FAQSectionProps {
  limit?: number;
  showCategories?: boolean;
}

export default function FAQSection({ limit = 6, showCategories = true }: FAQSectionProps) {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: language === 'bn' ? 'সব প্রশ্নোত্তর' : 'All FAQs' },
    { id: 'general', label: language === 'bn' ? 'সাধারণ' : 'General' },
    { id: 'pricing', label: language === 'bn' ? 'মূল্য ও পেমেন্ট' : 'Pricing & Payment' },
    { id: 'marketing', label: language === 'bn' ? 'ডিজিটাল মার্কেটিং' : 'Digital Marketing' },
    { id: 'development', label: language === 'bn' ? 'ওয়েব ডেভেলপমেন্ট' : 'Web Dev & 3D' },
    { id: 'process', label: language === 'bn' ? 'প্রজেক্ট ডেলিভারি' : 'Process & Delivery' },
  ];

  const displayedFaqs = FAQ_DATA.filter((faq) => {
    if (selectedCategory === 'all') return true;
    return faq.category === selectedCategory;
  }).slice(0, limit);

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Ambient Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#923FFF]/10 via-[#583FFF]/8 to-[#7DBFFF]/10 rounded-full blur-[140px] -z-10"
      />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? (
              <>
                আপনার সমস্ত প্রশ্নের{' '}
                <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                  স্বচ্ছ ও স্পষ্ট উত্তর
                </span>
              </>
            ) : (
              <>
                Got Questions?{' '}
                <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                  We Have Clear Answers.
                </span>
              </>
            )}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            {language === 'bn'
              ? 'সার্ভিস, মূল্য তালিকা, পেমেন্ট মাধ্যম, কাজের সময়সীমা ও ডেলিভারি সংক্রান্ত প্রয়োজনীয় সব তথ্যের বিস্তারিত।'
              : 'Everything you need to know about partnering with Akteruzzaman—from pricing structures to delivery timelines.'}
          </p>
        </div>

        {/* Category Filters */}
        {showCategories && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`faq-cat-filter-${cat.id}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-brand text-white shadow-md shadow-[#923FFF]/30 scale-105'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Accordion List */}
        <div className="space-y-3.5">
          {displayedFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-zinc-900/90 border-[#923FFF]/40 shadow-xl shadow-[#923FFF]/10'
                    : 'bg-zinc-950/60 hover:bg-zinc-900/50 border-white/10'
                }`}
              >
                <button
                  id={`faq-accordion-toggle-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? 'text-white' : 'text-zinc-200 hover:text-white'
                  }`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[var(--color-primary)] text-black rotate-180'
                        : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* View All FAQs and Direct Support Box */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-zinc-950/80 border border-white/10">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold text-[#7DBFFF] block">
              {language === 'bn' ? 'আরও নির্দিষ্ট তথ্য জানতে চান?' : 'Still have an unanswered question?'}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
              {language === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপে কথা বলুন বা ডেডিকেটেড FAQ পেজ দেখুন' : 'Chat with Akteruzzaman on WhatsApp or explore full FAQ archive'}
            </h4>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              id="faq-section-view-all-btn"
              to="/faq"
              className="px-5 py-2.5 rounded-full text-xs font-bold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>{language === 'bn' ? 'সম্পূর্ণ FAQ পেজ' : 'Full FAQ Page'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7DBFFF]" />
            </Link>

            <a
              id="faq-section-whatsapp-btn"
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে জিজ্ঞেস করুন' : 'Ask on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
