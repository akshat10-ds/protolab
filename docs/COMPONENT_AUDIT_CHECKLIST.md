# Component Audit Checklist

Use this checklist when reviewing new or modified components to ensure design system compliance.

---

## Pre-Merge Checklist

### Design Token Compliance

- [ ] **No hardcoded colors** - All colors use `var(--ink-*)` tokens
  - No hex values (`#fff`, `#260559`)
  - No rgb/rgba values (`rgba(0,0,0,0.5)`)
  - No named colors (`white`, `black`, `red`)

- [ ] **No hardcoded spacing** - All spacing uses spacing tokens
  - Use `var(--ink-spacing-*)` for padding/margin/gap
  - Document exceptions where pixel-perfect DocuSign parity requires specific values

- [ ] **No hardcoded typography** - Font properties use tokens
  - `var(--ink-font-*)` for font-size, line-height, weight

### Styling Patterns

- [ ] **No inline styles** in React components
  - No `style={{ ... }}` props
  - Use CSS modules with token references instead

- [ ] **CSS modules only** - No global CSS or styled-components
  - File naming: `ComponentName.module.css`
  - Import pattern: `import styles from './ComponentName.module.css';`

- [ ] **Token import present** - CSS modules import tokens
  ```css
  @import '../../1-tokens/tokens.css';
  ```

### Layer Hierarchy

- [ ] **Correct layer placement** - Component is in appropriate layer
  - Layer 3 (Primitives): Atomic, single-purpose components
  - Layer 4 (Composites): Combinations of primitives
  - Layer 5 (Patterns): Reusable UI patterns
  - Layer 6 (Layouts): Page-level templates

- [ ] **Import direction** - Only imports from lower layers
  - Layer 6 can import from 5, 4, 3, 2
  - Layer 5 can import from 4, 3, 2
  - Layer 4 can import from 3, 2
  - Layer 3 can import from 2
  - Never import sideways or upward

- [ ] **Uses design system components** - No external UI libraries
  - No `lucide-react` direct imports (use Icon component)
  - No `@radix-ui` direct imports
  - No `@headlessui` direct imports

### Icon Usage

- [ ] **Icon component only** - No direct lucide-react imports
  ```tsx
  // ✅ Correct
  import { Icon } from '@/design-system';
  <Icon name="search" size="medium" />

  // ❌ Wrong
  import { Search } from 'lucide-react';
  ```

- [ ] **Valid icon names** - All icon names exist in iconPaths.ts
  - Check `src/design-system/3-primitives/Icon/iconPaths.ts`
  - Common mappings: `mail`→`envelope`, `users`→`people`, `grid`→`layout-grid`

### Accessibility

- [ ] **Semantic HTML** - Appropriate elements used
  - Buttons for actions, links for navigation
  - Proper heading hierarchy

- [ ] **ARIA labels** - Interactive elements have accessible names
  - Icon-only buttons have `aria-label`
  - Form inputs have associated labels

- [ ] **Keyboard navigation** - All interactive elements focusable
  - Tab order makes sense
  - Focus states visible

---

## Common Violations & Fixes

### Hardcoded Colors

**Problem:**
```css
.button {
  background-color: #260559;
  color: rgba(25, 24, 35, 0.9);
}
```

**Fix:**
```css
.button {
  background-color: var(--ink-button-primary-bg);
  color: var(--ink-font-default);
}
```

### Inline Styles

**Problem:**
```tsx
<div style={{ maxHeight: isCollapsed ? '0' : '500px' }}>
```

**Fix:**
```tsx
// Component
<div className={`${styles.content} ${isCollapsed ? styles.collapsed : ''}`}>

// CSS Module
.content {
  max-height: 1000px;
  transition: max-height var(--ink-transition-fast);
}
.collapsed {
  max-height: 0;
}
```

### Direct Icon Import

**Problem:**
```tsx
import { Search, User, Settings } from 'lucide-react';
<Search size={24} />
```

**Fix:**
```tsx
import { Icon } from '@/design-system';
<Icon name="search" size="medium" />
```

---

## Quick Reference: Token Categories

| Category | Token Pattern | Example |
|----------|--------------|---------|
| Colors (BG) | `--ink-bg-*` | `var(--ink-bg-default)` |
| Colors (Text) | `--ink-font-*` | `var(--ink-font-default)` |
| Colors (Border) | `--ink-border-*` | `var(--ink-border-default)` |
| Spacing | `--ink-spacing-*` | `var(--ink-spacing-200)` |
| Typography | `--ink-font-*-size` | `var(--ink-font-body-m-size)` |
| Radius | `--ink-radius-*` | `var(--ink-radius-sm)` |
| Shadows | `--ink-shadow-*` | `var(--ink-shadow-md)` |
| Transitions | `--ink-transition-*` | `var(--ink-transition-fast)` |

---

## Automated Checks (Future)

Consider adding these automated checks:

1. **Stylelint** - Flag hardcoded colors
   ```json
   {
     "rules": {
       "color-no-hex": true,
       "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla"]
     }
   }
   ```

2. **ESLint** - Flag lucide-react imports
   ```json
   {
     "rules": {
       "no-restricted-imports": ["error", {
         "paths": ["lucide-react"]
       }]
     }
   }
   ```

3. **Pre-commit hook** - Run checks before commit
