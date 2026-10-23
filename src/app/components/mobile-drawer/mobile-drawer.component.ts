import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';
import { ThemeService } from '../../services/theme.service';
import { LocaleService } from '../../services/locale.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

import { PRODUCTS_SEO_DATA } from '../../data/extended-seo.data';

@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  templateUrl: './mobile-drawer.component.html',
  styleUrl: './mobile-drawer.component.css'
})
export class MobileDrawerComponent {
  @Input() isOpen = false;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() openQuote = new EventEmitter<void>();

  router = inject(Router);
  themeService = inject(ThemeService);
  localeService = inject(LocaleService);

  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;
  products = Object.values(PRODUCTS_SEO_DATA);
  dict = this.localeService.currentDict;
  isServicesAccordionOpen = false;
  isProductsAccordionOpen = false;

  toggleAccordion(): void {
    this.isServicesAccordionOpen = !this.isServicesAccordionOpen;
  }

  toggleProductsAccordion(): void {
    this.isProductsAccordionOpen = !this.isProductsAccordionOpen;
  }

  onNavigate(targetId: string): void {
    this.closeDrawer.emit();
    if (targetId === 'home') {
      this.router.navigate(['/']);
      return;
    }
    this.router.navigate(['/' + targetId]);
  }

  navigateToService(slug: string): void {
    this.closeDrawer.emit();
    this.router.navigate(['/services', slug]);
  }

  navigateToProduct(slug: string): void {
    this.closeDrawer.emit();
    this.router.navigate(['/products', slug]);
  }

  navigateToPage(path: string): void {
    this.closeDrawer.emit();
    this.router.navigate([path]);
  }

  navigateToLocation(slug: string): void {
    this.closeDrawer.emit();
    const targetLocale = this.localeService.currentConfig().code;
    this.router.navigate([`/${targetLocale}/${slug}`]);
  }

  handleQuoteClick(): void {
    this.closeDrawer.emit();
    this.openQuote.emit();
  }
}
