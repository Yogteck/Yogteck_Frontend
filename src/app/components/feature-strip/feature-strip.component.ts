import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FEATURE_STRIP_ITEMS, FeatureStripItem } from '../../data/features.data';

@Component({
  selector: 'app-feature-strip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-strip.component.html',
  styleUrl: './feature-strip.component.css'
})
export class FeatureStripComponent {
  features = FEATURE_STRIP_ITEMS;
  activeId = 'feat-web';

  setActive(id: string): void {
    this.activeId = id;
  }

  scrollTo(targetId: string, event: Event): void {
    event.preventDefault();
    const cleanId = targetId.replace('#', '');
    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
