/**
 * CollapsibleSideNav - Reusable Components
 *
 * Export all components, hooks, and utilities for the collapsible side navigation.
 */

// Main component
export { default as CollapsibleSideNav } from "./CollapsibleSideNav";
export type { CollapsibleSideNavProps } from "./CollapsibleSideNav";
export {
  collapsibleSideNavContentStyle,
  collapsibleSideNavToggleButtonContainerStyle,
  collapsibleSideNavContainerStyle,
  calculateIsExpanded,
} from "./CollapsibleSideNav";

// Navigation item component
export { default as SideNavItem } from "./SideNavItem";
export type { SideNavItemProps } from "./SideNavItem";
export {
  childPageItemsOnCollapsibleSideNav,
  parentPageItemsOnCollapsibleSideNav,
  backgroundShadingForSelectedItemInCollapsibleSideNav,
} from "./SideNavItem";

// Hook for state management (local state version)
export { default as useCollapsibleSideNav } from "./useCollapsibleSideNav";
export type { CollapsibleSideNavConfig, CollapsibleSideNavHookReturn } from "./useCollapsibleSideNav";

// Redux slice for state management
export {
  default as collapsibleSideNavReducer,
  toggleLock,
  setLocked,
  setHovered,
  setUnhovered,
  toggleShowMore,
  setShowMore,
  resetState,
  selectIsLocked,
  selectIsHovered,
  selectShowMore,
  selectIsExpanded,
  initialState as collapsibleSideNavInitialState,
} from "./collapsibleSideNavSlice";
export type { CollapsibleSideNavState } from "./collapsibleSideNavSlice";
