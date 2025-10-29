# Layer 1: Design System Tokens

**Foundation layer of the Ink Design System hierarchy.**

## Purpose

Tokens are the atomic design decisions that define the visual language of the design system. They include:

- Colors (primitives and semantic)
- Typography (fonts, sizes, weights, line heights)
- Spacing
- Border radius
- Shadows and elevation
- Animation timings
- Focus ring styles

## Hierarchy Rules

### ✅ Allowed

- Define CSS custom properties (CSS variables)
- Reference external assets (fonts, etc.)
- No component dependencies

### ❌ NOT Allowed

- Import any components from other layers
- Import utilities or helpers
- Contain React/JS logic (tokens are CSS only)

## Token Organization

### 1. Color Primitives
Base color scales that define the raw color palette:
- `--ink-cobalt-*` (10-140)
- `--ink-neutral-*` (10-140)
- `--ink-red-*` (10-140)
- `--ink-green-*` (10-140)
- `--ink-ecru-*` (10-140)

### 2. Semantic Tokens
Purpose-driven tokens that reference primitives:
- `--ink-font-*` - Typography colors
- `--ink-bg-*` - Background colors
- `--ink-border-*` - Border colors
- `--ink-message-*` - Feedback/alert states
- `--ink-bar-*` - Progress indicators
- `--ink-elevation-*` - Shadows and depth
- `--ink-focus-*` - Focus rings

### 3. Component-Specific Tokens
Typography and sizing tokens scoped to components:
- `--ink-font-badge-size`
- `--ink-font-button-size`
- etc.

## Usage

All CSS Module files in higher layers MUST import tokens at the top:

```css
@import '../1-tokens/tokens.css';

.myComponent {
  /* ✅ Use semantic tokens */
  background: var(--ink-bg-primary);
  color: var(--ink-font-primary);

  /* ❌ Don't use primitives directly */
  background: var(--ink-cobalt-90);
}
```

## Dark Mode Support

Most tokens have `-inverse` variants for dark theme:
- `--ink-bg-primary` → `--ink-bg-primary-inverse`
- `--ink-font-primary` → `--ink-font-primary-inverse`

## Approval Gate

**Before modifying tokens:**
- Tokens affect the entire design system
- Changes should be reviewed with design team
- Document reasoning for new tokens
- Consider impact on existing components
