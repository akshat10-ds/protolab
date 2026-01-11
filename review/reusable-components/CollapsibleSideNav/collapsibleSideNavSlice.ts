/**
 * CollapsibleSideNav Redux Slice
 *
 * Redux state management for the CollapsibleSideNav component.
 * This provides lock/unlock and hover state management.
 *
 * USAGE:
 * 1. Add this reducer to your Redux store
 * 2. Use the actions to control side nav state
 * 3. Use the selectors to read state in your components
 */

import { createSlice } from "@reduxjs/toolkit";

// ============================================================================
// STATE TYPE
// ============================================================================

export type CollapsibleSideNavState = {
  /** Whether the side nav is locked open (won't collapse on mouse leave) */
  isLocked: boolean;
  /** Whether the mouse is currently hovering over the side nav */
  isHovered: boolean;
  /** Whether the "show more" section is expanded (for additional nav items) */
  showMore: boolean;
};

// ============================================================================
// INITIAL STATE
// ============================================================================

export const initialState: CollapsibleSideNavState = {
  isLocked: true, // Default to locked open
  isHovered: true, // Default to expanded state
  showMore: false,
};

// ============================================================================
// SLICE
// ============================================================================

const collapsibleSideNavSlice = createSlice({
  name: "collapsibleSideNav",
  initialState,
  reducers: {
    /** Toggle the lock state */
    toggleLock: (state) => {
      state.isLocked = !state.isLocked;
    },

    /** Set locked state explicitly */
    setLocked: (state, action: { payload: boolean }) => {
      state.isLocked = action.payload;
    },

    /** Set hovered state to true (mouse entered) */
    setHovered: (state) => {
      state.isHovered = true;
    },

    /** Set hovered state to false (mouse left) */
    setUnhovered: (state) => {
      state.isHovered = false;
    },

    /** Toggle the show more section */
    toggleShowMore: (state) => {
      state.showMore = !state.showMore;
    },

    /** Set show more state explicitly */
    setShowMore: (state, action: { payload: boolean }) => {
      state.showMore = action.payload;
    },

    /** Reset to initial state */
    resetState: () => initialState,
  },
});

// ============================================================================
// ACTIONS
// ============================================================================

export const {
  toggleLock,
  setLocked,
  setHovered,
  setUnhovered,
  toggleShowMore,
  setShowMore,
  resetState,
} = collapsibleSideNavSlice.actions;

// ============================================================================
// SELECTORS
// ============================================================================

type RootStateWithCollapsibleSideNav = {
  collapsibleSideNav: CollapsibleSideNavState;
};

export const selectIsLocked = (state: RootStateWithCollapsibleSideNav) =>
  state.collapsibleSideNav.isLocked;

export const selectIsHovered = (state: RootStateWithCollapsibleSideNav) =>
  state.collapsibleSideNav.isHovered;

export const selectShowMore = (state: RootStateWithCollapsibleSideNav) =>
  state.collapsibleSideNav.showMore;

/**
 * Calculate if the side nav should be expanded based on current state
 */
export const selectIsExpanded = (
  state: RootStateWithCollapsibleSideNav,
  options: {
    allowCollapsibility: boolean;
    isMobileView: boolean;
    isMobileSideNavVisible: boolean;
  }
) => {
  const { allowCollapsibility, isMobileView, isMobileSideNavVisible } = options;
  const { isLocked, isHovered } = state.collapsibleSideNav;

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
};

// ============================================================================
// REDUCER
// ============================================================================

export default collapsibleSideNavSlice.reducer;
