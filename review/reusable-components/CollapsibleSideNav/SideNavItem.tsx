/**
 * SideNavItem - Standalone Reusable Component
 *
 * A navigation item component that works within the CollapsibleSideNav.
 * Handles visibility when side nav is collapsed and provides consistent styling.
 */

import type { MouseEvent } from "react";
import { Tree, SideNav } from "@ds/ui";
import type { SideNavItemProps as DSUISideNavItemProps } from "@ds/ui";
import { inkBorderTokens, inkFontTokens } from "@ds/tokens";
import { css } from "@emotion/react";

// Get the icon type from DSUISideNavItemProps
type IconType = DSUISideNavItemProps["startElement"];

// ============================================================================
// STYLES - Exact styles from the original component
// ============================================================================

export const childPageItemsOnCollapsibleSideNav = css({
  "& span": {
    paddingInlineStart: "20px",
    ...inkFontTokens.fontBodyS,
    lineHeight: "1.25",
  },
});

export const parentPageItemsOnCollapsibleSideNav = css({
  paddingInlineStart: "4px", // inkSpacingTokens.spacingXXS
});

export const backgroundShadingForSelectedItemInCollapsibleSideNav = css({
  backgroundColor: inkBorderTokens.borderColorSubtle,
});

// ============================================================================
// TYPES
// ============================================================================

export type SideNavItemProps = {
  /** Display text for the nav item */
  text: string;
  /** Data attribute for testing */
  dataQa: string;
  /** Icon to display (for parent items) - use icons from @ds/icons */
  icon?: IconType;
  /** Whether this item is currently selected */
  selected: boolean;
  /** Click handler */
  onClick: (e: MouseEvent) => void;
  /** Whether this is a child/nested navigation item */
  isChildPage?: boolean;
  /** Whether the side nav is currently expanded */
  isExpanded?: boolean;
  /** Whether to use SideNav.Item (true) or Tree.Item (false) */
  useSideNavItem?: boolean;
  /** Optional analytics callback */
  onAnalytics?: (folderName: string) => void;
  /** Folder name for analytics */
  folderName?: string;
};

// ============================================================================
// COMPONENT
// ============================================================================

const SideNavItem = ({
  onClick,
  text,
  dataQa,
  selected,
  icon,
  isChildPage = false,
  isExpanded = true,
  useSideNavItem = true,
  onAnalytics,
  folderName = "",
}: SideNavItemProps) => {
  // Hide child page items when the collapsible side nav is collapsed
  if (useSideNavItem && isChildPage && !isExpanded) {
    return null;
  }

  const handleClick = (e: MouseEvent) => {
    onClick(e);
    if (onAnalytics && folderName) {
      onAnalytics(folderName);
    }
  };

  // Use SideNav.Item for the newer collapsible side nav pattern
  if (useSideNavItem) {
    return (
      <div
        data-qa={`${dataQa}-label-text`}
        css={[
          isChildPage
            ? childPageItemsOnCollapsibleSideNav
            : parentPageItemsOnCollapsibleSideNav,
          selected && backgroundShadingForSelectedItemInCollapsibleSideNav,
        ]}
      >
        <SideNav.Item
          text={text}
          data-qa={`${dataQa}-label`}
          selected={selected}
          onClick={handleClick}
          // Icons for child pages are hidden per the design
          startElement={isChildPage ? undefined : icon}
        />
      </div>
    );
  }

  // Fallback to Tree.Item for legacy pattern
  return (
    <Tree.Item
      text={text}
      data-qa={`${dataQa}-label`}
      selected={selected}
      onClick={handleClick}
    />
  );
};

export default SideNavItem;
