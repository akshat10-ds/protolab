#!/usr/bin/env node

/**
 * Shadow Component Detection Script
 *
 * Detects component files that duplicate design system component names
 * but are created outside the design-system directory.
 *
 * This prevents "shadow" components that bypass the design system.
 *
 * Exceptions:
 * - *.stories.tsx (Storybook files)
 * - *.test.tsx (Test files)
 * - Files inside design-system/
 * - Files inside node_modules/
 *
 * Run: node scripts/validate-no-shadow-components.js
 * Exit code 1 on failure (blocks build)
 */

const fs = require('fs');
const path = require('path');

const SRC_PATH = path.join(__dirname, '..', 'src');

// Design system component names that should ONLY exist in design-system/
const DS_COMPONENT_NAMES = [
  // Primitives
  'Button',
  'IconButton',
  'Input',
  'Select',
  'TextArea',
  'Checkbox',
  'Radio',
  'Switch',
  'Slider',
  'Badge',
  'Avatar',
  'Chip',
  'Card',
  'Icon',
  'Link',
  'Typography',
  'Heading',
  'Text',
  'Tooltip',
  'Spinner',
  'ProgressBar',
  'Skeleton',
  'Divider',
  'Stepper',
  'StatusLight',
  'AlertBadge',
  // Composites
  'Modal',
  'Drawer',
  'Dropdown',
  'Popover',
  'Table',
  'Tabs',
  'Accordion',
  'Alert',
  'Banner',
  'Callout',
  'ComboBox',
  'ComboButton',
  'SearchInput',
  'FileInput',
  'FileUpload',
  'DatePicker',
  'FilterTag',
  'Breadcrumb',
  'Pagination',
  'List',
  // Patterns
  'GlobalNav',
  'LocalNav',
  // Layouts
  'DocuSignShell',
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

    // Skip node_modules and design-system
    if (item === 'node_modules' || item === 'design-system') {
      continue;
    }

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
 * Check if a file is an exception (stories, tests)
 */
function isException(filePath) {
  const fileName = path.basename(filePath);
  return (
    fileName.endsWith('.stories.tsx') ||
    fileName.endsWith('.stories.ts') ||
    fileName.endsWith('.test.tsx') ||
    fileName.endsWith('.test.ts') ||
    fileName.endsWith('.spec.tsx') ||
    fileName.endsWith('.spec.ts')
  );
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Shadow Component Detection                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log('\n📋 Checking for shadow components outside design-system...');

  const tsxFiles = getFiles(SRC_PATH, ['.tsx']);
  const violations = [];

  for (const filePath of tsxFiles) {
    // Skip exceptions
    if (isException(filePath)) {
      continue;
    }

    const fileName = path.basename(filePath, '.tsx');

    // Check if this file name matches a DS component
    if (DS_COMPONENT_NAMES.includes(fileName)) {
      violations.push({
        file: relativePath(filePath),
        component: fileName,
      });
    }
  }

  // Print results
  console.log('\n' + '═'.repeat(60));

  if (violations.length === 0) {
    console.log(`\n${GREEN}✓ No shadow components found!${RESET}`);
    console.log(`${GREEN}  All ${DS_COMPONENT_NAMES.length} design system component names are unique.${RESET}\n`);
    process.exit(0);
  } else {
    console.log(`\n${RED}✗ Found ${violations.length} shadow component(s):${RESET}\n`);

    for (const v of violations) {
      console.log(`  ${RED}${v.file}${RESET}`);
      console.log(`    ${YELLOW}→ "${v.component}" shadows the design system component.${RESET}`);
      console.log(`    ${YELLOW}→ Import from @/design-system instead of creating a new component.${RESET}\n`);
    }

    console.log(`${YELLOW}To fix: Delete these files and import from @/design-system:${RESET}`);
    console.log(`${YELLOW}  import { ${violations.map(v => v.component).join(', ')} } from '@/design-system';${RESET}\n`);

    process.exit(1);
  }
}

// Run validation
main();
