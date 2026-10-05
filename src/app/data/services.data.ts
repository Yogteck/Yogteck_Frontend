export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  badge?: string;
  features: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-dev',
    slug: 'website-development',
    title: 'Website Development',
    shortDesc: 'Modern & responsive websites',
    fullDesc: 'High-speed, SEO-optimized business websites and high-converting landing pages built on modern architectures with zero lag.',
    icon: 'globe',
    badge: 'Popular',
    features: ['Custom UI/UX Design', '100% Mobile Responsive', 'Fast Page Load Speed', 'Free Domain & Cloud Hosting*']
  },
  {
    id: 'custom-software',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortDesc: 'Tailored software for complex workflows',
    fullDesc: 'Tailored cloud applications, portals, and enterprise software designed specifically to solve your organization’s unique operational challenges.',
    icon: 'code',
    features: ['API Integrations & Webhooks', 'Automated Workflows', 'Cloud Scalability', 'Dedicated SLA Support']
  },
  {
    id: 'mobile-app',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDesc: 'High-performance Android & iOS apps',
    fullDesc: 'Intuitive native and cross-platform Flutter/React Native mobile applications with real-time backend synchronization.',
    icon: 'smartphone',
    badge: 'Mobile-First',
    features: ['Android & iOS Apps', 'Instant UPI Payments', 'Push Notifications', 'Offline-First Sync']
  },
  {
    id: 'erp',
    slug: 'erp-software',
    title: 'ERP Software Solutions',
    shortDesc: 'Streamline your business operations',
    fullDesc: 'Unified Enterprise Resource Planning platforms to manage accounts, stock inventory, employee payroll, and supplier lifecycles.',
    icon: 'gear',
    features: ['Real-Time Stock Management', 'Financial & Invoice Automation', 'Multi-Branch Support', 'Role-Based Access Control']
  },
  {
    id: 'billing',
    slug: 'billing-software',
    title: 'Billing & Invoicing Software',
    shortDesc: '10-second GST billing & POS',
    fullDesc: 'Lightning-fast retail POS and wholesale billing software with barcode scanning, WhatsApp receipts, and GST tax compliance.',
    icon: 'file-text',
    badge: 'High Speed',
    features: ['10-Second GST Invoices', 'WhatsApp PDF Receipts', 'Barcode Scanning & Printing', 'Customer Udhar Ledger']
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce-development',
    title: 'E-Commerce Development',
    shortDesc: 'Sell online & grow pan-India',
    fullDesc: 'End-to-end online storefronts equipped with secure checkout, automated inventory sync, payment gateways, and shipping integrations.',
    icon: 'cart',
    badge: 'High ROI',
    features: ['Secure Payment Gateways', 'Shiprocket / Courier Sync', 'Discount & Coupon Engines', 'Mobile-First Shopping UX']
  },
  {
    id: 'digital-marketing',
    slug: 'seo-digital-growth',
    title: 'SEO & Digital Growth',
    shortDesc: 'More visibility & higher revenue',
    fullDesc: 'Search engine optimization (SEO), Google Maps ranking, local citation authority, and performance ads to drive qualified buyer leads.',
    icon: 'target',
    badge: 'Growth Engine',
    features: ['Local & National SEO', 'Google Maps (Local Pack)', 'Entity & AI Search SEO', 'Conversion Rate Optimization']
  },
  {
    id: 'sales-service',
    slug: 'business-software',
    title: 'Business Management Software',
    shortDesc: 'Automated CRM, helpdesk & sales pipelines',
    fullDesc: 'Lead management CRM, field service automation, ticketing helpdesks, and customer feedback loops to accelerate revenue.',
    icon: 'headset',
    features: ['Lead Capture & Scoring', 'Ticket Dispatch & Tracking', 'WhatsApp Automation', 'Executive Sales Dashboard']
  }
];
