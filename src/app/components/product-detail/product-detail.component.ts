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

@Component({
  selector: 'app-product-detail',
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
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productData: ProductDetailData | null = null;
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
      const urlSegments = this.router.url.split('?')[0].split('/').filter(Boolean);
      const lastSegment = urlSegments[urlSegments.length - 1] || '';
      const slug = params.get('slug') || lastSegment;
      this.loadProduct(slug);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private loadProduct(slug: string): void {
    let targetSlug = slug;
    if (slug === 'erp') targetSlug = 'erp-software';
    if (slug === 'saas') targetSlug = 'saas-platform';
    if (slug === 'whatsapp') targetSlug = 'whatsapp-marketing-tool';

    const data = PRODUCTS_SEO_DATA[targetSlug];
    if (!data) {
      this.router.navigate(['/']);
      return;
    }

    this.productData = data;
    const canonicalUrl = `https://yogteck.com/products/${data.slug}`;

    this.breadcrumbItems = [
      { label: 'Products', url: '/products/erp-software' },
      { label: data.title }
    ];

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
          "name": "Products",
          "item": "https://yogteck.com/products/erp-software"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": data.title,
          "item": canonicalUrl
        }
      ]
    };

    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `YogTeck ${data.title}`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Cloud, Windows, macOS, Android, iOS",
      "url": canonicalUrl,
      "description": data.metaDescription,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "0",
        "offerCount": "3"
      },
      "creator": {
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
      jsonLdSchemas: [breadcrumbSchema, softwareSchema, faqSchema]
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
