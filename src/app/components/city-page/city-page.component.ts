import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { CITY_HUBS_DATA, CityHubData } from '../../data/extended-seo.data';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

@Component({
  selector: 'app-city-page',
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
  templateUrl: './city-page.component.html',
  styleUrl: './city-page.component.css'
})
export class CityPageComponent implements OnInit, OnDestroy {
  cityData: CityHubData | null = null;
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
      const cityKey = lastSegment.replace('it-software-company-', '').toLowerCase();

      const data = CITY_HUBS_DATA[cityKey];
      if (!data) {
        this.router.navigate(['/']);
        return;
      }

      this.cityData = data;
      const canonicalUrl = `https://yogteck.com/${data.slug}`;

      this.breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: `${data.city} IT Services` }
      ];

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
          { "@type": "ListItem", "position": 2, "name": `${data.city} IT Services`, "item": canonicalUrl }
        ]
      };

      // Set robots to noindex if city needs owner content
      const robots = data.isIndexable
        ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        : 'noindex, nofollow';

      this.seoService.setCanonicalPageSeo({
        title: data.metaTitle,
        description: data.metaDescription,
        canonicalUrl: canonicalUrl,
        robots: robots,
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
