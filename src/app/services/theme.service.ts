import { Injectable, signal } from '@angular/core';

export type AppTheme = 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'yogteck-theme-mode';
  
  // Strict light theme requirement: White background, black/dark text, no dark mode
  currentTheme = signal<AppTheme>('light');

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (typeof window === 'undefined') return;
    this.setTheme('light');
  }

  setTheme(theme: AppTheme = 'light'): void {
    this.currentTheme.set('light');
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const body = document.body;

      root.setAttribute('data-theme', 'light');
      body.classList.add('theme-light');
      body.classList.remove('theme-dark');
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_STORAGE_KEY, 'light');
    }
  }

  toggleTheme(): void {
    this.setTheme('light');
  }

  isLight(): boolean {
    return true;
  }

  isDark(): boolean {
    return false;
  }
}
