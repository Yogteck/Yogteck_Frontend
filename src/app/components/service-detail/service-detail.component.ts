import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { SERVICES_SEO_DATA, ServiceDetailData } from '../../data/seo-content.data';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-service-detail',
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
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  serviceData: ServiceDetailData | null = null;
  breadcrumbItems: BreadcrumbItem[] = [];
  contact = CONTACT_CONFIG;
  isDrawerOpen = false;
  isQuoteModalOpen = false;
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    public localeService: LocaleService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const urlSegments = this.router.url.split('?')[0].split('/').filter(Boolean);
      const lastSegment = urlSegments[urlSegments.length - 1] || '';
      const slug = params.get('slug') || lastSegment;
      this.loadService(slug);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private loadService(slug: string): void {
    // Check direct slug or aliases
    let targetSlug = slug;
    if (slug === 'erp-kaihatsu') targetSlug = 'erp-software';
    if (slug === 'ecommerce-solutions') targetSlug = 'ecommerce-development';
    if (slug === 'erp-solutions') targetSlug = 'erp-software';
    if (slug === 'digital-marketing-seo') targetSlug = 'seo-digital-growth';
    if (slug === 'sales-service-solutions') targetSlug = 'business-software';

    const data = SERVICES_SEO_DATA[targetSlug];
    const currentLocale = this.localeService.currentConfig();
    const localeCode = currentLocale.code;

    if (!data) {
      this.router.navigate([`/${localeCode}/`]);
      return;
    }

    const isTopLevel = !this.router.url.split('?')[0].match(/^\/[a-z]{2}(-[a-z]{2})?\//);
    const canonicalUrl = `https://yogteck.com/services/${data.slug}`;

    this.breadcrumbItems = [
      { label: 'Home', url: '/' },
      { label: 'Services', url: '/services/website-development' },
      { label: data.title }
    ];

    // Build Structured Data (JSON-LD)
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
          "name": "Services",
          "item": "https://yogteck.com/services/website-development"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": data.title,
          "item": canonicalUrl
        }
      ]
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": data.title,
      "inLanguage": "en-IN",
      "provider": {
        "@type": "Organization",
        "name": "Yogteck Business Solution",
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
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "City", "name": "Kanpur" }
      ],
      "description": data.metaDescription
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

    if (isTopLevel) {
      this.seoService.setCanonicalPageSeo({
        title: data.metaTitle,
        description: data.metaDescription,
        canonicalUrl: canonicalUrl,
        jsonLdSchemas: [breadcrumbSchema, serviceSchema, faqSchema]
      });
    } else {
      this.seoService.setLocalizedPageSeo({
        title: data.metaTitle,
        description: data.metaDescription,
        localeCode: localeCode,
        pathWithoutLocale: `services/${data.slug}`,
        jsonLdSchemas: [breadcrumbSchema, serviceSchema, faqSchema]
      });
    }

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
