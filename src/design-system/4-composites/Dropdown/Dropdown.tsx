import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';
import { Icon } from '../../3-primitives/Icon';

export type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';
export type DropdownAlign = 'start' | 'center' | 'end';

export interface DropdownItemProps {
  /** Item label */
  label: string;
  /** Item icon */
  icon?: React.ReactNode;
  /** Item description (secondary text) */
  description?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether the item is a divider */
  divider?: boolean;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Sub-menu items */
  children?: DropdownItemProps[];
  /** Whether this item is selected (shows checkmark) */
  selected?: boolean;
}

export interface DropdownProps {
  /** Menu items */
  items: DropdownItemProps[];
  /** The element that triggers the dropdown */
  children: React.ReactElement;
  /** Position of the dropdown relative to the trigger */
  position?: DropdownPosition;
  /** Alignment of the dropdown */
  align?: DropdownAlign;
  /** Whether the dropdown is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Close on item click */
  closeOnItemClick?: boolean;
  /** Section header text (e.g., "Select a view") */
  header?: string;
  /** Show icons with background box styling */
  iconStyle?: 'default' | 'boxed';
  /** Data QA attribute for testing */
  'data-qa'?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  children,
  position = 'bottom',
  align = 'start',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnItemClick = true,
  header,
  iconStyle = 'default',
  'data-qa': dataQa,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState<number>(-1);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
    if (!newOpen) {
      setActiveIndex(-1);
      setSubmenuOpenIndex(-1);
    }
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !dropdownRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const gap = 4;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - dropdownRect.height - gap;
        break;
      case 'bottom':
        top = triggerRect.bottom + gap;
        break;
      case 'left':
        left = triggerRect.left - dropdownRect.width - gap;
        break;
      case 'right':
        left = triggerRect.right + gap;
        break;
    }

    if (position === 'top' || position === 'bottom') {
      switch (align) {
        case 'start':
          left = triggerRect.left;
          break;
        case 'center':
          left = triggerRect.left + (triggerRect.width - dropdownRect.width) / 2;
          break;
        case 'end':
          left = triggerRect.right - dropdownRect.width;
          break;
      }
    } else {
      switch (align) {
        case 'start':
          top = triggerRect.top;
          break;
        case 'center':
          top = triggerRect.top + (triggerRect.height - dropdownRect.height) / 2;
          break;
        case 'end':
          top = triggerRect.bottom - dropdownRect.height;
          break;
      }
    }

    const padding = 8;
    if (left < padding) left = padding;
    if (left + dropdownRect.width > window.innerWidth - padding) {
      left = window.innerWidth - dropdownRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + dropdownRect.height > window.innerHeight - padding) {
      top = window.innerHeight - dropdownRect.height - padding;
    }

    setCoords({ top, left });
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
    children.props.onClick?.(e);
  };

  const handleItemClick = (item: DropdownItemProps, index: number) => {
    if (item.disabled) return;

    if (item.children && item.children.length > 0) {
      setSubmenuOpenIndex(submenuOpenIndex === index ? -1 : index);
      return;
    }

    item.onClick?.();
    if (closeOnItemClick) {
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const validItems = items.filter((item) => !item.divider && !item.disabled);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev + 1;
          return next >= validItems.length ? 0 : next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? validItems.length - 1 : next;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < validItems.length) {
          const actualIndex = items.indexOf(validItems[activeIndex]);
          handleItemClick(validItems[activeIndex], actualIndex);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  useEffect(() => {
    if (open && activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      calculatePosition();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleUpdate = () => calculatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [open]);

  const renderItem = (item: DropdownItemProps, index: number) => {
    if (item.divider) {
      return <div key={`divider-${index}`} className={styles.divider} />;
    }

    const hasSubmenu = item.children && item.children.length > 0;
    const isSubmenuOpen = submenuOpenIndex === index;
    const iconClassName =
      iconStyle === 'boxed' ? `${styles.icon} ${styles.iconBoxed}` : styles.icon;

    return (
      <button
        key={index}
        ref={(el) => {
          itemRefs.current[index] = el;
        }}
        className={`${styles.item} ${item.disabled ? styles.disabled : ''} ${
          activeIndex === index ? styles.active : ''
        } ${item.selected ? styles.selected : ''}`}
        onClick={() => handleItemClick(item, index)}
        disabled={item.disabled}
        type="button"
        role="menuitem"
        aria-selected={item.selected}
      >
        {item.icon && <span className={iconClassName}>{item.icon}</span>}
        <div className={styles.content}>
          <span className={styles.label}>{item.label}</span>
          {item.description && <span className={styles.description}>{item.description}</span>}
        </div>
        {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
        {hasSubmenu && (
          <span className={styles.arrow}>
            <Icon name="chevron-right" size="small" />
          </span>
        )}
        {item.selected && (
          <span className={styles.checkmark}>
            <Icon name="check" size="small" />
          </span>
        )}
      </button>
    );
  };

  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onClick: handleTriggerClick,
    'aria-expanded': open,
    'aria-haspopup': 'menu',
  });

  return (
    <>
      {trigger}
      {open && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
          role="menu"
          onKeyDown={handleKeyDown}
          data-qa={dataQa}
        >
          {header && <div className={styles.header}>{header}</div>}
          {items.map((item, index) => renderItem(item, index))}
        </div>
      )}
    </>
  );
};

Dropdown.displayName = 'Dropdown';
