import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminInquiryService, InquiryRecord } from '../../services/admin-inquiry.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  // All raw inquiries directly from Excel data source
  allInquiries: InquiryRecord[] = [];
  
  // Filtered inquiries displayed in table (Always sorted descending)
  filteredInquiries: InquiryRecord[] = [];

  // Dynamic dropdown filter options extracted from actual data
  serviceOptions: string[] = [];

  // Filter States
  searchQuery = '';
  selectedService = 'ALL';

  // Loading & Error States
  isLoading = true;
  errorMessage = '';
  dataSource = 'excel';
  adminUsername = 'Yogtek';

  constructor(
    private authService: AdminAuthService,
    private inquiryService: AdminInquiryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminUsername = this.authService.getUsername();
    this.loadInquiries();
  }

  async loadInquiries(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await this.inquiryService.fetchInquiries();

      if (response.success) {
        // Enforce Descending Order: newest inquiry first (by ISO timestamp or date or sno)
        this.allInquiries = this.sortDescending(response.inquiries || []);
        this.dataSource = response.source || 'excel';
        this.extractFilterOptions();
        this.applyFilters();
      } else {
        this.errorMessage = response.message || 'Failed to load inquiries from Excel.';
        this.allInquiries = [];
        this.filteredInquiries = [];
      }
    } catch (err) {
      this.errorMessage = 'Network error: Unable to connect to inquiry server.';
      this.allInquiries = [];
      this.filteredInquiries = [];
    } finally {
      this.isLoading = false;
    }
  }

  // Sort helper: Descending order (Newest/Latest inquiry first)
  private sortDescending(records: InquiryRecord[]): InquiryRecord[] {
    return [...records].sort((a, b) => {
      // 1. Try ISO timestamp
      if (a.timestamp && b.timestamp) {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        if (!isNaN(timeA) && !isNaN(timeB)) {
          return timeB - timeA;
        }
      }

      // 2. Fallback to S.No descending
      const snoA = Number(a.sno) || 0;
      const snoB = Number(b.sno) || 0;
      return snoB - snoA;
    });
  }

  // Extract unique values from actual data for dropdown filters (No hardcoded values)
  private extractFilterOptions(): void {
    const rawServices = this.allInquiries
      .map(item => item.serviceType?.trim())
      .filter((val): val is string => Boolean(val));

    // Unique sorted array of real values
    this.serviceOptions = Array.from(new Set(rawServices)).sort();
  }

  // Apply Search + Dropdown Filters together immediately
  applyFilters(): void {
    const query = (this.searchQuery || '').trim().toLowerCase();
    const serviceFilter = this.selectedService;

    this.filteredInquiries = this.allInquiries.filter(item => {
      // 1. Service Dropdown Filter
      if (serviceFilter !== 'ALL' && item.serviceType !== serviceFilter) {
        return false;
      }

      // 2. Text Search across key fields (Case-insensitive)
      if (query) {
        const name = (item.name || '').toLowerCase();
        const company = (item.companyName || '').toLowerCase();
        const phone = (item.phone || '').toLowerCase();
        const email = (item.email || '').toLowerCase();
        const service = (item.serviceType || '').toLowerCase();
        const message = (item.message || '').toLowerCase();
        const date = (item.date || '').toLowerCase();
        const ip = (item.ip || '').toLowerCase();

        const match =
          name.includes(query) ||
          company.includes(query) ||
          phone.includes(query) ||
          email.includes(query) ||
          service.includes(query) ||
          message.includes(query) ||
          date.includes(query) ||
          ip.includes(query);

        if (!match) {
          return false;
        }
      }

      return true;
    });

    // Ensure filtered results also maintain descending order
    this.filteredInquiries = this.sortDescending(this.filteredInquiries);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  // Reset all filters back to default
  resetFilters(): void {
    this.searchQuery = '';
    this.selectedService = 'ALL';
    this.applyFilters();
  }

  get totalCount(): number {
    return this.allInquiries.length;
  }

  get filteredCount(): number {
    return this.filteredInquiries.length;
  }

  get isFiltered(): boolean {
    return (this.searchQuery.trim() !== '') || (this.selectedService !== 'ALL');
  }

  exportExcel(): void {
    const exportUrl = this.inquiryService.getExportExcelUrl();
    window.open(exportUrl, '_blank');
  }

  logout(): void {
    this.authService.logout();
  }
}
