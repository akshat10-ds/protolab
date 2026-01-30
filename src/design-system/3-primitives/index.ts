/**
 * Design System Primitives
 *
 * Layer 3: Atomic Components
 * Dependencies: Only Layers 1 (Tokens) and 2 (Utilities)
 *
 * These components use ONLY design tokens and utilities.
 * NO imports from other components allowed.
 */

// Icons
export { Icon, AIIcon, iconPaths } from './Icon';
export type { IconProps, IconName, AIIconProps, AIIconName } from './Icon';

// Action Components
export { Button } from './Button';
export type { ButtonProps, ButtonKind, ButtonSize } from './Button';

export { IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';

export { Link } from './Link';
export type { LinkProps } from './Link';

// Form Components (Basic)
export { Input } from './Input';
export type { InputProps } from './Input';

export { Select } from './Select';
export type { SelectProps } from './Select';

export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

export { Radio } from './Radio';
export type { RadioProps } from './Radio';

export { Switch } from './Switch';
export type { SwitchProps } from './Switch';

export { TextArea } from './TextArea';
export type { TextAreaProps } from './TextArea';

export { Slider } from './Slider';
export type { SliderProps } from './Slider';

// Display Components
export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Avatar, AvatarGroup } from './Avatar';
export type { AvatarProps, AvatarGroupProps } from './Avatar';

export { AlertBadge } from './AlertBadge';
export type { AlertBadgeProps } from './AlertBadge';

export { StatusLight } from './StatusLight';
export type { StatusLightProps } from './StatusLight';

export { Divider } from './Divider';
export type { DividerProps } from './Divider';

export { Card } from './Card';
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card';

export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

// Typography
export { Heading, Text } from './Typography';
export type { HeadingProps, TextProps } from './Typography';

// Feedback Components
export { Spinner } from './Spinner';
export type { SpinnerProps } from './Spinner';

export { ProgressBar } from './ProgressBar';
export type { ProgressBarProps, ProgressBarKind, ProgressBarVariant } from './ProgressBar';

// Overlay Components (Basic)
export { Tooltip } from './Tooltip';
export type { TooltipProps, TooltipPosition } from './Tooltip';
