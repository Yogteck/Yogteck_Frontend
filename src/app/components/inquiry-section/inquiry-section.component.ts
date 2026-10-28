import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CONTACT_CONFIG, DIAL_CODE_OPTIONS, DialCodeOption } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-inquiry-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry-section.component.html',
  styleUrl: './inquiry-section.component.css'
})
export class InquirySectionComponent implements OnInit {
  @ViewChild('inquiryForm') inquiryForm?: NgForm;

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

  // Math Calculation Captcha
  captchaNum1 = 6;
  captchaNum2 = 5;
  captchaAnswer = 11;
  captchaInput = '';
  captchaError = '';

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
    // Default country code from visitor locale
    const cfg = this.localeService.currentConfig();
    if (cfg && cfg.dialCode) {
      this.selectedDialCode = cfg.dialCode;
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
    if (this.isSubmitting) {
      return;
    }

    const dict = this.dict();

    // 1. Mark all fields as touched to display errors
    if (form.controls) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
      });
    }

    // 2. Validate mandatory form fields and auto-focus first missing/invalid field
    if (!this.formData.name || this.formData.name.trim().length < 2) {
      this.focusAndHighlight('contactName');
      return;
    }

    const rawPhone = this.formData.phone.trim();
    if (!rawPhone || rawPhone.length < 5) {
      this.focusAndHighlight('contactPhone');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email || !emailRegex.test(this.formData.email.trim())) {
      this.focusAndHighlight('contactEmail');
      return;
    }

    if (!this.formData.message || this.formData.message.trim().length < 5) {
      this.focusAndHighlight('contactMessage');
      return;
    }

    // 3. Validate Captcha
    const rawInput = String(this.captchaInput || '').trim();
    if (!rawInput) {
      this.captchaError = dict.inquiry.validation.captchaRequired;
      this.focusAndHighlight('contactCaptcha');
      return;
    }

    const parsedAnswer = parseInt(rawInput, 10);
    if (isNaN(parsedAnswer) || parsedAnswer !== this.captchaAnswer) {
      this.captchaError = dict.inquiry.validation.captchaInvalid;
      this.focusAndHighlight('contactCaptcha');
      return;
    }

    // Captcha is correct!
    this.captchaError = '';
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    // Full phone value formatted with dial code
    const fullPhone = `${this.selectedDialCode} ${rawPhone}`.trim();

    // Optional controlled message annotation
    let messageBody = this.formData.message.trim();
    if (this.contact.enableLocaleAnnotationInMessage) {
      const cfg = this.localeService.currentConfig();
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      messageBody += `\n\n[Lang: ${cfg.htmlLang} | Country: ${cfg.country} | Page: ${pageUrl}]`;
    }

    // Exact backend payload shape preserved
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
          event_label: 'Contact Section Inquiry',
          service_type: payload.serviceType,
          value: 1
        });
      }
      form.resetForm({
        serviceType: 'Website Development'
      });
      this.generateCaptcha();

    } catch (err) {
      console.error('Enquiry submission error:', err);
      this.submitError = err instanceof Error ? err.message : dict.inquiry.errorMessage;
      this.generateCaptcha();
    } finally {
      this.isSubmitting = false;
    }
  }
}
