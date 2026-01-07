# Design System Enforcement Plan

> **Status**: Documented for future implementation
> **Created**: January 2025
> **Estimated Effort**: ~7 hours (Phase 1 + 2)

---

## Executive Summary

This plan creates a comprehensive check system that ensures the Ink Design System grows to meet needs rather than being worked around. It covers import restrictions, CSS validation, build enforcement, and CI integration.

---

## Current State

### What's Already Enforced

| Tool | Rule | Severity | Scope |
|------|------|----------|-------|
| ESLint | No `lucide-react` imports | ERROR | All files |
| ESLint | 6-layer hierarchy | ERROR | design-system/ |
| ESLint | No inline `style` prop | WARN | All files |
| ESLint | No `className` on DS components | WARN | prototypes/ |
| validate-design-system.js | Hardcoded colors detection | Blocks build | design-system/ |
| validate-icon-names.js | Icon name validation | Blocks build | All files |
| Husky + lint-staged | ESLint + Prettier | Blocks commit | Staged files |

### What's NOT Enforced (Gaps)

| Gap | Risk | Priority |
|-----|------|----------|
| External UI library imports (MUI, Chakra, Ant Design) | HIGH - completely bypasses DS | P1 |
| CSS-in-JS libraries (styled-components, emotion) | HIGH - bypasses token system | P1 |
| Icon libraries (react-icons, heroicons, etc.) | MEDIUM - bypasses Icon component | P1 |
| Stylelint for CSS | HIGH - can't catch CSS violations at commit | P1 |
| CI pipeline validation | HIGH - `--no-verify` bypasses hooks | P1 |
| Inline SVG detection | MEDIUM - bypasses Icon component | P2 |
| `<style>` tag injection | MEDIUM - can inject arbitrary styles | P2 |
| `!important` usage | LOW - sometimes legitimate | P2 |
| eslint-disable tracking | LOW - for audit purposes | P2 |

### Current Violations to Fix

6 CSS files contain hardcoded colors (~15 instances):

1. `src/design-system/3-primitives/Badge/Badge.module.css`
   - Line 29: `#2b2843` → `var(--ink-neutral-110)`
   - Line 48: `#a6003f` → `var(--ink-red-100)`
   - Line 53: `#4200ca` → `var(--ink-cobalt-110)`

2. `src/design-system/4-composites/Table/Table.module.css`
   - Line 146: `rgba(19, 0, 50, 0.05)` → `var(--ink-neutral-fade-5)`

3. `src/design-system/4-composites/FilterTag/FilterTag.module.css`
   - Lines 51, 64, 69, 135, 139, 143, 147: Various `rgba()` → `var(--ink-*-fade-*)`

4. `src/design-system/4-composites/Modal/Modal.module.css`
   - Line 8: `rgba(19, 0, 50, 0.8)` → `var(--ink-bg-scrim)`

5. `src/design-system/4-composites/Tabs/Tabs.module.css`
   - Line 39: `rgb(19, 0, 50)` → `var(--ink-cobalt-140)`

6. `src/design-system/5-patterns/LocalNav/LocalNav.module.css`
   - Line 146: `rgba(19, 0, 50, 0.1)` → `var(--ink-neutral-fade-10)`

---

## Complete Bypass Methods Catalog

### Category 1: Import-Level Bypasses

| Bypass Method | Example | Detection | Severity |
|--------------|---------|-----------|----------|
| External UI libraries | `import { Button } from '@mui/material'` | ESLint no-restricted-imports | ERROR |
| CSS-in-JS libraries | `import styled from 'styled-components'` | ESLint no-restricted-imports | ERROR |
| Icon libraries | `import { FaHome } from 'react-icons/fa'` | ESLint no-restricted-imports | ERROR |
| Animation libraries | `import { motion } from 'framer-motion'` | ESLint no-restricted-imports | WARN |

**Libraries to Block:**
```
UI: @mui/*, @material-ui/*, @chakra-ui/*, antd, @radix-ui/*, react-bootstrap, @headlessui/*
CSS-in-JS: styled-components, @emotion/*, @stitches/*, linaria, @vanilla-extract/*
Icons: react-icons/*, @heroicons/*, phosphor-react, @fortawesome/*, @tabler/icons-react
```

### Category 2: Styling Bypasses

| Bypass Method | Example | Detection | Severity |
|--------------|---------|-----------|----------|
| Inline styles | `<div style={{ color: 'red' }}>` | ESLint forbid-component-props | WARN |
| Hardcoded CSS colors | `.btn { color: #ff0000; }` | Stylelint color-no-hex | ERROR |
| CSS !important | `.btn { color: red !important; }` | Stylelint declaration-no-important | WARN |
| CSS variable overrides | `:root { --ink-cobalt-100: red; }` | Custom script | ERROR |
| Inline SVG | `<svg viewBox="..."><path/></svg>` | ESLint no-restricted-syntax | WARN |
| Style tag injection | `<style>{'.btn { color: red }'}</style>` | ESLint no-restricted-syntax | ERROR |
| className overrides | `<Button className="custom">` | ESLint no-restricted-syntax | WARN |

### Category 3: Build/Commit Bypasses

| Bypass Method | Example | Detection | Severity |
|--------------|---------|-----------|----------|
| Skip pre-commit | `git commit --no-verify` | CI pipeline | ERROR |
| eslint-disable | `// eslint-disable-next-line` | ESLint no-warning-comments | WARN |
| ts-ignore | `// @ts-ignore` | ESLint ban-ts-comment | WARN |
| Direct push to main | `git push origin main` | Branch protection | ERROR |

---

## Implementation Plan

### Phase 1: Critical (~4 hours)

#### 1.1 Update ESLint Config

**File:** `.eslintrc.js`

```javascript
// Add to 'no-restricted-imports' rule
'no-restricted-imports': ['error', {
  paths: [
    { name: 'lucide-react', message: 'Use <Icon name="..." /> from @/design-system' }
  ],
  patterns: [
    // External UI Libraries
    { group: ['@mui/*', '@material-ui/*'], message: 'Use Ink design system components instead.' },
    { group: ['@chakra-ui/*'], message: 'Use Ink design system components instead.' },
    { group: ['antd', 'antd/*'], message: 'Use Ink design system components instead.' },
    { group: ['@radix-ui/*'], message: 'Use Ink primitives or composites instead.' },
    { group: ['react-bootstrap', 'react-bootstrap/*'], message: 'Use Ink design system components.' },
    { group: ['@headlessui/*'], message: 'Use Ink design system components.' },

    // CSS-in-JS Libraries
    { group: ['styled-components', 'styled-components/*'], message: 'Use CSS modules with design tokens.' },
    { group: ['@emotion/*', 'emotion'], message: 'Use CSS modules with design tokens.' },
    { group: ['@stitches/*'], message: 'Use CSS modules with design tokens.' },
    { group: ['linaria', 'linaria/*'], message: 'Use CSS modules with design tokens.' },
    { group: ['@vanilla-extract/*'], message: 'Use CSS modules with design tokens.' },

    // Icon Libraries
    { group: ['react-icons', 'react-icons/*'], message: 'Use <Icon name="..." /> from @/design-system' },
    { group: ['@heroicons/*'], message: 'Use <Icon name="..." /> from @/design-system' },
    { group: ['phosphor-react', '@phosphor-icons/*'], message: 'Use <Icon name="..." /> from @/design-system' },
    { group: ['@fortawesome/*'], message: 'Use <Icon name="..." /> from @/design-system' },
    { group: ['@tabler/icons-react'], message: 'Use <Icon name="..." /> from @/design-system' },
  ]
}],
```

#### 1.2 Add Stylelint

**Install:**
```bash
npm install -D stylelint stylelint-config-standard
```

**New File:** `stylelint.config.js`
```javascript
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    // Block hardcoded colors
    'color-no-hex': true,
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla'],

    // Warn on !important (some legitimate uses)
    'declaration-no-important': [true, { severity: 'warning' }],

    // Enforce camelCase for CSS module classes
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      { message: 'Use camelCase for CSS module class names' }
    ],
  },
  overrides: [
    {
      // Allow raw colors only in tokens file
      files: ['**/1-tokens/**/*.css', '**/tokens.css'],
      rules: {
        'color-no-hex': null,
        'function-disallowed-list': null,
      }
    }
  ]
};
```

**Update:** `package.json`
```json
{
  "scripts": {
    "stylelint": "stylelint 'src/**/*.css'",
    "stylelint:fix": "stylelint 'src/**/*.css' --fix",
    "build": "npm run validate:all && npm run lint && npm run stylelint && vite build"
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "src/**/*.css": ["stylelint --fix", "prettier --write"]
  }
}
```

#### 1.3 Fix Existing Violations

Fix the 6 CSS files listed above by replacing hardcoded colors with design tokens.

#### 1.4 Add CI Pipeline

**New File:** `.github/workflows/validate.yml`
```yaml
name: Design System Validation

on:
  push:
    branches: [main, 'feature/*']
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run Stylelint
        run: npm run stylelint

      - name: Run Design System Validation
        run: npm run validate

      - name: Run Icon Validation
        run: npm run validate:icons

      - name: Run TypeScript Check
        run: npm run typecheck

      - name: Build
        run: npm run build
```

#### 1.5 Remove Skip Script

**File:** `package.json`
- Remove `"build:skip-validation"` script if it exists

---

### Phase 2: Important (~3 hours)

#### 2.1 Detect Inline SVG

**File:** `.eslintrc.js` (add to prototype overrides)
```javascript
{
  files: ['src/prototypes/**/*.tsx', 'src/examples/**/*.tsx'],
  rules: {
    'no-restricted-syntax': ['warn',
      // Existing className rule...
      {
        selector: 'JSXElement[openingElement.name.name="svg"]',
        message: 'Use <Icon name="..." /> from design system instead of inline SVG.'
      }
    ]
  }
}
```

#### 2.2 Block `<style>` Tags

**File:** `.eslintrc.js` (global rules)
```javascript
'no-restricted-syntax': ['error', {
  selector: 'JSXElement[openingElement.name.name="style"]',
  message: 'Do not inject styles via <style> tags. Use CSS modules.'
}]
```

#### 2.3 Track eslint-disable Comments

**File:** `.eslintrc.js`
```javascript
'no-warning-comments': ['warn', {
  terms: ['eslint-disable'],
  location: 'anywhere'
}]
```

#### 2.4 Warn on @ts-ignore

**File:** `.eslintrc.js`
```javascript
'@typescript-eslint/ban-ts-comment': ['warn', {
  'ts-expect-error': 'allow-with-description',
  'ts-ignore': true,
  'ts-nocheck': true,
}]
```

#### 2.5 Expand className Restriction

**File:** `.eslintrc.js` (prototype overrides)

Update the component list:
```javascript
selector: 'JSXAttribute[name.name="className"][parent.name.name=/^(Button|IconButton|ComboButton|Card|Input|Select|Badge|Chip|Heading|Text|Link|Icon|Modal|Table|List|Tabs|Accordion|Alert|Banner|Callout|Tooltip|Popover|Dropdown|Drawer)$/]'
```

---

### Phase 3: Future Nice-to-Haves

- [ ] CSS variable override detection (custom script to flag `--ink-*` definitions outside tokens.css)
- [ ] Primitive token usage warning (warn when using `--ink-cobalt-100` instead of semantic `--ink-button-*`)
- [ ] Component duplication detection (flag new Button.tsx files outside design-system/)
- [ ] eslint-disable audit report (weekly report of disable comment usage)
- [ ] GitHub branch protection rules (require PR, status checks, reviews)

---

## Enforcement Matrix

| Check | Commit | Build | CI | Merge |
|-------|--------|-------|-----|-------|
| ESLint errors | BLOCK | BLOCK | BLOCK | BLOCK |
| ESLint warnings | PASS | PASS | PASS | PASS |
| Stylelint errors | BLOCK | BLOCK | BLOCK | BLOCK |
| Stylelint warnings | PASS | PASS | PASS | PASS |
| TypeScript errors | PASS | BLOCK | BLOCK | BLOCK |
| Validation scripts | PASS | BLOCK | BLOCK | BLOCK |
| Branch protection | - | - | - | BLOCK |

---

## Success Criteria

After implementation, the following should be true:

- [ ] `npm install @mui/material` followed by import → ESLint ERROR
- [ ] `npm install styled-components` followed by import → ESLint ERROR
- [ ] Adding `#ff0000` to any CSS file → Stylelint ERROR (except tokens.css)
- [ ] Adding `<svg>` in prototype → ESLint WARNING
- [ ] Adding `<style>` tag anywhere → ESLint ERROR
- [ ] `git commit --no-verify` with violations → CI FAILS on push
- [ ] All 6 CSS files with hardcoded colors → FIXED
- [ ] `npm run build` → Runs all validations before build

---

## Appendix: Files to Modify

| File | Action | Phase |
|------|--------|-------|
| `.eslintrc.js` | Update import restrictions, add rules | P1, P2 |
| `package.json` | Add stylelint, update scripts, update lint-staged | P1 |
| `stylelint.config.js` | CREATE | P1 |
| `.github/workflows/validate.yml` | CREATE | P1 |
| `Badge.module.css` | Fix hardcoded colors | P1 |
| `Table.module.css` | Fix hardcoded colors | P1 |
| `FilterTag.module.css` | Fix hardcoded colors | P1 |
| `Modal.module.css` | Fix hardcoded colors | P1 |
| `Tabs.module.css` | Fix hardcoded colors | P1 |
| `LocalNav.module.css` | Fix hardcoded colors | P1 |
