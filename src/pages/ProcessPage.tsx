import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ProcessSection from '../components/ProcessSection';
import { Calendar, CheckCircle2, ShieldCheck, Zap, ArrowRight, HelpCircle } from 'lucide-react';

const DEFAULT_FAQS = [
  {
    q: 'How long does a typical complete project take from start to finish?',
    a: 'Most high-performance web platforms and 3D websites take between 2 to 4 weeks depending on the complexity of 3D assets, custom API integrations, and conversion funnel requirements. We provide milestone schedules with daily status transparency.',
  },
  {
    q: 'Do you involve us during each design and development phase?',
    a: 'Absolutely. You receive an interactive clickable Figma prototype during Phase 02 for feedback, followed by a private staging URL during Phase 03 where you can test live features in real-time before anything goes live to the public.',
  },
  {
    q: 'What is included in the 30-Day Post-Launch Warranty?',
    a: 'We guarantee zero-bug stability, Google search indexing verification, core web vital speed audits, and continuous conversion tracking support for 30 full days after domain deployment at no extra charge.',
  },
  {
    q: 'Can you work with our existing branding and CMS stack?',
    a: 'Yes. We adapt seamlessly to your existing brand assets, Figma libraries, or CMS backends (Headless WordPress, Sanity, Strapi, Shopify) while completely rebuilding the frontend for lightning speed and conversion.',
  },
];

export default function ProcessPage() {
  const [processData, setProcessData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/process')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          setProcessData(data);
        }
      })
      .catch(() => {
        // Local fallback
      });
  }, []);

  const faqs = processData?.faqs || DEFAULT_FAQS;

  return (
    <div className="pt-24 pb-20">
      {/* Hero Badge and Heading for Process Page */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#7DBFFF]"
        >
          <Zap className="w-3.5 h-3.5 text-[#7DBFFF]" />
          <span>Execution Methodology</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-heading"
        >
          Predictable Milestones.{' '}
          <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
            Exceptional Results.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {processData?.description || "Explore how our 5-phase strategic framework transforms rough concepts into sub-second, revenue-generating platforms with complete milestone transparency."}
        </motion.p>
      </div>

      {/* Embedded Process Interactive Section */}
      <ProcessSection />

      {/* Process Guarantees Bento */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">95+ Speed Guarantee</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every site we deploy scores 95+ on Google PageSpeed Insights for both desktop and mobile, ensuring optimal SEO ranking and conversion rates.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#583FFF] to-[#7DBFFF] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Milestone Sign-Offs</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              You approve each deliverable before we proceed to the next phase. No surprise invoices, missed deadlines, or scope creep.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#10b981] to-[#047857] flex items-center justify-center text-white shadow-md">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">30-Day Launch Warranty</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Full peace of mind with 30 days of complimentary technical tuning, analytics auditing, and bug fixes following live public launch.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Process Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
            <HelpCircle className="w-3.5 h-3.5 text-[#7DBFFF]" />
            <span>Process FAQs</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Common Questions About Our Workflow
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                <span className="text-[#7DBFFF] font-mono">0{i + 1}.</span>
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1b1236] via-zinc-900 to-[#101b2a] border border-[#923FFF]/40 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Start Phase 01 on Your Next Platform?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Book a complimentary 20-minute discovery call to evaluate your project scope, timeline, and ROI benchmarks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/40 hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#7DBFFF]" />
              <span>Schedule Discovery Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
