/**
 * Component Registry - Metadata for all design system components
 *
 * This registry provides the editor with information about:
 * - Available components and their categories
 * - Props with types, defaults, and constraints
 * - Which components accept children
 */

import type { ComponentMeta, PropDefinition } from '../state/types';

// Helper to create common prop definitions
const commonProps = {
  className: {
    name: 'className',
    type: 'string' as const,
    defaultValue: '',
    description: 'Additional CSS class',
    group: 'Advanced',
  },
};

// Size options used across multiple components
const sizeOptions = ['small', 'medium', 'large'];
const buttonSizeOptions = ['small', 'medium', 'large', 'xlarge'];

// ============================================================================
// LAYER 2: UTILITIES
// ============================================================================

const StackMeta: ComponentMeta = {
  name: 'Stack',
  type: 'Stack',
  layer: 2,
  category: 'Layout',
  description: 'Vertical or horizontal flex container with consistent spacing',
  acceptsChildren: true,
  icon: 'layout-grid',
  props: [
    {
      name: 'direction',
      type: 'select',
      options: ['vertical', 'horizontal'],
      defaultValue: 'vertical',
      description: 'Stack direction',
    },
    {
      name: 'gap',
      type: 'select',
      options: ['none', 'xs', 'small', 'medium', 'large', 'xl'],
      defaultValue: 'medium',
      description: 'Space between children',
    },
    {
      name: 'align',
      type: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      defaultValue: 'stretch',
      description: 'Cross-axis alignment',
    },
    {
      name: 'justify',
      type: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around'],
      defaultValue: 'start',
      description: 'Main-axis alignment',
    },
    {
      name: 'wrap',
      type: 'boolean',
      defaultValue: false,
      description: 'Allow wrapping',
    },
  ],
};

const GridMeta: ComponentMeta = {
  name: 'Grid',
  type: 'Grid',
  layer: 2,
  category: 'Layout',
  description: 'CSS Grid container for multi-column layouts',
  acceptsChildren: true,
  icon: 'layout-grid',
  props: [
    {
      name: 'columns',
      type: 'number',
      defaultValue: 2,
      description: 'Number of columns',
    },
    {
      name: 'gap',
      type: 'select',
      options: ['none', 'xs', 'small', 'medium', 'large', 'xl'],
      defaultValue: 'medium',
      description: 'Gap between items',
    },
    {
      name: 'align',
      type: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      defaultValue: 'stretch',
      description: 'Vertical alignment',
    },
  ],
};

const InlineMeta: ComponentMeta = {
  name: 'Inline',
  type: 'Inline',
  layer: 2,
  category: 'Layout',
  description: 'Horizontal layout with wrapping support',
  acceptsChildren: true,
  icon: 'minus',
  props: [
    {
      name: 'gap',
      type: 'select',
      options: ['none', 'xs', 'small', 'medium', 'large'],
      defaultValue: 'small',
      description: 'Space between items',
    },
    {
      name: 'align',
      type: 'select',
      options: ['start', 'center', 'end', 'baseline'],
      defaultValue: 'center',
      description: 'Vertical alignment',
    },
  ],
};

const ContainerMeta: ComponentMeta = {
  name: 'Container',
  type: 'Container',
  layer: 2,
  category: 'Layout',
  description: 'Centered container with max-width',
  acceptsChildren: true,
  icon: 'expand',
  props: [
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium', 'large', 'full'],
      defaultValue: 'medium',
      description: 'Max width',
    },
    {
      name: 'padding',
      type: 'select',
      options: ['none', 'small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Horizontal padding',
    },
  ],
};

const SpacerMeta: ComponentMeta = {
  name: 'Spacer',
  type: 'Spacer',
  layer: 2,
  category: 'Layout',
  description: 'Empty space for layout purposes',
  acceptsChildren: false,
  icon: 'expand',
  props: [
    {
      name: 'size',
      type: 'select',
      options: ['xs', 'small', 'medium', 'large', 'xl'],
      defaultValue: 'medium',
      description: 'Space size',
    },
  ],
};

// ============================================================================
// LAYER 3: PRIMITIVES
// ============================================================================

const ButtonMeta: ComponentMeta = {
  name: 'Button',
  type: 'Button',
  layer: 3,
  category: 'Action',
  description: 'Primary action component with multiple variants',
  acceptsChildren: false,
  icon: 'pointer',
  props: [
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Button',
      description: 'Button text',
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      options: ['brand', 'primary', 'secondary', 'tertiary', 'danger'],
      defaultValue: 'brand',
      description: 'Button style variant',
    },
    {
      name: 'size',
      type: 'select',
      options: buttonSizeOptions,
      defaultValue: 'medium',
      description: 'Button size',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable button',
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: false,
      description: 'Show loading state',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: false,
      description: 'Stretch to full width',
    },
    {
      name: 'startElement',
      type: 'icon',
      defaultValue: '',
      description: 'Icon before text',
    },
    {
      name: 'endElement',
      type: 'icon',
      defaultValue: '',
      description: 'Icon after text',
    },
  ],
};

const IconButtonMeta: ComponentMeta = {
  name: 'IconButton',
  type: 'IconButton',
  layer: 3,
  category: 'Action',
  description: 'Icon-only button for compact actions',
  acceptsChildren: false,
  icon: 'pointer',
  props: [
    {
      name: 'icon',
      type: 'icon',
      defaultValue: 'settings',
      description: 'Icon to display',
      required: true,
    },
    {
      name: 'variant',
      type: 'select',
      options: ['brand', 'primary', 'secondary', 'tertiary', 'danger'],
      defaultValue: 'tertiary',
      description: 'Button style',
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium'],
      defaultValue: 'medium',
      description: 'Button size',
    },
    {
      name: 'aria-label',
      type: 'string',
      defaultValue: 'Action',
      description: 'Accessible label',
      required: true,
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable button',
    },
  ],
};

const LinkMeta: ComponentMeta = {
  name: 'Link',
  type: 'Link',
  layer: 3,
  category: 'Action',
  description: 'Text link for navigation',
  acceptsChildren: false,
  icon: 'external-link',
  props: [
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Link text',
      description: 'Link text',
      required: true,
    },
    {
      name: 'href',
      type: 'string',
      defaultValue: '#',
      description: 'Link destination',
    },
    {
      name: 'external',
      type: 'boolean',
      defaultValue: false,
      description: 'Open in new tab',
    },
  ],
};

const InputMeta: ComponentMeta = {
  name: 'Input',
  type: 'Input',
  layer: 3,
  category: 'Form',
  description: 'Text input field with label and validation',
  acceptsChildren: false,
  icon: 'edit',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Label',
      description: 'Input label',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Enter text...',
      description: 'Placeholder text',
    },
    {
      name: 'type',
      type: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      defaultValue: 'text',
      description: 'Input type',
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium'],
      defaultValue: 'medium',
      description: 'Input size',
    },
    {
      name: 'error',
      type: 'string',
      defaultValue: '',
      description: 'Error message',
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: '',
      description: 'Helper text',
    },
    {
      name: 'required',
      type: 'boolean',
      defaultValue: false,
      description: 'Required field',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable input',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      defaultValue: false,
      description: 'Read-only mode',
    },
  ],
};

const SelectMeta: ComponentMeta = {
  name: 'Select',
  type: 'Select',
  layer: 3,
  category: 'Form',
  description: 'Dropdown select field',
  acceptsChildren: false,
  icon: 'chevron-down',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Select',
      description: 'Select label',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Choose an option...',
      description: 'Placeholder text',
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium'],
      defaultValue: 'medium',
      description: 'Select size',
    },
    {
      name: 'error',
      type: 'string',
      defaultValue: '',
      description: 'Error message',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable select',
    },
  ],
};

const CheckboxMeta: ComponentMeta = {
  name: 'Checkbox',
  type: 'Checkbox',
  layer: 3,
  category: 'Form',
  description: 'Binary selection control',
  acceptsChildren: false,
  icon: 'check',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Checkbox label',
      description: 'Checkbox label text',
      required: true,
    },
    {
      name: 'checked',
      type: 'boolean',
      defaultValue: false,
      description: 'Checked state (Figma: checked)',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      defaultValue: false,
      description: 'Indeterminate/partial state (Figma: indeterminate)',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: false,
      description: 'Error state (Figma: Error)',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disabled state (Figma: disabled)',
    },
    {
      name: 'showLabel',
      type: 'boolean',
      defaultValue: true,
      description: 'Show/hide label (Figma: showLabel)',
    },
    {
      name: 'showErrorMessage',
      type: 'boolean',
      defaultValue: true,
      description: 'Show error message (Figma: showErrorMessage)',
    },
    {
      name: 'errorMessage',
      type: 'string',
      defaultValue: '',
      description: 'Error message text',
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: '',
      description: 'Helper text (Figma: Description)',
    },
  ],
};

const RadioMeta: ComponentMeta = {
  name: 'Radio',
  type: 'Radio',
  layer: 3,
  category: 'Form',
  description: 'Radio button for single selection',
  acceptsChildren: false,
  icon: 'check-circle',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Radio option',
      description: 'Radio label',
      required: true,
    },
    {
      name: 'checked',
      type: 'boolean',
      defaultValue: false,
      description: 'Selected state',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable radio',
    },
  ],
};

const SwitchMeta: ComponentMeta = {
  name: 'Switch',
  type: 'Switch',
  layer: 3,
  category: 'Form',
  description: 'Toggle switch for on/off states',
  acceptsChildren: false,
  icon: 'check',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Switch label',
      description: 'Switch label',
    },
    {
      name: 'checked',
      type: 'boolean',
      defaultValue: false,
      description: 'On state',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable switch',
    },
  ],
};

const TextAreaMeta: ComponentMeta = {
  name: 'TextArea',
  type: 'TextArea',
  layer: 3,
  category: 'Form',
  description: 'Multi-line text input',
  acceptsChildren: false,
  icon: 'file-text',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Description',
      description: 'TextArea label',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Enter text...',
      description: 'Placeholder text',
    },
    {
      name: 'rows',
      type: 'number',
      defaultValue: 4,
      description: 'Number of rows',
    },
    {
      name: 'error',
      type: 'string',
      defaultValue: '',
      description: 'Error message',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable textarea',
    },
  ],
};

const SliderMeta: ComponentMeta = {
  name: 'Slider',
  type: 'Slider',
  layer: 3,
  category: 'Form',
  description: 'Range slider for numeric values with optional label and IconButtons',
  acceptsChildren: false,
  icon: 'minus',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Label',
      description: 'Slider label text (Figma: label)',
      required: true,
    },
    {
      name: 'hideLabel',
      type: 'boolean',
      defaultValue: false,
      description: 'Hide label visually (Figma: hideLabel)',
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: '',
      description: 'Description text below label (Figma: description)',
    },
    {
      name: 'min',
      type: 'number',
      defaultValue: 0,
      description: 'Minimum value (Figma: min)',
    },
    {
      name: 'max',
      type: 'number',
      defaultValue: 100,
      description: 'Maximum value (Figma: max)',
    },
    {
      name: 'value',
      type: 'number',
      defaultValue: 50,
      description: 'Current value (Figma: value)',
    },
    {
      name: 'step',
      type: 'number',
      defaultValue: 1,
      description: 'Step increment',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable slider (Figma: disabled)',
    },
    {
      name: 'showValue',
      type: 'boolean',
      defaultValue: false,
      description: 'Show current value next to slider (Figma: showValue)',
    },
    {
      name: 'showTooltip',
      type: 'boolean',
      defaultValue: true,
      description: 'Show tooltip on hover/drag (Figma: showTooltip)',
    },
    {
      name: 'startElement',
      type: 'icon',
      defaultValue: '',
      description:
        'Icon name for IconButton at start of slider (e.g., zoom-out). Renders as tertiary IconButton.',
    },
    {
      name: 'endElement',
      type: 'icon',
      defaultValue: '',
      description:
        'Icon name for IconButton at end of slider (e.g., zoom-in). Renders as tertiary IconButton.',
    },
  ],
};

const StepperMeta: ComponentMeta = {
  name: 'Stepper',
  type: 'Stepper',
  layer: 4,
  category: 'Navigation',
  description: 'Numeric stepper with increment/decrement',
  acceptsChildren: false,
  icon: 'plus',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Quantity',
      description: 'Stepper label',
    },
    {
      name: 'min',
      type: 'number',
      defaultValue: 0,
      description: 'Minimum value',
    },
    {
      name: 'max',
      type: 'number',
      defaultValue: 100,
      description: 'Maximum value',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable stepper',
    },
  ],
};

const BadgeMeta: ComponentMeta = {
  name: 'Badge',
  type: 'Badge',
  layer: 3,
  category: 'Display',
  description: 'Small label for status or count',
  acceptsChildren: false,
  icon: 'star',
  props: [
    {
      name: 'kind',
      type: 'select',
      options: ['subtle', 'emphasis', 'success', 'warning', 'alert', 'promo', 'promoSubtle'],
      defaultValue: 'subtle',
      description: 'Badge kind',
    },
    {
      name: 'text',
      type: 'string',
      defaultValue: 'Status badge',
      description: 'Badge text',
    },
    {
      name: 'startElement',
      type: 'boolean',
      defaultValue: false,
      description: 'Show status icon',
    },
  ],
};

const AlertBadgeMeta: ComponentMeta = {
  name: 'AlertBadge',
  type: 'AlertBadge',
  layer: 3,
  category: 'Display',
  description: 'Notification badge for alerts',
  acceptsChildren: false,
  icon: 'bell',
  props: [
    {
      name: 'value',
      type: 'number',
      defaultValue: 1,
      description: 'Number to display',
    },
    {
      name: 'kind',
      type: 'select',
      options: ['emphasis', 'subtle'],
      defaultValue: 'emphasis',
      description: 'Visual style',
    },
    {
      name: 'dot',
      type: 'boolean',
      defaultValue: false,
      description: 'Show as dot indicator',
    },
  ],
};

const AvatarMeta: ComponentMeta = {
  name: 'Avatar',
  type: 'Avatar',
  layer: 3,
  category: 'Display',
  description: 'User avatar with image or initials',
  acceptsChildren: false,
  icon: 'user',
  props: [
    {
      name: 'name',
      type: 'string',
      defaultValue: 'John Doe',
      description: 'User name for initials',
    },
    {
      name: 'src',
      type: 'string',
      defaultValue: '',
      description: 'Image URL',
    },
    {
      name: 'size',
      type: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      defaultValue: 'medium',
      description: 'Avatar size',
    },
  ],
};

const ChipMeta: ComponentMeta = {
  name: 'Chip',
  type: 'Chip',
  layer: 4,
  category: 'Display',
  description: 'Compact interactive element for tags or filters',
  acceptsChildren: false,
  icon: 'star',
  props: [
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Chip Text',
      description: 'Chip text content',
      required: true,
    },
    {
      name: 'startElement',
      type: 'select',
      options: ['none', 'star', 'check', 'user', 'settings', 'search'],
      defaultValue: 'none',
      description: 'Icon to display before the text',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      defaultValue: false,
      description: 'Show close button',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disabled state',
    },
  ],
};

const DividerMeta: ComponentMeta = {
  name: 'Divider',
  type: 'Divider',
  layer: 3,
  category: 'Display',
  description: 'Horizontal or vertical dividing line',
  acceptsChildren: false,
  icon: 'minus',
  props: [
    {
      name: 'orientation',
      type: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
      description: 'Divider orientation',
    },
    {
      name: 'spacing',
      type: 'select',
      options: ['none', 'small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Space around divider',
    },
  ],
};

const CardMeta: ComponentMeta = {
  name: 'Card',
  type: 'Card',
  layer: 3,
  category: 'Container',
  description: 'Container with border and optional shadow',
  acceptsChildren: true,
  icon: 'file',
  props: [
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Card content',
      description: 'Content inside the card',
    },
    {
      name: 'padding',
      type: 'select',
      options: ['none', 'small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Internal padding',
    },
    {
      name: 'shadow',
      type: 'select',
      options: ['none', 'small', 'medium', 'large'],
      defaultValue: 'small',
      description: 'Shadow elevation',
    },
    {
      name: 'interactive',
      type: 'boolean',
      defaultValue: false,
      description: 'Add hover effect',
    },
  ],
};

const SkeletonMeta: ComponentMeta = {
  name: 'Skeleton',
  type: 'Skeleton',
  layer: 3,
  category: 'Feedback',
  description: 'Loading placeholder',
  acceptsChildren: false,
  icon: 'refresh',
  props: [
    {
      name: 'variant',
      type: 'select',
      options: ['text', 'circular', 'rectangular'],
      defaultValue: 'text',
      description: 'Skeleton shape',
    },
    {
      name: 'width',
      type: 'string',
      defaultValue: '100%',
      description: 'Width (CSS value)',
    },
    {
      name: 'height',
      type: 'string',
      defaultValue: '1em',
      description: 'Height (CSS value)',
    },
  ],
};

const HeadingMeta: ComponentMeta = {
  name: 'Heading',
  type: 'Heading',
  layer: 3,
  category: 'Typography',
  description: 'Semantic heading element',
  acceptsChildren: false,
  icon: 'file-text',
  props: [
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Heading',
      description: 'Heading text',
      required: true,
    },
    {
      name: 'level',
      type: 'select',
      options: ['1', '2', '3', '4', '5', '6'],
      defaultValue: '2',
      description: 'Heading level (h1-h6)',
    },
    {
      name: 'size',
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      defaultValue: 'lg',
      description: 'Visual size',
    },
  ],
};

const TextMeta: ComponentMeta = {
  name: 'Text',
  type: 'Text',
  layer: 3,
  category: 'Typography',
  description: 'Body text with styling options',
  acceptsChildren: false,
  icon: 'file-text',
  props: [
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Text content goes here.',
      description: 'Text content',
      required: true,
    },
    {
      name: 'size',
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: 'md',
      description: 'Text size',
    },
    {
      name: 'weight',
      type: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      defaultValue: 'regular',
      description: 'Font weight',
    },
    {
      name: 'color',
      type: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'error', 'inherit'],
      defaultValue: 'primary',
      description: 'Text color',
    },
  ],
};

const SpinnerMeta: ComponentMeta = {
  name: 'Spinner',
  type: 'Spinner',
  layer: 3,
  category: 'Feedback',
  description: 'Loading spinner animation',
  acceptsChildren: false,
  icon: 'refresh',
  props: [
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Spinner size',
    },
  ],
};

const ProgressBarMeta: ComponentMeta = {
  name: 'ProgressBar',
  type: 'ProgressBar',
  layer: 3,
  category: 'Feedback',
  description: 'Progress indicator bar',
  acceptsChildren: false,
  icon: 'minus',
  props: [
    {
      name: 'kind',
      type: 'select',
      options: ['info', 'success'],
      defaultValue: 'info',
      description: 'Progress color',
    },
    {
      name: 'variant',
      type: 'select',
      options: ['determinate', 'indeterminate'],
      defaultValue: 'determinate',
      description: 'Progress type',
    },
    {
      name: 'value',
      type: 'number',
      defaultValue: 50,
      description: 'Progress value (0-100)',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Label',
      description: 'Label text',
    },
    {
      name: 'showLabel',
      type: 'boolean',
      defaultValue: true,
      description: 'Show label',
    },
    {
      name: 'showContent',
      type: 'boolean',
      defaultValue: true,
      description: 'Show percentage',
    },
  ],
};

const StatusLightMeta: ComponentMeta = {
  name: 'StatusLight',
  type: 'StatusLight',
  layer: 3,
  category: 'Display',
  description: 'Visual indicator for status',
  acceptsChildren: false,
  icon: 'status-info',
  props: [
    {
      name: 'kind',
      type: 'select',
      options: ['neutral', 'success', 'warning', 'alert'],
      defaultValue: 'neutral',
      description: 'Status kind',
    },
    {
      name: 'noFill',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable background fill',
    },
    {
      name: 'opaque',
      type: 'boolean',
      defaultValue: false,
      description: 'Use solid background',
    },
    {
      name: 'showText',
      type: 'boolean',
      defaultValue: true,
      description: 'Show text label',
    },
    {
      name: 'text',
      type: 'string',
      defaultValue: 'Status light',
      description: 'Status text',
    },
  ],
};

const CalloutMeta: ComponentMeta = {
  name: 'Callout',
  type: 'Callout',
  layer: 4,
  category: 'Feedback',
  description: 'Pop-up container for contextual information',
  acceptsChildren: false,
  icon: 'info',
  props: [
    {
      name: 'width',
      type: 'select',
      options: ['xlarge', 'large', 'medium', 'small'],
      defaultValue: 'large',
      description: 'Callout width (640px, 480px, 384px, 320px)',
    },
    {
      name: 'alignment',
      type: 'select',
      options: ['start', 'center', 'end'],
      defaultValue: 'start',
      description: 'Arrow position along edge',
    },
    {
      name: 'location',
      type: 'select',
      options: ['above', 'below', 'before', 'after'],
      defaultValue: 'above',
      description: 'Arrow/caret location',
    },
    {
      name: 'glass',
      type: 'select',
      options: ['None', 'glassFrost', 'glassTint'],
      defaultValue: 'None',
      description: 'Glass effect',
    },
    {
      name: 'enableArrow',
      type: 'boolean',
      defaultValue: true,
      description: 'Show arrow pointing to trigger',
    },
    {
      name: 'closeButton',
      type: 'boolean',
      defaultValue: true,
      description: 'Show close button',
    },
    {
      name: 'actions',
      type: 'boolean',
      defaultValue: false,
      description: 'Show action buttons footer',
    },
  ],
};

const BannerMeta: ComponentMeta = {
  name: 'Banner',
  type: 'Banner',
  layer: 4,
  category: 'Feedback',
  description: 'Full-width notification banner',
  acceptsChildren: false,
  icon: 'bell',
  props: [
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Important announcement here.',
      description: 'Banner content',
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      options: ['information', 'danger', 'success', 'warning', 'promo', 'subtle', 'neutral'],
      defaultValue: 'information',
      description: 'Banner style',
    },
    {
      name: 'shape',
      type: 'select',
      options: ['square', 'round'],
      defaultValue: 'square',
      description: 'Border shape',
    },
    {
      name: 'lineWrap',
      type: 'boolean',
      defaultValue: false,
      description: 'Enable text wrapping',
    },
    {
      name: 'bottomBorder',
      type: 'boolean',
      defaultValue: false,
      description: 'Show bottom border',
    },
    {
      name: 'icon',
      type: 'string',
      defaultValue: '',
      description: 'Optional icon name',
    },
    {
      name: 'closable',
      type: 'boolean',
      defaultValue: true,
      description: 'Show close button',
    },
  ],
};

const TooltipMeta: ComponentMeta = {
  name: 'Tooltip',
  type: 'Tooltip',
  layer: 3,
  category: 'Overlay',
  description: 'User-triggered contextual help that briefly explains the function of an element',
  acceptsChildren: true,
  icon: 'info',
  props: [
    {
      name: 'text',
      type: 'string',
      defaultValue: 'This is a Tooltip',
      description: 'The text to display inside the Tooltip',
      required: true,
    },
    {
      name: 'location',
      type: 'select',
      options: ['above', 'below', 'before', 'after'],
      defaultValue: 'above',
      description: 'The preferred location of the Tooltip relative to its anchor element',
    },
    {
      name: 'alignment',
      type: 'select',
      options: ['start', 'center', 'end'],
      defaultValue: 'center',
      description: 'The alignment of the Tooltip along the edge of its anchor element',
    },
    {
      name: 'delay',
      type: 'number',
      defaultValue: 200,
      description: 'Delay in milliseconds before showing the tooltip',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Whether the tooltip is disabled',
    },
  ],
};

const IconMeta: ComponentMeta = {
  name: 'Icon',
  type: 'Icon',
  layer: 3,
  category: 'Display',
  description: 'SVG icon component',
  acceptsChildren: false,
  icon: 'star',
  props: [
    {
      name: 'name',
      type: 'icon',
      defaultValue: 'star',
      description: 'Icon name',
      required: true,
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Icon size',
    },
    {
      name: 'color',
      type: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'error'],
      defaultValue: 'inherit',
      description: 'Icon color',
    },
  ],
};

// ============================================================================
// LAYER 4: COMPOSITES
// ============================================================================

const SearchInputMeta: ComponentMeta = {
  name: 'SearchInput',
  type: 'SearchInput',
  layer: 4,
  category: 'Form',
  description: 'Search input with icon and suggestions',
  acceptsChildren: false,
  icon: 'search',
  props: [
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Search...',
      description: 'Placeholder text',
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium'],
      defaultValue: 'medium',
      description: 'Input size',
    },
  ],
};

const ComboBoxMeta: ComponentMeta = {
  name: 'ComboBox',
  type: 'ComboBox',
  layer: 4,
  category: 'Form',
  description: 'Searchable dropdown select',
  acceptsChildren: false,
  icon: 'search',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Select option',
      description: 'Label text',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Type to search...',
      description: 'Placeholder text',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable combobox',
    },
  ],
};

const DatePickerMeta: ComponentMeta = {
  name: 'DatePicker',
  type: 'DatePicker',
  layer: 4,
  category: 'Form',
  description: 'Calendar-based date selection',
  acceptsChildren: false,
  icon: 'calendar',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Select date',
      description: 'Label text',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Pick a date...',
      description: 'Placeholder text',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable picker',
    },
  ],
};

const FileUploadMeta: ComponentMeta = {
  name: 'FileUpload',
  type: 'FileUpload',
  layer: 4,
  category: 'Form',
  description: 'Drag-and-drop file upload area',
  acceptsChildren: false,
  icon: 'upload',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Upload files',
      description: 'Label text',
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'Drag and drop files here',
      description: 'Helper text',
    },
    {
      name: 'multiple',
      type: 'boolean',
      defaultValue: false,
      description: 'Allow multiple files',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable upload',
    },
  ],
};

const TabsMeta: ComponentMeta = {
  name: 'Tabs',
  type: 'Tabs',
  layer: 4,
  category: 'Navigation',
  description: 'Tabbed navigation component',
  acceptsChildren: false,
  icon: 'folder',
  props: [
    {
      name: 'variant',
      type: 'select',
      options: ['default', 'pills', 'underline'],
      defaultValue: 'default',
      description: 'Tab style',
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Tab size',
    },
  ],
};

const AccordionMeta: ComponentMeta = {
  name: 'Accordion',
  type: 'Accordion',
  layer: 4,
  category: 'Layout',
  description: 'Collapsible content sections',
  acceptsChildren: false,
  icon: 'chevron-down',
  props: [
    {
      name: 'bordered',
      type: 'boolean',
      defaultValue: true,
      description: 'Bordered variant (vs card variant)',
    },
    {
      name: 'itemHeight',
      type: 'select',
      options: ['compact', 'default', 'tall'],
      defaultValue: 'default',
      description: 'Header height',
    },
    {
      name: 'displayLevel',
      type: 'select',
      options: ['xs', 's'],
      description: 'Title font size',
    },
    {
      name: 'allowMultiple',
      type: 'boolean',
      defaultValue: false,
      description: 'Allow multiple panels open',
    },
  ],
};

const ModalMeta: ComponentMeta = {
  name: 'Modal',
  type: 'Modal',
  layer: 4,
  category: 'Overlay',
  description: 'Dialog modal overlay',
  acceptsChildren: true,
  icon: 'expand',
  props: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Modal Title',
      description: 'Modal header title',
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium', 'large', 'fullscreen'],
      defaultValue: 'medium',
      description: 'Modal size',
    },
    {
      name: 'isOpen',
      type: 'boolean',
      defaultValue: true,
      description: 'Show modal',
    },
  ],
};

const DrawerMeta: ComponentMeta = {
  name: 'Drawer',
  type: 'Drawer',
  layer: 4,
  category: 'Overlay',
  description: 'Sliding panel from edge',
  acceptsChildren: true,
  icon: 'menu',
  props: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Drawer Title',
      description: 'Drawer header title',
    },
    {
      name: 'position',
      type: 'select',
      options: ['left', 'right'],
      defaultValue: 'right',
      description: 'Slide from position',
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Drawer width',
    },
    {
      name: 'isOpen',
      type: 'boolean',
      defaultValue: true,
      description: 'Show drawer',
    },
  ],
};

const DropdownMeta: ComponentMeta = {
  name: 'Dropdown',
  type: 'Dropdown',
  layer: 4,
  category: 'Overlay',
  description: 'Dropdown menu with actions',
  acceptsChildren: false,
  icon: 'chevron-down',
  props: [
    {
      name: 'triggerLabel',
      type: 'string',
      defaultValue: 'Options',
      description: 'Trigger button text',
    },
    {
      name: 'position',
      type: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      defaultValue: 'bottom-start',
      description: 'Menu position',
    },
    {
      name: 'header',
      type: 'string',
      defaultValue: '',
      description: 'Section header text (e.g., "Select a view")',
    },
    {
      name: 'iconStyle',
      type: 'select',
      options: ['default', 'boxed'],
      defaultValue: 'default',
      description: 'Icon display style (boxed for view selectors)',
    },
  ],
};

const AlertMeta: ComponentMeta = {
  name: 'Alert',
  type: 'Alert',
  layer: 4,
  category: 'Feedback',
  description: 'Alert dialog for confirmations',
  acceptsChildren: false,
  icon: 'warning',
  props: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Are you sure?',
      description: 'Alert title',
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'This action cannot be undone.',
      description: 'Alert message',
    },
    {
      name: 'variant',
      type: 'select',
      options: ['info', 'warning', 'error', 'success'],
      defaultValue: 'warning',
      description: 'Alert type',
    },
    {
      name: 'isOpen',
      type: 'boolean',
      defaultValue: true,
      description: 'Show alert',
    },
  ],
};

const TableMeta: ComponentMeta = {
  name: 'Table',
  type: 'Table',
  layer: 4,
  category: 'Data',
  description: 'Data table with sorting and selection',
  acceptsChildren: false,
  icon: 'table',
  props: [
    {
      name: 'striped',
      type: 'boolean',
      defaultValue: false,
      description: 'Alternating row colors',
    },
    {
      name: 'hoverable',
      type: 'boolean',
      defaultValue: true,
      description: 'Row hover effect',
    },
    {
      name: 'compact',
      type: 'boolean',
      defaultValue: false,
      description: 'Compact row height',
    },
  ],
};

const PaginationMeta: ComponentMeta = {
  name: 'Pagination',
  type: 'Pagination',
  layer: 4,
  category: 'Navigation',
  description: 'Page navigation controls',
  acceptsChildren: false,
  icon: 'chevrons-up-down',
  props: [
    {
      name: 'totalPages',
      type: 'number',
      defaultValue: 10,
      description: 'Total number of pages',
    },
    {
      name: 'currentPage',
      type: 'number',
      defaultValue: 1,
      description: 'Current page number',
    },
    {
      name: 'mode',
      type: 'select',
      options: ['default', 'compact', 'simple'],
      defaultValue: 'default',
      description: 'Pagination style',
    },
  ],
};

const BreadcrumbMeta: ComponentMeta = {
  name: 'Breadcrumb',
  type: 'Breadcrumb',
  layer: 4,
  category: 'Navigation',
  description: 'Breadcrumb navigation trail',
  acceptsChildren: false,
  icon: 'chevron-right',
  props: [
    {
      name: 'rootIcon',
      type: 'boolean',
      defaultValue: false,
      description: 'Show folder icon instead of first item text',
    },
    {
      name: 'showCurrentPage',
      type: 'boolean',
      defaultValue: true,
      description: 'Show or hide the current page item',
    },
    {
      name: 'overflowMenu',
      type: 'boolean',
      defaultValue: false,
      description: 'Collapse middle items to overflow icon',
    },
  ],
};

const ComboButtonMeta: ComponentMeta = {
  name: 'ComboButton',
  type: 'ComboButton',
  layer: 4,
  category: 'Action',
  description: 'Split button with main action and dropdown. Tertiary is always icon-only.',
  acceptsChildren: false,
  icon: 'chevron-down',
  props: [
    {
      name: 'children',
      type: 'string',
      defaultValue: 'Action',
      description: 'Button text (ignored for tertiary)',
    },
    {
      name: 'variant',
      type: 'select',
      options: ['brand', 'primary', 'secondary', 'tertiary'],
      defaultValue: 'brand',
      description: 'Button style. Tertiary is always icon-only.',
    },
    {
      name: 'size',
      type: 'select',
      options: ['small', 'medium'],
      defaultValue: 'medium',
      description: 'Button size',
    },
    {
      name: 'startIcon',
      type: 'icon',
      defaultValue: '',
      description: 'Icon in main button (required for tertiary)',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable button',
    },
    {
      name: 'inverted',
      type: 'boolean',
      defaultValue: false,
      description: 'Invert colors for dark backgrounds',
    },
  ],
};

// ============================================================================
// LAYER 5: PATTERNS
// ============================================================================

const GlobalNavMeta: ComponentMeta = {
  name: 'GlobalNav',
  type: 'GlobalNav',
  layer: 5,
  category: 'Navigation',
  description: 'Top-level application navigation bar',
  acceptsChildren: false,
  icon: 'menu',
  props: [
    {
      name: 'showSearch',
      type: 'boolean',
      defaultValue: true,
      description: 'Show search input',
    },
    {
      name: 'showNotifications',
      type: 'boolean',
      defaultValue: true,
      description: 'Show notification icon',
    },
  ],
};

const LocalNavMeta: ComponentMeta = {
  name: 'LocalNav',
  type: 'LocalNav',
  layer: 5,
  category: 'Navigation',
  description: 'Sidebar navigation for sections',
  acceptsChildren: false,
  icon: 'menu',
  props: [
    {
      name: 'headerLabel',
      type: 'string',
      defaultValue: 'Navigation',
      description: 'Header title',
    },
  ],
};

// ============================================================================
// LAYER 6: LAYOUTS
// ============================================================================

const DocuSignShellMeta: ComponentMeta = {
  name: 'DocuSignShell',
  type: 'DocuSignShell',
  layer: 6,
  category: 'Layout',
  description: 'Full application shell with navigation',
  acceptsChildren: true,
  icon: 'layout-grid',
  props: [],
};

// ============================================================================
// REGISTRY EXPORT
// ============================================================================

export const componentRegistry: Record<string, ComponentMeta> = {
  // Layer 2: Utilities
  Stack: StackMeta,
  Grid: GridMeta,
  Inline: InlineMeta,
  Container: ContainerMeta,
  Spacer: SpacerMeta,

  // Layer 3: Primitives
  Button: ButtonMeta,
  IconButton: IconButtonMeta,
  Link: LinkMeta,
  Input: InputMeta,
  Select: SelectMeta,
  Checkbox: CheckboxMeta,
  Radio: RadioMeta,
  Switch: SwitchMeta,
  TextArea: TextAreaMeta,
  Slider: SliderMeta,
  Badge: BadgeMeta,
  AlertBadge: AlertBadgeMeta,
  Avatar: AvatarMeta,
  Divider: DividerMeta,
  Card: CardMeta,
  Skeleton: SkeletonMeta,
  Heading: HeadingMeta,
  Text: TextMeta,
  Spinner: SpinnerMeta,
  ProgressBar: ProgressBarMeta,
  StatusLight: StatusLightMeta,
  Tooltip: TooltipMeta,
  Icon: IconMeta,

  // Layer 4: Composites
  SearchInput: SearchInputMeta,
  ComboBox: ComboBoxMeta,
  DatePicker: DatePickerMeta,
  FileUpload: FileUploadMeta,
  Tabs: TabsMeta,
  Accordion: AccordionMeta,
  Stepper: StepperMeta,
  Modal: ModalMeta,
  Drawer: DrawerMeta,
  Dropdown: DropdownMeta,
  Callout: CalloutMeta,
  Alert: AlertMeta,
  Banner: BannerMeta,
  Chip: ChipMeta,
  Table: TableMeta,
  Pagination: PaginationMeta,
  Breadcrumb: BreadcrumbMeta,
  ComboButton: ComboButtonMeta,

  // Layer 5: Patterns
  GlobalNav: GlobalNavMeta,
  LocalNav: LocalNavMeta,

  // Layer 6: Layouts
  DocuSignShell: DocuSignShellMeta,
};

// Helper to get components by layer
export const getComponentsByLayer = (layer: number): ComponentMeta[] => {
  return Object.values(componentRegistry).filter((meta) => meta.layer === layer);
};

// Helper to get components by category
export const getComponentsByCategory = (category: string): ComponentMeta[] => {
  return Object.values(componentRegistry).filter((meta) => meta.category === category);
};

// All available icon names
export const AVAILABLE_ICONS = [
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
  'pointer',
  'layout-grid',
  'zoom-in',
  'zoom-out',
];
