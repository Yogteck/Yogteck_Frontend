import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminInvoiceService } from '../../services/admin-invoice.service';

@Component({
  selector: 'app-public-invoice-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './public-invoice-view.component.html',
  styleUrl: './public-invoice-view.component.css'
})
export class PublicInvoiceViewComponent implements OnInit {
  token = '';
  isLoading = true;
  errorMessage = '';

  invoice: any = null;
  company: any = null;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: AdminInvoiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'] || '';
      if (this.token) {
        this.fetchInvoice();
      } else {
        this.isLoading = false;
        this.errorMessage = 'Invalid invoice link.';
      }
    });
  }

  async fetchInvoice(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const res = await this.invoiceService.getPublicInvoice(this.token);
      if (res.success && res.invoice) {
        this.invoice = res.invoice;
        this.company = res.company;
      } else {
        this.errorMessage = res.message || 'Invoice not found or link has expired.';
      }
    } catch (e: any) {
      this.errorMessage = 'Network error while fetching invoice.';
    } finally {
      this.isLoading = false;
    }
  }

  formatINR(amount: number): string {
    const num = Number(amount) || 0;
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    const [intPart, decPart] = absNum.toFixed(2).split('.');
    let lastThree = intPart.slice(-3);
    const otherNumbers = intPart.slice(0, -3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const formattedInt = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return `${isNegative ? '-' : ''}₹${formattedInt}.${decPart}`;
  }
}

