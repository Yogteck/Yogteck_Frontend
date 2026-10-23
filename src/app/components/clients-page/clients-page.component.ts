import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { CLIENTS_CASE_STUDIES_DATA, ClientCaseStudyData } from '../../data/extended-seo.data';
import { CLIENTS_DATA, ClientItem } from '../../data/clients.data';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

@Component({
  selector: 'app-clients-page',
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
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.css'
})
export class ClientsPageComponent implements OnInit, OnDestroy {
  isDetailView = false;
  caseStudy: ClientCaseStudyData | null = null;
  clientsList: ClientItem[] = CLIENTS_DATA;
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
      const clientId = params.get('clientId');
      if (clientId && CLIENTS_CASE_STUDIES_DATA[clientId]) {
        this.isDetailView = true;
        this.caseStudy = CLIENTS_CASE_STUDIES_DATA[clientId];
        this.setupDetailPage(this.caseStudy);
      } else {
        this.isDetailView = false;
        this.caseStudy = null;
        this.setupIndexPage();
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private setupIndexPage(): void {
    const canonicalUrl = 'https://yogteck.com/clients';
    this.breadcrumbItems = [
      { label: 'Home', url: '/' },
      { label: 'Our Clients' }
    ];

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
        { "@type": "ListItem", "position": 2, "name": "Our Clients", "item": canonicalUrl }
      ]
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Yogteck Business Solution",
      "url": "https://yogteck.com/",
      "logo": "https://yogteck.com/favicon-512x512.png"
    };

    this.seoService.setCanonicalPageSeo({
      title: 'Our Clients | YogTeck Business Solution',
      description: 'Discover the ambitious enterprises and corporate partners powered by YogTeck Business Solution across real estate, healthcare, IT, and distribution.',
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: [breadcrumbSchema, organizationSchema]
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  private setupDetailPage(data: ClientCaseStudyData): void {
    const canonicalUrl = `https://yogteck.com/clients/${data.clientId}`;
    this.breadcrumbItems = [
      { label: 'Home', url: '/' },
      { label: 'Our Clients', url: '/clients' },
      { label: data.shortName }
    ];

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
        { "@type": "ListItem", "position": 2, "name": "Our Clients", "item": "https://yogteck.com/clients" },
        { "@type": "ListItem", "position": 3, "name": data.shortName, "item": canonicalUrl }
      ]
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
      jsonLdSchemas: [breadcrumbSchema, faqSchema]
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
