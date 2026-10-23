export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductDetailData {
  slug: string;
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  badge: string;
  icon: string;
  heroAnswer: string;
  whatItDoes: string;
  whoItIsFor: {
    title: string;
    description: string;
  }[];
  keyFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
  plansPricing: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  }[];
  faqs: FaqItem[];
  relatedProducts: {
    title: string;
    slug: string;
    desc: string;
  }[];
}

export interface ClientCaseStudyData {
  id: string;
  clientId: string;
  companyName: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  industry: string;
  accentColor: string;
  summary: string;
  clientOverview: string;
  challengeSolved: string;
  solutionDelivered: string;
  verifiedMetrics: string[];
  ownerPlaceholders: string[];
  tags: string[];
  faqs: FaqItem[];
}

export interface CityHubData {
  city: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  isHeadquarters: boolean;
  isIndexable: boolean;
  needsOwnerContent: boolean;
  heroAnswer: string;
  cityContext: string;
  localIndustries: {
    industry: string;
    description: string;
  }[];
  faqs: FaqItem[];
}

export const PRODUCTS_SEO_DATA: Record<string, ProductDetailData> = {
  'erp-software': {
    slug: 'erp-software',
    id: 'prod-erp',
    title: 'ERP Software',
    metaTitle: 'ERP Software | YogTeck Business Solution',
    metaDescription: 'YogTeck Cloud ERP unifies inventory management, multi-warehouse stock, GST e-invoicing, production BOM, and staff payroll into one secure real-time web platform.',
    h1: 'Cloud ERP Software Platform',
    tagline: 'Centralized Business Operations for Manufacturing, Wholesale & Multi-Branch Trade',
    badge: 'Enterprise Platform',
    icon: 'gear',
    heroAnswer: 'YogTeck Cloud ERP is an integrated enterprise resource planning platform engineered for manufacturers, wholesale distributors, and multi-branch enterprises in Kanpur and across India. It consolidates real-time inventory tracking, multi-warehouse stock allocation, production Bill of Materials (BOM), automated GST e-invoicing, and staff payroll into a unified, secure cloud dashboard.',
    whatItDoes: 'YogTeck Cloud ERP replaces scattered spreadsheets and disjointed software with a single source of operational truth. It tracks goods from raw material procurement to multi-stage manufacturing, monitors warehouse inventory levels with barcode accuracy, automates GST tax invoices and E-Way bills, and gives business owners live financial visibility on any device.',
    whoItIsFor: [
      { title: 'Manufacturers & Industrial Processors', description: 'Leather footwear, garment mills, engineering ancillaries, and chemical compounding units requiring multi-stage Bill of Materials (BOM) costing and batch tracking.' },
      { title: 'Wholesale Distributors & Stockists', description: 'FMCG, hardware, and pharmaceutical distributors managing multi-warehouse stock, credit limits, distributor pricing tiers, and delivery beats.' },
      { title: 'Multi-Branch Retail & Trading Enterprises', description: 'Enterprises operating multiple storefronts or sales offices needing centralized inventory allocation, inter-branch stock transfers, and consolidated accounting.' }
    ],
    keyFeatures: [
      { title: 'Multi-Warehouse Inventory Control', description: 'Real-time stock valuation across physical warehouses with automatic low-stock reorder alerts and barcode tracking.', icon: 'box' },
      { title: 'Production & Bill of Materials (BOM)', description: 'Multi-level assembly definition, job work challans, raw material consumption tracking, and finished goods unit costing.', icon: 'tool' },
      { title: 'GST Invoicing & E-Way Bill Engine', description: 'One-click compliant GST tax invoicing, automatic HSN tax rate resolution, E-Way bill generation, and GSTR export data.', icon: 'file-text' },
      { title: 'Vendor Procurement & Purchase Orders', description: 'Supplier quotation comparison, purchase approval hierarchies, Goods Receipt Notes (GRN), and payment schedules.', icon: 'shopping-bag' },
      { title: 'Integrated HR & Staff Payroll', description: 'Biometric machine integration, employee attendance tracking, salary slip computation, and PF/ESI compliance deduction registers.', icon: 'users' },
      { title: 'Role-Based Cloud Security', description: 'Granular permissions restricting branch managers, billing operators, and accountants to only their authorized data.', icon: 'shield' }
    ],
    plansPricing: [
      {
        name: 'Starter Cloud ERP',
        price: '[OWNER: real price]',
        period: '/month or annual deployment',
        description: 'Designed for single-location trading and small manufacturing units needing core stock and GST billing automation.',
        features: ['Up to 5 User Accounts', 'Core Inventory & Warehouse Sync', 'GST Invoicing & E-Way Bills', 'Customer & Supplier Ledgers', 'Standard Cloud Backups', 'Email & WhatsApp Support']
      },
      {
        name: 'Growth Enterprise ERP',
        price: '[OWNER: real price]',
        period: '/month or one-time license',
        description: 'Engineered for multi-branch distributors and growing factories requiring production BOM and multi-location tracking.',
        features: ['Up to 25 User Accounts', 'Multi-Warehouse & Multi-Branch Support', 'Complete Production BOM & Job Work', 'Biometric HR & Payroll Module', 'Advanced Financial Analytics', 'Priority SLA Phone Support'],
        highlighted: true
      },
      {
        name: 'Custom Enterprise / White-Label',
        price: '[OWNER: real price]',
        period: 'custom quote',
        description: 'Tailored for large manufacturers, brand conglomerates, and software partners needing custom workflows or private white-label hosting.',
        features: ['Unlimited User Access', 'Dedicated Private Cloud Server', 'Custom ERP Module Engineering', 'Full REST API & Webhook Access', 'On-Site Staff Training in Kanpur', 'Dedicated Technical Account Manager']
      }
    ],
    faqs: [
      { question: 'What is the implementation timeline for YogTeck Cloud ERP?', answer: 'A standard deployment with inventory setup and staff onboarding typically takes 2 to 4 weeks. Complex enterprise deployments with custom manufacturing workflows or legacy data migration take 4 to 8 weeks.' },
      { question: 'Can our existing Tally or Excel stock data be migrated into YogTeck ERP?', answer: 'Yes. Our technical engineers perform complete data sanitization and import opening inventory, customer/vendor ledgers, and historical master data with zero operational disruption.' },
      { question: 'Can staff access YogTeck Cloud ERP from smartphones?', answer: 'Yes. The web interface is fully responsive, secured by HTTPS SSL encryption and multi-factor authentication, allowing executives and field sales representatives to check stock and sales from mobile browsers.' },
      { question: 'Does YogTeck provide ongoing software maintenance and updates?', answer: 'Yes. We offer structured Annual Maintenance Contracts (AMC) that include continuous security updates, cloud backups, GST regulatory compliance revisions, and dedicated technical helpdesk support.' }
    ],
    relatedProducts: [
      { title: 'Billing Software', slug: 'billing-software', desc: 'Counter-level high-speed POS and GST billing software.' },
      { title: 'SaaS Platform', slug: 'saas-platform', desc: 'Deploy cloud software or run your own white-label software.' },
      { title: 'WhatsApp Marketing Tool', slug: 'whatsapp-marketing-tool', desc: 'Automate WhatsApp customer follow-ups and invoice receipts.' }
    ]
  },

  'saas-platform': {
    slug: 'saas-platform',
    id: 'prod-saas',
    title: 'SaaS Platform',
    metaTitle: 'SaaS Platform | YogTeck Business Solution',
    metaDescription: 'YogTeck delivers multi-tenant SaaS platforms and white-label business software solutions with custom domains, role permissions, and recurring billing engines.',
    h1: 'Multi-Tenant SaaS Platform & White-Label Solutions',
    tagline: 'Modern Cloud Software Architecture for Service Providers, Resellers & Startups',
    badge: 'Cloud Scalability',
    icon: 'cloud',
    heroAnswer: 'YogTeck SaaS Platform provides secure, multi-tenant cloud software solutions that businesses can either consume as a ready-to-run managed subscription service or license and deploy as their own branded white-label business software. We eliminate the multi-million rupee cost of building enterprise SaaS infrastructure from scratch.',
    whatItDoes: 'The YogTeck SaaS architecture is built from the ground up for multi-tenancy: each tenant organization enjoys complete database data isolation, custom branding (logo, theme, custom domain name), role-based permissions, automated subscription billing, and real-time operational analytics.',
    whoItIsFor: [
      { title: 'Software Resellers & IT Agencies', description: 'Offer ready-built business management, CRM, and billing software to your client base under your own private brand and domain.' },
      { title: 'Industry Vertical Startups', description: 'Launch a specialized niche software platform (healthcare, logistics, salon, education) using a tested, secure cloud architecture.' },
      { title: 'Franchise & Enterprise Networks', description: 'Deploy standardized operational software across 10 to 500+ franchise locations with centralized master management and localized reporting.' }
    ],
    keyFeatures: [
      { title: 'Isolated Multi-Tenant Architecture', description: 'Strict tenant data separation ensuring enterprise-grade data privacy, security, and compliance.', icon: 'shield' },
      { title: '100% White-Label Customization', description: 'Map your own custom domain (e.g. app.yourcompany.com), custom brand logos, color themes, and personalized system emails.', icon: 'palette' },
      { title: 'Automated Subscription & Billing Engine', description: 'Automated recurring invoice generation, payment gateway webhooks, grace periods, and automated tenant account provisioning.', icon: 'credit-card' },
      { title: 'Comprehensive Admin Master Dashboard', description: 'Track all active tenants, monthly recurring revenue (MRR), user usage metrics, and subscription renewal statuses from one central portal.', icon: 'bar-chart' },
      { title: 'High-Speed RESTful API & Webhooks', description: 'Expose secure endpoints for third-party integrations, mobile application synchronization, and external CRM connectivity.', icon: 'code' },
      { title: 'Elastic Cloud Scalability', description: 'Built with microservices ready to scale seamlessly from 100 users to over 100,000 active concurrent users with zero downtime.', icon: 'cpu' }
    ],
    plansPricing: [
      {
        name: 'Managed Cloud Tenant',
        price: '[OWNER: real price]',
        period: '/month',
        description: 'For single businesses looking to utilize our SaaS suite as an out-of-the-box, fully managed cloud business solution.',
        features: ['Dedicated Tenant Database', 'Standard YogTeck Cloud Suite', 'Automated Daily Backups', 'SSL Encryption & CDN Speed', 'Standard Email Support']
      },
      {
        name: 'White-Label Partner License',
        price: '[OWNER: real price]',
        period: '/month or annual contract',
        description: 'For agencies and software vendors looking to resell the platform under their private label to multiple client accounts.',
        features: ['Custom Domain & Full White-Label', 'Manage up to 50 Client Accounts', 'Custom Branding & Logo Injection', 'Integrated Merchant Payment Gateway', 'Priority Technical Account Manager'],
        highlighted: true
      },
      {
        name: 'Enterprise Dedicated Deployment',
        price: '[OWNER: real price]',
        period: 'custom quote',
        description: 'For enterprises and franchise networks requiring dedicated AWS/Google Cloud server isolation and custom feature development.',
        features: ['Unlimited Tenant Accounts', 'Full Dedicated Cloud Infrastructure', 'Custom Core Module Development', 'Complete Source Code Escrow Option', '24/7 SLA Guarantee & Dedicated Engineer']
      }
    ],
    faqs: [
      { question: 'What is the difference between using YogTeck SaaS as a service versus white-labeling?', answer: 'Using it as a service means your team logs into YogTeck cloud software to run your internal operations. White-labeling allows you to rebrand the entire platform with your own name, logo, and domain to sell subscriptions directly to your own clients.' },
      { question: 'Can we connect our own merchant payment gateway for white-label subscriptions?', answer: 'Yes. White-label partners can connect their own Razorpay, Cashfree, Stripe, or PayPal merchant accounts so customer subscription revenues are deposited directly into your bank account.' },
      { question: 'How is tenant data kept secure and private in multi-tenant mode?', answer: 'We implement strict schema-level tenant partitioning and encrypted authentication tokens. Tenant A cannot under any circumstances query, see, or access Tenant B data.' },
      { question: 'Do you assist with initial server setup and custom domain mapping?', answer: 'Yes. Our technical team handles DNS verification, automated SSL certificate generation, and server configuration for your custom domain.' }
    ],
    relatedProducts: [
      { title: 'ERP Software', slug: 'erp-software', desc: 'Comprehensive enterprise resource planning for manufacturers and traders.' },
      { title: 'WhatsApp Marketing Tool', slug: 'whatsapp-marketing-tool', desc: 'High-converting WhatsApp automation for customer acquisition.' },
      { title: 'Custom Software Development', slug: 'custom-software-development', desc: 'Bespoke software architecture engineered for unique workflows.' }
    ]
  },

  'whatsapp-marketing-tool': {
    slug: 'whatsapp-marketing-tool',
    id: 'prod-whatsapp',
    title: 'WhatsApp Marketing Tool',
    metaTitle: 'WhatsApp Marketing Tool | YogTeck Business Solution',
    metaDescription: 'YogTeck WhatsApp Marketing Tool automates customer messaging, lead capture, brochure dispatch, payment reminders, and PDF invoicing on monthly subscription plans.',
    h1: 'WhatsApp Marketing & Business Automation Tool',
    tagline: 'Automated Lead Capture, Instant Customer Greetings, PDF Receipts & Payment Reminders',
    badge: 'Monthly Subscription',
    icon: 'message-circle',
    heroAnswer: 'YogTeck WhatsApp Marketing Tool is a business messaging automation software operating on affordable monthly subscription plans. It enables businesses in Kanpur and across India to capture leads automatically from websites and advertisements, send instant greeting brochures, trigger outstanding payment reminders, and deliver digital invoice PDFs with zero manual effort.',
    whatItDoes: 'With over 95% open rates in India, WhatsApp is the primary communication channel for modern buyers. YogTeck WhatsApp Marketing Tool connects directly to your web forms, CRM, and billing systems via verified APIs. It automatically logs leads, dispatches personalized product catalogs, schedules follow-up messages, and allows multiple sales operators to manage customer conversations from a unified inbox.',
    whoItIsFor: [
      { title: 'Retail Stores, Wholesalers & Distributors', description: 'Instantly send digital GST invoice PDFs to customer WhatsApp numbers and recover outstanding Udhar dues with automated payment links.' },
      { title: 'Real Estate Colonizers & Project Developers', description: 'Deliver plot layouts, site visit confirmations, project brochures, and booking receipts the second an inquiry arrives.' },
      { title: 'Healthcare Clinics, Hospitals & Labs', description: 'Deliver digital diagnostic test reports, appointment confirmations, and doctor consultation reminders directly to patients.' },
      { title: 'Coaching Institutes & Training Centers', description: 'Share course brochures, admission notices, fee payment installment reminders, and test schedule updates to students and parents.' }
    ],
    keyFeatures: [
      { title: 'Automated Webhook Lead Ingestion', description: 'Capture incoming leads from website forms, Facebook Ads, Google Ads, and IndiaMART, triggering instant greeting sequences.', icon: 'inbox' },
      { title: 'WhatsApp PDF Invoicing & Receipts', description: 'One-click dispatch of formatted GST tax invoice PDFs and digital payment receipts directly to customers.', icon: 'file-text' },
      { title: 'Automated Payment Dues Reminders', description: 'Schedule gentle payment follow-ups for outstanding customer credit balances with clickable UPI payment links.', icon: 'dollar-sign' },
      { title: 'Catalog & Digital Brochure Sharing', description: 'Automatically deliver high-resolution product catalogs and PDF rate cards when customers message specific keywords.', icon: 'book' },
      { title: 'Multi-Agent Team Web Inbox', description: 'Enable multiple sales executives to reply to customer chats from one official company WhatsApp number without sharing phones.', icon: 'users' },
      { title: 'Delivery & Read Tracking Analytics', description: 'Live tracking of message delivery, read status, and link click engagement metrics to refine your sales communication.', icon: 'bar-chart' }
    ],
    plansPricing: [
      {
        name: 'Starter Monthly Plan',
        price: '[OWNER: real price]',
        period: '/month',
        description: 'Ideal for local retail shops and solo entrepreneurs looking to automate customer greetings and invoice dispatch.',
        features: ['1 Connected WhatsApp Number', 'Up to 2 Team Operators', 'Automated Welcome & Away Greetings', 'WhatsApp PDF Receipt Sharing', 'Standard Webhook Integration', 'Email & WhatsApp Support']
      },
      {
        name: 'Business Growth Plan',
        price: '[OWNER: real price]',
        period: '/month',
        description: 'Engineered for growing businesses, clinics, and wholesale distributors requiring multi-agent inboxes and payment reminders.',
        features: ['1 Official Verified Number', 'Up to 5 Team Operators', 'Automated Lead Nurturing Workflows', 'Scheduled Payment Reminders', 'IndiaMART & Meta Ads Webhooks', 'Priority Phone Support'],
        highlighted: true
      },
      {
        name: 'Enterprise Scale Plan',
        price: '[OWNER: real price]',
        period: '/month or annual discount',
        description: 'For high-volume enterprises, hospitals, and real estate developers with custom ERP integrations and large contact lists.',
        features: ['Multi-Department Routing', 'Unlimited Team Operators', 'Custom ERP & Billing API Integration', 'Dedicated Account Manager', 'Custom Automation Scripting', '99.9% Uptime Guarantee']
      }
    ],
    faqs: [
      { question: 'Is this WhatsApp Marketing Tool safe for our business phone number?', answer: 'Yes. We utilize official and compliant WhatsApp Business API protocols to ensure your phone number remains in good standing and adheres strictly to WhatsApp messaging policies.' },
      { question: 'Can this tool automatically send invoices generated from our billing software?', answer: 'Yes. Our billing software and custom ERP integrate seamlessly with the WhatsApp tool to deliver invoice PDFs and payment links in under 5 seconds upon invoice creation.' },
      { question: 'Can multiple staff members respond to customers on the same WhatsApp number?', answer: 'Yes. Our shared team inbox allows multiple sales and support representatives to log in from their computers or mobile phones and manage conversations collaboratively.' },
      { question: 'What is required to get started with the monthly subscription?', answer: 'All you need is a dedicated phone number. Our technical team configures your account, connects your lead sources, sets up your message templates, and trains your team within 24 to 48 hours.' }
    ],
    relatedProducts: [
      { title: 'Billing Software', slug: 'billing-software', desc: 'Lightning-fast 10-second GST billing software with WhatsApp sharing.' },
      { title: 'ERP Software', slug: 'erp-software', desc: 'Unified cloud ERP for inventory, manufacturing, and accounts.' },
      { title: 'SEO & Digital Growth', slug: 'seo-digital-growth', desc: 'Drive high-intent buyer inquiries into your WhatsApp funnels.' }
    ]
  }
};

export const CLIENTS_CASE_STUDIES_DATA: Record<string, ClientCaseStudyData> = {
  'mmr-constructions': {
    id: 'mmr-constructions',
    clientId: 'mmr-constructions',
    companyName: 'MMR Constructions and Developer Private Limited',
    shortName: 'MMR Constructions',
    metaTitle: 'MMR Constructions Case Study | YogTeck Business Solution',
    metaDescription: 'Discover how YogTeck engineered an enterprise corporate portal and interactive project showcase for MMR Constructions, driving 2.4x lead inflow with 99.9% uptime.',
    h1: 'MMR Constructions & Developer Case Study',
    industry: 'Real Estate & Infrastructure Development',
    accentColor: '#FF9A1F',
    summary: 'Enterprise corporate web portal & project portfolio showcasing premier commercial and residential developments across Uttar Pradesh.',
    clientOverview: 'MMR Constructions and Developer Private Limited is an established real estate and infrastructure development enterprise developing residential plotting layouts, commercial hubs, and township developments in Uttar Pradesh. They partnered with YogTeck Business Solution to transform their digital presence and streamline property buyer inquiries.',
    challengeSolved: 'Prospective property investors and home buyers struggled to navigate static PDF brochures and disjointed site plans. The sales team lacked a central interactive platform to demonstrate 3D project walkthroughs, show real-time plot availability, and capture qualified site-visit requests without lead leakage.',
    solutionDelivered: 'YogTeck architected and engineered a high-performance, mobile-first corporate portal. The platform features interactive project maps, instant floor plan and brochure downloads behind smart lead gates, automated routing of buyer inquiries to regional sales executives, and seamless WhatsApp inquiry buttons.',
    verifiedMetrics: [
      '99.9% Uptime on Secure Cloud Infrastructure',
      '2.4x Increase in Qualified Inbound Lead Inflow',
      'Sub-Second Page Load Speed Across Mobile Devices',
      'Unified Dashboard Routing Site-Visit Bookings'
    ],
    ownerPlaceholders: [
      '[OWNER: client permission / results - additional project revenue or unit sales metrics to be added upon client consent]'
    ],
    tags: ['Real Estate Portal', 'Plotting Showcase', 'Lead Generation Engine', 'Interactive 3D Walkthroughs', 'NextGen Web'],
    faqs: [
      { question: 'What technology stack was used for the MMR Constructions portal?', answer: 'The solution was built using high-performance modern web architecture with optimized image compression, lazy-loaded visual media, and cloud hosting for continuous 99.9% uptime.' },
      { question: 'Can YogTeck build similar real estate and plotting portals for other developers?', answer: 'Yes. YogTeck specializes in dedicated web portals and plot management software for real estate developers, colonizers, and infrastructure firms across North India.' }
    ]
  },

  'yogkart-healthcare': {
    id: 'yogkart-healthcare',
    clientId: 'yogkart-healthcare',
    companyName: 'Yogkart Healthcare Private Limited',
    shortName: 'Yogkart Healthcare',
    metaTitle: 'Yogkart Healthcare Case Study | YogTeck Business Solution',
    metaDescription: 'See how YogTeck engineered a scalable pan-India e-commerce and health wellness platform for Yogkart Healthcare, accelerating online order growth by +320%.',
    h1: 'Yogkart Healthcare Pan-India Store Case Study',
    industry: 'Healthcare & E-Commerce Platform',
    accentColor: '#2F7BFF',
    summary: 'Direct-to-consumer pharmacy & healthcare e-commerce with multi-warehouse inventory, prescription upload, and instant payment checkout.',
    clientOverview: 'Yogkart Healthcare Private Limited is a healthcare and wellness enterprise delivering verified healthcare products, nutritional supplements, and wellness essentials to customers across India. They partnered with YogTeck to build a robust, pan-India e-commerce infrastructure.',
    challengeSolved: 'Scaling direct-to-consumer healthcare sales required strict prescription verification workflows, multi-warehouse inventory synchronization to prevent out-of-stock orders, support for instant UPI and COD checkout, and automated shipping dispatch across thousands of Indian pin codes.',
    solutionDelivered: 'YogTeck engineered a custom, mobile-first e-commerce platform with sub-second page speed, an intuitive prescription upload module, real-time sync with warehouse inventories, dynamic courier integration with automated Airway Bill (AWB) generation, and automated WhatsApp order tracking notifications.',
    verifiedMetrics: [
      '+320% Online Order Growth Post-Launch',
      'Automated Inventory Sync Across Multi-Warehouse Hubs',
      'Frictionless Mobile-First UPI & COD Checkout',
      'Real-Time Automated Tracking Links Sent via WhatsApp'
    ],
    ownerPlaceholders: [
      '[OWNER: client permission / results - specific monthly GMV numbers and repeat purchase rates to be published upon client sign-off]'
    ],
    tags: ['Healthcare E-Commerce', 'Multi-Warehouse Sync', 'Payment Gateway Integration', 'Automated Logistics', 'Mobile-First UX'],
    faqs: [
      { question: 'How does the prescription upload workflow operate?', answer: 'Customers can upload prescriptions directly during checkout. The administrative dashboard allows verified pharmacists to review, approve, and attach the digital prescription to the order record.' },
      { question: 'Which courier and shipping aggregators were integrated?', answer: 'The platform integrates automated shipping APIs (Shiprocket and Delhivery) enabling instant AWB generation, label printing, and automated tracking webhooks.' }
    ]
  },

  'business-web-solutions': {
    id: 'business-web-solutions',
    clientId: 'business-web-solutions',
    companyName: 'Business Web Solutions',
    shortName: 'Business Web Solutions',
    metaTitle: 'Business Web Solutions Case Study | YogTeck Business Solution',
    metaDescription: 'Learn how YogTeck delivered cloud ERP and warehouse automation for Business Web Solutions, cutting invoice processing cycles by 70% across 4 regional hubs.',
    h1: 'Omnichannel ERP & Warehouse Automation Case Study',
    industry: 'IT, Distribution & Digital Consulting',
    accentColor: '#10B981',
    summary: 'Real-time billing, dispatch, GST e-invoicing, and stock allocation across 4 distribution hubs in North India.',
    clientOverview: 'Business Web Solutions is a digital consulting and wholesale technology distribution partner managing multi-hub logistics, enterprise technology consulting, and regional client operations across North India.',
    challengeSolved: 'Operating across 4 separate regional distribution hubs resulted in stock allocation delays, manual reconciliation between warehouse ledgers, and slow invoice generation during month-end dispatch peaks.',
    solutionDelivered: 'YogTeck architected a cloud ERP and centralized stock synchronization platform. The system connects all 4 hubs in real time, provides 10-second GST e-invoicing with automated E-Way bills, tracks customer credit ledgers, and offers executive management smartphone visibility into daily sales.',
    verifiedMetrics: [
      '70% Faster Invoice Processing Cycles',
      'Zero Stock Discrepancy Across 4 Distribution Hubs',
      'Automated GST E-Way Bill & Tax Compliance Handover',
      'Centralized Real-Time Executive Reporting'
    ],
    ownerPlaceholders: [
      '[OWNER: client permission / results - exact annual cost savings and staff efficiency audit numbers to be added with client permission]'
    ],
    tags: ['Cloud ERP', 'Warehouse Automation', 'GST Invoicing', 'Multi-Branch Sync', 'Supply Chain APIs'],
    faqs: [
      { question: 'How is inter-hub inventory transfer tracked in the system?', answer: 'The ERP features an automated Stock Transfer Note (STN) workflow. Goods leaving Hub A are marked in transit until electronically acknowledged and accepted into Hub B inventory.' },
      { question: 'Can this solution work for other multi-warehouse wholesale businesses?', answer: 'Yes. YogTeck deploys this modular ERP architecture for FMCG, electronics, hardware, and industrial distributors across India.' }
    ]
  }
};

export const CITY_HUBS_DATA: Record<string, CityHubData> = {
  'kanpur': {
    city: 'Kanpur',
    slug: 'it-software-company-kanpur',
    metaTitle: 'IT & Software Company in Kanpur | YogTeck Business Solution',
    metaDescription: 'YogTeck Business Solution is a leading IT and software company headquartered in Kanpur. We deliver website development, custom software, ERP, and billing solutions.',
    h1: 'IT & Software Development Company in Kanpur, India',
    isHeadquarters: true,
    isIndexable: true,
    needsOwnerContent: false,
    heroAnswer: 'YogTeck Business Solution is an established IT and software company headquartered in Kanpur, Uttar Pradesh (Registered Office: 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, UP 208015). We provide website development, custom cloud software, ERP systems, GST billing software, e-commerce stores, and digital growth services for businesses across Kanpur and pan-India.',
    cityContext: 'As the premier industrial and manufacturing capital of Uttar Pradesh, Kanpur houses renowned leather export clusters, footwear manufacturers, textile and hosiery mills, chemical formulation units, FMCG distributors, and bustling retail commercial centers (Naveen Market, Gumti No. 5, Sisamau, P-Road). YogTeck delivers tailored engineering solutions designed for Kanpur commercial realities.',
    localIndustries: [
      { industry: 'Leather & Footwear Manufacturing', description: 'Raw leather procurement, cutting batch management, shoe lasting tracking, export documentation, and GST e-invoicing.' },
      { industry: 'Textile, Hosiery & Garment Mills', description: 'Yarn stock tracking, job work dyeing challans, wholesale distribution management, and size/color matrix billing.' },
      { industry: 'Wholesale Trading & FMCG Hubs', description: 'Distributor beat scheduling, customer Udhar credit ledgers, batch expiry monitoring, and fast dispatch.' },
      { industry: 'Retail Showrooms & Commercial Centers', description: '10-second GST barcode billing, thermal receipt printing, and WhatsApp invoice sharing for bustling Kanpur retail shops.' }
    ],
    faqs: [
      { question: 'Where is YogTeck Business Solution located in Kanpur?', answer: 'Our registered office is located at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, Uttar Pradesh 208015. You can call +91 8299209905 or email yogteck@gmail.com.' },
      { question: 'Do you provide on-site software installation and training in Kanpur?', answer: 'Yes. For businesses in Kanpur Nagar, our technical team provides on-site software deployment, hardware pairing (thermal printers, barcode scanners), and hands-on staff training.' },
      { question: 'What is the cost of website or software development in Kanpur?', answer: 'Pricing is transparent and based on specific business scope. Starter business packages begin at competitive rates suitable for MSMEs, while enterprise ERP systems are quoted based on modules and user seats.' }
    ]
  },

  'lucknow': {
    city: 'Lucknow',
    slug: 'it-software-company-lucknow',
    metaTitle: 'IT & Software Services in Lucknow | YogTeck Business Solution',
    metaDescription: 'YogTeck Business Solution delivers modern IT, web development, custom software, ERP & digital growth solutions for enterprises and startups in Lucknow, UP.',
    h1: 'IT, Software & Web Development Services for Lucknow, UP',
    isHeadquarters: false,
    isIndexable: true,
    needsOwnerContent: false,
    heroAnswer: 'YogTeck Business Solution provides specialized software engineering, custom website development, multi-branch ERP platforms, and digital growth consulting for enterprises, healthcare chains, and startups in Lucknow, Uttar Pradesh. Operating from our nearby headquarters, we offer dedicated regional technology partnership.',
    cityContext: 'Lucknow is the administrative capital and commercial hub of Uttar Pradesh, featuring bustling retail corridors (Hazratganj, Gomti Nagar, Aminabad, Alambagh), extensive medical and super-specialty hospital hubs, educational coaching clusters, and modern real estate developments.',
    localIndustries: [
      { industry: 'Super-Specialty Hospitals & Healthcare Chains', description: 'Patient records management, OPD scheduling, and automated lab test report delivery via WhatsApp.' },
      { industry: 'Real Estate Colonizers & Infrastructure Developers', description: 'Interactive project walkthroughs, plot inventory tracking, and investor lead routing CRM.' },
      { industry: 'Education, Universities & Coaching Institutes', description: 'Student enrollment CRM, online fee installment portals, and parent notification automation.' },
      { industry: 'Chikankari & Retail Fashion E-Commerce', description: 'Modern e-commerce storefronts with automated courier sync (Shiprocket) for pan-India and global deliveries.' }
    ],
    faqs: [
      { question: 'Does YogTeck serve clients in Lucknow, Uttar Pradesh?', answer: 'Yes. We actively partner with businesses across Lucknow including Gomti Nagar, Hazratganj, and Alambagh, providing full-service web, software, and ERP implementations.' },
      { question: 'Can YogTeck software synchronize multi-branch stores in Lucknow?', answer: 'Yes. Our cloud ERP and billing software offers real-time inventory and sales sync across multiple branch locations with centralized management reporting.' }
    ]
  },

  'raebareli': {
    city: 'Raebareli',
    slug: 'it-software-company-raebareli',
    metaTitle: 'IT & Software Services in Raebareli | YogTeck Business Solution',
    metaDescription: 'YogTeck Business Solution provides custom software, website development, ERP, GST billing software & digital marketing for businesses in Raebareli, UP.',
    h1: 'IT, Software & Web Development Services for Raebareli, UP',
    isHeadquarters: false,
    isIndexable: true,
    needsOwnerContent: false,
    heroAnswer: 'YogTeck Business Solution delivers industrial ERP systems, GST billing software, custom web development, and digital visibility services for manufacturing ancillaries, agricultural distributors, and commercial retailers in Raebareli, Uttar Pradesh.',
    cityContext: 'Raebareli is an important industrial and agricultural center in Uttar Pradesh, home to the Modern Coach Factory, engineering ancillaries, fertilizer/grain trading hubs, and traditional retail markets requiring modern digital automation.',
    localIndustries: [
      { industry: 'Industrial & Railway Engineering Ancillaries', description: 'Component batch tracking, job work issue challans, quality inspection reports, and dispatch logs.' },
      { industry: 'Agricultural Equipment & Fertilizer Trading', description: 'Batch number tracking, farmer credit ledgers, and fast order invoicing.' },
      { industry: 'Retail Showrooms & Hardware Stores', description: '10-second GST billing, barcode sticker generation, thermal printing, and WhatsApp receipts.' }
    ],
    faqs: [
      { question: 'Does YogTeck provide software support to businesses in Raebareli?', answer: 'Yes. We provide scheduled on-site consultations and rapid remote assistance to manufacturing and retail enterprises throughout Raebareli.' },
      { question: 'Can Raebareli shops use YogTeck billing software with standard hardware?', answer: 'Yes. Our software connects seamlessly with all standard thermal printers, barcode scanners, and Windows/Mac computers.' }
    ]
  },

  'noida': {
    city: 'Noida',
    slug: 'it-software-company-noida',
    metaTitle: 'IT & Software Services in Noida | YogTeck Business Solution',
    metaDescription: 'YogTeck Business Solution provides remote software engineering, web development, and cloud solutions for technology ventures and businesses in Noida, NCR.',
    h1: 'IT & Software Development Services for Noida, NCR',
    isHeadquarters: false,
    isIndexable: false,
    needsOwnerContent: true,
    heroAnswer: 'YogTeck Business Solution serves businesses in Noida, Delhi NCR through remote software development, web engineering, cloud ERP, and digital marketing consulting.',
    cityContext: '[OWNER: city-specific content needed - Noida technology parks, startup ecosystems, logistics hubs, and localized business case studies to be supplied].',
    localIndustries: [
      { industry: 'IT & Tech Startups', description: '[OWNER: city-specific content needed]' },
      { industry: 'Logistics & Warehousing Hubs', description: '[OWNER: city-specific content needed]' }
    ],
    faqs: [
      { question: 'Does YogTeck serve businesses in Noida?', answer: 'Yes, YogTeck serves Noida and Delhi NCR businesses via remote collaboration, cloud deployment, and video consultations.' }
    ]
  },

  'delhi': {
    city: 'Delhi',
    slug: 'it-software-company-delhi',
    metaTitle: 'IT & Software Services in Delhi | YogTeck Business Solution',
    metaDescription: 'YogTeck Business Solution delivers custom software, e-commerce platforms, and web development services for commercial enterprises in Delhi NCR.',
    h1: 'IT & Software Development Services for Delhi, NCR',
    isHeadquarters: false,
    isIndexable: false,
    needsOwnerContent: true,
    heroAnswer: 'YogTeck Business Solution provides web engineering, custom software, ERP systems, and e-commerce development for commercial and trading businesses in Delhi NCR.',
    cityContext: '[OWNER: city-specific content needed - Delhi wholesale markets (Chandni Chowk, Karol Bagh, Sadar Bazar) and corporate hubs to be detailed].',
    localIndustries: [
      { industry: 'Wholesale Trading & Commercial Hubs', description: '[OWNER: city-specific content needed]' }
    ],
    faqs: [
      { question: 'Does YogTeck take on projects for Delhi businesses?', answer: 'Yes, we provide end-to-end software and web development services with complete digital handover and SLA support.' }
    ]
  },

  'gurugram': {
    city: 'Gurugram',
    slug: 'it-software-company-gurugram',
    metaTitle: 'IT & Software Services in Gurugram | YogTeck Business Solution',
    metaDescription: 'YogTeck Business Solution provides enterprise software, cloud SaaS platforms, and modern web applications for corporate organizations in Gurugram, NCR.',
    h1: 'IT & Software Development Services for Gurugram, NCR',
    isHeadquarters: false,
    isIndexable: false,
    needsOwnerContent: true,
    heroAnswer: 'YogTeck Business Solution engineers custom cloud software, SaaS platforms, and web portals for corporate enterprises, real estate firms, and service agencies in Gurugram.',
    cityContext: '[OWNER: city-specific content needed - Gurugram Cyber City, corporate commercial corridors, and real estate ecosystem details to be provided].',
    localIndustries: [
      { industry: 'Corporate & Real Estate Enterprises', description: '[OWNER: city-specific content needed]' }
    ],
    faqs: [
      { question: 'Can Gurugram companies hire YogTeck for custom software development?', answer: 'Yes. We engineer bespoke cloud software, CRM systems, and web portals with full IP and code ownership.' }
    ]
  },

  'pune': {
    city: 'Pune',
    slug: 'it-software-company-pune',
    metaTitle: 'IT & Software Services in Pune | YogTeck Business Solution',
    metaDescription: 'YogTeck Business Solution delivers custom software development, cloud ERP, and web engineering for manufacturing and technology businesses in Pune, Maharashtra.',
    h1: 'IT & Software Development Services for Pune, Maharashtra',
    isHeadquarters: false,
    isIndexable: false,
    needsOwnerContent: true,
    heroAnswer: 'YogTeck Business Solution delivers cloud ERP systems, custom software, and responsive web platforms for automotive ancillaries, manufacturers, and startups in Pune.',
    cityContext: '[OWNER: city-specific content needed - Pune automotive manufacturing hubs (Bhosari, Chakan, Talegaon) and IT corridors to be documented].',
    localIndustries: [
      { industry: 'Automotive & Precision Manufacturing', description: '[OWNER: city-specific content needed]' }
    ],
    faqs: [
      { question: 'Does YogTeck provide ERP solutions for Pune manufacturing units?', answer: 'Yes. Our Cloud ERP handles Bill of Materials (BOM), inventory, and GST compliance with full remote implementation.' }
    ]
  },

  'mumbai': {
    city: 'Mumbai',
    slug: 'it-software-company-mumbai',
    metaTitle: 'IT & Software Services in Mumbai | YogTeck Business Solution',
    metaDescription: 'YogTeck Business Solution delivers e-commerce platforms, custom web portals, and enterprise software for commercial and retail brands in Mumbai, Maharashtra.',
    h1: 'IT & Software Development Services for Mumbai, Maharashtra',
    isHeadquarters: false,
    isIndexable: false,
    needsOwnerContent: true,
    heroAnswer: 'YogTeck Business Solution builds conversion-focused e-commerce storefronts, corporate web portals, and custom cloud software for commercial brands and enterprises in Mumbai.',
    cityContext: '[OWNER: city-specific content needed - Mumbai retail fashion, financial services, and media commercial ecosystem details to be provided].',
    localIndustries: [
      { industry: 'E-Commerce, Retail & Commercial Brands', description: '[OWNER: city-specific content needed]' }
    ],
    faqs: [
      { question: 'Can Mumbai brands partner with YogTeck for e-commerce development?', answer: 'Yes. We build high-speed e-commerce stores with automated courier sync and Indian payment gateway integrations.' }
    ]
  }
};
