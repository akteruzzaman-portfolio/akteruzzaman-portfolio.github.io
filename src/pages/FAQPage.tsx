import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  DollarSign, 
  Code, 
  TrendingUp, 
  Layers, 
  FileQuestion,
  X,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQ_DATA } from '../data/faqData';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function FAQPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: language === 'bn' ? 'সকল প্রশ্নোত্তর' : 'All FAQs', icon: Layers },
    { id: 'general', label: language === 'bn' ? 'সাধারণ তথ্য' : 'General & Background', icon: Sparkles },
    { id: 'pricing', label: language === 'bn' ? 'মূল্য ও পেমেন্ট' : 'Pricing & Payment', icon: DollarSign },
    { id: 'marketing', label: language === 'bn' ? 'ডিজিটাল মার্কেটিং ও এসইও' : 'Digital Marketing & SEO', icon: TrendingUp },
    { id: 'development', label: language === 'bn' ? 'ওয়েব ডিজাইন ও ৩ডি' : 'Web Design & 3D', icon: Code },
    { id: 'process', label: language === 'bn' ? 'কাজের প্রক্রিয়া ও ডেলিভারি' : 'Process & Delivery', icon: ShieldCheck },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="faq-page" className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Tag & Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#923FFF]/15 border border-[#923FFF]/30 text-[#7DBFFF] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'জ্ঞানকেন্দ্র ও প্রশ্নোত্তর' : 'Knowledge Base & FAQs'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading"
        >
          {language === 'bn' ? (
            <>
              সচরাচর জিজ্ঞাসিত{' '}
              <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                প্রশ্নোত্তর
              </span>
            </>
          ) : (
            <>
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                Questions
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto"
        >
          {language === 'bn'
            ? 'সার্ভিসসমূহ, বাজার অনুযায়ী মূল্য তালিকা, পেমেন্ট মাধ্যম, কাজের সময়সীমা ও ডেলিভারি সংক্রান্ত প্রয়োজনীয় সব তথ্যের বিস্তারিত উত্তর।'
            : 'Clear, transparent answers to every question regarding our digital marketing services, custom web development, pricing tiers, and delivery framework.'}
        </motion.p>

        {/* Live Search Filter */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'প্রশ্ন বা বিষয় খুঁজুন (যেমন: SEO, মূল্য, সময়)...' : 'Search questions or keywords (e.g. SEO, pricing, timeline)...'}
            className="w-full pl-12 pr-10 py-3.5 rounded-full bg-zinc-900/90 border border-white/15 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF] shadow-xl shadow-black/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count =
            cat.id === 'all'
              ? FAQ_DATA.length
              : FAQ_DATA.filter((f) => f.category === cat.id).length;

          return (
            <button
              key={cat.id}
              id={`faq-page-cat-${cat.id}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/40 scale-[1.02] border border-white/20'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              <Icon className="w-4 h-4 text-[#7DBFFF]" />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-zinc-900/40 border border-white/10 max-w-md mx-auto">
            <FileQuestion className="w-12 h-12 text-zinc-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching questions</h3>
            <p className="text-xs text-zinc-400 mb-4">
              We couldn't find any questions matching "{searchQuery}". Try a different keyword or contact us directly.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-zinc-900/90 border-[#923FFF]/40 shadow-xl shadow-[#923FFF]/10'
                    : 'bg-zinc-950/70 hover:bg-zinc-900/50 border-white/10'
                }`}
              >
                <button
                  id={`faq-item-toggle-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#7DBFFF] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className={`text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? 'text-white' : 'text-zinc-200 hover:text-white'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

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
                      <div className="px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-white/5 ml-9">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Still Have Questions? Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-[#1e1438] border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Instant Direct Support
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {language === 'bn' ? 'আপনার কি নির্দিষ্ট কোনো প্রজেক্ট আলোচনা করার আছে?' : 'Didn’t find what you’re looking for?'}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg leading-relaxed">
            {language === 'bn'
              ? 'আকতারুজ্জামান-এর সাথে সরাসরি হোয়াটসঅ্যাপে কথা বলুন অথবা একটি ফ্রি ২০ মিনিটের স্ট্র্যাটেজি কনসালটেশন শিডিউল করুন।'
              : 'Message Akteruzzaman directly on WhatsApp or book a free 20-minute video discovery call to discuss your exact project goals.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            id="faq-page-whatsapp-cta-btn"
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-950/60 transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            id="faq-page-book-call-btn"
            to="/book-appointment"
            className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/40 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book 1-on-1 Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
