import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA } from '../../data/services.data';

@Component({
  selector: 'app-inquiry-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry-section.component.html',
  styleUrl: './inquiry-section.component.css'
})
export class InquirySectionComponent implements OnInit {
  @ViewChild('inquiryForm') inquiryForm?: NgForm;

  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;

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

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.generateCaptcha();
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

    const phoneRegex = /^[0-9+ ]{10,15}$/;
    if (!this.formData.phone || !phoneRegex.test(this.formData.phone.trim())) {
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
      this.captchaError = 'Please enter the math security answer to submit (कैप्चा भरें).';
      this.focusAndHighlight('contactCaptcha');
      return;
    }

    const parsedAnswer = parseInt(rawInput, 10);
    if (isNaN(parsedAnswer) || parsedAnswer !== this.captchaAnswer) {
      this.captchaError = 'Incorrect math captcha! Please solve and enter the correct sum (कैप्चा गलत है).';
      this.focusAndHighlight('contactCaptcha');
      return;
    }

    // Captcha is correct!
    this.captchaError = '';
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    const payload = {
      name: this.formData.name.trim(),
      companyName: this.formData.companyName.trim(),
      company: this.formData.companyName.trim(),
      phone: this.formData.phone.trim(),
      email: this.formData.email.trim(),
      serviceType: this.formData.serviceType,
      rackType: this.formData.serviceType,
      message: this.formData.message.trim()
    };

    try {
      const response = await fetch(this.contact.backendContactApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit your enquiry right now.');
      }

      this.submitSuccess = true;
      form.resetForm({
        serviceType: 'Website Development'
      });
      this.generateCaptcha();
    } catch (err) {
      console.error('Enquiry submission error:', err);
      this.submitError = err instanceof Error ? err.message : 'Unable to connect to server. Please contact us on WhatsApp directly.';
      this.generateCaptcha();
    } finally {
      this.isSubmitting = false;
    }
  }
}


