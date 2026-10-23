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
  sameAs: [
    'https://www.linkedin.com/company/yogteck',
    'https://github.com/yogteck'
  ]
};

// ══════════════════════════════════════════════════════════════════════════
// PAGE SNAPSHOT DEFINITIONS (28 Canonical + 5 noindex City Stubs)
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

  // ── 15. Product: ERP Software ────────────────────────────────────────────
  {
    path: 'products/erp-software',
    title: 'Cloud ERP Software Platform | YogTeck Business Solution',
    description: 'YogTeck Cloud ERP unifies multi-warehouse stock, production BOM, GST e-invoicing, purchase approvals, and payroll for manufacturing and wholesale in India.',
    h1: 'Cloud ERP Software Platform for Manufacturers & Distributors',
    directAnswer: 'YogTeck Cloud ERP is an integrated enterprise resource planning platform engineered for manufacturers, wholesale distributors, and multi-branch trading enterprises in Kanpur and across India. It consolidates real-time inventory tracking, production Bill of Materials (BOM), automated GST e-invoicing, and staff payroll into a secure cloud dashboard.',
    type: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    faqs: [
      { q: 'Who is YogTeck Cloud ERP built for?', a: 'It is built for manufacturers (leather, garments, engineering ancillaries, compounding) and wholesale distributors managing multi-warehouse stock and credit limits.' },
      { q: 'What are the subscription plans and pricing for Cloud ERP?', a: 'Pricing is structured into Starter Cloud ERP ([OWNER: real price] /month) for single-location trading and Growth Enterprise ERP ([OWNER: real price] /month) for multi-branch factories.' }
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
      { q: 'What pricing plans are available for the SaaS platform?', a: 'We offer Managed Cloud SaaS ([OWNER: real price] /month per organization) and Agency White-Label License ([OWNER: real price] one-time or annual license).' }
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
      { q: 'What are the subscription plans for the WhatsApp marketing tool?', a: 'We offer Starter Marketing ([OWNER: real price] /month for 10,000 messages) and Business Automation ([OWNER: real price] /month for unlimited contacts with webhook integration).' }
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
      { q: 'What metrics and results were achieved?', a: '100% elimination of plot double-booking, real-time associate commission computation, and [OWNER: client permission / results for verified revenue and transaction volume].' }
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
      { q: 'What business results were recorded?', a: 'Sub-second mobile catalog load times, seamless COD and UPI checkout processing, and [OWNER: client permission / results for verified monthly orders].' }
    ]
  },

  // ── 25. Client: Business Web Solutions ───────────────────────────────────
  {
    path: 'clients/business-web-solutions',
    title: 'Business Web Solutions Portal | YogTeck Business Solution',
    description: 'Case study of the Business Web Solutions corporate directory platform engineered by YogTeck with multi-tenant company listings and lead generation.',
    h1: 'Business Web Solutions Corporate Directory Case Study',
    directAnswer: 'Business Web Solutions is a regional business directory and digital marketing network connecting commercial enterprises with local buyers. YogTeck engineered a scalable multi-tenant directory portal enabling verified companies to manage digital profiles, product catalogs, and direct inquiry forms.',
    type: 'Article',
    faqs: [
      { q: 'What capabilities were delivered in this project?', a: 'A multi-tenant company profile management portal, structured SEO breadcrumbs, automated lead notification webhooks, and [OWNER: client permission / results for verified business counts].' }
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

  // ── 28. Location: Raebareli Service Hub ──────────────────────────────────
  {
    path: 'it-software-company-raebareli',
    title: 'Software Development Raebareli | YogTeck Business Solution',
    description: 'YogTeck delivers custom billing software, cloud ERP, and web development in Raebareli for industrial units, hospitals, schools, and traders.',
    h1: 'Software Development & IT Solutions in Raebareli',
    directAnswer: 'YogTeck Business Solution extends comprehensive software development, GST billing, and business automation services to enterprises across Raebareli. We support local healthcare centers, manufacturing units, transport firms, and retail merchants with robust cloud software.',
    type: 'Service',
    isHeadquarters: false,
    faqs: [
      { q: 'How does YogTeck support clients in Raebareli?', a: 'We provide remote deployment, on-site staff training, and continuous phone and WhatsApp support managed from our Kanpur headquarters.' }
    ]
  },

  // ── 29-33. Unverified City Pages (Marked noindex with [OWNER: city-specific content needed]) ──
  {
    path: 'it-software-company-noida',
    title: 'IT & Software Development Services in Noida | YogTeck Business Solution',
    description: 'YogTeck provides custom software development, SaaS platform architecture, and web applications for technology enterprises and startups in Noida.',
    h1: 'IT & Custom Software Development in Noida',
    directAnswer: 'YogTeck delivers remote custom software engineering, cloud ERP architecture, and web application development for businesses in Noida as part of our nationwide service area.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-delhi',
    title: 'Custom Software Development in Delhi NCR | YogTeck Business Solution',
    description: 'YogTeck engineers scalable cloud ERP, custom software platforms, and mobile applications for trading, wholesale, and corporate brands in Delhi NCR.',
    h1: 'Custom Software & Web Application Development in Delhi',
    directAnswer: 'YogTeck provides enterprise software development, e-commerce applications, and business automation solutions to companies across Delhi NCR as part of our service area.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-gurugram',
    title: 'Software Engineering & SaaS Development Gurugram | YogTeck Business Solution',
    description: 'Scalable cloud software, SaaS platform development, and enterprise applications delivered for startups and corporate enterprises in Gurugram by YogTeck.',
    h1: 'SaaS Architecture & Custom Software in Gurugram',
    directAnswer: 'YogTeck delivers specialized multi-tenant SaaS architecture, cloud software platforms, and API integrations for enterprises and growing startups in Gurugram.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-pune',
    title: 'Custom Software & Cloud ERP in Pune | YogTeck Business Solution',
    description: 'YogTeck provides engineering-grade custom software, production ERP, and mobile application solutions for manufacturing and IT companies in Pune.',
    h1: 'Custom Software & Manufacturing ERP in Pune',
    directAnswer: 'YogTeck extends custom manufacturing ERP, inventory management systems, and web application engineering to industrial and commercial enterprises in Pune.',
    type: 'WebPage',
    isNoindex: true
  },
  {
    path: 'it-software-company-mumbai',
    title: 'Enterprise Software & Cloud Systems Mumbai | YogTeck Business Solution',
    description: 'Enterprise software development, billing platforms, and cloud web applications delivered by YogTeck for financial and commercial firms in Mumbai.',
    h1: 'Enterprise Software & Web Application Development Mumbai',
    directAnswer: 'YogTeck delivers custom enterprise software platforms, wholesale billing solutions, and secure cloud web applications for businesses across the Mumbai metropolitan area.',
    type: 'WebPage',
    isNoindex: true
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
      areaServed: {
        '@type': 'AdministrativeArea',
        name: page.path.includes('lucknow') ? 'Lucknow' : page.path.includes('raebareli') ? 'Raebareli' : 'India'
      },
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

  // 5. FAQPage Schema
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
        YogTeck Business Solution engineers production-ready applications prioritizing data reliability, sub-second response times, and compliance with Indian commercial standards. From localized GST e-invoicing to cloud-native multi-tenant portals, our software stack is optimized for enterprise efficiency and maximum ROI.
      </p>
      <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 24px;">
        <a href="/contact" style="background: #FF9A1F; color: #FFFFFF; font-weight: 600; padding: 12px 28px; border-radius: 6px; text-decoration: none; display: inline-block;">Request Consultation</a>
        <a href="tel:+918299209905" style="border: 2px solid #0A1330; color: #0A1330; font-weight: 600; padding: 10px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">Call +91 8299209905</a>
      </div>
    </section>`;

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
    .replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '')
    .replace(/<meta\s+property=["']og:[\s\S]*?>/gi, '')
    .replace(/<meta\s+name=["']twitter:[\s\S]*?>/gi, '')
    .replace(/<meta\s+name=["']robots["'][\s\S]*?>/gi, '');

  for (const page of PAGES_DATA) {
    const pageUrl = page.path ? `${DOMAIN}/${page.path}` : `${DOMAIN}/`;
    const robotsDirectives = page.isNoindex
      ? '<meta name="robots" content="noindex, nofollow">'
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

    // Replace Canonical Link
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /<link rel="canonical"[\s\S]*?>/i,
        `<link rel="canonical" href="${pageUrl}">`
      );
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${pageUrl}">\n</head>`);
    }

    // Inject Meta Robots & Open Graph / Twitter Tags
    const ogImage = `${DOMAIN}/assets/images/og-image.jpg`;
    const metaTags = `
  ${robotsDirectives}
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${pageUrl}">
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
