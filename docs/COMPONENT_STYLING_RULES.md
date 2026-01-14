# Component Styling Rules

This document outlines rules for styling components to ensure consistency with DocuSign production and prevent common issues.

## Core Principles

### 1. Never Style Component Behavior Through External CSS

Components should encapsulate their own styling behavior. Adding CSS classes outside the component that modify its behavior creates inconsistency and maintenance problems.

```css
/* ❌ BAD - Adding behavior outside component */
.myCustomClass {
  opacity: 0.6;
}
.myCustomClass:hover {
  opacity: 1;
}

/* ✅ GOOD - Component handles its own states */
/* If you need a variant, add it TO the component itself */
```

**Why this matters:**
- When developers use `<IconButton>`, they expect consistent behavior
- External CSS overrides break the component contract
- Changes to the component won't apply to externally-styled instances
- Creates "mystery" behavior that's hard to debug

### 2. Trust Component Defaults

Components are designed with production-matching defaults. Don't override them without checking if it's necessary.

```tsx
/* ❌ BAD - Overriding default without checking production */
<IconButton icon="settings" size="small" />

/* ✅ GOOD - Use default (medium matches DocuSign production) */
<IconButton icon="settings" />
```

**Common defaults that match production:**
| Component | Property | Default | Production Value |
|-----------|----------|---------|------------------|
| IconButton | size | `medium` | 40x40px button, 24px icon |
| IconButton | variant | `tertiary` | Transparent bg, dark icon |
| Icon | size | `medium` | 24x24px |

### 3. Be Explicit About State Behavior

When defining component styles, explicitly set properties in ALL states to prevent inheritance issues.

```css
/* ❌ IMPLICIT - Color not specified on hover, could inherit unexpected value */
.tertiary:hover:not(:disabled) {
  background-color: var(--ink-cta-bg-color-tertiary-hover);
}

/* ✅ EXPLICIT - Clear that color doesn't change */
.tertiary:hover:not(:disabled) {
  background-color: var(--ink-cta-bg-color-tertiary-hover);
  color: var(--ink-cta-font-color-tertiary); /* No color change on hover */
}
```

---

## IconButton Specific Rules

### Color Behavior

IconButton icons should **never change color** on hover/active (except for `danger` variant).

| Variant | Default Color | Hover Color | Active Color |
|---------|---------------|-------------|--------------|
| primary | white | white | white |
| brand | white | white | white |
| secondary | `rgba(19,0,50,0.9)` | `rgba(19,0,50,0.9)` | `rgba(19,0,50,0.9)` |
| tertiary | `rgba(19,0,50,0.9)` | `rgba(19,0,50,0.9)` | `rgba(19,0,50,0.9)` |
| danger | red | white | white |

### Opacity Rules

- **Never add opacity to IconButton** except for disabled state
- Disabled state uses `var(--ink-opacity-disabled)`
- No "fade in" effects on hover - icons should always be at full opacity

```css
/* ❌ BAD - Don't do this */
.columnControlButton {
  opacity: 0.6;
}
.columnControlButton:hover {
  opacity: 1;
}

/* ✅ GOOD - IconButton handles opacity internally (disabled only) */
```

### Size Rules

| Size | Button | Icon | Use Case |
|------|--------|------|----------|
| `medium` (default) | 40x40px | 24x24px | **Standard - use this** |
| `small` | 32x32px | 16x16px | Compact layouts only |

**Always use `medium` unless you have a specific reason for `small`.**

---

## Token Usage

### Always Use Design Tokens

```css
/* ❌ BAD - Hardcoded values */
.myElement {
  color: rgba(19, 0, 50, 0.9);
  opacity: 0.6;
}

/* ✅ GOOD - Design tokens */
.myElement {
  color: var(--ink-font-color-default);
  /* Don't add opacity overrides */
}
```

### Color Token Reference

| Token | Value | Use Case |
|-------|-------|----------|
| `--ink-neutral-fade-90` | `rgba(19,0,50,0.9)` | Default icon/text color |
| `--ink-neutral-fade-70` | `rgba(19,0,50,0.7)` | Secondary text |
| `--ink-neutral-fade-60` | `rgba(19,0,50,0.6)` | Placeholder text |
| `--ink-neutral-fade-10` | `rgba(19,0,50,0.1)` | Hover backgrounds |

---

## Validation

Run the validation script to check for common issues:

```bash
npm run validate:component-styles
```

This checks for:
- External CSS adding opacity to components
- Hardcoded colors instead of tokens
- IconButton size overrides that may not be necessary

---

## Common Mistakes & Fixes

### Mistake 1: Adding opacity fade to icons

**Symptom:** Icon appears lighter than production, gets darker on hover

**Cause:** External CSS adding `opacity: 0.6`

**Fix:** Remove opacity override, use IconButton as-is

### Mistake 2: Using small IconButtons

**Symptom:** Icons look thinner/lighter than production

**Cause:** Using `size="small"` (16px icon) instead of default `medium` (24px icon)

**Fix:** Remove `size="small"` prop, use default

### Mistake 3: Inconsistent hover behavior

**Symptom:** Some icons change color on hover, others don't

**Cause:** External CSS or missing explicit color in hover state

**Fix:** Ensure component CSS explicitly sets color in all states

---

## Checklist Before PR

- [ ] No external CSS classes modifying component behavior (opacity, color)
- [ ] Using component defaults unless there's a documented reason not to
- [ ] All colors use design tokens, not hardcoded values
- [ ] Hover/active states explicitly define all properties
- [ ] Validated against DocuSign production visually
- [ ] Ran `npm run validate:component-styles`
