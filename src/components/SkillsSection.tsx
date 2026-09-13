import { useState } from 'react';
import {
  Search,
  Share2,
  FileText,
  Compass,
  Filter,
  Zap,
  Code2,
  Palette,
  Terminal,
  Layers,
  Box,
  Sparkles,
  LayoutGrid,
  BarChart2,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SKILLS_DATA } from '../data/portfolioData';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'marketing' | 'development' | 'strategy'>('all');
  const [displayMode, setDisplayMode] = useState<'bars' | 'circular'>('bars');

  const getSkillIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5 text-[#7DBFFF]';
    switch (iconName) {
      case 'Search':
        return <Search className={iconClass} />;
      case 'Share2':
        return <Share2 className={iconClass} />;
      case 'FileText':
        return <FileText className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Filter':
        return <Filter className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'Code2':
        return <Code2 className={iconClass} />;
      case 'Palette':
        return <Palette className={iconClass} />;
      case 'Terminal':
        return <Terminal className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Box':
        return <Box className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black/50 backdrop-blur-[2px] overflow-hidden">
      {/* Radiant Gradient Spotlight Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-br from-[#923FFF]/15 via-[#583FFF]/10 to-[#7DBFFF]/10 rounded-full blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#583FFF]/10 rounded-full blur-[120px] -z-10"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#583FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical & Strategic Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Skills & Expertise{' '}
              <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
                Matrix
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2">
              Mastering the full spectrum: from search engine algorithms and multi-channel acquisition
              to modern React architecture and interactive 3D WebGL interfaces.
            </p>
          </div>

          {/* Controls: Display mode toggle & Categories */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="glass-panel p-1 rounded-xl flex items-center border border-white/10">
              <button
                id="skills-view-bars-btn"
                onClick={() => setDisplayMode('bars')}
                aria-label="Show bar style progress indicators"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  displayMode === 'bars'
                    ? 'bg-gradient-brand text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Bar View</span>
              </button>
              <button
                id="skills-view-circular-btn"
                onClick={() => setDisplayMode('circular')}
                aria-label="Show circular radial progress indicators"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  displayMode === 'circular'
                    ? 'bg-gradient-brand text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Circular View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'marketing', label: 'Digital Marketing & Growth' },
            { id: 'development', label: 'Web Engineering & 3D' },
            { id: 'strategy', label: 'SEO & Content Strategy' },
          ].map((cat) => (
            <button
              key={cat.id}
              id={`skills-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white/15 text-white border border-[#923FFF]/60 shadow-md shadow-[#923FFF]/20'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Display: Bar Style or Circular Style */}
        <AnimatePresence mode="wait">
          {displayMode === 'bars' ? (
            <motion.div
              key="bars"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredSkills.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#7DBFFF]/40 group-hover:bg-[#7DBFFF]/10 transition-colors">
                        {getSkillIcon(skill.iconName)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base sm:text-lg group-hover:text-[#7DBFFF] transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] text-zinc-400 capitalize">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF]">
                      {skill.level}%
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Gradient Progress Bar */}
                  <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-brand shadow-sm shadow-[#923FFF]"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="circular"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filteredSkills.map((skill, idx) => {
                const radius = 38;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (skill.level / 100) * circumference;

                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col items-center text-center group relative overflow-hidden"
                  >
                    {/* SVG Circular Progress Indicator */}
                    <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 96 96">
                        {/* Background track circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="rgba(255, 255, 255, 0.08)"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id={`grad-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#923FFF" />
                            <stop offset="50%" stopColor="#583FFF" />
                            <stop offset="100%" stopColor="#7DBFFF" />
                          </linearGradient>
                        </defs>
                        {/* Animated progress circle */}
                        <motion.circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke={`url(#grad-${skill.id})`}
                          strokeWidth="6"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.3, ease: 'easeOut' }}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>

                      {/* Center Skill Level */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono text-sm font-extrabold text-white">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-2 group-hover:border-[#923FFF]/40 transition-colors">
                      {getSkillIcon(skill.iconName)}
                    </div>

                    <h4 className="font-bold text-white text-sm leading-tight mb-1 group-hover:text-[#7DBFFF] transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] text-zinc-300 capitalize">
                      {skill.category}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Technical Skills Page Link */}
        <div className="mt-12 text-center">
          <Link
            id="view-all-skills-page-btn"
            to="/skills"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-[#7DBFFF]/50 shadow-xl shadow-black/60 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>View Full Interactive Skills Breakdown</span>
            <ArrowRight className="w-4 h-4 text-[#7DBFFF]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
