# Layer 3: Primitives

**Atomic components that use ONLY design tokens in the Ink Design System hierarchy.**

## Purpose

Primitives are the foundational building blocks of the design system. They are atomic components that:

- Use design tokens exclusively for styling
- Contain no dependencies on other components (except Icon)
- Provide consistent, reusable UI elements
- Serve as the foundation for composite components

## Hierarchy Rules

### ✅ Allowed

- Import tokens from Layer 1
- Import utilities from Layer 2 (Stack, Grid, etc.)
- Import Icon component (special primitive exception)
- Use CSS custom properties from tokens
- Handle basic user interactions (click, focus, change)
- Manage internal component state

### ❌ NOT Allowed

- Import other primitive components (except Icon)
- Import components from Layers 4+ (composites, patterns, layouts)
- Contain business logic or data fetching
- Compose multiple components together
- Make API calls

## Available Primitives (26 components)

### Action Components

#### Button
Primary action component with multiple variants.

```tsx
<Button kind="primary" size="medium" onClick={handleClick}>
  Click me
</Button>
```

**Variants:** primary, secondary, tertiary, danger, success, ghost
**Sizes:** small, medium, large
**States:** default, hover, active, disabled, loading

#### IconButton
Button that displays only an icon.

```tsx
<IconButton icon="close" variant="primary" size="medium" onClick={handleClose} />
```

#### Link
Styled hyperlink component.

```tsx
<Link href="/page" variant="primary" underline="hover">
  Go to page
</Link>
```

---

### Form Components

#### Input
Text input field with label and error states.

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Invalid email"
  required
/>
```

**Types:** text, email, password, number, tel, url, search

#### Select
Dropdown selection input.

```tsx
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ]}
  value={selectedCountry}
  onChange={setSelectedCountry}
/>
```

#### Checkbox
Boolean selection input.

```tsx
<Checkbox
  label="Accept terms"
  checked={accepted}
  onChange={setAccepted}
  required
/>
```

#### Radio
Single selection from multiple options.

```tsx
<Radio
  label="Premium"
  name="plan"
  value="premium"
  checked={plan === 'premium'}
  onChange={setPlan}
/>
```

#### Switch
Toggle between two states.

```tsx
<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={setEnabled}
/>
```

#### TextArea
Multi-line text input.

```tsx
<TextArea
  label="Comments"
  rows={4}
  placeholder="Enter your comments"
  value={comments}
  onChange={setComments}
/>
```

#### Slider
Range input for numeric values.

```tsx
<Slider
  label="Volume"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
  showValue
/>
```

#### Stepper
Numeric input with increment/decrement buttons.

```tsx
<Stepper
  label="Quantity"
  value={quantity}
  onChange={setQuantity}
  min={0}
  max={10}
/>
```

---

### Display Components

#### Badge
Small labeled status indicator.

```tsx
<Badge variant="success" size="small">
  Active
</Badge>
```

**Variants:** default, success, warning, danger, info, neutral

#### Avatar
User profile image or initials.

```tsx
<Avatar
  src="/avatar.jpg"
  alt="John Doe"
  size="medium"
  fallback="JD"
/>
```

**Sizes:** xs, small, medium, large, xl

#### Chip
Compact element for tags or selections.

```tsx
<Chip
  label="React"
  onRemove={handleRemove}
  variant="filled"
/>
```

#### AlertBadge
Badge showing alert states or counts.

```tsx
<AlertBadge count={5} variant="danger" max={99} />
```

#### StatusLight
Small indicator for status states.

```tsx
<StatusLight status="online" label="Online" />
```

**Status:** online, offline, away, busy, neutral

#### Divider
Visual separator between content.

```tsx
<Divider orientation="horizontal" spacing="medium" />
```

#### Card
Container for grouped content.

```tsx
<Card variant="elevated" padding="medium">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

**Variants:** flat, outlined, elevated

#### Skeleton
Loading placeholder matching content shape.

```tsx
<Skeleton variant="text" width="200px" />
<Skeleton variant="rectangle" width="100%" height="200px" />
<Skeleton variant="circle" size="40px" />
```

---

### Typography Components

#### Heading
Semantic heading with consistent sizing.

```tsx
<Heading level={1} weight="bold">
  Page Title
</Heading>
```

**Levels:** 1-6 (h1-h6)
**Weights:** normal, medium, semibold, bold

#### Text
Paragraph text with semantic variants.

```tsx
<Text variant="body" size="medium" color="primary">
  This is body text
</Text>
```

**Variants:** body, caption, label, code
**Sizes:** xs, small, medium, large, xl

---

### Feedback Components

#### Spinner
Loading indicator.

```tsx
<Spinner size="medium" color="primary" />
```

**Sizes:** small, medium, large

#### ProgressBar
Visual progress indicator.

```tsx
<ProgressBar value={75} max={100} variant="primary" showLabel />
```

**Variants:** primary, success, warning, danger

#### Callout
Inline informational message.

```tsx
<Callout variant="info" icon="info">
  This is an informational message
</Callout>
```

**Variants:** info, success, warning, danger

#### Banner
Full-width alert or announcement.

```tsx
<Banner variant="warning" dismissible onDismiss={handleDismiss}>
  Your session will expire soon
</Banner>
```

---

### Overlay Components

#### Tooltip
Contextual information on hover.

```tsx
<Tooltip content="More information" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

**Positions:** top, bottom, left, right

---

### Icon System

#### Icon
SVG icon component used throughout the system.

```tsx
<Icon name="search" size="medium" color="primary" />
```

**Special Note:** Icon is the only primitive that other primitives can import.

---

## Usage in Higher Layers

Primitives are used by:
- ✅ Layer 4: Composites (compose multiple primitives)
- ✅ Layer 5: Patterns (use primitives within patterns)
- ✅ Layer 6: Layouts (use primitives for layout elements)

## Component Structure

Each primitive component follows this structure:

```
3-primitives/
└── ComponentName/
    ├── ComponentName.tsx         # Component implementation
    ├── ComponentName.module.css  # Styles (imports tokens)
    ├── ComponentName.stories.tsx # Storybook stories (optional)
    └── index.ts                  # Public exports
```

## CSS Guidelines

All primitive CSS modules **must** start with:

```css
@import '../../1-tokens/tokens.css';
```

Use semantic tokens, not color primitives:

```css
/* ✅ Correct */
background: var(--ink-bg-primary);
color: var(--ink-font-primary);

/* ❌ Wrong */
background: var(--ink-neutral-10);
color: var(--ink-cobalt-100);
```

## Import Patterns

```tsx
// ✅ Within design system - relative imports
import { Icon } from '../Icon';
import { Stack } from '../../2-utilities/Stack';

// ✅ From application code - main export
import { Button, Input, Badge } from '@/design-system';

// ✅ From application code - layer export
import { Button } from '@/design-system/3-primitives';

// ❌ Don't import other primitives (except Icon)
import { Badge } from '../Badge';  // Not allowed!

// ❌ Don't import from higher layers
import { Modal } from '../../4-composites/Modal';  // Not allowed!
```

## Approval Gate

**Before adding new primitives:**

1. **Confirm it's truly atomic** - Can it be built using ONLY tokens?
2. **Check for existing primitives** - Can you compose existing ones?
3. **Ensure broad reusability** - Will it be used in multiple contexts?
4. **Follow naming conventions** - Use clear, semantic names
5. **Document thoroughly** - Add to this README with examples
6. **No component dependencies** - Exception: Icon only

**Questions to ask:**
- Does this component depend on other components? → Then it's a Composite
- Does it compose multiple elements? → Probably a Composite
- Does it use only tokens and utilities? → It's a Primitive ✅

## Testing Primitives

Primitives should be tested in isolation:

```tsx
// Test rendering
it('renders with correct variant', () => {
  render(<Button kind="primary">Click</Button>);
  expect(screen.getByRole('button')).toHaveClass('primary');
});

// Test interactions
it('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});

// Test states
it('disables button when disabled prop is true', () => {
  render(<Button disabled>Click</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});
```

## Storybook Organization

Primitives are organized in Storybook by category:

- `Primitives/Action` - Button, IconButton, Link
- `Primitives/Forms` - Input, Select, Checkbox, etc.
- `Primitives/Display` - Badge, Avatar, Card, etc.
- `Primitives/Typography` - Heading, Text
- `Primitives/Feedback` - Spinner, ProgressBar, etc.
- `Primitives/Overlay` - Tooltip
- `Primitives/Icon` - Icon system

## Common Patterns

### Form Field Pattern
All form primitives follow this structure:

```tsx
<FormField
  label="Field Label"
  description="Helper text"
  error="Error message"
  required
  disabled
  value={value}
  onChange={onChange}
/>
```

### Variant Pattern
Components with multiple visual styles use `variant` or `kind`:

```tsx
<Component variant="primary" />  // Button: kind
<Component variant="success" />  // Badge: variant
```

### Size Pattern
Components with size options use consistent sizing:

```tsx
<Component size="small" />
<Component size="medium" />  // Usually default
<Component size="large" />
```

---

## See Also

- [ARCHITECTURE.md](/ARCHITECTURE.md) - Complete system hierarchy
- [Layer 2: Utilities](../2-utilities/README.md) - Layout helpers
- [Layer 4: Composites](../4-composites/README.md) - Composed components
- [Design Token System](../1-tokens/README.md) - Foundation tokens
