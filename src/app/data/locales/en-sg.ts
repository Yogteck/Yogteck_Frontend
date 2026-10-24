import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const enSgDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'en-sg',
    language: 'English',
    country: 'Singapore',
    needsReview: false,
    lastUpdated: '2026-10-24'
  },
  seo: {
    title: 'Custom Software Development & Cloud ERP Solutions Singapore | YOGTECK',
    description: 'Leading software development company for Singapore & Southeast Asia. Custom web platforms, SaaS engineering, enterprise ERP, and workflow automation.',
    keywords: 'custom software development company singapore, enterprise ERP singapore, software engineering partner singapore, bespoke software development southeast asia'
  },
  hero: {
    ...enDictionary.hero,
    badge: 'Enterprise Software Partner for Singapore & ASEAN',
    titleLine2Highlight: 'Scale Across Singapore & Asia',
    subcopy: 'YOGTECK engineers high-speed web platforms, cloud ERP architectures, custom SaaS systems, and digital automation tools for forward-thinking Singapore enterprises.'
  },
  services: {
    ...enDictionary.services,
    items: {
      ...enDictionary.services.items,
      billingTitle: 'GST Invoicing & Multi-Currency Billing Software',
      billingDesc: 'IRAS-compliant GST calculations, multi-currency invoicing, PayNow and Stripe payment workflows, and automated executive accounting.',
      seoTitle: 'Enterprise SEO & Southeast Asia Digital Growth',
      seoDesc: 'Technical SEO audits, high-performance web optimization, and multi-regional search engine visibility across Singapore and the Asia-Pacific region.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'SGD'
  }
};
