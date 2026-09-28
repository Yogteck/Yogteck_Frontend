import { Component, OnInit } from '@angular/core';
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

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid || this.isSubmitting) {
      return;
    }

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
        throw new Error(result.message || 'Unable to submit your enquiry right now. Please try calling directly.');
      }

      this.submitSuccess = true;
      form.resetForm({
        serviceType: 'Website Development'
      });
      this.generateCaptcha();
    } catch (err) {
      console.error('Enquiry submission error:', err);
      this.submitError = err instanceof Error ? err.message : 'Unable to connect to server. Please try again.';
      this.generateCaptcha();
    } finally {
      this.isSubmitting = false;
    }
  }
}

