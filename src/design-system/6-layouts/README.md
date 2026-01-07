# Layer 6: Starter Layouts

**Application templates in the Ink Design System hierarchy.**

## Purpose

Starter Layouts are complete page templates that demonstrate how to compose patterns and components into full application interfaces. They provide starting points for common application needs.

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

## Available Layouts

### DashboardLayout
Complete dashboard with sidebar navigation, header, and content areas.

```tsx
<DashboardLayout
  navigation={<LocalNav />}
  header={<GlobalNav />}
  sidebar={<Widget />}
>
  <YourContent />
</DashboardLayout>
```

**Use cases:**
- Admin dashboards
- Application main views
- Data-heavy interfaces

### AuthLayout
Centered layout for authentication flows.

```tsx
<AuthLayout
  logo={<Logo />}
  variant="split"
  footer={<Terms />}
>
  <LoginForm />
</AuthLayout>
```

**Variants:**
- `default`: Simple centered form
- `split`: Two-column layout with branded side panel
- `minimal`: Minimal styling for custom designs

**Use cases:**
- Login/signup pages
- Password reset flows
- Email verification

## Creating New Layouts

**Before adding a new layout:**

1. **Check if existing layouts can be adapted**
   - Most needs can be met with props/variants
   - Consider if this is truly reusable

2. **Ensure it's a layout, not a page**
   - Layouts are structure, not content
   - Should accept children and configurable sections
   - No business logic or API calls

3. **Use existing patterns**
   - Don't recreate navigation, forms, etc.
   - Compose from Layer 5 patterns
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
