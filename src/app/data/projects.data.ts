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
  image?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-healthcare-ecom',
    title: 'Yogkart Healthcare Pan-India Store',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Platform',
    client: 'Yogkart Healthcare Pvt Ltd',
    summary: 'Direct-to-consumer pharmacy & healthcare e-commerce with multi-warehouse inventory, prescription upload, and instant payment checkout.',
    metrics: 'Multi-Warehouse Inventory & Secure Checkout',
    tags: ['E-Commerce', 'Payment Gateway', 'Inventory Sync', 'Mobile App'],
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
    icon: 'cart',
    image: '/assets/images/projects/yogkart-healthcare.png'
  },
  {
    id: 'proj-mmr-portal',
    title: 'MMR Corporate & Infrastructure Portal',
    category: 'web',
    categoryLabel: 'Corporate Web Portal',
    client: 'MMR Constructions & Developer Pvt Ltd',
    summary: 'High-performance interactive portal featuring project walkthroughs, floor plan downloads, and direct investor enquiry routing.',
    metrics: 'Plot Management & Investor Showcase',
    tags: ['Corporate Portal', 'Fast Load', 'Lead Generation', 'SEO'],
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    icon: 'globe',
    image: '/assets/images/projects/mmr-constructions.png'
  },
  {
    id: 'proj-techno-racks',
    title: 'Techno Racks Industrial Web Catalog',
    category: 'web',
    categoryLabel: 'Industrial Web Portal',
    client: 'Techno Racks',
    summary: 'Technical storage systems catalog with load capacity specs and direct RFQ inquiry submission for warehousing facilities across India.',
    metrics: 'Technical Catalog & RFQ Engine',
    tags: ['Industrial Catalog', 'RFQ Engine', 'Responsive Web', 'Technical SEO'],
    gradient: 'linear-gradient(135deg, #0B1B3A 0%, #1E3A8A 100%)',
    icon: 'gear',
    image: '/assets/images/projects/techno-racks.png'
  }
];
