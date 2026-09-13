import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  BarChart2,
  Award,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Cpu,
  Globe,
  Sliders,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO, SKILLS_DATA } from '../data/portfolioData';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  experience?: string;
  tools?: string[];
  description: string;
  highlight?: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [categories, setCategories] = useState<string[]>([
    'All',
    'Web Engineering',
    'SEO & Search',
    '3D & Creative Dev',
    'Paid Growth',
    'Analytics & Tracking'
  ]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [stackOverview, setStackOverview] = useState<any>(null);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSkills(data.skills);
          if (data.categories) setCategories(data.categories);
          if (data.stackOverview) setStackOverview(data.stackOverview);
          if (data.certifications) setCertifications(data.certifications);
        }
      })
      .catch(() => {
        // Fallback to local data
        const fallbackSkills: SkillItem[] = SKILLS_DATA.map((s) => ({
          id: s.id,
          name: s.name,
          category: s.category === 'marketing' ? 'Paid Growth' : s.category === 'strategy' ? 'SEO & Search' : 'Web Engineering',
          level: s.level,
          icon: s.iconName,
          description: s.description,
          experience: '4+ Years',
          tools: ['Modern Stack', 'Production Tested'],
        }));
        setSkills(fallbackSkills);
      })
      .finally(() => setLoading(false));
  }, []);

  const getSkillIcon = (iconName?: string) => {
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
      case 'BarChart2':
        return <BarChart2 className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const filteredSkills = skills.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' ||
      item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tools && item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="skills-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Breadcrumb / Tag */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
          Home
        </Link>
        <span className="text-xs text-zinc-600">/</span>
        <span className="text-xs text-[#7DBFFF] font-medium">Technical Competencies</span>
      </div>

      {/* Header Banner */}
      <div className="relative mb-14 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#923FFF]/10 border border-[#923FFF]/30 text-xs text-[#7DBFFF] font-medium mb-4">
          <Cpu className="w-3.5 h-3.5 text-[#923FFF]" />
          <span>Full-Spectrum Engineering & Growth Capabilities</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          Where Technical Precision Meets{' '}
          <span className="text-gradient-brand">
            Financial ROI
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
          I don't just write clean, accessible React code or manage high-budget ad campaigns in isolation. I unite full-stack web architecture, 3D WebGL immersion, and algorithmic search optimization under one cohesive execution framework.
        </p>

        {/* Quick Highlights Ribbon */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-mono font-bold text-white block">99+</span>
            <span className="text-xs text-zinc-400">Core Web Vitals Guarantee</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-mono font-bold text-[#7DBFFF] block">4.2x</span>
            <span className="text-xs text-zinc-400">Verified Paid Media ROAS</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-mono font-bold text-[#923FFF] block">60 FPS</span>
            <span className="text-xs text-zinc-400">3D WebGL GPU Acceleration</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <span className="text-2xl font-mono font-bold text-emerald-400 block">+240%</span>
            <span className="text-xs text-zinc-400">Avg. Organic Search Growth</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`skills-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, tools, frameworks..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#7DBFFF]/60 transition-colors"
          />
        </div>
      </div>

      {/* Skills Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <AnimatePresence>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-[#923FFF]/40 transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-[#7DBFFF]/40 transition-all">
                    {getSkillIcon(skill.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#7DBFFF] block">
                      {skill.level}% Proficiency
                    </span>
                    {skill.experience && (
                      <span className="text-[10px] text-zinc-400 block">{skill.experience}</span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#7DBFFF] transition-colors mb-2 text-left">
                  {skill.name}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed text-left mb-4">
                  {skill.description}
                </p>

                {/* Highlight Tag */}
                {skill.highlight && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-400 mb-4">
                    <Sparkles className="w-3 h-3" />
                    <span>{skill.highlight}</span>
                  </div>
                )}
              </div>

              <div>
                {/* Visual Proficiency Bar */}
                <div className="w-full bg-zinc-900 rounded-full h-1.5 mb-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] h-full rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Tech Pills */}
                {skill.tools && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {skill.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-zinc-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Master Stack Overview Bento Grid */}
      {stackOverview && (
        <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 mb-16 text-left">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-[#7DBFFF]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Production Tech Stack & Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/10">
              <span className="text-xs font-bold text-[#7DBFFF] uppercase tracking-wider block mb-3">
                Frontend & UI Engineering
              </span>
              <ul className="space-y-2">
                {stackOverview.frontend?.map((item: string) => (
                  <li key={item} className="text-xs text-zinc-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7DBFFF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/10">
              <span className="text-xs font-bold text-[#923FFF] uppercase tracking-wider block mb-3">
                3D Web & Interactive
              </span>
              <ul className="space-y-2">
                {stackOverview.creative3D?.map((item: string) => (
                  <li key={item} className="text-xs text-zinc-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#923FFF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/10">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-3">
                Paid Media & Search
              </span>
              <ul className="space-y-2">
                {stackOverview.marketing?.map((item: string) => (
                  <li key={item} className="text-xs text-zinc-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                Speed & Performance
              </span>
              <ul className="space-y-2">
                {stackOverview.performance?.map((item: string) => (
                  <li key={item} className="text-xs text-zinc-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Verified Certifications */}
      {certifications.length > 0 && (
        <div className="mb-16 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Verified Credentials & Certifications</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-emerald-500/30 transition-all flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block leading-snug">
                    {cert.name}
                  </span>
                  <span className="text-[11px] text-zinc-400 block mt-1">
                    {cert.issuer} • {cert.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Conversion CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need this exact technical stack on your project?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            Book a complimentary 20-minute architecture review call or reach out directly on WhatsApp to get started immediately.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            id="skills-whatsapp-cta"
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/30 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp ({PERSONAL_INFO.whatsapp})</span>
          </a>

          <Link
            id="skills-book-cta"
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/40 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
