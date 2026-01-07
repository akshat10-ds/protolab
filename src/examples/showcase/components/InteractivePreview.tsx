/**
 * InteractivePreview - Live component preview that responds to liveProps
 */

import React from 'react';
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
  Callout: DesignSystem.Callout,
  Banner: DesignSystem.Banner,
  Tooltip: DesignSystem.Tooltip,
  Icon: DesignSystem.Icon,

  // Layer 4: Composites
  SearchInput: DesignSystem.SearchInput,
  ComboBox: DesignSystem.ComboBox,
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
  callout: 'Callout',
  banner: 'Banner',
  tooltip: 'Tooltip',
  icon: 'Icon',
  // Composites
  searchinput: 'SearchInput',
  combobox: 'ComboBox',
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

// Default props for components that need them
const defaultComponentProps: Record<string, Record<string, unknown>> = {
  Button: { children: 'Button' },
  Input: { placeholder: 'Enter text...' },
  TextArea: { placeholder: 'Enter text...' },
  Select: { children: <option>Select an option</option> },
  Badge: { children: 'Badge' },
  Chip: { children: 'Chip' },
  Card: { children: 'Card content' },
  Text: { children: 'Sample text' },
  Heading: { children: 'Heading' },
  Callout: { children: 'Callout message' },
  Banner: { children: 'Banner message' },
  Link: { children: 'Link text', href: '#' },
  Avatar: { name: 'John Doe' },
  Tooltip: { content: 'Tooltip text', children: <span>Hover me</span> },
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
      { id: 'acc1', title: 'Section 1', content: 'Content for section 1' },
      { id: 'acc2', title: 'Section 2', content: 'Content for section 2' },
    ],
  },
};

interface InteractivePreviewProps {
  activeSubpage: string;
  liveProps: Record<string, unknown>;
}

export function InteractivePreview({ activeSubpage, liveProps }: InteractivePreviewProps) {
  const componentType = subpageToComponent[activeSubpage];

  if (!componentType) {
    return null;
  }

  const Component = componentMap[componentType];
  const meta = componentRegistry[componentType];

  if (!Component) {
    return null;
  }

  // Merge default props with live props
  const defaultProps = defaultComponentProps[componentType] || {};
  const mergedProps: Record<string, unknown> = { ...defaultProps };

  // Apply liveProps, filtering out empty values
  Object.entries(liveProps).forEach(([key, value]) => {
    if (value !== '' && value !== undefined) {
      mergedProps[key] = value;
    }
  });

  // Extract children if present
  const { children, ...restProps } = mergedProps;

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <span className={styles.previewTitle}>Interactive Preview</span>
        <span className={styles.previewHint}>Edit props in the inspector panel →</span>
      </div>
      <div className={styles.previewContent}>
        <Component {...restProps}>{children as React.ReactNode}</Component>
      </div>
    </div>
  );
}

export default InteractivePreview;
