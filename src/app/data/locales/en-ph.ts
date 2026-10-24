import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const enPhDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'en-ph',
    language: 'English',
    country: 'Philippines',
    needsReview: false,
    lastUpdated: '2026-10-24'
  },
  seo: {
    title: 'Custom Software Development & Web App Solutions Philippines | YOGTECK',
    description: 'Trusted software development agency in the Philippines. Custom web applications, cloud business systems, ERP tools, and mobile application engineering.',
    keywords: 'custom software development philippines, software development company manila, web application development philippines, business software solutions'
  },
  hero: {
    ...enDictionary.hero,
    badge: 'Technology Partner for Philippine Enterprises & SMEs',
    titleLine2Highlight: 'Accelerate Digital Growth in PH',
    subcopy: 'YOGTECK delivers dependable custom software engineering, cloud database systems, enterprise ERP suites, and high-performance web applications in the Philippines.'
  },
  services: {
    ...enDictionary.services,
    items: {
      ...enDictionary.services.items,
      billingTitle: 'BIR-Compliant Invoicing & Billing Systems',
      billingDesc: 'Automated VAT invoicing, thermal receipt integration, sales ledger tracking, and GCash/Maya and credit card checkout processing.',
      seoTitle: 'Technical SEO & Search Visibility Growth',
      seoDesc: 'Core Web Vitals optimization, semantic schema data, and organic search ranking acceleration for competitive business search terms.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'PHP'
  }
};
