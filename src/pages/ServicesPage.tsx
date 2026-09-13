import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  Code2, 
  Search, 
  Layers, 
  BarChart3, 
  Zap, 
  Clock, 
  ShieldCheck,
  Send,
  X,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/portfolioData';

const SERVICE_ICONS: Record<string, any> = {
  'Full-Funnel Digital Marketing': TrendingUp,
  'High-Performance Web Development': Code2,
  'SEO & Organic Search Domination': Search,
  '3D Web & Interactive Experiences': Layers,
  'Conversion Rate Optimization (CRO)': Zap,
  'Data Analytics & Attribution': BarChart3,
};

export default function ServicesPage() {
  const [services, setServices] = useState(SERVICES_DATA);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  // Inquiry modal state
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [budgetRange, setBudgetRange] = useState('$199 - $500');
  const [projectScope, setProjectScope] = useState('');
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState<string | null>(null);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  const categories = ['All', 'Marketing', 'Engineering', 'SEO', 'Creative Dev', 'Growth'];

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === 'All' 
      ? '/api/services' 
      : `/api/services?category=${encodeURIComponent(activeCategory)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
      })
      .catch(() => {
        // Local fallback
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !selectedService) {
      setInquiryError('Name and email are required.');
      return;
    }

    setSubmittingInquiry(true);
    setInquiryError(null);

    try {
      const res = await fetch('/api/services/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName.trim(),
          email: clientEmail.trim(),
          serviceId: selectedService.id,
          serviceTitle: selectedService.title,
          budget: budgetRange,
          projectScope: projectScope.trim() || `Inquiry for ${selectedService.title}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setInquirySuccess(data.message || 'Inquiry submitted successfully!');
      setTimeout(() => {
        setInquirySuccess(null);
        setSelectedService(null);
        setClientName('');
        setClientEmail('');
        setProjectScope('');
      }, 2500);
    } catch (err: any) {
      setInquiryError(err.message || 'Error submitting inquiry.');
    } finally {
      setSubmittingInquiry(false);
    }
  };

  return (
    <div id="services-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#923FFF]/15 border border-[#923FFF]/30 text-[#7DBFFF] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Capabilities & API Backend</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading"
        >
          High-Impact Solutions for{' '}
          <span className="text-gradient-brand">
            Modern Businesses
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed"
        >
          From organic search dominance to immersive 3D web applications, explore my specialized services designed to maximize engagement, conversions, and client revenue.
        </motion.p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-brand text-white shadow-md shadow-[#923FFF]/30'
                  : 'glass-pill text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {services.map((service: any, idx: number) => {
          const IconComponent = SERVICE_ICONS[service.title] || Sparkles;
          return (
            <motion.div
              key={service.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex flex-col justify-between p-8 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-[#923FFF]/50 transition-all duration-300 shadow-xl group hover:shadow-2xl hover:shadow-[#923FFF]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center p-3 group-hover:bg-gradient-brand transition-colors">
                    <IconComponent className="w-7 h-7 text-[#7DBFFF] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                      {service.category || `Service 0${idx + 1}`}
                    </span>
                    {service.pricingFrom && (
                      <span className="block text-[11px] font-mono text-[#7DBFFF] mt-1">
                        from {service.pricingFrom}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#7DBFFF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/5 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Key Deliverables:
                  </span>
                  {service.features.map((item: string, dIdx: number) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-brand shadow-md shadow-[#923FFF]/30 hover:opacity-95 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#7DBFFF]" />
                  <span>Request Custom Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to={`/book-appointment?service=${encodeURIComponent(service.title)}`}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-zinc-300 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#7DBFFF]" />
                  <span>Book Consultation Call</span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4-Step Methodology */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">The 4-Step Execution Framework</h2>
          <p className="text-sm text-zinc-400 mt-2">A predictable, high-speed delivery pipeline from discovery to launch.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Discovery & Audit',
              desc: 'Deep technical analysis of current search footprint, competitors, conversion leaks, and user intent.',
            },
            {
              step: '02',
              title: 'Blueprint & Strategy',
              desc: 'Detailed growth roadmap, wireframes, 3D interaction diagrams, and technical SEO architecture.',
            },
            {
              step: '03',
              title: 'High-Velocity Build',
              desc: 'Rapid frontend sprint with React 19, TypeScript, dynamic WebGL elements, and pixel-perfect design.',
            },
            {
              step: '04',
              title: 'Scale & Optimize',
              desc: 'Rigorous A/B testing, Core Web Vitals tuning, tracking attribution, and ongoing organic search sprints.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 relative overflow-hidden"
            >
              <div className="text-4xl font-extrabold text-white/10 font-mono mb-4">{item.step}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-[#19122c] to-zinc-900 border border-white/15 text-center shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">Unsure Which Service Fits Your Project?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base mb-6">
          Schedule a free 20-minute discovery call. We’ll review your goals and tailor a customized package.
        </p>
        <Link
          to="/book-appointment"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/30 hover:scale-105 transition-transform"
        >
          <Calendar className="w-4 h-4 text-[#7DBFFF]" />
          <span>Schedule a Free Strategy Call</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Service Scope Inquiry Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl p-1 bg-gradient-brand shadow-2xl"
            >
              <div className="bg-zinc-950 rounded-[22px] p-6 sm:p-8 relative">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-1">
                  Service Inquiry API
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {selectedService.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Submit your project requirements to receive a customized scope, timeline, and deliverables list directly from Akteruzzaman.
                </p>

                {inquirySuccess ? (
                  <div className="py-8 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-lg font-bold text-white">Inquiry Received!</h4>
                    <p className="text-xs text-zinc-400">{inquirySuccess}</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    {inquiryError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                        {inquiryError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="sarah@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Budget Allocation</label>
                        <select
                          value={budgetRange}
                          onChange={(e) => setBudgetRange(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none"
                        >
                          <option value="$99 (Starter Sprint)">$99 (Starter Sprint)</option>
                          <option value="$199 - $500 (Standard)">$199 - $500 (Standard)</option>
                          <option value="$500 - $1,500 (Custom Build)">$500 - $1,500 (Custom Build)</option>
                          <option value="$1,500+ (Full Retainer)">$1,500+ (Full Retainer)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Project Scope & Details</label>
                      <textarea
                        rows={3}
                        value={projectScope}
                        onChange={(e) => setProjectScope(e.target.value)}
                        placeholder="Describe your current challenge, current website URL, or desired features..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-[#7DBFFF] outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedService(null)}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submittingInquiry}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-brand shadow-lg hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{submittingInquiry ? 'Sending...' : 'Submit Inquiry'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
