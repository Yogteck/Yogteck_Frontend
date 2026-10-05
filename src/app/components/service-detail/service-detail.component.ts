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
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') || '';
      this.loadService(slug);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private loadService(slug: string): void {
    // Check direct slug or aliases
    let targetSlug = slug;
    if (slug === 'ecommerce-solutions') targetSlug = 'ecommerce-development';
    if (slug === 'erp-solutions') targetSlug = 'erp-software';
    if (slug === 'digital-marketing-seo') targetSlug = 'seo-digital-growth';
    if (slug === 'sales-service-solutions') targetSlug = 'business-software';

    const data = SERVICES_SEO_DATA[targetSlug];
    if (!data) {
      this.router.navigate(['/']);
      return;
    }

    this.serviceData = data;
    this.breadcrumbItems = [
      { label: 'Services', url: '/#services' },
      { label: data.title }
    ];

    // Build Structured Data (JSON-LD)
    const canonicalPath = `/services/${data.slug}`;
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
          "item": "https://yogteck.com/#services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": data.title,
          "item": `https://yogteck.com${canonicalPath}`
        }
      ]
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": data.title,
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
        { "@type": "City", "name": "Kanpur" },
        { "@type": "City", "name": "Lucknow" },
        { "@type": "City", "name": "Raebareli" },
        { "@type": "Country", "name": "India" }
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

    // Apply SEO
    this.seoService.setPageSeo({
      title: data.metaTitle,
      description: data.metaDescription,
      canonicalPath: canonicalPath,
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
