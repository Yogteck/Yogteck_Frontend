import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CONTACT_CONFIG } from '../../data/contact.config';
import { SERVICES_DATA, ServiceItem } from '../../data/services.data';

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

  // Math Captcha
  captchaNum1 = 4;
  captchaNum2 = 7;
  captchaAnswer = 11;
  captchaInput: string = '';
  captchaError = '';

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.generateCaptcha();
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

    // 1. Mark all controls as touched to display validation indicators
    if (form.controls) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
      });
    }

    // 2. Validate mandatory form fields and auto-focus first missing field
    if (!this.formData.name || this.formData.name.trim().length < 2) {
      this.focusAndHighlight('modalName');
      return;
    }

    const phoneRegex = /^[0-9+ ]{10,15}$/;
    if (!this.formData.phone || !phoneRegex.test(this.formData.phone.trim())) {
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
      this.captchaError = 'Please enter the math security answer to submit (कैप्चा भरें).';
      this.focusAndHighlight('modalCaptcha');
      return;
    }

    const parsedAnswer = parseInt(rawInput, 10);
    if (isNaN(parsedAnswer) || parsedAnswer !== this.captchaAnswer) {
      this.captchaError = 'Incorrect math captcha! Please solve and enter the correct sum (कैप्चा गलत है).';
      this.focusAndHighlight('modalCaptcha');
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
      message: this.formData.message.trim() || `Quote requested for ${this.formData.serviceType}`
    };

    try {
      const response = await fetch(this.contact.backendContactApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit your quote request.');
      }

      this.submitSuccess = true;
      setTimeout(() => {
        form.resetForm({ serviceType: 'Website Development' });
        this.generateCaptcha();
        this.submitSuccess = false;
        this.closeModal.emit();
      }, 3000);
    } catch (err) {
      this.submitError = err instanceof Error ? err.message : 'Unable to submit quote. Please try WhatsApp directly.';
      this.generateCaptcha();
    } finally {
      this.isSubmitting = false;
    }
  }
}


