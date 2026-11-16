import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';
import { PRICING_DATA } from '../../data/pricing.data';
import { CONTACT_CONFIG } from '../../data/contact.config';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    QuoteModalComponent
  ],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css'
})
export class PricingPageComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  pricingData = PRICING_DATA;
  contact = CONTACT_CONFIG;

  isQuoteModalOpen = false;
  selectedPlanName = 'Starter Website';

  ngOnInit(): void {
    this.titleService.setTitle('Pricing & Plans - Yogteck');
    this.metaService.updateTag({
      name: 'description',
      content: 'Choose the plan that fits your business. Every Yogteck plan includes a free domain and free web hosting with clear, one-time pricing.'
    });
  }

  openQuoteModal(planName?: string): void {
    if (planName) {
      this.selectedPlanName = planName;
    }
    this.isQuoteModalOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeQuoteModal(): void {
    this.isQuoteModalOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
