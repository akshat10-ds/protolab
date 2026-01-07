# Layer 6: Layouts

**Application templates in the Ink Design System hierarchy.**

## Purpose

Layouts are complete page templates that demonstrate how to compose patterns and components into full application interfaces. They provide starting points for common application needs.

## Hierarchy Rules

### ✅ Allowed

- Import primitives from Layer 3
- Import composites from Layer 4
- Import patterns from Layer 5
- Import utilities from Layer 2
- Compose multiple patterns together
- Define page-level layout structure

### ❌ NOT Allowed

- Business logic or data fetching
- Global state management
- Complex interactions (delegate to patterns/composites)
- Direct token usage (use components instead)

## Available Layouts (1 total)

### DocuSignShell

Application shell layout with GlobalNav header, optional LocalNav sidebar, and main content area.

```tsx
import { DocuSignShell } from '@/design-system/6-layouts';

// With sidebar
<DocuSignShell
  globalNav={{
    logo: <Logo />,
    navItems: [
      { label: 'Home', href: '/', active: true },
      { label: 'Agreements', href: '/agreements' },
      { label: 'Templates', href: '/templates' },
    ],
    userMenu: { name: 'John Doe', avatar: '/avatar.jpg' }
  }}
  localNav={{
    sections: [
      {
        title: 'Navigation',
        items: [
          { label: 'Overview', icon: 'home', active: true },
          { label: 'Documents', icon: 'document' },
          { label: 'Settings', icon: 'settings' },
        ]
      }
    ]
  }}
>
  <YourContent />
</DocuSignShell>

// Without sidebar (e.g., settings page)
<DocuSignShell
  globalNav={{ logo: <Logo />, navItems: [...] }}
>
  <SettingsContent />
</DocuSignShell>
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `globalNav` | `GlobalNavProps` | ✅ | Configuration for the header navigation |
| `localNav` | `LocalNavProps` | ❌ | Optional sidebar navigation configuration |
| `children` | `ReactNode` | ✅ | Main content area |
| `className` | `string` | ❌ | Additional CSS class for the shell container |

### Use Cases

- Application main views
- Admin dashboards
- Document management interfaces
- Multi-section applications with sidebar navigation

### Structure

```
┌─────────────────────────────────────────┐
│              GlobalNav                   │
├───────────┬─────────────────────────────┤
│           │                             │
│ LocalNav  │         Content             │
│ (optional)│                             │
│           │                             │
└───────────┴─────────────────────────────┘
```

## Creating New Layouts

**Before adding a new layout:**

1. **Check if DocuSignShell can be adapted**
   - Most needs can be met with props/variants
   - Consider if this is truly reusable

2. **Ensure it's a layout, not a page**
   - Layouts are structure, not content
   - Should accept children and configurable sections
   - No business logic or API calls

3. **Use existing patterns**
   - Don't recreate navigation, forms, etc.
   - Compose from Layer 5 patterns (GlobalNav, LocalNav)
   - Layouts should be mostly structure + spacing

4. **Document the use case**
   - What problem does it solve?
   - What types of pages is it for?
   - Provide usage examples

## Approval Gate

Layouts define application-wide structure. Before creating:
- Confirm the layout pattern is needed across multiple pages
- Ensure it follows the hierarchy (no skipping layers)
- Get design approval for the structure
- Document the intended use cases clearly
