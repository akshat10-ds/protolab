import React from 'react';
import styles from './DashboardLayout.module.css';

/**
 * DashboardLayout - Application Dashboard Template
 *
 * Layer 6: Starter Layouts
 * Dependencies: Layers 3-5 (Primitives, Composites, Patterns)
 *
 * A complete dashboard layout with sidebar navigation, top bar, and content area.
 * Demonstrates composition of patterns and components.
 */

export interface DashboardLayoutProps {
  /** Navigation component (e.g., VerticalNavigation pattern) */
  navigation?: React.ReactNode;
  /** Top bar content (e.g., GlobalNav pattern) */
  header?: React.ReactNode;
  /** Main content area */
  children: React.ReactNode;
  /** Optional sidebar content */
  sidebar?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  navigation,
  header,
  children,
  sidebar,
  className,
}) => {
  return (
    <div className={`${styles.layout} ${className || ''}`}>
      {navigation && (
        <aside className={styles.navigation}>
          {navigation}
        </aside>
      )}
      <div className={styles.main}>
        {header && (
          <header className={styles.header}>
            {header}
          </header>
        )}
        <div className={styles.content}>
          <div className={styles.contentMain}>
            {children}
          </div>
          {sidebar && (
            <aside className={styles.sidebar}>
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';
