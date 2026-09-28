import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marketplace-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketplace-section.component.html',
  styleUrl: './marketplace-section.component.css'
})
export class MarketplaceSectionComponent {
  platforms = [
    { name: 'Amazon', color: '#FF9900', badge: 'Global & Pan-India', desc: 'Prime badge setup, FBA inventory management & Sponsored Product Ads.' },
    { name: 'Flipkart', color: '#2874F0', badge: 'Leading Indian Marketplace', desc: 'Assured badge optimization, Flipkart Ads & tier-1 city distribution.' },
    { name: 'Meesho', color: '#F43397', badge: 'Tier 2 & 3 Hyper-Growth', desc: 'Zero commission catalog optimization & regional volume sales.' },
    { name: 'Walmart', color: '#0071DC', badge: 'International Cross-Border', desc: 'US & global buyer reach with compliance & automated fulfillment.' }
  ];

  capabilities = [
    { title: 'Seller Onboarding', desc: 'GST, brand registry & complete account creation.' },
    { title: 'Cataloging & SEO', desc: 'High-converting A+ content, keywords & photography guidelines.' },
    { title: 'Ad Spend Optimization', desc: 'Targeted ROI campaigns reducing ACoS and boosting Buy-Box win rate.' },
    { title: 'Stock & Returns Sync', desc: 'Unified inventory automation preventing stock-outs and excess returns.' }
  ];
}
