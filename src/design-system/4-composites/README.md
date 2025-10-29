# Layer 4: Composites

**Composed components that combine primitives in the Ink Design System hierarchy.**

## Purpose

Composites are components that compose multiple primitive components to create more complex UI elements. They:

- Combine primitives from Layer 3
- Use utilities from Layer 2 for layout
- Provide complete, self-contained UI patterns
- Handle more complex interactions and state
- Serve as building blocks for patterns and layouts

## Hierarchy Rules

### ✅ Allowed

- Import tokens from Layer 1
- Import utilities from Layer 2 (Stack, Grid, Inline, etc.)
- Import primitives from Layer 3 (Button, Input, Icon, etc.)
- Compose multiple primitives together
- Manage complex component state
- Handle advanced user interactions

### ❌ NOT Allowed

- Import other composite components (use shared primitives instead)
- Import from Layers 5-6 (patterns, layouts)
- Contain business logic or data fetching
- Make API calls
- Access global application state directly

## Available Composites (18 components)

### Form Components

#### SearchInput
Input field with search icon and optional suggestions.

```tsx
<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search..."
  suggestions={['React', 'Vue', 'Angular']}
  onSuggestionSelect={handleSelect}
  clearable
/>
```

**Features:**
- Built-in search icon
- Suggestion dropdown
- Clear button
- Loading state
- Debounced search

**Composed from:** Input, Icon, Button primitives

#### FileInput
File upload input with drag-and-drop.

```tsx
<FileInput
  label="Upload resume"
  accept=".pdf,.doc"
  multiple={false}
  maxSize={5000000}
  onChange={handleFileChange}
/>
```

**Features:**
- Drag-and-drop support
- File type filtering
- Size validation
- Preview thumbnails

**Composed from:** Input, Button, Icon, Text primitives

#### ComboBox
Searchable select dropdown with filtering.

```tsx
<ComboBox
  label="Select country"
  options={countries}
  value={selectedCountry}
  onChange={setCountry}
  placeholder="Search countries..."
/>
```

**Features:**
- Search/filter options
- Keyboard navigation
- Custom option rendering
- Grouped options support

**Composed from:** Input, Icon, Select primitives

#### DatePicker
Calendar-based date selection.

```tsx
<DatePicker
  label="Start date"
  value={startDate}
  onChange={setStartDate}
  minDate={new Date()}
  format="MM/DD/YYYY"
/>
```

**Features:**
- Calendar view
- Date range selection
- Min/max date constraints
- Custom formatting

**Composed from:** Input, Button, Icon, Calendar primitives

#### FileUpload
Advanced file upload with progress tracking.

```tsx
<FileUpload
  multiple
  accept="image/*"
  maxSize={10000000}
  onUpload={handleUpload}
  showProgress
/>
```

**Features:**
- Upload progress
- Multiple files
- File preview
- Upload queue management

**Composed from:** FileInput, ProgressBar, Button, Badge primitives

#### FilterTag
Dismissible tag for active filters.

```tsx
<FilterTag
  label="Status: Active"
  active
  dismissible
  onDismiss={handleRemove}
/>
```

**Features:**
- Active/inactive states
- Dismiss button
- Optional trigger icon
- Disabled state

**Composed from:** Chip, Icon, Button primitives

---

### Navigation Components

#### Breadcrumb
Hierarchical navigation trail.

```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details', href: '/products/123' }
  ]}
  separator="/"
  maxItems={3}
  collapsible
/>
```

**Features:**
- Collapsible overflow
- Custom separators
- Click handlers
- Current page indication

**Composed from:** Link, Icon, Text primitives

#### Pagination
Page navigation controls.

```tsx
<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
  mode="full"
  showItemsPerPage
/>
```

**Modes:**
- `full` - All page numbers with navigation
- `simple` - Previous/Next only
- `compact` - Minimal with input

**Composed from:** Button, IconButton, Select, Input primitives

#### Tabs
Tabbed content navigation.

```tsx
<Tabs
  value={activeTab}
  onChange={setActiveTab}
  tabs={[
    { value: 'overview', label: 'Overview', icon: 'info' },
    { value: 'settings', label: 'Settings', icon: 'settings' }
  ]}
  variant="underline"
/>
```

**Variants:** underline, pills, enclosed

**Composed from:** Button, Icon, Badge primitives

---

### Layout Components

#### Accordion
Collapsible content sections.

```tsx
<Accordion
  items={[
    {
      id: '1',
      title: 'Section 1',
      content: <p>Content here</p>,
      icon: 'info'
    }
  ]}
  allowMultiple
  defaultOpenItems={['1']}
/>
```

**Features:**
- Single or multiple open panels
- Icons and badges
- Controlled/uncontrolled state
- Custom rendering

**Composed from:** Button, Icon, Divider primitives

#### ComboButton
Button with dropdown actions.

```tsx
<ComboButton
  label="Actions"
  kind="primary"
  items={[
    { label: 'Edit', icon: 'edit', onClick: handleEdit },
    { label: 'Delete', icon: 'delete', onClick: handleDelete }
  ]}
/>
```

**Features:**
- Primary action + dropdown
- Icon support
- Grouped actions
- Disabled states

**Composed from:** Button, Icon, Dropdown primitives

---

### Overlay Components

#### Modal
Dialog overlay for focused interactions.

```tsx
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="medium"
  footer={
    <>
      <Button onClick={handleClose}>Cancel</Button>
      <Button kind="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure?</p>
</Modal>
```

**Sizes:** small, medium, large, xlarge

**Features:**
- Focus trap
- Escape key handling
- Backdrop click handling
- Portal rendering

**Composed from:** Card, IconButton, Button, Heading primitives

#### Popover
Floating content container.

```tsx
<Popover
  trigger={<Button>Open</Button>}
  content={<p>Popover content</p>}
  position="bottom"
  align="start"
/>
```

**Positions:** top, bottom, left, right
**Alignment:** start, center, end

**Composed from:** Card, Button, Portal utilities

#### Dropdown
Contextual menu overlay.

```tsx
<Dropdown
  items={[
    { label: 'Profile', icon: 'user', onClick: handleProfile },
    { label: 'Settings', icon: 'settings', onClick: handleSettings },
    { type: 'divider' },
    { label: 'Logout', icon: 'logout', onClick: handleLogout }
  ]}
  position="bottom"
>
  <IconButton icon="more-vertical" />
</Dropdown>
```

**Features:**
- Dividers and groups
- Icons and shortcuts
- Disabled items
- Nested menus (future)

**Composed from:** Button, Icon, Divider, Portal primitives

#### Drawer
Side panel overlay.

```tsx
<Drawer
  open={isOpen}
  onClose={handleClose}
  position="right"
  size="medium"
  title="Settings"
  footer={
    <Button onClick={handleSave} kind="primary">
      Save Changes
    </Button>
  }
>
  <SettingsForm />
</Drawer>
```

**Positions:** left, right, top, bottom
**Sizes:** small, medium, large, full

**Features:**
- Slide-in animation
- Optional overlay
- Header and footer slots
- Close button

**Composed from:** Card, IconButton, Button, Heading primitives

---

### Feedback Components

#### Alert
Prominent messaging component.

```tsx
<Alert
  kind="warning"
  title="Warning"
  icon={<Icon name="warning" />}
  action={{
    label: 'View Details',
    onClick: handleView
  }}
  onClose={handleClose}
  shape="round"
>
  Your session will expire in 5 minutes
</Alert>
```

**Kinds:** information, danger, success, warning, promo, subtle, neutral, neutralDark

**Features:**
- Title and description
- Action button
- Close button
- Custom icons
- Bottom border accent

**Composed from:** Button, IconButton, Icon, Text primitives

---

### Data Components

#### Table
Data grid with sorting and selection.

```tsx
<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', render: (row) => <Badge>{row.status}</Badge> }
  ]}
  data={users}
  selectable
  selectedRows={selected}
  onSelectionChange={setSelected}
  sortColumn="name"
  sortDirection="asc"
  onSortChange={handleSort}
  hoverable
  responsive
/>
```

**Features:**
- Column sorting
- Row selection
- Custom cell rendering
- Responsive layout
- Sticky header
- Loading states
- Empty states

**Composed from:** Checkbox, Icon, Spinner, Text primitives

#### List
Vertical list with rich item rendering.

```tsx
<List
  items={[
    {
      id: '1',
      leading: <Avatar src="/user.jpg" />,
      title: 'John Doe',
      description: 'john@example.com',
      trailing: <Badge>Admin</Badge>,
      onClick: handleClick
    }
  ]}
  variant="default"
  dividers
  hoverable
/>
```

**Variants:** default, bordered, filled

**Features:**
- Leading/trailing content
- Multi-line content
- Interactive items
- Dividers
- Custom rendering

**Composed from:** Avatar, Badge, Icon, Text, Divider primitives

---

## Usage in Higher Layers

Composites are used by:
- ✅ Layer 5: Patterns (patterns can use composites)
- ✅ Layer 6: Layouts (layouts can use composites)
- ❌ Layer 4: Other composites (NOT allowed - use shared primitives)

## Component Structure

Each composite component follows this structure:

```
4-composites/
└── ComponentName/
    ├── ComponentName.tsx         # Component implementation
    ├── ComponentName.module.css  # Styles (imports tokens)
    ├── ComponentName.stories.tsx # Storybook stories (optional)
    └── index.ts                  # Public exports
```

## CSS Guidelines

All composite CSS modules **must** start with:

```css
@import '../../1-tokens/tokens.css';
```

Composites should:
- Use utilities for layout when possible
- Apply minimal custom styling
- Let primitives handle most visual styling
- Use tokens for any custom styles

```css
/* ✅ Good - uses utilities and primitives */
<Stack gap="medium">
  <Input />
  <Button />
</Stack>

/* ❌ Avoid - reimplementing layout */
.composite {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

## Import Patterns

```tsx
// ✅ Within design system - relative imports
import { Button } from '../../3-primitives/Button';
import { Icon } from '../../3-primitives/Icon';
import { Stack } from '../../2-utilities/Stack';

// ✅ From application code - main export
import { Modal, SearchInput, Table } from '@/design-system';

// ✅ From application code - layer export
import { Modal } from '@/design-system/4-composites';

// ❌ Don't import other composites
import { Dropdown } from '../Dropdown';  // Not allowed!

// ❌ Don't import from higher layers
import { GlobalNav } from '../../5-patterns/GlobalNav';  // Not allowed!
```

## Approval Gate

**Before adding new composites:**

1. **Confirm it composes primitives** - Does it combine 2+ primitives?
2. **Check for existing composites** - Can you use/extend an existing one?
3. **Ensure no composite dependencies** - Does it need other composites? (Not allowed)
4. **Validate reusability** - Will it be used in multiple contexts?
5. **Document thoroughly** - Add to this README with examples
6. **Define clear API** - Props should be intuitive and consistent

**Questions to ask:**
- Does it only use primitives and utilities? → It's a Composite ✅
- Does it depend on other composites? → Refactor to share primitives
- Is it specific to one page/pattern? → Maybe it's a Pattern instead
- Could this be a primitive? → Check if it truly needs composition

## Common Patterns

### Controlled Components
Most composites support controlled/uncontrolled state:

```tsx
// Controlled
<Component value={value} onChange={setValue} />

// Uncontrolled with default
<Component defaultValue={initialValue} />
```

### Portal Rendering
Overlay composites render in portals:

```tsx
// Automatically renders in portal
<Modal open={isOpen}>Content</Modal>
```

### Composition Props
Composites accept render props for flexibility:

```tsx
<Table
  columns={columns}
  data={data}
  renderCell={(column, row) => <CustomCell />}
  renderEmpty={() => <EmptyState />}
/>
```

### Forward Refs
Composites that wrap inputs forward refs:

```tsx
const inputRef = useRef<HTMLInputElement>(null);
<SearchInput ref={inputRef} />
```

## Testing Composites

Test composites as integrated units:

```tsx
// Test composition
it('renders search input with icon and clear button', () => {
  render(<SearchInput value="test" clearable />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
});

// Test interactions
it('shows suggestions when typing', async () => {
  render(<SearchInput suggestions={['Apple', 'Banana']} />);
  const input = screen.getByRole('textbox');

  await userEvent.type(input, 'App');
  expect(screen.getByText('Apple')).toBeInTheDocument();
});

// Test state management
it('calls onChange with cleared value when clear clicked', async () => {
  const handleChange = jest.fn();
  render(<SearchInput value="test" onChange={handleChange} clearable />);

  await userEvent.click(screen.getByRole('button', { name: /clear/i }));
  expect(handleChange).toHaveBeenCalledWith('');
});
```

## Storybook Organization

Composites are organized in Storybook by category:

- `Composites/Forms` - SearchInput, FileInput, ComboBox, etc.
- `Composites/Navigation` - Breadcrumb, Pagination, Tabs
- `Composites/Layout` - Accordion, ComboButton
- `Composites/Overlay` - Modal, Popover, Dropdown, Drawer
- `Composites/Feedback` - Alert
- `Composites/Data` - Table, List

## Design Principles

### Composition Over Configuration
Prefer accepting React nodes over complex configuration:

```tsx
// ✅ Good - flexible composition
<Modal
  header={<CustomHeader />}
  footer={<CustomFooter />}
>
  <Content />
</Modal>

// ❌ Avoid - rigid configuration
<Modal
  headerTitle="Title"
  headerIcon="check"
  footerButtonLabel="OK"
  footerButtonVariant="primary"
/>
```

### Single Responsibility
Each composite should have one clear purpose:

```tsx
// ✅ Good - focused responsibility
<SearchInput /> // Just search
<DatePicker />  // Just date picking

// ❌ Avoid - too many responsibilities
<SuperInput
  searchable
  datePicker
  fileUpload
  validation
/>
```

### Primitive Delegation
Delegate styling and behavior to primitives:

```tsx
// ✅ Good - uses Button primitive
<SearchInput clearButton={<Button variant="ghost">Clear</Button>} />

// ❌ Avoid - reimplements button
<SearchInput onClear={...} /> // Renders custom div with onClick
```

---

## See Also

- [ARCHITECTURE.md](/ARCHITECTURE.md) - Complete system hierarchy
- [Layer 3: Primitives](../3-primitives/README.md) - Atomic components
- [Layer 5: Patterns](../5-patterns/README.md) - UI patterns
- [Design Token System](../1-tokens/README.md) - Foundation tokens
