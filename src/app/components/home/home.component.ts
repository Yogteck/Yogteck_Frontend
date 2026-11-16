import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { LocaleService } from '../../services/locale.service';
import { SeoService } from '../../services/seo.service';

interface Testimonial {
  quote: string;
  author: string;
  designation: string;
  location: string;
  rating: number;
}

interface ServiceCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
}

interface IndustryItem {
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    QuoteModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  localeService = inject(LocaleService);
  seoService = inject(SeoService);
  route = inject(ActivatedRoute);

  contact = CONTACT_CONFIG;
  isQuoteModalOpen = false;
  selectedServiceTitle = 'Website Designing & Development';

  // Forms
  heroForm = {
    name: '',
    phone: '',
    service: 'Website Designing & Development',
    message: ''
  };
  heroSubmitted = false;

  leadForm = {
    name: '',
    phone: '',
    service: 'Website Designing & Development',
    message: ''
  };
  leadSubmitted = false;

  // Tabs for Technologies section
  activeTechTab: 'web' | 'app' | 'design' = 'web';

  // Testimonials slider
  currentTestimonialIndex = 0;
  testimonials: Testimonial[] = [
    {
      quote: '[CLIENT 1 REVIEW PLACEHOLDER: Yogteck delivered our corporate website on schedule with direct developer communication and clean code. Highly responsive team in Kanpur.]',
      author: '[CLIENT 1 NAME]',
      designation: '[CLIENT 1 DESIGNATION]',
      location: 'Kanpur, UP',
      rating: 5
    },
    {
      quote: '[CLIENT 2 REVIEW PLACEHOLDER: The custom billing and inventory software streamlined our operations and cut down manual entry significantly. Excellent milestone delivery.]',
      author: '[CLIENT 2 NAME]',
      designation: '[CLIENT 2 DESIGNATION]',
      location: 'Lucknow, UP',
      rating: 5
    },
    {
      quote: '[CLIENT 3 REVIEW PLACEHOLDER: Their local SEO and Google Business optimization boosted our regional visibility and customer inquiries across Uttar Pradesh.]',
      author: '[CLIENT 3 NAME]',
      designation: '[CLIENT 3 DESIGNATION]',
      location: 'Unnao / Kanpur, UP',
      rating: 5
    }
  ];

  // Services
  services: ServiceCard[] = [
    {
      id: 'web',
      title: 'Website Designing & Development',
      icon: '🌐',
      description: 'High-performance, mobile-responsive static and dynamic websites built for lightning speed, clean SEO markup, and maximum visitor conversion.',
      deliverables: [
        'Custom Business & Corporate Websites',
        'WordPress & Headless CMS Portals',
        'Static High-Speed Landing Pages',
        'Website Redesign & Speed Optimization'
      ]
    },
    {
      id: 'digital',
      title: 'Digital Marketing & Lead Generation',
      icon: '📈',
      description: 'Data-driven online advertising campaigns designed to generate measurable sales inquiries, qualified calls, and brand traction.',
      deliverables: [
        'Targeted Google Ads (Search & Display PPC)',
        'Facebook & Instagram Lead Generation',
        'Social Media Brand Strategy',
        'Conversion Rate & Funnel Optimization'
      ]
    },
    {
      id: 'seo',
      title: 'SEO & Local Search Optimization',
      icon: '🎯',
      description: 'Systematic on-page, off-page, and Google Business Profile optimization to rank your business at the top of local and national searches.',
      deliverables: [
        'Kanpur & Regional Local SEO Optimization',
        'Google My Business Profile Ranking',
        'E-commerce & Product Catalog SEO',
        'Technical Audit & Clean Architecture'
      ]
    },
    {
      id: 'software',
      title: 'Custom Software & Mobile Apps',
      icon: '💻',
      description: 'Tailored enterprise software, automated billing engines, and cross-platform Android & iOS applications built to scale your workflow.',
      deliverables: [
        'Cloud ERP, CRM & Inventory Systems',
        'Retail POS & Invoicing Solutions',
        'Cross-Platform Mobile Apps (Flutter / React Native)',
        'Secure API & Payment Gateway Integrations'
      ]
    }
  ];

  // Industries
  industries: IndustryItem[] = [
    { name: 'Real Estate & Construction', icon: '🏗️', description: 'Property listing portals, CRM lead management & builder showcase platforms.' },
    { name: 'E-Commerce & Retail', icon: '🛒', description: 'Multi-category web storefronts, integrated shopping apps & automated inventory.' },
    { name: 'Education & Coaching', icon: '🎓', description: 'Student admission portals, test series platforms & institute websites.' },
    { name: 'Healthcare & Clinics', icon: '🏥', description: 'Patient appointment scheduling, doctor profiles & diagnostic reporting.' },
    { name: 'Manufacturing & Textiles', icon: '🏭', description: 'Kanpur leather & industrial supplier catalogs with B2B quotation workflows.' },
    { name: 'Hotels & Restaurants', icon: '🍽️', description: 'Table reservations, digital QR menus & online food ordering systems.' },
    { name: 'Logistics & Transport', icon: '🚚', description: 'Consignment booking, live shipment tracking & fleet rate calculators.' },
    { name: 'CA, Legal & Professional', icon: '⚖️', description: 'Secure client document submission, taxation trackers & compliance portals.' }
  ];

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      document.title = 'Yogteck - Web Design, Custom Software & Digital Services in Kanpur';
    }
  }

  openQuoteModal(serviceTitle?: string): void {
    if (serviceTitle) {
      this.selectedServiceTitle = serviceTitle;
    }
    this.isQuoteModalOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeQuoteModal(): void {
    this.isQuoteModalOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  setTechTab(tab: 'web' | 'app' | 'design'): void {
    this.activeTechTab = tab;
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  onHeroSubmit(): void {
    if (!this.heroForm.name || !this.heroForm.phone) return;
    this.heroSubmitted = true;
    // Open WhatsApp link or quote modal with prefilled data
    const message = encodeURIComponent(`Hello Yogteck, I would like a quote for ${this.heroForm.service}. Name: ${this.heroForm.name}, Phone: ${this.heroForm.phone}, Message: ${this.heroForm.message}`);
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/918299209905?text=${message}`, '_blank');
    }
  }

  onLeadSubmit(): void {
    if (!this.leadForm.name || !this.leadForm.phone) return;
    this.leadSubmitted = true;
    const message = encodeURIComponent(`Hello Yogteck, I would like a quote for ${this.leadForm.service}. Name: ${this.leadForm.name}, Phone: ${this.leadForm.phone}, Message: ${this.leadForm.message}`);
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/918299209905?text=${message}`, '_blank');
    }
  }

  scrollToTop(event?: Event): void {
    if (event) event.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
