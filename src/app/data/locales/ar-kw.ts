import { LocaleDictionary } from './locale-strings.interface';
import { arSaDictionary } from './ar-sa';

export const arKwDictionary: LocaleDictionary = {
  ...arSaDictionary,
  _meta: {
    locale: 'ar-kw',
    language: 'العربية',
    country: 'دولة الكويت',
    needsReview: true,
    lastUpdated: '2026-10-12'
  },
  seo: {
    title: 'شركة تطوير برمجيات وأنظمة ERP سحابية في الكويت | YOGTECK',
    description: 'تطوير حلول برمجية متقدمة وأنظمة ERP وتطبيقات ويب وتجارة إلكترونية للشركات والمؤسسات في دولة الكويت والخليج العربي.',
    keywords: 'شركة برمجيات الكويت, تطوير نظام ERP الكويت, حلول برمجية مدينة الكويت, برمجة تطبيقات الهواتف الذكية, YOGTECK'
  },
  hero: {
    ...arSaDictionary.hero,
    badge: 'شريككم التقني الموثوق في دولة الكويت',
    titleLine2Highlight: 'التوسع في الكويت والخليج',
    subcopy: 'تقدم YOGTECK برمجيات سحابية متقدمة، وأنظمة ERP مخصصة، ومنصات ويب وتجارة إلكترونية عالية الكفاءة تلبي احتياجات الشركات الرائدة بدولة الكويت.'
  },
  services: {
    ...arSaDictionary.services,
    items: {
      ...arSaDictionary.services.items,
      billingTitle: 'أنظمة الفواتير ونقاط البيع POS في الكويت',
      billingDesc: 'حلول فوترة آلية متكاملة بالدينار الكويتي، متوافقة مع متطلبات المدفوعات والربط مع شبكة كي نت (K-Net) ونقاط البيع.'
    }
  },
  common: {
    ...arSaDictionary.common,
    currency: 'KWD'
  }
};
