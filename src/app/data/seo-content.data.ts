export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceDetailData {
  slug: string;
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  badge: string;
  icon: string;
  heroSummary: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
  targetAudience: {
    title: string;
    description: string;
  }[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  benefits: {
    title: string;
    desc: string;
  }[];
  faqs: FaqItem[];
  relatedServices: {
    title: string;
    slug: string;
    desc: string;
  }[];
}

export interface LocationDetailData {
  city: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  heroIntro: string;
  entityStatement: string;
  cityOverview: string;
  businessChallenges: {
    title: string;
    desc: string;
  }[];
  keyServices: {
    title: string;
    slug: string;
    desc: string;
  }[];
  industriesServed: {
    industry: string;
    desc: string;
  }[];
  whyYogteckForCity: {
    title: string;
    desc: string;
  }[];
  faqs: FaqItem[];
}

export const SERVICES_SEO_DATA: Record<string, ServiceDetailData> = {
  'website-development': {
    slug: 'website-development',
    id: 'web-dev',
    title: 'Website Development',
    metaTitle: 'Website Development Company in Kanpur | Yogteck Business Solution',
    metaDescription: 'Yogteck Business Solution builds fast, SEO-friendly, mobile-responsive business websites in Kanpur and across India. Get custom UI/UX, free domain & hosting inclusions.',
    h1: 'Website Development Company in Kanpur, India',
    tagline: 'High-Converting, Lightning-Fast Business Websites & Portals',
    badge: 'Popular Solution',
    icon: 'globe',
    heroSummary: 'We architect and build bespoke, high-performance websites engineered for speed, search visibility, and customer conversion. From local businesses in Kanpur to enterprises pan-India, our websites establish commanding digital authority.',
    problemTitle: 'Why Standard Website Templates Hurt Business Growth',
    problemDesc: 'Many businesses struggle with slow-loading, generic website templates that look outdated on mobile devices, fail to rank on Google search, and fail to turn visitors into paying customers. A weak website damages brand credibility and wastes marketing investment.',
    solutionTitle: 'Engineered Web Solutions Built to Outperform',
    solutionDesc: 'Yogteck Business Solution delivers custom-coded, ultra-fast websites built on modern architectures with built-in technical SEO, frictionless mobile navigation, and conversion-optimized enquiry flows.',
    targetAudience: [
      { title: 'Local Businesses & Manufacturers', description: 'Enterprises in Kanpur, Lucknow and across Uttar Pradesh looking to transition from offline operations to an authoritative digital presence.' },
      { title: 'B2B & Industrial Suppliers', description: 'Wholesale suppliers and distributors requiring professional product catalogs, corporate credentials, and automated quotation systems.' },
      { title: 'Service Providers & Professionals', description: 'Doctors, lawyers, consultants, educational institutes, and service firms needing appointment booking and client trust signals.' },
      { title: 'Startups & Emerging Brands', description: 'Ambitious direct-to-consumer and tech ventures that need lightning-fast landing pages and modern UI/UX.' }
    ],
    features: [
      { title: 'Custom UI/UX Architecture', description: 'Every layout is tailored to your brand identity with intuitive user pathways that maximize enquiries.', icon: 'palette' },
      { title: 'Mobile-First Responsive Design', description: 'Flawless presentation and touch-friendly controls across smartphones, tablets, laptops, and desktops.', icon: 'smartphone' },
      { title: 'Core Web Vitals & Speed Optimization', description: 'Sub-second page loads, asset minification, and clean code scoring 90+ on Google PageSpeed Insights.', icon: 'zap' },
      { title: 'Built-in Technical SEO Foundation', description: 'Semantic HTML5 structure, schema markup, OpenGraph metadata, and clean URL routing.', icon: 'search' },
      { title: 'Domain & Cloud Hosting Included', description: 'Complimentary domain registration and secure high-speed cloud hosting with applicable packages.', icon: 'cloud' },
      { title: 'Lead Capture & WhatsApp Integration', description: 'Automated contact forms, direct WhatsApp floating widgets, and instant CRM notification triggers.', icon: 'message-circle' }
    ],
    processSteps: [
      { step: '01', title: 'Discovery & Wireframing', desc: 'We analyze your business model, target audience in Kanpur/India, and map conversion-focused wireframes.' },
      { step: '02', title: 'Custom UI/UX Design', desc: 'Crafting responsive visual layouts with your brand color scheme, typography, and interactive prototypes.' },
      { step: '03', title: 'Development & Testing', desc: 'Clean coding, cross-browser compatibility checks, performance profiling, and form validation setup.' },
      { step: '04', title: 'Launch & SEO Setup', desc: 'Deployment on high-speed servers, Google Search Console & Analytics integration, and sitemap submission.' }
    ],
    benefits: [
      { title: 'Higher Search Engine Visibility', desc: 'Rank higher for local and national buyer searches with clean semantic code and schema markup.' },
      { title: 'Increased Customer Inquiries', desc: 'Conversion-optimized layout with clear call-to-actions turns passive visitors into qualified leads.' },
      { title: 'Zero Monthly Maintenance Headaches', desc: 'Robust architecture with 99.9% uptime, SSL security, and dependable technical support.' },
      { title: '100% Code & Asset Ownership', desc: 'You retain full intellectual property rights, database access, and hosting credentials.' }
    ],
    faqs: [
      {
        question: 'What is the cost of website development in Kanpur with Yogteck?',
        answer: 'Website development costs depend on project requirements such as number of pages, custom features, animations, and database integrations. Yogteck Business Solution offers transparent, competitive pricing tailored for startups, SMEs, and large enterprises, often including free domain registration and high-speed hosting with eligible packages.'
      },
      {
        question: 'How long does it take to develop a custom business website?',
        answer: 'A standard corporate or local business website typically takes 7 to 14 business days from requirement sign-off to live deployment. Complex web portals or custom platforms may take 3 to 6 weeks depending on custom feature requirements.'
      },
      {
        question: 'Will my website be mobile-friendly and optimized for Google search?',
        answer: 'Yes, 100%. Every website developed by Yogteck Business Solution is built mobile-first, follows Google Core Web Vitals guidelines, includes structured JSON-LD schema markup, and is configured with Google Search Console and Google Analytics.'
      },
      {
        question: 'Do you provide website maintenance and support after launch?',
        answer: 'Yes. Yogteck Business Solution provides dedicated post-launch maintenance, security updates, regular backups, and technical support to ensure your website runs seamlessly.'
      }
    ],
    relatedServices: [
      { title: 'Custom Software Development', slug: 'custom-software-development', desc: 'Bespoke web applications and operational software.' },
      { title: 'E-Commerce Development', slug: 'ecommerce-development', desc: 'Full-featured online storefronts with payment gateways.' },
      { title: 'SEO & Digital Growth', slug: 'seo-digital-growth', desc: 'Rank your new website on Google for high-intent queries.' }
    ]
  },

  'custom-software-development': {
    slug: 'custom-software-development',
    id: 'custom-software',
    title: 'Custom Software Development',
    metaTitle: 'Custom Software Development Company in Kanpur | Yogteck',
    metaDescription: 'Yogteck Business Solution engineers custom software, cloud applications, SaaS platforms, and workflow automation solutions for businesses in Kanpur and across India.',
    h1: 'Custom Software Development Company in Kanpur, India',
    tagline: 'Tailored Cloud Applications, SaaS Platforms & Automation Systems',
    badge: 'Enterprise Engineering',
    icon: 'code',
    heroSummary: 'Every growing business has unique operational workflows that off-the-shelf software cannot solve. Yogteck Business Solution designs, builds, and maintains custom software applications tailored precisely to your operational requirements.',
    problemTitle: 'The High Cost of Inflexible Off-The-Shelf Software',
    problemDesc: 'Generic software often forces your business to adapt its processes to rigid limitations, charges steep monthly per-user licensing fees, and lacks integration with your existing legacy systems and databases.',
    solutionTitle: 'Software Built Around Your Exact Business Logic',
    solutionDesc: 'We architect bespoke cloud applications and portals that automate repetitive tasks, synchronize departmental data, enforce compliance, and scale effortlessly as your business grows.',
    targetAudience: [
      { title: 'Manufacturing & Industrial Units', description: 'Track production batches, raw material consumption, quality assurance checks, and dispatch schedules.' },
      { title: 'Distribution & Logistics Networks', description: 'Manage multi-warehouse inventory, fleet tracking, driver assignments, and automated delivery proofs.' },
      { title: 'Healthcare & Diagnostic Labs', description: 'Patient records management, automated test report delivery via WhatsApp/Email, and doctor scheduling.' },
      { title: 'Financial & Professional Services', description: 'Custom client portals, document verification workflows, subscription billing, and automated reconciliation.' }
    ],
    features: [
      { title: 'Cloud-Native Architecture', description: 'Scalable backends built with resilient microservices, secure RESTful APIs, and zero-downtime deployment.', icon: 'cloud' },
      { title: 'Role-Based Access Control', description: 'Granular permissions for administrators, managers, field staff, and clients ensuring data privacy.', icon: 'shield' },
      { title: 'Automated Workflow Triggers', description: 'Auto-generate invoices, PDF reports, SMS/WhatsApp alerts, and email notifications on key events.', icon: 'zap' },
      { title: 'Legacy System & API Integration', description: 'Seamlessly connect with third-party payment gateways, GST portals, CRMs, and accounting tools.', icon: 'cpu' },
      { title: 'Real-Time Executive Dashboards', description: 'Visual KPI tracking, revenue analytics, inventory valuation, and automated monthly reports.', icon: 'bar-chart' },
      { title: 'Comprehensive Data Security', description: 'End-to-end data encryption at rest and in transit, automated daily backups, and audit trails.', icon: 'lock' }
    ],
    processSteps: [
      { step: '01', title: 'System Architecture Planning', desc: 'Detailed business logic mapping, database schema design, and user story definitions.' },
      { step: '02', title: 'Iterative Sprint Development', desc: 'Agile development cycles with continuous milestone demonstrations for stakeholder feedback.' },
      { step: '03', title: 'Rigorous Quality Assurance', desc: 'Automated testing, security penetration checks, load testing, and edge-case validation.' },
      { step: '04', title: 'On-Premise or Cloud Deployment', desc: 'Secure cloud hosting setup, data migration, user training, and ongoing SLA maintenance.' }
    ],
    benefits: [
      { title: 'Eliminate Recurring License Fees', desc: 'Pay once for your custom asset instead of perpetual per-user subscriptions.' },
      { title: '10x Faster Operational Workflows', desc: 'Automate manual paperwork, spreadsheets, and human error across departments.' },
      { title: 'Scalable with Zero Limitations', desc: 'Add new modules, branch locations, or product lines whenever your business expands.' },
      { title: 'Complete Data Confidentiality', desc: 'Your proprietary business data stays strictly within your private database.' }
    ],
    faqs: [
      {
        question: 'Does Yogteck develop custom software for businesses in Kanpur and across India?',
        answer: 'Yes. Yogteck Business Solution provides custom software engineering for businesses based in Kanpur, Lucknow, Raebareli, as well as enterprises across India and overseas.'
      },
      {
        question: 'How do you ensure data security in custom software applications?',
        answer: 'We implement industry standard security practices including SSL/TLS encryption, bcrypt password hashing, role-based access permissions, SQL injection protection, rate limiting, and encrypted automated backups.'
      },
      {
        question: 'Can you migrate data from our existing Excel sheets or legacy software?',
        answer: 'Yes. Our engineers handle full data sanitization, schema migration, and import from existing Excel sheets, CSV files, Tally, or legacy databases with zero data loss.'
      },
      {
        question: 'Who owns the source code of the developed custom software?',
        answer: 'You retain 100% intellectual property ownership and source code rights upon project completion and final handover.'
      }
    ],
    relatedServices: [
      { title: 'ERP Software Solutions', slug: 'erp-software', desc: 'Unified resource planning for multi-department organizations.' },
      { title: 'Billing & Invoicing Software', slug: 'billing-software', desc: 'GST compliant automated billing and POS systems.' },
      { title: 'Business Management Software', slug: 'business-software', desc: 'CRM, helpdesks, and sales pipelines.' }
    ]
  },

  'mobile-app-development': {
    slug: 'mobile-app-development',
    id: 'mobile-app',
    title: 'Mobile App Development',
    metaTitle: 'Mobile App Development Company in Kanpur | Android & iOS | Yogteck',
    metaDescription: 'Yogteck Business Solution develops high-performance Android & iOS mobile applications in Kanpur. Native & cross-platform Flutter/React Native solutions for business growth.',
    h1: 'Mobile App Development Company in Kanpur, India',
    tagline: 'High-Performance Android & iOS Apps with Seamless User Experiences',
    badge: 'Mobile-First',
    icon: 'smartphone',
    heroSummary: 'Put your business directly in your customers’ hands. Yogteck Business Solution crafts engaging, native and cross-platform mobile apps for Android and iOS that drive user retention, repeat purchases, and real-time field operations.',
    problemTitle: 'Why Businesses Need Dedicated Mobile Applications',
    problemDesc: 'Over 80% of digital traffic in India happens on mobile devices. Without a fast, intuitive mobile app, businesses miss out on direct push notifications, offline functionality, geolocation features, and streamlined customer loyalty.',
    solutionTitle: 'Scalable Mobile Apps Built with Modern Frameworks',
    solutionDesc: 'We develop secure, cross-platform mobile applications using Flutter and React Native alongside native Android/iOS architectures, ensuring lightning speed, fluid 60fps animations, and dependable backend synchronization.',
    targetAudience: [
      { title: 'E-Commerce & Retail Brands', description: 'Enable direct in-app shopping, flash sale notifications, one-click UPI checkout, and loyalty points.' },
      { title: 'Field Operations & Service Teams', description: 'Field staff tracking, job dispatch, photo upload proof of delivery, and instant customer signature capture.' },
      { title: 'On-Demand & Booking Platforms', description: 'Cab booking, doctor appointments, home repair service scheduling, and real-time map tracking.' },
      { title: 'Community & Member Portals', description: 'Association apps, MLM network genealogy, educational video streaming, and student test portals.' }
    ],
    features: [
      { title: 'Cross-Platform Android & iOS', description: 'Single codebase deployment saving 40% development cost while ensuring identical native performance.', icon: 'layers' },
      { title: 'Instant UPI & Card Payments', description: 'Deep integration with Razorpay, Cashfree, PhonePe, Paytm, and Stripe for frictionless payments.', icon: 'credit-card' },
      { title: 'Push Notifications Engine', description: 'Targeted Firebase notifications for order status updates, promotional offers, and re-engagement.', icon: 'bell' },
      { title: 'Offline-First Data Sync', description: 'Allow field workers to record transactions even without internet; auto-sync when connection restores.', icon: 'wifi-off' },
      { title: 'GPS & Real-Time Location Tracking', description: 'Live order tracking, route navigation for delivery executives, and geo-fenced check-ins.', icon: 'map-pin' },
      { title: 'Google Play & App Store Publishing', description: 'Full assistance with Google Play Store and Apple App Store compliance, review guidelines, and launch.', icon: 'upload-cloud' }
    ],
    processSteps: [
      { step: '01', title: 'App Concept & UX Flow', desc: 'Mapping user journeys, touch interaction wireframes, and screen-by-screen prototypes.' },
      { step: '02', title: 'UI Design & Interactive Prototype', desc: 'Crafting pixel-perfect dark/light mobile interfaces following Material 3 and iOS Human Interface guidelines.' },
      { step: '03', title: 'App & API Development', desc: 'Developing the frontend app connected to high-speed backend REST APIs with JWT security.' },
      { step: '04', title: 'Store Submission & Launch', desc: 'App bundle optimization, app store listing optimization (ASO), and live store publishing.' }
    ],
    benefits: [
      { title: 'Direct Customer Retention', desc: 'Push notifications generate 5x higher engagement compared to conventional email marketing.' },
      { title: 'Faster Checkout & Conversion', desc: 'Saved user profiles, biometrics, and UPI intent make purchasing effortless.' },
      { title: 'Offline Productivity for Teams', desc: 'Enable on-ground staff to operate in low-connectivity areas with local SQLite storage.' },
      { title: 'Brand Distinction & Authority', desc: 'A verified app on Google Play Store positions your company ahead of competitors.' }
    ],
    faqs: [
      {
        question: 'Does Yogteck build mobile apps for both Android and iOS?',
        answer: 'Yes. We build cross-platform mobile apps for both Android and iOS using modern frameworks like Flutter and React Native, as well as native mobile applications.'
      },
      {
        question: 'How do you handle Google Play Store and Apple App Store approval?',
        answer: 'We manage the complete publishing lifecycle, including generating signed app bundles, configuring store assets, writing privacy policies, and addressing store review guidelines for swift approval.'
      },
      {
        question: 'Can the mobile app connect to our existing website or ERP database?',
        answer: 'Yes. We build or integrate RESTful APIs to ensure your mobile app and website/ERP share the same real-time database, inventory, and customer records.'
      }
    ],
    relatedServices: [
      { title: 'Website Development', slug: 'website-development', desc: 'Complement your mobile app with a high-speed web presence.' },
      { title: 'E-Commerce Development', slug: 'ecommerce-development', desc: 'Expand your retail reach with dedicated shopping apps.' },
      { title: 'Custom Software Development', slug: 'custom-software-development', desc: 'Custom backend engines to power your mobile applications.' }
    ]
  },

  'erp-software': {
    slug: 'erp-software',
    id: 'erp-solutions',
    title: 'ERP Software Solutions',
    metaTitle: 'ERP Software Company in Kanpur | Enterprise Solutions | Yogteck',
    metaDescription: 'Yogteck Business Solution delivers cloud ERP software in Kanpur for manufacturers, distributors, and traders. Real-time inventory, GST billing, payroll & multi-branch sync.',
    h1: 'ERP Software Development Company in Kanpur, India',
    tagline: 'Unified Enterprise Resource Planning for Manufacturing, Trading & Distribution',
    badge: 'Enterprise Grade',
    icon: 'gear',
    heroSummary: 'Break down departmental silos and gain 360-degree control over your enterprise. Yogteck Business Solution engineers robust cloud ERP software designed specifically for Indian manufacturers, wholesalers, and multi-branch trading businesses.',
    problemTitle: 'The Chaos of Disconnected Business Departments',
    problemDesc: 'When sales, inventory, production, accounts, and dispatch operate on separate spreadsheets or isolated software, management lacks real-time visibility. Stock mismatches, delayed orders, and GST reconciliation errors eat into your profits.',
    solutionTitle: 'One Centralized Cloud ERP for Total Business Control',
    solutionDesc: 'Our custom ERP software integrates purchase orders, warehouse stock, production bill of materials (BOM), GST billing, accounts, and employee payroll into a unified, secure web platform accessible from any device.',
    targetAudience: [
      { title: 'Leather & Footwear Manufacturers in Kanpur', description: 'Manage raw hide/leather procurement, cutting batches, shoe manufacturing stages, and export dispatch.' },
      { title: 'Textile & Garment Mills', description: 'Track yarn inventory, fabric processing, job work challans, dye batches, and wholesale order dispatch.' },
      { title: 'FMCG & Chemical Distributors', description: 'Batch number tracking, expiry date management, multi-tier pricing, and automated delivery beat scheduling.' },
      { title: 'Engineering & Fabrication Units', description: 'Bill of Materials (BOM), machine maintenance logs, raw metal inventory, and contractor payroll.' }
    ],
    features: [
      { title: 'Real-Time Inventory & Stock Sync', description: 'Multi-warehouse stock tracking, low-stock reorder triggers, batch tracking, and barcode scanning.', icon: 'box' },
      { title: 'Automated GST Invoicing & E-Way Bill', description: 'One-click GST tax invoices, E-Way bill generation, credit notes, and GSTR-1 export reconciliation.', icon: 'file-text' },
      { title: 'Production & BOM Management', description: 'Define multi-stage Bill of Materials, job work issue challans, wastage monitoring, and finished goods costing.', icon: 'tool' },
      { title: 'Multi-Branch & Multi-Company Support', description: 'Centralized dashboard managing distinct GST numbers, warehouses, and branch accounts seamlessly.', icon: 'globe' },
      { title: 'Purchase & Supplier Lifecycle', description: 'Vendor rate comparisons, purchase order approvals, goods receipt notes (GRN), and payment scheduling.', icon: 'shopping-bag' },
      { title: 'Payroll, Attendance & HR Module', description: 'Biometric device sync, staff shift scheduling, salary calculations, PF/ESI deductions, and payslips.', icon: 'users' }
    ],
    processSteps: [
      { step: '01', title: 'Departmental Workflow Audit', desc: 'We visit or consult with your department heads to map exact material flow and approval hierarchies.' },
      { step: '02', title: 'ERP Configuration & Customization', desc: 'Customizing database schemas, tax structures, invoice formats, and role permissions.' },
      { step: '03', title: 'Data Migration & Staff Training', desc: 'Importing opening stock, customer/supplier ledgers, and conducting hands-on staff training.' },
      { step: '04', title: 'Live Deployment & Support', desc: 'Parallel trial run, go-live milestone, and continuous on-site/remote technical assistance.' }
    ],
    benefits: [
      { title: 'Zero Inventory Leakage', desc: 'Real-time stock audits and barcode scanning prevent theft, wastage, and unbilled dispatches.' },
      { title: 'Accurate Profitability by Product', desc: 'Know the true manufacturing cost and margin on every finished batch down to the rupee.' },
      { title: 'Instant Management Decisions', desc: 'Access real-time sales, outstanding dues, and cash flow reports on your smartphone.' },
      { title: 'Faster GST Filing & Compliance', desc: 'Error-free automated accounting simplifies monthly GSTR filing and reduces audit stress.' }
    ],
    faqs: [
      {
        question: 'Is Yogteck ERP software customized for Kanpur industries like leather and textiles?',
        answer: 'Yes. We configure specialized modules for Kanpur industrial sectors including leather shoe manufacturing (raw leather, cutting, lasting, packaging) and textiles (yarn, dyeing, job work, wholesale distribution).'
      },
      {
        question: 'Can our staff access the ERP software from mobile phones or outside the office?',
        answer: 'Yes. Our ERP systems are cloud-based and responsive, secured with SSL encryption and multi-factor authentication, allowing authorized executives and field staff to access dashboards anywhere.'
      },
      {
        question: 'Can we start with basic modules and add advanced modules later?',
        answer: 'Yes. Our modular architecture allows you to begin with core inventory and billing, and later activate production BOM, multi-branch, HR payroll, or CRM modules as your operations grow.'
      }
    ],
    relatedServices: [
      { title: 'Billing & Invoicing Software', slug: 'billing-software', desc: 'Streamlined retail and wholesale GST billing software.' },
      { title: 'Custom Software Development', slug: 'custom-software-development', desc: 'Tailored enterprise portals and integrations.' },
      { title: 'Business Management Software', slug: 'business-software', desc: 'Automate sales pipelines and customer support.' }
    ]
  },

  'billing-software': {
    slug: 'billing-software',
    id: 'billing-software',
    title: 'Billing & Invoicing Software',
    metaTitle: 'GST Billing & Invoicing Software in Kanpur | Yogteck',
    metaDescription: 'Fast GST billing software, retail POS, and inventory management in Kanpur by Yogteck Business Solution. Barcode scanning, thermal printing, and WhatsApp invoice sharing.',
    h1: 'Billing & Invoicing Software Company in Kanpur, India',
    tagline: 'High-Speed GST Invoicing, Retail POS & Inventory Management',
    badge: 'Fast & Reliable',
    icon: 'file-text',
    heroSummary: 'Speed up checkout queues, track inventory automatically, and generate compliant GST tax invoices in seconds. Yogteck Business Solution delivers intuitive, high-speed billing and Point of Sale (POS) software for shops, wholesalers, and service businesses in Kanpur and across India.',
    problemTitle: 'Why Slow or Complex Billing Software Hurts Business',
    problemDesc: 'Outdated, sluggish desktop software crashes during peak rush hours, complicates GST calculation, requires expensive annual renewal contracts, and fails to send digital invoices to customers via WhatsApp or SMS.',
    solutionTitle: 'Modern, Fast Billing Software Built for Indian Businesses',
    solutionDesc: 'Our billing software is engineered for speed and simplicity. Create professional GST invoices in under 10 seconds, scan barcodes instantly, accept UPI payments, and monitor daily sales performance on your phone.',
    targetAudience: [
      { title: 'Retail Shops & Supermarkets', description: 'Rapid barcode billing, customer loyalty points, and cash drawer/thermal printer integration.' },
      { title: 'Wholesalers & Distributors in Kanpur', description: 'Wholesale pricing tiers, customer credit limit alerts, payment ledger tracking, and GST e-invoicing.' },
      { title: 'Garment & Footwear Showrooms', description: 'Size/color/style matrix billing, barcode label generation, and dead-stock identification.' },
      { title: 'Hardware, Electrical & Sanitary Stores', description: 'Multi-unit conversion (pieces, meters, boxes), serial number tracking, and warranty cards.' }
    ],
    features: [
      { title: '10-Second Quick GST Invoicing', description: 'Keyboard shortcut-driven billing with automatic CGST/SGST/IGST tax calculation.', icon: 'zap' },
      { title: 'WhatsApp & SMS Digital Receipts', description: 'Send digital invoice PDF links directly to customer WhatsApp numbers instantly.', icon: 'message-square' },
      { title: 'Barcode Scanning & Label Printing', description: 'Generate and print custom barcode stickers for unbranded inventory items.', icon: 'maximize' },
      { title: 'Thermal & Laser Printer Support', description: 'Seamless compatibility with 2-inch/3-inch thermal POS receipt printers and standard A4/A5 laser printers.', icon: 'printer' },
      { title: 'Customer Credit & Outstanding Ledger', description: 'Track Udhar/Credit balance, set credit limits, and send automated WhatsApp payment reminders.', icon: 'dollar-sign' },
      { title: 'Daily Cash & Sales Summary', description: 'Instant day-end closing reports showing cash, UPI, card, and credit collections.', icon: 'pie-chart' }
    ],
    processSteps: [
      { step: '01', title: 'Inventory Setup & Barcode Config', desc: 'Import your product price list, GST HSN codes, and configure barcode formats.' },
      { step: '02', title: 'Hardware & Printer Pairing', desc: 'Connect thermal printers, barcode scanners, and cash drawers with plug-and-play ease.' },
      { step: '03', title: 'Staff Training', desc: 'Short, 30-minute training session for billing operators and cashiers.' },
      { step: '04', title: 'Go Live & Ongoing Backups', desc: 'Start live billing with automated daily encrypted backups to the cloud.' }
    ],
    benefits: [
      { title: 'Cut Customer Wait Time by 70%', desc: 'Rapid barcode scanning and UPI QR display keep checkout counters moving fast.' },
      { title: 'Prevent Billing & Tax Mistakes', desc: 'Automated HSN code and GST calculation eliminates costly manual calculation errors.' },
      { title: 'Recover Outstanding Debts Faster', desc: 'One-click WhatsApp payment reminders help collect pending customer dues on time.' },
      { title: 'Monitor Business from Anywhere', desc: 'View live sales figures on your smartphone even when you are away from the shop.' }
    ],
    faqs: [
      {
        question: 'Does this billing software work with standard thermal receipt printers?',
        answer: 'Yes. Our software supports all standard 2-inch and 3-inch thermal POS printers (USB, Bluetooth, and LAN) as well as A4/A5 desktop laser and inkjet printers.'
      },
      {
        question: 'Can the software send invoices to customers via WhatsApp?',
        answer: 'Yes! You can send formatted invoice PDFs and payment links directly to the customer’s WhatsApp number with a single click, saving paper and enhancing customer experience.'
      },
      {
        question: 'Is the billing software compliant with latest GST guidelines?',
        answer: 'Yes. It fully complies with Indian GST rules, supports HSN/SAC codes, reverse charge, multi-tax rates, E-Way bills, and exports ready-to-file GSTR-1 and GSTR-3B summaries.'
      }
    ],
    relatedServices: [
      { title: 'ERP Software Solutions', slug: 'erp-software', desc: 'Scale from retail billing to complete multi-branch resource planning.' },
      { title: 'E-Commerce Development', slug: 'ecommerce-development', desc: 'Sell your store inventory online through an e-commerce website.' },
      { title: 'Website Development', slug: 'website-development', desc: 'Professional corporate web presence for your retail brand.' }
    ]
  },

  'ecommerce-development': {
    slug: 'ecommerce-development',
    id: 'ecommerce',
    title: 'E-Commerce Development',
    metaTitle: 'E-Commerce Website Development in Kanpur | Yogteck',
    metaDescription: 'Launch your online store with Yogteck Business Solution in Kanpur. Secure payment gateway, automated shipping, mobile-friendly design, and marketplace integration.',
    h1: 'E-Commerce Development Company in Kanpur, India',
    tagline: 'High-Converting Online Storefronts & Multi-Vendor Marketplaces',
    badge: 'High ROI Engine',
    icon: 'cart',
    heroSummary: 'Turn your offline business into a 24/7 revenue-generating online store. Yogteck Business Solution crafts high-speed, secure e-commerce platforms equipped with automated inventory synchronization, Indian payment gateways, shipping integrations, and conversion-optimized checkout flows.',
    problemTitle: 'Why Basic E-Commerce Templates Fail to Generate Sales',
    problemDesc: 'Many online stores suffer from high cart abandonment rates due to slow checkout pages, clunky mobile UX, lack of trust signals, and complex shipping calculations, resulting in high advertising spend with zero return.',
    solutionTitle: 'Engineered for High Conversion & Frictionless Buying',
    solutionDesc: 'We build custom and headless e-commerce stores with sub-second page loads, one-click UPI checkout, dynamic coupon engines, automated courier dispatch (Shiprocket/Delhivery), and real-time inventory management.',
    targetAudience: [
      { title: 'Kanpur Manufacturers & Wholesalers', description: 'Direct-to-consumer (D2C) channels for leather products, footwear, apparel, and home furnishings.' },
      { title: 'Retail Brands & Showrooms', description: 'Expand beyond local footfall to sell products across all Indian pin codes.' },
      { title: 'Health, Wellness & Organic Brands', description: 'Subscription products, doctor recommendations, and verified customer review showcases.' },
      { title: 'B2B Wholesale Portals', description: 'Tiered wholesale pricing, minimum order quantity (MOQ) enforcement, and GST invoice generation.' }
    ],
    features: [
      { title: 'Instant Indian Payment Gateways', description: 'Integration with Razorpay, Cashfree, PhonePe, Paytm, and COD with automated OTP verification.', icon: 'credit-card' },
      { title: 'Automated Logistics & Courier Sync', description: 'Real-time sync with Shiprocket, Delhivery, and BlueDart for automated AWB generation and tracking.', icon: 'truck' },
      { title: 'High-Converting One-Page Checkout', description: 'Simplified mobile-first checkout eliminating unnecessary fields to maximize completion rate.', icon: 'check-circle' },
      { title: 'Dynamic Discount & Coupon Engine', description: 'Create BOGO offers, percentage discounts, first-time buyer coupons, and cart-value tiers.', icon: 'tag' },
      { title: 'Abandoned Cart Recovery System', description: 'Automated WhatsApp and email reminders to recapture shoppers who left without completing payment.', icon: 'refresh-cw' },
      { title: 'Marketplace Integration Support', description: 'Sync inventory between your custom website and Amazon, Flipkart, and Meesho accounts.', icon: 'grid' }
    ],
    processSteps: [
      { step: '01', title: 'Catalogue & Category Architecture', desc: 'Structuring your product categories, variants (size, color), and search filter attributes.' },
      { step: '02', title: 'Storefront UI/UX Design', desc: 'Crafting modern, brand-aligned product pages, trust badges, and mobile-first shopping navigation.' },
      { step: '03', title: 'Payment & Logistics Integration', desc: 'Connecting merchant payment gateways, shipping APIs, GST invoices, and SMS/WhatsApp notifications.' },
      { step: '04', title: 'Launch & Performance Marketing', desc: 'Testing end-to-end checkout, configuring Facebook Pixel & Google Ads conversion tracking, and going live.' }
    ],
    benefits: [
      { title: 'Sell 24/7 Across All India Pin Codes', desc: 'Reach customers in Mumbai, Delhi, Bengaluru, and tier-2/3 cities without opening physical stores.' },
      { title: 'Higher Profit Margins', desc: 'Keep 100% of your product profit without paying steep 20-30% marketplace commissions.' },
      { title: 'Own Your Customer Data', desc: 'Build your direct customer email and phone list for free remarketing and repeat sales.' },
      { title: 'Flawless Mobile Shopping Experience', desc: 'Over 85% of shoppers complete purchases seamlessly on mobile smartphones.' }
    ],
    faqs: [
      {
        question: 'Which payment gateways can be integrated with our online store?',
        answer: 'We integrate all major verified Indian payment gateways including Razorpay, Cashfree, PhonePe, Paytm, CCAvenue, as well as Cash on Delivery (COD) with automated fraud verification.'
      },
      {
        question: 'How do shipping and order tracking work on the e-commerce store?',
        answer: 'We integrate courier aggregators like Shiprocket, Delhivery, or Pickrr. When an order is placed, an Airway Bill (AWB) is automatically generated, pickup is scheduled, and real-time tracking links are messaged to the customer.'
      },
      {
        question: 'Can Yogteck also help list our products on Amazon and Flipkart?',
        answer: 'Yes! We provide marketplace onboarding and catalog management services across Amazon India, Flipkart, Meesho, and Walmart alongside custom store development.'
      }
    ],
    relatedServices: [
      { title: 'SEO & Digital Growth', slug: 'seo-digital-growth', desc: 'Drive high-converting buyer traffic to your e-commerce store.' },
      { title: 'Website Development', slug: 'website-development', desc: 'Corporate websites and brand landing pages.' },
      { title: 'Mobile App Development', slug: 'mobile-app-development', desc: 'Dedicated mobile shopping apps for Android and iOS.' }
    ]
  },

  'seo-digital-growth': {
    slug: 'seo-digital-growth',
    id: 'digital-marketing',
    title: 'SEO & Digital Growth Services',
    metaTitle: 'SEO Company in Kanpur | Digital Growth Services | Yogteck',
    metaDescription: 'Yogteck Business Solution is a top SEO company in Kanpur. Local SEO, Google Business Profile ranking, technical SEO, high-ROI Google Ads, and organic business growth.',
    h1: 'SEO & Digital Growth Company in Kanpur, India',
    tagline: 'Dominate Google Search, Attract High-Intent Buyers & Scale Revenue',
    badge: 'Growth Engine',
    icon: 'target',
    heroSummary: 'Having a website is only the first step—your customers must be able to find it when searching for your services. Yogteck Business Solution delivers data-driven SEO, Google Business Profile optimization, and performance marketing to rank your business at the top of Google for valuable buyer searches.',
    problemTitle: 'Why Traditional Marketing Fails in the Digital Age',
    problemDesc: 'Pamphlets, billboards, and generic advertising are expensive and untargeted. Meanwhile, hundreds of high-intent buyers in Kanpur and across India are actively searching for your exact products on Google every single day—and finding your competitors instead.',
    solutionTitle: 'Ethical, High-Impact Search Engine Optimization (SEO)',
    solutionDesc: 'We implement comprehensive Local SEO, Technical SEO, Entity SEO, and content authority strategies that build enduring search visibility and generate qualified inbound phone calls, WhatsApp inquiries, and quotation requests.',
    targetAudience: [
      { title: 'Kanpur Local Businesses & Service Providers', description: 'Rank in the top 3 on Google Maps (Local Pack) and capture local Kanpur customers.' },
      { title: 'Manufacturers & B2B Exporters', description: 'Capture high-ticket national and international wholesale inquiries on Google search.' },
      { title: 'Healthcare Clinics & Hospitals', description: 'Attract local patients searching for specialized treatments, doctors, and diagnostics in Kanpur/Lucknow.' },
      { title: 'E-Commerce Brands & D2C Startups', description: 'Drive high-volume organic search traffic to product category and detail pages.' }
    ],
    features: [
      { title: 'Local SEO & Google Business Profile Optimization', description: 'Targeted local map ranking, NAP consistency, citation building, and review strategy for Kanpur & regional markets.', icon: 'map-pin' },
      { title: 'Technical SEO & Core Web Vitals', description: 'Fix crawl errors, site architecture, canonicalization, mobile usability, and speed optimization.', icon: 'sliders' },
      { title: 'Entity SEO & AI Search Optimization (GEO/AEO)', description: 'Structure your brand knowledge graph so AI models (ChatGPT, Gemini, Perplexity) recognize your entity.', icon: 'cpu' },
      { title: 'High-Intent Keyword Targeting', description: 'In-depth keyword research focusing on commercial and transactional search queries that deliver real buyers.', icon: 'key' },
      { title: 'On-Page Content Optimization', description: 'Strategic heading hierarchy, semantic keyword integration, meta tags, and internal link architecture.', icon: 'file-text' },
      { title: 'ROI-Driven Google & Meta Ads Management', description: 'Targeted PPC search ads, display banners, and social media lead generation funnels.', icon: 'trending-up' }
    ],
    processSteps: [
      { step: '01', title: 'Comprehensive SEO & Competitor Audit', desc: 'Analyzing current rankings, technical health, backlink profile, and competitor keyword gaps.' },
      { step: '02', title: 'On-Page & Technical Fixes', desc: 'Implementing schema markup, fixing meta titles, optimizing image alt tags, and accelerating page speed.' },
      { step: '03', title: 'Local Map & Entity Authority Building', desc: 'Optimizing Google Business Profile, local directory citations, and brand entity references.' },
      { step: '04', title: 'Monthly Tracking & Transparent Reporting', desc: 'Tracking keyword rank movements, organic click growth, and genuine inquiry volume.' }
    ],
    benefits: [
      { title: 'Predictable Inbound Customer Leads', desc: 'Receive calls and messages from customers who are actively searching to buy your service right now.' },
      { title: 'Long-Term Compounding ROI', desc: 'Unlike paid ads that stop the moment budget runs out, organic SEO rankings provide continuous free traffic.' },
      { title: 'Unshakable Brand Authority', desc: 'Ranking on page 1 of Google establishes instant trust and credibility with potential clients.' },
      { title: 'Targeted Regional or National Reach', desc: 'Focus specifically on Kanpur, expand to Lucknow & Raebareli, or scale across all of India.' }
    ],
    faqs: [
      {
        question: 'How long does it take to see SEO results in Kanpur?',
        answer: 'Local SEO improvements (Google Business Profile and local keywords) typically show measurable traffic and ranking gains within 4 to 8 weeks. Highly competitive state-level and national organic rankings usually take 3 to 6 months of consistent optimization.'
      },
      {
        question: 'Do you use safe, white-hat SEO techniques?',
        answer: 'Yes, 100%. We strictly follow Google Search Essentials and Webmaster guidelines. We never use spammy backlinks, automated link farms, or hidden keyword stuffing that could risk search penalties.'
      },
      {
        question: 'How do you help our business appear in AI search engines like ChatGPT and Gemini?',
        answer: 'We implement Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). By building clean structured data, consistent NAP signals, verified citations, and concise factual Q&A content, AI systems easily identify and reference your business entity.'
      }
    ],
    relatedServices: [
      { title: 'Website Development', slug: 'website-development', desc: 'Modern SEO-ready websites that rank higher on search engines.' },
      { title: 'E-Commerce Development', slug: 'ecommerce-development', desc: 'Drive organic shoppers to your online product catalogue.' },
      { title: 'Business Management Software', slug: 'business-software', desc: 'Capture and manage all incoming leads in an automated CRM.' }
    ]
  },

  'business-software': {
    slug: 'business-software',
    id: 'sales-service',
    title: 'Business Management Software & CRM',
    metaTitle: 'Business Management Software & CRM in Kanpur | Yogteck',
    metaDescription: 'Automate sales pipelines, customer support, field operations, and lead management in Kanpur with custom business management software by Yogteck Business Solution.',
    h1: 'Business Management Software & CRM Company in Kanpur, India',
    tagline: 'Automated CRM, Sales Pipelines, Field Service & Operations Management',
    badge: 'Operations Scale',
    icon: 'headset',
    heroSummary: 'Never lose another sales lead or customer inquiry. Yogteck Business Solution develops intuitive business management software, sales CRM, field force automation, and customer ticketing systems tailored to streamline team workflows and accelerate revenue growth.',
    problemTitle: 'Why Leads Get Lost and Teams Miss Targets',
    problemDesc: 'When sales inquiries arrive from WhatsApp, website forms, phone calls, and IndiaMART into separate personal phones without a centralized system, follow-ups are forgotten, customer history is lost, and revenue slips through the cracks.',
    solutionTitle: 'Centralized Lead Tracking & Operational Automation',
    solutionDesc: 'Our business management platforms capture every inquiry automatically, assign them to the right executive, send automated follow-up reminders, and give management real-time sales pipeline visibility.',
    targetAudience: [
      { title: 'B2B Sales Teams & Agencies', description: 'Track deal stages, quotation statuses, client interactions, and sales team target achievement.' },
      { title: 'Real Estate & Construction Developers', description: 'Manage site visit bookings, property inventory, investor payment schedules, and agent commissions.' },
      { title: 'Service & Maintenance Providers', description: 'Customer AMC contracts, maintenance ticket dispatch, field technician GPS tracking, and feedback.' },
      { title: 'Education & Training Institutes', description: 'Student admission inquiries, course counseling follow-ups, fee installments, and batch scheduling.' }
    ],
    features: [
      { title: 'Omnichannel Lead Capture', description: 'Automatically import leads from website forms, WhatsApp, Facebook Ads, Google Ads, and IndiaMART.', icon: 'inbox' },
      { title: 'Automated Sales Pipeline & Stages', description: 'Visual Kanban board tracking leads from initial contact to quotation, negotiation, and closed deal.', icon: 'trello' },
      { title: 'WhatsApp & SMS Follow-Up Automation', description: 'Send automated greeting messages, product brochures, and meeting reminders to clients.', icon: 'send' },
      { title: 'Customer Support Ticketing & Helpdesk', description: 'Centralized support inbox with ticket assignment, priority levels, and SLA resolution timers.', icon: 'help-circle' },
      { title: 'Field Staff GPS Tracking & Attendance', description: 'Mobile check-in at client locations, route logging, and real-time task status updates.', icon: 'navigation' },
      { title: 'Executive Analytics & Performance Reports', description: 'Individual sales rep conversion rates, lead source ROI, and revenue forecast graphs.', icon: 'trending-up' }
    ],
    processSteps: [
      { step: '01', title: 'Sales Process Mapping', desc: 'Understanding your existing lead lifecycle, sales stages, and team delegation workflows.' },
      { step: '02', title: 'System Configuration & Integration', desc: 'Connecting lead sources, configuring WhatsApp automation APIs, and customizing stage tags.' },
      { step: '03', title: 'Team Onboarding & Role Setup', desc: 'Setting up sales reps, team managers, and administrator access roles with live training.' },
      { step: '04', title: 'Continuous Optimization', desc: 'Refining follow-up funnels and conversion analytics to maximize closing rates.' }
    ],
    benefits: [
      { title: 'Zero Lost Inquiries', desc: 'Every single phone call, WhatsApp, and form inquiry is logged and assigned with zero leakage.' },
      { title: '40% Faster Deal Closures', desc: 'Automated follow-up reminders ensure your sales team responds while the lead is hot.' },
      { title: 'Complete Team Accountability', desc: 'Management can review daily calls made, meetings held, and quotes sent by every team member.' },
      { title: 'Enhanced Customer Satisfaction', desc: 'Prompt support ticketing and automated status updates build lasting client loyalty.' }
    ],
    faqs: [
      {
        question: 'Can this software automatically capture leads from WhatsApp and IndiaMART?',
        answer: 'Yes. We connect webhooks and APIs to capture leads directly from WhatsApp Business, IndiaMART, TradeIndia, Facebook Ads, and your website into one unified dashboard.'
      },
      {
        question: 'Is it easy for non-technical sales staff to use?',
        answer: 'Yes. The interface is designed to be clean, intuitive, and mobile-friendly with simple drag-and-drop Kanban boards, minimal data entry requirements, and Hindi/English support.'
      },
      {
        question: 'Can we integrate this CRM with our existing billing or ERP system?',
        answer: 'Yes. Our software can be integrated with your existing billing software or custom ERP to automatically convert won deals into invoices and customer master records.'
      }
    ],
    relatedServices: [
      { title: 'Custom Software Development', slug: 'custom-software-development', desc: 'Bespoke operational software and backend automation.' },
      { title: 'ERP Software Solutions', slug: 'erp-software', desc: 'Complete enterprise resource planning for multi-department organizations.' },
      { title: 'SEO & Digital Growth', slug: 'seo-digital-growth', desc: 'Generate more qualified inbound leads for your sales pipeline.' }
    ]
  }
};

export const LOCATIONS_SEO_DATA: Record<string, LocationDetailData> = {
  'kanpur': {
    city: 'Kanpur',
    slug: 'it-software-company-kanpur',
    metaTitle: 'IT & Software Company in Kanpur | Yogteck Business Solution',
    metaDescription: 'Yogteck Business Solution is a leading IT & software company in Kanpur. We deliver website development, custom software, ERP, billing software & digital growth solutions.',
    h1: 'Top IT & Software Company in Kanpur, Uttar Pradesh',
    tagline: 'Empowering Kanpur Businesses with Modern Software, Websites & Digital Technology',
    heroIntro: 'Yogteck Business Solution is an established IT, software, and business technology company headquartered in Kanpur, Uttar Pradesh. We empower local manufacturers, wholesale distributors, retail showrooms, educational institutes, and startups with high-performance digital solutions built to drive measurable revenue.',
    entityStatement: 'Yogteck Business Solution is an IT and software company based in Kanpur, Uttar Pradesh (Registered Office: 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, UP 208015). We provide website development, custom software development, mobile applications, ERP, billing/business software, e-commerce, and digital growth solutions for businesses in Kanpur and across India.',
    cityOverview: 'Kanpur is the premier industrial and commercial engine of Uttar Pradesh, renowned for its vibrant leather manufacturing, footwear exports, textile processing, chemical formulation, FMCG distribution, and wholesale trade. To compete effectively in today’s digital-first economy, Kanpur enterprises need robust technology partners who understand both the local business ecosystem and modern engineering standards.',
    businessChallenges: [
      { title: 'Manual Paperwork & Disconnected Operations', desc: 'Many Kanpur manufacturing and trading units rely on manual ledgers and standalone spreadsheets, leading to stock discrepancies, delayed dispatches, and GST compliance bottlenecks.' },
      { title: 'Lack of Authoritative Online Presence', desc: 'Established offline businesses with decades of goodwill often have outdated or non-existent websites, losing lucrative national and export buyers to modern competitors.' },
      { title: 'Retail Inefficiencies & Slow Checkout', desc: 'Retail shops in bustling Kanpur commercial centers (Naveen Market, Gumti No. 5, P-Road, Sisamau) face customer queues without high-speed barcode billing and WhatsApp invoice sharing.' },
      { title: 'Low Search Visibility for Local Buyers', desc: 'Businesses miss out on hundreds of daily local searches on Google Maps and search queries from buyers in Kanpur Nagar and surrounding districts.' }
    ],
    keyServices: [
      { title: 'Website Development in Kanpur', slug: 'website-development', desc: 'Fast, mobile-first corporate websites and product catalog portals.' },
      { title: 'Custom Software Development', slug: 'custom-software-development', desc: 'Tailored workflow automation, client portals, and cloud databases.' },
      { title: 'ERP Software for Kanpur Industries', slug: 'erp-software', desc: 'Specialized inventory, production BOM, and multi-branch management.' },
      { title: 'GST Billing & POS Software', slug: 'billing-software', desc: 'High-speed 10-second GST billing, barcode generation, and thermal receipt printing.' },
      { title: 'E-Commerce Website Development', slug: 'ecommerce-development', desc: 'Direct-to-consumer online stores with Indian payment gateways & automated shipping.' },
      { title: 'Local SEO & Digital Growth', slug: 'seo-digital-growth', desc: 'Rank #1 on Google Maps and local search for valuable Kanpur business queries.' }
    ],
    industriesServed: [
      { industry: 'Leather & Footwear Manufacturing', desc: 'Raw hide procurement, batch cutting, lasting, packaging, and export shipment documentation.' },
      { industry: 'Textiles, Hosiery & Garments', desc: 'Yarn tracking, job work dyeing challans, wholesale distribution, and multi-size billing.' },
      { industry: 'FMCG, Spices & Wholesale Trading', desc: 'Batch expiry monitoring, distributor beat billing, credit ledgers, and fast order dispatch.' },
      { industry: 'Healthcare, Hospitals & Diagnostics', desc: 'Patient management, doctor appointments, digital test report delivery via WhatsApp.' },
      { industry: 'Education & Coaching Institutes', desc: 'Student enrollment CRM, fee installment management, online test portals, and parent SMS alerts.' },
      { industry: 'Real Estate & Infrastructure Developers', desc: 'Project walkthrough portals, investor CRM, floor plan downloads, and booking lead tracking.' }
    ],
    whyYogteckForCity: [
      { title: 'Local Presence & Rapid On-Site Support in Kanpur', desc: 'Our office is located at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar. We provide hands-on staff training, quick in-person consultations, and reliable on-demand support.' },
      { title: 'Deep Understanding of Kanpur Commercial Needs', desc: 'We engineer solutions tailored to the practical realities of Kanpur trading hubs, wholesale credit cycles, and manufacturing workflows.' },
      { title: 'Honest & Transparent Pricing', desc: 'No hidden fees, no unnecessary bloat. Competitive pricing structured specifically for growing MSMEs, startups, and established enterprises.' },
      { title: 'Complete End-to-End Digital Partner', desc: 'From your domain, hosting, custom website, and ERP software to local SEO and marketplace scale, we manage your complete digital growth.' }
    ],
    faqs: [
      {
        question: 'What IT and software services does Yogteck Business Solution provide in Kanpur?',
        answer: 'Yogteck Business Solution provides website development, custom software engineering, cloud ERP software, GST billing and POS solutions, mobile app development, e-commerce storefronts, local SEO, and digital growth consulting for businesses across Kanpur.'
      },
      {
        question: 'Where is Yogteck Business Solution located in Kanpur?',
        answer: 'Our registered office is located at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, Uttar Pradesh, 208015. You can contact us directly at +91 8299209905 or email yogteck@gmail.com.'
      },
      {
        question: 'Does Yogteck provide on-site software installation and staff training in Kanpur?',
        answer: 'Yes. For businesses in Kanpur Nagar, our technical team provides on-site software setup, hardware pairing (thermal printers, barcode scanners), and comprehensive staff training.'
      },
      {
        question: 'How can our Kanpur business get started with Yogteck?',
        answer: 'You can request a free consultation through our website form, call us directly at +91 8299209905, or message us on WhatsApp to schedule an initial discovery session.'
      }
    ]
  },

  'lucknow': {
    city: 'Lucknow',
    slug: 'it-software-company-lucknow',
    metaTitle: 'IT & Software Company Serving Lucknow | Yogteck Business Solution',
    metaDescription: 'Yogteck Business Solution delivers modern IT, web development, custom software, ERP & digital growth solutions for enterprises and startups in Lucknow, UP.',
    h1: 'IT & Software Development Services for Lucknow, Uttar Pradesh',
    tagline: 'Modern Web, Enterprise Software & Digital Growth for Lucknow Businesses',
    heroIntro: 'As the administrative capital and a rapidly expanding technological and commercial epicenter of Uttar Pradesh, Lucknow is home to ambitious enterprises, healthcare chains, retail conglomerates, and emerging tech startups. Yogteck Business Solution delivers world-class website development, custom cloud software, ERP systems, and digital growth solutions engineered to fuel Lucknow’s business expansion.',
    entityStatement: 'Yogteck Business Solution is a leading IT and business software company based in Uttar Pradesh, providing specialized software engineering, web development, ERP, billing systems, and digital growth consulting for businesses in Lucknow and across India.',
    cityOverview: 'Lucknow’s commercial landscape encompasses vibrant retail corridors (Hazratganj, Gomti Nagar, Aminabad, Alambagh), expansive medical hubs, educational institutions, real estate developments, and government-aligned corporate enterprises. Modern Lucknow organizations require secure, cloud-enabled software and high-converting web portals to engage consumers and streamline multi-branch operations.',
    businessChallenges: [
      { title: 'Scaling Multi-Branch Operations Across Lucknow', desc: 'Growing businesses with branches in Gomti Nagar, Hazratganj, and Alambagh struggle to synchronize inventory, billing, and staff attendance in real time.' },
      { title: 'High Competition in Healthcare, Education & Real Estate', desc: 'Distinguishing your brand in Lucknow’s competitive landscape requires fast, mobile-first web portals and top Google search rankings.' },
      { title: 'Demand for Frictionless Digital Customer Experience', desc: 'Modern Lucknow consumers demand instant online booking, seamless UPI payments, digital invoices, and responsive WhatsApp communication.' }
    ],
    keyServices: [
      { title: 'Enterprise Web Development in Lucknow', slug: 'website-development', desc: 'High-speed corporate portals, landing pages, and web applications.' },
      { title: 'Custom Cloud Software & SaaS', slug: 'custom-software-development', desc: 'Bespoke portals, operational software, and automated business workflows.' },
      { title: 'Multi-Branch ERP & Inventory Systems', slug: 'erp-software', desc: 'Unified accounting, warehouse stock sync, and role-based branch controls.' },
      { title: 'Retail POS & Billing Software', slug: 'billing-software', desc: 'High-speed GST billing, barcode scanning, and WhatsApp digital receipts.' },
      { title: 'E-Commerce Store Development', slug: 'ecommerce-development', desc: 'Sell retail products pan-India with automated payment and courier integrations.' },
      { title: 'SEO & Performance Marketing for Lucknow', slug: 'seo-digital-growth', desc: 'Capture high-intent customer inquiries across Lucknow and Uttar Pradesh.' }
    ],
    industriesServed: [
      { industry: 'Healthcare, Hospitals & Super-Specialty Clinics', desc: 'Patient management portals, OPD booking, and automated lab report delivery via WhatsApp.' },
      { industry: 'Real Estate & Infrastructure Developers', desc: 'Interactive property portals, investor lead management, and 3D project showcase.' },
      { industry: 'Education, Universities & Coaching Hubs', desc: 'Student CRM, online fee installment portals, admission counseling, and examination modules.' },
      { industry: 'Retail Showrooms & D2C Brands', desc: 'Chikankari, fashion, jewelry, and lifestyle e-commerce stores with pan-India courier sync.' },
      { industry: 'Hospitality, Restaurants & Event Venues', desc: 'Online table reservation systems, banquet booking CRM, and digital feedback funnels.' }
    ],
    whyYogteckForCity: [
      { title: 'Regional Proximity & Dedicated Account Management', desc: 'Located nearby in Uttar Pradesh, our technical leadership provides rapid remote and on-site support for Lucknow clients.' },
      { title: 'Modern Cloud Architecture & Enterprise Security', desc: 'Zero-lag cloud infrastructure, end-to-end data encryption, and 99.9% uptime reliability.' },
      { title: 'Proven Track Record Across Diverse Sectors', desc: 'Delivering results for real estate leaders, healthcare platforms, and commercial distributors across UP.' }
    ],
    faqs: [
      {
        question: 'Does Yogteck Business Solution serve clients in Lucknow, Uttar Pradesh?',
        answer: 'Yes. Yogteck Business Solution actively serves enterprises, healthcare providers, retailers, real estate developers, and startups across Lucknow, providing full-service web, software, ERP, and SEO solutions.'
      },
      {
        question: 'Can Yogteck develop custom software for multi-branch businesses in Lucknow?',
        answer: 'Yes. We specialize in building cloud-native software and ERP systems with real-time multi-branch synchronization, centralized databases, and role-based permissions.'
      },
      {
        question: 'How do we consult with Yogteck for our Lucknow business project?',
        answer: 'You can submit an inquiry through our website, call +91 8299209905, or connect via WhatsApp to schedule an online demo or arrange an in-person meeting.'
      }
    ]
  },

  'raebareli': {
    city: 'Raebareli',
    slug: 'it-software-company-raebareli',
    metaTitle: 'IT & Software Company Serving Raebareli | Yogteck Business Solution',
    metaDescription: 'Yogteck Business Solution provides custom software, website development, ERP, GST billing software & digital marketing for businesses in Raebareli, UP.',
    h1: 'IT, Software & Web Development Services for Raebareli, UP',
    tagline: 'Empowering Raebareli Manufacturing, Trading & Industrial Businesses with Technology',
    heroIntro: 'Raebareli is an important industrial, manufacturing, and regional commerce hub in Uttar Pradesh, home to the Modern Coach Factory, major industrial units, agricultural distribution, and growing retail markets. Yogteck Business Solution delivers specialized software engineering, industrial ERP systems, GST billing software, and custom websites engineered to modernize Raebareli businesses.',
    entityStatement: 'Yogteck Business Solution is a trusted IT and software development partner serving manufacturing units, industrial suppliers, wholesalers, and retail businesses in Raebareli, Uttar Pradesh, and across India.',
    cityOverview: 'From industrial manufacturing ancillary units and railway coach engineering suppliers to wholesale grain/fertilizer traders and retail commercial markets, Raebareli businesses are rapidly embracing digital automation. Yogteck Business Solution bridges the gap with enterprise-grade technology and affordable, dependable support.',
    businessChallenges: [
      { title: 'Industrial Supply Chain & Dispatch Tracking', desc: 'Manufacturing ancillaries need real-time tracking of raw material stock, production stages, quality inspection, and dispatch challans.' },
      { title: 'Transition from Offline to National B2B Markets', desc: 'Raebareli producers need professional websites and digital catalogs to win contracts from national buyers and government tenders.' },
      { title: 'Fast Counter Billing for Retail & Wholesale Hubs', desc: 'Retailers in Raebareli markets require easy-to-use billing software that simplifies GST compliance without technical complexity.' }
    ],
    keyServices: [
      { title: 'Industrial ERP & Manufacturing Software', slug: 'erp-software', desc: 'Production BOM, stock tracking, job work issue, and GST e-invoicing.' },
      { title: 'GST Billing & POS Software for Raebareli', slug: 'billing-software', desc: 'Fast retail & wholesale billing with barcode scanning and WhatsApp receipts.' },
      { title: 'Custom Web Development', slug: 'website-development', desc: 'Corporate websites, industrial product catalogs, and quotation request portals.' },
      { title: 'Custom Software & Client Portals', slug: 'custom-software-development', desc: 'Automate business workflows, order processing, and supplier coordination.' },
      { title: 'E-Commerce Development', slug: 'ecommerce-development', desc: 'Sell local agricultural, industrial, and consumer goods across India.' },
      { title: 'Local SEO & Digital Visibility', slug: 'seo-digital-growth', desc: 'Reach buyers searching for manufacturers and suppliers in Raebareli and UP.' }
    ],
    industriesServed: [
      { industry: 'Industrial & Railway Engineering Ancillaries', desc: 'Component batch tracking, job work challans, quality reports, and dispatch logs.' },
      { industry: 'Agricultural Equipment & Fertilizer Trade', desc: 'Batch number tracking, subsidy management, seasonal pricing, and farmer credit ledgers.' },
      { industry: 'Retail Showrooms & Hardware Stores', desc: 'Multi-unit conversion billing, barcode generation, thermal printing, and WhatsApp receipts.' },
      { industry: 'Schools, Colleges & Technical Institutes', desc: 'Student database, fee installment tracking, online admissions, and staff attendance.' }
    ],
    whyYogteckForCity: [
      { title: 'Proximity & Reliable Regional Support', desc: 'Located within easy reach in Kanpur, we provide dependable remote support and scheduled on-site visits for Raebareli enterprises.' },
      { title: 'Practical, MSME-Friendly Software', desc: 'Simple, robust software interfaces designed for operational staff without complicated technical jargon.' },
      { title: 'Transparent Pricing with High ROI', desc: 'Affordable one-time or structured packages that eliminate expensive recurring IT costs.' }
    ],
    faqs: [
      {
        question: 'Does Yogteck Business Solution provide software and website development in Raebareli?',
        answer: 'Yes. Yogteck Business Solution actively serves businesses, manufacturing ancillaries, wholesalers, and retail stores in Raebareli, Uttar Pradesh.'
      },
      {
        question: 'Can you provide GST billing software for shops in Raebareli?',
        answer: 'Yes. Our billing software works with standard thermal printers, barcode scanners, and computers, providing 10-second GST invoicing and instant WhatsApp receipts.'
      },
      {
        question: 'How can a Raebareli business connect with Yogteck?',
        answer: 'Call us directly at +91 8299209905, message our WhatsApp support, or submit an inquiry through our website for a free consultation.'
      }
    ]
  }
};
