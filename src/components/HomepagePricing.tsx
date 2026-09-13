import React, { useState } from 'react';
import { 
  TrendingUp, 
  Globe, 
  Bot, 
  Package, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORY_PRICING_SERVICES } from '../data/pricingData';
import ServiceOrderModal from './ServiceOrderModal';
import { CategoryPricingItem } from '../types';

interface HomepagePricingProps {
  onSelectPlan?: (planName: string) => void;
}

interface CategoryOverview {
  id: string;
  categoryKey: string;
  title: string;
  titleBn: string;
  badge: string;
  startingPrice: string;
  billingUnit: string;
  numericPrice: number;
  icon: React.ElementType;
  description: string;
  descriptionBn: string;
  includedServices: string[];
  sampleServiceId: string;
  popular?: boolean;
}

const SERVICE_CATEGORIES: CategoryOverview[] = [
  {
    id: 'cat-marketing',
    categoryKey: 'marketing',
    title: 'Digital Marketing',
    titleBn: 'ডিজিটাল মার্কেটিং',
    badge: 'High ROI & Leads',
    startingPrice: '$149',
    billingUnit: '/ month',
    numericPrice: 149,
    icon: TrendingUp,
    description: 'Data-backed SEO audits, high-intent Meta & Google PPC ads, organic SMM, and automated lead nurturing funnels.',
    descriptionBn: 'ডাটা-ভিত্তিক এসইও, মেটা ও গুগল অ্যাডস, সোশ্যাল মিডিয়া মার্কেটিং এবং সেলস ফানেল অপ্টিমাইজেশন।',
    includedServices: [
      'Technical SEO audits & Google rankings',
      'Google & Meta Ads PPC management',
      'Social Media Marketing & Content',
      'Email flows & lead capture automation',
      'GA4 custom event & attribution tracking'
    ],
    sampleServiceId: 'mkt-seo',
    popular: true
  },
  {
    id: 'cat-development',
    categoryKey: 'development',
    title: 'Web Design & Development',
    titleBn: 'ওয়েব ডিজাইন ও ডেভেলপমেন্ট',
    badge: 'Core Web Vitals 95+',
    startingPrice: '$99',
    billingUnit: 'starts at',
    numericPrice: 99,
    icon: Globe,
    description: 'Sub-second landing pages, corporate business portals, custom React/TypeScript SPAs, and 3D kinetic WebGL experiences.',
    descriptionBn: 'দ্রুতগতির ল্যান্ডিং পেজ, কর্পোরেট ওয়েবসাইট, আধুনিক রিঅ্যাক্ট ওয়েব অ্যাপ এবং ইন্টারেক্টিভ থ্রি-ডি ডিজাইন।',
    includedServices: [
      'High-converting landing pages (from $149)',
      'Multi-page business websites (from $399)',
      'Custom React / TypeScript applications',
      'E-commerce stores with checkout gateways',
      'Continuous speed, backup & security upkeep'
    ],
    sampleServiceId: 'dev-landing',
    popular: false
  },
  {
    id: 'cat-automation',
    categoryKey: 'automation',
    title: 'AI & Business Automation',
    titleBn: 'এআই ও অটোমেশন',
    badge: 'Save 15+ Hours/Wk',
    startingPrice: '$199',
    billingUnit: 'starts at',
    numericPrice: 199,
    icon: Bot,
    description: 'Intelligent AI customer assistants trained on your knowledge base, cross-app Zapier/Make automations, and CRM pipelines.',
    descriptionBn: 'ব্যবসায়ের জন্য কাস্টম এআই চ্যাটবট, স্বয়ংক্রিয় ওয়ার্কফ্লো এবং সিআরএম পাইপলাইন ইন্টিগ্রেশন।',
    includedServices: [
      'AI content generation & SEO pipelines',
      'Custom GPT/Gemini customer service chatbots',
      'Zapier & Make.com workflow integrations',
      'CRM pipeline & lead deal stage routing',
      'Instant WhatsApp & SMS team notification hooks'
    ],
    sampleServiceId: 'ai-chatbot',
    popular: false
  },
  {
    id: 'cat-packages',
    categoryKey: 'packages',
    title: 'Growth Packages',
    titleBn: 'গ্রোথ প্যাকেজ',
    badge: 'All-In-One Solution',
    startingPrice: '$299',
    billingUnit: '/ month',
    numericPrice: 299,
    icon: Package,
    description: 'Complete digital transformation sprints combining dedicated SEO, managed paid ads, landing page CRO, and VIP support.',
    descriptionBn: 'অল-ইন-ওয়ান গ্রোথ সার্ভিস: ডেডিকেটেড এসইও, পেইড বিজ্ঞাপন, কনভার্সন অপটিমাইজেশন ও প্রায়োরিটি সাপোর্ট।',
    includedServices: [
      'Full-funnel SEO & continuous link building',
      'Multi-channel advertising (Meta & Google)',
      'Continuous conversion rate optimization (CRO)',
      'Dedicated bi-weekly strategy review meetings',
      'Direct WhatsApp VIP access & sprint support'
    ],
    sampleServiceId: 'bundle-growth',
    popular: true
  }
];

export default function HomepagePricing({ onSelectPlan }: HomepagePricingProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<CategoryPricingItem | null>(null);

  const handleBookCategory = (cat: CategoryOverview) => {
    const service = CATEGORY_PRICING_SERVICES.find(s => s.id === cat.sampleServiceId) 
      || CATEGORY_PRICING_SERVICES.find(s => s.category === cat.categoryKey)
      || CATEGORY_PRICING_SERVICES[0];

    setSelectedServiceForModal(service);
    setOrderModalOpen(true);
    if (onSelectPlan) {
      onSelectPlan(`${cat.title} (Starting at ${cat.startingPrice})`);
    }
  };

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Atmospheric Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#923FFF]/12 via-[#583FFF]/8 to-[#7DBFFF]/10 rounded-full blur-[140px] -z-10"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'স্বচ্ছ মূল্য তালিকা' : 'Transparent Category Pricing'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? (
              <>
                ক্যাটাগরি অনুযায়ী{' '}
                <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                  শুরু মূল্য তালিকা
                </span>
              </>
            ) : (
              <>
                Service Categories &amp;{' '}
                <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                  Starting Prices
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto">
            {language === 'bn'
              ? 'সকল সার্ভিস মূল্য স্বচ্ছ এবং ইউএসডি ($) ডলারে নির্ধারিত। সম্পূর্ণ বিস্তারিত ও স্পেসিফিকেশন দেখতে ডেডিকেটেড প্রাইসিং সেকশন দেখুন।'
              : 'Clear, competitive pricing in USD ($) across our four core service pillars. Explore starting rates below or visit our dedicated pricing section for itemized deliverables.'}
          </p>
        </div>

        {/* Category Starting Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SERVICE_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 border ${
                  cat.popular
                    ? 'bg-zinc-900/90 border-[#923FFF]/50 shadow-2xl shadow-[#923FFF]/20 hover:border-[#7DBFFF]/80'
                    : 'bg-zinc-950/70 border-white/10 hover:border-white/20 hover:bg-zinc-900/80 shadow-lg'
                }`}
              >
                {/* Popular Pill */}
                {cat.popular && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-brand text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md shadow-[#923FFF]/40">
                    {cat.badge}
                  </div>
                )}

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#923FFF]/15 border border-[#923FFF]/30 flex items-center justify-center text-[#7DBFFF]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {language === 'bn' ? cat.titleBn : cat.title}
                      </h3>
                      <span className="text-[11px] text-zinc-400">
                        {cat.badge}
                      </span>
                    </div>
                  </div>

                  {/* Starting Price Display (USD ONLY) */}
                  <div className="py-4 my-2 border-y border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Starting From (USD)
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {cat.startingPrice}
                      </span>
                      <span className="text-xs font-semibold text-[#7DBFFF]">
                        {cat.billingUnit}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                    {language === 'bn' ? cat.descriptionBn : cat.description}
                  </p>

                  {/* Scope inclusions list */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Category Scope
                    </span>
                    {cat.includedServices.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <button
                    id={`homepage-book-btn-${cat.id}`}
                    onClick={() => handleBookCategory(cat)}
                    className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      cat.popular
                        ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/40 hover:opacity-95 hover:scale-[1.02]'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-[#7DBFFF]/40'
                    }`}
                  >
                    <span>Book {cat.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                    <a
                      href={`https://wa.me/8801736683282?text=${encodeURIComponent(
                        `Hi Akteruzzaman, I want to inquire about starting rates for ${cat.title} (${cat.startingPrice}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7DBFFF] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      to={`/pricing?category=${cat.categoryKey}`}
                      className="text-zinc-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Full Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dedicated Pricing Page Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#7DBFFF]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Pricing &amp; Package Specifications Available</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Looking for Itemized Deliverables &amp; Comparison Matrix?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Visit the dedicated Pricing section to view comprehensive breakdowns for all 17+ services, search by tech stack, calculate custom budgets, and compare package tiers.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              id="homepage-view-full-pricing-btn"
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/40 hover:scale-105 transition-all cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>View Dedicated Pricing Section</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              id="homepage-book-strategy-call-btn"
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#7DBFFF]" />
              <span>Book Discovery Call</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedServiceForModal && (
        <ServiceOrderModal
          isOpen={orderModalOpen}
          service={selectedServiceForModal}
          onClose={() => setOrderModalOpen(false)}
        />
      )}
    </section>
  );
}
