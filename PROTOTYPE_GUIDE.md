# Ink Design System - Prototyping Guide

> **Purpose**: This simplified Ink implementation is optimized for rapid prototyping (2-6 day cycles). All production complexity has been removed while maintaining visual fidelity to official DocuSign Ink.

---

## 🎯 When to Use Each Component

### Actions

#### Button Hierarchy
```
Brand (Cobalt Purple) → Primary (Dark Purple) → Secondary (Outlined) → Tertiary (Ghost)
Most Emphasis ←────────────────────────────────────────────→ Least Emphasis
```

**Decision Tree:**
- **Brand Button**: Main conversion action (Sign Up, Get Started, Upgrade to Pro)
- **Primary Button**: Primary action in a flow (Next, Save, Submit)
- **Secondary Button**: Secondary/cancel actions (Cancel, Back, Skip)
- **Tertiary Button**: Low-priority actions (Edit, Delete, View More)
- **Danger Button**: Destructive actions (Delete Account, Remove, Reject)

**Rule**: Maximum ONE brand button per screen. Use primary for other important actions.

#### IconButton vs Button vs ComboButton

| Component | When to Use | Example |
|-----------|-------------|---------|
| **Button** | Primary actions with clear labels | "Create Document", "Sign Now" |
| **IconButton** | Toolbars, compact spaces, universal actions | Close (×), Settings (⚙), More (⋯) |
| **ComboButton** | Primary action + related options menu | "Send" with delivery options |

---

## 📋 Common Prototype Patterns

### Pattern 1: Form Layout
```tsx
<Stack gap="large">
  <Heading level={2}>Account Settings</Heading>

  <Stack gap="medium">
    <Input label="Full Name" placeholder="Enter your name" />
    <Input label="Email" type="email" placeholder="you@example.com" />
    <Select label="Country" options={countries} />
    <Switch label="Email notifications" />
  </Stack>

  <Stack direction="horizontal" gap="small" justify="end">
    <Button kind="secondary">Cancel</Button>
    <Button kind="brand">Save Changes</Button>
  </Stack>
</Stack>
```

### Pattern 2: Table with Actions
```tsx
<Card>
  <Card.Header>
    <Stack direction="horizontal" justify="between" align="center">
      <Heading level={3}>Documents</Heading>
      <Button kind="brand" startElement={<Icon name="plus" />}>
        New Document
      </Button>
    </Stack>
  </Card.Header>
  <Card.Body>
    <Table
      data={documents}
      columns={columns}
      onRowClick={handleRowClick}
    />
  </Card.Body>
</Card>
```

### Pattern 3: Modal Dialog
```tsx
<Modal isOpen={isOpen} onClose={onClose} size="medium">
  <Modal.Header>
    <Heading level={3}>Confirm Action</Heading>
  </Modal.Header>
  <Modal.Body>
    <Text>Are you sure you want to delete this document?</Text>
  </Modal.Body>
  <Modal.Footer>
    <Stack direction="horizontal" gap="small" justify="end">
      <Button kind="secondary" onClick={onClose}>Cancel</Button>
      <Button kind="danger" onClick={onConfirm}>Delete</Button>
    </Stack>
  </Modal.Footer>
</Modal>
```

### Pattern 4: Empty State
```tsx
<Card>
  <Card.Body style={{ textAlign: 'center', padding: 'var(--ink-spacing-8)' }}>
    <Icon name="document" size="xlarge" style={{ opacity: 0.3, marginBottom: 'var(--ink-spacing-4)' }} />
    <Heading level={4}>No documents yet</Heading>
    <Text color="secondary" style={{ marginBottom: 'var(--ink-spacing-4)' }}>
      Get started by creating your first document
    </Text>
    <Button kind="brand" startElement={<Icon name="plus" />}>
      Create Document
    </Button>
  </Card.Body>
</Card>
```

---

## 🎨 Layout & Spacing

### Spacing Scale (Use Official Tokens)
```css
--ink-spacing-1:  4px   /* Tight spacing (icon gaps) */
--ink-spacing-2:  8px   /* Small gaps (button content) */
--ink-spacing-3:  12px  /* Medium gaps (form fields) */
--ink-spacing-4:  16px  /* Standard gaps (card padding) */
--ink-spacing-5:  24px  /* Large gaps (sections) */
--ink-spacing-6:  32px  /* XL gaps (page sections) */
--ink-spacing-8:  48px  /* Empty states, hero sections */
```

### Common Layouts

#### Dashboard Grid
```tsx
<Grid columns={3} gap="medium">
  <Card>
    <Card.Body>
      <Heading level={5}>Total Users</Heading>
      <Text size="xl" weight="bold">1,234</Text>
    </Card.Body>
  </Card>
  {/* More cards... */}
</Grid>
```

#### Two-Column Layout
```tsx
<Grid columns={2} gap="large">
  <Stack gap="medium">
    {/* Left column - form */}
  </Stack>
  <Stack gap="medium">
    {/* Right column - preview */}
  </Stack>
</Grid>
```

---

## 🚀 Prototyping Speed Tips

### 1. Use Placeholder Data
```tsx
// Create mock data generators
const mockUsers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: ['Active', 'Pending', 'Inactive'][i % 3]
}));
```

### 2. Component State Shortcuts
```tsx
// Quick toggle state
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);

// Quick form state
const [formData, setFormData] = useState({});
const updateField = (field) => (value) =>
  setFormData(prev => ({ ...prev, [field]: value }));
```

### 3. Fake Loading States
```tsx
// Simulate API call for demos
const handleSubmit = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setSuccess(true);
  }, 1500);
};
```

### 4. Reusable Sections
Create common sections as components:
```tsx
// PageHeader.tsx
export const PageHeader = ({ title, action }) => (
  <Stack direction="horizontal" justify="between" align="center"
         style={{ marginBottom: 'var(--ink-spacing-5)' }}>
    <Heading level={2}>{title}</Heading>
    {action}
  </Stack>
);

// Usage
<PageHeader
  title="Documents"
  action={<Button kind="brand">New Document</Button>}
/>
```

---

## ⚡ Component Quick Reference

### Forms & Inputs

| Component | Best For | Avoid When |
|-----------|----------|------------|
| **Input** | Single-line text (name, email) | Multi-line text (use TextArea) |
| **TextArea** | Multi-line text (comments, descriptions) | Single words (use Input) |
| **Select** | 5-15 options | <5 options (use Radio), >15 (use Combobox) |
| **Combobox** | Large lists (countries, companies) | Small fixed lists (use Select) |
| **Radio** | 2-5 mutually exclusive options | Many options (use Select) |
| **Checkbox** | Multiple selections, toggles | Single choice (use Radio/Switch) |
| **Switch** | Enable/disable features | Form selections (use Checkbox) |
| **Slider** | Numeric ranges (price, volume) | Precise values (use Input) |

### Feedback

| Component | When to Use | Duration |
|-----------|-------------|----------|
| **Alert (Inline Message)** | Contextual validation errors | Persistent until fixed |
| **Toast** | Success confirmations, non-critical errors | 3-5 seconds |
| **Modal** | Require immediate attention/action | Until user dismisses |
| **Banner** | Site-wide announcements | Persistent/dismissible |

### Navigation

| Component | Best For |
|-----------|----------|
| **Tabs** | Switch between related views (Profile / Settings / Activity) |
| **Breadcrumb** | Show hierarchy and navigation path |
| **Pagination** | Navigate through large datasets |
| **Link** | Navigate to different pages/sections |

---

## 🎯 UX Decision Framework

### Modal vs Inline Form?

**Use Modal when:**
- Action is infrequent (Delete confirmation, initial setup)
- Needs full attention (Payment flow, critical warning)
- Brief task (<5 fields)

**Use Inline when:**
- Frequent action (Add item to list)
- Multiple similar items (Editing table rows)
- Needs context from rest of page

### Button Placement

**Primary Action (Right):**
```tsx
<Stack direction="horizontal" gap="small" justify="end">
  <Button kind="secondary">Cancel</Button>
  <Button kind="brand">Continue</Button>
</Stack>
```

**Navigation (Left/Right):**
```tsx
<Stack direction="horizontal" gap="small" justify="between">
  <Button kind="secondary" startElement={<Icon name="arrow-left" />}>
    Back
  </Button>
  <Button kind="brand" endElement={<Icon name="arrow-right" />}>
    Next
  </Button>
</Stack>
```

### Badge/Tag Usage

| Use Case | Component | Variant |
|----------|-----------|---------|
| Status indicator | Badge | `success`, `error`, `warning`, `info` |
| Category label | Badge | `neutral` |
| Count indicator | Badge | `brand` (with number) |
| Filter tag | Tag (future) | Dismissible |

---

## 🚫 Common Prototyping Mistakes

### ❌ Don't Do This
```tsx
// Too many button variants on one screen
<Button kind="brand">Action 1</Button>
<Button kind="brand">Action 2</Button>
<Button kind="brand">Action 3</Button>

// Inconsistent spacing (mixing px and tokens)
<div style={{ marginBottom: '15px' }}>

// Too many form fields without grouping
<Input />
<Input />
<Input />
<Input />
<Input />
```

### ✅ Do This Instead
```tsx
// Clear hierarchy with ONE brand button
<Button kind="brand">Primary Action</Button>
<Button kind="primary">Secondary Action</Button>
<Button kind="tertiary">Tertiary Action</Button>

// Use official tokens
<div style={{ marginBottom: 'var(--ink-spacing-4)' }}>

// Group related fields with Stack/Card
<Card>
  <Card.Header>
    <Heading level={4}>Personal Information</Heading>
  </Card.Header>
  <Card.Body>
    <Stack gap="medium">
      <Input label="Name" />
      <Input label="Email" />
    </Stack>
  </Card.Body>
</Card>
```

---

## 🎨 Color Usage Rules

### Text on Backgrounds

| Background | Text Color Token | Use Case |
|------------|------------------|----------|
| `--ink-white-100` | `--ink-font-default` | Main content |
| `--ink-neutral-5` | `--ink-font-default` | Subtle backgrounds |
| `--ink-cobalt-100` | `--ink-font-inverse` | Brand highlights |
| `--ink-purple-100` | `--ink-font-inverse` | Dark sections |
| `--ink-green-100` | `--ink-font-inverse` | Success states |
| `--ink-red-100` | `--ink-font-inverse` | Error states |

**Rule**: Always use `--ink-font-inverse` (white) on dark backgrounds (100+ level colors)

### Semantic Colors

```css
/* Success */
--ink-green-100: Use for confirmations, completed states
--ink-green-10: Use for subtle success backgrounds

/* Error */
--ink-red-100: Use for errors, destructive actions
--ink-red-10: Use for error message backgrounds

/* Warning */
--ink-orange-100: Use for warnings, important notices
--ink-orange-10: Use for warning backgrounds

/* Info */
--ink-cobalt-100: Use for info, highlights, primary brand
--ink-cobalt-10: Use for info backgrounds, selected states
```

---

## 📱 Responsive Considerations

### Mobile-First Breakpoints (When Needed)
```tsx
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px'
};

// For prototypes, test at these widths:
// - Mobile: 375px (iPhone)
// - Tablet: 768px (iPad)
// - Desktop: 1440px (Laptop)
```

### Stack Direction for Responsive
```tsx
// Desktop: horizontal, Mobile: vertical
<Stack
  direction={{ mobile: 'vertical', tablet: 'horizontal' }}
  gap="medium"
>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Stack>
```

---

## 🔧 Customization vs Consistency

### When to Customize
- ✅ Unique prototype features not in Ink
- ✅ Specific brand/product requirements
- ✅ Testing new interaction patterns

### When to Stay Consistent
- ❌ Don't change spacing scale
- ❌ Don't modify button sizes
- ❌ Don't create new color combinations
- ❌ Don't change border radius (always 4px)

### Safe Customizations
```tsx
// Layout/positioning
<Card style={{ maxWidth: '600px', margin: '0 auto' }} />

// Content styling (within components)
<Text style={{ fontStyle: 'italic' }}>Special note</Text>

// Background patterns
<div style={{ background: 'linear-gradient(...)' }}>
```

---

## 🎬 Common Prototype Flows

### 1. Onboarding Flow
```
Landing → Sign Up → Profile Setup → Welcome Dashboard
```
**Components**: Button (brand), Input, Select, ProgressStepper, Modal

### 2. CRUD Operations
```
List View → Detail View → Edit → Confirmation → Updated List
```
**Components**: Table, Card, Form inputs, Modal, Alert, Button

### 3. Settings Panel
```
Settings List (Tabs) → Edit Form → Save Confirmation
```
**Components**: Tabs, Switch, Select, Input, Button, Alert

### 4. Dashboard
```
Overview Cards → Data Table → Detail Modal
```
**Components**: Grid, Card, Badge, Table, Modal, Button

---

## 📚 Resources

- **Component Showcase**: `/showcase` - Interactive examples of all components
- **Color Pairing Rules**: Documented in showcase under Foundation
- **Official Ink Tokens**: `src/ink-design-system/styles/tokens.css`
- **Figma Designs**: Reference for exact specifications

---

## ⚡ Quick Start Checklist

For each new prototype:

- [ ] Define primary action (use brand button)
- [ ] Choose layout pattern (Grid/Stack/Card)
- [ ] Use official spacing tokens only
- [ ] Follow color pairing rules for backgrounds
- [ ] Keep forms under 7 fields (or group them)
- [ ] Add loading states for actions
- [ ] Test on mobile width (375px)
- [ ] One brand button per screen maximum
- [ ] Use semantic colors for status
- [ ] Add empty states for data views

---

## 🎯 Success Metrics for Prototypes

**Speed**: Can build a complete flow in 2-6 days
**Consistency**: Uses only official Ink tokens
**Clarity**: User testing shows clear hierarchy
**Fidelity**: Looks like production Ink designs
**Simplicity**: Easy for others to understand and modify

---

*Last Updated: 2025*
*Maintained by: Ink Prototyping Team*
