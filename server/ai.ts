import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getAIClient(): GoogleGenAI | null {
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

export const SYSTEM_INSTRUCTION = `You are the official AI Assistant for AKTERUZZAMAN's portfolio website.
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
  • Phone & WhatsApp: +880 1736683282
  • Location: Worldwide Remote
- Core Services:
  1. Full-Funnel Digital Marketing (Google & Meta Ads, Retargeting, ROAS optimization)
  2. High-Performance Web Development (React 19, TypeScript, Tailwind CSS, sub-second speed)
  3. SEO & Organic Search Domination (Technical SEO, Keyword Clusters, Schema, Backlinks)
  4. 3D WebGL & Kinetic Visuals (Three.js, Spline, interactive 3D product visualizers)
  5. Conversion Rate Optimization (A/B testing, heatmap analysis, checkout UX)
  6. Attribution Analytics & GA4 (Server-side tracking, GTM, CAPI pipelines)
- Transparent Pricing:
  • Starter / SEO Growth Sprint: $99 (or $99/mo)
  • Professional 3D Web & Platform: $199 (most popular)
  • Enterprise Full-Funnel Growth Engine: $299 (end-to-end multi-channel)
- Booking & Appointments:
  Visitors can book a live 1-on-1 consultation directly on this website (/book-appointment).
  Available session types: Discovery Call (20 min), SEO Strategy (45 min), Web Architecture (60 min).
- Client Portal & Tools:
  • Portal available at /studio or via client login.
  • Free Growth Studio tools at /studio: Ad Hook Generator, Brand Palette Generator, ROI Calculator, and Free Blueprints.

Always encourage visitors to book an appointment or send a message via WhatsApp (+880 1736683282) or the Contact page (/contact).`;

export function generateSmartFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Detect Bengali queries
  const hasBengali = /[\u0980-\u09FF]/.test(query);
  const isBanglish = q.includes('kemon') || q.includes('ki obostha') || q.includes('dam') || q.includes('koto') || q.includes('taka') || q.includes('kaj') || q.includes('apni ke') || q.includes('apnar') || q.includes('somporke') || q.includes('dhonnobad');

  if (hasBengali || isBanglish) {
    if (q.includes('বুক') || q.includes('অ্যাপয়েন্টমেন্ট') || q.includes('মিটিং') || q.includes('শিডিউল') || q.includes('সময়') || q.includes('book') || q.includes('appointment')) {
      return `আপনি খুব সহজেই আক্তারুজ্জামানের সাথে সরাসরি ১-অন-১ কনসালটেশন সেশন শিডিউল করতে পারেন!
      
📅 **অ্যাপয়েন্টমেন্ট বুকিং করতে**:
ওয়েবসাইটের উপরে থাকা **"Book an Appointment"** বাটনে ক্লিক করুন অথবা **/book-appointment** পেজে যান।

সেশনের ধরন:
• **ফ্রি ডিসকভারি কল (২০ মিনিট)** — প্রজেক্টের প্রাথমিক আলোচনা ও সম্ভাব্যতা যাচাই।
• **গ্রোথ ও এসইও স্ট্র্যাটেজি (৪৫ মিনিট)** — ট্রাফিক বৃদ্ধি ও ফানেল অপ্টিমাইজেশন প্ল্যান।
• **ফুল-স্ট্যাক ওয়েব ও ৩ডি আর্কিটেকচার (৬০ মিনিট)** — সম্পূর্ণ টেকনিক্যাল প্ল্যান ও রোডম্যাপ।

তাছাড়া যেকোনো জরুরি প্রয়োজনে সরাসরি WhatsApp-এ নক করতে পারেন: **+880 1736683282**।`;
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

📱 **WhatsApp / ফোন**: **+880 1736683282**
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

    return `আসসালামু আলাইকুম! আমি আক্তারুজ্জামান (AKTERUZZAMAN)-এর অফিসিয়াল এআই অ্যাসিস্ট্যান্ট। 👋
আমি আপনাকে যেকোনো তথ্য দিয়ে সাহায্য করতে পারি:
• **সার্ভিসসমূহ** (ডিজিটাল মার্কেটিং, এসইও, React ও 3D ওয়েব ডেভেলপমেন্ট)
• **কাজের প্রাইসিং** ($৯৯, $১৯৯, $২৯৯ প্যাকেজ)
• **অ্যাপয়েন্টমেন্ট বুকিং** (সরাসরি ১-অন-১ ভিডিও কনসালটেশন)
• **পোর্টফোলিও প্রজেক্ট** (কেস স্টাডি ও লাইভ ডেমো)
• **সরাসরি যোগাযোগ** (WhatsApp: +880 1736683282)

আপনি কোন বিষয়ে জানতে চান?`;
  }

  // English Responses
  if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('meeting') || q.includes('call')) {
    return `You can easily schedule a 1-on-1 consultation directly with AKTERUZZAMAN on this website!

📅 **Book an Appointment**: Visit **/book-appointment**.

**Available Consultation Types:**
• **Free Discovery Call (20 min)** — Quick alignment on your project vision, goals, and feasibility.
• **Growth & SEO Strategy Session (45 min)** — Deep dive into search ranking, traffic acquisition, and funnel optimization.
• **Full-Stack Web & 3D Architecture Call (60 min)** — Comprehensive technical review, UI/UX architecture, and execution roadmap.`;
  }

  if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('package') || q.includes('rate')) {
    return `AKTERUZZAMAN offers 3 clear, results-guaranteed investment tiers:

1. **SEO & Growth Sprint ($99 / mo or project)** — Technical audits, on-page optimization, and high-intent keyword ranking.
2. **High-Performance 3D Web & Platform ($199)** — Bespoke React 19 + TypeScript, Three.js kinetic 3D scenes, and guaranteed 99+ Core Web Vitals.
3. **Full Growth Engine & Custom Stack ($299)** — End-to-end full-funnel paid ads, programmatic SEO, and custom full-stack web application.

Visit **/pricing** for full deliverable checklists, or reach out directly on WhatsApp: **+880 1736683282**!`;
  }

  if (q.includes('service') || q.includes('what do you do') || q.includes('offer') || q.includes('skills')) {
    return `AKTERUZZAMAN specializes in 6 core engineering and marketing pillars:

1. **Full-Funnel Digital Marketing** — High-ROAS Google & Meta ad campaigns, retargeting funnels.
2. **Modern Web Development** — Sub-second React 19, TypeScript, and Tailwind CSS web architectures.
3. **SEO & Organic Search Domination** — Algorithm audits, structured schema markup, and content clustering (+240% avg traffic lift).
4. **3D Web & Interactive Experiences** — GPU-accelerated Three.js, WebGL shaders, and kinetic models.
5. **Conversion Rate Optimization (CRO)** — Behavioral drop-off elimination and high-converting micro-copy.
6. **Server-Side Tracking & GA4** — 100% data fidelity event pipelines with GTM and CAPI.

Explore each service in depth at **/services**!`;
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
