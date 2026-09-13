import { ArrowRight, Sparkles, TrendingUp, Code, CheckCircle, Flame, Calendar, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { t, language } = useLanguage();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      {/* Dynamic Background Spotlights for Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[550px] rounded-full bg-gradient-to-tr from-[#923FFF]/20 via-[#583FFF]/15 to-[#7DBFFF]/10 blur-[130px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-[#923FFF]/15 blur-[100px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7DBFFF]/10 blur-[110px] -z-10"
      />

      {/* Subtle background tech grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] -z-10"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Responsive 2-Column Hero on Desktop, Centered on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left / Top: Availability & Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Availability pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 mb-6 shadow-lg shadow-black/50"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7DBFFF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#923FFF]"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-zinc-300">
                {language === 'bn' ? t('hero.badge') : PERSONAL_INFO.availability}
              </span>
            </motion.div>

            {/* Mobile-only avatar preview for immediate impact on phones */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:hidden mb-6 relative"
            >
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-tr from-[#923FFF] via-[#583FFF] to-[#7DBFFF] shadow-2xl shadow-[#923FFF]/40">
                <div className="w-full h-full rounded-full overflow-hidden bg-black border-2 border-white/10">
                  <img
                    src={PERSONAL_INFO.avatarImage}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-[center_15%]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>

            {/* Headline with required gradient highlight */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.14] mb-6"
            >
              {t('hero.greeting')} <span className="text-white">{t('hero.name')}</span> —{' '}
              <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent inline-block">
                {t('hero.role')}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg lg:text-xl text-zinc-300 leading-relaxed font-normal mb-8 max-w-2xl text-balance"
            >
              {language === 'bn' ? t('hero.description') : PERSONAL_INFO.bioTagline}
            </motion.p>

            {/* Call-to-action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full"
            >
              {/* Primary Consultation Booking CTA Button */}
              <Link
                id="hero-book-appointment-btn"
                to="/book-appointment"
                data-cursor="book"
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-brand shadow-xl shadow-[#923FFF]/40 hover:shadow-[#923FFF]/70 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group border border-white/15"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#7DBFFF] group-hover:scale-110 transition-transform" />
                <span>{t('hero.bookCall')}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA: Explore Projects */}
              <Link
                id="hero-explore-projects-btn"
                to="/projects"
                data-cursor="view"
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-zinc-200 glass-pill hover:bg-white/10 hover:border-[#7DBFFF]/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{t('hero.exploreProjects')}</span>
              </Link>

              {/* Growth Studio Button */}
              <Link
                id="hero-growth-studio-btn"
                to="/studio"
                data-cursor="pointer"
                className="w-full sm:w-auto px-5 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm text-[#7DBFFF] glass-pill border border-[#923FFF]/30 bg-[#923FFF]/10 hover:bg-[#923FFF]/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#7DBFFF]" />
                <span>{language === 'bn' ? 'স্টুডিও টুলস' : 'Growth Tools'}</span>
              </Link>
            </motion.div>
          </div>

          {/* Right: Featured Portrait Frame with Radiant Aura (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hidden lg:flex lg:col-span-5 justify-center relative"
          >
            <div className="relative group w-full max-w-md">
              {/* Outer Radiant Glow Rings */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-brand opacity-40 blur-3xl group-hover:opacity-65 transition-opacity duration-700 animate-pulse"
              />

              {/* Animated Rotating Gradient Border */}
              <div className="relative p-1.5 rounded-3xl bg-gradient-to-tr from-[#923FFF] via-[#583FFF] to-[#7DBFFF] shadow-2xl shadow-[#923FFF]/40">
                <div className="p-1 rounded-[22px] bg-black">
                  <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900 via-zinc-900 to-[#19122c]">
                    <img
                      src={PERSONAL_INFO.avatarImage}
                      alt="AKTERUZZAMAN - Professional Digital Marketer & Creative Web Developer"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Bottom subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-left flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-white">{PERSONAL_INFO.name}</p>
                        <p className="text-[11px] text-[#7DBFFF] font-mono">Senior Marketer & Dev</p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top-Right */}
              <div className="absolute -top-3 -right-3 glass-panel px-3.5 py-2 rounded-2xl border border-white/15 shadow-xl flex items-center gap-2.5 backdrop-blur-xl animate-bounce duration-1000">
                <div className="w-7 h-7 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#923FFF]/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#7DBFFF]" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-zinc-400 font-medium">Core Expertise</p>
                  <p className="text-xs font-bold text-white">Full-Funnel Growth & SEO</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom-Left */}
              <div className="absolute -bottom-3 -left-3 glass-panel px-3.5 py-2 rounded-2xl border border-white/15 shadow-xl flex items-center gap-2.5 backdrop-blur-xl">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#583FFF] to-[#7DBFFF] flex items-center justify-center text-white shadow-md">
                  <Code className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-zinc-400 font-medium">Architecture</p>
                  <p className="text-xs font-bold text-white">Modern 3D & React Web</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Metric Badges Strip below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 sm:mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#7DBFFF]">
              <TrendingUp className="w-5 h-5 text-[#7DBFFF]" />
              <span>+340%</span>
            </div>
            <span className="text-xs sm:text-sm text-zinc-400 mt-1">Average Organic Traffic Lift</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#923FFF]">
              <Flame className="w-5 h-5 text-[#923FFF]" />
              <span>150+</span>
            </div>
            <span className="text-xs sm:text-sm text-zinc-400 mt-1">Successful Campaigns & Apps</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#583FFF]">
              <Code className="w-5 h-5 text-[#7DBFFF]" />
              <span>99.8%</span>
            </div>
            <span className="text-xs sm:text-sm text-zinc-400 mt-1">Lighthouse Speed & SEO Score</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#7DBFFF]">
              <CheckCircle className="w-5 h-5 text-[#583FFF]" />
              <span>$4.5M+</span>
            </div>
            <span className="text-xs sm:text-sm text-zinc-400 mt-1">Client Revenue Generated</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
