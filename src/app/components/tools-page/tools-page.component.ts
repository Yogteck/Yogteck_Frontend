import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { PRODUCTS_SEO_DATA, ProductDetailData } from '../../data/extended-seo.data';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  badge: string;
  summary: string;
  features: string[];
  productSlug: string;
}

export const TOOLS_LIST: ToolItem[] = [
  {
    id: 'whatsapp-marketing-tool',
    slug: 'whatsapp-marketing-tool',
    title: 'WhatsApp Marketing Tool',
    metaTitle: 'WhatsApp Marketing Tool | YogTeck Business Solution',
    metaDescription: 'YogTeck WhatsApp Marketing Tool automates customer messaging, lead capture, brochure dispatch, payment reminders, and PDF invoicing on monthly subscription plans.',
    h1: 'WhatsApp Marketing & Business Automation Tool',
    badge: 'Monthly Subscription',
    summary: 'Automate customer lead capture from web forms and advertisements, send instant greeting brochures, schedule payment dues reminders, and deliver digital invoice PDFs.',
    features: ['Webhook Lead Capture', 'WhatsApp PDF Receipts', 'Scheduled Payment Reminders', 'Multi-Agent Shared Inbox'],
    productSlug: 'whatsapp-marketing-tool'
  },
  {
    id: 'gst-billing-software',
    slug: 'gst-billing-software',
    title: 'GST Billing & Invoicing Software',
    metaTitle: 'Billing Software | YogTeck Business Solution',
    metaDescription: 'YogTeck provides high-speed GST billing & retail POS software with 10-second invoicing, barcode scanning, thermal printing, and instant WhatsApp PDF receipts.',
    h1: 'GST Billing & POS Invoicing Software',
    badge: 'High Speed POS',
    summary: 'Lightning-fast retail POS and wholesale billing software with barcode scanning, custom barcode label printing, thermal receipts, and automated customer Udhar credit ledgers.',
    features: ['10-Second GST Invoices', 'WhatsApp PDF Receipts', 'Barcode Scanning & Printing', 'Thermal POS Support'],
    productSlug: 'billing-software'
  },
  {
    id: 'cloud-erp',
    slug: 'cloud-erp',
    title: 'Cloud ERP Software Platform',
    metaTitle: 'ERP Software | YogTeck Business Solution',
    metaDescription: 'YogTeck Cloud ERP unifies inventory management, multi-warehouse stock, GST e-invoicing, production BOM, and staff payroll into one secure real-time web platform.',
    h1: 'Cloud ERP Software Platform',
    badge: 'Enterprise Platform',
    summary: 'Centralized enterprise resource planning software unifying real-time multi-warehouse stock, production Bill of Materials (BOM), automated GST e-way billing, and payroll.',
    features: ['Multi-Warehouse Inventory', 'Production & Bill of Materials', 'Automated GST E-Way Bills', 'HR & Biometric Payroll'],
    productSlug: 'erp-software'
  }
];

@Component({
  selector: 'app-tools-page',
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
  templateUrl: './tools-page.component.html',
  styleUrl: './tools-page.component.css'
})
export class ToolsPageComponent implements OnInit, OnDestroy {
  isDetailView = false;
  activeTool: ToolItem | null = null;
  toolProductData: ProductDetailData | null = null;
  toolsList = TOOLS_LIST;
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
      const toolId = params.get('toolId');
      if (toolId) {
        const found = TOOLS_LIST.find(t => t.slug === toolId || t.id === toolId);
        if (found) {
          this.isDetailView = true;
          this.activeTool = found;
          this.toolProductData = PRODUCTS_SEO_DATA[found.productSlug] || null;
          this.setupDetailPage(found);
          return;
        }
      }
      this.isDetailView = false;
      this.activeTool = null;
      this.setupIndexPage();
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private setupIndexPage(): void {
    const canonicalUrl = 'https://yogteck.com/tools';
    this.breadcrumbItems = [
      { label: 'Home', url: '/' },
      { label: 'Digital Tools & Products' }
    ];

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
        { "@type": "ListItem", "position": 2, "name": "Digital Tools", "item": canonicalUrl }
      ]
    };

    this.seoService.setCanonicalPageSeo({
      title: 'Digital Products & Tools | YogTeck Business Solution',
      description: 'Explore proprietary software tools and business platforms built by YogTeck Business Solution: WhatsApp marketing tool, GST billing software, and Cloud ERP.',
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: [breadcrumbSchema]
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  private setupDetailPage(tool: ToolItem): void {
    const canonicalUrl = `https://yogteck.com/tools/${tool.slug}`;
    this.breadcrumbItems = [
      { label: 'Home', url: '/' },
      { label: 'Tools', url: '/tools' },
      { label: tool.title }
    ];

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://yogteck.com/tools" },
        { "@type": "ListItem", "position": 3, "name": tool.title, "item": canonicalUrl }
      ]
    };

    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `YogTeck ${tool.title}`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Windows, macOS, Android, iOS",
      "url": canonicalUrl,
      "description": tool.metaDescription
    };

    this.seoService.setCanonicalPageSeo({
      title: tool.metaTitle,
      description: tool.metaDescription,
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: [breadcrumbSchema, softwareSchema]
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
