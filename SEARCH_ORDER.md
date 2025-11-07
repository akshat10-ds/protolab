# Search Order Algorithm - Component Discovery Guide

**The definitive guide to finding and using components in the Ink Design System.**

This document explains the mandatory search order algorithm that MUST be followed when building any prototype or feature.

---

## 🎯 Core Principle

**Always search from highest level (Layer 6) to lowest level (Layer 2).**

This ensures you use the most appropriate, highest-level abstraction available, rather than reinventing compositions that already exist.

---

## 📊 The 6-Layer Hierarchy

```
┌─────────────────────────────────────────┐
│  Layer 6: Layouts (Page Templates)      │ ← START HERE
├─────────────────────────────────────────┤
│  Layer 5: Patterns (Complex UI)         │
├─────────────────────────────────────────┤
│  Layer 4: Composites (Multi-Component)  │
├─────────────────────────────────────────┤
│  Layer 3: Primitives (Atomic Elements)  │
├─────────────────────────────────────────┤
│  Layer 2: Utilities (Layout Helpers)    │
├─────────────────────────────────────────┤
│  Layer 1: Tokens (Design Constants)     │ ← Foundation
└─────────────────────────────────────────┘
```

**Search Direction**: Top → Down (Layer 6 → 2)
**Build Direction**: Outside → In (Layouts contain Patterns contain Composites...)

---

## 🔍 The Algorithm (Step-by-Step)

### Step 1: Check Layer 6 (Layouts)

**Question**: "Can I use a full page template?"

**Available Components**: 2 layouts
- `DashboardLayout` - Dashboard pages with sidebar, header, content
- `AuthLayout` - Centered authentication pages (login, signup)

**Decision Matrix**:
```
Building dashboard/admin page?     → Use DashboardLayout
Building login/signup page?        → Use AuthLayout
Building custom page structure?    → Move to Step 2
```

**If Found**: Start with this layout and proceed to fill in children
**If Not Found**: Move to Step 2

**Example**:
```tsx
User: "Create an analytics dashboard"
→ Check Layer 6
→ Found: DashboardLayout
→ Decision: START HERE
```

---

### Step 2: Check Layer 5 (Patterns)

**Question**: "What complex UI patterns do I need?"

**Available Components**: 3 patterns
- `VerticalNavigation` - Sidebar navigation with collapsible sections
- `GlobalNav` - Top-level application navigation bar
- `LocalNav` - Context-specific section navigation

**Decision Matrix**:
```
Need sidebar navigation?       → VerticalNavigation
Need top nav bar?             → GlobalNav
Need section-specific nav?    → LocalNav
No navigation needed?         → Move to Step 3
```

**If Found**: Use these patterns for navigation structure
**Always**: Continue to Step 3 for content components

**Example**:
```tsx
User: "Add a sidebar menu to the dashboard"
→ Check Layer 5
→ Found: VerticalNavigation
→ Decision: Use for sidebar
→ Continue to Step 3 for page content
```

---

### Step 3: Check Layer 4 (Composites)

**Question**: "What composed components do I need?"

**Available Components**: 18 composites

**By Category**:

**Data Display**:
- `Table` - Data grid with sorting, selection, custom rendering
- `List` - Vertical list with leading/trailing content

**Forms & Input**:
- `SearchInput` - Input with search icon and suggestions
- `ComboBox` - Searchable dropdown selection
- `DatePicker` - Calendar date selector
- `FileInput` - File upload with drag-and-drop
- `FileUpload` - Advanced file upload with progress

**Navigation & Organization**:
- `Tabs` - Tab switching between sections
- `Accordion` - Collapsible content sections
- `Breadcrumb` - Hierarchical navigation trail
- `Pagination` - Page navigation controls

**Overlays & Feedback**:
- `Modal` - Dialog overlays for focused tasks
- `Drawer` - Side panels that slide in
- `Popover` - Floating content containers
- `Alert` - Prominent status messages
- `Dropdown` - Context menus with actions

**Actions**:
- `ComboButton` - Button with dropdown menu
- `FilterTag` - Dismissible filter chips

**Decision Matrix**:
```
Need data table?              → Table
Need search functionality?    → SearchInput
Need date selection?          → DatePicker
Need modal/dialog?            → Modal
Need tabs/sections?           → Tabs
Need dropdown menu?           → Dropdown
...and so on
```

**If Found**: Identify ALL needed composites for the prototype
**Always**: Continue to Step 4 for basic elements

**Example**:
```tsx
User: "Show users in a table with search"
→ Check Layer 4
→ Found: Table (data grid)
→ Found: SearchInput (search functionality)
→ Decision: Use both
→ Continue to Step 4 for buttons, cards, etc.
```

---

### Step 4: Use Layer 3 (Primitives)

**Question**: "What basic building blocks do I need?"

**Available Components**: 26 primitives

**By Category**:

**Actions**:
- `Button` - Primary action component (5 variants)
- `IconButton` - Icon-only buttons
- `Link` - Styled hyperlinks

**Forms**:
- `Input` - Text input (email, password, number, etc.)
- `Select` - Dropdown selection
- `Checkbox` - Boolean selection
- `Radio` - Single choice from options
- `Switch` - Toggle on/off
- `TextArea` - Multi-line text input
- `Slider` - Range input
- `Stepper` - Number with increment/decrement

**Display**:
- `Card` - Content container with elevation
- `Badge` - Status and categorical labels
- `Chip` - Compact removable tags
- `Avatar` - User images or initials
- `AlertBadge` - Notification count badges
- `StatusLight` - Status indicator dots
- `Divider` - Visual separators

**Typography**:
- `Heading` - Semantic headings (h1-h6)
- `Text` - Body text with variants

**Feedback**:
- `Spinner` - Loading indicator
- `ProgressBar` - Progress visualization
- `Skeleton` - Loading placeholders
- `Callout` - Inline informational messages
- `Banner` - Full-width alert banners
- `Tooltip` - Hover information

**Icons**:
- `Icon` - 50+ built-in SVG icons

**Decision**: ALWAYS AVAILABLE - Use as needed

**Example**:
```tsx
User: "Add save and cancel buttons"
→ Use Layer 3
→ Found: Button primitive
→ Implementation: <Button kind="brand">Save</Button>
```

---

### Step 5: Apply Layer 2 (Utilities)

**Question**: "How should I lay out these components?"

**Available Components**: 5 utilities
- `Stack` - Vertical or horizontal flex layout with consistent spacing
- `Grid` - CSS Grid with responsive columns
- `Inline` - Optimized horizontal inline layout
- `Container` - Max-width centering container
- `Spacer` - Fixed or flexible spacing element

**Decision Matrix**:
```
Vertical form layout?         → Stack (direction="vertical")
Horizontal button group?      → Inline or Stack (direction="horizontal")
Card grid (3 columns)?        → Grid (columns={3})
Center content with max-width? → Container
Need explicit spacing?        → Spacer
```

**Always Use**: For layout structure

**Example**:
```tsx
User: "Layout form fields vertically"
→ Use Layer 2
→ Found: Stack
→ Implementation: <Stack direction="vertical" gap="medium">
```

---

### Step 6: Reference Layer 1 (Tokens)

**Question**: "What styling values should I use?"

**Available Tokens**:

**Colors**:
- `--ink-bg-*` - Background colors
- `--ink-font-*` - Text colors
- `--ink-border-*` - Border colors
- `--ink-cobalt-*`, `--ink-green-*`, `--ink-red-*`, `--ink-orange-*` - Brand colors

**Spacing**:
- `--ink-spacing-50` (4px)
- `--ink-spacing-100` (8px)
- `--ink-spacing-150` (12px)
- `--ink-spacing-200` (16px)
- `--ink-spacing-300` (24px)
- `--ink-spacing-400` (32px)

**Typography**:
- `--ink-font-family`
- `--ink-font-display-*` - Display text sizes
- `--ink-font-heading-*` - Heading sizes
- `--ink-font-body-*` - Body text sizes
- `--ink-font-detail-*` - Small text sizes

**Border Radius**:
- `--ink-radius-size-xs` (4px)
- `--ink-radius-size-s` (8px)
- `--ink-radius-size-m` (12px)
- `--ink-radius-size-l` (16px)
- `--ink-radius-size-full` (9999px)

**Decision**: Use for any custom styling needs

**Example**:
```css
.custom-element {
  background: var(--ink-bg-default);
  color: var(--ink-font-default);
  padding: var(--ink-spacing-200);
  border-radius: var(--ink-radius-size-s);
}
```

---

## 📚 Complete Example: User Analytics Dashboard

**User Request**: "Create a dashboard showing user analytics, with filters, search, and a data table"

### Applying the Search Order

#### Layer 6 Check: Layouts
```
Q: Can I use a page template?
A: Yes! DashboardLayout exists for dashboards

Decision: START with DashboardLayout
```

#### Layer 5 Check: Patterns
```
Q: What navigation do I need?
A: Sidebar navigation for dashboard sections

Decision: Use VerticalNavigation for sidebar
```

#### Layer 4 Check: Composites
```
Q: What composed components do I need?
A:
- Table (for user data)
- SearchInput (for searching users)
- FilterTag (for active filters)
- Pagination (if many users)

Decision: Use all 4 composites
```

#### Layer 3 Check: Primitives
```
Q: What basic elements do I need?
A:
- Card (for stat displays)
- Badge (for user status)
- Button (for actions)
- Heading (for section titles)
- Text (for labels)
- Icon (for visual indicators)

Decision: Use these primitives
```

#### Layer 2 Check: Utilities
```
Q: How do I lay this out?
A:
- Grid (for stat cards in 3 columns)
- Stack (for vertical content flow)
- Inline (for search + filters row)

Decision: Use for layout structure
```

#### Layer 1 Check: Tokens
```
Q: Any custom styling needed?
A: Use design tokens for spacing and colors

Decision: Reference tokens.css
```

### Final Implementation

```tsx
import {
  // Layer 6 - Layout
  DashboardLayout,
  // Layer 5 - Patterns
  VerticalNavigation,
  // Layer 4 - Composites
  Table,
  SearchInput,
  FilterTag,
  Pagination,
  // Layer 3 - Primitives
  Card,
  Badge,
  Button,
  Heading,
  Text,
  Icon,
  // Layer 2 - Utilities
  Stack,
  Grid,
  Inline
} from '@/design-system';

export function UserAnalyticsDashboard() {
  return (
    <DashboardLayout                                     // Layer 6
      navigation={<VerticalNavigation items={navItems} />} // Layer 5
    >
      <Stack direction="vertical" gap="large">           // Layer 2
        {/* Stats Row */}
        <Grid columns={3} gap="medium">                  // Layer 2
          <Card>                                          // Layer 3
            <Heading level={2}>1,234</Heading>           // Layer 3
            <Text>Total Users</Text>                     // Layer 3
          </Card>
          <Card>
            <Heading level={2}>856</Heading>
            <Text>Active Users</Text>
          </Card>
          <Card>
            <Heading level={2}>+12%</Heading>
            <Text>Growth</Text>
          </Card>
        </Grid>

        {/* Search and Filters */}
        <Inline gap="small" align="center">             // Layer 2
          <SearchInput                                   // Layer 4
            placeholder="Search users..."
            onSearch={handleSearch}
          />
          <FilterTag label="Active" dismissible />       // Layer 4
          <FilterTag label="Premium" dismissible />
          <Button kind="secondary">                      // Layer 3
            <Icon name="filter" />                       // Layer 3
            More Filters
          </Button>
        </Inline>

        {/* Data Table */}
        <Card>                                           // Layer 3
          <Table                                         // Layer 4
            columns={[
              { key: 'name', label: 'Name', sortable: true },
              { key: 'email', label: 'Email' },
              {
                key: 'status',
                label: 'Status',
                render: (row) => (
                  <Badge variant={row.active ? 'success' : 'neutral'}>
                    {row.active ? 'Active' : 'Inactive'}
                  </Badge>
                )
              }
            ]}
            data={users}
            selectable
          />
          <Pagination                                    // Layer 4
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Card>
      </Stack>
    </DashboardLayout>
  );
}
```

**Component Tree Visualization**:
```
DashboardLayout (L6)
└─ VerticalNavigation (L5)
└─ Stack (L2)
   ├─ Grid (L2)
   │  ├─ Card (L3) → Heading (L3), Text (L3)
   │  ├─ Card (L3) → Heading (L3), Text (L3)
   │  └─ Card (L3) → Heading (L3), Text (L3)
   ├─ Inline (L2)
   │  ├─ SearchInput (L4)
   │  ├─ FilterTag (L4)
   │  ├─ FilterTag (L4)
   │  └─ Button (L3) → Icon (L3)
   └─ Card (L3)
      ├─ Table (L4) → Badge (L3)
      └─ Pagination (L4)
```

---

## 🚫 Anti-Patterns (What NOT to Do)

### ❌ Skipping Layers

**Wrong**:
```tsx
// Jumping straight to primitives without checking layouts
<div>
  <Button>Nav Item 1</Button>
  <Button>Nav Item 2</Button>
</div>
// Should have checked Layer 5 for VerticalNavigation!
```

**Right**:
```tsx
// Check Layer 5 first
<VerticalNavigation
  items={[
    { label: 'Nav Item 1', href: '/item1' },
    { label: 'Nav Item 2', href: '/item2' }
  ]}
/>
```

### ❌ Assuming Components Don't Exist

**Wrong**:
```tsx
// Creating custom composition without checking
<div style={{ display: 'flex', alignItems: 'center' }}>
  <input type="text" />
  <SearchIcon />
</div>
// SearchInput composite exists in Layer 4!
```

**Right**:
```tsx
// Check Layer 4 for composites first
<SearchInput placeholder="Search..." />
```

### ❌ Reinventing Existing Patterns

**Wrong**:
```tsx
// Building custom table from scratch
<div className="custom-table">
  {data.map(row => (
    <div key={row.id} className="row">
      {/* Manual row rendering */}
    </div>
  ))}
</div>
// Table composite exists!
```

**Right**:
```tsx
// Use existing Table from Layer 4
<Table columns={columns} data={data} />
```

---

## 🎯 Quick Decision Tree

```
┌─────────────────────────────────────┐
│   New Prototype or Feature          │
└────────────┬────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│ Layer 6: Need full page template?   │
│ • DashboardLayout?                   │
│ • AuthLayout?                        │
└────────┬─────────────────┬───────────┘
         │                 │
         ▼ YES             ▼ NO
    Use it!          Continue...
                          │
                          ▼
    ┌─────────────────────────────────────┐
    │ Layer 5: Need navigation patterns?  │
    │ • VerticalNavigation?                │
    │ • GlobalNav?                         │
    │ • LocalNav?                          │
    └────────┬─────────────────┬───────────┘
             │                 │
             ▼ YES             ▼ NO
        Use them!        Continue...
                              │
                              ▼
        ┌──────────────────────────────────────┐
        │ Layer 4: Need composed components?   │
        │ • Table? Modal? SearchInput?         │
        │ • Tabs? Accordion? Dropdown?         │
        └────────┬─────────────────┬────────────┘
                 │                 │
                 ▼ YES             ▼ NO
            Use them!        Continue...
                                  │
                                  ▼
            ┌───────────────────────────────────┐
            │ Layer 3: Use primitives           │
            │ Button, Input, Card, etc.         │
            └───────────────┬───────────────────┘
                            │
                            ▼
            ┌───────────────────────────────────┐
            │ Layer 2: Apply utilities          │
            │ Stack, Grid, Container, etc.      │
            └───────────────┬───────────────────┘
                            │
                            ▼
            ┌───────────────────────────────────┐
            │ Layer 1: Use tokens for styling   │
            │ --ink-spacing-*, --ink-bg-*, etc. │
            └───────────────────────────────────┘
```

---

## 📋 Search Order Checklist

Before implementing ANY feature:

- [ ] **Layer 6**: Checked for applicable layout
- [ ] **Layer 5**: Checked for applicable patterns
- [ ] **Layer 4**: Identified all needed composites
- [ ] **Layer 3**: Identified all needed primitives
- [ ] **Layer 2**: Planned layout structure with utilities
- [ ] **Layer 1**: Identified any custom styling needs

**If ALL layers checked → Proceed with implementation**
**If skipped layers → STOP and check them first**

---

## 🔗 Related Resources

- **[COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md)** - Complete component index
- **[WORKFLOW.md](./WORKFLOW.md)** - Mandatory development process
- **[WHY.md](./WHY.md)** - Project philosophy and rationale
- **[component-registry.json](./component-registry.json)** - Structured component metadata

---

## 💡 Pro Tips

1. **Bookmark COMPONENT_CATALOG.md** - Your quick reference guide
2. **Search before building** - 90% of the time, it already exists
3. **Start high, go low** - Always check Layer 6 first
4. **Compose creatively** - No exact match? Combine primitives
5. **Ask before creating** - If nothing fits, discuss with user first
6. **Trust the system** - The constraint is the feature

---

**Remember**: The search order isn't bureaucracy - it's a forcing function that ensures you find the best, most maintainable solution.

**Follow Layer 6 → 5 → 4 → 3 → 2 → 1, always.**
