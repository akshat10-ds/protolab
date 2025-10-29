# INK Component Comparison
## Current Implementation vs Official DS-UI

**Last Updated:** 2025-10-27

This document provides a meticulous component-by-component comparison between our implementation and the official DocuSign INK Design System (`@ds/ui`).

---

## Executive Summary

**Current Implementation:** 48 components (45 components + 3 patterns)
**Official DS-UI:** 132+ components
**Gap:** 87+ missing components

### Overall Assessment

The current implementation is a **simplified prototype version** optimized for rapid UI development. It captures essential visual styling and basic functionality but lacks the production-grade features, accessibility, theming, animation, and architectural sophistication of the official DS-UI.

### Key Architectural Differences

| Aspect | Current Implementation | Official DS-UI |
|--------|----------------------|----------------|
| **Styling** | CSS Modules + tokens.css | Emotion CSS-in-JS + @ds/tokens |
| **Theming** | Single Ink theme | Dual-theme (Ink + Olive) with runtime switching |
| **Animation** | CSS transitions only | @ds/motion (Framer Motion) |
| **Composition** | Monolithic components | Compound component patterns |
| **Accessibility** | Basic ARIA | Comprehensive (focus traps, keyboard nav, i18n) |
| **Utilities** | Simple `cn()` helper | Extensive library (@ds/react-utils) |
| **Event Handling** | Standard React handlers | Sophisticated systems (StopPropagation, EscapeToClose) |
| **Internationalization** | None | Built-in with useTranslate() |
| **Testing Support** | None | data-qa attributes throughout |

---

## Component-by-Component Analysis

### Accordion

**Status:** ⚠️ Partial Implementation

#### Functional Differences

**API Pattern:**
- **Current:** Array-based with `AccordionItemData[]`
- **Official:** Compound components with `Accordion.Item`

**Missing Props:**
- `headingLevel` - Semantic HTML heading level (h1-h6)
- `displayLevel` - Visual styling level ('heading-xxs', 'heading-xs')
- `itemHeight` - Size variant ('compact', 'default', 'tall')
- `toggle` - Auto-close other panels when one opens
- `noPadding` - Remove internal panel padding
- `metadata` - Supplemental text in header
- `subtitle` - Secondary text under title
- `startElement` - Leading icon/element in header

**Missing Features:**
- No compound component pattern (`Accordion.Item`)
- No `VerticalSlider` animation component (smooth height transitions)
- No theme-aware styling system
- No `BaseHeadingTag` for semantic HTML
- No `data-qa` attributes for test automation
- Missing controlled/uncontrolled pattern for individual items

**Implementation:**
```typescript
// Current API
<Accordion items={[
  { id: '1', title: 'Panel 1', content: <div>Content</div> }
]} />

// Official API
<Accordion>
  <Accordion.Item
    title="Panel 1"
    headingLevel={2}
    displayLevel="heading-xs"
    itemHeight="default"
    metadata="Optional metadata"
  >
    Content
  </Accordion.Item>
</Accordion>
```

#### Visual Differences

**Sizing:**
- **Current:** Fixed 12px/16px padding, single size
- **Official:** Three size variants:
  - Compact: `spacingGap100` padding, `radiusSizeXS` border-radius
  - Default: `spacingGap150` padding, `radiusSizeS` border-radius
  - Tall: `spacingGap250` padding, `radiusSizeM` border-radius

**Interactive States:**
- **Current:** Basic hover background change
- **Official:** Four distinct states:
  - `itemBgColorHoverSubtle` - Hover with border
  - `itemBgColorHover` - Hover without border
  - `itemBgColorActiveSubtle` - Active/pressed state
  - `itemBgColorSelectedSubtle` - Open panel state

**Typography:**
- **Current:** Fixed `--ink-font-size-md` (16px)
- **Official:** Dynamic based on `displayLevel`:
  - `heading-xs`: `tokens.fontHeadingXS`
  - `heading-xxs`: `tokens.fontHeadingXXS`
  - Default: `tokens.fontBodyM`

**Animation:**
- **Current:** CSS max-height transition
- **Official:** `VerticalSlider` component with height animation

**Icons:**
- **Current:** Generic chevron icon
- **Official:** Theme-specific icons from @ds/icons (`ChevronDownSmall`, `ChevronUpSmall`)

#### Code Quality

**Current:**
- ~120 lines
- Simple, readable
- Good for prototyping
- Basic accessibility (role, aria-expanded)

**Official:**
- ~250 lines main file + separate Item component
- PropTypes validation
- Deprecation warnings for old props
- Theme detection with `useIsInk()`
- Unique ID generation
- Extensive JSDoc documentation

---

### AlertBadge

**Status:** ⚠️ Significantly Different

#### Functional Differences

**Missing Props:**
- `accessibilityText` - **REQUIRED** in official (screen reader text)
- `maxVisibleDigits` - Controls maximum number display (e.g., "99+" for 100)
- `forwardedRef` - Ref forwarding support
- Event handlers - `onClick`, `onMouseEnter`, `onMouseLeave`, etc.

**Missing Features:**

**1. Animation System:**
- **Current:** No animation
- **Official:** Framer Motion entrance animation:
  - Scale: `[0, 1, 1]` (pop in effect)
  - Opacity: `[0, 1]` (fade in)
  - Duration: 0.2s
  - Easing: smooth curve

**2. Dynamic Width Calculation:**
- **Current:** Fixed widths
- **Official:** Dynamically calculates badge width using `useRef` and `getBoundingClientRect()`
  - Single digit: 20px
  - Multi-digit: `badgeValueWidth + 16px`
  - Handles digit overflow with `maxVisibleDigits`

**3. Three Display States:**
- **Current:** `value` (number) and `dot` (boolean)
- **Official:** Three states:
  - `value` - Numeric badge
  - `dot` - Dot indicator
  - `undefined` - Empty character (renders empty space)

**4. Accessibility:**
- **Current:** No accessibility support
- **Official:**
  - Visually hidden text node with `accessibilityText`
  - PropTypes validation requires `accessibilityText`
  - Example: "5 unread notifications"

#### Visual Differences

**Sizing:**
- **Current:**
  - Single digit: 20px width/height
  - Multi-digit: Dynamic width, 20px height
  - Dot: 12px width/height

- **Official:**
  - Single digit: 20px width/height
  - Multi-digit: Calculated width (value element + padding), 20px height
  - Dot: 14px width/height ⬅ **2px larger**

**Positioning:**
- **Current:** `position: absolute; top: -8px; right: -8px`
- **Official:** Similar positioning with theme tokens

**Typography:**
- **Current:**
  ```css
  font-size: var(--ink-font-badge-size);
  font-weight: 600;
  letter-spacing: 0.12px;
  ```

- **Official:**
  ```javascript
  fontSize: tokens.fontBadge.fontSize,
  fontWeight: tokens.fontBadge.fontWeight,
  lineHeight: tokens.fontBadge.lineHeight,
  // No explicit letter-spacing (included in fontBadge token)
  ```

**Colors:**
- **Current:**
  - Alert: `var(--ink-message-bg-alert)` (red)
  - Dot: `var(--ink-status-bg-subtle-inverse)` (blue-ish)

- **Official:**
  - Alert: `tokens.messageBgColorAlert`
  - Dot: `tokens.statusBgColorSubtleInverse`

**Animation Details:**
```javascript
// Official implementation
<Motion
  initial={{ scale: 0, opacity: 0 }}
  animate={{
    scale: [0, 1, 1],
    opacity: [0, 1]
  }}
  transition={{
    duration: 0.2,
    times: [0, 0.7, 1]
  }}
>
  {badge content}
</Motion>
```

#### Code Quality

**Current:**
- ~70 lines
- Simple implementation
- No accessibility
- Good for static displays

**Official:**
- ~150 lines
- PropTypes with required `accessibilityText`
- Motion integration
- Dynamic sizing with refs and DOM measurements
- Theme-aware styling
- Event handler support

**Recommendation:**
- Add `accessibilityText` prop (required)
- Add entrance animation
- Add dynamic width calculation for large numbers
- Support `maxVisibleDigits` for overflow ("99+")

---

### Badge

**Status:** ❌ Completely Different Component

**IMPORTANT:** These are fundamentally different components serving different purposes.

#### Component Purpose

**Current Badge:**
- Status/label badges (similar to official `StatusBadge`)
- Use case: Status indicators, categorical labels
- Variants: `subtle`, `emphasis`, `success`, `warning`, `alert`, `promo`

**Official Badge:**
- **DEPRECATED** - Users warned to use `StatusBadge` instead
- Legacy component maintained for backwards compatibility
- Colors: `blue`, `green`, `neutral`, `orange`, `red`, `transparent`, `turquoise`, `white`, `yellow`
- Shapes: `pill`, `rectangle`

#### Mapping

Our `Badge` component ≈ Official `StatusBadge` component

#### Current Badge Implementation

```typescript
interface BadgeProps {
  children: React.ReactNode
  variant?: 'subtle' | 'emphasis' | 'success' | 'warning' | 'alert' | 'promo'
  size?: 'small' | 'medium' | 'large'
  rounded?: boolean
  className?: string
}
```

**Variants:**
- `subtle` - Low emphasis (light backgrounds)
- `emphasis` - High emphasis (bold colors)
- `success` - Green for success states
- `warning` - Orange for warnings
- `alert` - Red for errors
- `promo` - Purple for promotional content

#### Official StatusBadge (Equivalent)

```typescript
interface StatusBadgeProps {
  text: string
  accessibilityText?: string
  color?: 'blue' | 'green' | 'neutral' | 'orange' | 'purple' | 'red' | 'turquoise' | 'yellow'
  emphasis?: boolean
  icon?: ReactElement
  shape?: 'pill' | 'rectangle'
  size?: 'small' | 'medium'
}
```

**Key Differences:**
1. **Text Prop:** Official uses `text` prop (string) vs our `children` (ReactNode)
2. **Color System:** Official uses color names vs our semantic variants
3. **Emphasis:** Official has single `emphasis` boolean vs our multiple variants
4. **Icon Support:** Official supports `icon` prop, current doesn't
5. **Accessibility:** Official supports `accessibilityText` override

#### Visual Comparison

| Aspect | Current Badge | Official StatusBadge |
|--------|--------------|---------------------|
| **Shapes** | Rounded (boolean) | pill, rectangle |
| **Sizes** | small, medium, large | small, medium |
| **Colors** | Semantic variants | Named colors |
| **Icons** | Not supported | Supported via icon prop |
| **Text** | Via children | Via text prop |

#### Recommendation

**Option 1:** Rename current `Badge` to `StatusBadge` and align API
```typescript
<StatusBadge
  text="Active"
  color="green"
  emphasis={true}
  icon={<CheckIcon />}
/>
```

**Option 2:** Keep current implementation, add icon support
```typescript
<Badge variant="success" icon={<CheckIcon />}>
  Active
</Badge>
```

---

### Button

**Status:** ⚠️ Partial Implementation

#### Functional Differences

**Missing Props:**

**Animation Support:**
- `animate` - Enable animation for SideNav integration
- `animateOn` - Event to trigger animation ('hover', 'focus')

**ButtonGroup Support:**
- `groupStart` - Button is first in group (left border-radius)
- `groupCenter` - Button is in middle (no border-radius)
- `groupEnd` - Button is last in group (right border-radius)

**Deprecated Props:**
- `expanded` - Use `aria-expanded` instead
- `icon` + `iconPosition` - Use `startElement`/`endElement` instead
- `main` kind - Use `brand` instead

**Additional Props:**
- `round` - Round buttons (internal use)
- `rel` - Link relationship for anchor buttons
- `role` - Custom ARIA role
- `title` - HTML title attribute

**API Differences:**
- **Current:** `children` prop (ReactNode)
- **Official:** `text` prop (string) + optional `accessibilityText` override
- **Current:** `rounded` prop (boolean)
- **Official:** `pill` prop (boolean)

#### Missing Features

**1. Theme System:**
- No `useThemeStyles()` hook
- No `useIsInk()` theme detection
- No dual-theme support (Ink + Olive)
- Missing theme-specific icon swapping

**2. Internationalization:**
- No `useTranslate()` hook
- Missing translations for:
  - "opens in new window" (when `target="_blank"`)
  - "loading" (screen reader text for loading state)

**3. ConditionalTag Pattern:**
- **Current:** Manual type discrimination
- **Official:** Smart component that renders:
  - `<button>` - Default
  - `<a>` - When `href` provided
  - `<label>` - When used with form controls

**4. Theme-Aware Icons:**
- **Current:** Renders icons directly
- **Official:** Uses `IconWithTheme` component that swaps icons between themes:
  - Ink theme: `ChevronDownSmall` (outlined)
  - Olive theme: `MenuTriangleDownOlive` (filled)

**5. ButtonGroup Integration:**
- **Current:** No group support
- **Official:** Complex border management:
  - `groupStart`: Right border removed, right border-radius removed
  - `groupCenter`: Both borders removed, no border-radius
  - `groupEnd`: Left border removed, left border-radius removed

**6. Animation System:**
- **Current:** CSS transitions only
- **Official:** Motion integration for SideNav buttons:
  ```typescript
  animate={{ rotate: expanded ? 90 : 0 }}
  transition={{ duration: 0.2 }}
  ```

**7. Loading State:**
- **Current:** Shows spinner, disables button
- **Official:**
  - Sophisticated loading spinner from theme
  - ARIA live region with translated loading message
  - Maintains button size during loading
  - `aria-busy="true"` attribute

#### Visual Differences

**Kinds/Variants:**
- **Current:** `brand`, `primary`, `secondary`, `tertiary`, `danger`
- **Official:** `main` (deprecated), `brand`, `primary`, `secondary`, `tertiary`, `danger`
  - Official shows console warning when `main` is used

**Sizes:**
- Both: `small`, `medium`, `large`, `xlarge`
- Sizing tokens may differ between implementations

**Inverted Colors:**
- **Current:** Single `.button--inverted` class applies to all variants
- **Official:** Per-kind invert styles:
  ```javascript
  sx.button.inverted[kind] // Different for each kind
  ```

**States:**
- **Current:** `:hover`, `:active`, `:focus-visible`, `:disabled`
- **Official:** Additional `active` prop for programmatic active state

**Pill Shape:**
- **Current:** `rounded` prop sets `border-radius: 9999px`
- **Official:** `pill` prop sets `borderRadius: tokens.radiusPill`

**Menu Trigger:**
- **Current:** Simple SVG chevron
- **Official:** Theme-specific icons:
  - Ink: `ChevronDownSmall` (12x12, outlined)
  - Olive: `MenuTriangleDownOlive` (8x8, filled triangle)

**Loading Spinner:**
- **Current:** Custom inline SVG with CSS animation
  ```css
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  ```

- **Official:** Theme-provided spinner component:
  ```javascript
  <span css={sx.loadingSpinner}>
    <Spinner size={spinnerSize} />
  </span>
  ```

**Typography:**
- **Current:** CSS Module classes
- **Official:**
  - `sx.button.text` with theme tokens
  - Hidden text support for icon-only buttons with accessibility text

**Icon Spacing:**
- **Current:** Fixed margins (8px)
- **Official:** Theme tokens for icon gaps

**Focus Ring:**
- **Current:** CSS `:focus-visible` with fixed outline
- **Official:** Theme-aware focus styles:
  ```javascript
  ':focus-visible': {
    outline: tokens.focusOuter,
    outlineOffset: tokens.focusOuterOffset
  }
  ```

#### Code Quality

**Current:**
- ~150 lines
- Clean TypeScript interfaces
- Good ref forwarding with union type
- Basic accessibility
- Easy to understand

**Official:**
- ~400 lines
- PropTypes validation with runtime checks
- Deprecation warnings via `consoleWarn()`
- Required prop validation
- Complex CSS specificity management
- Motion animation integration
- Extensive JSDoc comments
- Helper class strings for Olive theme (`olv-button olv-ignore-transform`)
- Translation support

**Example Deprecation Warning:**
```typescript
if (icon || iconPosition) {
  consoleWarn(
    'Button: `icon` and `iconPosition` props are deprecated. Use `startElement` or `endElement` instead.'
  )
}
```

#### Implementation Examples

**Current API:**
```tsx
<Button
  variant="primary"
  size="medium"
  rounded={true}
  loading={isLoading}
  disabled={isDisabled}
  startElement={<Icon name="check" />}
  endElement={<Icon name="arrow-right" />}
>
  Click me
</Button>
```

**Official API:**
```tsx
<Button
  kind="primary"
  size="medium"
  pill={true}
  loading={isLoading}
  disabled={isDisabled}
  startElement={<CheckIcon />}
  endElement={<ArrowRightIcon />}
  text="Click me"
  accessibilityText="Click me to submit form"
  menuTrigger={showMenu}
  groupStart={isFirst}
  animate={true}
  animateOn="hover"
/>
```

#### Recommendations

**High Priority:**
1. Add `accessibilityText` prop for screen readers
2. Implement loading state with ARIA live region
3. Add theme-aware focus styles
4. Support `pill` naming (more common than `rounded`)

**Medium Priority:**
5. Add `ButtonGroup` support with positioning props
6. Implement `ConditionalTag` pattern for semantic HTML
7. Add deprecation warnings for future API changes
8. Add `data-qa` prop for testing

**Low Priority:**
9. Add Motion integration for animations
10. Implement theme system with icon swapping
11. Add translation support

---

### Card

**Status:** ✅ Similar Implementation (Unique to Current)

**Note:** Card is not a single component in official DS-UI. Official has specialized card types:
- `PreviewCard` - Card with image preview
- `EnvelopeCard` - DocuSign envelope display
- `TaskCard` - Task display card

Our `Card` is a general-purpose container component.

#### Current Implementation

```typescript
interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'small' | 'medium' | 'large'
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
  className?: string
}
```

**Variants:**
- `default` - Flat with border
- `outlined` - Emphasized border
- `elevated` - Drop shadow

**Features:**
- Customizable padding
- Hover states
- Click handling
- Flexible content

#### Official Equivalent

Official doesn't have a generic `Card` component. Closest equivalents:

**CardContainer** (Internal component):
- Used as base for other card types
- Provides elevation, borders, backgrounds

**PreviewCard:**
- Image/thumbnail preview
- Title, description, metadata
- Action buttons
- More specialized than our Card

#### Recommendation

**Keep current Card implementation** - It's useful for prototyping. Consider:
1. Add `elevated` variant shadows to match INK elevation tokens
2. Add `interactive` variant for clickable cards
3. Support `as` prop for semantic HTML (article, section, div)

---

### Checkbox

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Missing Props:**
- `indeterminate` - Partial selection state (for "select all" scenarios)
- `accessibilityText` - Override label for screen readers
- `error` - Error state styling
- `labelPosition` - Position label ('start', 'end')
- `forwardedRef` - Ref forwarding

**Missing Features:**

**1. Indeterminate State:**
- **Current:** Only checked/unchecked
- **Official:** Three states - checked, unchecked, indeterminate
  - Uses `useEffect` to set `input.indeterminate` DOM property
  - Visual: minus icon instead of checkmark
  - Common for "select all" in lists

**2. Error State:**
- **Current:** No error styling
- **Official:** `error` prop adds error border color

**3. Label Flexibility:**
- **Current:** Label always on right
- **Official:** `labelPosition` prop ('start', 'end')

**4. Accessibility:**
- **Current:** Basic label association
- **Official:**
  - `accessibilityText` override
  - Comprehensive ARIA attributes
  - Theme-aware focus styles

#### Visual Differences

**Indeterminate State:**
```javascript
// Official implementation
useEffect(() => {
  if (inputRef.current) {
    inputRef.current.indeterminate = indeterminate ?? false
  }
}, [indeterminate])
```

**Sizing:**
- **Current:** 20x20px checkbox
- **Official:** Size from theme tokens (`tokens.formInputHeight`)

**Colors:**
- **Current:**
  - Unchecked: `var(--ink-border-default)`
  - Checked: `var(--ink-cobalt-60)`
  - Checkmark: white

- **Official:**
  - Unchecked: `tokens.borderColorDefault`
  - Checked: `tokens.ctaDefaultBgColor`
  - Error: `tokens.messageColorAlert`
  - Indeterminate: Same as checked with minus icon

**Focus Ring:**
- **Current:** Standard `:focus-visible` outline
- **Official:** Theme tokens with multiple ring styles:
  ```javascript
  outline: `${tokens.focusInner} solid ${tokens.focusInnerColor}`,
  outlineOffset: tokens.focusInnerOffset
  ```

**Animation:**
- **Current:** CSS transition on background
- **Official:** More subtle transitions with theme timing

#### Code Quality

**Current:**
- ~80 lines
- Simple, clean
- Good TypeScript types
- Basic functionality

**Official:**
- ~180 lines
- PropTypes validation
- Indeterminate state management
- Theme-aware styling
- Complex ref forwarding
- Error state support

#### Recommendations

**High Priority:**
1. Add `indeterminate` prop and state management
2. Add `error` prop for validation states
3. Implement indeterminate visual (minus icon)

**Medium Priority:**
4. Add `labelPosition` prop
5. Add theme-aware focus styles
6. Add `accessibilityText` override

---

### Chip

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Missing Props:**
- `avatar` - Avatar/icon at start
- `selected` - Selection state (for filter chips)
- `clickable` - Makes entire chip clickable
- `deleteIcon` - Custom delete icon
- `accessibilityDeleteLabel` - Screen reader text for delete button

**Missing Features:**

**1. Chip Types:**
- **Current:** Single type (dismissible chip)
- **Official:** Three types:
  - Standard chip (no interaction)
  - Clickable chip (onClick handler)
  - Deletable chip (onDelete handler)
  - Selectable chip (toggle selection)

**2. Avatar/Icon Support:**
- **Current:** No avatar support
- **Official:** `avatar` prop renders image/icon at start

**3. Selection State:**
- **Current:** No selection support
- **Official:** `selected` prop with distinct styling

**4. ChipGroup Pattern:**
- **Current:** No group component
- **Official:** Separate `ChipGroup` component for managing multiple chips

#### Visual Differences

**Avatar:**
```javascript
// Official
<Chip
  label="John Doe"
  avatar={<Avatar src="..." />}
  onDelete={handleDelete}
/>
```

**Selection State:**
- **Current:** Not supported
- **Official:**
  - Selected: `backgroundColor: tokens.itemBgColorSelected`
  - Unselected: `backgroundColor: tokens.itemBgColorDefault`

**Sizing:**
- **Current:** `small`, `medium`, `large`
- **Official:** `small`, `medium` only

**Interactive States:**
- **Current:** Hover on delete button only
- **Official:**
  - Clickable chip: Hover/active states on entire chip
  - Delete button: Separate hover/focus states
  - Selected chip: Distinct background

#### Code Quality

**Current:**
- ~90 lines
- Simple dismissible chip
- Good for tags/labels

**Official:**
- ~220 lines
- Multiple interaction patterns
- Avatar integration
- Selection support
- Theme-aware
- PropTypes validation

#### Recommendations

1. Add `avatar` prop for leading image/icon
2. Add `selected` state for filter chips
3. Add `clickable` prop for interactive chips
4. Consider adding `ChipGroup` component
5. Add `accessibilityDeleteLabel` for screen reader support

---

### Divider

**Status:** ✅ Good Implementation

#### Comparison

**Current Implementation:**
```typescript
interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  spacing?: 'none' | 'small' | 'medium' | 'large'
  className?: string
}
```

**Official Implementation:**
```typescript
interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  // No variant or spacing props
}
```

**Assessment:** Our implementation is more feature-rich!

#### Unique Features in Current

1. **Variant Support:**
   - `solid` - Standard divider
   - `dashed` - Dashed line
   - `dotted` - Dotted line

2. **Spacing Control:**
   - `none` - No margin
   - `small` - 8px margin
   - `medium` - 16px margin
   - `large` - 24px margin

**Official is simpler:**
- Only orientation prop
- Fixed styling from theme
- Uses `<hr>` element with `aria-orientation`

#### Visual Differences

**Colors:**
- **Current:** `var(--ink-border-default)`
- **Official:** `tokens.borderColorDefault`

**Thickness:**
- **Current:** 1px
- **Official:** `tokens.borderWidthDefault`

**Spacing:**
- **Current:** Customizable via prop
- **Official:** Fixed from theme

#### Recommendation

**Keep current implementation** - It's more flexible and useful for prototyping. Consider:
1. Add semantic HTML (`<hr>`)
2. Add ARIA attributes from official
3. Keep variant and spacing features

---

### Dropdown

**Status:** ❌ Different Component (Official uses Menu/SelectMenu)

**Note:** Official doesn't have a "Dropdown" component. Similar functionality split across:
- `Menu` - Context menus
- `SelectMenu` - Dropdown selection
- `Popover` - Generic popover content

#### Current Implementation

```typescript
interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  className?: string
}
```

**Features:**
- Trigger element (button, link, etc.)
- Popover content
- Positioning
- Click outside to close
- ESC key to close

#### Official Equivalents

**SelectMenu** (for selection):
```typescript
<SelectMenu
  label="Choose option"
  value={selected}
  onChange={setSelected}
>
  <SelectMenu.Option value="1">Option 1</SelectMenu.Option>
  <SelectMenu.Option value="2">Option 2</SelectMenu.Option>
</SelectMenu>
```

**Menu** (for actions):
```typescript
<Menu>
  <Menu.Trigger>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Menu.Items>
    <Menu.Item onSelect={handleEdit}>Edit</Menu.Item>
    <Menu.Item onSelect={handleDelete}>Delete</Menu.Item>
  </Menu.Items>
</Menu>
```

**Popover** (for generic content):
```typescript
<Popover>
  <Popover.Trigger>
    <Button>Info</Button>
  </Popover.Trigger>
  <Popover.Content>
    Custom content here
  </Popover.Content>
</Popover>
```

#### Key Differences

**Official SelectMenu Features:**
- Form integration with `name`, `value`
- Keyboard navigation (arrow keys, typing to search)
- Multi-select support
- Option groups
- Disabled options
- Search/filter
- Portal rendering
- ARIA listbox pattern

**Official Menu Features:**
- Keyboard navigation
- Submenus
- Dividers
- Icons
- Keyboard shortcuts display
- ARIA menu pattern

#### Recommendation

Current `Dropdown` is good for prototyping. For production:
1. Use `SelectMenu` for form dropdowns
2. Use `Menu` for action menus
3. Keep `Popover` for custom content
4. Consider renaming current `Dropdown` to `Popover`

---

### Input

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Component Names:**
- **Current:** `Input`
- **Official:** `InputTextBox` (TextBox is deprecated)

**Missing Props:**
- `maxLength` - Character limit with counter
- `description` - Helper text below input
- `prefix` - Leading content (icon, text)
- `suffix` - Trailing content (icon, text)
- `clearable` - Show clear button
- `accessibilityDescription` - Screen reader description
- `autoComplete` - HTML autocomplete attribute
- `inputMode` - Mobile keyboard type
- `pattern` - Validation pattern
- `forwardedRef` - Ref forwarding

**Missing Features:**

**1. Character Counter:**
- **Current:** No character counter
- **Official:** Shows "X / maxLength" when `maxLength` provided
  ```javascript
  {maxLength && (
    <div css={sx.counter}>
      {value.length} / {maxLength}
    </div>
  )}
  ```

**2. Prefix/Suffix:**
- **Current:** No prefix/suffix support
- **Official:**
  ```typescript
  <InputTextBox
    prefix={<SearchIcon />}
    suffix={<Button>Go</Button>}
  />
  ```

**3. Clearable:**
- **Current:** No built-in clear button
- **Official:** `clearable` prop adds X button when input has value

**4. Description vs Hint:**
- **Current:** `hint` prop
- **Official:** `description` prop (more semantic)

**5. Input Wrapper Components:**
- **Official:** Uses internal components:
  - `AboveInputContainer` - Label, required indicator
  - `BelowInputContainer` - Hint, error, counter
  - `InputLabel` - Standardized label with required asterisk

#### Visual Differences

**Layout Structure:**
```javascript
// Official structure
<div>
  <AboveInputContainer>
    <InputLabel required={required}>
      {label}
    </InputLabel>
  </AboveInputContainer>

  <div css={sx.inputWrapper}>
    {prefix && <div css={sx.prefix}>{prefix}</div>}
    <input css={sx.input} />
    {suffix && <div css={sx.suffix}>{suffix}</div>}
    {clearable && <button css={sx.clearButton}>×</button>}
  </div>

  <BelowInputContainer>
    {description && <div css={sx.description}>{description}</div>}
    {error && <div css={sx.error}>{error}</div>}
    {maxLength && <div css={sx.counter}>{count}</div>}
  </BelowInputContainer>
</div>
```

**Sizing:**
- **Current:** `small`, `medium`, `large`
- **Official:** `small`, `medium`, `large` + theme tokens

**States:**
- **Current:** Normal, focus, error, disabled
- **Official:** Additional states:
  - Normal
  - Hover
  - Focus
  - Error
  - Disabled
  - Read-only
  - With prefix/suffix

**Icons/Prefix:**
- **Current:** No built-in support
- **Official:** Dedicated slots with proper spacing

**Typography:**
- **Current:** `--ink-font-size-md`
- **Official:** `tokens.fontBodyM` + `touchScreenFormFieldFontSize` (prevents zoom on iOS)

#### Code Quality

**Current:**
- ~100 lines
- Clean, simple
- Basic form input

**Official:**
- ~280 lines
- PropTypes validation
- Character counter logic
- Prefix/suffix rendering
- Clearable button
- Internal component composition
- Theme-aware
- Mobile optimization

#### Recommendations

**High Priority:**
1. Add `prefix` and `suffix` props for icons/buttons
2. Add `clearable` prop with clear button
3. Add character counter when `maxLength` provided
4. Add `inputMode` for mobile keyboards

**Medium Priority:**
5. Rename `hint` to `description` (align with official)
6. Add `accessibilityDescription` override
7. Add read-only state styling
8. Add mobile font size prevention (16px minimum)

**Low Priority:**
9. Create internal components (`InputLabel`, `AboveInputContainer`, `BelowInputContainer`)
10. Add advanced validation patterns

---

### Link

**Status:** ✅ Good Implementation

#### Comparison

**Current Implementation:**
```typescript
interface LinkProps {
  href: string
  children: React.ReactNode
  variant?: 'default' | 'subtle' | 'inverse'
  external?: boolean
  underline?: boolean
  className?: string
}
```

**Official Implementation:**
```typescript
interface LinkProps {
  href?: string
  text?: string
  accessibilityText?: string
  external?: boolean
  inverted?: boolean
  underline?: 'always' | 'hover' | 'none'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  icon?: ReactElement
  iconPosition?: 'start' | 'end'
}
```

#### Functional Differences

**Missing Props:**
- `accessibilityText` - Screen reader override
- `size` - Text size variants
- `disabled` - Disabled state
- `icon` + `iconPosition` - Icon support
- `underline` - More granular control ('always', 'hover', 'none')

**Current vs Official Naming:**
- `inverse` (current) vs `inverted` (official)
- `underline` boolean (current) vs enum (official)

#### Visual Differences

**Underline Control:**
- **Current:** Boolean (show/hide)
- **Official:** Three options:
  - `always` - Always underlined
  - `hover` - Underline on hover only
  - `none` - Never underlined

**Sizes:**
- **Current:** Inherits from parent
- **Official:** Explicit size prop with theme tokens

**Icons:**
- **Current:** No icon support
- **Official:** Leading or trailing icons

**Disabled State:**
- **Current:** No disabled state
- **Official:** Disabled styling with reduced opacity

**External Links:**
- **Current:** Shows external icon when `external={true}`
- **Official:** Similar behavior + automatic `rel="noopener noreferrer"`

#### Recommendations

**High Priority:**
1. Change `underline` to enum type ('always', 'hover', 'none')
2. Add `accessibilityText` prop
3. Rename `inverse` to `inverted` (align with official)

**Medium Priority:**
4. Add `size` prop
5. Add `disabled` state
6. Add `icon` and `iconPosition` props

---

### Modal

**Status:** ❌ Significantly Different

This is one of the most complex components with major differences.

#### Functional Differences

**Architecture:**
- **Current:** Monolithic component
- **Official:** Compound component system

**Current API:**
```typescript
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Title"
  size="medium"
  footer={<Button>Close</Button>}
>
  Content
</Modal>
```

**Official API:**
```typescript
<Modal isOpen={isOpen} onClose={onClose}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button>Close</Button>
  </Modal.Footer>
</Modal>
```

**Missing Sub-Components:**
- `Modal.Header` - Header with close button
- `Modal.Body` - Scrollable content area
- `Modal.Footer` - Footer with actions
- `Modal.Close` - Customizable close button
- `Modal.Base` - Base modal container
- `Modal.Portal` - Portal renderer

**Missing Props:**
- `accessibilityTitle` - Screen reader title override
- `height` - Height variant ('content', 'fixed', 'window')
- `width` - Width variant ('xlarge', 'large', 'medium', 'small')
- `role` - ARIA role ('alertdialog', 'dialog')
- `closeButton` - Custom close button element
- `initialFocus` - CSS selector or ref for initial focus
- `shrouded` - Disabled state when another modal is above
- `inertSiblings` - Set portal siblings to inert
- `disableEventPropagation` - Stop all event propagation
- `eventsToPropagate` - Whitelist specific events
- `onOpen` - Callback when modal opens
- `onShowComplete` - Callback after show animation completes
- `onHideComplete` - Callback after hide animation completes
- `forwardedRef` - Ref forwarding

**Missing Features:**

**1. Portal System:**
- **Current:** Renders in place with fixed positioning
- **Official:**
  - Uses `ModalPortal` component
  - Renders to `document.getElementById(globalIds.ModalContainer)`
  - Proper stacking context management
  - Portal created once, reused for all modals

**2. Scrim Component:**
- **Current:** Inline backdrop div
- **Official:** Separate `<Scrim>` component with:
  - Own z-index management
  - Click handler
  - Visibility state
  - Animation support

**3. Focus Management:**
- **Current:** Basic focus trap with `focusTrap` function
- **Official:** Comprehensive focus system:
  - `useFocusReturn()` - Returns focus to trigger element on close
  - `useInitialFocus()` - Sets custom initial focus element
  - `NavigationTrap` - Advanced focus trap component
  - `defaultInitialFocus` - Hidden element for default focus
  - Race condition handling

**Example:**
```javascript
// Official focus management
const focusReturnRef = useRef(document.activeElement)
const initialFocusRef = useRef(null)

useFocusReturn(focusReturnRef, isOpen)
useInitialFocus(initialFocusRef, isOpen, { preventScroll: true })

return (
  <NavigationTrap isActive={isOpen}>
    <div ref={initialFocusRef} tabIndex={-1}>
      {children}
    </div>
  </NavigationTrap>
)
```

**4. Animation System:**
- **Current:** No animation (instant show/hide)
- **Official:** Framer Motion integration:
  ```javascript
  <MotionPresence>
    {isOpen && (
      <Motion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {modal content}
      </Motion>
    )}
  </MotionPresence>
  ```

**5. Body Scroll Management:**
- **Current:** Simple `document.body.style.overflow = 'hidden'`
- **Official:**
  - `useDisableBodyScroll()` hook from `body-scroll-lock` library
  - Allows modal content to scroll while body is locked
  - Proper cleanup on unmount
  - Mobile Safari support

**6. Event Propagation Control:**
- **Current:** Simple ESC key handler
- **Official:** `StopPropagation` wrapper component:
  ```javascript
  <StopPropagation
    disableEventPropagation={disableEventPropagation}
    eventsToPropagate={eventsToPropagate}
  >
    {modal content}
  </StopPropagation>
  ```

**7. Multiple Modal Support:**
- **Current:** No stacking support
- **Official:**
  - `shrouded` prop disables lower modals
  - `inertSiblings` sets other portals to inert
  - Z-index coordination
  - Proper ESC key handling (closes top modal only)

**8. Lifecycle Hooks:**
- **Current:** None
- **Official:**
  - `useOnOpenCallback()` - Fires when modal element is ready
  - `useAnimationStatus()` - Tracks animation state
  - `useUnmountWarning()` - Warns if modal unmounts while visible

**9. Imperative Handle:**
- **Current:** None
- **Official:** `useImperativeHandle` on ModalPortal:
  ```javascript
  useImperativeHandle(ref, () => ({
    returnFocus: () => focusReturnRef.current?.focus()
  }))
  ```

#### Visual Differences

**Sizing:**
- **Current:** Fixed sizes via CSS classes
  - `small`: 400px
  - `medium`: 600px
  - `large`: 800px
  - `xlarge`: 1000px

- **Official:** Width + Height system:
  - Width: 'small' (400px), 'medium' (600px), 'large' (800px), 'xlarge' (1200px)
  - Height: 'content' (auto), 'fixed' (70vh), 'window' (90vh)

**Animation:**
- **Current:** None (instant)
- **Official:**
  - Fade in: opacity 0 → 1 (200ms)
  - Fade out: opacity 1 → 0 (200ms)
  - Optional scale animation

**Backdrop/Scrim:**
- **Current:** Fixed black overlay at 50% opacity
- **Official:** Theme-controlled scrim:
  ```javascript
  backgroundColor: tokens.scrimBgColor,
  opacity: tokens.scrimOpacity
  ```

**Close Button:**
- **Current:** Fixed in header (IconButton with X)
- **Official:** Customizable via `closeButton` prop:
  ```javascript
  closeButton={<Button kind="tertiary">Cancel</Button>}
  ```

**Header:**
- **Current:** Simple div with title and close button
- **Official:** `Modal.Header` component:
  - Optional close button
  - Custom content support
  - Proper spacing from theme
  - Border-bottom (theme-dependent)

**Body:**
- **Current:** Simple div wrapper
- **Official:** `Modal.Body` component:
  - Scrollable content area
  - Padding from theme tokens
  - Max-height management
  - Keyboard scroll support

**Footer:**
- **Current:** Optional footer prop
- **Official:** `Modal.Footer` component:
  - Border-top (theme-dependent)
  - Action button alignment
  - Spacing from theme tokens

**Z-Index:**
- **Current:** Fixed `z-index: 1000`
- **Official:** Dynamic z-index management:
  ```javascript
  zIndex: baseZIndex + modalLevel * 10
  ```

#### Code Quality Comparison

**Current:**
- ~125 lines
- Self-contained
- Easy to understand
- Good for prototyping
- Basic accessibility

**Official:**
- **Modal.tsx:** ~304 lines
- **ModalPortal.tsx:** ~150 lines
- **Modal.Header.tsx:** ~80 lines
- **Modal.Body.tsx:** ~60 lines
- **Modal.Footer.tsx:** ~50 lines
- **Modal.Close.tsx:** ~40 lines
- **Total:** ~684 lines across multiple files

**Official Features:**
- PropTypes validation
- Extensive JSDoc documentation
- Complex focus management with race condition handling
- Animation lifecycle management
- Event propagation control
- Multi-modal stacking support
- Accessibility warnings and errors
- Portal-based rendering with sibling management
- Theme-aware styling
- Translation support
- Mobile optimization

**Official Hooks:**
```javascript
useFocusReturn(focusReturnRef, isOpen)
useInitialFocus(initialFocusRef, isOpen)
useDisableBodyScroll(modalRef, isOpen)
useOnOpenCallback(onOpen, isOpen, modalRef)
useUnmountWarning(isOpen, 'Modal')
useAnimationStatus(isOpen)
```

#### Recommendations

This component has the most significant gaps. Consider:

**Phase 1 - Critical Improvements:**
1. Extract `Scrim` as separate component
2. Implement proper focus trap with `NavigationTrap` pattern
3. Add focus return functionality
4. Implement body scroll lock with proper cleanup
5. Add compound components (`Modal.Header`, `Modal.Body`, `Modal.Footer`)

**Phase 2 - Enhanced Features:**
6. Add portal rendering system
7. Implement animation with MotionPresence
8. Add width/height props
9. Support multiple modals (stacking)
10. Add lifecycle callbacks (onOpen, onShowComplete, onHideComplete)

**Phase 3 - Advanced Features:**
11. Add initial focus control
12. Implement event propagation control
13. Add custom close button support
14. Support inert siblings
15. Add imperative handle for programmatic control

**Keep Simple For Prototyping:**
- Current monolithic API is fine for quick prototypes
- Compound component API better for production apps with complex modals

---

### Pagination

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Missing Props:**
- `showFirstLast` - Show first/last page buttons
- `showPrevNext` - Show previous/next buttons (always shown in current)
- `showPageInfo` - Show "Page X of Y" text
- `siblingCount` - Number of page buttons to show on each side of current
- `boundaryCount` - Number of page buttons to show at start/end
- `size` - Size variant ('small', 'medium', 'large')
- `disabled` - Disabled state for entire pagination
- `accessibilityLabel` - Screen reader label for pagination nav

**Current Features (Not in Official):**
- `showPageSize` - Shows page size selector
- `pageSizeOptions` - Options for page size selector
- `onPageSizeChange` - Callback for page size changes

**Missing Features:**

**1. Smart Page Ellipsis:**
- **Current:** Shows all pages or simple "..." truncation
- **Official:** Sophisticated ellipsis algorithm:
  ```javascript
  // Shows: 1 ... 5 6 [7] 8 9 ... 20
  const pages = generatePageNumbers({
    currentPage,
    totalPages,
    siblingCount: 1,
    boundaryCount: 1
  })
  ```

**2. First/Last Buttons:**
- **Current:** Not supported
- **Official:** Optional first/last page buttons

**3. Page Info Display:**
- **Current:** Not supported
- **Official:** Shows "Page 7 of 20" text

**4. Accessibility:**
- **Current:** Basic navigation semantics
- **Official:**
  - Comprehensive ARIA labels
  - `aria-label="Go to page X"`
  - `aria-current="page"` for current page
  - Navigation role

#### Visual Differences

**Layout Options:**
- **Current:** Fixed layout with prev/pages/next + optional page size
- **Official:** Configurable:
  - With/without first/last buttons
  - With/without prev/next buttons
  - With/without page info text
  - Flexible spacing

**Sizing:**
- **Current:** Single size
- **Official:** Three sizes with theme tokens

**Button States:**
- **Current:** Disabled prev/next at boundaries
- **Official:**
  - Disabled state for all buttons
  - Active/current page styling
  - Hover states
  - Focus states

**Page Size Selector:**
- **Current:** Has built-in page size selector
- **Official:** No built-in page size selector (separate component)

#### Code Quality

**Current:**
- ~150 lines
- Includes page size selector
- Good for data tables
- Basic pagination logic

**Official:**
- ~250 lines
- Sophisticated page range algorithm
- PropTypes validation
- Theme-aware
- Extensive accessibility
- No page size selector (kept separate)

#### Recommendations

**High Priority:**
1. Implement smart ellipsis with `siblingCount` and `boundaryCount`
2. Add comprehensive ARIA labels
3. Add `size` prop for sizing variants

**Medium Priority:**
4. Add `showFirstLast` prop with first/last buttons
5. Add page info display ("Page X of Y")
6. Add `disabled` state
7. Add `accessibilityLabel` for navigation

**Consider:**
- Keep page size selector (useful for prototyping)
- Or extract to separate `PageSizeSelector` component (more flexible)

---

### Popover

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Component Names:**
- **Current:** `Popover` (generic floating content)
- **Official:** `Popover` (structured with compound components)

**Current API:**
```typescript
<Popover
  trigger={<Button>Open</Button>}
  placement="bottom-start"
>
  Content
</Popover>
```

**Official API:**
```typescript
<Popover>
  <Popover.Trigger>
    <Button>Open</Button>
  </Popover.Trigger>
  <Popover.Content width="medium">
    <Popover.Header>Title</Popover.Header>
    <Popover.Body>Content</Popover.Body>
    <Popover.Footer>
      <Button>Close</Button>
    </Popover.Footer>
  </Popover.Content>
</Popover>
```

**Missing Sub-Components:**
- `Popover.Trigger` - Trigger element wrapper
- `Popover.Content` - Content container
- `Popover.Header` - Header with optional close button
- `Popover.Body` - Main content area
- `Popover.Footer` - Footer with actions
- `Popover.Arrow` - Arrow pointer
- `Popover.Close` - Close button

**Missing Props:**
- `width` - Width variant ('small', 'medium', 'large', 'auto')
- `closeButton` - Show/hide close button in header
- `arrow` - Show/hide arrow pointer
- `portal` - Render in portal vs inline
- `flip` - Auto-flip placement on collision
- `shift` - Shift popover to stay in viewport
- `offset` - Distance from trigger element
- `accessibilityTitle` - Screen reader title
- `onOpen`, `onClose` - Lifecycle callbacks
- `initialFocus` - Initial focus element
- `returnFocus` - Return focus on close

**Missing Features:**

**1. Positioning Library:**
- **Current:** Simple CSS positioning
- **Official:** Uses `@floating-ui/react`:
  ```javascript
  const { x, y, strategy, refs, middlewareData } = useFloating({
    placement: 'bottom-start',
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef })
    ]
  })
  ```

**2. Arrow Positioning:**
- **Current:** No arrow support
- **Official:** Dynamic arrow positioning:
  ```javascript
  <PopoverArrow
    x={middlewareData.arrow?.x}
    y={middlewareData.arrow?.y}
    placement={placement}
  />
  ```

**3. Focus Management:**
- **Current:** None
- **Official:**
  - Initial focus control
  - Focus return on close
  - Focus trap (optional)

**4. Portal Rendering:**
- **Current:** Renders inline
- **Official:** Optional portal rendering for proper z-index

**5. Collision Detection:**
- **Current:** Fixed placement
- **Official:**
  - Auto-flip on collision
  - Shift to stay in viewport
  - Boundary detection

**6. Controlled/Uncontrolled:**
- **Current:** Internal state only
- **Official:** Supports both patterns

#### Visual Differences

**Sizing:**
- **Current:** Content-based width
- **Official:** Width prop with predefined sizes:
  - `small`: 280px
  - `medium`: 400px
  - `large`: 600px
  - `auto`: Content-based

**Arrow:**
- **Current:** No arrow
- **Official:** Optional arrow pointing to trigger

**Shadow/Elevation:**
- **Current:** Fixed box-shadow
- **Official:** Theme-based elevation:
  ```javascript
  boxShadow: tokens.elevationPopover
  ```

**Border:**
- **Current:** Fixed border
- **Official:** Theme-based border:
  ```javascript
  border: `${tokens.borderWidthDefault} solid ${tokens.borderColorDefault}`
  ```

**Header/Footer:**
- **Current:** No structured layout
- **Official:** Dedicated Header/Footer components with:
  - Consistent spacing
  - Border separators
  - Close button in header

**Animation:**
- **Current:** None
- **Official:** Fade in/out with scale

#### Code Quality

**Current:**
- ~100 lines
- Simple implementation
- Good for basic tooltips
- Click outside to close
- ESC key support

**Official:**
- **Popover.tsx:** ~300 lines
- **PopoverContent.tsx:** ~200 lines
- **PopoverHeader.tsx:** ~80 lines
- **PopoverBody.tsx:** ~40 lines
- **PopoverFooter.tsx:** ~60 lines
- **PopoverArrow.tsx:** ~100 lines
- **Total:** ~780 lines

**Official Features:**
- Floating UI integration
- PropTypes validation
- Focus management
- Portal rendering
- Arrow positioning
- Collision detection
- Animation support
- Theme-aware
- Compound components

#### Recommendations

**High Priority:**
1. Add `@floating-ui/react` for proper positioning
2. Implement flip/shift collision detection
3. Add arrow support

**Medium Priority:**
4. Add compound components (Header, Body, Footer)
5. Add width prop with size variants
6. Implement focus management
7. Add portal rendering option

**Low Priority:**
8. Add animation
9. Add lifecycle callbacks
10. Support controlled/uncontrolled patterns

---

### ProgressBar

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Component Names:**
- **Current:** `ProgressBar`
- **Official:** `ProgressBar` (also has `ProgressCircle`, `ProgressIndicator`, `ProgressStepper`)

**Missing Props:**
- `label` - Accessible label
- `valueLabel` - Custom value label (e.g., "45 of 100")
- `size` - Size variant ('small', 'medium', 'large')
- `variant` - Visual variant ('determinate', 'indeterminate', 'buffer')
- `buffer` - Buffer value for buffer variant (e.g., video loading)
- `color` - Color variant ('primary', 'secondary', 'success', 'warning', 'alert')
- `showLabel` - Show/hide percentage label
- `accessibilityLabel` - Screen reader override

**Missing Features:**

**1. Indeterminate State:**
- **Current:** Always determinate (shows specific progress)
- **Official:** Supports indeterminate (loading animation):
  ```javascript
  <ProgressBar variant="indeterminate" />
  // Shows animated progress bar moving back and forth
  ```

**2. Buffer Mode:**
- **Current:** Single progress value
- **Official:** Dual-value for buffering (e.g., video):
  ```javascript
  <ProgressBar
    value={45}           // Played
    buffer={75}          // Buffered
    variant="buffer"
  />
  ```

**3. Size Variants:**
- **Current:** Single size
- **Official:** Three sizes:
  - `small`: 4px height
  - `medium`: 8px height
  - `large`: 12px height

**4. Label Display:**
- **Current:** No built-in label
- **Official:** Optional label and value label:
  ```javascript
  <ProgressBar
    value={45}
    label="Uploading file"
    valueLabel="45 MB of 100 MB"
    showLabel={true}
  />
  ```

**5. Color Variants:**
- **Current:** Single color (primary/blue)
- **Official:** Five color variants:
  - `primary` - Blue
  - `secondary` - Gray
  - `success` - Green
  - `warning` - Orange
  - `alert` - Red

#### Visual Differences

**Height:**
- **Current:** Fixed 8px
- **Official:** Size-dependent (4px, 8px, 12px)

**Border Radius:**
- **Current:** 4px
- **Official:** Theme token (`tokens.radiusSizeXS`)

**Colors:**
- **Current:**
  - Track: `var(--ink-neutral-30)`
  - Bar: `var(--ink-cobalt-60)`

- **Official:**
  - Track: `tokens.barBgColorTrack`
  - Bar: `tokens.barBgColor[variant]` (blue, green, orange, red)

**Indeterminate Animation:**
```css
/* Official implementation */
@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.progress-bar--indeterminate {
  animation: indeterminate 2s infinite;
}
```

**Buffer Display:**
```css
/* Official implementation */
.progress-bar-buffer {
  background: tokens.barBgColorBuffer;
  width: 75%; /* Buffer value */
  opacity: 0.3;
}

.progress-bar-value {
  background: tokens.barBgColorPrimary;
  width: 45%; /* Actual value */
}
```

**Label Layout:**
```javascript
// Official structure
<div>
  {label && <div css={sx.label}>{label}</div>}
  <div css={sx.progressContainer}>
    <div css={sx.track}>
      {variant === 'buffer' && <div css={sx.buffer} />}
      <div css={sx.bar} />
    </div>
    {showLabel && <div css={sx.valueLabel}>{valueLabel}</div>}
  </div>
</div>
```

#### Accessibility Differences

**Current:**
```html
<div
  role="progressbar"
  aria-valuenow={value}
  aria-valuemin={0}
  aria-valuemax={100}
>
```

**Official:**
```html
<div
  role="progressbar"
  aria-valuenow={variant === 'indeterminate' ? undefined : value}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={accessibilityLabel || label}
  aria-valuetext={valueLabel}
>
```

#### Code Quality

**Current:**
- ~60 lines
- Simple determinate progress bar
- Basic accessibility
- Clean implementation

**Official:**
- ~200 lines
- Three variants (determinate, indeterminate, buffer)
- PropTypes validation
- Comprehensive accessibility
- Theme-aware
- Size variants
- Color variants
- Label support

#### Recommendations

**High Priority:**
1. Add `variant` prop (determinate, indeterminate)
2. Implement indeterminate animation
3. Add `size` prop
4. Add `label` and `valueLabel` support

**Medium Priority:**
5. Add `color` prop for semantic colors
6. Implement buffer variant
7. Add `showLabel` prop
8. Improve ARIA attributes

---

### Radio

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Component Names:**
- **Current:** `Radio` (individual radio button)
- **Official:** `RadioButton` (individual) + `RadioButtonGroup` (group wrapper)

**Missing Props (Individual Radio):**
- `accessibilityText` - Screen reader override
- `error` - Error state styling
- `subtitle` - Secondary text under label
- `labelPosition` - Label position ('start', 'end')
- `forwardedRef` - Ref forwarding

**Missing Component:**
- `RadioButtonGroup` - Group wrapper with:
  - `legend` - Group label
  - `error` - Group error message
  - `required` - Required validation
  - `orientation` - Layout ('vertical', 'horizontal')
  - `value` - Controlled value
  - `onChange` - Change handler

**Missing Features:**

**1. Group Management:**
- **Current:** No group component (manual radio buttons)
- **Official:** `RadioButtonGroup` manages:
  - Shared `name` prop
  - Value synchronization
  - Group validation
  - Group error display
  - Legend/label for group

**Example:**
```javascript
// Official API
<RadioButtonGroup
  legend="Choose option"
  value={selected}
  onChange={setSelected}
  error={error}
  required
>
  <RadioButton value="1" label="Option 1" subtitle="Description 1" />
  <RadioButton value="2" label="Option 2" subtitle="Description 2" />
  <RadioButton value="3" label="Option 3" disabled />
</RadioButtonGroup>
```

**2. Subtitle Support:**
- **Current:** Label only
- **Official:** Label + optional subtitle:
  ```javascript
  <RadioButton
    label="Premium Plan"
    subtitle="$29/month - All features included"
  />
  ```

**3. Error States:**
- **Current:** No error styling
- **Official:**
  - Individual radio error styling
  - Group error message display

**4. Label Position:**
- **Current:** Label always on right
- **Official:** `labelPosition` prop ('start', 'end')

#### Visual Differences

**Radio Button:**
- **Current:** 20x20px circle
- **Official:** Size from theme tokens

**Selected State:**
- **Current:** Filled circle
- **Official:** Inner circle (dot) pattern:
  ```css
  /* Outer circle */
  border: 2px solid tokens.borderColorDefault;

  /* Inner dot when selected */
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    background: tokens.ctaDefaultBgColor;
    border-radius: 50%;
  }
  ```

**Group Layout:**
- **Current:** No built-in group layout
- **Official:** `RadioButtonGroup` with:
  - Vertical: Stacked with spacing
  - Horizontal: Inline with gaps

**Subtitle Styling:**
- **Official:**
  ```css
  .radio-subtitle {
    color: tokens.fontColorSubdued;
    fontSize: tokens.fontSizeS;
    marginTop: tokens.spacingGap50;
  }
  ```

**Error State:**
- **Current:** Not supported
- **Official:**
  - Radio: `borderColor: tokens.messageColorAlert`
  - Group: Error message with alert color

**Focus Ring:**
- **Current:** Standard outline
- **Official:** Theme-based focus:
  ```css
  outline: tokens.focusOuter;
  outlineOffset: tokens.focusOuterOffset;
  ```

#### Code Quality

**Current:**
- ~70 lines
- Simple individual radio
- Basic functionality
- No group management

**Official:**
- **RadioButton.tsx:** ~150 lines
- **RadioButtonGroup.tsx:** ~180 lines
- PropTypes validation
- Context for group state
- Error handling
- Theme-aware
- Comprehensive accessibility

#### Recommendations

**High Priority:**
1. Create `RadioGroup` component (wrapper)
2. Add group state management (value, onChange)
3. Add `legend` prop to group
4. Add `error` state and display

**Medium Priority:**
5. Add `subtitle` prop to Radio
6. Add `labelPosition` prop
7. Improve focus styles
8. Add `accessibilityText` override

**Low Priority:**
9. Add `orientation` prop to group (vertical/horizontal)
10. Add `required` validation to group

---

### Select

**Status:** ❌ Different Component (Official uses SelectMenu)

**Component Names:**
- **Current:** `Select` (native HTML select)
- **Official:** `SelectMenu` (custom dropdown with advanced features)

#### Current Implementation

```typescript
interface SelectProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
  options: Array<{ value: string; label: string }>
  placeholder?: string
  disabled?: boolean
  error?: string
  hint?: string
  required?: boolean
  className?: string
}

// Renders native <select> element
```

**Features:**
- Native HTML select
- Simple options array
- Basic styling
- Form integration
- Good for prototyping

#### Official SelectMenu

```typescript
interface SelectMenuProps {
  label: string
  value?: string | string[]
  onChange: (value: string | string[]) => void
  children: ReactNode  // SelectMenu.Option components
  placeholder?: string
  disabled?: boolean
  error?: string
  description?: string
  required?: boolean
  searchable?: boolean
  multiple?: boolean
  clearable?: boolean
  size?: 'small' | 'medium' | 'large'
  width?: 'auto' | 'full'
  maxHeight?: number
  portal?: boolean
  flip?: boolean
  shift?: boolean
  accessibilityLabel?: string
}
```

**Features:**
1. **Custom Dropdown UI** (not native select)
2. **Search/Filter** - Type to search options
3. **Multi-Select** - Select multiple values
4. **Clearable** - Clear button
5. **Option Groups** - Group options with headers
6. **Disabled Options** - Individual option disable
7. **Icons** - Icons in options
8. **Keyboard Navigation** - Arrow keys, type-ahead
9. **Portal Rendering** - Proper z-index
10. **Collision Detection** - Auto-flip/shift

**Compound Components:**
```javascript
<SelectMenu
  label="Country"
  value={country}
  onChange={setCountry}
  searchable
>
  <SelectMenu.OptionGroup label="North America">
    <SelectMenu.Option value="us" icon={<USFlagIcon />}>
      United States
    </SelectMenu.Option>
    <SelectMenu.Option value="ca">
      Canada
    </SelectMenu.Option>
  </SelectMenu.OptionGroup>

  <SelectMenu.OptionGroup label="Europe">
    <SelectMenu.Option value="uk">
      United Kingdom
    </SelectMenu.Option>
    <SelectMenu.Option value="de" disabled>
      Germany (Not available)
    </SelectMenu.Option>
  </SelectMenu.OptionGroup>
</SelectMenu>
```

#### Key Differences

| Feature | Current Select | Official SelectMenu |
|---------|---------------|-------------------|
| **UI** | Native select | Custom dropdown |
| **Search** | No | Yes (optional) |
| **Multi-select** | No | Yes (optional) |
| **Option groups** | Native optgroup | SelectMenu.OptionGroup |
| **Icons** | No | Yes |
| **Keyboard nav** | Native | Full ARIA listbox |
| **Clearable** | No | Yes |
| **Disabled options** | Native disabled | Custom styling |
| **Portal** | N/A | Optional |
| **Max height** | Native | Scrollable list |
| **Loading state** | No | Yes |
| **Empty state** | No | Custom message |

#### Visual Differences

**Current (Native Select):**
- Browser default styling
- Limited customization
- Dropdown icon from browser
- Native focus styles
- No animation

**Official SelectMenu:**
- Full custom styling
- Dropdown icon: `ChevronDownSmall` (Ink) or `MenuTriangleDownOlive` (Olive)
- Selected option: Checkmark icon
- Hover state on options
- Focus state with theme styles
- Fade-in animation for dropdown
- Search input at top (if searchable)
- Clear button (if clearable)
- Multi-select: Chips for selected values

#### Code Quality

**Current:**
- ~80 lines
- Native select wrapper
- Simple styling
- Good for forms

**Official:**
- **SelectMenu.tsx:** ~400 lines
- **SelectMenu.Option.tsx:** ~150 lines
- **SelectMenu.OptionGroup.tsx:** ~80 lines
- Uses `@floating-ui/react`
- Complex keyboard navigation
- PropTypes validation
- Virtual scrolling for large lists
- Theme-aware
- Portal rendering

#### Recommendations

**For Prototyping:**
- Keep current native `Select` (fast, simple, accessible)
- Use for basic form dropdowns

**For Production:**
- Implement `SelectMenu` component when you need:
  - Search/filter functionality
  - Multi-select
  - Custom option rendering
  - Icons in options
  - Better UX than native select

**Hybrid Approach:**
- Keep both components:
  - `Select` - Simple native dropdowns
  - `SelectMenu` - Advanced dropdowns

---

### Spinner

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Component Names:**
- **Current:** `Spinner`
- **Official:** `Spinner` (same name)

**Missing Props:**
- `accessibilityText` - Screen reader text (REQUIRED in official)
- `size` - Size variant ('small', 'medium', 'large', number)
- `inverted` - Inverted colors for dark backgrounds
- `centered` - Center in container
- `trackVisible` - Show background track
- `forwardedRef` - Ref forwarding

**Missing Features:**

**1. Accessibility:**
- **Current:** No accessibility support
- **Official:**
  - **REQUIRED** `accessibilityText` prop
  - `role="status"` or `role="progressbar"`
  - `aria-label` or visually hidden text
  - `aria-busy="true"` on parent
  - PropTypes validation requires accessibility

**Example:**
```javascript
// Official - throws error if accessibilityText missing
<Spinner accessibilityText="Loading content" />

// Renders:
<div role="status" aria-label="Loading content">
  <svg>...</svg>
  <span css={styles.visuallyHidden}>Loading content</span>
</div>
```

**2. Size System:**
- **Current:** Fixed size (default, small, large)
- **Official:** Flexible sizing:
  - Named: 'small' (16px), 'medium' (24px), 'large' (48px)
  - Custom: `size={32}` (any pixel value)
  - Automatic sizing in context (e.g., Button uses smaller spinner)

**3. Track (Background Circle):**
- **Current:** Always visible
- **Official:** Optional with `trackVisible` prop
  ```javascript
  <Spinner trackVisible={false} />  // No background circle
  ```

**4. Inverted Variant:**
- **Current:** Not supported
- **Official:** `inverted` prop for dark backgrounds:
  ```javascript
  <Spinner inverted accessibilityText="Loading" />
  ```

**5. Centered Display:**
- **Current:** Inline display
- **Official:** `centered` prop adds flexbox centering:
  ```javascript
  <Spinner centered accessibilityText="Loading page" />
  ```

#### Visual Differences

**Sizing:**
- **Current:**
  - Default: 40px
  - Small: 20px
  - Large: 60px

- **Official:**
  - Small: 16px
  - Medium: 24px
  - Large: 48px
  - Custom: Any value

**Animation:**
- **Current:** Simple rotation
  ```css
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  animation: spin 1s linear infinite;
  ```

- **Official:** Circular progress animation
  ```css
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -15;
    }
    100% {
      transform: rotate(360deg);
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -125;
    }
  }
  animation: spinner 1.4s ease-in-out infinite;
  ```

**Colors:**
- **Current:**
  - Spinner: `var(--ink-cobalt-60)` (blue)
  - Track: `var(--ink-neutral-30)` (light gray)

- **Official:**
  - Default spinner: `tokens.spinnerColorDefault`
  - Default track: `tokens.spinnerTrackColorDefault`
  - Inverted spinner: `tokens.spinnerColorInverse`
  - Inverted track: `tokens.spinnerTrackColorInverse`

**SVG Structure:**
- **Current:** Simple circle with rotation
  ```html
  <svg>
    <circle cx="50%" cy="50%" r="..." fill="none" stroke="..." />
  </svg>
  ```

- **Official:** Circle with dash animation
  ```html
  <svg role="progressbar" aria-valuemin="0" aria-valuemax="100">
    {trackVisible && <circle css={sx.track} />}
    <circle css={sx.spinner} />
  </svg>
  ```

**Stroke Width:**
- **Current:** Fixed 4px
- **Official:** Proportional to size:
  ```javascript
  strokeWidth: size <= 24 ? 3 : 4
  ```

**Centered Layout:**
- **Official:**
  ```css
  .spinner-container--centered {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  ```

#### Code Quality

**Current:**
- ~50 lines
- Simple SVG spinner
- No accessibility
- Fixed sizes

**Official:**
- ~180 lines
- PropTypes with REQUIRED accessibilityText
- Flexible sizing
- Theme-aware
- Accessibility-first
- Multiple variants

#### Recommendations

**Critical (High Priority):**
1. **Add `accessibilityText` prop** - Make it required
2. Add `role="status"` and `aria-label`
3. Add visually hidden text for screen readers

**High Priority:**
4. Make `size` prop accept numbers (custom sizes)
5. Add `inverted` variant for dark backgrounds
6. Improve animation (circular progress)

**Medium Priority:**
7. Add `trackVisible` prop (hide background circle)
8. Add `centered` prop for layout
9. Adjust stroke width based on size

**Accessibility Example:**
```typescript
interface SpinnerProps {
  accessibilityText: string  // REQUIRED
  size?: 'small' | 'medium' | 'large' | number
  inverted?: boolean
  trackVisible?: boolean
  centered?: boolean
}

<Spinner accessibilityText="Loading your documents" size="large" />
```

---

### Switch

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Component Names:**
- **Current:** `Switch`
- **Official:** `Switch` (same)

**Missing Props:**
- `accessibilityText` - Screen reader override (when no label)
- `size` - Size variant ('small', 'medium', 'large')
- `loading` - Loading state with spinner
- `icons` - Show check/X icons in switch
- `forwardedRef` - Ref forwarding

**Missing Features:**

**1. Size Variants:**
- **Current:** Single size
- **Official:** Three sizes:
  - Small: 32px × 20px
  - Medium: 44px × 24px
  - Large: 56px × 32px

**2. Loading State:**
- **Current:** Not supported
- **Official:** `loading` prop shows spinner:
  ```javascript
  <Switch
    checked={isEnabled}
    onChange={handleToggle}
    loading={isSaving}
    disabled={loading}  // Auto-disabled while loading
  />
  ```

**3. Icons Inside Switch:**
- **Current:** No icons
- **Official:** `icons` prop shows check/X:
  ```javascript
  <Switch
    checked={isEnabled}
    onChange={handleToggle}
    icons={true}  // Shows ✓ when on, × when off
  />
  ```

**4. Accessibility:**
- **Current:** Basic role="switch" and aria-checked
- **Official:**
  - `accessibilityText` when no label provided
  - Visually hidden text for icon state
  - Proper aria-busy during loading

#### Visual Differences

**Sizing:**
- **Current:** Fixed 44px × 24px (medium)
- **Official:** Three size options

**Track (Background):**
- **Current:**
  - Off: `var(--ink-neutral-40)` (light gray)
  - On: `var(--ink-cobalt-60)` (blue)

- **Official:**
  - Off: `tokens.switchBgColorOff`
  - On: `tokens.switchBgColorOn`
  - Loading: Reduced opacity
  - Disabled: `tokens.switchBgColorDisabled`

**Thumb (Circle):**
- **Current:**
  - Size: 20px
  - Color: White
  - Position: Absolute positioning

- **Official:**
  - Size: Varies by size variant (16px, 20px, 28px)
  - Color: `tokens.switchThumbColor`
  - Position: Transform-based animation
  - Loading: Contains spinner

**Icons:**
```javascript
// Official implementation
<div css={sx.thumb}>
  {loading ? (
    <Spinner size={12} accessibilityText="Saving" />
  ) : icons ? (
    checked ? <CheckSmallIcon /> : <XSmallIcon />
  ) : null}
</div>
```

**Animation:**
- **Current:** CSS transition on transform
  ```css
  transition: transform 0.2s ease;
  transform: translateX(0);  /* Off */
  transform: translateX(20px);  /* On */
  ```

- **Official:** Smoother spring animation
  ```css
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  ```

**Loading State:**
```css
/* Official */
.switch--loading {
  opacity: 0.6;
  cursor: wait;
}

.switch-thumb--loading {
  /* Spinner inside thumb */
}
```

**Focus Ring:**
- **Current:** Standard outline
- **Official:** Theme-based focus:
  ```css
  outline: ${tokens.focusOuter};
  outlineOffset: ${tokens.focusOuterOffset};
  ```

#### Code Quality

**Current:**
- ~90 lines
- Clean implementation
- Basic toggle functionality
- Good for prototyping

**Official:**
- ~200 lines
- PropTypes validation
- Size variants
- Loading state
- Icon support
- Theme-aware
- Accessibility-focused

#### Recommendations

**High Priority:**
1. Add `size` prop (small, medium, large)
2. Add `loading` state with spinner
3. Add `accessibilityText` for switches without labels

**Medium Priority:**
4. Add `icons` prop (show check/X in thumb)
5. Improve animation timing (spring curve)
6. Add theme-based focus styles

**Low Priority:**
7. Add disabled state styling improvements
8. Consider adding color variants

**Example Enhancement:**
```typescript
interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  accessibilityText?: string  // Required when no label
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  icons?: boolean
  disabled?: boolean
}

<Switch
  checked={notifications}
  onChange={setNotifications}
  label="Email notifications"
  size="medium"
  loading={isSaving}
  icons={true}
/>
```

---

### Table

**Status:** ❌ Completely Different API

This is one of the most significant differences.

#### API Philosophy

**Current:** Data-driven declarative API (like Ant Design, Material-UI)
```typescript
<Table
  columns={columns}
  data={data}
  loading={loading}
  onRowClick={handleClick}
  selectable
/>
```

**Official:** Compound component imperative API (like HTML table)
```typescript
<Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {data.map(row => (
      <Table.Row key={row.id}>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.email}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

#### Current Implementation Features

**Props:**
```typescript
interface TableProps<T> {
  columns: ColumnDefinition<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  responsive?: boolean
  variant?: 'default' | 'bordered' | 'striped'
  size?: 'small' | 'medium' | 'large'
  stickyHeader?: boolean
  maxHeight?: string
  hoverable?: boolean
  selectable?: boolean
  selectedRows?: T[]
  onRowSelect?: (rows: T[]) => void
  onRowClick?: (row: T) => void
  sortable?: boolean
  onSort?: (column: string, direction: 'asc' | 'desc') => void
}
```

**Built-in Features:**
- Automatic row selection with checkboxes
- Built-in sorting UI
- Loading state with skeleton
- Empty state handling
- Responsive mode (stacks on mobile)
- Sticky headers
- Max height with scroll
- Row hover effects
- Sortable columns with indicators

**Pros:**
- Rapid development
- Less boilerplate
- Automatic features (selection, sorting, etc.)
- Type-safe with generics
- Good for CRUD interfaces

**Cons:**
- Less flexible for custom layouts
- Harder to customize cell rendering
- More complex component internally
- Opinionated design decisions

#### Official Table Implementation

**Sub-Components:**
- `Table` - Main wrapper
- `Table.Header` - Header section
- `Table.Body` - Body section
- `Table.Row` - Table row
- `Table.HeaderCell` - Header cell with optional sort
- `Table.Cell` - Data cell

**Props (Main Table):**
```typescript
interface TableProps {
  backgroundColor?: 'document' | 'page'
  border?: boolean
  borderRule?: 'both' | 'row' | 'column'
  caption?: string  // Visually hidden
  ariaDescribedById?: string
  columnSettings?: ColumnSetting[]  // Width, alignment, maxWidth per column
  itemHeight?: 'default' | 'compact' | 'tall'
  freezeColumn?: boolean  // Sticky first column
  layoutFixed?: boolean  // table-layout: fixed
  numeric?: boolean  // Tabular figures for numbers
  striped?: boolean  // Zebra striping (Olive only)
  role?: 'presentation'  // Override table role
}

interface ColumnSetting {
  width?: string | number
  alignment?: 'left' | 'center' | 'right'
  maxWidth?: string | number
}
```

**Features:**
- Semantic HTML table structure
- Maximum flexibility
- Cell-level customization
- Context-based column settings
- Sticky first column with intersection observer
- Border customization
- Background color variants
- Item height variants
- Tabular numbers for data alignment

**Pros:**
- Maximum flexibility
- Easy to customize
- Follows HTML semantics
- Cell-level control
- Better for complex tables

**Cons:**
- More boilerplate
- Manual feature implementation (selection, sorting)
- More code to write
- Verbose for simple tables

#### Detailed Comparison

**1. Selection:**
- **Current:** Built-in with `selectable` prop + `onRowSelect` callback
- **Official:** Manual - add Checkbox to cells, manage state yourself

**2. Sorting:**
- **Current:** Built-in UI + `onSort` callback
- **Official:** Manual - use `Table.HeaderCell.sortDirection` prop + custom handler

**3. Loading:**
- **Current:** Built-in skeleton loader
- **Official:** Manual - render skeleton rows yourself

**4. Empty State:**
- **Current:** Built-in with `emptyMessage` prop
- **Official:** Manual - check data length and render empty state

**5. Responsive:**
- **Current:** Built-in `responsive` mode (stacks on mobile)
- **Official:** No built-in responsive (manual media queries)

**6. Column Configuration:**
- **Current:** `columns` array with render functions
- **Official:** `columnSettings` for width/alignment + manual JSX for content

**7. Sticky Header:**
- **Current:** `stickyHeader` boolean prop
- **Official:** CSS-based (always sticky) + scrollbar detection with ARIA

**8. Freeze Column:**
- **Current:** Not supported
- **Official:** `freezeColumn` prop with intersection observer

**9. Border Control:**
- **Current:** `variant` prop (default, bordered, striped)
- **Official:** Separate `border`, `borderRule`, `striped` props

**10. Item Height:**
- **Current:** `size` prop (small, medium, large)
- **Official:** `itemHeight` prop (compact, default, tall)

#### Visual Differences

**Height Variants:**
- **Current:**
  - Small: 32px row height
  - Medium: 48px row height
  - Large: 64px row height

- **Official:**
  - Compact: `tokens.tableItemHeightCompact`
  - Default: `tokens.tableItemHeightDefault`
  - Tall: `tokens.tableItemHeightTall`

**Borders:**
- **Current:** Three variants (all-or-nothing)
- **Official:** Fine-grained control:
  - `border={false}` - No borders
  - `borderRule="row"` - Horizontal only
  - `borderRule="column"` - Vertical only
  - `borderRule="both"` - Grid borders

**Striping:**
- **Current:** `variant="striped"` applies striping
- **Official:** `striped` prop (Olive theme only, warning in Ink)

**Background:**
- **Current:** Fixed background
- **Official:** `backgroundColor` prop:
  - `document` - `tokens.bgColorCanvas`
  - `page` - `tokens.bgColorDefault`

**Numeric Data:**
- **Official only:** `numeric` prop applies:
  ```css
  font-variant-numeric: tabular-nums;
  ```
  This aligns numbers by digit in columns.

**Frozen Column:**
- **Official only:** First column sticky with shadow indicator:
  ```javascript
  // Uses IntersectionObserver to add shadow when scrolled
  const showShadow = !isIntersecting
  ```

#### Code Complexity

**Current:**
- ~300 lines
- All features in one component
- Complex state management (selection, sorting, responsive)
- TypeScript generics
- Built-in Checkbox/Skeleton components

**Official:**
- **Table.tsx:** ~431 lines
- **Table.Header.tsx:** ~60 lines
- **Table.Body.tsx:** ~40 lines
- **Table.Row.tsx:** ~80 lines
- **Table.HeaderCell.tsx:** ~120 lines
- **Table.Cell.tsx:** ~90 lines
- **Total:** ~821 lines across 6 files

**Official Features:**
- TableContext for shared state
- IntersectionObserver for frozen column
- ResizeObserver for scrollbar detection
- Dynamic CSS generation for column settings
- PropTypes validation
- Theme detection with warnings
- Translation support
- Accessibility regions for scrollable content

#### Recommendations

**For Prototyping:**
- **Keep current implementation** - It's more productive
- Data-driven API is faster for CRUD interfaces
- Built-in features save time

**For Production:**
- **Consider official approach** when you need:
  - Maximum flexibility
  - Complex cell rendering
  - Custom layouts
  - Fine-grained control

**Hybrid Approach:**
- Keep both components:
  - `Table` - Current data-driven API for simple tables
  - `TablePrimitive` - Official compound component API for complex tables

**Quick Wins for Current:**
1. Add `columnSettings` for width/alignment
2. Add `freezeColumn` for sticky first column
3. Add `numeric` prop for tabular numbers
4. Add `borderRule` for border control
5. Add `backgroundColor` prop

---

### Tabs

**Status:** ⚠️ Significantly Different

#### API Differences

**Current:** Data-driven array API
```typescript
<Tabs
  items={[
    { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: '2', label: 'Tab 2', content: <div>Content 2</div> }
  ]}
  activeTab="1"
  onTabChange={setActiveTab}
/>
```

**Official:** Compound component API
```typescript
<Tabs selected={0} onSelect={setSelected}>
  <Tabs.Tab>Tab 1</Tabs.Tab>
  <Tabs.Tab>Tab 2</Tabs.Tab>
</Tabs>

<Tabs.Panel index={0}>Content 1</Tabs.Panel>
<Tabs.Panel index={1}>Content 2</Tabs.Panel>
```

#### Functional Differences

**Missing Props (Official):**
- `dark` - Dark background variant
- `extended` - Indicator bar extends to 100% width
- `fullHeight` - Panels fill container height (Ink only)
- `fullWidth` - Tabs equally distributed across width
- `noBottomBorder` - Hide bottom border (Olive only)
- `persistChildren` - Keep unmounted panels in DOM (preserve state)
- `small` - Smaller variant (Olive only)

**Missing Features:**

**1. Compound Component Pattern:**
- **Current:** Monolithic with items array
- **Official:** Separate `Tabs.Tab` and `Tabs.Panel` components

**2. Keyboard Navigation:**
- **Current:** Click only
- **Official:** Full keyboard support:
  - `Arrow Left/Right` - Navigate tabs
  - `Home` - First tab
  - `End` - Last tab
  - RTL support via `useHtmlDir()`

**Keyboard Navigation Implementation:**
```javascript
// Official
const handleKeyDown = (e: KeyboardEvent) => {
  const tabs = keyboardNavigableElements(tabListRef.current)
  const currentIndex = tabs.indexOf(document.activeElement)

  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault()
      const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
      tabs[prevIndex].focus()
      break
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault()
      const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1
      tabs[nextIndex].focus()
      break
    case 'Home':
      e.preventDefault()
      tabs[0].focus()
      break
    case 'End':
      e.preventDefault()
      tabs[tabs.length - 1].focus()
      break
  }
}
```

**3. Panel Management:**
- **Current:** Swaps content on tab change
- **Official:**
  - Separate `Panel` component
  - `persistChildren` keeps panels in DOM (preserves state)
  - Panels use `visuallyHidden` instead of unmounting
  - `noContentPadding` option per panel

**4. Theme Detection:**
- **Current:** Single theme
- **Official:**
  - `useIsInk()` detects theme
  - Warns if Olive-only props used in Ink
  - Different styling per theme

**5. Parent-Provided Props:**
- **Official:** Complex pattern where parent Tabs provides props to child Tab components via `React.cloneElement`:
  ```javascript
  const tabs = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex,
      onSelect: () => handleSelect(index),
      'aria-controls': `panel-${index}`,
      id: `tab-${index}`
    })
  })
  ```

#### Visual Differences

**Variants:**
- **Current:** Single default style
- **Official:** Multiple variants:
  - `dark` - Dark background
  - `small` - Smaller text/padding (Olive)
  - `extended` - Indicator spans full width

**Layout:**
- **Current:** Fixed spacing
- **Official:**
  - `fullWidth` - Tabs equally distributed
  - Normal - Content-width tabs

**Indicator:**
- **Current:** Blue bottom border on active tab (fixed width)
- **Official:** Dynamic indicator:
  - Standard: Width of tab text
  - Extended: Full width of container

**Border:**
- **Current:** Always has bottom border on tab list
- **Official:**
  - Ink: Always has border
  - Olive: `noBottomBorder` prop to hide

**Panel Styles:**
- **Current:** Simple div with content
- **Official:** Theme-aware panel:
  - Optional padding (via `noContentPadding`)
  - `fullHeight` option (Ink only)
  - Background from theme

**Dark Variant:**
```css
/* Official dark variant */
.tabs--dark {
  background-color: tokens.bgColorInverse;

  .tab {
    color: tokens.fontColorInverse;
  }

  .tab--selected {
    border-bottom-color: tokens.borderColorInverse;
  }
}
```

**Small Variant (Olive):**
```css
/* Official small variant */
.tabs--small {
  font-size: tokens.fontSizeS;
  padding: tokens.spacingGap100;
}
```

**Extended Indicator:**
```css
/* Official extended indicator */
.tabs__indicator--extended {
  width: 100%;
  left: 0;
}
```

#### Accessibility Differences

**Current:**
```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
</div>
<div role="tabpanel" id="panel-1">
  Content
</div>
```

**Official:**
```html
<div role="tablist" onKeyDown={handleKeyDown}>
  <button
    role="tab"
    id="tab-1"
    aria-selected="true"
    aria-controls="panel-1"
    tabIndex={selected ? 0 : -1}
  >
    Tab 1
  </button>
</div>
<div
  role="tabpanel"
  id="panel-1"
  aria-labelledby="tab-1"
  hidden={!selected}
  tabIndex={0}
>
  Content
</div>
```

**Key ARIA differences:**
- Official uses `tabIndex={-1}` on unselected tabs (only selected is tabbable)
- Official adds `aria-labelledby` on panels
- Official adds `tabIndex={0}` on panels (makes panel focusable)
- Official uses `hidden` attribute (better than CSS display:none)

#### Code Quality

**Current:**
- ~85 lines
- Simple controlled/uncontrolled pattern
- Basic ARIA attributes
- Good for prototyping

**Official:**
- **Tabs.tsx:** ~227 lines
- **Tab.tsx:** ~100 lines
- **Panel.tsx:** ~80 lines
- **Total:** ~407 lines

**Official Features:**
- Complex keyboard navigation with RTL support
- Theme detection with prop validation
- Parent-provided props via cloneElement
- Unique ID generation
- PropTypes validation
- Translation support
- Context for tab-panel association
- `persistChildren` state preservation

#### Recommendations

**High Priority:**
1. Add keyboard navigation (Arrow keys, Home, End)
2. Implement compound component pattern (Tabs.Tab, Tabs.Panel)
3. Add `persistChildren` for state preservation
4. Improve ARIA attributes (tabIndex management, hidden)

**Medium Priority:**
5. Add `fullWidth` prop for distributed layout
6. Add `extended` prop for full-width indicator
7. Add `dark` variant
8. Support per-panel padding control

**Low Priority:**
9. Add theme detection
10. Add `small` variant
11. Add RTL support

**Recommendation:** The official compound component API is more flexible. Consider migrating to that pattern for production use, but keep current API for rapid prototyping.

---

### TextArea

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Component Names:**
- **Current:** `TextArea`
- **Official:** `TextArea` (same)

**Missing Props:**
- `maxLength` - Character limit with counter
- `description` - Helper text below textarea
- `resize` - Resize behavior ('none', 'vertical', 'horizontal', 'both')
- `autoResize` - Automatically grow height to fit content
- `accessibilityDescription` - Screen reader description
- `minRows` - Minimum visible rows for autoResize
- `maxRows` - Maximum visible rows for autoResize
- `forwardedRef` - Ref forwarding

**Missing Features:**

**1. Character Counter:**
- **Current:** No character limit display
- **Official:** Shows "X / maxLength" when maxLength provided:
  ```javascript
  {maxLength && (
    <div css={sx.counter}>
      {value.length} / {maxLength}
      {value.length > maxLength && ' (exceeded)'}
    </div>
  )}
  ```

**2. Auto-Resize:**
- **Current:** Fixed rows/height
- **Official:** `autoResize` prop:
  ```javascript
  <TextArea
    autoResize
    minRows={3}
    maxRows={10}
    onChange={handleChange}
  />
  ```
  - Automatically adjusts height as user types
  - Min/max row constraints
  - Uses `scrollHeight` calculation

**Implementation:**
```javascript
// Official autoResize logic
useEffect(() => {
  if (!autoResize || !textareaRef.current) return

  const element = textareaRef.current

  // Reset height to get accurate scrollHeight
  element.style.height = 'auto'

  // Calculate new height
  const newHeight = Math.min(
    Math.max(element.scrollHeight, minHeight),
    maxHeight
  )

  element.style.height = `${newHeight}px`
}, [value, autoResize, minHeight, maxHeight])
```

**3. Resize Control:**
- **Current:** Default browser behavior (both)
- **Official:** `resize` prop:
  - `none` - No resize handle
  - `vertical` - Vertical only (default)
  - `horizontal` - Horizontal only
  - `both` - Both directions

**4. Description vs Hint:**
- **Current:** `hint` prop
- **Official:** `description` prop (more semantic)

**5. Min/Max Validation:**
- **Current:** Basic HTML5 validation
- **Official:** Enhanced validation with visual feedback:
  ```javascript
  const isOverLimit = maxLength && value.length > maxLength
  const counterColor = isOverLimit ? tokens.messageColorAlert : tokens.fontColorSubdued
  ```

#### Visual Differences

**Character Counter:**
```javascript
// Official implementation
<div css={sx.belowTextArea}>
  {description && (
    <div css={sx.description}>{description}</div>
  )}
  {error && (
    <div css={sx.error} role="alert">{error}</div>
  )}
  {maxLength && (
    <div css={sx.counter} aria-live="polite">
      <span css={{ color: counterColor }}>
        {value.length}
      </span>
      {' / '}
      {maxLength}
    </div>
  )}
</div>
```

**Layout Structure:**
```css
/* Official structure */
.textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: tokens.spacingGap100;
}

.textarea {
  resize: vertical;  /* or none, horizontal, both */
}

.below-textarea {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.description {
  flex: 1;
  color: tokens.fontColorSubdued;
}

.counter {
  white-space: nowrap;
  font-size: tokens.fontSizeS;
  color: tokens.fontColorSubdued;
}
```

**Auto-Resize Behavior:**
```css
/* Official autoResize styles */
.textarea--auto-resize {
  overflow: hidden;  /* Hide scrollbar during resize */
  resize: none;      /* Disable manual resize */
  min-height: calc(var(--min-rows) * var(--line-height));
  max-height: calc(var(--max-rows) * var(--line-height));
  transition: height 0.1s ease;
}
```

**Sizing:**
- **Current:** Fixed rows (3, 5, 8, etc.)
- **Official:**
  - Fixed: `rows` prop
  - Auto: `autoResize` with `minRows`/`maxRows`

**States:**
- **Current:** Normal, focus, error, disabled
- **Official:** Additional states:
  - Over limit (when exceeds maxLength)
  - Auto-resizing (during height change)
  - Read-only

**Typography:**
- **Current:** Inherits from CSS
- **Official:**
  - Font: `tokens.fontFamilyDefault`
  - Size: `tokens.fontBodyM`
  - Line height: `tokens.lineHeightBodyM`
  - Mobile: `touchScreenFormFieldFontSize` (16px min to prevent zoom)

**Border Color:**
- **Current:**
  - Normal: `var(--ink-border-default)`
  - Focus: `var(--ink-cobalt-60)`
  - Error: `var(--ink-message-color-alert)`

- **Official:**
  - Normal: `tokens.borderColorDefault`
  - Hover: `tokens.borderColorHover`
  - Focus: `tokens.focusInner` (double outline)
  - Error: `tokens.messageColorAlert`
  - Over limit: `tokens.messageColorAlert` (border + counter)

#### Code Quality

**Current:**
- ~80 lines
- Basic textarea wrapper
- Simple styling
- Good for forms

**Official:**
- ~250 lines
- PropTypes validation
- Auto-resize logic with useEffect + useLayoutEffect
- Character counter with live region
- Min/max row constraints
- Resize control
- Theme-aware
- Mobile optimizations

#### Recommendations

**High Priority:**
1. Add `maxLength` with character counter
2. Add auto-resize with `minRows`/`maxRows`
3. Add `resize` prop for resize control
4. Show over-limit state in counter

**Medium Priority:**
5. Rename `hint` to `description`
6. Add `accessibilityDescription` override
7. Add mobile font size optimization (16px min)
8. Add hover state styling

**Low Priority:**
9. Add read-only state styling
10. Add smooth height transition for auto-resize

**Example Enhancement:**
```typescript
interface TextAreaProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  rows?: number
  maxLength?: number
  description?: string
  error?: string
  disabled?: boolean
  required?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  autoResize?: boolean
  minRows?: number
  maxRows?: number
  className?: string
}

<TextArea
  label="Description"
  value={description}
  onChange={setDescription}
  maxLength={500}
  autoResize
  minRows={3}
  maxRows={10}
  description="Tell us about yourself"
  resize="none"
/>
```

---

### Tooltip

**Status:** ⚠️ Basic Implementation

#### Functional Differences

**Component Names:**
- **Current:** `Tooltip`
- **Official:** `Tooltip` + `TooltipManager`

**Current API:**
```typescript
<Tooltip content="Helpful text" placement="top">
  <Button>Hover me</Button>
</Tooltip>
```

**Official API:**
```typescript
// Individual tooltip
<Tooltip text="Helpful text" placement="top">
  <Button>Hover me</Button>
</Tooltip>

// With TooltipManager for coordinated tooltips
<TooltipManager>
  <Tooltip text="First tooltip">
    <Button>Button 1</Button>
  </Tooltip>
  <Tooltip text="Second tooltip">
    <Button>Button 2</Button>
  </Tooltip>
</TooltipManager>
```

**Missing Props:**
- `text` vs `content` (official uses `text`)
- `delay` - Show delay in milliseconds
- `maxWidth` - Maximum tooltip width
- `trigger` - Trigger mode ('hover', 'focus', 'click')
- `disabled` - Disable tooltip
- `offset` - Distance from trigger
- `arrow` - Show/hide arrow (always shown in current)
- `portal` - Render in portal
- `id` - Custom ID for accessibility
- `accessibilityHidden` - Hide from screen readers

**Missing Component:**
- `TooltipManager` - Coordinates multiple tooltips:
  - Ensures only one tooltip shown at a time
  - Shared delay settings
  - Global disable/enable
  - Z-index management

**Missing Features:**

**1. Trigger Modes:**
- **Current:** Hover only
- **Official:** Multiple triggers:
  - `hover` - Show on mouse enter (default)
  - `focus` - Show on focus
  - `click` - Show on click
  - Array: `['hover', 'focus']` - Multiple triggers

**2. Show/Hide Delay:**
- **Current:** Instant show/hide
- **Official:** Configurable delay:
  ```javascript
  <Tooltip text="..." delay={500}>
    {trigger}
  </Tooltip>
  ```

**3. TooltipManager Pattern:**
- **Current:** Each tooltip independent
- **Official:** Manager coordinates multiple tooltips:
  ```javascript
  <TooltipManager hideDelay={200} showDelay={500}>
    {/* Only one tooltip shows at a time */}
    <Tooltip text="A">...</Tooltip>
    <Tooltip text="B">...</Tooltip>
  </TooltipManager>
  ```

**4. Positioning Library:**
- **Current:** Simple CSS positioning
- **Official:** Uses `@floating-ui/react` with:
  - Flip on collision
  - Shift to stay in viewport
  - Dynamic arrow positioning

**5. Accessibility:**
- **Current:** Basic `aria-describedby`
- **Official:**
  - Unique ID generation
  - `aria-describedby` or `aria-labelledby` depending on usage
  - `role="tooltip"`
  - `accessibilityHidden` option

**6. Portal Rendering:**
- **Current:** Renders inline
- **Official:** Optional portal rendering:
  ```javascript
  <Tooltip text="..." portal>
    {trigger}
  </Tooltip>
  ```

#### Visual Differences

**Sizing:**
- **Current:** Content-based, no max width
- **Official:** `maxWidth` prop (default: 280px):
  ```javascript
  <Tooltip text="..." maxWidth={400}>
    {trigger}
  </Tooltip>
  ```

**Arrow:**
- **Current:** Always shown, fixed positioning
- **Official:**
  - Optional via `arrow` prop
  - Dynamic positioning via floating-ui
  - Arrow points directly at trigger center

**Colors:**
- **Current:**
  - Background: `var(--ink-neutral-140)` (dark gray)
  - Text: white
  - Arrow: Same as background

- **Official:**
  - Background: `tokens.tooltipBgColor`
  - Text: `tokens.tooltipTextColor`
  - Border: Optional with `tokens.borderColorDefault`
  - Arrow: Matches background + border

**Typography:**
- **Current:**
  - Font size: 14px
  - Font weight: 400

- **Official:**
  - Font: `tokens.fontBodyS`
  - Line height: `tokens.lineHeightBodyS`
  - Text alignment: Left (or center for short text)

**Animation:**
- **Current:** CSS fade transition (opacity only)
  ```css
  transition: opacity 0.2s ease;
  ```

- **Official:** Fade + slight offset:
  ```css
  @keyframes tooltipIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: tooltipIn 0.15s ease;
  ```

**Z-Index:**
- **Current:** Fixed `z-index: 9999`
- **Official:** Theme token `tokens.zIndexTooltip` + manager coordination

**Max Width Wrapping:**
```css
/* Official */
.tooltip {
  max-width: var(--tooltip-max-width, 280px);
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}
```

#### TooltipManager Features

**Purpose:** Coordinate multiple tooltips on a page.

**Features:**
1. **Single Tooltip Rule:** Only one tooltip visible at a time
2. **Shared Delays:** Set show/hide delay for all tooltips
3. **Global Disable:** Disable all tooltips at once
4. **Z-Index Management:** Ensures proper stacking

**Implementation:**
```javascript
// Official TooltipManager
<TooltipManager
  showDelay={500}
  hideDelay={200}
  disabled={false}
>
  <Tooltip text="First">
    <Button>Button 1</Button>
  </Tooltip>
  <Tooltip text="Second">
    <Button>Button 2</Button>
  </Tooltip>
</TooltipManager>

// When hovering Button 1 then Button 2:
// 1. Button 1 tooltip shows after 500ms
// 2. Move to Button 2
// 3. Button 1 tooltip hides after 200ms
// 4. Button 2 tooltip shows (no delay if within 200ms)
```

**Context Implementation:**
```javascript
// Official pattern
const TooltipContext = createContext({
  showDelay: 0,
  hideDelay: 0,
  disabled: false,
  currentTooltip: null,
  setCurrentTooltip: () => {}
})

export function TooltipManager({ children, showDelay, hideDelay, disabled }) {
  const [currentTooltip, setCurrentTooltip] = useState(null)

  return (
    <TooltipContext.Provider value={{
      showDelay,
      hideDelay,
      disabled,
      currentTooltip,
      setCurrentTooltip
    }}>
      {children}
    </TooltipContext.Provider>
  )
}
```

#### Code Quality

**Current:**
- ~100 lines
- Basic hover tooltip
- Simple positioning
- Good for basic use cases

**Official:**
- **Tooltip.tsx:** ~280 lines
- **TooltipManager.tsx:** ~80 lines
- **Total:** ~360 lines

**Official Features:**
- PropTypes validation
- Floating UI integration
- Multiple trigger modes
- Show/hide delays with timers
- Portal rendering
- Arrow positioning
- Theme-aware
- TooltipManager coordination
- Unique ID generation
- Comprehensive accessibility

#### Recommendations

**High Priority:**
1. Add `@floating-ui/react` for proper positioning
2. Add `maxWidth` prop (default 280px)
3. Add show/hide `delay` prop
4. Improve arrow positioning

**Medium Priority:**
5. Add `trigger` prop (hover, focus, click)
6. Create `TooltipManager` for coordinated tooltips
7. Add portal rendering option
8. Improve animation (add offset)

**Low Priority:**
9. Add `arrow` boolean prop
10. Add `disabled` prop
11. Support custom IDs for accessibility

**Example Enhancement:**
```typescript
interface TooltipProps {
  text: string
  children: React.ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
  maxWidth?: number
  delay?: number
  trigger?: 'hover' | 'focus' | 'click' | Array<'hover' | 'focus' | 'click'>
  disabled?: boolean
  arrow?: boolean
  portal?: boolean
}

<TooltipManager showDelay={500} hideDelay={200}>
  <Tooltip
    text="This is a helpful tooltip with more information"
    placement="top"
    maxWidth={320}
    trigger={['hover', 'focus']}
  >
    <Button>Hover or focus me</Button>
  </Tooltip>
</TooltipManager>
```

---

## Summary: Missing Features Across All Components

### 1. Animation System
**Gap:** No components use animation library
**Impact:** Less polished UX
**Solution:** Integrate Framer Motion via @ds/motion

**Missing Animations:**
- Modal: Fade in/out
- AlertBadge: Pop-in entrance
- Accordion: Smooth height transition
- SideNav: Width expansion
- Tabs: Indicator slide
- Popover/Tooltip: Fade + offset
- Spinner: Circular progress

### 2. Accessibility
**Critical Gaps:**
- No `accessibilityText` props (screen reader overrides)
- Limited focus management (no focus trap, return, initial focus)
- Missing keyboard navigation (Tabs, Accordion, SelectMenu)
- No unique ID generation (aria associations)
- Missing live regions (loading states, announcements)
- No visually hidden utility
- Limited ARIA attributes

**Impact:** Not WCAG compliant, poor screen reader experience

### 3. Theming
**Gap:** Single theme only (Ink)
**Impact:** Cannot support Olive theme or custom themes
**Solution:**
- Add theme context
- Migrate to CSS-in-JS or CSS variable theming
- Support theme switching

### 4. Compound Components
**Missing Patterns:**
- Modal: No Modal.Header, Modal.Body, Modal.Footer
- Table: No Table.Header, Table.Row, Table.Cell
- Tabs: No Tabs.Tab, Tabs.Panel
- Accordion: No Accordion.Item
- Popover: No Popover.Header, Popover.Body

**Impact:** Less flexibility, harder to customize

### 5. Form Features
**Missing Across Inputs:**
- Character counters (Input, TextArea)
- Prefix/Suffix (Input)
- Clearable (Input, Select)
- Auto-resize (TextArea)
- Search (Select)
- Description vs hint naming
- Error state improvements
- Mobile optimizations (16px font to prevent zoom)

### 6. Advanced Features
**Missing:**
- Portal rendering (Modal, Popover, Tooltip)
- Floating UI integration (Popover, Tooltip, Dropdown)
- Collision detection (flip, shift)
- IntersectionObserver (Table frozen column, sticky headers)
- ResizeObserver (Table scrollbar detection)
- Body scroll lock (Modal)
- Event propagation control

### 7. Developer Experience
**Missing:**
- PropTypes validation (runtime checks)
- data-qa attributes (test automation)
- Deprecation warnings
- Console errors for missing required props
- Extensive JSDoc documentation
- Translation support (i18n)

### 8. Props Inconsistency
**Naming Differences:**
- `variant` (current) vs `kind` (official) - Button
- `rounded` (current) vs `pill` (official) - Button
- `hint` (current) vs `description` (official) - Inputs
- `content` (current) vs `text` (official) - Tooltip
- `inverse` (current) vs `inverted` (official) - Multiple

**Recommendation:** Align with official naming for consistency

---

## Priority Matrix for Improvements

### P0 - Critical (Accessibility & Core Features)
1. Add `accessibilityText` props to all components
2. Implement focus management (Modal, Drawer)
3. Add keyboard navigation (Tabs, Accordion, Dropdown)
4. Add character counters (Input, TextArea with maxLength)
5. Improve ARIA attributes across all components

### P1 - High (UX & Polish)
6. Add animation system (Framer Motion)
7. Integrate Floating UI (Popover, Tooltip, Dropdown)
8. Add compound components (Modal, Table, Tabs)
9. Add prefix/suffix to Input
10. Add auto-resize to TextArea

### P2 - Medium (Features)
11. Add TooltipManager
12. Add portal rendering
13. Add clearable inputs
14. Add loading states where missing
15. Add size variants where missing

### P3 - Low (Nice to Have)
16. Add theme system
17. Add PropTypes validation
18. Add data-qa attributes
19. Add deprecation warnings
20. Add internationalization

---

## Conclusion

The current implementation provides **excellent value for rapid prototyping** with:
- ✅ Clean, intuitive APIs
- ✅ Essential functionality
- ✅ Good visual design
- ✅ Type safety
- ✅ Fast development

However, for **production use**, significant gaps exist in:
- ❌ Accessibility (screen readers, keyboard nav, focus management)
- ❌ Animation & polish
- ❌ Advanced features (portals, floating UI, collision detection)
- ❌ Compound component patterns
- ❌ Theme flexibility
- ❌ Testing support (data-qa)
- ❌ Internationalization

**Recommended Approach:**
1. **Phase 1:** Fix critical accessibility gaps (focus management, ARIA, keyboard nav)
2. **Phase 2:** Add animation system and polish
3. **Phase 3:** Migrate complex components to compound patterns (Modal, Table, Tabs)
4. **Phase 4:** Add theme system and advanced features

**Hybrid Strategy:**
- Keep simple components as-is (Button, Input, Badge, Divider, Link)
- Enhance complex components (Modal, Table, Tabs, Accordion)
- Add missing critical components (ToastMessage, InlineMessage, SelectMenu)

This allows maintaining rapid prototyping speed while moving toward production readiness incrementally.