import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface RedirectMapping {
  slug: string;
  target: string;
  keywords: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SmartRedirectService {
  private readonly validRoutePaths: string[] = [
    '/',
    '/admin',
    '/admin/login',
    '/admin/dashboard',
    '/it-software-company-kanpur',
    '/it-software-company-lucknow',
    '/it-software-company-raebareli',
    '/services/website-development',
    '/services/custom-software-development',
    '/services/mobile-app-development',
    '/services/erp-software',
    '/services/billing-software',
    '/services/ecommerce-development',
    '/services/seo-digital-growth',
    '/services/business-software'
  ];

  private readonly validRoutes: RedirectMapping[] = [
    { slug: 'website-development', target: '/services/website-development', keywords: ['website', 'web', 'portal', 'landing', 'responsive'] },
    { slug: 'custom-software-development', target: '/services/custom-software-development', keywords: ['custom', 'software', 'application', 'saas', 'cloud'] },
    { slug: 'mobile-app-development', target: '/services/mobile-app-development', keywords: ['mobile', 'app', 'android', 'ios', 'flutter', 'react native'] },
    { slug: 'erp-software', target: '/services/erp-software', keywords: ['erp', 'enterprise', 'inventory', 'bom', 'stock'] },
    { slug: 'erp-solutions', target: '/services/erp-software', keywords: ['erp', 'enterprise'] },
    { slug: 'billing-software', target: '/services/billing-software', keywords: ['billing', 'pos', 'invoice', 'gst', 'barcode'] },
    { slug: 'ecommerce-development', target: '/services/ecommerce-development', keywords: ['ecommerce', 'e-commerce', 'store', 'shop', 'cart', 'selling'] },
    { slug: 'ecommerce-solutions', target: '/services/ecommerce-development', keywords: ['ecommerce', 'store'] },
    { slug: 'seo-digital-growth', target: '/services/seo-digital-growth', keywords: ['seo', 'marketing', 'ranking', 'traffic', 'ads', 'google'] },
    { slug: 'digital-marketing-seo', target: '/services/seo-digital-growth', keywords: ['marketing', 'seo'] },
    { slug: 'business-software', target: '/services/business-software', keywords: ['crm', 'helpdesk', 'pipeline', 'sales', 'service'] },
    { slug: 'sales-service-solutions', target: '/services/business-software', keywords: ['sales', 'service'] },
    { slug: 'it-software-company-kanpur', target: '/it-software-company-kanpur', keywords: ['kanpur', 'kanpur nagar', 'uttar pradesh'] },
    { slug: 'kanpur', target: '/it-software-company-kanpur', keywords: ['kanpur'] },
    { slug: 'it-software-company-lucknow', target: '/it-software-company-lucknow', keywords: ['lucknow'] },
    { slug: 'lucknow', target: '/it-software-company-lucknow', keywords: ['lucknow'] },
    { slug: 'it-software-company-raebareli', target: '/it-software-company-raebareli', keywords: ['raebareli'] },
    { slug: 'raebareli', target: '/it-software-company-raebareli', keywords: ['raebareli'] },
    { slug: 'marketplaces', target: '/#marketplaces', keywords: ['marketplace', 'amazon', 'flipkart', 'meesho', 'walmart'] },
    { slug: 'growth-journey', target: '/#growth-journey', keywords: ['growth', 'journey', 'scale', 'transformation'] },
    { slug: 'projects', target: '/#projects', keywords: ['project', 'projects', 'portfolio', 'case', 'studies', 'work'] },
    { slug: 'clients', target: '/#clients', keywords: ['client', 'clients', 'customers', 'partners', 'trusted'] },
    { slug: 'about', target: '/#about', keywords: ['about', 'why', 'company', 'team', 'experience'] },
    { slug: 'contact', target: '/#contact', keywords: ['contact', 'quote', 'enquiry', 'phone', 'whatsapp', 'email'] }
  ];

  private logCache: Set<string> = new Set();

  constructor(private router: Router, private http: HttpClient) {}

  public isKnownRoute(path: string): boolean {
    const clean = path.split('?')[0].split('#')[0];
    return this.validRoutePaths.includes(clean);
  }

  public handleUnknownUrl(url: string): void {
    if (this.isKnownRoute(url)) {
      return;
    }

    // Ignore static assets or api calls
    if (/\.(ico|png|jpg|jpeg|svg|css|js|xml|txt)$/i.test(url) || url.startsWith('/api')) {
      return;
    }

    const cleanSlug = this.normalizeSlug(url);
    const matchedTarget = this.findBestMatch(cleanSlug);

    // Log invalid URL hit to backend asynchronously
    this.logRedirectAttempt(url, matchedTarget);

    // Redirect to closest match or home
    if (matchedTarget && matchedTarget !== '/') {
      this.router.navigateByUrl(matchedTarget, { replaceUrl: true });
    } else {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  private normalizeSlug(url: string): string {
    return url.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  private findBestMatch(slug: string): string {
    if (!slug) return '/';

    let bestMatch: RedirectMapping | null = null;
    let highestScore = 0;

    for (const route of this.validRoutes) {
      const routeSlug = this.normalizeSlug(route.slug);

      // Exact or sub-string match
      if (slug === routeSlug || slug.includes(routeSlug) || routeSlug.includes(slug)) {
        return route.target;
      }

      // Keyword token matching score
      let score = 0;
      for (const kw of route.keywords) {
        if (slug.includes(kw)) {
          score += 2;
        }
      }

      // Levenshtein similarity score
      const similarity = this.calculateSimilarity(slug, routeSlug);
      if (similarity > 0.6) {
        score += Math.floor(similarity * 5);
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = route;
      }
    }

    return highestScore >= 2 && bestMatch ? bestMatch.target : '/';
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    if (len1 === 0) return len2 === 0 ? 1 : 0;
    if (len2 === 0) return 0;

    const matrix: number[][] = [];
    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[len1][len2];
    const maxLen = Math.max(len1, len2);
    return (maxLen - distance) / maxLen;
  }

  private logRedirectAttempt(invalidUrl: string, destination: string): void {
    const cacheKey = `${invalidUrl}->${destination}`;
    if (this.logCache.has(cacheKey)) return;
    this.logCache.add(cacheKey);

    this.http.post('/api/logs/redirect', {
      invalidUrl,
      destination,
      timestamp: new Date().toISOString()
    }).subscribe({
      error: () => {
        // Silent catch
      }
    });
  }
}
