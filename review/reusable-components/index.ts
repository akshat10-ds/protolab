/**
 * Reusable Components
 *
 * This module exports standalone, reusable UI components extracted from the
 * DocuSign Send application. These components maintain 100% visual fidelity
 * with the original implementation.
 *
 * Components included:
 * - CollapsibleSideNav: A side navigation that can collapse/expand with lock functionality
 * - TopNav: The global header/top navigation bar
 */

// CollapsibleSideNav exports
export {
  CollapsibleSideNav,
  SideNavItem,
  useCollapsibleSideNav,
  collapsibleSideNavReducer,
  // Actions
  toggleLock,
  setLocked,
  setHovered,
  setUnhovered,
  toggleShowMore,
  setShowMore,
  resetState,
  // Selectors
  selectIsLocked,
  selectIsHovered,
  selectShowMore,
  selectIsExpanded,
  // Styles
  collapsibleSideNavContentStyle,
  collapsibleSideNavToggleButtonContainerStyle,
  collapsibleSideNavContainerStyle,
  childPageItemsOnCollapsibleSideNav,
  parentPageItemsOnCollapsibleSideNav,
  backgroundShadingForSelectedItemInCollapsibleSideNav,
  calculateIsExpanded,
  collapsibleSideNavInitialState,
} from "./CollapsibleSideNav";

export type {
  CollapsibleSideNavProps,
  CollapsibleSideNavState,
  CollapsibleSideNavConfig,
  CollapsibleSideNavHookReturn,
  SideNavItemProps,
} from "./CollapsibleSideNav";

// TopNav exports
export { TopNav, useTopNav } from "./TopNav";

export type {
  TopNavProps,
  HeaderProps,
  HeaderOnSwitchCallback,
  HeaderItem,
  UseTopNavConfig,
  UseTopNavReturn,
} from "./TopNav";
