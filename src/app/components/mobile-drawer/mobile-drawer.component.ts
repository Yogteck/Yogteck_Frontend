import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';

@Component({
  selector: 'app-mobile-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-drawer.component.html',
  styleUrl: './mobile-drawer.component.css'
})
export class MobileDrawerComponent {
  @Input() isOpen = false;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() openQuote = new EventEmitter<void>();

  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;
  isServicesAccordionOpen = false;

  toggleAccordion(): void {
    this.isServicesAccordionOpen = !this.isServicesAccordionOpen;
  }

  onNavigate(targetId: string): void {
    this.closeDrawer.emit();
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  }

  handleQuoteClick(): void {
    this.closeDrawer.emit();
    this.openQuote.emit();
  }
}
