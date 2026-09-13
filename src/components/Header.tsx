import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  Calendar,
  ShieldCheck,
  ChevronDown,
  TrendingUp,
  Code2,
  Target,
  BarChart3,
  Cpu,
  Sparkles,
  BookOpen,
  LogIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClientPortalModal from './ClientPortalModal';
import ThemeColorSwitcher from './ThemeColorSwitcher';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const SERVICE_DROPDOWN_ITEMS = [
  {
    title: 'Digital Marketing & SEO',
    desc: 'Technical SEO audits, semantic search authority & high-intent organic scaling',
    icon: TrendingUp,
    path: '/services',
    category: 'Digital Marketing',
    badge: 'Top Ranked',
  },
  {
    title: 'Web Design & Development',
    desc: 'Ultra-fast React 19/Next.js architectures, 3D WebGL visuals & responsive UX',
    icon: Code2,
    path: '/services',
    category: 'Web Development',
    badge: '99+ PageSpeed',
  },
  {
    title: 'Paid Advertising & PPC',
    desc: 'High-ROAS Meta campaigns, Google Search/Shopping & multi-channel funnels',
    icon: Target,
    path: '/services',
    category: 'Paid Advertising',
    badge: '6x+ ROAS',
  },
  {
    title: 'CRO & Web Analytics',
    desc: 'A/B testing, GA4 server-side GTM pipelines, heatmaps & friction removal',
    icon: BarChart3,
    path: '/services',
    category: 'Analytics & CRO',
    badge: 'Data Driven',
  },
  {
    title: 'AI Automation & Intelligent Workflows',
    desc: 'Custom AI chatbots, automated lead capture pipelines & CRM integrations',
    icon: Cpu,
    path: '/services',
    category: 'AI & Automation',
    badge: 'AI Powered',
  },
];

export default function Header({ activeSection: propActiveSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [clientPortalOpen, setClientPortalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(propActiveSection || 'hero');
  const servicesDropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { themeMode } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t('nav.home'), id: 'hero', path: '/' },
    { name: t('nav.services'), id: 'services', path: '/services', hasDropdown: true },
    { name: t('nav.process'), id: 'process', path: '/process' },
    { name: t('nav.about'), id: 'about', path: '/about' },
    { name: t('nav.skills'), id: 'skills', path: '/skills' },
    { name: t('nav.projects'), id: 'projects', path: '/projects' },
    { name: t('nav.blog'), id: 'blog', path: '/blog' },
    { name: t('nav.studio'), id: 'creative-studio', path: '/studio' },
    { name: t('nav.pricing'), id: 'pricing', path: '/pricing' },
    { name: t('nav.faq'), id: 'faq', path: '/faq' },
    { name: t('nav.reviews'), id: 'testimonials', path: '/reviews' },
    { name: t('nav.contact'), id: 'contact', path: '/contact' },
  ];

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy when on homepage
      if (location.pathname === '/') {
        const sections = ['hero', ...navLinks.map((l) => l.id)];
        const scrollPosition = window.scrollY + 140;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (link: { name: string; id: string; path: string }) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (location.pathname === link.path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(link.path);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleMouseEnterServices = () => {
    if (servicesDropdownTimerRef.current) {
      clearTimeout(servicesDropdownTimerRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    servicesDropdownTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? themeMode === 'light'
              ? 'py-2.5 sm:py-3 bg-white/95 backdrop-blur-2xl border-b border-zinc-200 shadow-md text-zinc-900'
              : 'py-2.5 sm:py-3 bg-zinc-950/92 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80 text-white'
            : themeMode === 'light'
              ? 'py-3 sm:py-4 bg-white/80 backdrop-blur-md border-b border-zinc-200/50 text-zinc-900'
              : 'py-3 sm:py-4 bg-zinc-950/70 backdrop-blur-md border-b border-white/5 text-white'
        }`}
      >
        {/* Full Width Container */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between gap-3">
          {/* Left: Two-Color Brand Identity Mark */}
          <Link
            id="logo-brand-btn"
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('hero');
              }
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
            data-cursor="pointer"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-brand flex items-center justify-center p-0.5 shadow-lg shadow-[var(--color-glow)] group-hover:scale-105 transition-transform duration-300">
              <div className={`w-full h-full ${themeMode === 'light' ? 'bg-white' : 'bg-black'} rounded-[10px] sm:rounded-[14px] flex items-center justify-center`}>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-[var(--color-accent)] via-[var(--color-primary)] to-white text-sm sm:text-base tracking-tighter">
                  AZ
                </span>
              </div>
            </div>
            <div>
              {/* Two-Color Name: AKTER (White/Black) + UZZAMAN (Vibrant Accent Color) */}
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider block leading-tight transition-colors duration-200">
                <span className={themeMode === 'light' ? 'text-zinc-950 font-black' : 'text-white font-black'}>
                  AKTER
                </span>
                <span className="text-[var(--color-primary)] font-black drop-shadow-[0_0_12px_var(--color-glow)] ml-0.5">
                  UZZAMAN
                </span>
              </span>
              <span className="hidden sm:block text-[9px] sm:text-[10px] tracking-widest text-[var(--color-accent)] uppercase font-mono font-bold">
                Digital Marketer & Developer
              </span>
            </div>
          </Link>

          {/* Center: Floating Glass Pill Navbar (Desktop) with sajibbaig.com style Services dropdown */}
          <nav
            id="desktop-navbar"
            className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full glass-panel border border-white/10 shadow-xl backdrop-blur-xl"
          >
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path !== '/' && location.pathname.startsWith(link.path)) ||
                (location.pathname === '/' && link.path === '/' && activeSection === link.id);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <button
                      id={`nav-link-${link.id}`}
                      onClick={() => handleNavClick(link)}
                      data-cursor="pointer"
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 relative ${
                        isActive
                          ? themeMode === 'light'
                            ? 'text-zinc-900 font-bold bg-black/5 border border-black/15 shadow-sm'
                            : 'text-white font-bold bg-[var(--color-primary)]/25 border border-[var(--color-primary)]/50 shadow-sm shadow-[var(--color-glow)]'
                          : themeMode === 'light'
                            ? 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'
                            : 'text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                        }`}
                      />
                    </button>

                    {/* sajibbaig.com style Services Mega Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] rounded-2xl border shadow-2xl p-3 z-50 backdrop-blur-2xl ${
                            themeMode === 'light'
                              ? 'bg-white/98 border-zinc-200 text-zinc-900 shadow-zinc-300/60'
                              : 'bg-zinc-950/98 border-white/15 text-white shadow-black/95'
                          }`}
                        >
                          <div className="px-3 py-2 border-b border-white/10 dark:border-white/10 flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Specialized Client Services
                            </span>
                            <span className="text-[10px] text-zinc-400 font-mono">5 Core Competencies</span>
                          </div>

                          <div className="grid grid-cols-1 gap-1.5 py-2">
                            {SERVICE_DROPDOWN_ITEMS.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.title}
                                  to={item.path}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group ${
                                    themeMode === 'light'
                                      ? 'hover:bg-zinc-100 text-zinc-800'
                                      : 'hover:bg-white/10 text-zinc-200'
                                  }`}
                                >
                                  <div className="p-2 rounded-lg bg-[var(--color-primary)]/15 text-[var(--color-accent)] border border-[var(--color-primary)]/30 group-hover:scale-105 group-hover:bg-[var(--color-primary)] group-hover:text-black transition-all">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <h4 className="text-xs font-bold text-[var(--theme-fg)] group-hover:text-[var(--color-primary)] transition-colors">
                                        {item.title}
                                      </h4>
                                      <span className="text-[9px] px-2 py-0.5 rounded font-mono font-semibold bg-[var(--color-primary)]/10 text-[var(--color-accent)] border border-[var(--color-primary)]/25 shrink-0">
                                        {item.badge}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 leading-snug">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between px-2">
                            <Link
                              to="/services"
                              onClick={() => setServicesDropdownOpen(false)}
                              className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1"
                            >
                              <span>Explore All Services & Packages</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                            <div className="flex items-center gap-3">
                              <Link
                                to="/faq"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="text-[11px] font-medium text-zinc-400 hover:text-[var(--color-primary)] transition-colors"
                              >
                                FAQ
                              </Link>
                              <Link
                                to="/book-appointment"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="text-[11px] font-mono text-zinc-400 hover:text-white"
                              >
                                Book Consultation →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link)}
                  data-cursor="pointer"
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer relative ${
                    isActive
                      ? themeMode === 'light'
                        ? 'text-zinc-900 font-bold bg-black/5 border border-black/15 shadow-sm'
                        : 'text-white font-bold bg-[var(--color-primary)]/25 border border-[var(--color-primary)]/50 shadow-sm shadow-[var(--color-glow)]'
                      : themeMode === 'light'
                        ? 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'
                        : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Switcher + CTA + Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Theme & Mode Switcher Pill */}
            <div className="hidden md:flex items-center">
              <ThemeColorSwitcher />
            </div>

            {/* Client & Trainee Login Pill Button (sajibbaig.com style) */}
            <button
              id="header-login-btn"
              onClick={() => setClientPortalOpen(true)}
              data-cursor="pointer"
              title="Client & Trainee Portal Login"
              className="hidden lg:flex group relative px-3.5 py-1.5 rounded-full glass-pill border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--theme-fg)] hover:bg-[var(--color-primary)]/20 hover:border-[var(--color-accent)] transition-all items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wide">{t('nav.login')}</span>
            </button>

            {/* Primary Action: Book Appointment CTA */}
            <Link
              id="header-book-appointment-btn"
              to="/book-appointment"
              data-cursor="book"
              onClick={() => {
                if (location.pathname === '/book-appointment') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold text-white bg-gradient-brand hover:shadow-[0_0_24px_var(--color-glow)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md cursor-pointer border border-white/15 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('nav.bookAppointment')}</span>
              <span className="inline sm:hidden">{t('nav.book')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80 hidden sm:inline" />
            </Link>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              data-cursor="pointer"
              className={`xl:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all cursor-pointer shrink-0 ${
                themeMode === 'light'
                  ? 'bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 shadow-sm'
                  : 'bg-zinc-900/90 hover:bg-zinc-800 border border-white/20 text-white shadow-md'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-red-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop overlay: gentle, non-oppressive blur that does not overly darken the page */}
              <motion.div
                key="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 top-[60px] bg-black/30 backdrop-blur-[2px] z-40 xl:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                key="mobile-dropdown-menu"
                id="mobile-dropdown-menu"
                initial={{ opacity: 0, y: -15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`fixed top-[64px] left-3 right-3 sm:left-6 sm:right-6 max-w-lg mx-auto z-50 xl:hidden p-4 sm:p-5 rounded-3xl border shadow-2xl overflow-hidden max-h-[calc(100vh-80px)] flex flex-col ${
                  themeMode === 'light'
                    ? 'bg-white/98 border-zinc-200 text-zinc-900 shadow-xl'
                    : 'bg-zinc-950/98 border-white/20 text-white shadow-2xl'
                }`}
              >
                {/* Header inside mobile drawer: Theme Switcher & Clearly Visible Close Button */}
                <div className="pb-3 mb-2 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <ThemeColorSwitcher showLabels={false} />
                  </div>
                  <button
                    id="mobile-drawer-close-btn"
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      themeMode === 'light'
                        ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                    aria-label="Close navigation menu"
                  >
                    <X className="w-4 h-4 text-red-400" />
                    <span className="text-[11px] font-bold">Close</span>
                  </button>
                </div>

                {/* Nav Links scrollable list */}
                <div className="flex flex-col gap-1 overflow-y-auto py-1 pr-1">
                  {navLinks.map((link) => {
                    const isActive =
                      location.pathname === link.path ||
                      (link.path !== '/' && location.pathname.startsWith(link.path)) ||
                      (location.pathname === '/' && link.path === '/' && activeSection === link.id);

                    if (link.hasDropdown) {
                      return (
                        <div key={link.id} className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <button
                              id={`mobile-nav-${link.id}`}
                              onClick={() => handleNavClick(link)}
                              className={`flex-1 px-3.5 py-2.5 text-sm font-semibold rounded-2xl text-left transition-all flex items-center justify-between cursor-pointer ${
                                isActive
                                  ? 'bg-gradient-brand text-white shadow-md shadow-[var(--color-glow)] font-bold'
                                  : themeMode === 'light'
                                    ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <span>{link.name}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setMobileServicesOpen((prev) => !prev)}
                              className="p-2.5 text-zinc-400 hover:text-white"
                              aria-label="Toggle services list"
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                            </button>
                          </div>

                          {/* Mobile Services Accordion */}
                          {mobileServicesOpen && (
                            <div className="pl-4 pr-2 py-2 space-y-1 bg-black/20 rounded-xl my-1">
                              {SERVICE_DROPDOWN_ITEMS.map((s) => (
                                <Link
                                  key={s.title}
                                  to={s.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-1.5 text-xs text-zinc-300 hover:text-[var(--color-primary)] transition-colors"
                                >
                                  • {s.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={link.id}
                        id={`mobile-nav-${link.id}`}
                        onClick={() => handleNavClick(link)}
                        className={`px-3.5 py-2.5 text-sm font-semibold rounded-2xl text-left transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-gradient-brand text-white shadow-md shadow-[var(--color-glow)] font-bold'
                            : themeMode === 'light'
                              ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                              : 'text-zinc-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-3 mt-2 border-t border-zinc-200 dark:border-white/10 flex flex-col gap-2 shrink-0">
                  <button
                    id="mobile-header-login-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setClientPortalOpen(true);
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      themeMode === 'light'
                        ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-white/15'
                    }`}
                  >
                    <LogIn className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>Client &amp; Trainee Login</span>
                  </button>

                  <Link
                    id="mobile-book-appointment-btn"
                    to="/book-appointment"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-brand shadow-lg shadow-[var(--color-glow)] active:scale-98 transition-transform"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book 1-on-1 Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Client Portal Modal */}
      <ClientPortalModal
        isOpen={clientPortalOpen}
        onClose={() => setClientPortalOpen(false)}
        onOpenBooking={() => navigate('/book-appointment')}
      />
    </>
  );
}



