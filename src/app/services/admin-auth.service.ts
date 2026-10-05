import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONTACT_CONFIG } from '../data/contact.config';

export interface AdminUser {
  username: string;
  loginTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly TOKEN_KEY = 'yogteck_admin_token';
  private readonly USER_KEY = 'yogteck_admin_user';
  private readonly EXPIRY_KEY = 'yogteck_admin_expiry';

  // Base API URL derived from backend contact config
  private readonly apiBaseUrl = this.getApiBaseUrl();

  constructor(private router: Router) {}

  private getApiBaseUrl(): string {
    const contactApi = CONTACT_CONFIG.backendContactApi || '';
    if (contactApi.includes('/api/')) {
      return contactApi.split('/api/')[0];
    }
    return '';
  }

  public isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem(this.TOKEN_KEY);
    const expiryStr = localStorage.getItem(this.EXPIRY_KEY);

    if (!token || !expiryStr) {
      return false;
    }

    const expiryTime = parseInt(expiryStr, 10);
    if (isNaN(expiryTime) || Date.now() > expiryTime) {
      this.clearSession();
      return false;
    }

    return true;
  }

  public getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getUsername(): string {
    if (typeof window === 'undefined') return 'Admin';
    return localStorage.getItem(this.USER_KEY) || 'Yogtek';
  }

  public async login(username: string, password: string): Promise<{ success: boolean; message?: string }> {
    const trimmedUser = (username || '').trim();
    const trimmedPass = password || '';

    if (!trimmedUser || !trimmedPass) {
      return { success: false, message: 'Please enter both username and password.' };
    }

    // 1. Attempt Server-Side Authentication
    const loginEndpoints = [
      `${this.apiBaseUrl}/api/admin/login`,
      '/api/admin/login',
      'http://localhost:5000/api/admin/login'
    ];

    let serverAttempted = false;
    let serverSuccess = false;
    let errorMessage = '';

    for (const url of loginEndpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: trimmedUser, password: trimmedPass })
        });

        serverAttempted = true;
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success && data.token) {
          this.setSession(data.token, data.user?.username || trimmedUser);
          serverSuccess = true;
          return { success: true };
        } else if (res.status === 401) {
          errorMessage = data.message || 'Invalid username or password.';
          return { success: false, message: errorMessage };
        }
      } catch (e) {
        // Continue to try next or fallback
      }
    }

    // 2. Client-Side Authentication Fallback (if backend is offline during local SSR/testing)
    if (!serverSuccess) {
      // Static credentials (Case-sensitive)
      const STATIC_USER = 'Yogtek';
      const STATIC_PASS = 'Yogtek 2026';

      if (trimmedUser === STATIC_USER && trimmedPass === STATIC_PASS) {
        // Generate client-side secure session token
        const mockToken = 'yt_admin_sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        this.setSession(mockToken, STATIC_USER);
        return { success: true };
      } else {
        return { success: false, message: errorMessage || 'Invalid username or password.' };
      }
    }

    return { success: false, message: errorMessage || 'Invalid credentials.' };
  }

  private setSession(token: string, username: string): void {
    if (typeof window === 'undefined') return;
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, username);
    localStorage.setItem(this.EXPIRY_KEY, expiresAt.toString());
  }

  public clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }

  public async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        const logoutUrl = `${this.apiBaseUrl}/api/admin/logout`;
        await fetch(logoutUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).catch(() => {});
      } catch (e) {}
    }

    this.clearSession();
    this.router.navigate(['/admin/login']);
  }
}
