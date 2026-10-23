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
  selector: 'app-kanpur-location',
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
  templateUrl: './kanpur-location.component.html',
  styleUrl: './kanpur-location.component.css'
})
export class KanpurLocationComponent implements OnInit {
  locationData: LocationDetailData = LOCATIONS_SEO_DATA['kanpur'];
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
      { label: 'Kanpur Software Company' }
    ];

    // Schema: BreadcrumbList, LocalBusiness, FAQPage
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
          "name": "Kanpur Software Company",
          "item": canonicalUrl
        }
      ]
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Yogteck Business Solution",
      "alternateName": "YogTeck",
      "image": "https://yogteck.com/favicon-512x512.png",
      "url": canonicalUrl,
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
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.4499",
        "longitude": "80.3319"
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

    this.seoService.setCanonicalPageSeo({
      title: data.metaTitle,
      description: data.metaDescription,
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: [breadcrumbSchema, localBusinessSchema, faqSchema]
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
