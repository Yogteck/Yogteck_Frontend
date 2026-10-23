import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { LOCATIONS_SEO_DATA, LocationDetailData } from '../../data/seo-content.data';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-lucknow-location',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbsComponent,
    FaqSectionComponent,
    NavbarComponent,
    MobileDrawerComponent,
    FooterComponent,
    MobileActionBarComponent,
    FloatingWhatsappComponent,
    QuoteModalComponent
  ],
  templateUrl: './lucknow-location.component.html',
  styleUrl: './lucknow-location.component.css'
})
export class LucknowLocationComponent implements OnInit {
  locationData: LocationDetailData = LOCATIONS_SEO_DATA['lucknow'];
  contact = CONTACT_CONFIG;
  isDrawerOpen = false;
  isQuoteModalOpen = false;
  breadcrumbItems: BreadcrumbItem[] = [];

  constructor(
    private seoService: SeoService,
    public localeService: LocaleService
  ) {}

  ngOnInit(): void {
    const data = this.locationData;
    const canonicalUrl = `https://yogteck.com/${data.slug}`;

    this.breadcrumbItems = [
      { label: 'Home', url: '/' },
      { label: 'Lucknow Software Services' }
    ];

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://yogteck.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Lucknow Software Services",
          "item": canonicalUrl
        }
      ]
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Yogteck Business Solution - Lucknow Services",
      "serviceType": "IT & Software Development",
      "url": canonicalUrl,
      "description": data.metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "Yogteck Business Solution",
        "url": "https://yogteck.com/",
        "telephone": "+91-8299209905",
        "email": "yogteck@gmail.com"
      },
      "areaServed": {
        "@type": "City",
        "name": "Lucknow"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    this.seoService.setCanonicalPageSeo({
      title: data.metaTitle,
      description: data.metaDescription,
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: [breadcrumbSchema, serviceSchema, faqSchema]
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  openDrawer(): void {
    this.isDrawerOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    document.body.style.overflow = '';
  }

  openQuoteModal(): void {
    this.isQuoteModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeQuoteModal(): void {
    this.isQuoteModalOpen = false;
    document.body.style.overflow = '';
  }
}
