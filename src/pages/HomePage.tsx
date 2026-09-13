import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import ProjectsSection from '../components/ProjectsSection';
import HomepagePricing from '../components/HomepagePricing';
import FAQSection from '../components/FAQSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import CreativeStudioSection from '../components/CreativeStudioSection';
import { Calendar, ArrowRight, Sparkles, Clock, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HomePageProps {
  onNavigate?: (sectionId: string) => void;
  onSelectServiceOrPlan?: (subjectTitle: string) => void;
  contactSubject?: string;
}

export default function HomePage({
  onNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  },
  onSelectServiceOrPlan,
  contactSubject = '',
}: HomePageProps = {}) {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState<any>(null);

  const handleSelectServiceOrPlan = (subjectTitle: string) => {
    if (onSelectServiceOrPlan) {
      onSelectServiceOrPlan(subjectTitle);
    }
    navigate(`/book-appointment?service=${encodeURIComponent(subjectTitle)}`);
  };

  useEffect(() => {
    fetch('/api/home')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHomeData(data);
        }
      })
      .catch(() => {});
  }, []);

  const nextSlot = homeData?.liveStatus?.nextSlotDate || 'Tomorrow';

  return (
    <div id="home-page-container">
      {/* Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* Floating Appointment Banner CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-16 relative z-20">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#18112c]/90 to-zinc-900/90 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center p-0.5 flex-shrink-0 shadow-lg shadow-[#923FFF]/30">
              <div className="w-full h-full bg-black/80 rounded-[14px] flex items-center justify-center">
                <Calendar className="w-7 h-7 text-[#7DBFFF]" />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Availability: {nextSlot}
                </span>
                <span className="text-xs text-zinc-400">Free 20-min consultation</span>
                <span className="text-xs text-emerald-400 hidden sm:inline font-mono">• WhatsApp: {PERSONAL_INFO.whatsapp}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Schedule a 1-on-1 Consultation with AKTERUZZAMAN
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Discuss your project roadmap, SEO opportunities, 3D web visuals, or marketing strategy.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              id="home-banner-whatsapp-quick"
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/30 shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>

            <Link
              id="home-banner-book-appointment-btn"
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] shadow-xl shadow-[#923FFF]/30 hover:shadow-[#923FFF]/60 hover:scale-105 transition-all duration-300 flex-shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#7DBFFF]" />
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <ServicesSection onSelectService={handleSelectServiceOrPlan} />

      {/* Process Section (sajibbaig.com style) */}
      <ProcessSection />

      {/* About Section */}
      <AboutSection onNavigate={onNavigate} />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection onContactProject={handleSelectServiceOrPlan} />

      {/* Creative Studio & Free Resources Section (apurboshilsobuj feature) */}
      <CreativeStudioSection />

      {/* Homepage Pricing: Starting Prices by Category */}
      <HomepagePricing onSelectPlan={handleSelectServiceOrPlan} />

      {/* FAQ Section */}
      <FAQSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Section (Added to Homepage) */}
      <BlogSection limit={3} showFilters={true} />

      {/* Contact Section */}
      <ContactSection initialSubject={contactSubject} />
    </div>
  );
}
