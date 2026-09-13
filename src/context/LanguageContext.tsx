import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY = 'portfolio_language_pref';

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.studio': 'Studio',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.bookAppointment': 'Book Appointment',
    'nav.book': 'Book',
    'nav.specializedServices': 'Specialized Client Services',
    'nav.coreCompetencies': '5 Core Competencies',
    'nav.exploreAllServices': 'Explore All Services & Packages',
    'nav.bookConsultation': 'Book Consultation →',

    // Hero
    'hero.badge': 'Available for Q2/Q3 Projects & Growth Consultations',
    'hero.role': 'Professional Digital Marketer & Creative Web Developer',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'AKTERUZZAMAN',
    'hero.description':
      'I help businesses build a powerful online presence through strategic digital marketing, SEO, conversion-focused campaigns and building immersive, modern & high-performance websites.',
    'hero.exploreProjects': 'View Projects',
    'hero.getInTouch': 'Get In Touch',
    'hero.bookCall': 'Book Consultation',
    'hero.downloadCV': 'Download CV',
    'hero.statExp': '5+ Years Experience',
    'hero.statExpSub': 'Growth & Development',
    'hero.statSat': '99.4% Client Satisfaction',
    'hero.statSatSub': 'Verified 5-Star Reviews',
    'hero.statProj': '120+ Completed Projects',
    'hero.statProjSub': 'Global Delivery',
    'hero.statRoi': '340% Average Client ROI',
    'hero.statRoiSub': 'Measurable Growth',

    // About
    'about.badge': 'About Akteruzzaman',
    'about.heading': 'Merging Growth Marketing with Modern Web Engineering',
    'about.subheading':
      'A unique hybrid professional delivering end-to-end digital excellence — from performance marketing funnels to high-speed WebGL web experiences.',
    'about.viewFullBio': 'Read Full Biography & Certifications',

    // Services
    'services.badge': 'High-Impact Client Solutions',
    'services.heading': 'End-to-End Digital Growth & Development',
    'services.subheading':
      'Data-driven digital marketing campaigns fused with modern, responsive web engineering engineered for conversion, speed, and market dominance.',
    'services.exploreBtn': 'View Full Service Packages',
    'services.calculateBtn': 'Calculate Project Cost',

    // Process
    'process.badge': 'Proven Execution Framework',
    'process.heading': 'How We Work Together for Maximum ROI',
    'process.subheading': 'A structured 5-step lifecycle ensuring clear milestones, transparent communication, and exceptional results.',

    // Skills
    'skills.badge': 'Technical & Marketing Competencies',
    'skills.heading': 'Expertise Built for Real-World Results',
    'skills.subheading': 'Proven skills across full-funnel digital marketing, technical search optimization, and modern web application development.',

    // Projects
    'projects.badge': 'Selected Case Studies & Work',
    'projects.heading': 'Featured Projects & Verified Results',
    'projects.subheading': 'Explore real-world client success stories across e-commerce, SaaS, fintech, and custom web applications.',
    'projects.viewAll': 'View All Portfolio Case Studies',

    // Pricing
    'pricing.badge': 'Transparent Investment Plans',
    'pricing.heading': 'Scalable Packages Tailored to Your Growth',
    'pricing.subheading': 'Clear pricing with zero hidden fees. Choose the ideal tier or request a custom milestone engagement.',

    // Reviews
    'reviews.badge': 'Client Feedback & Endorsements',
    'reviews.heading': 'Trusted by Founders & Teams Globally',
    'reviews.subheading': 'Real testimonials and ratings from businesses that scaled traffic, leads, and revenue through our collaborations.',

    // Blog
    'blog.badge': 'Industry Insights & Articles',
    'blog.heading': 'Latest Marketing & Web Insights',
    'blog.subheading': 'Deep dives into SEO strategies, high-conversion web design, and cutting-edge digital marketing tactics.',

    // Contact
    'contact.badge': 'Initiate Collaboration',
    'contact.heading': "Let's Build Something Exceptional Together",
    'contact.subheading': 'Ready to accelerate your online growth? Send a message or schedule a direct consultation call today.',

    // Common
    'common.readMore': 'Read More',
    'common.viewLive': 'View Live Site',
    'common.bookNow': 'Book Now',
    'common.getQuote': 'Get Instant Quote',
    'common.whatsappChat': 'Chat on WhatsApp',
    'common.aiAssistant': 'Ask AI Consultation Assistant',
  },
  bn: {
    // Nav
    'nav.home': 'হোম',
    'nav.services': 'সার্ভিসেস',
    'nav.process': 'প্রক্রিয়া',
    'nav.about': 'সম্পর্কে',
    'nav.skills': 'দক্ষতা',
    'nav.projects': 'প্রজেক্টস',
    'nav.blog': 'ব্লগ',
    'nav.studio': 'স্টুডিও',
    'nav.pricing': 'প্রাইসিং',
    'nav.faq': 'প্রশ্নোত্তর',
    'nav.reviews': 'রিভিউ',
    'nav.contact': 'যোগাযোগ',
    'nav.login': 'লগইন',
    'nav.bookAppointment': 'অ্যাপয়েন্টমেন্ট বুকিং',
    'nav.book': 'বুকিং',
    'nav.specializedServices': 'বিশেষায়িত ক্লায়েন্ট সেবা',
    'nav.coreCompetencies': '৫টি প্রধান দক্ষতা',
    'nav.exploreAllServices': 'সকল সার্ভিস ও প্যাকেজ দেখুন',
    'nav.bookConsultation': 'পরামর্শ বুক করুন →',

    // Hero
    'hero.badge': 'নতুন প্রজেক্ট ও গ্রোথ কনসালটেশনের জন্য উন্মুক্ত',
    'hero.role': 'প্রফেশনাল ডিজিটাল মার্কেটার ও ক্রিয়েটিভ ওয়েব ডেভেলপার',
    'hero.greeting': 'হ্যালো, আমি',
    'hero.name': 'আক্তারুজ্জামান',
    'hero.description':
      'কৌশলগত ডিজিটাল মার্কেটিং, এসইও, কনভার্সন-কেন্দ্রিক ক্যাম্পেইন এবং দৃষ্টিনন্দন, আধুনিক ও উচ্চ-গতির ওয়েবসাইট তৈরির মাধ্যমে ব্যবসার শক্তিশালী অনলাইন উপস্থিতি তৈরিতে সহায়তা করি।',
    'hero.exploreProjects': 'প্রজেক্টসমূহ দেখুন',
    'hero.getInTouch': 'যোগাযোগ করুন',
    'hero.bookCall': 'পরামর্শ বুক করুন',
    'hero.downloadCV': 'সিভি ডাউনলোড',
    'hero.statExp': '৫+ বছরের অভিজ্ঞতা',
    'hero.statExpSub': 'গ্রোথ ও ওয়েব ডেভেলপমেন্ট',
    'hero.statSat': '৯৯.৪% ক্লায়েন্ট সন্তুষ্টি',
    'hero.statSatSub': 'যাচাইকৃত ৫-স্টার রিভিউ',
    'hero.statProj': '১২০+ সম্পন্ন প্রজেক্ট',
    'hero.statProjSub': 'গ্লোবাল ক্লায়েন্ট ডেলিভারি',
    'hero.statRoi': '৩৪০% গড় ক্লায়েন্ট ROI',
    'hero.statRoiSub': 'পরিমাপযোগ্য ব্যবসায়িক বৃদ্ধি',

    // About
    'about.badge': 'আক্তারুজ্জামান সম্পর্কে',
    'about.heading': 'গ্রোথ মার্কেটিং ও আধুনিক ওয়েব প্রযুক্তির অনন্য মেলবন্ধন',
    'about.subheading':
      'পারফরম্যান্স মার্কেটিং ফানেল থেকে শুরু করে উচ্চ-গতির ওয়েব এক্সপেরিয়েন্স—ব্যবসার সম্পূর্ণ ডিজিটাল রূপান্তরে দক্ষ সহযোগী।',
    'about.viewFullBio': 'সম্পূর্ণ বায়োগ্রাফি ও সার্টিফিকেট দেখুন',

    // Services
    'services.badge': 'উচ্চ-মানসম্পন্ন ক্লায়েন্ট সলিউশন',
    'services.heading': 'ডিজিটাল গ্রোথ ও পূর্ণাঙ্গ ওয়েব ডেভেলপমেন্ট',
    'services.subheading':
      'তথ্য-ভিত্তিক ডিজিটাল মার্কেটিং ও আধুনিক রেসপনসিভ ওয়েব আর্কিটেকচার যা গতি ও বিক্রয় বৃদ্ধিতে সরাসরি অবদান রাখে।',
    'services.exploreBtn': 'সকল সার্ভিস প্যাকেজ দেখুন',
    'services.calculateBtn': 'প্রজেক্টের খরচ হিসাব করুন',

    // Process
    'process.badge': 'কার্যকর কর্মপদ্ধতি',
    'process.heading': 'সর্বোচ্চ ফলাফলের জন্য আমাদের কাজের ধাপ',
    'process.subheading': 'সুনির্দিষ্ট ৫-ধাপের কাঠামো যা স্বচ্ছ যোগাযোগ, সময়মতো ডেলিভারি ও চমৎকার ফলাফল নিশ্চিত করে।',

    // Skills
    'skills.badge': 'প্রযুক্তিগত ও মার্কেটিং দক্ষতা',
    'skills.heading': 'বাস্তবমুখী ফলাফলের জন্য প্রমাণিত দক্ষতা',
    'skills.subheading': 'ডিজিটাল মার্কেটিং, টেকনিক্যাল এসইও এবং আধুনিক ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্টে সমৃদ্ধ অভিজ্ঞতা।',

    // Projects
    'projects.badge': 'নির্বাচিত কেস স্টাডি ও পোর্টফোলিও',
    'projects.heading': 'বাস্তবায়িত প্রজেক্ট ও অর্জিত ফলাফল',
    'projects.subheading': 'ই-কমার্স, সাউথ, ফিনটেক ও কাস্টম ওয়েব প্ল্যাটফর্মে ক্লায়েন্টদের অর্জিত বাস্তব সাফল্যের গল্প।',
    'projects.viewAll': 'সকল পোর্টফোলিও কেস স্টাডি দেখুন',

    // Pricing
    'pricing.badge': 'স্বচ্ছ বিনিয়োগ প্যাকেজ',
    'pricing.heading': 'আপনার ব্যবসার প্রসারে উপযুক্ত প্যাকেজসমূহ',
    'pricing.subheading': 'লুকানো কোনো চার্জ নেই। আপনার প্রয়োজন অনুযায়ী সেরা প্যাকেজ বেছে নিন বা কাস্টম অফার নিন।',

    // Reviews
    'reviews.badge': 'ক্লায়েন্ট মূল্যায়ন ও প্রশংসাপত্র',
    'reviews.heading': 'বিশ্বজুড়ে ব্যবসা ও টিমের বিশ্বস্ত সঙ্গী',
    'reviews.subheading': 'আমাদের সাথে কাজ করে যেসব প্রতিষ্ঠান তাদের ট্রাফিক, লিড ও রেভিনিউ বাড়িয়েছে তাদের অভিমত।',

    // Blog
    'blog.badge': 'ইন্ডাস্ট্রি তথ্য ও আর্টিকেল',
    'blog.heading': 'সর্বশেষ মার্কেটিং ও ওয়েব ভাবনা',
    'blog.subheading': 'এসইও কৌশল, উচ্চ-কনভার্সন ওয়েব ডিজাইন এবং আধুনিক ডিজিটাল মার্কেটিং টেকনিক নিয়ে বিশ্লেষণ।',

    // Contact
    'contact.badge': 'সহযোগিতা শুরু করুন',
    'contact.heading': 'একসাথে দারুণ কিছু তৈরি করি',
    'contact.subheading': 'অনলাইনে আপনার ব্যবসার গতি বাড়াতে প্রস্তুত? আজই মেসেজ দিন অথবা সরাসরি পরামর্শ কল শিডিউল করুন।',

    // Common
    'common.readMore': 'আরও পড়ুন',
    'common.viewLive': 'লাইভ সাইট দেখুন',
    'common.bookNow': 'এখনই বুক করুন',
    'common.getQuote': 'তাৎক্ষণিক কোটেশন পান',
    'common.whatsappChat': 'হোয়াটসঅ্যাপে চ্যাট করুন',
    'common.aiAssistant': 'এআই কনসালটেশন অ্যাসিস্ট্যান্ট',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'bn' || saved === 'en') {
        return saved;
      }
    } catch {
      // Ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || translations.en?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
