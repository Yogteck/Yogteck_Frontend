import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from './services/seo.service';
import { SmartRedirectService } from './services/smart-redirect.service';
import { LocaleService } from './services/locale.service';

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
    private router: Router,
    private seoService: SeoService,
    private smartRedirectService: SmartRedirectService,
    private localeService: LocaleService
  ) {}

  ngOnInit(): void {
    // 1. Initialize locale from window path on initial load
    if (typeof window !== 'undefined') {
      this.localeService.initLocaleFromUrl(window.location.pathname);
    }

    // 2. React to navigation events to keep locale state synced
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(event => {
      this.localeService.initLocaleFromUrl(event.urlAfterRedirects || event.url);
    });

    // 3. Handle smart 404 redirection only if user lands on an unrecognized path
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
