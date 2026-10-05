import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { KanpurLocationComponent } from './components/kanpur-location/kanpur-location.component';
import { LucknowLocationComponent } from './components/lucknow-location/lucknow-location.component';
import { RaebareliLocationComponent } from './components/raebareli-location/raebareli-location.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
  // 1. Homepage
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // 2. Admin Authentication & Inquiry Dashboard
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminAuthGuard] },

  // 3. Local SEO Landing Pages
  { path: 'it-software-company-kanpur', component: KanpurLocationComponent },
  { path: 'it-software-company-lucknow', component: LucknowLocationComponent },
  { path: 'it-software-company-raebareli', component: RaebareliLocationComponent },

  // 4. Dedicated Service Pages
  { path: 'services/:slug', component: ServiceDetailComponent },

  // 5. Aliases / direct legacy service paths
  { path: 'services/website-development', component: ServiceDetailComponent },
  { path: 'services/custom-software-development', component: ServiceDetailComponent },
  { path: 'services/mobile-app-development', component: ServiceDetailComponent },
  { path: 'services/erp-software', component: ServiceDetailComponent },
  { path: 'services/billing-software', component: ServiceDetailComponent },
  { path: 'services/ecommerce-development', component: ServiceDetailComponent },
  { path: 'services/seo-digital-growth', component: ServiceDetailComponent },
  { path: 'services/business-software', component: ServiceDetailComponent },

  // 6. Wildcard fallback
  { path: '**', redirectTo: '' }
];
