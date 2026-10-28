import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT_CONFIG } from '../../data/contact.config';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-whatsapp.component.html',
  styleUrl: './floating-whatsapp.component.css'
})
export class FloatingWhatsappComponent {
  contact = CONTACT_CONFIG;

  trackWhatsAppClick(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'lead_channel',
        event_label: 'Floating WhatsApp Button'
      });
    }
  }
}

