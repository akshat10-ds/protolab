import React from 'react';
import styles from './Banner.module.css';
import { Icon, IconName } from '../Icon';
import { Button } from '../Button';

export type BannerKind = 'information' | 'danger' | 'success' | 'warning' | 'promo' | 'subtle' | 'neutral';
export type BannerShape = 'square' | 'round';

export interface BannerAction {
  label: string;
  onClick: () => void;
}

export interface BannerProps {
  /** Message content */
  children: React.ReactNode;
  /** Banner kind/variant */
  kind?: BannerKind;
  /** Border shape */
  shape?: BannerShape;
  /** Enable text wrapping */
  lineWrap?: boolean;
  /** Show bottom border */
  bottomBorder?: boolean;
  /** Optional icon */
  icon?: IconName;
  /** Optional action button */
  action?: BannerAction;
  /** Show close button */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Additional className */
  className?: string;
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      children,
      kind = 'information',
      shape = 'square',
      lineWrap = false,
      bottomBorder = false,
      icon,
      action,
      closable = true,
      onClose,
      className,
    },
    ref
  ) => {
    const containerClasses = [
      styles.banner,
      styles[`kind-${kind}`],
      styles[`shape-${shape}`],
      lineWrap && styles.lineWrap,
      bottomBorder && styles.bottomBorder,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClasses} role="status" aria-live="polite">
        <div className={styles.content}>
          <div className={styles.messageWrapper}>
            {icon && (
              <div className={styles.iconWrapper}>
                <Icon name={icon} size="small" />
              </div>
            )}
            <p className={styles.message}>{children}</p>
          </div>
          {action && (
            <Button
              kind="tertiary"
              size="small"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
        </div>
        {closable && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="close" size="small" />
          </button>
        )}
      </div>
    );
  }
);

Banner.displayName = 'Banner';
