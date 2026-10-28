import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { CITY_HUBS_DATA, isCityPageQualifiesForIndexing } from '../../data/extended-seo.data';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

export interface ServiceRegionLocation {
  name: string;
  slug: string;
  cityKey: string;
  isHeadquarters?: boolean;
}

export interface ServiceRegion {
  name: string;
  stateHub?: ServiceRegionLocation;
  cities: ServiceRegionLocation[];
  description: string;
}

@Component({
  selector: 'app-service-areas',
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
  templateUrl: './service-areas.component.html',
  styleUrl: './service-areas.component.css'
})
export class ServiceAreasComponent implements OnInit {
  contact = CONTACT_CONFIG;
  isDrawerOpen = false;
  isQuoteModalOpen = false;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Service Areas' }
  ];

  regions: ServiceRegion[] = [
    {
      name: 'Uttar Pradesh',
      stateHub: { name: 'Uttar Pradesh State Overview', slug: 'it-software-company-uttar-pradesh', cityKey: 'uttar-pradesh' },
      description: 'Central engineering headquarters and on-site support corridor across eastern, central, and western UP.',
      cities: [
        { name: 'Kanpur', slug: 'it-software-company-kanpur', cityKey: 'kanpur', isHeadquarters: true },
        { name: 'Lucknow', slug: 'it-software-company-lucknow', cityKey: 'lucknow' },
        { name: 'Raebareli', slug: 'it-software-company-raebareli', cityKey: 'raebareli' }
      ]
    },
    {
      name: 'Delhi NCR',
      description: 'Remote enterprise cloud software, wholesale B2B ERP, and corporate portals for the national capital territory.',
      cities: [
        { name: 'Delhi', slug: 'it-software-company-delhi', cityKey: 'delhi' },
        { name: 'Noida', slug: 'it-software-company-noida', cityKey: 'noida' },
        { name: 'Gurugram', slug: 'it-software-company-gurugram', cityKey: 'gurugram' },
        { name: 'Faridabad', slug: 'it-software-company-faridabad', cityKey: 'faridabad' }
      ]
    },
    {
      name: 'Rajasthan',
      stateHub: { name: 'Rajasthan State Hub', slug: 'it-software-company-rajasthan', cityKey: 'rajasthan' },
      description: 'Cloud ERP and export portals for gems, jewelry, marble processing, and textile manufacturing.',
      cities: [
        { name: 'Jaipur', slug: 'it-software-company-jaipur', cityKey: 'jaipur' }
      ]
    },
    {
      name: 'Gujarat',
      stateHub: { name: 'Gujarat State Hub', slug: 'it-software-company-gujarat', cityKey: 'gujarat' },
      description: 'Industrial manufacturing ERP, multi-stage BOM systems, chemical processing, and synthetic textiles.',
      cities: [
        { name: 'Ahmedabad', slug: 'it-software-company-ahmedabad', cityKey: 'ahmedabad' }
      ]
    },
    {
      name: 'Madhya Pradesh',
      stateHub: { name: 'Madhya Pradesh State Hub', slug: 'it-software-company-madhya-pradesh', cityKey: 'madhya-pradesh' },
      description: 'Commercial trading suites, pharmaceutical formulations, agro-processing, and multi-godown stock sync.',
      cities: [
        { name: 'Indore', slug: 'it-software-company-indore', cityKey: 'indore' }
      ]
    },
    {
      name: 'Punjab / Chandigarh',
      description: 'Tri-city software engineering, pharmaceutical C&F distribution, and light engineering ERP.',
      cities: [
        { name: 'Chandigarh', slug: 'it-software-company-chandigarh', cityKey: 'chandigarh' }
      ]
    },
    {
      name: 'Maharashtra',
      description: 'Automotive ancillary ERP, precision tooling job-work tracking, D2C e-commerce, and corporate client portals.',
      cities: [
        { name: 'Mumbai', slug: 'it-software-company-mumbai', cityKey: 'mumbai' },
        { name: 'Pune', slug: 'it-software-company-pune', cityKey: 'pune' }
      ]
    },
    {
      name: 'Karnataka',
      description: 'Full-stack software engineering, multi-tenant SaaS architecture, and high-concurrency API backends.',
      cities: [
        { name: 'Bangalore', slug: 'it-software-company-bangalore', cityKey: 'bangalore' }
      ]
    }
  ];

  faqs = [
    {
      question: 'Where is YogTeck located and how do you serve clients outside Uttar Pradesh?',
      answer: 'YogTeck Business Solution is headquartered in Kanpur Nagar, Uttar Pradesh (Registered Office: 302/2, Mangla Vihar 2, New PAC Line, Kanpur 208015). We serve clients across Delhi NCR, Rajasthan, Gujarat, Madhya Pradesh, Chandigarh, Maharashtra, and Karnataka remotely through scheduled video workshops, private cloud staging environments, and direct architect-led delivery.'
    },
    {
      question: 'Do you have physical branch offices in cities other than Kanpur?',
      answer: 'No. We operate exclusively from our registered headquarters in Kanpur to maintain strict code quality, senior architect oversight, and transparent engineering costs without bloated regional branch overhead.'
    },
    {
      question: 'Why are some city pages marked as Coming Soon in the service directory?',
      answer: 'Under our strict technical SEO and editorial indexing gate, city and regional pages are published publicly only after regional case studies and business facts are directly verified. Pages currently undergoing verification remain marked as Coming Soon with noindex applied.'
    },
    {
      question: 'Can clients outside Kanpur receive on-site onboarding or hardware setup?',
      answer: 'For enterprise ERP deployments requiring physical barcode scanner calibration or multi-godown network deployment, scheduled on-site engineering visits can be coordinated alongside comprehensive recorded video staff training.'
    },
    {
      question: 'Who owns the intellectual property and source code for remote projects?',
      answer: 'You receive 100% intellectual property ownership, complete production source code, database access credentials, and server keys upon project milestone completion. We never enforce proprietary vendor lock-in.'
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    const canonicalUrl = 'https://yogteck.com/service-areas';

    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
          { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": canonicalUrl }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": this.faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      }
    ];

    this.seoService.setCanonicalPageSeo({
      title: 'IT & Software Service Areas Across India | YogTeck',
      description: 'Explore YogTeck software engineering service areas across India. We deliver cloud ERP, custom software & billing suites remotely from our Kanpur office.',
      canonicalUrl: canonicalUrl,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      jsonLdSchemas: schemas
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  isPagePassesGate(cityKey: string): boolean {
    const data = CITY_HUBS_DATA[cityKey];
    if (!data) return false;
    const gate = isCityPageQualifiesForIndexing(data);
    return gate.qualifies;
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
