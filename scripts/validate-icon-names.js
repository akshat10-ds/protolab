#!/usr/bin/env node

/**
 * Icon Names Validation Script
 *
 * Validates that all Icon components use valid icon names from iconPaths.ts
 *
 * Run: node scripts/validate-icon-names.js
 * Exit code 1 on failure (blocks build)
 */

const fs = require('fs');
const path = require('path');

const DESIGN_SYSTEM_PATH = path.join(__dirname, '..', 'src', 'design-system');
const ICON_PATHS_FILE = path.join(DESIGN_SYSTEM_PATH, '3-primitives', 'Icon', 'iconPaths.ts');
const SRC_PATH = path.join(__dirname, '..', 'src');

// ANSI colors for output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

const errors = [];

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
 * Extract valid icon names from iconPaths.ts
 */
function getValidIconNames() {
  if (!fs.existsSync(ICON_PATHS_FILE)) {
    console.error(`${RED}Error: iconPaths.ts not found at ${ICON_PATHS_FILE}${RESET}`);
    process.exit(1);
  }

  const content = fs.readFileSync(ICON_PATHS_FILE, 'utf8');

  // Extract icon names from the iconPaths object
  // Pattern: 'icon-name': followed by path or object
  const iconNamePattern = /'([a-z0-9-]+)':\s*(?:\{|'|`)/g;
  const iconNames = new Set();

  let match;
  while ((match = iconNamePattern.exec(content)) !== null) {
    iconNames.add(match[1]);
  }

  // Also try to match double-quoted keys
  const doubleQuotePattern = /"([a-z0-9-]+)":\s*(?:\{|'|`)/g;
  while ((match = doubleQuotePattern.exec(content)) !== null) {
    iconNames.add(match[1]);
  }

  return iconNames;
}

/**
 * Find all Icon usages in TSX files and validate names
 */
function validateIconNames(validNames) {
  console.log('\n📋 Checking Icon name props in TSX files...');

  const tsxFiles = getFiles(SRC_PATH, ['.tsx']);
  let violations = 0;
  let checked = 0;

  // Patterns to match Icon name props
  // <Icon name="value" /> or <Icon name='value' />
  const iconNamePatterns = [
    /<Icon[^>]*\bname\s*=\s*"([^"]+)"/g,
    /<Icon[^>]*\bname\s*=\s*'([^']+)'/g,
  ];

  for (const filePath of tsxFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      for (const pattern of iconNamePatterns) {
        // Reset regex lastIndex
        pattern.lastIndex = 0;

        let match;
        while ((match = pattern.exec(line)) !== null) {
          const iconName = match[1];
          checked++;

          if (!validNames.has(iconName)) {
            violations++;
            const relPath = relativePath(filePath);
            errors.push(`${RED}Icon: Invalid name "${iconName}"${RESET} in ${relPath}:${lineNum}`);

            // Suggest similar icons
            const suggestions = findSimilarIcons(iconName, validNames);
            if (suggestions.length > 0) {
              errors.push(`${YELLOW}  → Did you mean: ${suggestions.join(', ')}?${RESET}`);
            }
          }
        }
      }
    }
  }

  if (violations === 0) {
    console.log(`${GREEN}  ✓ All ${checked} icon names are valid${RESET}`);
  } else {
    console.log(`${RED}  ✗ Found ${violations} invalid icon name(s) out of ${checked} checked${RESET}`);
  }

  return violations;
}

/**
 * Find similar icon names for suggestions
 */
function findSimilarIcons(invalidName, validNames) {
  const suggestions = [];
  const lowerInvalid = invalidName.toLowerCase();

  for (const validName of validNames) {
    // Check for partial matches
    if (validName.includes(lowerInvalid) || lowerInvalid.includes(validName)) {
      suggestions.push(validName);
    }
    // Check for common substitutions
    const normalizedInvalid = lowerInvalid.replace(/-/g, '');
    const normalizedValid = validName.replace(/-/g, '');
    if (normalizedValid.includes(normalizedInvalid) || normalizedInvalid.includes(normalizedValid)) {
      if (!suggestions.includes(validName)) {
        suggestions.push(validName);
      }
    }
  }

  // Limit suggestions
  return suggestions.slice(0, 3);
}

/**
 * Main validation function
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Icon Names Validation                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  // Get valid icon names
  console.log('\n📋 Loading valid icon names from iconPaths.ts...');
  const validNames = getValidIconNames();
  console.log(`${GREEN}  ✓ Found ${validNames.size} valid icon names${RESET}`);

  // Validate icon names in codebase
  const violations = validateIconNames(validNames);

  // Print summary
  console.log('\n' + '═'.repeat(60));

  if (violations > 0) {
    console.log(`\n${RED}✗ Validation FAILED with ${violations} invalid icon name(s):${RESET}\n`);
    errors.forEach(err => console.log(`  ${err}`));
    console.log(`\n${YELLOW}Check iconPaths.ts for valid icon names.${RESET}`);
    console.log(`${CYAN}Location: src/design-system/3-primitives/Icon/iconPaths.ts${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`\n${GREEN}✓ All icon names are valid!${RESET}\n`);
    process.exit(0);
  }
}

// Run validation
main();
