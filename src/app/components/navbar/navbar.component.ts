import { Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA, ServiceItem } from '../../data/services.data';
import { ThemeService } from '../../services/theme.service';
import { LocaleService } from '../../services/locale.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

import { PRODUCTS_SEO_DATA } from '../../data/extended-seo.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() openQuote = new EventEmitter<void>();
  @Output() toggleDrawer = new EventEmitter<void>();

  router = inject(Router);
  themeService = inject(ThemeService);
  localeService = inject(LocaleService);

  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;
  products = Object.values(PRODUCTS_SEO_DATA);
  dict = this.localeService.currentDict;

  isScrolled = false;
  isServicesDropdownOpen = false;
  isProductsDropdownOpen = false;
  activeSection = 'home';

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 20;
    this.detectActiveSection();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isProductsDropdownOpen = false;
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
  }

  toggleProductsDropdown(event: Event): void {
    event.stopPropagation();
    this.isServicesDropdownOpen = false;
    this.isProductsDropdownOpen = !this.isProductsDropdownOpen;
  }

  trackPhoneClick(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'phone_call_click', {
        event_category: 'lead_channel',
        event_label: 'Navbar Phone'
      });
    }
  }

  closeDropdown(): void {
    this.isServicesDropdownOpen = false;
    this.isProductsDropdownOpen = false;
  }


  @HostListener('document:click', [])
  onDocumentClick(): void {
    this.closeDropdown();
  }

  private detectActiveSection(): void {
    const url = this.router.url;
    // Check if we are on root or locale root
    const isRootOrLocaleRoot = url === '/' || /^\/[a-z]{2}(-[a-z]{2})?\/?$/i.test(url);
    if (!isRootOrLocaleRoot) {
      return;
    }
    const sections = ['home', 'services', 'growth-journey', 'marketplaces', 'projects', 'clients', 'about', 'contact'];
    const scrollPosition = window.scrollY + 150;

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  scrollTo(targetId: string, event?: Event): void {
    if (event) event.preventDefault();
    this.closeDropdown();

    const currentUrl = this.router.url;
    const isRootOrLocale = currentUrl === '/' || /^\/[a-z]{2}(-[a-z]{2})?\/?$/i.test(currentUrl);

    if (isRootOrLocale) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const targetLocale = this.localeService.currentConfig().code;
      this.router.navigate([`/${targetLocale}`], { fragment: targetId });
    }
  }
}
