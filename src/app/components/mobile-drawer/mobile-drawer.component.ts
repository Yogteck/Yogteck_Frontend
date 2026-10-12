import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';
import { ThemeService } from '../../services/theme.service';
import { LocaleService } from '../../services/locale.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

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
  dict = this.localeService.currentDict;
  isServicesAccordionOpen = false;

  toggleAccordion(): void {
    this.isServicesAccordionOpen = !this.isServicesAccordionOpen;
  }

  onNavigate(targetId: string): void {
    this.closeDrawer.emit();

    const currentUrl = this.router.url;
    const isRootOrLocale = currentUrl === '/' || /^\/[a-z]{2}(-[a-z]{2})?\/?$/i.test(currentUrl);

    if (!isRootOrLocale) {
      const targetLocale = this.localeService.currentConfig().code;
      this.router.navigate([`/${targetLocale}`], { fragment: targetId });
      return;
    }

    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  }

  navigateToService(slug: string): void {
    this.closeDrawer.emit();
    const targetLocale = this.localeService.currentConfig().code;
    this.router.navigate([`/${targetLocale}/services`, slug]);
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
