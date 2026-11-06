import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminInquiryService, InquiryRecord } from '../../services/admin-inquiry.service';
import {
  AdminInvoiceService,
  CompanyMaster,
  ClientRecord,
  InvoiceRecord,
  InvoiceItem,
  PaymentRecord
} from '../../services/admin-invoice.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  // Navigation Tabs: 'invoices' | 'clients' | 'inquiries' | 'company'
  activeTab: 'invoices' | 'clients' | 'inquiries' | 'company' = 'invoices';

  adminUsername = 'Yogtek';
  isLoading = false;
  statusMessage = '';
  errorMessage = '';

  // ---------------- Invoices State ----------------
  allInvoices: InvoiceRecord[] = [];
  filteredInvoices: InvoiceRecord[] = [];
  invoiceSearchQuery = '';
  invoiceStatusFilter: 'ALL' | 'Unpaid' | 'Partially Paid' | 'Paid' = 'ALL';

  // ---------------- Clients State ----------------
  allClients: ClientRecord[] = [];
  filteredClients: ClientRecord[] = [];
  clientSearchQuery = '';

  // ---------------- Inquiries State ----------------
  allInquiries: InquiryRecord[] = [];
  filteredInquiries: InquiryRecord[] = [];
  serviceOptions: string[] = [];
  inquirySearchQuery = '';
  selectedService = 'ALL';
  dataSource = 'excel';

  // ---------------- Company Master State ----------------
  companyMaster: CompanyMaster | null = null;
  companyForm: Partial<CompanyMaster> = {};
  isSavingCompany = false;

  // ---------------- Modals State ----------------
  // 1. View Invoice Modal
  viewInvoiceModalOpen = false;
  selectedInvoice: InvoiceRecord | null = null;
  isDownloadingPdf = false;

  // 2. Create / Edit Invoice Modal
  createInvoiceModalOpen = false;
  isEditingInvoice = false;
  editingInvoiceNo = '';
  isSavingInvoice = false;
  exportTargetInvoice: InvoiceRecord | null = null;
  newInvoiceData = {
    invoiceNo: '',
    clientId: '',
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    paymentDate: new Date().toISOString().slice(0, 10),
    status: 'Paid' as 'Paid' | 'Unpaid' | 'Partially Paid',
    projectCost: 5000,
    amountPaid: 5000,
    notes: '',
    challanNo: '',
    challanDate: '',
    ewayBillNo: '',
    transport: '',
    transportId: '',
    planName: 'Annual Cloud & Maintenance Plan',
    serviceStartDate: new Date().toISOString().slice(0, 10),
    serviceExpiryDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
    renewalDueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    items: [
      {
        description: 'Web Application & Cloud Software Development',
        paymentDate: new Date().toISOString().slice(0, 10),
        qty: 1,
        unit: 'NOS',
        rate: 5000,
        taxPercent: 0
      }
    ]
  };

  // 3. Add Payment Modal
  addPaymentModalOpen = false;
  isSavingPayment = false;
  paymentTargetInvoice: InvoiceRecord | null = null;
  newPaymentData = {
    amountPaid: 0,
    paymentDate: new Date().toISOString().slice(0, 10),
    mode: 'UPI',
    note: ''
  };

  // 4. Add/Edit Client Modal
  clientModalOpen = false;
  isSavingClient = false;
  isEditingClient = false;
  clientFormData: Partial<ClientRecord> = {
    clientId: '',
    clientName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    address: '',
    state: 'Uttar Pradesh',
    stateCode: '09',
    gstin: ''
  };

  constructor(
    private authService: AdminAuthService,
    private inquiryService: AdminInquiryService,
    private invoiceService: AdminInvoiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminUsername = this.authService.getUsername();
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await Promise.all([
        this.loadInvoices(),
        this.loadClients(),
        this.loadInquiries(),
        this.loadCompanyMaster()
      ]);
    } catch (err: any) {
      this.errorMessage = err.message || 'Error loading dashboard data.';
    } finally {
      this.isLoading = false;
    }
  }

  // ----------------------------------------------------
  // INVOICES METHODS
  // ----------------------------------------------------
  async loadInvoices(): Promise<void> {
    try {
      const res = await this.invoiceService.getInvoices();
      if (res.success && res.invoices) {
        this.allInvoices = res.invoices;
        this.applyInvoiceFilters();
      }
    } catch (e: any) {
      console.error('Failed to load invoices:', e);
    }
  }

  applyInvoiceFilters(): void {
    const q = (this.invoiceSearchQuery || '').trim().toLowerCase();
    const st = this.invoiceStatusFilter;

    this.filteredInvoices = this.allInvoices.filter(inv => {
      if (st !== 'ALL' && inv.status !== st) return false;
      if (q) {
        const no = (inv.invoiceNo || '').toLowerCase();
        const client = (inv.client?.clientName || '').toLowerCase();
        const phone = (inv.client?.mobile || '').toLowerCase();
        return no.includes(q) || client.includes(q) || phone.includes(q);
      }
      return true;
    });
  }

  onInvoiceSearchChange(): void {
    this.applyInvoiceFilters();
  }

  onInvoiceStatusFilterChange(status: 'ALL' | 'Unpaid' | 'Partially Paid' | 'Paid'): void {
    this.invoiceStatusFilter = status;
    this.applyInvoiceFilters();
  }

  openViewInvoice(inv: InvoiceRecord): void {
    this.selectedInvoice = inv;
    this.viewInvoiceModalOpen = true;
  }

  closeViewInvoice(): void {
    this.viewInvoiceModalOpen = false;
    this.selectedInvoice = null;
  }

  async downloadPdf(invoiceNo: string): Promise<void> {
    this.isDownloadingPdf = true;
    try {
      // 1. Try server-side generation first
      const serverDownloaded = await this.invoiceService.downloadPdfFromServer(invoiceNo);
      if (serverDownloaded) return;

      // 2. Client-side PDF generation using html2pdf.js
      const targetInv = this.allInvoices.find(i => i.invoiceNo === invoiceNo) || this.selectedInvoice;
      if (!targetInv) {
        alert('Invoice not found: ' + invoiceNo);
        return;
      }

      this.exportTargetInvoice = targetInv;
      await new Promise(r => setTimeout(r, 120));

      const elem = document.getElementById('printable-invoice') || document.getElementById('export-pdf-invoice');
      if (elem) {
        const ok = await this.invoiceService.downloadPdfClientSide(elem, `${invoiceNo}.pdf`);
        if (ok) return;
      }

      // 3. Fallback: Clean popup window for printing / saving as PDF
      this.printCleanInvoiceWindow(targetInv);
    } catch (e: any) {
      alert('Error downloading PDF: ' + (e.message || 'Please check connection'));
    } finally {
      this.exportTargetInvoice = null;
      this.isDownloadingPdf = false;
    }
  }

  printCleanInvoiceWindow(inv: InvoiceRecord): void {
    const elem = document.getElementById('printable-invoice') || document.getElementById('export-pdf-invoice');
    if (!elem) {
      window.print();
      return;
    }
    const printWin = window.open('', '_blank', 'width=850,height=900');
    if (!printWin) {
      window.print();
      return;
    }
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(el => el.outerHTML)
      .join('\n');
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${inv.invoiceNo} - Tax Invoice</title>
          ${styles}
          <style>
            body { margin: 0; padding: 16px; background: #fff !important; }
            .invoice-paper { max-width: 100% !important; margin: 0 auto !important; box-shadow: none !important; }
            @page { size: A4; margin: 6mm; }
          </style>
        </head>
        <body>
          ${elem.outerHTML}
          <script>
            window.onload = function() {
              window.focus();
              window.print();
              setTimeout(function() { window.close(); }, 800);
            };
          </script>
        </body>
      </html>
    `);
    printWin.document.close();
  }

  printInvoice(): void {
    if (this.selectedInvoice) {
      this.printCleanInvoiceWindow(this.selectedInvoice);
    } else {
      window.print();
    }
  }

  // ----------------------------------------------------
  // CREATE & EDIT INVOICE METHODS
  // ----------------------------------------------------
  async openCreateInvoiceModal(): Promise<void> {
    this.isEditingInvoice = false;
    this.editingInvoiceNo = '';
    this.errorMessage = '';
    const nextNoRes = await this.invoiceService.getNextInvoiceNo();
    const nextNo = nextNoRes.nextInvoiceNo || '';

    this.newInvoiceData = {
      invoiceNo: nextNo,
      clientId: this.allClients.length > 0 ? this.allClients[0].clientId : '',
      invoiceDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      paymentDate: new Date().toISOString().slice(0, 10),
      status: 'Paid',
      projectCost: 5000,
      amountPaid: 5000,
      notes: '',
      challanNo: '',
      challanDate: '',
      ewayBillNo: '',
      transport: '',
      transportId: '',
      planName: 'Annual Cloud & Maintenance Plan',
      serviceStartDate: new Date().toISOString().slice(0, 10),
      serviceExpiryDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
      renewalDueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      items: [
        {
          description: 'Web Application & Cloud Software Development',
          paymentDate: new Date().toISOString().slice(0, 10),
          qty: 1,
          unit: 'NOS',
          rate: 5000,
          taxPercent: 0
        }
      ]
    };

    this.createInvoiceModalOpen = true;
  }

  openEditInvoiceModal(inv: InvoiceRecord): void {
    this.isEditingInvoice = true;
    this.editingInvoiceNo = inv.invoiceNo;
    this.errorMessage = '';

    const cost = Number(inv.grandTotal) || (inv.items && inv.items[0]?.rate) || 5000;
    const paid = inv.totalPaid != null ? Number(inv.totalPaid) : (inv.status === 'Paid' ? cost : 0);

    this.newInvoiceData = {
      invoiceNo: inv.invoiceNo,
      clientId: inv.clientId,
      invoiceDate: inv.invoiceDate,
      dueDate: inv.dueDate || '',
      paymentDate: inv.paymentDate || inv.invoiceDate,
      status: inv.status || (cost - paid === 0 ? 'Paid' : (paid > 0 ? 'Partially Paid' : 'Unpaid')),
      projectCost: cost,
      amountPaid: paid,
      notes: inv.notes || '',
      challanNo: inv.challanNo || '',
      challanDate: inv.challanDate || '',
      ewayBillNo: inv.ewayBillNo || '',
      transport: inv.transport || '',
      transportId: inv.transportId || '',
      planName: inv.planName || '',
      serviceStartDate: inv.serviceStartDate || '',
      serviceExpiryDate: inv.serviceExpiryDate || '',
      renewalDueDate: inv.renewalDueDate || '',
      items: (inv.items && inv.items.length > 0) ? inv.items.map(item => ({
        description: item.description,
        paymentDate: item.paymentDate || inv.paymentDate || inv.invoiceDate,
        qty: item.qty || 1,
        unit: item.unit || 'NOS',
        rate: item.rate || 0,
        taxPercent: 0
      })) : [
        { description: '', paymentDate: new Date().toISOString().slice(0, 10), qty: 1, unit: 'NOS', rate: cost, taxPercent: 0 }
      ]
    };

    this.viewInvoiceModalOpen = false;
    this.createInvoiceModalOpen = true;
  }

  closeCreateInvoiceModal(): void {
    this.createInvoiceModalOpen = false;
    this.isEditingInvoice = false;
    this.editingInvoiceNo = '';
  }

  addInvoiceItemRow(): void {
    this.newInvoiceData.items.push({
      description: '',
      paymentDate: this.newInvoiceData.paymentDate || new Date().toISOString().slice(0, 10),
      qty: 1,
      unit: 'NOS',
      rate: 0,
      taxPercent: 0
    });
  }

  removeInvoiceItemRow(index: number): void {
    if (this.newInvoiceData.items.length > 1) {
      this.newInvoiceData.items.splice(index, 1);
    }
  }

  get computedTaxableTotal(): number {
    return this.newInvoiceData.items.reduce((sum, item) => {
      const lineTaxable = (Number(item.qty) || 0) * (Number(item.rate) || 0);
      return sum + lineTaxable;
    }, 0);
  }

  get computedTaxTotal(): number {
    return 0; // Tax column removed
  }

  get computedGrandTotal(): number {
    return Number(this.newInvoiceData.projectCost) || this.computedTaxableTotal;
  }

  get computedBalanceDue(): number {
    const cost = Number(this.newInvoiceData.projectCost) || 0;
    const paid = Number(this.newInvoiceData.amountPaid) || 0;
    return Math.max(0, Math.round((cost - paid) * 100) / 100);
  }

  onProjectCostChange(): void {
    this.onAmountPaidChange();
  }

  onAmountPaidChange(): void {
    const cost = Number(this.newInvoiceData.projectCost) || 0;
    const paid = Number(this.newInvoiceData.amountPaid) || 0;
    if (paid >= cost && cost > 0) {
      this.newInvoiceData.status = 'Paid';
    } else if (paid <= 0) {
      this.newInvoiceData.status = 'Unpaid';
    } else {
      this.newInvoiceData.status = 'Partially Paid';
    }
  }

  onStatusChange(): void {
    const cost = Number(this.newInvoiceData.projectCost) || 0;
    if (this.newInvoiceData.status === 'Paid') {
      this.newInvoiceData.amountPaid = cost;
    } else if (this.newInvoiceData.status === 'Unpaid') {
      this.newInvoiceData.amountPaid = 0;
    } else if (this.newInvoiceData.status === 'Partially Paid') {
      const itemsSum = this.computedTaxableTotal;
      if (itemsSum > 0 && itemsSum < cost) {
        this.newInvoiceData.amountPaid = itemsSum;
      } else if (this.newInvoiceData.amountPaid >= cost || this.newInvoiceData.amountPaid <= 0) {
        this.newInvoiceData.amountPaid = Math.round(cost / 2);
      }
    }
  }

  setAmountPaidFromItems(): void {
    const sum = this.computedTaxableTotal;
    this.newInvoiceData.amountPaid = sum;
    this.onAmountPaidChange();
  }

  onItemRateChange(): void {
    const total = this.computedTaxableTotal;
    if (!this.newInvoiceData.projectCost || this.newInvoiceData.projectCost === 5000) {
      this.newInvoiceData.projectCost = total;
    }
    if (this.newInvoiceData.status === 'Paid') {
      this.newInvoiceData.amountPaid = this.newInvoiceData.projectCost;
    } else {
      this.onAmountPaidChange();
    }
  }

  get selectedClient(): ClientRecord | null {
    if (!this.newInvoiceData.clientId) return null;
    return this.allClients.find(c => c.clientId === this.newInvoiceData.clientId) || null;
  }

  getItemTotal(item: any): number {
    const qty = Number(item.qty) || 0;
    const rate = Number(item.rate) || 0;
    return Math.round(qty * rate * 100) / 100;
  }

  formatDisplayDate(d: string | null | undefined): string {
    if (!d) return '-';
    const str = String(d).trim();
    if (!str) return '-';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) return str;
    if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
      const p = str.slice(0, 10).split('-');
      return `${p[2]}/${p[1]}/${p[0]}`;
    }
    if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
      const p = str.split('-');
      return `${p[0]}/${p[1]}/${p[2]}`;
    }
    const dt = new Date(str);
    if (isNaN(dt.getTime())) return str;
    const dd = String(dt.getDate()).padStart(2, '0');
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const yyyy = dt.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  async submitCreateInvoice(): Promise<void> {
    if (!this.newInvoiceData.clientId) {
      alert('Please select or add a client.');
      return;
    }

    for (const item of this.newInvoiceData.items) {
      if (!item.description.trim()) {
        alert('Please fill description for all service lines.');
        return;
      }
      if (Number(item.rate) <= 0 && Number(this.newInvoiceData.projectCost) <= 0) {
        alert('Project cost or rate must be greater than zero.');
        return;
      }
    }

    this.isSavingInvoice = true;
    try {
      const cost = Number(this.newInvoiceData.projectCost) || this.computedTaxableTotal;
      const paid = Number(this.newInvoiceData.amountPaid) || 0;
      const balance = Math.max(0, cost - paid);

      const invoicePayload = {
        ...this.newInvoiceData,
        taxableTotal: cost,
        taxTotal: 0,
        grandTotal: cost,
        totalPaid: paid,
        balanceDue: balance,
        status: this.newInvoiceData.status,
        amountPaid: paid,
        paymentDate: paid > 0 ? (this.newInvoiceData.paymentDate || this.newInvoiceData.invoiceDate) : ''
      };

      if (this.isEditingInvoice) {
        const res = await this.invoiceService.updateInvoice(this.editingInvoiceNo, invoicePayload);
        if (res.success && res.invoice) {
          alert(`Invoice ${this.editingInvoiceNo} updated successfully!`);
          this.closeCreateInvoiceModal();
          await this.loadInvoices();
          if (this.selectedInvoice && this.selectedInvoice.invoiceNo === this.editingInvoiceNo) {
            this.selectedInvoice = res.invoice;
          }
        } else {
          alert(res.message || 'Failed to update invoice.');
        }
      } else {
        const res = await this.invoiceService.createInvoice(invoicePayload);
        if (res.success && res.invoice) {
          alert(`Invoice ${res.invoice.invoiceNo} created successfully!`);
          this.closeCreateInvoiceModal();
          await this.loadInvoices();
        } else {
          alert(res.message || 'Failed to create invoice.');
        }
      }
    } catch (e: any) {
      alert('Network error: ' + e.message);
    } finally {
      this.isSavingInvoice = false;
    }
  }

  // ----------------------------------------------------
  // PAYMENT METHODS
  // ----------------------------------------------------
  openAddPaymentModal(inv: InvoiceRecord): void {
    this.paymentTargetInvoice = inv;
    this.newPaymentData = {
      amountPaid: inv.balanceDue > 0 ? inv.balanceDue : 0,
      paymentDate: new Date().toISOString().slice(0, 10),
      mode: 'UPI',
      note: ''
    };
    this.addPaymentModalOpen = true;
  }

  closeAddPaymentModal(): void {
    this.addPaymentModalOpen = false;
    this.paymentTargetInvoice = null;
  }

  async submitAddPayment(): Promise<void> {
    if (!this.paymentTargetInvoice) return;

    const amt = Number(this.newPaymentData.amountPaid);
    if (amt <= 0) {
      alert('Payment amount must be greater than zero.');
      return;
    }

    if (amt > this.paymentTargetInvoice.balanceDue) {
      alert(`Payment cannot exceed Balance Due of ${this.formatINR(this.paymentTargetInvoice.balanceDue)}.`);
      return;
    }

    this.isSavingPayment = true;
    try {
      const res = await this.invoiceService.addPayment(this.paymentTargetInvoice.invoiceNo, this.newPaymentData);
      if (res.success) {
        alert(`Payment of ${this.formatINR(amt)} recorded! Balance Due: ${this.formatINR(res.balanceDue || 0)}`);
        this.closeAddPaymentModal();
        await this.loadInvoices();
        if (this.selectedInvoice && this.selectedInvoice.invoiceNo === this.paymentTargetInvoice.invoiceNo) {
          const updated = await this.invoiceService.getInvoice(this.selectedInvoice.invoiceNo);
          if (updated.success && updated.invoice) {
            this.selectedInvoice = updated.invoice;
          }
        }
      } else {
        alert(res.message || 'Failed to record payment.');
      }
    } catch (e: any) {
      alert('Network error: ' + e.message);
    } finally {
      this.isSavingPayment = false;
    }
  }

  // ----------------------------------------------------
  // CLIENTS METHODS
  // ----------------------------------------------------
  async loadClients(): Promise<void> {
    try {
      const res = await this.invoiceService.getClients();
      if (res.success && res.clients) {
        this.allClients = res.clients;
        this.applyClientFilters();
      }
    } catch (e: any) {
      console.error('Failed to load clients:', e);
    }
  }

  applyClientFilters(): void {
    const q = (this.clientSearchQuery || '').trim().toLowerCase();
    this.filteredClients = this.allClients.filter(c => {
      if (!q) return true;
      const name = (c.clientName || '').toLowerCase();
      const person = (c.contactPerson || '').toLowerCase();
      const phone = (c.mobile || '').toLowerCase();
      const gst = (c.gstin || '').toLowerCase();
      return name.includes(q) || person.includes(q) || phone.includes(q) || gst.includes(q);
    });
  }

  openAddClientModal(): void {
    this.isEditingClient = false;
    this.clientFormData = {
      clientId: '',
      clientName: '',
      contactPerson: '',
      mobile: '',
      email: '',
      address: '',
      state: 'Uttar Pradesh',
      stateCode: '09',
      gstin: ''
    };
    this.clientModalOpen = true;
  }

  openEditClientModal(client: ClientRecord): void {
    this.isEditingClient = true;
    this.clientFormData = { ...client };
    this.clientModalOpen = true;
  }

  closeClientModal(): void {
    this.clientModalOpen = false;
  }

  async submitClientForm(): Promise<void> {
    if (!this.clientFormData.clientName?.trim()) {
      alert('Client Name is required.');
      return;
    }

    if (this.clientFormData.mobile) {
      const cleaned = this.clientFormData.mobile.replace(/[^0-9]/g, '');
      if (cleaned.length !== 10) {
        alert('Mobile number must be exactly 10 digits.');
        return;
      }
    }

    if (this.clientFormData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.clientFormData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (this.clientFormData.gstin && this.clientFormData.gstin.trim().length !== 15) {
      alert('GSTIN must be 15 characters.');
      return;
    }

    this.isSavingClient = true;
    try {
      const res = await this.invoiceService.saveClient(this.clientFormData);
      if (res.success) {
        alert('Client saved successfully!');
        this.closeClientModal();
        await this.loadClients();
      } else {
        alert(res.message || 'Failed to save client.');
      }
    } catch (e: any) {
      alert('Error saving client: ' + e.message);
    } finally {
      this.isSavingClient = false;
    }
  }

  // ----------------------------------------------------
  // COMPANY MASTER METHODS
  // ----------------------------------------------------
  async loadCompanyMaster(): Promise<void> {
    try {
      const res = await this.invoiceService.getCompany();
      if (res.success && res.company) {
        this.companyMaster = res.company;
        this.companyForm = { ...res.company };
      }
    } catch (e: any) {
      console.error('Failed to load company master:', e);
    }
  }

  async submitCompanyForm(): Promise<void> {
    this.isSavingCompany = true;
    try {
      const res = await this.invoiceService.updateCompany(this.companyForm);
      if (res.success && res.company) {
        this.companyMaster = res.company;
        alert('Company settings updated successfully in company_master.xlsx!');
      } else {
        alert(res.message || 'Failed to update company master.');
      }
    } catch (e: any) {
      alert('Error updating company: ' + e.message);
    } finally {
      this.isSavingCompany = false;
    }
  }

  // ----------------------------------------------------
  // INQUIRIES METHODS
  // ----------------------------------------------------
  async loadInquiries(): Promise<void> {
    try {
      const res = await this.inquiryService.fetchInquiries();
      if (res.success) {
        this.allInquiries = res.inquiries || [];
        this.dataSource = res.source || 'excel';
        this.extractFilterOptions();
        this.applyInquiryFilters();
      }
    } catch (e: any) {
      console.error('Failed to load inquiries:', e);
    }
  }

  private extractFilterOptions(): void {
    const raw = this.allInquiries.map(i => i.serviceType?.trim()).filter((v): v is string => Boolean(v));
    this.serviceOptions = Array.from(new Set(raw)).sort();
  }

  applyInquiryFilters(): void {
    const q = (this.inquirySearchQuery || '').trim().toLowerCase();
    const svc = this.selectedService;

    this.filteredInquiries = this.allInquiries.filter(item => {
      if (svc !== 'ALL' && item.serviceType !== svc) return false;
      if (q) {
        const name = (item.name || '').toLowerCase();
        const comp = (item.companyName || '').toLowerCase();
        const phone = (item.phone || '').toLowerCase();
        const email = (item.email || '').toLowerCase();
        return name.includes(q) || comp.includes(q) || phone.includes(q) || email.includes(q);
      }
      return true;
    });
  }

  exportInquiriesExcel(): void {
    window.open(this.inquiryService.getExportExcelUrl(), '_blank');
  }

  // ----------------------------------------------------
  // KPI CALCULATIONS
  // ----------------------------------------------------
  get totalInvoiced(): number {
    return this.allInvoices.reduce((sum, inv) => sum + (Number(inv.grandTotal) || 0), 0);
  }

  get totalCollected(): number {
    return this.allInvoices.reduce((sum, inv) => sum + (Number(inv.totalPaid) || 0), 0);
  }

  get totalPendingDue(): number {
    return this.allInvoices.reduce((sum, inv) => sum + (Number(inv.balanceDue) || 0), 0);
  }

  // Formatting Helper
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

  logout(): void {
    this.authService.logout();
  }
}
