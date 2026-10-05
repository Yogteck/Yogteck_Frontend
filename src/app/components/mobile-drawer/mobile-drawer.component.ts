import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-drawer.component.html',
  styleUrl: './mobile-drawer.component.css'
})
export class MobileDrawerComponent {
  @Input() isOpen = false;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() openQuote = new EventEmitter<void>();

  router = inject(Router);
  themeService = inject(ThemeService);
  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;
  isServicesAccordionOpen = false;

  toggleAccordion(): void {
    this.isServicesAccordionOpen = !this.isServicesAccordionOpen;
  }

  onNavigate(targetId: string): void {
    this.closeDrawer.emit();

    if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
      this.router.navigate(['/'], { fragment: targetId });
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
    this.router.navigate(['/services', slug]);
  }

  navigateToLocation(slug: string): void {
    this.closeDrawer.emit();
    this.router.navigate(['/' + slug]);
  }

  handleQuoteClick(): void {
    this.closeDrawer.emit();
    this.openQuote.emit();
  }
}
