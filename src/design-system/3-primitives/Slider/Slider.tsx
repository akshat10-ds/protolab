import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
  label: string;
  hideLabel?: boolean;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  id?: string;
  width?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      hideLabel = false,
      description,
      min = 0,
      max = 100,
      step = 1,
      value,
      onChange,
      disabled = false,
      showValue = false,
      id,
      width,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const sliderId = id || generatedId;
    const descriptionId = `${sliderId}-description`;
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLInputElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => sliderRef.current!);

    // Calculate percentage for visual feedback
    const percentage = ((value - min) / (max - min)) * 100;

    // Handle value changes from slider
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const newValue = parseFloat(e.target.value);
        onChange(newValue);
      },
      [disabled, onChange]
    );

    // Handle keyboard input
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        let newValue = value;
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowDown':
            e.preventDefault();
            newValue = Math.max(min, value - step);
            break;
          case 'ArrowRight':
          case 'ArrowUp':
            e.preventDefault();
            newValue = Math.min(max, value + step);
            break;
          case 'Home':
            e.preventDefault();
            newValue = min;
            break;
          case 'End':
            e.preventDefault();
            newValue = max;
            break;
          default:
            return;
        }

        onChange(newValue);
      },
      [disabled, value, min, max, step, onChange]
    );

    // Mouse event handlers
    const handleMouseDown = useCallback(() => {
      if (!disabled) {
        setIsDragging(true);
      }
    }, [disabled]);

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDragging, handleMouseUp]);

    const wrapperClasses = [
      styles.wrapper,
    ].filter(Boolean).join(' ');

    const labelClasses = [
      styles.label,
      hideLabel && styles.visuallyHidden,
      disabled && styles.disabled,
    ].filter(Boolean).join(' ');

    const containerClasses = [
      styles.container,
      showValue && styles.withValue,
    ].filter(Boolean).join(' ');

    const sliderClasses = [
      styles.slider,
      disabled && styles.disabled,
    ].filter(Boolean).join(' ');

    const showTooltip = (isHovering || isDragging) && !disabled;

    return (
      <div className={wrapperClasses} style={{ width }}>
        <label htmlFor={sliderId} className={labelClasses}>
          {label}
        </label>

        {description && (
          <div id={descriptionId} className={styles.description}>
            {description}
          </div>
        )}

        <div className={containerClasses}>
          <div
            className={styles.sliderContainer}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className={styles.track} ref={trackRef}>
              <div
                className={styles.trackFilled}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <input
              ref={sliderRef}
              type="range"
              id={sliderId}
              className={sliderClasses}
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onMouseDown={handleMouseDown}
              disabled={disabled}
              aria-describedby={description ? descriptionId : undefined}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
            />

            {/* Tooltip on hover/drag */}
            {showTooltip && (
              <div
                className={styles.tooltip}
                style={{ left: `${percentage}%` }}
              >
                {value}
              </div>
            )}
          </div>

          {showValue && (
            <div className={styles.valueDisplay}>
              {value}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
