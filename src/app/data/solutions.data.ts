export interface SolutionFeature {
  title: string;
  description: string;
  architectureDetails?: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  badge: string;
  heroAnswer: string;
  overview: string;
  keyCapabilities: SolutionFeature[];
  workflowStages: { stage: string; title: string; details: string }[];
  citiesServedSection: {
    title: string;
    description: string;
    citiesList: string[];
  };
  technicalSpecs: { label: string; value: string }[];
  verifiedCaseNote?: string;
  faqs: SolutionFaq[];
}

export interface SolutionGateResult {
  qualifies: boolean;
  wordCount: number;
  faqCount: number;
  hasPlaceholder: boolean;
  reason: string;
}

export function isSolutionPageQualifiesForIndexing(data: SolutionData): SolutionGateResult {
  if (!data) {
    return {
      qualifies: false,
      wordCount: 0,
      faqCount: 0,
      hasPlaceholder: false,
      reason: 'No solution data provided'
    };
  }

  const allTextPieces = [
    data.h1 || '',
    data.heroAnswer || '',
    data.overview || '',
    ...(data.keyCapabilities || []).map(c => `${c.title} ${c.description} ${c.architectureDetails || ''}`),
    ...(data.workflowStages || []).map(w => `${w.stage} ${w.title} ${w.details}`),
    data.citiesServedSection ? `${data.citiesServedSection.title} ${data.citiesServedSection.description} ${data.citiesServedSection.citiesList.join(' ')}` : '',
    ...(data.technicalSpecs || []).map(t => `${t.label} ${t.value}`),
    data.verifiedCaseNote || '',
    ...(data.faqs || []).map(f => `${f.question} ${f.answer}`)
  ];

  const fullText = allTextPieces.join(' ');
  const hasPlaceholder = /\[(OWNER|VERIFY)[\s\S]*?\]/i.test(fullText);
  const words = fullText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const faqCount = data.faqs ? data.faqs.length : 0;

  const qualifies = !hasPlaceholder && wordCount >= 800 && faqCount >= 5;

  let reason = 'Passes all criteria: genuine verified content, >=800 words, >=5 FAQs.';
  if (hasPlaceholder) {
    reason = 'Contains placeholder text requiring verification.';
  } else if (wordCount < 800) {
    reason = `Body text length (${wordCount} words) is below the 800-word indexability threshold.`;
  } else if (faqCount < 5) {
    reason = `FAQ count (${faqCount}) is below the required 5 FAQs minimum.`;
  }

  return { qualifies, wordCount, faqCount, hasPlaceholder, reason };
}

export const SOLUTIONS_DATA: Record<string, SolutionData> = {
  'erp-for-manufacturers': {
    slug: 'erp-for-manufacturers',
    metaTitle: 'ERP Software for Manufacturers | YogTeck',
    metaDescription: 'Custom cloud ERP for manufacturing plants. Multi-stage BOM, job-work challans, batch tracking & GST invoicing, delivered remotely from Kanpur.',
    h1: 'Cloud ERP Software for Manufacturing Enterprises',
    badge: 'INDUSTRIAL MANUFACTURING SOLUTION',
    heroAnswer: 'YogTeck engineers specialized cloud ERP systems designed specifically for discrete and process manufacturing plants across India. Our manufacturing software digitizes multi-level Bills of Materials (BOM), outside job-work issue and receipt challans, real-time machine run logs, component scrap reconciliation, worker job cards, and GST-ready e-invoicing. Delivered remotely from our Kanpur central software development office, our manufacturing architecture gives plant owners complete production floor visibility, zero software lock-in, and full intellectual property ownership.',
    overview: 'Industrial manufacturers operate in demanding environments where production delays, untracked job-worker material loss, and disconnected inventory ledgers directly erode operating profit. Traditional generic accounting packages fail to capture multi-stage conversion losses, batch-level quality control parameters, and outsourced machining workflows. YogTeck builds high-resilience manufacturing ERP platforms tailored to small, medium, and large industrial facilities. From raw material intake inspection and store issue notes to work-in-progress (WIP) tracking across shop floors, our software unifies procurement, fabrication, assembly, and dispatch into a single unified dashboard. Built with modern TypeScript, Angular, and secure backend microservices, our systems support both connected office computers and rugged tablet interfaces on factory floors.',
    keyCapabilities: [
      {
        title: 'Multi-Level Bill of Materials (BOM) & Routing',
        description: 'Define comprehensive parent-child component assemblies with standard raw material consumption rates, scrap percentage tolerances, and multi-station machine routing paths.',
        architectureDetails: 'Configurable nested JSON assembly trees supporting sub-assembly nesting up to 8 levels deep with automatic material cost roll-up calculations.'
      },
      {
        title: 'Subcontractor Job-Work Issue & Scrap Reconcile',
        description: 'Issue raw materials to outside job-workers under GST Section 143 challans with delivery dates, expected conversion yield, return inspection logs, and contractor processing payments.',
        architectureDetails: 'Automated job-work ledger balancing that tracks material quantity variance, rejects, and vendor pending balances with automated alert thresholds.'
      },
      {
        title: 'Batch Number Serialization & Heat Traceability',
        description: 'Assign unique batch numbers or heat numbers upon raw material intake to trace finished items back to suppliers, inspection certificates, and furnace run sheets.',
        architectureDetails: 'Full forward and backward batch pedigree mapping enabling rapid audit verification and ISO/CE compliance reporting within seconds.'
      },
      {
        title: 'Shop Floor Job Cards & Worker Shift Logs',
        description: 'Issue barcode-enabled job cards to machine operators to log operation start times, piece counts, scrap pieces, machine downtime reasons, and worker shift productivity.',
        architectureDetails: 'Touch-friendly operator kiosk interfaces optimized for tablet screens and low-bandwidth local wireless networks.'
      },
      {
        title: 'Raw Material Store & Dispatch Packaging Logs',
        description: 'Real-time store ledger updating upon Goods Received Notes (GRN), store requisitions, carton packing lists, tare weights, and automated e-way bill generation.',
        architectureDetails: 'Integration with weighing scale serial ports and barcode label printers for automated dispatch container labeling.'
      },
      {
        title: 'Statutory GST Invoicing & E-Way Bill Integration',
        description: 'Generate GST-compliant tax invoices, credit notes, debit notes, export commercial invoices, and automated e-way bills directly from the dispatch gate module.',
        architectureDetails: 'REST API integration with GST Suvidha Providers (GSP) with automated schema validation and QR code generation.'
      }
    ],
    workflowStages: [
      {
        stage: '01',
        title: 'Procurement & Raw Material GRN',
        details: 'Purchase orders trigger gate inward entries, quality assurance inspection sampling, and automatic store ledger updating with landed cost calculations.'
      },
      {
        stage: '02',
        title: 'Production Planning & BOM Release',
        details: 'Production managers schedule work orders based on finished goods inventory thresholds or confirmed customer orders, generating material pick lists.'
      },
      {
        stage: '03',
        title: 'Job-Work & Shop Floor Fabrication',
        details: 'Components route through internal CNC/pressing machines and outside subcontractors with digital job cards and challans tracking piece progress.'
      },
      {
        stage: '04',
        title: 'Quality Inspection & Dispatch Packing',
        details: 'Finished items undergo final QC inspection, serial barcode labeling, carton packing list generation, and tax invoice generation at the dispatch dock.'
      }
    ],
    citiesServedSection: {
      title: 'Serving Manufacturing Hubs Across India Remotely',
      description: 'We serve manufacturing clients across Jaipur, Indore, Ahmedabad, Kanpur, and Pune remotely from our Kanpur office. Our registered software engineering headquarters is located at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, UP 208015. Through scheduled video architecture reviews, encrypted staging environments, and comprehensive video staff onboarding, we deliver production-ready manufacturing software without geographic constraints.',
      citiesList: ['Kanpur', 'Jaipur', 'Indore', 'Ahmedabad', 'Pune', 'Lucknow', 'Faridabad']
    },
    technicalSpecs: [
      { label: 'Frontend Technology', value: 'Modern Angular with standalone reactive architecture' },
      { label: 'Backend Architecture', value: 'High-speed Node.js / Express microservices' },
      { label: 'Database Engine', value: 'PostgreSQL with automated write-ahead log replication' },
      { label: 'Hardware Support', value: 'Thermal barcode printers, USB/wireless laser scanners, serial weighing scales' },
      { label: 'Data Security', value: 'Role-Based Access Control (RBAC), TLS 1.3 encryption, daily cloud backups' },
      { label: 'Source Code Ownership', value: '100% intellectual property and production code transfer to client' }
    ],
    verifiedCaseNote: 'Our engineering team built the customized B2B product catalog and load specification engine for Techno Racks, showcasing our capability in structuring complex technical product specifications for industrial manufacturing clients.',
    faqs: [
      {
        question: 'Can YogTeck manufacturing ERP track materials sent to outside job-workers?',
        answer: 'Yes. Our manufacturing ERP includes an advanced subcontractor job-work module compliant with GST Section 143. You can generate job-work delivery challans, set expected yield percentages, log material returns, record process scrap, and calculate vendor processing charges automatically.'
      },
      {
        question: 'How do you handle multi-level Bills of Materials (BOM) with sub-assemblies?',
        answer: 'Our software supports multi-level recursive BOMs where finished goods can comprise multiple intermediate sub-assemblies, each with their own raw material inputs, labor operations, and machine overheads. When a master work order is scheduled, the system calculates raw material requirements across all tiers.'
      },
      {
        question: 'How does remote software implementation work for factories outside Kanpur?',
        answer: 'We deliver manufacturing ERP implementations remotely from our Kanpur office through a structured 4-phase methodology: virtual discovery workshops, cloud staging sprints, data migration from Tally/Excel, and recorded video operator training. For complex hardware pairing, we provide step-by-step remote calibration guides.'
      },
      {
        question: 'Can factory machine operators use the software on the shop floor?',
        answer: 'Yes. We build simplified shop floor kiosk views that can be deployed on standard Android tablets or touchmonitors at machine stations. Operators simply scan job card barcodes to log work starts, completed piece counts, and scrap counts.'
      },
      {
        question: 'Do we own the software code and database after implementation?',
        answer: 'Yes. YogTeck delivers 100% intellectual property ownership, complete production source code, database access keys, and server deployment scripts upon milestone sign-off. We never lock you into recurring proprietary software licenses.'
      },
      {
        question: 'Can our existing Tally item masters and customer ledgers be migrated?',
        answer: 'Yes. Our engineering team provides structured data migration tools to extract, validate, and import item masters, opening stock balances, vendor ledgers, and customer credit limits with zero data loss.'
      }
    ]
  },

  'inventory-software-for-traders': {
    slug: 'inventory-software-for-traders',
    metaTitle: 'Inventory Software for Wholesale Traders | YogTeck',
    metaDescription: 'Centralized multi-warehouse inventory software for wholesale traders. Multi-godown stock, customer credit ledgers & barcode billing by YogTeck.',
    h1: 'Cloud Inventory & Distribution Software for Wholesale Traders',
    badge: 'WHOLESALE TRADE & DISTRIBUTION',
    heroAnswer: 'YogTeck engineers robust cloud inventory management software and multi-warehouse distribution systems for wholesale traders, FMCG distributors, and bulk commodity stockists across India. Our distribution suite unifies multi-godown stock transfers, customer Udhar credit control ledgers, batch expiry FIFO tracking, delivery beat scheduling, and instant WhatsApp invoice dispatch. Delivered remotely from our Kanpur development headquarters, our inventory systems eliminate stock discrepancies, accelerate warehouse dispatch, and safeguard trading margins.',
    overview: 'Wholesale trading operations depend on rapid inventory turnover, razor-thin margins, and rigorous customer credit management. When stock counts in remote godowns do not match counter sales software, businesses face delayed customer orders, pilferage, and expired goods. YogTeck builds high-speed inventory platforms specifically engineered for Indian wholesale markets. Whether managing multi-tier dealer pricing, distributor delivery beats, or inter-branch stock requisitions, our software keeps your warehouse managers, counter sales staff, and field agents synchronized in real time. With instant barcode lookup and mobile field access, your distribution network operates with surgical accuracy.',
    keyCapabilities: [
      {
        title: 'Multi-Godown Stock Allocation & Inter-Branch Transfers',
        description: 'Track real-time inventory counts across central warehouses, regional godowns, and retail counters with digital transfer delivery notes and inward receipt confirmations.',
        architectureDetails: 'Transactional database isolation preventing negative stock allocation across concurrent multi-user counter operations.'
      },
      {
        title: 'Customer Credit Limits & Automated Udhar Ledgers',
        description: 'Enforce maximum credit limits and credit period days per wholesale buyer with automated bill locking when overdue thresholds are exceeded.',
        architectureDetails: 'Configurable credit rules engine with instant management override authorization via secure OTP or manager password.'
      },
      {
        title: 'Batch Number & Expiry FIFO Inventory Controls',
        description: 'Enforce First-In, First-Out (FIFO) stock allocation to ensure older batches are dispatched first, with proactive 30-60-90 day expiry notifications.',
        architectureDetails: 'Batch tracking down to individual carton and pallet lots with integrated expiry burn-down reports.'
      },
      {
        title: 'High-Volume Wholesale Dispatch Challans & Packing Lists',
        description: 'Generate multi-item dispatch manifests, transporter vehicle logs, and carton packing slips in seconds, ready for warehouse loading staff.',
        architectureDetails: 'Optimized bulk PDF generation pipelines producing printer-friendly A4 and thermal dispatch slips.'
      },
      {
        title: 'Instant WhatsApp Invoice & Payment Link Dispatch',
        description: 'Automatically transmit GST invoices, payment collection reminders, and payment receipts to buyers via official WhatsApp Business API.',
        architectureDetails: 'Automated webhook triggers transmitting PDF bills within 3 seconds of transaction confirmation.'
      },
      {
        title: 'Salesman Beat Management & Field Order Booking',
        description: 'Equip traveling sales representatives with a mobile-optimized portal to book wholesale orders, check live stock availability, and view buyer ledger balances.',
        architectureDetails: 'PWA-compatible responsive mobile portal with offline order draft caching.'
      }
    ],
    workflowStages: [
      {
        stage: '01',
        title: 'Supplier Inward & Purchase GRN',
        details: 'Inward bulk shipments with batch and expiry capture, supplier discount reconciliations, and automatic godown bin allocation.'
      },
      {
        stage: '02',
        title: 'Wholesale Order Booking & Credit Check',
        details: 'Counter sales or field reps enter orders; system validates real-time stock and automatically checks the buyer credit limit before confirmation.'
      },
      {
        stage: '03',
        title: 'Godown Pick-List & Dispatch Packing',
        details: 'Warehouse staff receive digital pick lists, pack goods by carton, attach barcode labels, and log transporter vehicle numbers.'
      },
      {
        stage: '04',
        title: 'Tax Invoicing & Payment Collection',
        details: 'GST invoice is finalized, dispatched via WhatsApp, and added to the buyer ledger with automated payment due date tracking.'
      }
    ],
    citiesServedSection: {
      title: 'Serving Wholesale Trading Markets Across India Remotely',
      description: 'We serve wholesale trading and distribution businesses across Jaipur, Indore, Ahmedabad, Kanpur, and Pune remotely from our Kanpur office. Our registered technical office is based at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, UP 208015. Our remote delivery model provides trading firms with fast software setup, legacy data migration, and dedicated phone and video technical support.',
      citiesList: ['Kanpur', 'Indore', 'Jaipur', 'Ahmedabad', 'Delhi', 'Lucknow', 'Chandigarh']
    },
    technicalSpecs: [
      { label: 'Architecture', value: 'Cloud-native multi-warehouse inventory engine' },
      { label: 'Database', value: 'High-performance PostgreSQL with ACID transaction guarantees' },
      { label: 'Hardware Compatibility', value: 'Laser barcode scanners, thermal receipt printers, standard desktop and mobile browsers' },
      { label: 'Messaging Integration', value: 'Official WhatsApp Business Cloud API & SMS gateways' },
      { label: 'Data Migration', value: 'Zero-data-loss extraction from Tally ERP 9, TallyPrime, and Excel' },
      { label: 'Licensing', value: 'Perpetual ownership with full code transfer, zero monthly SaaS fee lock-in' }
    ],
    verifiedCaseNote: 'Our engineering team built the wholesale e-commerce and multi-tier product catalog architecture for Yogkart, giving us real-world experience in engineering high-volume inventory portals.',
    faqs: [
      {
        question: 'Can YogTeck inventory software synchronize multiple godowns in real time?',
        answer: 'Yes. Our cloud inventory engine provides real-time multi-godown stock synchronization. When a sales order is booked at the central counter, warehouse managers at outlying godowns immediately see stock allocation changes and receive digital picking manifests.'
      },
      {
        question: 'How does the customer Udhar credit limit feature work?',
        answer: 'You can configure maximum credit amounts and payment grace periods (e.g. 15, 30, or 45 days) for each wholesale customer. If an outstanding balance exceeds the limit or overdue bills remain unpaid, the billing counter automatically blocks new orders until approved by an administrator.'
      },
      {
        question: 'How do you serve wholesale traders in other states remotely from Kanpur?',
        answer: 'We serve wholesale clients remotely from our Kanpur office. Implementation is handled through video screen-sharing sessions where our senior architects map your godown layout, import your Tally product masters, and conduct interactive staff training sessions.'
      },
      {
        question: 'Does the software support barcode scanning for bulk carton dispatches?',
        answer: 'Yes. Handheld laser barcode scanners can be used during inward goods receiving, godown stock auditing, and dispatch packing to verify that the exact ordered items and batch quantities are loaded onto delivery vehicles.'
      },
      {
        question: 'Can sales representatives book orders on their phones while visiting markets?',
        answer: 'Yes. Our mobile-first interface allows sales reps to view live warehouse stock counts, check buyer pending balances, and submit verified orders directly from the field.'
      },
      {
        question: 'Can we send automated GST invoices and payment reminders to buyers via WhatsApp?',
        answer: 'Yes. Our platform integrates directly with the WhatsApp Business Cloud API, automatically dispatching GST PDF bills and payment receipts to your customers immediately upon bill generation.'
      }
    ]
  },

  'billing-software-for-retail': {
    slug: 'billing-software-for-retail',
    metaTitle: 'GST Billing Software for Retail Stores | YogTeck',
    metaDescription: 'High-speed 10-second GST barcode billing software for retail shops. Thermal receipt printing, multi-store sync & WhatsApp invoices by YogTeck.',
    h1: 'High-Speed GST Billing & POS Software for Retailers',
    badge: 'RETAIL POS & STORE BILLING',
    heroAnswer: 'YogTeck engineers high-speed, 10-second GST barcode billing software and Point of Sale (POS) suites for retail showrooms, supermarket chains, garment boutiques, and multi-branch commercial merchants across India. Featuring instant barcode scanning, thermal receipt printing, real-time multi-counter synchronization, salesman commission tracking, and automated WhatsApp invoice delivery, our retail billing suite keeps checkout lines moving swiftly. Delivered remotely from our Kanpur software development lab, our retail platforms give store owners complete operational control and lifetime code ownership.',
    overview: 'In high-traffic retail environments, slow billing software directly frustrates customers and creates lost sales during peak commercial hours. Retailers need POS software that performs item lookups in milliseconds, calculates complex promotional discounts automatically, and operates smoothly even during intermittent internet connectivity. YogTeck builds enterprise-grade retail POS systems optimized for rapid counter transactions. Designed with clean keyboard shortcuts and barcode reader integrations, counter operators can generate a compliant GST tax invoice in under 10 seconds. With centralized cloud synchronization, store owners monitor daily sales, cash drawer reconciliations, and inter-store stock transfers from any smartphone or tablet.',
    keyCapabilities: [
      {
        title: '10-Second High-Speed Barcode Billing Engine',
        description: 'Scan item barcodes with handheld or omnidirectional scanners, apply promotional schemes automatically, and print thermal receipts with sub-second latency.',
        architectureDetails: 'Client-side reactive state caching ensuring immediate keystroke and scanner response times even under heavy transaction loads.'
      },
      {
        title: 'Thermal Printer & Multi-Format Receipt Generation',
        description: 'Direct native printing to 2-inch and 3-inch thermal POS receipt printers, standard A4 invoices, and A5 half-page delivery slips.',
        architectureDetails: 'Clean ESC/POS direct printer communication commands for instantaneous receipt paper cutting without browser print dialog lag.'
      },
      {
        title: 'Multi-Branch Real-Time Store Synchronization',
        description: 'Operate multiple retail showrooms across a city or region with centralized inventory visibility, inter-store stock transfers, and unified reporting.',
        architectureDetails: 'Real-time WebSocket data synchronization connecting branch POS terminals with the central cloud reporting database.'
      },
      {
        title: 'Promotional Discounts & Multi-Buy Scheme Rules',
        description: 'Configure automated retail promotions including Buy-X-Get-Y-Free, percentage discounts, bill-value coupon codes, and category clearance markdowns.',
        architectureDetails: 'Deterministic discount evaluation pipeline calculating accurate GST tax allocations across discounted line items.'
      },
      {
        title: 'Salesman Incentive & Shift Cash Drawer Reconciliation',
        description: 'Track counter sales performance by individual sales staff, manage shift handovers, and calculate cashier drawer discrepancies automatically.',
        architectureDetails: 'End-of-shift Z-Report generation summarizing cash, UPI, card, and credit sales alongside variance reconciliation.'
      },
      {
        title: 'Instant WhatsApp Invoice & Digital Receipt Delivery',
        description: 'Provide eco-friendly digital receipts directly to customer WhatsApp numbers, reducing thermal paper costs while capturing repeat customer contacts.',
        architectureDetails: 'Secure WhatsApp Business API integration sending digitally formatted invoice summaries and downloadable PDF links.'
      }
    ],
    workflowStages: [
      {
        stage: '01',
        title: 'Store Inventory Intake & Barcode Tagging',
        details: 'Receive vendor stock, print custom barcode label stickers for non-barcoded items, and set retail selling prices and margins.'
      },
      {
        stage: '02',
        title: 'High-Speed Counter Checkout',
        details: 'Counter staff scan items, apply membership loyalty points or discounts, and select payment mode (UPI, Cash, Card, Credit).'
      },
      {
        stage: '03',
        title: 'Receipt Printing & WhatsApp Dispatch',
        details: 'Thermal printer prints receipt instantly while an electronic PDF invoice is sent to the customer WhatsApp number.'
      },
      {
        stage: '04',
        title: 'Shift Closure & Real-Time Sync',
        details: 'Cashier reconciles cash drawer at shift end; store manager reviews daily gross margins and reorder alerts remotely.'
      }
    ],
    citiesServedSection: {
      title: 'Serving Retail Showrooms Across India Remotely',
      description: 'We serve retail showroom and store owners across Jaipur, Indore, Ahmedabad, Kanpur, and Pune remotely from our Kanpur office. Our registered physical development office is at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, UP 208015. We configure hardware remotely, assist with barcode scanner calibration, and train store staff via scheduled video onboarding.',
      citiesList: ['Kanpur', 'Lucknow', 'Jaipur', 'Indore', 'Ahmedabad', 'Pune', 'Faridabad']
    },
    technicalSpecs: [
      { label: 'POS Architecture', value: 'High-speed cloud and hybrid offline-capable retail terminal' },
      { label: 'Supported Hardware', value: 'USB/Bluetooth thermal receipt printers, 1D/2D barcode scanners, cash drawers' },
      { label: 'Payment Gateway', value: 'Dynamic UPI QR code generation (PhonePe, Google Pay, Paytm) on counter screens' },
      { label: 'Tax Compliance', value: 'Full GST tax invoice generation with HSN-wise tax breakdown' },
      { label: 'Multi-Terminal Support', value: 'Unlimited billing counters per retail showroom with concurrent stock lock prevention' },
      { label: 'Code Ownership', value: '100% intellectual property ownership, zero recurring SaaS subscription fees' }
    ],
    verifiedCaseNote: 'YogTeck has engineered production enterprise systems including the real estate plot ERP for MMR Construction and wholesale inventory platforms for Yogkart, applying high-reliability engineering across all commercial software products.',
    faqs: [
      {
        question: 'How fast is billing on YogTeck retail software during peak hours?',
        answer: 'Our billing engine is built for maximum counter speed. An experienced cashier can scan items, accept a UPI or cash payment, and print a thermal receipt in under 10 seconds. Keyboard shortcuts allow full counter operation without touching the mouse.'
      },
      {
        question: 'Does the software work with our existing thermal printer and barcode scanner?',
        answer: 'Yes. YogTeck retail software is compatible with all standard USB, Ethernet, and Bluetooth thermal printers (2-inch and 3-inch, including TVS, Citizen, Epson, and thermal POS brands) as well as all 1D/2D handheld and omnidirectional laser barcode scanners.'
      },
      {
        question: 'How do you serve retail clients in cities outside Kanpur remotely?',
        answer: 'We serve retail clients remotely from our Kanpur office. Through remote screen-sharing tools and video calls, our engineers connect your thermal printers, calibrate barcode label printers, import your product master spreadsheets, and train your cashiers.'
      },
      {
        question: 'Can we track sales performance and commissions for individual sales staff?',
        answer: 'Yes. Cashiers can assign specific sales representatives to each bill or line item. The system calculates individual sales volume, achieved targets, and commission incentives automatically in daily and monthly reports.'
      },
      {
        question: 'Can the software send PDF bills directly to customer WhatsApp numbers?',
        answer: 'Yes. Upon finalizing any sale, the system can instantly transmit a formal GST-compliant PDF invoice and polite thank-you message to the customer WhatsApp number, saving paper costs and building customer loyalty.'
      },
      {
        question: 'What happens if our internet connection drops temporarily in the shop?',
        answer: 'Our retail POS includes local offline buffering capabilities. Counter staff can continue scanning items and printing receipts locally; once internet connectivity restores, the system synchronizes all transaction records with the cloud database automatically.'
      }
    ]
  },

  'erp-for-pharma-distributors': {
    slug: 'erp-for-pharma-distributors',
    metaTitle: 'Pharma Distributor ERP & Billing Software | YogTeck',
    metaDescription: 'Specialized cloud ERP for pharmaceutical distributors and stockists. Batch number tracking, expiry FIFO alerts & cold-chain logs by YogTeck.',
    h1: 'Cloud ERP Software for Pharmaceutical Distributors & Stockists',
    badge: 'PHARMA DISTRIBUTION & WHOLESALE',
    heroAnswer: 'YogTeck engineers specialized cloud ERP systems and statutory billing software for pharmaceutical distributors, wholesale stockists, and C&F carrying agents across India. Our pharmaceutical distribution platform automates mandatory drug license verification, batch-wise expiry tracking with near-expiry alerts, cold-chain temperature logs, chemist order booking, and automated GST pharmaceutical invoicing. Delivered remotely from our Kanpur software development office, our pharmaceutical software ensures absolute regulatory compliance, eliminates expired drug losses, and provides lifetime source code ownership.',
    overview: 'Pharmaceutical distribution is one of the most strictly regulated commercial sectors in India, requiring stringent compliance with the Drugs and Cosmetics Act, mandatory batch number serialization, and real-time drug license validation. Handling thousands of pharmaceutical SKUs across multiple manufacturers while monitoring refrigerated storage requirements and near-expiry stock returns presents immense operational risk. YogTeck builds high-integrity pharmaceutical ERP systems tailored to wholesale medicine stockists and distributors. From automated sales restriction when a chemist drug license has expired to FIFO stock picking and breakages/damage claim management, our platform ensures your distribution hub operates with complete legal compliance and maximum financial clarity.',
    keyCapabilities: [
      {
        title: 'Drug License Number Validation & Automatic Bill Lock',
        description: 'Maintain Form 20B/21B wholesale and retail drug license records per chemist account with automated billing blocks upon license expiration.',
        architectureDetails: 'Statutory compliance validation engine executing pre-transaction authorization checks on every chemist order.'
      },
      {
        title: 'Batch Number Serialization & Near-Expiry Alert Radar',
        description: 'Track medicines down to individual manufacturer batch numbers, manufacturing dates, and expiry dates with configurable 30/60/90-day alert dashboards.',
        architectureDetails: 'Granular batch ledger preventing counter staff from issuing expired or quarantined medication batches.'
      },
      {
        title: 'Cold-Chain Storage Monitoring & Temperature Logs',
        description: 'Log and track temperature compliance for biologicals, vaccines, and insulin products during warehouse storage and transport transit dispatch.',
        architectureDetails: 'Configurable temperature audit trails attached to dispatch challans for regulatory verification.'
      },
      {
        title: 'Chemist Order Consolidation & Rapid Route Dispatch',
        description: 'Consolidate multiple chemist orders across delivery routes, generate optimized godown pick lists, and produce transporter packing slips.',
        architectureDetails: 'Automated order grouping engine grouping delivery routes to minimize delivery vehicle transit times.'
      },
      {
        title: 'Pharma Manufacturer Free Scheme & Discount Management',
        description: 'Automate complex pharmaceutical pricing schemes including 10+1 free, trade discount percentages, cash discount tiers, and special manufacturer rate contracts.',
        architectureDetails: 'Scheme calculation engine executing tiered discount rules while maintaining statutory GST tax compliance on taxable values.'
      },
      {
        title: 'Expiry & Breakage Return Claim Processing',
        description: 'Manage reverse logistics for expired and damaged medicines returned by chemists, generate credit notes, and compile manufacturer debit claims.',
        architectureDetails: 'Segregated quarantine warehouse location tracking to isolate expired medicine returns from active sellable inventory.'
      }
    ],
    workflowStages: [
      {
        stage: '01',
        title: 'Manufacturer Inward & Batch Inspection',
        details: 'Receive stock from pharmaceutical manufacturers, verify batch numbers, manufacturing/expiry dates, and cold-chain compliance before binning.'
      },
      {
        stage: '02',
        title: 'Chemist Order Booking & License Check',
        details: 'Orders are booked via counter or field reps; system checks the chemist drug license validity and outstanding credit limit automatically.'
      },
      {
        stage: '03',
        title: 'FIFO Batch Allocation & Dispatch Packing',
        details: 'System allocates the oldest valid batch (FIFO), generates pick lists for godown staff, and prints route-wise delivery manifests.'
      },
      {
        stage: '04',
        title: 'Statutory Invoicing & Reverse Claims',
        details: 'GST invoice is finalized with complete HSN and batch information; returns for expired medicines are tracked in quarantine ledgers.'
      }
    ],
    citiesServedSection: {
      title: 'Serving Pharma Distribution Hubs Across India Remotely',
      description: 'We serve pharmaceutical distributors and wholesale medicine stockists across Jaipur, Indore, Ahmedabad, Kanpur, and Pune remotely from our Kanpur office. Our registered development center is situated at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, UP 208015. We provide complete remote setup, historical medicine master migration from Busy or Tally, and dedicated staff video onboarding.',
      citiesList: ['Kanpur', 'Lucknow', 'Indore', 'Ahmedabad', 'Chandigarh', 'Jaipur', 'Pune']
    },
    technicalSpecs: [
      { label: 'Regulatory Compliance', value: 'Drugs & Cosmetics Act compliant, automated Form 20B/21B validation' },
      { label: 'Inventory Architecture', value: 'Mandatory batch serialization with strict FIFO / FEFO automated allocation' },
      { label: 'Database Engine', value: 'PostgreSQL with immutable audit logging for regulatory inspections' },
      { label: 'Billing Formats', value: 'High-speed wholesale tax invoice printing with batch, expiry, and HSN breakdown' },
      { label: 'Data Migration', value: 'Automated import of chemist directories and medicine masters from legacy software' },
      { label: 'IP Ownership', value: '100% complete source code ownership, zero monthly vendor subscription lock-in' }
    ],
    verifiedCaseNote: 'YogTeck has delivered mission-critical ERP platforms including the civil construction ERP for MMR Construction and high-speed catalogs for Techno Racks, bringing proven enterprise architecture to pharmaceutical distribution.',
    faqs: [
      {
        question: 'Does the software automatically block billing if a chemist drug license has expired?',
        answer: 'Yes. In full compliance with drug licensing regulations, our software tracks the expiry date of wholesale and retail drug licenses (Form 20B/21B) for every chemist. If a license expires, the system automatically locks the chemist account and prevents sales bill generation until updated license documents are approved.'
      },
      {
        question: 'How does the software handle near-expiry pharmaceutical stock?',
        answer: 'Our pharmaceutical ERP provides a proactive near-expiry alert dashboard categorized by 30, 60, and 90 days. It uses First-Expiry, First-Out (FEFO) logic to ensure older batches are automatically selected for dispatch first, significantly minimizing expired stock losses.'
      },
      {
        question: 'Can the ERP calculate complex pharmaceutical free schemes (e.g. 10+1, 20+2)?',
        answer: 'Yes. You can configure manufacturer-specific promotional schemes such as quantity free items (10+1 free, 100+12 free), special trade discounts, and cash discount percentages. The system calculates statutory GST accurately on the taxable value according to Indian tax rules.'
      },
      {
        question: 'How do you serve pharmaceutical distributors in other states remotely from Kanpur?',
        answer: 'We serve pharmaceutical distributors remotely from our Kanpur office. Our senior software engineers conduct video discovery sessions, migrate your chemist ledgers and medicine item masters from your existing software, and train your staff remotely with step-by-step video sessions.'
      },
      {
        question: 'How does the software manage expiry returns and credit notes from chemists?',
        answer: 'The system includes a dedicated expiry and damage return module. When a chemist returns near-expiry or expired medicine, it is placed into a quarantine stock location (preventing accidental resale), and a statutory credit note is issued with complete batch traceability.'
      },
      {
        question: 'Do we receive full source code ownership for our pharmaceutical ERP?',
        answer: 'Yes. YogTeck delivers complete intellectual property ownership, database credentials, and production source code upon project sign-off. You are never dependent on ongoing SaaS software subscriptions.'
      }
    ]
  }
};
