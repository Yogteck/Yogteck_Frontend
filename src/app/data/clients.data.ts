export interface ClientItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  initials: string;
  accentColor: string;
  description: string;
}

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: 'mmr-constructions',
    name: 'MMR Constructions and Developer Private Limited',
    shortName: 'MMR Constructions',
    category: 'Real Estate & Infrastructure',
    initials: 'MMR',
    accentColor: '#FF9A1F',
    description: 'Enterprise corporate web portal & project portfolio showcasing premier commercial and residential developments.'
  },
  {
    id: 'yogkart-healthcare',
    name: 'Yogkart Healthcare Private Limited',
    shortName: 'Yogkart Healthcare',
    category: 'Healthcare & E-Commerce',
    initials: 'YK',
    accentColor: '#2F7BFF',
    description: 'Scalable e-commerce and health wellness platform serving verified healthcare products pan-India.'
  },
  {
    id: 'business-web-solutions',
    name: 'Business Web Solutions',
    shortName: 'Business Web Solutions',
    category: 'IT & Digital Consulting',
    initials: 'BWS',
    accentColor: '#10B981',
    description: 'Digital consulting agency partnering on cloud architecture, client portals, and performance optimization.'
  }
];
