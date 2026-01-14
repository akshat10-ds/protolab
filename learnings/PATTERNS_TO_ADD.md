# L5 Patterns To Add

> Specifications for new patterns to build based on DocuSign production analysis.

---

## 1. PageHeader Pattern

**Purpose**: Consistent page header with title, badges, and actions.

### Structure
```tsx
<PageHeader
  title="Completed"
  badge={<Badge variant="ai">AI-Assisted</Badge>}
  actions={
    <>
      <IconButton icon="plus" />
      <IconButton icon="settings" />
    </>
  }
/>
```

### Visual Spec
```
┌─────────────────────────────────────────────────────────────┐
│ [H1 Title: 32px/400]  [Badge]          [Action] [Action]    │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| title | string | Page title (H1) |
| badge | ReactNode | Optional badge next to title |
| actions | ReactNode | Right-aligned action buttons |
| breadcrumb | ReactNode | Optional breadcrumb above title |

### Measurements
- Title: 32px, 400 weight, rgba(19, 0, 50, 0.9)
- Gap between title and badge: 12px
- Actions aligned to right edge

---

## 2. ActionBar Pattern

**Purpose**: Search, filters, and bulk actions for list views.

### Structure
```tsx
<ActionBar
  primaryDropdown={<Dropdown options={["Documents"]} />}
  searchPlaceholder="Try keywords or phrases"
  filters={[
    <FilterDropdown label="Date" />,
    <FilterDropdown label="Status" />,
  ]}
  onClear={handleClear}
/>
```

### Visual Spec
```
┌─────────────────────────────────────────────────────────────┐
│ [Dropdown▼] [🔍 Search input..................] [⚙] [Filter] [Clear] │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| primaryDropdown | ReactNode | Main context dropdown (Documents, etc.) |
| searchPlaceholder | string | Search input placeholder |
| searchValue | string | Controlled search value |
| onSearchChange | function | Search change handler |
| filters | ReactNode[] | Array of filter components |
| onClear | function | Clear all filters handler |
| showClear | boolean | Whether to show clear button |

### Measurements
- Height: ~52px
- Search input: 366px width, 30px height
- Filter buttons: 32px height
- Spacing: 8-16px gap

---

## 3. InfoBanner Pattern

**Purpose**: Contextual info or promotional messages.

### Structure
```tsx
<InfoBanner
  icon="sparkle"
  message="0 agreements with renewal notice dates in the next 30 days."
  action={<Link href="#">View renewing contracts</Link>}
  onDismiss={handleDismiss}
  variant="info" // or "warning", "promo"
/>
```

### Visual Spec
```
┌─────────────────────────────────────────────────────────────┐
│ ✨ Message text here...                    Action link  [×] │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| icon | IconName | Leading icon |
| message | string | Banner message |
| action | ReactNode | Optional action link/button |
| onDismiss | function | Dismiss handler |
| variant | 'info' \| 'warning' \| 'promo' | Visual style |

### Measurements
- Height: 52px
- Padding: 12px 16px
- Background: varies by variant

---

## 4. DetailHeader Pattern

**Purpose**: Header for detail/view pages with status and actions.

### Structure
```tsx
<DetailHeader
  status={<Badge variant="voided">Voided</Badge>}
  title="Complete with Docusign: Document.pdf"
  metadata={
    <>
      From: <Link>Akshat Mishra</Link> | <Link>Envelope ID</Link>
    </>
  }
  actions={
    <>
      <Button variant="outline">Copy</Button>
      <IconButton icon="more-vertical" />
    </>
  }
/>
```

### Visual Spec
```
┌─────────────────────────────────────────────────────────────┐
│ [Status Badge]                                               │
│ Title (large)                            [Copy] [⋮ More]     │
│ From: Link | Envelope ID [copy icon]                         │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| status | ReactNode | Status badge |
| title | string | Document/item title |
| metadata | ReactNode | Secondary info line |
| actions | ReactNode | Action buttons |

### Measurements
- Status badge: 12px font, pill shape
- Title: 24px or larger
- Metadata: 14px, links underlined

---

## 5. FormSection Pattern

**Purpose**: Grouped form fields with header and description.

### Structure
```tsx
<FormSection
  title="Signing Experience"
  description="Configure how recipients interact with documents."
>
  <Toggle label="Enable advanced signing" />
  <Select label="Default language" options={languages} />
</FormSection>
```

### Visual Spec
```
┌─────────────────────────────────────────────────────────────┐
│ Section Title (16px/500)                                     │
│ Description text (14px, muted)                               │
│ ─────────────────────────────────────────────────────────── │
│ [Form field 1]                                               │
│ [Form field 2]                                               │
│ [Form field 3]                                               │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| title | string | Section title |
| description | string | Optional description |
| children | ReactNode | Form fields |
| divider | boolean | Show bottom divider |

### Measurements
- Title: 16px, 500 weight
- Description: 14px, rgba(19, 0, 50, 0.7)
- Field spacing: 16-24px vertical gap

---

## 6. EmptyState Pattern

**Purpose**: Placeholder when no data exists.

### Structure
```tsx
<EmptyState
  illustration="no-tasks"
  title="You don't have any tasks yet"
  description="When you have new tasks assigned to you, they will show up here."
  action={<Button>Create Task</Button>}
/>
```

### Visual Spec
```
┌─────────────────────────────────────────────────────────────┐
│                    [Illustration]                            │
│                                                              │
│               Title (24px/400)                               │
│         Description text (14px, muted)                       │
│                                                              │
│                   [Action Button]                            │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| illustration | string | Illustration name/component |
| title | string | Empty state title |
| description | string | Helpful description |
| action | ReactNode | Optional action button |

### Measurements
- Title: 24px, 400 weight
- Description: 14px, muted
- Centered layout
- Padding: 48px or more

---

## 7. RecipientCard Pattern

**Purpose**: Display recipient info in signing flows.

### Structure
```tsx
<RecipientCard
  avatar={{ initials: "AM", color: "blue" }}
  name="Akshat Mishra"
  email="akshat.mishra@docusign.com"
  status="Needs to Sign"
  date="8/8/2025 | 11:01:34 am"
/>
```

### Visual Spec
```
┌─────────────────────────────────────────────────────────────┐
│ [Avatar] Name (16px, link color)     Status indicator        │
│          email@example.com           Date/time               │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| avatar | object | { initials, color, imageUrl } |
| name | string | Recipient name |
| email | string | Email address |
| status | string | Signing status |
| date | string | Date/time string |
| onClick | function | Click handler |

### Measurements
- Avatar: 40px
- Name: 16px, link color
- Email: 14px, muted
- Status: 14px with icon

---

## 8. StatCard Pattern

**Purpose**: Display metric with label for dashboards.

### Structure
```tsx
<StatCard
  label="Open requests"
  value={0}
  trend="+5%"
  onClick={handleClick}
/>
```

### Visual Spec
```
┌─────────────────────────────────────────┐
│ Label (14px, muted)              Value  │
└─────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| label | string | Metric label |
| value | number \| string | Metric value |
| trend | string | Optional trend indicator |
| onClick | function | Click handler |

### Measurements
- Label: 14px, rgba(19, 0, 50, 0.7)
- Value: 16px or larger, aligned right
- Padding: 12px 16px

---

## Priority Order

1. **PageHeader** - Used on every list page
2. **ActionBar** - Essential for Navigator-style pages
3. **DetailHeader** - Needed for detail views
4. **InfoBanner** - Common contextual messaging
5. **EmptyState** - UX essential
6. **FormSection** - Settings pages
7. **RecipientCard** - Signing flows
8. **StatCard** - Dashboard widgets

---

## 9. StatusBadge Pattern (Pass 2)

**Purpose**: Colored status indicators with background variants.

### Structure
```tsx
<StatusBadge variant="active">Active</StatusBadge>
<StatusBadge variant="inactive">Inactive</StatusBadge>
<StatusBadge variant="new">New</StatusBadge>
```

### Visual Spec
```
┌──────────┐  ┌──────────┐  ┌─────┐
│ Active   │  │ Inactive │  │ New │
└──────────┘  └──────────┘  └─────┘
 Green bg     Gray bg        Purple bg
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| variant | 'active' \| 'inactive' \| 'new' | Status variant |
| children | string | Badge text |

### Measurements
| Variant | Background | Color |
|---------|------------|-------|
| active | rgb(185, 246, 221) | rgb(0, 95, 67) |
| inactive | rgb(240, 239, 240) | rgba(19, 0, 50, 0.7) |
| new | rgb(43, 40, 67) | white |

- Padding: 0px 8px
- Border Radius: 4px
- Font: 12px, 500 weight

---

## 10. FeatureCard Pattern (Pass 2)

**Purpose**: Feature introduction cards for onboarding pages.

### Structure
```tsx
<FeatureCard
  title="Take an Interactive Tour"
  description="Get a fast, guided look at how Agreement Desk seamlessly connects teams."
  action={{ label: "Take the tour", href: "#" }}
/>
```

### Visual Spec
```
┌─────────────────────────────────────────────────┐
│ Title (16px/500)                                 │
│ Description text (14-16px, muted)               │
│                                                  │
│ Action link → (purple, 16px/500)                │
└─────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| title | string | Feature title |
| description | string | Feature description |
| action | { label: string, href: string } | Action link |

### Measurements
- Title: 16px, 500 weight
- Description: 16px, 400 weight, muted
- Action link: 16px, 500 weight, rgb(108, 58, 230) purple
- No underline on action link

---

## 11. SubTabs Pattern (Pass 2)

**Purpose**: Secondary navigation tabs below page header.

### Structure
```tsx
<SubTabs
  tabs={[
    { label: "All", count: 33 },
    { label: "Recent" },
    { label: "Starred" }
  ]}
  activeTab="All"
  onTabChange={handleTabChange}
/>
```

### Visual Spec
```
┌──────────────────────────────────────┐
│ [All (33)] [Recent] [Starred]        │
└──────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| tabs | TabItem[] | Array of tab items |
| activeTab | string | Currently active tab |
| onTabChange | function | Tab change handler |

### Measurements
- Height: ~44px
- Padding: 12px 20px
- Font: 14px, 500 weight (active), 400 (inactive)

---

## Updated Priority Order

1. **PageHeader** - Used on every list page
2. **ActionBar** - Essential for Navigator-style pages
3. **StatusBadge** - ★ NEW - Used across Parties, Navigator tables
4. **DetailHeader** - Needed for detail views
5. **InfoBanner** - Common contextual messaging
6. **EmptyState** - UX essential
7. **SubTabs** - ★ NEW - Used on Parties, Templates pages
8. **FeatureCard** - ★ NEW - Onboarding pages
9. **FormSection** - Settings pages
10. **RecipientCard** - Signing flows
11. **StatCard** - Dashboard widgets

---

*Generated from DocuSign production analysis - Pass 1, 2, 3, 4 & 5*
