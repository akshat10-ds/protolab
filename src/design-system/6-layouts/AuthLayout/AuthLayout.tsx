import React from 'react';
import styles from './AuthLayout.module.css';

/**
 * AuthLayout - Authentication Page Template
 *
 * Layer 6: Starter Layouts
 * Dependencies: Layers 3-5 (Primitives, Composites, Patterns)
 *
 * A centered layout for login, signup, and authentication flows.
 */

export interface AuthLayoutProps {
  /** Main form/auth content */
  children: React.ReactNode;
  /** Optional logo/brand element */
  logo?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Background variant */
  variant?: 'default' | 'split' | 'minimal';
  /** Additional className */
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  logo,
  footer,
  variant = 'default',
  className,
}) => {
  return (
    <div className={`${styles.layout} ${styles[variant]} ${className || ''}`}>
      {variant === 'split' && (
        <div className={styles.splitSide}>
          <div className={styles.splitContent}>
            {logo && <div className={styles.splitLogo}>{logo}</div>}
          </div>
        </div>
      )}
      <div className={styles.main}>
        <div className={styles.container}>
          {variant !== 'split' && logo && (
            <div className={styles.logo}>{logo}</div>
          )}
          <div className={styles.content}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
