export interface FeatureStripItem {
  id: string;
  title: string;
  icon: string;
  link: string;
  isActiveDefault?: boolean;
  highlightBadge?: string;
}

export const FEATURE_STRIP_ITEMS: FeatureStripItem[] = [
  {
    id: 'feat-web',
    title: 'Website Development',
    icon: 'globe',
    link: '#website-development',
    isActiveDefault: true
  },
  {
    id: 'feat-ecom',
    title: 'E-Commerce Solutions',
    icon: 'cart',
    link: '#ecommerce-solutions'
  },
  {
    id: 'feat-erp',
    title: 'ERP Solutions',
    icon: 'gear',
    link: '#erp-solutions'
  },
  {
    id: 'feat-software',
    title: 'Custom Software Development',
    icon: 'code',
    link: '#custom-software-development'
  },
  {
    id: 'feat-marketing',
    title: 'Digital Marketing & SEO',
    icon: 'target',
    link: '#digital-marketing-seo'
  },
  {
    id: 'feat-hosting',
    title: 'Domain + Hosting (Free)',
    icon: 'cloud',
    link: '#contact',
    highlightBadge: 'FREE'
  }
];
