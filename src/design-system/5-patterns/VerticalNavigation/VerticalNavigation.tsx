import React from 'react';
import styles from './VerticalNavigation.module.css';
import { Icon } from '../../3-primitives/Icon';
import type { IconName } from '../../3-primitives/Icon';
import { Tooltip } from '../../3-primitives/Tooltip';

export interface NavigationItem {
  id: string;
  label: string;
  icon?: IconName;
  items?: NavigationSubItem[];
}

export interface NavigationSubItem {
  id: string;
  label: string;
  icon?: IconName;
}

export interface VerticalNavigationProps {
  /** Navigation items with optional sub-items */
  items: NavigationItem[];
  /** Currently active item ID */
  activeItemId?: string;
  /** Currently active sub-item ID */
  activeSubItemId?: string;
  /** Callback when item is clicked */
  onItemClick?: (itemId: string) => void;
  /** Callback when sub-item is clicked */
  onSubItemClick?: (itemId: string, subItemId: string) => void;
  /** Whether to show the navigation in collapsed state */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width of the navigation */
  width?: number;
  /** Application logo/branding */
  logo?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export const VerticalNavigation = ({
  items,
  activeItemId,
  activeSubItemId,
  onItemClick,
  onSubItemClick,
  collapsed = false,
  onCollapsedChange,
  width = 280,
  logo,
  footer,
  className,
}: VerticalNavigationProps) => {
  const [expandedItemId, setExpandedItemId] = React.useState<string | null>(
    activeItemId || null
  );

  React.useEffect(() => {
    if (activeItemId) {
      setExpandedItemId(activeItemId);
    }
  }, [activeItemId]);

  const handleItemClick = (item: NavigationItem) => {
    if (item.items && item.items.length > 0) {
      // Toggle expansion if item has sub-items
      setExpandedItemId(expandedItemId === item.id ? null : item.id);
    }
    onItemClick?.(item.id);
  };

  const handleSubItemClick = (itemId: string, subItemId: string) => {
    onSubItemClick?.(itemId, subItemId);
  };

  const containerClasses = [
    styles.container,
    collapsed && styles.collapsed,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={containerClasses} style={{ width: collapsed ? 64 : width }}>
      {/* Logo Section */}
      {logo && (
        <div className={styles.logo}>
          {logo}
          {/* Collapse Toggle Button */}
          <button
            className={styles.collapseButton}
            onClick={() => onCollapsedChange?.(!collapsed)}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} size="small" />
          </button>
        </div>
      )}

      {/* Navigation Items */}
      <div className={styles.items}>
        {items.map((item) => {
          const isActive = activeItemId === item.id;
          const isExpanded = expandedItemId === item.id;
          const hasSubItems = item.items && item.items.length > 0;

          const itemButton = (
            <button
              className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && (
                <div className={styles.itemIcon}>
                  <Icon name={item.icon} size="medium" />
                </div>
              )}
              {!collapsed && (
                <>
                  <span className={styles.itemLabel}>{item.label}</span>
                  {hasSubItems && (
                    <div
                      className={`${styles.itemChevron} ${
                        isExpanded ? styles.itemChevronExpanded : ''
                      }`}
                    >
                      <Icon name="chevron-down" size="small" />
                    </div>
                  )}
                </>
              )}
            </button>
          );

          return (
            <div key={item.id} className={styles.itemWrapper}>
              {/* Main Item */}
              {collapsed ? (
                <Tooltip content={item.label} placement="right">
                  {itemButton}
                </Tooltip>
              ) : (
                itemButton
              )}

              {/* Sub Items */}
              {!collapsed && hasSubItems && isExpanded && (
                <div className={styles.subItems}>
                  {item.items!.map((subItem) => {
                    const isSubActive = activeSubItemId === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        className={`${styles.subItem} ${
                          isSubActive ? styles.subItemActive : ''
                        }`}
                        onClick={() => handleSubItemClick(item.id, subItem.id)}
                      >
                        {subItem.icon && (
                          <div className={styles.subItemIcon}>
                            <Icon name={subItem.icon} size="small" />
                          </div>
                        )}
                        <span className={styles.subItemLabel}>{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Section */}
      {footer && !collapsed && <div className={styles.footer}>{footer}</div>}
    </nav>
  );
};

VerticalNavigation.displayName = 'VerticalNavigation';
