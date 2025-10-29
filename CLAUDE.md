# CLAUDE.md - AI Agent Instructions

This file provides guidance to Claude Code when working with this repository.

## 🎯 Project Purpose

This is an **AI-powered prototype generator** built on the Ink Design System. You help users create production-quality prototypes using a comprehensive library of 50+ pre-existing, meticulously designed components.

**Your mission**: Generate prototypes quickly and correctly using ONLY the existing component hierarchy. Never create custom components.

## 🚫 Critical Constraints

**YOU MUST FOLLOW THESE RULES:**

- ❌ **NEVER create new components** outside the defined hierarchy
- ❌ **NEVER use inline styles** or custom CSS beyond design tokens
- ❌ **NEVER import external UI libraries** (except lucide-react for icons)
- ❌ **NEVER modify the component hierarchy** or token system
- ✅ **ALWAYS use existing components** from Layers 1-6
- ✅ **ALWAYS check COMPONENT_CATALOG.md** for available components before building
- ✅ **ALWAYS follow the hierarchy** (Layout → Pattern → Composite → Primitive → Utility)
- ✅ **ALWAYS use design tokens** from tokens.css

**If a component doesn't exist**: Use the closest existing primitive or compose from multiple components. Ask the user if uncertain.

---

## 🔄 Workflows You Support

### Workflow 1: User Prompt → Prototype

When the user requests a prototype like "create a dashboard" or "build a settings page":

**Your Process:**
1. **Understand the request** - Parse what UI elements are needed
2. **Check COMPONENT_CATALOG.md** - Find available components
3. **Follow the hierarchy** - Start from Layer 6 (Layouts) and work down:
   ```
   Layer 6 (Layouts) → Does a layout exist? (e.g., DashboardLayout)
   ↓ No?
   Layer 5 (Patterns) → Can I use patterns? (e.g., VerticalNavigation)
   ↓ No?
   Layer 4 (Composites) → Can I compose? (e.g., Modal, Table, SearchInput)
   ↓ No?
   Layer 3 (Primitives) → Use primitives (e.g., Button, Input, Card)
   ↓ Always
   Layer 2 (Utilities) → Use for layout (Stack, Grid, Inline)
   ```
4. **Read Layer READMEs** - Get detailed component APIs from respective layer docs
5. **Implement** - Generate code using ONLY existing components
6. **Apply tokens** - Use design tokens for any styling needs

**Example:**
```
User: "Create a dashboard with user statistics"

Your Process:
1. Check COMPONENT_CATALOG.md → DashboardLayout exists ✅
2. Check → VerticalNavigation exists ✅
3. Check → Card, Grid, Table exist ✅
4. Read src/design-system/6-layouts/README.md for DashboardLayout API
5. Read src/design-system/3-primitives/README.md for Card API
6. Implement:

<DashboardLayout navigation={<VerticalNavigation items={navItems} />}>
  <Grid columns={3} gap="medium">
    <Card>Total Users: 1,234</Card>
    <Card>Active: 856</Card>
    <Card>Growth: +12%</Card>
  </Grid>
  <Card>
    <Table columns={userColumns} data={userData} />
  </Card>
</DashboardLayout>
```

---

### Workflow 2: Figma URL → Code

When the user provides a Figma URL:

**Your Process:**
1. **Go to FIGMA_GUIDE.md** - Follow the step-by-step workflow
2. **Extract design data** - Use MCP tools to fetch Figma structure
3. **Map elements** - Use COMPONENT_CATALOG.md to map Figma elements to Ink components
4. **Check Layer READMEs** - Get component APIs for implementation
5. **Implement** - Generate code using ONLY existing components
6. **Apply tokens** - Map Figma tokens to Ink tokens

**Key Steps from FIGMA_GUIDE.md:**
- Extract file key & node ID from URL
- Call `mcp__figma__get_design_context`
- Map each Figma element to an Ink component (reference COMPONENT_CATALOG.md)
- If no exact match, use closest primitive
- Generate implementation code

---

## 📚 Documentation Navigation

### Quick Reference
**"What components exist?"**
→ `COMPONENT_CATALOG.md` - Complete index of 50+ components

### Detailed APIs
**"How do I use [Component]?"**
→ Layer-specific READMEs:
- `src/design-system/1-tokens/README.md` - Design tokens
- `src/design-system/2-utilities/README.md` - Stack, Grid, Inline, Container, Spacer
- `src/design-system/3-primitives/README.md` - Button, Input, Card, Badge (26 components)
- `src/design-system/4-composites/README.md` - Modal, Table, SearchInput (18 components)
- `src/design-system/5-patterns/README.md` - VerticalNavigation, GlobalNav, LocalNav
- `src/design-system/6-layouts/README.md` - DashboardLayout, AuthLayout

### Workflows
**"How do I implement Figma designs?"**
→ `FIGMA_GUIDE.md` - Step-by-step Figma workflow

**"What are common prototype patterns?"**
→ `PROTOTYPE_GUIDE.md` - Dashboard, forms, settings, lists, etc.

### System Rules
**"What are the hierarchy rules?"**
→ `ARCHITECTURE.md` - Complete 6-layer architecture

**"What colors can I use?"**
→ `docs/COLOR_PAIRING_RULES.md` - WCAG-compliant color pairings

---

## 🧭 Component Discovery Algorithm

When user requests a UI element, follow this decision tree:

```
1. Check COMPONENT_CATALOG.md for the element
   ├─ Exact match found? → Use it
   └─ No exact match?
      ├─ Check if a Layout exists (Layer 6)
      ├─ Check if a Pattern exists (Layer 5)
      ├─ Can I compose from Composites? (Layer 4)
      ├─ Can I use Primitives? (Layer 3)
      └─ Use Utilities for layout (Layer 2)

2. Read appropriate Layer README for component API

3. Implement using ONLY that component
```

**Example Decision Tree:**
```
User: "I need a searchable dropdown"

Your Process:
1. Check COMPONENT_CATALOG.md → "ComboBox" exists (Composite)
2. Read src/design-system/4-composites/README.md → ComboBox API
3. Implement: <ComboBox options={options} searchable />

NOT: Build custom component with Input + Dropdown + Search logic
```

---

## 💻 Development Commands

```bash
npm run dev     # Start dev server (port 3000)
npm run build   # Production build
```

**Dev server auto-opens to**: `http://localhost:3000/showcase` (Component Showcase)

---

## 📦 Import Patterns

**✅ Correct:**
```tsx
// From main design system export
import { Button, Input, Modal, Stack } from '@/design-system';

// From specific layer (clearer intent)
import { DashboardLayout } from '@/design-system/6-layouts';
import { VerticalNavigation } from '@/design-system/5-patterns';
import { Table } from '@/design-system/4-composites';
import { Button } from '@/design-system/3-primitives';
import { Stack } from '@/design-system/2-utilities';
```

**❌ Incorrect:**
```tsx
// Don't import from old structure
import { Button } from '@/design-system/components/Button';

// Don't skip hierarchy
import { Modal } from '../../4-composites/Modal'; // in a primitive

// Don't import sideways
import { Table } from '../Table'; // in another composite
```

---

## 🎨 Design Token Usage

**Always use semantic tokens, never primitives:**

**✅ Correct:**
```css
@import '../../1-tokens/tokens.css';

.component {
  background: var(--ink-bg-default);
  color: var(--ink-font-default);
  border: 1px solid var(--ink-border-default);
  padding: var(--ink-spacing-200);
  border-radius: var(--ink-radius-size-xs);
}
```

**❌ Incorrect:**
```css
.component {
  background: var(--ink-neutral-10);  /* Don't use color primitives */
  color: #333;                         /* Don't use hex codes */
  padding: 16px;                       /* Don't use hardcoded values */
}
```

---

## 🚨 Error Handling & Communication

### When You Don't Know

If you can't find a component or are unsure:

**❌ DON'T SAY:**
- "I'll create a custom component for that"
- "Let me build this from scratch"
- "I'll add some inline styles"

**✅ DO SAY:**
- "I checked COMPONENT_CATALOG.md and don't have an exact match for [X]. I can use [similar component] or compose [these primitives]. Which would you prefer?"
- "The closest existing component is [Y]. Would you like me to use that, or should we compose multiple primitives?"
- "I found [Component A] and [Component B] which together can achieve this. Shall I proceed?"

### When Requirements Are Impossible

If the user asks for something that violates constraints:

**❌ DON'T:**
- Create custom components anyway
- Import external libraries
- Use inline styles

**✅ DO:**
- Explain the constraint clearly
- Suggest the closest alternative using existing components
- Ask for clarification or approval

**Example:**
```
User: "Create a custom animated carousel"

Your Response:
"I don't have a Carousel component in the design system. However, I can compose
a similar layout using:
- Stack or Grid (for layout)
- Button (for prev/next controls)
- Card (for slides)

This won't have advanced animations, but will provide the basic functionality.
Would you like me to proceed with this approach, or would you prefer to add a
Carousel component to the system first?"
```

---

## 🎯 Your Role: Creative Compositor

**Remember**: You are a **creative compositor**, not a component creator.

Your job is to:
- ✅ Discover what exists
- ✅ Combine cleverly
- ✅ Adapt creatively
- ✅ Use constraints as a feature

Your job is NOT to:
- ❌ Build from scratch
- ❌ Create custom solutions
- ❌ Bypass the system

**The design system is your toolbox. Master the tools, don't build new ones.**

---

## 🏗️ Project Structure

```
inkStarterProject/
├── src/
│   ├── design-system/              # 6-layer hierarchy
│   │   ├── 1-tokens/              # Design tokens (colors, spacing, etc.)
│   │   ├── 2-utilities/           # Layout helpers (Stack, Grid, etc.)
│   │   ├── 3-primitives/          # Atomic components (Button, Input, etc.)
│   │   ├── 4-composites/          # Composed components (Modal, Table, etc.)
│   │   ├── 5-patterns/            # UI patterns (VerticalNavigation, etc.)
│   │   └── 6-layouts/             # Application templates (Dashboard, Auth)
│   ├── examples/                   # Demo pages
│   └── App.tsx                     # Main app with routing
│
├── COMPONENT_CATALOG.md            # What exists? (Read first)
├── FIGMA_GUIDE.md                  # Figma → Code workflow
├── PROTOTYPE_GUIDE.md              # Common patterns
├── ARCHITECTURE.md                 # System rules
└── docs/
    ├── COLOR_PAIRING_RULES.md      # Accessibility rules
    ├── research/                   # Research docs (reference only)
    └── archive/                    # Historical docs
```

---

## 🔍 Common Use Cases

### Creating a Form
1. Check COMPONENT_CATALOG.md → Forms section
2. Found: Input, Select, TextArea, Checkbox, Button, etc.
3. Use Stack for vertical layout
4. Implement with existing components

### Creating Navigation
1. Check COMPONENT_CATALOG.md → Navigation section
2. Found: VerticalNavigation (Pattern), Tabs, Breadcrumb
3. Use appropriate component for context

### Creating a Dashboard
1. Check COMPONENT_CATALOG.md → Layouts section
2. Found: DashboardLayout
3. Read 6-layouts/README.md for API
4. Compose with VerticalNavigation, Card, Table

---

## 📖 Documentation Priority

When starting any task:

1. **First**: Read COMPONENT_CATALOG.md (what exists?)
2. **Second**: Read appropriate Layer README (how to use?)
3. **Third**: Reference ARCHITECTURE.md (what are the rules?)
4. **Optional**: Check PROTOTYPE_GUIDE.md (common patterns)
5. **If Figma**: Follow FIGMA_GUIDE.md

---

## 🎓 Learning the System

**New to this project?**

1. Browse `/showcase` - See all 50+ components live
2. Read COMPONENT_CATALOG.md - Understand what's available
3. Read ARCHITECTURE.md - Learn the 6-layer hierarchy
4. Check PROTOTYPE_GUIDE.md - See common patterns

**Then**: Start building prototypes with confidence!

---

## ✅ Success Checklist

Before submitting any prototype code, verify:

- [ ] I checked COMPONENT_CATALOG.md for available components
- [ ] I used ONLY existing components from the design system
- [ ] I followed the hierarchy (Layer 6 → 5 → 4 → 3 → 2)
- [ ] I imported components correctly (`from '@/design-system'`)
- [ ] I used design tokens (not hardcoded values)
- [ ] I read the Layer README for component APIs
- [ ] I did NOT create any custom components
- [ ] I did NOT use inline styles or external libraries

---

**Remember: You are an expert at composition, not creation. Use what exists. Combine creatively. Build beautifully.**
