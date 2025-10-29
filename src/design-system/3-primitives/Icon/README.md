# Ink Design System - Icons

A simplified icon component system extracted from the DocuSign Ink Design System. This package includes 50 essential icons commonly used in web applications.

## Installation

The Icon component is part of the Ink Design System and can be imported directly:

```tsx
import { Icon } from '@/design-system';
// or
import { Icon } from '@/design-system/icons';
```

## Usage

### Basic Example

```tsx
import { Icon } from '@/design-system';

function MyComponent() {
  return (
    <div>
      <Icon name="check" size="medium" />
      <Icon name="arrow-right" size="large" color="#0066FF" />
    </div>
  );
}
```

### Size Options

The Icon component supports predefined sizes and custom pixel values:

```tsx
<Icon name="home" size="small" />   {/* 16px */}
<Icon name="home" size="medium" />  {/* 20px (default) */}
<Icon name="home" size="large" />   {/* 24px */}
<Icon name="home" size={32} />      {/* Custom size */}
```

### Color

Icons inherit the current text color by default (`currentColor`), or you can specify a custom color:

```tsx
<Icon name="star" color="#FFD700" />
<Icon name="heart-filled" color="red" />
<div style={{ color: '#0066FF' }}>
  <Icon name="info" /> {/* Will be blue */}
</div>
```

### Accessibility

Use `aria-label` for icons that convey meaning:

```tsx
<Icon name="close" aria-label="Close dialog" />
```

For decorative icons, they are automatically hidden from screen readers:

```tsx
<Icon name="star" aria-hidden /> {/* Explicitly decorative */}
```

## Available Icons (50 total)

### Navigation (10 icons)
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`
- `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`
- `menu`, `close`

### Actions (10 icons)
- `add`, `edit`, `delete`, `save`
- `search`, `filter`, `refresh`
- `download`, `upload`, `share`

### Status (10 icons)
- `check`, `check-circle`
- `error`, `warning`, `info`, `help`
- `star`, `star-filled`, `heart`, `heart-filled`

### Common (10 icons)
- `user`, `users`, `settings`, `home`
- `document`, `folder`, `calendar`, `clock`
- `bell`, `mail`

### UI (11 icons)
- `more-horizontal`, `more-vertical`
- `expand`, `collapse`, `external-link`
- `copy`, `paste`
- `eye`, `eye-off`
- `lock`, `minus`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconName` | - | Name of the icon to display (required) |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Size of the icon |
| `color` | `string` | `'currentColor'` | Color of the icon |
| `className` | `string` | - | Additional CSS class name |
| `aria-label` | `string` | - | Accessible label for the icon |
| `aria-hidden` | `boolean` | `true` | Whether to hide from screen readers |

## Examples

### In Buttons

```tsx
<button>
  <Icon name="add" size="small" />
  Add Item
</button>
```

### Status Messages

```tsx
<div className="success-message">
  <Icon name="check-circle" color="green" />
  Success!
</div>
```

### Navigation Menu

```tsx
<nav>
  <a href="/home">
    <Icon name="home" />
    Home
  </a>
  <a href="/settings">
    <Icon name="settings" />
    Settings
  </a>
</nav>
```

### Icon Grid

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
  {['home', 'user', 'settings', 'bell', 'mail'].map(icon => (
    <Icon key={icon} name={icon} size="large" />
  ))}
</div>
```

## Source

All icons are extracted from the official DocuSign Ink Design System (ds-icons repository). The icons are 24x24 SVG paths that scale beautifully at any size.

## Notes

- Icons are rendered as inline SVG elements
- All icons use the `fill` attribute (not stroke)
- The component is optimized for performance with no external dependencies
- TypeScript types are fully supported for autocomplete of icon names
