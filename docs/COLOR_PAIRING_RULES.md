# Ink Design System - Color Pairing Rules

## Overview
This document defines the official color pairing rules for the Ink Design System. Following these rules ensures proper contrast ratios (WCAG AA compliance), visual consistency, and accessibility.

---

## Font Color Tokens

The following semantic font color tokens are available:

- `--ink-font-default`: Default text on light backgrounds (neutral-fade-90)
- `--ink-font-inverse`: Text on dark/accent backgrounds (white-100)
- `--ink-font-neutral`: Secondary/muted text (neutral-fade-70)
- `--ink-font-neutral-emphasis`: Emphasized neutral text (neutral-100)
- `--ink-font-neutral-subtle`: Subtle/tertiary text (neutral-50)
- `--ink-font-accent`: Accent/brand text (cobalt-100)
- `--ink-font-accent-emphasis`: Strong accent text (cobalt-110)
- `--ink-font-accent-subtle`: Subtle accent text (cobalt-30)
- `--ink-font-success`: Success state text (green-100)
- `--ink-font-error`: Error state text (red-100)
- `--ink-font-warning`: Warning state text (orange-100)
- `--ink-font-disabled`: Disabled state text (neutral-fade-30)
- `--ink-font-placeholder`: Placeholder text (neutral-fade-30)

---

## Background Color Pairing Rules

### 1. Default Backgrounds (Light)

**Background**: `--ink-white-100`, `--ink-neutral-5`, `--ink-neutral-10`

**Text Colors**:
- Primary text: `--ink-font-default` (neutral-fade-90)
- Secondary text: `--ink-font-neutral` (neutral-fade-70)
- Tertiary text: `--ink-font-neutral-subtle` (neutral-50)
- Accent text: `--ink-font-accent` (cobalt-100)

```css
/* Example */
.light-background {
  background-color: var(--ink-white-100);
  color: var(--ink-font-default);
}
```

---

### 2. Accent Backgrounds (Dark)

**Background**: `--ink-cobalt-100`, `--ink-cobalt-110`, `--ink-purple-100`

**Text Colors**:
- ✅ ALWAYS use: `--ink-font-inverse` (white-100)
- ❌ NEVER use: `--ink-font-default` (poor contrast)

```css
/* Example */
.accent-background {
  background-color: var(--ink-cobalt-100);
  color: var(--ink-font-inverse); /* white-100 */
}
```

**Applies to**:
- `bgColorAccent` (cobalt-100)
- `bgColorAccentEmphasis` (cobalt-140)
- Primary buttons
- Brand buttons
- Dark hero sections

---

### 3. Subtle Accent Backgrounds (Light)

**Background**: `--ink-cobalt-10`, `--ink-cobalt-20`, `--ink-purple-10`, `--ink-purple-20`

**Text Colors**:
- Primary text: `--ink-font-default` (neutral-fade-90)
- Accent text: `--ink-font-accent-emphasis` (cobalt-110)

```css
/* Example */
.subtle-accent-background {
  background-color: var(--ink-cobalt-10);
  color: var(--ink-font-default);
}
```

**Applies to**:
- `bgColorAccentSubtle` (cobalt-40)
- `bgColorBrandSubtle` (purple-10)
- Highlighted table rows
- Selected items (inactive state)

---

### 4. Neutral Backgrounds (Medium)

**Background**: `--ink-neutral-20`, `--ink-neutral-30`, `--ink-neutral-40`

**Text Colors**:
- Primary text: `--ink-font-default` (neutral-fade-90)
- Secondary text: `--ink-font-neutral-emphasis` (neutral-100)

```css
/* Example */
.neutral-background {
  background-color: var(--ink-neutral-20);
  color: var(--ink-font-default);
}
```

---

### 5. Status Backgrounds

#### Success
**Background**: `--ink-green-100`, `--ink-green-110`
**Text**: `--ink-font-inverse` (white-100)

**Background**: `--ink-green-10`, `--ink-green-20`
**Text**: `--ink-font-success` (green-100)

#### Error/Danger
**Background**: `--ink-red-100`, `--ink-red-110`
**Text**: `--ink-font-inverse` (white-100)

**Background**: `--ink-red-10`, `--ink-red-20`
**Text**: `--ink-font-error` (red-100)

#### Warning
**Background**: `--ink-orange-100`, `--ink-orange-110`
**Text**: `--ink-font-inverse` (white-100)

**Background**: `--ink-orange-10`, `--ink-orange-20`
**Text**: `--ink-font-warning` (orange-100)

---

## Component-Specific Pairing Rules

### Buttons

| Button Variant | Background Token | Text Token |
|----------------|------------------|------------|
| Brand | `--ink-button-brand-bg` (purple-100) | `--ink-button-brand-text` (white-100) |
| Primary | `--ink-button-primary-bg` (cobalt-100) | `--ink-button-primary-text` (white-100) |
| Secondary | `--ink-button-secondary-bg` (transparent) | `--ink-button-secondary-text` (font-default) |
| Tertiary | `--ink-button-tertiary-bg` (transparent) | `--ink-button-tertiary-text` (font-default) |
| Danger | `--ink-button-danger-bg` (red-100) | `--ink-button-danger-text` (white-100) |

### Badges

| Badge Variant | Background | Text |
|---------------|------------|------|
| Default | `--ink-neutral-20` | `--ink-font-default` |
| Brand | `--ink-purple-10` | `--ink-font-accent-emphasis` |
| Success | `--ink-green-10` | `--ink-font-success` |
| Error | `--ink-red-10` | `--ink-font-error` |
| Warning | `--ink-orange-10` | `--ink-font-warning` |

### Alerts

| Alert Type | Background | Text | Icon |
|------------|------------|------|------|
| Info | `--ink-cobalt-10` | `--ink-font-default` | `--ink-cobalt-100` |
| Success | `--ink-green-10` | `--ink-font-default` | `--ink-green-100` |
| Warning | `--ink-orange-10` | `--ink-font-default` | `--ink-orange-100` |
| Error | `--ink-red-10` | `--ink-font-default` | `--ink-red-100` |

---

## Accessibility Guidelines

### WCAG Contrast Ratios

All color pairings in this design system meet WCAG AA standards:

- **Normal text (under 18pt)**: Minimum 4.5:1 contrast ratio
- **Large text (18pt+ or 14pt bold)**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Testing Color Combinations

Before using any custom color pairing, verify contrast using:
- Chrome DevTools Accessibility Inspector
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Stark plugin for Figma

---

## Quick Reference Chart

### Dark Backgrounds → Use White Text

```css
/* Backgrounds 100+ level require inverse text */
background: var(--ink-cobalt-100);     → color: var(--ink-font-inverse);
background: var(--ink-purple-100);     → color: var(--ink-font-inverse);
background: var(--ink-red-100);        → color: var(--ink-font-inverse);
background: var(--ink-green-100);      → color: var(--ink-font-inverse);
background: var(--ink-orange-100);     → color: var(--ink-font-inverse);
background: var(--ink-neutral-100);    → color: var(--ink-font-inverse);
```

### Light Backgrounds → Use Dark Text

```css
/* Backgrounds 10-40 level use default text */
background: var(--ink-cobalt-10);      → color: var(--ink-font-default);
background: var(--ink-purple-10);      → color: var(--ink-font-default);
background: var(--ink-neutral-10);     → color: var(--ink-font-default);
background: var(--ink-white-100);      → color: var(--ink-font-default);
```

---

## Common Mistakes to Avoid

❌ **DON'T**: Use dark text on dark backgrounds
```css
/* BAD - Poor contrast */
background: var(--ink-cobalt-100);
color: var(--ink-font-default);
```

✅ **DO**: Use inverse text on dark backgrounds
```css
/* GOOD - Proper contrast */
background: var(--ink-cobalt-100);
color: var(--ink-font-inverse);
```

❌ **DON'T**: Use white text on light backgrounds
```css
/* BAD - Invisible text */
background: var(--ink-cobalt-10);
color: var(--ink-white-100);
```

✅ **DO**: Use default text on light backgrounds
```css
/* GOOD */
background: var(--ink-cobalt-10);
color: var(--ink-font-default);
```

---

## Implementation

When building components, always:

1. ✅ Use semantic font tokens (not primitive colors)
2. ✅ Reference this pairing guide
3. ✅ Test with accessibility tools
4. ✅ Consider both light and dark mode (when applicable)
5. ✅ Use the official Ink tokens exclusively

---

## Questions?

For questions or clarifications on color pairing rules, consult:
- This document
- The Ink Design System showcase (Color Pairing section)
- Design system team

**Last Updated**: 2025-01-23
**Version**: 1.0.0
