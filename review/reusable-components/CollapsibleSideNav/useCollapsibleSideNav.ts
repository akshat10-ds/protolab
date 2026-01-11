/**
 * useCollapsibleSideNav Hook
 *
 * A custom hook that provides all the state and actions needed for the CollapsibleSideNav component.
 * Can work with Redux or local state depending on your needs.
 */

import { useState, useCallback, useMemo } from "react";

// ============================================================================
// TYPES
// ============================================================================

export type CollapsibleSideNavConfig = {
  /** Whether collapsibility is enabled */
  allowCollapsibility?: boolean;
  /** Whether in mobile view */
  isMobileView?: boolean;
  /** Whether mobile side nav is visible */
  isMobileSideNavVisible?: boolean;
  /** Initial locked state */
  initialLocked?: boolean;
  /** Initial hovered state */
  initialHovered?: boolean;
  /** Callback when lock state changes */
  onLockChange?: (isLocked: boolean) => void;
};

export type CollapsibleSideNavHookReturn = {
  /** Whether the side nav is locked open */
  isLocked: boolean;
  /** Whether the side nav is being hovered */
  isHovered: boolean;
  /** Whether the side nav should be expanded */
  isExpanded: boolean;
  /** Toggle the lock state */
  toggleLock: () => void;
  /** Set hovered state to true */
  setHovered: () => void;
  /** Set hovered state to false */
  setUnhovered: () => void;
  /** Props to spread onto the CollapsibleSideNav component */
  sideNavProps: {
    isLocked: boolean;
    isHovered: boolean;
    onToggleLock: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    allowCollapsibility: boolean;
    isMobileView: boolean;
    isMobileSideNavVisible: boolean;
  };
};

// ============================================================================
// HOOK
// ============================================================================

const useCollapsibleSideNav = (
  config: CollapsibleSideNavConfig = {}
): CollapsibleSideNavHookReturn => {
  const {
    allowCollapsibility = true,
    isMobileView = false,
    isMobileSideNavVisible = false,
    initialLocked = true,
    initialHovered = true,
    onLockChange,
  } = config;

  const [isLocked, setIsLocked] = useState(initialLocked);
  const [isHovered, setIsHovered] = useState(initialHovered);

  const toggleLock = useCallback(() => {
    setIsLocked((prev) => {
      const newValue = !prev;
      onLockChange?.(newValue);
      return newValue;
    });
  }, [onLockChange]);

  const setHovered = useCallback(() => {
    setIsHovered(true);
  }, []);

  const setUnhovered = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Calculate if expanded
  const isExpanded = useMemo(() => {
    if (!allowCollapsibility) {
      return true;
    }

    if (isMobileSideNavVisible && isMobileView) {
      return true;
    }

    if (isLocked) {
      return true;
    }

    return isHovered;
  }, [
    allowCollapsibility,
    isMobileView,
    isMobileSideNavVisible,
    isLocked,
    isHovered,
  ]);

  // Props to spread onto the component
  const sideNavProps = useMemo(
    () => ({
      isLocked,
      isHovered,
      onToggleLock: toggleLock,
      onMouseEnter: setHovered,
      onMouseLeave: setUnhovered,
      allowCollapsibility,
      isMobileView,
      isMobileSideNavVisible,
    }),
    [
      isLocked,
      isHovered,
      toggleLock,
      setHovered,
      setUnhovered,
      allowCollapsibility,
      isMobileView,
      isMobileSideNavVisible,
    ]
  );

  return {
    isLocked,
    isHovered,
    isExpanded,
    toggleLock,
    setHovered,
    setUnhovered,
    sideNavProps,
  };
};

export default useCollapsibleSideNav;
