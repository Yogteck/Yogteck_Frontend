import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const enCaDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'en-ca',
    language: 'English',
    country: 'Canada',
    needsReview: false,
    lastUpdated: '2026-10-12'
  },
  seo: {
    title: 'Custom Software & Cloud ERP Development Canada | YOGTECK',
    description: 'Premier custom software engineering and cloud ERP development for Canadian businesses. Bilingual-ready architectures, GST/HST/PST compliant billing.',
    keywords: 'software development company Canada, cloud ERP solutions Canada, web application development Toronto Vancouver, Canadian custom software engineering'
  },
  hero: {
    ...enDictionary.hero,
    badge: 'Your Technology Partner Across Canada',
    titleLine2Highlight: 'Scale Across Canada',
    subcopy: 'YOGTECK engineers robust cloud software, modern web platforms, ERP systems, and e-commerce architectures tailored for Canadian enterprises from Toronto to Vancouver.'
  },
  services: {
    ...enDictionary.services,
    items: {
      ...enDictionary.services.items,
      billingTitle: 'Invoicing & Tax-Compliant Billing (GST, HST, PST)',
      billingDesc: 'Automated bilingual invoicing, federal GST/HST and provincial PST tax compliance, payment gateway integration, and multi-currency accounting.',
      seoTitle: 'Search Engine Optimisation & Canadian Market Growth',
      seoDesc: 'Data-driven search engine optimisation, bilingual technical audits, schema markup, and organic search ranking acceleration across Canada.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'CAD'
  }
};
