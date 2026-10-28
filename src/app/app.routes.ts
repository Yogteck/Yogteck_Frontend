import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ClientsPageComponent } from './components/clients-page/clients-page.component';
import { ToolsPageComponent } from './components/tools-page/tools-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { LegalPageComponent } from './components/legal-page/legal-page.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { KanpurLocationComponent } from './components/kanpur-location/kanpur-location.component';
import { LucknowLocationComponent } from './components/lucknow-location/lucknow-location.component';
import { RaebareliLocationComponent } from './components/raebareli-location/raebareli-location.component';
import { CityPageComponent } from './components/city-page/city-page.component';
import { ServiceAreasComponent } from './components/service-areas/service-areas.component';
import { SolutionPageComponent } from './components/solution-page/solution-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { localeValidationGuard } from './guards/locale.guard';

export const routes: Routes = [
  // 1. Primary Public Canonical Routes (Zero-redirect top-level paths)
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'clients', component: ClientsPageComponent },
  { path: 'clients/:clientId', component: ClientsPageComponent },
  { path: 'tools', component: ToolsPageComponent },
  { path: 'tools/:toolId', component: ToolsPageComponent },
  
  // Dedicated Service Pages
  { path: 'services/:slug', component: ServiceDetailComponent },
  { path: 'services/website-development', component: ServiceDetailComponent },
  { path: 'services/custom-software-development', component: ServiceDetailComponent },
  { path: 'services/mobile-app-development', component: ServiceDetailComponent },
  { path: 'services/erp-software', component: ServiceDetailComponent },
  { path: 'services/inventory-software', component: ServiceDetailComponent },
  { path: 'services/billing-software', component: ServiceDetailComponent },
  { path: 'services/mlm-software', component: ServiceDetailComponent },
  { path: 'services/ai-software-development', component: ServiceDetailComponent },
  { path: 'services/ecommerce-development', component: ServiceDetailComponent },
  { path: 'services/seo-digital-growth', component: ServiceDetailComponent },
  { path: 'services/real-estate-plotting-software', component: ServiceDetailComponent },
  { path: 'services/business-software', component: ServiceDetailComponent },

  // Dedicated Product Pages
  { path: 'products/:slug', component: ProductDetailComponent },
  { path: 'products/erp-software', component: ProductDetailComponent },
  { path: 'products/saas-platform', component: ProductDetailComponent },
  { path: 'products/whatsapp-marketing-tool', component: ProductDetailComponent },

  // Directory & Location Hubs (Kanpur HQ + Service Areas)
  { path: 'service-areas', component: ServiceAreasComponent },
  { path: 'it-software-company-kanpur', component: KanpurLocationComponent },
  { path: 'it-software-company-lucknow', component: LucknowLocationComponent },
  { path: 'it-software-company-raebareli', component: RaebareliLocationComponent },
  { path: 'it-software-company-uttar-pradesh', component: CityPageComponent },
  { path: 'it-software-company-rajasthan', component: CityPageComponent },
  { path: 'it-software-company-gujarat', component: CityPageComponent },
  { path: 'it-software-company-madhya-pradesh', component: CityPageComponent },
  { path: 'it-software-company-jaipur', component: CityPageComponent },
  { path: 'it-software-company-indore', component: CityPageComponent },
  { path: 'it-software-company-ahmedabad', component: CityPageComponent },
  { path: 'it-software-company-chandigarh', component: CityPageComponent },
  { path: 'it-software-company-bangalore', component: CityPageComponent },
  { path: 'it-software-company-faridabad', component: CityPageComponent },
  { path: 'it-software-company-noida', component: CityPageComponent },
  { path: 'it-software-company-delhi', component: CityPageComponent },
  { path: 'it-software-company-gurugram', component: CityPageComponent },
  { path: 'it-software-company-pune', component: CityPageComponent },
  { path: 'it-software-company-mumbai', component: CityPageComponent },

  // Industry + Service Long-Tail Solutions
  { path: 'solutions/:slug', component: SolutionPageComponent },
  { path: 'solutions/erp-for-manufacturers', component: SolutionPageComponent },
  { path: 'solutions/inventory-software-for-traders', component: SolutionPageComponent },
  { path: 'solutions/billing-software-for-retail', component: SolutionPageComponent },
  { path: 'solutions/erp-for-pharma-distributors', component: SolutionPageComponent },

  // Legal & Informational Pages
  { path: 'privacy-policy', component: LegalPageComponent },
  { path: 'terms-of-service', component: LegalPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'blog/:slug', component: BlogPageComponent },

  // 2. Admin Authentication & Dashboard
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminAuthGuard] },

  // 3. Localized Routes Tree (:locale prefix e.g. /en-us/, /ja-jp/, /ar-sa/, /en/)
  {
    path: ':locale',
    canActivate: [localeValidationGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about', component: AboutPageComponent },
      { path: 'contact', component: ContactPageComponent },
      { path: 'clients', component: ClientsPageComponent },
      { path: 'clients/:clientId', component: ClientsPageComponent },
      { path: 'tools', component: ToolsPageComponent },
      { path: 'tools/:toolId', component: ToolsPageComponent },
      { path: 'services/:slug', component: ServiceDetailComponent },
      { path: 'products/:slug', component: ProductDetailComponent },
      { path: 'it-software-company-kanpur', component: KanpurLocationComponent },
      { path: 'it-software-company-lucknow', component: LucknowLocationComponent },
      { path: 'it-software-company-raebareli', component: RaebareliLocationComponent },
      { path: 'privacy-policy', component: LegalPageComponent },
      { path: 'terms-of-service', component: LegalPageComponent },
      { path: 'blog', component: BlogPageComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },

  // 4. Global 404
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];
