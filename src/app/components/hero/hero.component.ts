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

  focusHeroForm(): void {
    const nameEl = document.getElementById('heroFormName');
    if (nameEl) {
      nameEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameEl.focus();
      nameEl.classList.add('shake-highlight');
      setTimeout(() => nameEl.classList.remove('shake-highlight'), 1000);
    } else {
      this.openQuote.emit();
    }
  }

  scrollTo(targetId: string, event?: Event): void {
    if (event) event.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
