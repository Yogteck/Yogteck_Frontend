import { Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { LocaleService } from '../../services/locale.service';

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
  localeService = inject(LocaleService);

  contact = CONTACT_CONFIG;

  isScrolled = false;
  isMobileMenuOpen = false;
  openSubmenuId: string | null = null;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 20;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.item.has-sub') && !target.closest('.menu-btn')) {
      this.openSubmenuId = null;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.openSubmenuId = null;
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
    this.toggleDrawer.emit();
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.openSubmenuId = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  toggleSubmenu(id: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.openSubmenuId = this.openSubmenuId === id ? null : id;
  }

  isSubmenuOpen(id: string): boolean {
    return this.openSubmenuId === id;
  }

  onQuoteClick(event: Event): void {
    event.preventDefault();
    this.closeMobileMenu();
    this.openQuote.emit();
  }

  trackPhoneClick(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'phone_call_click', {
        event_category: 'lead_channel',
        event_label: 'Navbar Phone'
      });
    }
  }
}
