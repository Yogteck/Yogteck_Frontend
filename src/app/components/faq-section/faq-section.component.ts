import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqItem } from '../../data/seo-content.data';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="faq-section" id="faq">
      <div class="container">
        
        <div class="faq-header">
          <span class="section-label">{{ badge || 'FREQUENTLY ASKED QUESTIONS' }}</span>
          <h2 class="faq-title">
            {{ title || 'Got Questions? We Have Direct Answers' }}
          </h2>
          <p class="faq-lead" *ngIf="subtitle">
            {{ subtitle }}
          </p>
        </div>

        <div class="faq-accordion-grid">
          @for (faq of faqs; track faq.question; let i = $index) {
            <div class="faq-card" [class.is-open]="openIndices.has(i)">
              <button
                type="button"
                class="faq-question-btn"
                (click)="toggleFaq(i)"
                [attr.aria-expanded]="openIndices.has(i)"
                [attr.aria-controls]="'faq-answer-' + i">
                <span class="faq-q-text">{{ faq.question }}</span>
                <span class="faq-icon-wrapper" aria-hidden="true">
                  <svg class="faq-chevron" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </span>
              </button>
              
              <div
                class="faq-answer-pane"
                [id]="'faq-answer-' + i"
                [hidden]="!openIndices.has(i)">
                <div class="faq-answer-content">
                  <p>{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .faq-section {
      padding: 64px 0;
      position: relative;
    }
    .faq-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 48px;
    }
    .faq-title {
      font-size: clamp(1.8rem, 3vw, 2.4rem);
      font-weight: 800;
      color: var(--text-dark-primary);
      margin-top: 8px;
      line-height: 1.25;
    }
    .faq-lead {
      color: var(--text-dark-secondary);
      font-size: 1.05rem;
      margin-top: 12px;
      line-height: 1.6;
    }
    .faq-accordion-grid {
      max-width: 880px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .faq-card {
      background: var(--bg-navy-card);
      border: 1px solid var(--border-dark-subtle);
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }
    .faq-card:hover {
      border-color: var(--border-dark-glow);
    }
    .faq-card.is-open {
      border-color: var(--accent-orange-solid);
      box-shadow: 0 4px 20px rgba(255, 154, 31, 0.12);
    }
    .faq-question-btn {
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      cursor: pointer;
      color: var(--text-dark-primary);
      font-family: inherit;
    }
    .faq-q-text {
      font-size: 1.05rem;
      font-weight: 600;
      line-height: 1.4;
    }
    .faq-icon-wrapper {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.3s ease, background-color 0.2s ease;
    }
    .faq-chevron {
      width: 18px;
      height: 18px;
      transition: transform 0.3s ease;
    }
    .faq-card.is-open .faq-chevron {
      transform: rotate(180deg);
    }
    .faq-card.is-open .faq-icon-wrapper {
      background: var(--accent-orange-solid);
      color: #000;
    }
    .faq-answer-pane {
      padding: 0 24px 22px;
      animation: fadeIn 0.2s ease-in-out;
    }
    .faq-answer-content p {
      margin: 0;
      color: var(--text-dark-secondary);
      font-size: 0.98rem;
      line-height: 1.7;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class FaqSectionComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() badge?: string;
  @Input() faqs: FaqItem[] = [];

  openIndices: Set<number> = new Set([0]); // Open first FAQ by default

  toggleFaq(index: number): void {
    if (this.openIndices.has(index)) {
      this.openIndices.delete(index);
    } else {
      this.openIndices.add(index);
    }
  }
}
