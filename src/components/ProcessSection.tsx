import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Layout,
  Code2,
  Zap,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProcessStep {
  number: string;
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  duration: string;
  icon: typeof Compass;
  accentGradient: string;
  borderHover: string;
  overview: string;
  deliverables: string[];
  techStack: string[];
  kpiGoal: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    id: 'discovery',
    title: 'Discovery & Strategic Growth Audit',
    shortTitle: 'Discovery & Audit',
    tagline: 'Deep-dive into audience psychology, search intent, and technical feasibility.',
    duration: 'Days 1 – 3',
    icon: Compass,
    accentGradient: 'from-[#923FFF] to-[#583FFF]',
    borderHover: 'hover:border-[#923FFF]',
    overview:
      'Every high-performing web application starts with empirical data. We analyze your market positioning, competitor keyword gaps, audience funnel bottlenecks, and technical constraints to construct an ironclad blueprint before writing a single line of code.',
    deliverables: [
      'Comprehensive Technical SEO & Competitor Analysis',
      'Target User Journey & High-Intent Funnel Map',
      'Full System Architecture & Milestone Roadmap',
      'Fixed Scope & Transparent Sprint Schedule',
    ],
    techStack: ['SEMrush', 'Ahrefs', 'Google Search Console', 'FigJam', 'Loom Audit'],
    kpiGoal: 'Pinpoint ranking keywords & define conversion baseline',
  },
  {
    number: '02',
    id: 'wireframing',
    title: 'UX/UI Wireframing & 3D Prototyping',
    shortTitle: 'UX/UI & 3D Design',
    tagline: 'Crafting pixel-perfect visual architecture and kinetic micro-interactions.',
    duration: 'Days 4 – 7',
    icon: Layout,
    accentGradient: 'from-[#583FFF] to-[#7DBFFF]',
    borderHover: 'hover:border-[#7DBFFF]',
    overview:
      'We prototype the entire user experience in Figma and explore kinetic 3D WebGL assets. We focus on optical contrast, fluid responsive typography, clear hierarchy, and conversion micro-moments that guide visitors seamlessly toward booking or purchase.',
    deliverables: [
      'High-Fidelity Desktop & Mobile Component Wireframes',
      'Interactive Clickable Figma Prototype for Live Review',
      'Bespoke 3D Kinetic Canvas & Animation Visualizer',
      'Complete Accessible Design Token System',
    ],
    techStack: ['Figma', 'Spline 3D', 'Three.js Shaders', 'Design Tokens', 'Tailwind Specs'],
    kpiGoal: 'Zero design ambiguity with 100% stakeholder alignment',
  },
  {
    number: '03',
    id: 'development',
    title: 'Precision Full-Stack Engineering',
    shortTitle: 'Full-Stack Dev',
    tagline: 'Clean TypeScript, modular React architecture, and sub-second execution.',
    duration: 'Days 8 – 14',
    icon: Code2,
    accentGradient: 'from-[#7DBFFF] to-[#10b981]',
    borderHover: 'hover:border-emerald-400',
    overview:
      'Transforming approved prototypes into ultra-fast, production-ready code. We build with React 19, TypeScript, Tailwind CSS, Express backend APIs, and hardware-accelerated WebGL visuals — adhering strictly to clean modular architecture with zero bloat.',
    deliverables: [
      'Clean, Strictly Typed TypeScript & Modular Component Base',
      'Interactive Three.js & Framer Motion Kinetic Physics',
      'RESTful Server APIs, Booking Calendars & Form Integrations',
      'Private Staging URL for Real-Time Client Feedback',
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Express', 'Vite'],
    kpiGoal: 'Flawless 60fps animations with instant client-side routing',
  },
  {
    number: '04',
    id: 'optimization',
    title: 'Speed Optimization & Conversion QA',
    shortTitle: 'Speed & QA Audit',
    tagline: 'Sub-second load times, 95+ Core Web Vitals, and multi-device stress testing.',
    duration: 'Days 15 – 17',
    icon: Zap,
    accentGradient: 'from-[#10b981] to-[#f59e0b]',
    borderHover: 'hover:border-amber-400',
    overview:
      'Speed directly drives revenue. We run deep performance profiling, lazy loading, asset compression, structured JSON-LD schema audits, accessibility contrast checks (WCAG AA), and end-to-end form verification across all major browsers and devices.',
    deliverables: [
      'Core Web Vitals 95+ Desktop & Mobile Guarantee',
      'Structured JSON-LD Schema for Rich Search Results',
      'End-to-End Cross-Device & Cross-Browser Validation',
      'GA4 Enhanced E-commerce & Conversion Tagging',
    ],
    techStack: ['Google PageSpeed', 'Lighthouse CI', 'Schema.org', 'GA4 GTM', 'BrowserStack'],
    kpiGoal: 'Score 95+ on Google PageSpeed with zero critical errors',
  },
  {
    number: '05',
    id: 'launch',
    title: 'Deployment, Launch & Growth Scaling',
    shortTitle: 'Launch & Scaling',
    tagline: 'Zero-downtime container rollout, live indexing, and ongoing scaling support.',
    duration: 'Day 18 Onward',
    icon: Rocket,
    accentGradient: 'from-[#f59e0b] to-[#923FFF]',
    borderHover: 'hover:border-[#923FFF]',
    overview:
      'We orchestrate a seamless deployment with automated CI/CD pipelines, SSL provisioning, domain DNS routing, and Google Search Console sitemap indexing. Post-launch, we monitor analytics, user interactions, and offer ongoing growth retainers.',
    deliverables: [
      'Production Cloud Run / Vercel Container Deployment',
      'Custom Domain DNS & SSL Certificate Verification',
      'Search Console Indexing & XML Sitemap Submission',
      '30-Day Post-Launch Warranty & Growth Retainer Options',
    ],
    techStack: ['Cloud Run', 'Vercel', 'Docker', 'Google Search Console', 'Hotjar'],
    kpiGoal: 'Smooth zero-downtime launch and rapid organic indexing',
  },
];

export default function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <section
      id="process"
      aria-label="Design and Development Process"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-r from-[#923FFF]/20 via-[#583FFF]/15 to-[#7DBFFF]/20 blur-[130px] -z-10"
      />

      {/* Section Header (sajibbaig.com style) */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
            Proven 5-Step Workflow
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading"
        >
          How We Deliver{' '}
          <span className="bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] bg-clip-text text-transparent">
            High-Converting Platforms
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-400 leading-relaxed"
        >
          A transparent, milestone-driven framework engineered to turn your vision into an interactive, revenue-generating reality on time and on budget.
        </motion.p>
      </div>

      {/* Process Interactive Step Switcher Tabs (Desktop & Tablet) */}
      <div className="hidden md:grid grid-cols-5 gap-3 mb-10">
        {PROCESS_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.id}
              id={`process-step-tab-${step.id}`}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer group ${
                isActive
                  ? 'bg-zinc-900 border-[#923FFF] shadow-xl shadow-[#923FFF]/20 ring-1 ring-[#923FFF]'
                  : 'bg-zinc-950/60 border-white/10 hover:border-white/20 hover:bg-zinc-900/60'
              }`}
            >
              {/* Top Row: Step Number + Icon */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`font-mono text-xs font-black tracking-wider ${
                    isActive ? 'text-[var(--color-accent)]' : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                >
                  PHASE {step.number}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-gradient-brand text-white shadow-md shadow-[#923FFF]/40'
                      : 'bg-white/5 text-zinc-400 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Duration */}
              <h3 className="text-xs sm:text-sm font-bold text-white mb-1 line-clamp-1">
                {step.shortTitle}
              </h3>
              <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {step.duration}
              </span>

              {/* Active Indicator Underline */}
              {isActive && (
                <motion.div
                  layoutId="process-active-indicator"
                  className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-brand rounded-full shadow-[0_0_8px_var(--color-primary)]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Featured Active Step Card (Detailed Deep-Dive Console) */}
      <div className="rounded-3xl bg-zinc-950/80 border border-white/15 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
          >
            {/* Left Column: Phase Description & Deliverables (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-gradient-brand text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                  Phase {activeStep.number}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--color-accent)]">
                  <Clock className="w-3 h-3" />
                  {activeStep.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  Milestone Verified
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeStep.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-accent)] font-medium mt-1">
                  {activeStep.tagline}
                </p>
              </div>

              {/* Overview Text */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {activeStep.overview}
              </p>

              {/* Key Concrete Deliverables */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  Key Phase Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStep.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-zinc-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key KPI, Tooling, & CTA Box (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary KPI Target Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#120d24] via-zinc-900 to-zinc-950 border border-[#923FFF]/40 shadow-xl space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white shadow-md">
                    <ActiveIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block leading-tight">
                      Phase Success Metric
                    </span>
                    <span className="text-xs font-bold text-white block">
                      Target Outcome
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed bg-black/40 p-3 rounded-xl border border-white/10">
                  🎯 {activeStep.kpiGoal}
                </p>
              </div>

              {/* Tooling & Frameworks Applied */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  Tools &amp; Frameworks Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeStep.techStack.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Process Consultation CTA */}
              <div className="p-6 rounded-2xl bg-zinc-900/90 border border-white/15 text-center space-y-3">
                <p className="text-xs text-zinc-400">
                  Ready to kick off <strong>Phase 01</strong> for your business?
                </p>
                <Link
                  id="process-book-call-btn"
                  to={`/book-appointment?service=${encodeURIComponent(activeStep.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-brand shadow-lg shadow-[#923FFF]/30 hover:scale-105 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#7DBFFF]" />
                  <span>Schedule Phase 01 Discovery Call</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Step Pagination Buttons (sm screens) */}
        <div className="flex md:hidden items-center justify-between pt-6 mt-6 border-t border-white/10">
          <button
            disabled={activeStepIndex === 0}
            onClick={() => setActiveStepIndex((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-300 bg-white/5 border border-white/10 disabled:opacity-30 cursor-pointer"
          >
            ← Previous Phase
          </button>
          <span className="text-xs font-mono text-zinc-400">
            {activeStepIndex + 1} of {PROCESS_STEPS.length}
          </span>
          <button
            disabled={activeStepIndex === PROCESS_STEPS.length - 1}
            onClick={() =>
              setActiveStepIndex((prev) => Math.min(prev + 1, PROCESS_STEPS.length - 1))
            }
            className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-brand disabled:opacity-30 cursor-pointer"
          >
            Next Phase →
          </button>
        </div>
      </div>
    </section>
  );
}
