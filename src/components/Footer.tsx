import { useState, type FormEvent } from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  Sparkles, 
  Calendar, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  Phone, 
  MessageSquare,
  Award,
  Globe,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';
import SocialLinks from './SocialLinks';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMsg('Please enter a valid email address.');
      return;
    }

    setNewsletterStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus('success');
        setNewsletterMsg(data.message || 'Subscribed successfully!');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterMsg(data.error || 'Subscription failed. Please try again.');
      }
    } catch {
      setNewsletterStatus('error');
      setNewsletterMsg('Could not connect to server. Please try again later.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Studio & Tools', path: '/studio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Book Appointment', path: '/book-appointment', highlight: true },
    { name: 'Contact', path: '/contact' },
  ];

  const coreServices = [
    'SEO Domination & Audits',
    'High-Performance Web Dev',
    'Kinetic 3D WebGL Experiences',
    'Conversion Optimization (CRO)',
    'Multi-Channel Ad Funnels',
    'Server-Side GA4 Attribution',
  ];

  return (
    <footer id="main-footer" className="relative bg-[#05060f]/90 backdrop-blur-xl border-t border-white/10 overflow-hidden pt-12 pb-12 text-left z-20">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] shadow-md shadow-[#923FFF]/40" />

      {/* Ambient Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-6xl h-48 bg-gradient-to-r from-[#923FFF]/20 via-[#583FFF]/15 to-[#7DBFFF]/20 blur-[120px] -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Visual Live Status & Direct Contact Ribbon */}
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl backdrop-blur-xl mb-12 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Available for New Projects
            </span>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              99+ Core Web Vitals Guaranteed • Worldwide Remote
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Direct WhatsApp Callout */}
            <a
              id="footer-ribbon-whatsapp-btn"
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp: +880 1736683282</span>
            </a>

            {/* Book Appointment CTA */}
            <Link
              id="footer-ribbon-book-btn"
              to="/book-appointment"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-brand text-white text-xs font-bold shadow-lg shadow-[#923FFF]/30 hover:scale-105 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#7DBFFF]" />
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>

        {/* 4-Column Main Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          {/* Column 1: Brand Authority & Certifications (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-brand flex items-center justify-center p-0.5 shadow-lg shadow-[#923FFF]/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-[#7DBFFF] via-[#923FFF] to-white text-lg tracking-tighter">
                    AZ
                  </span>
                </div>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-wider block leading-tight">
                  <span className="text-white font-black">AKTER</span>
                  <span className="text-[var(--color-primary)] font-black drop-shadow-[0_0_12px_var(--color-glow)] ml-0.5">UZZAMAN</span>
                </span>
                <span className="text-[11px] text-[var(--color-accent)] font-medium tracking-wide">
                  Digital Marketer & Creative Web Developer
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Helping businesses dominate organic rankings, engineer bespoke 3D WebGL interfaces, and deploy multi-channel acquisition funnels with verified ROI.
            </p>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-zinc-300">
                <Award className="w-3 h-3 text-[#7DBFFF]" /> Google Ads Certified
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-zinc-300">
                <Award className="w-3 h-3 text-emerald-400" /> Meta Certified Strategist
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-zinc-300">
                <ShieldCheck className="w-3 h-3 text-[#923FFF]" /> 3D WebGL Verified
              </span>
            </div>
          </div>

          {/* Column 2: Pages & Navigation (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7DBFFF]" />
              Navigation
            </h4>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  id={`footer-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  to={link.path}
                  onClick={scrollToTop}
                  className={`text-xs sm:text-sm py-0.5 transition-colors flex items-center gap-1.5 ${
                    link.highlight
                      ? 'text-[#7DBFFF] font-semibold hover:text-white'
                      : 'text-zinc-400 hover:text-[#7DBFFF]'
                  }`}
                >
                  {link.highlight && <Calendar className="w-3 h-3 text-[#7DBFFF]" />}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Core Capabilities & Pricing Quicklinks (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#923FFF]" />
              Expertise
            </h4>
            <div className="flex flex-col space-y-2">
              {coreServices.map((srv) => (
                <Link
                  key={srv}
                  to="/services"
                  onClick={scrollToTop}
                  className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#923FFF]">•</span>
                  <span>{srv}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/pricing"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7DBFFF] hover:text-white transition-colors"
              >
                <span>Calculate Project Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 4: Dedicated WhatsApp Hub & Growth Newsletter (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Prominent WhatsApp Dedicated Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-zinc-900 to-teal-950/40 border border-emerald-500/30 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-[#25D366] flex items-center justify-center shadow-md shadow-emerald-950">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-400 block leading-tight">
                    Direct WhatsApp
                  </span>
                  <span className="text-xs font-mono font-bold text-white block">
                    +880 1736683282
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-300 leading-snug mb-3">
                Immediate chat for project inquiries, quotes, and rapid consulting.
              </p>
              <a
                id="footer-card-whatsapp-link"
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f776a] shadow-md transition-all cursor-pointer"
              >
                <span>Start WhatsApp Chat</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Growth Insights
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-white/10 focus-within:border-emerald-500/60 transition-all">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter work email..."
                    className="w-full px-2.5 py-1 text-xs text-white bg-transparent placeholder:text-zinc-500 focus:outline-none"
                    disabled={newsletterStatus === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-brand hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {newsletterStatus === 'loading' ? '...' : 'Join'}
                  </button>
                </div>
                {newsletterMsg && (
                  <p
                    className={`text-[11px] font-medium ${
                      newsletterStatus === 'success' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {newsletterMsg}
                  </p>
                )}
              </form>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                Official Social Channels
              </span>
              <SocialLinks variant="icons-bar" />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Phone, & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 AKTERUZZAMAN. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-mono text-zinc-300">WhatsApp: +880 1736683282</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="replay-intro-btn"
              onClick={() => {
                sessionStorage.removeItem('ak_entrance_loaded');
                window.dispatchEvent(new CustomEvent('replay-site-entrance'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#923FFF]/40 transition-all cursor-pointer"
              title="Replay cinematic entrance animation"
            >
              <RotateCcw className="w-3 h-3 text-[#7DBFFF]" />
              <span>Replay Intro</span>
            </button>

            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
