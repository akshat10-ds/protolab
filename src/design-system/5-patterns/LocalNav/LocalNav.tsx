import React, { useState } from 'react';
import styles from './LocalNav.module.css';
import { Icon } from '../../3-primitives/Icon';
import type { IconName } from '../../3-primitives/Icon';
import { Badge } from '../../3-primitives/Badge';
import { Switch } from '../../3-primitives/Switch';
import { Tooltip } from '../../3-primitives/Tooltip';

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
  /** Sections of navigation items */
  sections: LocalNavSection[];
  /** Callback when header dropdown is clicked */
  onHeaderClick?: () => void;
  /** Active item ID */
  activeItemId?: string;
  /** Custom className */
  className?: string;
  /** Footer toggle for feature flags (e.g., "New navigation") */
  footerToggle?: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon?: IconName;
  };
}

export const LocalNav: React.FC<LocalNavProps> = ({
  headerLabel = 'Start',
  sections,
  onHeaderClick,
  activeItemId,
  className,
  footerToggle,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(
      sections
        .filter((s) => s.collapsible && !s.defaultExpanded)
        .map((s) => s.id)
    )
  );

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
    <nav className={`${styles.localNav} ${className || ''}`}>
      {/* Header */}
      <div className={styles.headerWrapper}>
        <button className={styles.header} onClick={onHeaderClick}>
          <span className={styles.headerLabel}>{headerLabel}</span>
          <span className={styles.headerIcon}>
            <Icon name="chevron-down" size="small" />
          </span>
        </button>
      </div>

      {/* Sections */}
      <div className={styles.sections}>
        {sections.map((section) => {
          const isCollapsed = collapsedSections.has(section.id);

          return (
            <div key={section.id} className={styles.section}>
              {section.headerLabel && section.title ? (
                <>
                  <div className={styles.sectionLabelHeader}>
                    <span className={styles.sectionLabel}>{section.title}</span>
                    {section.headerAction && (
                      <button
                        className={styles.sectionActionButton}
                        onClick={section.headerAction.onClick}
                        aria-label={section.headerAction.label}
                        title={section.headerAction.label}
                      >
                        <Icon name={section.headerAction.icon} size="medium" />
                      </button>
                    )}
                  </div>
                  <ul className={styles.itemList}>
                    {section.items.map((item) => {
                      const isActive = item.active || item.id === activeItemId;
                      const isHovered = hoveredItemId === item.id;

                      return (
                        <li key={item.id}>
                          <button
                            className={`${styles.item} ${
                              isActive ? styles.active : ''
                            } ${isHovered ? styles.hovered : ''} ${
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
                            {item.badge && (
                              <Badge variant="subtle">{item.badge}</Badge>
                            )}
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
                            {isActive && <div className={styles.activeIndicator} />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : section.collapsible && section.title ? (
                <>
                  <button
                    className={`${styles.sectionHeader} ${
                      isCollapsed ? styles.collapsed : ''
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
                  <div
                    className={`${styles.sectionItems} ${
                      isCollapsed ? styles.collapsed : ''
                    }`}
                    style={{
                      maxHeight: isCollapsed ? '0' : `${section.items.length * 40}px`,
                    }}
                  >
                    <ul className={styles.itemList}>
                      {section.items.map((item) => {
                        const isActive = item.active || item.id === activeItemId;
                        const isHovered = hoveredItemId === item.id;

                        return (
                          <li key={item.id}>
                            <button
                              className={`${styles.item} ${
                                isActive ? styles.active : ''
                              } ${isHovered ? styles.hovered : ''} ${
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
                              <span className={styles.itemLabel}>{item.label}</span>
                              {item.badge && (
                                <Badge variant="subtle">{item.badge}</Badge>
                              )}
                              {item.hasMenu && (
                                <button
                                  className={styles.menuButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    item.onMenuClick?.(e);
                                  }}
                                  aria-label="More options"
                                >
                                  <Icon name="more-vertical" size="medium" />
                                </button>
                              )}
                              {isActive && <div className={styles.activeIndicator} />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {section.title && (
                    <div className={styles.sectionTitle}>{section.title}</div>
                  )}
                  <ul className={styles.itemList}>
                    {section.items.map((item) => {
                      const isActive = item.active || item.id === activeItemId;
                      const isHovered = hoveredItemId === item.id;

                      return (
                        <li key={item.id}>
                          <button
                            className={`${styles.item} ${
                              isActive ? styles.active : ''
                            } ${isHovered ? styles.hovered : ''} ${
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
                            {item.badge && (
                              <Badge variant="subtle">{item.badge}</Badge>
                            )}
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
                            {isActive && <div className={styles.activeIndicator} />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {footerToggle && (
        <div className={styles.footer}>
          <div className={styles.footerToggle}>
            {footerToggle.icon && (
              <span className={styles.footerIcon}>
                <Icon name={footerToggle.icon} size="medium" />
              </span>
            )}
            <span className={styles.footerLabel}>{footerToggle.label}</span>
          </div>
          <Switch
            checked={footerToggle.checked}
            onChange={footerToggle.onChange}
          />
        </div>
      )}
    </nav>
  );
};

LocalNav.displayName = 'LocalNav';
