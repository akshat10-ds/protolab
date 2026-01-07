# Layer 5: Patterns

**Complex UI patterns composed from components in the Ink Design System hierarchy.**

## Purpose

Patterns are reusable, composed UI patterns that solve common interface challenges. They combine components from lower layers to create sophisticated, production-ready navigation and interaction patterns.

## Hierarchy Rules

### ✅ Allowed

- Import from Layers 1-4 (tokens, utilities, primitives, composites)
- Compose multiple components together
- Manage complex interaction states
- Handle keyboard navigation and accessibility
- Use utilities for layout (Stack, Grid, Inline)

### ❌ NOT Allowed

- Import from other patterns (no pattern-to-pattern dependencies)
- Import from Layer 6 (layouts)
- Contain business logic or data fetching
- Make API calls
- Access global application state

---

## Available Patterns (2)

### GlobalNav

**Purpose**: Top-level application navigation bar

**Use When**:
- Building application headers
- Need primary navigation across the app
- Want logo, search, user menu

**Features**:
- Logo/branding area
- Primary navigation links
- Search integration
- User profile menu
- Notification indicators
- Responsive design

**Basic Usage**:
```tsx
import { GlobalNav } from '@/design-system/5-patterns';

<GlobalNav
  logo={<img src="/logo.svg" alt="App Logo" />}
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'about', label: 'About', href: '/about' }
  ]}
  searchEnabled
  onSearch={(query) => console.log(query)}
  userMenu={{
    name: 'John Doe',
    avatar: '/avatar.jpg',
    items: [
      { label: 'Profile', onClick: () => navigate('/profile') },
      { label: 'Settings', onClick: () => navigate('/settings') },
      { type: 'divider' },
      { label: 'Logout', onClick: handleLogout }
    ]
  }}
  notifications={{
    count: 3,
    items: [
      { id: '1', title: 'New message', timestamp: '2m ago' },
      { id: '2', title: 'Update available', timestamp: '1h ago' }
    ]
  }}
/>
```

**Props**:
- `logo?: React.ReactNode` - Logo element
- `items: NavItem[]` - Primary navigation items
- `searchEnabled?: boolean` - Show search input
- `onSearch?: (query: string) => void` - Search handler
- `userMenu?: UserMenuConfig` - User profile menu configuration
- `notifications?: NotificationsConfig` - Notifications dropdown

**Composition**:
- Uses `Inline` (Utility) for horizontal layout
- Uses `Button` and `Link` (Primitives) for navigation
- Uses `SearchInput` (Composite) for search
- Uses `Dropdown` (Composite) for user menu
- Uses `Avatar` (Primitive) for user profile
- Uses `AlertBadge` (Primitive) for notification count

---

### LocalNav

**Purpose**: Context-specific navigation within a section

**Use When**:
- Building section-specific navigation
- Need tabs or segmented controls
- Navigation is scoped to current page/section

**Features**:
- Horizontal tab-style navigation
- Active state indication
- Optional secondary actions
- Compact design

**Basic Usage**:
```tsx
import { LocalNav } from '@/design-system/5-patterns';

<LocalNav
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'activity', label: 'Activity', badge: '12' },
    { id: 'settings', label: 'Settings' }
  ]}
  activeId="overview"
  onItemClick={(id) => setActiveTab(id)}
  actions={
    <Button kind="primary" size="small">
      New Item
    </Button>
  }
/>
```

**Props**:
- `items: LocalNavItem[]` - Navigation items
- `activeId: string` - Currently active item ID
- `onItemClick: (id: string) => void` - Item click handler
- `actions?: React.ReactNode` - Optional action buttons
- `variant?: 'tabs' | 'pills'` - Visual style

**LocalNavItem Interface**:
```typescript
interface LocalNavItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
  icon?: string;
}
```

**Composition**:
- Uses `Inline` (Utility) for horizontal layout
- Uses `Button` (Primitive) for items
- Uses `Badge` (Primitive) for counts
- Uses `Divider` (Primitive) for visual separation

---

## Usage in Higher Layers

Patterns can be used by:
- ✅ **Layer 6 (Layouts)** - Layouts compose patterns for complete page templates
- ❌ **Other patterns** - Patterns should NOT depend on each other

---

## Component Structure

Each pattern follows this structure:

```
5-patterns/
└── PatternName/
    ├── PatternName.tsx           # Pattern implementation
    ├── PatternName.module.css    # Styles (imports tokens)
    ├── PatternName.stories.tsx   # Storybook stories (optional)
    └── index.ts                  # Public exports
```

---

## Import Patterns

### Within Design System
```tsx
// ✅ Import from lower layers
import { Stack } from '../../2-utilities/Stack';
import { Button } from '../../3-primitives/Button';
import { SearchInput } from '../../4-composites/SearchInput';
```

### From Application Code
```tsx
// ✅ From main export
import { GlobalNav, LocalNav } from '@/design-system';

// ✅ From layer export
import { LocalNav } from '@/design-system/5-patterns';

// ❌ Don't import from old structure
import { LocalNav } from '@/design-system/patterns';
```

---

## CSS Guidelines

All pattern CSS modules must start with:

```css
@import '../../1-tokens/tokens.css';
```

Use tokens for styling:
```css
.navigation {
  background: var(--ink-bg-default);
  border-right: 1px solid var(--ink-border-default);
  padding: var(--ink-spacing-200);
}

.navItem {
  color: var(--ink-font-default);
  border-radius: var(--ink-radius-size-xs);
}

.navItem:hover {
  background: var(--ink-bg-accent-subtle);
}

.navItemActive {
  background: var(--ink-bg-accent);
  color: var(--ink-font-accent);
}
```

---

## Accessibility

Patterns must include:

1. **Keyboard Navigation**:
   - Arrow keys for navigation items
   - Enter/Space for activation
   - Tab for focus management

2. **ARIA Attributes**:
   - `role="navigation"` on nav containers
   - `aria-current="page"` for active items
   - `aria-label` for icon-only buttons
   - `aria-expanded` for collapsible sections

3. **Focus Management**:
   - Visible focus indicators
   - Focus trap in modals (if applicable)
   - Logical tab order

**Example**:
```tsx
<nav role="navigation" aria-label="Main navigation">
  <button
    aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
    aria-expanded={!collapsed}
    onClick={onCollapse}
  >
    <Icon name="menu" />
  </button>
  {items.map(item => (
    <a
      href={item.href}
      aria-current={item.id === activeId ? 'page' : undefined}
    >
      {item.label}
    </a>
  ))}
</nav>
```

---

## Common Patterns

### Navigation State Management

```tsx
const [activeId, setActiveId] = useState('dashboard');

<LocalNav
  headerLabel="My App"
  sections={[
    {
      id: 'main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'home' },
        { id: 'users', label: 'Users', icon: 'users' },
      ],
    },
  ]}
  activeItemId={activeId}
/>
```

### User Menu Integration

```tsx
<GlobalNav
  userMenu={{
    name: user.name,
    avatar: user.avatar,
    items: [
      {
        label: 'Profile',
        icon: 'user',
        onClick: () => navigate('/profile')
      },
      {
        label: 'Settings',
        icon: 'settings',
        onClick: () => navigate('/settings')
      },
      { type: 'divider' },
      {
        label: 'Logout',
        icon: 'logout',
        onClick: handleLogout
      }
    ]
  }}
/>
```

---

## Approval Gate

**Before adding new patterns:**

1. **Confirm reusability** - Will it be used in multiple contexts?
2. **Check existing patterns** - Can you adapt an existing pattern?
3. **Validate complexity** - Does it require composing multiple components?
4. **Ensure no pattern dependencies** - Patterns should NOT import other patterns
5. **Document thoroughly** - Add to this README with complete examples

**Questions to ask**:
- Is this truly a reusable pattern or page-specific?
- Can it be built by composing existing components in a layout?
- Does it solve a common UI challenge?
- Will it be used across multiple pages/sections?

---

## Testing Patterns

Test patterns for:

**Functionality**:
```tsx
it('navigates to correct route on item click', () => {
  const handleClick = jest.fn();
  render(<LocalNav sections={sections} activeItemId="dashboard" />);

  fireEvent.click(screen.getByText('Dashboard'));
  expect(handleClick).toHaveBeenCalled();
});
```

**Accessibility**:
```tsx
it('has proper ARIA attributes', () => {
  render(<LocalNav sections={sections} activeItemId="dashboard" />);

  const nav = screen.getByRole('navigation');
  expect(nav).toBeInTheDocument();
});
```

**Keyboard Navigation**:
```tsx
it('supports keyboard navigation', () => {
  render(<LocalNav sections={sections} />);

  const firstItem = screen.getByText('Dashboard');
  firstItem.focus();

  fireEvent.keyDown(firstItem, { key: 'ArrowDown' });
  expect(screen.getByText('Users')).toHaveFocus();
});
```

---

## See Also

- [ARCHITECTURE.md](/ARCHITECTURE.md) - Complete system hierarchy
- [Layer 4: Composites](../4-composites/README.md) - Building blocks for patterns
- [Layer 6: Layouts](../6-layouts/README.md) - How patterns are used in layouts
- [COMPONENT_CATALOG.md](/COMPONENT_CATALOG.md) - Complete component index
