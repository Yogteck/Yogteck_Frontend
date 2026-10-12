import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { KanpurLocationComponent } from './components/kanpur-location/kanpur-location.component';
import { LucknowLocationComponent } from './components/lucknow-location/lucknow-location.component';
import { RaebareliLocationComponent } from './components/raebareli-location/raebareli-location.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { rootLocaleRedirectGuard, localeValidationGuard } from './guards/locale.guard';

export const routes: Routes = [
  // 1. Root '/' geo-detection redirect (never traps bots; redirects humans to best matching locale)
  { path: '', canActivate: [rootLocaleRedirectGuard], pathMatch: 'full', children: [] },

  // 2. Admin Authentication & Inquiry Dashboard (Direct system paths)
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminAuthGuard] },

  // 3. Localized Routes Tree (:locale prefix e.g. /en-us/, /ja-jp/, /ar-sa/, /en/)
  {
    path: ':locale',
    canActivate: [localeValidationGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },

      // Location Hubs
      { path: 'it-software-company-kanpur', component: KanpurLocationComponent },
      { path: 'it-software-company-lucknow', component: LucknowLocationComponent },
      { path: 'it-software-company-raebareli', component: RaebareliLocationComponent },

      // Dedicated Services
      { path: 'services/:slug', component: ServiceDetailComponent },
      { path: 'services/website-development', component: ServiceDetailComponent },
      { path: 'services/custom-software-development', component: ServiceDetailComponent },
      { path: 'services/mobile-app-development', component: ServiceDetailComponent },
      { path: 'services/erp-software', component: ServiceDetailComponent },
      { path: 'services/billing-software', component: ServiceDetailComponent },
      { path: 'services/ecommerce-development', component: ServiceDetailComponent },
      { path: 'services/seo-digital-growth', component: ServiceDetailComponent },
      { path: 'services/business-software', component: ServiceDetailComponent },

      // Localized Slugs (e.g. Japanese ERP alias)
      { path: 'erp-kaihatsu', component: ServiceDetailComponent },

      // Localized 404
      { path: '404', component: NotFoundComponent }
    ]
  },

  // 4. Non-prefixed legacy aliases (redirects to /en/ for crawl compatibility)
  { path: 'it-software-company-kanpur', redirectTo: 'en/it-software-company-kanpur', pathMatch: 'full' },
  { path: 'it-software-company-lucknow', redirectTo: 'en/it-software-company-lucknow', pathMatch: 'full' },
  { path: 'it-software-company-raebareli', redirectTo: 'en/it-software-company-raebareli', pathMatch: 'full' },
  { path: 'services/:slug', redirectTo: 'en/services/:slug', pathMatch: 'full' },

  // 5. Global fallback
  { path: '**', component: NotFoundComponent }
];
