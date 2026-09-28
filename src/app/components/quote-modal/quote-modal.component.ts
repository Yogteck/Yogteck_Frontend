import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class QuoteModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() defaultServiceTitle = 'Website Development';
  @Output() closeModal = new EventEmitter<void>();

  contact = CONTACT_CONFIG;
  services = SERVICES_DATA;

  formData = {
    name: '',
    phone: '',
    email: '',
    serviceType: 'Website Development',
    message: ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultServiceTitle'] && this.defaultServiceTitle) {
      this.formData.serviceType = this.defaultServiceTitle;
    }
  }

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    const payload = {
      name: this.formData.name.trim(),
      phone: this.formData.phone.trim(),
      email: this.formData.email.trim(),
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
        this.submitSuccess = false;
        this.closeModal.emit();
      }, 3000);
    } catch (err) {
      this.submitError = err instanceof Error ? err.message : 'Unable to submit quote. Please try WhatsApp directly.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
