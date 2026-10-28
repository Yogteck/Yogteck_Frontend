import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const enInDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'en-in',
    language: 'English',
    country: 'India',
    needsReview: false,
    lastUpdated: '2026-10-12'
  },
  seo: {
    title: 'IT & Software Company in Kanpur, UP, India | YOGTECK',
    description: 'Yogteck Business Solution is a leading IT & software company in Kanpur delivering custom software, websites, cloud ERP, GST billing & mobile apps across India.',
    keywords: 'it company in kanpur, software company in kanpur, best software company kanpur, website development kanpur, erp software company kanpur, gst billing software kanpur, yogteck'
  },
  hero: {
    ...enDictionary.hero,
    badge: 'Your Growth Partner in India',
    titleLine2Highlight: 'Grow with',
    subcopy: 'Yogteck Business Solution is an IT & software company in Kanpur delivering custom software, modern websites, ERP, e-commerce, and digital business solutions across India.',
    trustExp: 'Professional Engineering Standards',
    trustHosting: 'Free Domain & Cloud Hosting*',
    trustSupport: '100% Dedicated Support'
  },
  services: {
    ...enDictionary.services,
    items: {
      ...enDictionary.services.items,
      billingTitle: 'GST & Retail Billing Software',
      billingDesc: 'Fast barcode billing, GST tax invoice generation, inventory sync, thermal printing, and WhatsApp bill sharing for Indian businesses.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'INR'
  }
};
