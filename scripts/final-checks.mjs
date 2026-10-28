import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const sitemapPath = path.join(projectRoot, 'public/sitemap.xml');
const distBrowserPath = path.join(projectRoot, 'dist/bizracks-angular/browser');

console.log('================ TASK 5 - FINAL CHECKS AUDIT ================');

// 1. Sitemap Check
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ Sitemap not found at', sitemapPath);
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const sitemapUrlCount = locMatches.length;

console.log(`\n1. SITEMAP STATUS:`);
console.log(`   - Total URLs in sitemap: ${sitemapUrlCount}`);
const localeInSitemap = locMatches.filter(u => /yogteck\.com\/(en|hi|en-in|en-us|en-gb|de-de|fr-fr|ja-jp|ko-kr)\//.test(u));
console.log(`   - Locale-prefixed URLs in sitemap: ${localeInSitemap.length} ${localeInSitemap.length === 0 ? '✅ (PASS: Zero locale URLs)' : '❌ (FAIL)'}`);
const hreflangInSitemap = sitemapContent.includes('xhtml:link');
console.log(`   - Hreflang / xhtml:link entries in sitemap: ${hreflangInSitemap ? '❌ (Found)' : '✅ (Zero entries)'}`);

// 2. Scan all prerendered HTML snapshots
function findHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name === 'index.html') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = findHtmlFiles(distBrowserPath);
console.log(`\n2. PRERENDERED HTML SNAPSHOTS AUDIT:`);
console.log(`   - Total HTML snapshots analyzed: ${htmlFiles.length}`);

let noindexPages = [];
let indexablePages = [];
let pagesWithoutH1 = [];
let titleMap = new Map(); // title -> [urls]
let externalLinks = new Set();
let telLinks = new Set();
let mailtoLinks = new Set();
let invalidTelLinks = [];

for (const filePath of htmlFiles) {
  const relPath = path.relative(distBrowserPath, filePath).replace(/\\/g, '/').replace(/\/index\.html$/, '');
  const pageRoute = relPath === 'index.html' || relPath === '' ? '/' : `/${relPath}`;
  const html = fs.readFileSync(filePath, 'utf-8');

  // Check robots
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i);
  const isNoindex = robotsMatch && robotsMatch[1].includes('noindex');
  if (isNoindex) {
    noindexPages.push({ route: pageRoute, robots: robotsMatch[1] });
  } else {
    indexablePages.push(pageRoute);
  }

  // Check H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match || !h1Match[1].trim()) {
    pagesWithoutH1.push(pageRoute);
  }

  // Check Title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '(NO TITLE)';
  if (!titleMap.has(title)) {
    titleMap.set(title, []);
  }
  titleMap.get(title).push(pageRoute);

  // Extract Links
  const hrefMatches = [...html.matchAll(/href=["'](.*?)["']/gi)].map(m => m[1]);
  for (const href of hrefMatches) {
    if (href.startsWith('tel:')) {
      telLinks.add(href);
      if (!href.startsWith('tel:+91')) {
        invalidTelLinks.push({ page: pageRoute, href });
      }
    } else if (href.startsWith('mailto:')) {
      mailtoLinks.add(href);
    } else if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.includes('yogteck.com')) {
        externalLinks.add(href);
      }
    }
  }
}

console.log(`   - Noindex pages count: ${noindexPages.length}`);
console.log(`   - Indexable pages count: ${indexablePages.length}`);
console.log(`   - Pages without <h1>: ${pagesWithoutH1.length} ${pagesWithoutH1.length === 0 ? '✅ (PASS)' : '❌ (FAIL: ' + pagesWithoutH1.join(', ') + ')'}`);

// Duplicate Titles check (for canonical indexable pages)
let duplicateTitles = [];
for (const [title, routes] of titleMap.entries()) {
  if (routes.length > 1) {
    // Only flag if duplicates occur among indexable pages
    const indexableRoutes = routes.filter(r => !noindexPages.some(np => np.route === r));
    if (indexableRoutes.length > 1) {
      duplicateTitles.push({ title, routes: indexableRoutes });
    }
  }
}
console.log(`   - Pages with duplicate titles (among indexable pages): ${duplicateTitles.length} ${duplicateTitles.length === 0 ? '✅ (PASS: Zero duplicate titles)' : '❌ (FAIL)'}`);

console.log(`\n3. CONTACT & EXTERNAL LINKS AUDIT:`);
console.log(`   - Total unique tel: links: ${telLinks.size}`);
for (const t of telLinks) {
  const valid = t.startsWith('tel:+91');
  console.log(`     • ${t} ${valid ? '✅ (+91 confirmed)' : '❌ (Invalid format)'}`);
}
console.log(`   - Total unique mailto: links: ${mailtoLinks.size}`);
for (const m of mailtoLinks) {
  console.log(`     • ${m}`);
}
console.log(`   - Total unique external links: ${externalLinks.size}`);
for (const ext of externalLinks) {
  console.log(`     • ${ext}`);
}

console.log('\n================ AUDIT SUMMARY DATA READY ================');
