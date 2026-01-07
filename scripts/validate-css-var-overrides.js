#!/usr/bin/env node

/**
 * CSS Variable Override Detection Script
 *
 * Detects attempts to redefine --ink-* design tokens outside of tokens.css.
 * This prevents token hijacking where someone overrides token values.
 *
 * Allowed locations:
 * - src/design-system/1-tokens/tokens.css (the source of truth)
 *
 * Run: node scripts/validate-css-var-overrides.js
 * Exit code 1 on failure (blocks build)
 */

const fs = require('fs');
const path = require('path');

const SRC_PATH = path.join(__dirname, '..', 'src');

// The ONLY files allowed to define --ink-* variables
const ALLOWED_TOKEN_FILES = [
  'src/design-system/1-tokens/tokens.css',
  'src/design-system/styles/tokens.css', // Legacy location if exists
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
function isAllowedTokenFile(filePath) {
  const relPath = relativePath(filePath);
  return ALLOWED_TOKEN_FILES.some(allowed => relPath.includes(allowed) || relPath === allowed);
}

/**
 * Find --ink-* variable definitions in a CSS file
 */
function findInkVarDefinitions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  // Pattern to match --ink-* variable definitions (not usage)
  // Matches: --ink-something: value;
  // Does NOT match: var(--ink-something) or /* --ink-something */
  const inkVarDefPattern = /^\s*--ink-[a-zA-Z0-9-]+\s*:/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip comments
    if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) {
      continue;
    }

    // Check if this line defines an --ink-* variable
    const match = line.match(inkVarDefPattern);
    if (match) {
      // Extract the variable name
      const varMatch = line.match(/--ink-[a-zA-Z0-9-]+/);
      if (varMatch) {
        violations.push({
          line: i + 1,
          variable: varMatch[0],
          content: line.trim().substring(0, 60) + (line.trim().length > 60 ? '...' : ''),
        });
      }
    }
  }

  return violations;
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           CSS Variable Override Detection                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log('\n📋 Checking for --ink-* definitions outside tokens.css...');

  const cssFiles = getCSSFiles(SRC_PATH);
  const allViolations = [];

  for (const filePath of cssFiles) {
    // Skip allowed token files
    if (isAllowedTokenFile(filePath)) {
      continue;
    }

    const violations = findInkVarDefinitions(filePath);

    if (violations.length > 0) {
      allViolations.push({
        file: relativePath(filePath),
        violations,
      });
    }
  }

  // Print results
  console.log('\n' + '═'.repeat(60));

  if (allViolations.length === 0) {
    console.log(`\n${GREEN}✓ No unauthorized --ink-* definitions found!${RESET}`);
    console.log(`${GREEN}  All design tokens are properly defined in tokens.css${RESET}\n`);
    process.exit(0);
  } else {
    const totalViolations = allViolations.reduce((sum, v) => sum + v.violations.length, 0);
    console.log(`\n${RED}✗ Found ${totalViolations} unauthorized --ink-* definition(s) in ${allViolations.length} file(s):${RESET}\n`);

    for (const fileViolation of allViolations) {
      console.log(`  ${RED}${fileViolation.file}${RESET}`);

      for (const v of fileViolation.violations) {
        console.log(`    ${YELLOW}Line ${v.line}: ${v.variable}${RESET}`);
      }
      console.log();
    }

    console.log(`${YELLOW}To fix:${RESET}`);
    console.log(`${YELLOW}  1. Do NOT redefine --ink-* tokens outside tokens.css${RESET}`);
    console.log(`${YELLOW}  2. Use existing tokens: var(--ink-existing-token)${RESET}`);
    console.log(`${YELLOW}  3. If a new token is needed, add it to: ${ALLOWED_TOKEN_FILES[0]}${RESET}\n`);

    process.exit(1);
  }
}

// Run validation
main();
