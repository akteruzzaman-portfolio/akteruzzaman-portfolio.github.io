import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import WhatsAppButton from './components/WhatsAppButton';
import SpotlightBackground from './components/SpotlightBackground';
import ThreeCanvasBackground from './components/ThreeCanvasBackground';
import CustomCursor from './components/CustomCursor';
import SiteEntranceLoader from './components/SiteEntranceLoader';
import PageTransitionIndicator from './components/PageTransitionIndicator';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Dedicated Page Modules
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import StudioPage from './pages/StudioPage';
import PricingPage from './pages/PricingPage';
import ReviewsPage from './pages/ReviewsPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import ProcessPage from './pages/ProcessPage';
import FAQPage from './pages/FAQPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/articles" element={<Navigate to="/blog" replace />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/tools" element={<Navigate to="/studio" replace />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/faqs" element={<Navigate to="/faq" replace />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/testimonials" element={<Navigate to="/reviews" replace />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-fg)] relative selection:bg-[var(--color-primary)]/30 selection:text-[var(--color-accent)] transition-colors duration-300">
            {/* Helper to reset scroll on navigation */}
            <ScrollToTop />

            {/* Cinematic Site Entrance Loader (sajibbaig.com style) */}
            <SiteEntranceLoader />

            {/* Top Velocity Route Progress Bar & Page-to-Page Shutter */}
            <PageTransitionIndicator />

            {/* Fluid Magnetic Custom Cursor (apurboshilsobuj style) */}
            <CustomCursor />

            {/* Professional Three.js 3D Interactive Cyber Background */}
            <ThreeCanvasBackground />

            {/* Fixed Semi-Transparent Header with Blur Effect & Book Appointment CTA */}
            <Header />

            <main id="main-content" className="relative z-10 transition-opacity duration-200">
              <AnimatedRoutes />
            </main>

            {/* Global Footer with Multi-Page Navigation */}
            <Footer />

            {/* Floating AI Consultation Assistant (Bottom Left) */}
            <AIChatbot />

            {/* Floating WhatsApp Quick Chat Button (Bottom Right) */}
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

