import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
  /** The label text for the slider */
  label: string;
  /** Hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean;
  /** Description text shown below the label */
  description?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Show the current value next to the slider */
  showValue?: boolean;
  /** Show tooltip on hover/drag */
  showTooltip?: boolean;
  /** Element to display at the start of the slider (e.g., icon) */
  startElement?: React.ReactNode;
  /** Element to display at the end of the slider (e.g., icon) */
  endElement?: React.ReactNode;
  /** Custom formatter for tooltip value */
  formatTooltip?: (value: number) => string;
  /** ID for the slider input */
  id?: string;
  /** Custom width for the slider wrapper */
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
      showTooltip: showTooltipProp = true,
      startElement,
      endElement,
      formatTooltip,
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

    const wrapperClasses = [styles.wrapper, disabled && styles.disabled].filter(Boolean).join(' ');

    const labelClasses = [styles.label, hideLabel && styles.visuallyHidden]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [styles.container, showValue && styles.withValue]
      .filter(Boolean)
      .join(' ');

    const sliderClasses = [styles.slider].filter(Boolean).join(' ');

    // Track fill classes based on state
    const trackFilledClasses = [
      styles.trackFilled,
      isHovering && !disabled && !isDragging && styles.hover,
      isDragging && !disabled && styles.active,
    ]
      .filter(Boolean)
      .join(' ');

    const shouldShowTooltip = showTooltipProp && (isHovering || isDragging) && !disabled;

    // Format the tooltip value
    const tooltipValue = formatTooltip ? formatTooltip(value) : `${value}%`;

    return (
      <div className={wrapperClasses} style={width ? { width } : undefined}>
        <label htmlFor={sliderId} className={labelClasses}>
          {label}
        </label>

        {description && (
          <div id={descriptionId} className={styles.description}>
            {description}
          </div>
        )}

        <div className={containerClasses}>
          {startElement && <div className={styles.startElement}>{startElement}</div>}

          <div
            className={styles.sliderContainer}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className={styles.track} ref={trackRef}>
              {/* Stop indicator at end of track */}
              <div className={styles.stopIndicator} />
              {/* Filled track */}
              <div className={trackFilledClasses} style={{ width: `${percentage}%` }} />
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
            {shouldShowTooltip && (
              <div className={styles.tooltip} style={{ left: `${percentage}%` }}>
                {tooltipValue}
              </div>
            )}
          </div>

          {endElement && <div className={styles.endElement}>{endElement}</div>}

          {showValue && <div className={styles.valueDisplay}>{value}</div>}
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
