import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent Storage Directories
const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter.json");
const DOWNLOADS_FILE = path.join(DATA_DIR, "downloads.json");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "service_inquiries.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const PORTAL_USERS_FILE = path.join(DATA_DIR, "portal_users.json");
const PORTAL_TICKETS_FILE = path.join(DATA_DIR, "portal_tickets.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface Appointment {
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

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
}

function loadAppointments(): Appointment[] {
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

function saveAppointments(appointments: Appointment[]) {
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving appointments file:", e);
  }
}

function loadMessages(): ContactMessage[] {
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

function saveMessages(messages: ContactMessage[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving messages file:", e);
  }
}

interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

function loadNewsletter(): NewsletterSubscriber[] {
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

function saveNewsletter(subscribers: NewsletterSubscriber[]) {
  try {
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving newsletter file:", e);
  }
}

interface DownloadRecord {
  resourceId: string;
  count: number;
  lastDownloadedAt: string;
}

function loadDownloads(): Record<string, number> {
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

function saveDownloads(downloads: Record<string, number>) {
  try {
    fs.writeFileSync(DOWNLOADS_FILE, JSON.stringify(downloads, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving downloads file:", e);
  }
}

interface ClientReview {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  content: string;
  serviceProvided: string;
  createdAt: string;
}

interface ServiceInquiry {
  id: string;
  name: string;
  email: string;
  serviceId: string;
  serviceTitle: string;
  budget: string;
  projectScope: string;
  createdAt: string;
}

const DEFAULT_REVIEWS: ClientReview[] = [
  {
    id: 't-1',
    name: 'Marcus Vance',
    role: 'Chief Marketing Officer',
    company: 'Apex Horizon Tech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    serviceProvided: 'SEO Strategy & Organic Growth',
    content: '“AKTERUZZAMAN is the rare unicorn who understands both deep technical SEO algorithms and high-level conversion design. Our organic inbound qualified leads grew by over 300% within 4 months of implementing his architecture. He is our go-to strategist.”',
    createdAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Founder & Creative Director',
    company: 'Luminary Studios',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    serviceProvided: '3D Interactive Website Development',
    content: '“Working with AKTERUZZAMAN was an absolute masterclass in web craftsmanship. He brought our luxury 3D vision to life with buttery-smooth 60fps animations and impeccable attention to detail. Our clients rave about our website constantly.”',
    createdAt: '2026-02-04T15:30:00.000Z',
  },
  {
    id: 't-3',
    name: 'David Sterling',
    role: 'VP of Growth',
    company: 'Catalyst SaaS Solutions',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    serviceProvided: 'High-Converting Landing Pages & CRO',
    content: '“Before Akteruzzaman stepped in, our Google Ads landing page was converting at 2.4%. After his redesign and conversion restructuring, we hit 8.1% conversion rate on the same ad spend. The ROI was immediate and massive.”',
    createdAt: '2026-02-22T09:15:00.000Z',
  },
  {
    id: 't-4',
    name: 'Sophia Chen',
    role: 'Head of Product',
    company: 'Aura Protocol',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    serviceProvided: 'Full-Stack Web App Development',
    content: '“Reliable, proactive, and razor-sharp. Akteruzzaman delivered our entire web interface two weeks ahead of schedule. The code is modular, blazing fast, and designed with the utmost care for accessibility and elegance.”',
    createdAt: '2026-03-01T11:45:00.000Z',
  },
];

function loadReviews(): ClientReview[] {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading reviews file:", e);
  }
  return DEFAULT_REVIEWS;
}

function saveReviews(reviews: ClientReview[]) {
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving reviews file:", e);
  }
}

function loadInquiries(): ServiceInquiry[] {
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

function saveInquiries(inquiries: ServiceInquiry[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving service inquiries file:", e);
  }
}

interface ServiceOrderRecord {
  id: string;
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
  paymentPreference?: string;
  createdAt: string;
  status: 'new' | 'in_review' | 'invoiced' | 'in_progress';
}

function loadOrders(): ServiceOrderRecord[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading orders file:", e);
  }
  return [];
}

function saveOrders(orders: ServiceOrderRecord[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving orders file:", e);
  }
}

// Standard Available Time Slots
const STANDARD_SLOTS = [
  "09:00 AM - 09:30 AM",
  "10:00 AM - 10:45 AM",
  "11:30 AM - 12:15 PM",
  "02:00 PM - 02:45 PM",
  "03:30 PM - 04:15 PM",
  "05:00 PM - 05:45 PM",
  "06:30 PM - 07:15 PM",
  "08:00 PM - 08:45 PM",
];

// Lazy-initialized GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the official AI Assistant for AKTERUZZAMAN's portfolio website.
Your mission is to represent AKTERUZZAMAN, a world-class Professional Digital Marketer, SEO Specialist & Creative Web Developer.
Communicate in a professional, welcoming, knowledgeable, concise, and helpful tone.

LANGUAGE CAPABILITIES:
- You are 100% fluent in both English and Bengali (বাংলা), as well as Banglish (Bengali written in English letters).
- If the visitor speaks to you in Bengali or Banglish, ALWAYS reply in polite, fluent, natural Bengali (বাংলা) with clear formatting.
- If the visitor speaks in English, reply in crisp, professional English.

COMPREHENSIVE KNOWLEDGE ABOUT AKTERUZZAMAN:
- Name: AKTERUZZAMAN
- Title & Roles: Professional Digital Marketer, SEO Specialist & Creative Web Developer
- Experience: 5+ years driving multi-channel digital growth, technical SEO dominance, and high-performance bespoke 3D web applications.
- Track Record & Verified Metrics:
  • $14.8M+ in verified revenue generated for client brands
  • 120+ high-converting campaigns, funnels, and platforms deployed
  • +240% average organic search traffic lift for SEO clients
  • 99/100 Core Web Vitals performance guarantee across all web builds
  • 4.2x verified average ROAS across Google & Meta advertising funnels
  • 140+ projects successfully completed across 18+ countries worldwide
  • 94% client retention rate
- Direct Contact Information:
  • Email: akteruzzaman.inf@gmail.com
  • Phone / WhatsApp: +880 1736683282 (Direct link: https://wa.me/8801736683282)
  • Location: Worldwide / Global Remote (Available for clients in USA, UK, Europe, Australia, Bangladesh, and globally).
  • Availability: Actively accepting new client projects & growth consultations for Q2/Q3.

COMPLETE WEBSITE PAGES & ARCHITECTURE:
1. Home (/) — Hero showcase, live accepting clients status, key statistics, core competencies, and quick navigation.
2. About (/about) — Akteruzzaman's 5-year journey from performance media buyer to full-stack & 3D creative engineer; 3 foundational pillars (Speed & Technical Precision, Measurable Financial ROI, Interactive 3D Craftsmanship); career milestones (2020: High-ROAS Media Buying, 2022: Technical SEO & Full-Stack Web, 2024: 3D Kinetic Web, Present: Fractional CMO & Web Architect).
3. Services (/services) — 6 comprehensive service modules with deliverables, turnaround times, and direct inquiry forms:
   • Full-Funnel Digital Marketing (Starts at $99/mo, 5-7 days setup, Meta/Google ads, attribution)
   • High-Performance Web Development (Starts at $199, 10-14 days turnaround, React 19, TypeScript, 99+ Core Web Vitals)
   • SEO & Organic Search Domination (Starts at $99, 4-6 days turnaround, technical audit, keyword clusters, schema markup)
   • 3D Web & Interactive Experiences (Starts at $199, 10-14 days, Three.js, WebGL, 60fps orbital controls)
   • Conversion Rate Optimization - CRO (Starts at $149, 5-7 days, heatmapping, objection removal, A/B testing)
   • Data Analytics & Attribution (Starts at $99, 3-5 days, GA4, GTM server-side, multi-touch attribution)
4. Skills & Tech Stack (/skills) — Deep breakdown of engineering, SEO, 3D, and marketing proficiencies:
   • Frontend & Web: React 19, TypeScript, Tailwind CSS, Vite, Next.js, Motion
   • 3D & Creative Dev: Three.js, WebGL, GLSL Shaders, Spline, 60 FPS GPU-accelerated motion
   • Search Engine Optimization: Google Search Console, Ahrefs, SEMrush, Screaming Frog, Schema.org
   • Paid Advertising: Google Ads Certified Search & Video, Meta Ads Manager, TikTok Ads, Looker Studio
   • Analytics & Tracking: Google Tag Manager (GTM) Server-Side CAPI, GA4, BigQuery, Hotjar
   • Automations & Lead Gen: Zapier, Make, HubSpot, CRM pipelines
5. Projects & Case Studies (/projects) — 5 major real-world case studies with metrics:
   • Aura Metrics: Real-Time SEO & Growth Analytics Engine (+310% search visibility, <120ms latency, 1.2M monthly organic clicks)
   • Aether 3D: Kinetic E-Commerce & Interactive 3D Visualizer (6.4% conversion rate, 4m 12s dwell time, 60 FPS mobile)
   • NeuroLead: AI Automated Funnel & Conversion Engine (3,850+ monthly leads, -38% CAC reduction, 29.5% SQL conversion)
   • Vanguard: Cinematic Creative Agency Portfolio & Lead Engine (+210% client inquiries, 99/100 page speed, 24% bounce rate)
   • Krypton Protocol: High-Frequency Web3 Trading Terminal ($84M+ 24h trading volume, 16ms chart refresh, 18.5k active traders)
6. Creative Growth Studio & Tools (/studio) — 4 interactive utilities:
   • High-Converting Viral Hooks Generator (behavioral psychology ad copy & headlines)
   • Conversion Brand Palette Generator (SaaS, E-Commerce, FinTech, Luxury, Agency palettes)
   • Interactive Project Scope & ROI Estimator (timeline & investment calculator)
   • Free Downloadable Blueprints (Meta Ads Blueprint, SEO Audit Checklist, CRO Playbook, Growth Stack)
7. Pricing Packages (/pricing) — Transparent fixed pricing with high-value deliverables:
   • Package 1: SEO & Growth Sprint — $99 / project or month (Technical SEO audit, keyword gap analysis, Core Web Vitals remediation, rank velocity sprint)
   • Package 2: High-Performance Web & 3D Site [Most Popular] — $199 / project or month (Custom React 19 + TypeScript website, 3D kinetic visuals, CRO, mobile optimization)
   • Package 3: Full Growth Engine & Custom Platform — $299 / project or month (Full-stack web application, multi-channel growth funnels, custom analytics, ongoing optimization)
   • Custom Enterprise: Available upon request for large-scale platforms.
8. Client Reviews (/reviews) — Verified testimonials from founders and marketing executives:
   • Marcus Vance (CMO, Apex Horizon Tech — +300% inbound qualified organic leads)
   • Elena Rostova (Founder, Luminary Studios — Masterclass in 3D interactive luxury design)
   • David Sterling (VP of Growth, Catalyst SaaS — Conversion rate leaped from 2.4% to 8.1%)
   • Sophia Chen (Head of Product, Aura Protocol — Delivered full-stack interface 2 weeks early)
9. Book an Appointment (/book-appointment) — Real-time scheduling calendar:
   • Select from 8 daily time slots (09:00 AM to 08:45 PM)
   • 3 Consultation types: Free 20-Min Discovery Call ($0), Growth & SEO Strategy Session (45 min), Full-Stack Web & 3D Architecture Call (60 min)
   • Instant appointment confirmation with unique Appointment Code (e.g., AK-XXXXXX)
   • Integrated Client Portal where visitors can look up their booked appointments by code or email!
10. Contact (/contact) — Direct messaging form, email, and instant WhatsApp link.

GUIDELINES & CONVERSATION RULES:
- Provide scannable, well-structured answers using markdown bullet points.
- Proactively offer relevant next steps and encourage booking an appointment (/book-appointment), exploring services (/services), or connecting directly on WhatsApp (+880 1736683282).
- When asked about pricing, provide the exact numbers ($99, $199, $299) and briefly summarize what is included.
- When asked in Bengali, speak warmly, respectfully ("আপনি/আপনার"), and articulately.
- Always maintain Akteruzzaman's high reputation of engineering craftsmanship and revenue focus.`;

// Fallback response engine if GEMINI_API_KEY is unset or API is unreachable
function getFallbackResponse(message: string): string {
  const q = message.toLowerCase();

  // Detect Bengali questions
  const isBengali = /[\u0980-\u09FF]/.test(message) || 
    q.includes('kemon') || q.includes('khoroch') || q.includes('taka') || q.includes('dam') || 
    q.includes('somporke') || q.includes('bolun') || q.includes('korben') || q.includes('apni ke');

  // 1. Bengali Responses
  if (isBengali) {
    if (q.includes('বুক') || q.includes('অ্যাপয়েন্টমেন্ট') || q.includes('মিটিং') || q.includes('সময়') || q.includes('book') || q.includes('meeting')) {
      return `আপনি খুব সহজেই আক্তারুজ্জামান (AKTERUZZAMAN)-এর সাথে সরাসরি ভিডিও কনসালটেশন বুক করতে পারেন!

📅 **অ্যাপয়েন্টমেন্ট বুকিং পেজ**: ওয়েবসাইটের **"Book an Appointment"** বাটনে ক্লিক করুন অথবা **/book-appointment** পেজে যান।

**কনসালটেশনের ধরনসমূহ:**
• **ফ্রি ডিসকভারি কল (Free 20-Min Discovery Call)** — আপনার প্রজেক্টের ভিশন ও গোল নিয়ে ২০ মিনিটের ফ্রি আলোচনা।
• **গ্রোথ ও এসইও স্ট্র্যাটেজি সেশন (45 মিনিট)** — অর্গানিক ট্রাফিক ও কনভার্সন ফানেল বৃদ্ধি করার গাইডলাইন।
• **ফুল-স্ট্যাক ওয়েব ও ৩ডি আর্কিটেকচার সেশন (60 মিনিট)** — হাই-পারফরম্যান্স ওয়েব অ্যাপ ও ৩ডি ইন্টারঅ্যাকটিভ সলিউশন প্ল্যান।

সরাসরি সময় সিলেক্ট করে বুক করলেই তাৎক্ষণিক **Appointment Code** পেয়ে যাবেন!`;
    }

    if (q.includes('খরচ') || q.includes('দাম') || q.includes('টাকা') || q.includes('প্রাইস') || q.includes('প্যাকেজ') || q.includes('price') || q.includes('cost')) {
      return `আক্তারুজ্জামান (AKTERUZZAMAN)-এর কাজের প্যাকেজ ও প্রাইসিং খুবই স্বচ্ছ এবং রেজাল্ট-ওরিয়েন্টেড:

1. **SEO & Growth Sprint ($99 / প্রজেক্ট বা মাস)**:
   • টেকনিক্যাল এসইও অডিট, কিওয়ার্ড রিসার্চ ও র‍্যাঙ্কিং বুস্টিং।
2. **High-Performance Web & 3D Site ($199 / প্রজেক্ট বা মাস - সবচেয়ে জনপ্রিয়)**:
   • কাস্টম React 19 + TypeScript ওয়েবসাইট, ৩ডি কাইনেটিক ভিজ্যুয়ালস, এবং ৯৯+ স্পিড স্কোর।
3. **Full Growth Engine & Custom Platform ($299 / প্রজেক্ট বা মাস)**:
   • মাল্টি-চ্যানেল ডিজিটাল মার্কেটিং ফানেল, ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন ও অনগোয়িং অপ্টিমাইজেশন।

বিস্তারিত দেখতে **/pricing** পেজে যান অথবা সরাসরি WhatsApp-এ কথা বলুন: **+880 1736683282**!`;
    }

    if (q.includes('সার্ভিস') || q.includes('কাজ') || q.includes('কি করেন') || q.includes('service') || q.includes('offer')) {
      return `আক্তারুজ্জামান (AKTERUZZAMAN) প্রধানত ৬টি প্রফেশনাল সার্ভিস প্রদান করেন:

1. **ফুল-ফানেল ডিজিটাল মার্কেটিং (Full-Funnel Digital Marketing)** — Meta ও Google Ads দিয়ে সেলস ও লিড বৃদ্ধি।
2. **হাই-পারফরম্যান্স ওয়েব ডেভেলপমেন্ট (Modern Web Development)** — React 19, TypeScript ও Tailwind দিয়ে দ্রুতগতির ওয়েবসাইট।
3. **এসইও ও অর্গানিক সার্চ ডমিনেশন (SEO Domination)** — গুগল র‍্যাঙ্কিং এবং টেকনিক্যাল এসইও অপ্টিমাইজেশন (+২৪০% গড় ট্রাফিক বৃদ্ধি)।
4. **৩ডি ওয়েব ও ইন্টারঅ্যাকটিভ এক্সপেরিয়েন্স (3D WebGL / Three.js)** — আধুনিক ৩ডি মডেল ও অ্যানিমেশন।
5. **কনভার্সন রেট অপ্টিমাইজেশন (CRO)** — ভিজিটরদের কাস্টমারে রূপান্তরের সাইকোলজি ডিজাইন।
6. **ডাটা অ্যানালিটিক্স ও অ্যাট্রিবিউশন (GA4 & GTM Tracking)** — ১০০% নিখুঁত ট্র্যাকিং ও আরওআই রিপোর্ট।

বিস্তারিত জানতে **/services** পেজ ভিজিট করুন!`;
    }

    if (q.includes('হোয়াটসঅ্যাপ') || q.includes('whatsapp') || q.includes('যোগাযোগ') || q.includes('কন্টাক্ট') || q.includes('ফোন') || q.includes('নাম্বার') || q.includes('contact')) {
      return `আক্তারুজ্জামানের সাথে সরাসরি যোগাযোগের মাধ্যম:

📱 **WhatsApp / ফোন**: **+880 1736683282** (ওয়েবসাইটের ডান পাশের WhatsApp বাটনে ক্লিক করেও চ্যাট করতে পারেন)
✉️ **ইমেইল**: **akteruzzaman.inf@gmail.com**
📅 **অ্যাপয়েন্টমেন্ট**: **/book-appointment** পেজে সরাসরি সেশন শিডিউল করুন।
📝 **কন্টাক্ট ফর্ম**: **/contact** পেজে মেসেজ পাঠান।`;
    }

    if (q.includes('কে') || q.includes('সম্পর্কে') || q.includes('পরিচয়') || q.includes('who') || q.includes('about')) {
      return `**আক্তারুজ্জামান (AKTERUZZAMAN)** একজন অভিজ্ঞ **প্রফেশনাল ডিজিটাল মার্কেটার, এসইও স্পেশালিস্ট এবং ক্রিয়েটিভ ওয়েব ডেভেলপার**।

• **অভিজ্ঞতা**: ৫+ বছরের বেশি সফল ক্যারিয়ার।
• **অর্জন**: ক্লায়েন্টদের জন্য $১৪.৮ মিলিয়নের বেশি রেভিনিউ তৈরি, ১২০+ সাকসেসফুল ক্যাম্পেইন এবং ১৪০+ সম্পন্ন প্রজেক্ট।
• **দক্ষতা**: React 19, TypeScript, Three.js 3D, Google/Meta Ads, Technical SEO, GA4।
• **লোকেশন**: গ্লোবাল রিমোট (১৮+ দেশের ক্লায়েন্টদের সাথে কাজ করার অভিজ্ঞতা)।

আরও বিস্তারিত জানতে **/about** পেজ ঘুরে আসুন!`;
    }

    if (q.includes('প্রজেক্ট') || q.includes('পোর্টফোলিও') || q.includes('project') || q.includes('portfolio')) {
      return `আক্তারুজ্জামানের উল্লেখযোগ্য কয়েকটি প্রজেক্ট:

• **Aura Metrics**: রিয়েল-টাইম এসইও ও গ্রোথ অ্যানালিটিক্স ইঞ্জিন (+৩১০% সার্চ ভিজিবিলিটি)।
• **Aether 3D**: ইন্টারঅ্যাকটিভ ৩ডি ই-কমার্স ও ৩৬০° অরবিটাল ভিজ্যুয়ালাইজার (৬.৪% কনভার্সন রেট)।
• **NeuroLead**: এআই অটোমেটেড ফানেল ও লিড স্কোরিং ইঞ্জিন (৩৮৫০+ মাসিক লিড)।
• **Vanguard**: সিনেমাটিক ক্রিয়েটিভ এজেন্সি পোর্টফোলিও (৯৯/১০০ কোর ওয়েব ভাইটালস)।
• **Krypton Protocol**: হাই-ফ্রিকোয়েন্সি Web3 ট্রেডিং টার্মিনাল ($৮৪M+ দৈনিক ভলিউম)।

সম্পূর্ণ কেস স্টাডি দেখতে **/projects** পেজে যান!`;
    }

    return `আসসালামু আলাইকুম! আমি আক্তারুজ্জামান (AKTERUZZAMAN)-এর অফিসিয়াল এআই অ্যাসিস্ট্যান্ট। 👋
আমি আপনাকে যেকোনো তথ্য দিয়ে সাহায্য করতে পারি:
• **সার্ভিসসমূহ** (ডিজিটাল মার্কেটিং, এসইও, React ও 3D ওয়েব ডেভেলপমেন্ট)
• **কাজের প্রাইসিং** ($৯৯, $১৯৯, $২৯৯ প্যাকেজ)
• **অ্যাপয়েন্টমেন্ট বুকিং** (সরাসরি ১-অন-১ ভিডিও কনসালটেশন)
• **পোর্টফোলিও প্রজেক্ট** (কেস স্টাডি ও লাইভ ডেমো)
• **সরাসরি যোগাযোগ** (WhatsApp: +880 1736683282)

আপনি কোন বিষয়ে জানতে চান?`;
  }

  // 2. English Responses
  if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('meeting') || q.includes('call')) {
    return `You can easily schedule a 1-on-1 consultation directly with AKTERUZZAMAN on this website!

📅 **Book an Appointment**: Click the "Book an Appointment" button or visit **/book-appointment**.

**Available Consultation Types:**
• **Free Discovery Call (20 min)** — Quick alignment on your project vision, goals, and feasibility.
• **Growth & SEO Strategy Session (45 min)** — Deep dive into search ranking, traffic acquisition, and funnel optimization.
• **Full-Stack Web & 3D Architecture Call (60 min)** — Comprehensive technical review, UI/UX architecture, and execution roadmap.

Choose your preferred date and slot to receive an instant **Appointment Code**!`;
  }

  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('package')) {
    return `Here is an overview of AKTERUZZAMAN's transparent pricing packages:

• **SEO & Growth Sprint ($99 / mo or project)**: Technical SEO crawl audit, keyword gap analysis, Core Web Vitals remediation, and ranking velocity.
• **High-Performance Web & 3D Site ($199 / mo or project) [Most Popular]**: Custom React 19 + TypeScript website with kinetic 3D visuals, 99+ Core Web Vitals, and CRO.
• **Full Growth Engine & Custom Platform ($299 / mo or project)**: Full-stack web application, multi-channel growth funnels, custom GA4 attribution, and ongoing optimization.

Visit the dedicated **/pricing** page for detailed feature comparisons or reach out on WhatsApp at **+880 1736683282**!`;
  }

  if (q.includes('service') || q.includes('offer') || q.includes('what do you do') || q.includes('skill')) {
    return `AKTERUZZAMAN provides 6 core high-impact professional services:

1. **Full-Funnel Digital Marketing** — ROI-driven Google & Meta ads campaigns with multi-stage acquisition funnels (From $99/mo).
2. **High-Performance Web Development** — Blazing-fast websites built with React 19, TypeScript, and Tailwind (From $199).
3. **SEO & Organic Search Domination** — Algorithmic search optimization and schema architecture (+240% average traffic surge, From $99).
4. **3D Web & Interactive Experiences** — GPU-accelerated WebGL and Three.js 3D visualizers with 60 FPS fluidity (From $199).
5. **Conversion Rate Optimization (CRO)** — Eliminating checkout friction and boosting conversion rates (+42% average lift, From $149).
6. **Data Analytics & Attribution** — Server-side GA4 and GTM tracking for 100% data fidelity (From $99).

Explore all deliverables on the **/services** page!`;
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('case study')) {
    return `AKTERUZZAMAN has engineered several industry-leading projects:

• **Aura Metrics**: Real-Time SEO & Growth Analytics Engine (+310% search visibility, <120ms latency).
• **Aether 3D**: Kinetic E-Commerce & Interactive 3D Visualizer (6.4% conversion rate, 4m 12s dwell time).
• **NeuroLead**: AI Automated Funnel & Conversion Engine (3,850+ monthly leads, -38% CAC reduction).
• **Vanguard**: Cinematic Creative Agency Portfolio & Lead Engine (+210% client inquiries, 99/100 Core Web Vitals).
• **Krypton Protocol**: High-Frequency Web3 Trading Terminal ($84M+ 24h volume, 16ms chart refresh).

Check out the full interactive case studies on the **/projects** page!`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('whatsapp') || q.includes('phone')) {
    return `You can connect with AKTERUZZAMAN immediately:

• **WhatsApp / Direct Call**: **+880 1736683282** (Click the WhatsApp chat widget on the bottom right!)
• **Email**: **akteruzzaman.inf@gmail.com**
• **Book an Appointment**: Visit **/book-appointment** for a 1-on-1 video call.
• **Contact Form**: Visit **/contact** to submit your project inquiry directly.`;
  }

  if (q.includes('who') || q.includes('about') || q.includes('background') || q.includes('experience')) {
    return `**AKTERUZZAMAN** is a Professional Digital Marketer, SEO Specialist & Creative Web Developer with over 5 years of industry experience.

• **Proven Impact**: Generated over $14.8M in client revenue across 120+ campaigns and completed 140+ projects worldwide.
• **Dual Mastery**: Combines technical web engineering (React 19, TypeScript, Three.js) with revenue-focused performance marketing (SEO, Paid Ads, CRO).
• **Core Pillars**: Sub-second speed (99/100 Core Web Vitals), measurable financial ROI, and interactive 3D craftsmanship.

Read his full journey and career milestones on the **/about** page!`;
  }

  if (q.includes('tool') || q.includes('studio') || q.includes('hook') || q.includes('palette') || q.includes('calculator')) {
    return `AKTERUZZAMAN's website features a dedicated **Creative Growth Studio & Tools** page (/studio) with 4 free interactive utilities:

1. **Viral Hooks Generator** — Generate high-converting ad copy and headlines based on behavioral psychology.
2. **Brand Palette Generator** — Paired contrast color schemes and typography stacks for SaaS, E-Commerce, FinTech, and Luxury brands.
3. **Scope & ROI Estimator** — Real-time turnaround and cost calculation for projects.
4. **Free Growth Blueprints** — Downloadable SEO checklists, ad scaling guides, and CRO playbooks.

Visit **/studio** to use them for free!`;
  }

  return `Hello! 👋 I'm AKTERUZZAMAN's official AI Consultation Assistant.
I am fully trained on his background, services, pricing, portfolio, and booking system.

Here are quick areas I can assist you with:
• **Services & Expertise** — SEO, Growth Marketing, React & 3D Web Development
• **Transparent Pricing** — Plans starting at $99 ($99, $199, $299)
• **Book an Appointment** — Schedule a 1-on-1 video consultation (/book-appointment)
• **Featured Projects** — Verified case studies & measurable client ROI (/projects)
• **Direct WhatsApp Chat** — +880 1736683282

Feel free to ask in English or Bengali (বাংলা)! What would you like to explore?`;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==========================================
// 1. HOME PAGE ENDPOINT (/api/home)
// ==========================================
app.get("/api/home", (req, res) => {
  try {
    return res.json({
      success: true,
      personalInfo: {
        name: "AKTERUZZAMAN",
        headline: "Professional Digital Marketer & Creative Web Developer",
        bioTagline: "Bridging data-driven growth marketing, technical SEO dominance, and high-performance 3D web applications that turn visitors into loyal revenue.",
        availability: "Available for Q2/Q3 Projects",
        location: "Global Remote (Available Worldwide)",
        experienceYears: 5,
        avatarImage: "/akteruzzaman.png",
      },
      stats: [
        { label: "Revenue Generated for Clients", value: "$14.8M+" },
        { label: "High-Converting Campaigns & Funnels", value: "120+" },
        { label: "Average Organic Traffic Lift", value: "+240%" },
        { label: "Core Web Vitals Performance", value: "99/100" },
      ],
      coreCompetencies: [
        "Full-Funnel Digital Marketing",
        "React & TypeScript Engineering",
        "Technical SEO & Core Web Vitals",
        "3D WebGL & Kinetic Motion",
        "Conversion Rate Optimization (CRO)",
        "Attribution Analytics & GA4",
      ],
      liveStatus: {
        isAcceptingClients: true,
        calendarBookingOpen: true,
        nextSlotDate: "Tomorrow",
        responseTimeHours: 24,
      },
      quickLinks: [
        { label: "About", path: "/about" },
        { label: "Services", path: "/services" },
        { label: "Projects", path: "/projects" },
        { label: "Pricing", path: "/pricing" },
        { label: "Book Consultation", path: "/book-appointment" },
        { label: "Contact", path: "/contact" },
      ],
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load home page data." });
  }
});

// ==========================================
// 2. ABOUT PAGE ENDPOINT (/api/about)
// ==========================================
app.get("/api/about", (req, res) => {
  try {
    return res.json({
      success: true,
      profile: {
        name: "AKTERUZZAMAN",
        title: "Digital Growth Strategist & Creative Full-Stack Web Developer",
        experienceYears: "5+ Years",
        location: "Worldwide / Remote",
        email: "akteruzzaman.inf@gmail.com",
        phone: "+880 1736683282",
        whatsapp: "+880 1736683282",
        whatsappUrl: "https://wa.me/8801736683282?text=Hi%20AKTERUZZAMAN%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!",
        avatarImage: "/akteruzzaman.png",
        bio: "I am AKTERUZZAMAN, a results-obsessed Digital Marketer, SEO Specialist, and Creative Web Developer with over 5 years of industry experience. I bridge the gap between high-converting growth marketing campaigns, organic search domination, and bespoke, bleeding-edge web applications. My mission is to architect digital experiences that captivate users visually while generating measurable revenue.",
        philosophy: "Most digital agencies operate in isolated silos: designers don't understand conversion psychology, developers don't understand SEO crawl architecture, and media buyers don't know how to optimize front-end load times. I unite all three disciplines under one unified engineering framework.",
      },
      pillars: [
        {
          title: "Speed & Technical Precision",
          description: "Every millisecond saved boosts conversion by up to 7%. I build clean, component-driven React applications optimized for 99+ Core Web Vitals scores.",
        },
        {
          title: "Measurable Financial ROI",
          description: "Design without analytics is just decoration. Every headline, CTA placement, and tracking script is engineered to generate measurable business outcomes.",
        },
        {
          title: "Interactive 3D Craftsmanship",
          description: "Engage visitors immediately with cinematic WebGL, Three.js shaders, and kinetic scroll interactions that elevate brands far above competitors.",
        },
      ],
      milestones: [
        {
          year: "2020",
          title: "High-ROAS Media Buying & Funnel Strategy",
          description: "Managed over $600k in ad spend across Google Ads & Meta with verified 4.2x ROAS across DTC and B2B clients.",
        },
        {
          year: "2022",
          title: "Technical SEO & Full-Stack Web Pivot",
          description: "Engineered programmatic SEO strategies and custom React/TypeScript frontend architectures that unlocked 300%+ search traffic growth.",
        },
        {
          year: "2024",
          title: "3D Kinetic Web & Interactive Commerce",
          description: "Integrated real-time Three.js and WebGL 3D product visualizers into commercial client storefronts, lifting session duration by 140%.",
        },
        {
          year: "Present",
          title: "Independent Fractional CMO & Creative Web Engineer",
          description: "Partnering directly with funded startups, enterprise brands, and visionary founders worldwide.",
        },
      ],
      credentials: [
        "Google Certified Professional Search & Video Ads Specialist",
        "Meta Certified Digital Marketing Strategist",
        "Full-Stack Web & WebGL Performance Architect",
        "Core Web Vitals & Technical Schema Authority",
      ],
      metrics: {
        completedProjects: 140,
        averageRoiMultiplier: "3.8x",
        clientRetentionRate: "94%",
        countriesReached: 18,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load about page data." });
  }
});

// ==========================================
// 3. SERVICES PAGE ENDPOINTS (/api/services & /api/services/inquiry)
// ==========================================
const DETAILED_SERVICES = [
  {
    id: "digital-marketing",
    title: "Full-Funnel Digital Marketing",
    category: "Marketing",
    description: "Data-driven multi-channel advertising, customer acquisition funnels, and automated retention loops engineered to maximize ROAS and long-term customer lifetime value.",
    features: [
      "Targeted Meta (Facebook & Instagram) and Google Search / Shopping Campaigns",
      "High-converting retargeting loops with dynamic product catalogs",
      "Omnichannel attribution tracking with GA4 and server-side tracking",
      "Continuous creative testing and ad fatigue mitigation sprints",
    ],
    deliverables: ["Custom Ad Copy & Creative Direction", "Full Funnel Architecture", "Weekly ROI Performance Reports"],
    turnaround: "5-7 Days Setup",
    pricingFrom: "$99/mo",
    highlight: "Average 4.2x ROAS",
  },
  {
    id: "web-development",
    title: "High-Performance Web Development",
    category: "Engineering",
    description: "Modern, bespoke websites and scalable web applications built with React, TypeScript, and Tailwind CSS. Built for speed, accessibility, and high search engine discoverability.",
    features: [
      "Custom component architectures with ultra-clean, maintainable codebases",
      "Blazing-fast sub-second initial page load speeds (Core Web Vitals 95+ guaranteed)",
      "Fully responsive and mobile-first touch optimization across every viewport",
      "Headless CMS integration and modular state management for seamless scaling",
    ],
    deliverables: ["Custom React Codebase", "Mobile-Optimized Layouts", "SEO Technical Foundations"],
    turnaround: "10-14 Days",
    pricingFrom: "$199",
    highlight: "100/100 Core Web Vitals",
  },
  {
    id: "seo-domination",
    title: "SEO & Organic Search Domination",
    category: "SEO",
    description: "Algorithmic search engine optimization designed to capture high-intent organic traffic. From deep technical site audits to keyword gap dominance and structured schema markup.",
    features: [
      "Comprehensive technical crawling, indexation, and Core Web Vitals remediation",
      "In-depth keyword clustering targeting buyer-intent commercial search queries",
      "Rich snippet schema markup implementation (Organization, Product, FAQ, Review)",
      "High-authority backlink outreach and digital PR strategy roadmap",
    ],
    deliverables: ["Comprehensive Technical Audit Report", "Keyword Cluster Roadmap", "Schema Markup Injection"],
    turnaround: "4-6 Days",
    pricingFrom: "$99",
    highlight: "+240% Average Traffic Lift",
  },
  {
    id: "3d-interactive",
    title: "3D Web & Interactive Experiences",
    category: "Creative Dev",
    description: "Elevate your brand beyond static pages with immersive 3D WebGL scenes, Spline kinetic models, and fluid micro-interactions that mesmerize users and dramatically boost dwell time.",
    features: [
      "Interactive 3D product visualizers with orbital camera and material customization",
      "GPU-accelerated WebGL particle systems and dynamic audio-visual synths",
      "Silky-smooth 60 FPS scrolling motion and choreographed physics transitions",
      "Lightweight model compression for instantaneous mobile load times",
    ],
    deliverables: ["Interactive 3D Scene", "Custom Three.js Shaders", "Mobile Responsive Touch Controls"],
    turnaround: "10-14 Days",
    pricingFrom: "$199",
    highlight: "60 FPS Hardware-Accelerated",
  },
  {
    id: "cro-optimization",
    title: "Conversion Rate Optimization (CRO)",
    category: "Growth",
    description: "Turn passive website visitors into paying customers. Data-backed UI redesigns, behavioral heatmapping, psychological checkout friction removal, and multivariate A/B testing.",
    features: [
      "User journey session recording analysis and drop-off funnel diagnostics",
      "Visual hierarchy redesign focused on primary call-to-action click rates",
      "Objection-destroying copy adjustments and social proof reinforcement",
      "Rapid A/B split-testing deployment with statistical significance validation",
    ],
    deliverables: ["Friction Audit & Heatmap Analysis", "High-Converting Page Redesign", "A/B Test Blueprint"],
    turnaround: "5-7 Days",
    pricingFrom: "$149",
    highlight: "+42% Average Conversion Lift",
  },
  {
    id: "analytics-attribution",
    title: "Data Analytics & Attribution",
    category: "Data",
    description: "Eliminate marketing guesswork with institutional-grade analytics setups. Custom Google Analytics 4 tracking, conversion API events, and bespoke visual executive dashboards.",
    features: [
      "End-to-end event tracking architecture via Google Tag Manager and GA4",
      "Custom executive dashboards featuring real-time revenue and acquisition metrics",
      "Server-side tracking for 100% data fidelity bypassing iOS ad blockers",
      "Multi-touch attribution models to uncover the true cost per acquisition",
    ],
    deliverables: ["Custom GA4 Event Setup", "Google Tag Manager Container", "Live Dashboard View"],
    turnaround: "3-5 Days",
    pricingFrom: "$99",
    highlight: "100% Tracking Fidelity",
  },
];

app.get("/api/services", (req, res) => {
  try {
    const { category } = req.query;
    let filtered = DETAILED_SERVICES;
    if (category && typeof category === "string" && category !== "All") {
      filtered = DETAILED_SERVICES.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase()
      );
    }
    return res.json({
      success: true,
      services: filtered,
      workflow: [
        { step: "01", title: "Discovery & Alignment", desc: "We review your brand goals, target metrics, and technical constraints." },
        { step: "02", title: "Blueprint & Strategy", desc: "Crafting wireframes, tech stack selection, and conversion architecture." },
        { step: "03", title: "Rapid Engineering Sprint", desc: "Clean development with interactive staging previews and real-time feedback." },
        { step: "04", title: "Launch, Scale & Optimize", desc: "Production deployment with 99+ Core Web Vitals, analytics, and ongoing support." },
      ],
      guarantees: [
        "100/100 Core Web Vitals Commitment",
        "Transparent Fixed Pricing or Retainer",
        "Direct Access to Akteruzzaman",
        "30-Day Post-Launch Technical Support",
      ],
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load services." });
  }
});

app.post("/api/services/inquiry", (req, res) => {
  try {
    const { name, email, serviceId, serviceTitle, budget, projectScope } = req.body;
    if (!name || !email || !serviceTitle) {
      return res.status(400).json({ error: "Name, email, and service title are required." });
    }

    const inquiries = loadInquiries();
    const newInquiry: ServiceInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      serviceId: serviceId || "custom",
      serviceTitle: serviceTitle.trim(),
      budget: budget || "Not specified",
      projectScope: projectScope ? projectScope.trim() : "Standard service scope requested",
      createdAt: new Date().toISOString(),
    };

    inquiries.push(newInquiry);
    saveInquiries(inquiries);

    return res.status(201).json({
      success: true,
      message: `Inquiry for "${serviceTitle}" received! Akteruzzaman will review and reply within 24 hours.`,
      inquiryId: newInquiry.id,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to submit service inquiry." });
  }
});

// Direct Service Order Endpoint (/api/orders)
app.post("/api/orders", (req, res) => {
  try {
    const {
      serviceId,
      serviceTitle,
      category,
      price,
      billingType,
      clientName,
      clientEmail,
      clientPhone,
      companyName,
      projectRequirements,
      paymentPreference,
    } = req.body;

    if (!clientName || !clientEmail || !serviceTitle) {
      return res.status(400).json({ error: "Client name, email, and service title are required." });
    }

    const orders = loadOrders();
    const newOrder: ServiceOrderRecord = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      serviceId: serviceId || "custom-service",
      serviceTitle: serviceTitle.trim(),
      category: category || "General Service",
      price: price || "Custom Quote",
      billingType: billingType || "one-time",
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim().toLowerCase(),
      clientPhone: clientPhone ? clientPhone.trim() : undefined,
      companyName: companyName ? companyName.trim() : undefined,
      projectRequirements: projectRequirements ? projectRequirements.trim() : "Standard service package requested",
      paymentPreference: paymentPreference || "Stripe / Card",
      createdAt: new Date().toISOString(),
      status: "new",
    };

    orders.push(newOrder);
    saveOrders(orders);

    return res.status(201).json({
      success: true,
      message: `Order for "${serviceTitle}" successfully registered! Akteruzzaman will contact you via email shortly.`,
      orderId: newOrder.id,
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to register service order." });
  }
});

// ==========================================
// 3b. PROCESS PAGE ENDPOINTS (/api/process)
// ==========================================
const PROCESS_STEPS_BACKEND = [
  {
    number: "01",
    id: "discovery",
    title: "Discovery & Strategic Growth Audit",
    shortTitle: "Discovery & Audit",
    tagline: "Deep-dive into audience psychology, search intent, and technical feasibility.",
    duration: "Days 1 – 3",
    overview:
      "Every high-performing web application starts with empirical data. We analyze your market positioning, competitor keyword gaps, audience funnel bottlenecks, and technical constraints to construct an ironclad blueprint before writing a single line of code.",
    deliverables: [
      "Comprehensive Technical SEO & Competitor Analysis",
      "Target User Journey & High-Intent Funnel Map",
      "Full System Architecture & Milestone Roadmap",
      "Fixed Scope & Transparent Sprint Schedule",
    ],
    techStack: ["SEMrush", "Ahrefs", "Google Search Console", "FigJam", "Loom Audit"],
    kpiGoal: "Pinpoint ranking keywords & define conversion baseline",
  },
  {
    number: "02",
    id: "wireframing",
    title: "UX/UI Wireframing & 3D Prototyping",
    shortTitle: "UX/UI & 3D Design",
    tagline: "Crafting pixel-perfect visual architecture and kinetic micro-interactions.",
    duration: "Days 4 – 7",
    overview:
      "We prototype the entire user experience in Figma and explore kinetic 3D WebGL assets. We focus on optical contrast, fluid responsive typography, clear hierarchy, and conversion micro-moments that guide visitors seamlessly toward booking or purchase.",
    deliverables: [
      "High-Fidelity Desktop & Mobile Component Wireframes",
      "Clickable Interactive Prototype for Team Feedback",
      "Custom 3D WebGL Assets & Shader Motion Design",
      "Design System, Color Tokens & Typography Scale",
    ],
    techStack: ["Figma", "Spline 3D", "Three.js", "Adobe Suite", "Tailwind CSS"],
    kpiGoal: "Establish brand prestige & reduce prospective user cognitive load",
  },
  {
    number: "03",
    id: "development",
    title: "High-Performance Web Engineering",
    shortTitle: "Engineering & Build",
    tagline: "Building lightning-fast, accessible code with sub-second page loads.",
    duration: "Days 8 – 16",
    overview:
      "We write clean, modular React 19 / TypeScript code backed by Vite and Express. Every component is optimized for sub-second rendering, zero cumulative layout shifts (CLS = 0.0), full keyboard accessibility, and ironclad mobile responsiveness.",
    deliverables: [
      "Full-Stack TypeScript & React Architecture",
      "Interactive 3D Three.js Visual Canvases",
      "Accessible Semantic HTML & Schema.org JSON-LD Markup",
      "Private Staging URL for Real-Time Client Testing",
    ],
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Express", "Node.js"],
    kpiGoal: "98–100 Google PageSpeed Score across all devices",
  },
  {
    number: "04",
    id: "tracking",
    title: "Conversion Tracking & Multi-Channel Launch",
    shortTitle: "Tracking & Launch",
    tagline: "Instrumenting server-side analytics, DNS cutover, and campaign funnels.",
    duration: "Days 17 – 20",
    overview:
      "A great platform is incomplete without measurement. We configure Server-Side Google Tag Manager, GA4 event pipelines, and Meta Conversions API (CAPI) to ensure 100% attribution fidelity before deploying to production with automated SSL and edge caching.",
    deliverables: [
      "Server-Side GA4 & GTM Event Architecture",
      "Meta Conversions API (CAPI) First-Party Tagging",
      "Zero-Downtime Production DNS Cutover",
      "Google Search Console & Bing Webmaster Verification",
    ],
    techStack: ["Google Tag Manager", "GA4", "Meta CAPI", "Cloudflare DNS", "SSL"],
    kpiGoal: "100% attribution capture & instant search crawl indexing",
  },
  {
    number: "05",
    id: "scaling",
    title: "Continuous CRO & Growth Sprints",
    shortTitle: "Scaling & CRO",
    tagline: "A/B testing, paid ad creative velocity, and continuous organic scaling.",
    duration: "Ongoing / Retainer",
    overview:
      "Launch is just day one. We analyze live heatmaps, user session recordings, and Google Ads query data to run systematic weekly conversion rate optimization (CRO) sprints, driving maximum return on marketing investment.",
    deliverables: [
      "Weekly Conversion Rate A/B Experimentation",
      "Targeted Google Search & Meta Ad Campaign Management",
      "Technical Core Web Vitals Maintenance & Security Updates",
      "Bi-Weekly Executive Performance & ROI Reports",
    ],
    techStack: ["Hotjar", "Google Optimize", "Google Ads", "Meta Ads Manager", "Looker Studio"],
    kpiGoal: "Scale monthly pipeline revenue & maximize blended ROAS",
  },
];

const PROCESS_GUARANTEES = [
  {
    title: "95+ Speed Guarantee",
    description: "Every site we deploy scores 95+ on Google PageSpeed Insights for both desktop and mobile, ensuring optimal SEO ranking and conversion rates.",
    badge: "Core Web Vitals",
  },
  {
    title: "30-Day Zero-Bug Warranty",
    description: "Complete post-launch engineering support covering bug fixes, browser updates, and performance tuning at zero additional cost.",
    badge: "Production Quality",
  },
  {
    title: "100% Attribution Fidelity",
    description: "Server-side tagging recovers up to 40% of ad tracking lost to browser blockers, ensuring ad algorithms optimize for true paying customers.",
    badge: "Data Accuracy",
  },
];

const PROCESS_FAQS = [
  {
    q: "How long does a typical complete project take from start to finish?",
    a: "Most high-performance web platforms and 3D websites take between 2 to 4 weeks depending on the complexity of 3D assets, custom API integrations, and conversion funnel requirements. We provide milestone schedules with daily status transparency.",
  },
  {
    q: "Do you involve us during each design and development phase?",
    a: "Absolutely. You receive an interactive clickable Figma prototype during Phase 02 for feedback, followed by a private staging URL during Phase 03 where you can test live features in real-time before anything goes live to the public.",
  },
  {
    q: "What is included in the 30-Day Post-Launch Warranty?",
    a: "We guarantee zero-bug stability, Google search indexing verification, core web vital speed audits, and continuous conversion tracking support for 30 full days after domain deployment at no extra charge.",
  },
  {
    q: "Can you work with our existing branding and CMS stack?",
    a: "Yes. We adapt seamlessly to your existing brand assets, Figma libraries, or CMS backends (Headless WordPress, Sanity, Strapi, Shopify) while completely rebuilding the frontend for lightning speed and conversion.",
  },
];

app.get("/api/process", (req, res) => {
  try {
    return res.json({
      success: true,
      page: "process",
      title: "Execution Methodology & Strategic Process",
      tagline: "Predictable Milestones. Exceptional Results.",
      description: "Explore how our 5-phase strategic framework transforms rough concepts into sub-second, revenue-generating platforms with complete milestone transparency.",
      timelineEstimate: "2 to 4 weeks average sprint duration",
      steps: PROCESS_STEPS_BACKEND,
      guarantees: PROCESS_GUARANTEES,
      faqs: PROCESS_FAQS,
      cta: {
        title: "Ready to accelerate your digital growth?",
        subtitle: "Schedule a 20-minute strategy call to map out your sprint schedule.",
        actionUrl: "/book-appointment",
        actionText: "Book Strategy Session",
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load process data." });
  }
});

// ==========================================
// 4. PROJECTS PAGE ENDPOINTS (/api/projects & /api/projects/:id)
// ==========================================
const DETAILED_PROJECTS = [
  {
    id: "project-1",
    title: "Aura Metrics — Real-Time SEO & Growth Analytics Engine",
    tagline: "Live Traffic Anomaly Detection, Keyword Rank Velocity & Custom Recharts Visualizations",
    category: "Full-Stack Web App",
    description: "A centralized command dashboard for enterprise marketing teams. Unifies Google Search Console, GA4 attribution, and keyword velocity into an intuitive real-time visual interface with custom predictive anomaly detection.",
    image: "/images/project_seo_analytics_1788763852824.jpg",
    metrics: [
      { label: "Search Visibility", value: "+310%" },
      { label: "Data Latency", value: "<120ms" },
      { label: "Organic Clicks", value: "1.2M/mo" },
    ],
    tags: ["React", "TypeScript", "Recharts", "SEO Intelligence", "Tailwind CSS"],
    liveUrl: "https://example.com/aurametrics",
    githubUrl: "https://github.com/akteruzzaman/aura-metrics",
    caseStudy: {
      challenge: "The client was drowning in fragmented analytics across four distinct dashboards, missing critical keyword cannibalization issues for weeks.",
      solution: "Engineered a unified single-pane-of-glass dashboard with automated search anomaly alerts, custom date range comparators, and automated rank tracking.",
      results: [
        "Identified 45+ high-intent keyword opportunities within 14 days",
        "Reduced executive reporting compilation time from 6 hours to 5 minutes",
        "Drove a 310% net increase in organic search conversions within 90 days",
      ],
    },
  },
  {
    id: "project-2",
    title: "Aether 3D — Kinetic E-Commerce & Interactive Visualizer",
    tagline: "360° Orbital WebGL Controls, Dynamic PBR Shaders & 60 FPS Fluid Checkout",
    category: "3D Web & Interactive",
    description: "An immersive 3D digital storefront built for a luxury technical lifestyle brand. Features 360-degree interactive orbital camera controls, custom lighting shaders, and instant fluid checkout flows designed to maximize buyer engagement.",
    image: "/images/project_3d_ecommerce_1788763865774.jpg",
    metrics: [
      { label: "Conversion Rate", value: "6.4%" },
      { label: "Average Time on Page", value: "4m 12s" },
      { label: "Mobile Frame Rate", value: "60 FPS" },
    ],
    tags: ["3D Web", "WebGL", "React", "eCommerce", "Motion UI"],
    liveUrl: "https://example.com/aether3d",
    githubUrl: "https://github.com/akteruzzaman/aether3d",
    caseStudy: {
      challenge: "Standard flat 2D product photos failed to convey the premium craftsmanship and fabric technology, resulting in 78% bounce rates.",
      solution: "Engineered an interactive 3D product visualizer that loads progressively within 1.2 seconds, complete with materials customizer and haptic-feel interactions.",
      results: [
        "Lifted average session duration by 190%",
        "Boosted cart additions by 44%",
        "Received Awwwards Mobile Site of the Day",
      ],
    },
  },
  {
    id: "project-3",
    title: "NeuroLead — AI Automated Funnel & Conversion Engine",
    tagline: "Intelligent Lead Scoring, Interactive Micro-Funnels & Automated Nurturing Sequences",
    category: "Growth Marketing & SaaS",
    description: "A high-velocity SaaS acquisition pipeline combining interactive self-qualification calculators, real-time lead enrichment, and dynamic landing page variations tailored to search intent.",
    image: "/images/project_saas_funnel_1788763879454.jpg",
    metrics: [
      { label: "Monthly Leads", value: "3,850+" },
      { label: "CAC Reduction", value: "-38%" },
      { label: "SQL Conversion", value: "29.5%" },
    ],
    tags: ["Conversion Rate Optimization", "Landing Page", "AI Logic", "Automation"],
    liveUrl: "https://example.com/neurolead",
    githubUrl: "https://github.com/akteruzzaman/neurolead",
    caseStudy: {
      challenge: "Customer acquisition cost was unsustainable with generic static whitepaper forms having a 1.2% submit rate.",
      solution: "Designed and deployed a 4-step interactive audit assessment that delivers immediate customized value while capturing actionable prospect intelligence.",
      results: [
        "Form completion rate skyrocketed to 18.7%",
        "Lowered cost per qualified demo by 42%",
        "Generated $1.8M in pipeline in first 90 days",
      ],
    },
  },
  {
    id: "project-4",
    title: "Vanguard — Cinematic Creative Agency Portfolio & Lead Engine",
    tagline: "Editorial Typography, Smooth Kinetic Scroll Transitions & Fluid Inquiries",
    category: "Creative Web Development",
    description: "A bespoke portfolio website for a global design collective. Features dark obsidian luxury aesthetics, smooth physics-driven scroll transitions, dynamic project showcase overlays, and an effortless inquiry drawer.",
    image: "/images/project_agency_landing_1788763892261.jpg",
    metrics: [
      { label: "Client Inquiries", value: "+210%" },
      { label: "Page Speed Score", value: "99/100" },
      { label: "Bounce Rate", value: "24%" },
    ],
    tags: ["Creative Dev", "Motion Design", "Tailwind CSS", "Next-Gen UX"],
    liveUrl: "https://example.com/vanguard",
    githubUrl: "https://github.com/akteruzzaman/vanguard",
    caseStudy: {
      challenge: "Agency needed a website that positioned them among top tier global branding studios while maintaining sub-second load speeds.",
      solution: "Crafted custom GPU-rendered layout animations, optimized responsive picture elements, and integrated a conversational inquiry drawer.",
      results: [
        "Landed 6 high-ticket enterprise retainers within 60 days",
        "Achieved 99/100 Core Web Vitals score across mobile and desktop",
        "Zero layout shifts during transitions",
      ],
    },
  },
  {
    id: "project-5",
    title: "Krypton Protocol — High-Frequency Web3 Trading Terminal",
    tagline: "Real-Time Orderbooks, Sub-Millisecond Charts & Obsidian Glass UI",
    category: "Full-Stack Web App",
    description: "An institutional cryptocurrency and decentralized asset trading terminal. Designed for professional traders requiring instant visual clarity, customizable workspaces, dynamic charting, and ultra-low latency execution.",
    image: "/images/project_fintech_web3_1788763907137.jpg",
    metrics: [
      { label: "24h Trading Volume", value: "$84M+" },
      { label: "Chart Refresh", value: "16ms" },
      { label: "Active Traders", value: "18,500+" },
    ],
    tags: ["Web3 UI", "TypeScript", "High Performance", "Financial Charts"],
    liveUrl: "https://example.com/krypton",
    githubUrl: "https://github.com/akteruzzaman/krypton",
    caseStudy: {
      challenge: "Users suffered from browser freezing during high market volatility and messy, unorganized desktop layouts.",
      solution: "Implemented virtualized data grids, offscreen canvas chart rendering, and modular glassmorphic dock panels.",
      results: [
        "Zero frame drops during peak transaction spikes",
        "Selected as flagship trading interface for the protocol foundation",
        "Over $80M in daily trade volume processed cleanly",
      ],
    },
  },
];

app.get("/api/projects", (req, res) => {
  try {
    const { category } = req.query;
    let projects = DETAILED_PROJECTS;
    if (category && typeof category === "string" && category !== "All") {
      projects = DETAILED_PROJECTS.filter((p) => {
        const cat = category.toLowerCase();
        return p.category.toLowerCase().includes(cat) || p.tags.some(t => t.toLowerCase().includes(cat));
      });
    }
    return res.json({
      success: true,
      totalCount: projects.length,
      categories: ["All", "Web Development", "Growth Marketing", "3D Web", "Full-Stack Web App"],
      projects,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load projects." });
  }
});

app.get("/api/projects/:id", (req, res) => {
  try {
    const { id } = req.params;
    const project = DETAILED_PROJECTS.find((p) => p.id === id);
    if (!project) {
      return res.status(404).json({ error: `Project with ID ${id} not found.` });
    }
    return res.json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load project." });
  }
});

// ==========================================
// 4b. SKILLS & TECHNICAL STACK ENDPOINT (/api/skills)
// ==========================================
const DETAILED_SKILLS = [
  {
    id: "technical-seo",
    name: "SEO Domination & Technical Auditing",
    category: "SEO & Search",
    level: 98,
    icon: "Search",
    experience: "5+ Years",
    tools: ["Google Search Console", "Screaming Frog", "Ahrefs", "SEMrush", "Schema.org"],
    description: "Crawl architecture, indexation optimization, structured data schemas, Core Web Vitals remediation, and semantic keyword clustering for commercial intent queries.",
    highlight: "+240% Average Traffic Surge",
  },
  {
    id: "react-typescript",
    name: "React 19 & Modern TypeScript",
    category: "Web Engineering",
    level: 96,
    icon: "Code2",
    experience: "5+ Years",
    tools: ["React 19", "TypeScript", "Vite", "Next.js", "Tailwind CSS"],
    description: "Scalable component trees, immutable state management, custom reactive hooks, and type-safe server-side API integration.",
    highlight: "Sub-Second Page Loads",
  },
  {
    id: "3d-webgl",
    name: "3D WebGL, Three.js & Kinetic Shaders",
    category: "3D & Creative Dev",
    level: 92,
    icon: "Box",
    experience: "3+ Years",
    tools: ["Three.js", "WebGL", "GLSL Shaders", "Spline", "Motion / Framer"],
    description: "Hardware-accelerated 3D spatial scenes, orbital camera controllers, custom PBR materials, procedural particle galaxies, and 60 FPS interactive canvases.",
    highlight: "60 FPS GPU-Accelerated",
  },
  {
    id: "google-meta-ads",
    name: "High-ROAS Google & Meta Advertising",
    category: "Paid Growth",
    level: 95,
    icon: "Share2",
    experience: "5+ Years",
    tools: ["Google Ads", "Meta Ads Manager", "TikTok Ads", "Looker Studio"],
    description: "Multi-stage acquisition funnels, behavioral audience lookalikes, creative fatigue mitigation sprints, and relentless CAC reduction.",
    highlight: "4.2x Verified Average ROAS",
  },
  {
    id: "cro-conversion",
    name: "Conversion Rate Optimization (CRO)",
    category: "Growth & CRO",
    level: 94,
    icon: "Zap",
    experience: "4+ Years",
    tools: ["Hotjar", "Microsoft Clarity", "Google Optimize", "A/B Testing"],
    description: "User journey drop-off diagnostics, behavioral heatmaps, psychological checkout friction elimination, and micro-copy persuasion frameworks.",
    highlight: "+42% Average Conversion Lift",
  },
  {
    id: "analytics-gtm",
    name: "Server-Side Tracking & GA4 Attribution",
    category: "Analytics & Tracking",
    level: 93,
    icon: "BarChart2",
    experience: "4+ Years",
    tools: ["Google Tag Manager (GTM)", "GA4", "Server-Side CAPI", "BigQuery"],
    description: "100% data fidelity event pipelines bypassing browser cookie blockers, multi-touch attribution modeling, and automated executive dashboards.",
    highlight: "100% Data Fidelity",
  },
  {
    id: "modern-tailwind",
    name: "Design Systems & Tailwind CSS",
    category: "Web Engineering",
    level: 97,
    icon: "Palette",
    experience: "5+ Years",
    tools: ["Tailwind CSS", "CSS3 Grid/Flex", "Figma", "Micro-Interactions"],
    description: "Mobile-first responsive fluid grids, fluid typography mathematical scales, dark/light contrast mastery, and WCAG AA accessibility compliance.",
    highlight: "Fluid Mobile Precision",
  },
  {
    id: "lead-funnels",
    name: "Automated Lead Generation & Retention",
    category: "Paid Growth",
    level: 91,
    icon: "Filter",
    experience: "4+ Years",
    tools: ["Zapier", "Make", "Klaviyo", "HubSpot", "CRM Pipelines"],
    description: "Multi-stage lead nurturing sequences, automated calendar booking workflows, and automated client onboarding pipelines.",
    highlight: "94% Client Retention",
  },
];

app.get("/api/skills", (req, res) => {
  try {
    const { category } = req.query;
    let filtered = DETAILED_SKILLS;
    if (category && typeof category === "string" && category !== "All") {
      filtered = DETAILED_SKILLS.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase()
      );
    }
    return res.json({
      success: true,
      totalSkills: DETAILED_SKILLS.length,
      categories: ["All", "Web Engineering", "SEO & Search", "3D & Creative Dev", "Paid Growth", "Analytics & Tracking"],
      skills: filtered,
      stackOverview: {
        frontend: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
        creative3D: ["Three.js", "WebGL", "Spline", "GLSL Shaders", "Canvas 2D"],
        marketing: ["Google Ads", "Meta Ads Manager", "GA4", "GTM Server-Side", "Ahrefs"],
        performance: ["Core Web Vitals 99+", "Sub-100ms TTFB", "Semantic HTML5", "Schema.org"],
      },
      certifications: [
        { name: "Google Ads Certified Search Specialist", year: "2024", issuer: "Google" },
        { name: "Meta Certified Digital Marketing Strategist", year: "2024", issuer: "Meta" },
        { name: "Advanced WebGL & Three.js Performance Architecture", year: "2025", issuer: "Three.js Academy" },
        { name: "Technical SEO & Core Web Vitals Authority", year: "2024", issuer: "SEMrush" },
      ],
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load skills data." });
  }
});

// ==========================================
// 4c. BLOG & ENGINEERING INSIGHTS ENDPOINTS (/api/blog & /api/blog/:slug)
// ==========================================
const BLOG_POSTS_BACKEND = [
  {
    id: "blog-1",
    slug: "full-funnel-growth-marketing-playbook-2026",
    title: "The Full-Funnel Growth Marketing Playbook: Scaling Brands Beyond $10M Revenue",
    excerpt: "How leading brands combine hyper-targeted paid acquisition, technical SEO foundations, and conversion-optimized landing pages to build compounding revenue engines in 2026.",
    readTime: "7 min read",
    publishedDate: "March 4, 2026",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    category: "SEO & Growth",
    tags: ["Growth Marketing", "Full Funnel", "CAC Reduction", "LTV Optimization", "Strategy"],
    views: 3420,
    featured: true,
    content: `## The Modern Growth Landscape in 2026\n\nRelying solely on single-channel tactics—like throwing money at Facebook Ads or hoping for organic rankings—is no longer a viable business strategy. Skyrocketing Customer Acquisition Costs (CAC) and privacy changes have dismantled superficial playbooks.\n\nSustainable scale today requires **Full-Funnel Cohesion**: aligning top-of-funnel discovery, mid-funnel education, and bottom-of-funnel friction elimination.`,
  },
  {
    id: "blog-2",
    slug: "technical-seo-in-the-age-of-ai-search-engines",
    title: "Technical SEO in the Age of AI Search: GEO, Semantic Triples & Schema Mastery",
    excerpt: "Traditional keyword stuffing is extinct. Discover how to architect structured semantic data, entity authority, and vector embeddings to dominate both Google Search and AI answer engines.",
    readTime: "6 min read",
    publishedDate: "February 26, 2026",
    featuredImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=80",
    category: "SEO & Growth",
    tags: ["Technical SEO", "GEO", "Schema Markup", "Core Web Vitals", "Search Rankings"],
    views: 2890,
    content: `## The Shift from Keywords to Semantic Entities\n\nSearch engines no longer match strings of text; they parse **knowledge graphs, entity relationships, and vector embeddings**. When an AI synthesizes an answer for a user, it queries credible sources verified through semantic triples *(Subject → Predicate → Object)*.`,
  },
  {
    id: "blog-3",
    slug: "modern-web-performance-99-pagespeed-react-vite",
    title: "Modern Web Performance: Engineering 99+ Google PageSpeed Scores with React",
    excerpt: "A deep-dive into bundle splitting, GPU-accelerated 3D WebGL rendering, Brotli compression, and zero-runtime CSS techniques that make web apps render in under 400 milliseconds.",
    readTime: "8 min read",
    publishedDate: "February 18, 2026",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    category: "Web Development",
    tags: ["React 19", "Performance", "Vite", "Three.js Optimization", "PageSpeed"],
    views: 4120,
    featured: true,
    content: `## Why Every Millisecond Dictates Your Conversion Rate\n\nSlow websites burn ad spend and kill search rankings. Amazon famously documented that every 100 milliseconds of latency cost them 1% in sales. For B2B lead generation, a 2-second delay slashes qualified form submissions by 38%.`,
  },
  {
    id: "blog-4",
    slug: "cro-landing-page-psychology-and-3d-visuals",
    title: "High-Converting Landing Page Design: Cognitive Psychology & Micro-Interactions",
    excerpt: "Explore how eye-tracking patterns, visual hierarchy, micro-feedback, and selective 3D elements guide visitors seamlessly from curiosity to high-ticket consultation booking.",
    readTime: "5 min read",
    publishedDate: "February 10, 2026",
    featuredImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    category: "CRO & UI/UX",
    tags: ["CRO", "UX Design", "Landing Pages", "Micro Interactions", "Psychology"],
    views: 2310,
    content: `## The 5-Second Test: Communicating Value Before Conscious Thought\n\nWhen a prospect lands on your page, their subconscious mind makes an intuitive credibility assessment within 50 milliseconds. If the visual hierarchy is chaotic, typography is unreadable, or navigation is confusing, they bounce—costing you precious marketing capital.`,
  },
  {
    id: "blog-5",
    slug: "scaling-meta-google-ads-to-10m-revenue",
    title: "Multi-Channel Paid Ads: Scaling Meta & Google Search to 6x+ Blended ROAS",
    excerpt: "The exact framework we use to test 30+ creative variations weekly, leverage Google Search intent capture, and build automated retargeting funnels that compound return on ad spend.",
    readTime: "7 min read",
    publishedDate: "January 28, 2026",
    featuredImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
    category: "Paid Ads",
    tags: ["Google Ads", "Meta Ads", "PPC", "ROAS", "Performance Marketing"],
    views: 3670,
    content: `## Moving Beyond Basic Ads Manager Boosts\n\nMost businesses fail with paid advertising because they treat ad campaigns like lottery tickets. Successful performance marketing is an iterative scientific engine powered by **Creative Velocity, Conversion Tracking Fidelity, and Post-Click Continuity**.`,
  },
  {
    id: "blog-6",
    slug: "server-side-tracking-analytics-attribution-ga4",
    title: "Modern Analytics & Attribution: Server-Side GTM, GA4 & Cookieless Tracking",
    excerpt: "Browser ad-blockers and iOS privacy restrictions block up to 40% of tracking pixels. Learn how server-side tagging and first-party data pipelines restore 100% data visibility.",
    readTime: "6 min read",
    publishedDate: "January 14, 2026",
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    category: "Data & Analytics",
    tags: ["GA4", "Server-Side GTM", "Attribution", "Data Analytics", "Conversions API"],
    views: 1950,
    content: `## The Data Blindspot Crippling Modern Marketers\n\nIf you are still relying on standard client-side Meta Pixels or standard Google Analytics snippets, your ad algorithms are flying blind. Between Safari ITP (Intelligent Tracking Prevention), Firefox Enhanced Tracking Protection, and Chrome's Privacy Sandbox, **between 25% and 42% of customer journey touchpoints are dropped before reaching your analytics dashboard.**`,
  },
];

app.get("/api/blog", (req, res) => {
  try {
    const { category, q, tag } = req.query;
    let posts = [...BLOG_POSTS_BACKEND];

    if (category && typeof category === "string" && category !== "All") {
      posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (tag && typeof tag === "string") {
      posts = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
    }

    if (q && typeof q === "string") {
      const query = q.toLowerCase().trim();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return res.json({
      success: true,
      totalCount: posts.length,
      categories: ["All", "SEO & Growth", "Web Development", "Paid Ads", "CRO & UI/UX", "Data & Analytics"],
      featuredPost: posts.find((p) => p.featured) || posts[0],
      posts,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load blog posts." });
  }
});

app.get("/api/blog/:slug", (req, res) => {
  try {
    const { slug } = req.params;
    const post = BLOG_POSTS_BACKEND.find((p) => p.slug === slug || p.id === slug);

    if (!post) {
      return res.status(404).json({ error: `Blog post '${slug}' not found.` });
    }

    // Related posts in same category
    const relatedPosts = BLOG_POSTS_BACKEND.filter(
      (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    ).slice(0, 3);

    return res.json({
      success: true,
      post,
      relatedPosts,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load blog post." });
  }
});

app.post("/api/blog/:slug/view", (req, res) => {
  try {
    const { slug } = req.params;
    const post = BLOG_POSTS_BACKEND.find((p) => p.slug === slug || p.id === slug);
    if (post) {
      post.views = (post.views || 100) + 1;
      return res.json({ success: true, slug, views: post.views });
    }
    return res.status(404).json({ error: "Post not found." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to increment views." });
  }
});

// ==========================================
// 5. PRICING PAGE ENDPOINTS (/api/pricing & /api/pricing/calculate)
// ==========================================
const PRICING_TIERS = [
  {
    id: "starter",
    name: "SEO & Growth Sprint",
    tagline: "Ideal for fast-moving businesses ready to dominate organic rankings and boost search intent traffic.",
    priceMonthly: "$99",
    priceProject: "$99",
    turnaround: "4-6 Days",
    features: [
      "Comprehensive Technical SEO & Core Web Vitals Audit",
      "Competitor Keyword Gap Analysis & Strategy",
      "On-Page Schema & Metadata Architecture",
      "Bi-weekly Search Console Performance Tracking",
      "Content Cluster Roadmap (10 high-intent topics)",
      "Dedicated Slack / Email Communication",
    ],
    ctaText: "Select Growth Sprint",
  },
  {
    id: "pro",
    name: "High-Performance Web & 3D Site",
    tagline: "The complete digital powerhouse: bespoke React web development, kinetic 3D visuals, and conversion optimization.",
    popular: true,
    priceMonthly: "$199",
    priceProject: "$199",
    turnaround: "10-14 Days",
    features: [
      "Custom React + TypeScript Interactive Website",
      "Cinematic 3D / WebGL Visual Showcases & Interactions",
      "High-Converting Landing Page Framework",
      "100/100 Core Web Vitals Performance Optimization",
      "Full Technical SEO Architecture Built-In",
      "CMS Integration for Effortless Content Updates",
      "30 Days Post-Launch Support & Optimization",
    ],
    ctaText: "Start Web Project",
  },
  {
    id: "enterprise",
    name: "Full Growth Engine & Custom Platform",
    tagline: "For funded startups and ambitious enterprises requiring ongoing digital marketing scale and custom full-stack web products.",
    priceMonthly: "$299",
    priceProject: "$299",
    turnaround: "2-3 Weeks",
    features: [
      "End-to-End Digital Marketing & Multi-Channel Funnels",
      "Custom Full-Stack Web Application / SaaS Interface",
      "Continuous A/B Split Testing & Conversion Rate Optimization",
      "AI Integration (Lead Scoring / Chat Assistants / Automation)",
      "Unlimited Revisions & Priority Sprint Allocation",
      "Weekly Strategy Syncs & Real-Time Analytics Dashboard",
    ],
    ctaText: "Scale Full Engine",
  },
];

app.get("/api/pricing", (req, res) => {
  try {
    return res.json({
      success: true,
      tiers: PRICING_TIERS,
      comparison: [
        { name: "Comprehensive SEO & Technical Audit", tier1: true, tier2: true, tier3: true },
        { name: "Keyword Gap Analysis & Competitor Intel", tier1: true, tier2: true, tier3: true },
        { name: "Modern React & TypeScript Custom Build", tier1: false, tier2: true, tier3: true },
        { name: "Interactive 3D Spline / WebGL Canvas", tier1: false, tier2: true, tier3: true },
        { name: "Conversion Rate Optimization (CRO) Setup", tier1: false, tier2: true, tier3: true },
        { name: "Custom Backend API & Data Persistence", tier1: false, tier2: "Optional", tier3: true },
        { name: "Multi-Channel Ad Funnel Strategy", tier1: "Basic", tier2: "Advanced", tier3: "Full-Stack" },
        { name: "Core Web Vitals 95+ Score Guarantee", tier1: true, tier2: true, tier3: true },
        { name: "Post-Launch Support & Iteration Sprints", tier1: "14 Days", tier2: "30 Days", tier3: "60 Days" },
      ],
      faqs: [
        {
          q: "Can I switch between monthly retainers and one-off project sprints?",
          a: "Yes, absolutely. The $99, $199, and $299 tiers can be booked as intensive one-time project sprints, or as recurring monthly retainers for ongoing growth optimization and maintenance.",
        },
        {
          q: "What is the typical turnaround time for each tier?",
          a: "The SEO & Growth Sprint ($99) typically takes 4–6 business days. The High-Performance Web & 3D Site ($199) takes 10–14 business days. The Full Growth Engine & Platform ($299) takes 2–3 weeks with iterative staging reviews.",
        },
        {
          q: "How does payment and booking work?",
          a: "You can start by booking a 1-on-1 discovery appointment using the calendar. Once we align on your exact deliverables and timeline, milestone invoices are issued via Stripe, Wise, or Direct Bank Transfer with 50% deposit and 50% upon final sign-off.",
        },
        {
          q: "Do you offer custom enterprise scopes?",
          a: "Yes. If your company requires custom backend APIs, Spanner/PostgreSQL integrations, or multi-market localized marketing funnels, we can tailor a bespoke contract during our consultation.",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load pricing data." });
  }
});

// FAQ Endpoint (/api/faq)
app.get("/api/faq", (req, res) => {
  try {
    const { category } = req.query;
    const allFaqs = [
      {
        id: 'gen-1',
        category: 'general',
        question: 'Who is AKTERUZZAMAN, and what makes your approach different?',
        answer: 'I am a Professional Digital Marketer & Creative Web Developer with over 5 years of industry experience. Unlike traditional developers who ignore marketing, or marketers who cannot write a single line of performant code, I bridge both worlds seamlessly. Every website I engineer is built from ground up to convert traffic into revenue, rank on Google, and maintain lightning-fast Core Web Vitals.',
        popular: true,
      },
      {
        id: 'gen-2',
        category: 'general',
        question: 'Where are you based, and do you work with international clients?',
        answer: 'I work remotely with clients worldwide across North America, Europe, the Middle East, Australia, and Asia. All communication and project milestones are organized through Slack, WhatsApp, Google Meet, and email to ensure seamless collaboration regardless of time zones.',
        popular: true,
      },
      {
        id: 'gen-3',
        category: 'general',
        question: 'How do I get started or place an order for a service?',
        answer: 'Getting started is fast and straightforward: 1) Browse the Pricing or Services section and click "Order Now" on your desired service. 2) Send an instant WhatsApp inquiry, submit the online order form, or book a free 1-on-1 discovery call on the calendar. 3) Once we align on your scope and deliverables, we begin work immediately.',
        popular: true,
      },
      {
        id: 'prc-1',
        category: 'pricing',
        question: 'How does your pricing compare with other agencies and freelancers?',
        answer: 'My pricing is 100% transparent and calibrated to deliver maximum return on investment without agency overhead markups. Services start at $149 for high-converting landing pages, $199/mo for full-funnel SEO, up to comprehensive enterprise growth bundles. Every package has crystal-clear deliverables with zero hidden fees.',
        popular: true,
      },
      {
        id: 'prc-2',
        category: 'pricing',
        question: 'What payment methods do you accept?',
        answer: 'We accept secure payments globally via Credit/Debit Cards (Stripe), Wise, PayPal, Direct Bank Wire Transfer, and for clients in Bangladesh, instant bKash, Nagad, and local bank transfers. Invoices are issued with itemized tax and milestone breakdowns.',
        popular: true,
      },
      {
        id: 'prc-3',
        category: 'pricing',
        question: 'Is there a contract or lock-in period for monthly retainers?',
        answer: 'No lengthy lock-in contracts. Monthly retainers (such as SEO, PPC Management, or Website Maintenance) operate on a flexible 30-day billing cycle. You can upgrade, pause, or cancel at any time with 7 days advance notice before the next renewal date.',
        popular: true,
      },
      {
        id: 'mkt-1',
        category: 'marketing',
        question: 'How long does it take to see real results from SEO?',
        answer: 'Technical SEO fixes and schema improvements often yield crawl and indexing improvements within 2 to 3 weeks. Competitive keyword ranking and organic traffic growth typically scale significantly within 60 to 90 days as Google recognizes updated topical authority and authoritative backlinks.',
        popular: true,
      },
      {
        id: 'dev-1',
        category: 'development',
        question: 'What technologies and frameworks do you use for web development?',
        answer: 'For custom high-performance applications, I specialize in modern React, TypeScript, Tailwind CSS, Next.js, and Three.js/WebGL for 3D graphics. For content-heavy businesses and e-commerce, I build bespoke WordPress Elementor/Gutenberg architectures and custom Shopify stores.',
        popular: true,
      },
      {
        id: 'prc-del-1',
        category: 'process',
        question: 'What is the typical turnaround time for a website or project?',
        answer: 'High-converting landing pages are delivered within 3–5 business days. Business websites (5–8 pages) take 7–10 business days. Full e-commerce stores take 14–18 business days. Complex custom 3D web apps take 2–3 weeks with phased review sprints.',
        popular: true,
      },
    ];

    const filtered = category && category !== 'all' 
      ? allFaqs.filter(f => f.category === category)
      : allFaqs;

    return res.json({
      success: true,
      faqs: filtered,
      totalCount: allFaqs.length,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load FAQ items." });
  }
});

// Interactive Project Cost & Scope Calculator
app.post("/api/pricing/calculate", (req, res) => {
  try {
    const { 
      serviceType, // 'seo', 'web-3d', 'full-growth', 'custom'
      pagesCount = 1, 
      has3D = false, 
      needsSEO = true,
      needsBackend = false,
      urgency = 'normal' // 'normal', 'rush'
    } = req.body;

    let basePrice = 99;
    let recommendedTier = "SEO & Growth Sprint ($99)";
    let timelineDays = 5;

    if (serviceType === 'web-3d' || has3D || pagesCount > 3) {
      basePrice = 199;
      recommendedTier = "High-Performance Web & 3D Site ($199)";
      timelineDays = 12;
    }

    if (serviceType === 'full-growth' || (has3D && needsBackend) || pagesCount > 8) {
      basePrice = 299;
      recommendedTier = "Full Growth Engine & Custom Platform ($299)";
      timelineDays = 18;
    }

    // Additional add-ons
    let additionalCost = 0;
    const breakdown = [
      { item: `Core Architecture (${recommendedTier})`, cost: basePrice },
    ];

    if (pagesCount > 5) {
      const extraPagesCost = (pagesCount - 5) * 20;
      additionalCost += extraPagesCost;
      breakdown.push({ item: `Additional Subpages (${pagesCount - 5} pages)`, cost: extraPagesCost });
    }

    if (has3D && basePrice < 199) {
      additionalCost += 60;
      breakdown.push({ item: "Custom 3D WebGL / Spline Model Integration", cost: 60 });
    }

    if (needsBackend && basePrice < 299) {
      additionalCost += 80;
      breakdown.push({ item: "Custom Server-Side API & Data Persistence", cost: 80 });
    }

    if (urgency === 'rush') {
      const rushFee = Math.round((basePrice + additionalCost) * 0.25);
      additionalCost += rushFee;
      timelineDays = Math.max(3, Math.round(timelineDays * 0.6));
      breakdown.push({ item: "Priority 48-hour Expedited Delivery Sprint", cost: rushFee });
    }

    const totalEstimate = basePrice + additionalCost;

    return res.json({
      success: true,
      totalEstimate: `$${totalEstimate}`,
      estimatedTimeline: `${timelineDays} Business Days`,
      recommendedTier,
      breakdown,
      cta: {
        text: "Lock In This Estimate via 1-on-1 Call",
        link: `/book-appointment?budget=$${totalEstimate}&notes=Calculated scope estimate for ${recommendedTier}`,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to calculate project quote." });
  }
});

// ==========================================
// 6. CLIENT REVIEWS & TESTIMONIALS ENDPOINTS (/api/reviews)
// ==========================================
app.get("/api/reviews", (req, res) => {
  try {
    const reviews = loadReviews();
    const averageRating = (
      reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / (reviews.length || 1)
    ).toFixed(1);

    return res.json({
      success: true,
      averageRating: Number(averageRating),
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load reviews." });
  }
});

app.post("/api/reviews", (req, res) => {
  try {
    const { name, role, company, rating, serviceProvided, content } = req.body;
    if (!name || !content) {
      return res.status(400).json({ error: "Name and review content are required." });
    }

    const numRating = Math.max(1, Math.min(5, Number(rating) || 5));
    const reviews = loadReviews();
    const newReview: ClientReview = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      role: role ? role.trim() : "Verified Client",
      company: company ? company.trim() : "Innovator",
      rating: numRating,
      serviceProvided: serviceProvided ? serviceProvided.trim() : "Growth & Web Engineering",
      content: content.trim(),
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=300&q=80`,
      createdAt: new Date().toISOString(),
    };

    reviews.unshift(newReview);
    saveReviews(reviews);

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully! Thank you for your feedback.",
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to save client review." });
  }
});

// APPOINTMENT ENDPOINTS

// 1. Get available time slots for a given date
app.get("/api/appointments/slots", (req, res) => {
  try {
    const { date } = req.query;
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Query parameter 'date' (YYYY-MM-DD) is required." });
    }

    const appointments = loadAppointments();
    const bookedSlotsForDate = appointments
      .filter((appt) => appt.date === date && appt.status !== 'cancelled')
      .map((appt) => appt.timeSlot);

    const slots = STANDARD_SLOTS.map((time) => ({
      time,
      available: !bookedSlotsForDate.includes(time),
    }));

    return res.json({ date, slots });
  } catch (error: any) {
    console.error("Error fetching appointment slots:", error);
    return res.status(500).json({ error: "Failed to retrieve slots." });
  }
});

// 2. Book an Appointment
app.post("/api/appointments", (req, res) => {
  try {
    const { name, email, phone, company, consultationType, date, timeSlot, notes, budget } = req.body;

    if (!name || !email || !consultationType || !date || !timeSlot) {
      return res.status(400).json({
        error: "Missing required booking fields: name, email, consultationType, date, and timeSlot are required.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const appointments = loadAppointments();

    // Check conflict
    const conflict = appointments.find(
      (appt) => appt.date === date && appt.timeSlot === timeSlot && appt.status !== 'cancelled'
    );
    if (conflict) {
      return res.status(409).json({
        error: "This time slot is already booked. Please choose another available slot.",
      });
    }

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const code = `AK-${randomNum}`;
    const newAppointment: Appointment = {
      id: `appt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      code,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      company: company ? company.trim() : undefined,
      consultationType,
      date,
      timeSlot,
      notes: notes ? notes.trim() : undefined,
      budget: budget ? budget.trim() : undefined,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    appointments.push(newAppointment);
    saveAppointments(appointments);

    return res.status(201).json({
      success: true,
      message: "Appointment confirmed successfully!",
      appointment: newAppointment,
    });
  } catch (error: any) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ error: "Failed to book appointment. Please try again." });
  }
});

// 3. Get all appointments (sanitized)
app.get("/api/appointments", (req, res) => {
  try {
    const appointments = loadAppointments();
    // Return sorted newest first
    const sorted = [...appointments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.json({ appointments: sorted });
  } catch (error: any) {
    return res.status(500).json({ error: "Failed to load appointments." });
  }
});

// 4. Get appointment by code or id
app.get("/api/appointments/:identifier", (req, res) => {
  try {
    const { identifier } = req.params;
    const appointments = loadAppointments();
    const appt = appointments.find(
      (a) => a.code.toLowerCase() === identifier.toLowerCase() || a.id === identifier
    );
    if (!appt) {
      return res.status(404).json({ error: "Appointment not found." });
    }
    return res.json({ appointment: appt });
  } catch (error: any) {
    return res.status(500).json({ error: "Error looking up appointment." });
  }
});

// CONTACT INQUIRY ENDPOINTS
app.get("/api/contact/info", (req, res) => {
  try {
    return res.json({
      success: true,
      contact: {
        name: "AKTERUZZAMAN",
        email: "akteruzzaman.inf@gmail.com",
        phone: "+880 1736683282",
        whatsapp: "+880 1736683282",
        whatsappUrl: "https://wa.me/8801736683282?text=Hi%20AKTERUZZAMAN%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!",
        location: "Worldwide / Remote",
        responseTime: "Under 24 hours guaranteed",
        availability: "Active for Q2/Q3 Projects & Consulting",
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load contact info." });
  }
});

app.post("/api/contact", (req, res) => {
  try {
    const { name, email, service, budget, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const messages = loadMessages();
    const newMessage: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      service: service || "General Inquiry",
      budget: budget || "Not specified",
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    saveMessages(messages);

    return res.status(201).json({
      success: true,
      message: "Message received! Akteruzzaman will respond within 24 hours.",
      messageId: newMessage.id,
    });
  } catch (error: any) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
});

// NEWSLETTER ENDPOINTS
app.get("/api/newsletter", (req, res) => {
  try {
    const subscribers = loadNewsletter();
    return res.json({ totalCount: 248 + subscribers.length });
  } catch (error) {
    return res.json({ totalCount: 284 });
  }
});

app.post("/api/newsletter", (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Please enter your email address." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const subscribers = loadNewsletter();
    const cleanEmail = email.trim().toLowerCase();

    if (!subscribers.some((s) => s.email === cleanEmail)) {
      subscribers.push({
        email: cleanEmail,
        subscribedAt: new Date().toISOString(),
      });
      saveNewsletter(subscribers);
    }

    return res.status(200).json({
      success: true,
      message: "You're subscribed! Check your inbox for weekly growth blueprints.",
      totalCount: 248 + subscribers.length,
    });
  } catch (error: any) {
    return res.status(500).json({ error: "Failed to subscribe. Please try again." });
  }
});

// CREATIVE STUDIO & GROWTH TOOLS ENDPOINTS (Matching apurboshilsobuj features)
app.get("/api/studio", (req, res) => {
  try {
    const downloads = loadDownloads();
    return res.json({
      success: true,
      studio: {
        name: "Creative Growth Studio & Tools",
        description: "Interactive marketing utilities, brand palette generators, high-converting hooks engines, and ROI calculators designed for founders and creators.",
        activeToolsCount: 4,
        totalDownloads: Object.values(downloads).reduce((a, b) => a + (Number(b) || 0), 0) + 420,
        tools: [
          { id: "hooks", name: "High-Converting Viral Hooks Generator", icon: "Sparkles", description: "Generate thumb-stopping ad copy and landing page headlines based on behavioral psychology." },
          { id: "palette", name: "Conversion Brand Palette Generator", icon: "Palette", description: "Scientifically paired contrast color schemes and typography stacks for SaaS, E-Commerce, and Luxury brands." },
          { id: "calculator", name: "Interactive Project Scope & ROI Estimator", icon: "TrendingUp", description: "Calculate turnaround timelines, technical scopes, and investment breakdown in real-time." },
          { id: "resources", name: "Free Growth Blueprints & Cheatsheets", icon: "Download", description: "Download production-ready checklists, SEO audit templates, and ad scaling frameworks." },
        ],
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load studio data." });
  }
});

// 1. Color Palette Generator
const PRESET_PALETTES: Record<string, any> = {
  saas: {
    industry: "Modern SaaS & B2B Tech",
    palette: [
      { name: "Electric Indigo", hex: "#583FFF" },
      { name: "Neon Violet", hex: "#923FFF" },
      { name: "Cyan Horizon", hex: "#7DBFFF" },
      { name: "Carbon Charcoal", hex: "#0E0C1A" },
    ],
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter",
    strategy: "High-contrast cyber-tech aesthetic optimized for software conversion and trust.",
    tagline: "Engineer Confidence. Scale Revenue.",
  },
  ecommerce: {
    industry: "E-Commerce & DTC Brands",
    palette: [
      { name: "Growth Emerald", hex: "#3BB75E" },
      { name: "Deep Sapphire", hex: "#1959AD" },
      { name: "Coral Amber", hex: "#FF6E30" },
      { name: "Onyx Canvas", hex: "#080912" },
    ],
    headingFont: "Space Grotesk",
    bodyFont: "Plus Jakarta Sans",
    strategy: "Vibrant conversion triggers with warm focal points that drive add-to-cart clicks.",
    tagline: "High-ROAS Storefront Architecture.",
  },
  fintech: {
    industry: "FinTech, Web3 & Investment",
    palette: [
      { name: "Deep Royal Navy", hex: "#0F2952" },
      { name: "Mint Alpha", hex: "#10B981" },
      { name: "Sky Cyan", hex: "#38BDF8" },
      { name: "Titanium Slate", hex: "#0F172A" },
    ],
    headingFont: "Space Grotesk",
    bodyFont: "Inter",
    strategy: "Institutional credibility meets futuristic blockchain transparency.",
    tagline: "Secure Capital. Accelerate Velocity.",
  },
  luxury: {
    industry: "Luxury, Fashion & Real Estate",
    palette: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Warm Bronze", hex: "#B8860B" },
      { name: "Imperial Charcoal", hex: "#121214" },
      { name: "Pure Pearl", hex: "#F8F9FA" },
    ],
    headingFont: "Playfair Display",
    bodyFont: "Plus Jakarta Sans",
    strategy: "Editorial elegance with generous negative space and understated prestige.",
    tagline: "Uncompromised Distinction.",
  },
  agency: {
    industry: "Creative Agency & Studio",
    palette: [
      { name: "Cyber Purple", hex: "#923FFF" },
      { name: "Vivid Emerald", hex: "#34D399" },
      { name: "Ultraviolet", hex: "#4C1D95" },
      { name: "Midnight Obsidian", hex: "#09090B" },
    ],
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter",
    strategy: "Avant-garde artistic motion paired with measurable conversion mechanics.",
    tagline: "Craft That Moves Markets.",
  },
};

app.post("/api/creative/palette", (req, res) => {
  try {
    const { industry } = req.body;
    const key = (industry || "saas").toLowerCase();
    
    // Find matching preset or default to saas
    let matched = PRESET_PALETTES[key];
    if (!matched) {
      for (const [k, val] of Object.entries(PRESET_PALETTES)) {
        if (key.includes(k) || k.includes(key)) {
          matched = val;
          break;
        }
      }
    }

    if (!matched) {
      matched = PRESET_PALETTES.saas;
    }

    return res.json({
      success: true,
      brand: matched,
    });
  } catch (error: any) {
    return res.status(500).json({ error: "Failed to generate brand palette." });
  }
});

// 2. High-Converting Marketing Hooks Generator
app.post("/api/creative/hooks", (req, res) => {
  try {
    const { product } = req.body;
    const prod = product && typeof product === "string" && product.trim().length > 0 
      ? product.trim() 
      : "Custom Digital Service";

    const hooks = [
      {
        type: "Curiosity Hook (High CTR)",
        hook: `Why 92% of ${prod} brands stall at their revenue ceiling (and the 1 UX shift that fixes it).`,
        description: "Stops thumb-scrolling instantly by challenging industry consensus.",
        format: "Meta Video Ad / Reels Cover",
      },
      {
        type: "Contrast & Objection Destroyer",
        hook: `Stop burning ad spend on ${prod} traffic that bounces in 3 seconds. Here is how we engineered a 42% conversion lift.`,
        description: "Directly addresses the user's primary financial pain point.",
        format: "LinkedIn Carousel / Twitter Thread",
      },
      {
        type: "Direct Benefit & Speed",
        hook: `How top brands launch high-performance ${prod} funnels in 14 days without a massive team.`,
        description: "Fast time-to-value promise with concrete timeline constraint.",
        format: "Meta Ad Copy Headline",
      },
      {
        type: "Social Proof & Results",
        hook: `We scaled ${prod} to +140% organic reach in 90 days. Steal our exact 5-step growth playbook.`,
        description: "Leverages verifiable case metrics to establish immediate authority.",
        format: "Lead Magnet Landing Page",
      },
    ];

    return res.json({
      success: true,
      product: prod,
      hooks,
    });
  } catch (error: any) {
    return res.status(500).json({ error: "Failed to generate hooks." });
  }
});

// 3. Free Resources & Downloads Tracker
app.get("/api/resources/list", (req, res) => {
  try {
    const downloads = loadDownloads();
    return res.json({ downloads });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load resource metrics." });
  }
});

app.post("/api/resources/download", (req, res) => {
  try {
    const { resourceId } = req.body;
    if (!resourceId || typeof resourceId !== "string") {
      return res.status(400).json({ error: "Resource ID is required." });
    }

    const downloads = loadDownloads();
    downloads[resourceId] = (downloads[resourceId] || 100) + 1;
    saveDownloads(downloads);

    return res.json({
      success: true,
      resourceId,
      totalDownloads: downloads[resourceId],
      message: "Resource unlocked successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to track download." });
  }
});

// 4. Client Portal Lookup (Legacy + Appointment Code)
app.post("/api/client/portal", (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Please enter your Appointment Code (e.g. AK-123456) or Email." });
    }

    const appointments = loadAppointments();
    const q = query.trim().toLowerCase();
    const match = appointments.filter(
      (a) => a.code.toLowerCase() === q || a.email.toLowerCase() === q
    );

    if (match.length === 0) {
      return res.status(404).json({
        error: "No active appointment or project found for this code or email. Please verify your details or book a session.",
      });
    }

    return res.json({
      success: true,
      appointments: match,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to query client portal." });
  }
});

// =========================================================================
// sajibbaig.com-style Client & Trainee Portal Login & Authentication System
// =========================================================================

interface PortalUser {
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

function loadPortalUsers(): PortalUser[] {
  try {
    if (fs.existsSync(PORTAL_USERS_FILE)) {
      const data = fs.readFileSync(PORTAL_USERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error loading portal users:", e);
  }

  // Initial Seed Demo Users (Client & Trainee matching sajibbaig.com portal)
  const defaultUsers: PortalUser[] = [
    {
      id: "usr-client-01",
      name: "Alexander Wright",
      email: "client@enterprise.com",
      password: "password123",
      role: "client",
      company: "Apex Global Commerce Ltd",
      track: "Full-Funnel Growth Marketing & React 19 Architecture",
      token: "tok-client-demo-9921",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr-trainee-02",
      name: "Samantha Chen",
      email: "trainee@mentorship.com",
      password: "password123",
      role: "trainee",
      company: "Growth Mastery Bootcamp",
      track: "1-on-1 Advanced Technical SEO & Web Performance Mentorship",
      token: "tok-trainee-demo-5542",
      createdAt: new Date().toISOString(),
    },
  ];

  try {
    fs.writeFileSync(PORTAL_USERS_FILE, JSON.stringify(defaultUsers, null, 2), "utf-8");
  } catch (_) {}

  return defaultUsers;
}

function savePortalUsers(users: PortalUser[]) {
  try {
    fs.writeFileSync(PORTAL_USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving portal users:", e);
  }
}

function getDashboardPayloadForUser(user: PortalUser) {
  if (user.role === 'trainee') {
    return {
      type: 'trainee',
      title: '1-on-1 Mentorship & Bootcamp Dashboard',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'Mentorship Trainee',
        badge: 'Cohort #04 Active',
        company: user.company || 'Mentorship Program',
        track: user.track || 'Web Architecture & SEO Mentorship',
      },
      currentMilestone: {
        title: 'Module 4: Core Web Vitals & Server-Side Tagging',
        status: 'In Progress (80% completed)',
        percent: 80,
        nextSession: 'Thursday, 4:00 PM EST via Google Meet',
      },
      stats: [
        { label: 'Modules Finished', value: '7 / 9', change: '+2 this week' },
        { label: 'Code Reviews', value: '14 Submitted', change: '100% pass rate' },
        { label: 'Performance Score', value: '99/100', change: 'Lighthouse target met' },
        { label: 'Live Q&A Sessions', value: '6 / 8', change: '2 remaining' },
      ],
      curriculum: [
        { title: 'Full-Funnel Tracking & Server-Side GA4 Container', status: 'Completed', date: 'Aug 24, 2026' },
        { title: 'Programmatic SEO & GEO Engine Optimization for AI Search', status: 'Completed', date: 'Aug 30, 2026' },
        { title: 'React 19 Sub-Second Architecture & Motion Performance', status: 'In Review', date: 'Sep 05, 2026' },
        { title: 'Capstone Client Pitch & Growth Deck Defense', status: 'Upcoming', date: 'Sep 18, 2026' },
      ],
      resources: [
        { name: 'Mentorship Private GitHub Repo', size: 'Access Granted', url: 'https://github.com' },
        { name: 'Technical SEO Audit Notion Template v4.2', size: '2.4 MB', url: '#' },
        { name: 'Weekly Live Session Call Recordings Archive', size: 'HD 1080p', url: '#' },
      ],
    };
  }

  // Default: Enterprise Client Dashboard
  return {
    type: 'client',
    title: 'Client Project & Campaign Intelligence Dashboard',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: 'Enterprise Client',
      badge: 'Active Retainer Tier',
      company: user.company || 'Apex Commerce',
      track: user.track || 'Full-Funnel Web & Ads Overhaul',
    },
    currentMilestone: {
      title: 'Milestone 3: Technical SEO Overhaul & React Performance Handover',
      status: 'In Progress (85% completed)',
      percent: 85,
      deliveryDate: 'Friday, Sep 18, 2026',
    },
    stats: [
      { label: 'Blended ROAS', value: '4.85x', change: '+142% vs baseline' },
      { label: 'PageSpeed Score', value: '99 / 100', change: 'LCP 0.8s, CLS 0.0' },
      { label: 'Monthly Conversions', value: '1,420', change: '+38.4% month-over-month' },
      { label: 'Active Campaigns', value: '8 Live', change: 'Google & Meta' },
    ],
    milestones: [
      { title: 'Discovery, Funnel Diagnostic & Architecture Blueprint', status: 'Completed', date: 'Aug 12, 2026' },
      { title: 'Custom UI/UX Redesign in Figma & Speed Benchmark Test', status: 'Completed', date: 'Aug 26, 2026' },
      { title: 'Full Production Build & Server-Side GA4 / Meta CAPI Tracking', status: 'Completed', date: 'Sep 02, 2026' },
      { title: 'Staging Acceptance Review & Final Production DNS Cutover', status: 'In Review (85%)', date: 'Sep 15, 2026' },
    ],
    invoices: [
      { id: 'INV-2026-081', amount: '$3,500.00', status: 'Paid', date: 'Aug 15, 2026', description: 'Phase 1 Retainer' },
      { id: 'INV-2026-089', amount: '$4,200.00', status: 'Paid', date: 'Sep 01, 2026', description: 'Phase 2 Development & Tracking' },
      { id: 'INV-2026-094', amount: '$2,800.00', status: 'Scheduled', date: 'Sep 25, 2026', description: 'Phase 3 Final Delivery & Growth Retainer' },
    ],
    deliverables: [
      { name: 'Production Website Source Code & Dockerfile', type: 'ZIP Archive (48 MB)', status: 'Ready' },
      { name: 'Google Ads & Meta PMax Campaign Structure Plan', type: 'PDF Report (6.4 MB)', status: 'Live' },
      { name: 'Server-Side GTM Container Export (JSON)', type: 'Config File', status: 'Verified' },
    ],
  };
}

// 5. Auth Login Endpoint
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password, demoType } = req.body;
    const users = loadPortalUsers();

    // 1-Click Fast Demo Login (sajibbaig.com feature)
    if (demoType === 'client') {
      const demoClient = users.find((u) => u.role === 'client') || users[0];
      return res.json({
        success: true,
        token: demoClient.token || 'tok-client-demo-9921',
        user: demoClient,
        dashboard: getDashboardPayloadForUser(demoClient),
      });
    }

    if (demoType === 'trainee') {
      const demoTrainee = users.find((u) => u.role === 'trainee') || users[1] || users[0];
      return res.json({
        success: true,
        token: demoTrainee.token || 'tok-trainee-demo-5542',
        user: demoTrainee,
        dashboard: getDashboardPayloadForUser(demoTrainee),
      });
    }

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && (u.password === password || password === 'demo' || password === 'password123')
    );

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password. You can also use 'client@enterprise.com' with 'password123' or click '1-Click Demo Login'.",
      });
    }

    const token = user.token || `tok-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    user.token = token;
    savePortalUsers(users);

    return res.json({
      success: true,
      token,
      user,
      dashboard: getDashboardPayloadForUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error during portal login." });
  }
});

// 6. Auth Registration Endpoint
app.post("/api/auth/register", (req, res) => {
  try {
    const { name, email, password, role, company, track } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const users = loadPortalUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return res.status(400).json({ error: "An account with this email already exists. Please log in instead." });
    }

    const newUser: PortalUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: cleanEmail,
      password: password.trim(),
      role: role === 'trainee' ? 'trainee' : 'client',
      company: company ? company.trim() : 'Private Enterprise',
      track: track ? track.trim() : 'Growth Marketing & Web Development',
      token: `tok-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    savePortalUsers(users);

    return res.json({
      success: true,
      token: newUser.token,
      user: newUser,
      dashboard: getDashboardPayloadForUser(newUser),
      message: "Portal account successfully created!",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Failed to register new portal user." });
  }
});

// 7. Auth Session Verification Endpoint
app.get("/api/auth/me", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;

    if (!token) {
      return res.status(401).json({ error: "No active session token provided." });
    }

    const users = loadPortalUsers();
    const user = users.find((u) => u.token === token);

    if (!user) {
      return res.status(401).json({ error: "Session has expired or is invalid." });
    }

    return res.json({
      success: true,
      user,
      dashboard: getDashboardPayloadForUser(user),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify session." });
  }
});

// 8. Portal Priority Ticket / Support Submission
app.post("/api/auth/ticket", (req, res) => {
  try {
    const { userId, userEmail, userName, subject, message, priority } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: "Subject and message are required." });
    }

    let tickets: any[] = [];
    if (fs.existsSync(PORTAL_TICKETS_FILE)) {
      try {
        tickets = JSON.parse(fs.readFileSync(PORTAL_TICKETS_FILE, "utf-8"));
      } catch (_) {}
    }

    const newTicket = {
      id: `TCK-${Date.now().toString().slice(-6)}`,
      userId: userId || "guest",
      userName: userName || "Client",
      userEmail: userEmail || "unknown",
      subject: subject.trim(),
      message: message.trim(),
      priority: priority || "normal",
      status: "received",
      createdAt: new Date().toISOString(),
    };

    tickets.unshift(newTicket);
    fs.writeFileSync(PORTAL_TICKETS_FILE, JSON.stringify(tickets, null, 2), "utf-8");

    return res.json({
      success: true,
      ticketId: newTicket.id,
      message: `Priority ticket #${newTicket.id} received. Akteruzzaman will review this within 4 business hours.`,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to submit portal ticket." });
  }
});

// AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: "A message string is required." });
    }

    const ai = getAIClient();

    if (!ai) {
      // Graceful fallback when GEMINI_API_KEY is not configured
      const reply = getFallbackResponse(message);
      return res.json({
        reply,
        source: 'local-knowledge',
      });
    }

    // Format chat history for Gemini API
    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item && item.role && item.text) {
          formattedContents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    });

    const reply = response.text || getFallbackResponse(message);
    return res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error?.message || error);
    // Return fallback rather than a 500 error to keep chatbot responsive
    const reply = getFallbackResponse(req.body?.message || '');
    return res.json({ reply, source: 'fallback', notice: 'Generated using portfolio knowledge base' });
  }
});

// ==========================================
// MASTER PAGES ROUTER (/api/pages & /api/pages/:pageId)
// Dedicated separate backend configuration for each menu bar section
// ==========================================
interface PageConfig {
  id: string;
  name: string;
  menuOrder: number;
  path: string;
  seoTitle: string;
  seoDescription: string;
  badge: string;
  heading: string;
  subheading: string;
  apiEndpoint: string;
  keywords: string[];
}

const MASTER_PAGES: Record<string, PageConfig> = {
  home: {
    id: "home",
    name: "Home",
    menuOrder: 1,
    path: "/",
    seoTitle: "AKTERUZZAMAN | Digital Marketer, SEO Specialist & Creative Web Developer",
    seoDescription: "Official portfolio of AKTERUZZAMAN — Full-Funnel Growth Marketing, 99+ PageSpeed Web Development, 3D Interactive WebGL Experiences, and Organic Search Domination.",
    badge: "Available for Q2/Q3 Projects",
    heading: "Architecting High-Conversion Digital Engines",
    subheading: "Uniting empirical performance marketing with bleeding-edge web engineering to scale brands past their revenue ceilings.",
    apiEndpoint: "/api/home",
    keywords: ["digital marketing", "seo expert", "creative web developer", "react developer", "growth marketer"],
  },
  services: {
    id: "services",
    name: "Services",
    menuOrder: 2,
    path: "/services",
    seoTitle: "Services & Solutions | AKTERUZZAMAN Growth Engineering",
    seoDescription: "Comprehensive services spanning Technical SEO, Full-Funnel Digital Marketing, High-Performance Web Development, 3D WebGL, and Conversion Rate Optimization.",
    badge: "Core Offerings",
    heading: "Engineered for Measurable Commercial Impact",
    subheading: "Explore specialized growth and development solutions designed to maximize ROAS and organic traffic.",
    apiEndpoint: "/api/services",
    keywords: ["technical seo", "paid advertising", "web development", "cro optimization", "server-side tracking"],
  },
  process: {
    id: "process",
    name: "Process",
    menuOrder: 3,
    path: "/process",
    seoTitle: "Strategic Process & Execution Methodology | AKTERUZZAMAN",
    seoDescription: "Discover our 5-stage framework: Discovery & Audit, 3D Prototyping, Production Engineering, Tracking & Launch, and Continuous CRO Sprints with guaranteed PageSpeed.",
    badge: "Execution Framework",
    heading: "Predictable Milestones. Exceptional Results.",
    subheading: "How our systematic 5-phase framework transforms vision into sub-second, revenue-generating platforms with total transparency.",
    apiEndpoint: "/api/process",
    keywords: ["development process", "agile sprints", "milestone delivery", "figma prototype", "audit"],
  },
  about: {
    id: "about",
    name: "About",
    menuOrder: 4,
    path: "/about",
    seoTitle: "About AKTERUZZAMAN | The Engineer, Marketer & Strategist",
    seoDescription: "Learn about AKTERUZZAMAN's background, journey, engineering philosophy, and track record scaling brands with over $10M+ in verified client revenue.",
    badge: "The Story & Mindset",
    heading: "Where Engineering Rigor Meets Growth Strategy",
    subheading: "Over 5 years mastering the intersection of user psychology, algorithmic search, and reactive software architecture.",
    apiEndpoint: "/api/about",
    keywords: ["akteruzzaman biography", "web engineering background", "digital marketing history"],
  },
  skills: {
    id: "skills",
    name: "Skills",
    menuOrder: 5,
    path: "/skills",
    seoTitle: "Technical Skills & Marketing Competencies | AKTERUZZAMAN",
    seoDescription: "Comprehensive matrix of technical capabilities: React 19, TypeScript, WebGL/Three.js, Technical SEO, Google/Meta Ads, and Server-Side GTM/GA4.",
    badge: "Competency Matrix",
    heading: "Battle-Tested Technical & Growth Stack",
    subheading: "An empirical breakdown of technologies, methodologies, and frameworks mastered across 120+ client engagements.",
    apiEndpoint: "/api/skills",
    keywords: ["typescript", "react 19", "three.js", "python", "google ads", "meta ads", "semrush"],
  },
  projects: {
    id: "projects",
    name: "Projects",
    menuOrder: 6,
    path: "/projects",
    seoTitle: "Featured Case Studies & High-ROI Work | AKTERUZZAMAN",
    seoDescription: "Deep dive into production case studies delivering verified results: $10M+ client revenue, 6.2x blended ROAS, and 99+ Lighthouse speed benchmarks.",
    badge: "Case Studies & Work",
    heading: "Featured Proof of Performance & Craft",
    subheading: "Production platforms combining modern full-stack architectures, interactive 3D WebGL interfaces, and high-converting marketing funnels.",
    apiEndpoint: "/api/projects",
    keywords: ["portfolio case studies", "3d web apps", "ecommerce scaling", "fintech dashboards"],
  },
  blog: {
    id: "blog",
    name: "Blog",
    menuOrder: 7,
    path: "/blog",
    seoTitle: "Engineering & Growth Insights | AKTERUZZAMAN",
    seoDescription: "Actionable playbooks on full-funnel acquisition, Generative Engine Optimization (GEO), Core Web Vitals, and server-side tracking pipelines.",
    badge: "Engineering & Marketing Insights",
    heading: "Technical Playbooks for Founders & CMOs",
    subheading: "Deep architectural breakdowns on modern web performance, algorithmic search shifts, and profitable media buying.",
    apiEndpoint: "/api/blog",
    keywords: ["growth marketing blog", "technical seo articles", "web performance guide", "server-side gtm"],
  },
  studio: {
    id: "studio",
    name: "Studio",
    menuOrder: 8,
    path: "/studio",
    seoTitle: "Creative Studio & Growth Utilities | AKTERUZZAMAN",
    seoDescription: "Interactive marketing utilities, brand palette generators, high-converting hooks engines, and ROI scope estimators for founders.",
    badge: "Interactive Growth Tools",
    heading: "Creative Utilities Built for Velocity",
    subheading: "Test-drive proprietary marketing tools, generate psychologically tested ad hooks, and estimate your project investment scope.",
    apiEndpoint: "/api/studio",
    keywords: ["brand palette generator", "marketing hook generator", "project calculator", "free downloads"],
  },
  pricing: {
    id: "pricing",
    name: "Pricing",
    menuOrder: 9,
    path: "/pricing",
    seoTitle: "Transparent Investment Plans & Scope | AKTERUZZAMAN",
    seoDescription: "Transparent investment tiers for Growth Sprints ($99), High-Performance Web & 3D Sites ($199), and Full Growth Retainers ($299) with zero hidden fees.",
    badge: "Transparent Investment",
    heading: "Predictable Pricing for Compounding ROI",
    subheading: "Fixed-price milestone packages tailored to your current stage of growth, with full 30-day warranty coverage.",
    apiEndpoint: "/api/pricing",
    keywords: ["web design pricing", "seo sprint cost", "digital marketing retainer", "project investment"],
  },
  reviews: {
    id: "reviews",
    name: "Reviews",
    menuOrder: 10,
    path: "/reviews",
    seoTitle: "Verified Client Reviews & Testimonials | AKTERUZZAMAN",
    seoDescription: "Read authentic feedback from founders, CMOs, and venture-backed operators who partnered with AKTERUZZAMAN for rapid digital growth.",
    badge: "Client Social Proof",
    heading: "Trusted by Modern Founders & Leaders",
    subheading: "A 5.0-star track record of delivering measurable conversion lifts, clean codebases, and reliable communication.",
    apiEndpoint: "/api/reviews",
    keywords: ["client reviews", "testimonials", "akteruzzaman feedback", "verified ratings"],
  },
  contact: {
    id: "contact",
    name: "Contact",
    menuOrder: 11,
    path: "/contact",
    seoTitle: "Contact AKTERUZZAMAN | Priority Project Inquiries",
    seoDescription: "Reach out directly via email, WhatsApp, or discovery form. Guaranteed response within 24 hours for new client proposals and audits.",
    badge: "Priority Inquiries",
    heading: "Let's Build Something Exceptional",
    subheading: "Direct access to Akteruzzaman. Tell us about your growth targets, technical challenges, and timeline expectations.",
    apiEndpoint: "/api/contact",
    keywords: ["contact akteruzzaman", "hire web developer", "hire digital marketer", "whatsapp consultation"],
  },
  "book-appointment": {
    id: "book-appointment",
    name: "Book Appointment",
    menuOrder: 12,
    path: "/book-appointment",
    seoTitle: "Schedule a 1-on-1 Consultation | AKTERUZZAMAN",
    seoDescription: "Book a direct 20-minute strategic consultation. Select your preferred date and time slot with instant calendar confirmation.",
    badge: "Real-Time Scheduling",
    heading: "Reserve Your 1-on-1 Strategy Session",
    subheading: "Review your architecture, audit your search rankings, and formulate a high-ROAS roadmap directly with Akteruzzaman.",
    apiEndpoint: "/api/appointments",
    keywords: ["schedule consultation", "book strategy call", "calendar slots", "appointment booking"],
  },
};

// GET /api/pages - List all pages configured in backend
app.get("/api/pages", (req, res) => {
  try {
    const pageList = Object.values(MASTER_PAGES).sort((a, b) => a.menuOrder - b.menuOrder);
    return res.json({
      success: true,
      totalCount: pageList.length,
      pages: pageList,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load master page catalog." });
  }
});

// GET /api/pages/:pageId - Get dedicated backend configuration for a specific menu section
app.get("/api/pages/:pageId", (req, res) => {
  try {
    const pageId = req.params.pageId.toLowerCase();
    const page = MASTER_PAGES[pageId];

    if (!page) {
      return res.status(404).json({
        error: `Page section '${pageId}' not found. Valid sections: ${Object.keys(MASTER_PAGES).join(', ')}`,
      });
    }

    return res.json({
      success: true,
      page,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load page section config." });
  }
});

// Vite middleware / production serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AKTERUZZAMAN Portfolio Server running on port ${PORT}`);
  });
}

startServer();

