/**
 * useTopNav Hook
 *
 * A helper hook that simplifies setting up the TopNav/Header component
 * with common patterns like profile menu, notifications, and tab navigation.
 */

import { useState, useCallback, useMemo } from "react";
import type { HeaderItem, HeaderProps } from "@ds/components";

// ============================================================================
// TYPES
// ============================================================================

export type UseTopNavConfig = {
  /** Application ID */
  appId: string;
  /** Application name */
  appName: string;
  /** API root URL */
  apiRootUrl: string;
  /** Account GUID */
  accountGuid: string;
  /** Account ID */
  accountId: string;
  /** ME token */
  meToken: string;
  /** Home URL */
  homeUrl: string;
  /** Tab configuration */
  tabs?: Array<{
    id: string;
    text: string;
    href?: string;
  }>;
  /** Initial active tab */
  initialActiveTab?: string;
  /** Enable notifications */
  enableNotifications?: boolean;
  /** Enable tasks */
  enableTasks?: boolean;
  /** Logout handler */
  onLogoff?: () => void;
  /** Account switch handler */
  onAccountSwitch?: () => void;
  /** Tab change handler */
  onTabChange?: (tabId: string) => void;
  /** Home click handler */
  onHomeClick?: () => void;
  /** Notifications click handler */
  onNotificationsClick?: () => void;
  /** Tasks click handler */
  onTasksClick?: () => void;
};

export type UseTopNavReturn = {
  /** Current active tab ID */
  activeTabId: string | undefined;
  /** Set the active tab */
  setActiveTabId: (id: string | undefined) => void;
  /** Props to spread onto TopNav component */
  topNavProps: Partial<HeaderProps>;
};

// ============================================================================
// HOOK
// ============================================================================

const useTopNav = (config: UseTopNavConfig): UseTopNavReturn => {
  const {
    appId,
    appName,
    apiRootUrl,
    accountGuid,
    accountId,
    meToken,
    homeUrl,
    tabs = [],
    initialActiveTab,
    enableNotifications = false,
    enableTasks = false,
    onLogoff,
    onAccountSwitch,
    onTabChange,
    onHomeClick,
    onNotificationsClick,
    onTasksClick,
  } = config;

  const [activeTabId, setActiveTabId] = useState<string | undefined>(
    initialActiveTab
  );

  // Build tab items with click handlers
  const tabItems: HeaderItem[] = useMemo(
    () =>
      tabs.map((tab) => ({
        itemId: tab.id,
        text: tab.text,
        href: tab.href,
        onClick: () => {
          setActiveTabId(tab.id);
          onTabChange?.(tab.id);
        },
      })),
    [tabs, onTabChange]
  );

  // Home click handler
  const handleHomeClick = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      onHomeClick?.();
      resolve(false); // Return false to prevent default navigation
    });
  }, [onHomeClick]);

  // Build notifications config
  const onNotifications = useMemo(() => {
    if (!enableNotifications) return undefined;
    return {
      onClick: () => onNotificationsClick?.(),
    };
  }, [enableNotifications, onNotificationsClick]);

  // Build tasks config
  const onTasks = useMemo(() => {
    if (!enableTasks) return undefined;
    return {
      onClick: () => onTasksClick?.(),
    };
  }, [enableTasks, onTasksClick]);

  // Build the props object
  const topNavProps: Partial<HeaderProps> = useMemo(
    () => ({
      appId,
      appName,
      apiRootUrl,
      accountGuid,
      accountId,
      meToken,
      homeUrl,
      tabItems,
      activeTabId,
      onHomeClick: handleHomeClick,
      onLogoff,
      onAccountSwitch,
      onNotifications,
      onTasks,
      rebrand2024: true,
    }),
    [
      appId,
      appName,
      apiRootUrl,
      accountGuid,
      accountId,
      meToken,
      homeUrl,
      tabItems,
      activeTabId,
      handleHomeClick,
      onLogoff,
      onAccountSwitch,
      onNotifications,
      onTasks,
    ]
  );

  return {
    activeTabId,
    setActiveTabId,
    topNavProps,
  };
};

export default useTopNav;
