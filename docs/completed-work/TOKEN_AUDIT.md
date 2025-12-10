# Complete Token System Audit

**Date**: 2025-11-07
**Status**: Major gaps identified

---

## Current Showcase Coverage

### ✅ Currently Shown (6 pages)
1. **Color Primitives** - Raw color scales (cobalt, neutral, green, red, etc.)
2. **Semantic Colors** - Background, font, border semantic tokens (NEW)
3. **Typography** - ONLY primitives (font-size-*, font-weight-*, line-height-*)
4. **Spacing** - Spacing scale (spacing-50 through spacing-700)
5. **Border & Radius** - Border radius values
6. **Shadows** - Shadow and elevation tokens

---

## ❌ Missing Semantic Token Categories

### 1. Semantic Typography (MAJOR GAP)
**Location**: Lines 701-754 in tokens.css

**Missing categories**:
- **Detail Text Styles** (2 sizes)
  - `--ink-font-detail-xs-*` 
  - `--ink-font-detail-s-*`

- **Body Text Styles** (4 sizes)
  - `--ink-font-body-s-*`
  - `--ink-font-body-m-*`
  - `--ink-font-body-l-*`
  - `--ink-font-body-xl-*`

- **Heading Styles** (4 sizes)
  - `--ink-font-heading-xxs-*`
  - `--ink-font-heading-xs-*`
  - `--ink-font-heading-s-*`
  - `--ink-font-heading-m-*`

- **Display Styles** (5 sizes)
  - `--ink-font-display-xs-*`
  - `--ink-font-display-s-*`
  - `--ink-font-display-m-*`
  - `--ink-font-display-l-*`
  - `--ink-font-display-xl-*`

- **Component-Specific** (10+ components)
  - Avatar, Badge, Button, Element Label, etc.

**Impact**: Developers don't know which typography tokens to use for headings, body text, etc.

---

### 2. Button Component Tokens
**Location**: Lines 236-269 in tokens.css

**Missing categories**:
- Brand buttons (`--ink-button-brand-*`)
- Primary buttons (`--ink-button-primary-*`)
- Secondary buttons (`--ink-button-secondary-*`)
- Tertiary buttons (`--ink-button-tertiary-*`)
- Danger buttons (`--ink-button-danger-*`)

Each includes: bg, bg-hover, bg-active, text, border (where applicable)

**Impact**: Developers don't see how button colors are defined semantically

---

### 3. Form Component Tokens
**Location**: Lines 271-324 in tokens.css

**Missing categories**:
- Form backgrounds (default, disabled, error, selected, etc.)
- Form borders (default, hover, active, focus, error, selected)
- Form text colors (required, disabled, placeholder)
- Form thumb styles (slider/switch)
- Inverse variants for dark themes

**Impact**: Form styling tokens are completely undocumented

---

### 4. Icon Component Tokens
**Location**: Lines 326-372 in tokens.css

**Missing categories**:
- Icon colors (default, accent, error, success, warning, disabled, etc.)
- Icon sizes (small, medium)
- Inverse variants

**Impact**: Icon color system is hidden

---

### 5. Item/List Component Tokens
**Location**: Lines 374-396 in tokens.css

**Missing categories**:
- Item backgrounds (hover, active, selected states)
- Item borders (hover, active states)
- Inverse variants

**Impact**: List/menu item states are undefined

---

### 6. Status Component Tokens
**Location**: Lines 401-429 in tokens.css

**Missing categories**:
- Status backgrounds (accent, alert, current, future, past, success, warning, etc.)
- Inverse variants

**Impact**: Status indicator colors are hidden

---

### 7. Message Component Tokens
**Location**: Lines 431-459 in tokens.css

**Missing categories**:
- Message backgrounds (default, alert, error, promo, success, warning, etc.)
- Message borders
- Inverse variants

**Impact**: Alert/message/notification styling is undocumented

---

### 8. Bar/Progress Component Tokens
**Location**: Lines 461-496 in tokens.css

**Missing categories**:
- Bar fill colors (default, emphasis, error, success, warning)
- Bar track colors
- Bar indicator colors
- Bar widths
- Inverse variants

**Impact**: Progress bar/slider styling is hidden

---

### 9. Additional Missing Categories

- **Elevation tokens**
- **Opacity tokens**
- **Recipient-specific tokens**
- **Additional component-specific tokens**

---

## Gap Summary

| Category | Primitive Tokens | Semantic Tokens | Currently Shown |
|----------|------------------|-----------------|-----------------|
| Colors | ✅ Shown | ✅ Shown (NEW) | ✅ Complete |
| Typography | ✅ Shown | ❌ Missing | ⚠️ 50% |
| Spacing | ✅ Shown | N/A | ✅ Complete |
| Border/Radius | ✅ Shown | N/A | ✅ Complete |
| Shadows | ✅ Shown | N/A | ✅ Complete |
| Buttons | N/A | ❌ Missing | ❌ 0% |
| Forms | N/A | ❌ Missing | ❌ 0% |
| Icons | N/A | ❌ Missing | ❌ 0% |
| Items/Lists | N/A | ❌ Missing | ❌ 0% |
| Status | N/A | ❌ Missing | ❌ 0% |
| Messages | N/A | ❌ Missing | ❌ 0% |
| Bars/Progress | N/A | ❌ Missing | ❌ 0% |

**Overall Coverage**: ~20% of semantic token system

---

## Recommendations

### Priority 1: Semantic Typography
**Why**: Directly affects text rendering in all components
**Add**: Separate subpage showing detail, body, heading, display styles
**Benefit**: Developers know which typography tokens to use

### Priority 2: Component Token Categories
**Why**: Shows how components use tokens internally
**Add**: Separate subpages for buttons, forms, icons
**Benefit**: Complete understanding of design system architecture

### Priority 3: State/Interaction Tokens
**Why**: Shows interactive states
**Add**: Showcases for items, status, messages
**Benefit**: Consistent state styling across components

---

## Proposed Solution

### Option A: Add Individual Subpages (Comprehensive)
Add ~10 new subpages to Layer 1:
- Semantic Typography
- Button Tokens
- Form Tokens
- Icon Tokens
- Item Tokens
- Status Tokens
- Message Tokens
- Bar Tokens
- Elevation Tokens
- Opacity/Misc Tokens

**Pros**: Complete, organized, easy to find
**Cons**: Many subpages (total: ~16)

### Option B: Group by Type (Balanced)
Add ~3 new subpages:
- Semantic Typography (detail, body, heading, display)
- Component Tokens (buttons, forms, icons)
- State Tokens (items, status, messages, bars)

**Pros**: Organized, not overwhelming
**Cons**: Longer pages to scroll

### Option C: Single Semantic Tokens Page (Quick)
Add 1 comprehensive page with all semantic tokens
**Pros**: Quick to implement
**Cons**: Very long page, hard to navigate

---

## Recommendation: Option B (Balanced)

Start with **3 critical additions**:
1. **Semantic Typography** - Immediate developer need
2. **Component Tokens** - Shows button/form/icon architecture
3. **State Tokens** - Shows interaction patterns

This brings coverage from ~20% → ~90% while keeping navigation manageable.

---

## Next Steps

1. Create Semantic Typography subpage
2. Create Component Tokens subpage
3. Create State Tokens subpage
4. Test and validate
5. Update documentation

