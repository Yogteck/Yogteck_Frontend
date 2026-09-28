import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroVisualComponent } from '../hero-visual/hero-visual.component';
import { CONTACT_CONFIG } from '../../data/contact.config';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HeroVisualComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Output() openQuote = new EventEmitter<void>();

  contact = CONTACT_CONFIG;

  scrollTo(targetId: string, event?: Event): void {
    if (event) event.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
