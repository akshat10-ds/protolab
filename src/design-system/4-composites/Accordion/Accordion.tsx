import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './Accordion.module.css';
import { Icon } from '../../3-primitives/Icon';

export interface AccordionItemData {
  /** Unique identifier */
  id: string;
  /** Title/header text */
  title: string;
  /** Content to display when expanded */
  content: React.ReactNode;
  /** Icon to display before title */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItemData[];
  /** Allow multiple panels open at once */
  allowMultiple?: boolean;
  /** Default open items (controlled) */
  defaultOpenItems?: string[];
  /** Open items (controlled) */
  openItems?: string[];
  /** Callback when items change */
  onOpenItemsChange?: (openItems: string[]) => void;
  /** Additional className */
  className?: string;
  /** Show border around accordion */
  bordered?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  openItems: controlledOpenItems,
  onOpenItemsChange,
  className,
  bordered = true,
}) => {
  const [internalOpenItems, setInternalOpenItems] = React.useState<string[]>(defaultOpenItems);
  const isControlled = controlledOpenItems !== undefined;
  const openItems = isControlled ? controlledOpenItems : internalOpenItems;

  const toggleItem = (itemId: string) => {
    let newOpenItems: string[];

    if (openItems.includes(itemId)) {
      // Close the item
      newOpenItems = openItems.filter((id) => id !== itemId);
    } else {
      // Open the item
      if (allowMultiple) {
        newOpenItems = [...openItems, itemId];
      } else {
        newOpenItems = [itemId];
      }
    }

    if (!isControlled) {
      setInternalOpenItems(newOpenItems);
    }
    onOpenItemsChange?.(newOpenItems);
  };

  return (
    <div className={cn(styles.accordion, bordered && styles.bordered, className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              styles.item,
              isOpen && styles.itemOpen,
              item.disabled && styles.itemDisabled
            )}
          >
            <button
              type="button"
              className={styles.header}
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span className={styles.title}>{item.title}</span>
              <span className={cn(styles.chevron, isOpen && styles.chevronOpen)}>
                <Icon name="chevron-down" size="small" />
              </span>
            </button>

            <div
              id={`accordion-content-${item.id}`}
              className={cn(styles.panel, isOpen && styles.panelOpen)}
              aria-labelledby={`accordion-header-${item.id}`}
              role="region"
            >
              <div className={styles.content}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = 'InkAccordion';

export { Accordion };
