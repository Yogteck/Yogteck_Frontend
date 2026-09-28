import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-visual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-visual.component.html',
  styleUrl: './hero-visual.component.css'
})
export class HeroVisualComponent {
  marketplaces = [
    { name: 'Amazon', color: '#FF9900', bg: 'rgba(255, 153, 0, 0.12)', border: 'rgba(255, 153, 0, 0.4)' },
    { name: 'Flipkart', color: '#2874F0', bg: 'rgba(40, 116, 240, 0.12)', border: 'rgba(40, 116, 240, 0.4)' },
    { name: 'Meesho', color: '#F43397', bg: 'rgba(244, 51, 151, 0.12)', border: 'rgba(244, 51, 151, 0.4)' },
    { name: 'Walmart', color: '#0071DC', bg: 'rgba(0, 113, 220, 0.12)', border: 'rgba(0, 113, 220, 0.4)' }
  ];

  checklistItems = [
    'Website',
    'E-Commerce',
    'Digital Marketing',
    'More Sales'
  ];
}
