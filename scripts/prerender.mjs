import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distBrowserDir = path.join(projectRoot, 'dist', 'bizracks-angular', 'browser');

const DOMAIN = 'https://yogteck.com';

// ══════════════════════════════════════════════════════════════════════════
// CANONICAL ENTITY & NAP DATA (Kanpur Headquarters)
// ══════════════════════════════════════════════════════════════════════════
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${DOMAIN}/#organization`,
  name: 'YogTeck Business Solution',
  alternateName: 'YogTeck',
  url: DOMAIN,
  logo: `${DOMAIN}/assets/images/logo.png`,
  image: `${DOMAIN}/assets/images/og-image.jpg`,
  description: 'Custom software development, cloud ERP platforms, WhatsApp marketing tools, and web applications company headquartered in Kanpur, Uttar Pradesh, India.',
  telephone: '+91 8299209905',
  email: 'official@yogteck.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '302/2, Mangla Vihar 2, New PAC Line',
    addressLocality: 'Kanpur',
    addressRegion: 'Uttar Pradesh',
    postalCode: '208015',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '26.4499',
    longitude: '80.3319'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '19:00'
    }
  ],
  priceRange: '₹₹',
  areaServed: ['Kanpur', 'Lucknow', 'Uttar Pradesh', 'Delhi NCR', 'Rajasthan', 'Gujarat', 'Madhya Pradesh', 'Chandigarh', 'Maharashtra', 'Karnataka'],
  sameAs: [
    'https://www.linkedin.com/company/yogteck',
    'https://github.com/yogteck',
    'https://maps.google.com/?cid=yogteck-kanpur'
  ]
};

// ══════════════════════════════════════════════════════════════════════════
// PAGE SNAPSHOT DEFINITIONS
// All titles: 50-60 characters
// All descriptions: 140-160 characters
// Exactly one <h1> per page
// ══════════════════════════════════════════════════════════════════════════
const PAGES_DATA = [
  // ── 1. Homepage ──────────────────────────────────────────────────────────
  {
    path: '',
    title: 'Software & Web Development | YogTeck Business Solution',
    description: 'YogTeck builds high-performance custom software, cloud ERP, billing suites, and mobile apps for manufacturing, retail, and real estate businesses in India.',
    h1: 'Custom Software, Cloud ERP & Modern Web Applications',
    directAnswer: 'YogTeck Business Solution is a full-cycle software development and IT consulting agency headquartered in Kanpur, Uttar Pradesh. We design, engineer, and deploy high-speed web applications, enterprise cloud ERP systems, GST billing software, and custom mobile apps for businesses across India.',
    type: 'WebSite',
    faqs: [
      { q: 'What IT services does YogTeck provide?', a: 'YogTeck provides custom software development, cloud ERP implementation, mobile app development (Android & iOS), GST billing software, e-commerce stores, WhatsApp marketing tools, and technical SEO services.' },
      { q: 'Where is YogTeck located and which areas do you serve?', a: 'YogTeck registered office is in Kanpur, Uttar Pradesh. We actively serve businesses locally in Kanpur, Lucknow, and Raebareli, as well as remotely across Noida, Delhi NCR, Gurugram, Pune, and Mumbai.' },
      { q: 'What is the average project timeline for custom software?', a: 'Typical custom software MVPs and business tools are delivered in 3 to 8 weeks, depending on requirements, third-party integrations, and testing cycles.' }
    ]
  },

  // ── 2. About ─────────────────────────────────────────────────────────────
  {
    path: 'about',
    title: 'About Software Team & Firm | YogTeck Business Solution',
    description: 'Learn about YogTeck Business Solution, our software engineering team in Kanpur, core values, technical architecture, and customer-first software delivery.',
    h1: 'About YogTeck Business Solution & Engineering Team',
    directAnswer: 'YogTeck Business Solution is a software development and digital transformation agency based in Kanpur, Uttar Pradesh. Founded to bridge the gap between enterprise software capabilities and growing Indian businesses, we engineer fast, secure, and scalable cloud solutions that solve operational bottlenecks.',
    type: 'AboutPage',
    faqs: [
      { q: 'Who founded YogTeck and where is the development team based?', a: 'YogTeck was founded by engineering professionals and operates its primary software development hub from Kanpur Nagar, Uttar Pradesh.' },
      { q: 'Does YogTeck provide post-deployment maintenance and updates?', a: 'Yes, every software deployment includes dedicated SLA support, server health monitoring, security patches, and incremental feature updates.' }
    ]
  },

  // ── 3. Contact ───────────────────────────────────────────────────────────
  {
    path: 'contact',
    title: 'Contact Software Engineers | YogTeck Business Solution',
    description: 'Contact YogTeck in Kanpur for custom software, cloud ERP, or app development consultations. Speak directly with our software architects via call or email.',
    h1: 'Contact YogTeck Business Solution in Kanpur, India',
    directAnswer: 'Contact YogTeck Business Solution directly for custom software proposals, live software demos, and technical architecture reviews. Our software engineering and support office is located in Kanpur, Uttar Pradesh, with direct phone and WhatsApp assistance available Monday to Saturday.',
    type: 'ContactPage',
    faqs: [
      { q: 'How quickly can I get a quotation for my software project?', a: 'We typically provide an initial scope breakdown, architecture recommendation, and price estimate within 24 to 48 hours of your requirement call.' },
      { q: 'Can we schedule an in-person meeting in Kanpur?', a: 'Yes, client meetings can be scheduled at our registered office in Kanpur Nagar by appointment, or virtually via Google Meet.' }
    ]
  },

  // ── 4. Blog ──────────────────────────────────────────────────────────────
  {
    path: 'blog',
    title: 'Engineering & Tech Insights | YogTeck Business Solution',
    description: 'Read technical guides, cloud architecture case studies, GST billing tips, and digital growth strategies published by the software engineering team at YogTeck.',
    h1: 'Engineering Blog, Tech Guides & Software Insights',
    directAnswer: 'The YogTeck Engineering Blog publishes practical insights on cloud ERP architecture, custom web development, GST compliance workflows, WhatsApp business automation, and technical SEO best practices for growing businesses.',
    type: 'CollectionPage',
    faqs: [
      { q: 'What topics does the YogTeck tech blog cover?', a: 'We publish articles covering Angular performance optimization, Node.js backend scalability, Indian GST billing automation, multi-warehouse stock management, and technical search visibility.' }
    ]
  },

  // ── 4a. Blog: Website Development Cost in Kanpur ─────────────────────────
  {
    path: 'blog/website-development-cost-in-kanpur',
    title: 'Website Development Cost in Kanpur (2026) | YogTeck',
    description: 'Complete 2026 price guide for website development cost in Kanpur. Breakdown of basic, corporate & e-commerce portal costs, hidden fees & real ROI.',
    h1: 'Website Development Cost in Kanpur: Complete 2026 Price Guide',
    directAnswer: 'In 2026, the cost of developing a professional business website in Kanpur ranges between ₹12,000 and ₹35,000 for standard corporate sites, and between ₹45,000 and ₹1,50,000+ for custom dynamic portals. YogTeck delivers high-speed engineered web applications with free domain, cloud hosting, and technical SEO inclusions.',
    type: 'BlogPosting',
    contentHtml: `
      <h2>Quick Answer: How Much Does a Website Cost in Kanpur?</h2>
      <p>A standard business website in Kanpur costs between ₹12,000 and ₹35,000, while custom dynamic portals and e-commerce stores range from ₹45,000 to ₹1,50,000+. This comprehensive guide breaks down pricing factors, hosting inclusions, hidden charges, and how Kanpur businesses can maximize return on investment.</p>
      <h2>Kanpur Website Development Cost Comparison Table</h2>
      <p>Starter Business Websites for local Kanpur shops cost ₹12,000-₹20,000. Corporate & Industrial Portals for Jajmau leather tanneries and Sisamau textile mills cost ₹22,000-₹45,000. Full E-Commerce Storefronts with Razorpay and Shiprocket sync range from ₹40,000-₹85,000.</p>
      <h2>What Kanpur Businesses Actually Need</h2>
      <p>Kanpur businesses require export credentials, fast RFQ quotation forms, sub-second mobile loading speed, and direct floating WhatsApp buttons. Proven through our work on Techno Racks and Yogkart, our architectures deliver high-converting buyer inquiries.</p>
    `,
    faqs: [
      { q: 'What is the minimum budget needed for a professional business website in Kanpur?', a: 'For a credible 5 to 7-page responsive business website with domain, hosting, SSL security, and WhatsApp inquiry buttons, Kanpur businesses should budget between ₹12,000 and ₹25,000.' },
      { q: 'Are domain registration and cloud hosting included in website packages?', a: 'At YogTeck Business Solution, eligible packages include complimentary first-year domain (.com or .in) registration, secure SSL certificates, and high-speed cloud hosting with 99.9% uptime.' },
      { q: 'How long does it take to design and launch a website in Kanpur?', a: 'A standard corporate website takes approximately 7 to 14 business days from content sign-off. Bespoke e-commerce stores and custom web platforms typically require 3 to 6 weeks.' }
    ]
  },

  // ── 4b. Blog: Top IT Companies in Kanpur ──────────────────────────────────
  {
    path: 'blog/top-it-companies-in-kanpur',
    title: 'Top IT Companies in Kanpur (2026 Guide) | YogTeck',
    description: 'Looking for top IT companies in Kanpur? Compare software development firms, evaluate technical capabilities, verify local offices & avoid hiring mistakes.',
    h1: 'Top IT Companies in Kanpur: How to Choose the Right Software Partner',
    directAnswer: 'To choose the best IT and software company in Kanpur, verify a physical development office in Kanpur Nagar, active deployed software portfolios (such as MMR Construction ERP and Techno Racks), modern technology stacks (Node.js, Angular, PostgreSQL), and 100% intellectual property ownership.',
    type: 'BlogPosting',
    contentHtml: `
      <h2>How to Pick the Best IT Partner in Kanpur</h2>
      <p>Look for four essential qualities: a physical, verifiable office in Kanpur Nagar, a portfolio of active working software deployments for Indian businesses, a modern and secure technology stack, and a contractual guarantee of 100% intellectual property ownership upon project completion.</p>
      <h2>Agency Comparison: Full-Cycle Engineering vs Freelancers</h2>
      <p>Full-cycle engineering firms like YogTeck provide rapid on-site support in Kanpur, custom-coded scalable architectures, and formal SLA contracts, protecting you against project abandonment and hidden costs.</p>
    `,
    faqs: [
      { q: 'Which is the best IT company in Kanpur for custom software and ERP?', a: 'For MSMEs, industrial manufacturers, real estate colonizers, and retail chains seeking tailored software with on-site implementation, verified local references, and full code ownership, YogTeck Business Solution stands out as a leading technical partner.' },
      { q: 'Why should I hire a local Kanpur IT company instead of an agency in Bangalore or Delhi?', a: 'A local Kanpur company provides rapid on-site visits, understands regional commercial dynamics (such as leather export cycles and wholesale credit ledgers), and can train your staff face-to-face with high accountability.' }
    ]
  },

  // ── 4c. Blog: Inventory Management Software for Lucknow Businesses ────────
  {
    path: 'blog/inventory-management-software-lucknow',
    title: 'Inventory Software in Lucknow (2026 Guide) | YogTeck',
    description: 'Complete guide to inventory & stock management software for Lucknow retail, Chikankari wholesale & multi-branch businesses. Barcode POS & real-time sync.',
    h1: 'Inventory Management Software for Lucknow Businesses: 2026 Guide',
    directAnswer: 'Modern inventory software from YogTeck provides real-time multi-branch stock sync across Hazratganj, Gomti Nagar, and Aminabad, sub-second barcode counter scanning, automated low-stock reorder alerts, and instant WhatsApp GST invoicing for Lucknow businesses.',
    type: 'BlogPosting',
    contentHtml: `
      <h2>Why Lucknow Businesses Need Inventory Software</h2>
      <p>Relying on physical registers or standalone Excel sheets to manage stock across Lucknow retail stores leads directly to stockouts during festive seasons, pilferage, duplicate orders, and capital trapped in dead inventory. YogTeck cloud inventory software synchronizes multiple branch locations in real time.</p>
      <h2>Unique Challenges Faced by Lucknow Merchants</h2>
      <p>Lucknow merchants require multi-attribute garment matrices for Chikankari textiles, automated Stock Transfer Notes (STN) between godowns and retail showrooms, and sub-10-second barcode checkout during festive periods.</p>
    `,
    faqs: [
      { q: 'What is the cost of inventory software in Lucknow?', a: 'Single-store retail inventory and billing software in Lucknow starts between ₹15,000 and ₹30,000, while multi-branch cloud platforms range from ₹45,000 to ₹1,20,000 depending on outlet count.' },
      { q: 'Can this software handle Chikankari garments with different colors and sizes?', a: 'Yes. Our software features a comprehensive Item Matrix module supporting multi-attribute SKUs (fabric type, embroidery pattern, size, color) under a single master parent product.' }
    ]
  },

  // ── 5. Privacy Policy ────────────────────────────────────────────────────
  {
    path: 'privacy-policy',
    title: 'Privacy Policy & Standards | YogTeck Business Solution',
    description: 'Read YogTeck privacy policy detailing how we collect, process, and protect customer data, contact submissions, and client enterprise application records.',
    h1: 'Privacy Policy & Data Governance Standards',
    directAnswer: 'This Privacy Policy explains how YogTeck Business Solution collects, uses, and safeguards information when you visit yogteck.com or utilize our custom software platforms. We maintain strict confidentiality and never sell client data to third parties.',
    type: 'WebPage',
    faqs: []
  },

  // ── 6. Terms of Service ──────────────────────────────────────────────────
  {
    path: 'terms-of-service',
    title: 'Terms of Service Agreement | YogTeck Business Solution',
    description: 'Review the contractual terms of service, software licensing conditions, payment milestones, and intellectual property ownership rules at YogTeck.',
    h1: 'Terms of Service & Client Engagement Agreement',
    directAnswer: 'These Terms of Service govern the use of the YogTeck website, custom development contracts, software subscriptions, and intellectual property ownership. All client software code and proprietary databases belong exclusively to the client upon full milestone settlement.',
    type: 'WebPage',
    faqs: []
  },

  // ── 7. Service: Website Development ──────────────────────────────────────
  {
    path: 'services/website-development',
    title: 'Website Development Services | YogTeck Business Solution',
    description: 'YogTeck develops ultra-fast custom websites and web portals in Kanpur with modern frameworks, sub-second load speeds, clean architecture, and SEO visibility.',
    h1: 'Professional Website Development Services in Kanpur',
    directAnswer: 'YogTeck develops high-performance, custom-coded business websites and web portals for companies in Kanpur and across India. We engineer bespoke websites without slow off-the-shelf templates, guaranteeing sub-second load times, mobile responsiveness, and built-in search engine indexing.',
    type: 'Service',
    serviceType: 'Website Development Services',
    faqs: [
      { q: 'What web development frameworks does YogTeck use?', a: 'We build modern web applications using Angular, React, Next.js, and Node.js with static pre-rendering (SSG/SSR) to ensure maximum speed and crawlability.' },
      { q: 'How long does it take to design and launch a business website?', a: 'A standard 5-to-15 page corporate website is typically launched within 2 to 3 weeks, including content placement, responsive testing, and search console setup.' },
      { q: 'Will my website work smoothly on mobile phones and tablets?', a: 'Yes, 100% of our websites are engineered mobile-first with adaptive layouts, touch gestures, and optimized asset loading across all screen sizes.' }
    ]
  },

  // ── 8. Service: Mobile App Development ───────────────────────────────────
  {
    path: 'services/mobile-app-development',
    title: 'Mobile App Development Services | YogTeck Business Solution',
    description: 'Custom Android and iOS mobile app development in Kanpur by YogTeck. Fast UI, offline data sync, push alerts, and secure payment gateway integration.',
    h1: 'Native & Cross-Platform Mobile App Development',
    directAnswer: 'YogTeck engineers native Android and cross-platform iOS mobile applications for businesses, field service teams, and retail brands. Our mobile apps feature intuitive user experiences, real-time push notifications, offline local data storage, and end-to-end encrypted API integrations.',
    type: 'Service',
    serviceType: 'Mobile Application Development',
    faqs: [
      { q: 'Do you develop for both Android and iOS platforms?', a: 'Yes, we develop cross-platform mobile apps using Flutter and React Native, as well as native Android applications tailored to client performance needs.' },
      { q: 'Can the mobile app sync data offline when there is no internet?', a: 'Yes, our mobile apps support local SQLite/Room caching and automatically synchronize queued records with cloud servers once connectivity is restored.' }
    ]
  },

  // ── 9. Service: Custom Software Development ──────────────────────────────
  {
    path: 'services/custom-software-development',
    title: 'Custom Software Development | YogTeck Business Solution',
    description: 'Custom software development in Kanpur by YogTeck. Tailored business logic, role-based workflows, automated database reporting, and API integrations.',
    h1: 'Bespoke Custom Software Development in Kanpur',
    directAnswer: 'YogTeck designs and builds bespoke enterprise software tailored to your specific business logic, departmental hierarchies, and workflow rules. We replace disjointed spreadsheets with unified cloud databases, role-based access controls, and automated operational dashboards.',
    type: 'Service',
    serviceType: 'Custom Software Development',
    faqs: [
      { q: 'Why choose custom software over off-the-shelf tools?', a: 'Off-the-shelf tools force your business to change its processes to fit generic software. Custom software is designed exactly around your operational workflows and can grow without recurring per-seat penalties.' },
      { q: 'Who owns the intellectual property and source code?', a: 'You retain 100% full ownership of your custom software source code, database structures, and business logic upon final milestone delivery.' }
    ]
  },

  // ── 10. Service: Billing Software ────────────────────────────────────────
  {
    path: 'services/billing-software',
    title: 'Billing & GST Invoicing Software | YogTeck Business Solution',
    description: 'YogTeck GST billing software automates retail POS, thermal printing, HSN tax calculation, wholesale ledgers, and one-click GSTR compliance reports in India.',
    h1: 'GST Billing & Invoicing Software Solutions in Kanpur',
    directAnswer: 'YogTeck provides fast, compliant GST billing and invoicing software for retailers, wholesalers, and service businesses in Kanpur and across India. It supports thermal receipt printing, barcode scanning, automatic HSN tax rate calculations, customer credit ledgers, and instant GSTR export.',
    type: 'Service',
    serviceType: 'GST Billing and Invoicing Software',
    faqs: [
      { q: 'Does YogTeck billing software comply with Indian GST rules?', a: 'Yes, our billing suite is fully compliant with Indian GST laws, supporting CGST/SGST/IGST tax breakdowns, HSN codes, and GSTR-1/GSTR-3B export registers.' },
      { q: 'Can it print receipts on standard thermal barcode printers?', a: 'Yes, it natively supports 2-inch and 3-inch ESC/POS thermal receipt printers as well as standard A4/A5 laser invoice formats.' }
    ]
  },

  // ── 11. Service: E-Commerce Development ──────────────────────────────────
  {
    path: 'services/ecommerce-development',
    title: 'E-Commerce Store Development | YogTeck Business Solution',
    description: 'Custom e-commerce web and mobile development by YogTeck in Kanpur. Fast product catalogs, UPI/Razorpay payments, automated shipping, and WhatsApp alerts.',
    h1: 'Custom E-Commerce Store & Web App Development',
    directAnswer: 'YogTeck builds high-converting e-commerce web stores and shopping applications designed for rapid product discovery and effortless checkout. We integrate Indian payment gateways (Razorpay, PhonePe, Paytm), automated courier shipping webhooks, and real-time WhatsApp order tracking.',
    type: 'Service',
    serviceType: 'E-Commerce Development Services',
    faqs: [
      { q: 'Which payment gateways can be integrated?', a: 'We integrate all leading Indian and international payment gateways, including Razorpay, Cashfree, PhonePe, PayU, Stripe, and UPI QR codes.' },
      { q: 'Can the e-commerce platform handle high-volume flash sales?', a: 'Yes, our e-commerce backends utilize scalable cloud databases, Redis caching, and asset CDN optimization to easily absorb sudden traffic surges.' }
    ]
  },

  // ── 12. Service: SEO & Digital Marketing ─────────────────────────────────
  {
    path: 'services/seo-digital-growth',
    title: 'SEO & Digital Growth Agency | YogTeck Business Solution',
    description: 'Technical SEO and digital growth marketing by YogTeck in Kanpur. Structured JSON-LD schema, sub-second load times, and high-intent Google search rankings.',
    h1: 'Technical Search Engine Optimization & Growth Marketing',
    directAnswer: 'YogTeck delivers technical search engine optimization and performance marketing engineered to rank your services for high-intent queries. We focus on structured schema markup, sub-second Core Web Vitals, crawlable static snapshots, and geo-targeted local visibility.',
    type: 'Service',
    serviceType: 'Search Engine Optimization and Digital Marketing',
    faqs: [
      { q: 'What is technical SEO and why is it essential?', a: 'Technical SEO ensures search engines can efficiently crawl, render, and index your website content through fast server response, schema markup, and clean URL structure.' },
      { q: 'How long does it take to see organic Google ranking improvements?', a: 'Initial indexing and ranking improvements are typically observed within 4 to 8 weeks after fixing crawlability and deploying rich structured data.' }
    ]
  },

  // ── 13. Service: Business Software ───────────────────────────────────────
  {
    path: 'services/business-software',
    title: 'Business Management Software | YogTeck Business Solution',
    description: 'Enterprise business management software by YogTeck. Connect inventory, CRM leads, vendor procurement, quotations, and staff attendance in one dashboard.',
    h1: 'Integrated Business Management Software Solutions',
    directAnswer: 'YogTeck provides integrated business management software that centralizes sales leads, quotation generation, vendor purchase orders, inventory allocation, and employee attendance into a single real-time executive dashboard.',
    type: 'Service',
    serviceType: 'Business Management Software',
    faqs: [
      { q: 'Can our existing accounting data be migrated into YogTeck software?', a: 'Yes, we provide structured data migration utilities to import existing customers, vendors, product masters, and opening stock balances from Excel or legacy systems.' }
    ]
  },

  // ── 14. Service: Real-Estate Plotting Software ───────────────────────────
  {
    path: 'services/real-estate-plotting-software',
    title: 'Real-Estate Plotting Software | YogTeck Business Solution',
    description: 'YogTeck real-estate plotting software manages colony layout maps, plot booking status, installment EMI passbooks, and multi-tier associate commissions.',
    h1: 'Real-Estate Colony Plotting & Booking Management Software',
    directAnswer: 'YogTeck Real-Estate Plotting Software is an industry-tested management solution for land colonizers, builders, and plotting developers. It provides color-coded interactive plot availability maps, automated installment EMI schedules, multi-tier associate commission disbursement, and customer payment passbooks.',
    type: 'Service',
    serviceType: 'Real-Estate Plotting Software Solutions',
    faqs: [
      { q: 'How does the interactive colony layout map work?', a: 'Colonizers upload their colony site layout map where each plot is assigned a plot number and dimensions. The map automatically color-codes plots as Available (Green), Booked (Orange), or Registered (Red) in real time.' },
      { q: 'Does it calculate associate commission hierarchies automatically?', a: 'Yes, it computes multi-tier associate commissions (direct and team overriding commissions) instantly upon plot token or EMI payment receipt.' },
      { q: 'Can customers view their EMI payment passbook online?', a: 'Yes, buyers receive secure login access or WhatsApp receipt links to inspect paid installments, remaining balance, and scheduled due dates.' }
    ]
  },

  // ── 14a. Service: Inventory & Stock Management Software ───────────────────
  {
    path: 'services/inventory-software',
    title: 'Inventory Software in Kanpur & UP | YogTeck',
    description: 'YogTeck engineers real-time inventory software for Kanpur leather, FMCG, Lucknow retail & Delhi traders. Barcode tracking, batch expiry & GST sync.',
    h1: 'Inventory Software in Kanpur, Lucknow & Delhi NCR',
    directAnswer: 'YogTeck Business Solution engineers tailored inventory and stock management software built for manufacturers, wholesale stockists, and retail distributors across Kanpur, Lucknow, and Delhi NCR. We provide real-time multi-warehouse stock sync, barcode scanning, batch expiry tracking, and automated GST billing.',
    type: 'Service',
    serviceType: 'Inventory Management Software',
    faqs: [
      { q: 'What is the cost of inventory software in Kanpur or Lucknow?', a: 'Basic deployments for MSMEs start affordably, while enterprise multi-godown ERP modules with automated E-Way billing and custom APIs are priced according to user seats and required integrations.' },
      { q: 'Can this inventory software handle raw materials as well as finished goods?', a: 'Yes. Our inventory system includes multi-stage Bill of Materials (BOM) tracking from raw materials to finished packaged goods.' }
    ]
  },

  // ── 14b. Service: MLM Software Development ───────────────────────────────
  {
    path: 'services/mlm-software',
    title: 'MLM Software Company in Kanpur & Delhi | YogTeck',
    description: 'Custom MLM software with binary, matrix, generation plans, e-wallet, automated payouts & secure member portals for Kanpur, Lucknow & Delhi NCR businesses.',
    h1: 'Custom MLM Software Development Company in Kanpur & Delhi',
    directAnswer: 'YogTeck Business Solution builds robust, mathematically verified MLM and network marketing software for direct selling companies across Kanpur, Lucknow, and Delhi NCR. We engineer secure member geneology trees, automated TDS deductions, digital e-wallets, and instant payout processing.',
    type: 'Service',
    serviceType: 'MLM Software Development',
    faqs: [
      { q: 'Which MLM compensation plans does YogTeck software support?', a: 'We develop software for Binary plans (1:1, 1:2, 2:1), Matrix plans, Generation plans, Unilevel plans, and complex hybrid Repurchase plans with BV/PV calculations.' },
      { q: 'Does the software comply with Indian Direct Selling Guidelines?', a: 'Yes. Mandatory compliance features include PAN-linked member registration, cooling-off/refund periods, transparent grievance ticketing, and statutory TDS deduction reports.' }
    ]
  },

  // ── 14c. Service: AI Software & Chatbots ─────────────────────────────────
  {
    path: 'services/ai-software-development',
    title: 'AI Software Company in Kanpur & UP | YogTeck',
    description: 'YogTeck builds custom AI software, WhatsApp chatbots & predictive analytics for enterprises in Kanpur, Lucknow & Delhi NCR. Free architecture review.',
    h1: 'AI Software & Chatbot Development Company in Kanpur & UP',
    directAnswer: 'YogTeck Business Solution architects and deploys practical Artificial Intelligence software, autonomous customer service chatbots, document extraction pipelines, and predictive analytics for enterprises across Kanpur, Lucknow, and Delhi NCR.',
    type: 'Service',
    serviceType: 'Artificial Intelligence & Chatbot Development',
    faqs: [
      { q: 'Can the AI chatbot understand Hindi and Hinglish queries?', a: 'Yes. Our conversational models are optimized for Indian linguistic nuances, accurately understanding Hindi written in English script (Hinglish) as well as formal Hindi and English.' },
      { q: 'Will our proprietary business data be shared with third parties?', a: 'No. We utilize enterprise API agreements with zero-data-retention guarantees or deploy self-hosted open-source models on your private cloud infrastructure.' }
    ]
  },

  // ── 15. Product: ERP Software ────────────────────────────────────────────
  {
    path: 'products/erp-software',
    title: 'Cloud ERP Software Platform | YogTeck Business Solution',
    description: 'YogTeck Cloud ERP unifies multi-warehouse stock, production BOM, GST-ready invoicing, purchase approvals, and payroll for manufacturing and wholesale in India.',
    h1: 'Cloud ERP Software Platform for Manufacturers & Distributors',
    directAnswer: 'YogTeck Cloud ERP is an integrated enterprise resource planning platform engineered for manufacturers, wholesale distributors, and multi-branch trading enterprises in Kanpur and across India. It consolidates real-time inventory tracking, production Bill of Materials (BOM), GST-ready invoicing, and staff payroll into a secure cloud dashboard.',
    type: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    faqs: [
      { q: 'Who is YogTeck Cloud ERP built for?', a: 'It is built for manufacturers (leather, garments, engineering ancillaries, compounding) and wholesale distributors managing multi-warehouse stock and credit limits.' },
      { q: 'What are the subscription plans and pricing for Cloud ERP?', a: 'Pricing is structured into Starter Cloud ERP for single-location trading and Growth Enterprise ERP for multi-branch factories, quoted based on required modules and user seats.' }
    ]
  },

  // ── 16. Product: SaaS Platform ───────────────────────────────────────────
  {
    path: 'products/saas-platform',
    title: 'Multi-Tenant SaaS Platform | YogTeck Business Solution',
    description: 'Scalable multi-tenant SaaS software platform by YogTeck. Available as a hosted cloud service or as a complete white-label solution for agency partners.',
    h1: 'Scalable Multi-Tenant SaaS Architecture & White-Label Suite',
    directAnswer: 'The YogTeck SaaS Platform provides a scalable multi-tenant foundation designed for startups, software entrepreneurs, and business service agencies. Clients can utilize our platform as a turnkey managed cloud service or license the complete white-label system to run under their own corporate branding.',
    type: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    faqs: [
      { q: 'Can we run the SaaS platform under our own brand and custom domain?', a: 'Yes, our white-label SaaS edition allows full custom branding, logo configuration, custom SMTP email gateways, and personalized client domain names.' },
      { q: 'What pricing plans are available for the SaaS platform?', a: 'We offer Managed Cloud SaaS subscription tiers and Agency White-Label Licenses quoted transparently based on client tenant scale.' }
    ]
  },

  // ── 17. Product: WhatsApp Marketing Tool ─────────────────────────────────
  {
    path: 'products/whatsapp-marketing-tool',
    title: 'WhatsApp Marketing Software | YogTeck Business Solution',
    description: 'Official WhatsApp Business Cloud API marketing tool by YogTeck. Broadcast campaigns, CRM webhook automations, and catalog messaging on monthly plans.',
    h1: 'WhatsApp Business API Marketing & Automation Software',
    directAnswer: 'The YogTeck WhatsApp Marketing Tool is a high-deliverability customer messaging platform built on the official Meta WhatsApp Business Cloud API. It empowers sales and support teams to send targeted promotional broadcasts, automate customer payment reminders, and handle inbound inquiries through a shared team inbox.',
    type: 'SoftwareApplication',
    applicationCategory: 'CommunicationApplication',
    faqs: [
      { q: 'Does this tool use the official Meta WhatsApp Cloud API?', a: 'Yes, it connects directly via the official Meta WhatsApp Business Cloud API, eliminating the risk of unverified SIM card blocking.' },
      { q: 'What are the subscription plans for the WhatsApp marketing tool?', a: 'We offer Starter Marketing and Business Automation monthly subscription plans quoted based on message volume and webhook integrations.' }
    ]
  },

  // ── 18. Tools Index ──────────────────────────────────────────────────────
  {
    path: 'tools',
    title: 'Business Software Tool Suite | YogTeck Business Solution',
    description: 'Explore proprietary software tools engineered by YogTeck: WhatsApp Marketing Automation, GST Billing Software, and Enterprise Cloud ERP platforms.',
    h1: 'Proprietary Software Tools Engineered by YogTeck',
    directAnswer: 'YogTeck builds and operates specialized software utilities and production-ready applications. Explore our three flagship software tools: the WhatsApp Marketing Automation Engine, the GST Billing and POS Software Suite, and the Enterprise Cloud ERP Platform.',
    type: 'CollectionPage',
    faqs: [
      { q: 'Can these tools be customized for our specific enterprise requirements?', a: 'Yes, all tools developed by YogTeck can be extended with custom database fields, third-party API webhooks, and private server deployments.' }
    ]
  },

  // ── 19. Tool: WhatsApp Marketing Automation ──────────────────────────────
  {
    path: 'tools/whatsapp-marketing-tool',
    title: 'WhatsApp Automation Tool | YogTeck Business Solution',
    description: 'Automate customer communications and bulk WhatsApp campaigns with YogTeck official Cloud API tool. Webhooks, team inbox, and high delivery rates.',
    h1: 'Official Cloud API WhatsApp Marketing Automation Tool',
    directAnswer: 'The YogTeck WhatsApp Marketing Automation Tool is our proprietary messaging utility engineered on the official Meta Cloud API. It provides bulk promotional broadcast dispatch, dynamic contact segmentation, CRM webhook triggers, and automated payment overdue reminders.',
    type: 'SoftwareApplication',
    applicationCategory: 'CommunicationApplication',
    faqs: [
      { q: 'How does YogTeck WhatsApp tool protect against number bans?', a: 'By utilizing Meta official verified WhatsApp Cloud API endpoints with opt-in list management and compliant messaging templates.' }
    ]
  },

  // ── 20. Tool: GST Billing Suite ──────────────────────────────────────────
  {
    path: 'tools/gst-billing-software',
    title: 'GST Billing & POS Tool | YogTeck Business Solution',
    description: 'YogTeck GST billing tool provides instant barcode sales, thermal receipt printing, wholesale party ledgers, and one-click GSTR tax reconciliation.',
    h1: 'GST Invoicing, Retail POS & Party Ledger Software Tool',
    directAnswer: 'The YogTeck GST Billing Software Suite is a lightweight, responsive point-of-sale and invoicing application built for Indian retail counters and wholesale distributors. It accelerates checkout with instant barcode lookups, automated HSN tax calculation, and thermal printing.',
    type: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    faqs: [
      { q: 'Can it operate on low-resource POS counter computers?', a: 'Yes, the client interface is optimized to run smoothly on standard counter PCs, laptops, or tablets with fast keyboard shortcuts.' }
    ]
  },

  // ── 21. Tool: Cloud ERP System ───────────────────────────────────────────
  {
    path: 'tools/cloud-erp',
    title: 'Cloud ERP Software Suite | YogTeck Business Solution',
    description: 'YogTeck Cloud ERP tool connects multi-warehouse inventory, production BOM assemblies, staff payroll, and financial ledgers into one secure cloud system.',
    h1: 'Enterprise Cloud ERP & Multi-Warehouse Software Suite',
    directAnswer: 'The YogTeck Cloud ERP System is a comprehensive enterprise management tool created for manufacturing factories and wholesale distributors. It unifies multi-warehouse inventory valuation, raw material Bill of Materials (BOM), vendor purchase approvals, and employee payroll.',
    type: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    faqs: [
      { q: 'Does it support multi-branch stock transfers and approvals?', a: 'Yes, inter-branch stock requisitions, transit tracking, and warehouse receipt confirmations are natively supported.' }
    ]
  },

  // ── 22. Clients Index ────────────────────────────────────────────────────
  {
    path: 'clients',
    title: 'Our Clients & Software Projects | YogTeck Business Solution',
    description: 'Discover how YogTeck delivers tangible business value for clients like MMR Constructions, Yogkart Healthcare, and Business Web Solutions in India.',
    h1: 'Client Portfolio, Delivered Projects & Case Studies',
    directAnswer: 'YogTeck has engineered and deployed mission-critical software solutions for growing enterprises across real estate, healthcare e-commerce, and corporate trade directories. Explore our verified client implementations and real-world software case studies.',
    type: 'CollectionPage',
    faqs: [
      { q: 'Can we contact existing YogTeck clients for references?', a: 'Client references can be arranged upon request and mutual consent following an initial discovery consultation.' }
    ]
  },

  // ── 23. Client: MMR Constructions ────────────────────────────────────────
  {
    path: 'clients/mmr-constructions',
    title: 'MMR Constructions Case Study | YogTeck Business Solution',
    description: 'Case study of MMR Constructions real estate CRM and plotting system developed by YogTeck. Interactive colony maps, EMI passbooks, and commission engine.',
    h1: 'MMR Constructions Real-Estate Plotting CRM Case Study',
    directAnswer: 'MMR Constructions is a leading real estate development firm in Uttar Pradesh specializing in residential townships and plotted colony development. YogTeck engineered a custom colony plotting CRM that digitized plot inventory maps, automated installment EMI tracking, and managed multi-tier associate commissions.',
    type: 'Article',
    faqs: [
      { q: 'What specific operational challenge did YogTeck solve for MMR Constructions?', a: 'MMR Constructions previously managed hundreds of residential plots, manual installment passbooks, and associate commissions on paper registers. YogTeck eliminated double-booking risks and automated all commission disbursements.' },
      { q: 'What metrics and results were achieved?', a: '100% elimination of plot double-booking, real-time associate commission computation, and digitized colony layout inventory with zero data loss.' }
    ]
  },

  // ── 24. Client: Yogkart Healthcare ───────────────────────────────────────
  {
    path: 'clients/yogkart-healthcare',
    title: 'Yogkart Healthcare Platform | YogTeck Business Solution',
    description: 'How YogTeck engineered the Yogkart Healthcare ayurvedic e-commerce platform with automated logistics, WhatsApp alerts, and high conversion checkouts.',
    h1: 'Yogkart Healthcare Ayurvedic E-Commerce Case Study',
    directAnswer: 'Yogkart Healthcare is an online healthcare and ayurvedic wellness brand delivering authentic formulations across India. YogTeck built their high-speed e-commerce platform featuring multi-category herbal catalog filters, Razorpay UPI checkout, and automated shipping sync with WhatsApp order updates.',
    type: 'Article',
    faqs: [
      { q: 'What technology stack was used for Yogkart Healthcare?', a: 'The storefront was built with optimized mobile-first frontend technology integrated with an encrypted Node.js backend and Razorpay webhook processing.' },
      { q: 'What business results were recorded?', a: 'Fast mobile catalog load times, seamless COD and UPI checkout processing, and real-time automated courier dispatch tracking.' }
    ]
  },

  // ── 25. Client: Techno Racks ─────────────────────────────────────────────
  {
    path: 'clients/techno-racks',
    title: 'Techno Racks Industrial Web Portal Case Study | YogTeck',
    description: 'Discover how YogTeck engineered a high-speed corporate catalog and RFQ quotation engine for Techno Racks industrial storage systems.',
    h1: 'Techno Racks Industrial Web Catalog Case Study',
    directAnswer: 'Techno Racks is an industrial storage racking and warehouse mezzanine systems manufacturer headquartered in Kanpur, Uttar Pradesh. YogTeck built their high-speed corporate catalog portal showcasing heavy-duty pallet racks, industrial mezzanine floors, and direct RFQ inquiry submission for B2B buyers across India.',
    type: 'Article',
    faqs: [
      { q: 'What technical capabilities were prioritized for Techno Racks?', a: 'We prioritized fast image loading for heavy equipment catalogs, clear technical load capacity tables, and streamlined quotation forms tailored for B2B buyers.' },
      { q: 'Can YogTeck build similar B2B product catalogs for other manufacturers?', a: 'Yes. YogTeck engineers structured B2B web portals and digital catalogs for industrial machinery, packaging, racking, and manufacturing ancillaries.' }
    ]
  },

  // ── 26. Location: Kanpur Headquarters ────────────────────────────────────
  {
    path: 'it-software-company-kanpur',
    title: 'IT & Software Firm in Kanpur | YogTeck Business Solution',
    description: 'YogTeck is a top IT and custom software company in Kanpur. Located at New PAC Line, Kanpur Nagar, delivering ERP, billing, web, and mobile app development.',
    h1: 'Leading IT & Custom Software Development Company in Kanpur',
    directAnswer: 'YogTeck Business Solution is a leading IT and custom software development company based in Kanpur, Uttar Pradesh (Registered Office: 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, PIN 208015). We provide local enterprises, manufacturing units, and retail brands with high-performance custom software, cloud ERP, billing software, and modern web applications.',
    type: 'LocalBusiness',
    isHeadquarters: true,
    faqs: [
      { q: 'Where is YogTeck physical office located in Kanpur?', a: 'Our registered development office is at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, Uttar Pradesh, PIN 208015.' },
      { q: 'What industries does YogTeck serve in Kanpur?', a: 'We serve Kanpur renowned leather and footwear manufacturers, textile mills, wholesale distributors in Nayaganj and Collectorganj, educational institutions, and real estate developers.' },
      { q: 'Can we have an in-person software consultation in Kanpur?', a: 'Yes, our software architects meet in person with Kanpur business owners for requirement mapping and live system demos.' }
    ]
  },

  // ── 27. Location: Lucknow Service Hub ────────────────────────────────────
  {
    path: 'it-software-company-lucknow',
    title: 'Software Company in Lucknow | YogTeck Business Solution',
    description: 'YogTeck provides custom software development, cloud ERP, and web apps in Lucknow. Serving Hazratganj, Gomti Nagar, Transport Nagar, and across UP.',
    h1: 'Custom Software & Cloud Solutions Provider for Lucknow',
    directAnswer: 'YogTeck Business Solution serves businesses, startups, and trading corporations in Lucknow as a core service area. We deliver custom software development, multi-warehouse ERP, billing software, and high-conversion e-commerce applications to enterprises in Gomti Nagar, Hazratganj, and Transport Nagar.',
    type: 'Service',
    isHeadquarters: false,
    faqs: [
      { q: 'Does YogTeck have a physical office in Lucknow?', a: 'YogTeck primary registered office is in Kanpur, with Lucknow actively served as a primary service area through dedicated project managers and regular on-site visits.' },
      { q: 'What types of software projects do you deliver in Lucknow?', a: 'We deliver real estate plotting CRM systems, retail billing software, distribution ERP platforms, and corporate web portals for Lucknow businesses.' }
    ]
  },

  // ── 28. Location: Raebareli Service Hub (Gated noindex under Task 3 thresholds) ──
  {
    path: 'it-software-company-raebareli',
    title: 'Software Development Raebareli | YogTeck Business Solution',
    description: 'YogTeck delivers custom billing software, cloud ERP, and web development in Raebareli for industrial units, hospitals, schools, and traders.',
    h1: 'Software Development & IT Solutions in Raebareli',
    directAnswer: 'YogTeck Business Solution extends comprehensive software development, GST billing, and business automation services to enterprises across Raebareli. We support local healthcare centers, manufacturing units, transport firms, and retail merchants with robust cloud software.',
    type: 'Service',
    isHeadquarters: false,
    isNoindex: true,
    faqs: [
      { q: 'How does YogTeck support clients in Raebareli?', a: 'We provide remote deployment, on-site staff training, and continuous phone and WhatsApp support managed from our Kanpur headquarters.' }
    ]
  },

  // ── 28b. Location: Uttar Pradesh State Hub ────────────────────────────────
  {
    path: 'it-software-company-uttar-pradesh',
    title: 'IT & Software Company in Uttar Pradesh | YogTeck',
    description: 'YogTeck is a leading IT & software company in Uttar Pradesh. We engineer custom software, cloud ERP, billing & websites for UP enterprises and MSMEs.',
    h1: 'IT & Software Development Company in Uttar Pradesh',
    directAnswer: 'YogTeck Business Solution is a premier software engineering and IT consulting company headquartered in Uttar Pradesh (Registered Office: 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, UP 208015). We provide enterprise cloud ERP software, custom business portals, high-speed corporate websites, GST billing suites, e-commerce storefronts, and local search visibility services across Uttar Pradesh.',
    type: 'Service',
    isHeadquarters: true,
    faqs: [
      { q: 'Where is YogTeck headquartered in Uttar Pradesh?', a: 'YogTeck Business Solution is headquartered in Kanpur Nagar, Uttar Pradesh, with our registered development office at 302/2, Mangla Vihar 2, New PAC Line, Kanpur 208015. We actively serve clients across all 75 districts of Uttar Pradesh.' },
      { q: 'What software solutions does YogTeck provide for UP businesses?', a: 'We build custom cloud software, industrial ERP platforms, GST billing software, high-converting corporate websites, e-commerce applications, and digital marketing engines.' }
    ]
  },

  // ── 29-34. Unverified City Pages (Marked noindex with [OWNER: city-specific content needed]) ──
  {
    path: 'it-software-company-noida',
    title: 'IT & Software Services in Noida | YogTeck',
    description: 'YogTeck provides custom software development, SaaS platform architecture, and web applications for technology enterprises and startups in Noida.',
    h1: 'IT & Custom Software Development in Noida',
    directAnswer: 'YogTeck delivers remote custom software engineering, cloud ERP architecture, and web application development for businesses in Noida as part of our nationwide service area.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-delhi',
    title: 'IT & Software Services in Delhi | YogTeck',
    description: 'YogTeck engineers scalable cloud ERP, custom software platforms, and mobile applications for trading, wholesale, and corporate brands in Delhi NCR.',
    h1: 'Custom Software & Web Application Development in Delhi',
    directAnswer: 'YogTeck provides enterprise software development, e-commerce applications, and business automation solutions to companies across Delhi NCR as part of our service area.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-gurugram',
    title: 'IT & Software Services in Gurugram | YogTeck',
    description: 'Scalable cloud software, SaaS platform development, and enterprise applications delivered for startups and corporate enterprises in Gurugram by YogTeck.',
    h1: 'SaaS Architecture & Custom Software in Gurugram',
    directAnswer: 'YogTeck delivers specialized multi-tenant SaaS architecture, cloud software platforms, and API integrations for enterprises and growing startups in Gurugram.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-faridabad',
    title: 'IT & Software Services in Faridabad | YogTeck',
    description: 'YogTeck provides custom software development, cloud ERP, billing platforms & web solutions for manufacturing ancillaries and enterprises in Faridabad, NCR.',
    h1: 'IT & Software Development Services for Faridabad, NCR',
    directAnswer: 'YogTeck Business Solution serves businesses in Faridabad, Delhi NCR through remote software development, web engineering, cloud ERP, and digital marketing consulting.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-pune',
    title: 'IT & Software Services in Pune | YogTeck',
    description: 'YogTeck delivers industrial ERP, custom software & web portals for Pune manufacturing hubs, served remotely from our Kanpur office.',
    h1: 'Industrial ERP & Custom Software for Pune',
    directAnswer: 'YogTeck extends custom manufacturing ERP, inventory management systems, and web application engineering to industrial and commercial enterprises in Pune.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-mumbai',
    title: 'IT & Software Services in Mumbai | YogTeck',
    description: 'YogTeck engineers custom web portals, e-commerce & cloud software for Mumbai commercial brands, delivered remotely from our Kanpur office.',
    h1: 'Custom Web Applications & Software for Mumbai',
    directAnswer: 'YogTeck delivers custom enterprise software platforms, wholesale billing solutions, and secure cloud web applications for businesses across the Mumbai metropolitan area.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-rajasthan',
    title: 'IT & Software Company in Rajasthan | YogTeck',
    description: 'YogTeck provides custom cloud ERP, billing software & web portals for Rajasthan businesses, delivered remotely from our Kanpur office.',
    h1: 'Custom Software & Cloud ERP Across Rajasthan',
    directAnswer: 'YogTeck Business Solution provides custom cloud software, multi-warehouse ERP systems, GST billing software, and web applications across Rajasthan, delivered remotely from our Kanpur office.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-gujarat',
    title: 'IT & Software Company in Gujarat | YogTeck',
    description: 'YogTeck delivers industrial ERP, billing systems & web portals for Gujarat manufacturing hubs, engineered remotely from our Kanpur office.',
    h1: 'Industrial Software & Cloud ERP Across Gujarat',
    directAnswer: 'YogTeck Business Solution delivers industrial ERP software, custom manufacturing platforms, and GST billing solutions across Gujarat, served remotely from our Kanpur office.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-madhya-pradesh',
    title: 'IT & Software in Madhya Pradesh | YogTeck',
    description: 'YogTeck provides custom software, cloud ERP & billing solutions for Madhya Pradesh commercial hubs, served remotely from our Kanpur office.',
    h1: 'Custom Software & Cloud ERP in Madhya Pradesh',
    directAnswer: 'YogTeck Business Solution delivers cloud ERP software, inventory automation platforms, and GST billing suites across Madhya Pradesh, served remotely from our Kanpur office.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-jaipur',
    title: 'IT & Software Services in Jaipur | YogTeck',
    description: 'YogTeck delivers custom software, cloud ERP & web development for Jaipur businesses, delivered remotely from our Kanpur office.',
    h1: 'Custom Software & Cloud ERP Services for Jaipur',
    directAnswer: 'YogTeck Business Solution provides custom web development, cloud ERP systems, and GST billing suites for commercial enterprises in Jaipur, delivered remotely from our Kanpur office.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-indore',
    title: 'IT & Software Services in Indore | YogTeck',
    description: 'YogTeck engineers cloud ERP, GST billing & web portals for Indore commercial businesses, delivered remotely from our Kanpur office.',
    h1: 'Custom Software & Business ERP Solutions for Indore',
    directAnswer: 'YogTeck Business Solution delivers cloud ERP platforms, custom software development, and GST billing software for commercial enterprises in Indore, delivered remotely from our Kanpur office.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-ahmedabad',
    title: 'IT & Software Company in Ahmedabad | YogTeck',
    description: 'YogTeck provides custom ERP, inventory systems & web development for Ahmedabad enterprises, delivered remotely from our Kanpur office.',
    h1: 'Custom Software & Industrial ERP for Ahmedabad',
    directAnswer: 'YogTeck Business Solution engineers custom cloud software, industrial ERP platforms, and corporate web portals for businesses in Ahmedabad, served remotely from our Kanpur office.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-chandigarh',
    title: 'IT & Software Services in Chandigarh | YogTeck',
    description: 'YogTeck delivers custom cloud software, billing & web portals for Chandigarh tri-city businesses, served remotely from our Kanpur office.',
    h1: 'Cloud Software & Web Development for Chandigarh',
    directAnswer: 'YogTeck Business Solution delivers custom software engineering, cloud ERP systems, and GST billing software for businesses in Chandigarh, Mohali, and Panchkula, delivered remotely from Kanpur.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-bangalore',
    title: 'Software Engineering for Bangalore | YogTeck',
    description: 'YogTeck provides full-stack software development, SaaS architecture & API systems for Bangalore teams, engineered remotely from Kanpur.',
    h1: 'Custom Software & Cloud Engineering for Bangalore',
    directAnswer: 'YogTeck Business Solution provides specialized full-stack software engineering, multi-tenant SaaS architecture, and modern web application development for teams in Bangalore, delivered remotely from Kanpur.',
    type: 'WebPage',
    isNoindex: true
  },

  // ── Directory: Service Areas ──────────────────────────────────────────────
  {
    path: 'service-areas',
    title: 'IT & Software Service Areas Across India | YogTeck',
    description: 'Explore YogTeck software engineering service areas across India. We deliver cloud ERP, custom software & billing suites remotely from our Kanpur office.',
    h1: 'Software Engineering Service Areas Across India',
    directAnswer: 'YogTeck Business Solution is headquartered in Kanpur, Uttar Pradesh (Registered Office: 302/2, Mangla Vihar 2, New PAC Line, Kanpur 208015). We engineer custom enterprise software, cloud ERP, GST billing systems, and modern web portals for clients across North and West India, delivered remotely from our central engineering office.',
    type: 'WebPage',
    isNoindex: false
  },

  // ── Long-Tail Industry & Service Solutions (Task 3) ───────────────────────
  {
    path: 'solutions/erp-for-manufacturers',
    title: 'ERP Software for Manufacturers | YogTeck',
    description: 'Custom cloud ERP for manufacturing plants. Multi-stage BOM, job-work challans, batch tracking & GST invoicing, delivered remotely from Kanpur.',
    h1: 'Cloud ERP Software for Manufacturing Enterprises',
    directAnswer: 'YogTeck engineers specialized cloud ERP systems designed specifically for discrete and process manufacturing plants across India. Our manufacturing software digitizes multi-level Bills of Materials (BOM), outside job-work issue and receipt challans, real-time machine run logs, component scrap reconciliation, worker job cards, and GST-ready e-invoicing. Delivered remotely from our Kanpur central software development office, our manufacturing architecture gives plant owners complete production floor visibility, zero software lock-in, and full intellectual property ownership.',
    type: 'Service',
    serviceType: 'Manufacturing ERP Software',
    isNoindex: false
  },
  {
    path: 'solutions/inventory-software-for-traders',
    title: 'Inventory Software for Wholesale Traders | YogTeck',
    description: 'Centralized multi-warehouse inventory software for wholesale traders. Multi-godown stock, customer credit ledgers & barcode billing by YogTeck.',
    h1: 'Cloud Inventory & Distribution Software for Wholesale Traders',
    directAnswer: 'YogTeck engineers robust cloud inventory management software and multi-warehouse distribution systems for wholesale traders, FMCG distributors, and bulk commodity stockists across India. Our distribution suite unifies multi-godown stock transfers, customer Udhar credit control ledgers, batch expiry FIFO tracking, delivery beat scheduling, and instant WhatsApp invoice dispatch.',
    type: 'Service',
    serviceType: 'Inventory Management Software',
    isNoindex: false
  },
  {
    path: 'solutions/billing-software-for-retail',
    title: 'GST Billing Software for Retail Stores | YogTeck',
    description: 'High-speed 10-second GST barcode billing software for retail shops. Thermal receipt printing, multi-store sync & WhatsApp invoices by YogTeck.',
    h1: 'High-Speed GST Billing & POS Software for Retailers',
    directAnswer: 'YogTeck engineers high-speed, 10-second GST barcode billing software and Point of Sale (POS) suites for retail showrooms, supermarket chains, garment boutiques, and multi-branch commercial merchants across India. Featuring instant barcode scanning, thermal receipt printing, real-time multi-counter synchronization, salesman commission tracking, and automated WhatsApp invoice delivery, our retail billing suite keeps checkout lines moving swiftly.',
    type: 'Service',
    serviceType: 'Retail POS & Billing Software',
    isNoindex: false
  },
  {
    path: 'solutions/erp-for-pharma-distributors',
    title: 'Pharma Distributor ERP & Billing Software | YogTeck',
    description: 'Specialized cloud ERP for pharmaceutical distributors and stockists. Batch number tracking, expiry FIFO alerts & cold-chain logs by YogTeck.',
    h1: 'Cloud ERP Software for Pharmaceutical Distributors & Stockists',
    directAnswer: 'YogTeck engineers specialized cloud ERP systems and statutory billing software for pharmaceutical distributors, wholesale stockists, and C&F carrying agents across India. Our pharmaceutical distribution platform automates mandatory drug license verification, batch-wise expiry tracking with near-expiry alerts, cold-chain temperature logs, chemist order booking, and automated GST pharmaceutical invoicing.',
    type: 'Service',
    serviceType: 'Pharmaceutical ERP Software',
    isNoindex: false
  },

  // ── International Regional Landing Pages (Task 1: noindex, canonical pointing to non-prefixed) ──
  {
    path: 'en-us',
    title: 'Custom Software Development USA | YogTeck',
    description: 'YogTeck delivers enterprise software development, cloud ERP, custom SaaS applications, and dedicated engineering teams for US businesses.',
    h1: 'Enterprise Software Engineering & Cloud Solutions in the USA',
    directAnswer: 'YogTeck provides high-performance custom software development, cloud ERP platforms, and dedicated software engineering teams for businesses across the United States.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'en-gb',
    title: 'Bespoke Software Development UK | YogTeck',
    description: 'Bespoke software development, enterprise cloud platforms, and dedicated developer teams for UK businesses by YogTeck.',
    h1: 'Bespoke Software Development & Enterprise Engineering UK',
    directAnswer: 'YogTeck engineers bespoke enterprise software, modern web portals, and scalable cloud systems tailored for UK organizations.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'en-ca',
    title: 'Custom Software Development Canada | YogTeck',
    description: 'Full-cycle custom software development, cloud ERP, and web applications engineered by YogTeck for Canadian enterprises.',
    h1: 'Custom Software Engineering & Cloud Platforms in Canada',
    directAnswer: 'YogTeck delivers scalable cloud architectures, custom software development, and modern web applications for Canadian businesses.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'en-au',
    title: 'Custom Software Development Australia | YogTeck',
    description: 'Premier custom software development, cloud ERP architectures, and web application solutions for Australian businesses.',
    h1: 'Custom Software Development & Digital Solutions in Australia',
    directAnswer: 'YogTeck engineers reliable business management systems, custom software platforms, and high-speed web apps across Australia.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'en-sg',
    title: 'Custom Software Development Singapore | YogTeck',
    description: 'Leading software development and cloud ERP solutions for enterprises in Singapore and Southeast Asia by YogTeck.',
    h1: 'Custom Software & Enterprise Cloud ERP in Singapore',
    directAnswer: 'YogTeck builds high-performance web platforms, enterprise ERP systems, and custom SaaS software for businesses in Singapore.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'en-ph',
    title: 'Custom Software Development Philippines | YogTeck',
    description: 'Trusted custom software development, cloud business management, and web applications in the Philippines by YogTeck.',
    h1: 'Custom Software Development & Cloud Systems Philippines',
    directAnswer: 'YogTeck delivers dependable custom software engineering, business ERP suites, and modern web applications in the Philippines.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'de-de',
    title: 'Softwareentwicklung & Cloud ERP Deutschland | YogTeck',
    description: 'Maßgeschneiderte Unternehmenssoftware, Cloud-ERP-Systeme und moderne Webanwendungen für den deutschen Markt.',
    h1: 'Individuelle Softwareentwicklung & Cloud-Lösungen in Deutschland',
    directAnswer: 'YogTeck entwickelt maßgeschneiderte Unternehmenssoftware, Cloud-ERP-Plattformen und skalierbare Webanwendungen für deutsche Unternehmen.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'fr-fr',
    title: 'Développement Logiciel sur Mesure France | YogTeck',
    description: 'Développement de logiciels sur mesure, plateformes ERP cloud et applications web haute performance par YogTeck pour la France.',
    h1: 'Développement de Logiciels sur Mesure & Solutions Cloud en France',
    directAnswer: 'YogTeck conçoit et développe des logiciels d’entreprise sur mesure, des systèmes ERP cloud et des applications web modernes pour les entreprises.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'ja-jp',
    title: 'カスタムソフトウェア開発・クラウドERP開発 日本 | YogTeck',
    description: '日本市場向けカスタムソフトウェア開発、クラウドERP導入、最新Webアプリケーション構築サービス。',
    h1: '企業向けカスタムソフトウェア開発＆クラウドERPソリューション',
    directAnswer: 'YogTeckは、製造業、小売業、IT企業向けに高品質なカスタムソフトウェア開発、クラウドERPプラットフォーム、高速Webソリューションを提供します。',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'ko-kr',
    title: '맞춤형 소프트웨어 개발 및 엔터프라이즈 클라우드 ERP 한국 | YogTeck',
    description: '기업 맞춤형 소프트웨어 엔지니어링, 클라우드 ERP 시스템 구축 및 고성능 웹 애플리케이션 개발.',
    h1: '기업용 맞춤형 소프트웨어 개발 및 클라우드 솔루션',
    directAnswer: 'YogTeck은 기업의 비즈니스 효율을 극대화하는 맞춤형 소프트웨어와 고성능 클라우드 ERP 플랫폼을 제공합니다.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  },
  {
    path: 'en',
    title: 'Global Custom Software Development | YogTeck',
    description: 'Full-cycle custom software development, cloud ERP architectures, and dedicated engineering teams for international businesses.',
    h1: 'Global Custom Software Development & Cloud Engineering',
    directAnswer: 'YogTeck delivers full-cycle software engineering, cloud ERP architectures, and dedicated development teams for forward-thinking international clients.',
    type: 'WebSite',
    isNoindex: true,
    canonicalOverride: 'https://yogteck.com/'
  }
];

// ══════════════════════════════════════════════════════════════════════════
// BUILD JSON-LD STRUCTURED DATA
// ══════════════════════════════════════════════════════════════════════════
function generateJsonLd(page) {
  const pageUrl = page.path ? `${DOMAIN}/${page.path}` : `${DOMAIN}/`;
  const schemas = [];

  // 1. Organization / LocalBusiness
  if (page.isHeadquarters || page.path === '') {
    schemas.push(ORG_SCHEMA);
  } else {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${DOMAIN}/#organization`,
      name: 'YogTeck Business Solution',
      url: DOMAIN,
      logo: `${DOMAIN}/assets/images/logo.png`,
      telephone: '+91 8299209905',
      email: 'official@yogteck.com'
    });
  }

  // 2. Breadcrumbs
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN }
  ];
  if (page.path) {
    const segments = page.path.split('/');
    if (segments.length === 1) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: page.h1,
        item: pageUrl
      });
    } else {
      const parentName = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: parentName,
        item: `${DOMAIN}/${segments[0]}`
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: page.h1,
        item: pageUrl
      });
    }
  }
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  });

  // 3. Service Schema
  if (page.type === 'Service') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: page.serviceType || page.h1,
      description: page.description,
      provider: {
        '@type': 'LocalBusiness',
        name: 'YogTeck Business Solution',
        url: DOMAIN,
        telephone: '+91 8299209905',
        address: ORG_SCHEMA.address
      },
      areaServed: page.path.includes('lucknow') ? [{ '@type': 'City', name: 'Lucknow' }] :
                  page.path.includes('raebareli') ? [{ '@type': 'City', name: 'Raebareli' }] :
                  page.path.includes('kanpur') ? [{ '@type': 'City', name: 'Kanpur' }] :
                  page.path.includes('uttar-pradesh') ? [{ '@type': 'State', name: 'Uttar Pradesh' }] :
                  [
                    { '@type': 'City', name: 'Kanpur' },
                    { '@type': 'City', name: 'Lucknow' },
                    { '@type': 'State', name: 'Uttar Pradesh' },
                    { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
                    { '@type': 'Country', name: 'India' }
                  ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: page.h1,
              description: page.directAnswer
            }
          }
        ]
      }
    });
  }

  // 4. SoftwareApplication Schema
  if (page.type === 'SoftwareApplication') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${pageUrl}#software`,
      name: page.h1,
      applicationCategory: page.applicationCategory || 'BusinessApplication',
      operatingSystem: 'Web, Android, Windows, Cloud',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: 'Custom quotation and monthly subscription plans'
      },
      description: page.description,
      publisher: {
        '@type': 'Organization',
        name: 'YogTeck Business Solution',
        url: DOMAIN
      }
    });
  }

  // 5. BlogPosting Schema (Task 3)
  if (page.type === 'BlogPosting') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: page.h1,
      description: page.description,
      image: `${DOMAIN}/assets/images/og-image.jpg`,
      datePublished: '2026-10-24',
      dateModified: '2026-10-28',
      author: {
        '@type': 'Person',
        name: 'Yogi Rajpoot',
        jobTitle: 'Founder & Lead Architect, YogTeck'
      },
      publisher: {
        '@type': 'Organization',
        name: 'YogTeck Business Solution',
        url: DOMAIN,
        logo: {
          '@type': 'ImageObject',
          url: `${DOMAIN}/assets/images/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    });
  }

  // 6. FAQPage Schema
  if (page.faqs && page.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: page.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    });
  }

  return JSON.stringify(schemas, null, 2);
}

// ══════════════════════════════════════════════════════════════════════════
// BUILD SEMANTIC PRERENDERED HTML BODY
// ══════════════════════════════════════════════════════════════════════════
function generatePrerenderHtml(page) {
  const pageUrl = page.path ? `${DOMAIN}/${page.path}` : `${DOMAIN}/`;

  let body = `
  <main class="prerender-main-content" style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
    <header style="margin-bottom: 30px;">
      <nav aria-label="Breadcrumb" style="font-size: 14px; margin-bottom: 16px; color: #64748B;">
        <a href="/" style="color: #FF9A1F; text-decoration: none;">Home</a>`;

  if (page.path) {
    const segments = page.path.split('/');
    if (segments.length === 2) {
      body += ` <span style="margin: 0 8px;">/</span> <a href="/${segments[0]}" style="color: #FF9A1F; text-decoration: none;">${segments[0]}</a>`;
    }
    body += ` <span style="margin: 0 8px;">/</span> <span style="color: #94A3B8;">${page.h1}</span>`;
  }

  body += `
      </nav>
      <h1 style="font-size: 32px; font-weight: 800; line-height: 1.2; margin-bottom: 16px; color: #0A1330;">${page.h1}</h1>
      <p class="direct-answer" style="font-size: 18px; line-height: 1.6; color: #334155; background: #F8FAFC; border-left: 4px solid #FF9A1F; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
        ${page.directAnswer}
      </p>
    </header>`;

  if (page.isNoindex) {
    body += `
    <div style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 16px; border-radius: 8px; margin-bottom: 30px; color: #92400E;">
      <strong>Notice:</strong> [OWNER: city-specific content needed]. This service area page is currently in preparation and marked noindex until verified localized data is provided.
    </div>`;
  }

  body += `
    <section style="margin-bottom: 40px;">
      <h2 style="font-size: 24px; font-weight: 700; color: #0A1330; margin-bottom: 16px;">Core Capabilities & Engineered Architecture</h2>
      <p style="font-size: 16px; line-height: 1.7; color: #475569; margin-bottom: 16px;">
        YogTeck Business Solution engineers production-ready applications prioritizing data reliability, high-speed response times, and compliance with Indian commercial standards. From localized GST-ready invoicing to cloud-native multi-tenant portals, our software stack is optimized for enterprise efficiency and maximum ROI.
      </p>
      <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 24px;">
        <a href="/contact" style="background: #FF9A1F; color: #FFFFFF; font-weight: 600; padding: 12px 28px; border-radius: 6px; text-decoration: none; display: inline-block;">Request Consultation</a>
        <a href="tel:+918299209905" style="border: 2px solid #0A1330; color: #0A1330; font-weight: 600; padding: 10px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">Call +91 8299209905</a>
      </div>
    </section>`;

  if (page.contentHtml) {
    body += `
    <article class="prerender-article-body" style="margin-top: 30px; margin-bottom: 40px; font-size: 16px; line-height: 1.8; color: #334155; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 30px; border-radius: 12px;">
      ${page.contentHtml}
    </article>`;
  }

  if (page.faqs && page.faqs.length > 0) {
    body += `
    <section style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #E2E8F0;">
      <h2 style="font-size: 24px; font-weight: 700; color: #0A1330; margin-bottom: 20px;">Frequently Asked Questions</h2>
      <div style="display: flex; flex-direction: column; gap: 16px;">`;

    for (const faq of page.faqs) {
      body += `
        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 18px 20px; border-radius: 8px;">
          <h3 style="font-size: 17px; font-weight: 600; color: #0F172A; margin-bottom: 8px;">${faq.q}</h3>
          <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0;">${faq.a}</p>
        </div>`;
    }

    body += `
      </div>
    </section>`;
  }

  body += `
    <footer style="margin-top: 50px; padding-top: 24px; border-top: 1px solid #E2E8F0; font-size: 14px; color: #64748B;">
      <p style="margin: 0;">
        <strong>Registered Office:</strong> 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, Uttar Pradesh 208015, India.<br>
        Direct Contact: <a href="tel:+918299209905" style="color: #FF9A1F; text-decoration: none;">+91 8299209905</a> | Email: <a href="mailto:official@yogteck.com" style="color: #FF9A1F; text-decoration: none;">official@yogteck.com</a>
      </p>
    </footer>
  </main>`;

  return body;
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ══════════════════════════════════════════════════════════════════════════
async function runPrerender() {
  console.log('[prerender] Starting static HTML prerender snapshot generation...');

  const templatePath = path.join(distBrowserDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`[prerender] ERROR: Base Angular bundle template not found at: ${templatePath}`);
    console.error('[prerender] Please run "ng build" before running prerender.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf8');
  let generatedCount = 0;

  const cleanBase = baseTemplate
    .replace(/<html[^>]*lang=["'][^"']*["']/i, '<html lang="en-IN"')
    .replace(/<link\s+rel=["']alternate["'][\s\S]*?>/gi, '')
    .replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '')
    .replace(/<meta\s+property=["']og:[\s\S]*?>/gi, '')
    .replace(/<meta\s+name=["']twitter:[\s\S]*?>/gi, '')
    .replace(/<meta\s+name=["']robots["'][\s\S]*?>/gi, '');

  for (const page of PAGES_DATA) {
    const canonicalUrl = page.canonicalOverride
      ? page.canonicalOverride
      : (page.path ? `${DOMAIN}/${page.path}` : `${DOMAIN}/`);

    const robotsDirectives = page.isNoindex
      ? '<meta name="robots" content="noindex, follow">'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">';

    const jsonLdContent = generateJsonLd(page);
    const prerenderBodyHtml = generatePrerenderHtml(page);

    // Replace Title
    let html = cleanBase.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${page.title}</title>`
    );

    // Replace Meta Description
    if (html.includes('<meta name="description"')) {
      html = html.replace(
        /<meta name="description"[\s\S]*?>/i,
        `<meta name="description" content="${page.description}">`
      );
    } else {
      html = html.replace('</head>', `  <meta name="description" content="${page.description}">\n</head>`);
    }

    // Replace Canonical Link (Task 1: points to canonical non-prefixed URL)
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /<link rel="canonical"[\s\S]*?>/i,
        `<link rel="canonical" href="${canonicalUrl}">`
      );
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}">\n</head>`);
    }

    // Inject Meta Robots & Open Graph / Twitter Tags (Zero untranslated hreflangs)
    const ogImage = `${DOMAIN}/assets/images/og-image.jpg`;
    const metaTags = `
  ${robotsDirectives}
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${ogImage}">
  <script type="application/ld+json">
${jsonLdContent}
  </script>
</head>`;

    html = html.replace('</head>', metaTags);

    // Inject Pre-rendered Initial HTML into <app-root>
    html = html.replace(
      /<app-root[\s\S]*?>[\s\S]*?<\/app-root>/i,
      `<app-root>${prerenderBodyHtml}</app-root>`
    );

    // Write file
    let targetFilePath;
    if (page.path === '') {
      targetFilePath = path.join(distBrowserDir, 'index.html');
    } else {
      const targetDir = path.join(distBrowserDir, page.path);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      targetFilePath = path.join(targetDir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, html, 'utf8');
    generatedCount++;
  }

  // Create custom 404.html
  const notFoundHtml = baseTemplate
    .replace(/<title>[\s\S]*?<\/title>/i, '<title>404 - Page Not Found | YogTeck Business Solution</title>')
    .replace('</head>', '  <meta name="robots" content="noindex, follow">\n</head>')
    .replace(
      /<app-root[\s\S]*?>[\s\S]*?<\/app-root>/i,
      `<app-root>
        <div style="max-width: 600px; margin: 100px auto; text-align: center; font-family: system-ui, sans-serif; padding: 20px;">
          <h1 style="font-size: 64px; color: #FF9A1F; margin-bottom: 10px;">404</h1>
          <h2 style="font-size: 24px; color: #0A1330; margin-bottom: 16px;">Page Not Found</h2>
          <p style="color: #64748B; margin-bottom: 24px;">The page you requested could not be located on the YogTeck server.</p>
          <a href="/" style="background: #FF9A1F; color: #FFF; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Back to Home</a>
        </div>
      </app-root>`
    );
  fs.writeFileSync(path.join(distBrowserDir, '404.html'), notFoundHtml, 'utf8');

  console.log(`[prerender] SUCCESS: Successfully generated ${generatedCount} static prerendered HTML snapshots + 404.html!`);
}

runPrerender().catch(err => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
