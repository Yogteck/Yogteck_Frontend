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
}
