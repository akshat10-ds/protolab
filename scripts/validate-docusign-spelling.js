#!/usr/bin/env node

/**
 * Docusign Spelling Validation Script
 *
 * Validates that "Docusign" is spelled consistently in USER-FACING STRINGS only.
 * The brand uses "Docusign" with lowercase 's'.
 *
 * What we check:
 * - String literals that appear in JSX props (title="DocuSign")
 * - String literals in data files (title: "DocuSign")
 *
 * What we DON'T check (these are code, not user-facing):
 * - Component/variable names (DocuSignShell is fine as code)
 * - Import statements
 * - File paths
 * - Code comments
 *
 * Run: node scripts/validate-docusign-spelling.js
 * Exit code 1 on failure (blocks build)
 */

const fs = require('fs');
const path = require('path');

const SRC_PATH = path.join(__dirname, '..', 'src');
const errors = [];

// ANSI colors for output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

/**
 * Recursively get all files with given extensions
 */
function getFiles(dir, extensions) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules
      if (item === 'node_modules') continue;
      files.push(...getFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
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
 * Check if a line contains "DocuSign" in a user-facing string context
 *
 * User-facing contexts:
 * - JSX props: title="DocuSign" or label="DocuSign"
 * - Object properties: title: "DocuSign" or name: 'DocuSign'
 * - Array elements: ["DocuSign", ...]
 *
 * NOT user-facing (skip these):
 * - Import statements: import { DocuSignShell }
 * - Component names: <DocuSignShell />
 * - Variable declarations: const DocuSignLogo = ...
 * - Comments: // DocuSign
 * - File paths: './DocuSignShell'
 * - Alt text for logos: alt="DocuSign" (this is the official logo alt)
 */
function isUserFacingString(line) {
  // Skip if line is a comment
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
    return false;
  }

  // Skip import statements
  if (line.includes('import ') || line.includes('from \'') || line.includes('from "')) {
    return false;
  }

  // Skip export statements
  if (line.includes('export ')) {
    return false;
  }

  // Skip component/variable declarations
  if (line.includes('const ') || line.includes('let ') || line.includes('var ') ||
      line.includes('function ') || line.includes('interface ') || line.includes('type ')) {
    return false;
  }

  // Skip JSX component usage (opening/closing tags)
  if (/<DocuSign|<\/DocuSign/.test(line)) {
    return false;
  }

  // Skip file path strings
  if (/['"`]\.\/.*DocuSign|['"`]\.\.\/.*DocuSign|['"`]@\/.*DocuSign/.test(line)) {
    return false;
  }

  // Skip CSS module imports
  if (line.includes('.module.css')) {
    return false;
  }

  // Skip displayName assignments
  if (line.includes('.displayName')) {
    return false;
  }

  // Skip alt text for logos (official logo should have "DocuSign" alt)
  if (/alt\s*=\s*["']DocuSign["']/.test(line)) {
    return false;
  }

  // Skip legal company name references (DocuSign Inc., DocuSign, Inc.)
  // These are official company names in demo data
  if (/DocuSign\s*(Inc\.?|,\s*Inc\.?)/.test(line)) {
    return false;
  }

  // Skip component registry names (technical UI, not user-facing)
  if (/name:\s*['"]DocuSign/.test(line)) {
    return false;
  }

  // Skip label for component navigation (technical UI)
  if (/label:\s*['"]DocuSign(Shell|Landing)['"]/.test(line)) {
    return false;
  }

  // Check for "DocuSign" in quoted strings (title, label, description, etc.)
  // These patterns indicate user-facing text:
  // - title="DocuSign..."
  // - description="...DocuSign..."
  // - title: "DocuSign..."
  // - "DocuSign..." (in arrays like parties: ['DocuSign Inc.'])

  // Pattern: property="...DocuSign..." or property: "...DocuSign..."
  const stringPatterns = [
    /title\s*[:=]\s*["'][^"']*DocuSign/,
    /description\s*[:=]\s*["'][^"']*DocuSign/,
    /label\s*[:=]\s*["'][^"']*DocuSign/,
    /name\s*[:=]\s*["'][^"']*DocuSign/,
    /subtitle\s*[:=]\s*["'][^"']*DocuSign/,
    /content\s*[:=]\s*["'][^"']*DocuSign/,
    /message\s*[:=]\s*["'][^"']*DocuSign/,
    /text\s*[:=]\s*["'][^"']*DocuSign/,
    /heading\s*[:=]\s*["'][^"']*DocuSign/,
    // Strings in arrays (like parties: ['DocuSign Inc.'])
    /\[\s*["'][^"']*DocuSign/,
    /,\s*["'][^"']*DocuSign/,
  ];

  for (const pattern of stringPatterns) {
    if (pattern.test(line)) {
      return true;
    }
  }

  return false;
}

/**
 * Validate files for incorrect "DocuSign" spelling in user-facing strings
 */
function validateDocusignSpelling() {
  console.log('\n📋 Checking user-facing strings for Docusign spelling...');

  const files = getFiles(SRC_PATH, ['.ts', '.tsx', '.js', '.jsx']);
  let violations = 0;

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Only check if line contains DocuSign
      if (!line.includes('DocuSign')) {
        continue;
      }

      // Check if it's a user-facing string context
      if (isUserFacingString(line)) {
        violations++;
        const relPath = relativePath(filePath);
        errors.push(`${RED}Spelling: Found "DocuSign" in user-facing text (should be "Docusign")${RESET} in ${relPath}:${lineNum}`);
        errors.push(`${YELLOW}  → Line: ${line.trim().substring(0, 100)}${line.trim().length > 100 ? '...' : ''}${RESET}`);
      }
    }
  }

  if (violations === 0) {
    console.log(`${GREEN}  ✓ All user-facing Docusign spellings are correct${RESET}`);
  } else {
    console.log(`${RED}  ✗ Found ${violations} incorrect spelling(s) in user-facing text${RESET}`);
  }

  return violations;
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Docusign Spelling Validation                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  let totalViolations = 0;

  // Run validation
  totalViolations += validateDocusignSpelling();

  // Print summary
  console.log('\n' + '═'.repeat(60));

  if (totalViolations > 0) {
    console.log(`\n${RED}✗ Validation FAILED with ${totalViolations} violation(s):${RESET}\n`);
    errors.forEach(err => console.log(`  ${err}`));
    console.log(`\n${YELLOW}Fix these issues before building.${RESET}`);
    console.log(`${YELLOW}Use "Docusign" (lowercase 's') in user-facing text.${RESET}`);
    console.log(`${YELLOW}Note: Component names like DocuSignShell are fine (they are code, not text).${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`\n${GREEN}✓ All user-facing Docusign spellings are correct!${RESET}\n`);
    process.exit(0);
  }
}

// Run validation
main();
