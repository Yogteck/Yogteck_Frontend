import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Helper to extract shingles
function getShingles(text, size = 5) {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const shingles = new Set();
  for (let i = 0; i <= words.length - size; i++) {
    shingles.add(words.slice(i, i + size).join(' '));
  }
  return { shingles, wordCount: words.length };
}

function calculateMaxOverlap(targetKey, allShingles, groupFilter = null) {
  const targetSet = allShingles[targetKey].shingles;
  if (targetSet.size === 0) return { maxOverlapPct: 0, highestOverlapWith: 'none' };

  let maxOverlapPct = 0;
  let highestOverlapWith = 'none';

  for (const [otherKey, otherData] of Object.entries(allShingles)) {
    if (otherKey === targetKey) continue;
    if (groupFilter && otherData.group !== groupFilter) continue;

    let intersectionCount = 0;
    for (const shingle of targetSet) {
      if (otherData.shingles.has(shingle)) {
        intersectionCount++;
      }
    }
    // Overlap percentage relative to target page shingles
    const pct = (intersectionCount / targetSet.size) * 100;
    if (pct > maxOverlapPct) {
      maxOverlapPct = pct;
      highestOverlapWith = otherKey;
    }
  }

  return { maxOverlapPct: Number(maxOverlapPct.toFixed(2)), highestOverlapWith };
}

// 1. Read and transpile extended-seo.data.ts
const extendedSeoPath = path.join(projectRoot, 'src/app/data/extended-seo.data.ts');
const tsCodeExtended = fs.readFileSync(extendedSeoPath, 'utf-8');
const jsCodeExtended = ts.transpileModule(tsCodeExtended, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;

const tempExtendedPath = path.join(projectRoot, 'scripts/.temp_extended_seo.mjs');
fs.writeFileSync(tempExtendedPath, jsCodeExtended);

// 2. Read and transpile solutions.data.ts
const solutionsPath = path.join(projectRoot, 'src/app/data/solutions.data.ts');
const tsCodeSolutions = fs.readFileSync(solutionsPath, 'utf-8');
const jsCodeSolutions = ts.transpileModule(tsCodeSolutions, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;

const tempSolutionsPath = path.join(projectRoot, 'scripts/.temp_solutions.mjs');
fs.writeFileSync(tempSolutionsPath, jsCodeSolutions);

try {
  const { CITY_HUBS_DATA } = await import(`file://${tempExtendedPath}?t=${Date.now()}`);
  const { SOLUTIONS_DATA } = await import(`file://${tempSolutionsPath}?t=${Date.now()}`);

  const pagesMap = {};
  const shinglesMap = {};

  // Process Location Pages
  for (const [key, data] of Object.entries(CITY_HUBS_DATA)) {
    const textPieces = [
      data.city || '',
      data.h1 || '',
      data.heroAnswer || '',
      data.cityContext || '',
      ...(data.localIndustries || []).map(ind => `${ind.industry} ${ind.description}`),
      ...(data.faqs || []).map(f => `${f.question} ${f.answer}`),
      ...(data.whatWeBuild || []).map(w => `${w.title} ${w.desc}`)
    ];
    const fullText = textPieces.join(' ');
    const { shingles, wordCount } = getShingles(fullText, 5);
    const hasPlaceholder = /\[(OWNER|VERIFY)[\s\S]*?\]/i.test(fullText);
    const faqCount = data.faqs ? data.faqs.length : 0;

    pagesMap[key] = {
      name: data.city || key,
      category: data.regionType === 'state-hub' ? 'State Hub' : 'City Page',
      slug: data.slug,
      wordCount,
      faqCount,
      hasPlaceholder,
      group: 'location'
    };
    shinglesMap[key] = { shingles, wordCount, group: 'location' };
  }

  // Process Solution Pages
  for (const [key, data] of Object.entries(SOLUTIONS_DATA)) {
    const textPieces = [
      data.h1 || '',
      data.heroAnswer || '',
      data.overview || '',
      ...(data.keyCapabilities || []).map(c => `${c.title} ${c.description} ${c.architectureDetails || ''}`),
      ...(data.workflowStages || []).map(w => `${w.stage} ${w.title} ${w.details}`),
      data.citiesServedSection ? `${data.citiesServedSection.title} ${data.citiesServedSection.description} ${data.citiesServedSection.citiesList.join(' ')}` : '',
      ...(data.technicalSpecs || []).map(t => `${t.label} ${t.value}`),
      data.verifiedCaseNote || '',
      ...(data.faqs || []).map(f => `${f.question} ${f.answer}`)
    ];
    const fullText = textPieces.join(' ');
    const { shingles, wordCount } = getShingles(fullText, 5);
    const hasPlaceholder = /\[(OWNER|VERIFY)[\s\S]*?\]/i.test(fullText);
    const faqCount = data.faqs ? data.faqs.length : 0;

    pagesMap[key] = {
      name: data.h1,
      category: 'Industry Solution',
      slug: `solutions/${data.slug}`,
      wordCount,
      faqCount,
      hasPlaceholder,
      group: 'solution'
    };
    shinglesMap[key] = { shingles, wordCount, group: 'solution' };
  }

  console.log('\n================ TECHNICAL SEO INDEXING GATE AUDIT TABLE ================');
  console.log('Criteria: No [OWNER]/[VERIFY] placeholders, >= 800 words, >= 5 FAQs, < 40% 5-word shingle overlap\n');

  const resultsTable = [];

  for (const [key, info] of Object.entries(pagesMap)) {
    const { maxOverlapPct, highestOverlapWith } = calculateMaxOverlap(key, shinglesMap, info.group);

    const passPlaceholder = !info.hasPlaceholder;
    const passWordCount = info.wordCount >= 800;
    const passFaqCount = info.faqCount >= 5;
    const passOverlap = maxOverlapPct < 40;
    const overallPass = passPlaceholder && passWordCount && passFaqCount && passOverlap;

    resultsTable.push({
      Name: info.name,
      Type: info.category,
      Slug: `/${info.slug}`,
      'Words': `${info.wordCount} ${passWordCount ? '✅' : '❌'}`,
      'FAQs': `${info.faqCount} ${passFaqCount ? '✅' : '❌'}`,
      'Placeholders': `${passPlaceholder ? 'None ✅' : 'Has [VERIFY/OWNER] ❌'}`,
      'Overlap %': `${maxOverlapPct}% (vs ${highestOverlapWith}) ${passOverlap ? '✅' : '❌'}`,
      'Gate Result': overallPass ? 'PASS (Index)' : 'FAIL (Noindex)'
    });
  }

  console.table(resultsTable);

  console.log('\n--- MARKDOWN FORMAT FOR PHASE5_LOG.md ---\n');
  console.log('| Page / Hub | Type | Slug | Word Count | FAQs | Placeholders | Max 5-Word Overlap % | Gate Result | Final Robots |');
  console.log('| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |');
  for (const row of resultsTable) {
    const pass = row['Gate Status'] ? row['Gate Status'].startsWith('PASS') : row['Gate Result'].startsWith('PASS');
    console.log(`| **${row.Name}** | ${row.Type} | \`${row.Slug}\` | ${row.Words} | ${row.FAQs} | ${row.Placeholders} | ${row['Overlap %']} | **${pass ? 'PASS' : 'FAIL'}** | \`${pass ? 'index, follow' : 'noindex, nofollow'}\` |`);
  }

} finally {
  if (fs.existsSync(tempExtendedPath)) {
    fs.unlinkSync(tempExtendedPath);
  }
  if (fs.existsSync(tempSolutionsPath)) {
    fs.unlinkSync(tempSolutionsPath);
  }
}
