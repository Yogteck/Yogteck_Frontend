import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const enGbDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'en-gb',
    language: 'English',
    country: 'United Kingdom',
    needsReview: false,
    lastUpdated: '2026-10-24'
  },
  seo: {
    title: 'Bespoke Software Development & Custom Cloud Solutions UK | YOGTECK',
    description: 'Premier bespoke software development company for UK businesses. Enterprise cloud engineering, SaaS platforms, and dedicated software development teams.',
    keywords: 'bespoke software development company uk, custom software development london, enterprise cloud software uk, software engineering partner united kingdom'
  },
  hero: {
    ...enDictionary.hero,
    badge: 'Your Technology & Software Engineering Partner in the UK',
    titleLine2Highlight: 'Scale Across the UK & Europe',
    subcopy: 'YOGTECK delivers bespoke software engineering, enterprise cloud solutions, modern web portals, ERP platforms, and scalable architectures for UK businesses.'
  },
  services: {
    ...enDictionary.services,
    items: {
      ...enDictionary.services.items,
      billingTitle: 'Invoicing & VAT-Compliant Billing Systems',
      billingDesc: 'Automated recurring billing, HMRC-compliant VAT calculations, multi-currency Stripe and BACS integration, and real-time ledger accounting.',
      seoTitle: 'Search Engine Optimisation & UK Digital Growth',
      seoDesc: 'Data-driven search engine optimisation, technical crawl audits, structured schema markup, and organic search ranking acceleration across the UK.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'GBP'
  }
};
