export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'ecommerce' | 'erp' | 'marketing';
  categoryLabel: string;
  client: string;
  summary: string;
  metrics: string;
  tags: string[];
  gradient: string;
  icon: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-healthcare-ecom',
    title: 'Yogkart Healthcare Pan-India Store',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Platform',
    client: 'Yogkart Healthcare Pvt Ltd',
    summary: 'Direct-to-consumer pharmacy & healthcare ecommerce with multi-warehouse inventory, prescription upload, and instant payment checkout.',
    metrics: '+320% Online Order Growth',
    tags: ['E-Commerce', 'Payment Gateway', 'Inventory Sync', 'Mobile App'],
    gradient: 'linear-gradient(135deg, #0A192F 0%, #172A45 100%)',
    icon: 'cart'
  },
  {
    id: 'proj-mmr-portal',
    title: 'MMR Corporate & Infrastructure Portal',
    category: 'web',
    categoryLabel: 'Corporate Web Portal',
    client: 'MMR Constructions & Developer Pvt Ltd',
    summary: 'High-performance interactive portal featuring 3D project walkthroughs, floor plan downloads, and direct investor enquiry routing.',
    metrics: '99.9% Uptime & 2.4x Lead Inflow',
    tags: ['NextGen Web', 'Fast Load', 'Lead Generation', 'SEO'],
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    icon: 'globe'
  },
  {
    id: 'proj-erp-distribution',
    title: 'Omnichannel ERP & Warehouse Sync',
    category: 'erp',
    categoryLabel: 'ERP & Automation',
    client: 'Business Web Solutions',
    summary: 'Real-time billing, dispatch, GST e-invoicing, and stock allocation across 4 distribution hubs in North India.',
    metrics: '70% Faster Invoice Cycles',
    tags: ['Cloud ERP', 'GST Invoicing', 'Stock Management', 'APIs'],
    gradient: 'linear-gradient(135deg, #0B1B3A 0%, #1E3A8A 100%)',
    icon: 'gear'
  },
  {
    id: 'proj-marketplace-growth',
    title: 'Multi-Marketplace Scale & Ads Engine',
    category: 'marketing',
    categoryLabel: 'Marketplace & Ads',
    client: 'D2C Retail Brand',
    summary: 'Full catalogue onboarding, Buy-Box optimization, and sponsored product ad campaigns on Amazon, Flipkart, and Meesho.',
    metrics: '₹45L+ Monthly GMV Scaled',
    tags: ['Amazon Ads', 'Flipkart Ads', 'Meesho Onboarding', 'SEO'],
    gradient: 'linear-gradient(135deg, #180B26 0%, #2E1065 100%)',
    icon: 'target'
  }
];
