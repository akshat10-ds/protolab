import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'subtle' | 'emphasis' | 'success' | 'warning' | 'alert' | 'promo';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  className,
  ...props
}) => {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses} {...props}>
      <span className={styles.text}>{children}</span>
    </span>
  );
};

Badge.displayName = 'Badge';
