import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  // ==========================================
  // 1. GENERAL QUESTIONS
  // ==========================================
  {
    id: 'gen-1',
    category: 'general',
    question: 'Who is AKTERUZZAMAN, and what makes your approach different?',
    answer:
      'I am a Professional Digital Marketer & Creative Web Developer with over 5 years of industry experience. Unlike traditional developers who ignore marketing, or marketers who cannot write a single line of performant code, I bridge both worlds seamlessly. Every website I engineer is built from ground up to convert traffic into revenue, rank on Google, and maintain lightning-fast Core Web Vitals.',
    popular: true,
  },
  {
    id: 'gen-2',
    category: 'general',
    question: 'Where are you based, and do you work with international clients?',
    answer:
      'I work remotely with clients worldwide across North America, Europe, the Middle East, Australia, and Asia. All communication and project milestones are organized through Slack, WhatsApp, Google Meet, and email to ensure seamless collaboration regardless of time zones.',
    popular: true,
  },
  {
    id: 'gen-3',
    category: 'general',
    question: 'How do I get started or place an order for a service?',
    answer:
      'Getting started is fast and straightforward: 1) Browse the Pricing or Services section and click "Order Now" on your desired service. 2) Send an instant WhatsApp inquiry, submit the online order form, or book a free 1-on-1 discovery call on the calendar. 3) Once we align on your scope and deliverables, we begin work immediately.',
    popular: true,
  },

  // ==========================================
  // 2. PRICING & PAYMENT
  // ==========================================
  {
    id: 'prc-1',
    category: 'pricing',
    question: 'How does your pricing compare with other agencies and freelancers?',
    answer:
      'My pricing is 100% transparent and calibrated to deliver maximum return on investment without agency overhead markups. Services start at $149 for high-converting landing pages, $199/mo for full-funnel SEO, up to comprehensive enterprise growth bundles. Every package has crystal-clear deliverables with zero hidden fees.',
    popular: true,
  },
  {
    id: 'prc-2',
    category: 'pricing',
    question: 'What payment methods do you accept?',
    answer:
      'We accept secure payments globally via Credit/Debit Cards (Stripe), Wise, PayPal, Direct Bank Wire Transfer, and for clients in Bangladesh, instant bKash, Nagad, and local bank transfers. Invoices are issued with itemized tax and milestone breakdowns.',
    popular: true,
  },
  {
    id: 'prc-3',
    category: 'pricing',
    question: 'Is there a contract or lock-in period for monthly retainers?',
    answer:
      'No lengthy lock-in contracts. Monthly retainers (such as SEO, PPC Management, or Website Maintenance) operate on a flexible 30-day billing cycle. You can upgrade, pause, or cancel at any time with 7 days advance notice before the next renewal date.',
    popular: true,
  },
  {
    id: 'prc-4',
    category: 'pricing',
    question: 'How are one-time development projects billed?',
    answer:
      'For one-time projects (like Business Websites, E-Commerce Stores, or 3D Web Apps), payment is split into milestones: typically a 50% deposit to commence sprint work, and the remaining 50% upon final client staging approval before live domain deployment.',
  },
  {
    id: 'prc-5',
    category: 'pricing',
    question: 'Do you offer a satisfaction guarantee or refund policy?',
    answer:
      'Yes. If we fail to meet the agreed specifications outlined in your service statement of work during the initial sprint review, we will revise and refine the work at zero additional cost until you are 100% satisfied. For one-time projects, deposit milestones protect your investment prior to production deployment.',
  },

  // ==========================================
  // 3. DIGITAL MARKETING & SEO
  // ==========================================
  {
    id: 'mkt-1',
    category: 'marketing',
    question: 'How long does it take to see real results from SEO?',
    answer:
      'Technical SEO fixes and schema improvements often yield crawl and indexing improvements within 2 to 3 weeks. Competitive keyword ranking and organic traffic growth typically scale significantly within 60 to 90 days as Google recognizes updated topical authority and authoritative backlinks.',
    popular: true,
  },
  {
    id: 'mkt-2',
    category: 'marketing',
    question: 'Do your paid advertising (PPC) services include ad spend?',
    answer:
      'No. The service fee covers campaign research, strategic architecture, audience targeting, ad copywriting, banner design suggestions, conversion tracking setup, and ongoing daily bid/budget optimization. Ad spend is billed directly by Google or Meta to your credit card on file.',
  },
  {
    id: 'mkt-3',
    category: 'marketing',
    question: 'How do you measure and report marketing performance?',
    answer:
      'Every client receives a custom real-time Looker Studio dashboard connected directly to Google Analytics 4, Google Search Console, and Meta Ads Manager. We track actual revenue, ROAS, cost per acquisition (CPA), and qualified lead form submissions—not vanity impressions.',
  },
  {
    id: 'mkt-4',
    category: 'marketing',
    question: 'Can you audit my existing ad account or SEO setup before I order?',
    answer:
      'Yes. Book a 20-minute consultation call, and we will perform a live screen-share audit of your current search performance, page speed bottlenecks, or ad account structure with immediate actionable takeaways.',
  },

  // ==========================================
  // 4. WEB DEVELOPMENT & 3D WEB
  // ==========================================
  {
    id: 'dev-1',
    category: 'development',
    question: 'What technologies and frameworks do you use for web development?',
    answer:
      'For custom high-performance applications, I specialize in modern React, TypeScript, Tailwind CSS, Next.js, and Three.js/WebGL for 3D graphics. For content-heavy businesses and e-commerce, I build bespoke WordPress Elementor/Gutenberg architectures and custom Shopify stores.',
    popular: true,
  },
  {
    id: 'dev-2',
    category: 'development',
    question: 'Will my website score 95+ on Google Core Web Vitals and PageSpeed?',
    answer:
      'Yes, absolutely. High performance is non-negotiable. Every site is engineered with image asset compression, code splitting, lazy loading, lightweight CSS, and modern caching strategies to achieve 95–100 scores on Google PageSpeed Insights.',
    popular: true,
  },
  {
    id: 'dev-3',
    category: 'development',
    question: 'Will I be able to easily update text and images myself after launch?',
    answer:
      'Yes. You will have an intuitive content management system (CMS) or dashboard. Plus, upon project completion, I provide custom Loom video walkthroughs explaining how to add blog posts, swap images, and manage products without touching code.',
  },
  {
    id: 'dev-4',
    category: 'development',
    question: 'Do you provide website hosting, domain registration, and email setup?',
    answer:
      'I assist in setting up fast cloud hosting on Vercel, Netlify, Cloudflare, Hostinger, or AWS, along with professional Google Workspace email accounts. All domain DNS settings are configured for you at zero extra charge.',
  },
  {
    id: 'dev-5',
    category: 'development',
    question: 'Can you create interactive 3D WebGL experiences like Three.js?',
    answer:
      'Yes. I build kinetic 3D digital experiences, interactive product showcases, and shader canvas animations optimized for 60fps across mobile and desktop devices without draining battery or causing lag.',
  },

  // ==========================================
  // 5. PROCESS & DELIVERY
  // ==========================================
  {
    id: 'prc-del-1',
    category: 'process',
    question: 'What is the typical turnaround time for a website or project?',
    answer:
      'High-converting landing pages are delivered within 3–5 business days. Business websites (5–8 pages) take 7–10 business days. Full e-commerce stores take 14–18 business days. Complex custom 3D web apps take 2–3 weeks with phased review sprints.',
    popular: true,
  },
  {
    id: 'prc-del-2',
    category: 'process',
    question: 'How many design revisions are included in a project?',
    answer:
      'All one-time development projects include 2–3 comprehensive revision rounds during the wireframe and visual staging phases. Monthly retainers include continuous agile iteration sprints.',
  },
  {
    id: 'prc-del-3',
    category: 'process',
    question: 'Do you provide post-launch support and maintenance?',
    answer:
      'Yes. Every development project includes 14 to 30 days of complimentary post-launch bug fixing and monitoring. For long-term peace of mind, our $99/mo maintenance plan covers daily cloud backups, 24/7 uptime monitoring, security scans, and code updates.',
  },
];
