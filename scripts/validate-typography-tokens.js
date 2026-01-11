#!/usr/bin/env node

/**
 * Typography Token Validation Script
 *
 * Validates design system CSS for hardcoded typography values:
 * 1. Font sizes (12px, 14px, etc. → use var(--ink-font-size-*))
 * 2. Font weights (400, 500, etc. → use var(--ink-font-weight-*))
 * 3. Line heights (1.4, 1.5, etc. → use var(--ink-line-height-*) or component-specific tokens)
 * 4. Letter spacing (0.16px → use var(--ink-letter-spacing-*))
 *
 * Exceptions:
 * - tokens.css (defines the tokens themselves)
 * - Values inside var() expressions
 * - CSS comments
 * - 0 values (font-size: 0, line-height: 0)
 * - Unitless line-height values that aren't common design system values
 *
 * Run: node scripts/validate-typography-tokens.js
 * Exit code 1 on failure (blocks build)
 */

const fs = require('fs');
const path = require('path');

const DESIGN_SYSTEM_PATH = path.join(__dirname, '..', 'src', 'design-system');
const errors = [];

// ANSI colors for output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

// Typography token mappings for helpful suggestions
const FONT_SIZE_MAP = {
  '10px': 'var(--ink-font-size-xxs)',
  '12px': 'var(--ink-font-size-xs)',
  '14px': 'var(--ink-font-size-sm)',
  '16px': 'var(--ink-font-size-md)',
  '18px': 'var(--ink-font-size-lg)',
  '20px': 'var(--ink-font-size-xl)',
  '24px': 'var(--ink-font-size-2xl)',
  '30px': 'var(--ink-font-size-3xl)',
  '36px': 'var(--ink-font-size-4xl)',
};

const FONT_WEIGHT_MAP = {
  '300': 'var(--ink-font-weight-light)',
  '400': 'var(--ink-font-weight-regular)',
  '500': 'var(--ink-font-weight-medium)',
  '600': 'var(--ink-font-weight-semibold)',
  '700': 'var(--ink-font-weight-bold)',
};

const LINE_HEIGHT_MAP = {
  '1.25': 'var(--ink-line-height-tight)',
  '1.4': 'var(--ink-font-body-s-line-height) or var(--ink-font-detail-xs-line-height)',
  '1.5': 'var(--ink-line-height-normal)',
  '1.75': 'var(--ink-line-height-relaxed)',
};

const LETTER_SPACING_MAP = {
  '0.16px': 'var(--ink-letter-spacing-wide)',
  '-0.02em': 'var(--ink-letter-spacing-tight)',
};

// Files to skip
const SKIP_FILES = [
  'tokens.css',
  'globals.css',
];

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
 * Get relative path for cleaner error messages
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
 * Check if a line is inside a CSS comment or is a variable definition
 */
function shouldSkipLine(line) {
  const trimmed = line.trim();
  // Skip comment lines
  if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('//')) {
    return true;
  }
  // Skip CSS variable definitions (these go in tokens.css)
  if (trimmed.startsWith('--ink-')) {
    return true;
  }
  return false;
}

/**
 * Validate font-size values
 */
function validateFontSizes(filePath, content, lines) {
  const violations = [];

  // Pattern to match font-size with pixel values
  // Matches: font-size: 12px; or font-size:14px or font-size: 16px !important
  const fontSizePattern = /font-size\s*:\s*(\d+px)/gi;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (shouldSkipLine(line)) continue;

    // Skip if it's using a var() already
    if (line.includes('var(--ink-font-size')) continue;

    let match;
    fontSizePattern.lastIndex = 0;

    while ((match = fontSizePattern.exec(line)) !== null) {
      const value = match[1];
      // Skip 0px
      if (value === '0px') continue;

      const suggestion = FONT_SIZE_MAP[value] || 'var(--ink-font-size-*)';
      violations.push({
        line: i + 1,
        property: 'font-size',
        value,
        suggestion,
      });
    }
  }

  return violations;
}

/**
 * Validate font-weight values
 */
function validateFontWeights(filePath, content, lines) {
  const violations = [];

  // Pattern to match font-weight with numeric values
  // Matches: font-weight: 400; or font-weight:500 or font-weight: 600 !important
  const fontWeightPattern = /font-weight\s*:\s*(\d{3})\b/gi;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (shouldSkipLine(line)) continue;

    // Skip if it's using a var() already
    if (line.includes('var(--ink-font-weight')) continue;

    let match;
    fontWeightPattern.lastIndex = 0;

    while ((match = fontWeightPattern.exec(line)) !== null) {
      const value = match[1];
      const suggestion = FONT_WEIGHT_MAP[value] || 'var(--ink-font-weight-*)';
      violations.push({
        line: i + 1,
        property: 'font-weight',
        value,
        suggestion,
      });
    }
  }

  return violations;
}

/**
 * Validate line-height values (warning only - many valid uses)
 */
function validateLineHeights(filePath, content, lines) {
  const violations = [];

  // Pattern to match line-height with common design system values
  // Only flag the values we have tokens for
  const lineHeightPattern = /line-height\s*:\s*(1\.25|1\.4|1\.5|1\.75)\s*[;!]/gi;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (shouldSkipLine(line)) continue;

    // Skip if it's using a var() already
    if (line.includes('var(--ink-line-height') || line.includes('var(--ink-font-')) continue;

    let match;
    lineHeightPattern.lastIndex = 0;

    while ((match = lineHeightPattern.exec(line)) !== null) {
      const value = match[1];
      const suggestion = LINE_HEIGHT_MAP[value] || 'var(--ink-line-height-*)';
      violations.push({
        line: i + 1,
        property: 'line-height',
        value,
        suggestion,
      });
    }
  }

  return violations;
}

/**
 * Validate letter-spacing values
 */
function validateLetterSpacing(filePath, content, lines) {
  const violations = [];

  // Pattern to match letter-spacing with common values
  const letterSpacingPattern = /letter-spacing\s*:\s*(0\.16px|-0\.02em)/gi;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (shouldSkipLine(line)) continue;

    // Skip if it's using a var() already
    if (line.includes('var(--ink-letter-spacing')) continue;

    let match;
    letterSpacingPattern.lastIndex = 0;

    while ((match = letterSpacingPattern.exec(line)) !== null) {
      const value = match[1];
      const suggestion = LETTER_SPACING_MAP[value] || 'var(--ink-letter-spacing-*)';
      violations.push({
        line: i + 1,
        property: 'letter-spacing',
        value,
        suggestion,
      });
    }
  }

  return violations;
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Typography Token Validation                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  const cssFiles = getCSSFiles(DESIGN_SYSTEM_PATH);
  let totalViolations = 0;
  let skippedCount = 0;

  // Collect all violations by type
  const allViolations = {
    'font-size': [],
    'font-weight': [],
    'line-height': [],
    'letter-spacing': [],
  };

  for (const filePath of cssFiles) {
    if (shouldSkip(filePath)) {
      skippedCount++;
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const relPath = relativePath(filePath);

    // Run all validators
    const fontSizeViolations = validateFontSizes(filePath, content, lines);
    const fontWeightViolations = validateFontWeights(filePath, content, lines);
    const lineHeightViolations = validateLineHeights(filePath, content, lines);
    const letterSpacingViolations = validateLetterSpacing(filePath, content, lines);

    // Collect violations with file info
    for (const v of fontSizeViolations) {
      allViolations['font-size'].push({ ...v, file: relPath });
    }
    for (const v of fontWeightViolations) {
      allViolations['font-weight'].push({ ...v, file: relPath });
    }
    for (const v of lineHeightViolations) {
      allViolations['line-height'].push({ ...v, file: relPath });
    }
    for (const v of letterSpacingViolations) {
      allViolations['letter-spacing'].push({ ...v, file: relPath });
    }
  }

  // Count total violations (font-size and font-weight are errors, line-height and letter-spacing are warnings)
  const fontSizeCount = allViolations['font-size'].length;
  const fontWeightCount = allViolations['font-weight'].length;
  const lineHeightCount = allViolations['line-height'].length;
  const letterSpacingCount = allViolations['letter-spacing'].length;

  const errorCount = fontSizeCount + fontWeightCount;
  const warningCount = lineHeightCount + letterSpacingCount;

  // Print results by category
  console.log('\n📋 Checking for hardcoded typography values...\n');

  // Font-size errors
  if (fontSizeCount > 0) {
    console.log(`${RED}❌ Font-size: ${fontSizeCount} hardcoded value(s) found${RESET}`);
    for (const v of allViolations['font-size']) {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   ${YELLOW}  ${v.value} → ${v.suggestion}${RESET}`);
      errors.push(`${v.file}:${v.line} - font-size: ${v.value} → ${v.suggestion}`);
    }
    console.log();
  } else {
    console.log(`${GREEN}✓ Font-size: All values use tokens${RESET}`);
  }

  // Font-weight errors
  if (fontWeightCount > 0) {
    console.log(`${RED}❌ Font-weight: ${fontWeightCount} hardcoded value(s) found${RESET}`);
    for (const v of allViolations['font-weight']) {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   ${YELLOW}  ${v.value} → ${v.suggestion}${RESET}`);
      errors.push(`${v.file}:${v.line} - font-weight: ${v.value} → ${v.suggestion}`);
    }
    console.log();
  } else {
    console.log(`${GREEN}✓ Font-weight: All values use tokens${RESET}`);
  }

  // Line-height warnings (not blocking)
  if (lineHeightCount > 0) {
    console.log(`${YELLOW}⚠ Line-height: ${lineHeightCount} hardcoded value(s) found (warning only)${RESET}`);
    for (const v of allViolations['line-height']) {
      console.log(`   ${CYAN}${v.file}:${v.line} - ${v.value} → ${v.suggestion}${RESET}`);
    }
    console.log();
  } else {
    console.log(`${GREEN}✓ Line-height: All common values use tokens${RESET}`);
  }

  // Letter-spacing warnings (not blocking)
  if (letterSpacingCount > 0) {
    console.log(`${YELLOW}⚠ Letter-spacing: ${letterSpacingCount} hardcoded value(s) found (warning only)${RESET}`);
    for (const v of allViolations['letter-spacing']) {
      console.log(`   ${CYAN}${v.file}:${v.line} - ${v.value} → ${v.suggestion}${RESET}`);
    }
    console.log();
  } else {
    console.log(`${GREEN}✓ Letter-spacing: All common values use tokens${RESET}`);
  }

  // Print summary
  console.log('═'.repeat(60));

  if (errorCount > 0) {
    console.log(`\n${RED}✗ Validation FAILED with ${errorCount} error(s)${RESET}`);
    if (warningCount > 0) {
      console.log(`${YELLOW}  Plus ${warningCount} warning(s) (non-blocking)${RESET}`);
    }
    console.log(`\n${YELLOW}Fix these issues:${RESET}`);
    console.log(`${YELLOW}  • Use var(--ink-font-size-*) for font sizes${RESET}`);
    console.log(`${YELLOW}  • Use var(--ink-font-weight-*) for font weights${RESET}`);
    console.log(`${YELLOW}  • Check tokens.css for available typography tokens${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`\n${GREEN}✓ All typography validations passed!${RESET}`);
    if (warningCount > 0) {
      console.log(`${YELLOW}  (${warningCount} warning(s) - consider using tokens for line-height/letter-spacing)${RESET}`);
    }
    console.log(`${GREEN}  Skipped ${skippedCount} token definition files.${RESET}\n`);
    process.exit(0);
  }
}

// Run validation
main();
