# Improvement: Text Component className Handling

## Issue

When passing a `className` to the Text component, the component's internal styles (from Typography.module.css) can override the custom className due to CSS specificity.

### Example Problem

```tsx
// In AIChat.tsx (Layer 5 Pattern)
<Text variant="heading" className={styles.greetingName}>
  Hello, Akshat
</Text>
```

```css
/* In AIChat.module.css */
.greetingName {
  font-size: var(--ink-font-size-2xl);  /* Won't apply! */
  font-weight: var(--ink-font-weight-bold);  /* Won't apply! */
  color: var(--ink-font-accent);  /* Won't apply! */
}
```

The Text component applies classes like `_size-md_xxx` and `_weight-regular_xxx` which have the same specificity as `.greetingName`, and depending on CSS load order, the Text classes win.

### Current Workaround

Using `!important`:

```css
.greetingName {
  font-size: var(--ink-font-size-2xl) !important;
  font-weight: var(--ink-font-weight-bold) !important;
  color: var(--ink-font-accent) !important;
}
```

This is acceptable for Pattern-level (Layer 5) overrides of Primitive (Layer 3) components, but it's not ideal.

## Proposed Solutions

### Option 1: Higher Specificity for User className

Apply user's className with a wrapper that increases specificity:

```tsx
// In Text component
<span className={cn(styles.text, sizeClass, weightClass)}>
  <span className={className}>{children}</span>
</span>
```

**Pros**: User className always wins
**Cons**: Extra DOM element

### Option 2: CSS Custom Properties for Overrides

Expose CSS custom properties that users can set:

```css
/* In Typography.module.css */
.text {
  font-size: var(--text-font-size, var(--ink-font-size-md));
  font-weight: var(--text-font-weight, var(--ink-font-weight-regular));
  color: var(--text-color, inherit);
}
```

```css
/* User can override via custom properties */
.greetingName {
  --text-font-size: var(--ink-font-size-2xl);
  --text-font-weight: var(--ink-font-weight-bold);
  --text-color: var(--ink-font-accent);
}
```

**Pros**: Clean, no !important, follows CSS cascade
**Cons**: Requires updating Text component

### Option 3: "unstyled" Variant

Add an `unstyled` prop that removes all default styling:

```tsx
<Text unstyled className={styles.greetingName}>
  Hello, Akshat
</Text>
```

**Pros**: Explicit opt-out
**Cons**: Loses all Text component styling, user must provide everything

### Option 4: Apply User className Last with :where()

Use `:where()` to reduce specificity of internal styles:

```css
/* In Typography.module.css */
:where(.text.size-md) {
  font-size: var(--ink-font-size-md);
}
```

`:where()` has 0 specificity, so any user className will win.

**Pros**: Most elegant solution
**Cons**: Requires browser support (all modern browsers support it)

## Recommendation

**Option 4 (:where())** is the most elegant solution for new projects. For backward compatibility, **Option 2 (CSS Custom Properties)** provides a good upgrade path.

## Affected Components

This issue likely affects all Primitive components that accept `className`:
- Text
- Heading
- Button
- Input
- Card
- Badge
- etc.

## Priority

Medium - Current `!important` workaround is acceptable for pattern-level overrides, but a cleaner solution would improve DX.

## Related

- CSS Specificity: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
- :where() pseudo-class: https://developer.mozilla.org/en-US/docs/Web/CSS/:where
