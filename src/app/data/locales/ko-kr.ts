import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';

export const koKrDictionary: LocaleDictionary = {
  ...enDictionary,
  _meta: {
    locale: 'ko-kr',
    language: '한국어',
    country: '대한민국',
    needsReview: false,
    lastUpdated: '2026-10-24'
  },
  seo: {
    title: '맞춤형 소프트웨어 개발 및 클라우드 ERP 솔루션 한국 | YOGTECK',
    description: '기업 맞춤형 소프트웨어 개발, 클라우드 ERP 시스템 구축, 고성능 웹 애플리케이션 및 모바일 앱 엔지니어링 전문 기업 YOGTECK.',
    keywords: '맞춤형 소프트웨어 개발, 클라우드 ERP 한국, 기업용 웹 애플리케이션 개발, 소프트웨어 아웃소싱 파트너, SaaS 플랫폼 개발'
  },
  hero: {
    ...enDictionary.hero,
    badge: '한국 기업을 위한 맞춤형 소프트웨어 및 클라우드 엔지니어링 파트너',
    titleLine1: '엔터프라이즈 맞춤형 소프트웨어 및 ERP',
    titleLine2Highlight: '한국 및 글로벌 시장 혁신',
    subcopy: 'YOGTECK은 제조, 리테일, 부동산 및 IT 기업을 위한 고성능 클라우드 ERP, 맞춤형 SaaS 플랫폼, 차세대 웹 솔루션을 엔지니어링합니다.'
  },
  services: {
    ...enDictionary.services,
    heading: '핵심 소프트웨어 솔루션',
    lead: '비즈니스 워크플로우에 최적화된 맞춤형 엔지니어링',
    items: {
      ...enDictionary.services.items,
      billingTitle: '전자세금계산서 및 맞춤형 결제 청구 소프트웨어',
      billingDesc: '기업용 반복 결제, 다중 통화 지원, 토스페이먼츠 및 글로벌 Stripe 연동, 자동 회계 대사.',
      seoTitle: '테크니컬 SEO 및 네이버·구글 검색 최적화',
      seoDesc: 'Core Web Vitals 최적화, 구조화된 Schema.org 데이터, 구글 및 네이버 검색 가시성 극대화.'
    }
  },
  common: {
    ...enDictionary.common,
    currency: 'KRW'
  }
};
