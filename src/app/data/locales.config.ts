export interface LocaleConfig {
  code: string;            // e.g. 'en-us'
  urlPrefix: string;       // '/en-us'
  lang: string;            // 'en'
  country: string;         // 'US'
  htmlLang: string;        // 'en-US'
  name: string;            // 'English (United States)'
  nativeName: string;      // 'English (US)'
  languageName: string;    // 'English'
  countryName: string;     // 'United States'
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
  flagEmoji: string;
  dialCode: string;
  currencyCode: string;
  currencySymbol: string;
  numberFormatLocale: string;
  dateFormatLocale: string;
  isDefault?: boolean;
  isXDefault?: boolean;
  needsReviewDefault?: boolean;
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  {
    code: 'en-us',
    urlPrefix: '/en-us',
    lang: 'en',
    country: 'US',
    htmlLang: 'en-US',
    name: 'English (United States)',
    nativeName: 'English (US)',
    languageName: 'English',
    countryName: 'United States',
    dir: 'ltr',
    isRtl: false,
    flagEmoji: '🇺🇸',
    dialCode: '+1',
    currencyCode: 'USD',
    currencySymbol: '$',
    numberFormatLocale: 'en-US',
    dateFormatLocale: 'en-US'
  },
  {
    code: 'en-ca',
    urlPrefix: '/en-ca',
    lang: 'en',
    country: 'CA',
    htmlLang: 'en-CA',
    name: 'English (Canada)',
    nativeName: 'English (CA)',
    languageName: 'English',
    countryName: 'Canada',
    dir: 'ltr',
    isRtl: false,
    flagEmoji: '🇨🇦',
    dialCode: '+1',
    currencyCode: 'CAD',
    currencySymbol: 'CA$',
    numberFormatLocale: 'en-CA',
    dateFormatLocale: 'en-CA'
  },
  {
    code: 'fr-ca',
    urlPrefix: '/fr-ca',
    lang: 'fr',
    country: 'CA',
    htmlLang: 'fr-CA',
    name: 'Français (Canada)',
    nativeName: 'Français (CA)',
    languageName: 'Français',
    countryName: 'Canada',
    dir: 'ltr',
    isRtl: false,
    flagEmoji: '🇨🇦',
    dialCode: '+1',
    currencyCode: 'CAD',
    currencySymbol: '$ CA',
    numberFormatLocale: 'fr-CA',
    dateFormatLocale: 'fr-CA'
  },
  {
    code: 'en-au',
    urlPrefix: '/en-au',
    lang: 'en',
    country: 'AU',
    htmlLang: 'en-AU',
    name: 'English (Australia)',
    nativeName: 'English (AU)',
    languageName: 'English',
    countryName: 'Australia',
    dir: 'ltr',
    isRtl: false,
    flagEmoji: '🇦🇺',
    dialCode: '+61',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    numberFormatLocale: 'en-AU',
    dateFormatLocale: 'en-AU'
  },
  {
    code: 'ja-jp',
    urlPrefix: '/ja-jp',
    lang: 'ja',
    country: 'JP',
    htmlLang: 'ja-JP',
    name: '日本語 (日本)',
    nativeName: '日本語',
    languageName: '日本語',
    countryName: '日本',
    dir: 'ltr',
    isRtl: false,
    flagEmoji: '🇯🇵',
    dialCode: '+81',
    currencyCode: 'JPY',
    currencySymbol: '¥',
    numberFormatLocale: 'ja-JP',
    dateFormatLocale: 'ja-JP'
  },
  {
    code: 'ar-sa',
    urlPrefix: '/ar-sa',
    lang: 'ar',
    country: 'SA',
    htmlLang: 'ar-SA',
    name: 'العربية (المملكة العربية السعودية)',
    nativeName: 'العربية (السعودية)',
    languageName: 'العربية',
    countryName: 'المملكة العربية السعودية',
    dir: 'rtl',
    isRtl: true,
    flagEmoji: '🇸🇦',
    dialCode: '+966',
    currencyCode: 'SAR',
    currencySymbol: 'ر.س',
    numberFormatLocale: 'ar-SA',
    dateFormatLocale: 'ar-SA'
  },
  {
    code: 'ar-kw',
    urlPrefix: '/ar-kw',
    lang: 'ar',
    country: 'KW',
    htmlLang: 'ar-KW',
    name: 'العربية (الكويت)',
    nativeName: 'العربية (الكويت)',
    languageName: 'العربية',
    countryName: 'دولة الكويت',
    dir: 'rtl',
    isRtl: true,
    flagEmoji: '🇰🇼',
    dialCode: '+965',
    currencyCode: 'KWD',
    currencySymbol: 'د.ك',
    numberFormatLocale: 'ar-KW',
    dateFormatLocale: 'ar-KW'
  },
  {
    code: 'ar-bh',
    urlPrefix: '/ar-bh',
    lang: 'ar',
    country: 'BH',
    htmlLang: 'ar-BH',
    name: 'العربية (البحرين)',
    nativeName: 'العربية (البحرين)',
    languageName: 'العربية',
    countryName: 'مملكة البحرين',
    dir: 'rtl',
    isRtl: true,
    flagEmoji: '🇧🇭',
    dialCode: '+973',
    currencyCode: 'BHD',
    currencySymbol: 'د.ب',
    numberFormatLocale: 'ar-BH',
    dateFormatLocale: 'ar-BH'
  },
  {
    code: 'en-in',
    urlPrefix: '/en-in',
    lang: 'en',
    country: 'IN',
    htmlLang: 'en-IN',
    name: 'English (India)',
    nativeName: 'English (IN)',
    languageName: 'English',
    countryName: 'India',
    dir: 'ltr',
    isRtl: false,
    flagEmoji: '🇮🇳',
    dialCode: '+91',
    currencyCode: 'INR',
    currencySymbol: '₹',
    numberFormatLocale: 'en-IN',
    dateFormatLocale: 'en-IN'
  },
  {
    code: 'hi-in',
    urlPrefix: '/hi-in',
    lang: 'hi',
    country: 'IN',
    htmlLang: 'hi-IN',
    name: 'हिन्दी (भारत)',
    nativeName: 'हिन्दी',
    languageName: 'हिन्दी',
    countryName: 'भारत',
    dir: 'ltr',
    isRtl: false,
    flagEmoji: '🇮🇳',
    dialCode: '+91',
    currencyCode: 'INR',
    currencySymbol: '₹',
    numberFormatLocale: 'hi-IN',
    dateFormatLocale: 'hi-IN'
  },
  {
    code: 'en',
    urlPrefix: '/en',
    lang: 'en',
    country: 'GLOBAL',
    htmlLang: 'en',
    name: 'English (Global)',
    nativeName: 'English (Global)',
    languageName: 'English',
    countryName: 'Global',
    dir: 'ltr',
    isRtl: false,
    flagEmoji: '🌐',
    dialCode: '+1',
    currencyCode: 'USD',
    currencySymbol: '$',
    numberFormatLocale: 'en-US',
    dateFormatLocale: 'en-US',
    isDefault: true,
    isXDefault: true
  }
];

export const X_DEFAULT_LOCALE = 'en';
export const DEFAULT_LOCALE = 'en';
export const LOCALE_COOKIE_NAME = 'yogteck_locale';

/**
 * Check if a locale code is supported
 */
export function isValidLocale(code: string): boolean {
  if (!code) return false;
  const normalized = code.toLowerCase().trim();
  return SUPPORTED_LOCALES.some(loc => loc.code === normalized);
}

/**
 * Retrieve configuration for a given locale code, falling back to x-default ('en')
 */
export function getLocaleConfig(code: string): LocaleConfig {
  const normalized = (code || '').toLowerCase().trim();
  const match = SUPPORTED_LOCALES.find(loc => loc.code === normalized);
  if (match) return match;
  return SUPPORTED_LOCALES.find(loc => loc.code === X_DEFAULT_LOCALE) || SUPPORTED_LOCALES[0];
}

/**
 * Check whether User-Agent belongs to search engine crawlers
 */
export function isSearchBot(userAgent: string): boolean {
  if (!userAgent) return false;
  const botRegex = /Googlebot|bingbot|Baiduspider|YandexBot|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|Applebot|crawlers|spider|bot/i;
  return botRegex.test(userAgent);
}

/**
 * Geo-detect best locale for visitor on first visit to "/"
 */
export function detectBestLocale(options: {
  countryHeader?: string | null;
  acceptLanguage?: string | null;
  userAgent?: string | null;
  browserLanguage?: string | null;
  timeZone?: string | null;
  savedCookie?: string | null;
}): string {
  // 1. If user previously manually picked a locale in cookie, that ALWAYS wins
  if (options.savedCookie && isValidLocale(options.savedCookie)) {
    return options.savedCookie.toLowerCase();
  }

  // 2. Search bots should never get redirected to a forced regional variant: serve x-default
  if (options.userAgent && isSearchBot(options.userAgent)) {
    return X_DEFAULT_LOCALE;
  }

  // 3. Edge/CDN country header (e.g., cf-ipcountry, x-vercel-ip-country)
  const country = (options.countryHeader || '').toUpperCase().trim();
  const langHeader = (options.acceptLanguage || options.browserLanguage || '').toLowerCase();

  if (country === 'IN') {
    if (langHeader.includes('hi')) return 'hi-in';
    return 'en-in';
  }
  if (country === 'US') return 'en-us';
  if (country === 'CA') {
    if (langHeader.includes('fr')) return 'fr-ca';
    return 'en-ca';
  }
  if (country === 'AU') return 'en-au';
  if (country === 'JP') return 'ja-jp';
  if (country === 'SA') return 'ar-sa';
  if (country === 'KW') return 'ar-kw';
  if (country === 'BH') return 'ar-bh';

  // 4. Timezone heuristics if header wasn't present (e.g. client-side execution)
  const tz = (options.timeZone || '').toLowerCase();
  if (tz.includes('calcutta') || tz.includes('kolkata')) {
    if (langHeader.includes('hi')) return 'hi-in';
    return 'en-in';
  }
  if (tz.includes('riyadh')) return 'ar-sa';
  if (tz.includes('kuwait')) return 'ar-kw';
  if (tz.includes('bahrain')) return 'ar-bh';
  if (tz.includes('tokyo')) return 'ja-jp';
  if (tz.includes('sydney') || tz.includes('melbourne') || tz.includes('brisbane')) return 'en-au';
  if (tz.includes('toronto') || tz.includes('vancouver') || tz.includes('montreal')) {
    if (langHeader.includes('fr')) return 'fr-ca';
    return 'en-ca';
  }
  if (tz.includes('new_york') || tz.includes('chicago') || tz.includes('los_angeles')) return 'en-us';

  // 5. Accept-Language header / browserLanguage heuristics
  if (langHeader.startsWith('ja')) return 'ja-jp';
  if (langHeader.startsWith('hi')) return 'hi-in';
  if (langHeader.startsWith('ar')) return 'ar-sa';
  if (langHeader.startsWith('fr')) return 'fr-ca';

  // 6. Global Fallback (x-default)
  return X_DEFAULT_LOCALE;
}
