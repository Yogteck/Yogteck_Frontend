import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SUPPORTED_LOCALES, X_DEFAULT_LOCALE, LocaleConfig } from '../data/locales.config';
import { CONTACT_CONFIG } from '../data/contact.config';

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
  ) {
    if (this.doc && this.doc.documentElement) {
      this.doc.documentElement.setAttribute('lang', 'en-IN');
    }
  }

  /**
   * Sets top-level canonical SEO with self-referencing URL, OpenGraph, Twitter, and JSON-LD
   */
  public setCanonicalPageSeo(config: CanonicalSeoConfig): void {
    if (this.doc && this.doc.documentElement) {
      this.doc.documentElement.setAttribute('lang', 'en-IN');
    }

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

    // Remove any untranslated alternate hreflang tags
    this.updateHreflangTags('');

    // Injected JSON-LD
    if (config.jsonLdSchemas && config.jsonLdSchemas.length > 0) {
      this.injectJsonLd(config.jsonLdSchemas);
    }
  }

  /**
   * Sets locale-prefixed page SEO:
   * Keep functional for users, but marks with noindex, follow and canonical pointing to the matching non-prefixed URL
   */
  public setLocalizedPageSeo(config: LocalizedSeoConfig): void {
    if (this.doc && this.doc.documentElement) {
      this.doc.documentElement.setAttribute('lang', 'en-IN');
    }

    const currentLocale = SUPPORTED_LOCALES.find(l => l.code === config.localeCode) || SUPPORTED_LOCALES[0];
    const subpath = (config.pathWithoutLocale || '').replace(/^\//, '').replace(/\/$/, '');
    // Matching non-prefixed canonical URL (Task 1 requirement)
    const matchingNonPrefixedCanonical = subpath ? `${this.defaultDomain}/${subpath}` : `${this.defaultDomain}/`;

    // 1. Title & Meta Description
    this.titleService.setTitle(config.title);
    this.metaService.updateTag({ name: 'description', content: config.description });
    // Locale-prefixed pages MUST be noindex, follow
    this.metaService.updateTag({
      name: 'robots',
      content: 'noindex, follow'
    });
    this.metaService.updateTag({ name: 'author', content: 'Yogteck Business Solution' });

    // 2. Open Graph & Twitter Tags
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: matchingNonPrefixedCanonical });
    this.metaService.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: this.defaultSiteName });
    this.metaService.updateTag({ property: 'og:locale', content: currentLocale.htmlLang.replace('-', '_') });
    this.metaService.updateTag({ property: 'og:image', content: config.ogImage || this.defaultOgImage });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.ogImage || this.defaultOgImage });

    // 3. Canonical URL points to matching non-prefixed URL
    this.updateCanonicalUrl(matchingNonPrefixedCanonical);

    // 4. Remove all hreflang tags (no untranslated hreflangs)
    this.updateHreflangTags('');

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
   * Cleans up hreflang tags since no real translated multi-language content exists.
   * As approved in Phase 4 Task 1, no hreflang links are output until genuine translations exist.
   */
  public updateHreflangTags(cleanSubpath?: string): void {
    // Remove existing hreflang link tags
    const existingHreflangs = this.doc.head.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(el => el.remove());
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
      "sameAs": Object.values(CONTACT_CONFIG.socialLinks || {}).filter(Boolean)
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
      "areaServed": ["Kanpur", "Lucknow", "Uttar Pradesh", "Delhi NCR", "Rajasthan", "Gujarat", "Madhya Pradesh", "Chandigarh", "Maharashtra", "Karnataka"],
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
