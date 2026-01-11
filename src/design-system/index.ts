/**
 * Ink Design System - Hierarchical Architecture
 *
 * This design system follows a strict 6-layer hierarchy:
 * 1. Tokens - Foundation design decisions
 * 2. Utilities - Layout and spacing helpers
 * 3. Primitives - Atomic components (tokens only)
 * 4. Composites - Composed components (use primitives)
 * 5. Patterns - UI patterns (use composites + primitives)
 * 6. Layouts - Application templates (use patterns + composites + primitives)
 *
 * Each layer can only depend on layers below it.
 */

// ============================================================================
// LAYER 1: TOKENS
// ============================================================================
export { TOKENS_CSS_PATH } from './1-tokens';

// ============================================================================
// LAYER 2: UTILITIES
// ============================================================================
export { Stack, Inline, Grid, Container, Spacer } from './2-utilities';
export type {
  StackProps,
  InlineProps,
  GridProps,
  ContainerProps,
  SpacerProps,
} from './2-utilities';

// ============================================================================
// LAYER 3: PRIMITIVES
// ============================================================================
export {
  // Icons
  Icon,
  iconPaths,
  // Action Components
  Button,
  IconButton,
  Link,
  // Form Components (Basic)
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  TextArea,
  Slider,
  // Display Components
  Badge,
  Avatar,
  AvatarGroup,
  AlertBadge,
  StatusLight,
  Divider,
  Card,
  Skeleton,
  // Typography
  Heading,
  Text,
  // Feedback Components
  Spinner,
  ProgressBar,
  // Overlay Components (Basic)
  Tooltip,
} from './3-primitives';

export type {
  // Icons
  IconProps,
  // Action Components
  ButtonProps,
  ButtonKind,
  ButtonSize,
  IconButtonProps,
  LinkProps,
  // Form Components (Basic)
  InputProps,
  SelectProps,
  CheckboxProps,
  RadioProps,
  SwitchProps,
  SwitchSize,
  TextAreaProps,
  SliderProps,
  // Display Components
  BadgeProps,
  AvatarProps,
  AvatarGroupProps,
  AlertBadgeProps,
  StatusLightProps,
  DividerProps,
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  SkeletonProps,
  // Typography
  HeadingProps,
  TextProps,
  // Feedback Components
  SpinnerProps,
  ProgressBarProps,
  ProgressBarKind,
  ProgressBarVariant,
  // Overlay Components (Basic)
  TooltipProps,
  TooltipPosition,
} from './3-primitives';

// ============================================================================
// LAYER 4: COMPOSITES
// ============================================================================
export {
  // Form Components (Composite)
  SearchInput,
  FileInput,
  ComboBox,
  DatePicker,
  FileUpload,
  FilterTag,
  // Navigation Components
  Breadcrumb,
  Pagination,
  Tabs,
  // Layout Components
  Accordion,
  ComboButton,
  // Overlay Components (Composite)
  Modal,
  Popover,
  Dropdown,
  Drawer,
  // Feedback Components (Composite)
  Alert,
  Banner,
  Callout,
  AIBadge,
  Stepper,
  Chip,
  // Data Components
  Table,
  List,
} from './4-composites';

export type {
  // Form Components (Composite)
  SearchInputProps,
  SearchSuggestion,
  FileInputProps,
  ComboBoxProps,
  ComboBoxOption,
  DatePickerProps,
  FileUploadProps,
  FilterTagProps,
  // Navigation Components
  BreadcrumbProps,
  BreadcrumbItem,
  PaginationProps,
  PaginationMode,
  TabsProps,
  TabItem,
  // Layout Components
  AccordionProps,
  AccordionItemData,
  ComboButtonProps,
  // Overlay Components (Composite)
  ModalProps,
  ModalSize,
  PopoverProps,
  PopoverPosition,
  PopoverAlign,
  DropdownProps,
  DropdownItemProps,
  DropdownPosition,
  DropdownAlign,
  DrawerProps,
  // Feedback Components (Composite)
  AlertProps,
  BannerProps,
  BannerKind,
  BannerShape,
  BannerAction,
  CalloutProps,
  AIBadgeProps,
  StepperProps,
  ChipProps,
  // Data Components
  TableProps,
  ListProps,
} from './4-composites';

// ============================================================================
// LAYER 5: PATTERNS
// ============================================================================
export { GlobalNav, LocalNav } from './5-patterns';

export type { GlobalNavProps, LocalNavProps } from './5-patterns';

// ============================================================================
// LAYER 6: LAYOUTS
// ============================================================================
export { DocuSignShell } from './6-layouts';

export type { DocuSignShellProps } from './6-layouts';

// ============================================================================
// CONSTANTS & UTILITIES
// ============================================================================

// Icon names for easy reference
export const ICON_NAMES = [
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-down',
  'chevrons-up-down',
  'menu',
  'close',
  'x',
  'add',
  'plus',
  'edit',
  'delete',
  'trash',
  'trash-2',
  'save',
  'search',
  'filter',
  'refresh',
  'download',
  'upload',
  'share',
  'check',
  'check-circle',
  'error',
  'warning',
  'info',
  'help',
  'star',
  'star-filled',
  'heart',
  'heart-filled',
  'user',
  'users',
  'settings',
  'home',
  'document',
  'file',
  'file-text',
  'folder',
  'calendar',
  'clock',
  'bell',
  'mail',
  'more-horizontal',
  'more-vertical',
  'expand',
  'collapse',
  'external-link',
  'copy',
  'paste',
  'eye',
  'eye-off',
  'lock',
  'minus',
  'image',
  'video',
  'music',
  'presentation',
  'table',
  'database',
] as const;

// Typography constants
export const TEXT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const TEXT_WEIGHTS = ['light', 'regular', 'medium', 'semibold', 'bold'] as const;
export const TEXT_COLORS = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'error',
  'inherit',
] as const;
export const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;
