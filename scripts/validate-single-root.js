#!/usr/bin/env node

/**
 * Single :root Definition Validation Script
 *
 * Ensures that :root CSS definitions only exist in the canonical tokens file.
 * Multiple :root definitions create token conflicts and maintenance nightmares.
 *
 * Allowed locations:
 * - src/design-system/1-tokens/tokens.css (the source of truth)
 *
 * Run: node scripts/validate-single-root.js
 * Exit code 1 on failure (blocks build)
 */

const fs = require('fs');
const path = require('path');

const SRC_PATH = path.join(__dirname, '..', 'src');

// Files allowed to have :root definitions
// Note: tokens.css is the source of truth for --ink-* tokens
// Other files may define app-level variables (validated by validate-css-var-overrides.js)
const ALLOWED_ROOT_FILES = [
  'src/design-system/1-tokens/tokens.css',
  'src/design-system/styles/tokens.css', // Legacy location if exists
  'src/index.css',                        // App-level CSS (non-ink vars)
  'src/styles/globals.css',               // App-level CSS (non-ink vars)
];

// ANSI colors for output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
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

    // Skip node_modules
    if (item === 'node_modules') {
      continue;
    }

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
 * Get relative path for cleaner error messages
 */
function relativePath(filePath) {
  return path.relative(process.cwd(), filePath);
}

/**
 * Check if a file is in the allowed list
 */
function isAllowedRootFile(filePath) {
  const relPath = relativePath(filePath);
  return ALLOWED_ROOT_FILES.some(allowed => relPath.includes(allowed) || relPath === allowed);
}

/**
 * Find :root definitions in a CSS file
 */
function findRootDefinitions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const rootLines = [];

  // Pattern to match :root { or :root{
  const rootPattern = /:root\s*\{/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip comments
    if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) {
      continue;
    }

    if (rootPattern.test(line)) {
      rootLines.push(i + 1); // 1-indexed line number
    }
  }

  return rootLines;
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Single :root Definition Check                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log('\n📋 Checking for :root definitions outside tokens.css...');

  const cssFiles = getCSSFiles(SRC_PATH);
  const violations = [];
  let allowedCount = 0;

  for (const filePath of cssFiles) {
    const rootLines = findRootDefinitions(filePath);

    if (rootLines.length === 0) {
      continue;
    }

    if (isAllowedRootFile(filePath)) {
      allowedCount++;
      continue;
    }

    violations.push({
      file: relativePath(filePath),
      lines: rootLines,
    });
  }

  // Print results
  console.log('\n' + '═'.repeat(60));

  if (violations.length === 0) {
    console.log(`\n${GREEN}✓ No unauthorized :root definitions found!${RESET}`);
    console.log(`${GREEN}  Token source of truth: ${ALLOWED_ROOT_FILES[0]}${RESET}\n`);
    process.exit(0);
  } else {
    console.log(`\n${RED}✗ Found ${violations.length} file(s) with unauthorized :root definitions:${RESET}\n`);

    for (const v of violations) {
      console.log(`  ${RED}${v.file}${RESET}`);
      console.log(`    ${YELLOW}→ :root found on line(s): ${v.lines.join(', ')}${RESET}`);
    }

    console.log(`\n${YELLOW}To fix:${RESET}`);
    console.log(`${YELLOW}  1. Move token definitions to: ${ALLOWED_ROOT_FILES[0]}${RESET}`);
    console.log(`${YELLOW}  2. Remove :root {} blocks from the files above${RESET}`);
    console.log(`${YELLOW}  3. Import tokens via @import or CSS variables${RESET}\n`);

    process.exit(1);
  }
}

// Run validation
main();
