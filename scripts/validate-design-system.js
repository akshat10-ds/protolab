#!/usr/bin/env node

/**
 * Design System Validation Script
 *
 * Validates design system code against key principles:
 * 1. No hardcoded colors in CSS (hex, rgb, rgba, hsl)
 * 2. No inline styles in JSX (style={{}}) - except for legitimate dynamic patterns
 * 3. No direct lucide-react imports (must use Icon component)
 *
 * Legitimate inline style patterns (allowed):
 * - CSS variable injection: style={{ '--gap': value }}
 * - Dynamic width/height: style={{ width: `${x}%` }}
 * - Dynamic positioning: style={{ left, top, right, bottom, transform }}
 * - Passthrough style props in utility components
 *
 * Run: node scripts/validate-design-system.js
 * Exit code 1 on failure (blocks build)
 */

const fs = require('fs');
const path = require('path');

const DESIGN_SYSTEM_PATH = path.join(__dirname, '..', 'src', 'design-system');
const errors = [];

// Files excluded from inline style validation (legitimate dynamic patterns)
const INLINE_STYLE_ALLOWLIST = [
  // Utility components - pass style prop through for composition
  '2-utilities/Container/Container.tsx',
  '2-utilities/Grid/Grid.tsx',
  '2-utilities/Inline/Inline.tsx',
  '2-utilities/Spacer/Spacer.tsx',
  '2-utilities/Stack/Stack.tsx',
  // Components with legitimate dynamic width/height/position
  '3-primitives/ProgressBar/ProgressBar.tsx', // width percentage
  '3-primitives/Slider/Slider.tsx', // position percentage
  '3-primitives/Tooltip/Tooltip.tsx', // dynamic positioning
  '3-primitives/Skeleton/Skeleton.tsx', // dynamic dimensions
  '3-primitives/Avatar/AvatarGroup.tsx', // overlap offset
  '3-primitives/Input/Input.tsx', // icon padding
  '3-primitives/Select/Select.tsx', // icon padding
  '3-primitives/TextArea/TextArea.tsx', // resize dimensions
  // Composites with dynamic positioning
  '4-composites/ComboBox/ComboBox.tsx', // dropdown position
  '4-composites/Drawer/Drawer.tsx', // slide animation
  '4-composites/Dropdown/Dropdown.tsx', // menu position
  '4-composites/FileInput/FileInput.tsx', // icon positioning
  '4-composites/FileUpload/FileUpload.tsx', // progress width
  '4-composites/Popover/Popover.tsx', // dynamic position
  '4-composites/Table/Table.tsx', // column widths
  // Patterns with dynamic CSS custom properties
  '5-patterns/AIChat/AIChat.tsx', // maxHeight via CSS variable
  '5-patterns/DataTable/DataTableCell.tsx', // column widths
  '5-patterns/DataTable/DataTableHeader.tsx', // column widths
  // Demo files
  '3-primitives/Icon/IconDemo.tsx',
];

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
 * Validate CSS files for hardcoded colors
 * Excludes tokens.css which legitimately contains color definitions
 */
function validateCSSColors() {
  console.log('\n📋 Checking CSS files for hardcoded colors...');

  const cssFiles = getFiles(DESIGN_SYSTEM_PATH, ['.css']);
  let violations = 0;

  // Patterns to detect hardcoded colors
  const colorPatterns = [
    { regex: /#[0-9a-fA-F]{3,8}\b/g, name: 'hex color' },
    { regex: /\brgb\s*\(/gi, name: 'rgb()' },
    { regex: /\brgba\s*\(/gi, name: 'rgba()' },
    { regex: /\bhsl\s*\(/gi, name: 'hsl()' },
    { regex: /\bhsla\s*\(/gi, name: 'hsla()' },
  ];

  for (const filePath of cssFiles) {
    // Skip tokens.css - it legitimately contains color definitions
    if (filePath.includes('tokens.css')) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Skip CSS comments
      if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) {
        continue;
      }

      for (const { regex, name } of colorPatterns) {
        const matches = line.match(regex);
        if (matches) {
          for (const match of matches) {
            // Skip if it's inside a CSS variable definition or comment
            if (line.includes('var(--ink-') || line.includes('/*')) {
              continue;
            }

            violations++;
            const relPath = relativePath(filePath);
            errors.push(`${RED}CSS: Hardcoded ${name} "${match}"${RESET} in ${relPath}:${lineNum}`);
          }
        }
      }
    }
  }

  if (violations === 0) {
    console.log(`${GREEN}  ✓ No hardcoded colors found${RESET}`);
  } else {
    console.log(`${RED}  ✗ Found ${violations} hardcoded color(s)${RESET}`);
  }

  return violations;
}

/**
 * Validate TSX files for inline styles
 * Skips files in INLINE_STYLE_ALLOWLIST that have legitimate dynamic patterns
 */
function validateNoInlineStyles() {
  console.log('\n📋 Checking TSX files for inline styles...');

  const tsxFiles = getFiles(DESIGN_SYSTEM_PATH, ['.tsx']);
  let violations = 0;
  let skipped = 0;

  // Pattern to detect inline styles: style={{ or style={
  const stylePattern = /\bstyle\s*=\s*\{/g;

  for (const filePath of tsxFiles) {
    // Check if file is in allowlist
    const isAllowlisted = INLINE_STYLE_ALLOWLIST.some(allowed => filePath.includes(allowed));
    if (isAllowlisted) {
      skipped++;
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
        continue;
      }

      if (stylePattern.test(line)) {
        violations++;
        const relPath = relativePath(filePath);
        errors.push(`${RED}JSX: Inline style found${RESET} in ${relPath}:${lineNum}`);

        // Reset regex lastIndex for next iteration
        stylePattern.lastIndex = 0;
      }
    }
  }

  if (violations === 0) {
    console.log(`${GREEN}  ✓ No inline styles found${RESET} (${skipped} files allowlisted for dynamic patterns)`);
  } else {
    console.log(`${RED}  ✗ Found ${violations} inline style(s)${RESET} (${skipped} files allowlisted)`);
  }

  return violations;
}

/**
 * Validate TSX files for direct lucide-react imports
 * Icon component itself is allowed to import from lucide-react
 */
function validateNoLucideImports() {
  console.log('\n📋 Checking TSX files for lucide-react imports...');

  const tsxFiles = getFiles(DESIGN_SYSTEM_PATH, ['.tsx', '.ts']);
  let violations = 0;

  // Pattern to detect lucide-react imports
  const lucidePattern = /from\s+['"]lucide-react['"]/g;

  for (const filePath of tsxFiles) {
    // Skip the Icon component itself - it's allowed to import from lucide-react
    if (filePath.includes('Icon/Icon.tsx') || filePath.includes('Icon/index.ts') || filePath.includes('iconPaths.ts')) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      if (lucidePattern.test(line)) {
        violations++;
        const relPath = relativePath(filePath);
        errors.push(`${RED}Import: Direct lucide-react import${RESET} in ${relPath}:${lineNum}`);
        errors.push(`${YELLOW}  → Use <Icon name="..." /> instead${RESET}`);

        // Reset regex lastIndex
        lucidePattern.lastIndex = 0;
      }
    }
  }

  if (violations === 0) {
    console.log(`${GREEN}  ✓ No direct lucide-react imports found${RESET}`);
  } else {
    console.log(`${RED}  ✗ Found ${violations} lucide-react import(s)${RESET}`);
  }

  return violations;
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Design System Validation                         ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  let totalViolations = 0;

  // Run all validations
  totalViolations += validateCSSColors();
  totalViolations += validateNoInlineStyles();
  totalViolations += validateNoLucideImports();

  // Print summary
  console.log('\n' + '═'.repeat(60));

  if (totalViolations > 0) {
    console.log(`\n${RED}✗ Validation FAILED with ${totalViolations} violation(s):${RESET}\n`);
    errors.forEach(err => console.log(`  ${err}`));
    console.log(`\n${YELLOW}Fix these issues before building.${RESET}`);
    console.log(`${YELLOW}Use design tokens (var(--ink-*)) for colors.${RESET}`);
    console.log(`${YELLOW}Use CSS modules for styling, not inline styles.${RESET}`);
    console.log(`${YELLOW}Use <Icon name="..." /> instead of lucide-react imports.${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`\n${GREEN}✓ All validations passed!${RESET}\n`);
    process.exit(0);
  }
}

// Run validation
main();
