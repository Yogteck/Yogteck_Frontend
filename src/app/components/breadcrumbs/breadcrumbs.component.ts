import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="breadcrumbs-nav" aria-label="Breadcrumb">
      <ol class="breadcrumbs-list" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a routerLink="/" itemprop="item" class="breadcrumb-link">
            <svg class="home-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            <span itemprop="name">Home</span>
          </a>
          <meta itemprop="position" content="1" />
        </li>

        @for (item of items; track item.label; let i = $index) {
          <li class="breadcrumb-separator" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
          </li>
          <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            @if (item.url && i < items.length - 1) {
              <a [routerLink]="item.url" itemprop="item" class="breadcrumb-link">
                <span itemprop="name">{{ item.label }}</span>
              </a>
            } @else {
              <span class="breadcrumb-current" itemprop="name" aria-current="page">{{ item.label }}</span>
            }
            <meta itemprop="position" [attr.content]="i + 2" />
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumbs-nav {
      padding: 12px 0 20px;
    }
    .breadcrumbs-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 0.875rem;
    }
    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
    }
    .breadcrumb-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--text-dark-secondary);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .breadcrumb-link:hover {
      color: var(--accent-orange-solid);
    }
    .home-icon {
      width: 14px;
      height: 14px;
    }
    .breadcrumb-separator {
      display: inline-flex;
      align-items: center;
      margin: 0 8px;
      color: var(--text-dark-muted);
    }
    .breadcrumb-separator svg {
      width: 14px;
      height: 14px;
    }
    .breadcrumb-current {
      color: var(--accent-orange-solid);
      font-weight: 600;
    }
  `]
})
export class BreadcrumbsComponent {
  @Input() items: BreadcrumbItem[] = [];
}
