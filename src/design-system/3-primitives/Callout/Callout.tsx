import React from 'react';
import styles from './Callout.module.css';
import { Icon } from '../Icon';
import { Button } from '../Button';

export type CalloutWidth = 'small' | 'medium' | 'large' | 'xlarge';
export type CalloutAlignment = 'start' | 'center' | 'end';
export type CalloutLocation = 'above' | 'below' | 'before' | 'after';
export type CalloutImagePosition = 'start' | 'top';
export type CalloutGlass = 'none' | 'frost' | 'tint';

export interface CalloutAction {
  label: string;
  onClick: () => void;
}

export interface CalloutProps {
  /** Heading text */
  heading: string;
  /** Body content */
  children: React.ReactNode;
  /** Width variant */
  width?: CalloutWidth;
  /** Text alignment */
  alignment?: CalloutAlignment;
  /** Caret location */
  location?: CalloutLocation;
  /** Image position (when image is provided) */
  imagePosition?: CalloutImagePosition;
  /** Glass effect */
  glass?: CalloutGlass;
  /** Primary action button */
  primaryAction?: CalloutAction;
  /** Secondary action button */
  secondaryAction?: CalloutAction;
  /** Show close button */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Optional image */
  image?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      heading,
      children,
      width = 'large',
      alignment = 'start',
      location = 'above',
      imagePosition = 'start',
      glass = 'none',
      primaryAction,
      secondaryAction,
      closable = true,
      onClose,
      image,
      className,
    },
    ref
  ) => {
    const containerClasses = [
      styles.container,
      styles[`width-${width}`],
      styles[`location-${location}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const calloutClasses = [
      styles.callout,
      styles[`align-${alignment}`],
      styles[`glass-${glass}`],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClasses}>
        {location === 'above' && <div className={styles.caret} />}
        {location === 'before' && <div className={styles.caretBefore} />}

        <div className={calloutClasses}>
          <div className={styles.content}>
            {image && (
              <div className={styles.image}>
                {image}
              </div>
            )}

            <div className={styles.body}>
              <div className={styles.header}>
                <h3 className={styles.heading}>{heading}</h3>
              </div>

              <div className={styles.text}>{children}</div>

              {(primaryAction || secondaryAction) && (
                <div className={styles.footer}>
                  {secondaryAction && (
                    <Button
                      kind="tertiary"
                      size="medium"
                      onClick={secondaryAction.onClick}
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                  {primaryAction && (
                    <Button
                      kind="primary"
                      size="medium"
                      onClick={primaryAction.onClick}
                    >
                      {primaryAction.label}
                    </Button>
                  )}
                </div>
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
        </div>

        {location === 'below' && <div className={styles.caret} />}
        {location === 'after' && <div className={styles.caretAfter} />}
      </div>
    );
  }
);

Callout.displayName = 'Callout';
