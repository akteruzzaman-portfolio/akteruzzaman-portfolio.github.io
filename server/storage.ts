import path from "path";
import fs from "fs";

export interface Appointment {
  id: string;
  code: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  consultationType: string;
  date: string;
  timeSlot: string;
  notes?: string;
  budget?: string;
  createdAt: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface ClientReview {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  results: string;
  service: string;
  featured: boolean;
  avatar: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

export interface ServiceInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceId: string;
  serviceTitle: string;
  budget?: string;
  timeline?: string;
  message?: string;
  createdAt: string;
}

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'client' | 'trainee' | 'partner';
  company?: string;
  track?: string;
  token?: string;
  createdAt: string;
}

export interface PortalTicket {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved';
  message: string;
  reply?: string;
  createdAt: string;
  updatedAt?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter.json");
const DOWNLOADS_FILE = path.join(DATA_DIR, "downloads.json");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "service_inquiries.json");
const PORTAL_USERS_FILE = path.join(DATA_DIR, "portal_users.json");
const PORTAL_TICKETS_FILE = path.join(DATA_DIR, "portal_tickets.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function loadAppointments(): Appointment[] {
  try {
    if (fs.existsSync(APPOINTMENTS_FILE)) {
      const data = fs.readFileSync(APPOINTMENTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading appointments file:", e);
  }
  return [];
}

export function saveAppointments(appointments: Appointment[]) {
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving appointments file:", e);
  }
}

export function loadMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading messages file:", e);
  }
  return [];
}

export function saveMessages(messages: ContactMessage[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving messages file:", e);
  }
}

export function loadNewsletter(): NewsletterSubscriber[] {
  try {
    if (fs.existsSync(NEWSLETTER_FILE)) {
      const data = fs.readFileSync(NEWSLETTER_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading newsletter file:", e);
  }
  return [
    { email: "marketing.lead@growthfirm.com", subscribedAt: "2026-01-10T12:00:00.000Z" },
    { email: "founder@techventure.io", subscribedAt: "2026-02-14T14:30:00.000Z" },
    { email: "growth@saashq.co", subscribedAt: "2026-03-01T09:15:00.000Z" },
  ];
}

export function saveNewsletter(subscribers: NewsletterSubscriber[]) {
  try {
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving newsletter file:", e);
  }
}

export function loadDownloads(): Record<string, number> {
  try {
    if (fs.existsSync(DOWNLOADS_FILE)) {
      const data = fs.readFileSync(DOWNLOADS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading downloads file:", e);
  }
  return {
    "meta-ads-blueprint": 142,
    "seo-audit-checklist": 289,
    "cro-playbook": 194,
    "growth-stack-toolkit": 315,
  };
}

export function saveDownloads(downloads: Record<string, number>) {
  try {
    fs.writeFileSync(DOWNLOADS_FILE, JSON.stringify(downloads, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving downloads file:", e);
  }
}

const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: "rev-1",
    name: "Tariqul Islam",
    role: "CEO & Co-Founder",
    company: "Aura Retail & Commerce",
    rating: 5,
    content: "AKTERUZZAMAN completely transformed our online presence. Our previous website took 4.2 seconds to load; his React 19 rewrite dropped it to 0.4s and improved our Meta ad ROAS from 1.8x to 4.4x. Best tech investment we made this fiscal year.",
    results: "+280% Revenue Lift in 90 Days",
    service: "High-Performance Web Development",
    featured: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    date: "February 2026",
    verified: true,
    helpfulCount: 42,
  },
  {
    id: "rev-2",
    name: "Sarah Jenkins",
    role: "VP of Growth",
    company: "SaaS Scale Venture",
    rating: 5,
    content: "Finding an engineer who understands both search indexing algorithms and Three.js 3D shaders is virtually impossible. Akteruzzaman delivered a cinematic product experience that lifted our demo sign-up conversion rate by 64%.",
    results: "+64% Demo Conversion Rate",
    service: "3D Kinetic Web & CRO",
    featured: true,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    date: "January 2026",
    verified: true,
    helpfulCount: 38,
  },
  {
    id: "rev-3",
    name: "Dr. Marcus Vance",
    role: "Managing Director",
    company: "Vance Health Tech",
    rating: 5,
    content: "He executed an algorithmic technical SEO overhaul that resolved severe crawling bottlenecks. Within 6 weeks, our organic non-branded search impressions exploded by 310%. Thorough, proactive, and exceptionally skilled.",
    results: "+310% Non-Branded Organic Traffic",
    service: "SEO & Search Domination",
    featured: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    date: "January 2026",
    verified: true,
    helpfulCount: 29,
  },
  {
    id: "rev-4",
    name: "Elena Rostova",
    role: "Founder",
    company: "Krypton Web3 Terminal",
    rating: 5,
    content: "Akteruzzaman designed and developed our trading terminal frontend with zero frame-drops even during extreme market volatility. The UI is stunning and mathematically precise.",
    results: "$84M+ Daily Trading Volume Handled",
    service: "FinTech & Web3 Engineering",
    featured: true,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    date: "December 2025",
    verified: true,
    helpfulCount: 21,
  },
];

export function loadReviews(): ClientReview[] {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading reviews file:", e);
  }
  return INITIAL_REVIEWS;
}

export function saveReviews(reviews: ClientReview[]) {
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving reviews file:", e);
  }
}

export function loadInquiries(): ServiceInquiry[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading service inquiries file:", e);
  }
  return [];
}

export function saveInquiries(inquiries: ServiceInquiry[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving service inquiries file:", e);
  }
}

export function loadPortalUsers(): PortalUser[] {
  try {
    if (fs.existsSync(PORTAL_USERS_FILE)) {
      const data = fs.readFileSync(PORTAL_USERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading portal users file:", e);
  }
  return [
    {
      id: "usr-demo-1",
      name: "Tariqul Islam",
      email: "tariq@auraretail.com",
      role: "client",
      company: "Aura Retail & Commerce",
      token: "demo-client-token-12345",
      createdAt: "2026-01-15T10:00:00.000Z",
    },
    {
      id: "usr-demo-2",
      name: "Rafiqul Hasan",
      email: "trainee@akteruzzaman.com",
      role: "trainee",
      track: "Full-Funnel Growth & Web Development Fellowship",
      token: "demo-trainee-token-67890",
      createdAt: "2026-02-01T12:00:00.000Z",
    },
  ];
}

export function savePortalUsers(users: PortalUser[]) {
  try {
    fs.writeFileSync(PORTAL_USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving portal users file:", e);
  }
}

export function loadPortalTickets(): PortalTicket[] {
  try {
    if (fs.existsSync(PORTAL_TICKETS_FILE)) {
      const data = fs.readFileSync(PORTAL_TICKETS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading portal tickets file:", e);
  }
  return [
    {
      id: "TCK-8821",
      userId: "usr-demo-1",
      userEmail: "tariq@auraretail.com",
      subject: "GA4 Server-Side CAPI Verification Status",
      category: "Analytics & Tracking",
      priority: "high",
      status: "in_progress",
      message: "Can you confirm if the first-party sub-domain dns records have propagated for our Meta Conversions API?",
      reply: "DNS verified. Server-side event deduction is active with 98.4% event match quality on Meta.",
      createdAt: "2026-03-05T14:20:00.000Z",
      updatedAt: "2026-03-06T09:15:00.000Z",
    },
  ];
}

export function savePortalTickets(tickets: PortalTicket[]) {
  try {
    fs.writeFileSync(PORTAL_TICKETS_FILE, JSON.stringify(tickets, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving portal tickets file:", e);
  }
}

export const STANDARD_SLOTS = [
  "09:00 AM - 09:30 AM",
  "10:00 AM - 10:45 AM",
  "11:30 AM - 12:15 PM",
  "02:00 PM - 02:45 PM",
  "03:30 PM - 04:15 PM",
  "05:00 PM - 05:45 PM",
  "06:30 PM - 07:15 PM",
  "08:00 PM - 08:45 PM",
];
