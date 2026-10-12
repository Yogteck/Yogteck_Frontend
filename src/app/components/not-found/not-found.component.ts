import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-page" [class.dir-rtl]="localeService.isRtl()">
      <div class="nf-ambient-glow" aria-hidden="true"></div>
      <div class="nf-container">
        <div class="nf-badge">404 ERROR</div>
        <h1 class="nf-code gradient-text">404</h1>
        <h2 class="nf-title">{{ dict().common.pageNotFound }}</h2>
        <p class="nf-desc">{{ dict().common.pageNotFoundDesc }}</p>
        
        <div class="nf-actions">
          <a [routerLink]="'/' + currentLocaleCode()" class="btn btn-primary-orange nf-btn">
            <span>{{ dict().common.backToHome }}</span>
            <svg viewBox="0 0 20 20" fill="currentColor" class="nf-arrow">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 30%, #0d1338 0%, #070a1f 100%);
      color: #ffffff;
      padding: 40px 20px;
      position: relative;
      overflow: hidden;
      text-align: center;
    }
    .nf-container {
      max-width: 580px;
      position: relative;
      z-index: 2;
    }
    .nf-ambient-glow {
      position: absolute;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(242, 140, 40, 0.15) 0%, rgba(13, 16, 48, 0) 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
    .nf-badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 9999px;
      border: 1px solid rgba(242, 140, 40, 0.5);
      background: rgba(242, 140, 40, 0.1);
      color: #F28C28;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }
    .nf-code {
      font-size: clamp(80px, 16vw, 150px);
      font-weight: 900;
      line-height: 1;
      margin: 0;
      background: linear-gradient(135deg, #ffffff 0%, #F28C28 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nf-title {
      font-size: clamp(22px, 4vw, 32px);
      font-weight: 700;
      margin: 16px 0 12px;
      color: #f1f5f9;
    }
    .nf-desc {
      font-size: 16px;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0 0 32px;
    }
    .nf-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    .nf-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 28px;
      border-radius: 8px;
      font-weight: 700;
      text-decoration: none;
    }
    .nf-arrow {
      width: 18px;
      height: 18px;
    }
    .dir-rtl .nf-arrow {
      transform: rotate(180deg);
    }
  `]
})
export class NotFoundComponent implements OnInit {
  public localeService = inject(LocaleService);
  private router = inject(Router);

  dict = this.localeService.currentDict;
  currentLocaleCode = () => this.localeService.currentConfig().code;

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.localeService.initLocaleFromUrl(window.location.pathname);
    }
  }
}
