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
    id: 'ecommerce',
    slug: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    shortDesc: 'Sell online & grow globally',
    fullDesc: 'End-to-end online storefronts equipped with secure checkout, automated inventory sync, payment gateways, and shipping integrations.',
    icon: 'cart',
    badge: 'High ROI',
    features: ['Secure Payment Gateways', 'Inventory & Order Tracking', 'Discount & Coupon Engines', 'Mobile-First Shopping UX']
  },
  {
    id: 'erp',
    slug: 'erp-solutions',
    title: 'ERP Solutions',
    shortDesc: 'Streamline your business operations',
    fullDesc: 'Unified Enterprise Resource Planning platforms to manage accounts, stock inventory, employee payroll, and supplier lifecycles.',
    icon: 'gear',
    features: ['Real-Time Stock Management', 'Financial & Invoice Automation', 'Multi-Branch Support', 'Role-Based Access Control']
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing-seo',
    title: 'Digital Marketing & SEO',
    shortDesc: 'More visibility & higher revenue',
    fullDesc: 'Performance marketing, search engine optimization (SEO), social media campaigns, and Google Ads designed to drive qualified buyer leads.',
    icon: 'target',
    badge: 'Growth Engine',
    features: ['Local & National SEO', 'Google Ads (Search & Display)', 'Meta & Social Ads', 'Conversion Rate Optimization']
  },
  {
    id: 'custom-software',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortDesc: 'Tailored software for complex workflows',
    fullDesc: 'Tailored cloud applications, portals, and enterprise software tailored specifically to solve your organization’s unique operational challenges.',
    icon: 'code',
    features: ['API Integrations & Webhooks', 'Automated Workflows', 'Cloud Scalability', 'Dedicated SLA Support']
  },
  {
    id: 'mlm',
    slug: 'mlm-solutions',
    title: 'MLM Solutions',
    shortDesc: 'Scalable network & direct selling platforms',
    fullDesc: 'Robust multi-level marketing and affiliate distribution software supporting binary, matrix, generation plans, and payout automation.',
    icon: 'network',
    features: ['Dynamic Genealogy Trees', 'Automated Payout Calculators', 'E-Pin & E-Wallet Modules', 'Mobile App Integration']
  },
  {
    id: 'saas',
    slug: 'saas-solutions',
    title: 'SaaS Solutions',
    shortDesc: 'Cloud-native multi-tenant SaaS products',
    fullDesc: 'Scalable Software-as-a-Service platforms featuring recurring billing, subscription tiers, multi-tenancy, and deep analytics.',
    icon: 'cloud-sparkle',
    features: ['Subscription Management', 'Multi-Tenant Security', 'Self-Serve Onboarding', 'Real-Time Telemetry']
  },
  {
    id: 'sales-service',
    slug: 'sales-service-solutions',
    title: 'Sales & Service Solutions',
    shortDesc: 'Automated CRM, helpdesk & sales pipelines',
    fullDesc: 'Lead management CRM, field service automation, ticketing helpdesks, and customer feedback loops to accelerate revenue.',
    icon: 'headset',
    features: ['Lead Capture & Scoring', 'Ticket Dispatch & Tracking', 'Omnichannel Inboxes', 'Executive Sales Dashboard']
  }
];
