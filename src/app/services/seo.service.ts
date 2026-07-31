import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultDomain = 'https://yogteck.com';

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  public updateCanonicalUrl(path?: string): void {
    let cleanPath = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    
    // Remove query params or hashes for clean canonical URL
    cleanPath = cleanPath.split('?')[0].split('#')[0];
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }

    const canonicalUrl = `${this.defaultDomain}${cleanPath === '/' ? '' : cleanPath}/`;

    // Remove existing canonical links to prevent duplicates
    const existingCanonicalLinks = this.doc.head.querySelectorAll('link[rel="canonical"]');
    existingCanonicalLinks.forEach(element => element.remove());

    // Create and append the clean canonical tag
    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);
    this.doc.head.appendChild(link);
  }
}
