import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Canonical Live Domain Configuration (strictly https, no trailing slash)
const DOMAIN = (process.env.SITE_URL || 'https://yogteck.com').replace(/\/+$/, '');

// Canonical Public Pages submitted to Search Engines
// Note: City pages with [OWNER: city-specific content needed] (Noida, Delhi, Gurugram, Pune, Mumbai)
// are marked with meta robots 'noindex, nofollow' and are excluded from this sitemap until filled.
export const CANONICAL_ROUTES = [
  // Homepage
  { path: '', sourceFile: 'src/app/components/home/home.component.ts', priority: '1.0', changefreq: 'weekly' },

  // Company Information & Legal
  { path: 'about', sourceFile: 'src/app/components/about-page/about-page.component.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'contact', sourceFile: 'src/app/components/contact-page/contact-page.component.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'blog', sourceFile: 'src/app/components/blog-page/blog-page.component.ts', priority: '0.7', changefreq: 'weekly' },
  { path: 'privacy-policy', sourceFile: 'src/app/components/legal-page/legal-page.component.ts', priority: '0.3', changefreq: 'yearly' },
  { path: 'terms-of-service', sourceFile: 'src/app/components/legal-page/legal-page.component.ts', priority: '0.3', changefreq: 'yearly' },

  // Core Services
  { path: 'services/website-development', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/mobile-app-development', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/custom-software-development', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/erp-software', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/inventory-software', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/billing-software', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/mlm-software', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/ai-software-development', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/ecommerce-development', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/seo-digital-growth', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'services/business-software', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'services/real-estate-plotting-software', sourceFile: 'src/app/data/seo-content.data.ts', priority: '0.9', changefreq: 'monthly' },

  // Engineering & Growth Blog Posts (Task 3)
  { path: 'blog/website-development-cost-in-kanpur', sourceFile: 'src/app/data/blog.data.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'blog/top-it-companies-in-kanpur', sourceFile: 'src/app/data/blog.data.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'blog/inventory-management-software-lucknow', sourceFile: 'src/app/data/blog.data.ts', priority: '0.8', changefreq: 'monthly' },

  // Product Suites
  { path: 'products/erp-software', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'products/saas-platform', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'products/whatsapp-marketing-tool', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.9', changefreq: 'monthly' },

  // Tools
  { path: 'tools', sourceFile: 'src/app/components/tools-page/tools-page.component.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'tools/whatsapp-marketing-tool', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'tools/gst-billing-software', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'tools/cloud-erp', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.8', changefreq: 'monthly' },

  // Case Studies & Clients
  { path: 'clients', sourceFile: 'src/app/components/clients-page/clients-page.component.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'clients/mmr-constructions', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'clients/yogkart-healthcare', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'clients/techno-racks', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.8', changefreq: 'monthly' },

  // Service Areas Directory
  { path: 'service-areas', sourceFile: 'src/app/components/service-areas/service-areas.component.ts', priority: '0.8', changefreq: 'monthly' },

  // Specialized Industry & Service Solutions (Passes Indexing Gate: >=800 words, >=5 FAQs, no placeholders)
  { path: 'solutions/erp-for-manufacturers', sourceFile: 'src/app/data/solutions.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'solutions/inventory-software-for-traders', sourceFile: 'src/app/data/solutions.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'solutions/billing-software-for-retail', sourceFile: 'src/app/data/solutions.data.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'solutions/erp-for-pharma-distributors', sourceFile: 'src/app/data/solutions.data.ts', priority: '0.9', changefreq: 'monthly' },

  // Indexable Regional Office / Service Hubs (Task 3 Indexing Gate: No [OWNER]/[VERIFY], >=800 words, >=5 FAQs, <40% overlap)
  { path: 'it-software-company-kanpur', sourceFile: 'src/app/components/kanpur-location/kanpur-location.component.ts', priority: '0.9', changefreq: 'monthly' },
  { path: 'it-software-company-lucknow', sourceFile: 'src/app/components/lucknow-location/lucknow-location.component.ts', priority: '0.8', changefreq: 'monthly' },
  { path: 'it-software-company-uttar-pradesh', sourceFile: 'src/app/data/extended-seo.data.ts', priority: '0.9', changefreq: 'monthly' }
  // Draft city and state pages containing [VERIFY: ...] (Jaipur, Indore, Ahmedabad, Chandigarh, Bangalore, Rajasthan, Gujarat, MP, Pune, Mumbai, Delhi NCR, Raebareli) fail the indexing gate and are excluded from the sitemap until verified.
];

/**
 * Get real last-modified date (YYYY-MM-DD) from Git log, falling back to file mtime.
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
    // Git fallback
  }
  return new Date().toISOString().split('T')[0];
}

/**
 * Build canonical XML sitemap with ONLY canonical non-prefixed URLs (Task 1)
 */
export function buildSitemapXml() {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const route of CANONICAL_ROUTES) {
    const canonicalUrl = route.path ? `${DOMAIN}/${route.path}` : `${DOMAIN}/`;
    const lastmod = getLastModDate(route.sourceFile);

    lines.push('  <url>');
    lines.push(`    <loc>${canonicalUrl}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
    lines.push(`    <priority>${route.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  lines.push('');

  return lines.join('\n');
}

// Generate to public/sitemap.xml and dist/bizracks-angular/browser/sitemap.xml
const publicDir = path.join(projectRoot, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapContent = buildSitemapXml();
const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log(`[sitemap] Successfully generated canonical sitemap (${CANONICAL_ROUTES.length} URLs): ${sitemapPath}`);

const distDir = path.join(projectRoot, 'dist', 'bizracks-angular', 'browser');
if (fs.existsSync(distDir)) {
  const distSitemap = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distSitemap, sitemapContent, 'utf8');
  console.log(`[sitemap] Copied sitemap to dist: ${distSitemap}`);
}
