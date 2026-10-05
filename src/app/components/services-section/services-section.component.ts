import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SERVICES_DATA, ServiceItem } from '../../data/services.data';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css'
})
export class ServicesSectionComponent {
  @Output() selectService = new EventEmitter<ServiceItem>();
  @Output() openQuote = new EventEmitter<void>();

  services = SERVICES_DATA;

  scrollToContact(event: Event): void {
    event.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
