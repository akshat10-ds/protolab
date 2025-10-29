import React from 'react';
import styles from './StatusLight.module.css';

export type StatusLightKind = 'neutral' | 'success' | 'warning' | 'alert';

export interface StatusLightProps {
  /** The status type/variant */
  kind?: StatusLightKind;
  /** Optional text label */
  children?: React.ReactNode;
  /** Show background fill */
  filled?: boolean;
  /** Additional className */
  className?: string;
}

export const StatusLight = React.forwardRef<HTMLDivElement, StatusLightProps>(
  (
    {
      kind = 'neutral',
      children,
      filled = true,
      className,
    },
    ref
  ) => {
    const containerClasses = [
      styles.statusLight,
      styles[kind],
      filled && styles.filled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClasses}>
        <div className={styles.dotContainer}>
          <div className={styles.dot} />
        </div>
        {children && (
          <span className={styles.text}>{children}</span>
        )}
      </div>
    );
  }
);

StatusLight.displayName = 'StatusLight';
