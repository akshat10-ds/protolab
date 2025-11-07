import React from 'react';
import styles from './VerticalNavigation.module.css';
import { Icon, Tooltip, IconButton, Button, Dropdown } from '@/design-system';
import type { IconName, DropdownItemProps } from '@/design-system';

export interface NavigationItem {
  id: string;
  label: string;
  icon?: IconName;
  badge?: string;
  items?: NavigationSubItem[];
  actionMenu?: {
    items: DropdownItemProps[];
  };
}

export interface NavigationSubItem {
  id: string;
  label: string;
  icon?: IconName;
  actionMenu?: {
    items: DropdownItemProps[];
  };
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
  /** Context switcher dropdown at top */
  contextSwitcher?: {
    label: string;
    icon?: IconName;
    menuItems: DropdownItemProps[];
  };
  /** Footer controls (e.g., toggle switches, buttons) */
  footerControls?: React.ReactNode;
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
  contextSwitcher,
  footerControls,
  className,
}: VerticalNavigationProps) => {
  const [expandedItemId, setExpandedItemId] = React.useState<string | null>(activeItemId || null);

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

  const containerClasses = [styles.container, collapsed && styles.collapsed, className]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={containerClasses} style={{ width: collapsed ? 64 : width }}>
      {/* Context Switcher */}
      {contextSwitcher && !collapsed && (
        <div className={styles.contextSwitcher}>
          <Dropdown items={contextSwitcher.menuItems} position="bottom" align="start">
            <Button
              kind="secondary"
              size="medium"
              style={{
                width: '100%',
                justifyContent: 'space-between',
                height: '40px',
                padding: '4px 12px 4px 8px',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {contextSwitcher.icon && <Icon name={contextSwitcher.icon} size="small" />}
                {contextSwitcher.label}
              </span>
              <Icon name="chevron-down" size="small" />
            </Button>
          </Dropdown>
        </div>
      )}

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

          const itemContent = (
            <div className={styles.itemRow}>
              {/* Expand/Collapse Button */}
              {hasSubItems && !collapsed && (
                <IconButton
                  icon={isExpanded ? 'chevron-down' : 'chevron-right'}
                  size="small"
                  variant="tertiary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedItemId(isExpanded ? null : item.id);
                  }}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  className={styles.expandButton}
                />
              )}

              {/* Main Item Button */}
              <button
                className={`${styles.item} ${isActive ? styles.itemActive : ''} ${
                  !hasSubItems && !collapsed ? styles.itemNoExpand : ''
                }`}
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
                    {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </>
                )}
              </button>

              {/* Action Menu */}
              {item.actionMenu && !collapsed && (
                <div className={styles.actionMenu}>
                  <Dropdown items={item.actionMenu.items} position="bottom" align="end">
                    <IconButton
                      icon="more-horizontal"
                      size="small"
                      variant="tertiary"
                      aria-label="Actions"
                    />
                  </Dropdown>
                </div>
              )}
            </div>
          );

          return (
            <div key={item.id} className={styles.itemWrapper}>
              {/* Main Item */}
              {collapsed ? (
                <Tooltip content={item.label} placement="right">
                  <button
                    className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.icon && (
                      <div className={styles.itemIcon}>
                        <Icon name={item.icon} size="medium" />
                      </div>
                    )}
                  </button>
                </Tooltip>
              ) : (
                itemContent
              )}

              {/* Sub Items */}
              {!collapsed && hasSubItems && isExpanded && (
                <div className={styles.subItems}>
                  {item.items!.map((subItem) => {
                    const isSubActive = activeSubItemId === subItem.id;
                    return (
                      <div key={subItem.id} className={styles.subItemRow}>
                        <button
                          className={`${styles.subItem} ${isSubActive ? styles.subItemActive : ''}`}
                          onClick={() => handleSubItemClick(item.id, subItem.id)}
                        >
                          {subItem.icon && (
                            <div className={styles.subItemIcon}>
                              <Icon name={subItem.icon} size="small" />
                            </div>
                          )}
                          <span className={styles.subItemLabel}>{subItem.label}</span>
                        </button>
                        {subItem.actionMenu && (
                          <div className={styles.actionMenu}>
                            <Dropdown
                              items={subItem.actionMenu.items}
                              position="bottom"
                              align="end"
                            >
                              <IconButton
                                icon="more-horizontal"
                                size="small"
                                variant="tertiary"
                                aria-label="Actions"
                              />
                            </Dropdown>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Section */}
      {footerControls && !collapsed && <div className={styles.footer}>{footerControls}</div>}
    </nav>
  );
};

VerticalNavigation.displayName = 'VerticalNavigation';
