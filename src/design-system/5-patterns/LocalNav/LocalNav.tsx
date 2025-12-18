import React, { useState, useRef, useEffect } from 'react';
import styles from './LocalNav.module.css';
import { Icon } from '../../3-primitives/Icon';
import type { IconName } from '../../3-primitives/Icon';
import { Badge } from '../../3-primitives/Badge';
import { Switch } from '../../3-primitives/Switch';
import { Tooltip } from '../../3-primitives/Tooltip';
import { Button } from '../../3-primitives/Button';
import { IconButton } from '../../3-primitives/IconButton';

export interface LocalNavItem {
  id: string;
  label: string;
  icon?: IconName;
  badge?: string;
  hasMenu?: boolean;
  onMenuClick?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  active?: boolean;
  nested?: boolean;
}

export interface HeaderMenuItem {
  id: string;
  label: string;
  icon?: IconName;
  /** Shows submenu arrow indicator */
  hasSubmenu?: boolean;
  onClick?: () => void;
}

export interface LocalNavSection {
  id: string;
  title?: string;
  icon?: IconName;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  items: LocalNavItem[];
  /** Show as uppercase label header (non-interactive) */
  headerLabel?: boolean;
  /** Action button for header (e.g., "New Folder") */
  headerAction?: {
    icon: IconName;
    label: string;
    onClick: () => void;
  };
}

export interface LocalNavProps {
  /** Header dropdown label */
  headerLabel?: string;
  /** Header icon for collapsed state (defaults to 'plus') */
  headerIcon?: IconName;
  /** Menu items for header dropdown */
  headerMenuItems?: HeaderMenuItem[];
  /** Sections of navigation items */
  sections: LocalNavSection[];
  /** Callback when header dropdown is clicked (only used if no headerMenuItems) */
  onHeaderClick?: () => void;
  /** Active item ID */
  activeItemId?: string;
  /** Custom className */
  className?: string;
  /** Whether the nav is collapsed (icons only) */
  collapsed?: boolean;
  /** Callback when collapsed state changes (for external control) */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Footer toggle for feature flags (e.g., "New navigation") */
  footerToggle?: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon?: IconName;
  };
  /** Footer lock button */
  footerLockButton?: {
    locked: boolean;
    onLockClick: () => void;
  };
}

export const LocalNav: React.FC<LocalNavProps> = ({
  headerLabel = 'Start',
  headerIcon = 'plus',
  headerMenuItems,
  sections,
  onHeaderClick,
  activeItemId,
  className,
  collapsed = false,
  onCollapsedChange,
  footerToggle,
  footerLockButton,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(sections.filter((s) => s.collapsible && !s.defaultExpanded).map((s) => s.id))
  );

  // Determine if nav should show expanded (either not collapsed, or hovered while collapsed)
  const isExpanded = !collapsed || isHovered;

  // Handle mouse enter/leave for hover-to-expand
  const handleMouseEnter = () => {
    if (collapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (collapsed) {
      setIsHovered(false);
      setHeaderMenuOpen(false); // Close menu when leaving collapsed nav
    }
  };

  // Close header menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setHeaderMenuOpen(false);
      }
    };

    if (headerMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [headerMenuOpen]);

  const handleHeaderClick = () => {
    if (headerMenuItems && headerMenuItems.length > 0) {
      setHeaderMenuOpen(!headerMenuOpen);
    } else if (onHeaderClick) {
      onHeaderClick();
    }
  };

  const handleMenuItemClick = (item: HeaderMenuItem) => {
    item.onClick?.();
    setHeaderMenuOpen(false);
  };

  const handleItemClick = (item: LocalNavItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.localNav} ${collapsed ? styles.navCollapsed : ''} ${isHovered ? styles.navHovered : ''} ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className={styles.headerWrapper} ref={headerRef}>
        {isExpanded ? (
          <Button
            kind="primary"
            size="medium"
            fullWidth
            onClick={handleHeaderClick}
            aria-expanded={headerMenuOpen}
            aria-haspopup={headerMenuItems && headerMenuItems.length > 0 ? 'menu' : undefined}
            endElement={
              <span
                className={`${styles.headerChevron} ${headerMenuOpen ? styles.headerChevronRotated : ''}`}
              >
                <Icon name="chevron-down" size="small" />
              </span>
            }
          >
            {headerLabel}
          </Button>
        ) : (
          <Button
            kind="primary"
            size="medium"
            onClick={handleHeaderClick}
            aria-label={headerLabel}
            className={styles.headerButtonCollapsed}
          >
            <Icon name={headerIcon} size="medium" />
          </Button>
        )}

        {/* Header Dropdown Menu */}
        {headerMenuItems && headerMenuItems.length > 0 && headerMenuOpen && isExpanded && (
          <div className={styles.headerMenu} role="menu">
            {headerMenuItems.map((item) => (
              <button
                key={item.id}
                className={styles.headerMenuItem}
                onClick={() => handleMenuItemClick(item)}
                role="menuitem"
              >
                {item.icon && (
                  <span className={styles.headerMenuItemIcon}>
                    <Icon name={item.icon} size="medium" />
                  </span>
                )}
                <span className={styles.headerMenuItemLabel}>{item.label}</span>
                {item.hasSubmenu && (
                  <span className={styles.headerMenuItemArrow}>
                    <Icon name="chevron-right" size="small" />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sections */}
      <div className={styles.sections}>
        {sections.map((section) => {
          const isSectionCollapsed = collapsedSections.has(section.id);

          // Helper to render an item (reused in multiple places)
          const renderItem = (item: LocalNavItem) => {
            const isItemActive = item.active || item.id === activeItemId;
            const isItemHovered = hoveredItemId === item.id;

            // Collapsed nav: show only icon items (skip nested items without icons)
            if (!isExpanded && !item.icon) {
              return null;
            }

            return (
              <li key={item.id}>
                {!isExpanded ? (
                  // Collapsed view: icon only with tooltip
                  <Tooltip content={item.label} side="right">
                    <button
                      className={`${styles.itemCollapsed} ${isItemActive ? styles.active : ''}`}
                      onClick={() => handleItemClick(item)}
                      aria-label={item.label}
                    >
                      {item.icon && <Icon name={item.icon} size="medium" />}
                      {isItemActive && <div className={styles.activeIndicator} />}
                    </button>
                  </Tooltip>
                ) : (
                  // Expanded view: full item
                  <button
                    className={`${styles.item} ${
                      isItemActive ? styles.active : ''
                    } ${isItemHovered ? styles.hovered : ''} ${
                      item.nested ? styles.nested : ''
                    } ${item.hasMenu ? styles.hasMenu : ''}`}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                  >
                    {item.icon && (
                      <span className={styles.itemIcon}>
                        <Icon name={item.icon} size="medium" />
                      </span>
                    )}
                    <Tooltip content={item.label}>
                      <span className={styles.itemLabel}>{item.label}</span>
                    </Tooltip>
                    {item.badge && <Badge variant="subtle">{item.badge}</Badge>}
                    {item.hasMenu && (
                      <span
                        className={styles.menuButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          item.onMenuClick?.(e);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            item.onMenuClick?.(e as any);
                          }
                        }}
                        aria-label="More options"
                      >
                        <Icon name="more-vertical" size="medium" />
                      </span>
                    )}
                    {isItemActive && <div className={styles.activeIndicator} />}
                  </button>
                )}
              </li>
            );
          };

          return (
            <div key={section.id} className={styles.section}>
              {section.headerLabel && section.title ? (
                <>
                  {isExpanded && (
                    <div className={styles.sectionLabelHeader}>
                      <span className={styles.sectionLabel}>{section.title}</span>
                      {section.headerAction && (
                        <IconButton
                          icon={section.headerAction.icon}
                          size="small"
                          onClick={section.headerAction.onClick}
                          aria-label={section.headerAction.label}
                          title={section.headerAction.label}
                        />
                      )}
                    </div>
                  )}
                  <ul className={styles.itemList}>{section.items.map(renderItem)}</ul>
                </>
              ) : section.collapsible && section.title ? (
                <>
                  {isExpanded && (
                    <button
                      className={`${styles.sectionHeader} ${
                        isSectionCollapsed ? styles.collapsed : ''
                      }`}
                      onClick={() => toggleSection(section.id)}
                    >
                      {section.icon && (
                        <span className={styles.sectionIcon}>
                          <Icon name={section.icon} size="medium" />
                        </span>
                      )}
                      <span className={styles.sectionTitle}>{section.title}</span>
                      <span className={styles.sectionChevron}>
                        <Icon name="chevron-down" size="medium" />
                      </span>
                    </button>
                  )}
                  {isExpanded ? (
                    <div
                      className={`${styles.sectionItems} ${
                        isSectionCollapsed ? styles.collapsed : ''
                      }`}
                    >
                      <ul className={styles.itemList}>{section.items.map(renderItem)}</ul>
                    </div>
                  ) : (
                    <ul className={styles.itemList}>{section.items.map(renderItem)}</ul>
                  )}
                </>
              ) : (
                <>
                  {isExpanded && section.title && (
                    <div className={styles.sectionTitle}>{section.title}</div>
                  )}
                  <ul className={styles.itemList}>{section.items.map(renderItem)}</ul>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {(footerToggle || footerLockButton) && (
        <div className={`${styles.footer} ${!isExpanded ? styles.footerCollapsed : ''}`}>
          {isExpanded && footerToggle && (
            <>
              <div className={styles.footerToggle}>
                {footerToggle.icon && (
                  <span className={styles.footerIcon}>
                    <Icon name={footerToggle.icon} size="medium" />
                  </span>
                )}
                <span className={styles.footerLabel}>{footerToggle.label}</span>
              </div>
              <Switch checked={footerToggle.checked} onChange={footerToggle.onChange} />
            </>
          )}
          {footerLockButton && (
            <Tooltip content={footerLockButton.locked ? 'Unlock' : 'Lock'} side="right">
              <IconButton
                icon={footerLockButton.locked ? 'lock' : 'unlock'}
                size="small"
                onClick={footerLockButton.onLockClick}
                aria-label={footerLockButton.locked ? 'Unlock navigation' : 'Lock navigation'}
              />
            </Tooltip>
          )}
        </div>
      )}
    </nav>
  );
};

LocalNav.displayName = 'LocalNav';
