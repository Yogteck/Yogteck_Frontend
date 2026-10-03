import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';

@Component({
  selector: 'app-hero-visual',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-visual.component.html',
  styleUrl: './hero-visual.component.css'
})
export class HeroVisualComponent implements OnInit {
  @ViewChild('heroEnquiryForm') heroEnquiryForm?: NgForm;

  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;

  formData = {
    name: '',
    phone: '',
    email: '',
    serviceType: 'Website Development',
    message: ''
  };

  // Math Captcha
  captchaNum1 = 5;
  captchaNum2 = 6;
  captchaAnswer = 11;
  captchaInput = '';
  captchaError = '';

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    this.captchaNum1 = Math.floor(Math.random() * 10) + 3; // 3 - 12
    this.captchaNum2 = Math.floor(Math.random() * 8) + 1;  // 1 - 8
    this.captchaAnswer = this.captchaNum1 + this.captchaNum2;
    this.captchaInput = '';
    this.captchaError = '';
  }

  onCaptchaInput(): void {
    if (this.captchaError) {
      this.captchaError = '';
    }
  }

  resetForm(): void {
    this.submitSuccess = false;
    this.submitError = '';
    this.formData = {
      name: '',
      phone: '',
      email: '',
      serviceType: 'Website Development',
      message: ''
    };
    this.generateCaptcha();
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

    // Mark controls touched
    if (form.controls) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
      });
    }

    // Name validation
    if (!this.formData.name || this.formData.name.trim().length < 2) {
      this.focusAndHighlight('heroFormName');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9+ ]{10,15}$/;
    if (!this.formData.phone || !phoneRegex.test(this.formData.phone.trim())) {
      this.focusAndHighlight('heroFormPhone');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email || !emailRegex.test(this.formData.email.trim())) {
      this.focusAndHighlight('heroFormEmail');
      return;
    }

    // Captcha validation
    const rawInput = String(this.captchaInput || '').trim();
    if (!rawInput) {
      this.captchaError = 'Please solve the math sum to submit.';
      this.focusAndHighlight('heroFormCaptcha');
      return;
    }

    const parsedAnswer = parseInt(rawInput, 10);
    if (isNaN(parsedAnswer) || parsedAnswer !== this.captchaAnswer) {
      this.captchaError = 'Incorrect math answer! Please try again.';
      this.focusAndHighlight('heroFormCaptcha');
      return;
    }

    this.captchaError = '';
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    const payload = {
      name: this.formData.name.trim(),
      companyName: '',
      company: '',
      phone: this.formData.phone.trim(),
      email: this.formData.email.trim(),
      serviceType: this.formData.serviceType,
      rackType: this.formData.serviceType,
      message: this.formData.message.trim() || `Instant Hero Quote requested for ${this.formData.serviceType}`
    };

    const primaryApi = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:5000/api/enquiries/contact'
      : this.contact.backendContactApi;
    const fallbackApi = this.contact.backendContactApi;

    try {
      let response: Response;
      try {
        response = await fetch(primaryApi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (networkErr) {
        if (primaryApi !== fallbackApi) {
          response = await fetch(fallbackApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } else {
          throw networkErr;
        }
      }

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit enquiry.');
      }

      this.submitSuccess = true;
    } catch (err) {
      console.error('Hero enquiry submission error:', err);
      this.submitError = err instanceof Error ? err.message : 'Unable to send enquiry. Please contact us on WhatsApp directly.';
      this.generateCaptcha();
    } finally {
      this.isSubmitting = false;
    }
  }
}
