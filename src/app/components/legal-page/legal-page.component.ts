import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  selector: 'app-legal-page',
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
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.css'
})
export class LegalPageComponent implements OnInit, OnDestroy {
  isPrivacy = true;
  contact = CONTACT_CONFIG;
  breadcrumbItems: BreadcrumbItem[] = [];
  isDrawerOpen = false;
  isQuoteModalOpen = false;
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.url.subscribe(segments => {
      const path = segments.map(s => s.path).join('/');
      this.isPrivacy = !path.includes('terms');

      const canonicalUrl = this.isPrivacy
        ? 'https://yogteck.com/privacy-policy'
        : 'https://yogteck.com/terms-of-service';

      const title = this.isPrivacy
        ? 'Privacy Policy | YogTeck Business Solution'
        : 'Terms of Service | YogTeck Business Solution';

      const description = this.isPrivacy
        ? 'Read the privacy policy of YogTeck Business Solution detailing user data protection, inquiry handling, cookies, and privacy rights.'
        : 'Review the terms of service governing web development, software engineering contracts, IP rights, and SLAs with YogTeck Business Solution.';

      this.breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: this.isPrivacy ? 'Privacy Policy' : 'Terms of Service' }
      ];

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
          { "@type": "ListItem", "position": 2, "name": this.isPrivacy ? 'Privacy Policy' : 'Terms of Service', "item": canonicalUrl }
        ]
      };

      this.seoService.setCanonicalPageSeo({
        title: title,
        description: description,
        canonicalUrl: canonicalUrl,
        jsonLdSchemas: [breadcrumbSchema]
      });

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
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
