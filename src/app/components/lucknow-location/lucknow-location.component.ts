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
    const currentLocale = this.localeService.currentConfig();
    const localeCode = currentLocale.code;
    const canonicalPath = `/${localeCode}/${data.slug}/`;

    this.breadcrumbItems = [
      { label: 'Locations', url: `/${localeCode}/#about` },
      { label: 'Lucknow' }
    ];

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `https://yogteck.com/${localeCode}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Lucknow",
          "item": `https://yogteck.com/${localeCode}/${data.slug}/`
        }
      ]
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Yogteck Business Solution - Lucknow Services",
      "alternateName": "Yogteck",
      "image": "https://yogteck.com/favicon-512x512.png",
      "url": `https://yogteck.com${canonicalPath}`,
      "telephone": "+91-8299209905",
      "email": "yogteck@gmail.com",
      "priceRange": "$$",
      "description": data.metaDescription,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "302/2, Mangla Vihar 2, New PAC Line",
        "addressLocality": "Kanpur Nagar",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "208015",
        "addressCountry": "IN"
      },
      "areaServed": {
        "@type": "City",
        "name": "Lucknow"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
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

    this.seoService.setLocalizedPageSeo({
      title: data.metaTitle,
      description: data.metaDescription,
      keywords: 'it company in lucknow, software company in lucknow, software development company in lucknow, web development company in lucknow, erp software lucknow, billing software lucknow, yogteck business solution',
      localeCode: localeCode,
      pathWithoutLocale: data.slug,
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
