export interface LocaleDictionary {
  _meta: {
    locale: string;
    language: string;
    country: string;
    needsReview: boolean;
    lastUpdated: string;
  };

  seo: {
    title: string;
    description: string;
    keywords: string;
  };

  nav: {
    home: string;
    services: string;
    growthJourney: string;
    projects: string;
    clients: string;
    locations: string;
    about: string;
    contact: string;
    getQuoteBtn: string;
    callNow: string;
    selectLanguage: string;
  };

  hero: {
    badge: string;
    titleLine1: string;
    titleLine2Prefix: string;
    titleLine2Highlight: string;
    titleLine2Suffix: string;
    brandName: string;
    subcopy: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustExp: string;
    trustHosting: string;
    trustSupport: string;
    cubes: {
      erp: string;
      saas: string;
      crm: string;
      pos: string;
    };
    orbitTags: string[]; // 6 orbiting pill tags: Cloud, API, E-commerce, Billing, Mobile apps, SEO
  };

  heroForm: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    serviceLabel: string;
    captchaLabel: string;
    captchaPlaceholder: string;
    captchaError: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
  };

  features: {
    fastDeliveryTitle: string;
    fastDeliveryDesc: string;
    transparentPricingTitle: string;
    transparentPricingDesc: string;
    dedicatedEngineersTitle: string;
    dedicatedEngineersDesc: string;
    longTermSupportTitle: string;
    longTermSupportDesc: string;
  };

  journey: {
    badge: string;
    heading: string;
    lead: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };

  services: {
    badge: string;
    heading: string;
    lead: string;
    exploreBtn: string;
    requestQuoteBtn: string;
    items: {
      webTitle: string;
      webDesc: string;
      softwareTitle: string;
      softwareDesc: string;
      mobileTitle: string;
      mobileDesc: string;
      erpTitle: string;
      erpDesc: string;
      billingTitle: string;
      billingDesc: string;
      ecommerceTitle: string;
      ecommerceDesc: string;
      seoTitle: string;
      seoDesc: string;
      businessTitle: string;
      businessDesc: string;
    };
  };

  marketplaces: {
    badge: string;
    heading: string;
    lead: string;
    channelAmazon: string;
    channelFlipkart: string;
    channelMeesho: string;
    channelWalmart: string;
    channelGoogle: string;
    cta: string;
  };

  about: {
    badge: string;
    heading: string;
    lead: string;
    expCount: string;
    expLabel: string;
    projectsCount: string;
    projectsLabel: string;
    clientSatisfactionCount: string;
    clientSatisfactionLabel: string;
    reason1Title: string;
    reason1Desc: string;
    reason2Title: string;
    reason2Desc: string;
    reason3Title: string;
    reason3Desc: string;
  };

  clients: {
    badge: string;
    heading: string;
    lead: string;
  };

  projects: {
    badge: string;
    heading: string;
    lead: string;
    viewLive: string;
    project1Title: string;
    project1Category: string;
    project1Desc: string;
    project2Title: string;
    project2Category: string;
    project2Desc: string;
    project3Title: string;
    project3Category: string;
    project3Desc: string;
  };

  locations: {
    badge: string;
    heading: string;
    lead: string;
    hqTitle: string;
    hqDesc: string;
    hubKanpurTitle: string;
    hubKanpurDesc: string;
    hubKanpurCta: string;
    hubLucknowTitle: string;
    hubLucknowDesc: string;
    hubLucknowCta: string;
    hubRaebareliTitle: string;
    hubRaebareliDesc: string;
    hubRaebareliCta: string;
  };

  faq: {
    badge: string;
    heading: string;
    lead: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };

  inquiry: {
    badge: string;
    heading: string;
    lead: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    serviceLabel: string;
    captchaLabel: string;
    captchaPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    directContact: string;
    phoneSupport: string;
    emailSupport: string;
    officeLocation: string;
    validation: {
      nameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      captchaRequired: string;
      captchaInvalid: string;
    };
    successMessage: string;
    errorMessage: string;
  };

  quoteModal: {
    title: string;
    subtitle: string;
    closeBtn: string;
    submitBtn: string;
    submittingBtn: string;
  };

  footer: {
    brandBio: string;
    directContactTitle: string;
    registeredOfficeTitle: string;
    specialInclusionBadge: string;
    specialInclusionTitle: string;
    specialInclusionDesc: string;
    servicesTitle: string;
    locationsTitle: string;
    rightsReserved: string;
    chatLive: string;
  };

  common: {
    languageSwitcherTitle: string;
    currency: string;
    openInNewTab: string;
    loading: string;
    backToHome: string;
    pageNotFound: string;
    pageNotFoundDesc: string;
  };
}
