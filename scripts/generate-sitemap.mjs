import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 1. Live Domain Configuration
const DOMAIN = (process.env.SITE_URL || 'https://yogteck.com').replace(/\/+$/, '');

// 2. Real Live Routes Verified in app.routes.ts and seo-content.data.ts
const LIVE_ROUTES = [
  // Homepage
  {
    path: '/',
    sourceFile: 'src/app/components/home/home.component.ts',
    label: 'Homepage'
  },
  // Regional Location Hubs (Standalone Components + LOCATIONS_SEO_DATA)
  {
    path: '/it-software-company-kanpur',
    sourceFile: 'src/app/components/kanpur-location/kanpur-location.component.ts',
    label: 'Kanpur Hub'
  },
  {
    path: '/it-software-company-lucknow',
    sourceFile: 'src/app/components/lucknow-location/lucknow-location.component.ts',
    label: 'Lucknow Hub'
  },
  {
    path: '/it-software-company-raebareli',
    sourceFile: 'src/app/components/raebareli-location/raebareli-location.component.ts',
    label: 'Raebareli Hub'
  },
  // Active Core Services (Rendered by ServiceDetailComponent + SERVICES_SEO_DATA)
  {
    path: '/services/website-development',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Website Development'
  },
  {
    path: '/services/custom-software-development',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Custom Software Development'
  },
  {
    path: '/services/mobile-app-development',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Mobile App Development'
  },
  {
    path: '/services/erp-software',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'ERP Software Solutions'
  },
  {
    path: '/services/billing-software',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Billing & Invoicing Software'
  },
  {
    path: '/services/ecommerce-development',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'E-Commerce Development'
  },
  {
    path: '/services/seo-digital-growth',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'SEO & Digital Growth'
  },
  {
    path: '/services/business-software',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Business Management Software'
  }
];

// 3. Planned / In-Development Pages (Not Live in app.routes.ts yet)
// Placed inside XML comment block for easy uncommenting when deployed
const PLANNED_PAGES = [
  { path: '/services/inventory-broadcasting-system', label: 'Inventory-to-Customer Broadcasting' },
  { path: '/services/business-process-automation', label: 'Business Process Automation & Migration' },
  { path: '/services/digital-sms-email-marketing', label: 'DLT SMS & Email Marketing' },
  { path: '/services/inventory-management-software', label: 'Multi-Godown Inventory Software' },
  { path: '/services/custom-erp-software', label: 'Custom Tailored ERP Software' },
  { path: '/services/sales-as-a-service', label: 'B2B Sales-as-a-Service' },
  { path: '/industries/wholesalers-bulk-traders', label: 'Wholesale & Bulk Trading Software' },
  { path: '/industries/distributors-stockists', label: 'Distribution & Stockist Management' },
  { path: '/industries/sme-manufacturers', label: 'Production & Manufacturing ERP' },
  { path: '/industries/retail-chains-marts', label: 'Retail Multi-Store POS Software' },
  { path: '/industries/commodity-goods-traders', label: 'Commodity & Mandi Trading Software' },
  { path: '/industries/schools-educational-institutes', label: 'School ERP & Fee Collection' }
];

/**
 * Get real last-modified date (YYYY-MM-DD) from Git log, falling back to file mtime or latest commit date.
 */
function getLastModDate(filePath) {
  try {
    const fullPath = path.join(projectRoot, filePath);
    const gitDate = execSync(`git log -n 1 --format="%cs" -- "${filePath}"`, {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(gitDate)) {
      return gitDate;
    }

    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      return stats.mtime.toISOString().split('T')[0];
    }
  } catch {
    // Fallback if git fails
  }
  return '2026-10-05';
}

/**
 * Generate XML content
 */
function buildSitemapXml() {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const route of LIVE_ROUTES) {
    const loc = route.path === '/' ? `${DOMAIN}/` : `${DOMAIN}${route.path}`;
    const lastmod = getLastModDate(route.sourceFile);
    lines.push(`  <!-- ${route.label} -->`);
    lines.push('  <url>');
    lines.push(`    <loc>${loc}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push('  </url>');
  }

  lines.push('');
  lines.push('  <!-- PLANNED PAGES (Uncomment when routes and content are published):');
  for (const planned of PLANNED_PAGES) {
    const loc = `${DOMAIN}${planned.path}`;
    lines.push(`  <url>`);
    lines.push(`    <loc>${loc}</loc>`);
    lines.push(`    <lastmod>2026-10-05</lastmod>`);
    lines.push(`  </url>`);
  }
  lines.push('  -->');
  lines.push('</urlset>');
  lines.push('');

  return lines.join('\n');
}

/**
 * Build robots.txt
 */
function buildRobotsTxt() {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# Private & administrative routes',
    'Disallow: /admin',
    'Disallow: /admin/',
    '',
    `Sitemap: ${DOMAIN}/sitemap.xml`,
    ''
  ].join('\n');
}

// 4. Write to public/
const publicDir = path.join(projectRoot, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapPath = path.join(publicDir, 'sitemap.xml');
const robotsPath = path.join(publicDir, 'robots.txt');

fs.writeFileSync(sitemapPath, buildSitemapXml(), 'utf8');
console.log(`[sitemap] Successfully generated: ${sitemapPath}`);

fs.writeFileSync(robotsPath, buildRobotsTxt(), 'utf8');
console.log(`[robots]  Successfully generated: ${robotsPath}`);
