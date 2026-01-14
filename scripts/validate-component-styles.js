#!/usr/bin/env node

/**
 * Component Styling Validation Script
 *
 * Checks for common styling anti-patterns that cause visual inconsistencies:
 *
 * 1. External CSS adding opacity to components (except disabled states)
 * 2. Hardcoded rgba/rgb colors instead of design tokens
 * 3. External CSS overriding component behavior (opacity transitions, color changes)
 * 4. IconButton with explicit size="small" (medium is production default)
 *
 * Run: node scripts/validate-component-styles.js
 * Or: npm run validate:styles
 */

const fs = require('fs');
const path = require('path');

const SRC_PATH = path.join(__dirname, '..', 'src');
const DESIGN_SYSTEM_PATH = path.join(SRC_PATH, 'design-system');

// ANSI colors for output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

// Files to skip (component internals that legitimately use these patterns)
const SKIP_CSS_FILES = [
  'tokens.css',
  'globals.css',
  'index.css',             // Tailwind generated
  'IconButton.module.css', // IconButton can define its own opacity for disabled
  'Showcase.module.css',   // Showcase demos may need special styling
  'InspectorPanel.module.css', // Showcase tooling
];

// Directories to skip for CSS checks (experimental/demo code)
const SKIP_CSS_DIRS = [
  'editor',
  'lab',
  'learnings',
  'prototypes',
];

const SKIP_TSX_FILES = [
  'IconButton.tsx',        // IconButton component itself
  'Icon.tsx',
  'TokensShowcase.tsx',    // Token demos intentionally show inline colors
  'PrimitivesShowcase.tsx', // Showcase demos
];

// Directories to skip entirely for TSX checks (showcase/demo/experimental code)
const SKIP_TSX_DIRS = [
  'showcase',
  'examples',
  'editor',
  'lab',
  'learnings',
  'prototypes',
];

let errorCount = 0;
let warningCount = 0;

/**
 * Recursively get files by extension
 */
function getFiles(dir, extension) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getFiles(fullPath, extension));
    } else if (item.endsWith(extension)) {
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
function shouldSkipCSS(filePath) {
  if (SKIP_CSS_FILES.some(skip => filePath.endsWith(skip))) return true;
  if (SKIP_CSS_DIRS.some(dir => filePath.includes(`/${dir}/`) || filePath.includes(`\\${dir}\\`))) return true;
  return false;
}

function shouldSkipTSX(filePath) {
  if (SKIP_TSX_FILES.some(skip => filePath.endsWith(skip))) return true;
  if (SKIP_TSX_DIRS.some(dir => filePath.includes(`/${dir}/`) || filePath.includes(`\\${dir}\\`))) return true;
  return false;
}

/**
 * Check CSS files for anti-patterns
 */
function checkCSSFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];
  const relPath = relativePath(filePath);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Skip comments
    if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) {
      continue;
    }

    // Check 1: Opacity on icon/button-related classes outside of :disabled
    // Focus on classes that sound like they style icons or buttons
    if (/opacity:\s*0\.[0-9]/.test(line)) {
      // Check if this is within a disabled context (look at previous lines)
      const contextStart = Math.max(0, i - 10);
      const context = lines.slice(contextStart, i + 1).join('\n');

      // Skip if in disabled context
      if (/:disabled|\.disabled|--ink-opacity-disabled/.test(context)) {
        continue;
      }

      // Check if this is icon/button related (stricter check)
      const isIconButtonRelated = /icon|button|control|action/i.test(context);

      // Also check if it's a hover action pattern (legitimate for showing/hiding elements)
      const isHoverShowHide = /\.hover.*opacity|opacity.*hover/i.test(context) &&
                              /opacity:\s*0;?$|opacity:\s*1;?$/m.test(context);

      if (isIconButtonRelated && !isHoverShowHide) {
        issues.push({
          type: 'error',
          line: lineNum,
          message: 'Opacity on icon/button element - icons should always be full opacity',
          code: line.trim(),
          suggestion: 'Remove opacity or move to :disabled pseudo-class',
        });
      }
    }

    // Check 2: Hardcoded rgba/rgb colors (not in token definitions)
    if (/rgba?\s*\(\s*\d+/.test(line) && !/^\s*--ink-/.test(line)) {
      // Allow comments that document token values
      if (!line.includes('/*') && !line.includes('//')) {
        issues.push({
          type: 'warning',
          line: lineNum,
          message: 'Hardcoded color - use design tokens instead',
          code: line.trim(),
          suggestion: 'Use var(--ink-*) token',
        });
      }
    }

    // Check 3: Opacity transitions (fade in/out effects)
    if (/transition.*opacity|opacity.*transition/.test(line)) {
      // Check if it's for disabled state
      const contextStart = Math.max(0, i - 5);
      const context = lines.slice(contextStart, i + 1).join('\n');

      if (!/:disabled|\.disabled/.test(context)) {
        issues.push({
          type: 'warning',
          line: lineNum,
          message: 'Opacity transition - icons should not fade in/out',
          code: line.trim(),
          suggestion: 'Remove opacity from transition, use only background-color',
        });
      }
    }

    // Check 4: External classes targeting component patterns
    // Look for classes like .columnControlButton, .actionButton with opacity
    if (/\.(column|action|icon|overflow).*Button/.test(line) && !/^\.iconButton/.test(line.trim())) {
      // This is defining a custom class that sounds like it's styling a button
      // Check next few lines for opacity
      const nextLines = lines.slice(i, Math.min(i + 5, lines.length)).join('\n');
      if (/opacity:\s*0\.[0-9]/.test(nextLines)) {
        issues.push({
          type: 'error',
          line: lineNum,
          message: 'External class adding opacity to button - use IconButton variants instead',
          code: line.trim(),
          suggestion: 'Remove opacity styling, let IconButton handle its own states',
        });
      }
    }
  }

  return issues;
}

/**
 * Check TSX files for anti-patterns
 */
function checkTSXFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];
  const relPath = relativePath(filePath);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Check: IconButton with explicit size="small"
    if (/IconButton/.test(line) || (i > 0 && /IconButton/.test(lines[i-1]))) {
      if (/size=["']small["']/.test(line)) {
        issues.push({
          type: 'warning',
          line: lineNum,
          message: 'IconButton using size="small" - medium (24px) matches production',
          code: line.trim(),
          suggestion: 'Remove size prop to use default medium, or document why small is needed',
        });
      }
    }

    // Check: Inline style with opacity
    if (/style=\{\{[^}]*opacity/.test(line)) {
      issues.push({
        type: 'error',
        line: lineNum,
        message: 'Inline style with opacity - avoid opacity overrides',
        code: line.trim().substring(0, 80),
        suggestion: 'Remove inline opacity, use component variants',
      });
    }

    // Check: Inline style with hardcoded color (not using tokens)
    if (/style=\{\{[^}]*color:/.test(line)) {
      // Skip if using design tokens (var(--ink-*))
      if (/color:\s*['"`]var\(--ink-/.test(line) || /color:\s*`var\(--ink-/.test(line)) {
        // Using tokens in inline style - not ideal but acceptable
        continue;
      }
      // Flag hardcoded colors in inline styles
      if (/color:\s*['"`]#|color:\s*['"`]rgb|color:\s*['"`]hsl/.test(line)) {
        issues.push({
          type: 'warning',
          line: lineNum,
          message: 'Inline style with hardcoded color - use design tokens',
          code: line.trim().substring(0, 80),
          suggestion: 'Use var(--ink-*) token instead of hardcoded color',
        });
      }
    }
  }

  return issues;
}

/**
 * Print issues for a file
 */
function printIssues(filePath, issues) {
  if (issues.length === 0) return;

  console.log(`\n  ${CYAN}${relativePath(filePath)}${RESET}`);

  for (const issue of issues) {
    const color = issue.type === 'error' ? RED : YELLOW;
    const icon = issue.type === 'error' ? '✗' : '⚠';

    console.log(`    ${color}${icon} Line ${issue.line}: ${issue.message}${RESET}`);
    console.log(`      ${issue.code}`);
    console.log(`      ${GREEN}→ ${issue.suggestion}${RESET}`);

    if (issue.type === 'error') {
      errorCount++;
    } else {
      warningCount++;
    }
  }
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Component Styling Validation                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log('\n📋 Checking for styling anti-patterns...\n');

  // Check CSS files
  console.log(`${CYAN}Checking CSS files...${RESET}`);
  const cssFiles = getFiles(SRC_PATH, '.css');

  for (const filePath of cssFiles) {
    if (shouldSkipCSS(filePath)) continue;
    const issues = checkCSSFile(filePath);
    printIssues(filePath, issues);
  }

  // Check TSX files
  console.log(`\n${CYAN}Checking TSX files...${RESET}`);
  const tsxFiles = getFiles(SRC_PATH, '.tsx');

  for (const filePath of tsxFiles) {
    if (shouldSkipTSX(filePath)) continue;
    const issues = checkTSXFile(filePath);
    printIssues(filePath, issues);
  }

  // Print summary
  console.log('\n' + '═'.repeat(60));

  if (errorCount === 0 && warningCount === 0) {
    console.log(`\n${GREEN}✓ No styling issues found!${RESET}\n`);
    process.exit(0);
  } else {
    console.log(`\n${RED}✗ Found ${errorCount} error(s)${RESET} and ${YELLOW}${warningCount} warning(s)${RESET}`);

    console.log(`\n${CYAN}Common fixes:${RESET}`);
    console.log(`  • Remove opacity from icon buttons (should always be full opacity)`);
    console.log(`  • Use design tokens: var(--ink-neutral-fade-90) not rgba(19,0,50,0.9)`);
    console.log(`  • Use IconButton default size (medium = 24px icons)`);
    console.log(`  • Don't add behavior through external CSS classes`);
    console.log(`\n${CYAN}See docs/COMPONENT_STYLING_RULES.md for details${RESET}\n`);

    // Exit with error if there are errors (not just warnings)
    process.exit(errorCount > 0 ? 1 : 0);
  }
}

// Run validation
main();
