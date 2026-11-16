export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'ecommerce' | 'erp' | 'marketing';
  categoryLabel: string;
  client: string;
  website?: string;
  summary: string;
  metrics: string;
  tags: string[];
  gradient: string;
  icon: string;
  image?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-yogcart',
    title: 'Yogcart Omnichannel E-Commerce & Mobile App',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Platform',
    client: 'Yogcart (yogcart.com)',
    website: 'https://yogcart.com',
    summary: 'High-speed consumer e-commerce storefront & mobile app featuring multi-warehouse inventory, real-time cart sync, Razorpay/UPI checkout, automated tax invoicing, and live WhatsApp delivery alerts.',
    metrics: 'Multi-Warehouse Inventory & Instant Checkout',
    tags: ['yogcart.com', 'Mobile App', 'Payment Gateway', 'Live Tracking'],
    gradient: 'linear-gradient(135deg, #18221B 0%, #35473B 100%)',
    icon: 'cart',
    image: '/assets/images/projects/yogkart-healthcare.png'
  },
  {
    id: 'proj-healthandyoga',
    title: 'HealthAndYoga Global Wellness Portal',
    category: 'ecommerce',
    categoryLabel: 'International E-Commerce',
    client: 'HealthAndYoga (healthandyoga.com)',
    website: 'https://healthandyoga.com',
    summary: 'Worldwide holistic healthcare, yoga wellness supplies & ayurvedic e-commerce portal with multi-currency payment processing, automated international freight calculations, and auto AWB dispatch.',
    metrics: 'Global Multi-Currency Checkout & Shipping',
    tags: ['healthandyoga.com', 'Global Commerce', 'Multi-Currency', 'Automated Logistics'],
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
    icon: 'cart'
  },
  {
    id: 'proj-soulgenie',
    title: 'SoulGenie Medical & Wellness Export Store',
    category: 'ecommerce',
    categoryLabel: 'Export E-Commerce Portal',
    client: 'SoulGenie (soulgenie.com)',
    website: 'https://soulgenie.com',
    summary: 'Worldwide physical wellness, medical equipment & health supplies export e-commerce architecture engineered for tiered B2B wholesale pricing, international compliance, and secure cross-border payments.',
    metrics: 'Worldwide B2B & D2C Export Sales',
    tags: ['soulgenie.com', 'Cross-Border Commerce', 'Tiered Wholesale', 'Customs Docs'],
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)',
    icon: 'cart'
  },
  {
    id: 'proj-techashvik',
    title: 'techAshvik WhatsApp Marketing & OTP Automation Tool',
    category: 'marketing',
    categoryLabel: 'WhatsApp Marketing & OTP Platform',
    client: 'techAshvik (techashvik.com)',
    website: 'https://techashvik.com',
    summary: 'Cloud-based WhatsApp marketing tool engineered for high-throughput bulk campaigns, verified transactional WhatsApp OTP delivery APIs, automated customer engagement flows, and real-time delivery reporting.',
    metrics: 'High-Speed WhatsApp Marketing & OTP API',
    tags: ['techashvik.com', 'WhatsApp Marketing', 'WhatsApp OTP', 'API Gateway', 'Marketing Automation'],
    gradient: 'linear-gradient(135deg, #064E3B 0%, #059669 100%)',
    icon: 'chat'
  },
  {
    id: 'proj-mmr-portal',
    title: 'MMR Corporate & Infrastructure Portal',
    category: 'web',
    categoryLabel: 'Real Estate & Infrastructure',
    client: 'MMR Constructions & Developer Private Limited (mmrconstructions.in)',
    website: 'https://mmrconstructions.in',
    summary: 'Enterprise web portal showcasing premier residential townships, commercial complexes, plotting layouts, 3D project walkthroughs, and automated investor enquiry routing.',
    metrics: 'Township Plot Showcase & Lead Generation',
    tags: ['mmrconstructions.in', 'Real Estate', 'Plotting Maps', 'Lead Generation'],
    gradient: 'linear-gradient(135deg, #18221B 0%, #2E3830 100%)',
    icon: 'globe',
    image: '/assets/images/projects/mmr-constructions.png'
  },
  {
    id: 'proj-akash-racks',
    title: 'Akash Racks Store Display & Storage Solutions',
    category: 'web',
    categoryLabel: 'Mall & Store Racks Installation',
    client: 'Akash Racks (racks.yogteck.com)',
    website: 'https://racks.yogteck.com/',
    summary: 'Complete digital catalog & quotation portal for shopping mall display racks, supermarket / grocery store racks, departmental store shelving, and heavy-duty commercial warehouse racking systems.',
    metrics: 'Store & Mall Racking Quotation Portal',
    tags: ['racks.yogteck.com', 'Supermarket Racks', 'Mall Displays', 'Heavy Storage'],
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
    icon: 'gear'
  },
  {
    id: 'proj-techno-racks',
    title: 'Techno Racks Industrial Web Catalog',
    category: 'web',
    categoryLabel: 'Industrial Web Portal',
    client: 'Akash Racks / Techno Racks',
    website: 'https://racks.yogteck.com/',
    summary: 'Technical storage systems catalog with load capacity specs and direct RFQ inquiry submission for warehousing facilities across India.',
    metrics: 'Technical Catalog & RFQ Engine',
    tags: ['Industrial Catalog', 'RFQ Engine', 'Responsive Web', 'Technical SEO'],
    gradient: 'linear-gradient(135deg, #0B1B3A 0%, #1E3A8A 100%)',
    icon: 'gear',
    image: '/assets/images/projects/techno-racks.png'
  }
];
