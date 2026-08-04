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
  private readonly validRoutes: RedirectMapping[] = [
    { slug: 'supermarket-racks', target: '/#supermarket-racks', keywords: ['supermarket', 'gondola', 'grocery', 'store'] },
    { slug: 'display-racks', target: '/#display-racks', keywords: ['display', 'showroom', 'retail', 'shelf'] },
    { slug: 'warehouse-racks', target: '/#warehouse-racks', keywords: ['warehouse', 'heavy', 'duty', 'industrial', 'slotted'] },
    { slug: 'garment-racks', target: '/#garment-racks', keywords: ['garment', 'clothes', 'apparel', 'hangers'] },
    { slug: 'medical-racks', target: '/#medical-racks', keywords: ['medical', 'pharmacy', 'medicine'] },
    { slug: 'steel-racks', target: '/#steel-racks', keywords: ['steel', 'iron', 'metal', 'angle'] },
    { slug: 'kanpur-nagar', target: '/#kanpur-nagar', keywords: ['kanpur nagar', 'kanpurnagar', 'kanpur', 'nagar', 'uttar pradesh', 'up'] },
    { slug: 'kanpur', target: '/#kanpur-nagar', keywords: ['kanpur', 'kanpur nagar', 'uttar pradesh', 'up'] },
    { slug: 'delhi', target: '/#delhi', keywords: ['delhi', 'ncr'] },
    { slug: 'hyderabad', target: '/#hyderabad', keywords: ['hyderabad', 'telangana'] },
    { slug: 'bangalore', target: '/#bangalore', keywords: ['bangalore', 'bengaluru', 'karnataka'] },
    { slug: 'chennai', target: '/#chennai', keywords: ['chennai', 'tamil nadu'] },
    { slug: 'contact', target: '/#contact', keywords: ['contact', 'enquiry', 'phone', 'location'] }
  ];

  private logCache: Set<string> = new Set();

  constructor(private router: Router, private http: HttpClient) {}

  public handleUnknownUrl(url: string): void {
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
        // Silent catch for log endpoint errors
      }
    });
  }
}
