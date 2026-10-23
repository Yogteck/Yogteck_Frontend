import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SUPPORTED_LOCALES, X_DEFAULT_LOCALE, LocaleConfig } from '../data/locales.config';

export interface LocalizedSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  localeCode: string;
  pathWithoutLocale?: string; // e.g. '', 'services/erp-software', 'it-software-company-kanpur'
  ogImage?: string;
  ogType?: string;
  robots?: string;
  jsonLdSchemas?: object[];
}

export interface CanonicalSeoConfig {
  title: string;
  description: string;
  canonicalUrl: string; // e.g. 'https://yogteck.com/services/website-development'
  ogImage?: string;
  ogType?: string;
  robots?: string;
  jsonLdSchemas?: object[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultDomain = 'https://yogteck.com';
  private readonly defaultOgImage = 'https://yogteck.com/assets/images/hero-bg.jpg';
  private readonly defaultSiteName = 'Yogteck Business Solution';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  /**
   * Sets top-level canonical SEO with self-referencing URL, OpenGraph, Twitter, and JSON-LD
   */
  public setCanonicalPageSeo(config: CanonicalSeoConfig): void {
    this.titleService.setTitle(config.title);
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({
      name: 'robots',
      content: config.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    });
    this.metaService.updateTag({ name: 'author', content: 'Yogteck Business Solution' });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: config.canonicalUrl });
    this.metaService.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: this.defaultSiteName });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_IN' });
    this.metaService.updateTag({ property: 'og:image', content: config.ogImage || this.defaultOgImage });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });

    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.ogImage || this.defaultOgImage });

    // Self-referencing Canonical URL
    this.updateCanonicalUrl(config.canonicalUrl);

    // Injected JSON-LD
    if (config.jsonLdSchemas && config.jsonLdSchemas.length > 0) {
      this.injectJsonLd(config.jsonLdSchemas);
    }
  }

  /**
   * Updates complete page SEO: title, description, robots, OpenGraph, Twitter, canonical, reciprocal hreflangs, and JSON-LD schemas
   */
  public setLocalizedPageSeo(config: LocalizedSeoConfig): void {
    const currentLocale = SUPPORTED_LOCALES.find(l => l.code === config.localeCode) || SUPPORTED_LOCALES[0];
    const subpath = config.pathWithoutLocale ? `/${config.pathWithoutLocale}` : '';
    const cleanSubpath = subpath.endsWith('/') ? subpath : (subpath ? `${subpath}/` : '/');
    const pageCanonicalUrl = `${this.defaultDomain}/${currentLocale.code}${cleanSubpath === '/' ? '/' : cleanSubpath}`;

    // 1. Localized Title & Meta Description
    this.titleService.setTitle(config.title);
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }
    this.metaService.updateTag({
      name: 'robots',
      content: config.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    });
    this.metaService.updateTag({ name: 'author', content: 'Yogteck Business Solution' });

    // 2. Open Graph & Twitter Tags
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: pageCanonicalUrl });
    this.metaService.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: this.defaultSiteName });
    this.metaService.updateTag({ property: 'og:locale', content: currentLocale.htmlLang.replace('-', '_') });
    this.metaService.updateTag({ property: 'og:image', content: config.ogImage || this.defaultOgImage });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });

    // OG Alternate Locales
    SUPPORTED_LOCALES.filter(l => l.code !== currentLocale.code).forEach(altLocale => {
      this.metaService.updateTag({
        property: 'og:locale:alternate',
        content: altLocale.htmlLang.replace('-', '_')
      });
    });

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.ogImage || this.defaultOgImage });

    // 3. Self-referencing Canonical URL
    this.updateCanonicalUrl(pageCanonicalUrl);

    // 4. Reciprocal hreflang tags for ALL supported locales + x-default
    this.updateHreflangTags(cleanSubpath);

    // 5. Injected JSON-LD Structured Data
    if (config.jsonLdSchemas && config.jsonLdSchemas.length > 0) {
      this.injectJsonLd(config.jsonLdSchemas);
    }
  }

  /**
   * Backward-compatible page SEO setter that infers the active locale and canonical subpath
   */
  public setPageSeo(options: {
    title: string;
    description: string;
    keywords?: string;
    canonicalPath?: string;
    jsonLdSchemas?: object[];
    ogImage?: string;
    ogType?: string;
  }): void {
    let localeCode = X_DEFAULT_LOCALE;
    if (this.doc && this.doc.documentElement) {
      const docLocale = this.doc.documentElement.getAttribute('data-locale');
      if (docLocale) {
        localeCode = docLocale;
      }
    }

    let pathWithoutLocale = '';
    if (options.canonicalPath) {
      const clean = options.canonicalPath.replace(/^\//, '').replace(/\/$/, '');
      const segments = clean.split('/').filter(Boolean);
      if (segments.length > 0 && SUPPORTED_LOCALES.some(l => l.code === segments[0].toLowerCase())) {
        segments.shift();
      }
      pathWithoutLocale = segments.join('/');
    }

    this.setLocalizedPageSeo({
      title: options.title,
      description: options.description,
      keywords: options.keywords,
      localeCode: localeCode,
      pathWithoutLocale: pathWithoutLocale,
      ogImage: options.ogImage,
      ogType: options.ogType,
      jsonLdSchemas: options.jsonLdSchemas
    });
  }

  /**
   * Sets self-referencing canonical URL link tag
   */
  public updateCanonicalUrl(absoluteUrl?: string): void {
    const url = absoluteUrl || this.getAbsoluteCurrentUrl();

    const existingCanonicalLinks = this.doc.head.querySelectorAll('link[rel="canonical"]');
    existingCanonicalLinks.forEach(element => element.remove());

    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.doc.head.appendChild(link);
  }

  /**
   * Generates and injects reciprocal hreflang links for ALL locales and x-default
   */
  public updateHreflangTags(cleanSubpath: string): void {
    // Remove existing hreflang link tags
    const existingHreflangs = this.doc.head.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(el => el.remove());

    const pathSuffix = cleanSubpath === '/' ? '/' : (cleanSubpath.endsWith('/') ? cleanSubpath : `${cleanSubpath}/`);

    // Add reciprocal tag for every locale
    SUPPORTED_LOCALES.forEach(locale => {
      const link: HTMLLinkElement = this.doc.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', locale.htmlLang);
      link.setAttribute('href', `${this.defaultDomain}/${locale.code}${pathSuffix}`);
      this.doc.head.appendChild(link);
    });

    // Add x-default pointing to /en/
    const xDefaultLink: HTMLLinkElement = this.doc.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    xDefaultLink.setAttribute('href', `${this.defaultDomain}/${X_DEFAULT_LOCALE}${pathSuffix}`);
    this.doc.head.appendChild(xDefaultLink);
  }

  /**
   * Injects structured data JSON-LD scripts with data-dynamic-seo marker
   */
  public injectJsonLd(schemas: object[]): void {
    const existingDynamicScripts = this.doc.head.querySelectorAll('script[data-dynamic-seo="true"]');
    existingDynamicScripts.forEach(el => el.remove());

    schemas.forEach(schema => {
      const script = this.doc.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-dynamic-seo', 'true');
      script.textContent = JSON.stringify(schema, null, 2);
      this.doc.head.appendChild(script);
    });
  }

  /**
   * Build complete standard schemas for a localized page
   */
  public buildStandardSchemas(options: {
    localeConfig: LocaleConfig;
    canonicalPath: string;
    pageTitle: string;
    pageDescription: string;
    faqs?: Array<{ question: string; answer: string }>;
    breadcrumbs?: Array<{ name: string; path: string }>;
  }): object[] {
    const { localeConfig, canonicalPath, pageTitle, pageDescription, faqs, breadcrumbs } = options;
    const pageUrl = `${this.defaultDomain}/${localeConfig.code}${canonicalPath === '/' ? '/' : canonicalPath}`;

    // 1. WebSite Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Yogteck Business Solution",
      "alternateName": "YOGTECK",
      "url": `${this.defaultDomain}/${localeConfig.code}/`,
      "inLanguage": localeConfig.htmlLang,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${this.defaultDomain}/${localeConfig.code}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // 2. Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Yogteck Business Solution",
      "alternateName": "YOGTECK",
      "url": `${this.defaultDomain}/${localeConfig.code}/`,
      "logo": `${this.defaultDomain}/favicon-512x512.png`,
      "image": `${this.defaultDomain}/favicon-512x512.png`,
      "telephone": "+91-8299209905",
      "email": "yogteck@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "302/2, Mangla Vihar 2, New PAC Line",
        "addressLocality": "Kanpur Nagar",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "208015",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8299209905",
        "contactType": "customer service",
        "areaServed": localeConfig.country,
        "availableLanguage": [localeConfig.languageName, "English"]
      },
      "sameAs": []
    };

    // 3. LocalBusiness / ProfessionalService for Kanpur headquarters
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Yogteck Business Solution",
      "alternateName": "YOGTECK",
      "image": `${this.defaultDomain}/favicon-512x512.png`,
      "url": pageUrl,
      "telephone": "+91-8299209905",
      "email": "yogteck@gmail.com",
      "priceRange": "$$",
      "inLanguage": localeConfig.htmlLang,
      "description": pageDescription,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "302/2, Mangla Vihar 2, New PAC Line",
        "addressLocality": "Kanpur Nagar",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "208015",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.4499",
        "longitude": "80.3319"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    };

    const schemas: object[] = [websiteSchema, organizationSchema, professionalServiceSchema];

    // 4. FAQPage Schema
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": localeConfig.htmlLang,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      schemas.push(faqSchema);
    }

    // 5. BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((b, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": b.name,
          "item": `${this.defaultDomain}/${localeConfig.code}${b.path.startsWith('/') ? b.path : '/' + b.path}`
        }))
      };
      schemas.push(breadcrumbSchema);
    }

    return schemas;
  }

  private getAbsoluteCurrentUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `${this.defaultDomain}/`;
  }
}
