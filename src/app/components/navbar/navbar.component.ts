import { Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA, ServiceItem } from '../../data/services.data';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() openQuote = new EventEmitter<void>();
  @Output() toggleDrawer = new EventEmitter<void>();

  router = inject(Router);
  themeService = inject(ThemeService);
  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;
  isScrolled = false;
  isServicesDropdownOpen = false;
  activeSection = 'home';

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 20;
    this.detectActiveSection();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
  }

  closeDropdown(): void {
    this.isServicesDropdownOpen = false;
  }

  @HostListener('document:click', [])
  onDocumentClick(): void {
    this.closeDropdown();
  }

  private detectActiveSection(): void {
    if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
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

    if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
      this.router.navigate(['/'], { fragment: targetId });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToService(slug: string, event?: Event): void {
    if (event) event.preventDefault();
    this.closeDropdown();
    this.router.navigate(['/services', slug]);
  }
}
