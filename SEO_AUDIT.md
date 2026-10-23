# YogTeck SEO & AI-Visibility Audit (Step 1 Findings)
Date: October 22, 2026

## 1. Framework & Rendering Architecture Analysis
- **Framework**: Angular 18 (`@angular/core`: `^18.2.0`, `@angular-devkit/build-angular`: `^18.2.21`, `@angular/router`: `^18.2.0`).
- **Build Tool**: Angular CLI with application builder (`@angular-devkit/build-angular:application`).
- **Hosting Target**: Firebase Hosting (`firebase.json` points public directory to `dist/bizracks-angular/browser` with a rewrite rule `{"source": "**", "destination": "/index.html"}`).
- **Rendering Mechanism**: Pure Client-Side Rendering (CSR).
  - In `angular.json`, only `"browser": "src/main.ts"` is defined. No server bundle (`"server"`) or static prerender configuration (`"prerender"`) is configured.
  - When the build runs, only `dist/bizracks-angular/browser/index.html` is generated.
  - In raw HTML, the body contains only `<app-root></app-root>`.
  - All text, navigation, headings (`<h1>`), paragraphs, client cards, and services are injected strictly client-side when JavaScript evaluates in a browser engine.

### Concrete Evidence from `angular.json`:
```json
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:application",
    "options": {
      "outputPath": "dist/bizracks-angular",
      "index": "src/index.html",
      "browser": "src/main.ts",
      "polyfills": [
        "zone.js"
      ],
      "tsConfig": "tsconfig.app.json",
      "assets": [
        {
          "glob": "**/*",
          "input": "public"
        }
      ]
    }
  }
}
```

---

## 2. RENDER CHECK (Plain HTTP client / No JavaScript)
All URLs were requested using a plain Node.js `fetch()` request (identical to curl / HTTP scrapers / non-JS AI bots).

### Real Fetch Output per Page:
| Requested URL | HTTP Status | Response Length | `<h1>` Found in Raw HTML? | Raw `<h1>` Extracted | Raw `<title>` Extracted | Raw Canonical Extracted | Content In Raw HTML |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `https://yogteck.com/` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/services/website-development` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/services/custom-software-development` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/services/mobile-app-development` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/services/erp-software` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/services/billing-software` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/services/ecommerce-development` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/services/seo-digital-growth` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/services/business-software` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/it-software-company-kanpur` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/it-software-company-lucknow` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |
| `https://yogteck.com/it-software-company-raebareli` | 200 | 10,412 B | ❌ NO | `NONE` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `https://yogteck.com/` | `<app-root></app-root>` (No main text) |

**Conclusion**: The raw HTML sent across all routes is 100% identical and empty of content. Search engine bots and AI indexers that do not execute full JavaScript see zero body copy, zero page-specific headings, and a duplicate canonical pointing back to Home.

---

## 3. Current Page Metadata (In Static Initial HTML)
| Current Page URL | In Initial HTML Title | In Initial HTML Description | In Initial HTML Canonical | In Initial HTML `<h1>` | In Initial HTML Structured Data |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `Yogteck Business Solution \| IT & Software Company in Kanpur, India` | `Yogteck Business Solution is an IT and software company in Kanpur offering website development, custom software, mobile apps, ERP, e-commerce and digital business solutions across India.` | `https://yogteck.com/` | None (`<app-root></app-root>`) | WebSite, Organization, ProfessionalService |
| All Inner Pages (`/services/*`, `/it-software-company-*`) | Same fallback as Home (Not unique) | Same fallback as Home (Not unique) | `https://yogteck.com/` (Duplicate canonical) | None (`<app-root></app-root>`) | Same fallback as Home (No Service, No Breadcrumbs, No FAQ schema in initial HTML) |

---

## 4. Existing Robots.txt and Sitemap.xml Analysis

### Existing `public/robots.txt`:
```
User-agent: *
Allow: /

# Private & administrative routes
Disallow: /admin
Disallow: /admin/

Sitemap: https://yogteck.com/sitemap.xml
```

#### Crawler Blocking Assessment:
- Does it block Googlebot? **No**.
- Does it block Bingbot? **No**.
- Does it block GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot? **No direct Disallow rule blocks them**, but there are no explicit Allow entries or optimized directives acknowledging these modern AI engines.
- Defect: Does not explicitly ensure AI crawlers have full permission, and does not specify crawl-delay or modern bot headers.

### Existing `public/sitemap.xml`:
- File Size: ~180 KB (2,013 lines).
- Generated by: `scripts/generate-sitemap.mjs`.
- Problem Identified: The script generated hundreds of permutations for 11 different locale codes (`/en-us/`, `/en-ca/`, `/fr-ca/`, `/ja-jp/`, `/ar-sa/`, etc.) with reciprocal alternate hreflangs, even though the content is primarily in English with identical templates.
- More critically: The sitemap lacks clean, canonical URLs for all actual public pages (Tools, Products, Case Studies, Legal, City hubs) on the canonical domain (`https://yogteck.com`).

---

## 5. Real Content of Clients, Tools, and Products (Source Material)
No facts, client names, or statistics have been invented. Source verified from:
- `src/app/data/clients.data.ts`
- `src/app/data/projects.data.ts`
- `src/app/data/services.data.ts`
- `src/app/data/contact.config.ts`

### Real Clients Found:
1. **MMR Constructions and Developer Private Limited** (`mmr-constructions`):
   - Category: Real Estate & Infrastructure
   - Description: Enterprise corporate web portal & project portfolio showcasing premier commercial and residential developments.
   - Project: MMR Corporate & Infrastructure Portal. High-performance interactive portal featuring 3D project walkthroughs, floor plan downloads, and direct investor enquiry routing.
   - Real metrics on site: `99.9% Uptime & 2.4x Lead Inflow`.
2. **Yogkart Healthcare Private Limited** (`yogkart-healthcare`):
   - Category: Healthcare & E-Commerce
   - Description: Scalable e-commerce and health wellness platform serving verified healthcare products pan-India.
   - Project: Yogkart Healthcare Pan-India Store. Direct-to-consumer pharmacy & healthcare ecommerce with multi-warehouse inventory, prescription upload, and instant payment checkout.
   - Real metrics on site: `+320% Online Order Growth`.
3. **Business Web Solutions** (`business-web-solutions`):
   - Category: IT & Digital Consulting
   - Description: Digital consulting agency partnering on cloud architecture, client portals, and performance optimization.
   - Project: Omnichannel ERP & Warehouse Sync. Real-time billing, dispatch, GST e-invoicing, and stock allocation across 4 distribution hubs in North India.
   - Real metrics on site: `70% Faster Invoice Cycles`.
4. **D2C Retail Brand**:
   - Project: Multi-Marketplace Scale & Ads Engine. Full catalogue onboarding, Buy-Box optimization, and sponsored product ad campaigns on Amazon, Flipkart, and Meesho.
   - Real metrics on site: `₹45L+ Monthly GMV Scaled`.

### Real Products / Tools Found:
1. **WhatsApp Marketing Tool**:
   - Monthly subscription plans.
   - Omnichannel lead capture, automated greeting messages, product brochures, instant payment reminder links, automated follow-ups, and customer feedback triggers.
2. **GST Billing & Invoicing Software / POS**:
   - 10-second GST invoices, WhatsApp PDF receipts, barcode scanning & custom label printing, thermal (2-inch/3-inch) & laser printer support, customer Udhar credit ledger, daily cash/closing reports.
3. **Cloud ERP Software Solutions**:
   - Unified ERP for manufacturing, trading, and distribution. Real-time stock inventory across multiple warehouses, production Bill of Materials (BOM), automated GST e-way billing, multi-branch support, vendor purchase lifecycles, and HR/payroll.
4. **SaaS Platform**:
   - Customers can use Yogteck's SaaS software as a cloud service or run their own white-label instance for their business.
5. **Real-Estate / Plotting Software**:
   - Specialized property booking platform: plot inventory management, site visit bookings, EMI calculation & installment tracking, associate / agent commission calculation, and customer document / booking portal.

### Real Company / Office Details:
- **Company Name**: Yogteck Business Solution (alternate: YOGTECK)
- **Tagline**: Build • Grow • Succeed
- **Real Registered Office**: 302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, Uttar Pradesh, PIN 208015
- **Phone**: +91 8299209905
- **Emails**: yogteck@gmail.com / official@yogteck.com
- **Service Areas (No physical office, service delivery area)**: Noida, Delhi, Gurugram, Lucknow, Pune, Mumbai.

---

## 6. Options to Make Content Crawlable (Smallest-Risk Selection)

### Option A: Angular Universal / SSR with Node server runtime
- *Effort*: High. Requires setting up and deploying an Express/Node server runtime on Firebase Cloud Functions, managing cold starts, memory leaks, and complex hosting config.
- *Risk*: Moderate to high. Changes hosting architecture from fast static CDN to dynamic compute.

### Option B: Angular 18 Static Pre-rendering (SSG) / Post-build Static Generation
- *Effort*: Low to moderate. Runs during `npm run build`. For every public URL, generates a prerendered static `index.html` file containing the complete initial HTML: unique title, unique description, canonical tag, exact `<h1>`, complete paragraph text, FAQ content, breadcrumbs, and valid JSON-LD schemas.
- *How Firebase Hosting Serves It*: Firebase Hosting natively serves static files matching the URL path (`dist/bizracks-angular/browser/<path>/index.html`) directly with HTTP 200 before falling back to the SPA rewrite `/index.html`.
- *Risk*: Lowest risk. 100% backward-compatible with Angular client-side hydration, zero server maintenance, zero cold starts, lightning-fast CDN response times, and 100% content visible in initial no-JS fetch.

### Decision:
We choose **Option B: Static Prerendering (SSG)**. We will configure static prerendering for every public page, guaranteeing that plain HTTP requests (curl, node fetch, Googlebot, AI bots) receive the full HTML document with `<h1>`, text, and schema markup.
