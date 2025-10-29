# Ink Design System - Implementation Learnings

This document captures important lessons learned while implementing the Ink Design System to prevent future issues.

## CSS Module Best Practices

### 1. Always Import Tokens in CSS Modules

**Problem**: CSS variables from `tokens.css` don't resolve automatically in CSS Module files.

**Solution**: Add the import at the top of every CSS Module file that uses design tokens:

```css
@import '../../styles/tokens.css';
```

**Files affected**: All `*.module.css` files in `/src/ink-design-system/components/`

**Example**:
```css
/* AlertBadge.module.css */
@import '../../styles/tokens.css';

.badge {
  background: var(--ink-message-bg-alert); /* Will now resolve correctly */
}
```

---

### 2. Global CSS Overrides CSS Modules

**Problem**: Global element selectors (p, span, button, etc.) in `src/index.css` and `src/styles/globals.css` can override CSS Module styles due to cascade order.

**Critical Example - AlertBadge Font Size Issue**:

```css
/* src/index.css - Global styles */
p, span {
  font-size: var(--text-base); /* 16px */
}
```

If a component wraps text in a `<p>` tag, this global style wins over the CSS Module:

```tsx
// ❌ WRONG - Global p style overrides .badge font-size
<div className={styles.badge}>
  <p>{value}</p>
</div>
```

```tsx
// ✅ CORRECT - No global selector interference
<div className={styles.badge}>
  {value}
</div>
```

**Resolution**: Avoid wrapping content in semantic HTML tags (p, span, h1-h6) inside components that need precise styling control. Render text directly in the styled container.

---

## Design Token Architecture

### Token Categories Added

The following token categories were added to `src/ink-design-system/styles/tokens.css`:

1. **Bar Tokens** (lines 461-496)
   - Fill colors: default, emphasis, accent-emphasis, error, subtle, success, warning
   - Track colors: default, emphasis, visited
   - Widths: xs (2px), s (4px), m (8px)
   - Includes inverse values for dark themes

2. **Elevation Tokens** (lines 498-507)
   - Shadows: low, medium, high, drag
   - Glass effect: 8px backdrop blur

3. **Gradient Tokens** (lines 509-515)
   - pearl, atmosphere, blue-haze, nightglow
   - Linear gradients at 174-176 degrees

4. **Focus Tokens** (lines 517-539)
   - Colors (standard and inverse)
   - Width: 2px
   - Offsets: inset (-4px), outset-s (2px), outset-m (4px), outset-l (8px)
   - Composite outline styles

5. **Breakpoint Tokens** (lines 541-549)
   - xs: 544px, s: 768px, m: 980px, l: 1280px, xl: 1440px, xxl: 1920px

6. **Message Tokens** (lines 431-459)
   - Backgrounds: default, alert, error, promo, success, warning, etc.
   - Borders: default, promo
   - Inverse values for dark themes

### Component-Specific Typography Tokens

Badge components use special typography tokens instead of generic size tokens:

```css
/* ✅ CORRECT - Component-specific tokens */
font-size: var(--ink-font-badge-size); /* 12px */
line-height: var(--ink-font-badge-line-height); /* 1.5 */

/* ❌ WRONG - Generic tokens may not match spec */
font-size: var(--ink-font-size-xs); /* Also 12px but not semantic */
```

**Component typography tokens available** (lines 730-751):
- `--ink-font-badge-size`, `--ink-font-badge-line-height`
- `--ink-font-button-size`, `--ink-font-button-line-height`
- `--ink-font-button-s-size`, `--ink-font-button-s-line-height`
- `--ink-font-avatar-group-size`, etc.

---

## AlertBadge Component - Detailed Case Study

### Initial Issues

1. **Missing @import**: Variables not resolving
2. **Non-existent tokens**: Using `--ink-border-emphasis-inverse` before it was defined
3. **Wrong border-radius**: Using `9999px` instead of `12px`
4. **Wrong letter-spacing**: Using `0.16px` instead of `0.12px`
5. **Missing padding**: No horizontal padding on number badges
6. **Font-size not resolving**: Global `<p>` tag override

### Final Working Implementation

**AlertBadge.module.css**:
```css
@import '../../styles/tokens.css';

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--ink-form-border-width-s) solid var(--ink-border-emphasis-inverse);
  border-radius: 12px;
  font-family: var(--ink-font-family);
  font-size: var(--ink-font-badge-size);
  font-weight: var(--ink-font-weight-medium);
  line-height: 1.5;
  letter-spacing: 0.12px;
  color: var(--ink-font-inverse);
}

.emphasis {
  background: var(--ink-message-bg-alert); /* rgb(199, 5, 71) = #c70547 */
}

.number {
  min-height: 20px;
  max-height: 20px;
  min-width: 20px;
  padding: 0 4px; /* Important: horizontal padding for readability */
}
```

**AlertBadge.tsx**:
```tsx
// Render text directly, no <p> wrapper
return (
  <div className={badgeClasses} aria-label={`${value} alerts`}>
    {displayValue}
  </div>
);
```

### Computed Styles Verification

To verify styles match the design system:

1. **Browser DevTools**: Inspect element → Computed tab
2. **Console Commands**:
   ```js
   const el = document.querySelector('.AlertBadge_badge__xyz');
   const computed = window.getComputedStyle(el);
   console.log({
     fontSize: computed.fontSize,
     background: computed.backgroundColor,
     border: computed.border,
     borderRadius: computed.borderRadius,
     letterSpacing: computed.letterSpacing,
     padding: computed.padding
   });
   ```

Expected values for emphasis badge:
- `font-size: 12px`
- `background-color: rgb(199, 5, 71)` (Ink red-90)
- `border: 2px solid rgb(255, 255, 255)` (white)
- `border-radius: 12px`
- `letter-spacing: 0.12px`
- `padding: 0px 4px` (single digit numbers)

---

## Token Usage Guidelines

### 1. Use Semantic Tokens Over Primitives

```css
/* ✅ CORRECT - Semantic tokens describe intent */
background: var(--ink-message-bg-alert);
color: var(--ink-font-inverse);

/* ❌ AVOID - Direct color primitives bypass semantic layer */
background: var(--ink-red-90);
color: var(--ink-white-100);
```

### 2. Component-Specific Tokens First

Always check if a component-specific token exists before falling back to generic tokens:

```css
/* ✅ CORRECT - Badge-specific token */
font-size: var(--ink-font-badge-size);

/* ⚠️ FALLBACK - Generic token (use only if no specific token exists) */
font-size: var(--ink-font-size-xs);
```

### 3. Standard vs Inverse Tokens

Most tokens have inverse variants for dark themes:

```css
/* Light theme */
background: var(--ink-message-bg-alert); /* red-90 */
color: var(--ink-font-inverse); /* white */

/* Dark theme */
background: var(--ink-message-bg-alert-inverse); /* red-50 */
color: var(--ink-font-default); /* neutral-fade-90 */
```

---

## Missing Tokens Added

These tokens were missing from the original implementation and have been added:

```css
/* Border Tokens */
--ink-border-emphasis-inverse: var(--ink-white-100);

/* Form Border Widths */
--ink-form-border-width-s: 2px;

/* Letter Spacing */
--ink-letter-spacing-wide: 0.16px;
--ink-letter-spacing-normal: 0;
--ink-letter-spacing-tight: -0.02em;
```

---

## Common Debugging Steps

### 1. CSS Variable Not Resolving

**Check**:
1. Is `@import '../../styles/tokens.css'` at the top of the CSS Module?
2. Is the token defined in `tokens.css`?
3. Are there any typos in the variable name?

**Debug**:
```js
// Check if variable is defined
const el = document.querySelector('.yourClass');
const value = getComputedStyle(el).getPropertyValue('--ink-your-token');
console.log('Token value:', value);
```

### 2. Font-Size Not Matching Design

**Check**:
1. Is there a global CSS rule for `p`, `span`, or other HTML elements?
2. Is text wrapped in semantic HTML tags inside the component?
3. Is the correct component-specific typography token being used?

**Fix**: Render text directly in the styled container, not in `<p>` or `<span>` wrappers.

### 3. Styles Different Between Environments

**Check**:
1. Is Vite HMR working? (Check browser console for update messages)
2. Did you hard refresh? (Cmd+Shift+R / Ctrl+Shift+R)
3. Is there CSS caching? (Clear browser cache)

---

## Future Additions Checklist

When adding new components:

- [ ] Add `@import '../../styles/tokens.css'` to CSS Module
- [ ] Use semantic tokens, not color primitives
- [ ] Check for component-specific typography tokens
- [ ] Avoid wrapping content in semantic HTML tags if precise styling is needed
- [ ] Test with browser DevTools computed styles
- [ ] Verify against Figma design specifications
- [ ] Add inverse token variants for dark theme support
- [ ] Document any new patterns in this file

---

## Resources

- **Token Definitions**: `/src/ink-design-system/styles/tokens.css`
- **Global Styles**: `/src/styles/globals.css` and `/src/index.css`
- **Figma Design System**: [Link to Figma file]
- **Official Ink Docs**: [If available]

---

## Version History

- **2025-10-23**: Initial documentation
  - Added CSS Module import requirements
  - Documented global CSS override issues
  - Added token architecture overview
  - Created AlertBadge case study
  - Listed debugging steps and best practices
