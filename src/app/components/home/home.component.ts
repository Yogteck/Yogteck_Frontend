import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

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
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { ServiceItem } from '../../data/services.data';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SeoService } from '../../services/seo.service';
import { LocaleService } from '../../services/locale.service';
import { FaqItem } from '../../data/seo-content.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    QuoteModalComponent,
    FaqSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  seoService = inject(SeoService);
  localeService = inject(LocaleService);
  route = inject(ActivatedRoute);

  isDrawerOpen = false;
  isQuoteModalOpen = false;
  selectedServiceTitle = 'Website Development';
  contact = CONTACT_CONFIG;

  dict = this.localeService.currentDict;

  get homepageFaqs(): FaqItem[] {
    const items = this.dict().faq.items;
    return items.map(item => ({
      question: item.question,
      answer: item.answer
    }));
  }

  constructor() {
    // Reactively update page SEO whenever active locale changes
    effect(() => {
      this.updateHomeSeo();
    });
  }

  ngOnInit(): void {
    // If entered via route param :locale, ensure service is in sync
    const routeLocale = this.route.snapshot.paramMap.get('locale');
    if (routeLocale) {
      this.localeService.setLocale(routeLocale, false);
    }
    this.updateHomeSeo();
  }

  private updateHomeSeo(): void {
    const localeCfg = this.localeService.currentConfig();
    const currentDict = this.dict();

    const schemas = this.seoService.buildStandardSchemas({
      localeConfig: localeCfg,
      canonicalPath: '/',
      pageTitle: currentDict.seo.title,
      pageDescription: currentDict.seo.description,
      faqs: currentDict.faq.items
    });

    this.seoService.setLocalizedPageSeo({
      title: currentDict.seo.title,
      description: currentDict.seo.description,
      keywords: currentDict.seo.keywords,
      localeCode: localeCfg.code,
      pathWithoutLocale: '',
      jsonLdSchemas: schemas
    });
  }

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
