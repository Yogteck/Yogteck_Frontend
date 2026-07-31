import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SeoService } from './services/seo.service';
import { SmartRedirectService } from './services/smart-redirect.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'YogTeck';

  constructor(
    private seoService: SeoService,
    private smartRedirectService: SmartRedirectService
  ) {}

  ngOnInit(): void {
    // 1. Initialize dynamic Canonical URL
    this.seoService.updateCanonicalUrl();

    // 2. Handle smart 404 redirection if user lands on an invalid path
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (currentPath && currentPath !== '/' && currentPath !== '/index.html') {
        this.smartRedirectService.handleUnknownUrl(currentPath);
      }
    }
  }
}
