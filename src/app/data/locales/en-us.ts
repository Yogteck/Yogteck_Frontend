import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const enUsDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'en-us',
    language: 'English',
    country: 'United States',
    needsReview: false,
    lastUpdated: '2026-10-12'
  },
  seo: {
    title: 'ERP Software Development & Custom SaaS Solutions USA | YOGTECK',
    description: 'Top ERP software development company for USA businesses. Custom SaaS engineering, web development, and cloud solutions engineered by YOGTECK.',
    keywords: 'ERP software development company USA, custom SaaS development United States, cloud ERP USA, web development company for US businesses, software engineering agency'
  },
  hero: {
    ...enDictionary.hero,
    badge: 'Your Engineering & Growth Partner in the US',
    titleLine2Highlight: 'Scale Across the US',
    subcopy: 'YOGTECK delivers full-cycle IT engineering, custom cloud software, modern web platforms, ERP systems, and e-commerce architectures tailored for US enterprises.'
  },
  services: {
    ...enDictionary.services,
    items: {
      ...enDictionary.services.items,
      billingTitle: 'Invoicing & Sales Tax-Compliant Billing Software',
      billingDesc: 'Automated recurring billing, multi-state US sales tax compliance, Stripe and ACH integration, and real-time ledger synchronization.',
      seoTitle: 'Search Engine Optimization & US Growth Marketing',
      seoDesc: 'Data-driven search engine optimization, technical crawl audits, schema markup, and organic search ranking acceleration for US markets.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'USD'
  }
};
