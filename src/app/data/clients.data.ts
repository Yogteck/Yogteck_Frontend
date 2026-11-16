export interface ClientItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  initials: string;
  accentColor: string;
  description: string;
  website?: string;
}

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: 'mmr-constructions',
    name: 'MMR Constructions & Developer Private Limited',
    shortName: 'MMR Constructions',
    category: 'Real Estate & Infrastructure',
    initials: 'MMR',
    accentColor: '#B4654A',
    website: 'https://mmrconstructions.in',
    description: 'Premier residential layouts, commercial developments & township infrastructure web portal with interactive plot showcases (mmrconstructions.in).'
  },
  {
    id: 'akash-racks',
    name: 'Akash Racks',
    shortName: 'Akash Racks',
    category: 'Mall & Store Racks Installation',
    initials: 'AR',
    accentColor: '#1A9C55',
    website: 'https://racks.yogteck.com/',
    description: 'Complete display and storage rack installation solutions for shopping malls, supermarkets, retail grocery stores & commercial warehouses (racks.yogteck.com).'
  },
  {
    id: 'yogcart',
    name: 'Yogcart',
    shortName: 'Yogcart',
    category: 'Consumer & Retail E-Commerce',
    initials: 'YC',
    accentColor: '#B4654A',
    website: 'https://yogcart.com',
    description: 'High-speed omnichannel e-commerce storefront & mobile app with multi-warehouse inventory, instant payment checkout, and live delivery tracking (yogcart.com).'
  },
  {
    id: 'healthandyoga',
    name: 'HealthAndYoga',
    shortName: 'HealthAndYoga',
    category: 'Global Healthcare & Wellness',
    initials: 'HY',
    accentColor: '#2F7BFF',
    website: 'https://healthandyoga.com',
    description: 'International holistic healthcare, yoga wellness supplies & ayurvedic e-commerce portal serving global buyers across multiple currencies (healthandyoga.com).'
  },
  {
    id: 'soulgenie',
    name: 'SoulGenie',
    shortName: 'SoulGenie',
    category: 'International Medical & Wellness Export',
    initials: 'SG',
    accentColor: '#8B5CF6',
    website: 'https://soulgenie.com',
    description: 'Worldwide health, body care & physical therapy equipment export commerce portal with tiered B2B wholesale pricing and international shipping (soulgenie.com).'
  },
  {
    id: 'techashvik',
    name: 'techAshvik',
    shortName: 'techAshvik',
    category: 'Digital Marketing & WhatsApp OTP Tool',
    initials: 'TA',
    accentColor: '#10B981',
    website: 'https://techashvik.com',
    description: 'Cloud-based WhatsApp digital marketing tool, bulk WhatsApp broadcast campaigns, and high-speed transactional WhatsApp OTP verification API (techashvik.com).'
  },
  {
    id: 'yogkart-healthcare',
    name: 'Yogkart Healthcare Private Limited',
    shortName: 'Yogkart Healthcare',
    category: 'Healthcare & E-Commerce',
    initials: 'YK',
    accentColor: '#2F7BFF',
    website: 'https://yogcart.com',
    description: 'Scalable e-commerce and health wellness platform serving verified healthcare products pan-India (yogcart.com).'
  },
  {
    id: 'techno-racks',
    name: 'Techno Racks Storage Systems',
    shortName: 'Techno Racks',
    category: 'Industrial Storage & Mezzanines',
    initials: 'TR',
    accentColor: '#1A9C55',
    website: 'https://racks.yogteck.com/',
    description: 'B2B digital catalog and industrial racking quotation portal engineered for national commercial buyers (racks.yogteck.com).'
  }
];
