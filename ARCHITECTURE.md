# Design System Architecture

## Overview

The Ink Design System follows a **strict 6-layer hierarchical architecture** where each layer can only depend on layers below it. This structure ensures consistency, maintainability, and prevents circular dependencies.

## The Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│  Layer 6: LAYOUTS (Application Templates)              │
│  Dependencies: Layers 1-5                               │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 5: PATTERNS (UI Patterns)                       │
│  Dependencies: Layers 1-4                               │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 4: COMPOSITES (Composed Components)             │
│  Dependencies: Layers 1-3                               │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 3: PRIMITIVES (Atomic Components)               │
│  Dependencies: Layers 1-2 only                          │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 2: UTILITIES (Layout & Spacing Helpers)         │
│  Dependencies: Layer 1 only                             │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 1: TOKENS (Design Foundation)                   │
│  Dependencies: None                                     │
└─────────────────────────────────────────────────────────┘
```

## Layer Details

### Layer 1: Tokens (`/1-tokens/`)

**Purpose**: Foundation design decisions (colors, typography, spacing, etc.)

**Contains**:
- `tokens.css` - CSS custom properties defining the visual language

**Rules**:
- ✅ Define CSS variables
- ✅ Reference external assets (fonts)
- ❌ NO component logic
- ❌ NO dependencies on other layers

**Example**:
```css
/* tokens.css */
:root {
  --ink-font-primary: var(--ink-neutral-10);
  --ink-bg-primary: #FFFFFF;
  --ink-spacing-4: 16px;
}
```

---

### Layer 2: Utilities (`/2-utilities/`)

**Purpose**: Layout and spacing helpers

**Contains**:
- `Stack` - Vertical/horizontal flex layout
- `Grid` - CSS Grid layout helper
- `Inline` - Optimized horizontal layout
- `Container` - Content width constraints
- `Spacer` - Fixed/flexible spacing

**Rules**:
- ✅ Import tokens from Layer 1
- ✅ Simple layout components
- ❌ NO imports from other components
- ❌ NO business logic

**Example**:
```tsx
import { Stack } from '@/design-system/2-utilities';

<Stack direction="vertical" gap="medium">
  <Component1 />
  <Component2 />
</Stack>
```

---

### Layer 3: Primitives (`/3-primitives/`)

**Purpose**: Atomic components that use ONLY tokens

**Contains** (25 components):
- Action: `Button`, `IconButton`, `Link`
- Forms: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `TextArea`, `Slider`, `Stepper`
- Display: `Badge`, `Avatar`, `Chip`, `AlertBadge`, `StatusLight`, `Divider`, `Card`, `Skeleton`
- Typography: `Heading`, `Text`
- Feedback: `Spinner`, `ProgressBar`, `Callout`, `Banner`
- Overlay: `Tooltip`
- Icons: `Icon`

**Rules**:
- ✅ Import tokens (Layer 1)
- ✅ Import utilities (Layer 2)
- ✅ Use inline SVG for simple icons
- ❌ NO imports from other primitives (except Icon)
- ❌ NO imports from composites, patterns, or layouts

**Exception**: The `Icon` component is a special primitive that other components can use.

**Example**:
```tsx
// ✅ Correct - Button only uses tokens
import styles from './Button.module.css';

export const Button = ({ children, ...props }) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);
```

---

### Layer 4: Composites (`/4-composites/`)

**Purpose**: Components that compose primitives

**Contains** (18 components):
- Forms: `SearchInput`, `FileInput`, `ComboBox`, `DatePicker`, `FileUpload`, `FilterTag`
- Navigation: `Breadcrumb`, `Pagination`, `Tabs`
- Layout: `Accordion`, `ComboButton`
- Overlay: `Modal`, `Popover`, `Dropdown`, `Drawer`
- Feedback: `Alert`
- Data: `Table`, `List`

**Rules**:
- ✅ Import from Layers 1-3
- ✅ Can use multiple primitives
- ✅ Can compose with Icon
- ❌ NO imports from other composites (use shared primitives instead)
- ❌ NO imports from patterns or layouts

**Example**:
```tsx
// ✅ Correct - SearchInput uses primitives
import { Icon } from '../../3-primitives/Icon';
import { Input } from '../../3-primitives/Input';

export const SearchInput = ({ ...props }) => (
  <div>
    <Icon name="search" />
    <Input {...props} />
  </div>
);
```

---

### Layer 5: Patterns (`/5-patterns/`)

**Purpose**: Complex UI patterns composed from components

**Contains** (3 patterns):
- `VerticalNavigation` - Sidebar navigation
- `GlobalNav` - Top navigation bar
- `LocalNav` - Context-specific navigation

**Rules**:
- ✅ Import from Layers 1-4
- ✅ Compose multiple components
- ✅ Complex interactions and state
- ❌ NO imports from layouts
- ❌ NO business logic or API calls

**Example**:
```tsx
// ✅ Correct - Pattern composes composites and primitives
import { Badge } from '../../3-primitives/Badge';
import { Tooltip } from '../../3-primitives/Tooltip';
import { Icon } from '../../3-primitives/Icon';

export const VerticalNavigation = ({ items }) => (
  <nav>
    {items.map(item => (
      <Tooltip content={item.label}>
        <Icon name={item.icon} />
        {item.badge && <Badge>{item.badge}</Badge>}
      </Tooltip>
    ))}
  </nav>
);
```

---

### Layer 6: Layouts (`/6-layouts/`)

**Purpose**: Complete application templates

**Contains** (2 layouts):
- `DashboardLayout` - Main app dashboard
- `AuthLayout` - Authentication flows

**Rules**:
- ✅ Import from Layers 1-5
- ✅ Define page structure
- ✅ Compose patterns and components
- ❌ NO business logic
- ❌ NO data fetching

**Example**:
```tsx
// ✅ Correct - Layout composes patterns
import { VerticalNavigation } from '../../5-patterns/VerticalNavigation';
import { GlobalNav } from '../../5-patterns/GlobalNav';

export const DashboardLayout = ({ children, navigation, header }) => (
  <div>
    <aside><VerticalNavigation {...navigation} /></aside>
    <header><GlobalNav {...header} /></header>
    <main>{children}</main>
  </div>
);
```

## Approval Gates

Based on the system diagram, there are approval gates at each layer:

### Layer 1: Tokens
**Before modifying**: Tokens affect the entire system. Confirm with design team before adding/changing tokens.

### Layer 2: Utilities
**Before adding**: Ensure it's truly a layout primitive and can't be achieved by composing existing utilities.

### Layer 3: Primitives
**Before adding**: Confirm component uses ONLY tokens. If it needs other components, it belongs in Layer 4.

### Layer 4: Composites
**Before adding**: Confirm component needs to compose primitives. Should only use components and nothing else.

### Layer 5: Patterns
**Before adding**: Confirm pattern is reusable across multiple contexts and composes components appropriately.

### Layer 6: Layouts
**Before adding**: Confirm layout is needed across multiple pages and properly composes patterns.

## Directory Structure

```
src/design-system/
├── 1-tokens/
│   ├── tokens.css
│   ├── index.ts
│   └── README.md
├── 2-utilities/
│   ├── Stack/
│   ├── Grid/
│   ├── Inline/
│   ├── Container/
│   ├── Spacer/
│   ├── index.ts
│   └── README.md
├── 3-primitives/
│   ├── Icon/
│   ├── Button/
│   ├── Input/
│   ├── [... 22 more components]
│   ├── index.ts
│   └── README.md
├── 4-composites/
│   ├── SearchInput/
│   ├── Modal/
│   ├── [... 16 more components]
│   ├── index.ts
│   └── README.md
├── 5-patterns/
│   ├── VerticalNavigation/
│   ├── GlobalNav/
│   ├── LocalNav/
│   ├── index.ts
│   └── README.md
├── 6-layouts/
│   ├── DashboardLayout/
│   ├── AuthLayout/
│   ├── index.ts
│   └── README.md
└── index.ts (main export)
```

## Import Guidelines

### Correct Import Patterns

```tsx
// ✅ Import from main design system export
import { Button, Input, Modal } from '@/design-system';

// ✅ Import from specific layer (when building within design system)
import { Icon } from '../../3-primitives/Icon';
import { Stack } from '../../2-utilities/Stack';

// ✅ Import utilities in patterns
import { Inline } from '../../2-utilities/Inline';
```

### Incorrect Import Patterns

```tsx
// ❌ Don't import from old structure
import { Button } from '@/design-system/components/Button';

// ❌ Don't skip layers (primitive importing from composite)
import { Modal } from '../../4-composites/Modal'; // in a primitive

// ❌ Don't import sideways (composite from composite)
import { Table } from '../Table'; // in another composite

// ❌ Don't import tokens directly in composites (use through primitives)
import tokens from '../../1-tokens/tokens.css'; // in a composite
```

## Enforcement

### Manual Review
- All PRs must respect the hierarchy
- Code reviews should check for layer violations
- Document any necessary exceptions

### Automated (Future)
- ESLint rules to enforce import restrictions
- Pre-commit hooks to validate structure
- CI checks for layer violations

## Benefits of This Architecture

1. **Clear Dependencies**: Easy to understand what depends on what
2. **Prevents Circular Deps**: One-way dependency flow
3. **Better Testing**: Test lower layers first, mock dependencies
4. **Easier Refactoring**: Know exact impact of changes
5. **Scalability**: Add components to appropriate layer
6. **Consistency**: Clear patterns for where code belongs
7. **Approval Gates**: Manual review before changing foundation
8. **Documentation**: Each layer has clear purpose and rules

## Migration Status

✅ **Complete** - All 50+ components migrated to new structure
✅ **Complete** - All imports updated
✅ **Complete** - Build compiles successfully
✅ **Complete** - Layer documentation created
⏳ **Pending** - ESLint enforcement rules

## Questions?

See individual README.md files in each layer directory for more details:
- `/1-tokens/README.md`
- `/2-utilities/README.md`
- `/3-primitives/README.md` (to be created)
- `/4-composites/README.md` (to be created)
- `/5-patterns/README.md` (to be created)
- `/6-layouts/README.md`
