# Component Catalog

**Complete index of all 50+ components in the Ink Design System.**

Use this document to quickly discover what components exist and where to find detailed documentation.

---

## 📊 Quick Reference Table

| Component | Layer | Use When | Basic Example |
|-----------|-------|----------|---------------|
| **Layouts** |||||
| DashboardLayout | Layout (6) | Dashboard pages with sidebar | `<DashboardLayout navigation={...}>` |
| AuthLayout | Layout (6) | Login/signup pages | `<AuthLayout variant="split">` |
| **Patterns** |||||
| VerticalNavigation | Pattern (5) | Sidebar navigation | `<VerticalNavigation items={navItems} />` |
| GlobalNav | Pattern (5) | Top navigation bar | `<GlobalNav items={items} />` |
| LocalNav | Pattern (5) | Context-specific nav | `<LocalNav items={contextItems} />` |
| **Composites** |||||
| SearchInput | Composite (4) | Search with icon | `<SearchInput placeholder="Search..." />` |
| FileInput | Composite (4) | File upload | `<FileInput accept=".pdf" />` |
| ComboBox | Composite (4) | Searchable dropdown | `<ComboBox options={opts} searchable />` |
| DatePicker | Composite (4) | Date selection | `<DatePicker value={date} />` |
| FileUpload | Composite (4) | Advanced file upload | `<FileUpload multiple showProgress />` |
| FilterTag | Composite (4) | Dismissible filter chips | `<FilterTag label="Active" dismissible />` |
| Breadcrumb | Composite (4) | Navigation trail | `<Breadcrumb items={path} />` |
| Pagination | Composite (4) | Page navigation | `<Pagination currentPage={1} totalPages={10} />` |
| Tabs | Composite (4) | Tab switching | `<Tabs value={active} tabs={tabList} />` |
| Accordion | Composite (4) | Collapsible sections | `<Accordion items={sections} />` |
| ComboButton | Composite (4) | Button with dropdown | `<ComboButton label="Actions" items={actions} />` |
| Modal | Composite (4) | Dialog overlays | `<Modal open={isOpen} title="..." />` |
| Popover | Composite (4) | Floating content | `<Popover trigger={<Button />} content={...} />` |
| Dropdown | Composite (4) | Context menus | `<Dropdown items={menuItems} />` |
| Drawer | Composite (4) | Side panels | `<Drawer open={isOpen} position="right" />` |
| Alert | Composite (4) | Prominent messages | `<Alert kind="warning" title="..." />` |
| Table | Composite (4) | Data grids | `<Table columns={cols} data={rows} />` |
| List | Composite (4) | Vertical lists | `<List items={listItems} />` |
| **Primitives** |||||
| Button | Primitive (3) | Actions | `<Button kind="primary">Click</Button>` |
| IconButton | Primitive (3) | Icon-only actions | `<IconButton icon="close" />` |
| Link | Primitive (3) | Hyperlinks | `<Link href="/page">Go</Link>` |
| Input | Primitive (3) | Text input | `<Input label="Name" />` |
| Select | Primitive (3) | Dropdown selection | `<Select options={opts} />` |
| Checkbox | Primitive (3) | Boolean selection | `<Checkbox label="Accept" />` |
| Radio | Primitive (3) | Single choice | `<Radio label="Option A" />` |
| Switch | Primitive (3) | Toggle | `<Switch label="Enable" />` |
| TextArea | Primitive (3) | Multi-line text | `<TextArea label="Comments" />` |
| Slider | Primitive (3) | Range input | `<Slider min={0} max={100} />` |
| Stepper | Primitive (3) | Number increment | `<Stepper value={count} />` |
| Badge | Primitive (3) | Status labels | `<Badge variant="success">Active</Badge>` |
| Avatar | Primitive (3) | User images | `<Avatar src="/user.jpg" />` |
| Chip | Primitive (3) | Compact tags | `<Chip label="React" />` |
| AlertBadge | Primitive (3) | Notification badges | `<AlertBadge count={5} />` |
| StatusLight | Primitive (3) | Status indicators | `<StatusLight status="online" />` |
| Divider | Primitive (3) | Visual separators | `<Divider />` |
| Card | Primitive (3) | Content containers | `<Card>Content</Card>` |
| Skeleton | Primitive (3) | Loading placeholders | `<Skeleton variant="text" />` |
| Heading | Primitive (3) | Headings (h1-h6) | `<Heading level={1}>Title</Heading>` |
| Text | Primitive (3) | Body text | `<Text variant="body">Text</Text>` |
| Spinner | Primitive (3) | Loading indicators | `<Spinner size="medium" />` |
| ProgressBar | Primitive (3) | Progress indicators | `<ProgressBar value={75} />` |
| Callout | Primitive (3) | Info messages | `<Callout variant="info">Note</Callout>` |
| Banner | Primitive (3) | Alert banners | `<Banner variant="warning">Alert</Banner>` |
| Tooltip | Primitive (3) | Hover info | `<Tooltip content="Info">Hover</Tooltip>` |
| Icon | Primitive (3) | SVG icons (50+) | `<Icon name="search" size="medium" />` |
| **Utilities** |||||
| Stack | Utility (2) | Vertical/horizontal layout | `<Stack direction="vertical" gap="medium">` |
| Grid | Utility (2) | Grid layout | `<Grid columns={3} gap="medium">` |
| Inline | Utility (2) | Horizontal inline | `<Inline gap="small">` |
| Container | Utility (2) | Max-width centering | `<Container size="large">` |
| Spacer | Utility (2) | Fixed/flexible spacing | `<Spacer size="large" />` |

**Total: 54 components** (2 Layouts + 3 Patterns + 18 Composites + 26 Primitives + 5 Utilities)

---

## 🎨 Components by Use Case

### Forms & Input

**Basic Inputs (Primitives)**:
- **Input** - Text input fields (text, email, password, number, etc.)
- **TextArea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Boolean selection
- **Radio** - Single choice from options
- **Switch** - Toggle on/off
- **Slider** - Range selection
- **Stepper** - Number with increment/decrement

**Advanced Inputs (Composites)**:
- **SearchInput** - Input with search icon and suggestions
- **FileInput** - File upload with drag-and-drop
- **FileUpload** - Advanced file upload with progress
- **ComboBox** - Searchable select dropdown
- **DatePicker** - Calendar date selection

**Form Layout**:
- **Stack** (Utility) - Vertical form layout
- **Grid** (Utility) - Multi-column forms

---

### Navigation

**Page-Level (Patterns)**:
- **VerticalNavigation** - Sidebar navigation with collapsible sections
- **GlobalNav** - Top-level application navigation
- **LocalNav** - Context-specific navigation

**Component-Level (Composites)**:
- **Tabs** - Tab switching
- **Breadcrumb** - Hierarchical navigation trail
- **Pagination** - Page navigation controls

**Basic Links (Primitives)**:
- **Link** - Styled hyperlinks

---

### Data Display

**Lists & Tables (Composites)**:
- **Table** - Data grid with sorting, selection, custom rendering
- **List** - Vertical list with leading/trailing content

**Cards & Containers (Primitives)**:
- **Card** - Content container with optional elevation

**Status & Labels (Primitives)**:
- **Badge** - Status and categorical labels
- **Chip** - Compact removable tags
- **AlertBadge** - Notification count badges
- **StatusLight** - Small status indicator dots

**Media (Primitives)**:
- **Avatar** - User profile images or initials

**Separators (Primitives)**:
- **Divider** - Horizontal/vertical separators

---

### Layout

**Application Templates (Layouts)**:
- **DashboardLayout** - Dashboard with sidebar, header, content areas
- **AuthLayout** - Centered authentication forms

**Layout Utilities**:
- **Stack** - Vertical/horizontal flex layout
- **Grid** - CSS Grid with responsive columns
- **Inline** - Optimized horizontal layout
- **Container** - Max-width centering
- **Spacer** - Fixed or flexible spacing

---

### Overlays & Modals

**Dialogs & Panels (Composites)**:
- **Modal** - Dialog overlays
- **Drawer** - Side panels that slide in
- **Popover** - Floating content containers
- **Dropdown** - Contextual menus

**Tooltips (Primitives)**:
- **Tooltip** - Hover information

---

### Feedback & Status

**Alerts & Messages (Composites)**:
- **Alert** - Prominent status messages with actions

**Banners & Callouts (Primitives)**:
- **Banner** - Full-width announcements
- **Callout** - Inline informational messages

**Loading States (Primitives)**:
- **Spinner** - Loading indicators
- **ProgressBar** - Progress visualization
- **Skeleton** - Content loading placeholders

---

### Actions

**Buttons (Primitives)**:
- **Button** - Primary action component (5 variants: brand, primary, secondary, tertiary, danger)
- **IconButton** - Icon-only buttons
- **Link** - Text links

**Advanced Actions (Composites)**:
- **ComboButton** - Button with dropdown actions
- **FilterTag** - Dismissible filter chips

---

### Typography

**Text Components (Primitives)**:
- **Heading** - Semantic headings (h1-h6) with consistent sizing
- **Text** - Body text with variants (body, caption, label, code)

---

### Icons

**Icon System (Primitive)**:
- **Icon** - Icon component with 50+ built-in icons (Layer 3)
  - Navigation: arrow-left, arrow-right, chevron-down, menu, close
  - Actions: add, edit, delete, save, search, filter, refresh, download, upload, share
  - Status: check, error, warning, info, help, star, heart
  - Common: user, users, settings, home, document, folder, calendar, clock, bell, mail
  - UI: more-horizontal, more-vertical, expand, collapse, external-link, copy, eye, lock

See `src/design-system/3-primitives/Icon/README.md` for complete icon list.

---

## 🎯 Components by Complexity

### Level 1: Utilities (Layout Only)
Use these for layout and spacing. No visual styling.
- Stack, Grid, Inline, Container, Spacer

### Level 2: Simple Primitives
Single-purpose, atomic components.
- Button, Input, Badge, Icon, Divider, Spinner

### Level 3: Rich Primitives
Primitives with more features or state.
- Select, Checkbox, Radio, Switch, TextArea, Slider, Card, Avatar, Tooltip

### Level 4: Composites
Combine multiple primitives.
- Modal, Table, SearchInput, Accordion, Tabs, Dropdown

### Level 5: Patterns
Complex UI patterns.
- VerticalNavigation, GlobalNav, LocalNav

### Level 6: Layouts
Full page templates.
- DashboardLayout, AuthLayout

---

## 🔗 Figma Element Mapping

When implementing Figma designs, map Figma elements to Ink components:

| Figma Element | Ink Component | Layer | Notes |
|---------------|---------------|-------|-------|
| **Layout** ||||
| Auto Layout (vertical) | Stack | Utility | Use `direction="vertical"` |
| Auto Layout (horizontal) | Stack or Inline | Utility | Stack for general, Inline for inline content |
| Frame (fixed width) | Container | Utility | Use `size` prop for max-width |
| Spacer/Gap | Spacer | Utility | Use for explicit spacing |
| Grid Layout | Grid | Utility | Use `columns` prop |
| **Components** ||||
| Button | Button | Primitive | Map variant to `kind` prop |
| Input Field | Input | Primitive | Various `type` options |
| Search Field | SearchInput | Composite | Includes icon and suggestions |
| Dropdown | Select or ComboBox | Prim/Comp | Select for simple, ComboBox for searchable |
| Checkbox | Checkbox | Primitive | |
| Radio Button | Radio | Primitive | |
| Toggle/Switch | Switch | Primitive | |
| Text Area | TextArea | Primitive | |
| Date Picker | DatePicker | Composite | |
| File Upload | FileInput or FileUpload | Composite | FileUpload for advanced features |
| **Navigation** ||||
| Sidebar Nav | VerticalNavigation | Pattern | Collapsible navigation |
| Top Nav Bar | GlobalNav | Pattern | Application header |
| Tabs | Tabs | Composite | Tab navigation |
| Breadcrumbs | Breadcrumb | Composite | Path navigation |
| Pagination | Pagination | Composite | Page controls |
| **Data** ||||
| Table | Table | Composite | Sortable, selectable |
| List | List | Composite | Vertical items |
| Card | Card | Primitive | Content container |
| **Feedback** ||||
| Alert/Toast | Alert or Banner | Composite/Prim | Alert for prominent, Banner for full-width |
| Modal/Dialog | Modal | Composite | Overlay dialog |
| Drawer/Sheet | Drawer | Composite | Side panel |
| Tooltip | Tooltip | Primitive | Hover info |
| Loading Spinner | Spinner | Primitive | Indeterminate loading |
| Progress Bar | ProgressBar | Primitive | Determinate progress |
| Skeleton | Skeleton | Primitive | Loading placeholder |
| **Display** ||||
| Badge | Badge | Primitive | Status labels |
| Tag/Chip | Chip | Primitive | Removable tags |
| Notification Badge | AlertBadge | Primitive | Count indicators |
| Status Dot | StatusLight | Primitive | Online/offline indicators |
| Avatar | Avatar | Primitive | User images |
| Divider/Separator | Divider | Primitive | Visual separator |
| Icon | Icon | Primitive | SVG icons |
| **Typography** ||||
| Heading | Heading | Primitive | H1-H6 |
| Body Text | Text | Primitive | Paragraph text |
| **Actions** ||||
| Icon Button | IconButton | Primitive | Icon-only button |
| Link | Link | Primitive | Hyperlink |
| Button Group | Multiple Buttons with Inline | Utility | Use Inline to group |
| Split Button | ComboButton | Composite | Button with dropdown |

---

## 📖 Detailed Documentation

For complete component APIs, props, and examples, see the Layer READMEs:

- **[Layer 1: Tokens](./src/design-system/1-tokens/README.md)** - Design tokens (colors, spacing, typography)
- **[Layer 2: Utilities](./src/design-system/2-utilities/README.md)** - Layout helpers
- **[Layer 3: Primitives](./src/design-system/3-primitives/README.md)** - Atomic components (26 components)
- **[Layer 4: Composites](./src/design-system/4-composites/README.md)** - Composed components (18 components)
- **[Layer 5: Patterns](./src/design-system/5-patterns/README.md)** - UI patterns (3 patterns)
- **[Layer 6: Layouts](./src/design-system/6-layouts/README.md)** - Application templates (2 layouts)

---

## 🚀 Quick Start

### 1. Find a Component
Search this page for the component name or use case.

### 2. Check the Layer
Note which layer the component belongs to (Layout, Pattern, Composite, Primitive, Utility).

### 3. Read Detailed Docs
Go to the appropriate Layer README for full API documentation.

### 4. Import and Use
```tsx
import { ComponentName } from '@/design-system';

<ComponentName prop="value" />
```

---

## 💡 Component Selection Tips

### Starting a New Page?
1. Check Layouts first (DashboardLayout, AuthLayout)
2. Use Patterns for navigation (VerticalNavigation, GlobalNav)
3. Compose with Composites and Primitives

### Need a Form?
1. Use Stack for vertical layout
2. Use Input, Select, TextArea, Checkbox primitives
3. Use SearchInput, DatePicker, ComboBox for advanced inputs
4. Use Button for submission

### Need Data Display?
1. Use Table for structured data
2. Use List for simple vertical lists
3. Use Card for grouped content
4. Use Badge, Chip for labels

### Need Feedback?
1. Use Alert for prominent messages
2. Use Banner for announcements
3. Use Modal for critical actions
4. Use Tooltip for contextual help

---

**Remember**: This catalog shows what exists. For detailed APIs, always check the Layer READMEs.
