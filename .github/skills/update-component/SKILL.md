---
name: update-component
description: Make design-system-compliant updates to existing Ink components. Use for any component modification, styling change, or feature addition that follows the design system hierarchy.
---

# Update Component Skill

You are the Component Editor for the Ink Design System project.

## Purpose

Make targeted, design-system-compliant updates to components while respecting the 6-layer hierarchy, design tokens, and component constraints.

## Required Context

Before making any changes, always read and understand:

1. **COMPONENT_CATALOG.md** - Full list of available components
2. **ARCHITECTURE.md** - 6-layer hierarchy rules
3. **The component's README** - API and usage patterns for that layer
4. **tokens.css** - Available design tokens

## Instructions

### 1. Understand the Request

- Identify which component needs updating
- Categorize the change type:
  - **Visual**: CSS/styling (colors, spacing, borders, typography)
  - **Behavioral**: Props, state, interactions
  - **Structural**: Component composition, sub-components
  - **API**: New props, changed interfaces

### 2. Locate the Component

Components are organized by layer:
```
src/design-system/
├── 1-tokens/       # Design tokens (colors, spacing, etc.)
├── 2-utilities/    # Stack, Grid, Inline, Container, Spacer
├── 3-primitives/   # Button, Input, Card, Badge, etc. (26 components)
├── 4-composites/   # Modal, Table, SearchInput, etc. (18 components)
├── 5-patterns/     # GlobalNav, LocalNav, AIChat (3 patterns)
└── 6-layouts/      # DocuSignShell (1 layout)
```

### 3. Read Before Editing

**ALWAYS** read the full component file before making changes:
- `ComponentName.tsx` - Component logic and props
- `ComponentName.module.css` - Styles
- `index.ts` - Exports

### 4. Apply Design System Constraints

**MUST follow these rules:**

- ❌ **NEVER use hardcoded colors** (no hex, rgb, rgba)
- ❌ **NEVER use inline styles** (`style={{}}`)
- ❌ **NEVER import external UI libraries**
- ❌ **NEVER create new components** for simple changes
- ❌ **NEVER build custom UI** when an existing component can be reused
- ✅ **ALWAYS use design tokens** (`var(--ink-*)`)
- ✅ **ALWAYS use CSS modules** with `@import '../../1-tokens/tokens.css'`
- ✅ **ALWAYS verify icon names** exist in `iconPaths.ts`
- ✅ **ALWAYS check for existing components** before building anything custom

### 4.1 Component Reuse (CRITICAL)

**Before adding any new UI element, ASK: "Does a component already exist for this?"**

The design system has 52 components - use them! Examples:

| Need | DON'T create custom | DO use existing |
|------|---------------------|-----------------|
| Popup/overlay | Custom div + CSS | `Callout`, `Popover`, `Tooltip`, `Modal` |
| Form input | Custom input styling | `Input`, `TextArea`, `Select`, `ComboBox` |
| Button variations | Custom button CSS | `Button`, `IconButton`, `Link` |
| Status indicator | Custom badge | `Badge`, `StatusLight`, `AlertBadge` |
| Layout container | Custom div wrappers | `Card`, `Stack`, `Grid`, `Container` |
| Loading state | Custom spinner | `Spinner`, `Skeleton`, `ProgressBar` |
| Navigation | Custom nav elements | `Tabs`, `Breadcrumb`, `LocalNav`, `GlobalNav` |

**Primitive importing primitive is allowed:**
- AIBadge can import and use `Callout` (both Layer 3)
- Composites can use any primitive
- Check COMPONENT_CATALOG.md for what exists

### 5. Token Reference

Common token patterns:
```css
/* Colors */
var(--ink-bg-default)           /* backgrounds */
var(--ink-font-default)         /* text colors */
var(--ink-border-default)       /* borders */
var(--ink-border-subtle)        /* subtle borders */

/* Spacing */
var(--ink-spacing-50)           /* 4px */
var(--ink-spacing-100)          /* 8px */
var(--ink-spacing-150)          /* 12px */
var(--ink-spacing-200)          /* 16px */
var(--ink-spacing-300)          /* 24px */

/* Border Radius */
var(--ink-radius-size-xs)       /* small */
var(--ink-radius-size-s)        /* medium */
var(--ink-radius-size-m)        /* large */
var(--ink-radius-full)          /* pill/circle */

/* Status Colors */
var(--ink-status-success-bg)
var(--ink-status-info-bg)
var(--ink-status-warn-bg)
var(--ink-status-critical-bg)
```

### 6. If Figma URL Provided

Use the Figma MCP tools:
1. `mcp__figma__get_screenshot` - Visual reference
2. `mcp__figma__get_design_context` - Code/structure hints
3. Map Figma elements → existing Ink components
4. Map Figma tokens → Ink tokens

### 7. Implement Changes

1. Present a clear plan before editing
2. Make changes incrementally
3. Preserve existing functionality
4. Add new props if needed (with defaults for backward compatibility)

### 8. Validate

After changes:
1. Check HMR updates in dev server
2. Verify no TypeScript errors
3. Test the component visually
4. Ensure no design system violations

## Example Workflow

```
User: "Make the AIChat welcome state show suggested questions"

Claude:
1. Reads src/design-system/5-patterns/AIChat/AIChat.tsx
2. Reads src/design-system/5-patterns/AIChat/AIChat.module.css
3. Identifies the Welcome component needs updating
4. "I'll add a `suggestions` prop to show clickable question chips.

   Changes:
   - Add `suggestions?: string[]` prop to AIChatProps
   - Update Welcome component to render suggestions
   - Add CSS for suggestion chips using design tokens

   Should I proceed?"
5. User confirms
6. Implements with design tokens only
7. "Done! The AIChat now shows suggestion chips in the welcome state."
```

## Common Patterns

### Adding a New Prop
```tsx
export interface ComponentProps {
  // ... existing props
  /** New feature description */
  newProp?: boolean;
}

// Use with default
const Component = ({ newProp = false, ...rest }) => {
```

### Adding New Styles
```css
@import '../../1-tokens/tokens.css';

.newElement {
  /* Use tokens only */
  padding: var(--ink-spacing-200);
  background: var(--ink-bg-muted);
  border-radius: var(--ink-radius-size-m);
}
```

### Conditional Rendering
```tsx
{showFeature && (
  <div className={styles.feature}>
    <Text variant="body">Feature content</Text>
  </div>
)}
```
