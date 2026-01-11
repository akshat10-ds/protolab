/**
 * Design System Composites
 *
 * Layer 4: Composed Components
 * Dependencies: Layers 1-3 (Tokens, Utilities, Primitives)
 *
 * These components compose primitives and use the Icon system.
 * Can import from Layer 3 (primitives) but NOT from Layer 5+ (patterns/layouts).
 */

// Form Components (Composite)
export { SearchInput } from './SearchInput';
export type { SearchInputProps, SearchSuggestion } from './SearchInput';

export { FileInput } from './FileInput';
export type { FileInputProps } from './FileInput';

export { ComboBox } from './ComboBox';
export type { ComboBoxProps, ComboBoxOption } from './ComboBox';

export { DatePicker } from './DatePicker';
export type { DatePickerProps } from './DatePicker';

export { FileUpload } from './FileUpload';
export type { FileUploadProps } from './FileUpload';

export { FilterTag } from './FilterTag';
export type { FilterTagProps } from './FilterTag';

// Navigation Components
export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb';

export { Pagination } from './Pagination';
export type { PaginationProps, PaginationMode } from './Pagination';

export { Tabs } from './Tabs';
export type { TabsProps, TabItem } from './Tabs';

// Layout Components
export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItemData } from './Accordion';

export { ComboButton } from './ComboButton';
export type { ComboButtonProps } from './ComboButton';

// Overlay Components (Composite)
export { Modal } from './Modal';
export type { ModalProps, ModalSize } from './Modal';

export { Popover } from './Popover';
export type { PopoverProps, PopoverPosition, PopoverAlign } from './Popover';

export { Dropdown } from './Dropdown';
export type { DropdownProps, DropdownItemProps, DropdownPosition, DropdownAlign } from './Dropdown';

export { Drawer } from './Drawer';
export type { DrawerProps } from './Drawer';

// Feedback Components (Composite)
export { Alert } from './Alert';
export type { AlertProps } from './Alert';

export { Banner } from './Banner';
export type { BannerProps, BannerKind, BannerShape, BannerAction } from './Banner';

export { Callout } from './Callout';
export type { CalloutProps } from './Callout';

export { AIBadge } from './AIBadge';
export type { AIBadgeProps } from './AIBadge';

// Navigation Components (Composite)
export { Stepper } from './Stepper';
export type { StepperProps } from './Stepper';

// Display Components (Composite)
export { Chip } from './Chip';
export type { ChipProps } from './Chip';

// Data Components
export { Table } from './Table';
export type { TableProps } from './Table';

export { List } from './List';
export type { ListProps } from './List';
