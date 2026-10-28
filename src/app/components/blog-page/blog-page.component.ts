import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent, BreadcrumbItem } from '../breadcrumbs/breadcrumbs.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { BLOG_POSTS, BlogPost } from '../../data/blog.data';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

@Component({
  selector: 'app-blog-page',
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
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent implements OnInit, OnDestroy {
  contact = CONTACT_CONFIG;
  isDrawerOpen = false;
  isQuoteModalOpen = false;

  // View Mode: 'list' | 'detail'
  viewMode: 'list' | 'detail' = 'list';
  currentPost: BlogPost | null = null;
  relatedPostItems: BlogPost[] = [];

  // List View State
  allPosts: BlogPost[] = BLOG_POSTS;
  filteredPosts: BlogPost[] = BLOG_POSTS;
  categories: string[] = ['All', 'Web Development', 'Software Architecture', 'ERP & Billing'];
  cities: string[] = ['All', 'Kanpur', 'Lucknow', 'Uttar Pradesh'];
  selectedCategory = 'All';
  selectedCity = 'All';

  // Breadcrumbs
  breadcrumbItems: BreadcrumbItem[] = [];

  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');

      if (slug) {
        const post = this.allPosts.find(p => p.slug === slug);
        if (post) {
          this.viewMode = 'detail';
          this.currentPost = post;
          this.setupDetailView(post);
        } else {
          this.router.navigate(['/blog']);
        }
      } else {
        this.viewMode = 'list';
        this.currentPost = null;
        this.setupListView();
      }

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private setupListView(): void {
    this.breadcrumbItems = [
      { label: 'Home', url: '/' },
      { label: 'Blog' }
    ];
    this.applyFilters();

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
  }

  private setupDetailView(post: BlogPost): void {
    const canonicalUrl = `https://yogteck.com/blog/${post.slug}`;

    this.breadcrumbItems = [
      { label: 'Home', url: '/' },
      { label: 'Blog', url: '/blog' },
      { label: post.title }
    ];

    // Find related posts
    this.relatedPostItems = this.allPosts.filter(p =>
      post.relatedPosts.includes(p.slug) || (p.category === post.category && p.slug !== post.slug)
    ).slice(0, 3);

    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yogteck.com/" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://yogteck.com/blog" },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.h1,
        "description": post.metaDescription,
        "image": `https://yogteck.com${post.image}`,
        "datePublished": post.date,
        "dateModified": post.updated || post.date,
        "author": {
          "@type": "Person",
          "name": post.author,
          "jobTitle": post.authorRole
        },
        "publisher": {
          "@type": "Organization",
          "name": "YogTeck Business Solution",
          "url": "https://yogteck.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yogteck.com/assets/images/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      }
    ];

    if (post.faq && post.faq.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faq.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      });
    }

    this.seoService.setCanonicalPageSeo({
      title: post.metaTitle,
      description: post.metaDescription,
      canonicalUrl: canonicalUrl,
      jsonLdSchemas: schemas
    });
  }

  filterByCategory(cat: string): void {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  filterByCity(city: string): void {
    this.selectedCity = city;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredPosts = this.allPosts.filter(p => {
      const matchCat = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const matchCity = this.selectedCity === 'All' || p.city === this.selectedCity;
      return matchCat && matchCity;
    });
  }

  scrollToSection(sectionId: string): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  openDrawer(): void {
    this.isDrawerOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  openQuoteModal(): void {
    this.isQuoteModalOpen = true;
  }

  closeQuoteModal(): void {
    this.isQuoteModalOpen = false;
  }
}
