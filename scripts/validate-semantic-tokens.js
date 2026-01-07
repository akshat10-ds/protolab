#!/usr/bin/env node

/**
 * Semantic Token Usage Validation Script
 *
 * Warns when primitive color tokens are used instead of semantic tokens
 * in design system component CSS files.
 *
 * Primitive tokens (avoid in components):
 * - --ink-cobalt-100, --ink-red-50, --ink-neutral-80, etc.
 *
 * Semantic tokens (preferred):
 * - --ink-button-primary-bg, --ink-font-default, --ink-border-subtle, etc.
 *
 * This is a WARNING only - primitive tokens are sometimes necessary.
 * The goal is to encourage semantic token usage for better theming support.
 *
 * Run: node scripts/validate-semantic-tokens.js
 * Exit code 0 (warnings only, doesn't block build)
 */

const fs = require('fs');
const path = require('path');

const DESIGN_SYSTEM_PATH = path.join(__dirname, '..', 'src', 'design-system');

// Primitive token prefixes that should generally be avoided in component CSS
const PRIMITIVE_TOKEN_PREFIXES = [
  '--ink-cobalt-',
  '--ink-red-',
  '--ink-green-',
  '--ink-orange-',
  '--ink-cyan-',
  '--ink-purple-',
  '--ink-fuchsia-',
  '--ink-ecru-',
  '--ink-neutral-',
  '--ink-white-',
  '--ink-black-',
];

// Files to skip (these legitimately use primitive tokens)
const SKIP_FILES = [
  'tokens.css',      // Token definitions themselves
  'globals.css',     // Global styles
  'index.css',       // Entry point
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
 * Find primitive token usage in a CSS file
 */
function findPrimitiveTokenUsage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const warnings = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip comments
    if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) {
      continue;
    }

    // Skip if it's a variable definition (tokens.css defining these)
    if (/^\s*--ink-/.test(line)) {
      continue;
    }

    // Check for var(--ink-primitive-*)
    for (const prefix of PRIMITIVE_TOKEN_PREFIXES) {
      const pattern = new RegExp(`var\\(${prefix.replace('-', '\\-')}\\d+`, 'g');
      const matches = line.match(pattern);

      if (matches) {
        for (const match of matches) {
          warnings.push({
            line: i + 1,
            token: match.replace('var(', '').replace(')', ''),
            context: line.trim().substring(0, 70) + (line.trim().length > 70 ? '...' : ''),
          });
        }
      }
    }
  }

  return warnings;
}

/**
 * Suggest semantic alternatives for common primitive tokens
 */
function suggestSemantic(token) {
  const suggestions = {
    '--ink-cobalt-100': '--ink-button-primary-bg or --ink-link-default',
    '--ink-white-100': '--ink-bg-default or --ink-font-inverse',
    '--ink-neutral-140': '--ink-bg-inverse or --ink-font-default',
    '--ink-neutral-10': '--ink-bg-canvas-page',
    '--ink-neutral-20': '--ink-bg-subtle',
    '--ink-red-100': '--ink-status-alert or --ink-font-alert-emphasis',
    '--ink-green-100': '--ink-status-success or --ink-font-success-emphasis',
    '--ink-orange-100': '--ink-status-warning or --ink-font-warning-emphasis',
  };

  return suggestions[token] || 'Check tokens.css for semantic alternatives';
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Semantic Token Usage Check                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log('\n📋 Checking for primitive token usage in component CSS...');
  console.log(`${CYAN}   (This is informational - primitive tokens are sometimes needed)${RESET}`);

  const cssFiles = getCSSFiles(DESIGN_SYSTEM_PATH);
  const allWarnings = [];
  let skippedCount = 0;

  for (const filePath of cssFiles) {
    if (shouldSkip(filePath)) {
      skippedCount++;
      continue;
    }

    const warnings = findPrimitiveTokenUsage(filePath);

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
    console.log(`\n${GREEN}✓ Excellent! All component CSS uses semantic tokens.${RESET}`);
    console.log(`${GREEN}  Skipped ${skippedCount} token definition files.${RESET}\n`);
  } else {
    const totalWarnings = allWarnings.reduce((sum, w) => sum + w.warnings.length, 0);
    console.log(`\n${YELLOW}⚠ Found ${totalWarnings} primitive token usage(s) in ${allWarnings.length} file(s):${RESET}\n`);

    for (const fileWarning of allWarnings) {
      console.log(`  ${YELLOW}${fileWarning.file}${RESET}`);

      // Group by line to avoid repetition
      const uniqueByLine = new Map();
      for (const w of fileWarning.warnings) {
        if (!uniqueByLine.has(w.line)) {
          uniqueByLine.set(w.line, []);
        }
        uniqueByLine.get(w.line).push(w.token);
      }

      for (const [line, tokens] of uniqueByLine) {
        console.log(`    ${CYAN}Line ${line}: ${tokens.join(', ')}${RESET}`);
      }
      console.log();
    }

    console.log(`${YELLOW}Consider:${RESET}`);
    console.log(`${YELLOW}  Using semantic tokens for better theming support.${RESET}`);
    console.log(`${YELLOW}  Example: --ink-button-primary-bg instead of --ink-cobalt-100${RESET}`);
    console.log(`${YELLOW}  Note: Primitive tokens are valid for specific color needs.${RESET}\n`);
  }

  // Always exit 0 - this is informational only
  process.exit(0);
}

// Run validation
main();
