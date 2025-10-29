import React from 'react';
import styles from './GlobalNav.module.css';
import { Avatar } from '../../3-primitives/Avatar';
import { Icon } from '../../3-primitives/Icon';
import type { IconName } from '../../3-primitives/Icon';

export interface GlobalNavItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface GlobalNavProps {
  /** Logo element (image or component) */
  logo?: React.ReactNode;
  /** Navigation items */
  navItems?: GlobalNavItem[];
  /** Show app switcher icon */
  showAppSwitcher?: boolean;
  /** App switcher click handler */
  onAppSwitcherClick?: () => void;
  /** Show search icon */
  showSearch?: boolean;
  /** Search click handler */
  onSearchClick?: () => void;
  /** Show notifications */
  showNotifications?: boolean;
  /** Notification click handler */
  onNotificationClick?: () => void;
  /** Notification count */
  notificationCount?: number;
  /** Show settings */
  showSettings?: boolean;
  /** Settings click handler */
  onSettingsClick?: () => void;
  /** User info for avatar */
  user?: {
    name: string;
    avatar?: string;
  };
  /** User menu items */
  onUserMenuClick?: () => void;
  /** Additional className */
  className?: string;
}

export const GlobalNav = ({
  logo,
  navItems = [],
  showAppSwitcher = true,
  onAppSwitcherClick,
  showSearch = false,
  onSearchClick,
  showNotifications = false,
  onNotificationClick,
  notificationCount,
  showSettings = false,
  onSettingsClick,
  user,
  onUserMenuClick,
  className,
}: GlobalNavProps) => {
  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  return (
    <header className={containerClasses}>
      {/* Left Section */}
      <div className={styles.start}>
        {/* Product Section */}
        <div className={styles.product}>
          {/* App Switcher */}
          {showAppSwitcher && (
            <button
              className={styles.appSwitcher}
              onClick={onAppSwitcherClick}
              aria-label="App switcher"
            >
              <Icon name="menu" size="medium" />
            </button>
          )}

          {/* Logo */}
          {logo && <div className={styles.logo}>{logo}</div>}
        </div>

        {/* Navigation Items */}
        {navItems.length > 0 && (
          <nav className={styles.navigation}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href || '#'}
                className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Right Section */}
      <div className={styles.end}>
        {/* Search */}
        {showSearch && (
          <button
            className={styles.iconButton}
            onClick={onSearchClick}
            aria-label="Search"
          >
            <Icon name="search" size="medium" />
          </button>
        )}

        {/* Notifications */}
        {showNotifications && (
          <button
            className={styles.iconButton}
            onClick={onNotificationClick}
            aria-label="Notifications"
          >
            <Icon name="bell" size="medium" />
            {notificationCount !== undefined && notificationCount > 0 && (
              <span className={styles.badge}>{notificationCount > 99 ? '99+' : notificationCount}</span>
            )}
          </button>
        )}

        {/* Settings */}
        {showSettings && (
          <button
            className={styles.iconButton}
            onClick={onSettingsClick}
            aria-label="Settings"
          >
            <Icon name="settings" size="medium" />
          </button>
        )}

        {/* Help Menu */}
        <button className={styles.iconButton} aria-label="Help">
          <Icon name="help" size="medium" />
        </button>

        {/* User Avatar */}
        {user && (
          <button className={styles.avatarButton} onClick={onUserMenuClick} aria-label="User menu">
            <Avatar name={user.name} src={user.avatar} size="small" />
          </button>
        )}
      </div>
    </header>
  );
};

GlobalNav.displayName = 'GlobalNav';
