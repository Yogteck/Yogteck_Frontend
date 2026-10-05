import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  isDrawerOpen = false;
  isQuoteModalOpen = false;
  selectedServiceTitle = 'Website Development';
  contact = CONTACT_CONFIG;

  homepageFaqs: FaqItem[] = [
    {
      question: 'What does Yogteck Business Solution do?',
      answer: 'Yogteck Business Solution is an IT and software company based in Kanpur, Uttar Pradesh. We provide custom software development, modern website development, mobile applications, cloud ERP platforms, GST billing software, e-commerce storefronts, and search engine optimization (SEO) to help businesses digitize and scale.'
    },
    {
      question: 'Which services does Yogteck provide in Kanpur?',
      answer: 'In Kanpur, Yogteck provides comprehensive technology solutions including custom business software, mobile-first websites, ERP systems for leather and textile manufacturing, GST billing and POS software for retail showrooms, and local SEO to rank Kanpur businesses on Google.'
    },
    {
      question: 'Does Yogteck develop custom software and mobile applications?',
      answer: 'Yes. We engineer bespoke cloud software, SaaS platforms, and high-performance cross-platform Android & iOS mobile applications tailored to specific business logic and workflows.'
    },
    {
      question: 'Does Yogteck provide ERP and GST billing software?',
      answer: 'Yes. We deliver unified cloud ERP software (inventory, production BOM, accounts, payroll) and high-speed 10-second GST billing software compatible with barcode scanners, thermal receipt printers, and automated WhatsApp invoice sharing.'
    },
    {
      question: 'Does Yogteck serve businesses outside Kanpur?',
      answer: 'Yes. While headquartered in Kanpur, Yogteck Business Solution actively serves clients in Lucknow, Raebareli, throughout Uttar Pradesh, and across India with secure cloud deployment and dedicated technical support.'
    },
    {
      question: 'Where is Yogteck Business Solution located and how can I contact you?',
      answer: 'Our registered office is located at 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, Uttar Pradesh, 208015. You can call our team at +91 8299209905, email yogteck@gmail.com, or message us directly on WhatsApp.'
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Yogteck Business Solution",
      "alternateName": "Yogteck",
      "url": "https://yogteck.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://yogteck.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Yogteck Business Solution",
      "alternateName": "Yogteck",
      "url": "https://yogteck.com/",
      "logo": "https://yogteck.com/favicon-512x512.png",
      "image": "https://yogteck.com/favicon-512x512.png",
      "telephone": "+91-8299209905",
      "email": "yogteck@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "302/2, Mangla Vihar 2, New PAC Line",
        "addressLocality": "Kanpur Nagar",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "208015",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8299209905",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": []
    };

    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Yogteck Business Solution",
      "alternateName": "Yogteck",
      "image": "https://yogteck.com/favicon-512x512.png",
      "url": "https://yogteck.com/",
      "telephone": "+91-8299209905",
      "email": "yogteck@gmail.com",
      "priceRange": "$$",
      "description": "Yogteck Business Solution is an IT and software company in Kanpur offering website development, custom software, mobile apps, ERP, e-commerce and digital business solutions across India.",
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
      "mainEntity": this.homepageFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    this.seoService.setPageSeo({
      title: 'Yogteck Business Solution | IT & Software Company in Kanpur, India',
      description: 'Yogteck Business Solution is an IT and software company in Kanpur offering website development, custom software, mobile apps, ERP, e-commerce and digital business solutions across India.',
      keywords: 'it company in kanpur, software company in kanpur, top it company in kanpur, best software company in kanpur, web development company in kanpur, website development in kanpur, custom software development kanpur, erp software company kanpur, billing software kanpur, yogteck business solution',
      canonicalPath: '/',
      jsonLdSchemas: [websiteSchema, organizationSchema, professionalServiceSchema, faqSchema]
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
