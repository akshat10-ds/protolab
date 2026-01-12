/**
 * InteractivePreview - Live component preview that responds to liveProps
 */

import React, { useState, useEffect } from 'react';
import * as DesignSystem from '@/design-system';
import { componentRegistry } from '@/editor/registry/componentRegistry';
import styles from './InteractivePreview.module.css';

// Component map for dynamic rendering
const componentMap: Record<string, React.ComponentType<Record<string, unknown>>> = {
  // Layer 2: Utilities
  Stack: DesignSystem.Stack,
  Grid: DesignSystem.Grid,
  Inline: DesignSystem.Inline,
  Container: DesignSystem.Container,
  Spacer: DesignSystem.Spacer,

  // Layer 3: Primitives
  Button: DesignSystem.Button,
  IconButton: DesignSystem.IconButton,
  Link: DesignSystem.Link,
  Input: DesignSystem.Input,
  Select: DesignSystem.Select,
  Checkbox: DesignSystem.Checkbox,
  Radio: DesignSystem.Radio,
  Switch: DesignSystem.Switch,
  TextArea: DesignSystem.TextArea,
  Slider: DesignSystem.Slider,
  Stepper: DesignSystem.Stepper,
  Badge: DesignSystem.Badge,
  Avatar: DesignSystem.Avatar,
  Chip: DesignSystem.Chip,
  Divider: DesignSystem.Divider,
  Card: DesignSystem.Card,
  Skeleton: DesignSystem.Skeleton,
  Heading: DesignSystem.Heading,
  Text: DesignSystem.Text,
  Spinner: DesignSystem.Spinner,
  ProgressBar: DesignSystem.ProgressBar,
  StatusLight: DesignSystem.StatusLight,
  AlertBadge: DesignSystem.AlertBadge,
  Callout: DesignSystem.Callout,
  Banner: DesignSystem.Banner,
  Tooltip: DesignSystem.Tooltip,
  Icon: DesignSystem.Icon,

  // Layer 4: Composites
  SearchInput: DesignSystem.SearchInput,
  ComboBox: DesignSystem.ComboBox,
  ComboButton: DesignSystem.ComboButton,
  DatePicker: DesignSystem.DatePicker,
  FileUpload: DesignSystem.FileUpload,
  Tabs: DesignSystem.Tabs,
  Accordion: DesignSystem.Accordion,
  Modal: DesignSystem.Modal,
  Drawer: DesignSystem.Drawer,
  Dropdown: DesignSystem.Dropdown,
  Alert: DesignSystem.Alert,
  Table: DesignSystem.Table,
  Pagination: DesignSystem.Pagination,
  Breadcrumb: DesignSystem.Breadcrumb,

  // Layer 5: Patterns
  GlobalNav: DesignSystem.GlobalNav,
  LocalNav: DesignSystem.LocalNav,
};

// Map subpage IDs to component type names
const subpageToComponent: Record<string, string> = {
  // Primitives
  button: 'Button',
  iconbutton: 'IconButton',
  link: 'Link',
  input: 'Input',
  select: 'Select',
  checkbox: 'Checkbox',
  radio: 'Radio',
  switch: 'Switch',
  textarea: 'TextArea',
  slider: 'Slider',
  stepper: 'Stepper',
  badge: 'Badge',
  avatar: 'Avatar',
  chip: 'Chip',
  divider: 'Divider',
  card: 'Card',
  skeleton: 'Skeleton',
  typography: 'Text',
  spinner: 'Spinner',
  progressbar: 'ProgressBar',
  'status-light': 'StatusLight',
  'alert-badge': 'AlertBadge',
  callout: 'Callout',
  banner: 'Banner',
  tooltip: 'Tooltip',
  icon: 'Icon',
  // Composites
  searchinput: 'SearchInput',
  combobox: 'ComboBox',
  combobutton: 'ComboButton',
  datepicker: 'DatePicker',
  fileupload: 'FileUpload',
  tabs: 'Tabs',
  accordion: 'Accordion',
  modal: 'Modal',
  drawer: 'Drawer',
  dropdown: 'Dropdown',
  alert: 'Alert',
  table: 'Table',
  pagination: 'Pagination',
  breadcrumb: 'Breadcrumb',
  // Utilities
  stack: 'Stack',
  grid: 'Grid',
  inline: 'Inline',
  container: 'Container',
  spacer: 'Spacer',
  // Patterns
  globalnav: 'GlobalNav',
  localnav: 'LocalNav',
};

// Components that should NOT receive children (void-like components)
const voidComponents = new Set([
  'Input',
  'Checkbox',
  'Radio',
  'Switch',
  'Slider',
  'Divider',
  'Spinner',
  'ProgressBar',
  'Icon',
  'Skeleton',
  'SearchInput',
  'DatePicker',
  'FileUpload',
  'ComboBox',
  'ComboButton',
  'IconButton',
  'Avatar',
  'AlertBadge',
  'Spacer',
]);

// Default props for components that need them
const defaultComponentProps: Record<string, Record<string, unknown>> = {
  // Form Primitives
  Button: { children: 'Button', kind: 'brand' },
  IconButton: { icon: 'star', variant: 'brand', 'aria-label': 'Star' },
  ComboButton: { children: 'Action', variant: 'brand', startIcon: 'download' },
  Input: { label: 'Input', placeholder: 'Enter text...' },
  TextArea: { label: 'TextArea', placeholder: 'Enter text...' },
  Select: { label: 'Select', children: <option>Select an option</option> },
  Checkbox: { label: 'Checkbox option', showLabel: true, showErrorMessage: true },
  Radio: { label: 'Radio option', name: 'preview-radio' },
  Switch: { label: 'Toggle option' },
  Slider: { label: 'Slider', value: 50, onChange: () => {} },

  // Data Primitives
  Badge: { children: 'Badge', variant: 'subtle' },
  Avatar: { initials: 'JD', size: 'medium' },
  Chip: { children: 'Chip' },
  StatusLight: { children: 'Status', kind: 'success' },
  AlertBadge: { value: 5, kind: 'emphasis' },
  Spinner: { size: 'medium' },
  ProgressBar: { value: 65, size: 'medium' },

  // Container Primitives
  Divider: {},
  Card: { children: 'Card content' },
  Skeleton: { variant: 'text', width: '100%' },
  Callout: {
    heading: 'Callout heading',
    children: 'Callout body text with contextual information.',
    closeButton: true,
    actions: false,
    primaryAction: { label: 'Confirm', onClick: () => {} },
    secondaryAction: { label: 'Cancel', onClick: () => {} },
  },
  Banner: { kind: 'information', children: 'Banner message' },
  Tooltip: { content: 'Tooltip text', children: <span>Hover me</span> },

  // Typography Primitives
  Text: { children: 'Sample text', size: 'md' },
  Heading: { children: 'Heading', level: 2 },
  Link: { children: 'Link text', href: '#' },
  Icon: { name: 'star', size: 'medium' },
  Stepper: {
    steps: [
      { id: '1', title: 'Step 1' },
      { id: '2', title: 'Step 2' },
      { id: '3', title: 'Step 3' },
    ],
    activeStep: 0,
  },

  // Composites
  ComboBox: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Select an option',
  },
  Dropdown: {
    children: <DesignSystem.Button kind="secondary">Open Menu</DesignSystem.Button>,
    items: [
      { label: 'Edit', icon: <DesignSystem.Icon name="edit" size="small" /> },
      { label: 'Duplicate', icon: <DesignSystem.Icon name="duplicate" size="small" /> },
      { label: 'Delete', icon: <DesignSystem.Icon name="trash" size="small" /> },
    ],
  },
  Table: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
    data: [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
    ],
  },
  Tabs: {
    items: [
      { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
      { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
      { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
    ],
  },
  Accordion: {
    items: [
      {
        id: 'acc1',
        title: 'Section 1',
        subtitle: 'Description for section 1',
        content: 'Content for section 1',
      },
      {
        id: 'acc2',
        title: 'Section 2',
        subtitle: 'Description for section 2',
        content: 'Content for section 2',
      },
    ],
    bordered: true,
    itemHeight: 'default',
  },
  Breadcrumb: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ],
  },
  Pagination: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },

  // Patterns
  LocalNav: {
    headerLabel: 'Start',
    headerIcon: 'plus',
    sections: [
      {
        id: 'main',
        items: [
          { id: 'item1', label: 'All Items', icon: 'envelope', active: true },
          { id: 'item2', label: 'Drafts', nested: true },
          { id: 'item3', label: 'Completed', nested: true },
        ],
      },
    ],
  },
  GlobalNav: {
    logo: 'DocuSign',
    navItems: [
      { id: 'home', label: 'Home', active: true },
      { id: 'docs', label: 'Documents' },
    ],
  },
};

interface InteractivePreviewProps {
  activeSubpage: string;
  liveProps: Record<string, unknown>;
}

export function InteractivePreview({ activeSubpage, liveProps }: InteractivePreviewProps) {
  const componentType = subpageToComponent[activeSubpage];

  // State for Slider value (to make buttons functional)
  const [sliderValue, setSliderValue] = useState(50);

  // Reset slider value when switching components or when value prop changes
  useEffect(() => {
    if (componentType === 'Slider') {
      const newValue = (liveProps.value as number) ?? 50;
      setSliderValue(newValue);
    }
  }, [componentType, liveProps.value]);

  if (!componentType) {
    return null;
  }

  const Component = componentMap[componentType];
  const meta = componentRegistry[componentType];

  if (!Component) {
    return null;
  }

  // Check if this component should not receive children
  const isVoidComponent = voidComponents.has(componentType);

  // Merge default props with live props
  const defaultProps = defaultComponentProps[componentType] || {};
  const mergedProps: Record<string, unknown> = { ...defaultProps };

  // Apply liveProps, filtering out empty values and incompatible props
  Object.entries(liveProps).forEach(([key, value]) => {
    // Skip children for void components to prevent crashes
    if (isVoidComponent && key === 'children') {
      return;
    }
    if (value !== '' && value !== undefined) {
      // Convert icon props (startElement, endElement) from string to Icon component
      // Exception: Slider expects strings for icon names (used as IconButton icon prop)
      if ((key === 'startElement' || key === 'endElement') && typeof value === 'string') {
        // Skip if value is 'none' - don't pass the prop
        if (value === 'none') {
          delete mergedProps[key];
        } else if (componentType === 'Slider') {
          // Slider expects string icon names for IconButton
          mergedProps[key] = value;
        } else {
          mergedProps[key] = <DesignSystem.Icon name={value as string} size="small" />;
        }
      } else if (key === 'dismissible' && componentType === 'Chip') {
        // Convert dismissible boolean to onRemove callback for Chip
        if (value === true) {
          mergedProps['onRemove'] = () => {};
        }
        // Don't pass dismissible to the component
      } else {
        mergedProps[key] = value;
      }
    }
  });

  // Special handling for Slider - make buttons functional
  if (componentType === 'Slider') {
    const min = (mergedProps.min as number) ?? 0;
    const max = (mergedProps.max as number) ?? 100;
    const step = (mergedProps.step as number) ?? 1;

    mergedProps.value = sliderValue;
    mergedProps.onChange = (newValue: number) => setSliderValue(newValue);
    mergedProps.onStartClick = () => setSliderValue((prev) => Math.max(min, prev - step));
    mergedProps.onEndClick = () => setSliderValue((prev) => Math.min(max, prev + step));
  }

  // Extract children if present (only for non-void components)
  const { children, ...restProps } = mergedProps;

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <span className={styles.previewTitle}>Interactive Preview</span>
        <span className={styles.previewHint}>Edit props in the inspector panel →</span>
      </div>
      <div className={styles.previewContent} data-inspector-preview="true">
        {!isVoidComponent && children !== undefined ? (
          <Component {...restProps}>{children as React.ReactNode}</Component>
        ) : (
          <Component {...restProps} />
        )}
      </div>
    </div>
  );
}

export default InteractivePreview;
