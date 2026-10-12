import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 1. Live Domain Configuration
const DOMAIN = (process.env.SITE_URL || 'https://yogteck.com').replace(/\/+$/, '');

// 2. Multi-Country Locales & Hreflang Identifiers
const LOCALES = [
  { code: 'en-us', hreflang: 'en-US', label: 'United States (English)' },
  { code: 'en-ca', hreflang: 'en-CA', label: 'Canada (English)' },
  { code: 'fr-ca', hreflang: 'fr-CA', label: 'Canada (French)' },
  { code: 'en-au', hreflang: 'en-AU', label: 'Australia (English)' },
  { code: 'ja-jp', hreflang: 'ja-JP', label: 'Japan (Japanese)' },
  { code: 'ar-sa', hreflang: 'ar-SA', label: 'Saudi Arabia (Arabic, RTL)' },
  { code: 'ar-kw', hreflang: 'ar-KW', label: 'Kuwait (Arabic, RTL)' },
  { code: 'ar-bh', hreflang: 'ar-BH', label: 'Bahrain (Arabic, RTL)' },
  { code: 'en-in', hreflang: 'en-IN', label: 'India (English)' },
  { code: 'hi-in', hreflang: 'hi-IN', label: 'India (Hindi)' },
  { code: 'en', hreflang: 'x-default', label: 'Global Fallback (x-default)' }
];

// 3. Real Live Routes Verified in app.routes.ts
const LIVE_ROUTES = [
  // Homepage
  {
    path: '',
    sourceFile: 'src/app/components/home/home.component.ts',
    label: 'Home'
  },
  // Regional Location Hubs
  {
    path: 'it-software-company-kanpur',
    sourceFile: 'src/app/components/kanpur-location/kanpur-location.component.ts',
    label: 'Kanpur Hub'
  },
  {
    path: 'it-software-company-lucknow',
    sourceFile: 'src/app/components/lucknow-location/lucknow-location.component.ts',
    label: 'Lucknow Hub'
  },
  {
    path: 'it-software-company-raebareli',
    sourceFile: 'src/app/components/raebareli-location/raebareli-location.component.ts',
    label: 'Raebareli Hub'
  },
  // Active Core Services
  {
    path: 'services/website-development',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Website Development'
  },
  {
    path: 'services/custom-software-development',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Custom Software Development'
  },
  {
    path: 'services/mobile-app-development',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Mobile App Development'
  },
  {
    path: 'services/erp-software',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'ERP Software Solutions'
  },
  {
    path: 'services/billing-software',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Billing & Invoicing Software'
  },
  {
    path: 'services/ecommerce-development',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'E-Commerce Development'
  },
  {
    path: 'services/seo-digital-growth',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'SEO & Digital Growth'
  },
  {
    path: 'services/business-software',
    sourceFile: 'src/app/data/seo-content.data.ts',
    label: 'Business Management Software'
  }
];

/**
 * Get real last-modified date (YYYY-MM-DD) from Git log, falling back to file mtime or default date.
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
  return '2026-10-12';
}

/**
 * Build dynamic multi-country, multi-language sitemap XML with reciprocal xhtml:link hreflangs
 */
function buildSitemapXml() {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
  ];

  for (const route of LIVE_ROUTES) {
    const subpath = route.path ? `/${route.path}/` : '/';
    const lastmod = getLastModDate(route.sourceFile);

    lines.push(`  <!-- ════════ ${route.label} (${subpath}) ════════ -->`);

    // Output a <url> entry for every supported locale
    for (const locale of LOCALES) {
      const pageLoc = `${DOMAIN}/${locale.code}${subpath}`;

      lines.push('  <url>');
      lines.push(`    <loc>${pageLoc}</loc>`);
      lines.push(`    <lastmod>${lastmod}</lastmod>`);

      // Reciprocal alternate links for all locales including x-default
      for (const alt of LOCALES) {
        const altUrl = `${DOMAIN}/${alt.code}${subpath}`;
        lines.push(`    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${altUrl}"/>`);
      }

      lines.push('  </url>');
    }
  }

  // Localized Japanese ERP route (/ja-jp/erp-kaihatsu/)
  const erpDate = getLastModDate('src/app/data/seo-content.data.ts');
  lines.push('  <!-- ════════ Japanese ERP localized route (/ja-jp/erp-kaihatsu/) ════════ -->');
  lines.push('  <url>');
  lines.push(`    <loc>${DOMAIN}/ja-jp/erp-kaihatsu/</loc>`);
  lines.push(`    <lastmod>${erpDate}</lastmod>`);
  for (const alt of LOCALES) {
    const altUrl = alt.code === 'ja-jp'
      ? `${DOMAIN}/ja-jp/erp-kaihatsu/`
      : `${DOMAIN}/${alt.code}/services/erp-software/`;
    lines.push(`    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${altUrl}"/>`);
  }
  lines.push('  </url>');

  lines.push('</urlset>');
  lines.push('');

  return lines.join('\n');
}

/**
 * Build robots.txt ensuring crawler access to all locales and sitemap reference
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
console.log(`[sitemap] Successfully generated multi-locale sitemap: ${sitemapPath}`);

fs.writeFileSync(robotsPath, buildRobotsTxt(), 'utf8');
console.log(`[robots]  Successfully generated robots.txt: ${robotsPath}`);
