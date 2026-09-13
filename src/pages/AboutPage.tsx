import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Calendar, 
  Award, 
  Sparkles, 
  Code2, 
  TrendingUp, 
  Compass, 
  ArrowRight,
  Mail,
  Zap,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';
import SkillsSection from '../components/SkillsSection';
import SocialLinks from '../components/SocialLinks';

export default function AboutPage() {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profile) {
          setProfileData(data);
        }
      })
      .catch(() => {
        // Fallback gracefully to default local constants
      });
  }, []);

  const bio = profileData?.profile?.bio || (
    "I am AKTERUZZAMAN, a results-obsessed Digital Marketer, SEO Specialist, and Creative Web Developer with over 5 years of industry experience. I bridge the gap between high-converting growth marketing campaigns, organic search domination, and bespoke, bleeding-edge web applications."
  );

  const philosophy = profileData?.profile?.philosophy || (
    "Most digital agencies operate in isolated silos: designers don't understand conversion psychology, developers don't understand SEO crawl architecture, and media buyers don't know how to optimize front-end load times. I unite all three disciplines under one unified engineering framework."
  );

  return (
    <div id="about-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header Breadcrumb / Tag */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#923FFF]/15 border border-[#923FFF]/30 text-[#7DBFFF] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Biography & Vision</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading"
        >
          Engineering Growth Through{' '}
          <span className="text-gradient-brand">
            Creative Code & Marketing
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed"
        >
          Get to know AKTERUZZAMAN — bridging modern frontend architecture, 3D WebGL visuals, and high-velocity organic growth marketing.
        </motion.p>
      </div>

      {/* Main Grid: Portrait + Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        {/* Left Column: Portrait & Stats Badge */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-brand opacity-40 blur-2xl group-hover:opacity-75 transition-opacity duration-500" />

            <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full p-1.5 bg-gradient-to-tr from-[#923FFF] via-[#583FFF] to-[#7DBFFF] shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-zinc-900 to-[#19122c] flex items-center justify-center">
                <img
                  src={PERSONAL_INFO.avatarImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Float Experience Badge */}
            <div className="absolute -bottom-4 right-2 sm:right-6 bg-zinc-950/90 border border-white/15 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#7DBFFF]" />
                </div>
              </div>
              <div>
                <span className="block text-lg font-bold text-white leading-none">5+ Years</span>
                <span className="text-[11px] text-zinc-400 font-medium">Growth & Development</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: In-Depth Background Story */}
        <div className="lg:col-span-7 space-y-6 text-zinc-300">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 font-mono">
            <Zap className="w-3.5 h-3.5 text-[#7DBFFF]" />
            <span>Based Worldwide • Remote Collaborator</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Hi, I’m {PERSONAL_INFO.name}
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            {bio}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed italic border-l-2 border-[#923FFF] pl-4 py-1">
            "{philosophy}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="flex items-center gap-2.5 text-white font-semibold mb-1">
                <TrendingUp className="w-4 h-4 text-[#7DBFFF]" />
                <span>Performance-First Marketing</span>
              </div>
              <p className="text-xs text-zinc-400">
                SEO audits, algorithmic keyword strategy, and conversion rate optimization tailored to buyer intent.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="flex items-center gap-2.5 text-white font-semibold mb-1">
                <Code2 className="w-4 h-4 text-[#923FFF]" />
                <span>Modern Web & 3D Engineering</span>
              </div>
              <p className="text-xs text-zinc-400">
                React, TypeScript, Spline 3D canvas, smooth motion physics, and sub-second load times.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 hover:shadow-[#923FFF]/60 hover:scale-105 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#7DBFFF]" />
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              id="about-whatsapp-btn"
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/40 shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>WhatsApp: {PERSONAL_INFO.whatsapp}</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-zinc-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send a Message</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Philosophies */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">The 4 Pillars of My Work</h2>
          <p className="text-sm text-zinc-400 mt-2">Every project is built upon rigorous standards of design and performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Search Engine Dominance',
              desc: 'Deep technical audits, schema markup, clean semantics, and content strategies that secure top search positions.',
              icon: Compass,
            },
            {
              title: 'Kinetic 3D & UX Immersion',
              desc: 'Transforming passive visitors into active participants through tasteful 3D models and micro-interactions.',
              icon: Sparkles,
            },
            {
              title: 'Measurable ROI & CRO',
              desc: 'Every element, headline, and call-to-action is mathematically calibrated to increase conversion percentage.',
              icon: TrendingUp,
            },
            {
              title: 'Maintainable Clean Code',
              desc: 'Built with React 19, TypeScript, and modern modular architectures that can scale without technical debt.',
              icon: Code2,
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-[#923FFF]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-[#923FFF]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#7DBFFF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Matrix Component */}
      <div className="mb-20">
        <SkillsSection />
      </div>

      {/* Official Social Media Channels */}
      <div className="mb-24 p-8 sm:p-10 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7DBFFF]">
              Stay Connected
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Official Social Profiles
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            Connect across LinkedIn, YouTube, Twitter/X, Instagram, Pinterest, and Facebook for real-time updates and portfolio highlights.
          </p>
        </div>

        <SocialLinks variant="grid" />
      </div>

      {/* Direct CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-[#1d1235] to-zinc-900 border border-white/15 text-center shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Elevate Your Digital Footprint?</h2>
          <p className="text-zinc-300 text-sm sm:text-base">
            Let’s review your current online performance, identify high-impact growth levers, and architect a solution.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] shadow-xl shadow-[#923FFF]/30 hover:scale-105 transition-transform"
            >
              <Calendar className="w-4 h-4 text-[#7DBFFF]" />
              <span>Book an Appointment</span>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-zinc-300 bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
