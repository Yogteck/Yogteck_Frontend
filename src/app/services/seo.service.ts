import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
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

  public setPageSeo(config: SeoConfig): void {
    // 1. Title
    this.titleService.setTitle(config.title);

    // 2. Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });
    this.metaService.updateTag({ name: 'author', content: 'Yogteck Business Solution' });

    // 3. Open Graph Tags
    const canonicalUrl = this.getCanonicalUrl(config.canonicalPath);
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: this.defaultSiteName });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_IN' });
    this.metaService.updateTag({ property: 'og:image', content: config.ogImage || this.defaultOgImage });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });

    // 4. Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.ogImage || this.defaultOgImage });

    // 5. Update Canonical Tag
    this.updateCanonicalUrl(config.canonicalPath);

    // 6. Dynamic JSON-LD Structured Data
    if (config.jsonLdSchemas && config.jsonLdSchemas.length > 0) {
      this.injectJsonLd(config.jsonLdSchemas);
    }
  }

  public updateCanonicalUrl(path?: string): void {
    const canonicalUrl = this.getCanonicalUrl(path);

    // Remove existing canonical links
    const existingCanonicalLinks = this.doc.head.querySelectorAll('link[rel="canonical"]');
    existingCanonicalLinks.forEach(element => element.remove());

    // Create clean canonical link tag
    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);
    this.doc.head.appendChild(link);
  }

  public injectJsonLd(schemas: object[]): void {
    // Remove previous dynamic schemas (marked with data-dynamic-seo)
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

  private getCanonicalUrl(path?: string): string {
    let cleanPath = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    cleanPath = cleanPath.split('?')[0].split('#')[0];
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }
    return `${this.defaultDomain}${cleanPath === '/' ? '/' : cleanPath}`;
  }
}
