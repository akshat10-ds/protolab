# Layer 2: Utilities

**Layout and spacing helpers in the Ink Design System hierarchy.**

## Purpose

Utilities provide reusable layout primitives and spacing helpers that components and patterns can use. They handle:

- Flexbox layouts (Stack, Inline)
- Grid layouts (Grid)
- Content width constraints (Container)
- Spacing between elements (Spacer)

## Hierarchy Rules

### ✅ Allowed

- Import tokens from Layer 1
- Use CSS custom properties from tokens
- Render simple layout divs
- No complex UI logic

### ❌ NOT Allowed

- Import components from Layer 3+ (primitives, composites, patterns)
- Import icons or any visual components
- Contain business logic
- Make API calls or handle data

## Available Utilities

### Stack
Vertical or horizontal layout with consistent spacing.

```tsx
<Stack direction="vertical" gap="medium" align="start">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

**Props:**
- `direction`: 'horizontal' | 'vertical' (default: 'vertical')
- `gap`: 'none' | 'small' | 'medium' | 'large'
- `align`: 'start' | 'center' | 'end' | 'stretch'
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around'
- `wrap`: boolean

### Inline
Horizontal layout optimized for inline content.

```tsx
<Inline gap="small" align="center">
  <Button>Action</Button>
  <Button>Cancel</Button>
</Inline>
```

**Props:**
- `gap`: 'none' | 'xs' | 'small' | 'medium' | 'large' | 'xl'
- `align`: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around'
- `wrap`: boolean

### Grid
CSS Grid layout with responsive columns.

```tsx
<Grid columns={3} gap="medium">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

**Props:**
- `columns`: number | string (e.g., '1fr 2fr')
- `rows`: number | string
- `gap`: 'none' | 'small' | 'medium' | 'large'
- `align`: 'start' | 'center' | 'end' | 'stretch'
- `justify`: 'start' | 'center' | 'end' | 'stretch'

### Container
Centers content with max-width constraints.

```tsx
<Container size="large" padded>
  <h1>Page Content</h1>
</Container>
```

**Props:**
- `size`: 'small' | 'medium' | 'large' | 'xlarge' | 'full'
- `padded`: boolean (adds horizontal padding)

**Sizes:**
- `small`: 640px
- `medium`: 768px
- `large`: 1024px
- `xlarge`: 1280px
- `full`: 100%

### Spacer
Adds flexible or fixed spacing between elements.

```tsx
<Stack>
  <div>Content 1</div>
  <Spacer size="large" />
  <div>Content 2</div>
</Stack>
```

**Props:**
- `size`: 'xs' | 'small' | 'medium' | 'large' | 'xl' | '2xl' | '3xl'
- `direction`: 'horizontal' | 'vertical'
- `flexible`: boolean (uses flex-grow to fill space)

**Sizes:**
- `xs`: 4px
- `small`: 8px
- `medium`: 16px
- `large`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

## Usage in Higher Layers

Utilities can be used in:
- ✅ Layer 3: Primitives (components can use utilities for internal layout)
- ✅ Layer 4: Composites (components can use utilities for internal layout)
- ✅ Layer 5: Patterns (patterns should heavily use utilities)
- ✅ Layer 6: Layouts (layouts compose with utilities)

## Approval Gate

**Before adding new utilities:**
- Ensure it's truly a layout primitive (not a component)
- Check if existing utilities can be composed to achieve the same result
- Document use cases and intended usage
- Utilities should be unopinionated and highly reusable
