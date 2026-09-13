import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

const LOADING_STAGES = [
  { pct: 15, tag: '01 / CORE', label: 'INITIALIZING THREE.JS 3D CANVAS & SHADERS' },
  { pct: 45, tag: '02 / ASSETS', label: 'PREFETCHING PORTFOLIO ASSETS & OPTIMIZED MEDIA' },
  { pct: 75, tag: '03 / ENGINE', label: 'HYDRATING FAST REACT & VITE SPA RUNTIME' },
  { pct: 95, tag: '04 / DEPLOY', label: 'ESTABLISHING SECURE PROTOCOLS & API ROUTERS' },
  { pct: 100, tag: '05 / READY', label: 'AKTERUZZAMAN DIGITAL EXPERIENCE ONLINE' },
];

export default function SiteEntranceLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    // Check if user already saw the entrance loader in this browser session
    const hasLoaded = sessionStorage.getItem('ak_entrance_loaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Allow replaying entrance via custom event
    const handleReplay = () => {
      setProgress(0);
      setStageIndex(0);
      setLoading(true);
    };
    window.addEventListener('replay-site-entrance', handleReplay);

    return () => {
      window.removeEventListener('replay-site-entrance', handleReplay);
    };
  }, []);

  // Smooth, high-speed percentage counter interpolation (~1.1s total)
  useEffect(() => {
    if (!loading) return;

    let current = 0;
    const interval = setInterval(() => {
      // Dynamic velocity: starts deliberate, accelerates in middle, lands crisp at 100
      const increment = current < 30 ? 7 : current < 70 ? 11 : current < 92 ? 8 : 4;
      current += increment;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStageIndex(LOADING_STAGES.length - 1);
        clearInterval(interval);

        // Brief split-second pause at 100% before the multi-blade shutter wipe
        const timer = setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('ak_entrance_loaded', 'true');
        }, 320);

        return () => clearTimeout(timer);
      } else {
        setProgress(current);
        const stage = LOADING_STAGES.findIndex((s) => current <= s.pct);
        setStageIndex(stage === -1 ? LOADING_STAGES.length - 1 : stage);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [loading]);

  const handleSkip = () => {
    setProgress(100);
    setLoading(false);
    sessionStorage.setItem('ak_entrance_loaded', 'true');
  };

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    if (!loading) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <div
          id="site-entrance-loader-root"
          className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden select-none"
        >
          {/* ========================================================================= */}
          {/* SAJIBBAIG.COM STYLE STAGGERED MULTI-BLADE SHUTTER CURTAIN PANELS         */}
          {/* ========================================================================= */}

          {/* Blade 0: Neon Accent Leading Glow Ribbon */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0 },
            }}
            className="absolute inset-0 bg-gradient-to-b from-[#923FFF]/40 via-[#583FFF]/25 to-transparent pointer-events-none z-10"
          />

          {/* Blade 1 (Left 25% Column) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.04 },
            }}
            className="absolute top-0 bottom-0 left-0 w-1/4 bg-[#090b10] border-r border-white/5 z-20 hidden md:block"
          />

          {/* Blade 2 (Center-Left 25% Column) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.08 },
            }}
            className="absolute top-0 bottom-0 left-1/4 w-1/4 bg-[#080a0e] border-r border-white/5 z-20 hidden md:block"
          />

          {/* Blade 3 (Center-Right 25% Column) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.12 },
            }}
            className="absolute top-0 bottom-0 left-2/4 w-1/4 bg-[#08090d] border-r border-white/5 z-20 hidden md:block"
          />

          {/* Blade 4 (Right 25% Column) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.16 },
            }}
            className="absolute top-0 bottom-0 left-3/4 w-1/4 bg-[#06070b] z-20 hidden md:block"
          />

          {/* Main Primary Content Container Curtain (Full screen on mobile, overlays blades on exit) */}
          <motion.div
            id="site-entrance-curtain"
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.78, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
            }}
            className="absolute inset-0 bg-[#07090e] z-30 flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden"
          >
            {/* Background Subtle Cyber Matrix Grid */}
            <div className="absolute inset-0 subtle-grid opacity-25 pointer-events-none" />

            {/* Glowing Accent Ambient Spheres */}
            <div
              aria-hidden="true"
              className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#923FFF]/20 via-[#583FFF]/15 to-[#7DBFFF]/20 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Top Navigation Bar & Status Telemetry */}
            <div className="relative z-40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#923FFF] to-[#7DBFFF] p-0.5 shadow-lg shadow-[#923FFF]/40 flex items-center justify-center">
                  <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
                    <span className="font-mono font-black text-xs text-white">AK</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                    AKTERUZZAMAN
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    DIGITAL ARCHITECT &amp; MARKETER
                  </span>
                </div>
              </div>

              {/* Skip Intro CTA Button */}
              <button
                type="button"
                onClick={handleSkip}
                className="group flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white px-4 py-2 rounded-full border border-white/15 hover:border-[#7DBFFF]/60 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all cursor-pointer shadow-sm"
              >
                <span>Skip Intro</span>
                <span className="text-[10px] text-zinc-500 font-normal hidden sm:inline">[ESC]</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7DBFFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Center Stage: Hero Typography & Animated Monogram */}
            <div className="relative z-40 max-w-4xl mx-auto w-full text-center space-y-6 my-auto">
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#7DBFFF]"
              >
                <Zap className="w-3.5 h-3.5 text-[#923FFF] animate-pulse" />
                <span>{LOADING_STAGES[stageIndex].tag}</span>
                <span className="text-zinc-500">|</span>
                <span className="text-zinc-300 tracking-wide">
                  {LOADING_STAGES[stageIndex].label}
                </span>
              </motion.div>

              <div className="space-y-3">
                <motion.h1
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-heading"
                >
                  AKTER
                  <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent ml-2">
                    UZZAMAN
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-xs sm:text-base font-mono tracking-widest uppercase text-zinc-400 max-w-xl mx-auto"
                >
                  Creative Web Developer &amp; Performance Marketing Specialist
                </motion.p>
              </div>
            </div>

            {/* Bottom Footer: Massive sajibbaig.com Style Numeric Counter & High-Definition Progress Bar */}
            <div className="relative z-40 w-full max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    <Terminal className="w-3.5 h-3.5 text-[#7DBFFF]" />
                    <span>SYSTEM RUNTIME 2026 // ALL SYSTEMS GREEN</span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-500 hidden sm:block">
                    Full-Stack SPAs • 3D Kinetic Shaders • SEO Growth Funnels
                  </p>
                </div>

                {/* Giant Numeric Counter */}
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter text-white tabular-nums drop-shadow-[0_0_35px_rgba(146,63,255,0.4)]">
                    {progress.toString().padStart(2, '0')}
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#7DBFFF]">
                    %
                  </span>
                </div>
              </div>

              {/* High-Definition High-Speed Laser Progress Bar */}
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] rounded-full shadow-[0_0_20px_#923FFF]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

