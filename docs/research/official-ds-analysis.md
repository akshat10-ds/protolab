# INK Design System Learnings

This document captures key patterns, conventions, and architectural decisions from the official DocuSign INK Design System code (`@ds/ui`), based on a comprehensive review of the source code at `/Users/akshat.mishra/Documents/Claude Prototypes/Review DS Design system Files`.

**Purpose:** Reference guide for understanding official INK patterns and making informed decisions about what to adopt in prototyping projects.

---

## Table of Contents

1. [Component Inventory](#component-inventory)
2. [Architecture Overview](#architecture-overview)
3. [Key Patterns](#key-patterns)
4. [Token System](#token-system)
5. [Styling Approach](#styling-approach)
6. [Accessibility Patterns](#accessibility-patterns)
7. [Advanced Features](#advanced-features)
8. [Recommendations](#recommendations)

---

## Component Inventory

### Official @ds/ui: 124 Components

**Current Implementation:** 49 components
**Gap:** 75 missing components

### Missing Component Categories

#### 1. Advanced Form Controls (8 components)
- `ColorPicker` - Color selection with swatches
- `ColorSwatch` - Individual color display
- `ComboBox` - Autocomplete input
- `SelectMenu` - Advanced dropdown
- `SelectTile` / `SelectTileGroup` - Visual selection cards
- `FileDrop` - Drag-and-drop file upload
- `FileTypeIcon` - File type indicators

#### 2. Navigation (4 components)
- `SidebarNav` - Advanced sidebar navigation
- `SideNav` - Collapsible side navigation with animation
- `FlyoutNavItem` - Flyout menu items
- `Header` - Application header

#### 3. Feedback & Messages (6 components)
- `InlineMessage` - Contextual inline feedback
- `ToastMessage` - Toast notifications
- `PromoBanner` - Promotional banners
- `PromoBlock` - Promotional content blocks
- `ImageCallout` - Image-based callouts
- `ImageModal` - Image viewer modal

#### 4. Data Display (8 components)
- `CollectionViews` - Grid/list view switcher
- `DocumentThumbnail` - Document previews
- `EnvelopeCard` - Envelope display card
- `PreviewCard` - Content preview card
- `TaskCard` - Task display card
- `Tree` - Hierarchical tree view
- `Timeline` - Event timeline
- `StackedList` - Stacked list layout

#### 5. Advanced Interaction (8 components)
- `Hotspot` - Interactive hotspot markers
- `Scrim` - Overlay background
- `Overlay` - Modal/popover overlay
- `OverlayAction` - Overlay action buttons
- `Panel` - Side panel component
- `QuickActions` - Action button group
- `WorkflowStepper` - Multi-step workflow

#### 6. Visual Elements (10 components)
- `DotBadge` - Dot indicator
- `RoundBadge` - Round badge indicator
- `InitialTag` - User initials display
- `SignTag` - Signature tag
- `Signature` - Signature display
- `SignatureInitials` - Signature initials
- `GreenScoreCoin` - Score indicator
- `Meter` - Progress meter
- `StarRating` - Star rating display
- `ZoomControl` - Zoom controls

#### 7. Content Containers (4 components)
- `CardContainer` - Card wrapper
- `CobrandingPreview` - Cobranding preview
- `EmptyState` - Empty state display
- `Tile` - Generic tile component

#### 8. Specialized Components (9 components)
- `DocuSignLogo` - DocuSign branding
- `CountryFlagIcon` - Country flags
- `PaymentIcon` - Payment method icons
- `SocialIcon` - Social media icons
- `PaletteItem` - Color palette item
- `TextEllipsis` - Text truncation wrapper
- `TooltipManager` - Tooltip orchestration
- `MouseFocusCss` - Focus style management
- `Conditional` - Conditional rendering helper

#### 9. Advanced Inputs (5 components)
- `ToggleInput` / `ToggleInputGroup` - Toggle switches
- `ToolbarButton` - Toolbar button
- `ToolbarColorButton` - Color picker toolbar button
- `ToolbarDropdownInput` - Toolbar dropdown
- `ToolbarGroup` - Toolbar grouping

### Internal Component Library (29 components)

The official code has a separate `src/internal/components/` directory with private/shared components:

**Base Components:**
- `BaseButton`, `BaseCallout`, `BaseHeading`, `BaseIcon`, `BaseMenuItem`, `BaseMessage`, `BaseSignature`, `BaseStepper`, `BaseTag`, `BaseToolbarButton`

**Form Helpers:**
- `AboveInputContainer`, `BelowInputContainer`, `InputCount`, `InputLabel`, `InputRequiredAsterisk`, `InputTextArea`

**Utilities:**
- `ConditionalTag`, `IconOrImage`, `IconSmall`, `IconWithSize`, `IconWithTheme`, `ItemDelete`, `SelectionControlGroup`, `SkipNav`, `StopPropagation`

**Popover System:**
- `PopoverArrow`, `PopoverClose`, `PopoverFooter`, `PopoverManager`

---

## Architecture Overview

### Official @ds/ui Architecture

```
ds-ui/
├── src/
│   ├── components/           # 124 public components
│   ├── internal/
│   │   └── components/       # 29 internal components
│   ├── theming/              # Theme system
│   │   ├── docusign-themes/
│   │   │   ├── ink/          # Ink theme
│   │   │   └── olive/        # Olive theme
│   │   ├── components/       # Theme components
│   │   ├── types/            # Theme TypeScript types
│   │   └── utilities/        # useThemeStyles, useTheme, etc.
│   ├── styles/               # Global utilities
│   ├── utilities/            # Helper functions
│   ├── hooks/                # Shared React hooks
│   ├── support/              # Prop validators
│   ├── variables/            # Constants
│   └── modules/              # Feature modules
```

### Current Implementation Architecture

```
src/design-system/
├── components/               # 49 components
├── patterns/                 # Navigation patterns
└── styles/                   # tokens.css
```

### Key Architectural Differences

| Aspect | Official @ds/ui | Current Implementation |
|--------|----------------|----------------------|
| **Styling System** | Emotion CSS-in-JS | CSS Modules |
| **Token Format** | TypeScript constants (@ds/tokens) | CSS variables (tokens.css) |
| **Theme System** | Runtime theme swapping (Ink/Olive/Cobranding) | Single theme (CSS vars) |
| **Component Count** | 124 public + 29 internal | 49 total |
| **File Structure** | Multi-file (base/ink/olive/cobranding) | Single .module.css per component |
| **Animation** | @ds/motion (Framer Motion) | CSS transitions |
| **Icons** | @ds/icons package | Inline SVGs |
| **Testing** | Unit + SSR + VRT + Storybook | Storybook only |
| **I18n** | Built-in with useTranslate | Not implemented |

---

## Key Patterns

### 1. Component File Structure (Official)

Each official component follows a strict structure:

```
ComponentName/
├── ComponentName.tsx                    # Component implementation
├── ComponentName.test.tsx               # Unit tests
├── ComponentName.stories.tsx            # Storybook stories
├── ComponentName.ssrTest.tsx            # SSR tests
├── ComponentName.stories.vrt.tsx        # Visual regression tests
├── docs/
│   └── ComponentName.stories.tsx        # Additional docs
├── styles/
│   ├── index.ts                         # Exports all styles
│   ├── base.ts                          # Base styles (required)
│   ├── ink.ts                           # Ink theme overrides
│   ├── olive.ts                         # Olive theme overrides
│   └── cobranding.ts                    # Cobranding overrides
└── index.ts                             # Public exports
```

**Key takeaway:** Separation of concerns with dedicated files for testing, documentation, and theme-specific styles.

### 2. The useThemeStyles Pattern

**Core pattern for dynamic, theme-aware styling:**

```typescript
// styles/index.ts
import baseStyles from './base'
import inkStyles from './ink'
import oliveStyles from './olive'
import cobrandingStyles from './cobranding'

export default {
  base: baseStyles,
  ink: inkStyles,
  olive: oliveStyles,
  cobranding: cobrandingStyles
}

// styles/base.ts
import { Tokens } from '@ds/tokens'

interface StyleConfig {
  tokens: Tokens
  props: ButtonProps
}

export default (config: StyleConfig) => {
  const { tokens, props } = config

  return {
    button: {
      default: {
        backgroundColor: tokens.button.defaultBackgroundColor,
        color: tokens.button.defaultTextColor,
        fontSize: props.size === 'small' ? '14px' : '16px',
        // ... computed based on props + tokens
      },
      hover: { /* hover state */ },
      active: { /* active state */ },
      disabled: { /* disabled state */ }
    },
    icon: { /* icon styles */ }
  }
}

// Component.tsx
import { useThemeStyles } from '../../theming'
import styles from './styles'

export function Button(props: ButtonProps) {
  const sx = useThemeStyles(styles, props)

  return (
    <button css={[sx.button.default, sx.button.hover]}>
      {children}
    </button>
  )
}
```

**How it works:**
1. `useThemeStyles` detects current theme (Ink/Olive/Cobranding)
2. Merges base styles + theme-specific overrides
3. Calls style functions with current tokens + props
4. Returns final style object for use with Emotion's `css` prop

**Benefits:**
- Dynamic styles based on props (size, variant, etc.)
- Theme-specific overrides without conditional logic
- Full TypeScript support
- Tokens automatically injected

### 3. Prop Patterns

**Consistent prop conventions across all components:**

```typescript
export interface ButtonProps
  extends EventListenerProps<HTMLButtonElement | HTMLAnchorElement> {
  // Accessibility
  accessibilityText?: string           // Screen reader text
  'aria-label'?: string                // Spread aria-* props
  'aria-describedby'?: string

  // Data attributes
  'data-qa'?: string                   // Test automation ID
  'data-tracking'?: string             // Analytics tracking

  // Event handlers (spread pattern)
  onClick?: React.MouseEventHandler
  onFocus?: React.FocusEventHandler
  // ... all on[A-Z]* handlers

  // Ref forwarding
  forwardedRef?: React.Ref<HTMLButtonElement | HTMLAnchorElement>

  // Component-specific
  kind?: 'main' | 'primary' | 'secondary' | 'tertiary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean

  // Children
  children?: ConditionalReactElementChildOrArray
  startElement?: React.ReactElement    // Icon before text
  endElement?: React.ReactElement      // Icon after text
}
```

**Key conventions:**
- `accessibilityText` for screen reader labels
- `forwardedRef` instead of `ref` (avoids conflicts)
- `startElement`/`endElement` instead of `icon` (clearer semantics)
- `data-qa` for test automation
- Spread props for `aria-*`, `data-*`, and event handlers

### 4. ConditionalTag Pattern

**Polymorphic component that renders different elements based on props:**

```typescript
// Renders <a> if href provided, otherwise <button>
export function ConditionalTag(props: ConditionalTagProps) {
  const Tag = props.href ? 'a' : 'button'

  const elementProps = Tag === 'a'
    ? { href: props.href, target: props.target }
    : { type: props.type || 'button' }

  return (
    <Tag {...elementProps} {...otherProps}>
      {children}
    </Tag>
  )
}

// Usage in Button:
return (
  <ConditionalTag
    href={href}
    disabled={disabled}
    css={sx.button.default}
  >
    {children}
  </ConditionalTag>
)
```

**Benefits:**
- Semantic HTML (button vs anchor)
- Type-safe props
- Avoids duplicate component logic

### 5. Utility Functions

**Key utilities from `src/utilities/`:**

#### variant() - Class Name Generation
```typescript
// Creates variant class names by capitalizing
variant('color', 'blue')  // → 'colorBlue'
variant('size', 'large')  // → 'sizeLarge'

// Used for CSS Module class names:
const className = styles[variant('kind', kind)]
```

#### capitalize()
```typescript
capitalize('hello')  // → 'Hello'
```

#### CreateFocusCss() - Focus-Visible Polyfill
```typescript
// Adds :focus-visible support for older browsers
const focusStyles = CreateFocusCss({
  outline: '2px solid blue',
  outlineOffset: '2px'
})

// Generates:
// :focus { ...styles }
// :focus:not(:focus-visible) { outline: none }
// :focus-visible { ...styles }
```

#### Style Utilities
```typescript
import { styles } from '@ds/ui/utilities'

// Screen reader only
<span css={styles.visuallyHidden}>Hidden text</span>

// Text truncation
<p css={styles.ellipsis}>Long text...</p>

// Prevent mobile zoom on focus (16px minimum)
<input css={styles.touchScreenFormFieldFontSize} />

// Disable text selection
<div css={styles.userSelectNone}>No select</div>

// Word wrapping
<div css={styles.breakWord}>LongURLWithoutSpaces</div>
```

### 6. Compound Components Pattern

**Complex components use composition:**

```typescript
// Modal with subcomponents
export function Modal(props) {
  return (
    <ModalPortal>
      <Scrim onClick={handleClose} />
      <ModalContainer>
        {children}
      </ModalContainer>
    </ModalPortal>
  )
}

Modal.Header = function ModalHeader(props) { /* ... */ }
Modal.Body = function ModalBody(props) { /* ... */ }
Modal.Footer = function ModalFooter(props) { /* ... */ }

// Usage:
<Modal isOpen={isOpen}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button>Close</Button>
  </Modal.Footer>
</Modal>
```

### 7. Static Properties Pattern

**Export constants on component for easy access:**

```typescript
export function Button(props: ButtonProps) {
  // Component implementation
}

// Static properties
Button.displayName = 'Button'
Button.kinds = ['main', 'primary', 'secondary', 'tertiary', 'danger'] as const
Button.sizes = ['small', 'medium', 'large'] as const

// PropTypes for runtime validation
Button.propTypes = {
  kind: PropTypes.oneOf(Button.kinds),
  size: PropTypes.oneOf(Button.sizes),
  // ...
}

// Usage in tests/stories:
Button.kinds.map(kind => <Button kind={kind}>Click</Button>)
```

---

## Token System

### Official Token Architecture

The official system uses **@ds/tokens** - a TypeScript package with tokens compiled from design tools.

#### Three-Layer Structure

```typescript
// Layer 1: Color Primitives
const colors = {
  semanticBlack: { 100: '#000000' },
  semanticBlue: {
    10: '#E6F0FF',
    20: '#B3D4FF',
    // ... 30-100
    100: '#003D80'
  },
  semanticNeutral: {
    10: '#FAFAFA',
    // ... 20-100
    100: '#1A1A1A',
    fade: {
      5: 'rgba(26, 26, 26, 0.05)',
      10: 'rgba(26, 26, 26, 0.10)',
      // ... 15-95
    }
  },
  // semanticRed, semanticGreen, semanticOrange, semanticYellow, etc.
}

// Layer 2: Semantic Tokens
const inkTokens = {
  light: {
    // Background tokens
    bgColorDefault: colors.semanticNeutral[10],
    bgColorAccent: colors.semanticBlue[10],
    bgColorCanvas: colors.semanticWhite[100],

    // Font tokens
    fontColorDefault: colors.semanticNeutral[100],
    fontColorInverse: colors.semanticWhite[100],
    fontColorSubdued: colors.semanticNeutral[70],

    // Border tokens
    borderColorDefault: colors.semanticNeutral[40],
    borderColorSubdued: colors.semanticNeutral[30],

    // Message tokens
    messageColorInfo: colors.semanticBlue[60],
    messageColorSuccess: colors.semanticGreen[60],
    messageColorWarning: colors.semanticOrange[60],
    messageColorAlert: colors.semanticRed[60],
  },
  dark: {
    // Dark theme overrides
    bgColorDefault: colors.semanticNeutral[100],
    fontColorDefault: colors.semanticNeutral[10],
    // ...
  }
}

// Layer 3: Component Tokens
const inkButtonTokens = {
  main: {
    defaultBackgroundColor: inkTokens.light.bgColorAccent,
    hoverBackgroundColor: colors.semanticBlue[20],
    activeBackgroundColor: colors.semanticBlue[30],
    disabledBackgroundColor: colors.semanticNeutral[30],
    defaultTextColor: inkTokens.light.fontColorDefault,
    // ...
  },
  primary: { /* ... */ },
  secondary: { /* ... */ },
  tertiary: { /* ... */ },
  danger: { /* ... */ }
}
```

#### Token Categories in @ds/tokens

- **Avatar** - Avatar styling
- **Background** - bgColor*, bgGradient*
- **Badge** - Badge colors and sizing
- **Bar** - Progress bar colors
- **Border** - borderColor*, borderRadius*, borderWidth*
- **Breakpoint** - Responsive breakpoints
- **CTA** - Call-to-action button styles
- **Elevation** - Shadows and elevations
- **Focus** - Focus ring styles
- **Font** - Typography (fontColor*, fontSize*, fontWeight*, lineHeight*)
- **Form** - Form element styles
- **Icon** - Icon sizing and colors
- **Item** - List item styles
- **Message** - Feedback message colors
- **Opacity** - Opacity values
- **Spacing** - Margins, padding, gaps
- **Status** - Status indicator colors
- **Tag** - Tag styles
- **Typography** - Font families

### Current Token System

**Single CSS file with CSS variables:**

```css
/* src/design-system/styles/tokens.css (823 lines) */

/* Layer 1: Color Primitives */
:root {
  --ink-cobalt-10: #E6F0FF;
  --ink-cobalt-20: #B3D4FF;
  /* ... 30-140 */

  --ink-neutral-10: #FAFAFA;
  /* ... 20-140 */

  --ink-red-10: #FFE6E6;
  /* ... 20-140 */
}

/* Layer 2: Semantic Tokens */
:root {
  --ink-bg-default: var(--ink-neutral-10);
  --ink-bg-canvas: var(--ink-white);
  --ink-bg-accent: var(--ink-cobalt-10);

  --ink-font-default: var(--ink-neutral-140);
  --ink-font-subdued: var(--ink-neutral-100);
  --ink-font-inverse: var(--ink-white);

  --ink-border-default: var(--ink-neutral-40);
  --ink-border-subdued: var(--ink-neutral-30);

  /* Dark theme variants */
  --ink-bg-default-inverse: var(--ink-neutral-140);
  --ink-font-default-inverse: var(--ink-neutral-10);
}

/* Layer 3: Component Tokens */
:root {
  --ink-font-badge-size: 12px;
  --ink-font-badge-weight: 600;

  --ink-font-button-size: 16px;
  --ink-font-button-weight: 600;

  /* ... component-specific tokens */
}
```

### Comparison: TypeScript vs CSS Variables

| Aspect | Official (@ds/tokens) | Current (tokens.css) |
|--------|----------------------|---------------------|
| **Format** | TypeScript constants | CSS variables |
| **Access** | `inkTokens.light.bgColorDefault` | `var(--ink-bg-default)` |
| **Type Safety** | Full TypeScript types | String values only |
| **Theme Switching** | Runtime object swap | CSS variable override |
| **Dark Mode** | `inkTokens.dark` object | `-inverse` variant tokens |
| **Organization** | Modular TS files by category | Single 823-line CSS file |
| **Computation** | Can compute/derive tokens | Static values only |
| **Bundle Impact** | Only used tokens included | All tokens loaded |

**When to use each:**
- **TypeScript tokens:** Multi-theme apps, dynamic theming, runtime computation
- **CSS variables:** Simple theming, prototypes, single-theme apps

---

## Styling Approach

### Official: Emotion CSS-in-JS

**Every component uses Emotion with the `css` prop:**

```typescript
import { useThemeStyles } from '../../theming'
import styles from './styles'

export function Button(props: ButtonProps) {
  const sx = useThemeStyles(styles, props)

  return (
    <button
      css={[
        sx.button.default,
        isHovered && sx.button.hover,
        isDisabled && sx.button.disabled
      ]}
    >
      <span css={sx.text}>{children}</span>
      {icon && <span css={sx.icon}>{icon}</span>}
    </button>
  )
}
```

**Style definition (styles/base.ts):**

```typescript
export default (config: StyleConfig) => {
  const { tokens, props } = config

  return {
    button: {
      default: {
        backgroundColor: tokens.button[props.kind].defaultBackgroundColor,
        color: tokens.button[props.kind].defaultTextColor,
        fontSize: tokens.font.buttonSize,
        fontWeight: tokens.font.buttonWeight,
        padding: props.size === 'small' ? '8px 16px' : '12px 24px',
        borderRadius: tokens.border.radiusMedium,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 150ms ease',

        ':hover': {
          backgroundColor: tokens.button[props.kind].hoverBackgroundColor,
        },

        ':active': {
          backgroundColor: tokens.button[props.kind].activeBackgroundColor,
        },

        ':focus-visible': {
          outline: `2px solid ${tokens.focus.ringColor}`,
          outlineOffset: '2px',
        }
      },
      disabled: {
        backgroundColor: tokens.button.disabledBackgroundColor,
        color: tokens.button.disabledTextColor,
        cursor: 'not-allowed',
        opacity: 0.6,
      }
    },
    text: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: '8px',
      width: '16px',
      height: '16px',
    }
  }
}
```

**Benefits:**
- Dynamic styles based on props
- Co-located styles with components
- Full JavaScript power (loops, conditionals, etc.)
- Automatic critical CSS extraction
- Theme switching without CSS variable overhead

**Drawbacks:**
- Runtime overhead (style computation)
- Larger bundle size
- Learning curve
- Browser DevTools harder to use

### Current: CSS Modules

**Each component has a `.module.css` file:**

```typescript
// Button.tsx
import styles from './Button.module.css'
import { cn } from '@/utilities/cn'

export function Button({ kind = 'primary', size = 'medium', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button--${kind}`],
        styles[`button--${size}`],
        props.disabled && styles['button--disabled']
      )}
    >
      {children}
    </button>
  )
}
```

```css
/* Button.module.css */
@import '../../styles/tokens.css';

.button {
  background-color: var(--ink-bg-accent);
  color: var(--ink-font-default);
  font-size: var(--ink-font-button-size);
  font-weight: var(--ink-font-button-weight);
  padding: 12px 24px;
  border-radius: var(--ink-border-radius-medium);
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
}

.button:hover {
  background-color: var(--ink-cobalt-20);
}

.button--primary {
  background-color: var(--ink-cobalt-60);
  color: var(--ink-white);
}

.button--secondary {
  background-color: var(--ink-neutral-20);
  color: var(--ink-font-default);
}

.button--small {
  padding: 8px 16px;
  font-size: 14px;
}

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

**Benefits:**
- Zero runtime overhead
- Standard CSS (familiar to all developers)
- Easy debugging in browser DevTools
- Smaller bundle size
- Scoped styles (no global conflicts)

**Drawbacks:**
- Limited dynamic styling (need class variants)
- No access to props in CSS
- Theme switching requires CSS variable overrides
- More verbose (need explicit class names)

---

## Accessibility Patterns

### 1. Focus Management

#### Focus Trap (Modal/Dialog)

**Official implementation:**

```typescript
import { NavigationTrap } from '@ds/comp-private'

export function Modal(props: ModalProps) {
  return (
    <ModalPortal>
      <NavigationTrap isActive={isOpen}>
        <div role="dialog" aria-modal="true">
          {children}
        </div>
      </NavigationTrap>
    </ModalPortal>
  )
}
```

**NavigationTrap features:**
- Traps Tab/Shift+Tab within modal
- Wraps focus from last to first element
- Prevents focus on background elements
- Restores focus on close

#### Focus Return

**Return focus to trigger element after closing:**

```typescript
import { useFocusReturn } from '@ds/ui/hooks'

export function Modal(props: ModalProps) {
  const triggerRef = useRef<HTMLElement | null>(null)

  useFocusReturn(triggerRef, isOpen)

  // When modal closes, focus returns to triggerRef
}
```

#### Initial Focus Control

**Set initial focus when opening:**

```typescript
import { useInitialFocus } from '@ds/ui/hooks'

export function Modal(props: ModalProps) {
  const firstInputRef = useRef<HTMLInputElement>(null)

  useInitialFocus(firstInputRef, isOpen, {
    preventScroll: true
  })

  return (
    <dialog>
      <input ref={firstInputRef} />
    </dialog>
  )
}
```

### 2. Screen Reader Support

#### Visually Hidden Text

**Screen reader only content:**

```typescript
import { styles } from '@ds/ui/utilities'

export function Button(props: ButtonProps) {
  return (
    <button>
      <IconTrash />
      <span css={styles.visuallyHidden}>
        {accessibilityText || 'Delete item'}
      </span>
    </button>
  )
}
```

**CSS implementation:**

```css
.visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

#### Live Regions

**Announce dynamic changes:**

```typescript
export function Button(props: ButtonProps) {
  return (
    <>
      <button disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Submit'}
      </button>

      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          css={styles.visuallyHidden}
        >
          Loading, please wait...
        </div>
      )}
    </>
  )
}
```

### 3. Keyboard Navigation

#### Skip Navigation

**Skip to main content:**

```typescript
import { SkipNav } from '@ds/ui/internal'

export function App() {
  return (
    <>
      <SkipNav href="#main-content">
        Skip to main content
      </SkipNav>

      <Header />

      <main id="main-content">
        {children}
      </main>
    </>
  )
}
```

#### Listbox Keyboard Navigation

**Arrow key navigation in lists:**

```typescript
import { useListBox } from '@ds/ui/hooks'

export function SelectMenu(props: SelectMenuProps) {
  const {
    activeIndex,
    handleKeyDown
  } = useListBox({
    items: options,
    onSelect: handleSelect
  })

  return (
    <ul role="listbox" onKeyDown={handleKeyDown}>
      {options.map((option, index) => (
        <li
          role="option"
          aria-selected={index === activeIndex}
          tabIndex={index === activeIndex ? 0 : -1}
        >
          {option.label}
        </li>
      ))}
    </ul>
  )
}
```

**Supported keys:**
- `ArrowDown` - Next item
- `ArrowUp` - Previous item
- `Home` - First item
- `End` - Last item
- `Enter` - Select item
- `Escape` - Close menu

### 4. ARIA Patterns

#### Proper ARIA Attributes

**Button with menu:**

```typescript
export function Button(props: ButtonProps) {
  const hasMenu = props.menuTrigger === true

  return (
    <button
      aria-haspopup={hasMenu ? 'menu' : undefined}
      aria-expanded={hasMenu ? isMenuOpen : undefined}
      aria-controls={hasMenu ? menuId : undefined}
    >
      {children}
    </button>
  )
}
```

#### Form Input Associations

```typescript
export function Input(props: InputProps) {
  const inputId = useId()
  const errorId = useId()
  const hintId = useId()

  return (
    <div>
      <label htmlFor={inputId}>
        {label}
        {isRequired && <span aria-label="required">*</span>}
      </label>

      {hint && <div id={hintId}>{hint}</div>}

      <input
        id={inputId}
        aria-describedby={cn(hint && hintId, error && errorId)}
        aria-invalid={error ? 'true' : undefined}
        aria-required={isRequired ? 'true' : undefined}
      />

      {error && (
        <div id={errorId} role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
```

### 5. Focus-Visible Pattern

**Official implementation:**

```typescript
import { CreateFocusCss } from '@ds/ui/utilities'

const focusStyles = CreateFocusCss({
  outline: '2px solid blue',
  outlineOffset: '2px'
})

// Generates:
{
  ':focus': {
    outline: '2px solid blue',
    outlineOffset: '2px'
  },
  ':focus:not(:focus-visible)': {
    outline: 'none'
  },
  ':focus-visible': {
    outline: '2px solid blue',
    outlineOffset: '2px'
  }
}
```

**Purpose:** Show focus ring only for keyboard navigation, not mouse clicks.

---

## Advanced Features

### 1. Animation System (@ds/motion)

**Official uses Framer Motion wrapper:**

```typescript
import { Motion, MotionPresence, MotionVariant } from '@ds/motion'

export function SideNav(props: SideNavProps) {
  return (
    <Motion
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={{
        collapsed: { width: 60 },
        expanded: { width: 240 }
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </Motion>
  )
}

// With enter/exit animations:
export function Modal(props: ModalProps) {
  return (
    <MotionPresence>
      {isOpen && (
        <Motion
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {children}
        </Motion>
      )}
    </MotionPresence>
  )
}
```

**Common animation patterns:**
- **Expand/Collapse** - SideNav width animation
- **Fade In/Out** - Modal/Toast opacity
- **Slide** - Slide-out panels, drawers
- **Scale** - Popover enter/exit
- **Layout Animations** - Reordering, shared element transitions

### 2. Portal Rendering

**Modal/Popover rendering outside DOM hierarchy:**

```typescript
import { createPortal } from 'react-dom'
import { globalPortalIds } from '@ds/ui/utilities'

export function ModalPortal({ children }: ModalPortalProps) {
  const portalRoot = document.getElementById(globalPortalIds.modal)

  if (!portalRoot) return null

  return createPortal(children, portalRoot)
}

// In app root:
export function App() {
  return (
    <div>
      {children}

      <div id={globalPortalIds.modal} />
      <div id={globalPortalIds.popover} />
      <div id={globalPortalIds.tooltip} />
    </div>
  )
}
```

**Benefits:**
- Escape stacking context issues
- Proper z-index management
- Avoid overflow clipping

### 3. Popover Positioning (@floating-ui/react)

**Dynamic positioning with collision detection:**

```typescript
import { useFloating, offset, flip, shift } from '@floating-ui/react'

export function Popover(props: PopoverProps) {
  const { x, y, strategy, refs } = useFloating({
    placement: 'bottom-start',
    middleware: [
      offset(8),           // 8px gap from trigger
      flip(),              // Flip if no space
      shift({ padding: 8 }) // Shift to stay in viewport
    ]
  })

  return (
    <>
      <button ref={refs.setReference}>Trigger</button>

      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0
        }}
      >
        {children}
      </div>
    </>
  )
}
```

### 4. Body Scroll Lock

**Prevent background scrolling when modal open:**

```typescript
import { useDisableBodyScroll } from '@ds/ui/hooks'

export function Modal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useDisableBodyScroll(modalRef, isOpen)

  return (
    <div ref={modalRef}>
      {children}
    </div>
  )
}
```

**Implementation:**
```typescript
export function useDisableBodyScroll(
  elementRef: RefObject<HTMLElement>,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive) return

    const element = elementRef.current
    if (!element) return

    // Lock body scroll but allow modal content scroll
    disableBodyScroll(element, {
      reserveScrollBarGap: true
    })

    return () => {
      enableBodyScroll(element)
    }
  }, [isActive, elementRef])
}
```

### 5. Internationalization

**Built-in i18n with useTranslate:**

```typescript
import { useTranslate } from '@ds/i18nlayer'

export function Button(props: ButtonProps) {
  const t = useTranslate()

  return (
    <button aria-label={props.accessibilityText || t('button.submit')}>
      {isLoading ? t('button.loading') : children}
    </button>
  )
}
```

**Translation keys organized by component:**

```json
{
  "button": {
    "submit": "Submit",
    "loading": "Loading...",
    "cancel": "Cancel"
  },
  "modal": {
    "close": "Close modal"
  }
}
```

### 6. Virtualization (react-window)

**Render only visible items in long lists:**

```typescript
import { FixedSizeList } from 'react-window'

export function VirtualizedList(props: VirtualizedListProps) {
  const { items } = props

  const Row = ({ index, style }: RowProps) => (
    <div style={style}>
      {items[index]}
    </div>
  )

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
```

**Use cases:**
- Long tables (1000+ rows)
- Infinite scrolling
- Large dropdown menus

---

## Recommendations

### For Production-Ready Apps

**Adopt from official code:**

1. **useThemeStyles pattern** - If multi-theme support needed
2. **Accessibility utilities** - Focus management, screen reader support
3. **Internal component library** - DRY shared patterns
4. **Testing strategy** - Unit + SSR + VRT + Storybook
5. **Animation system** - For polished UX
6. **Internationalization** - For global apps

### For Prototyping

**Keep current approach:**

1. **CSS Modules** - Simpler, faster iteration
2. **CSS variable tokens** - Good enough for single theme
3. **Minimal dependencies** - Faster setup
4. **Storybook only** - Sufficient for demos

**Quick wins to adopt:**

1. **Utility functions:**
   - Add `variant()` for class name generation
   - Add `visuallyHidden` style utility
   - Add `CreateFocusCss()` for focus-visible

2. **Prop patterns:**
   - Use `accessibilityText` prop
   - Add `startElement`/`endElement` to Button
   - Support `data-qa` for testing

3. **Focus management:**
   - Add focus trap to Modal
   - Implement focus return
   - Add Escape key handler

4. **Component improvements:**
   - Button: loading state with spinner
   - Modal: body scroll lock
   - Input: proper ARIA associations

### Critical Components to Add

**High priority (5 components):**
1. **ToastMessage** - Essential for feedback
2. **InlineMessage** - Contextual messages
3. **SideNav** - Common pattern
4. **EmptyState** - Improve UX
5. **Skeleton** - Loading states

**Medium priority (5 components):**
6. **Tree** - Hierarchical data
7. **Timeline** - Event sequences
8. **ComboBox** - Autocomplete search
9. **FileDrop** - File uploads
10. **Panel** - Side panels/drawers

### Architecture Decision Guide

#### When to use CSS-in-JS (Emotion):
- Multi-theme apps (Ink/Olive/Cobranding)
- Need runtime style computation
- Complex component library
- Theme switching without page reload

#### When to use CSS Modules:
- Single theme app
- Prototyping/rapid iteration
- Simpler component library
- Team prefers standard CSS

#### When to use TypeScript tokens:
- Design token system from Figma
- Need type safety for tokens
- Tokens computed at build time
- Tree-shaking unused tokens

#### When to use CSS variables:
- Single theme
- Simple token system
- Prefer runtime flexibility
- All tokens always needed

---

## Conclusion

### Official @ds/ui Strengths

✅ Production-grade multi-theme system
✅ Comprehensive accessibility
✅ 124 components covering all use cases
✅ Full internationalization
✅ Advanced animations
✅ Complete testing strategy
✅ TypeScript throughout

### Official @ds/ui Complexity

⚠️ Steep learning curve (Emotion + theme system)
⚠️ Many dependencies (@ds/* packages)
⚠️ Complex build setup
⚠️ Over-engineered for simple use cases

### Current Implementation Strengths

✅ Simple, approachable architecture
✅ Fast prototyping
✅ Minimal dependencies
✅ Standard CSS (familiar to all)
✅ Good component coverage (49 components)

### Current Implementation Gaps

❌ No multi-theme support
❌ Limited accessibility features
❌ No animation system
❌ Missing 75 official components
❌ No internationalization

### Final Recommendation

**For this starter project:** Keep the current CSS Modules + CSS variables approach, but selectively adopt official patterns:

1. **Adopt:** Accessibility patterns, utility functions, prop conventions
2. **Consider:** Animation for key interactions, internal component library
3. **Skip:** Multi-theme system, runtime theming, full i18n (unless needed)

**Goal:** Balance simplicity (for prototyping) with quality (accessibility, UX patterns) without over-engineering.

---

**Next Steps:**

1. ✅ Review this learnings document
2. 🔲 Create `INK_QUICK_WINS.md` - Tactical improvements to current components
3. 🔲 Create `INK_MISSING_COMPONENTS.md` - Prioritized list of components to add
4. 🔲 Implement quick wins (utilities, accessibility, prop patterns)
5. 🔲 Add high-priority missing components (ToastMessage, InlineMessage, etc.)
