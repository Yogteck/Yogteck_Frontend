import { Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LocaleService } from '../../services/locale.service';
import { LocaleConfig } from '../../data/locales.config';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="lang-switcher-wrapper" [class.is-open]="isOpen" [class.footer-variant]="variant === 'footer'">
      <!-- Switcher Button Trigger -->
      <button
        type="button"
        (click)="toggleDropdown()"
        class="lang-switcher-btn"
        [attr.aria-expanded]="isOpen"
        aria-label="Select Country and Language"
        aria-haspopup="listbox">
        <span class="flag-icon" aria-hidden="true">{{ currentConfig().flagEmoji }}</span>
        <span class="locale-label">{{ currentConfig().nativeName }}</span>
        <svg viewBox="0 0 20 20" fill="currentColor" class="chevron-icon" [class.rotated]="isOpen" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Dropdown Menu with Real <a href> Links for Crawlers -->
      @if (isOpen) {
        <div class="lang-dropdown-menu" role="listbox" [class.dropdown-upward]="variant === 'footer'">
          <div class="dropdown-header">
            <span>{{ dict().common.languageSwitcherTitle }}</span>
          </div>
          <div class="dropdown-items-scroll">
            @for (loc of localeService.supportedLocales; track loc.code) {
              <a
                [href]="getHrefForLocale(loc.code)"
                [routerLink]="getRouterPathForLocale(loc.code)"
                (click)="onSelectLocale(loc.code, $event)"
                class="lang-option-link"
                [class.is-active]="loc.code === currentConfig().code"
                role="option"
                [attr.aria-selected]="loc.code === currentConfig().code">
                <span class="opt-flag" aria-hidden="true">{{ loc.flagEmoji }}</span>
                <div class="opt-text">
                  <span class="opt-native">{{ loc.nativeName }}</span>
                  <span class="opt-country">{{ loc.countryName }} ({{ loc.currencySymbol }})</span>
                </div>
                @if (loc.code === currentConfig().code) {
                  <span class="opt-check" aria-hidden="true">✓</span>
                }
              </a>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .lang-switcher-wrapper {
      position: relative;
      display: inline-block;
      font-family: inherit;
    }
    .lang-switcher-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(8px);
      user-select: none;
    }
    .lang-switcher-btn:hover,
    .lang-switcher-wrapper.is-open .lang-switcher-btn {
      background: rgba(242, 140, 40, 0.15);
      border-color: rgba(242, 140, 40, 0.5);
      color: #ffffff;
    }
    .flag-icon {
      font-size: 15px;
      line-height: 1;
    }
    .locale-label {
      font-size: 12px;
      letter-spacing: 0.2px;
    }
    .chevron-icon {
      width: 14px;
      height: 14px;
      transition: transform 0.2s ease;
      opacity: 0.75;
    }
    .chevron-icon.rotated {
      transform: rotate(180deg);
    }
    .lang-dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      inset-inline-end: 0;
      width: 260px;
      background: #090e24;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
      z-index: 1050;
      overflow: hidden;
      backdrop-filter: blur(16px);
      animation: fadeInDown 0.15s ease-out;
    }
    .lang-dropdown-menu.dropdown-upward {
      top: auto;
      bottom: calc(100% + 8px);
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .dropdown-header {
      padding: 10px 14px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #94a3b8;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.02);
    }
    .dropdown-items-scroll {
      max-height: 290px;
      overflow-y: auto;
      padding: 4px 0;
    }
    .dropdown-items-scroll::-webkit-scrollbar {
      width: 5px;
    }
    .dropdown-items-scroll::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }
    .lang-option-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 14px;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 13px;
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .lang-option-link:hover {
      background: rgba(242, 140, 40, 0.12);
      color: #ffffff;
    }
    .lang-option-link.is-active {
      background: rgba(242, 140, 40, 0.2);
      color: #F28C28;
      font-weight: 700;
    }
    .opt-flag {
      font-size: 16px;
      flex-shrink: 0;
    }
    .opt-text {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      text-align: start;
    }
    .opt-native {
      font-size: 13px;
      line-height: 1.3;
    }
    .opt-country {
      font-size: 11px;
      color: #64748b;
      margin-top: 1px;
    }
    .opt-check {
      color: #F28C28;
      font-weight: 800;
      font-size: 13px;
    }
    /* Footer variant tweaks */
    .footer-variant .lang-switcher-btn {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class LanguageSwitcherComponent {
  @Input() variant: 'navbar' | 'footer' | 'mobile' = 'navbar';

  public localeService = inject(LocaleService);
  private router = inject(Router);
  private elRef = inject(ElementRef);

  isOpen = false;
  currentConfig = this.localeService.currentConfig;
  dict = this.localeService.currentDict;

  constructor() {}

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeDropdown();
  }

  getHrefForLocale(targetLocale: string): string {
    return this.localeService.getSwitchLocaleUrl(targetLocale);
  }

  getRouterPathForLocale(targetLocale: string): string {
    return this.localeService.getSwitchLocaleUrl(targetLocale);
  }

  onSelectLocale(targetLocale: string, event: MouseEvent): void {
    // Write cookie and switch locale
    this.localeService.setLocale(targetLocale, true);
    this.closeDropdown();
  }
}
