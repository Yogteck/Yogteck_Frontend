import { LocaleDictionary } from './locale-strings.interface';
import { arSaDictionary } from './ar-sa';

export const arBhDictionary: LocaleDictionary = {
  ...arSaDictionary,
  _meta: {
    locale: 'ar-bh',
    language: 'العربية',
    country: 'مملكة البحرين',
    needsReview: true,
    lastUpdated: '2026-10-12'
  },
  seo: {
    title: 'شركة تطوير برمجيات وحلول سحابية في البحرين | YOGTECK',
    description: 'تطوير أنظمة ERP سحابية، برمجيات مخصصة، تطبيقات ويب وهواتف ذكية متوافقة مع متطلبات ضريبة القيمة المضافة في مملكة البحرين والخليج.',
    keywords: 'شركة برمجة البحرين, تطوير أنظمة ERP المنامة, حلول برمجية البحرين, برمجة تطبيقات الويب والجوّال, YOGTECK'
  },
  hero: {
    ...arSaDictionary.hero,
    badge: 'شريككم التقني الموثوق في مملكة البحرين',
    titleLine2Highlight: 'الريادة الرقمية في البحرين',
    subcopy: 'تقدم YOGTECK حلولاً سحابية متطورة، وأنظمة ERP مخصصة، ومنصات تجارة إلكترونية مبتكرة تدعم نجاح ونمو الأعمال في مملكة البحرين.'
  },
  services: {
    ...arSaDictionary.services,
    items: {
      ...arSaDictionary.services.items,
      billingTitle: 'الفواتير ونقاط البيع المتوافقة مع ضريبة القيمة المضافة (البحرين)',
      billingDesc: 'حلول فوترة آلية متوافقة مع متطلبات الجهاز الوطني للإيرادات (NBR) في البحرين ونقاط البيع الرقمية وبوابات الدفع.'
    }
  },
  common: {
    ...arSaDictionary.common,
    currency: 'BHD'
  }
};
