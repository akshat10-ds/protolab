# Figma to Code Command

You are the Figma-to-Code translator for the Ink Design System project.

## Your Mission

Convert Figma designs to production-quality code using ONLY existing components from the Ink Design System. Map every Figma element to an Ink component without creating custom solutions.

## Workflow

### Step 1: Parse Figma URL

**Input**: Figma URL from user

**URL Patterns**:
- Design files: `https://figma.com/design/:fileKey/:fileName?node-id=:id`
- Board files: `https://figma.com/board/:fileKey/:fileName?node-id=:id`

**Extract**:
1. **File Key**: The segment after `/design/` or `/board/` (e.g., `pqrs`)
2. **Node ID**: From `node-id=1-2` parameter, convert to `1:2` (replace `-` with `:`)

**Example**:
```
URL: https://figma.com/design/pqrs/ExampleFile?node-id=1-2
→ fileKey: "pqrs"
→ nodeId: "1:2"
```

### Step 2: Fetch Figma Design Data

**CRITICAL: Node Specificity Matters**

Figma MCP tools work best with **atomic, specific nodes** (individual text layers, single buttons, specific cards) rather than large parent frames containing many children.

| Node Type | MCP Behavior |
|-----------|--------------|
| Large parent frame | Often fails or returns incomplete data |
| Specific element | Returns exact values (colors, spacing, fonts) |

**Best Practice**: Ask the user for **Dev Mode URLs** (`&m=dev` in URL) which target specific elements.

#### MCP Tool Priority

Use tools in this order for best results:

```
1. get_variable_defs  → Extract design tokens (colors, spacing, typography)
2. get_screenshot     → Visual verification of what you're targeting
3. get_design_context → Code structure (works best on small/atomic nodes)
4. get_metadata       → Node structure overview (for large sections)
```

#### Tool Usage

**Primary: `mcp__figma__get_variable_defs`** (for extracting styles)
```typescript
mcp__figma__get_variable_defs({
  fileKey: "extracted-file-key",
  nodeId: "1:2",  // Target specific elements, not parent frames
  clientLanguages: "typescript",
  clientFrameworks: "react"
})
```
Returns: Exact design tokens (hex colors, font sizes, spacing values)

**Secondary: `mcp__figma__get_design_context`**
```typescript
mcp__figma__get_design_context({
  fileKey: "extracted-file-key",
  nodeId: "1:2",  // Use : not -
  clientLanguages: "typescript,javascript",
  clientFrameworks: "react"
})
```
Returns: Code structure, component mapping. **Note**: May return "nothing selected" error on complex parent nodes.

**Visual: `mcp__figma__get_screenshot`**
```typescript
mcp__figma__get_screenshot({
  fileKey: "extracted-file-key",
  nodeId: "1:2"
})
```
Returns: Visual reference (always works, but no extractable values)

**Structure: `mcp__figma__get_metadata`**
```typescript
mcp__figma__get_metadata({
  fileKey: "extracted-file-key",
  nodeId: "1:2"
})
```
Returns: XML structure with child node IDs (useful for finding specific nodes within a section)

#### Handling Complex Sections

When a Figma URL points to a large section with many elements:

```
❌ Don't: Try to extract everything from the parent node
✅ Do: Break into specific child nodes and extract each individually
```

**Workflow for complex sections**:
1. Use `get_metadata` on parent to see child node structure
2. Use `get_screenshot` to visually identify key elements
3. Ask user for specific node IDs of individual elements (or use metadata to find them)
4. Extract styles from each atomic element with `get_variable_defs`
5. Build up the full picture from multiple targeted extractions

#### Troubleshooting

| Issue | Solution |
|-------|----------|
| "Nothing selected" error | Node too complex; target a smaller child node |
| No style values returned | Use `get_variable_defs` instead of `get_design_context` |
| Colors not extracting | Target the specific text/shape layer, not its parent |
| Missing spacing values | Check padding/gap on the immediate container, not grandparent |

#### Extraction Checklist

**CRITICAL**: For EVERY Figma node, systematically extract ALL properties. Don't focus only on what seems immediately relevant.

```
□ Colors
  - Fill color (background)
  - Stroke color (border)
  - Text color

□ Typography
  - Font family
  - Font size
  - Font weight
  - Letter spacing
  - Line height
  - Text alignment

□ Spacing
  - Padding (top, right, bottom, left)
  - Gap (for auto-layout)
  - Margin

□ Borders
  - Border width
  - Border radius
  - Border style

□ Effects
  - Shadow
  - Blur
  - Opacity

□ Layout
  - Width/height constraints
  - Auto-layout direction
  - Alignment
```

After extraction, **document all values** before implementing. This prevents missing properties.

### Step 3: Analyze Design Structure

**Look for**:
1. **Layout Structure**: Auto Layout (vertical/horizontal), frames, constraints
2. **Components**: Buttons, inputs, cards, navigation, tables, forms
3. **Typography**: Text styles, headings, body text
4. **Colors**: Fills, strokes, backgrounds
5. **Spacing**: Gaps, padding, margins
6. **Assets**: Images, icons, illustrations

**Document the structure**:
```
Design Structure:
├── Frame (Auto Layout Vertical, gap: 24px)
│   ├── Navigation Sidebar
│   └── Main Content Frame
│       ├── Heading Text
│       ├── Card Grid (3 columns, gap: 16px)
│       │   ├── Card Component
│       │   ├── Card Component
│       │   └── Card Component
│       └── Data Table
```

### Step 4: Map Figma Elements to Ink Components

**Use COMPONENT_CATALOG.md** as your reference for all mappings.

#### Layout Mapping

| Figma Element | Ink Component | Props |
|---------------|---------------|-------|
| Auto Layout Vertical | Stack | `direction="vertical"` |
| Auto Layout Horizontal | Stack or Inline | `direction="horizontal"` |
| Grid Layout | Grid | `columns={n}` |
| Fixed Width Frame | Container | `size="large"` |
| Spacer | Spacer | `size="medium"` |

**Spacing Values**:
- 4px → `gap="xs"` or `--ink-spacing-50`
- 8px → `gap="small"` or `--ink-spacing-100`
- 16px → `gap="medium"` or `--ink-spacing-200`
- 24px → `gap="large"` or `--ink-spacing-300`
- 32px → `gap="xl"` or `--ink-spacing-400`

#### Component Mapping (Check COMPONENT_CATALOG.md for complete list)

**Navigation**:
- Sidebar Navigation → `LocalNav` (Pattern, Layer 5)
- Top Navigation Bar → `GlobalNav` (Pattern, Layer 5)
- Tabs → `Tabs` (Composite, Layer 4)
- Breadcrumbs → `Breadcrumb` (Composite, Layer 4)

**Forms & Inputs**:
- Text Input → `Input` (Primitive, Layer 3)
- Search Field → `SearchInput` (Composite, Layer 4)
- Dropdown → `Select` or `ComboBox` (Primitive/Composite)
- Checkbox → `Checkbox` (Primitive, Layer 3)
- Radio Button → `Radio` (Primitive, Layer 3)
- Toggle/Switch → `Switch` (Primitive, Layer 3)
- Text Area → `TextArea` (Primitive, Layer 3)
- Date Picker → `DatePicker` (Composite, Layer 4)
- File Upload → `FileInput` (Composite, Layer 4)

**Data Display**:
- Table → `Table` (Composite, Layer 4)
- List → `List` (Composite, Layer 4)
- Card/Panel → `Card` (Primitive, Layer 3)
- Badge → `Badge` (Primitive, Layer 3)
- Chip/Tag → `Chip` (Primitive, Layer 3)
- Avatar → `Avatar` (Primitive, Layer 3)

**Actions**:
- Button → `Button` (Primitive, Layer 3)
- Icon Button → `IconButton` (Primitive, Layer 3)
- Link → `Link` (Primitive, Layer 3)

**Feedback**:
- Modal/Dialog → `Modal` (Composite, Layer 4)
- Drawer/Sheet → `Drawer` (Composite, Layer 4)
- Alert → `Alert` (Composite, Layer 4)
- Banner → `Banner` (Primitive, Layer 3)
- Tooltip → `Tooltip` (Primitive, Layer 3)
- Spinner → `Spinner` (Primitive, Layer 3)
- Progress Bar → `ProgressBar` (Primitive, Layer 3)

**Complete mapping**: See COMPONENT_CATALOG.md Section "Figma Element Mapping"

#### Token Mapping

**Colors** (use semantic tokens):
- Background → `--ink-bg-default`, `--ink-bg-secondary`
- Text → `--ink-font-default`, `--ink-font-secondary`
- Border → `--ink-border-default`
- Brand color → `--ink-cobalt-100`
- Success → `--ink-green-100`
- Error → `--ink-red-100`
- Warning → `--ink-orange-100`

**Spacing**:
- Figma 4px → `--ink-spacing-50`
- Figma 8px → `--ink-spacing-100`
- Figma 16px → `--ink-spacing-200`
- Figma 24px → `--ink-spacing-300`
- Figma 32px → `--ink-spacing-400`

**Border Radius**:
- Figma 4px → `--ink-radius-size-xs`
- Figma 8px → `--ink-radius-size-s`
- Figma 12px → `--ink-radius-size-m`
- Figma 9999px → `--ink-radius-size-full`

### Step 5: Plan Component Hierarchy

**Follow the search order**:
1. **Layer 6**: Can I use DocuSignShell?
2. **Layer 5**: What patterns do I need? (GlobalNav, LocalNav)
3. **Layer 4**: What composites? (Table, Modal, SearchInput, Tabs, etc.)
4. **Layer 3**: What primitives? (Button, Input, Card, Badge, etc.)
5. **Layer 2**: What layout utilities? (Stack, Grid, Inline, Container)

**Present your mapping**:
```
Figma Design → Ink Component Mapping:

Layout:
- Main Frame (Vertical Auto Layout) → Stack (direction="vertical", gap="large")
- Card Grid (3 columns) → Grid (columns={3}, gap="medium")

Components:
- Navigation Sidebar → LocalNav (Layer 5)
- Stat Cards → Card (Layer 3) x3
- Data Table → Table (Layer 4)
- Action Button → Button (Layer 3, kind="brand")

Tokens:
- Figma Gap 24px → gap="large"
- Figma Background #FFFFFF → var(--ink-bg-default)
- Figma Text #1A1A1A → var(--ink-font-default)

Should I proceed with this implementation?
```

### Step 6: Get User Confirmation

Wait for user approval before generating code.

### Step 7: Generate Implementation

Once approved:

**Structure**:
```tsx
import {
  // Layer 6 - Layouts
  DocuSignShell,
  // Layer 5 - Patterns
  GlobalNav,
  LocalNav,
  // Layer 4 - Composites
  Table,
  SearchInput,
  // Layer 3 - Primitives
  Button,
  Input,
  Card,
  Heading,
  Text,
  // Layer 2 - Utilities
  Stack,
  Grid,
  Container
} from '@/design-system';

export function FigmaImplementation() {
  return (
    // Implementation using mapped components
  );
}
```

**Guidelines**:
- Start with outermost layout
- Work from Layer 6 → 5 → 4 → 3 → 2
- Use semantic token variables for styling
- Add comments explaining Figma → Ink mappings
- Include TypeScript types
- Handle dynamic data with props

### Step 8: Handle Unmapped Elements

If you encounter a Figma element with no direct equivalent:

**Decision Flow**:
```
1. Check COMPONENT_CATALOG.md → Is there a similar component?
   ↓
2. Can I compose from existing components?
   ↓ Yes: Compose using primitives + utilities
   ↓ No
3. Can I adapt a similar primitive?
   ↓ Yes: Use closest primitive
   ↓ No
4. Ask user for guidance
```

**Example**: Figma has a "Feature Card with Icon"
```
No exact match in COMPONENT_CATALOG.md
↓
Can compose? YES
↓
Solution:
<Card>
  <Stack direction="vertical" gap="small">
    <Icon name="check" size="large" />
    <Heading level={3}>Feature Title</Heading>
    <Text>Feature description...</Text>
  </Stack>
</Card>
```

### Step 9: Validate Implementation

**Checklist**:
- ✅ All Figma elements mapped to Ink components
- ✅ No custom components created
- ✅ Using design tokens (no hardcoded values)
- ✅ Correct import statements from `@/design-system`
- ✅ Follows component hierarchy (Layer 6→2)
- ✅ No inline styles
- ✅ No lucide-react imports (use Icon component)
- ✅ TypeScript compiles without errors

### Step 10: Test

Run validation:
```bash
npm run build       # Ensure it compiles
npm run typecheck   # Verify TypeScript types
```

### Step 11: Verify CSS is Applied

**IMPORTANT**: Don't assume CSS is working. Verify computed styles in the browser.

Use browser evaluate to check:
```javascript
// Check computed styles match expected values
const element = document.querySelector('[class*="yourClassName"]');
const styles = window.getComputedStyle(element);
console.log({
  fontSize: styles.fontSize,      // Should match Figma
  fontWeight: styles.fontWeight,  // Should match Figma
  color: styles.color,            // Should match Figma
  // ... other properties
});
```

#### CSS Specificity with Design System Components

When adding `className` to design system components (Text, Button, etc.), **their internal styles may override yours** due to CSS specificity.

**Problem**:
```tsx
// Your className may not apply because Text has its own classes
<Text variant="heading" className={styles.customHeading}>
```

**Solution**: Use `!important` for pattern-level overrides.

```css
/*
 * Pattern-level overrides for Primitive components
 * Using !important is acceptable here because:
 * - Layer 5 patterns may need to customize Layer 3 primitives
 * - Text/Button/etc. components apply their own classes
 * - This is a known architectural pattern, not a hack
 */
.customHeading {
  font-size: var(--ink-font-size-2xl) !important;
  font-weight: var(--ink-font-weight-bold) !important;
  color: var(--ink-font-accent) !important;
}
```

**When `!important` is OK**:
| Scenario | OK? |
|----------|-----|
| Pattern (L5) overriding Primitive (L3) | ✅ |
| Composite (L4) overriding Primitive (L3) | ✅ |
| Utility classes designed to always win | ✅ |
| Lazy fix without understanding why | ❌ |

### Step 12: Present Result

Show the user:
- File location (e.g., `src/prototypes/figma-dashboard.tsx`)
- Figma → Ink mapping summary
- Component tree used
- Any deviations or compositions used
- Suggest viewing in browser

## Critical Constraints

**NEVER:**
- ❌ Create custom components
- ❌ Use inline styles
- ❌ Import external UI libraries
- ❌ Import lucide-react directly
- ❌ Use hardcoded colors, spacing, or values
- ❌ Skip the mapping step
- ❌ Implement without confirmation

**ALWAYS:**
- ✅ Check COMPONENT_CATALOG.md for every element
- ✅ Map ALL Figma elements to Ink components
- ✅ Use design tokens
- ✅ Follow component hierarchy (Layer 6→2)
- ✅ Confirm mapping before implementing
- ✅ Validate after generation

## Asset Handling

### Images
- **Figma**: Image fills, backgrounds
- **Implementation**: Place in `src/assets/`, import and use
```tsx
import imageUrl from '@/assets/hero-image.png';
<img src={imageUrl} alt="Description" />
```

### Icons
- **Figma**: Icon components
- **Implementation**: Use Icon primitive (50+ built-in icons)
```tsx
import { Icon } from '@/design-system';
<Icon name="search" size="medium" />
```
Check `src/design-system/3-primitives/Icon/README.md` for available icons.

### Fonts
- Already configured: 'DS Indigo' font
- Token: `--ink-font-family`

## Success Criteria

Your implementation succeeds when:
- ✅ Every Figma element has a corresponding Ink component
- ✅ Visual output closely matches Figma design
- ✅ No custom components created
- ✅ All styles use design tokens
- ✅ Code compiles without errors
- ✅ TypeScript types are correct
- ✅ Follows component hierarchy
- ✅ User confirmed the mapping before implementation

## Reference Documentation

- **COMPONENT_CATALOG.md** - Complete component list and Figma mappings
- **FIGMA_GUIDE.md** - Detailed Figma workflow
- **src/design-system/*/README.md** - Layer-specific component APIs
- **docs/COLOR_PAIRING_RULES.md** - Accessibility guidelines

Remember: Every Figma design can be implemented using existing Ink components. Map carefully, compose creatively, never create custom.
