import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { SOLUTIONS_DATA, SolutionData, isSolutionPageQualifiesForIndexing } from '../../data/solutions.data';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

@Component({
  selector: 'app-solution-page',
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
  templateUrl: './solution-page.component.html',
  styleUrl: './solution-page.component.css'
})
export class SolutionPageComponent implements OnInit, OnDestroy {
  solution: SolutionData | null = null;
  breadcrumbItems: BreadcrumbItem[] = [];
  contact = CONTACT_CONFIG;
  isDrawerOpen = false;
  isQuoteModalOpen = false;
  isIndexablePage = false;
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      let slug = params.get('slug');
      if (!slug) {
        const urlSegments = this.router.url.split('?')[0].split('/').filter(Boolean);
        slug = urlSegments[urlSegments.length - 1] || '';
      }

      const data = SOLUTIONS_DATA[slug];
      if (!data) {
        this.router.navigate(['/']);
        return;
      }

      this.solution = data;
      const canonicalUrl = `https://yogteck.com/solutions/${data.slug}`;

      this.breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Solutions', url: '/service-areas' },
        { label: data.h1 }
      ];

      const schemas: any[] = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
            { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://yogteck.com/service-areas" },
            { "@type": "ListItem", "position": 3, "name": data.h1, "item": canonicalUrl }
          ]
        }
      ];

      if (data.faqs && data.faqs.length > 0) {
        schemas.push({
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
        });
      }

      // Indexing Gate validation
      const gateResult = isSolutionPageQualifiesForIndexing(data);
      this.isIndexablePage = gateResult.qualifies;
      const robots = this.isIndexablePage
        ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        : 'noindex, nofollow';

      this.seoService.setCanonicalPageSeo({
        title: data.metaTitle,
        description: data.metaDescription,
        canonicalUrl: canonicalUrl,
        robots: robots,
        jsonLdSchemas: schemas
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
