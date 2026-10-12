import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LocaleService } from '../../services/locale.service';
import { SeoService } from '../../services/seo.service';
import { SmartRedirectService } from '../../services/smart-redirect.service';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileDrawerComponent } from '../mobile-drawer/mobile-drawer.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileActionBarComponent } from '../mobile-action-bar/mobile-action-bar.component';
import { FloatingWhatsappComponent } from '../floating-whatsapp/floating-whatsapp.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    MobileDrawerComponent,
    FooterComponent,
    MobileActionBarComponent,
    FloatingWhatsappComponent,
    QuoteModalComponent
  ],
  template: `
    <!-- Header Navigation -->
    <app-navbar
      (openQuote)="openQuoteModal()"
      (toggleDrawer)="openDrawer()">
    </app-navbar>

    <!-- Mobile Slide-out Drawer -->
    <app-mobile-drawer
      [isOpen]="isDrawerOpen"
      (closeDrawer)="closeDrawer()"
      (openQuote)="openQuoteModal()">
    </app-mobile-drawer>

    <main class="not-found-main" [class.dir-rtl]="localeService.isRtl()">
      <div class="nf-ambient-glow nf-glow-1" aria-hidden="true"></div>
      <div class="nf-ambient-glow nf-glow-2" aria-hidden="true"></div>

      <div class="container nf-container">
        <!-- 404 Status Pill Badge -->
        <div class="nf-badge-wrapper">
          <span class="nf-badge">
            <span class="nf-pulse-dot"></span>
            <span>404 ERROR &bull; {{ dict().common.pageNotFound }}</span>
          </span>
        </div>

        <!-- Giant Gradient 404 Code -->
        <h1 class="nf-code gradient-text">404</h1>

        <!-- Localized Title and Subtitle -->
        <h2 class="nf-title">{{ dict().common.pageNotFound }}</h2>
        <p class="nf-desc">{{ dict().common.pageNotFoundDesc }}</p>

        <!-- Primary Action CTAs -->
        <div class="nf-actions">
          <a [routerLink]="'/' + currentLocaleCode()" class="btn btn-primary-orange nf-btn">
            <span>{{ dict().common.backToHome }}</span>
            <svg viewBox="0 0 20 20" fill="currentColor" class="nf-arrow">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </a>

          <button type="button" (click)="openQuoteModal()" class="btn btn-secondary-dark nf-btn">
            <span>{{ dict().nav.getQuoteBtn }}</span>
          </button>

          <a [href]="contact.whatsappLink" target="_blank" rel="noopener noreferrer" class="btn btn-secondary-dark nf-btn">
            <span>WhatsApp</span>
          </a>
        </div>

        <!-- Suggested Core Solutions Grid -->
        <div class="nf-suggestions-box">
          <h3 class="nf-suggestions-title">
            <span class="nf-sparkle">✦</span>
            <span>Explore Popular Solutions</span>
          </h3>

          <div class="nf-grid">
            <a [routerLink]="['/', currentLocaleCode(), 'services', 'erp-software']" class="nf-card">
              <div class="nf-card-icon">⚡</div>
              <div class="nf-card-body">
                <h4>ERP Software</h4>
                <p>Custom enterprise resource planning and automation</p>
              </div>
              <span class="nf-card-arrow">&rarr;</span>
            </a>

            <a [routerLink]="['/', currentLocaleCode(), 'services', 'custom-software-development']" class="nf-card">
              <div class="nf-card-icon">💻</div>
              <div class="nf-card-body">
                <h4>Custom Software</h4>
                <p>Tailored web apps, enterprise SaaS, and APIs</p>
              </div>
              <span class="nf-card-arrow">&rarr;</span>
            </a>

            <a [routerLink]="['/', currentLocaleCode(), 'services', 'billing-software']" class="nf-card">
              <div class="nf-card-icon">📊</div>
              <div class="nf-card-body">
                <h4>Billing &amp; POS</h4>
                <p>Tax-compliant invoicing, inventory, and retail POS</p>
              </div>
              <span class="nf-card-arrow">&rarr;</span>
            </a>

            <a [routerLink]="['/', currentLocaleCode(), 'services', 'website-development']" class="nf-card">
              <div class="nf-card-icon">🌐</div>
              <div class="nf-card-body">
                <h4>Web &amp; E-Commerce</h4>
                <p>High-conversion storefronts and corporate websites</p>
              </div>
              <span class="nf-card-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <app-footer (openQuote)="openQuoteModal()"></app-footer>

    <!-- Mobile Fixed Action Bar -->
    <app-mobile-action-bar (openQuote)="openQuoteModal()"></app-mobile-action-bar>

    <!-- Floating WhatsApp CTA -->
    <app-floating-whatsapp></app-floating-whatsapp>

    <!-- Quote & Architecture Modal -->
    <app-quote-modal
      [isOpen]="isQuoteModalOpen"
      (closeModal)="closeQuoteModal()">
    </app-quote-modal>
  `,
  styles: [`
    .not-found-main {
      min-height: calc(100vh - 80px);
      display: flex;
      align-items: center;
      justify-content: center;
      background: #070A1F;
      color: #ffffff;
      padding: 120px 20px 80px;
      position: relative;
      overflow: hidden;
      text-align: center;
    }

    .nf-container {
      max-width: 840px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .nf-ambient-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
      z-index: 1;
    }

    .nf-glow-1 {
      width: 480px;
      height: 480px;
      background: radial-gradient(circle, rgba(242, 140, 40, 0.16) 0%, transparent 70%);
      top: 20%;
      left: 50%;
      transform: translate(-50%, -20%);
    }

    .nf-glow-2 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(46, 91, 255, 0.14) 0%, transparent 70%);
      bottom: 10%;
      right: 15%;
    }

    .nf-badge-wrapper {
      margin-bottom: 20px;
    }

    .nf-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 18px;
      border-radius: 9999px;
      border: 1px solid rgba(242, 140, 40, 0.4);
      background: rgba(242, 140, 40, 0.08);
      color: #F28C28;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .nf-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #F28C28;
      box-shadow: 0 0 10px #F28C28;
      animation: pulseDot 2s infinite;
    }

    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }

    .nf-code {
      font-size: clamp(96px, 18vw, 170px);
      font-weight: 900;
      line-height: 0.95;
      margin: 0;
      letter-spacing: -2px;
      background: linear-gradient(135deg, #ffffff 30%, #F28C28 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }

    .nf-title {
      font-size: clamp(24px, 4vw, 36px);
      font-weight: 800;
      margin: 20px 0 12px;
      color: #f8fafc;
    }

    .nf-desc {
      font-size: clamp(15px, 2vw, 18px);
      color: #94a3b8;
      line-height: 1.6;
      margin: 0 auto 36px;
      max-width: 620px;
    }

    .nf-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      margin-bottom: 56px;
    }

    .nf-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 13px 28px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }

    .nf-btn:hover {
      transform: translateY(-2px);
    }

    .btn-primary-orange {
      background: linear-gradient(135deg, #F28C28 0%, #E07817 100%);
      color: #ffffff;
      box-shadow: 0 8px 24px rgba(242, 140, 40, 0.35);
      border: none;
    }

    .btn-secondary-dark {
      background: rgba(255, 255, 255, 0.05);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .btn-secondary-dark:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .nf-arrow {
      width: 18px;
      height: 18px;
      transition: transform 0.2s ease;
    }

    .nf-btn:hover .nf-arrow {
      transform: translateX(4px);
    }

    .dir-rtl .nf-arrow {
      transform: rotate(180deg);
    }

    .dir-rtl .nf-btn:hover .nf-arrow {
      transform: rotate(180deg) translateX(4px);
    }

    /* Suggestions Grid */
    .nf-suggestions-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 32px 24px;
      backdrop-filter: blur(12px);
    }

    .nf-suggestions-title {
      font-size: 17px;
      font-weight: 700;
      color: #cbd5e1;
      margin: 0 0 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .nf-sparkle {
      color: #F28C28;
    }

    .nf-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      text-align: start;
    }

    .nf-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 18px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      text-decoration: none;
      color: inherit;
      transition: all 0.25s ease;
    }

    .nf-card:hover {
      background: rgba(242, 140, 40, 0.08);
      border-color: rgba(242, 140, 40, 0.3);
      transform: translateY(-3px);
    }

    .nf-card-icon {
      font-size: 22px;
      flex-shrink: 0;
    }

    .nf-card-body {
      flex: 1;
    }

    .nf-card-body h4 {
      margin: 0 0 4px;
      font-size: 15px;
      font-weight: 700;
      color: #f1f5f9;
    }

    .nf-card-body p {
      margin: 0;
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.4;
    }

    .nf-card-arrow {
      color: #F28C28;
      font-size: 16px;
      opacity: 0.6;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .nf-card:hover .nf-card-arrow {
      opacity: 1;
      transform: translateX(4px);
    }

    .dir-rtl .nf-card:hover .nf-card-arrow {
      transform: translateX(-4px);
    }

    @media (max-width: 640px) {
      .not-found-main {
        padding: 90px 16px 60px;
      }
      .nf-suggestions-box {
        padding: 20px 14px;
      }
      .nf-grid {
        grid-template-columns: 1fr;
      }
      .nf-actions {
        flex-direction: column;
      }
      .nf-btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class NotFoundComponent implements OnInit {
  public localeService = inject(LocaleService);
  private seoService = inject(SeoService);
  private smartRedirectService = inject(SmartRedirectService);
  private router = inject(Router);

  contact = CONTACT_CONFIG;
  isDrawerOpen = false;
  isQuoteModalOpen = false;

  dict = this.localeService.currentDict;
  currentLocaleCode = () => this.localeService.currentConfig().code;

  constructor() {}

  ngOnInit(): void {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/404';
    
    // 1. Ensure locale sync from URL
    const activeLocale = this.localeService.initLocaleFromUrl(pathname);

    // 2. Set strict SEO with noindex, follow
    const pageTitle = `404 - ${this.dict().common.pageNotFound} | Yogteck Business Solution`;
    this.seoService.setLocalizedPageSeo({
      title: pageTitle,
      description: this.dict().common.pageNotFoundDesc,
      localeCode: activeLocale,
      pathWithoutLocale: '404',
      robots: 'noindex, follow'
    });

    // 3. Log 404 hit for SEO tracking
    if (typeof window !== 'undefined') {
      this.smartRedirectService.log404Hit(pathname);
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
}
