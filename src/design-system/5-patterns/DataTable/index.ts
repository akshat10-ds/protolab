// Main DataTable component
export { DataTable } from './DataTable';

// Sub-components
export { DataTableHeader } from './DataTableHeader';
export { DataTableBody } from './DataTableBody';
export { DataTableRow } from './DataTableRow';
export { DataTableCell } from './DataTableCell';
export { DataTableFooter } from './DataTableFooter';
export { DataTableActionBar } from './DataTableActionBar';
export { DataTableColumnControl } from './DataTableColumnControl';

// Cell helper styles for custom cell renderers
// Users can import these to style their custom cell content consistently
export { default as dataTableStyles } from './DataTable.module.css';

// Types
export type {
  // Core types
  DataTableProps,
  DataTableColumn,
  DataTableRowHeight,
  DataTableAlignment,
  DataTableSortDirection,
  ColumnVisibility,
  // Action types
  DataTableAction,
  DataTableActionBarProps,
  // Pagination types
  DataTablePaginationConfig,
  DataTableFooterProps,
  PageSizeOption,
  // Column control types
  DataTableColumnControlProps,
  // Sub-component props
  DataTableHeaderProps,
  DataTableBodyProps,
  DataTableRowProps,
  DataTableCellProps,
} from './types';
