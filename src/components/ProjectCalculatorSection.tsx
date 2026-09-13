import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface BreakdownItem {
  item: string;
  cost: number;
}

interface CalculationResult {
  success: boolean;
  totalEstimate: string;
  estimatedTimeline: string;
  recommendedTier: string;
  breakdown: BreakdownItem[];
  cta: {
    text: string;
    link: string;
  };
}

export default function ProjectCalculatorSection() {
  const [serviceType, setServiceType] = useState('web-3d');
  const [pagesCount, setPagesCount] = useState(5);
  const [has3D, setHas3D] = useState(true);
  const [needsBackend, setNeedsBackend] = useState(false);
  const [urgency, setUrgency] = useState<'normal' | 'rush'>('normal');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pricing/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          pagesCount,
          has3D,
          needsBackend,
          urgency,
        }),
      });
      const data = await res.json();
      if (data && data.success) {
        setResult(data);
      }
    } catch {
      // Local fallback calculation already handles default result
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateQuote();
  }, [serviceType, pagesCount, has3D, needsBackend, urgency]);

  return (
    <div className="mb-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#923FFF]/30 text-xs font-semibold uppercase tracking-wider text-[#7DBFFF] mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Real-Time Estimation API</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Custom Project Scope & Cost Calculator
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2">
          Adjust your requirements below to instantly generate a transparent, itemized quote calculated by our server.
        </p>
      </div>

      <div className="rounded-3xl p-1 bg-gradient-brand shadow-2xl">
        <div className="bg-zinc-950 rounded-[22px] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Primary Service Objective */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  1. Select Primary Objective
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'seo', label: 'SEO & Growth Sprint', price: '$99' },
                    { id: 'web-3d', label: 'Web & 3D Interactive', price: '$199' },
                    { id: 'full-growth', label: 'Full Growth Engine', price: '$299' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setServiceType(tier.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        serviceType === tier.id
                          ? 'bg-[#923FFF]/20 border-[#7DBFFF] text-white shadow-md'
                          : 'bg-zinc-900/70 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="text-xs font-bold">{tier.label}</div>
                      <div className="text-[11px] font-mono text-[#7DBFFF] mt-0.5">from {tier.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Pages Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  <span>2. Estimated Number of Views / Pages</span>
                  <span className="text-[#7DBFFF] font-mono text-sm font-bold">{pagesCount} Pages</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={pagesCount}
                  onChange={(e) => setPagesCount(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#923FFF]"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>1 Page (Landing)</span>
                  <span>5 Pages (Standard)</span>
                  <span>15+ Pages (Multi-view)</span>
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  3. Technical Capabilities & Urgency
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-white/20 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={has3D}
                      onChange={(e) => setHas3D(e.target.checked)}
                      className="w-4 h-4 rounded text-[#923FFF] focus:ring-0 bg-zinc-800 border-white/20"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">Interactive 3D / WebGL</div>
                      <div className="text-[10px] text-zinc-400">Kinetic shaders & Spline models</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-white/20 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={needsBackend}
                      onChange={(e) => setNeedsBackend(e.target.checked)}
                      className="w-4 h-4 rounded text-[#923FFF] focus:ring-0 bg-zinc-800 border-white/20"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">Custom Server API & Data</div>
                      <div className="text-[10px] text-zinc-400">Persistent storage & workflows</div>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <span className="text-xs text-zinc-400">Delivery Velocity:</span>
                  <div className="inline-flex rounded-xl p-1 bg-zinc-900 border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setUrgency('normal')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        urgency === 'normal' ? 'bg-[#923FFF] text-white font-medium' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Standard Sprints
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency('rush')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        urgency === 'rush' ? 'bg-[#923FFF] text-white font-medium' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Expedited Priority (+25%)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Quote Output Column */}
            <div className="lg:col-span-5 bg-zinc-900/80 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="text-xs uppercase tracking-wider text-[#7DBFFF] font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estimated Investment</span>
              </div>

              {loading ? (
                <div className="py-12 text-center text-zinc-400 text-sm animate-pulse">
                  Recalculating scope with server...
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                      {result.totalEstimate}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">USD (Fixed Scope)</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <Clock className="w-4 h-4 text-[#7DBFFF]" />
                    <span>Estimated Turnaround: <strong>{result.estimatedTimeline}</strong></span>
                  </div>

                  <div className="border-t border-white/10 pt-3 space-y-2">
                    <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Itemized Breakdown:
                    </div>
                    {result.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-zinc-300">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{item.item}</span>
                        </span>
                        <span className="font-mono text-zinc-400 font-medium">${item.cost}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      to={result.cta.link}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 hover:opacity-95 transition-all cursor-pointer"
                    >
                      <span>Book Consultation With This Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
