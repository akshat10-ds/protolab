/**
 * TopNav - Reusable Components
 *
 * Export all components, hooks, and utilities for the top navigation/header.
 */

// Main component
export { default as TopNav } from "./TopNav";
export type { TopNavProps } from "./TopNav";

// Re-export types from @ds/components for convenience
export type { HeaderProps, HeaderOnSwitchCallback, HeaderItem } from "./TopNav";

// Hook for simplified setup
export { default as useTopNav } from "./useTopNav";
export type { UseTopNavConfig, UseTopNavReturn } from "./useTopNav";
