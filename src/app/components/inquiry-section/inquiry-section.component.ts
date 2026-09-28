import { Component } from '@angular/core';
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
export class InquirySectionComponent {
  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;

  formData = {
    name: '',
    phone: '',
    email: '',
    serviceType: 'Website Development',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    const payload = {
      name: this.formData.name.trim(),
      phone: this.formData.phone.trim(),
      email: this.formData.email.trim(),
      rackType: this.formData.serviceType, // maps to service type in backend mailer
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
    } catch (err) {
      console.error('Enquiry submission error:', err);
      this.submitError = err instanceof Error ? err.message : 'Unable to connect to server. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
