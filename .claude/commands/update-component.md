# Update Component from Figma

This skill syncs a design system component with its Figma source of truth.

---

## ⚠️ MANDATORY PHASE TRACKING

**YOU MUST complete each phase in order. DO NOT skip phases.**

Before starting, copy this tracker and update it as you progress:

```
## Progress Tracker
- [ ] Phase 0: State Collection (ALL states fetched from Figma FIRST)
- [ ] Phase 1: Analysis (Figma context fetched, props extracted, dimensions parsed)
- [ ] Phase 1.5: Visual Verification (MANDATORY - browser screenshot taken)
- [ ] Phase 2: Planning (user approved proposed changes)
- [ ] Phase 3: Implementation (code changes made)
- [ ] Phase 4: Verification (build passes, visual confirmation)
```

**⚠️ Phase 0 is CRITICAL**: You MUST fetch ALL state screenshots BEFORE any code comparison.

---

> **⚠️ CRITICAL LEARNINGS**:
> 1. Never declare "component already aligned" based on code comparison alone.
> 2. Token NAMES can match while VALUES differ (e.g., `--ink-cta-bg-color-tertiary-default: transparent` vs Figma's `rgba(19,0,50,0.05)`).
> 3. **Fetch ALL relevant Figma nodes** - states, hover effects, description variants - not just the main component.
> 4. **Check ALL interactive states** - hover backgrounds, active borders, disabled opacity.
> 5. **Check ALL text elements** - labels AND descriptions have different typography (size, weight, letter-spacing).
> 6. **Check ALL spacing** - between wrapper and children, label and description, not just the main gap.
> 7. **Check ALL padding** - `padding-block-start`, `padding-block-end`, `padding-inline-*` can add hidden vertical/horizontal space.
> 8. **Container vs Element dimensions** - Figma containers are often LARGER than the actual element to provide space for hover effects. Parse the Figma code carefully to distinguish container size (e.g., 40x24) from actual element size (e.g., 36x24 track inside 40x24 container).
> 9. **FETCH ALL STATES FIRST** - Before ANY analysis, you MUST fetch screenshots for ALL states (hover, active, disabled, focus). Never assume dimensions or styling from a single node.
> **Always complete Phase 0 (State Collection) and Phase 1.5 (Visual Verification) before concluding no changes are needed.**

## Trigger

Use when:
- User provides a Figma URL for a component to update
- User asks to sync a component with Figma
- User requests visual alignment with Figma designs

## Workflow

### Phase 0: State Collection (MANDATORY FIRST STEP)

## 🚨 YOU MUST COMPLETE THIS PHASE BEFORE ANY ANALYSIS 🚨

**Before looking at ANY code or making ANY comparisons**, you MUST collect ALL Figma states.

1. **Parse Figma URL** - Extract fileKey and nodeId from the URL
   ```
   URL: https://figma.com/design/:fileKey/:fileName?node-id=:nodeId
   ```

2. **Get the Component States Frame** - The main component URL shows only ONE state. You MUST:
   - Look in the Figma file for the states frame/section
   - Typically named something like "States", "Variants", or shown as a component set
   - Contains: Default, Hover, Active, Focus, Disabled, Error states

3. **Fetch ALL State Screenshots** - Use `mcp__figma__get_screenshot` for EACH state:

   | State | What to Look For | Node ID to Fetch |
   |-------|------------------|------------------|
   | Default Off | Base styling, border colors, background | Main component |
   | Hover Off | **Hover background effect** (often extends beyond control) | States frame |
   | Active Off | Focus ring, active border color | States frame |
   | Disabled Off | Opacity (often 0.25) | States frame |
   | Default On | Selected state styling | States frame |
   | Hover On | Hover effect position when selected | States frame |
   | Active On | Focus ring when selected | States frame |
   | Disabled On | Disabled + selected combination | States frame |

4. **Document State Node IDs** - Create a table of all fetched states:
   ```
   | State | Node ID | Screenshot Taken |
   |-------|---------|------------------|
   | Default Off | xxx:xxx | ✅ |
   | Hover Off | xxx:xxx | ✅ |
   | Active Off | xxx:xxx | ✅ |
   | Disabled Off | xxx:xxx | ✅ |
   | ...etc | | |
   ```

5. **Parse Figma Code for EACH State** - Don't just look at the main component. Key things to extract:
   - **Container dimensions** vs **Element dimensions** (they are DIFFERENT!)
   - **Hover effect size and positioning** (often extends 4-8px beyond element)
   - **Disabled opacity** (usually 0.25, not muted colors)
   - **Focus ring** style and offset

**Example - Switch Component Dimension Parsing:**
```
Figma shows: Container 40x24, Track 36x24, Thumb 20x20
- Container (40x24) = space for hover effect to extend
- Track (36x24) = actual track element size
- Thumb (20x20) = the movable circle
- Hover circle (32x32) = extends 4px beyond 24px container height
```

**⚠️ COMMON MISTAKE**: Assuming the container size IS the element size. Parse carefully!

---

### 🛑 STOP: Complete Phase 0 before continuing

**Verify you have:**
- [ ] Fetched screenshots for ALL states (default, hover, active, disabled - both on and off)
- [ ] Documented all state node IDs in a table
- [ ] Parsed Figma code for EACH state to extract dimensions
- [ ] Distinguished container dimensions from element dimensions
- [ ] Identified hover effect size and positioning

**DO NOT proceed to Phase 1 until ALL states are collected.**

---

### Phase 1: Analysis

1. **Fetch Figma Context** - Use `mcp__figma__get_design_context` to get design specs
   - Provides CSS-like code, spacing, colors, typography
   - **CRITICAL**: Extract ALL props from the generated TypeScript interface
   - Note the component description which lists all available props

3. **Get Figma Screenshot** - Use `mcp__figma__get_screenshot` for visual reference
   - Shows actual rendered component from Figma

4. **CRITICAL: Request Additional Figma URLs if Needed**

   The main component URL often only shows ONE state. You MUST ask for or find additional URLs showing:

   | What to Check | Why | Example URL Pattern |
   |---------------|-----|---------------------|
   | **All States** | Hover/Active/Disabled have different styling | `?node-id=xxx` (states variant) |
   | **With Description** | Description text has different typography | `?node-id=yyy` (description variant) |
   | **Error States** | Error styling differs from default | `?node-id=zzz` (error variant) |

   **Interactive State Checklist:**
   - [ ] Default state - border color, background
   - [ ] Hover state - border color change, hover background circle/effect
   - [ ] Active/Pressed state - border color (often accent color)
   - [ ] Disabled state - opacity value (e.g., 0.25) vs muted colors
   - [ ] Error state - border color, label color
   - [ ] Focus state - focus ring styling

   **Typography Checklist (for EACH text element):**
   - [ ] Label text - font-size, weight, line-height, color
   - [ ] Description text - font-size, weight, line-height, letter-spacing, color, padding
   - [ ] Error message - font-size, weight, color, icon spacing

   **Spacing Checklist:**
   - [ ] Gap between control and label
   - [ ] Gap between label row and description (often 0, not 8px!)
   - [ ] Padding/margin for nested elements

5. **Extract ALL Figma Props** - From the design context, identify:
   - All props in the TypeScript interface (e.g., `kind`, `size`, `variant`, `dot`, `value`)
   - All boolean flags (e.g., `multipleDigits`, `disabled`, `loading`)
   - All conditional styling based on props
   - Size/dimension values for each variant

   **Example - AlertBadge props from Figma:**
   ```typescript
   type Props = {
     value?: string;
     multipleDigits?: boolean;  // Changes min-width: 16px vs 20px
     dot?: boolean;             // 12x12 dot indicator
     kind?: "Emphasis" | "Subtle";
   };
   ```

5. **Read Current Implementation** - Read the component's files:
   ```
   src/design-system/{layer}/{ComponentName}/
   ├── {ComponentName}.tsx
   ├── {ComponentName}.module.css
   └── index.ts
   ```

6. **Compare and Document ALL Differences** - Create a comprehensive table:

   **Props Comparison:**
   | Figma Prop | Current Prop | Status | Notes |
   |------------|--------------|--------|-------|
   | `kind` | `kind` | ✅ | Match |
   | `multipleDigits` | (derived) | ✅ | Auto-calculated from value |
   | `dot` | `dot` | ✅ | Match |
   | `value` | `value` | ✅ | Match |

   **Styling Comparison (per variant):**
   | Property | Figma | Current | Fix Needed |
   |----------|-------|---------|------------|
   | Height | 20px | 20px | ✅ |
   | Min-width (single) | 16px | 20px | ❌ Change |
   | Min-width (multi) | 20px | 20px | ✅ |
   | Border-radius | 9999px | 12px | ❌ Change |

---

### 🛑 STOP: Complete Phase 1 before continuing

**Verify you have:**
- [ ] Fetched Figma design context
- [ ] Extracted all props from TypeScript interface
- [ ] Read current component implementation
- [ ] Created comparison table of differences

---

### Phase 1.5: Visual Verification (MANDATORY)

## 🚨 THIS PHASE IS NOT OPTIONAL 🚨

**You MUST take a browser screenshot before declaring any component "aligned" or "no changes needed".**

**CRITICAL**: Never declare a component "already aligned" without completing these steps.

1. **Open the showcase in browser** - Navigate to `http://localhost:3000/showcase/{layer}/{component}`
   - **TAKE A SCREENSHOT** of the actual rendered component
   - This screenshot is REQUIRED evidence

2. **Compare visually with Figma** - Side-by-side comparison
   - Does the component LOOK the same? (backgrounds, borders, spacing)
   - Are all states visible? (default, hover, active, disabled)
   - **Specifically check spacing between label and description** - this is often wrong

3. **Verify token VALUES, not just names**
   ```bash
   # Check the ACTUAL value of a token
   grep "token-name" src/design-system/1-tokens/tokens.css
   ```
   - A token can have the correct NAME but wrong VALUE
   - Example: `--ink-cta-bg-color-tertiary-default: transparent` vs Figma's `rgba(19,0,50,0.05)`

4. **Test Interactive Preview**
   - Change props in the Inspector Panel on the right
   - Verify the preview updates in real-time
   - If preview doesn't update, there's a registry/mapping issue

5. **Test all prop combinations**
   - Toggle boolean props (dismissible, disabled, etc.)
   - Change select props (variant, size, etc.)
   - Verify each change reflects in the preview

**Only after visual verification passes can you declare "no changes needed".**

**Red Flags That Require Investigation:**
- Component appears to have no background when Figma shows one
- Props in Inspector Panel don't match Figma props
- Changing props doesn't update the preview
- Colors/spacing look different even if token names match
- **Extra vertical space between label and description** (check for hidden padding)

---

### 🛑 STOP: Complete Phase 1.5 before continuing

**Verify you have:**
- [ ] Taken browser screenshot of component
- [ ] Compared visually with Figma
- [ ] Verified token values (not just names)
- [ ] Tested interactive preview

---

### Phase 2: Planning

Present to user for approval with clear sections:

```
## Proposed Changes

### CSS Changes
- [ ] Remove box-shadow from brand variant
- [ ] Update padding to match Figma (8px vertical)
- [ ] Change border-radius to --ink-radius-size-xs

### Component Logic Changes
- [ ] Tertiary variant always forces compact mode
- [ ] Add new prop: inverted

### Showcase Changes
- [ ] Add tertiary to variants section with icon
- [ ] Show only small/medium sizes
- [ ] Add interactive preview support

### Registry/Documentation Changes
- [ ] Add to componentRegistry
- [ ] Add to InspectorPanel mappings
- [ ] Update prototype-generator constraints
```

### Phase 3: Implementation

Execute each step after user approval:

#### 3.1 Update CSS Module

File: `src/design-system/{layer}/{ComponentName}/{ComponentName}.module.css`

- Replace hardcoded values with design tokens (`var(--ink-*)`)
- Update sizing, padding, margins per Figma
- Remove/add shadows per Figma
- Update border-radius, colors per Figma
- Ensure all colors use semantic tokens

**Token Reference:**
```css
/* Colors */
var(--ink-button-brand-bg)      /* Button brand background */
var(--ink-cta-bg-color-*)       /* CTA backgrounds by state */
var(--ink-cta-border-color-*)   /* CTA borders */

/* Spacing */
var(--ink-spacing-50)           /* 4px */
var(--ink-spacing-100)          /* 8px */
var(--ink-spacing-200)          /* 16px */

/* Border Radius */
var(--ink-radius-size-xs)       /* 4px - buttons */
var(--ink-radius-size-s)        /* 8px */
var(--ink-radius-size-m)        /* 12px */
```

#### 3.2 Update TSX Component

File: `src/design-system/{layer}/{ComponentName}/{ComponentName}.tsx`

- Update prop types if needed
- Add/remove variants
- Update logic (e.g., tertiary ComboButton is always compact)
- Update default values
- Add JSDoc comments for constraints

**Example Logic Change:**
```tsx
// Tertiary variant is always compact (icon-only) per Figma spec
const compact = variant === 'tertiary' ? true : compactProp;
```

#### 3.3 Update Showcase Page

Find the appropriate showcase file:
```
src/examples/showcase/layers/primitives/FormPrimitives.tsx
src/examples/showcase/layers/composites/OverlayComposites.tsx
etc.
```

Update sections:
- **Variants section** - Show all valid variants (include tertiary with icon if needed)
- **Sizes section** - Only show production-proven sizes (typically small/medium)
- **States section** - Default, disabled, hover, loading, etc.
- **With Icons section** - If applicable
- **Special sections** - E.g., "Tertiary (Icon-only)" for ComboButton

#### 3.4 Update Component Registry (CRITICAL for Inspector Panel)

File: `src/editor/registry/componentRegistry.ts`

**IMPORTANT**: The `props` array defines what appears in the Inspector Panel on the right side of the showcase. ALL Figma props that are toggleable/selectable MUST be added here.

Add/update component meta with ALL Figma props:
```typescript
const ComponentNameMeta: ComponentMeta = {
  name: 'ComponentName',
  type: 'ComponentName',
  layer: 4,  // Layer number
  category: 'Action',  // Category
  description: 'Description here',
  acceptsChildren: false,
  icon: 'icon-name',
  props: [
    // Boolean props become toggles in the inspector
    {
      name: 'rootIcon',
      type: 'boolean',
      defaultValue: false,
      description: 'Show icon instead of first item text',
    },
    {
      name: 'showCurrentPage',
      type: 'boolean',
      defaultValue: true,
      description: 'Show or hide the current page item',
    },
    // Select props become dropdowns
    {
      name: 'variant',
      type: 'select',
      options: ['brand', 'primary', 'secondary', 'tertiary'],
      defaultValue: 'brand',
      description: 'Button style',
    },
    // String props become text inputs
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Button',
      description: 'Button text',
    },
  ],
};
```

**Prop Types:**
- `boolean` → Toggle switch in inspector
- `select` → Dropdown with options
- `string` → Text input field

Add to registry export:
```typescript
export const componentRegistry = {
  // ...existing
  ComponentName: ComponentNameMeta,
};
```

#### 3.5 Update Inspector Panel

File: `src/examples/showcase/components/InspectorPanel.tsx`

1. Add to `subpageToComponent` mapping:
```typescript
const subpageToComponent = {
  // ...existing
  componentname: 'ComponentName',
};
```

2. Add to `componentTokens` with relevant design tokens:
```typescript
const componentTokens = {
  // ...existing
  ComponentName: [
    { name: 'Brand BG', token: '--ink-button-brand-bg', category: 'colors' },
    { name: 'Border Radius', token: '--ink-radius-size-xs', category: 'radius' },
    // ... more tokens
  ],
};
```

#### 3.6 Update Interactive Preview (CRITICAL for Preview to Work)

File: `src/examples/showcase/components/InteractivePreview.tsx`

**IMPORTANT**: Without proper configuration here, the Interactive Preview will be EMPTY. This is a common issue - if the preview doesn't render, check these mappings.

1. **Add to `componentMap`** (maps component name to actual component):
```typescript
const componentMap = {
  // ...existing
  ComponentName: DesignSystem.ComponentName,
};
```

2. **Add to `subpageToComponent` mapping** (maps URL slug to component name):
```typescript
const subpageToComponent = {
  // ...existing
  componentname: 'ComponentName',  // lowercase URL slug
};
```

3. **Add to `voidComponents`** if it doesn't accept children:
```typescript
const voidComponents = new Set([
  // ...existing
  'ComponentName',
]);
```

4. **Add to `defaultComponentProps`** (CRITICAL - without this, preview is empty):
```typescript
const defaultComponentProps = {
  // ...existing
  // Simple component - just needs basic props
  Button: { children: 'Button', kind: 'brand' },

  // Component with required array props - MUST provide default data
  Breadcrumb: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ],
  },

  // Component with complex props
  Table: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    data: [
      { name: 'John', email: 'john@example.com' },
    ],
  },
};
```

**Common Issue**: If Interactive Preview is empty, check:
- Is the component in `componentMap`?
- Is the URL slug in `subpageToComponent`?
- Does `defaultComponentProps` include all REQUIRED props (especially arrays like `items`, `columns`, `data`)?

#### 3.7 Update Prototype Generator

File: `.claude/commands/prototype-generator.md`

Add constraints under appropriate layer section:
```markdown
**Layer 4: Composites**
- **ComponentName**: Only use `size="small"` or `size="medium"`.
  Variants: brand, primary, secondary, tertiary.
  **Tertiary is always icon-only** (no text allowed).
```

#### 3.8 Update Tracking Document

File: `FIGMA-SYNC-PROGRESS.md`

1. Update component in layer table:
```markdown
| ComponentName | ✅ Completed | `node-id` | Changes summary |
```

2. Add to Showcase Optimization Notes:
```markdown
- **ComponentName**: small, medium only, tertiary is icon-only
```

3. Add to Completed Log:
```markdown
| ComponentName | YYYY-MM-DD | Brief notes about changes |
```

### Phase 4: Verification

1. **Check component hierarchy compliance**:
   - Verify the component uses existing primitives (Icon, IconButton, Link, Button, etc.)
   - **NO custom button/icon/link implementations** - use design system components
   - Composites (L4) should import from primitives (L3)
   - Patterns (L5) should import from composites (L4) or primitives (L3)

   ```bash
   # Check imports are from design system, not custom implementations
   grep -n "import.*from" src/design-system/{layer}/{Component}/{Component}.tsx
   ```

   **Good:**
   ```tsx
   import { IconButton } from '../../3-primitives/IconButton';
   import { Icon } from '../../3-primitives/Icon';
   import { Link } from '../../3-primitives/Link';
   ```

   **Bad (custom implementations):**
   ```tsx
   // ❌ Creating custom button element instead of using IconButton
   <button className={styles.iconButton} onClick={...}>
     <svg>...</svg>
   </button>

   // ❌ Using raw anchor instead of Link component
   <a href={...} className={styles.link}>...</a>
   ```

2. **Run build**:
   ```bash
   npm run build
   ```

3. **Verify all validations pass**:
   - No hardcoded colors
   - No inline styles
   - No invalid icon names
   - No custom component implementations where primitives exist

4. **Verify Interactive Preview works** (CRITICAL):
   - Navigate to the component in showcase
   - Check that the Interactive Preview section shows the component (not empty)
   - Check that the Inspector Panel on the right shows ALL Figma props as toggles/dropdowns
   - Toggle each prop and verify the preview updates in real-time

   **If preview is empty**: Check `InteractivePreview.tsx`:
   - `componentMap` has the component
   - `subpageToComponent` has the URL slug mapping
   - `defaultComponentProps` has all required props (especially arrays)

   **If inspector has no props**: Check `componentRegistry.ts`:
   - Component's `props` array includes all Figma boolean/select props

5. **Provide summary** of all changes made

## Checklist Template

When updating a component, ensure:

### Phase 0: State Collection (MUST BE FIRST)
- [ ] **Fetched ALL state screenshots** from Figma (default, hover, active, disabled - on/off)
- [ ] **Documented state node IDs** in a table
- [ ] **Parsed dimensions carefully** - distinguished container vs element sizes
- [ ] **Identified hover effect** size and positioning (often extends beyond element)

### Visual Verification (BEFORE declaring "no changes needed")
- [ ] **Opened showcase in browser** and took screenshot
- [ ] **Compared visually with Figma** - side-by-side
- [ ] **Verified token VALUES** (not just names) - checked actual CSS values
- [ ] **Tested Interactive Preview** - props update the preview in real-time
- [ ] **Tested all prop combinations** - toggles and dropdowns work

### Component Implementation
- [ ] **Uses existing primitives** (IconButton, Icon, Link, Button - NO custom implementations)
- [ ] CSS uses design tokens only (no hardcoded colors/values)
- [ ] TSX reflects Figma variants and behaviors
- [ ] Props match Figma exactly (remove non-Figma props)

### Showcase & Demo
- [ ] Showcase shows only Figma-valid options (remove non-Figma sections)
- [ ] Remove showcase sections for props that don't exist in Figma

### Inspector Panel (componentRegistry.ts)
- [ ] Component has `props` array with ALL Figma toggleable props
- [ ] Boolean Figma props → `type: 'boolean'` entries
- [ ] Select Figma props → `type: 'select'` with options
- [ ] **VERIFY**: Inspector panel shows toggles when viewing component

### Interactive Preview (InteractivePreview.tsx)
- [ ] Component is in `componentMap`
- [ ] URL slug is in `subpageToComponent`
- [ ] `defaultComponentProps` includes ALL required props (especially arrays like `items`)
- [ ] **VERIFY**: Preview renders the component (not empty)
- [ ] **VERIFY**: Toggling props in inspector updates preview in real-time

### Documentation
- [ ] Prototype generator has constraints documented
- [ ] FIGMA-SYNC-PROGRESS.md is updated

### Final Verification
- [ ] Build passes with no errors
- [ ] Visual test in browser confirms preview + inspector work

## Files to Update Summary

| File | Purpose |
|------|---------|
| `{Component}.module.css` | Styling with design tokens |
| `{Component}.tsx` | Component logic and props |
| `{Layer}Showcase.tsx` | Demo page for the component |
| `componentRegistry.ts` | Props panel metadata |
| `InspectorPanel.tsx` | Right panel mappings + tokens |
| `InteractivePreview.tsx` | Live preview mappings |
| `prototype-generator.md` | Usage constraints |
| `FIGMA-SYNC-PROGRESS.md` | Tracking progress |

## Common Mistakes to Avoid

### 1. Only Checking the Main Figma Node
**Mistake**: Fetching only the main component URL and missing state-specific styling.
**Fix**: Always ask for or fetch additional Figma URLs for:
- States variant (shows hover, active, disabled, error)
- Description variant (shows typography for secondary text)

### 2. Assuming Default Gaps Are Correct
**Mistake**: Assuming `gap: 8px` between wrapper elements is correct.
**Fix**: Check Figma carefully - often the gap between label and description is 0, not 8px.
```css
/* WRONG - adds unwanted space */
.wrapper {
  gap: var(--ink-spacing-100); /* 8px */
}

/* CORRECT - no gap, description sits directly below label */
.wrapper {
  /* No gap - description sits directly below label per Figma */
}
```

### 3. Missing Hover Background Effects
**Mistake**: Only updating border color on hover, missing the background circle.
**Fix**: Check if Figma shows a hover background that extends beyond the control:
```css
/* Hover background circle - extends beyond control */
.control::before {
  content: '';
  position: absolute;
  inset: -4px; /* Extends beyond control */
  border-radius: var(--ink-radius-full);
  background: transparent;
}

.wrapper:hover .control::before {
  background: var(--ink-neutral-fade-10);
}
```

### 4. Using Muted Colors Instead of Opacity for Disabled
**Mistake**: Using separate muted colors for disabled state.
**Fix**: Figma often uses `opacity: 0.25` on the entire wrapper instead:
```css
/* WRONG */
.input:disabled {
  background: var(--ink-neutral-10);
  border-color: var(--ink-neutral-30);
}

/* CORRECT - per Figma */
.wrapper.disabled {
  opacity: 0.25;
}
```

### 5. Missing Typography Details for Secondary Text
**Mistake**: Using same typography for label and description.
**Fix**: Check Figma for description-specific styles:
```css
/* Description has different typography than label */
.description {
  font-size: var(--ink-font-size-xs);     /* 12px, not 14px */
  font-weight: var(--ink-font-weight-medium); /* 500, not 400 */
  letter-spacing: 0.16px;                  /* wide spacing */
  line-height: 1.5;                        /* different from label */
  padding-left: 32px;                      /* aligns with label text */
}
```

### 6. Hidden Padding Causing Extra Spacing
**Mistake**: Removing `gap` but not checking for `padding-block-start` or `padding-block-end` on labels.
**Fix**: Check ALL padding properties on the label element:
```css
/* WRONG - has hidden padding that adds vertical space */
.label {
  padding-block-start: var(--ink-spacing-100); /* 8px - THIS causes extra space! */
  padding-inline-start: var(--ink-spacing-400);
}

/* CORRECT - no vertical padding for tight spacing */
.label {
  /* No vertical padding - matches Radio tight spacing between label and description */
  padding-inline-start: var(--ink-spacing-400);
}
```

**How to find hidden spacing:**
1. Compare components visually side-by-side (Checkbox vs Radio)
2. If spacing differs, check ALL padding properties:
   - `padding-block-start` (top in horizontal writing mode)
   - `padding-block-end` (bottom)
   - `padding-inline-start` (left in LTR)
   - `padding-inline-end` (right)
3. Check `min-height` on wrapper and label elements
4. Check `line-height` differences

### 7. Confusing Container Dimensions with Element Dimensions
**Mistake**: Reading Figma code and assuming the first dimension you see is the element size.
**Example**: Switch component - seeing `width: 40px, height: 24px` and assuming track is 40x24.
**Reality**: Container is 40x24 to provide space for hover effects. Actual track is 36x24.

**Fix**: Always parse Figma code carefully and look for nested elements:
```
Figma Structure:
├── Switch Container (40 × 24)     ← NOT the track size!
│   ├── Track (36 × 24)            ← Actual track size
│   │   └── Thumb (20 × 20)        ← Thumb inside track
│   └── Hover Effect (32 × 32)     ← Extends beyond container
```

**How to identify:**
1. Look for nested frames/groups in Figma
2. Hover effects and focus rings often explain why containers are larger
3. Check if the container has `overflow: visible` - indicates effects extend beyond
4. The math should add up: 36px track + 2px left offset + 2px right offset = 40px container

### 8. Not Fetching All States Before Analysis
**Mistake**: Fetching only the main component node and making assumptions about hover/active styling.
**Example**: Assuming track stays the same color on hover when Figma actually shows a background circle effect.

**Fix**: ALWAYS complete Phase 0 (State Collection) BEFORE any analysis:
1. Get the main component screenshot
2. Get hover state screenshot - look for background effects
3. Get active/focus state screenshot - look for focus rings
4. Get disabled state screenshot - check opacity vs muted colors
5. THEN start comparing with code

**Why this matters:**
- Hover backgrounds are easy to miss in default state
- Focus rings have specific offset requirements
- Disabled styling may use opacity (0.25) not muted colors
- Active states often have accent-colored borders

## Common Patterns

### Icon Name Verification
Always verify icon names exist in `src/design-system/3-primitives/Icon/iconPaths.ts`:
```
more-horizontal → overflow-horizontal (correct name)
users → people
mail → envelope
grid → layout-grid
```

### Size Restrictions
Most components should only show small/medium in showcase (not large/xlarge):
- Button: small, medium only
- IconButton: small, medium only
- ComboButton: small, medium only

### Variant Behaviors
Document special behaviors per variant:
- IconButton danger: transparent bg with red icon (hover shows red bg)
- ComboButton tertiary: always icon-only (compact mode forced)

## Success Criteria

The update is complete when:
- Component visually matches Figma design
- **Uses existing primitives** (Icon, IconButton, Link, Button) - no custom implementations
- All styling uses design tokens
- Props match Figma exactly (non-Figma props removed)
- Showcase reflects only Figma-valid options
- **Inspector panel shows ALL Figma props as toggles/dropdowns** (componentRegistry.ts)
- **Interactive Preview renders the component** (not empty - defaultComponentProps configured)
- **Toggling props in inspector updates the preview in real-time**
- Build passes with no errors
- Tracking document is updated

**Quick Test**: Navigate to component in showcase → Preview shows component → Inspector has toggles → Toggling updates preview ✅
