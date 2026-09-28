import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { HeroComponent } from '../hero/hero.component';
import { FeatureStripComponent } from '../feature-strip/feature-strip.component';
import { ServicesSectionComponent } from '../services-section/services-section.component';
import { GrowthJourneyComponent } from '../growth-journey/growth-journey.component';
import { MarketplaceSectionComponent } from '../marketplace-section/marketplace-section.component';
import { AboutSectionComponent } from '../about-section/about-section.component';
import { ClientsStripComponent } from '../clients-strip/clients-strip.component';
import { ProjectsSectionComponent } from '../projects-section/projects-section.component';
import { InquirySectionComponent } from '../inquiry-section/inquiry-section.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';
import { ServiceItem } from '../../data/services.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MobileDrawerComponent,
    HeroComponent,
    FeatureStripComponent,
    ServicesSectionComponent,
    GrowthJourneyComponent,
    MarketplaceSectionComponent,
    AboutSectionComponent,
    ClientsStripComponent,
    ProjectsSectionComponent,
    InquirySectionComponent,
    FooterComponent,
    MobileActionBarComponent,
    FloatingWhatsappComponent,
    QuoteModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isDrawerOpen = false;
  isQuoteModalOpen = false;
  selectedServiceTitle = 'Website Development';

  openDrawer(): void {
    this.isDrawerOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    document.body.style.overflow = '';
  }

  openQuoteModal(serviceTitle?: string): void {
    if (serviceTitle) {
      this.selectedServiceTitle = serviceTitle;
    }
    this.isQuoteModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeQuoteModal(): void {
    this.isQuoteModalOpen = false;
    document.body.style.overflow = '';
  }

  onServiceSelected(service: ServiceItem): void {
    this.openQuoteModal(service.title);
  }
}
