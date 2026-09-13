import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

interface RouteMeta {
  num: string;
  title: string;
  subtitle: string;
}

const ROUTE_DIRECTORY: Record<string, RouteMeta> = {
  '/': {
    num: '01',
    title: 'HOME',
    subtitle: 'Architecting High-Conversion Digital Engines',
  },
  '/services': {
    num: '02',
    title: 'SERVICES & SOLUTIONS',
    subtitle: 'Technical SEO, Web Development & Growth',
  },
  '/process': {
    num: '03',
    title: 'PROCESS METHODOLOGY',
    subtitle: '5-Stage Strategic Execution Framework',
  },
  '/about': {
    num: '04',
    title: 'ABOUT AKTERUZZAMAN',
    subtitle: 'Engineer, Marketer & Strategist',
  },
  '/skills': {
    num: '05',
    title: 'TECHNICAL SKILLS',
    subtitle: 'Full-Stack Web & Performance Marketing',
  },
  '/projects': {
    num: '06',
    title: 'CASE STUDIES & WORK',
    subtitle: 'High-Impact Verified Client Proof',
  },
  '/blog': {
    num: '07',
    title: 'ENGINEERING BLOG',
    subtitle: 'Technical Insights & Growth Playbooks',
  },
  '/studio': {
    num: '08',
    title: 'CREATIVE STUDIO',
    subtitle: 'Interactive Marketing & Design Utilities',
  },
  '/pricing': {
    num: '09',
    title: 'INVESTMENT PLANS',
    subtitle: 'Transparent Fixed-Price Milestones',
  },
  '/reviews': {
    num: '10',
    title: 'CLIENT REVIEWS',
    subtitle: 'Verified 5.0-Star Testimonials',
  },
  '/faq': {
    num: '11',
    title: 'FREQUENTLY ASKED QUESTIONS',
    subtitle: 'Direct Answers to Common Inquiries',
  },
  '/contact': {
    num: '12',
    title: 'PRIORITY CONTACT',
    subtitle: 'Guaranteed 24-Hour Project Response',
  },
  '/book-appointment': {
    num: '13',
    title: 'SCHEDULE CONSULTATION',
    subtitle: 'Real-Time 1-on-1 Calendar Booking',
  },
};

export default function PageTransitionIndicator() {
  const { pathname } = useLocation();
  const [activeMeta, setActiveMeta] = useState<RouteMeta>(
    ROUTE_DIRECTORY[pathname] || {
      num: '00',
      title: 'AKTERUZZAMAN',
      subtitle: 'Growth Engineering & Web Development',
    }
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [laserProgress, setLaserProgress] = useState(0);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Avoid triggering shutter on initial cold mount (SiteEntranceLoader handles that)
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const currentMeta = ROUTE_DIRECTORY[pathname] || {
      num: '00',
      title: pathname.replace('/', '').toUpperCase().replace('-', ' ') || 'PAGE',
      subtitle: 'Akteruzzaman Growth Engineering',
    };

    setActiveMeta(currentMeta);
    setIsTransitioning(true);
    setLaserProgress(30);

    // Notify performance listeners (Three.js canvas) to pause heavy background loops
    window.dispatchEvent(new CustomEvent('page-transition-start'));

    // Prevent background scrolling while the shutter is passing
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const laserMidTimer = setTimeout(() => {
      setLaserProgress(85);
    }, 120);

    // At exact middle of wipe (~220ms), screen is 100% covered: instant scroll reset
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setLaserProgress(100);
    }, 220);

    // Complete transition and unlock scroll
    const endTimer = setTimeout(() => {
      setIsTransitioning(false);
      setLaserProgress(0);
      document.body.style.overflow = originalOverflow;
      window.dispatchEvent(new CustomEvent('page-transition-end'));
    }, 500);

    return () => {
      clearTimeout(laserMidTimer);
      clearTimeout(scrollTimer);
      clearTimeout(endTimer);
      document.body.style.overflow = originalOverflow;
      window.dispatchEvent(new CustomEvent('page-transition-end'));
    };
  }, [pathname]);

  return (
    <>
      {/* Top High-Velocity Laser Line (sajibbaig.com style) */}
      <AnimatePresence>
        {laserProgress > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed top-0 left-0 right-0 z-[99998] pointer-events-none h-[2.5px] overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] transition-all duration-180 ease-out shadow-[0_0_16px_#923FFF]"
              style={{ width: `${laserProgress}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Dual-Blade Shutter Curtain (sajibbaig.com transition) */}
      <AnimatePresence>
        {isTransitioning && (
          <div
            id="page-shutter-transition-root"
            className="fixed inset-0 z-[99990] pointer-events-none overflow-hidden select-none"
          >
            {/* Trailing Accent Neon Blade */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: ['100%', '0%', '-100%'] }}
              transition={{
                duration: 0.48,
                times: [0, 0.46, 1],
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-0 bg-gradient-to-b from-[#923FFF]/40 via-[#583FFF]/30 to-[#7DBFFF]/20 border-t border-[#7DBFFF]/40 z-10"
            />

            {/* Primary Dark Obsidian Shutter with Destination Title */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: ['100%', '0%', '-100%'] }}
              transition={{
                duration: 0.50,
                times: [0, 0.46, 1],
                ease: [0.76, 0, 0.24, 1],
                delay: 0.02,
              }}
              className="absolute inset-0 bg-[#07090e] z-20 flex flex-col items-center justify-center p-6 text-center shadow-2xl border-t border-b border-[#923FFF]/30"
            >
              {/* Subtle background matrix grid */}
              <div className="absolute inset-0 subtle-grid opacity-20 pointer-events-none" />

              {/* Glowing Accent Radial */}
              <div className="absolute w-[450px] h-[300px] bg-gradient-to-tr from-[#923FFF]/25 to-[#7DBFFF]/20 rounded-full blur-[90px] pointer-events-none" />

              {/* Monospace Route Badge */}
              <div className="relative z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#7DBFFF] mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#923FFF] animate-spin" />
                <span>// ROUTE [ {activeMeta.num} / 13 ]</span>
              </div>

              {/* Bold Destination Title */}
              <h2 className="relative z-30 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-heading mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {activeMeta.title}
              </h2>

              {/* Subtitle */}
              <p className="relative z-30 text-xs sm:text-sm font-mono tracking-wider text-zinc-400 uppercase max-w-md">
                {activeMeta.subtitle}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
