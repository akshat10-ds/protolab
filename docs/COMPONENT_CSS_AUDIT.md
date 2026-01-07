# Component CSS Audit: DocuSign vs Ink Design System

This document tracks all CSS differences found between the real DocuSign app and our Ink Design System components.

**Audit Date**: December 16, 2025
**Method**: Chrome DevTools MCP - extracting computed CSS from live DocuSign app

---

## Summary of Changes

| Component | Status | Changes Needed |
|-----------|--------|----------------|
| Button | ✅ Audited | Padding values (ALREADY CHANGED - needs review) |
| Input | ✅ Audited | Focus uses outline instead of thicker border |
| Checkbox | ✅ Audited | All properties match - no changes needed |
| Radio | ✅ Audited | Border color, label font size, label color need fixing |
| Switch | ✅ Audited | All properties match - no changes needed |
| Select | ✅ Audited | Border color differs on default state |

---

## 1. Button Component

**File**: `src/design-system/3-primitives/Button/Button.module.css`

### DocuSign Extracted Values

#### Primary Button ("Start")
```
height: 40px
padding: 4px 12px
fontSize: 16px
fontWeight: 500
lineHeight: 24px
color: rgb(255, 255, 255) = white
backgroundColor: rgb(38, 5, 89) = #260559 = --ink-cobalt-140
borderRadius: 4px
borderColor: transparent
boxShadow: none
transition: background-color 0.1s cubic-bezier(0.33, 0, 0.67, 1)
```

#### Primary Button HOVER
```
backgroundColor: rgb(43, 4, 127) = #2b047f = --ink-cobalt-130
```

#### Secondary Button ("Shared Access", "Copy")
```
height: 40px
padding: 4px 12px
fontSize: 16px
fontWeight: 500
lineHeight: 24px
color: rgba(19, 0, 50, 0.9) = --ink-neutral-fade-90
backgroundColor: transparent
borderColor: rgba(19, 0, 50, 0.5) = --ink-neutral-fade-50
borderRadius: 4px
```

#### Secondary Button HOVER
```
backgroundColor: rgba(19, 0, 50, 0.05) = --ink-neutral-fade-5
borderColor: rgba(19, 0, 50, 0.7) = --ink-neutral-fade-70
```

#### Tertiary/Filter Button ("Clear", "Last 6 months") - Small Size
```
height: 32px
padding: 4px 8px
fontSize: 14px
fontWeight: 500
lineHeight: 19.6px
color: rgba(19, 0, 50, 0.9)
backgroundColor: rgba(19, 0, 50, 0.05) = --ink-neutral-fade-5
borderColor: transparent
borderRadius: 4px
```

### Comparison Table

| Property | DocuSign Medium | Our Original | Our Token | Match? |
|----------|----------------|--------------|-----------|--------|
| height | 40px | 40px | - | ✓ |
| padding | 4px 12px | 0 16px | spacing-50 spacing-150 | ✗ → Fixed |
| fontSize | 16px | 16px | font-size-md | ✓ |
| fontWeight | 500 | 500 | font-weight-medium | ✓ |
| lineHeight | 24px (1.5) | 1.5 | - | ✓ |
| borderRadius | 4px | 4px | radius-size-xs | ✓ |

| Property | DocuSign Small | Our Original | Our Token | Match? |
|----------|---------------|--------------|-----------|--------|
| height | 32px | 32px | - | ✓ |
| padding | 4px 8px | 0 12px | spacing-50 spacing-100 | ✗ → Fixed |
| fontSize | 14px | 14px | font-size-sm | ✓ |

### Color Token Verification

| Button Type | Property | DocuSign | Our Token | Match? |
|-------------|----------|----------|-----------|--------|
| Primary | bg | rgb(38,5,89) | --ink-cobalt-140 (#260559) | ✓ |
| Primary | bg-hover | rgb(43,4,127) | --ink-cobalt-130 (#2b047f) | ✓ |
| Primary | text | white | --ink-white-100 | ✓ |
| Secondary | bg | transparent | transparent | ✓ |
| Secondary | bg-hover | neutral-fade-5 | --ink-neutral-fade-5 | ✓ |
| Secondary | border | neutral-fade-50 | --ink-neutral-fade-50 | ✓ |
| Secondary | border-hover | neutral-fade-70 | --ink-neutral-fade-70 | ✓ |
| Tertiary | bg | neutral-fade-5 | --ink-neutral-fade-5 | ✓ |

### Changes Made (NEEDS REVIEW)

**I already made this change** - please review before keeping:

```css
/* BEFORE */
.small {
  height: 32px;
  padding: 0 var(--ink-spacing-3); /* 0 12px */
  ...
}

.medium {
  height: 40px;
  padding: 0 var(--ink-spacing-4); /* 0 16px */
  ...
}

/* AFTER (current state) */
.small {
  height: 32px;
  padding: var(--ink-spacing-50) var(--ink-spacing-100); /* 4px 8px */
  ...
}

.medium {
  height: 40px;
  padding: var(--ink-spacing-50) var(--ink-spacing-150); /* 4px 12px */
  ...
}
```

### Verdict
- **Colors**: All match ✓
- **Dimensions**: Height, font-size, border-radius all match ✓
- **Padding**: Was different, now fixed to match DocuSign exact values
- **Hover states**: All match ✓

---

## 2. Input Component

**File**: `src/design-system/3-primitives/Input/Input.module.css`

**Status**: ✅ Audited

### DocuSign Extracted Values

#### Input Wrapper (Default State)
```
height: 40px
borderWidth: 1px
borderColor: rgba(19, 0, 50, 0.5) = --ink-neutral-fade-50
borderRadius: 4px
backgroundColor: rgb(255, 255, 255) = white
outline: transparent
```

#### Input Wrapper (Focus State) ⚠️ KEY DIFFERENCE
```
height: 40px
borderWidth: 1px (SAME - does NOT change to 2px!)
borderColor: rgba(19, 0, 50, 0.7) = --ink-neutral-fade-70 (darker)
borderRadius: 4px
backgroundColor: rgb(255, 255, 255) = white
outline: rgb(55, 3, 158) solid 2px = --ink-cobalt-100
outlineOffset: -2px
```

#### Input Field (inside wrapper)
```
height: 38px (40px wrapper - 1px border each side)
padding: 8px 16px
fontSize: 16px
fontWeight: 400
lineHeight: 24px
color: rgba(19, 0, 50, 0.9) = --ink-neutral-fade-90
backgroundColor: transparent
border: none (border is on wrapper)
```

#### TextArea (Message field)
```
height: 114px
minHeight: 68px
padding: 8px 16px
fontSize: 16px
fontWeight: 400
lineHeight: 24px
color: rgba(19, 0, 50, 0.9) = --ink-neutral-fade-90
backgroundColor: rgb(255, 255, 255) = white
borderWidth: 1px
borderColor: rgba(19, 0, 50, 0.5) = --ink-neutral-fade-50
borderRadius: 4px
resize: vertical
```

### Comparison Table

| Property | DocuSign | Our Current | Match? |
|----------|----------|-------------|--------|
| height (medium) | 40px | 40px | ✓ |
| padding | 8px 16px | 8px 16px | ✓ |
| fontSize | 16px | 16px | ✓ |
| fontWeight | 400 | 400 | ✓ |
| lineHeight | 24px | 1.5 (24px) | ✓ |
| borderWidth (default) | 1px | 1px | ✓ |
| borderColor (default) | neutral-fade-50 | form-border-default | ✓ |
| borderRadius | 4px | 4px | ✓ |
| **borderWidth (focus)** | **1px** | **2px** | **✗** |
| **focus style** | **outline 2px** | **border 2px** | **✗** |

### Proposed Changes

**CRITICAL CHANGE**: DocuSign uses `outline` for focus, not thicker border!

```css
/* CURRENT (incorrect) */
.input:focus:not(.error) {
  border: var(--ink-form-border-width-active) solid var(--ink-form-border-active);
  /* Adjust padding to compensate for thicker border */
  padding: calc(var(--ink-spacing-100) - 1px) calc(var(--ink-spacing-200) - 1px);
}

/* PROPOSED (DocuSign style) */
.input:focus:not(.error) {
  border-color: var(--ink-neutral-fade-70); /* Darker border on focus */
  outline: 2px solid var(--ink-cobalt-100);
  outline-offset: -2px;
  /* NO padding adjustment needed - border stays 1px */
}
```

### Verdict
- **Dimensions**: All match ✓
- **Colors**: All match ✓
- **Focus State**: Different approach - DocuSign uses outline, we use thicker border
- **Impact**: Medium - padding compensation logic can be removed

---

## 3. Checkbox Component

**File**: `src/design-system/3-primitives/Checkbox/Checkbox.module.css`

**Status**: ✅ Audited

### DocuSign Extracted Values

#### Checkbox Box (Unchecked)
```
width: 20px
height: 20px
backgroundColor: rgb(255, 255, 255) = white
borderWidth: 2px
borderColor: rgba(19, 0, 50, 0.5) = --ink-neutral-fade-50
borderRadius: 4px
```

#### Checkbox Box (Checked)
```
width: 20px
height: 20px
backgroundColor: rgb(55, 3, 158) = --ink-cobalt-100
borderWidth: 2px
borderColor: rgb(55, 3, 158) = --ink-cobalt-100
borderRadius: 4px
```

#### Checkbox Label
```
fontSize: 14px
fontWeight: 400
lineHeight: 19.6px (1.4)
color: rgba(19, 0, 50, 0.9) = --ink-neutral-fade-90
padding: 8px 0px
cursor: pointer (unchecked) / default (in some contexts)
display: inline-flex
```

### Comparison Table

| Property | DocuSign | Our Current | Match? |
|----------|----------|-------------|--------|
| box size | 20px × 20px | var(--ink-icon-size-s) = 20px | ✓ |
| borderWidth | 2px | 2px (form-border-width-active) | ✓ |
| borderColor (unchecked) | neutral-fade-50 | form-border-default | ✓ |
| borderRadius | 4px | radius-size-xs = 4px | ✓ |
| backgroundColor (checked) | cobalt-100 | form-bg-selected | ✓ |
| borderColor (checked) | cobalt-100 | form-border-selected | ✓ |
| label fontSize | 14px | 14px | ✓ |
| label fontWeight | 400 | 400 | ✓ |
| label lineHeight | 1.4 | 1.4 | ✓ |
| label color | neutral-fade-90 | font-default | ✓ |

### Proposed Changes

**No changes needed** - all values match!

### Verdict
- **Box dimensions**: Match ✓
- **Border styles**: Match ✓
- **Colors (unchecked)**: Match ✓
- **Colors (checked)**: Match ✓
- **Label typography**: Match ✓

---

## 4. Radio Component

**File**: `src/design-system/3-primitives/Radio/Radio.module.css`

**Status**: ✅ Audited

### DocuSign Extracted Values

#### Radio Outer Ring (Unchecked)
```
width: 20px
height: 20px
borderWidth: 2px
borderColor: rgba(19, 0, 50, 0.5) = --ink-neutral-fade-50
borderRadius: 50% (full circle)
backgroundColor: rgb(255, 255, 255) = white
borderStyle: solid
```

#### Radio Outer Ring (Checked/Selected)
```
width: 20px
height: 20px
borderWidth: 2px
borderColor: rgb(55, 3, 158) = --ink-cobalt-100
borderRadius: 50%
backgroundColor: rgb(255, 255, 255) = white
borderStyle: solid
```

#### Radio Inner Dot (Checked)
```
width: 8px
height: 8px
borderWidth: 4px (creates solid 8px dot via border)
borderColor: rgb(55, 3, 158) = --ink-cobalt-100
borderRadius: 50%
backgroundColor: transparent
opacity: 1
transform: none
```

#### Radio Inner Dot (Unchecked)
```
opacity: 0
transform: scale(0) - animates in on selection
```

#### Radio Label
```
fontSize: 14px
fontWeight: 400
lineHeight: 19.6px (1.4)
color: rgba(19, 0, 50, 0.9) = --ink-neutral-fade-90
paddingLeft: 4px
```

### Comparison Table

| Property | DocuSign | Our Current | Match? |
|----------|----------|-------------|--------|
| outer ring size | 20px × 20px | 20px × 20px | ✓ |
| borderWidth | 2px | 2px | ✓ |
| borderColor (unchecked) | neutral-fade-50 | neutral-40 | ✗ |
| borderColor (checked) | cobalt-100 | cobalt-100 | ✓ |
| borderRadius | 50% | radius-full | ✓ |
| inner dot size | 8px | 8px | ✓ |
| inner dot color | cobalt-100 | cobalt-100 | ✓ |
| label fontSize | 14px | font-size-md (16px) | ✗ |
| label fontWeight | 400 | regular (400) | ✓ |
| label lineHeight | 1.4 | line-height-normal | ✓ |
| label color | neutral-fade-90 | neutral-100 | ✗ |

### Proposed Changes

**1. Border color for unchecked state:**
```css
/* CURRENT */
.input {
  border: 2px solid var(--ink-neutral-40);
}

/* PROPOSED */
.input {
  border: 2px solid var(--ink-neutral-fade-50);
  /* Or use: var(--ink-form-border-default) */
}
```

**2. Label font size should be 14px, not 16px:**
```css
/* CURRENT */
.label {
  font-size: var(--ink-font-size-md); /* 16px */
}

/* PROPOSED */
.label {
  font-size: var(--ink-font-size-sm); /* 14px - matches checkbox labels */
}
```

**3. Label color should use fade token:**
```css
/* CURRENT */
.label {
  color: var(--ink-neutral-100);
}

/* PROPOSED */
.label {
  color: var(--ink-neutral-fade-90);
  /* Or use: var(--ink-font-default) */
}
```

### Verdict
- **Dimensions**: Match ✓
- **Border radius**: Match ✓
- **Colors (checked)**: Match ✓
- **Colors (unchecked)**: Border uses wrong neutral token
- **Label typography**: Font size is 16px but should be 14px
- **Label color**: Using solid neutral instead of fade token
- **Impact**: Medium - visual consistency with Checkbox

---

## 5. Switch Component

**File**: `src/design-system/3-primitives/Switch/Switch.module.css`

**Status**: ✅ Audited

### DocuSign Extracted Values

#### Switch Track (ON/Checked State)
```
width: 36px
height: 20px
backgroundColor: rgb(55, 3, 158) = --ink-cobalt-100
borderWidth: 2px
borderColor: rgb(55, 3, 158) = --ink-cobalt-100
borderRadius: 20px (full)
padding: 0px
```

#### Switch Thumb
```
width: 12px
height: 12px
backgroundColor: rgb(255, 255, 255) = white
borderRadius: 6px (full)
boxShadow: none (or transparent)
```

#### Switch Container
```
width: 44px
height: 32px
```

### Comparison Table

| Property | DocuSign | Our Current | Our Token | Match? |
|----------|----------|-------------|-----------|--------|
| **track width** | **36px** | **36px** | **spacing-350** | **✓** |
| **track height** | **20px** | **20px** | **spacing-250** | **✓** |
| track bg (on) | cobalt-100 | form-bg-selected | - | ✓ |
| track borderRadius | 20px (full) | radius-full | - | ✓ |
| **thumb width** | **12px** | **12px** | **spacing-150** | **✓** |
| **thumb height** | **12px** | **12px** | **spacing-150** | **✓** |
| thumb bg | white | white-100 | - | ✓ |
| thumb borderRadius | full | radius-full | - | ✓ |
| thumb position (off) | 4px from left | 4px (spacing-50) | - | ✓ |
| thumb travel | ~16px | 16px (spacing-200) | - | ✓ |

### Proposed Changes

**No changes needed** - dimensions match!

### Verdict
- **Track dimensions**: Match ✓
- **Thumb dimensions**: Match ✓
- **Colors**: Match ✓
- **Animation**: Not audited (would need interaction testing)

---

## 6. Select Component

**File**: `src/design-system/3-primitives/Select/Select.module.css`

**Status**: ✅ Audited

### DocuSign Extracted Values

#### Select (Default State)
```
height: 40px
width: varies
padding: 8px 48px 8px 16px (extra right padding for chevron icon)
fontSize: 16px
fontWeight: 400
lineHeight: 24px
color: rgba(19, 0, 50, 0.9) = --ink-neutral-fade-90
backgroundColor: rgb(255, 255, 255) = white
borderWidth: 1px
borderColor: rgba(19, 0, 50, 0.7) = --ink-neutral-fade-70 ⚠️
borderRadius: 4px
appearance: none
```

### Comparison Table

| Property | DocuSign | Our Current | Match? |
|----------|----------|-------------|--------|
| height (medium) | 40px | 40px | ✓ |
| padding-left | 16px | spacing-200 = 16px | ✓ |
| padding-right | 48px | spacing-400 = 32px | ✗ |
| padding-top/bottom | 8px | spacing-100 = 8px | ✓ |
| fontSize | 16px | font-size-md = 16px | ✓ |
| fontWeight | 400 | font-weight-regular = 400 | ✓ |
| lineHeight | 24px | 1.5 | ✓ |
| **borderColor (default)** | **neutral-fade-70** | **form-border-default (fade-50)** | **✗** |
| borderRadius | 4px | radius-sm = 4px | ✓ |
| backgroundColor | white | form-bg-default | ✓ |

### Proposed Changes

**1. Border color on default state is darker than Input:**

```css
/* CURRENT */
.select {
  border: var(--ink-form-border-width) solid var(--ink-form-border-default);
  /* form-border-default = neutral-fade-50 */
}

/* PROPOSED */
.select {
  border: var(--ink-form-border-width) solid var(--ink-neutral-fade-70);
  /* OR create a new token: --ink-form-border-select-default */
}
```

**2. Right padding for chevron icon:**

```css
/* CURRENT */
.select {
  padding: var(--ink-spacing-100) var(--ink-spacing-400) var(--ink-spacing-100) var(--ink-spacing-200);
  /* 8px 32px 8px 16px */
}

/* PROPOSED - Need to verify if 48px is needed or if 32px works with icon placement */
/* May need: padding-right: 48px to match DocuSign exactly */
```

### Verdict
- **Dimensions**: Match ✓
- **Typography**: Match ✓
- **Border Color**: Different - DocuSign uses darker border (neutral-fade-70 vs fade-50)
- **Padding**: Right padding may need adjustment for icon space
- **Impact**: Low - subtle visual difference

---

## Methodology

For each component:
1. Navigate to real DocuSign app in Chrome
2. Use `mcp__chrome-devtools__take_snapshot` to find element UIDs
3. Use `mcp__chrome-devtools__evaluate_script` to extract computed CSS
4. Use `mcp__chrome-devtools__hover` to trigger hover state, then extract CSS
5. Compare against our CSS module
6. Document findings in this file
7. Propose changes using design tokens only

---

## Token Reference

### Spacing
- `--ink-spacing-50`: 4px
- `--ink-spacing-100`: 8px
- `--ink-spacing-150`: 12px
- `--ink-spacing-200`: 16px
- `--ink-spacing-250`: 20px
- `--ink-spacing-350`: 36px
- `--ink-spacing-400`: 32px

### Colors (Neutral Fade)
- `--ink-neutral-fade-5`: rgba(19, 0, 50, 0.05)
- `--ink-neutral-fade-50`: rgba(19, 0, 50, 0.5)
- `--ink-neutral-fade-70`: rgba(19, 0, 50, 0.7)
- `--ink-neutral-fade-90`: rgba(19, 0, 50, 0.9)

### Colors (Cobalt)
- `--ink-cobalt-100`: #37039e = rgb(55, 3, 158) - Primary brand color
- `--ink-cobalt-130`: #2b047f = rgb(43, 4, 127) - Primary hover
- `--ink-cobalt-140`: #260559 = rgb(38, 5, 89) - Primary default

### Icon Sizes
- `--ink-icon-size-s`: 20px

---

## Summary of Required Changes

### HIGH Priority (Functional Difference)
1. **Input Focus State** - Change from 2px border to 2px outline
   - Removes need for padding compensation
   - More consistent with native focus behavior

### MEDIUM Priority (Visual Difference)
2. **Select Border Color** - Use neutral-fade-70 instead of fade-50
   - Select appears slightly darker than Input (intentional in DocuSign)

3. **Radio Component** - Multiple fixes needed:
   - Border color (unchecked): Use `--ink-neutral-fade-50` instead of `--ink-neutral-40`
   - Label font size: Use 14px (`font-size-sm`) instead of 16px (`font-size-md`)
   - Label color: Use `--ink-neutral-fade-90` or `--ink-font-default`

### LOW Priority (Minor Tweaks)
4. **Select Right Padding** - Verify if 48px is needed for icon space

### ALREADY DONE (Needs Review)
5. **Button Padding** - Changed from 0 16px to 4px 12px
   - Already applied, needs user confirmation

---

## Components That Match Perfectly ✅
- **Checkbox** - All properties match
- **Switch** - All properties match
- **Button** (after padding fix) - All properties match
