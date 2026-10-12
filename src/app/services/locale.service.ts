import { Injectable, signal, computed, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import {
  LocaleConfig,
  SUPPORTED_LOCALES,
  X_DEFAULT_LOCALE,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  getLocaleConfig,
  isValidLocale,
  detectBestLocale,
  isSearchBot
} from '../data/locales.config';
import { LocaleDictionary } from '../data/locales/locale-strings.interface';
import { getDictionary } from '../data/locales';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  // Reactive Signal for current active locale code
  private currentLocaleCode = signal<string>(X_DEFAULT_LOCALE);

  // Computed signals for current config and dictionary
  public currentConfig = computed<LocaleConfig>(() => getLocaleConfig(this.currentLocaleCode()));
  public currentDict = computed<LocaleDictionary>(() => getDictionary(this.currentLocaleCode()));
  public isRtl = computed<boolean>(() => this.currentConfig().isRtl);

  public readonly supportedLocales = SUPPORTED_LOCALES;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {}

  /**
   * Initializes the locale from the current URL path, cookie, or geo detection.
   */
  public initLocaleFromUrl(pathname: string): string {
    const segments = (pathname || '').split('/').filter(Boolean);
    const firstSegment = segments[0] ? segments[0].toLowerCase() : '';

    if (isValidLocale(firstSegment)) {
      this.applyLocale(firstSegment, false);
      return firstSegment;
    }

    // If on root "/"
    if (pathname === '/' || pathname === '') {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      
      // If search bot, do NOT force redirect: serve x-default
      if (isSearchBot(userAgent)) {
        this.applyLocale(X_DEFAULT_LOCALE, false);
        return X_DEFAULT_LOCALE;
      }

      // Read cookie if set
      const cookieLocale = this.getCookie(LOCALE_COOKIE_NAME);
      const detected = detectBestLocale({
        savedCookie: cookieLocale,
        userAgent,
        browserLanguage: typeof navigator !== 'undefined' ? navigator.language : null,
        timeZone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : null
      });

      this.applyLocale(detected, false);
      return detected;
    }

    // Default fallback
    this.applyLocale(X_DEFAULT_LOCALE, false);
    return X_DEFAULT_LOCALE;
  }

  /**
   * Set active locale, optionally persisting to a long-lived cookie.
   */
  public setLocale(localeCode: string, persistCookie: boolean = true): void {
    if (!isValidLocale(localeCode)) return;
    this.applyLocale(localeCode, persistCookie);
  }

  private applyLocale(code: string, persistCookie: boolean): void {
    const config = getLocaleConfig(code);
    this.currentLocaleCode.set(config.code);

    if (persistCookie) {
      this.setCookie(LOCALE_COOKIE_NAME, config.code, 365);
    }

    // Update document <html lang="..." dir="...">
    if (this.doc && this.doc.documentElement) {
      this.doc.documentElement.lang = config.htmlLang;
      this.doc.documentElement.dir = config.dir;
      this.doc.documentElement.setAttribute('data-locale', config.code);
      this.doc.documentElement.classList.toggle('dir-rtl', config.isRtl);
      this.doc.documentElement.classList.toggle('dir-ltr', !config.isRtl);

      // Manage localized font injection
      this.manageFontsForLocale(config);
    }
  }

  /**
   * Dynamically loads locale-specific fonts if not already loaded
   */
  private manageFontsForLocale(config: LocaleConfig): void {
    const head = this.doc.head;
    if (!head) return;

    if (config.isRtl) {
      // Load Noto Sans Arabic if not present
      if (!this.doc.getElementById('font-noto-arabic')) {
        const link = this.doc.createElement('link');
        link.id = 'font-noto-arabic';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap';
        head.appendChild(link);
      }
    } else if (config.code === 'ja-jp') {
      // Load Noto Sans JP if not present
      if (!this.doc.getElementById('font-noto-jp')) {
        const link = this.doc.createElement('link');
        link.id = 'font-noto-jp';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap';
        head.appendChild(link);
      }
    }
  }

  /**
   * Transforms a URL or path to switch to a new locale target.
   */
  public getSwitchLocaleUrl(targetLocale: string, currentUrl?: string): string {
    const url = currentUrl || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const clean = url.split('?')[0].split('#')[0];
    const segments = clean.split('/').filter(Boolean);

    // If first segment is an existing locale, replace it
    if (segments.length > 0 && isValidLocale(segments[0])) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }

    return '/' + segments.join('/') + '/';
  }

  /**
   * Format currency using standard ECMAScript Intl API
   */
  public formatCurrency(amount: number, currencyCode?: string): string {
    const cfg = this.currentConfig();
    const curr = currencyCode || cfg.currencyCode;
    try {
      return new Intl.NumberFormat(cfg.numberFormatLocale, {
        style: 'currency',
        currency: curr,
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      return `${cfg.currencySymbol}${amount.toLocaleString()}`;
    }
  }

  /**
   * Format numbers using Intl API
   */
  public formatNumber(value: number): string {
    const cfg = this.currentConfig();
    try {
      return new Intl.NumberFormat(cfg.numberFormatLocale).format(value);
    } catch {
      return value.toLocaleString();
    }
  }

  /**
   * Format date using Intl API
   */
  public formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const cfg = this.currentConfig();
    const d = typeof date === 'string' ? new Date(date) : date;
    const defaultOptions: Intl.DateTimeFormatOptions = options || {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    try {
      return new Intl.DateTimeFormat(cfg.dateFormatLocale, defaultOptions).format(d);
    } catch {
      return d.toLocaleDateString();
    }
  }

  // --- Cookie Helpers ---
  private setCookie(name: string, value: string, days: number): void {
    if (typeof document === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  }

  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match ? decodeURIComponent(match[3]) : null;
  }
}
