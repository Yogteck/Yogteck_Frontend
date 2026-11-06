import { Injectable } from '@angular/core';
import { CONTACT_CONFIG } from '../data/contact.config';
import { AdminAuthService } from './admin-auth.service';

export interface CompanyMaster {
  companyName: string;
  ownerName: string;
  contact: string;
  email: string;
  address: string;
  pincode: string;
  state: string;
  stateCode: string;
  pan: string;
  gstin: string;
  bankName: string;
  branch: string;
  accountNo: string;
  ifsc: string;
  upiId: string;
  logoPath: string;
  tagline: string;
  terms: string;
  gstEnabled: string;
  importantNotes?: string;
}

export interface ClientRecord {
  clientId: string;
  clientName: string;
  contactPerson?: string;
  mobile?: string;
  email?: string;
  address?: string;
  state?: string;
  stateCode?: string;
  gstin?: string;
  createdDate?: string;
}

export interface InvoiceItem {
  srNo?: number;
  description: string;
  hsnSac?: string;
  qty: number;
  unit?: string;
  rate: number;
  taxableValue?: number;
  taxPercent: number;
  taxAmount?: number;
  lineTotal?: number;
}

export interface PaymentRecord {
  paymentId?: string;
  invoiceNo: string;
  amountPaid: number;
  paymentDate: string;
  mode: string;
  note?: string;
}

export interface InvoiceRecord {
  invoiceNo: string;
  clientId: string;
  invoiceDate: string;
  dueDate?: string;
  taxableTotal: number;
  taxTotal: number;
  grandTotal: number;
  status: 'Unpaid' | 'Partially Paid' | 'Paid';
  publicToken: string;
  notes?: string;
  challanNo?: string;
  challanDate?: string;
  ewayBillNo?: string;
  transport?: string;
  transportId?: string;
  planName?: string;
  serviceStartDate?: string;
  serviceExpiryDate?: string;
  renewalDueDate?: string;
  totalPaid: number;
  balanceDue: number;
  client?: ClientRecord | null;
  items?: InvoiceItem[];
  payments?: PaymentRecord[];
  paymentsCount?: number;
  latestPayment?: PaymentRecord | null;
}

@Injectable({
  providedIn: 'root'
})
export class AdminInvoiceService {
  private readonly apiBaseUrl = this.getApiBaseUrl();

  constructor(private authService: AdminAuthService) {}

  private getApiBaseUrl(): string {
    const contactApi = CONTACT_CONFIG.backendContactApi || '';
    if (contactApi.includes('/api/')) {
      return contactApi.split('/api/')[0];
    }
    return '';
  }

  private getHeaders(): HeadersInit {
    const token = this.authService.getToken() || '';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Company API
  public async getCompany(): Promise<{ success: boolean; company?: CompanyMaster; message?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/company`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  public async updateCompany(company: Partial<CompanyMaster>): Promise<{ success: boolean; message?: string; company?: CompanyMaster }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/company`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(company)
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  // Clients API
  public async getClients(): Promise<{ success: boolean; clients?: ClientRecord[]; message?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/clients`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  public async saveClient(client: Partial<ClientRecord>): Promise<{ success: boolean; client?: ClientRecord; message?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/clients`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(client)
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  // Invoices API
  public async getInvoices(): Promise<{ success: boolean; invoices?: InvoiceRecord[]; message?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/invoices`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  public async getNextInvoiceNo(): Promise<{ success: boolean; nextInvoiceNo?: string; message?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/invoices/next-number`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  public async getInvoice(invoiceNo: string): Promise<{ success: boolean; invoice?: InvoiceRecord; company?: CompanyMaster; message?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/invoices/${encodeURIComponent(invoiceNo)}`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  public async createInvoice(invoiceData: any): Promise<{ success: boolean; invoice?: InvoiceRecord; message?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/invoices`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(invoiceData)
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  public async addPayment(invoiceNo: string, payment: { amountPaid: number; paymentDate: string; mode: string; note?: string }): Promise<{ success: boolean; message?: string; totalPaid?: number; balanceDue?: number; newStatus?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/admin/invoices/${encodeURIComponent(invoiceNo)}/payments`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payment)
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  public async downloadPdf(invoiceNo: string): Promise<void> {
    const token = this.authService.getToken() || '';
    const url = `${this.apiBaseUrl}/api/admin/invoices/${encodeURIComponent(invoiceNo)}/pdf`;

    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to download PDF (${res.status} ${res.statusText})`);
    }

    const blob = await res.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${invoiceNo}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
  }

  // Public View API (No Auth)
  public async getPublicInvoice(token: string): Promise<{ success: boolean; invoice?: any; company?: any; message?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/public/invoice/${encodeURIComponent(token)}`);
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }
}

