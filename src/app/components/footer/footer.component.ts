import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  router = inject(Router);
  localeService = inject(LocaleService);

  contact = CONTACT_CONFIG;
  currentYear = new Date().getFullYear();

  scrollToTop(event: Event): void {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
