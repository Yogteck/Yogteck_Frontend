import { Injectable, signal } from '@angular/core';

export type AppTheme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'yogteck-theme-mode';
  
  // Default to dark theme as base
  currentTheme = signal<AppTheme>('dark');

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as AppTheme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.setTheme(savedTheme);
    } else {
      // Check user system preference or default to dark
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      this.setTheme(prefersLight ? 'light' : 'dark');
    }
  }

  setTheme(theme: AppTheme): void {
    this.currentTheme.set(theme);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const body = document.body;

      root.setAttribute('data-theme', theme);
      
      if (theme === 'light') {
        body.classList.add('theme-light');
        body.classList.remove('theme-dark');
      } else {
        body.classList.add('theme-dark');
        body.classList.remove('theme-light');
      }
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    }
  }

  toggleTheme(): void {
    const nextTheme: AppTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  isLight(): boolean {
    return this.currentTheme() === 'light';
  }

  isDark(): boolean {
    return this.currentTheme() === 'dark';
  }
}
