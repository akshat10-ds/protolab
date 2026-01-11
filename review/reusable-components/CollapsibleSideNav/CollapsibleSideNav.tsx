/**
 * CollapsibleSideNav - Standalone Reusable Component
 *
 * This component provides a collapsible side navigation with lock/unlock functionality.
 * It is extracted from the DocuSign Send application for reuse in other projects.
 *
 * DEPENDENCIES:
 * - @ds/ui: SideNav, Tree, Theme, InkDocuSignTheme, IconButton
 * - @ds/icons: Lock, Unlock
 * - @ds/tokens: inkSpacingTokens
 * - @emotion/react: css
 * - @reduxjs/toolkit: For state management (optional - can use local state)
 *
 * For 100% visual match, ensure you have access to the DocuSign Design System (@ds/ui, @ds/icons, @ds/tokens)
 */

import type { ReactNode } from "react";
import { Lock, Unlock } from "@ds/icons";
import { inkSpacingTokens } from "@ds/tokens";
import { SideNav, Tree, Theme, InkDocuSignTheme, IconButton } from "@ds/ui";
import { css } from "@emotion/react";

// ============================================================================
// STYLES - Exact styles from the original component
// ============================================================================

export const collapsibleSideNavContentStyle = css({
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  overflowX: "hidden",
});

export const collapsibleSideNavToggleButtonContainerStyle = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  textAlign: "right",
});

export const collapsibleSideNavContainerStyle = css({
  height: "100%",
});

// ============================================================================
// TYPES
// ============================================================================

export type CollapsibleSideNavState = {
  isLocked: boolean;
  isHovered: boolean;
};

export type CollapsibleSideNavActions = {
  toggleLock: () => void;
  setHovered: () => void;
  setUnhovered: () => void;
};

export type CollapsibleSideNavProps = {
  /** Content to render inside the side nav (typically Tree with navigation items) */
  children: ReactNode;

  /** Primary action button shown at top of side nav (e.g., "New" button) */
  primaryButton?: ReactNode;

  /** Additional content to render in the toggle button area */
  toggleButtonContent?: ReactNode;

  /** Current lock state - when locked, side nav stays expanded */
  isLocked: boolean;

  /** Current hover state - when hovered (and not locked), side nav expands */
  isHovered: boolean;

  /** Whether collapsibility is enabled. If false, side nav is always expanded */
  allowCollapsibility?: boolean;

  /** Whether in mobile view - affects some behaviors */
  isMobileView?: boolean;

  /** Whether mobile side nav is visible */
  isMobileSideNavVisible?: boolean;

  /** Callback when lock button is clicked */
  onToggleLock: () => void;

  /** Callback when mouse enters the side nav container */
  onMouseEnter: () => void;

  /** Callback when mouse leaves the side nav container */
  onMouseLeave: () => void;

  /** Accessibility label for the lock button when locked */
  lockAccessibilityText?: string;

  /** Accessibility label for the lock button when unlocked */
  unlockAccessibilityText?: string;

  /** Accessibility label for the side nav container */
  containerAriaLabel?: string;

  /** Data attribute for testing */
  dataQa?: string;

  /** Optional namespace for data-qa attributes */
  namespace?: string;

  /** Optional footer content to render at the bottom of the side nav */
  footerContent?: ReactNode;
};

// ============================================================================
// HELPER - Calculate if side nav should be expanded
// ============================================================================

export const calculateIsExpanded = (
  allowCollapsibility: boolean,
  isLocked: boolean,
  isHovered: boolean,
  isMobileView: boolean,
  isMobileSideNavVisible: boolean
): boolean => {
  if (!allowCollapsibility) {
    return true;
  }

  // In mobile view with mobile nav visible, always expand
  if (isMobileSideNavVisible && isMobileView) {
    return true;
  }

  // If locked, always expand
  if (isLocked) {
    return true;
  }

  // Otherwise, expand based on hover state
  return isHovered;
};

// ============================================================================
// COMPONENT
// ============================================================================

const CollapsibleSideNav = ({
  children,
  primaryButton,
  toggleButtonContent,
  isLocked,
  isHovered,
  allowCollapsibility = true,
  isMobileView = false,
  isMobileSideNavVisible = false,
  onToggleLock,
  onMouseEnter,
  onMouseLeave,
  lockAccessibilityText = "Unlock",
  unlockAccessibilityText = "Lock",
  containerAriaLabel = "Navigation sidebar",
  dataQa = "sidenav-container",
  namespace,
  footerContent,
}: CollapsibleSideNavProps) => {
  const isExpanded = calculateIsExpanded(
    allowCollapsibility,
    isLocked,
    isHovered,
    isMobileView,
    isMobileSideNavVisible
  );

  const getDataQa = (suffix: string) => {
    return namespace ? `${namespace}-${suffix}` : suffix;
  };

  return (
    <Theme docuSignTheme={InkDocuSignTheme} enableInkContainerStyles>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        // If user tabs into the collapsible side nav with keyboard, it should expand
        onFocus={onMouseEnter}
        css={[collapsibleSideNavContainerStyle]}
        data-qa={getDataQa(dataQa)}
        aria-label={containerAriaLabel}
        role="navigation"
      >
        <SideNav
          primaryButton={primaryButton}
          // Setting expanded false will make it collapsible, setting it to true will make it always expanded
          expanded={!allowCollapsibility || isExpanded}
          toggleButton={
            allowCollapsibility ? (
              <div
                css={collapsibleSideNavToggleButtonContainerStyle}
                data-qa="side-nav-lock-button"
              >
                {toggleButtonContent}
                {!isMobileView && (
                  <IconButton
                    icon={isLocked ? <Lock /> : <Unlock />}
                    onClick={onToggleLock}
                    accessibilityText={
                      isLocked ? lockAccessibilityText : unlockAccessibilityText
                    }
                  />
                )}
              </div>
            ) : undefined
          }
        >
          <div css={collapsibleSideNavContentStyle}>
            <div css={{ minHeight: 0, flexGrow: 1 }}>
              <Tree data-qa={getDataQa("navigation")}>{children}</Tree>
            </div>
            {footerContent && (
              <div
                css={{
                  padding: inkSpacingTokens.spacingXS,
                }}
              >
                {footerContent}
              </div>
            )}
          </div>
        </SideNav>
      </div>
    </Theme>
  );
};

export default CollapsibleSideNav;
