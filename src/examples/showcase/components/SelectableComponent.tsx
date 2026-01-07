/**
 * SelectableComponent - Wrapper that adds hover/selection states to component examples
 */

import React from 'react';
import styles from './SelectableComponent.module.css';

interface SelectableComponentProps {
  children: React.ReactNode;
  componentId: string;
  componentProps?: Record<string, unknown>;
  isSelected?: boolean;
  onSelect?: (componentId: string, props: Record<string, unknown>) => void;
}

export function SelectableComponent({
  children,
  componentId,
  componentProps = {},
  isSelected = false,
  onSelect,
}: SelectableComponentProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(componentId, componentProps);
  };

  return (
    <div
      className={styles.selectableWrapper}
      data-selected={isSelected}
      data-selectable-component
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default SelectableComponent;
