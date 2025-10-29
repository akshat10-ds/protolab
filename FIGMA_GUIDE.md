# Figma to Code Workflow Guide

**Complete guide for converting Figma designs to code using the Ink Design System.**

This document provides step-by-step instructions for AI agents to implement Figma designs using ONLY existing components.

---

## 🎯 Workflow Overview

```
Figma URL → Extract Data → Map Elements → Generate Code
    ↓            ↓              ↓              ↓
  Parse      MCP Tools    COMPONENT      Existing
  URL                     CATALOG.md     Components
```

---

## 📋 Step-by-Step Workflow

### Step 1: Extract Figma URL Parameters

**Input**: Figma URL from user
**Example**: `https://figma.com/design/pqrs/ExampleFile?node-id=1-2`

**Extract**:
- **File Key**: `pqrs` (from URL path)
- **Node ID**: `1:2` (from `node-id=1-2`, replace `-` with `:`)

**URL Patterns**:
```
Design files:  https://figma.com/design/:fileKey/:fileName?node-id=:id
Board files:   https://figma.com/board/:fileKey/:fileName?node-id=:id
```

---

### Step 2: Fetch Figma Design Data

**Use MCP Tools**:

#### Primary Tool: `mcp__figma__get_design_context`
```typescript
mcp__figma__get_design_context({
  fileKey: "pqrs",           // Extracted from URL
  nodeId: "1:2",             // Extracted from URL (use : not -)
  clientLanguages: "typescript,javascript",
  clientFrameworks: "react"
})
```

**Returns**: Design structure, tokens, component mapping, Code Connect info

#### Alternative Tools:
- **`mcp__figma__get_screenshot`** - Get visual representation
- **`mcp__figma__get_metadata`** - Get node structure overview
- **`mcp__figma__get_variable_defs`** - Get variable definitions

---

### Step 3: Analyze Design Structure

**What to look for**:
1. **Layout Structure**: Auto Layout (vertical/horizontal), constraints
2. **Components**: Buttons, inputs, cards, navigation
3. **Typography**: Text styles, font sizes, weights
4. **Colors**: Fills, strokes, backgrounds
5. **Spacing**: Gaps, padding, margins
6. **Assets**: Images, icons

**Example Analysis**:
```
Design Structure:
├── Frame (Auto Layout Vertical)
│   ├── Text ("Dashboard Title")
│   ├── Frame (Auto Layout Horizontal, gap: 16px)
│   │   ├── Card Component
│   │   ├── Card Component
│   │   └── Card Component
│   └── Table Component
```

---

### Step 4: Map Figma Elements to Ink Components

**Use COMPONENT_CATALOG.md for mapping**

#### Layout Mapping

| Figma Element | Ink Component | Props |
|---------------|---------------|-------|
| Frame (Auto Layout Vertical) | Stack | `direction="vertical"` |
| Frame (Auto Layout Horizontal) | Stack or Inline | `direction="horizontal"` |
| Frame (Grid) | Grid | `columns={n}` |
| Frame (fixed width) | Container | `size="large"` |
| Spacer | Spacer | `size="medium"` |

**Spacing/Gap Mapping**:
- 4px → `gap="xs"` or `--ink-spacing-50`
- 8px → `gap="small"` or `--ink-spacing-100`
- 16px → `gap="medium"` or `--ink-spacing-200`
- 24px → `gap="large"` or `--ink-spacing-300`

---

#### Component Mapping

| Figma Component | Ink Component | Layer | Notes |
|-----------------|---------------|-------|-------|
| Button | Button | Primitive | Map variant to `kind` |
| Input Field | Input | Primitive | Use appropriate `type` |
| Search Field | SearchInput | Composite | Includes icon |
| Dropdown | Select or ComboBox | Prim/Comp | ComboBox for searchable |
| Checkbox | Checkbox | Primitive | |
| Radio Button | Radio | Primitive | |
| Toggle/Switch | Switch | Primitive | |
| Date Input | DatePicker | Composite | |
| File Upload | FileInput | Composite | |
| Navigation Sidebar | VerticalNavigation | Pattern | Collapsible nav |
| Top Nav Bar | GlobalNav | Pattern | Application header |
| Tabs | Tabs | Composite | Tab navigation |
| Breadcrumbs | Breadcrumb | Composite | Path navigation |
| Table | Table | Composite | Data grid |
| List | List | Composite | Vertical list |
| Card/Panel | Card | Primitive | Container |
| Modal/Dialog | Modal | Composite | Overlay |
| Drawer/Sheet | Drawer | Composite | Side panel |
| Alert/Banner | Alert or Banner | Comp/Prim | Context-dependent |
| Badge | Badge | Primitive | Status label |
| Tag/Chip | Chip | Primitive | Removable tag |
| Avatar/Profile Pic | Avatar | Primitive | User image |
| Icon | Icon | Primitive | lucide-react icons |
| Divider | Divider | Primitive | Separator |
| Progress Bar | ProgressBar | Primitive | Progress indicator |
| Spinner | Spinner | Primitive | Loading |
| Skeleton | Skeleton | Primitive | Loading placeholder |

**Complete mapping table**: See COMPONENT_CATALOG.md

---

#### Token Mapping

**Figma Property → Ink Token**

**Colors**:
| Figma | Ink Token |
|-------|-----------|
| Fill (background) | `--ink-bg-*` |
| Text color | `--ink-font-*` |
| Stroke (border) | `--ink-border-*` |
| Primary brand color | `--ink-cobalt-100` |
| Success green | `--ink-green-100` |
| Error red | `--ink-red-100` |
| Warning orange | `--ink-orange-100` |

**Use semantic tokens, not color primitives!**

**Spacing**:
| Figma Gap/Padding | Ink Token |
|-------------------|-----------|
| 4px | `--ink-spacing-50` |
| 8px | `--ink-spacing-100` |
| 12px | `--ink-spacing-150` |
| 16px | `--ink-spacing-200` |
| 24px | `--ink-spacing-300` |
| 32px | `--ink-spacing-400` |

**Typography**:
| Figma Text Style | Ink Token |
|------------------|-----------|
| Display Large | `--ink-font-display-xl-size` |
| Heading Medium | `--ink-font-heading-m-size` |
| Body Regular | `--ink-font-body-m-size` |
| Caption | `--ink-font-detail-s-size` |

**Border Radius**:
| Figma Radius | Ink Token |
|--------------|-----------|
| 4px | `--ink-radius-size-xs` |
| 8px | `--ink-radius-size-s` |
| 12px | `--ink-radius-size-m` |
| 9999px (pill) | `--ink-radius-size-full` |

---

### Step 5: Generate Implementation Code

**Follow this order**:
1. Start with Layout (Layer 6 if applicable)
2. Add Patterns (Layer 5 for navigation)
3. Compose with Composites (Layer 4)
4. Use Primitives (Layer 3)
5. Apply Utilities for layout (Layer 2)

**Example Implementation**:

**Figma Structure**:
```
Dashboard Frame (Vertical Auto Layout, gap: 24px)
├── Title Text: "Dashboard"
├── Stats Row (Horizontal Auto Layout, gap: 16px)
│   ├── Card: "Users: 1,234"
│   ├── Card: "Active: 856"
│   └── Card: "Growth: +12%"
└── Data Table
```

**Generated Code**:
```tsx
import { Stack, Grid, Card, Table, Heading } from '@/design-system';

export function Dashboard({ data }) {
  return (
    <Stack direction="vertical" gap="large">
      {/* Title */}
      <Heading level={1}>Dashboard</Heading>

      {/* Stats Row */}
      <Grid columns={3} gap="medium">
        <Card>
          <Heading level={3}>1,234</Heading>
          <Text>Total Users</Text>
        </Card>
        <Card>
          <Heading level={3}>856</Heading>
          <Text>Active</Text>
        </Card>
        <Card>
          <Heading level={3}>+12%</Heading>
          <Text>Growth</Text>
        </Card>
      </Grid>

      {/* Data Table */}
      <Card>
        <Table
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'status', label: 'Status' }
          ]}
          data={data}
        />
      </Card>
    </Stack>
  );
}
```

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T: Create Custom Components
```tsx
// ❌ Wrong - Creating custom component
function CustomSearchBox() {
  return (
    <div className="custom-search">
      <input />
      <button>Search</button>
    </div>
  );
}
```

### ✅ DO: Use Existing Components
```tsx
// ✅ Correct - Using existing SearchInput
import { SearchInput } from '@/design-system';

<SearchInput placeholder="Search..." />
```

---

### ❌ DON'T: Use Inline Styles
```tsx
// ❌ Wrong - Inline styles
<div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
```

### ✅ DO: Use Utilities and Tokens
```tsx
// ✅ Correct - Using Stack utility
<Stack direction="horizontal" gap="medium">
```

---

### ❌ DON'T: Hardcode Colors
```tsx
// ❌ Wrong - Hardcoded colors
<Button style={{ background: '#6C46CC', color: 'white' }}>
```

### ✅ DO: Use Design Tokens
```tsx
// ✅ Correct - Let component use its tokens
<Button kind="brand">
```

---

### ❌ DON'T: Guess Components
```tsx
// ❌ Wrong - Guessing a component exists
<DataGrid data={data} /> // DataGrid doesn't exist
```

### ✅ DO: Check COMPONENT_CATALOG.md
```tsx
// ✅ Correct - Verified Table exists
<Table columns={cols} data={data} />
```

---

## 🎨 Design Token Priority

When applying styles, follow this priority:

**1. Component-Specific Tokens** (if available)
```css
--ink-button-brand-bg
--ink-form-border-default
```

**2. Semantic Tokens** (preferred)
```css
--ink-bg-default
--ink-font-default
--ink-border-default
```

**3. Color Primitives** (only when necessary)
```css
--ink-cobalt-100
--ink-neutral-20
```

**NEVER use hardcoded values!**

---

## 🔍 Decision Flow for Unmapped Elements

When you encounter a Figma element with no direct Ink equivalent:

```
1. Check COMPONENT_CATALOG.md for similar component
   ↓
2. Can it be composed from existing components?
   ↓ Yes
   Compose using primitives + utilities
   ↓
3. Can a similar primitive be adapted?
   ↓ Yes
   Use closest primitive with appropriate props
   ↓
4. Ask the user for guidance
```

**Example**:
```
Figma: "Image Carousel"
↓
COMPONENT_CATALOG.md: No Carousel component
↓
Can compose? YES
↓
Solution:
<Stack direction="horizontal">
  <IconButton icon="chevron-left" onClick={prev} />
  <Grid columns={visibleCount}>
    {images.map(img => <Card><img src={img} /></Card>)}
  </Grid>
  <IconButton icon="chevron-right" onClick={next} />
</Stack>
```

---

## 📦 Asset Handling

### Images
**Figma**: Image fills, background images
**Implementation**:
```tsx
import imageUrl from '@/assets/image.png';

<img src={imageUrl} alt="Description" />
```

**Storage**: Place in `src/assets/`

### Icons
**Figma**: Icon components
**Implementation**: Use Icon primitive with lucide-react

```tsx
import { Icon } from '@/design-system';

<Icon name="search" size="medium" />
```

**Available icons**: See `src/design-system/3-primitives/Icon/README.md` (50 icons)

### Fonts
**Already configured**: 'DS Indigo' font is included in the design system
**Token**: `--ink-font-family`

---

## 🧪 Testing Your Implementation

After generating code:

1. **Visual Check**: Does it match the Figma design?
2. **Component Check**: Are you using ONLY existing components?
3. **Token Check**: Are you using design tokens, not hardcoded values?
4. **Import Check**: Are imports from `@/design-system` correct?
5. **Hierarchy Check**: Did you follow the layer hierarchy?

---

## 📚 Reference Documentation

**Quick Reference**:
- **COMPONENT_CATALOG.md** - Complete component list and mapping
- **ARCHITECTURE.md** - Hierarchy rules and constraints
- **docs/COLOR_PAIRING_RULES.md** - Accessibility guidelines

**Detailed APIs**:
- **src/design-system/1-tokens/README.md** - All design tokens
- **src/design-system/2-utilities/README.md** - Layout utilities
- **src/design-system/3-primitives/README.md** - Primitive components
- **src/design-system/4-composites/README.md** - Composite components
- **src/design-system/5-patterns/README.md** - UI patterns
- **src/design-system/6-layouts/README.md** - Layout templates

---

## 🎯 Workflow Checklist

Before implementing Figma designs:

- [ ] Extracted file key and node ID from URL
- [ ] Called appropriate MCP tool (`mcp__figma__get_design_context`)
- [ ] Analyzed design structure
- [ ] Checked COMPONENT_CATALOG.md for all elements
- [ ] Mapped every Figma element to an Ink component
- [ ] Verified no custom components needed
- [ ] Identified design tokens to use
- [ ] Planned component hierarchy (Layer 6 → 5 → 4 → 3 → 2)

During implementation:

- [ ] Using ONLY existing components
- [ ] Following the component hierarchy
- [ ] Using design tokens (no hardcoded values)
- [ ] Correct import statements
- [ ] Proper component props

After implementation:

- [ ] Code compiles without errors
- [ ] Visual output matches Figma design
- [ ] No custom components created
- [ ] All styles use design tokens
- [ ] Accessibility considerations met

---

## 💡 Pro Tips

1. **Start with Structure**: Map the layout first (Stack, Grid, Container), then add components
2. **Check Patterns First**: Before composing from scratch, check if a Pattern exists
3. **Read Layer READMEs**: Component APIs are documented in detail
4. **Use Grid for Cards**: Card layouts work best with Grid utility
5. **Stack for Forms**: Forms use vertical Stack with appropriate gaps
6. **Reference Examples**: Look at `src/examples/` for real implementations

---

**Remember**: Every Figma element can be mapped to existing Ink components. Never create custom components!
