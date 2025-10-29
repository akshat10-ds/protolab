# Ink Design System Starter

A complete design system starter kit for rapid prototyping and building production-ready interfaces. Built with React, TypeScript, and CSS Modules.

## Features

- **54 Production-Ready Components** - Complete UI component library organized in 6 hierarchical layers
- **Advanced Patterns** - VerticalNavigation, GlobalNav, LocalNav for complex layouts
- **Complete Design Token System** - Colors, typography, spacing, shadows, and semantic tokens
- **CSS Module Architecture** - Scoped styles with design token integration
- **Component Showcase** - Interactive examples of all components and variants
- **Layout Templates** - Pre-built application templates (Dashboard, Auth)
- **AI-Powered Prototyping** - Optimized for AI-assisted prototype generation

## Component Inventory

**54 Total Components** organized in a strict 6-layer hierarchy:

- **2 Layouts** - DashboardLayout, AuthLayout
- **3 Patterns** - VerticalNavigation, GlobalNav, LocalNav
- **18 Composites** - Modal, Table, SearchInput, DatePicker, Accordion, Tabs, and more
- **26 Primitives** - Button, Input, Card, Badge, Avatar, Icon, and more
- **5 Utilities** - Stack, Grid, Inline, Container, Spacer

**📖 Complete Catalog**: See [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) for detailed component list and usage.

## For AI Agents

This project supports **AI-powered prototype generation**. AI agents can create production-quality prototypes using the existing component hierarchy.

**📘 Start Here**: [CLAUDE.md](./CLAUDE.md) - Complete AI agent instructions and workflows

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the development server at `http://localhost:3000` with the component showcase.

### Build

```bash
npm run build
```

Builds the project for production to the `build/` directory.

## Project Structure

```
src/
├── design-system/              # Core design system (6-layer hierarchy)
│   ├── 1-tokens/              # Design tokens (colors, spacing, typography)
│   ├── 2-utilities/           # Layout helpers (Stack, Grid, etc.)
│   ├── 3-primitives/          # Atomic components (Button, Input, etc.)
│   ├── 4-composites/          # Composed components (Modal, Table, etc.)
│   ├── 5-patterns/            # UI patterns (VerticalNavigation, etc.)
│   └── 6-layouts/             # Application templates (Dashboard, Auth)
├── examples/                   # Demo pages and example layouts
│   ├── ComponentShowcase.tsx
│   ├── LayoutsDemo.tsx
│   └── ListTableExample.tsx
├── components/                 # App-level shared components
└── App.tsx                     # Main app with routing
```

## Routes

- `/showcase` - Component showcase (default landing page)
- `/layouts` - Layout template examples
- `/demo` - Full application demo

## Using the Design System

### Importing Components

```tsx
import { Button, Input, Card, Stack } from '@/design-system';

function MyComponent() {
  return (
    <Card>
      <Stack gap="medium">
        <Input label="Email" placeholder="Enter your email" />
        <Button variant="primary">Submit</Button>
      </Stack>
    </Card>
  );
}
```

### Using Design Tokens

All components use CSS Modules with design tokens from `src/design-system/styles/tokens.css`.

**Component CSS Module Example:**

```css
@import '../../styles/tokens.css';

.container {
  background: var(--ink-bg-primary);
  color: var(--ink-font-primary);
  padding: var(--ink-space-md);
  border-radius: var(--ink-radius-md);
}
```

### Available Components

**Basic Inputs:** Button, Input, Checkbox, Radio, Switch, Slider, SearchInput
**Selection:** Select, ComboBox, FileInput
**Data Display:** Table, Badge, Avatar, StatusLight, ProgressBar
**Layout:** Stack, Grid, Card, Divider, Accordion, Tabs
**Feedback:** Alert, Message, Spinner, Toast, Tooltip
**Overlay:** Modal, Popover, Menu, ContextMenu
**Navigation:** Breadcrumb, Pagination, VerticalNavigation, GlobalNav, LocalNav

See the Component Showcase (`/showcase`) for interactive examples of all components.

## Design Token System

The design system includes a comprehensive token system with three layers:

1. **Primitives** - Base colors (Cobalt, Neutral, Red, Green, etc.) with 10-140 scale
2. **Semantic Tokens** - Purpose-driven tokens (`--ink-font-*`, `--ink-bg-*`, `--ink-border-*`)
3. **Component Tokens** - Component-specific sizing and typography

All tokens support dark mode with `-inverse` variants.

## Building Prototypes

This starter is designed for rapid prototyping:

1. **Browse Components** - Visit `/showcase` to see all available components
2. **Copy Examples** - Use code from `src/examples/` as starting points
3. **Build Pages** - Create new pages in `src/examples/` and add routes in `App.tsx`
4. **Use Patterns** - Leverage pre-built patterns like VerticalNavigation for complex layouts

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS Modules
- React Router
- Lucide Icons
- React Hook Form

## Documentation

**For AI Agents:**
- [CLAUDE.md](./CLAUDE.md) - AI agent instructions and workflows
- [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Complete component index
- [FIGMA_GUIDE.md](./FIGMA_GUIDE.md) - Figma to code workflow
- [PROTOTYPE_GUIDE.md](./PROTOTYPE_GUIDE.md) - Common prototype patterns

**System Architecture:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - 6-layer hierarchy rules
- [docs/COLOR_PAIRING_RULES.md](./docs/COLOR_PAIRING_RULES.md) - Accessibility guidelines

**Component APIs:**
- [Layer READMEs](./src/design-system/) - Detailed component documentation for each layer

## Original Design

This design system was built from Figma specifications: https://www.figma.com/design/djnNvKVswXBH1r6i67jvcU/Implement-Design-Specifications
