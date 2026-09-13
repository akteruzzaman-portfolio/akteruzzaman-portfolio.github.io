export interface Skill {
  id: string;
  name: string;
  category: 'marketing' | 'development' | 'strategy';
  level: number;
  iconName: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  gradient: string;
  highlight?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    challenge: string;
    solution: string;
    results: string[];
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  serviceProvided: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: string;
  priceProject: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface HighlightCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  badge: string;
}

export type PricingCategory = 'marketing' | 'development' | 'automation' | 'packages';

export interface CategoryPricingItem {
  id: string;
  category: PricingCategory;
  categoryLabel: string;
  title: string;
  tagline: string;
  price: string;
  priceNumeric: number;
  billingType: 'monthly' | 'one-time';
  turnaround: string;
  popular?: boolean;
  badge?: string;
  deliverables: string[];
  description: string;
  ctaText?: string;
  iconName?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'marketing' | 'development' | 'pricing' | 'process';
  popular?: boolean;
}

export interface ServiceOrderPayload {
  serviceId: string;
  serviceTitle: string;
  category: string;
  price: string;
  billingType: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  companyName?: string;
  projectRequirements: string;
  preferredTimeline?: string;
  paymentPreference?: string;
}
