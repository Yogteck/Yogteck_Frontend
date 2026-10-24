import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const deDeDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'de-de',
    language: 'Deutsch',
    country: 'Deutschland',
    needsReview: false,
    lastUpdated: '2026-10-24'
  },
  seo: {
    title: 'Individuelle Softwareentwicklung & Cloud-ERP-Lösungen Deutschland | YOGTECK',
    description: 'Führendes Unternehmen für individuelle Softwareentwicklung, moderne Webanwendungen, Cloud-ERP-Systeme und dedizierte Entwicklerteams.',
    keywords: 'individuelle softwareentwicklung deutschland, software development company europe, web anwendungsentwicklung, cloud erp software, software outsourcing partner'
  },
  hero: {
    ...enDictionary.hero,
    badge: 'Ihr Engineering- und Technologiepartner in Deutschland & Europa',
    titleLine1: 'Individuelle Software & Cloud-Plattformen',
    titleLine2Highlight: 'Digitales Wachstum in Deutschland',
    subcopy: 'YOGTECK entwickelt maßgeschneiderte Unternehmenssoftware, Cloud-ERP-Plattformen, blitzschnelle Webanwendungen und skalierbare IT-Systeme für den deutschen Markt.'
  },
  services: {
    ...enDictionary.services,
    heading: 'Unsere Kernlösungen',
    lead: 'Maßgeschneiderte Softwareentwicklung für höchste deutsche Qualitätsstandards',
    items: {
      ...enDictionary.services.items,
      billingTitle: 'GoBD- und MwSt-konforme Abrechnungssoftware',
      billingDesc: 'Automatisierte Rechnungsstellung, Mehrwertsteuerberechnungen, SEPA- und Stripe-Integration sowie revisionssichere Buchhaltung.',
      seoTitle: 'Technisches SEO & Digitale Wachstumsstrategien',
      seoDesc: 'Data-driven Suchmaschinenoptimierung, Schema-Markup, Sub-Sekunden-Ladezeiten und nachhaltige Sichtbarkeit auf Google Deutschland.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'EUR'
  }
};
