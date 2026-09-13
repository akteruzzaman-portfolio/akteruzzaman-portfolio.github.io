import React, { useState, useMemo } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Search, 
  Clock, 
  Zap, 
  Layers, 
  Globe, 
  Bot, 
  Package, 
  MessageSquare,
  HelpCircle,
  TrendingUp,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORY_PRICING_SERVICES } from '../data/pricingData';
import { CategoryPricingItem, PricingCategory } from '../types';
import ServiceOrderModal from './ServiceOrderModal';
import { useLanguage } from '../context/LanguageContext';

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
  showAllCategories?: boolean;
}

export default function PricingSection({ onSelectPlan, showAllCategories = true }: PricingSectionProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<PricingCategory | 'all'>('all');
  const [billingFilter, setBillingFilter] = useState<'all' | 'monthly' | 'one-time'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [activeServiceForOrder, setActiveServiceForOrder] = useState<CategoryPricingItem | null>(null);

  const categories: { id: PricingCategory | 'all'; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: language === 'bn' ? 'সকল সার্ভিস' : 'All Services', icon: Layers },
    { id: 'marketing', label: language === 'bn' ? 'ডিজিটাল মার্কেটিং' : 'Digital Marketing', icon: TrendingUp },
    { id: 'development', label: language === 'bn' ? 'ওয়েব ডিজাইন ও ডেভেলপমেন্ট' : 'Web Design & Dev', icon: Globe },
    { id: 'automation', label: language === 'bn' ? 'এআই ও অটোমেশন' : 'AI & Automation', icon: Bot },
    { id: 'packages', label: language === 'bn' ? 'গ্রোথ প্যাকেজ' : 'Growth Packages', icon: Package },
  ];

  // Filtered services
  const filteredServices = useMemo(() => {
    return CATEGORY_PRICING_SERVICES.filter((item) => {
      // Category Match
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      // Billing Type Match
      const matchesBilling = billingFilter === 'all' || item.billingType === billingFilter;
      // Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.deliverables.some((d) => d.toLowerCase().includes(query));

      return matchesCategory && matchesBilling && matchesSearch;
    });
  }, [selectedCategory, billingFilter, searchQuery]);

  const handleOrderClick = (service: CategoryPricingItem) => {
    setActiveServiceForOrder(service);
    setOrderModalOpen(true);
    if (onSelectPlan) {
      onSelectPlan(`${service.title} (${service.price})`);
    }
  };

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Atmospheric Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#923FFF]/12 via-[#583FFF]/8 to-[#7DBFFF]/10 rounded-full blur-[140px] -z-10"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'স্বচ্ছ মূল্য তালিকা' : 'Transparent Market Pricing'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? (
              <>
                সার্ভিস প্যাকেজ ও{' '}
                <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                  ক্যাটাগরি অনুযায়ী মূল্য
                </span>
              </>
            ) : (
              <>
                Category-Wise Pricing for{' '}
                <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                  Digital Growth
                </span>
              </>
            )}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            {language === 'bn'
              ? 'বাজার যাচাইকৃত সাশ্রয়ী মূল্যে প্রিমিয়াম ডিজিটাল মার্কেটিং, এসইও, কাস্টম ওয়েবসাইট ও এআই অটোমেশন সার্ভিস। সহজে মূল্য জানুন এবং সরাসরি অর্ডার করুন।'
              : 'Market-verified transparent rates with zero hidden fees. Pick individual high-impact services or all-in-one monthly growth packages.'}
          </p>
        </div>

        {/* Category Tabs & Filter Navigation */}
        <div className="space-y-4 mb-10">
          {/* Top Categories Scrollable Row */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? CATEGORY_PRICING_SERVICES.length
                  : CATEGORY_PRICING_SERVICES.filter((s) => s.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  id={`pricing-category-tab-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
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

          {/* Sub-Filters: Billing Type Switcher & Live Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Billing Filter Chips */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-zinc-900/90 border border-white/10 w-full sm:w-auto">
              <button
                id="billing-filter-all"
                onClick={() => setBillingFilter('all')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  billingFilter === 'all'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? 'সব ধরণের' : 'All Types'}
              </button>
              <button
                id="billing-filter-monthly"
                onClick={() => setBillingFilter('monthly')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  billingFilter === 'monthly'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? 'মাসিক রিটেইনার' : 'Monthly Retainers'}
              </button>
              <button
                id="billing-filter-onetime"
                onClick={() => setBillingFilter('one-time')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  billingFilter === 'one-time'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? 'এককালীন প্রজেক্ট' : 'One-Time Projects'}
              </button>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'সার্ভিস খুঁজুন (যেমন: SEO, Landing)...' : 'Search services (e.g. SEO, Landing)...'}
                className="w-full pl-9 pr-8 py-2 rounded-2xl bg-zinc-900/90 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="popLayout">
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 px-4 rounded-3xl bg-zinc-900/40 border border-white/10 max-w-lg mx-auto"
            >
              <Search className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">No services found</h4>
              <p className="text-xs text-zinc-400 mb-4">
                No matching services found for your current search or filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setBillingFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
            >
              {filteredServices.map((service, idx) => {
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className={`relative rounded-3xl flex flex-col justify-between p-[1.5px] transition-all duration-300 group ${
                      service.popular
                        ? 'bg-gradient-brand shadow-2xl shadow-[#923FFF]/30 scale-[1.01] z-10'
                        : 'bg-white/10 hover:bg-white/20 hover:shadow-xl hover:shadow-black/50'
                    }`}
                  >
                    {/* Badge / Popular Pill */}
                    {(service.popular || service.badge) && (
                      <div className="absolute -top-3 left-6 px-3.5 py-0.5 rounded-full bg-gradient-brand text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-[#923FFF]/50 z-20">
                        {service.badge || (service.popular ? 'Recommended' : '')}
                      </div>
                    )}

                    <div className="h-full w-full bg-zinc-950/92 backdrop-blur-2xl rounded-[23px] p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        {/* Category & Turnaround Header */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] px-2 py-0.5 rounded-md bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                            {service.categoryLabel}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#7DBFFF]" />
                            {service.turnaround}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#7DBFFF] transition-colors">
                          {service.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-xs text-zinc-400 mb-5 leading-relaxed min-h-[38px]">
                          {service.tagline}
                        </p>

                        {/* Price Display */}
                        <div className="mb-5 pb-5 border-b border-white/10 flex items-baseline justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                              {service.price}
                            </span>
                            <span className="text-xs font-semibold text-zinc-400">
                              {service.billingType === 'monthly' ? '/ month' : 'one-time'}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {service.billingType === 'monthly' ? 'Cancel anytime' : 'Milestone safe'}
                          </span>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="space-y-2.5 mb-6">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <Zap className="w-3 h-3 text-[#7DBFFF]" />
                            What's Included:
                          </p>
                          {service.deliverables.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action CTA Buttons */}
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        <button
                          id={`book-now-btn-${service.id}`}
                          onClick={() => handleOrderClick(service)}
                          className={`w-full py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                            service.popular
                              ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/40 hover:opacity-95 hover:scale-[1.02]'
                              : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-[#7DBFFF]/30'
                          }`}
                        >
                          <span>{service.ctaText || 'Book Now'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                          <button
                            onClick={() => {
                              const text = encodeURIComponent(`Hi Akteruzzaman, I am interested in booking: "${service.title}" (${service.price}). Can you tell me more?`);
                              window.open(`https://wa.me/8801736683282?text=${text}`, '_blank');
                            }}
                            className="text-[#7DBFFF] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Inquire via WhatsApp</span>
                          </button>

                          <button
                            onClick={() => navigate(`/book-appointment?service=${encodeURIComponent(service.title)}`)}
                            className="text-zinc-400 hover:text-white cursor-pointer"
                          >
                            Book Call →
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Helper Bar: FAQ & Consultation CTA */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#923FFF]/30">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {language === 'bn' ? 'মূল্য বা সার্ভিস নিয়ে কোনো প্রশ্ন আছে?' : 'Have questions about pricing or custom scopes?'}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                {language === 'bn' 
                  ? 'আমাদের সচরাচর জিজ্ঞাসিত প্রশ্নোত্তর (FAQ) দেখুন অথবা সরাসরি একটি ফ্রি কনসালটেশন কল বুক করুন।'
                  : 'Check our comprehensive FAQ section or schedule a 20-minute discovery call for tailored enterprise requirements.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              id="pricing-go-to-faq-btn"
              to="/faq"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#7DBFFF]" />
              <span>{language === 'bn' ? 'FAQ দেখুন' : 'View All FAQs'}</span>
            </Link>

            <Link
              id="pricing-book-call-btn"
              to="/book-appointment"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'bn' ? 'ফ্রি মিটিং বুক করুন' : 'Book Free 1-on-1 Call'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Order Modal */}
      <ServiceOrderModal
        isOpen={orderModalOpen}
        service={activeServiceForOrder}
        onClose={() => setOrderModalOpen(false)}
        onNavigateToBooking={(title) => {
          navigate(`/book-appointment?service=${encodeURIComponent(title)}`);
        }}
      />
    </section>
  );
}
