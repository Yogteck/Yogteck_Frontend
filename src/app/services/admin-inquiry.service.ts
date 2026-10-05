import { Injectable } from '@angular/core';
import { CONTACT_CONFIG } from '../data/contact.config';
import { AdminAuthService } from './admin-auth.service';

export interface InquiryRecord {
  sno: number;
  date: string;
  time: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
  ip: string;
  timestamp: string;
}

export interface InquiriesResponse {
  success: boolean;
  total: number;
  inquiries: InquiryRecord[];
  source?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminInquiryService {
  private readonly apiBaseUrl = this.getApiBaseUrl();

  constructor(private authService: AdminAuthService) {}

  private getApiBaseUrl(): string {
    const contactApi = CONTACT_CONFIG.backendContactApi || '';
    if (contactApi.includes('/api/')) {
      return contactApi.split('/api/')[0];
    }
    return '';
  }

  public getExportExcelUrl(): string {
    return `${this.apiBaseUrl}/api/enquiries/export`;
  }

  public async fetchInquiries(): Promise<InquiriesResponse> {
    const token = this.authService.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const endpoints = [
      `${this.apiBaseUrl}/api/admin/enquiries`,
      '/api/admin/enquiries',
      'http://localhost:5000/api/admin/enquiries'
    ];

    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers
        });

        if (response.ok) {
          const data: InquiriesResponse = await response.json();
          if (data && data.success) {
            return {
              success: true,
              total: data.total || data.inquiries?.length || 0,
              inquiries: data.inquiries || [],
              source: data.source || 'excel'
            };
          }
        }
      } catch (err) {
        // Try next endpoint
      }
    }

    // If unable to connect to backend server
    return {
      success: false,
      total: 0,
      inquiries: [],
      message: 'Unable to load live inquiries from the server. Please ensure the backend server is running.'
    };
  }
}
