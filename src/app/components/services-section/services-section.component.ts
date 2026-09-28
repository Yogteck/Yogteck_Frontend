import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SERVICES_DATA, ServiceItem } from '../../data/services.data';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css'
})
export class ServicesSectionComponent {
  @Output() selectService = new EventEmitter<ServiceItem>();
  @Output() openQuote = new EventEmitter<void>();

  services = SERVICES_DATA;

  onCardClick(srv: ServiceItem): void {
    this.selectService.emit(srv);
    this.openQuote.emit();
  }

  scrollToContact(event: Event): void {
    event.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
