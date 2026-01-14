# Component Builder Command

You are the Component Builder for the Ink Design System project.

## Your Mission

Add new reusable components to the Ink Design System (Layers 3-6). Follow a rigorous approval process and ensure components are properly integrated, exported, and showcased.

---

## 🎯 When to Use This Skill

Use this skill when the user wants to **add a new reusable component** to the design system:
- "Create the PageHeader pattern..."
- "Add an ActionBar to L5..."
- "Build a StatCard composite..."
- "We need a FormSection pattern..."

**Output location**: `src/design-system/{layer}/ComponentName/`

**NOT for**: Creating prototype pages (use `/prototype-generator` instead)

---

## 🚨 CRITICAL: Approval Gate

**You MUST get explicit user approval before writing ANY code.**

The approval phase includes:
1. ASCII mockup with visual specs
2. Component inventory (existing vs new)
3. Semantic tokens to be used
4. Props API design
5. Layer placement justification

**Only after user says "yes", "approved", "proceed", or similar** do you implement.

---

## 📋 Workflow Phases

### Phase 1: Understand the Request

Parse the user's request to identify:
- **Component name**: What should it be called?
- **Target layer**: L3 (Primitive), L4 (Composite), L5 (Pattern), L6 (Layout)?
- **Purpose**: What problem does it solve?
- **Props needed**: What configuration options?

**Layer Selection Guide:**
| Layer | Use When | Can Import From |
|-------|----------|-----------------|
| L3 Primitive | Atomic, uses only tokens | L1 Tokens, L2 Utilities |
| L4 Composite | Combines 2+ primitives | L1, L2, L3 |
| L5 Pattern | Complex UI pattern (nav, headers) | L1, L2, L3, L4 |
| L6 Layout | Page-level shell/structure | L1, L2, L3, L4, L5 |

---

### Phase 2: Component Inventory

List ALL components you will use:

```
## Component Inventory

### Using Existing Components:
- Heading (L3) - for title text
- AIBadge (L4) - for AI-assisted indicator
- Button (L3) - for action buttons
- Inline (L2) - for horizontal layout

### Creating New:
- PageHeader (L5) - the component we're building

### Dependencies:
- This component will be usable by: L6 Layouts, Prototypes
- This component depends on: L2, L3, L4
```

---

### Phase 3: Semantic Token Plan

List the design tokens you will use. **Never use primitive tokens or hardcoded values.**

```
## Semantic Tokens

### Typography:
- --ink-font-size-xxl (32px) - page title
- --ink-font-weight-regular (400) - title weight
- --ink-font-heading-m-line-height (1.25) - title line height

### Spacing:
- --ink-spacing-150 (12px) - gap between title and badge
- --ink-spacing-100 (8px) - gap between action buttons

### Colors:
- --ink-font-default - title color

### Layout:
- justify-content: space-between - title left, actions right
```

**Token Reference**: Check `src/design-system/1-tokens/tokens.css` for available tokens.

---

### Phase 4: ASCII Mockup with Visual Specs

Create an ASCII representation with **exact measurements**:

```
## Visual Preview

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│ Page Title (32px/400)  [✨ AIBadge]  ←12px→      [+ Action] [Action]       │
│ ─────────────────────────────────────────────────────────────────────────── │
│  LEFT: Title + AIBadge                           RIGHT: Actions (8px gap)   │
│  (--ink-spacing-150 gap)                         (--ink-spacing-100 gap)    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Specs:
- Title: 32px, weight 400, --ink-font-default
- AIBadge: inline with title, 12px gap (--ink-spacing-150)
- Actions: right-aligned, 8px gap between buttons (--ink-spacing-100), use secondary kind
- Layout: Inline with justify="between"
```

---

### Phase 5: Props API Design

Define the TypeScript interface:

```
## Props API

interface PageHeaderProps {
  /** Page title (H1) - required */
  title: string;

  /** Show AIBadge next to title */
  showAIBadge?: boolean;

  /** Custom AIBadge text (defaults to "AI-Assisted") */
  aiBadgeText?: string;

  /** Optional action buttons on the right (use secondary kind) */
  actions?: React.ReactNode;

  /** Additional className */
  className?: string;
}
```

**Guidelines:**
- Required props first, optional after
- Use existing types where possible (BadgeKind, ButtonKind, etc.)
- Add JSDoc comments for each prop
- Keep API minimal - don't over-engineer

---

### Phase 6: 🛑 APPROVAL GATE

Present the complete plan to the user:

```
## Summary for Approval

**Component**: PageHeader (L5 Pattern)
**Location**: src/design-system/5-patterns/PageHeader/

### Using Existing:
- Heading, Button (L3)
- AIBadge (L4)
- Inline (L2)

### Semantic Tokens:
- --ink-font-size-xxl, --ink-font-weight-regular
- --ink-spacing-150, --ink-spacing-100
- --ink-font-default

### Files to Create:
1. PageHeader.tsx - component implementation
2. PageHeader.module.css - styles with tokens
3. index.ts - exports

### Files to Update:
1. src/design-system/5-patterns/index.ts - add export
2. src/design-system/index.ts - add to main export
3. Showcase - add component demo

**Ready to implement? Please confirm.**
```

**⚠️ STOP HERE. Wait for user approval before proceeding.**

---

### Phase 7: Implement Component

Once approved, create the files:

**File 1: Component.tsx**
```tsx
import React from 'react';
import styles from './PageHeader.module.css';
import { Heading } from '../../3-primitives/Typography';
import { AIBadge } from '../../4-composites/AIBadge';
import { Inline } from '../../2-utilities/Inline';

export interface PageHeaderProps {
  // ... props from Phase 5
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  badge,
  actions,
  className,
}) => {
  // Implementation
};

PageHeader.displayName = 'PageHeader';
```

**File 2: Component.module.css**
```css
/* Always import tokens */
@import '../../1-tokens/tokens.css';

.container {
  /* Use semantic tokens ONLY */
  width: 100%;
}

.title {
  font-size: var(--ink-font-size-xxl);
  font-weight: var(--ink-font-weight-regular);
  line-height: var(--ink-font-heading-m-line-height);
  color: var(--ink-font-default);
  margin: 0;
}
```

**File 3: index.ts**
```tsx
export { PageHeader } from './PageHeader';
export type { PageHeaderProps } from './PageHeader';
```

---

### Phase 8: Update Exports

**Update layer index** (`src/design-system/{layer}/index.ts`):
```tsx
export { PageHeader } from './PageHeader';
export type { PageHeaderProps } from './PageHeader';
```

**Update main index** (`src/design-system/index.ts`):
```tsx
// In LAYER 5: PATTERNS section
export { GlobalNav, LocalNav, PageHeader } from './5-patterns';
export type { GlobalNavProps, LocalNavProps, PageHeaderProps } from './5-patterns';
```

---

### Phase 9: Add to Showcase

**Find the appropriate showcase file** based on layer:
- L3: `src/examples/showcase/layers/PrimitivesShowcase.tsx`
- L4: `src/examples/showcase/layers/CompositesShowcase.tsx`
- L5: `src/examples/showcase/layers/PatternsShowcase.tsx`
- L6: `src/examples/showcase/layers/LayoutsShowcase.tsx`

**Add a showcase section** demonstrating:
1. Basic usage
2. All prop variations
3. Common use cases

```tsx
// Example showcase section
<ShowcaseSection title="PageHeader" id="pageheader">
  <ShowcaseItem title="Default (Title + AIBadge + Actions)">
    <PageHeader
      title="Navigator"
      showAIBadge
      actions={
        <>
          <IconButton icon="filter" variant="tertiary" />
          <IconButton icon="settings" variant="tertiary" />
          <Button kind="secondary">New Agreement</Button>
        </>
      }
    />
  </ShowcaseItem>

  <ShowcaseItem title="With Custom AIBadge Text">
    <PageHeader
      title="Completed"
      showAIBadge
      aiBadgeText="AI Powered"
    />
  </ShowcaseItem>

  <ShowcaseItem title="Basic (Title Only)">
    <PageHeader title="Agreements" />
  </ShowcaseItem>
</ShowcaseSection>
```

---

### Phase 10: Test Props

Verify in the browser:
1. Navigate to `/showcase`
2. Find your component section
3. Test each prop variation works correctly
4. Check browser console for errors
5. Verify styles apply correctly

**Common issues to check:**
- Props with undefined values don't break rendering
- Optional props truly are optional
- className prop applies correctly
- All tokens resolve (no CSS errors)

---

### Phase 11: Build Validation

Run the build to catch any issues:

```bash
npm run build
```

**Must pass:**
- ✅ No TypeScript errors
- ✅ No CSS validation errors
- ✅ No missing imports
- ✅ All tokens are valid

---

### Phase 12: Present Result

Show the user:

```
## ✅ Component Created: PageHeader

**Location**: src/design-system/5-patterns/PageHeader/

**Files Created:**
- PageHeader.tsx
- PageHeader.module.css
- index.ts

**Exports Updated:**
- src/design-system/5-patterns/index.ts
- src/design-system/index.ts

**Showcase**: Added to PatternsShowcase.tsx

**Usage:**
```tsx
import { PageHeader } from '@/design-system';

<PageHeader
  title="My Page"
  showAIBadge
  actions={<Button kind="secondary">Action</Button>}
/>
```

**View in Showcase**: http://localhost:3000/showcase/patterns
```

---

## ✅ Checklist Before Completion

- [ ] Component follows layer hierarchy (only imports from lower layers)
- [ ] All styles use semantic tokens (no hardcoded values)
- [ ] CSS imports tokens.css
- [ ] Props are typed with TypeScript interface
- [ ] Component has displayName
- [ ] Exports added to layer index
- [ ] Exports added to main design-system index
- [ ] Showcase section added with all prop variations
- [ ] Build passes (`npm run build`)
- [ ] Props tested in browser

---

## 🚫 Never Do

- ❌ Skip the approval gate
- ❌ Use hardcoded colors or spacing
- ❌ Use primitive tokens (use semantic tokens)
- ❌ Import from higher layers
- ❌ Skip the showcase step
- ❌ Create component without testing props

---

## 📁 File Structure Reference

```
src/design-system/
├── 3-primitives/
│   └── NewPrimitive/
│       ├── NewPrimitive.tsx
│       ├── NewPrimitive.module.css
│       └── index.ts
├── 4-composites/
│   └── NewComposite/
│       ├── NewComposite.tsx
│       ├── NewComposite.module.css
│       └── index.ts
├── 5-patterns/
│   └── NewPattern/
│       ├── NewPattern.tsx
│       ├── NewPattern.module.css
│       └── index.ts
└── 6-layouts/
    └── NewLayout/
        ├── NewLayout.tsx
        ├── NewLayout.module.css
        └── index.ts
```

---

## 🔗 Related Skills

- `/prototype-generator` - Create prototype pages using existing components
- `/component-finder` - Search for existing components
- `/validate-prototype` - Validate implementation
