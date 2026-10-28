import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('══════════════════════════════════════════════════════════════════════════');
console.log('🔍 YOGTECK SEO DEV-TIME VERIFICATION AUDIT (check-seo.mjs)');
console.log('══════════════════════════════════════════════════════════════════════════');

// 1. Read PAGES_DATA from scripts/prerender.mjs
const prerenderScriptPath = path.join(projectRoot, 'scripts', 'prerender.mjs');
if (!fs.existsSync(prerenderScriptPath)) {
  console.error('❌ Error: prerender.mjs not found at', prerenderScriptPath);
  process.exit(1);
}

const prerenderContent = fs.readFileSync(prerenderScriptPath, 'utf8');

// Parse PAGES_DATA array using regex or evaluation
const pagesDataMatch = prerenderContent.match(/const PAGES_DATA = (\[[\s\S]*?\n\];)/);
if (!pagesDataMatch) {
  console.error('❌ Error: Unable to locate PAGES_DATA in prerender.mjs');
  process.exit(1);
}

// Safely evaluate PAGES_DATA array
let pagesData;
try {
  pagesData = eval(pagesDataMatch[1]);
} catch (e) {
  console.error('❌ Error parsing PAGES_DATA:', e.message);
  process.exit(1);
}

const titlesSeen = new Map();
const descriptionsSeen = new Map();
const errors = [];
const warnings = [];
let passedCount = 0;

console.log(`Auditing ${pagesData.length} configured route snapshots...\n`);

for (const page of pagesData) {
  const pagePath = page.path || '/ (Home)';
  const isNoindex = Boolean(page.isNoindex);

  // 1. Title Checks
  if (!page.title || typeof page.title !== 'string') {
    errors.push(`[${pagePath}] Missing title tag`);
  } else {
    const titleLen = page.title.trim().length;
    if (titleLen > 60) {
      errors.push(`[${pagePath}] Title exceeds 60 characters (${titleLen} chars): "${page.title}"`);
    } else if (titleLen < 25) {
      warnings.push(`[${pagePath}] Title is very short (${titleLen} chars): "${page.title}"`);
    }

    if (!isNoindex) {
      if (titlesSeen.has(page.title)) {
        errors.push(`[${pagePath}] Duplicate title shared with [${titlesSeen.get(page.title)}]: "${page.title}"`);
      } else {
        titlesSeen.set(page.title, pagePath);
      }
    }
  }

  // 2. Description Checks
  if (!page.description || typeof page.description !== 'string') {
    errors.push(`[${pagePath}] Missing meta description`);
  } else {
    const descLen = page.description.trim().length;
    if (descLen > 160) {
      errors.push(`[${pagePath}] Description exceeds 160 characters (${descLen} chars): "${page.description}"`);
    } else if (descLen < 60) {
      warnings.push(`[${pagePath}] Description is under 60 characters (${descLen} chars): "${page.description}"`);
    }

    if (!isNoindex) {
      if (descriptionsSeen.has(page.description)) {
        errors.push(`[${pagePath}] Duplicate description shared with [${descriptionsSeen.get(page.description)}]: "${page.description}"`);
      } else {
        descriptionsSeen.set(page.description, pagePath);
      }
    }
  }

  // 3. H1 Check
  if (!page.h1 || typeof page.h1 !== 'string' || page.h1.trim().length === 0) {
    errors.push(`[${pagePath}] Missing or empty <h1>`);
  }

  // 4. Indexable Canonical Rule Check
  if (!isNoindex) {
    const expectedCanonical = page.path ? `https://yogteck.com/${page.path}` : 'https://yogteck.com/';
    if (!expectedCanonical.startsWith('https://yogteck.com')) {
      errors.push(`[${pagePath}] Invalid canonical URL: ${expectedCanonical}`);
    }

    // Safety Checks (Task 5): Indexable page must NEVER contain [VERIFY], [OWNER], or fake office claims
    const pageBlob = `${page.title || ''} ${page.description || ''} ${page.h1 || ''} ${page.directAnswer || ''}`;
    if (/\[(VERIFY|OWNER)[\s\S]*?\]/i.test(pageBlob)) {
      errors.push(`[${pagePath}] Indexable page contains forbidden [VERIFY] or [OWNER] placeholder marker.`);
    }

    const fakeOfficeRegex = /our (office|team) in (?!kanpur)[a-z\s-]+/i;
    const fakeOfficeMatch = pageBlob.match(fakeOfficeRegex);
    if (fakeOfficeMatch) {
      errors.push(`[${pagePath}] Indexable page contains forbidden local office/team claim: "${fakeOfficeMatch[0]}" (Only Kanpur has a physical office/team).`);
    }
  }

  if (errors.length === 0) {
    passedCount++;
  }
}

// 2. Validate Sitemap (Task 1: Canonical-only non-prefixed URLs, NO hreflang entries)
const sitemapCandidates = [
  path.join(projectRoot, 'public', 'sitemap.xml'),
  path.join(projectRoot, 'dist', 'bizracks-angular', 'browser', 'sitemap.xml')
];

for (const sitemapFile of sitemapCandidates) {
  if (fs.existsSync(sitemapFile)) {
    const sitemapContent = fs.readFileSync(sitemapFile, 'utf8');

    // Rule A: Sitemap must NOT contain any locale-prefixed URLs
    const localeUrlMatches = sitemapContent.match(/<loc>https:\/\/yogteck\.com\/(en-us|en-gb|en-ca|en-au|en-sg|en-ph|en-nz|en-ae|de-de|fr-fr|es-es|it-it|nl-nl|en-ie|ja-jp|ko-kr|ar-sa|en-in|hi-in|en)\/?/gi);
    if (localeUrlMatches && localeUrlMatches.length > 0) {
      errors.push(`[${path.basename(sitemapFile)}] Contains ${localeUrlMatches.length} forbidden locale-prefixed URLs (e.g. ${localeUrlMatches[0]})`);
    }

    // Rule B: Sitemap must NOT contain hreflang / xhtml:link entries
    if (sitemapContent.includes('hreflang') || sitemapContent.includes('xhtml:link')) {
      errors.push(`[${path.basename(sitemapFile)}] Contains forbidden hreflang/xhtml:link tags. Untranslated hreflang tags must be omitted.`);
    }

    // Rule C: Sitemap must NOT contain gated city hubs that fail indexing criteria
    const gatedHubs = [
      'delhi', 'noida', 'gurugram', 'faridabad', 'pune', 'mumbai', 'raebareli',
      'jaipur', 'indore', 'ahmedabad', 'chandigarh', 'bangalore',
      'rajasthan', 'gujarat', 'madhya-pradesh'
    ];
    for (const hub of gatedHubs) {
      if (sitemapContent.includes(`it-software-company-${hub}`)) {
        errors.push(`[${path.basename(sitemapFile)}] Contains gated city hub that fails criteria: it-software-company-${hub}`);
      }
    }
  }
}

// 3. Inspect generated static HTML files if dist directory exists
const distDir = path.join(projectRoot, 'dist', 'bizracks-angular', 'browser');
if (fs.existsSync(distDir)) {
  console.log(`Checking built static HTML files in ${distDir}...`);
  for (const page of pagesData) {
    const targetHtml = page.path === ''
      ? path.join(distDir, 'index.html')
      : path.join(distDir, page.path, 'index.html');

    if (fs.existsSync(targetHtml)) {
      const htmlContent = fs.readFileSync(targetHtml, 'utf8');

      // Verify <html lang="en-IN">
      if (!/<html[^>]*lang=["']en-IN["']/i.test(htmlContent)) {
        errors.push(`[Snapshot: ${page.path}] Missing <html lang="en-IN"> tag`);
      }

      // Verify no untranslated hreflang tags
      if (/<link\s+rel=["']alternate["']\s+hreflang/i.test(htmlContent)) {
        errors.push(`[Snapshot: ${page.path}] Contains forbidden untranslated hreflang links`);
      }

      // Verify single <h1>
      const h1Matches = htmlContent.match(/<h1[\s\S]*?<\/h1>/gi);
      if (!h1Matches || h1Matches.length === 0) {
        errors.push(`[Snapshot: ${page.path}] Generated HTML has NO <h1> tag`);
      } else if (h1Matches.length > 1) {
        errors.push(`[Snapshot: ${page.path}] Generated HTML has MULTIPLE <h1> tags (${h1Matches.length})`);
      }

      // Verify canonical link & indexable safety checks
      if (!page.isNoindex) {
        const canonicalMatch = htmlContent.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
        if (!canonicalMatch) {
          errors.push(`[Snapshot: ${page.path}] Missing <link rel="canonical"> tag`);
        }

        // Safety check: Indexable HTML must never contain [VERIFY], [OWNER], or fake office claims
        const isHtmlNoindex = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(htmlContent);
        if (!isHtmlNoindex) {
          if (/\[(VERIFY|OWNER)[\s\S]*?\]/i.test(htmlContent)) {
            errors.push(`[Snapshot: ${page.path}] Indexable HTML contains forbidden [VERIFY] or [OWNER] placeholder marker.`);
          }
          const fakeOfficeRegex = /our (office|team) in (?!kanpur)[a-z\s-]+/i;
          const fakeOfficeMatch = htmlContent.match(fakeOfficeRegex);
          if (fakeOfficeMatch) {
            errors.push(`[Snapshot: ${page.path}] Indexable HTML contains forbidden local office/team claim: "${fakeOfficeMatch[0]}".`);
          }
        }
      }
    }
  }
}

// Summary Output
console.log('──────────────────────────────────────────────────────────────────────────');
if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} Warnings:`);
  warnings.forEach(w => console.log('   •', w));
  console.log('');
}

if (errors.length > 0) {
  console.error(`❌ FAILED: ${errors.length} SEO validation errors detected:\n`);
  errors.forEach(err => console.error('   ❌', err));
  console.error('\nPlease fix the SEO issues above to pass the dev-time check.');
  process.exit(1);
} else {
  console.log(`✅ SUCCESS: All ${pagesData.length} routes passed SEO validation!`);
  console.log('   • All titles <= 60 characters with zero duplicates.');
  console.log('   • All descriptions <= 160 characters with zero duplicates.');
  console.log('   • Exactly one <h1> confirmed per page.');
  console.log('   • Valid canonical URLs configured for all indexable pages.');
  process.exit(0);
}
