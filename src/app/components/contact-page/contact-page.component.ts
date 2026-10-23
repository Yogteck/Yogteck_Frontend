import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';
import { InquirySectionComponent } from '../inquiry-section/inquiry-section.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbsComponent,
    NavbarComponent,
    MobileDrawerComponent,
    FooterComponent,
    MobileActionBarComponent,
    FloatingWhatsappComponent,
    QuoteModalComponent,
    InquirySectionComponent
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent implements OnInit {
  contact = CONTACT_CONFIG;
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Contact Us' }
  ];
  isDrawerOpen = false;
  isQuoteModalOpen = false;

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    const canonicalUrl = 'https://yogteck.com/contact';

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
        { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": canonicalUrl }
      ]
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Yogteck Business Solution",
      "image": "https://yogteck.com/favicon-512x512.png",
      "telephone": "+91-8299209905",
      "email": "yogteck@gmail.com",
      "url": canonicalUrl,
      "priceRange": "$$",
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

    this.seoService.setCanonicalPageSeo({
      title: 'Contact Us | YogTeck Business Solution',
      description: 'Contact YogTeck Business Solution in Kanpur, India. Call +91 8299209905, message via WhatsApp, or visit our registered office for web & software inquiries.',
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: [breadcrumbSchema, localBusinessSchema]
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
