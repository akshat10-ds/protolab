#!/usr/bin/env node

/**
 * calc() Pattern Validation Script
 *
 * Warns when calc() expressions contain hardcoded pixel values
 * instead of design tokens.
 *
 * Good patterns:
 * - calc(var(--ink-spacing-200) * 2)
 * - calc(100% - var(--ink-nav-width))
 * - calc(100vh - var(--ink-header-height))
 *
 * Problematic patterns:
 * - calc(100vh - 160px)
 * - calc(var(--ink-spacing-200) + 10px)
 * - calc(50% - 8px)
 *
 * This is a WARNING only - some calc() patterns with px are necessary.
 *
 * Run: node scripts/validate-calc-patterns.js
 * Exit code 0 (warnings only, doesn't block build)
 */

const fs = require('fs');
const path = require('path');

const DESIGN_SYSTEM_PATH = path.join(__dirname, '..', 'src', 'design-system');

// Files to skip
const SKIP_FILES = [
  'tokens.css',
  'globals.css',
];

// ANSI colors for output
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

/**
 * Recursively get all CSS files
 */
function getCSSFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getCSSFiles(fullPath));
    } else if (item.endsWith('.css')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Get relative path for cleaner output
 */
function relativePath(filePath) {
  return path.relative(process.cwd(), filePath);
}

/**
 * Check if file should be skipped
 */
function shouldSkip(filePath) {
  return SKIP_FILES.some(skip => filePath.includes(skip));
}

/**
 * Find problematic calc() patterns in a CSS file
 */
function findCalcPatterns(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const warnings = [];

  // Pattern to find calc() with hardcoded px values
  // Matches: calc(100vh - 160px), calc(50% + 8px), etc.
  const calcWithPxPattern = /calc\s*\([^)]*\d+px[^)]*\)/gi;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip comments
    if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) {
      continue;
    }

    const matches = line.match(calcWithPxPattern);

    if (matches) {
      for (const match of matches) {
        // Skip if it's purely token-based with just multiplication/division
        // e.g., calc(var(--token) * 2) is fine even with implicit px
        if (/calc\s*\(\s*var\([^)]+\)\s*[\*\/]\s*-?\d+\.?\d*\s*\)/.test(match)) {
          continue;
        }

        warnings.push({
          line: i + 1,
          calc: match,
          context: line.trim().substring(0, 80) + (line.trim().length > 80 ? '...' : ''),
        });
      }
    }
  }

  return warnings;
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           calc() Pattern Audit                             ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log('\n📋 Checking for calc() expressions with hardcoded pixels...');
  console.log(`${CYAN}   (This is informational - some hardcoded calc() is acceptable)${RESET}`);

  const cssFiles = getCSSFiles(DESIGN_SYSTEM_PATH);
  const allWarnings = [];

  for (const filePath of cssFiles) {
    if (shouldSkip(filePath)) {
      continue;
    }

    const warnings = findCalcPatterns(filePath);

    if (warnings.length > 0) {
      allWarnings.push({
        file: relativePath(filePath),
        warnings,
      });
    }
  }

  // Print results
  console.log('\n' + '═'.repeat(60));

  if (allWarnings.length === 0) {
    console.log(`\n${GREEN}✓ All calc() expressions use design tokens!${RESET}\n`);
  } else {
    const totalWarnings = allWarnings.reduce((sum, w) => sum + w.warnings.length, 0);
    console.log(`\n${YELLOW}⚠ Found ${totalWarnings} calc() expression(s) with hardcoded px in ${allWarnings.length} file(s):${RESET}\n`);

    for (const fileWarning of allWarnings) {
      console.log(`  ${YELLOW}${fileWarning.file}${RESET}`);

      for (const w of fileWarning.warnings) {
        console.log(`    ${CYAN}Line ${w.line}: ${w.calc}${RESET}`);
      }
      console.log();
    }

    console.log(`${YELLOW}Consider:${RESET}`);
    console.log(`${YELLOW}  - Using token-based calculations: calc(100vh - var(--ink-header-height))${RESET}`);
    console.log(`${YELLOW}  - Creating new tokens for common measurements${RESET}`);
    console.log(`${YELLOW}  - Documenting why hardcoded values are necessary${RESET}\n`);
  }

  // Always exit 0 - this is informational only
  process.exit(0);
}

// Run validation
main();
