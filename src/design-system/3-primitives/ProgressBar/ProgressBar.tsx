import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './ProgressBar.module.css';

export type ProgressBarSize = 'small' | 'medium' | 'large';
export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error';

export interface ProgressBarProps {
  /** Current progress value (0-100) */
  value?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size of the progress bar */
  size?: ProgressBarSize;
  /** Color variant */
  variant?: ProgressBarVariant;
  /** Show indeterminate/loading state */
  indeterminate?: boolean;
  /** Show label with percentage */
  showLabel?: boolean;
  /** Custom label text (overrides percentage) */
  label?: string;
  /** Show label inside the bar */
  labelInside?: boolean;
  /** Additional className */
  className?: string;
  /** Striped pattern */
  striped?: boolean;
  /** Animate stripes */
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  max = 100,
  size = 'medium',
  variant = 'primary',
  indeterminate = false,
  showLabel = false,
  label,
  labelInside = false,
  className,
  striped = false,
  animated = false,
}) => {
  const percentage = indeterminate ? 100 : Math.min(Math.max((value / max) * 100, 0), 100);
  const displayLabel = label || `${Math.round(percentage)}%`;

  return (
    <div className={cn(styles.container, className)}>
      {showLabel && !labelInside && (
        <div className={styles.labelOuter}>
          <span className={styles.labelText}>{displayLabel}</span>
        </div>
      )}
      <div
        className={cn(
          styles.track,
          styles[size],
          styles[variant]
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            styles.fill,
            indeterminate && styles.indeterminate,
            striped && styles.striped,
            animated && styles.animated
          )}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && labelInside && (
            <span className={styles.labelInner}>{displayLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
};

ProgressBar.displayName = 'InkProgressBar';

export { ProgressBar };
