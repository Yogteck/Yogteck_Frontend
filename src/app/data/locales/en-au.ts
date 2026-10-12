import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const enAuDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'en-au',
    language: 'English',
    country: 'Australia',
    needsReview: false,
    lastUpdated: '2026-10-12'
  },
  seo: {
    title: 'SaaS Development & Cloud ERP Solutions Australia | YOGTECK',
    description: 'Specialist SaaS development and cloud ERP engineering for Australian businesses. Web applications, e-commerce, and Australian GST compliant billing.',
    keywords: 'SaaS development Australia, ERP software Sydney Melbourne, custom software engineering Australia, web development company Australia, YOGTECK'
  },
  hero: {
    ...enDictionary.hero,
    badge: 'Your Technology Engineering Partner in Australia',
    titleLine2Highlight: 'Scale Across Australia',
    subcopy: 'YOGTECK engineers scalable cloud software, enterprise ERP, web platforms, and mobile apps for high-growth Australian businesses from Sydney to Melbourne.'
  },
  services: {
    ...enDictionary.services,
    items: {
      ...enDictionary.services.items,
      billingTitle: 'Invoicing & Australian GST-Compliant Billing',
      billingDesc: 'Automated recurring invoicing, Australian GST tax compliance, BPAY and Stripe integration, and real-time reconciliation.',
      seoTitle: 'Search Engine Optimisation & Australian Market Growth',
      seoDesc: 'Data-driven search engine optimisation, technical crawl audits, schema markup, and organic search ranking acceleration across Australian capital cities.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'AUD'
  }
};
