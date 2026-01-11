#!/usr/bin/env node

/**
 * Validate Form Component Patterns
 *
 * This script ensures form primitives properly support both controlled and uncontrolled usage.
 *
 * Requirements for form components (Checkbox, Radio, Switch, etc.):
 * 1. Must track internal state for uncontrolled usage
 * 2. Must detect controlled mode (checked !== undefined)
 * 3. Must use internal state for visual rendering when uncontrolled
 * 4. Visual indicators (icons, fills) should render based on actual state, not just props
 *
 * Learning: If a component conditionally renders visual elements based ONLY on props,
 * uncontrolled usage will fail to show those elements even when the DOM state changes.
 */

const fs = require('fs');
const path = require('path');

// Form primitives that must support controlled/uncontrolled patterns
const FORM_PRIMITIVES = ['Checkbox', 'Radio', 'Switch'];

// Components that are controlled-only by design (they need a value to display)
const CONTROLLED_ONLY = ['Slider'];

const PRIMITIVES_DIR = path.join(__dirname, '../src/design-system/3-primitives');

// Patterns that indicate proper controlled/uncontrolled support
const REQUIRED_PATTERNS = {
  internalState: /useState.*(?:defaultChecked|false)/,
  controlledCheck: /(?:checked|value)\s*!==\s*undefined/,
  derivedState: /(?:isChecked|isControlled|internalChecked)/,
};

// Patterns that indicate potential issues
const WARNING_PATTERNS = {
  directPropRender: /\{checked\s*&&\s*(?!.*isChecked)/,
  noInternalState: (content) => !content.includes('useState') && content.includes('checked'),
};

console.log('');
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║           Form Component Pattern Validation                ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');

let hasErrors = false;
let hasWarnings = false;

FORM_PRIMITIVES.forEach(component => {
  const componentPath = path.join(PRIMITIVES_DIR, component, `${component}.tsx`);

  if (!fs.existsSync(componentPath)) {
    console.log(`  ⚠ ${component}: Component file not found at ${componentPath}`);
    hasWarnings = true;
    return;
  }

  const content = fs.readFileSync(componentPath, 'utf8');
  const issues = [];
  const passes = [];

  // Check for CSS-based visual indicators (Radio uses :checked pseudo-class)
  const usesCssPseudo = content.includes('module.css') && !content.includes('<Icon') && !content.includes('svg');

  if (usesCssPseudo && component === 'Radio') {
    passes.push('Uses CSS :checked pseudo-class for visual state (no React state needed)');
  } else {
    // Check for internal state management
    if (REQUIRED_PATTERNS.internalState.test(content)) {
      passes.push('Has internal state for uncontrolled usage');
    } else if (!content.includes('useState')) {
      issues.push('Missing internal state (useState) for uncontrolled usage');
    }

    // Check for controlled mode detection
    if (REQUIRED_PATTERNS.controlledCheck.test(content)) {
      passes.push('Detects controlled mode');
    } else {
      issues.push('Does not detect controlled mode (checked !== undefined)');
    }

    // Check for derived state usage
    if (REQUIRED_PATTERNS.derivedState.test(content)) {
      passes.push('Uses derived state for rendering');
    }

    // Check for direct prop rendering (potential issue)
    if (WARNING_PATTERNS.directPropRender.test(content)) {
      issues.push('Renders visual elements based directly on prop (should use derived state)');
    }
  }

  // Output results
  if (issues.length > 0) {
    console.log(`  ✗ ${component}:`);
    issues.forEach(issue => console.log(`      - ${issue}`));
    hasErrors = true;
  } else {
    console.log(`  ✓ ${component}: Properly supports controlled/uncontrolled usage`);
    if (passes.length > 0 && process.argv.includes('--verbose')) {
      passes.forEach(pass => console.log(`      + ${pass}`));
    }
  }
});

console.log('');
console.log('════════════════════════════════════════════════════════════');
console.log('');

if (hasErrors) {
  console.log('\x1b[31m✗ Form pattern validation failed!\x1b[0m');
  console.log('');
  console.log('Form components must support both controlled and uncontrolled usage:');
  console.log('  1. Track internal state: useState(defaultChecked ?? false)');
  console.log('  2. Detect controlled mode: const isControlled = checked !== undefined');
  console.log('  3. Use derived state: const isChecked = isControlled ? checked : internalChecked');
  console.log('  4. Render based on derived state, not props: {isChecked && <Icon />}');
  console.log('');
  process.exit(1);
} else {
  console.log('\x1b[32m✓ All form components properly support controlled/uncontrolled patterns!\x1b[0m');
  console.log('');
}
