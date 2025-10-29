/**
 * Design System Utilities
 *
 * This is Layer 2 of the Ink Design System hierarchy.
 * Utilities provide layout and spacing helpers that sit between tokens and components.
 *
 * DEPENDENCIES: Only Layer 1 (Tokens)
 * NO component imports allowed - utilities are foundational layout primitives.
 */

// Layout Utilities
export { Stack } from './Stack';
export type { StackProps } from './Stack';

export { Inline } from './Inline';
export type { InlineProps } from './Inline';

export { Grid } from './Grid';
export type { GridProps } from './Grid';

export { Container } from './Container';
export type { ContainerProps } from './Container';

// Spacing Utilities
export { Spacer } from './Spacer';
export type { SpacerProps } from './Spacer';
