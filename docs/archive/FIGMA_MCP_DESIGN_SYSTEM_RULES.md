# Figma MCP Design System Integration Rules

This document provides comprehensive guidelines for integrating Figma designs into the Ink Design System using the Model Context Protocol (MCP).

## Table of Contents
1. [Design Token System](#1-design-token-system)
2. [Component Library Architecture](#2-component-library-architecture)
3. [CSS Architecture & Styling Methodology](#3-css-architecture--styling-methodology)
4. [Asset & Icon Management](#4-asset--icon-management)
5. [Framework & Build System](#5-framework--build-system)
6. [Project Structure & Organization](#6-project-structure--organization)
7. [Figma to Code Translation Guide](#7-figma-to-code-translation-guide)

---

## 1. Design Token System

### 1.1 Token Location & Structure

**Primary Token File:** `src/design-system/styles/tokens.css`

The design system uses a **three-tiered token architecture** defined in CSS custom properties:

#### Tier 1: Color Primitives
Base color palette with 10-140 scale for each color family:

```css
/* Color families available */
--ink-cobalt-{10-140}     /* Primary purple/blue */
--ink-neutral-{10-140}    /* Neutral grays */
--ink-ecru-{10-140}       /* Warm grays */
--ink-red-{10-140}        /* Error/danger states */
--ink-green-{10-140}      /* Success states */
--ink-orange-{10-140}     /* Warning states */
--ink-cyan-{10-140}       /* Accent cyan */
--ink-purple-{10-140}     /* Accent purple */
--ink-fuchsia-{10-140}    /* Accent fuchsia */

/* Special values */
--ink-black-100
--ink-white-100
--ink-neutral-fade-{0-90}  /* Opacity variants */
--ink-white-fade-{5-90}    /* Opacity variants */
```

#### Tier 2: Semantic Tokens
Purpose-driven tokens that reference primitives:

```css
/* Backgrounds */
--ink-bg-default
--ink-bg-accent
--ink-bg-canvas-document
--ink-bg-canvas-page
--ink-bg-error
--ink-bg-success
--ink-bg-warning

/* Typography */
--ink-font-default
--ink-font-accent
--ink-font-disabled
--ink-font-error
--ink-font-success
--ink-font-warning
--ink-font-inverse

/* Borders */
--ink-border-default
--ink-border-accent
--ink-border-error
--ink-border-success
--ink-border-focus

/* Icons */
--ink-icon-color-default
--ink-icon-color-accent
--ink-icon-color-disabled
--ink-icon-color-error
--ink-icon-color-success
```

#### Tier 3: Component-Specific Tokens

**Button Tokens:**
```css
/* Brand buttons - Bright vibrant purple */
--ink-button-brand-bg
--ink-button-brand-bg-hover
--ink-button-brand-bg-active
--ink-button-brand-text

/* Primary buttons - Dark purple */
--ink-button-primary-bg
--ink-button-primary-bg-hover
--ink-button-primary-bg-active
--ink-button-primary-text

/* Secondary/Tertiary/Danger variants available */
```

**Form Tokens:**
```css
/* Form backgrounds */
--ink-form-bg-default
--ink-form-bg-disabled
--ink-form-bg-error
--ink-form-bg-selected

/* Form borders */
--ink-form-border-default
--ink-form-border-hover
--ink-form-border-active
--ink-form-border-error

/* Form states */
--ink-form-thumb-bg-default
--ink-form-thumb-bg-hover
--ink-form-thumb-bg-active
```

**Typography Tokens:**
```css
/* Component-specific font sizes */
--ink-font-badge-size: 12px
--ink-font-button-size: 16px
--ink-font-element-label-size: 14px

/* Semantic text styles */
--ink-font-detail-{xs|s}-size
--ink-font-body-{s|m|l|xl}-size
--ink-font-heading-{xxs|xs|s|m}-size
--ink-font-display-{xs|s|m|l|xl}-size
```

### 1.2 Typography System

```css
/* Font Family */
--ink-font-family: 'DS Indigo', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif

/* Font Sizes */
--ink-font-size-xs: 12px
--ink-font-size-sm: 14px
--ink-font-size-md: 16px
--ink-font-size-lg: 18px
--ink-font-size-xl: 20px
--ink-font-size-2xl: 24px
--ink-font-size-3xl: 30px
--ink-font-size-4xl: 36px

/* Font Weights */
--ink-font-weight-light: 300
--ink-font-weight-regular: 400
--ink-font-weight-medium: 500
--ink-font-weight-semibold: 600
--ink-font-weight-bold: 700

/* Line Heights */
--ink-line-height-tight: 1.25
--ink-line-height-normal: 1.5
--ink-line-height-relaxed: 1.75
```

### 1.3 Spacing System

```css
/* Standard spacing scale */
--ink-spacing-0: 0px
--ink-spacing-50: 4px
--ink-spacing-100: 8px
--ink-spacing-150: 12px
--ink-spacing-200: 16px
--ink-spacing-250: 20px
--ink-spacing-300: 24px
--ink-spacing-350: 36px
--ink-spacing-400: 32px
--ink-spacing-500: 40px
--ink-spacing-600: 48px
--ink-spacing-700: 64px

/* Legacy aliases (for compatibility) */
--ink-spacing-1 through --ink-spacing-16
```

### 1.4 Border Radius

```css
--ink-radius-size-xs: 4px
--ink-radius-size-s: 8px
--ink-radius-size-m: 12px
--ink-radius-size-l: 16px
--ink-radius-size-full: 9999px
```

### 1.5 Elevation & Shadows

```css
/* Elevation shadows */
--ink-elevation-low: 0 4px 8px 0 rgba(19, 0, 50, 0.15)
--ink-elevation-medium: 0 8px 20px 0 rgba(19, 0, 50, 0.15)
--ink-elevation-high: 0 8px 32px 0 rgba(19, 0, 50, 0.15)

/* Standard shadows */
--ink-shadow-xs through --ink-shadow-xl
--ink-shadow-elevated
```

### 1.6 Dark Theme Support

**All semantic tokens have `-inverse` variants** for dark theme support:

```css
/* Example: Button inverse variants */
--ink-button-primary-bg-inverse
--ink-form-bg-default-inverse
--ink-icon-color-default-inverse
```

---

## 2. Component Library Architecture

### 2.1 Component Organization

**Base Path:** `src/design-system/components/`

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx           # Component implementation
├── ComponentName.module.css    # CSS Module styles
├── ComponentName.stories.tsx   # Storybook stories (optional)
└── index.ts                    # Public exports
```

### 2.2 Available Components (50+)

**Action Components:**
- Button
- IconButton
- ComboButton

**Form Components:**
- Input
- Select
- Checkbox
- Radio
- Switch
- SearchInput
- TextArea
- Slider
- DatePicker
- FileInput
- FileUpload
- ComboBox

**Layout Components:**
- Card (with Header, Body, Footer)
- Stack
- Grid
- Divider
- Accordion

**Navigation Components:**
- Breadcrumb
- Pagination
- Tabs

**Feedback Components:**
- Alert
- Spinner
- ProgressBar
- Skeleton
- StatusLight
- AlertBadge
- Callout
- Banner

**Display Components:**
- Badge
- Avatar
- Chip
- FilterTag
- Typography (Heading, Text)
- Table
- List
- Link

**Overlay Components:**
- Modal
- Tooltip
- Popover
- Dropdown
- Drawer

### 2.3 Component Patterns (Advanced Compositions)

**Location:** `src/design-system/patterns/`

Complex UI patterns built from components:

- **VerticalNavigation** - Sidebar navigation with collapsible sections
- **GlobalNav** - Top-level application navigation
- **LocalNav** - Context-specific navigation

### 2.4 Component Export Pattern

All components are exported from `src/design-system/components/index.ts`:

```typescript
// Action Components
export { Button } from './Button';
export type { ButtonProps, ButtonKind, ButtonSize } from './Button';

// Import components using:
import { Button, Input, Modal } from '@/design-system/components';
```

### 2.5 Component Props Pattern

**Typical component interface structure:**

```typescript
export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  /** Variant/kind of component */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /** Size variants */
  size?: 'small' | 'medium' | 'large';

  /** State props */
  disabled?: boolean;
  loading?: boolean;

  /** Style modifiers */
  fullWidth?: boolean;

  /** Accessibility */
  accessibilityText?: string;

  /** Children */
  children?: React.ReactNode;

  /** Additional className */
  className?: string;
}
```

---

## 3. CSS Architecture & Styling Methodology

### 3.1 CSS Modules Pattern

**Critical: All Ink components use CSS Modules with design tokens**

#### Required CSS Module Structure:

```css
/* ComponentName.module.css */

/* ALWAYS import tokens first */
@import '../../styles/tokens.css';

.componentName {
  /* Use semantic tokens, not primitives */
  background: var(--ink-bg-default);
  color: var(--ink-font-default);
  border: 1px solid var(--ink-border-default);

  /* Component-specific tokens when available */
  font-size: var(--ink-font-button-size);
  line-height: var(--ink-font-button-line-height);

  /* Standard token usage */
  padding: var(--ink-spacing-200);
  border-radius: var(--ink-radius-size-xs);
  transition: all var(--ink-transition-fast);
}

/* State variants */
.componentName:hover {
  background: var(--ink-bg-accent);
}

.componentName:disabled {
  opacity: var(--ink-opacity-disabled);
}
```

#### TypeScript Integration:

```typescript
import styles from './ComponentName.module.css';
import { cn } from '@/lib/utils';

const ComponentName = ({ variant, className, ...props }) => {
  return (
    <div
      className={cn(
        styles.componentName,
        styles[variant],
        className
      )}
      {...props}
    />
  );
};
```

### 3.2 Token Selection Rules

**✅ DO:**
```css
/* Use semantic tokens */
background: var(--ink-message-bg-alert);
color: var(--ink-font-error);
border: 1px solid var(--ink-border-error);
```

**❌ DON'T:**
```css
/* Don't use color primitives directly */
background: var(--ink-red-90);
color: var(--ink-red-100);
```

### 3.3 Global CSS & Conflicts

**Global CSS files:**
- `src/index.css` - TailwindCSS base + custom global styles
- `src/styles/fonts.css` - Font definitions

**Critical Conflict Warning:**

Global CSS applies semantic HTML styles that can override CSS Module styles:

```css
/* In index.css - AFFECTS ALL ELEMENTS */
p, span {
  font-family: var(--font-family-primary);
  font-size: var(--text-base);
  font-weight: var(--font-weight-regular);
  line-height: 1.5;
}

button {
  font-size: var(--text-base);
}
```

**Mitigation Strategy:**

1. **Avoid semantic HTML wrappers** when precise styling is needed:
```typescript
// ❌ BAD - <p> will inherit global styles
<div className={styles.badge}>
  <p>{text}</p>
</div>

// ✅ GOOD - Render text directly
<div className={styles.badge}>
  {text}
</div>
```

2. **Use CSS Module specificity** to override globals:
```css
.badge {
  font-size: var(--ink-font-badge-size) !important;
  line-height: var(--ink-font-badge-line-height);
}
```

### 3.4 Responsive Design Patterns

```css
/* Use design system breakpoints */
@media (min-width: var(--ink-breakpoint-s)) {
  /* 768px - Tablet */
}

@media (min-width: var(--ink-breakpoint-m)) {
  /* 980px - Small desktop */
}

@media (min-width: var(--ink-breakpoint-l)) {
  /* 1280px - Desktop */
}
```

### 3.5 Focus & Accessibility Styles

```css
.interactive:focus-visible {
  outline: var(--ink-focus-width) solid var(--ink-focus-color);
  outline-offset: var(--ink-focus-outset-s);
}

/* Alternative: Inset focus ring */
.interactive:focus-visible {
  outline: var(--ink-focus-inner);
  outline-offset: var(--ink-focus-inner-offset);
}
```

---

## 4. Asset & Icon Management

### 4.1 Icon System

**Icon Library:** `lucide-react` (npm package)

**Implementation Pattern:**

```typescript
// Internal icon wrapper (if available)
import { Icon } from '@/design-system/icons';
import type { IconName } from '@/design-system/icons';

// Direct lucide-react usage
import { Home, Settings, User } from 'lucide-react';

// In component
<Home size={20} color="var(--ink-icon-color-default)" />
```

**Icon Sizing Tokens:**
```css
--ink-icon-size-s: 20px
--ink-icon-size-m: 24px
```

**Icon Color Tokens:**
```css
--ink-icon-color-default
--ink-icon-color-accent
--ink-icon-color-disabled
--ink-icon-color-error
--ink-icon-color-success
--ink-icon-color-subtle
--ink-icon-color-inverse
```

### 4.2 Image Assets

**Location:** `src/assets/`

**Vite Configuration for Assets:**

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    'figma:asset/[hash].png': path.resolve(__dirname, './src/assets/[hash].png')
  }
}
```

**Usage in Components:**

```typescript
import logoImage from '@/assets/image.png';

<img src={logoImage} alt="Logo" />
```

### 4.3 Asset Optimization

- **Format:** PNG, WebP preferred
- **Build output:** Assets copied to `build/assets/`
- **No CDN configuration** - local assets only

---

## 5. Framework & Build System

### 5.1 Technology Stack

```json
{
  "framework": "React 18.3.1",
  "language": "TypeScript",
  "bundler": "Vite 6.3.5",
  "styling": "CSS Modules",
  "routing": "React Router DOM 7.9.4",
  "icons": "lucide-react 0.487.0",
  "forms": "react-hook-form 7.55.0",
  "theme": "next-themes 0.4.6"
}
```

### 5.2 Vite Configuration

**File:** `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext',
    outDir: 'build'
  },
  server: {
    port: 3000,
    open: true
  }
});
```

**Path Alias:** `@` maps to `./src`

```typescript
// Use @ alias for imports
import { Button } from '@/design-system/components';
import { cn } from '@/lib/utils';
```

### 5.3 Build Commands

```bash
# Development server (port 3000)
npm run dev

# Production build (output: build/)
npm run build
```

### 5.4 TypeScript Configuration

- **Strict mode enabled**
- **Module resolution:** ESNext
- **JSX:** react-jsx
- **Path mapping:** `@/*` → `src/*`

---

## 6. Project Structure & Organization

```
inkStarterProject/
├── src/
│   ├── design-system/           # Ink Design System (core)
│   │   ├── components/          # 50+ UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── Button.stories.tsx (optional)
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── index.ts         # Central export
│   │   ├── patterns/            # Complex composed patterns
│   │   │   ├── VerticalNavigation/
│   │   │   ├── GlobalNav/
│   │   │   └── LocalNav/
│   │   ├── styles/              # Design tokens & global styles
│   │   │   └── tokens.css       # Complete token system
│   │   └── icons/               # Icon system (optional)
│   ├── examples/                # Demo pages & layouts
│   │   ├── ComponentShowcase.tsx
│   │   ├── LayoutsDemo.tsx
│   │   └── LayoutInk.tsx
│   ├── components/              # App-level components
│   ├── assets/                  # Images, static assets
│   ├── lib/                     # Utilities
│   │   └── utils.ts             # cn() className utility
│   ├── styles/
│   │   └── fonts.css
│   ├── index.css                # Global CSS + TailwindCSS
│   └── App.tsx                  # Main app with routing
├── public/                      # Static public assets
├── build/                       # Build output (generated)
├── vite.config.ts
├── package.json
├── CLAUDE.md                    # Project instructions
└── FIGMA_MCP_DESIGN_SYSTEM_RULES.md  # This file
```

### 6.1 File Naming Conventions

- **Components:** PascalCase (`Button.tsx`)
- **CSS Modules:** PascalCase + `.module.css` (`Button.module.css`)
- **Utilities:** camelCase (`utils.ts`)
- **Types:** PascalCase with Type/Interface suffix

---

## 7. Figma to Code Translation Guide

### 7.1 Design Token Mapping

When implementing Figma designs, map Figma tokens to Ink tokens:

| Figma Layer Property | Ink Token Category | Example Token |
|---------------------|-------------------|---------------|
| Fill / Background | `--ink-bg-*` | `--ink-bg-default` |
| Text Color | `--ink-font-*` | `--ink-font-default` |
| Stroke / Border | `--ink-border-*` | `--ink-border-default` |
| Corner Radius | `--ink-radius-*` | `--ink-radius-size-xs` |
| Auto Layout Gap | `--ink-spacing-*` | `--ink-spacing-200` |
| Text Style | Component tokens | `--ink-font-button-size` |
| Drop Shadow | `--ink-elevation-*` | `--ink-elevation-low` |
| Icon Color | `--ink-icon-color-*` | `--ink-icon-color-default` |

### 7.2 Component Selection Matrix

**When receiving Figma designs, use these components:**

| Figma Component Type | Ink Component | Notes |
|---------------------|---------------|-------|
| Button | `Button` | 5 variants: brand, primary, secondary, tertiary, danger |
| Text Input | `Input` | Supports prefix/suffix elements |
| Dropdown | `Select` or `Dropdown` | Select for forms, Dropdown for menus |
| Checkbox | `Checkbox` | |
| Radio | `Radio` | |
| Toggle | `Switch` | 3 sizes: small, medium, large |
| Modal | `Modal` | 3 sizes: small, medium, large |
| Card | `Card` | With Header, Body, Footer subcomponents |
| Alert / Banner | `Alert`, `Banner`, `Callout` | Based on prominence |
| Loading Indicator | `Spinner` or `ProgressBar` | Spinner for indeterminate, ProgressBar for progress |
| Navigation | `Tabs`, `Breadcrumb`, `Pagination` | |
| Sidebar Navigation | `VerticalNavigation` pattern | Collapsible with sub-items |

### 7.3 Layout Translation

**Figma Auto Layout → CSS Flexbox/Grid**

```typescript
// Horizontal Auto Layout (row)
<Stack direction="row" gap={16}>
  <Button>First</Button>
  <Button>Second</Button>
</Stack>

// Vertical Auto Layout (column)
<Stack direction="column" gap={24}>
  <Input />
  <Button>Submit</Button>
</Stack>

// Grid layout
<Grid columns={3} gap={16}>
  <Card />
  <Card />
  <Card />
</Grid>
```

### 7.4 State Mapping

| Figma State | React Implementation | CSS Class Pattern |
|-------------|---------------------|-------------------|
| Default | Base component | `.component` |
| Hover | `:hover` pseudo-class | `.component:hover` |
| Active/Pressed | `:active` pseudo-class | `.component:active` |
| Focused | `:focus-visible` | `.component:focus-visible` |
| Disabled | `disabled` prop | `.component:disabled` or `.disabled` |
| Loading | `loading` prop | `.loading` |
| Error | `error` prop | `.error` |

### 7.5 Typography Translation

**Map Figma text styles to Ink typography tokens:**

```css
/* Figma: Display/Large → Ink Display XL */
font-size: var(--ink-font-display-xl-size);
line-height: var(--ink-font-display-xl-line-height);

/* Figma: Heading/Medium → Ink Heading M */
font-size: var(--ink-font-heading-m-size);
line-height: var(--ink-font-heading-m-line-height);

/* Figma: Body/Regular → Ink Body M */
font-size: var(--ink-font-body-m-size);
line-height: var(--ink-font-body-m-line-height);

/* Figma: Detail/Small → Ink Detail S */
font-size: var(--ink-font-detail-s-size);
line-height: var(--ink-font-detail-s-line-height);
```

### 7.6 Color Translation Rules

**Priority order for color selection:**

1. **Component-specific tokens** (if available)
   - Example: `--ink-button-brand-bg`, `--ink-form-border-default`

2. **Semantic tokens** (preferred)
   - Example: `--ink-font-error`, `--ink-bg-success`

3. **Color primitives** (only when necessary)
   - Example: `--ink-cobalt-100`, `--ink-red-90`

**Dark theme considerations:**
- Always check if component needs inverse token support
- Use semantic tokens with `-inverse` suffix when building dark theme variants

### 7.7 Creating New Components from Figma

**Step-by-step process:**

1. **Analyze Figma Component:**
   - Identify variants (size, state, type)
   - Note Auto Layout properties (gap, padding, direction)
   - List color tokens used
   - Document interactive states

2. **Create Component Structure:**
```bash
mkdir src/design-system/components/ComponentName
touch src/design-system/components/ComponentName/ComponentName.tsx
touch src/design-system/components/ComponentName/ComponentName.module.css
touch src/design-system/components/ComponentName/index.ts
```

3. **Implement CSS Module:**
```css
/* ComponentName.module.css */
@import '../../styles/tokens.css';

.componentName {
  /* Map Figma properties to tokens */
  background: var(--ink-bg-default);
  padding: var(--ink-spacing-200);
  border-radius: var(--ink-radius-size-xs);

  /* Use component-specific tokens if available */
  font-size: var(--ink-font-component-size);
}

/* Implement variants */
.variantPrimary {
  background: var(--ink-bg-accent);
}

/* Implement states */
.componentName:hover {
  background: var(--ink-bg-accent-subtle);
}

.componentName:disabled {
  opacity: var(--ink-opacity-disabled);
}
```

4. **Implement TypeScript Component:**
```typescript
// ComponentName.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './ComponentName.module.css';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'medium', disabled, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.componentName,
          styles[variant],
          styles[size],
          disabled && styles.disabled,
          className
        )}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'InkComponentName';
```

5. **Export from index.ts:**
```typescript
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

6. **Add to Central Export:**
```typescript
// src/design-system/components/index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### 7.8 Testing in ComponentShowcase

Add to `src/examples/ComponentShowcase.tsx`:

```typescript
import { ComponentName } from '@/design-system/components';

// In showcase render:
<section>
  <h3>ComponentName</h3>
  <ComponentName variant="primary" size="medium">
    Example Content
  </ComponentName>
</section>
```

**View at:** `http://localhost:3000/showcase`

---

## 8. Common Pitfalls & Solutions

### 8.1 CSS Variables Not Resolving

**Problem:** Token colors not appearing
**Solution:** Ensure `@import '../../styles/tokens.css';` is first line of CSS Module

### 8.2 Font Size Incorrect

**Problem:** Text size doesn't match Figma
**Solution:**
- Use component-specific tokens (`--ink-font-button-size`) not generic tokens
- Check for global CSS overrides from `index.css`
- Avoid wrapping text in `<p>` or `<span>` unless necessary

### 8.3 Import Errors

**Problem:** Cannot resolve module
**Solution:**
- Use `@/design-system` alias
- Ensure component is exported from `components/index.ts`
- Check file path casing (case-sensitive)

### 8.4 Spacing Inconsistencies

**Problem:** Padding/margin doesn't match Figma
**Solution:** Use spacing tokens, not hardcoded values:
```css
/* ✅ Correct */
padding: var(--ink-spacing-200);

/* ❌ Wrong */
padding: 16px;
```

---

## 9. Quick Reference Cheat Sheet

### Essential Imports
```typescript
// Components
import { Button, Input, Modal } from '@/design-system/components';

// Utilities
import { cn } from '@/lib/utils';

// Icons
import { Home, Settings } from 'lucide-react';

// CSS Module
import styles from './Component.module.css';
```

### Common Token Patterns
```css
/* Layout */
padding: var(--ink-spacing-200);
gap: var(--ink-spacing-150);
border-radius: var(--ink-radius-size-xs);

/* Colors */
background: var(--ink-bg-default);
color: var(--ink-font-default);
border: 1px solid var(--ink-border-default);

/* Typography */
font-size: var(--ink-font-body-m-size);
line-height: var(--ink-font-body-m-line-height);
font-weight: var(--ink-font-weight-medium);

/* Effects */
box-shadow: var(--ink-elevation-low);
transition: all var(--ink-transition-fast);
```

### Component Template
```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './Component.module.css';

export interface ComponentProps {
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
  className?: string;
}

export const Component = ({ variant = 'primary', children, className }: ComponentProps) => {
  return (
    <div className={cn(styles.component, styles[variant], className)}>
      {children}
    </div>
  );
};
```

---

## 10. Resources

- **Project Instructions:** `/CLAUDE.md`
- **Design System Learnings:** `/DESIGN_SYSTEM_LEARNINGS.md`
- **Component Showcase:** `http://localhost:3000/showcase`
- **Original Figma:** https://www.figma.com/design/djnNvKVswXBH1r6i67jvcU/Implement-Design-Specifications
- **Lucide Icons:** https://lucide.dev/icons/

---

**Document Version:** 1.0
**Last Updated:** 2025-01-27
**Maintained By:** Ink Design System Team
