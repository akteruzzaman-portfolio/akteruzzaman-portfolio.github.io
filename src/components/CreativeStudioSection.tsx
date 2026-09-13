import React, { useState, useEffect } from 'react';
import { Sparkles, Palette, Zap, Download, Copy, Check, ArrowRight, BookOpen, Layers, Flame, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface PaletteItem {
  name: string;
  hex: string;
}

interface BrandData {
  industry: string;
  palette: PaletteItem[];
  headingFont: string;
  bodyFont: string;
  strategy: string;
  tagline: string;
}

interface HookItem {
  type: string;
  hook: string;
  description: string;
  format: string;
}

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  pages: string;
  description: string;
  tag: string;
  downloads: number;
}

export default function CreativeStudioSection() {
  const [activeTab, setActiveTab] = useState<'hooks' | 'palette' | 'resources'>('hooks');

  // Hooks state
  const [productInput, setProductInput] = useState('B2B SaaS Growth');
  const [hooksLoading, setHooksLoading] = useState(false);
  const [hooks, setHooks] = useState<HookItem[]>([
    {
      type: 'Curiosity Hook (High CTR)',
      hook: 'Why 92% of SaaS landing pages leak qualified pipeline (and the 1 visual fix that doubles signups).',
      description: 'Stops thumb-scrolling by directly challenging industry consensus.',
      format: 'Meta Video Ad / Reels Cover',
    },
    {
      type: 'Contrast & Cost Destroyer',
      hook: 'Stop burning $5,000/mo on ad clicks that bounce in 4 seconds. Here is how we engineered a 42% conversion rate.',
      description: 'Highlights budget bleed and positions high-performance CRO as the solution.',
      format: 'LinkedIn Carousel / Ad Headline',
    },
    {
      type: 'Speed & Time-to-Value',
      hook: 'How top tech brands deploy custom high-converting web apps in 14 days without agency bloat.',
      description: 'Clear promise of fast deployment and clean architecture.',
      format: 'Meta Ad Headline & Primary Text',
    },
  ]);
  const [copiedHookIndex, setCopiedHookIndex] = useState<number | null>(null);

  // Palette state
  const [selectedIndustry, setSelectedIndustry] = useState('saas');
  const [paletteLoading, setPaletteLoading] = useState(false);
  const [brandData, setBrandData] = useState<BrandData>({
    industry: 'Modern SaaS & B2B Tech',
    palette: [
      { name: 'Electric Indigo', hex: '#583FFF' },
      { name: 'Neon Violet', hex: '#923FFF' },
      { name: 'Cyan Horizon', hex: '#7DBFFF' },
      { name: 'Carbon Charcoal', hex: '#0E0C1A' },
    ],
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    strategy: 'High-contrast cyber-tech aesthetic optimized for software conversion and credibility.',
    tagline: 'Engineer Confidence. Scale Revenue.',
  });
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Resources state
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [resources, setResources] = useState<ResourceItem[]>([
    {
      id: 'meta-ads-blueprint',
      title: 'Full-Funnel Meta & Google Ads Blueprint',
      category: 'Performance Marketing',
      pages: '28 Pages PDF',
      description: 'Tested campaign architecture, audience exclusions, bid cap frameworks, and high-ROAS creative formulas.',
      tag: 'Most Popular',
      downloads: 142,
    },
    {
      id: 'seo-audit-checklist',
      title: 'Technical SEO 2026 Audit Checklist',
      category: 'Organic Growth',
      pages: '18 Pages Guide',
      description: 'Complete Core Web Vitals, Schema markup, programmatic SEO structures, and keyword gap matrix.',
      tag: 'Updated for 2026',
      downloads: 289,
    },
    {
      id: 'cro-playbook',
      title: 'High-Converting Landing Page & CRO Playbook',
      category: 'Conversion Optimization',
      pages: '22 Pages Framework',
      description: 'The exact layout hierarchy, above-the-fold formula, and psychological triggers that yielded 42% conversion rates.',
      tag: 'Essential',
      downloads: 194,
    },
    {
      id: 'growth-stack-toolkit',
      title: 'Growth Engineering & Modern Tech Stack',
      category: 'Web Architecture',
      pages: '15 Pages Blueprint',
      description: 'Recommended tools, attribution pipelines, React performance tips, and 3D kinetic interaction strategies.',
      tag: 'Developer Guide',
      downloads: 315,
    },
  ]);

  // Load download metrics on mount
  useEffect(() => {
    fetch('/api/resources/list')
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads) {
          setResources((prev) =>
            prev.map((r) => ({
              ...r,
              downloads: data.downloads[r.id] || r.downloads,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const handleGenerateHooks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productInput.trim()) return;

    setHooksLoading(true);
    try {
      const res = await fetch('/api/creative/hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productInput.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.hooks)) {
        setHooks(data.hooks);
      }
    } catch {
      // Handled silently
    } finally {
      setHooksLoading(false);
    }
  };

  const handleCopyHook = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedHookIndex(index);
    setTimeout(() => setCopiedHookIndex(null), 2000);
  };

  const handleSelectIndustry = async (industryKey: string) => {
    setSelectedIndustry(industryKey);
    setPaletteLoading(true);
    try {
      const res = await fetch('/api/creative/palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry: industryKey }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.brand) {
        setBrandData(data.brand);
      }
    } catch {
      // Handled silently
    } finally {
      setPaletteLoading(false);
    }
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleDownload = async (resource: ResourceItem) => {
    setDownloadingId(resource.id);
    try {
      await fetch('/api/resources/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId: resource.id }),
      });

      // Update local download counter
      setResources((prev) =>
        prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
      );

      // Trigger dummy download file
      const blob = new Blob([
        `AKTERUZZAMAN Growth Blueprint: ${resource.title}\nCategory: ${resource.category}\nVerified Strategy Guide by AKTERUZZAMAN\n\nThank you for downloading! For 1-on-1 strategy sessions, visit https://akteruzzaman.com/book-appointment`,
      ], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resource.id}-blueprint.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Handled silently
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  return (
    <section id="creative-studio" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#923FFF]/10 via-[#3bb75e]/10 to-[#7DBFFF]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>INTERACTIVE GROWTH STUDIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Creative Tools & <span className="title-gradient">Free Resources</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Test real growth strategies in real-time. Generate ad creative hooks, explore high-conversion brand palettes, and download verified growth playbooks.
          </p>

          {/* Interactive Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full glass-panel border border-white/10 shadow-lg gap-1">
            <button
              onClick={() => setActiveTab('hooks')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'hooks'
                  ? 'bg-gradient-to-r from-[#1959ad] via-[#2480b8] to-[#3bb75e] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Ad Hook Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('palette')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'palette'
                  ? 'bg-gradient-to-r from-[#1959ad] via-[#2480b8] to-[#3bb75e] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Palette className="w-4 h-4 text-sky-400" />
              <span>Palette Explorer</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-gradient-to-r from-[#1959ad] via-[#2480b8] to-[#3bb75e] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Free E-Books & Guides</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Ad Hook Generator */}
        {activeTab === 'hooks' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl">
              <form onSubmit={handleGenerateHooks} className="mb-8">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                  Enter Your Business, Niche or Offer:
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                    placeholder="e.g. AI Workflow Automation, Luxury Fashion, Local Dental Clinic"
                    className="flex-1 px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50"
                  />
                  <button
                    type="submit"
                    disabled={hooksLoading}
                    className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1959ad] via-[#2480b8] to-[#3bb75e] hover:shadow-[0_0_20px_rgba(59,183,94,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {hooksLoading ? (
                      <span>Analyzing Angles...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate High-CTR Hooks</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Generated Hooks Cards */}
              <div className="space-y-4">
                {hooks.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-black/50 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {item.type}
                        </span>
                        <span className="text-[11px] text-zinc-500">{item.format}</span>
                      </div>

                      <button
                        onClick={() => handleCopyHook(item.hook, idx)}
                        className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg glass-pill text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedHookIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Hook</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-base sm:text-lg font-bold text-white mb-1.5 tracking-tight group-hover:text-emerald-300 transition-colors">
                      "{item.hook}"
                    </p>
                    <p className="text-xs text-zinc-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Brand Palette Explorer */}
        {activeTab === 'palette' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl">
              {/* Industry Selectors */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { key: 'saas', label: 'B2B SaaS' },
                  { key: 'ecommerce', label: 'E-Commerce' },
                  { key: 'fintech', label: 'FinTech & Web3' },
                  { key: 'luxury', label: 'Luxury & Estate' },
                  { key: 'agency', label: 'Creative Studio' },
                ].map((ind) => (
                  <button
                    key={ind.key}
                    onClick={() => handleSelectIndustry(ind.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedIndustry === ind.key
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'glass-pill text-zinc-400 hover:text-white'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>

              {/* Palette Display */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {brandData.palette.map((swatch, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCopyHex(swatch.hex)}
                    className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-white/30 transition-all cursor-pointer group text-center"
                  >
                    <div
                      className="w-full h-24 rounded-xl mb-3 shadow-inner transition-transform group-hover:scale-105"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="text-xs font-bold text-white truncate">{swatch.name}</div>
                    <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-center gap-1 mt-0.5">
                      <span>{swatch.hex}</span>
                      {copiedHex === swatch.hex ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategy & Typography Notes */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Conversion Architecture
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{brandData.strategy}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-1">
                    Typography Pairing
                  </h4>
                  <p className="text-xs text-zinc-300">
                    Heading: <strong className="text-white">{brandData.headingFont}</strong> &nbsp;|&nbsp; Body: <strong className="text-white">{brandData.bodyFont}</strong>
                  </p>
                  <p className="text-[11px] text-zinc-500 italic mt-1 font-mono">
                    "{brandData.tagline}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Free E-Books & Strategy Guides */}
        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {resources.map((resItem) => (
              <div
                key={resItem.id}
                data-cursor="read"
                className="p-6 sm:p-7 rounded-3xl glass-panel glass-panel-hover border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {resItem.tag}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{resItem.pages}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {resItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {resItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{resItem.downloads.toLocaleString()} Downloads</span>
                  </div>

                  <button
                    onClick={() => handleDownload(resItem)}
                    disabled={downloadingId === resItem.id}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#1959ad] via-[#2480b8] to-[#3bb75e] hover:shadow-[0_0_15px_rgba(59,183,94,0.4)] transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {downloadingId === resItem.id ? (
                      <span>Unlocking...</span>
                    ) : (
                      <>
                        <span>Free Download</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
