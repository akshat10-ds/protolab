# Component Categorization Analysis

This document categorizes all design system components into the new hierarchy structure.

## Layer 2: UTILITIES (Layout Helpers)
Components that provide layout and spacing functionality. These will move to `2-utilities/`.

- **Stack** - Vertical/horizontal layout component
- **Grid** - Grid layout component

## Layer 3a: PRIMITIVES (Atomic Components)
Components that ONLY use design tokens, no other components. These will move to `3-primitives/`.

### Action Components
- **Button** - Only uses tokens, inline SVG
- **IconButton** - Similar to Button
- **Link** - Text link component

### Form Components (Basic)
- **Input** - Basic text input
- **Select** - Basic select dropdown
- **Checkbox** - Checkbox input
- **Radio** - Radio button input
- **Switch** - Toggle switch
- **TextArea** - Multi-line text input
- **Slider** - Range slider
- **Stepper** - Number stepper

### Display Components
- **Badge** - Label badge
- **Avatar** - User avatar
- **Chip** - Removable chip/tag
- **AlertBadge** - Notification badge
- **StatusLight** - Status indicator dot
- **Divider** - Horizontal/vertical divider
- **Card** - Content card container
- **Skeleton** - Loading skeleton

### Typography
- **Typography** - Heading and Text components

### Feedback Components
- **Spinner** - Loading spinner (inline SVG)
- **ProgressBar** - Progress indicator
- **Callout** - Information callout box
- **Banner** - Notice banner

### Overlay Components (Basic)
- **Tooltip** - Basic tooltip (verify - might use Icon)

## Layer 3b: COMPOSITES (Composed Components)
Components that use other components or the Icon system. These will move to `4-composites/`.

### Form Components (Composite)
- **SearchInput** - Uses Icon
- **FileInput** - Uses Icon/Button
- **ComboBox** - Uses Icon (multiple instances)
- **DatePicker** - Uses Lucide icons
- **FileUpload** - Uses Button/Icon
- **FilterTag** - Uses Icon for close button

### Navigation Components
- **Breadcrumb** - Uses Link component
- **Pagination** - Uses Icon for arrows
- **Tabs** - Uses Icon (if applicable)

### Layout Components
- **Accordion** - Uses Icon for expand/collapse
- **ComboButton** - Uses Button component

### Overlay Components (Composite)
- **Modal** - Uses IconButton for close
- **Popover** - May use Icon
- **Dropdown** - Uses Popover and Icon
- **Drawer** - Uses IconButton

### Feedback Components (Composite)
- **Alert** - Uses Icon for alert types

### Data Components
- **Table** - Complex data display (verify dependencies)
- **List** - List component (verify dependencies)

## Layer 4: PATTERNS
Existing patterns that compose multiple components. These will move to `5-patterns/`.

- **VerticalNavigation** - Sidebar navigation
- **GlobalNav** - Top navigation bar
- **LocalNav** - Context-specific navigation

## Layer 5: STARTER LAYOUTS
To be created in `6-layouts/` using patterns and composites.

### Proposed Layouts
- **DashboardLayout** - Main app dashboard template
- **SettingsLayout** - Settings page template
- **AuthLayout** - Login/signup page template
- **DetailLayout** - Detail/profile page template

## Icon System
The Icon component (`../../icons`) is a special case:
- It's a primitive component that wraps Lucide React icons
- It should be in the primitives layer
- Many composite components depend on it
- This dependency is acceptable as Icon is truly primitive

## Notes
- Total components: ~50
- Primitives: ~25
- Composites: ~20
- Utilities: 2
- Patterns: 3
- Need to verify: Table, List, Tooltip dependencies

## Migration Strategy
1. Create new folder structure
2. Move utilities (Stack, Grid) first
3. Move primitives (no dependencies)
4. Move composites (depend on primitives)
5. Move patterns (depend on composites)
6. Create starter layouts
