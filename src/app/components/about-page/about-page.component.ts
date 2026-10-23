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

@Component({
  selector: 'app-about-page',
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
    QuoteModalComponent
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent implements OnInit {
  contact = CONTACT_CONFIG;
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'About Us' }
  ];
  isDrawerOpen = false;
  isQuoteModalOpen = false;

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    const canonicalUrl = 'https://yogteck.com/about';

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": canonicalUrl }
      ]
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Yogteck Business Solution",
      "alternateName": "YogTeck",
      "url": "https://yogteck.com/",
      "logo": "https://yogteck.com/favicon-512x512.png",
      "telephone": "+91-8299209905",
      "email": "yogteck@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "302/2, Mangla Vihar 2, New PAC Line",
        "addressLocality": "Kanpur Nagar",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "208015",
        "addressCountry": "IN"
      }
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Yogteck Business Solution",
      "image": "https://yogteck.com/favicon-512x512.png",
      "telephone": "+91-8299209905",
      "email": "yogteck@gmail.com",
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
      }
    };

    this.seoService.setCanonicalPageSeo({
      title: 'About Us | YogTeck Business Solution',
      description: 'Learn about YogTeck Business Solution, an IT & software engineering company based in Kanpur, India. Our mission, engineering values, and leadership story.',
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: [breadcrumbSchema, organizationSchema, localBusinessSchema]
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
