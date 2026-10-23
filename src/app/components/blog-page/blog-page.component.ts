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

export interface BlogPostCard {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  date: string;
  slug: string;
}

@Component({
  selector: 'app-blog-page',
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
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent implements OnInit {
  contact = CONTACT_CONFIG;
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Blog' }
  ];
  isDrawerOpen = false;
  isQuoteModalOpen = false;

  articles: BlogPostCard[] = [
    {
      id: 'custom-software-vs-saas',
      title: 'Custom Software vs. SaaS: Which Fits Your Growing Business Best?',
      category: 'Software Architecture',
      summary: 'Explore when it makes financial and operational sense to build a custom software asset versus subscribing to a ready-made SaaS tool.',
      readTime: '6 min read',
      date: 'October 2026',
      slug: 'custom-software-vs-saas'
    },
    {
      id: 'fast-gst-billing-guide',
      title: 'How to Implement 10-Second GST Invoicing & WhatsApp Receipts in Retail',
      category: 'Billing & POS',
      summary: 'Eliminate counter queues during rush hours: best practices for pairing barcode scanners, thermal POS printers, and instant WhatsApp PDF receipts.',
      readTime: '5 min read',
      date: 'October 2026',
      slug: 'fast-gst-billing-guide'
    },
    {
      id: 'local-seo-guide-up',
      title: 'Local SEO Strategy for Uttar Pradesh: Ranking in Kanpur & Lucknow on Google Maps',
      category: 'Digital Growth',
      summary: 'A step-by-step breakdown of Google Business Profile verification, NAP consistency, local citation signals, and capturing inbound buyer searches.',
      readTime: '7 min read',
      date: 'October 2026',
      slug: 'local-seo-guide-up'
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    const canonicalUrl = 'https://yogteck.com/blog';

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": canonicalUrl }
      ]
    };

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "YogTeck Engineering & Growth Blog",
      "url": canonicalUrl,
      "description": "Engineering insights, software architecture guides, and digital business growth strategies by YogTeck Business Solution."
    };

    this.seoService.setCanonicalPageSeo({
      title: 'Engineering & Business Blog | YogTeck Business Solution',
      description: 'Practical software engineering guides, GST billing insights, ERP architecture, and Local SEO strategies for Indian MSMEs by YogTeck Business Solution.',
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: [breadcrumbSchema, blogSchema]
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
