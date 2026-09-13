import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  X, 
  HelpCircle, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileQuestion,
  MessageSquare
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PricingSection from '../components/PricingSection';
import ProjectCalculatorSection from '../components/ProjectCalculatorSection';
import { FAQ_DATA } from '../data/faqData';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function PricingPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pricingFaqs = FAQ_DATA.filter((f) => f.category === 'pricing' || f.category === 'process').slice(0, 5);

  const comparisonFeatures = [
    { name: 'Comprehensive SEO & Technical Audit', tier1: true, tier2: true, tier3: true },
    { name: 'Keyword Gap Analysis & Competitor Intel', tier1: true, tier2: true, tier3: true },
    { name: 'Paid Ads Management', tier1: '1 Channel', tier2: '2 Channels (Meta+Google)', tier3: 'Omnichannel (4+)' },
    { name: 'High-Converting Landing Page Build', tier1: false, tier2: 'Included', tier3: 'Unlimited Pages' },
    { name: 'Custom React & TypeScript Web App', tier1: false, tier2: 'Add-on', tier3: 'Included Full-Stack' },
    { name: 'Interactive 3D WebGL / Three.js Visuals', tier1: false, tier2: false, tier3: 'Included' },
    { name: 'AI Chatbot & Workflow Automation', tier1: false, tier2: 'Basic Setup', tier3: 'Full Custom Engine' },
    { name: 'Server-Side GA4 & Meta CAPI Setup', tier1: 'Basic GA4', tier2: 'Full Server CAPI', tier3: 'Custom Data Warehouse' },
    { name: 'Core Web Vitals 95+ Guarantee', tier1: true, tier2: true, tier3: true },
    { name: 'Dedicated Strategy Reviews', tier1: 'Monthly', tier2: 'Bi-Weekly Sprints', tier3: 'Weekly VIP Syncs' },
    { name: 'Direct WhatsApp Support', tier1: 'Standard', tier2: 'Priority <4h', tier3: 'VIP Immediate' },
  ];

  return (
    <div id="pricing-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Tag & Intro */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#923FFF]/15 border border-[#923FFF]/30 text-[#7DBFFF] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'স্বচ্ছ বিনিয়োগ কাঠামো' : 'Transparent Investment'}</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading"
        >
          {language === 'bn' ? (
            <>
              পরিমাপযোগ্য বৃদ্ধির জন্য{' '}
              <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                নির্দিষ্ট ও স্বচ্ছ মূল্য
              </span>
            </>
          ) : (
            <>
              Predictable Pricing for{' '}
              <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                Measurable Growth
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
            ? 'কোনো অপ্রকাশ্য চার্জ নেই। আমাদের ক্যাটাগরি ভিত্তিক সেবাগুলো ব্রাউজ করুন, প্যাকেজ নির্বাচন করুন অথবা সরাসরি অর্ডার প্লেস করুন।'
            : 'No hidden fees or bloated contracts. Browse individual services, compare all-in-one growth packages, or submit an instant order.'}
        </motion.p>
      </div>

      {/* Pricing Cards Component (with Category Tabs & Ordering Modal) */}
      <div className="-mt-10 mb-20">
        <PricingSection
          onSelectPlan={(planTitle) => {
            navigate(`/book-appointment?plan=${encodeURIComponent(planTitle)}`);
          }}
        />
      </div>

      {/* Feature Comparison Matrix */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Growth Packages Comparison Matrix</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Compare deliverables and technical specifications side-by-side across our 3 core growth tiers.</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-zinc-900/90">
                <th className="p-4 sm:p-5 text-sm font-semibold text-white">Features &amp; Deliverables</th>
                <th className="p-4 sm:p-5 text-sm font-semibold text-zinc-300 text-center">
                  Starter Growth
                  <span className="block text-xs font-mono text-[#7DBFFF] font-normal">$299 / mo</span>
                </th>
                <th className="p-4 sm:p-5 text-sm font-semibold text-white text-center bg-[#923FFF]/15 border-x border-[#923FFF]/30">
                  Growth Accelerator
                  <span className="block text-xs font-mono text-emerald-400 font-bold">$699 / mo (Popular)</span>
                </th>
                <th className="p-4 sm:p-5 text-sm font-semibold text-zinc-300 text-center">
                  Scale &amp; Enterprise
                  <span className="block text-xs font-mono text-[#7DBFFF] font-normal">$1,499 / mo</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-zinc-300">{row.name}</td>
                  <td className="p-4 sm:p-5 text-center text-zinc-400">
                    {typeof row.tier1 === 'boolean' ? (
                      row.tier1 ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-zinc-600 mx-auto" />
                      )
                    ) : (
                      row.tier1
                    )}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-white font-medium bg-[#923FFF]/5 border-x border-[#923FFF]/20">
                    {typeof row.tier2 === 'boolean' ? (
                      row.tier2 ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-zinc-600 mx-auto" />
                      )
                    ) : (
                      row.tier2
                    )}
                  </td>
                  <td className="p-4 sm:p-5 text-center text-zinc-300 font-semibold">
                    {typeof row.tier3 === 'boolean' ? (
                      row.tier3 ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-zinc-600 mx-auto" />
                      )
                    ) : (
                      row.tier3
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Scope & Price Calculator (Backend Powered) */}
      <ProjectCalculatorSection />

      {/* Frequently Asked Questions Preview with link to /faq */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#7DBFFF] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pricing FAQs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Got questions regarding billing milestones, currencies, or contracts?
          </p>
        </div>

        <div className="space-y-3.5 mb-8">
          {pricingFaqs.map((faq, idx) => (
            <div
              key={faq.id}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden transition-all"
            >
              <button
                id={`pricing-faq-toggle-${idx}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-white text-sm sm:text-base cursor-pointer hover:text-[#7DBFFF] transition-colors"
              >
                <span>{faq.question}</span>
                <span className="text-xl font-mono text-[#7DBFFF] flex-shrink-0">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            id="pricing-full-faq-link-btn"
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <FileQuestion className="w-4 h-4 text-[#7DBFFF]" />
            <span>View Complete Knowledge Base &amp; FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-950 via-[#1a122d] to-zinc-950 border border-white/15 text-center shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to Accelerate Your Online Growth?</h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
          Schedule a direct 1-on-1 strategy consultation or message on WhatsApp to begin your project sprint with Akteruzzaman.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-950/60 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/40 hover:scale-105 transition-transform"
          >
            <Calendar className="w-4 h-4 text-[#7DBFFF]" />
            <span>Book Appointment on Calendar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
