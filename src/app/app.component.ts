import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './services/seo.service';
import { SmartRedirectService } from './services/smart-redirect.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Yogteck Business Solution';

  constructor(
    private seoService: SeoService,
    private smartRedirectService: SmartRedirectService
  ) {}

  ngOnInit(): void {
    // 1. Initialize dynamic Canonical URL
    this.seoService.updateCanonicalUrl();

    // 2. Handle smart 404 redirection only if user lands on an unrecognized path
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (currentPath && currentPath !== '/' && currentPath !== '/index.html') {
        if (!this.smartRedirectService.isKnownRoute(currentPath)) {
          this.smartRedirectService.handleUnknownUrl(currentPath);
        }
      }
    }
  }
}
