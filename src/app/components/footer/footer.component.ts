import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT_CONFIG } from '../../data/contact.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  contact = CONTACT_CONFIG;
  currentYear = new Date().getFullYear();

  scrollTo(targetId: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
