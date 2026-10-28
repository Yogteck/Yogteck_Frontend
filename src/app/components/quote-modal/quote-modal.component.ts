import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CONTACT_CONFIG, DIAL_CODE_OPTIONS } from '../../data/contact.config';
import { SERVICES_DATA, ServiceItem } from '../../data/services.data';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-quote-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-modal.component.html',
  styleUrl: './quote-modal.component.css'
})
export class QuoteModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() defaultServiceTitle = 'Website Development';
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('quoteForm') quoteForm?: NgForm;

  public localeService = inject(LocaleService);
  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;
  dialCodes = DIAL_CODE_OPTIONS;
  selectedDialCode = '+91';

  dict = this.localeService.currentDict;

  formData = {
    name: '',
    companyName: '',
    phone: '',
    email: '',
    serviceType: 'Website Development',
    message: ''
  };

  // Math Captcha
  captchaNum1 = 4;
  captchaNum2 = 7;
  captchaAnswer = 11;
  captchaInput: string = '';
  captchaError = '';

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
    const cfg = this.localeService.currentConfig();
    if (cfg && cfg.dialCode) {
      this.selectedDialCode = cfg.dialCode;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultServiceTitle'] && this.defaultServiceTitle) {
      this.formData.serviceType = this.defaultServiceTitle;
    }
    if (changes['isOpen'] && this.isOpen) {
      this.generateCaptcha();
      this.captchaError = '';
      this.submitSuccess = false;
      this.submitError = '';
      const cfg = this.localeService.currentConfig();
      if (cfg && cfg.dialCode) {
        this.selectedDialCode = cfg.dialCode;
      }
    }
  }

  generateCaptcha(): void {
    this.captchaNum1 = Math.floor(Math.random() * 12) + 3; // 3 - 14
    this.captchaNum2 = Math.floor(Math.random() * 9) + 1;  // 1 - 9
    this.captchaAnswer = this.captchaNum1 + this.captchaNum2;
    this.captchaInput = '';
    this.captchaError = '';
  }

  onCaptchaInput(): void {
    if (this.captchaError) {
      this.captchaError = '';
    }
  }

  private focusAndHighlight(elementId: string): void {
    setTimeout(() => {
      const el = (this.elRef.nativeElement as HTMLElement).querySelector(`#${elementId}`) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
        el.classList.add('shake-highlight');
        setTimeout(() => el.classList.remove('shake-highlight'), 1000);
      }
    }, 50);
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (this.isSubmitting) return;

    const dict = this.dict();

    // 1. Mark controls as touched
    if (form.controls) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
      });
    }

    // 2. Validate mandatory fields
    if (!this.formData.name || this.formData.name.trim().length < 2) {
      this.focusAndHighlight('modalName');
      return;
    }

    const rawPhone = this.formData.phone.trim();
    if (!rawPhone || rawPhone.length < 5) {
      this.focusAndHighlight('modalPhone');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email || !emailRegex.test(this.formData.email.trim())) {
      this.focusAndHighlight('modalEmail');
      return;
    }

    // 3. Validate Math Captcha
    const rawInput = String(this.captchaInput || '').trim();
    if (!rawInput) {
      this.captchaError = dict.inquiry.validation.captchaRequired;
      this.focusAndHighlight('modalCaptcha');
      return;
    }

    const parsedAnswer = parseInt(rawInput, 10);
    if (isNaN(parsedAnswer) || parsedAnswer !== this.captchaAnswer) {
      this.captchaError = dict.inquiry.validation.captchaInvalid;
      this.focusAndHighlight('modalCaptcha');
      return;
    }

    this.captchaError = '';
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    const fullPhone = `${this.selectedDialCode} ${rawPhone}`.trim();

    let messageBody = this.formData.message.trim() || `Quote requested for ${this.formData.serviceType}`;
    if (this.contact.enableLocaleAnnotationInMessage) {
      const cfg = this.localeService.currentConfig();
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      messageBody += `\n\n[Lang: ${cfg.htmlLang} | Country: ${cfg.country} | Page: ${pageUrl}]`;
    }

    const payload = {
      name: this.formData.name.trim(),
      companyName: this.formData.companyName.trim(),
      company: this.formData.companyName.trim(),
      phone: fullPhone,
      email: this.formData.email.trim(),
      serviceType: this.formData.serviceType,
      rackType: this.formData.serviceType,
      message: messageBody
    };

    try {
      const response = await fetch(this.contact.backendContactApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || dict.inquiry.errorMessage);
      }

      this.submitSuccess = true;
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'Modal Quote Submission',
          service_type: payload.serviceType,
          value: 1
        });
      }
      form.resetForm({
        serviceType: this.defaultServiceTitle || 'Website Development'
      });
      this.generateCaptcha();

    } catch (err) {
      console.error('Modal Quote submission error:', err);
      this.submitError = err instanceof Error ? err.message : dict.inquiry.errorMessage;
      this.generateCaptcha();
    } finally {
      this.isSubmitting = false;
    }
  }
}
