import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import styles from './Table.module.css';
import { Icon } from '../../3-primitives/Icon';
import { Checkbox } from '../../3-primitives/Checkbox';

export type TableSize = 'small' | 'medium' | 'large';
export type TableVariant = 'default' | 'bordered' | 'striped';
export type TableAlign = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc' | null;

// Column Definition
export interface TableColumn<T = any> {
  /** Unique key for the column */
  key: string;
  /** Display header for the column */
  header: React.ReactNode;
  /** Width of the column (CSS value) */
  width?: string;
  /** Text alignment */
  align?: TableAlign;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Custom cell render function (Figma pattern) - receives the row */
  cell?: (row: T) => React.ReactNode;
  /** Custom render function for cell (legacy pattern) - receives value, row, and index */
  render?: (value: any, row: T, index: number) => React.ReactNode;
  /** Custom sort function */
  sortFn?: (a: T, b: T) => number;
}

// Table Props
export interface TableProps<T = any> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Data rows */
  data: T[];
  /** Visual variant */
  variant?: TableVariant;
  /** Size variant */
  size?: TableSize;
  /** Whether to show row hover state */
  hoverable?: boolean;
  /** Whether rows are selectable */
  selectable?: boolean;
  /** Selected row keys */
  selectedRows?: Set<string | number>;
  /** Callback when selection changes */
  onSelectionChange?: (selected: Set<string | number>) => void;
  /** Row key extractor */
  getRowKey?: (row: T, index: number) => string | number;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Sort configuration */
  sortColumn?: string;
  sortDirection?: SortDirection;
  /** Sort change handler */
  onSortChange?: (column: string, direction: SortDirection) => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: React.ReactNode;
  /** Whether table is responsive (stacks on mobile) */
  responsive?: boolean;
  /** Additional className */
  className?: string;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Max height for scrollable table */
  maxHeight?: string;
}

export function Table<T = any>({
  columns,
  data,
  variant = 'default',
  size = 'medium',
  hoverable = false,
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  getRowKey = (row, index) => index,
  onRowClick,
  sortColumn,
  sortDirection,
  onSortChange,
  loading = false,
  emptyMessage = 'No data available',
  responsive = true,
  className = '',
  stickyHeader = false,
  maxHeight,
}: TableProps<T>) {
  const [localSelectedRows, setLocalSelectedRows] = useState(selectedRows);

  // Use controlled or uncontrolled selection
  const selection = onSelectionChange ? selectedRows : localSelectedRows;
  const setSelection = onSelectionChange || setLocalSelectedRows;

  // Handle select all
  const handleSelectAll = useCallback(() => {
    if (selection.size === data.length) {
      setSelection(new Set());
    } else {
      const allKeys = data.map((row, index) => getRowKey(row, index));
      setSelection(new Set(allKeys));
    }
  }, [data, selection, setSelection, getRowKey]);

  // Handle row selection
  const handleRowSelect = useCallback((rowKey: string | number) => {
    const newSelection = new Set(selection);
    if (newSelection.has(rowKey)) {
      newSelection.delete(rowKey);
    } else {
      newSelection.add(rowKey);
    }
    setSelection(newSelection);
  }, [selection, setSelection]);

  // Handle sort
  const handleSort = useCallback((columnKey: string) => {
    if (!onSortChange) return;

    let newDirection: SortDirection = 'asc';
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      }
    }
    onSortChange(columnKey, newDirection);
  }, [sortColumn, sortDirection, onSortChange]);

  // Sort data if needed
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    const column = columns.find(col => col.key === sortColumn);
    if (!column) return data;

    const sorted = [...data].sort((a, b) => {
      if (column.sortFn) {
        return column.sortFn(a, b);
      }

      const aVal = (a as any)[column.key];
      const bVal = (b as any)[column.key];

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, columns, sortColumn, sortDirection]);

  const containerStyle: React.CSSProperties = maxHeight
    ? { maxHeight, overflow: 'auto' }
    : {};

  const isAllSelected = selection.size > 0 && selection.size === data.length;
  const isIndeterminate = selection.size > 0 && selection.size < data.length;

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyMessage}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div
      className={`
        ${styles.container}
        ${responsive ? styles.responsive : ''}
        ${className}
      `.trim()}
      style={containerStyle}
    >
      <table
        className={`
          ${styles.table}
          ${styles[variant]}
          ${styles[size]}
          ${hoverable ? styles.hoverable : ''}
          ${stickyHeader ? styles.stickyHeader : ''}
        `.trim()}
      >
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {selectable && (
              <th className={`${styles.th} ${styles.checkboxCell}`}>
                <Checkbox
                  label="Select all rows"
                  hideLabel
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  ${styles.th}
                  ${column.align ? styles[`align-${column.align}`] : ''}
                  ${column.sortable ? styles.sortable : ''}
                `.trim()}
                style={{ width: column.width }}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <div className={styles.headerContent}>
                  <span>{column.header}</span>
                  {column.sortable && (
                    <div className={styles.sortIcon}>
                      {sortColumn === column.key && sortDirection === 'asc' && (
                        <Icon name="chevron-up" size="small" />
                      )}
                      {sortColumn === column.key && sortDirection === 'desc' && (
                        <Icon name="chevron-down" size="small" />
                      )}
                      {(sortColumn !== column.key || !sortDirection) && (
                        <Icon name="sort" size="small" />
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedData.map((row, rowIndex) => {
            const rowKey = getRowKey(row, rowIndex);
            const isSelected = selection.has(rowKey);

            return (
              <tr
                key={rowKey}
                className={`
                  ${styles.tr}
                  ${isSelected ? styles.selected : ''}
                  ${onRowClick ? styles.clickable : ''}
                `.trim()}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {selectable && (
                  <td className={`${styles.td} ${styles.checkboxCell}`}>
                    <Checkbox
                      label={`Select row ${rowIndex + 1}`}
                      hideLabel
                      checked={isSelected}
                      onChange={() => handleRowSelect(rowKey)}
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map((column) => {
                  const value = (row as any)[column.key];
                  // Use cell prop (Figma pattern) if available, otherwise use render (legacy), otherwise show raw value
                  const cellContent = column.cell
                    ? column.cell(row)
                    : column.render
                    ? column.render(value, row, rowIndex)
                    : value;

                  return (
                    <td
                      key={column.key}
                      className={`
                        ${styles.td}
                        ${column.align ? styles[`align-${column.align}`] : ''}
                      `.trim()}
                      data-label={column.header}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = 'Table';