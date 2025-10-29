import React, { forwardRef, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  description?: string;
  hideLabel?: boolean;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      description,
      hideLabel = false,
      indeterminate = false,
      className,
      id,
      disabled,
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const errorId = `${checkboxId}-error`;
    const descriptionId = `${checkboxId}-description`;
    const internalRef = useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const ariaDescribedBy = [
      error ? errorId : null,
      description ? descriptionId : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        <div className={styles.checkboxWrapper}>
          {/* Hidden input - visually hidden but accessible */}
          <input
            ref={internalRef}
            id={checkboxId}
            type="checkbox"
            className={styles.input}
            aria-describedby={ariaDescribedBy || undefined}
            aria-invalid={error ? true : undefined}
            disabled={disabled}
            checked={checked}
            onChange={onChange || (() => {})}
            {...props}
          />

          {/* Label with pseudo-elements for visual checkbox */}
          <label
            htmlFor={checkboxId}
            className={`${styles.label} ${hideLabel ? styles.visuallyHidden : ''} ${
              disabled ? styles.disabled : ''
            } ${error ? styles.error : ''} ${checked ? styles.checked : ''} ${
              indeterminate ? styles.indeterminate : ''
            }`}
          >
            <span>
              <span className={styles.labelText}>
                {label}
              </span>
            </span>
          </label>
        </div>

        {description && !error && (
          <div id={descriptionId} className={styles.description}>
            {description}
          </div>
        )}

        {error && (
          <div id={errorId} className={styles.errorMessage}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
