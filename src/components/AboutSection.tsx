import { Award, Code, Target, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { HIGHLIGHT_CARDS, PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const { t, language } = useLanguage();
  const getIcon = (name: string) => {
    switch (name) {
      case 'Award':
        return <Award className="w-6 h-6 text-[#923FFF]" />;
      case 'Code':
        return <Code className="w-6 h-6 text-[#7DBFFF]" />;
      case 'Target':
        return <Target className="w-6 h-6 text-[#583FFF]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#7DBFFF]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#923FFF]" />;
    }
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#923FFF]/10 rounded-full blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#7DBFFF]/10 rounded-full blur-[130px] -z-10"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="text-center sm:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? (
              t('about.heading')
            ) : (
              <>
                Bridging High-Converting Marketing &{' '}
                <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                  Kinetic Web Engineering
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Side: Portrait inside Glowing Circular Gradient Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Outer Radiant Glow Rings */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-brand opacity-40 blur-2xl group-hover:opacity-75 transition-opacity duration-700 animate-pulse"
              />

              {/* Animated Rotating Gradient Border */}
              <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-[#923FFF] via-[#583FFF] to-[#7DBFFF] shadow-2xl shadow-[#923FFF]/40">
                <div className="p-2 rounded-full bg-black">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92 rounded-full overflow-hidden border-2 border-white/10 bg-gradient-to-b from-zinc-900 via-zinc-900 to-[#19122c]">
                    <img
                      src={PERSONAL_INFO.avatarImage}
                      alt="AKTERUZZAMAN - Professional Digital Marketer & Creative Web Developer"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Floating Info Badges */}
              <div className="absolute -bottom-3 -right-2 sm:bottom-4 sm:right-0 glass-panel px-4 py-2.5 rounded-2xl border border-white/15 shadow-xl flex items-center gap-3 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#923FFF]/30">
                  ROI
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-zinc-400 font-medium">Marketing Strategy</p>
                  <p className="text-xs font-bold text-white">Full-Funnel Growth</p>
                </div>
              </div>

              <div className="absolute -top-3 -left-2 sm:top-4 sm:left-0 glass-panel px-4 py-2.5 rounded-2xl border border-white/15 shadow-xl flex items-center gap-3 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#583FFF] to-[#7DBFFF] flex items-center justify-center text-white shadow-md">
                  <Code className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-zinc-400 font-medium">Creative Dev</p>
                  <p className="text-xs font-bold text-white">React & 3D Web</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Bio Text about Journey as a Digital Marketer & Web Developer */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Designing platforms that don’t just look exceptional —{' '}
              <span className="text-[#7DBFFF]">they convert visitors into high-ticket clients.</span>
            </h3>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Hello! I am <strong className="text-white font-semibold">AKTERUZZAMAN</strong>. Over the last five
              years, I’ve operated at the unique intersection of <span className="text-[#7DBFFF]">algorithmic digital marketing</span>{' '}
              and <span className="text-[#923FFF]">creative frontend engineering</span>.
            </p>

            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed">
              Most digital marketers struggle with the code required to build lightning-fast web experiences, while most developers don't understand consumer psychology, search engine algorithms, or customer acquisition funnels.
            </p>

            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed">
              My mission is to eliminate that friction: I formulate data-backed SEO and campaign strategies, then directly architect high-converting, immersive landing pages, 3D interactive web experiences, and seamless modern web apps that scale effortlessly.
            </p>

            {/* Quick bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 text-zinc-100 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#7DBFFF] shrink-0" />
                <span>Data-Driven Organic Search Strategy</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-100 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#7DBFFF] shrink-0" />
                <span>Bespoke Interactive 3D & React Web</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-100 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#923FFF] shrink-0" />
                <span>Conversion Rate Optimization (CRO)</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-100 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#923FFF] shrink-0" />
                <span>Sub-Second Performance & Web Vitals</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                id="about-contact-btn"
                to="/contact"
                className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 hover:shadow-[#923FFF]/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Work With Me</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                id="about-skills-btn"
                to="/skills"
                className="px-6 py-3 rounded-full text-sm font-semibold text-zinc-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
              >
                <span>Inspect Technical Skills</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Below: 3–4 Highlight Cards (Experience, Technologies, Specialties, Achievements) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHT_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-brand opacity-40 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#923FFF]/40 group-hover:bg-[#923FFF]/10 transition-colors">
                  {getIcon(card.iconName)}
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#7DBFFF]">
                  {card.badge}
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-[#7DBFFF] transition-colors">
                {card.title}
              </h4>
              <p className="text-xs font-medium text-[#923FFF] mb-3">{card.subtitle}</p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
