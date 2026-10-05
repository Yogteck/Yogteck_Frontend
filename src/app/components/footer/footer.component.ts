import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  scrollTo(targetId: string, event: Event): void {
    if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
      // If on subpage, navigate to homepage with fragment
      this.router.navigate(['/'], { fragment: targetId });
      return;
    }

    event.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
