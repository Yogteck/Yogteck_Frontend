import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';
import { LocaleService } from '../../services/locale.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  router = inject(Router);
  localeService = inject(LocaleService);

  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;
  dict = this.localeService.currentDict;
  currentYear = new Date().getFullYear();

  scrollTo(targetId: string, event: Event): void {
    const url = this.router.url;
    const isRootOrLocale = url === '/' || /^\/[a-z]{2}(-[a-z]{2})?\/?$/i.test(url);

    if (!isRootOrLocale) {
      const targetLocale = this.localeService.currentConfig().code;
      this.router.navigate([`/${targetLocale}`], { fragment: targetId });
      return;
    }

    event.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
