import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
    }
  }

  generateCaptcha(): void {
    this.captchaNum1 = Math.floor(Math.random() * 12) + 3; // 3 - 14
    this.captchaNum2 = Math.floor(Math.random() * 9) + 1;  // 1 - 9
    this.captchaAnswer = this.captchaNum1 + this.captchaNum2;
    this.captchaInput = '';
    this.captchaError = '';
  }

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid || this.isSubmitting) return;

    // Validate Math Captcha
    const parsedAnswer = parseInt(this.captchaInput?.trim() || '', 10);
    if (isNaN(parsedAnswer) || parsedAnswer !== this.captchaAnswer) {
      this.captchaError = 'Incorrect math answer. Please try again.';
      return;
    }
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
      }, 3500);
    } catch (err) {
      this.submitError = err instanceof Error ? err.message : 'Unable to submit quote. Please try WhatsApp directly.';
      this.generateCaptcha();
    } finally {
      this.isSubmitting = false;
    }
  }
}

