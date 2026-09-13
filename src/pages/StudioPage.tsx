import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Palette,
  Zap,
  Download,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  Layers,
  Flame,
  TrendingUp,
  Cpu,
  RefreshCw,
  Sliders,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';

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

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<'hooks' | 'palette' | 'calculator' | 'resources'>('hooks');
  const [studioInfo, setStudioInfo] = useState<any>(null);

  // Hooks state
  const [productInput, setProductInput] = useState('B2B SaaS Growth');
  const [hooksLoading, setHooksLoading] = useState(false);
  const [hooks, setHooks] = useState<HookItem[]>([
    {
      type: 'Curiosity Hook (High CTR)',
      hook: 'Why 92% of SaaS landing pages leak qualified pipeline (and the 1 visual shift that fixes it).',
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
    {
      type: 'Case Metric Proof',
      hook: 'We engineered +240% organic reach in 90 days. Steal our exact 5-step technical growth framework.',
      description: 'Leverages verifiable case metrics to establish immediate authority.',
      format: 'Lead Magnet Landing Page',
    },
  ]);
  const [copiedHookIndex, setCopiedHookIndex] = useState<number | null>(null);

  // Palette state
  const [selectedIndustry, setSelectedIndustry] = useState('saas');
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
    strategy: 'High-contrast cyber-tech aesthetic optimized for software conversion and developer trust.',
    tagline: 'Engineer Confidence. Scale Revenue.',
  });
  const [paletteLoading, setPaletteLoading] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Calculator state
  const [serviceType, setServiceType] = useState('web-3d');
  const [pagesCount, setPagesCount] = useState(3);
  const [has3D, setHas3D] = useState(true);
  const [needsSEO, setNeedsSEO] = useState(true);
  const [needsBackend, setNeedsBackend] = useState(false);
  const [urgency, setUrgency] = useState<'normal' | 'rush'>('normal');
  const [calcResult, setCalcResult] = useState<any>(null);
  const [calcLoading, setCalcLoading] = useState(false);

  // Resources state
  const [resources, setResources] = useState<ResourceItem[]>([
    {
      id: 'res-cro-checklist',
      title: 'The 42-Point High-Converting Landing Page Checklist',
      category: 'Conversion CRO',
      pages: '12 Pages PDF',
      description: 'Visual audit framework used to diagnose drop-offs and lift conversion rates by +42%.',
      tag: 'Most Popular',
      downloads: 412,
    },
    {
      id: 'res-seo-blueprint',
      title: 'Technical SEO & Core Web Vitals 100/100 Blueprint',
      category: 'Search SEO',
      pages: '18 Pages PDF',
      description: 'Sub-second speed architectures, schema markup templates, and organic indexing guide.',
      tag: 'Technical Guide',
      downloads: 328,
    },
    {
      id: 'res-ad-scaling',
      title: 'Meta & Google Ads 4x ROAS Media Buying Playbook',
      category: 'Paid Growth',
      pages: '15 Pages PDF',
      description: 'Ad fatigue mitigation, audience lookalike architecture, and high-CTR copy blueprints.',
      tag: 'Agency Secret',
      downloads: 274,
    },
  ]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/studio')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStudioInfo(data.studio);
      })
      .catch(() => {});

    // Initial calculation
    runCalculator();
  }, []);

  const handleGenerateHooks = async (e: React.FormEvent) => {
    e.preventDefault();
    setHooksLoading(true);
    try {
      const res = await fetch('/api/creative/hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productInput }),
      });
      const data = await res.json();
      if (data.success && data.hooks) {
        setHooks(data.hooks);
      }
    } catch {
      // Keep existing hooks
    } finally {
      setHooksLoading(false);
    }
  };

  const handleCopyHook = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedHookIndex(index);
    setTimeout(() => setCopiedHookIndex(null), 2000);
  };

  const handleSelectIndustry = async (ind: string) => {
    setSelectedIndustry(ind);
    setPaletteLoading(true);
    try {
      const res = await fetch('/api/creative/palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry: ind }),
      });
      const data = await res.json();
      if (data.success && data.brand) {
        setBrandData(data.brand);
      }
    } catch {
      // Fallback
    } finally {
      setPaletteLoading(false);
    }
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const runCalculator = async () => {
    setCalcLoading(true);
    try {
      const res = await fetch('/api/pricing/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          pagesCount,
          has3D,
          needsSEO,
          needsBackend,
          urgency,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCalcResult(data);
      }
    } catch {
      // Fallback
    } finally {
      setCalcLoading(false);
    }
  };

  const handleDownloadResource = async (resItem: ResourceItem) => {
    setDownloadingId(resItem.id);
    try {
      const res = await fetch('/api/resources/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId: resItem.id }),
      });
      const data = await res.json();
      if (data.success) {
        setDownloadSuccess(resItem.title);
        setResources((prev) =>
          prev.map((r) =>
            r.id === resItem.id ? { ...r, downloads: data.totalDownloads } : r
          )
        );
        setTimeout(() => setDownloadSuccess(null), 4000);
      }
    } catch {
      setDownloadSuccess(resItem.title);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div id="studio-page" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
          Home
        </Link>
        <span className="text-xs text-zinc-600">/</span>
        <span className="text-xs text-[#7DBFFF] font-medium">Creative Studio & Growth Tools</span>
      </div>

      {/* Header Banner */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#923FFF]/10 border border-[#923FFF]/30 text-xs text-[#7DBFFF] font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#923FFF]" />
          <span>Interactive Growth Lab & Utilities</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          Creative Growth Tools &{' '}
          <span className="text-gradient-brand">
            Conversion Systems
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
          Explore interactive tools I’ve engineered to streamline your marketing, generate psychological hooks, calibrate brand color contrast, and forecast project investments.
        </p>
      </div>

      {/* Studio Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl mb-10">
        <button
          id="studio-tab-hooks"
          onClick={() => setActiveTab('hooks')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'hooks'
              ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/30'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Viral Hooks Generator</span>
        </button>

        <button
          id="studio-tab-palette"
          onClick={() => setActiveTab('palette')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'palette'
              ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/30'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Palette className="w-4 h-4 text-[#7DBFFF]" />
          <span>Brand Palette & Fonts</span>
        </button>

        <button
          id="studio-tab-calculator"
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/30'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Project ROI & Cost Calculator</span>
        </button>

        <button
          id="studio-tab-resources"
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'resources'
              ? 'bg-gradient-brand text-white shadow-lg shadow-[#923FFF]/30'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#923FFF]" />
          <span>Free Blueprints & Cheatsheets</span>
        </button>
      </div>

      {/* Tab 1: Hooks Generator */}
      {activeTab === 'hooks' && (
        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-2">
              Generate High-CTR Advertising & Landing Page Hooks
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Enter your product, niche, or service to generate psychologically tuned hooks tested across Meta, Google, and LinkedIn campaigns.
            </p>

            <form onSubmit={handleGenerateHooks} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                placeholder="e.g. AI Workflow Automation, DTC Coffee Brand, FinTech App"
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-white/15 text-sm text-white focus:outline-none focus:border-[#7DBFFF]"
              />
              <button
                type="submit"
                disabled={hooksLoading}
                className="px-6 py-3 rounded-xl bg-gradient-brand font-bold text-xs text-white shadow-lg shadow-[#923FFF]/30 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {hooksLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>Generate Hooks</span>
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hooks.map((h, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-[#7DBFFF]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#923FFF]/20 text-[#7DBFFF] text-[10px] font-mono font-bold">
                      {h.type}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">{h.format}</span>
                  </div>

                  <p className="text-sm font-semibold text-white mb-3 leading-snug">
                    "{h.hook}"
                  </p>

                  <p className="text-xs text-zinc-400 mb-4">{h.description}</p>
                </div>

                <button
                  onClick={() => handleCopyHook(h.hook, idx)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7DBFFF] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedHookIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Hook Text</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Brand Palette */}
      {activeTab === 'palette' && (
        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-2">
              Conversion Color Palettes & Typography Pairings
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Scientifically selected high-contrast color palettes designed to optimize dwell time, brand trust, and click-through rates.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'saas', label: 'SaaS & B2B Tech' },
                { id: 'ecommerce', label: 'E-Commerce & DTC' },
                { id: 'fintech', label: 'FinTech & Web3' },
                { id: 'luxury', label: 'Luxury & Fashion' },
                { id: 'agency', label: 'Creative Studio' },
              ].map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => handleSelectIndustry(ind.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedIndustry === ind.id
                      ? 'bg-gradient-brand text-white shadow-md'
                      : 'bg-zinc-900 text-zinc-300 hover:text-white border border-white/10'
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10">
            <div className="mb-6">
              <span className="text-xs font-mono text-[#7DBFFF] uppercase tracking-wider block">
                {brandData.industry}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">"{brandData.tagline}"</h2>
              <p className="text-xs text-zinc-400 mt-2 max-w-xl">{brandData.strategy}</p>
            </div>

            {/* Swatches Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {brandData.palette.map((color) => (
                <div
                  key={color.hex}
                  onClick={() => handleCopyHex(color.hex)}
                  className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-white/30 cursor-pointer transition-all group"
                >
                  <div
                    className="w-full h-24 rounded-xl mb-3 shadow-inner group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-bold text-white block">{color.name}</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono text-zinc-400">{color.hex}</span>
                    {copiedHex === color.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Typography Pairing */}
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-400">Typography Pairing Stack:</span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm font-bold text-white font-heading">
                    Heading: {brandData.headingFont}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-sm text-zinc-300 font-sans">
                    Body: {brandData.bodyFont}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopyHex(
                    `/* ${brandData.industry} Palette */\n` +
                      brandData.palette.map((p) => `${p.name}: ${p.hex};`).join('\n')
                  )
                }
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Copy Full Color Tokens
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Calculator */}
      {activeTab === 'calculator' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-950/70 border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white">Configure Project Scope</h3>

              {/* Service Type */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Primary Objective:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'seo', label: 'SEO & Growth Sprint' },
                    { id: 'web-3d', label: 'High-Perf 3D Web' },
                    { id: 'full-growth', label: 'Full Growth Engine' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setServiceType(t.id);
                        setTimeout(runCalculator, 50);
                      }}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        serviceType === t.id
                          ? 'bg-gradient-brand text-white'
                          : 'bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Pages */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-zinc-300">
                    Estimated Custom Subpages:
                  </label>
                  <span className="text-xs font-mono font-bold text-[#7DBFFF]">
                    {pagesCount} Pages
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={pagesCount}
                  onChange={(e) => {
                    setPagesCount(Number(e.target.value));
                    setTimeout(runCalculator, 50);
                  }}
                  className="w-full accent-[#923FFF]"
                />
              </div>

              {/* Checkbox Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={has3D}
                    onChange={(e) => {
                      setHas3D(e.target.checked);
                      setTimeout(runCalculator, 50);
                    }}
                    className="accent-[#923FFF] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-white">Interactive 3D WebGL</span>
                </label>

                <label className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsSEO}
                    onChange={(e) => {
                      setNeedsSEO(e.target.checked);
                      setTimeout(runCalculator, 50);
                    }}
                    className="accent-[#923FFF] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-white">Technical SEO & Schema</span>
                </label>

                <label className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsBackend}
                    onChange={(e) => {
                      setNeedsBackend(e.target.checked);
                      setTimeout(runCalculator, 50);
                    }}
                    className="accent-[#923FFF] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-white">Backend API & Database</span>
                </label>

                <label className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={urgency === 'rush'}
                    onChange={(e) => {
                      setUrgency(e.target.checked ? 'rush' : 'normal');
                      setTimeout(runCalculator, 50);
                    }}
                    className="accent-[#923FFF] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-amber-400">Expedited Delivery Sprint</span>
                </label>
              </div>
            </div>

            {/* Result Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black border border-white/15 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#7DBFFF] uppercase tracking-wider block mb-1">
                  Estimated Investment Quote
                </span>
                <div className="text-4xl font-extrabold text-white my-2 font-mono">
                  {calcResult?.totalEstimate || '$199'}
                </div>
                <div className="text-xs text-zinc-400 mb-6">
                  Estimated Timeline: <span className="text-white font-semibold">{calcResult?.estimatedTimeline || '12 Business Days'}</span>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                  {calcResult?.breakdown?.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">{item.item}</span>
                      <span className="text-white font-mono font-semibold">${item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/book-appointment"
                className="w-full py-3.5 rounded-full bg-gradient-brand text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#923FFF]/40 hover:scale-105 transition-all"
              >
                <span>Lock In This Scope via Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Resources */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {downloadSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Success! "{downloadSuccess}" downloaded and unlocked.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-[#923FFF]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#923FFF]/20 text-[#7DBFFF] text-[10px] font-bold uppercase">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">{item.pages}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {item.downloads} downloads
                  </span>

                  <button
                    onClick={() => handleDownloadResource(item)}
                    disabled={downloadingId === item.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#7DBFFF]" />
                    <span>{downloadingId === item.id ? 'Accessing...' : 'Get Blueprint'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Contact Footer Ribbon */}
      <div className="mt-16 p-8 rounded-3xl bg-zinc-950/70 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-sm font-bold text-white block">
            Have a custom tool or script requirement?
          </span>
          <span className="text-xs text-zinc-400">
            I build custom SaaS prototypes, WebGL experiences, and analytics pipelines.
          </span>
        </div>

        <a
          href={PERSONAL_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/30 transition-all shrink-0 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
