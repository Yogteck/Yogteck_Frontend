import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocaleService } from '../services/locale.service';
import { isValidLocale, X_DEFAULT_LOCALE, isSearchBot } from '../data/locales.config';

/**
 * Root guard on '/': Detects user locale and redirects to /{locale}/
 */
export const rootLocaleRedirectGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const localeService = inject(LocaleService);
  const router = inject(Router);

  // If in browser
  if (typeof window !== 'undefined') {
    const userAgent = navigator.userAgent;
    
    // Search bots are directed to x-default without redirect loops
    if (isSearchBot(userAgent)) {
      return router.parseUrl(`/${X_DEFAULT_LOCALE}`);
    }

    const targetLocale = localeService.initLocaleFromUrl('/');
    return router.parseUrl(`/${targetLocale}`);
  }

  return router.parseUrl(`/${X_DEFAULT_LOCALE}`);
};

/**
 * Route guard on ':locale': Validates the locale segment
 */
export const localeValidationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const localeService = inject(LocaleService);
  const router = inject(Router);
  const localeParam = (route.paramMap.get('locale') || '').toLowerCase();

  if (isValidLocale(localeParam)) {
    localeService.setLocale(localeParam, false);
    return true;
  }

  // Not a valid locale segment -> let router fall through to remaining routes and global 404
  return false;
};

