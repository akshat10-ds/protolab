import React, { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  ComboButton,
  Input,
  TextArea,
  Select,
  Card,
  Stack,
  Grid,
  Heading,
  Text,
  Badge,
  AlertBadge,
  Chip,
  FilterTag,
  StatusLight,
  Avatar,
  AvatarGroup,
  Tabs,
  Icon,
  Divider,
  SearchInput,
  Switch,
  Slider,
  ComboBox,
  FileInput,
  List,
  Table,
  Dropdown,
  Alert,
  Banner,
  Callout,
  Checkbox,
  Radio,
  ProgressBar,
  Tooltip,
  Modal,
  Link,
  Breadcrumb,
  Accordion,
  Pagination,
  Stepper,
  Spinner,
} from '@/design-system';
import type { TableColumn, FileInputFile, ComboBoxOption } from '@/design-system';
import { iconPaths } from '@/design-system/3-primitives/Icon/iconPaths';
import { VerticalNavigation, GlobalNav, LocalNav } from '@/design-system/5-patterns';
import type { NavigationItem } from '@/design-system/5-patterns';
import { LayoutsDemo } from './LayoutsDemo';

// Sidebar navigation component with active state
const SidebarNav = ({
  links,
  activeSubpage,
  onSubpageChange,
}: {
  links: { id: string; label: string }[];
  activeSubpage: string;
  onSubpageChange: (id: string) => void;
}) => (
  <div
    style={{
      width: '240px',
      flexShrink: 0,
      position: 'sticky',
      top: '24px',
      height: 'fit-content',
      background: 'var(--ink-white)',
      borderRight: '1px solid var(--ink-neutral-20)',
      padding: 'var(--ink-spacing-4)',
      borderRadius: 'var(--ink-radius-md)',
    }}
  >
    <Stack gap="small">
      <Text size="sm" weight="semibold" color="secondary">
        ON THIS PAGE
      </Text>
      <Stack gap="xsmall">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => onSubpageChange(link.id)}
            style={{
              textDecoration: 'none',
              padding: '6px 8px',
              borderRadius: '4px',
              transition: 'all 0.2s',
              border: 'none',
              background: activeSubpage === link.id ? 'var(--ink-cobalt-10)' : 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              if (activeSubpage !== link.id) {
                e.currentTarget.style.backgroundColor = 'var(--ink-neutral-10)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSubpage !== link.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Text
              size="sm"
              color={activeSubpage === link.id ? 'brand' : 'primary'}
              weight={activeSubpage === link.id ? 'semibold' : 'regular'}
              style={{ cursor: 'pointer' }}
            >
              {link.label}
            </Text>
          </button>
        ))}
      </Stack>
    </Stack>
  </div>
);

type ViewMode = 'design-system' | 'patterns' | 'layouts' | 'experiments';

export default function ComponentShowcase() {
  // Top-level view mode
  const [viewMode, setViewMode] = useState<ViewMode>('design-system');
  const [navCollapsed, setNavCollapsed] = useState(false);

  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [smallModalOpen, setSmallModalOpen] = useState(false);
  const [mediumModalOpen, setMediumModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const [xlargeModalOpen, setXlargeModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [comboBoxValue, setComboBoxValue] = useState('');
  const [fileInputValue, setFileInputValue] = useState<FileInputFile[]>([]);

  // State for tab and subpage navigation
  const [activeTab, setActiveTab] = useState('foundation');
  const [activeSubpage, setActiveSubpage] = useState('colors');

  // State for patterns navigation
  const [activePattern, setActivePattern] = useState('global-nav');

  // State for stepper
  const [activeStepIndex, setActiveStepIndex] = useState(1);

  // State for GlobalNav examples
  const [globalNavFullActive, setGlobalNavFullActive] = useState('insights');
  const [globalNavMinimalActive, setGlobalNavMinimalActive] = useState('home');
  const [globalNavSimpleActive, setGlobalNavSimpleActive] = useState('templates');

  // State for LocalNav example
  const [localNavActive, setLocalNavActive] = useState('in-progress');
  const [newNavEnabled, setNewNavEnabled] = useState(false);

  // Enable scrolling for this page
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Map of tab IDs to their subpages
  const tabSubpages: Record<string, string[]> = {
    foundation: [
      'colors',
      'typography',
      'icons',
      'spacing',
      'border-radius',
      'alias-tokens',
      'color-pairing',
    ],
    actions: ['button', 'iconbutton', 'combobutton'],
    'content-display': ['accordion', 'avatar', 'card'],
    'forms-inputs': [
      'checkbox',
      'combobox',
      'fileinput',
      'radio',
      'searchinput',
      'select',
      'slider',
      'switch',
      'textarea',
      'input',
    ],
    'lists-tables': ['table', 'badge', 'alert-badge', 'chip', 'statuslight'],
    'loading-status': ['spinner', 'stepper'],
    feedback: ['alert'],
    navigational: ['breadcrumb', 'link', 'pagination', 'tabs'],
    menus: ['dropdown'],
    popovers: ['modal', 'tooltip'],
  };

  // Sidebar links mapping
  const sidebarLinks: Record<string, { id: string; label: string }[]> = {
    foundation: [
      { id: 'colors', label: 'Colors' },
      { id: 'color-pairing', label: 'Color Pairing Rules' },
      { id: 'typography', label: 'Typography' },
      { id: 'icons', label: 'Icons' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'border-radius', label: 'Border & Radius' },
      { id: 'alias-tokens', label: 'Alias Tokens' },
    ],
    actions: [
      { id: 'button', label: 'Button' },
      { id: 'iconbutton', label: 'IconButton' },
      { id: 'combobutton', label: 'ComboButton' },
    ],
    'content-display': [
      { id: 'accordion', label: 'Accordion' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'card', label: 'Card Container' },
    ],
    'forms-inputs': [
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'combobox', label: 'Combobox' },
      { id: 'fileinput', label: 'File Drop' },
      { id: 'radio', label: 'Radio Button' },
      { id: 'searchinput', label: 'Search (Future)' },
      { id: 'select', label: 'Select' },
      { id: 'slider', label: 'Slider' },
      { id: 'switch', label: 'Switch' },
      { id: 'textarea', label: 'Text Area' },
      { id: 'input', label: 'Text Box' },
    ],
    'lists-tables': [
      { id: 'table', label: 'Table' },
      { id: 'badge', label: 'Tag' },
      { id: 'alert-badge', label: 'Alert Badge' },
      { id: 'chip', label: 'Chip' },
      { id: 'filtertag', label: 'Filter Tag' },
      { id: 'statuslight', label: 'Status Light' },
    ],
    'loading-status': [
      { id: 'spinner', label: 'Progress Circle' },
      { id: 'stepper', label: 'Progress Stepper' },
    ],
    feedback: [
      { id: 'alert', label: 'Inline Message' },
      { id: 'banner', label: 'Banner' },
      { id: 'callout', label: 'Callout' },
    ],
    navigational: [
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'link', label: 'Link' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'tabs', label: 'Tabs' },
    ],
    menus: [{ id: 'dropdown', label: 'Dropdown (Menu)' }],
    popovers: [
      { id: 'modal', label: 'Modal' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  };

  // Handle tab change and reset to first subpage
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setActiveSubpage(tabSubpages[tabId][0]);
  };

  // Navigation structure for vertical navigation
  const navigationItems: NavigationItem[] = [
    {
      id: 'design-system',
      label: 'Design System',
      icon: 'home',
      items: [
        { id: 'foundation', label: 'Foundation', icon: 'star' },
        { id: 'actions', label: 'Actions', icon: 'plus' },
        { id: 'content-display', label: 'Content Display', icon: 'image' },
        { id: 'forms-inputs', label: 'Forms & Inputs', icon: 'edit' },
        { id: 'lists-tables', label: 'Lists & Tables', icon: 'table' },
        { id: 'loading-status', label: 'Loading & Status', icon: 'clock' },
        { id: 'feedback', label: 'Feedback', icon: 'info' },
        { id: 'navigational', label: 'Navigational', icon: 'chevron-right' },
        { id: 'menus', label: 'Menus', icon: 'menu' },
        { id: 'popovers', label: 'Popovers', icon: 'help' },
      ],
    },
    {
      id: 'patterns',
      label: 'Patterns',
      icon: 'database',
      items: [
        { id: 'global-nav', label: 'Global Nav' },
        { id: 'local-nav', label: 'Local Nav' },
      ],
    },
    {
      id: 'layouts',
      label: 'Layouts',
      icon: 'presentation',
      items: [],
    },
    {
      id: 'experiments',
      label: 'Experiments',
      icon: 'settings',
      items: [],
    },
  ];

  // Handle navigation item clicks
  const handleNavigationItemClick = (itemId: string) => {
    setViewMode(itemId as ViewMode);
    // If Design System is clicked, select the first sub-item (Foundation)
    if (itemId === 'design-system') {
      setActiveTab('foundation');
      setActiveSubpage(tabSubpages['foundation'][0]);
    }
  };

  const handleNavigationSubItemClick = (itemId: string, subItemId: string) => {
    if (itemId === 'design-system') {
      setActiveTab(subItemId);
      setActiveSubpage(tabSubpages[subItemId][0]);
    } else if (itemId === 'patterns') {
      setActivePattern(subItemId);
    }
  };

  // Sample data for table
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  ];

  const tableColumns: TableColumn[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'warning'}>{value}</Badge>
      ),
    },
  ];

  // Sample data for ComboBox
  const comboBoxOptions: ComboBoxOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
    { value: 'honeydew', label: 'Honeydew' },
  ];

  // Official Ink Design System Color Primitives
  const colors = {
    // SEMANTIC COLORS (for UI elements - Official Ink Design System)
    semantic: {
      cobalt: [
        { name: 'Cobalt 10', value: '#f3f2fe', description: 'Lightest cobalt for backgrounds' },
        { name: 'Cobalt 20', value: '#e9e6fd', description: 'Very light cobalt' },
        { name: 'Cobalt 30', value: '#dbd6fe', description: 'Light cobalt' },
        { name: 'Cobalt 40', value: '#cac2ff', description: 'Medium-light cobalt' },
        { name: 'Cobalt 50', value: '#bbb1ff', description: 'Medium cobalt' },
        { name: 'Cobalt 60', value: '#a598ff', description: 'Medium cobalt' },
        { name: 'Cobalt 70', value: '#8b7aff', description: 'Medium-dark cobalt' },
        { name: 'Cobalt 80', value: '#735aff', description: 'Dark cobalt' },
        { name: 'Cobalt 90', value: '#5f32ff', description: 'Darker cobalt' },
        { name: 'Cobalt 100', value: '#4c00fb', description: 'Brand primary - Ink Cobalt' },
        { name: 'Cobalt 110', value: '#4200ca', description: 'Very dark cobalt' },
        { name: 'Cobalt 120', value: '#37039e', description: 'Darker cobalt' },
        { name: 'Cobalt 130', value: '#2b047f', description: 'Very dark cobalt' },
        { name: 'Cobalt 140', value: '#260559', description: 'Darkest cobalt' },
      ],
      red: [
        { name: 'Red 10', value: '#fef0f2', description: 'Lightest red' },
        { name: 'Red 20', value: '#fee8ea', description: 'Very light red' },
        { name: 'Red 30', value: '#fed6d8', description: 'Light red' },
        { name: 'Red 40', value: '#febfc2', description: 'Medium-light red' },
        { name: 'Red 50', value: '#ffa2a7', description: 'Medium red' },
        { name: 'Red 60', value: '#ff7d87', description: 'Medium-dark red' },
        { name: 'Red 70', value: '#ff4464', description: 'Dark red' },
        { name: 'Red 80', value: '#ec004c', description: 'Darker red' },
        { name: 'Red 90', value: '#c70547', description: 'Error/danger primary' },
        { name: 'Red 100', value: '#a6003f', description: 'Very dark red' },
        { name: 'Red 110', value: '#870035', description: 'Very dark red' },
        { name: 'Red 120', value: '#6c012a', description: 'Darker red' },
        { name: 'Red 130', value: '#560121', description: 'Very dark red' },
        { name: 'Red 140', value: '#410318', description: 'Darkest red' },
      ],
      green: [
        { name: 'Green 10', value: '#e0f9ef', description: 'Lightest green' },
        { name: 'Green 20', value: '#b9f6dd', description: 'Very light green' },
        { name: 'Green 30', value: '#84efc3', description: 'Light green' },
        { name: 'Green 40', value: '#63dfab', description: 'Medium-light green' },
        { name: 'Green 50', value: '#43d197', description: 'Medium green' },
        { name: 'Green 60', value: '#1dbc80', description: 'Medium-dark green' },
        { name: 'Green 70', value: '#06a16c', description: 'Dark green' },
        { name: 'Green 80', value: '#00875c', description: 'Darker green' },
        { name: 'Green 90', value: '#006f4d', description: 'Very dark green' },
        { name: 'Green 100', value: '#005f43', description: 'Success primary' },
        { name: 'Green 110', value: '#004c36', description: 'Very dark green' },
        { name: 'Green 120', value: '#013b2b', description: 'Darker green' },
        { name: 'Green 130', value: '#012f22', description: 'Very dark green' },
        { name: 'Green 140', value: '#02231a', description: 'Darkest green' },
      ],
      neutral: [
        { name: 'Neutral 10', value: '#f7f6f7', description: 'Lightest neutral' },
        { name: 'Neutral 20', value: '#f0eff0', description: 'Very light neutral' },
        { name: 'Neutral 30', value: '#e5e4e5', description: 'Light neutral' },
        { name: 'Neutral 40', value: '#d8d7d8', description: 'Medium-light neutral' },
        { name: 'Neutral 50', value: '#c6c4c6', description: 'Medium neutral' },
        { name: 'Neutral 60', value: '#afadaf', description: 'Medium-dark neutral' },
        { name: 'Neutral 70', value: '#928F93', description: 'Dark neutral' },
        { name: 'Neutral 80', value: '#78757E', description: 'Darker neutral' },
        { name: 'Neutral 90', value: '#565361', description: 'Very dark neutral' },
        { name: 'Neutral 100', value: '#3D3A4E', description: 'Very dark neutral' },
        { name: 'Neutral 110', value: '#2B2843', description: 'Darker neutral' },
        { name: 'Neutral 120', value: '#201B3A', description: 'Very dark neutral' },
        { name: 'Neutral 130', value: '#190F35', description: 'Very dark neutral' },
        { name: 'Neutral 140', value: '#130032', description: 'Darkest neutral' },
      ],
      orange: [
        { name: 'Orange 10', value: '#fdf2e2', description: 'Lightest orange' },
        { name: 'Orange 20', value: '#fce1c2', description: 'Very light orange' },
        { name: 'Orange 30', value: '#fdcc9a', description: 'Light orange' },
        { name: 'Orange 40', value: '#feb167', description: 'Medium-light orange' },
        { name: 'Orange 50', value: '#ff9532', description: 'Medium orange' },
        { name: 'Orange 60', value: '#fb7c00', description: 'Medium-dark orange' },
        { name: 'Orange 70', value: '#f16700', description: 'Dark orange' },
        { name: 'Orange 80', value: '#dc4e00', description: 'Darker orange' },
        { name: 'Orange 90', value: '#bf3e07', description: 'Very dark orange' },
        { name: 'Orange 100', value: '#a52608', description: 'Warning primary' },
        { name: 'Orange 110', value: '#8e1707', description: 'Very dark orange' },
        { name: 'Orange 120', value: '#770a05', description: 'Darker orange' },
        { name: 'Orange 130', value: '#610406', description: 'Very dark orange' },
        { name: 'Orange 140', value: '#530109', description: 'Darkest orange' },
      ],
      ecru: [
        { name: 'Ecru 10', value: '#f8f3f0', description: 'Lightest warm gray' },
        { name: 'Ecru 20', value: '#f2edea', description: 'Very light warm gray' },
        { name: 'Ecru 30', value: '#e6ded9', description: 'Light warm gray' },
        { name: 'Ecru 40', value: '#d7cdc7', description: 'Medium-light warm gray' },
        { name: 'Ecru 50', value: '#c4bab3', description: 'Medium warm gray' },
        { name: 'Ecru 60', value: '#aba49f', description: 'Medium-dark warm gray' },
        { name: 'Ecru 70', value: '#928c87', description: 'Dark warm gray' },
        { name: 'Ecru 80', value: '#7b7672', description: 'Darker warm gray' },
        { name: 'Ecru 90', value: '#676360', description: 'Very dark warm gray' },
        { name: 'Ecru 100', value: '#56524e', description: 'Very dark warm gray' },
        { name: 'Ecru 110', value: '#45413d', description: 'Darker warm gray' },
        { name: 'Ecru 120', value: '#37332e', description: 'Very dark warm gray' },
        { name: 'Ecru 130', value: '#2c2722', description: 'Very dark warm gray' },
        { name: 'Ecru 140', value: '#221d17', description: 'Darkest warm gray' },
      ],
      base: [
        { name: 'Black', value: '#000000', description: 'Pure black' },
        { name: 'White', value: '#ffffff', description: 'Pure white' },
      ],
    },

    // ACCENT COLORS (for data visualization & accents - Official Ink Design System)
    accent: {
      cyan: [
        { name: 'Cyan 10', value: '#dbf9fd', description: 'Lightest cyan' },
        { name: 'Cyan 20', value: '#caf4fc', description: 'Very light cyan' },
        { name: 'Cyan 30', value: '#a5edfc', description: 'Light cyan' },
        { name: 'Cyan 40', value: '#66e5fd', description: 'Medium-light cyan' },
        { name: 'Cyan 50', value: '#00d8f7', description: 'Medium cyan' },
        { name: 'Cyan 60', value: '#00c0e0', description: 'Medium-dark cyan' },
        { name: 'Cyan 70', value: '#009fbf', description: 'Dark cyan' },
        { name: 'Cyan 80', value: '#00839e', description: 'Darker cyan' },
        { name: 'Cyan 90', value: '#046d84', description: 'Very dark cyan' },
        { name: 'Cyan 100', value: '#035a6c', description: 'Very dark cyan' },
        { name: 'Cyan 110', value: '#034958', description: 'Darker cyan' },
        { name: 'Cyan 120', value: '#033944', description: 'Very dark cyan' },
        { name: 'Cyan 130', value: '#032d36', description: 'Very dark cyan' },
        { name: 'Cyan 140', value: '#032128', description: 'Darkest cyan' },
      ],
      purple: [
        { name: 'Purple 10', value: '#fbf0fc', description: 'Lightest purple' },
        { name: 'Purple 20', value: '#f8e8fa', description: 'Very light purple' },
        { name: 'Purple 30', value: '#f3d6f8', description: 'Light purple' },
        { name: 'Purple 40', value: '#eac1f4', description: 'Medium-light purple' },
        { name: 'Purple 50', value: '#dba9f1', description: 'Medium purple' },
        { name: 'Purple 60', value: '#c98ded', description: 'Medium-dark purple' },
        { name: 'Purple 70', value: '#b56bea', description: 'Dark purple' },
        { name: 'Purple 80', value: '#a14aea', description: 'Darker purple' },
        { name: 'Purple 90', value: '#8827dc', description: 'Very dark purple' },
        { name: 'Purple 100', value: '#701fc6', description: 'Very dark purple' },
        { name: 'Purple 110', value: '#5916a5', description: 'Darker purple' },
        { name: 'Purple 120', value: '#4a0f80', description: 'Very dark purple' },
        { name: 'Purple 130', value: '#3f0963', description: 'Very dark purple' },
        { name: 'Purple 140', value: '#330546', description: 'Darkest purple' },
      ],
      fuchsia: [
        { name: 'Fuchsia 10', value: '#fef0f7', description: 'Lightest fuchsia' },
        { name: 'Fuchsia 20', value: '#fde7f3', description: 'Very light fuchsia' },
        { name: 'Fuchsia 30', value: '#fed4e9', description: 'Light fuchsia' },
        { name: 'Fuchsia 40', value: '#ffbbdf', description: 'Medium-light fuchsia' },
        { name: 'Fuchsia 50', value: '#ff9dd0', description: 'Medium fuchsia' },
        { name: 'Fuchsia 60', value: '#ff75be', description: 'Medium-dark fuchsia' },
        { name: 'Fuchsia 70', value: '#ff2fab', description: 'Dark fuchsia' },
        { name: 'Fuchsia 80', value: '#e20093', description: 'Darker fuchsia' },
        { name: 'Fuchsia 90', value: '#c0007c', description: 'Very dark fuchsia' },
        { name: 'Fuchsia 100', value: '#a00068', description: 'Very dark fuchsia' },
        { name: 'Fuchsia 110', value: '#820058', description: 'Darker fuchsia' },
        { name: 'Fuchsia 120', value: '#660148', description: 'Very dark fuchsia' },
        { name: 'Fuchsia 130', value: '#52023a', description: 'Very dark fuchsia' },
        { name: 'Fuchsia 140', value: '#3e032b', description: 'Darkest fuchsia' },
      ],
      magenta: [
        { name: 'Magenta 10', value: '#fcf0fe', description: 'Lightest magenta' },
        { name: 'Magenta 20', value: '#f5cdfd', description: 'Very light magenta' },
        { name: 'Magenta 30', value: '#eca1fc', description: 'Light magenta' },
        { name: 'Magenta 40', value: '#e777fa', description: 'Medium-light magenta' },
        { name: 'Magenta 50', value: '#e349f9', description: 'Medium magenta' },
        { name: 'Magenta 60', value: '#c523da', description: 'Medium-dark magenta' },
        { name: 'Magenta 70', value: '#ab19bf', description: 'Dark magenta' },
        { name: 'Magenta 80', value: '#7c1089', description: 'Darker magenta' },
        { name: 'Magenta 90', value: '#4f0758', description: 'Very dark magenta' },
        { name: 'Magenta 100', value: '#310237', description: 'Darkest magenta' },
      ],
      orchid: [
        { name: 'Orchid 10', value: '#f6f2ff', description: 'Lightest orchid' },
        { name: 'Orchid 20', value: '#e0d4ff', description: 'Very light orchid' },
        { name: 'Orchid 30', value: '#c9afff', description: 'Light orchid' },
        { name: 'Orchid 40', value: '#b78fff', description: 'Medium-light orchid' },
        { name: 'Orchid 50', value: '#a972ff', description: 'Medium orchid' },
        { name: 'Orchid 60', value: '#9845ff', description: 'Medium-dark orchid' },
        { name: 'Orchid 70', value: '#8e06ff', description: 'Dark orchid' },
        { name: 'Orchid 80', value: '#6600bb', description: 'Darker orchid' },
        { name: 'Orchid 90', value: '#400079', description: 'Very dark orchid' },
        { name: 'Orchid 100', value: '#27004d', description: 'Darkest orchid' },
      ],
      teal: [
        { name: 'Teal 10', value: '#d2fffd', description: 'Lightest teal' },
        { name: 'Teal 20', value: '#5eede7', description: 'Very light teal' },
        { name: 'Teal 30', value: '#19d7cf', description: 'Light teal' },
        { name: 'Teal 40', value: '#0bb7b0', description: 'Medium-light teal' },
        { name: 'Teal 50', value: '#04a29a', description: 'Medium teal' },
        { name: 'Teal 60', value: '#01857f', description: 'Medium-dark teal' },
        { name: 'Teal 70', value: '#02726e', description: 'Dark teal' },
        { name: 'Teal 80', value: '#02504d', description: 'Darker teal' },
        { name: 'Teal 90', value: '#003330', description: 'Very dark teal' },
        { name: 'Teal 100', value: '#001d1c', description: 'Darkest teal' },
      ],
      warmRed: [
        { name: 'Warm Red 10', value: '#fff0f1', description: 'Lightest warm red' },
        { name: 'Warm Red 20', value: '#ffc9c7', description: 'Very light warm red' },
        { name: 'Warm Red 30', value: '#fea4a1', description: 'Light warm red' },
        { name: 'Warm Red 40', value: '#ff7c76', description: 'Medium-light warm red' },
        { name: 'Warm Red 50', value: '#ff5348', description: 'Medium warm red' },
        { name: 'Warm Red 60', value: '#e72501', description: 'Medium-dark warm red' },
        { name: 'Warm Red 70', value: '#c81d01', description: 'Dark warm red' },
        { name: 'Warm Red 80', value: '#911300', description: 'Darker warm red' },
        { name: 'Warm Red 90', value: '#5d0900', description: 'Very dark warm red' },
        { name: 'Warm Red 100', value: '#3a0300', description: 'Darkest warm red' },
      ],
      yellow: [
        { name: 'Yellow 10', value: '#fff7c4', description: 'Lightest yellow' },
        { name: 'Yellow 20', value: '#ffd651', description: 'Very light yellow' },
        { name: 'Yellow 30', value: '#f0b300', description: 'Light yellow' },
        { name: 'Yellow 40', value: '#df9b01', description: 'Medium-light yellow' },
        { name: 'Yellow 50', value: '#c98400', description: 'Medium yellow' },
        { name: 'Yellow 60', value: '#ac6600', description: 'Medium-dark yellow' },
        { name: 'Yellow 70', value: '#96530e', description: 'Dark yellow' },
        { name: 'Yellow 80', value: '#6f3b0d', description: 'Darker yellow' },
        { name: 'Yellow 90', value: '#4a2004', description: 'Very dark yellow' },
        { name: 'Yellow 100', value: '#300f02', description: 'Darkest yellow' },
      ],
    },
  };

  // Official Ink Design System Spacing Tokens
  const spacingTokens = [
    { name: 'spacingGap0', value: '0px', description: 'Zero spacing' },
    { name: 'spacingGap50', value: '4px', description: 'Extra extra small gap' },
    { name: 'spacingGap100', value: '8px', description: 'Extra small gap' },
    { name: 'spacingGap150', value: '12px', description: 'Small gap' },
    { name: 'spacingGap200', value: '16px', description: 'Medium gap (Default)' },
    { name: 'spacingGap250', value: '20px', description: 'Medium-large gap' },
    { name: 'spacingGap300', value: '24px', description: 'Large gap' },
    { name: 'spacingGap400', value: '32px', description: 'Extra large gap' },
    { name: 'spacingGap500', value: '40px', description: 'Extra extra large gap' },
    { name: 'spacingGap600', value: '48px', description: 'Huge gap' },
    { name: 'spacingGap700', value: '64px', description: 'Extra huge gap' },
  ];

  const iconNames = Object.keys(iconPaths);

  // Content rendering functions for each subpage
  const renderColorsContent = () => (
    <Stack gap="xlarge">
      <div>
        <Heading level={3}>Official Ink Design System Color Primitives</Heading>
        <Text color="secondary" size="sm">
          Ink uses two color categories: <strong>Semantic colors</strong> for UI elements and{' '}
          <strong>Extended colors</strong> for data visualization and accents
        </Text>
      </div>

      <Divider />

      {/* SEMANTIC COLORS SECTION */}
      <Stack gap="large">
        <div>
          <Heading level={3}>Semantic Colors</Heading>
          <Text color="secondary" size="sm">
            Core colors for UI components, states, and theming
          </Text>
        </div>

        {/* Semantic Cobalt */}
        <Stack gap="medium">
          <Heading level={4}>Semantic Cobalt</Heading>
          <Text size="sm" color="secondary">
            Primary brand color - Cobalt 100 (#4c00fb) is the signature Ink Cobalt used for brand
            actions
          </Text>
          <Grid columns={5} gap="medium">
            {colors.semantic.cobalt.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
                <Text size="xs" color="tertiary">
                  {color.description}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>

        {/* Semantic Neutral */}
        <Stack gap="medium">
          <Heading level={4}>Semantic Neutral</Heading>
          <Text size="sm" color="secondary">
            Core grays for text, borders, backgrounds, and UI structure
          </Text>
          <Grid columns={5} gap="medium">
            {colors.semantic.neutral.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
                <Text size="xs" color="tertiary">
                  {color.description}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>

        {/* Semantic Green */}
        <Stack gap="medium">
          <Heading level={4}>Semantic Green</Heading>
          <Text size="sm" color="secondary">
            Success states, confirmations, and positive feedback
          </Text>
          <Grid columns={5} gap="medium">
            {colors.semantic.green.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
                <Text size="xs" color="tertiary">
                  {color.description}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>

        {/* Semantic Red */}
        <Stack gap="medium">
          <Heading level={4}>Semantic Red</Heading>
          <Text size="sm" color="secondary">
            Errors, destructive actions, and critical alerts
          </Text>
          <Grid columns={5} gap="medium">
            {colors.semantic.red.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
                <Text size="xs" color="tertiary">
                  {color.description}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>

        {/* Semantic Orange */}
        <Stack gap="medium">
          <Heading level={4}>Semantic Orange</Heading>
          <Text size="sm" color="secondary">
            Warnings, notifications, and attention states
          </Text>
          <Grid columns={5} gap="medium">
            {colors.semantic.orange.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
                <Text size="xs" color="tertiary">
                  {color.description}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>

        {/* Semantic Ecru */}
        <Stack gap="medium">
          <Heading level={4}>Semantic Ecru</Heading>
          <Text size="sm" color="secondary">
            Warm tinted grays for subtle, sophisticated backgrounds
          </Text>
          <Grid columns={5} gap="medium">
            {colors.semantic.ecru.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
                <Text size="xs" color="tertiary">
                  {color.description}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>

        {/* Semantic Base Colors */}
        <Stack gap="medium">
          <Heading level={4}>Semantic Base Colors</Heading>
          <Text size="sm" color="secondary">
            Fundamental black and white values
          </Text>
          <Grid columns={5} gap="medium">
            {colors.semantic.base.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
                <Text size="xs" color="tertiary">
                  {color.description}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>
      </Stack>

      <Divider />

      {/* ACCENT COLORS SECTION */}
      <Stack gap="large">
        <div>
          <Heading level={3}>Accent Colors</Heading>
          <Text color="secondary" size="sm">
            Official Ink accent colors for data visualization, charts, and creative expression
          </Text>
        </div>

        {/* Accent Cyan */}
        <Stack gap="medium">
          <Heading level={4}>Accent Cyan</Heading>
          <Text size="sm" color="secondary">
            Cyan-blue for data visualization and fresh accents
          </Text>
          <Grid columns={5} gap="medium">
            {colors.accent.cyan.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>

        {/* Accent Purple */}
        <Stack gap="medium">
          <Heading level={4}>Accent Purple</Heading>
          <Text size="sm" color="secondary">
            Rich purple for creative and sophisticated elements
          </Text>
          <Grid columns={5} gap="medium">
            {colors.accent.purple.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>

        {/* Accent Fuchsia */}
        <Stack gap="medium">
          <Heading level={4}>Accent Fuchsia</Heading>
          <Text size="sm" color="secondary">
            Vibrant pink for attention and energy
          </Text>
          <Grid columns={5} gap="medium">
            {colors.accent.fuchsia.map((color) => (
              <div key={color.name}>
                <div
                  style={{
                    backgroundColor: color.value,
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px solid var(--ink-neutral-20)',
                    marginBottom: '8px',
                  }}
                />
                <Text size="sm" weight="medium">
                  {color.name}
                </Text>
                <Text size="xs" color="secondary">
                  {color.value}
                </Text>
              </div>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );

  const renderColorPairingContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Color Pairing Rules</Heading>
        <Text color="secondary" size="sm">
          Official guidelines for pairing text colors with background colors. All combinations meet
          WCAG AA accessibility standards.
        </Text>
      </div>

      <Divider />

      {/* Rule 1: Light Backgrounds */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <div>
              <Heading level={4}>Rule 1: Light Backgrounds → Dark Text</Heading>
              <Text size="sm" color="secondary">
                Use <code>--ink-font-default</code> or <code>--ink-font-neutral</code> on light
                backgrounds
              </Text>
            </div>

            <Grid columns={3} gap="medium">
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Default Background
                </Text>
                <div
                  style={{
                    backgroundColor: 'var(--ink-white-100)',
                    border: '1px solid var(--ink-neutral-20)',
                    borderRadius: '8px',
                    padding: '24px',
                    color: 'var(--ink-font-default)',
                  }}
                >
                  <Text>Primary text</Text>
                  <Text color="secondary">Secondary text</Text>
                </div>
                <Text size="xs" color="tertiary">
                  bg: white-100 → text: font-default
                </Text>
              </Stack>

              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Neutral Light
                </Text>
                <div
                  style={{
                    backgroundColor: 'var(--ink-neutral-10)',
                    borderRadius: '8px',
                    padding: '24px',
                    color: 'var(--ink-font-default)',
                  }}
                >
                  <Text>Primary text</Text>
                  <Text color="secondary">Secondary text</Text>
                </div>
                <Text size="xs" color="tertiary">
                  bg: neutral-10 → text: font-default
                </Text>
              </Stack>

              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Subtle Accent
                </Text>
                <div
                  style={{
                    backgroundColor: 'var(--ink-cobalt-10)',
                    borderRadius: '8px',
                    padding: '24px',
                    color: 'var(--ink-font-default)',
                  }}
                >
                  <Text>Primary text</Text>
                  <Text color="secondary">Secondary text</Text>
                </div>
                <Text size="xs" color="tertiary">
                  bg: cobalt-10 → text: font-default
                </Text>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      {/* Rule 2: Dark Backgrounds */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <div>
              <Heading level={4}>Rule 2: Dark Backgrounds → White Text</Heading>
              <Text size="sm" color="secondary">
                ALWAYS use <code>--ink-font-inverse</code> (white) on dark backgrounds (100+ level
                colors)
              </Text>
            </div>

            <Grid columns={3} gap="medium">
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Accent Background
                </Text>
                <div
                  style={{
                    backgroundColor: 'var(--ink-cobalt-100)',
                    borderRadius: '8px',
                    padding: '24px',
                    color: 'var(--ink-font-inverse)',
                  }}
                >
                  <Text style={{ color: 'var(--ink-font-inverse)' }}>White text on cobalt</Text>
                </div>
                <Text size="xs" color="tertiary">
                  bg: cobalt-100 → text: font-inverse
                </Text>
              </Stack>

              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Brand Background
                </Text>
                <div
                  style={{
                    backgroundColor: 'var(--ink-purple-100)',
                    borderRadius: '8px',
                    padding: '24px',
                    color: 'var(--ink-font-inverse)',
                  }}
                >
                  <Text style={{ color: 'var(--ink-font-inverse)' }}>White text on purple</Text>
                </div>
                <Text size="xs" color="tertiary">
                  bg: purple-100 → text: font-inverse
                </Text>
              </Stack>

              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Neutral Dark
                </Text>
                <div
                  style={{
                    backgroundColor: 'var(--ink-neutral-100)',
                    borderRadius: '8px',
                    padding: '24px',
                    color: 'var(--ink-font-inverse)',
                  }}
                >
                  <Text style={{ color: 'var(--ink-font-inverse)' }}>White text on neutral</Text>
                </div>
                <Text size="xs" color="tertiary">
                  bg: neutral-100 → text: font-inverse
                </Text>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      {/* Rule 3: Status Colors */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <div>
              <Heading level={4}>Rule 3: Status Color Pairing</Heading>
              <Text size="sm" color="secondary">
                Dark status backgrounds use white text, light status backgrounds use colored text
              </Text>
            </div>

            <Grid columns={2} gap="medium">
              {/* Success */}
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Success States
                </Text>
                <Stack gap="xsmall">
                  <div
                    style={{
                      backgroundColor: 'var(--ink-green-100)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-inverse)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-inverse)' }}>✓ Success (Dark)</Text>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-green-10)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-success)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-success)' }}>✓ Success (Light)</Text>
                  </div>
                </Stack>
              </Stack>

              {/* Error */}
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Error States
                </Text>
                <Stack gap="xsmall">
                  <div
                    style={{
                      backgroundColor: 'var(--ink-red-100)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-inverse)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-inverse)' }}>✕ Error (Dark)</Text>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-red-10)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-error)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-error)' }}>✕ Error (Light)</Text>
                  </div>
                </Stack>
              </Stack>

              {/* Warning */}
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Warning States
                </Text>
                <Stack gap="xsmall">
                  <div
                    style={{
                      backgroundColor: 'var(--ink-orange-100)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-inverse)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-inverse)' }}>⚠ Warning (Dark)</Text>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-orange-10)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-warning)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-warning)' }}>⚠ Warning (Light)</Text>
                  </div>
                </Stack>
              </Stack>

              {/* Info */}
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Info States
                </Text>
                <Stack gap="xsmall">
                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-100)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-inverse)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-inverse)' }}>ℹ Info (Dark)</Text>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-10)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-accent)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-accent)' }}>ℹ Info (Light)</Text>
                  </div>
                </Stack>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      {/* Quick Reference */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Quick Reference: Font Color Tokens</Heading>

            <Grid columns={2} gap="medium">
              <Stack gap="xsmall">
                <Text weight="semibold" size="sm">
                  Primary Text Colors
                </Text>
                <Text size="sm">
                  • <code>--ink-font-default</code>: Main text on light backgrounds
                </Text>
                <Text size="sm">
                  • <code>--ink-font-inverse</code>: Text on dark backgrounds
                </Text>
                <Text size="sm">
                  • <code>--ink-font-neutral</code>: Secondary/muted text
                </Text>
                <Text size="sm">
                  • <code>--ink-font-accent</code>: Accent/brand text
                </Text>
              </Stack>

              <Stack gap="xsmall">
                <Text weight="semibold" size="sm">
                  Status Text Colors
                </Text>
                <Text size="sm">
                  • <code>--ink-font-success</code>: Success messages
                </Text>
                <Text size="sm">
                  • <code>--ink-font-error</code>: Error messages
                </Text>
                <Text size="sm">
                  • <code>--ink-font-warning</code>: Warning messages
                </Text>
                <Text size="sm">
                  • <code>--ink-font-disabled</code>: Disabled state
                </Text>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      {/* Common Mistakes */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Common Mistakes to Avoid</Heading>

            <Grid columns={2} gap="large">
              <Stack gap="medium">
                <Text weight="semibold" size="sm" style={{ color: 'var(--ink-red-100)' }}>
                  ❌ DON'T
                </Text>
                <Stack gap="small">
                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-100)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-default)',
                      border: '2px solid var(--ink-red-100)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-default)' }}>
                      Dark text on dark background
                    </Text>
                    <Text size="xs" style={{ color: 'var(--ink-font-default)', opacity: 0.7 }}>
                      Poor contrast - unreadable
                    </Text>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-10)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-white-100)',
                      border: '2px solid var(--ink-red-100)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-white-100)' }}>
                      White text on light background
                    </Text>
                    <Text size="xs" style={{ color: 'var(--ink-white-100)' }}>
                      Poor contrast - unreadable
                    </Text>
                  </div>
                </Stack>
              </Stack>

              <Stack gap="medium">
                <Text weight="semibold" size="sm" style={{ color: 'var(--ink-green-100)' }}>
                  ✓ DO
                </Text>
                <Stack gap="small">
                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-100)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-inverse)',
                      border: '2px solid var(--ink-green-100)',
                    }}
                  >
                    <Text style={{ color: 'var(--ink-font-inverse)' }}>
                      White text on dark background
                    </Text>
                    <Text size="xs" style={{ color: 'var(--ink-font-inverse)', opacity: 0.9 }}>
                      Good contrast - readable
                    </Text>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-10)',
                      borderRadius: '8px',
                      padding: '16px',
                      color: 'var(--ink-font-default)',
                      border: '2px solid var(--ink-green-100)',
                    }}
                  >
                    <Text>Dark text on light background</Text>
                    <Text size="xs" color="secondary">
                      Good contrast - readable
                    </Text>
                  </div>
                </Stack>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      {/* Documentation Link */}
      <Card>
        <Card.Body>
          <Stack gap="small">
            <Heading level={4}>Complete Documentation</Heading>
            <Text size="sm">
              For the complete color pairing rules including button variants, badges, alerts, and
              accessibility guidelines, see <code>/src/design-system/COLOR_PAIRING_RULES.md</code>
            </Text>
            <Text size="sm" color="secondary">
              All color pairings in the Ink Design System meet WCAG AA accessibility standards
              (4.5:1 contrast ratio for normal text, 3:1 for large text).
            </Text>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderTypographyContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Official Ink Typography System</Heading>
        <Text color="secondary" size="sm">
          Ink uses four primary type categories (Display, Heading, Body, Detail) plus specialized
          component styles
        </Text>
      </div>

      <Divider />

      {/* Display Typography */}
      <Stack gap="medium">
        <div>
          <Heading level={4}>Display</Heading>
          <Text size="sm" color="secondary">
            Largest typography for hero sections and marketing content. All use weight 400 with
            compact letter-spacing.
          </Text>
        </div>

        <Stack gap="small">
          <div
            style={{
              fontSize: '72px',
              fontWeight: 400,
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            Display XL
          </div>
          <Text size="xs" color="secondary">
            fontDisplayXL: 72px / 400 / 1.1 line-height / -0.02em
          </Text>
        </Stack>

        <Stack gap="small">
          <div
            style={{
              fontSize: '64px',
              fontWeight: 400,
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            Display L
          </div>
          <Text size="xs" color="secondary">
            fontDisplayL: 64px / 400 / 1.1 line-height / -0.02em
          </Text>
        </Stack>

        <Stack gap="small">
          <div
            style={{
              fontSize: '56px',
              fontWeight: 400,
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            Display M
          </div>
          <Text size="xs" color="secondary">
            fontDisplayM: 56px / 400 / 1.1 line-height / -0.02em
          </Text>
        </Stack>

        <Stack gap="small">
          <div
            style={{
              fontSize: '48px',
              fontWeight: 400,
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            Display S
          </div>
          <Text size="xs" color="secondary">
            fontDisplayS: 48px / 400 / 1.1 line-height / -0.02em
          </Text>
        </Stack>

        <Stack gap="small">
          <div
            style={{
              fontSize: '40px',
              fontWeight: 400,
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            Display XS
          </div>
          <Text size="xs" color="secondary">
            fontDisplayXS: 40px / 400 / 1.1 line-height / -0.02em
          </Text>
        </Stack>
      </Stack>

      <Divider />

      {/* Heading Typography */}
      <Stack gap="medium">
        <div>
          <Heading level={4}>Heading</Heading>
          <Text size="sm" color="secondary">
            Section titles and page headings. Uses cozy letter-spacing and small line-height for
            hierarchy.
          </Text>
        </div>

        <Stack gap="small">
          <div
            style={{
              fontSize: '32px',
              fontWeight: 400,
              lineHeight: '1.1',
              letterSpacing: '0.01em',
            }}
          >
            Heading M
          </div>
          <Text size="xs" color="secondary">
            fontHeadingM: 32px / 400 / 1.1 line-height / 0.01em
          </Text>
        </Stack>

        <Stack gap="small">
          <div
            style={{
              fontSize: '24px',
              fontWeight: 400,
              lineHeight: '1.1',
              letterSpacing: '0.01em',
            }}
          >
            Heading S
          </div>
          <Text size="xs" color="secondary">
            fontHeadingS: 24px / 400 / 1.1 line-height / 0.01em
          </Text>
        </Stack>

        <Stack gap="small">
          <div
            style={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '1.1',
              letterSpacing: '0.01em',
            }}
          >
            Heading XS
          </div>
          <Text size="xs" color="secondary">
            fontHeadingXS: 20px / 500 / 1.1 line-height / 0.01em
          </Text>
        </Stack>

        <Stack gap="small">
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '1.1',
              letterSpacing: '0.01em',
            }}
          >
            Heading XXS
          </div>
          <Text size="xs" color="secondary">
            fontHeadingXXS: 16px / 500 / 1.1 line-height / 0.01em
          </Text>
        </Stack>
      </Stack>

      <Divider />

      {/* Body Typography */}
      <Stack gap="medium">
        <div>
          <Heading level={4}>Body</Heading>
          <Text size="sm" color="secondary">
            Main content text. All use weight 400 with comfortable reading line-heights.
          </Text>
        </div>

        <Stack gap="small">
          <div style={{ fontSize: '24px', fontWeight: 400, lineHeight: '1.5' }}>
            Body XL - Main content for emphasizing important paragraphs
          </div>
          <Text size="xs" color="secondary">
            fontBodyXL: 24px / 400 / 1.5 line-height
          </Text>
        </Stack>

        <Stack gap="small">
          <div style={{ fontSize: '20px', fontWeight: 400, lineHeight: '1.5' }}>
            Body L - Larger content for better readability in spacious layouts
          </div>
          <Text size="xs" color="secondary">
            fontBodyL: 20px / 400 / 1.5 line-height
          </Text>
        </Stack>

        <Stack gap="small">
          <div style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.5' }}>
            Body M - Standard body text for most content (Default)
          </div>
          <Text size="xs" color="secondary">
            fontBodyM: 16px / 400 / 1.5 line-height
          </Text>
        </Stack>

        <Stack gap="small">
          <div style={{ fontSize: '14px', fontWeight: 400, lineHeight: '1.4' }}>
            Body S - Smaller content for compact interfaces and secondary information
          </div>
          <Text size="xs" color="secondary">
            fontBodyS: 14px / 400 / 1.4 line-height
          </Text>
        </Stack>
      </Stack>

      <Divider />

      {/* Detail Typography */}
      <Stack gap="medium">
        <div>
          <Heading level={4}>Detail</Heading>
          <Text size="sm" color="secondary">
            Small labels, metadata, and fine print. Uses weight 500 with increased letter-spacing
            for legibility.
          </Text>
        </div>

        <Stack gap="small">
          <div
            style={{
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '1.5',
              letterSpacing: '0.02em',
            }}
          >
            DETAIL S - UPPERCASE LABELS AND METADATA
          </div>
          <Text size="xs" color="secondary">
            fontDetailS: 12px / 500 / 1.5 line-height / 0.02em (wide)
          </Text>
        </Stack>

        <Stack gap="small">
          <div
            style={{
              fontSize: '10px',
              fontWeight: 500,
              lineHeight: '1.5',
              letterSpacing: '0.04em',
            }}
          >
            DETAIL XS - VERY SMALL LABELS
          </div>
          <Text size="xs" color="secondary">
            fontDetailXS: 10px / 500 / 1.5 line-height / 0.04em (open)
          </Text>
        </Stack>
      </Stack>

      <Divider />

      {/* Specialized Component Typography */}
      <Stack gap="medium">
        <div>
          <Heading level={4}>Specialized Component Styles</Heading>
          <Text size="sm" color="secondary">
            Typography tokens designed for specific UI components
          </Text>
        </div>

        <Grid columns={2} gap="medium">
          {/* Button */}
          <Stack gap="xsmall">
            <div style={{ fontSize: '16px', fontWeight: 500, lineHeight: '1.5' }}>Button Text</div>
            <Text size="xs" color="secondary">
              fontButton: 16px / 500 / 1.5 line-height
            </Text>
          </Stack>

          {/* Button S */}
          <Stack gap="xsmall">
            <div style={{ fontSize: '14px', fontWeight: 500, lineHeight: '1.4' }}>Button Small</div>
            <Text size="xs" color="secondary">
              fontButtonS: 14px / 500 / 1.4 line-height
            </Text>
          </Stack>

          {/* Tab */}
          <Stack gap="xsmall">
            <div style={{ fontSize: '14px', fontWeight: 500, lineHeight: '1.4' }}>Tab Label</div>
            <Text size="xs" color="secondary">
              fontTab: 14px / 500 / 1.4 line-height
            </Text>
          </Stack>

          {/* Label */}
          <Stack gap="xsmall">
            <div style={{ fontSize: '14px', fontWeight: 500, lineHeight: '1.4' }}>Input Label</div>
            <Text size="xs" color="secondary">
              fontLabel: 14px / 500 / 1.4 line-height
            </Text>
          </Stack>

          {/* Label Emphasis */}
          <Stack gap="xsmall">
            <div style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.4' }}>
              Label Emphasis
            </div>
            <Text size="xs" color="secondary">
              fontLabelEmphasis: 14px / 600 / 1.4 line-height
            </Text>
          </Stack>

          {/* Section Headline */}
          <Stack gap="xsmall">
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '1.5',
                letterSpacing: '0.02em',
              }}
            >
              SECTION HEADLINE
            </div>
            <Text size="xs" color="secondary">
              fontSectionHeadline: 12px / 600 / 1.5 / 0.8px
            </Text>
          </Stack>

          {/* Breadcrumb */}
          <Stack gap="xsmall">
            <div style={{ fontSize: '14px', fontWeight: 400, lineHeight: 'normal' }}>
              Breadcrumb
            </div>
            <Text size="xs" color="secondary">
              fontBreadcrumb: 14px / 400 / normal
            </Text>
          </Stack>

          {/* Breadcrumb Active */}
          <Stack gap="xsmall">
            <div style={{ fontSize: '14px', fontWeight: 500, lineHeight: 'normal' }}>
              Breadcrumb Active
            </div>
            <Text size="xs" color="secondary">
              fontBreadcrumbActive: 14px / 500 / normal
            </Text>
          </Stack>

          {/* Badge */}
          <Stack gap="xsmall">
            <div
              style={{
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '1.5',
                letterSpacing: '0.02em',
              }}
            >
              BADGE
            </div>
            <Text size="xs" color="secondary">
              fontBadge: 12px / 500 / 1.5 / 0.02em
            </Text>
          </Stack>

          {/* Avatar Group */}
          <Stack gap="xsmall">
            <div
              style={{
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '1.5',
                letterSpacing: '0.02em',
              }}
            >
              AV
            </div>
            <Text size="xs" color="secondary">
              fontAvatarGroup: 12px / 500 / 1.5 / 0.02em
            </Text>
          </Stack>

          {/* Link */}
          <Stack gap="xsmall">
            <div
              style={{
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '1.5',
                textDecoration: 'underline',
              }}
            >
              Link Text
            </div>
            <Text size="xs" color="secondary">
              fontLink: 16px / 400 / 1.5 / underline
            </Text>
          </Stack>

          {/* Link S */}
          <Stack gap="xsmall">
            <div
              style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '1.4',
                textDecoration: 'underline',
              }}
            >
              Link Small
            </div>
            <Text size="xs" color="secondary">
              fontLinkS: 14px / 400 / 1.4 / underline
            </Text>
          </Stack>
        </Grid>
      </Stack>
    </Stack>
  );

  const renderIconsContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Official Ink Icon System</Heading>
        <Text color="secondary" size="sm">
          System icons from @ds/icons - monochromatic SVG icons with consistent sizing and line
          weight. All icons use a 24x24 viewBox.
        </Text>
      </div>

      <Divider />

      {/* Icon Sizes */}
      <Stack gap="medium">
        <div>
          <Heading level={4}>Icon Sizes</Heading>
          <Text size="sm" color="secondary">
            Five standard sizes for icons, maintaining consistent visual weight across all sizes
          </Text>
        </div>

        <Grid columns={5} gap="large">
          <Stack gap="small" align="center">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60px',
                width: '60px',
                border: '1px solid var(--ink-neutral-20)',
                borderRadius: '8px',
              }}
            >
              <Icon name="check-circle" size="xsmall" />
            </div>
            <Text size="sm" weight="medium">
              XSmall
            </Text>
            <Text size="xs" color="secondary">
              16px × 16px
            </Text>
          </Stack>

          <Stack gap="small" align="center">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60px',
                width: '60px',
                border: '1px solid var(--ink-neutral-20)',
                borderRadius: '8px',
              }}
            >
              <Icon name="check-circle" size="small" />
            </div>
            <Text size="sm" weight="medium">
              Small
            </Text>
            <Text size="xs" color="secondary">
              20px × 20px
            </Text>
          </Stack>

          <Stack gap="small" align="center">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60px',
                width: '60px',
                border: '1px solid var(--ink-neutral-20)',
                borderRadius: '8px',
              }}
            >
              <Icon name="check-circle" size="medium" />
            </div>
            <Text size="sm" weight="medium">
              Medium
            </Text>
            <Text size="xs" color="secondary">
              24px × 24px (Default)
            </Text>
          </Stack>

          <Stack gap="small" align="center">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60px',
                width: '60px',
                border: '1px solid var(--ink-neutral-20)',
                borderRadius: '8px',
              }}
            >
              <Icon name="check-circle" size="large" />
            </div>
            <Text size="sm" weight="medium">
              Large
            </Text>
            <Text size="xs" color="secondary">
              32px × 32px
            </Text>
          </Stack>

          <Stack gap="small" align="center">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60px',
                width: '60px',
                border: '1px solid var(--ink-neutral-20)',
                borderRadius: '8px',
              }}
            >
              <Icon name="check-circle" size="xlarge" />
            </div>
            <Text size="sm" weight="medium">
              XLarge
            </Text>
            <Text size="xs" color="secondary">
              40px × 40px
            </Text>
          </Stack>
        </Grid>
      </Stack>

      <Divider />

      {/* Icon Grid */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <div>
              <Heading level={4}>Available Icons</Heading>
              <Text size="sm" color="secondary">
                {Object.keys(iconPaths).length} icons extracted from the official @ds/icons package.
                All icons are monochromatic and designed for UI use.
              </Text>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: 'var(--ink-spacing-3)',
                width: '100%',
              }}
            >
              {iconNames.map((iconName) => (
                <div
                  key={iconName}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 8px',
                    border: '1px solid var(--ink-neutral-10)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    minHeight: '90px',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--ink-neutral-30)';
                    e.currentTarget.style.backgroundColor = 'var(--ink-neutral-5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--ink-neutral-10)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon name={iconName} size="medium" />
                  <Text
                    size="xs"
                    color="secondary"
                    align="center"
                    style={{
                      wordBreak: 'break-word',
                      lineHeight: '1.3',
                      width: '100%',
                    }}
                  >
                    {iconName}
                  </Text>
                </div>
              ))}
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderSpacingContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Official Ink Spacing System</Heading>
        <Text color="secondary" size="sm">
          Consistent spacing tokens using the spacingGap scale. Based on an 8px grid system with
          additional values for fine-tuning.
        </Text>
      </div>

      <Divider />

      <Stack gap="medium">
        <div>
          <Heading level={4}>Spacing Scale</Heading>
          <Text size="sm" color="secondary">
            The spacingGap tokens provide a consistent spatial rhythm throughout the interface.
            Primarily based on 8px increments (spacingGap100 = 8px, spacingGap200 = 16px,
            spacingGap300 = 24px, etc.)
          </Text>
        </div>

        <Stack gap="medium">
          {spacingTokens.map((token) => (
            <Stack key={token.name} gap="small">
              <Stack direction="horizontal" gap="medium" align="center">
                <div
                  style={{
                    width: token.value === '0px' ? '2px' : token.value,
                    height: '32px',
                    backgroundColor:
                      token.value === '0px'
                        ? 'var(--ink-neutral-30)'
                        : 'var(--ink-semantic-blue-60)',
                    borderRadius: '4px',
                    border: token.value === '0px' ? '1px dashed var(--ink-neutral-40)' : 'none',
                    minWidth: token.value === '0px' ? '2px' : '4px',
                  }}
                />
                <Stack gap="xsmall" style={{ minWidth: '180px' }}>
                  <Text weight="medium">{token.name}</Text>
                  <Text size="xs" color="tertiary">
                    {token.description}
                  </Text>
                </Stack>
                <Text size="sm" color="secondary" weight="medium" style={{ minWidth: '50px' }}>
                  {token.value}
                </Text>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="medium">
        <div>
          <Heading level={4}>Deprecated Naming (Legacy)</Heading>
          <Text size="sm" color="secondary">
            Previous spacing tokens are deprecated in favor of the spacingGap scale
          </Text>
        </div>

        <Grid columns={2} gap="medium">
          <Stack gap="xsmall">
            <Text weight="medium" size="sm">
              spacingXXS (Deprecated)
            </Text>
            <Text size="xs" color="secondary">
              → Use spacingGap50 (4px)
            </Text>
          </Stack>
          <Stack gap="xsmall">
            <Text weight="medium" size="sm">
              spacingXS (Deprecated)
            </Text>
            <Text size="xs" color="secondary">
              → Use spacingGap100 (8px)
            </Text>
          </Stack>
          <Stack gap="xsmall">
            <Text weight="medium" size="sm">
              spacingS (Deprecated)
            </Text>
            <Text size="xs" color="secondary">
              → Use spacingGap150 (12px)
            </Text>
          </Stack>
          <Stack gap="xsmall">
            <Text weight="medium" size="sm">
              spacingM (Deprecated)
            </Text>
            <Text size="xs" color="secondary">
              → Use spacingGap200 (16px)
            </Text>
          </Stack>
          <Stack gap="xsmall">
            <Text weight="medium" size="sm">
              spacingL (Deprecated)
            </Text>
            <Text size="xs" color="secondary">
              → Use spacingGap300 (24px)
            </Text>
          </Stack>
          <Stack gap="xsmall">
            <Text weight="medium" size="sm">
              spacingXL (Deprecated)
            </Text>
            <Text size="xs" color="secondary">
              → Use spacingGap400 (32px)
            </Text>
          </Stack>
          <Stack gap="xsmall">
            <Text weight="medium" size="sm">
              spacingXXL (Deprecated)
            </Text>
            <Text size="xs" color="secondary">
              → Use spacingGap500 (40px)
            </Text>
          </Stack>
          <Stack gap="xsmall">
            <Text weight="medium" size="sm">
              spacingXXXL (Deprecated)
            </Text>
            <Text size="xs" color="secondary">
              → Use spacingGap600 (48px)
            </Text>
          </Stack>
        </Grid>
      </Stack>
    </Stack>
  );

  const renderBorderRadiusContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Official Ink Border & Radius System</Heading>
        <Text color="secondary" size="sm">
          Border width and corner radius tokens for consistent edge styling across components
        </Text>
      </div>

      <Divider />

      {/* Border Width */}
      <Stack gap="medium">
        <div>
          <Heading level={4}>Border Width</Heading>
          <Text size="sm" color="secondary">
            Two standard border widths for UI elements. Most components use borderWidthXS (1px) for
            subtle borders.
          </Text>
        </div>

        <Grid columns={2} gap="large">
          <Stack gap="small">
            <div
              style={{
                width: '100%',
                height: '80px',
                border: '1px solid var(--ink-semantic-blue-60)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--ink-semantic-blue-10)',
              }}
            >
              <Text size="sm" color="secondary">
                borderWidthXS
              </Text>
            </div>
            <Text weight="medium">borderWidthXS</Text>
            <Text size="xs" color="secondary">
              size.10 = 1px
            </Text>
            <Text size="xs" color="tertiary">
              Standard border for inputs, cards, containers
            </Text>
          </Stack>

          <Stack gap="small">
            <div
              style={{
                width: '100%',
                height: '80px',
                border: '2px solid var(--ink-semantic-blue-60)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--ink-semantic-blue-10)',
              }}
            >
              <Text size="sm" color="secondary">
                borderWidthS
              </Text>
            </div>
            <Text weight="medium">borderWidthS</Text>
            <Text size="xs" color="secondary">
              size.20 = 2px
            </Text>
            <Text size="xs" color="tertiary">
              Emphasized borders for focus states, selected items
            </Text>
          </Stack>
        </Grid>
      </Stack>

      <Divider />

      {/* Corner Radius */}
      <Stack gap="medium">
        <div>
          <Heading level={4}>Corner Radius</Heading>
          <Text size="sm" color="secondary">
            Five radius values for different component sizes and hierarchy. Larger components
            typically use larger radii.
          </Text>
        </div>

        <Grid columns={3} gap="large">
          <Stack gap="small" align="center">
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--ink-semantic-blue-60)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text size="sm" style={{ color: 'white' }}>
                4px
              </Text>
            </div>
            <Text weight="medium">radiusSizeXS</Text>
            <Text size="xs" color="secondary">
              dimension.4 = 4px
            </Text>
            <Text size="xs" color="tertiary" align="center">
              Small elements, badges, tags
            </Text>
          </Stack>

          <Stack gap="small" align="center">
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--ink-semantic-blue-60)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text size="sm" style={{ color: 'white' }}>
                8px
              </Text>
            </div>
            <Text weight="medium">radiusSizeS</Text>
            <Text size="xs" color="secondary">
              dimension.8 = 8px
            </Text>
            <Text size="xs" color="tertiary" align="center">
              Buttons, inputs, small cards
            </Text>
          </Stack>

          <Stack gap="small" align="center">
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--ink-semantic-blue-60)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text size="sm" style={{ color: 'white' }}>
                12px
              </Text>
            </div>
            <Text weight="medium">radiusSizeM</Text>
            <Text size="xs" color="secondary">
              dimension.12 = 12px
            </Text>
            <Text size="xs" color="tertiary" align="center">
              Standard cards, modals
            </Text>
          </Stack>

          <Stack gap="small" align="center">
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--ink-semantic-blue-60)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text size="sm" style={{ color: 'white' }}>
                16px
              </Text>
            </div>
            <Text weight="medium">radiusSizeL</Text>
            <Text size="xs" color="secondary">
              dimension.16 = 16px
            </Text>
            <Text size="xs" color="tertiary" align="center">
              Large cards, containers
            </Text>
          </Stack>

          <Stack gap="small" align="center">
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--ink-semantic-blue-60)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text size="sm" style={{ color: 'white' }}>
                Full
              </Text>
            </div>
            <Text weight="medium">radiusSizeFull</Text>
            <Text size="xs" color="secondary">
              dimension.9999 = 9999px
            </Text>
            <Text size="xs" color="tertiary" align="center">
              Fully rounded (pills, avatars)
            </Text>
          </Stack>
        </Grid>
      </Stack>
    </Stack>
  );

  const renderAliasTokensContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Official Ink Alias Tokens</Heading>
        <Text color="secondary" size="sm">
          Semantic, scoped tokens for specific use cases. Use alias tokens correctly scoped for the
          elements they are applied to.
        </Text>
      </div>

      <Divider />

      {/* Background Alias Tokens */}
      <Stack gap="medium">
        <Heading level={4}>Background Colors (bgColor)</Heading>
        <Text size="sm" color="secondary">
          21 background alias tokens with Standard/Inverse theming support
        </Text>

        {/* Default & Accent Backgrounds */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Default & Accent</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Default background for pages and containers</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: white.100 | Inverse: neutral.140
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorAccent
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-100)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm" style={{ color: 'var(--ink-white-100)' }}>
                      Accent background
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.100 | Inverse: cobalt.100
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorAccentEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-140)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Strong accent background
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.140 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorAccentSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-cobalt-40)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle accent background</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.40 | Inverse: cobalt.140
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Canvas Backgrounds */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Canvas</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorCanvasDocument
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-20)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Document canvas background</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.20 | Inverse: neutral.120
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorCanvasPage
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-10)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Page canvas background</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.10 | Inverse: neutral.130
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Status Backgrounds - Error */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Error Status</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorError
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-red-20)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Error background</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.20 | Inverse: red.130
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorErrorEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-red-110)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Strong error
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.110 | Inverse: red.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorErrorSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-red-10)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle error tint</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.10 | Inverse: red.140
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Glass Effects */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Glass Effects</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorGlassFrost
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <Text size="sm">Frosted glass effect</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: white.fade.90 | Inverse: neutral.fade.90
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorGlassTint
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Tinted glass effect
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.90 | Inverse: neutral.fade.90
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Inverse & Popover */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Inverse & Popover</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorInverse
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-140)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Inverse background
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.140 | Inverse: white.100
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorPopoverClose
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      border: '1px solid var(--ink-neutral-30)',
                    }}
                  >
                    <Text size="sm">Popover close hover</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: white.fade.80 | Inverse: neutral.fade.80
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorPopoverCloseInverse
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Inverse popover close
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.80 | Inverse: white.fade.80
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Scrim */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Scrim</Heading>
              <Stack gap="small">
                <Text size="sm" weight="semibold">
                  bgColorScrim
                </Text>
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '8px',
                    padding: '24px',
                    minHeight: '80px',
                    color: 'white',
                  }}
                >
                  <Text size="sm" style={{ color: 'white' }}>
                    Modal overlay / backdrop
                  </Text>
                </div>
                <Text size="xs" color="tertiary">
                  Standard: neutral.fade.80 | Inverse: neutral.fade.80
                </Text>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>

        {/* Status Backgrounds - Success */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Success Status</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorSuccess
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-green-20)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Success background</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.20 | Inverse: green.130
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorSuccessEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-green-110)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Strong success
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.110 | Inverse: green.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorSuccessSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-green-10)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle success tint</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.10 | Inverse: green.140
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Status Backgrounds - Warning */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Warning Status</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorWarning
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-orange-20)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Warning background</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.20 | Inverse: orange.130
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorWarningEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-orange-110)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Strong warning
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.110 | Inverse: orange.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    bgColorWarningSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-orange-10)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle warning tint</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.10 | Inverse: orange.140
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>

      <Divider />

      {/* Border Alias Tokens */}
      <Stack gap="medium">
        <Heading level={4}>Border Colors (borderColor)</Heading>
        <Text size="sm" color="secondary">
          17 border color alias tokens + 2 width tokens with Standard/Inverse theming support
        </Text>

        {/* Default & Emphasis Borders */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Default & Emphasis</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Default border for inputs, cards</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.50 | Inverse: white.fade.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle dividing borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.10 | Inverse: white.fade.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-neutral-140)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Strong emphasis borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.140 | Inverse: white.100
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorSubtleInverse
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-100)',
                      border: '3px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Inverse subtle borders
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: white.fade.10 | Inverse: neutral.fade.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorEmphasisInverse
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-100)',
                      border: '3px solid var(--ink-white)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                      color: 'white',
                    }}
                  >
                    <Text size="sm" style={{ color: 'white' }}>
                      Inverse emphasis borders
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: white.100 | Inverse: neutral.140
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Accent Borders */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Accent Borders</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorAccent
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-cobalt-100)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Accent borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.100 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorAccentEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-cobalt-110)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Strong accent borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.110 | Inverse: cobalt.20
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorAccentSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-cobalt-80)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle accent borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.80 | Inverse: cobalt.60
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Error Borders */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Error Borders</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorError
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-red-80)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Error borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.80 | Inverse: red.60
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorErrorEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-red-110)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Strong error borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.110 | Inverse: red.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorErrorSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-red-70)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle error borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.70 | Inverse: red.70
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Success Borders */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Success Borders</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorSuccess
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-green-80)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Success borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.80 | Inverse: green.60
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorSuccessEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-green-110)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Strong success borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.110 | Inverse: green.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorSuccessSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-green-70)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle success borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.70 | Inverse: green.70
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Warning Borders */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Warning Borders</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorWarning
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-orange-90)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Warning borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.90 | Inverse: orange.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorWarningEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-orange-110)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Strong warning borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.110 | Inverse: orange.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderColorWarningSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '3px solid var(--ink-orange-80)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">Subtle warning borders</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.80 | Inverse: orange.60
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Border Widths */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Border Widths</Heading>
              <Text size="sm" color="secondary">
                2 border width tokens for consistent stroke weights
              </Text>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderWidthXS
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-100)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">1px border weight</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    size.10 = 1px
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    borderWidthS
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '2px solid var(--ink-neutral-100)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="sm">2px border weight</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    size.20 = 2px
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>

      <Divider />

      {/* Font Color Alias Tokens */}
      <Stack gap="medium">
        <Heading level={4}>Font Colors (fontColor)</Heading>
        <Text size="sm" color="secondary">
          25 font color alias tokens for text styling across different states and contexts
        </Text>

        {/* Default & Basic Font Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Default & Basic</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-neutral-100)' }}>
                      Default text color for body content
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.90 | Inverse: white.100
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-neutral-70)' }}>
                      Subtle secondary text
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.70 | Inverse: white.fade.70
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorDisabled
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-neutral-40)' }}>
                      Disabled text
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.30 | Inverse: white.fade.20
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorInverse
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-100)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'white' }}>
                      Inverse text for dark backgrounds
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: white.100 | Inverse: neutral.fade.90
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorSubtleInverse
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-100)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Subtle inverse text
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: white.fade.70 | Inverse: neutral.fade.70
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Accent Font Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Accent Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorAccent
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-cobalt-100)' }}>
                      Accent text
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.100 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorAccentEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-cobalt-110)' }}>
                      Strong accent
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.110 | Inverse: cobalt.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorAccentSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-cobalt-30)' }}>
                      Subtle accent
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.30 | Inverse: cobalt.100
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Link Font Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Link Colors (Interactive States)</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorLink
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text
                      size="lg"
                      style={{
                        color: 'var(--ink-cobalt-100)',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Default link color
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.100 | Inverse: cobalt.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorLinkHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text
                      size="lg"
                      style={{
                        color: 'var(--ink-cobalt-110)',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Link hover state
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.110 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorLinkActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text
                      size="lg"
                      style={{
                        color: 'var(--ink-cobalt-120)',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Link active/pressed
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.120 | Inverse: cobalt.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorLinkVisited
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text
                      size="lg"
                      style={{
                        color: 'var(--ink-cobalt-140)',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Visited link
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.140 | Inverse: cobalt.20
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorLinkSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text
                      size="lg"
                      style={{
                        color: 'var(--ink-neutral-100)',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Subtle link
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.90 | Inverse: white.100
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorLinkSubtleHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text
                      size="lg"
                      style={{
                        color: 'var(--ink-neutral-80)',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Subtle link hover
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.80 | Inverse: white.fade.80
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Status Font Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Status Colors (Error, Success, Warning)</Heading>
              <Grid columns={3} gap="medium">
                {/* Error */}
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorError
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-red-90)' }}>
                      Error text
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.90 | Inverse: red.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorErrorEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-red-100)' }}>
                      Strong error
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.100 | Inverse: red.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorErrorSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-red-30)' }}>
                      Subtle error
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.30 | Inverse: red.100
                  </Text>
                </Stack>

                {/* Success */}
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorSuccess
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-green-90)' }}>
                      Success text
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.90 | Inverse: green.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorSuccessEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-green-100)' }}>
                      Strong success
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.100 | Inverse: green.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorSuccessSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-green-30)' }}>
                      Subtle success
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.30 | Inverse: green.100
                  </Text>
                </Stack>

                {/* Warning */}
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorWarning
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-orange-90)' }}>
                      Warning text
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.90 | Inverse: orange.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorWarningEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-orange-100)' }}>
                      Strong warning
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.100 | Inverse: orange.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontColorWarningSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '24px',
                      minHeight: '80px',
                    }}
                  >
                    <Text size="lg" style={{ color: 'var(--ink-orange-30)' }}>
                      Subtle warning
                    </Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.30 | Inverse: orange.100
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>

      <Divider />

      {/* Bar Tokens (Progress Bars, Steppers) */}
      <Stack gap="medium">
        <Heading level={4}>Bar Colors & Widths (Progress Bars, Steppers)</Heading>
        <Text size="sm" color="secondary">
          11 bar color tokens + 3 width tokens for progress indicators, steppers, and track elements
        </Text>

        {/* Bar Fill Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Fill Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barFillColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '70%',
                          height: '100%',
                          backgroundColor: 'var(--ink-cobalt-80)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.80 | Inverse: cobalt.60
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barFillColorEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '70%',
                          height: '100%',
                          backgroundColor: 'var(--ink-neutral-140)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.140 | Inverse: white.100
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barFillColorAccentEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '70%',
                          height: '100%',
                          backgroundColor: 'var(--ink-cobalt-120)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.120 | Inverse: cobalt.20
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barFillColorError
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '70%',
                          height: '100%',
                          backgroundColor: 'var(--ink-red-80)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.80 | Inverse: red.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barFillColorSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '70%',
                          height: '100%',
                          backgroundColor: 'var(--ink-neutral-70)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.70 | Inverse: white.fade.70
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barFillColorSuccess
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '70%',
                          height: '100%',
                          backgroundColor: 'var(--ink-green-80)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: green.80 | Inverse: green.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barFillColorWarning
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '70%',
                          height: '100%',
                          backgroundColor: 'var(--ink-orange-80)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: orange.80 | Inverse: orange.50
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Bar Track & Indicator Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Track & Indicator Colors</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barStopIndicatorColor
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '4px',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '0',
                          bottom: '0',
                          width: '2px',
                          backgroundColor: 'var(--ink-neutral-50)',
                          transform: 'translateX(-50%)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.50 | Inverse: white.fade.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barTrackColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-10)',
                        borderRadius: '4px',
                      }}
                    ></div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.10 | Inverse: white.fade.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barTrackColorEmphasis
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-neutral-140)',
                        borderRadius: '4px',
                      }}
                    ></div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.140 | Inverse: white.100
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barTrackColorVisited
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-cobalt-140)',
                        borderRadius: '4px',
                      }}
                    ></div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.140 | Inverse: cobalt.40
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Bar Widths */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Bar Widths</Heading>
              <Text size="sm" color="secondary">
                3 standardized widths for progress bars and step indicators
              </Text>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barWidthXS
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'var(--ink-cobalt-80)',
                        borderRadius: '1px',
                      }}
                    ></div>
                  </div>
                  <Text size="xs" color="tertiary">
                    dimension.2 = 2px
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barWidthS
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: 'var(--ink-cobalt-80)',
                        borderRadius: '2px',
                      }}
                    ></div>
                  </div>
                  <Text size="xs" color="tertiary">
                    dimension.4 = 4px
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    barWidthM
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'var(--ink-cobalt-80)',
                        borderRadius: '4px',
                      }}
                    ></div>
                  </div>
                  <Text size="xs" color="tertiary">
                    dimension.8 = 8px
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>

      <Divider />

      {/* CTA Tokens (Call-to-Action / Button Tokens) */}
      <Stack gap="medium">
        <Heading level={4}>CTA Colors & Sizes (Buttons & Interactive Elements)</Heading>
        <Text size="sm" color="secondary">
          35 CTA tokens (32 colors + 3 sizes) for buttons, FABs, toggles, and interactive elements
        </Text>

        {/* Button Background Colors - Danger */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Danger Button Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorDangerDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-red-90)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Delete
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.90 | Inverse: red.60
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorDangerHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-red-100)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Delete
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.100 | Inverse: red.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorDangerActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-red-110)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Delete
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.110 | Inverse: red.70
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Button Background Colors - Brand */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Brand Button Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorBrandDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-100)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Continue
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.100 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorBrandHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-90)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Continue
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.90 | Inverse: cobalt.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorBrandActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-110)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Continue
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.110 | Inverse: cobalt.30
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Button Background Colors - Primary */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Primary Button Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorPrimaryDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-140)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Submit
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.140 | Inverse: neutral.20
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorPrimaryHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-130)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Submit
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.130 | Inverse: neutral.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorPrimaryActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-120)',
                        color: 'var(--ink-white)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Submit
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.120 | Inverse: neutral.40
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Button Background Colors - Secondary */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Secondary Button Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorSecondaryDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                        border: '1px solid var(--ink-neutral-50)',
                      }}
                    >
                      Cancel
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: transparent | Inverse: transparent
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorSecondaryHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                        border: '1px solid var(--ink-neutral-50)',
                      }}
                    >
                      Cancel
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.5 | Inverse: white.fade.5
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorSecondaryActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                        border: '1px solid var(--ink-neutral-50)',
                      }}
                    >
                      Cancel
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.10 | Inverse: white.fade.10
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Button Background Colors - Tertiary */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Tertiary Button Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorTertiaryDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Options
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.5 | Inverse: white.fade.5
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorTertiaryHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Options
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.10 | Inverse: white.fade.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBgColorTertiaryActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Options
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.15 | Inverse: white.fade.15
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* FAB Button Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>FAB (Floating Action Button) Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaFabBgColorBrandDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-100)',
                        color: 'var(--ink-white)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      +
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.100 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaFabBgColorBrandHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-90)',
                        color: 'var(--ink-white)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      +
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.90 | Inverse: cobalt.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaFabBgColorBrandActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-110)',
                        color: 'var(--ink-white)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      +
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.110 | Inverse: cobalt.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaFabBgColorPrimaryDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-neutral-130)',
                        color: 'var(--ink-white)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      +
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.130 | Inverse: neutral.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaFabBgColorPrimaryHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-neutral-120)',
                        color: 'var(--ink-white)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      +
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.120 | Inverse: neutral.20
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaFabBgColorPrimaryActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-neutral-140)',
                        color: 'var(--ink-white)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      +
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.140 | Inverse: neutral.40
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Toggle Button Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Toggle Button Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaToggleBgColorHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      Day
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.5 | Inverse: white.fade.5
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaToggleBgColorActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      Day
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.10 | Inverse: white.fade.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaToggleBgColorSelected
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-140)',
                        color: 'var(--ink-white)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      Week
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.140 | Inverse: cobalt.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaToggleBgColorSelectedHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-130)',
                        color: 'var(--ink-white)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      Week
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.130 | Inverse: cobalt.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaToggleBgColorSelectedActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-120)',
                        color: 'var(--ink-white)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      Week
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.120 | Inverse: cobalt.20
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaToggleBgColorSelectedSubtle
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: 'var(--ink-cobalt-140)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      Month
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.10 | Inverse: white.fade.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaToggleBgColorSelectedSubtleHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        color: 'var(--ink-cobalt-140)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      Month
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.15 | Inverse: white.fade.15
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaToggleBgColorSelectedSubtleActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        color: 'var(--ink-cobalt-140)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      Month
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.20 | Inverse: white.fade.20
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Border Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Border Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBorderColorSecondaryDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: '2px solid rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      Button
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.50 | Inverse: white.fade.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBorderColorSecondaryHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: '2px solid rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      Button
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.70 | Inverse: white.fade.70
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaBorderColorSecondaryActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--ink-cobalt-140)',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: '2px solid rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      Button
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.90 | Inverse: white.fade.90
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Size Tokens */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>CTA Sizes</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaSizeSm
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-100)',
                        color: 'var(--ink-white)',
                        height: '32px',
                        padding: '0 16px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                      }}
                    >
                      Small Button
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    dimension.32 = 32px
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaSizeMd
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-100)',
                        color: 'var(--ink-white)',
                        height: '40px',
                        padding: '0 20px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                      }}
                    >
                      Medium Button
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    dimension.40 = 40px
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    ctaSizeLg
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-white)',
                      border: '1px solid var(--ink-neutral-30)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-cobalt-100)',
                        color: 'var(--ink-white)',
                        height: '48px',
                        padding: '0 24px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '16px',
                      }}
                    >
                      Large Button
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    dimension.48 = 48px
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>

      <Divider />

      {/* Elevation Tokens (Shadows & Depth) */}
      <Stack gap="medium">
        <Heading level={4}>Elevation (Shadows & Depth)</Heading>
        <Text size="sm" color="secondary">
          5 elevation tokens for creating visual depth with shadows and glass effects
        </Text>

        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    elevationLow
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '120px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-white)',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
                        minWidth: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text size="sm">Card</Text>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    offsetY: 4px, blur: 8px
                  </Text>
                  <Text size="xs" color="tertiary">
                    Subtle elevation for cards
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    elevationMedium
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '120px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-white)',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                        minWidth: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text size="sm">Modal</Text>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    offsetY: 8px, blur: 20px
                  </Text>
                  <Text size="xs" color="tertiary">
                    Medium elevation for modals
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    elevationHigh
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '120px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-white)',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.16)',
                        minWidth: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text size="sm">Dropdown</Text>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    offsetY: 8px, blur: 32px
                  </Text>
                  <Text size="xs" color="tertiary">
                    High elevation for dropdowns
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    elevationGlass
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '120px',
                      backgroundImage:
                        'linear-gradient(45deg, var(--ink-cobalt-20) 25%, transparent 25%), linear-gradient(-45deg, var(--ink-cobalt-20) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--ink-cobalt-20) 75%), linear-gradient(-45deg, transparent 75%, var(--ink-cobalt-20) 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        padding: '24px',
                        borderRadius: '8px',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        minWidth: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text size="sm">Glass</Text>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    blur: 8px (backdrop-filter)
                  </Text>
                  <Text size="xs" color="tertiary">
                    Glass morphism effect
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    elevationDrag
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '120px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--ink-white)',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                        minWidth: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'grab',
                      }}
                    >
                      <Text size="sm">Dragging</Text>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    offsetY: 8px, blur: 20px
                  </Text>
                  <Text size="xs" color="tertiary">
                    Elevation during drag
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>

      <Divider />

      {/* Font Typography Tokens */}
      <Stack gap="medium">
        <Heading level={4}>Font Styles (Typography Tokens)</Heading>
        <Text size="sm" color="secondary">
          28 typography tokens defining font families, sizes, weights, line heights, and letter
          spacing
        </Text>

        {/* Display Fonts */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Display Fonts (Large Headlines)</Heading>
              <Stack gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontDisplayXL
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '72px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    72px / 400 / 1.2 / -0.02em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontDisplayL
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '64px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    The quick brown fox jumps
                  </div>
                  <Text size="xs" color="tertiary">
                    64px / 400 / 1.2 / -0.02em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontDisplayM
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '56px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    The quick brown fox jumps over
                  </div>
                  <Text size="xs" color="tertiary">
                    56px / 400 / 1.2 / -0.02em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontDisplayS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '48px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    48px / 400 / 1.2 / -0.02em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontDisplayXS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '40px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    40px / 400 / 1.2 / -0.02em
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>

        {/* Heading Fonts */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Heading Fonts</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontHeadingM
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '32px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    32px / 400 / 1.2 / -0.01em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontHeadingS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '24px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    24px / 400 / 1.2 / -0.01em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontHeadingXS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    20px / 500 / 1.2 / -0.01em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontHeadingXXS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    16px / 500 / 1.2 / -0.01em
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Body Fonts */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Body Fonts</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontBodyXL
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '24px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    24px / 400 / 1.5
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontBodyL
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '20px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    20px / 400 / 1.5
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontBodyM
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    16px / 400 / 1.5
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontBodyS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 400 / 1.4
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Button & Label Fonts */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Button, Label & Component Fonts</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontButton
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    16px / 500 / 1.5
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontButtonS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 500 / 1.4
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontLabel
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 500 / 1.4
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontLabelEmphasis
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 600 / 1.4
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontItemSelected
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 600 / 1.4
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontTab
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 500 / 1.4
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontBadge
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      letterSpacing: '0.02em',
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    12px / 500 / 1.5 / 0.02em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontAvatarGroup
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      letterSpacing: '0.02em',
                    }}
                  >
                    The quick brown fox
                  </div>
                  <Text size="xs" color="tertiary">
                    12px / 500 / 1.5 / 0.02em
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Detail & Section Fonts */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Detail & Section Fonts</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontDetailS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      letterSpacing: '0.02em',
                    }}
                  >
                    THE QUICK BROWN FOX JUMPS
                  </div>
                  <Text size="xs" color="tertiary">
                    12px / 500 / 1.5 / 0.02em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontDetailXS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '10px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      letterSpacing: '0.04em',
                    }}
                  >
                    THE QUICK BROWN FOX JUMPS
                  </div>
                  <Text size="xs" color="tertiary">
                    10px / 500 / 1.5 / 0.04em
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontSectionHeadline
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '12px',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      letterSpacing: '0.02em',
                    }}
                  >
                    THE QUICK BROWN FOX JUMPS
                  </div>
                  <Text size="xs" color="tertiary">
                    12px / 600 / 1.5 / 0.02em
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Link Fonts */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Link Fonts</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontLink
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      textDecoration: 'underline',
                      color: 'var(--ink-cobalt-100)',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    16px / 400 / 1.5 / underline
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontLinkS
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      textDecoration: 'underline',
                      color: 'var(--ink-cobalt-100)',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 400 / 1.4 / underline
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Breadcrumb Fonts */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Breadcrumb Fonts</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontBreadcrumb
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    Home / Products / Category
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 400 / normal
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    fontBreadcrumbActive
                  </Text>
                  <div
                    style={{
                      fontFamily: 'var(--ink-font-family)',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Home / Products / Category
                  </div>
                  <Text size="xs" color="tertiary">
                    14px / 500 / normal
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>

      <Divider />

      {/* Form Tokens */}
      <Stack gap="medium">
        <Heading level={4}>Form Colors & Sizes (Input Elements)</Heading>
        <Text size="sm" color="secondary">
          21 form tokens (19 colors + 2 sizes) for input fields, checkboxes, radio buttons, and form
          controls
        </Text>

        {/* Form Background Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Form Background Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBgColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Enter text..."
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--ink-white)',
                        border: '1px solid var(--ink-neutral-50)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: white.100 | Inverse: neutral.140
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBgColorDisabled
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Disabled field"
                      disabled
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        border: '1px solid var(--ink-neutral-30)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                        cursor: 'not-allowed',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.15 | Inverse: white.fade.15
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBgColorError
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Invalid input"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--ink-red-90)',
                        color: 'var(--ink-white)',
                        border: '1px solid var(--ink-red-100)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.90 | Inverse: red.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBgColorRead
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      value="Read-only field"
                      readOnly
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        border: '1px solid var(--ink-neutral-30)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.5 | Inverse: white.fade.5
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBgColorSelected
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--ink-cobalt-120)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      ✓
                    </div>
                    <Text size="sm">Checked</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.120 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBgColorSelectedHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--ink-cobalt-130)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      ✓
                    </div>
                    <Text size="sm">Hover</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.130 | Inverse: cobalt.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBgColorSelectedActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--ink-cobalt-110)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      ✓
                    </div>
                    <Text size="sm">Active</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.110 | Inverse: cobalt.60
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Form Border Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Form Border Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Default border"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--ink-white)',
                        border: '2px solid rgba(0, 0, 0, 0.5)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.50 | Inverse: white.fade.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderColorHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Hover border"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--ink-white)',
                        border: '2px solid rgba(0, 0, 0, 0.7)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.70 | Inverse: white.fade.70
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderColorActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Active/Focus border"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--ink-white)',
                        border: '2px solid var(--ink-cobalt-120)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.120 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderColorError
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Error border"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--ink-white)',
                        border: '2px solid var(--ink-red-90)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.90 | Inverse: red.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderColorSelected
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--ink-cobalt-120)',
                        border: '2px solid var(--ink-cobalt-120)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      ✓
                    </div>
                    <Text size="sm">Selected</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.120 | Inverse: cobalt.40
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderColorSelectedHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--ink-cobalt-130)',
                        border: '2px solid var(--ink-cobalt-130)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      ✓
                    </div>
                    <Text size="sm">Hover</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.130 | Inverse: cobalt.30
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderColorSelectedActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--ink-cobalt-110)',
                        border: '2px solid var(--ink-cobalt-110)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      ✓
                    </div>
                    <Text size="sm">Active</Text>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.110 | Inverse: cobalt.60
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Other Form Colors */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Other Form Colors</Heading>
              <Grid columns={3} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formHighlightBgColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        padding: '12px',
                        borderRadius: '4px',
                      }}
                    >
                      <Text size="sm">Highlighted text</Text>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.10 | Inverse: white.fade.10
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formTextColorRequired
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Text size="sm">Email</Text>
                      <span style={{ color: 'var(--ink-red-90)', fontSize: '16px' }}>*</span>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: red.90 | Inverse: red.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formTextColorDisabled
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      value="Disabled text"
                      disabled
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        border: '1px solid var(--ink-neutral-30)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 0.5)',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.fade.50 | Inverse: white.fade.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formThumbBgColorDefault
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '20px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '10px',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: 'var(--ink-neutral-100)',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '2px',
                          left: '2px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.100 | Inverse: neutral.50
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formThumbBgColorHover
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '20px',
                        backgroundColor: 'var(--ink-neutral-20)',
                        borderRadius: '10px',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: 'var(--ink-neutral-140)',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '2px',
                          left: '2px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: neutral.140 | Inverse: white.100
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formThumbBgColorActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '20px',
                        backgroundColor: 'var(--ink-cobalt-120)',
                        borderRadius: '10px',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: 'var(--ink-white)',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <Text size="xs" color="tertiary">
                    Standard: cobalt.120 | Inverse: cobalt.40
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Form Border Widths */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Form Border Widths</Heading>
              <Grid columns={2} gap="medium">
                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderWidth
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="1px border"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--ink-white)',
                        border: '1px solid var(--ink-neutral-50)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    dimension.1 = 1px
                  </Text>
                </Stack>

                <Stack gap="small">
                  <Text size="sm" weight="semibold">
                    formBorderWidthActive
                  </Text>
                  <div
                    style={{
                      backgroundColor: 'var(--ink-neutral-5)',
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="2px border (active/focus)"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--ink-white)',
                        border: '2px solid var(--ink-cobalt-120)',
                        borderRadius: '4px',
                        fontFamily: 'var(--ink-font-family)',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <Text size="xs" color="tertiary">
                    dimension.2 = 2px
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    </Stack>
  );

  const renderButtonContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Button</Heading>
        <Text color="secondary" size="sm">
          Primary interactive element for triggering actions - uses official Ink design tokens
        </Text>
      </div>

      <Divider />

      {/* All Button Variants */}
      <Card>
        <Card.Body>
          <Stack gap="large">
            <div>
              <Heading level={4}>All Button Variants</Heading>
              <Text size="sm" color="secondary">
                Brand (bright vibrant purple) vs Primary (dark purple) are two distinct button
                types. All variants use 4px border radius consistently.
              </Text>
            </div>

            {/* Medium Size - Default */}
            <Stack gap="medium">
              <Text weight="medium">Medium Size (40px - Default)</Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button kind="brand">Brand</Button>
                <Button kind="primary">Primary</Button>
                <Button kind="secondary">Secondary</Button>
                <Button kind="tertiary">Tertiary</Button>
                <Button kind="danger">Danger</Button>
                <Button kind="brand" disabled>
                  Disabled
                </Button>
              </div>
            </Stack>

            {/* Small Size */}
            <Stack gap="medium">
              <Text weight="medium">Small Size (32px)</Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button kind="brand" size="small">
                  Brand
                </Button>
                <Button kind="primary" size="small">
                  Primary
                </Button>
                <Button kind="secondary" size="small">
                  Secondary
                </Button>
                <Button kind="tertiary" size="small">
                  Tertiary
                </Button>
                <Button kind="danger" size="small">
                  Danger
                </Button>
              </div>
            </Stack>

            {/* Large Size */}
            <Stack gap="medium">
              <Text weight="medium">Large Size (48px)</Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button kind="brand" size="large">
                  Brand
                </Button>
                <Button kind="primary" size="large">
                  Primary
                </Button>
                <Button kind="secondary" size="large">
                  Secondary
                </Button>
                <Button kind="tertiary" size="large">
                  Tertiary
                </Button>
                <Button kind="danger" size="large">
                  Danger
                </Button>
              </div>
            </Stack>

            {/* XLarge Size */}
            <Stack gap="medium">
              <Text weight="medium">XLarge Size (56px)</Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button kind="brand" size="xlarge">
                  Brand
                </Button>
                <Button kind="primary" size="xlarge">
                  Primary
                </Button>
                <Button kind="secondary" size="xlarge">
                  Secondary
                </Button>
                <Button kind="tertiary" size="xlarge">
                  Tertiary
                </Button>
                <Button kind="danger" size="xlarge">
                  Danger
                </Button>
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      {/* Button with Icons */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Buttons with Icons</Heading>
            <Text size="sm" color="secondary">
              Icons inherit button text color via official tokens
            </Text>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button kind="brand" startElement={<Icon name="plus" size="small" />}>
                Add Item
              </Button>
              <Button kind="primary" startElement={<Icon name="gear" size="small" />}>
                Settings
              </Button>
              <Button kind="secondary" endElement={<Icon name="arrow-right" size="small" />}>
                Next
              </Button>
              <Button kind="tertiary" startElement={<Icon name="download" size="small" />}>
                Download
              </Button>
              <Button kind="danger" startElement={<Icon name="trash" size="small" />}>
                Delete
              </Button>
            </div>
          </Stack>
        </Card.Body>
      </Card>

      {/* Loading State */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Loading State</Heading>
            <Text size="sm" color="secondary">
              Spinner uses official opacity token for disabled state
            </Text>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button kind="brand" loading>
                Loading...
              </Button>
              <Button kind="primary" loading>
                Processing
              </Button>
              <Button kind="secondary" loading>
                Please wait
              </Button>
            </div>
          </Stack>
        </Card.Body>
      </Card>

      {/* Full Width */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Full Width Buttons</Heading>
            <Stack gap="small">
              <Button kind="brand" fullWidth>
                Full Width Brand Button
              </Button>
              <Button kind="primary" fullWidth>
                Full Width Primary Button
              </Button>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      {/* Rounded Variant */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Rounded (Pill-Shaped)</Heading>
            <Text size="sm" color="secondary">
              Uses var(--ink-radius-size-full) for full roundness
            </Text>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button kind="brand" rounded>
                Rounded Brand
              </Button>
              <Button kind="primary" rounded>
                Rounded Primary
              </Button>
              <Button kind="secondary" rounded>
                Rounded Secondary
              </Button>
            </div>
          </Stack>
        </Card.Body>
      </Card>

      {/* Design Specifications */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Design Specifications</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Sizes
                </Text>
                <Text size="sm">• Small: 32px height</Text>
                <Text size="sm">• Medium: 40px height (default)</Text>
                <Text size="sm">• Large: 48px height</Text>
                <Text size="sm">• XLarge: 56px height</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Border Radius
                </Text>
                <Text size="sm">• Default: 4px (var(--ink-radius-size-xs))</Text>
                <Text size="sm">• Rounded: 9999px (var(--ink-radius-size-full))</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Variants
                </Text>
                <Text size="sm">• Brand: Bright vibrant purple</Text>
                <Text size="sm">• Primary: Dark purple</Text>
                <Text size="sm">• Secondary: Outlined</Text>
                <Text size="sm">• Tertiary: Minimal/Ghost</Text>
                <Text size="sm">• Danger: Red destructive actions</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  States
                </Text>
                <Text size="sm">• Default, Hover, Active, Focus</Text>
                <Text size="sm">• Disabled: var(--ink-opacity-disabled)</Text>
                <Text size="sm">• Loading: with spinner</Text>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderIconButtonContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>IconButton</Heading>
        <Text color="secondary" size="sm">
          Compact button containing only an icon - perfect for toolbars and tight spaces
        </Text>
      </div>

      <Divider />

      {/* All Variants */}
      <Card>
        <Card.Body>
          <Stack gap="large">
            <div>
              <Heading level={4}>All Variants</Heading>
              <Text size="sm" color="secondary">
                Brand, Primary, Secondary, Tertiary, and Danger variants in medium and small sizes
              </Text>
            </div>

            {/* Medium Size */}
            <Stack gap="medium">
              <Text weight="medium">Medium Size (40×40px)</Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton variant="brand" size="medium" icon="star" aria-label="Like" />
                  <Text size="xs">Brand</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton variant="primary" size="medium" icon="gear" aria-label="Settings" />
                  <Text size="xs">Primary</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    variant="secondary"
                    size="medium"
                    icon="bell"
                    aria-label="Notifications"
                  />
                  <Text size="xs">Secondary</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    variant="tertiary"
                    size="medium"
                    icon="overflow-horizontal"
                    aria-label="More options"
                  />
                  <Text size="xs">Tertiary</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton variant="danger" size="medium" icon="trash" aria-label="Delete" />
                  <Text size="xs">Danger</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    variant="brand"
                    size="medium"
                    icon="star"
                    aria-label="Like"
                    disabled
                  />
                  <Text size="xs">Disabled</Text>
                </div>
              </div>
            </Stack>

            {/* Small Size */}
            <Stack gap="medium">
              <Text weight="medium">Small Size (32×32px)</Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton variant="brand" size="small" icon="star" aria-label="Like" />
                  <Text size="xs">Brand</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton variant="primary" size="small" icon="gear" aria-label="Settings" />
                  <Text size="xs">Primary</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    variant="secondary"
                    size="small"
                    icon="bell"
                    aria-label="Notifications"
                  />
                  <Text size="xs">Secondary</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    variant="tertiary"
                    size="small"
                    icon="overflow-horizontal"
                    aria-label="More options"
                  />
                  <Text size="xs">Tertiary</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton variant="danger" size="small" icon="trash" aria-label="Delete" />
                  <Text size="xs">Danger</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <IconButton variant="brand" size="small" icon="star" aria-label="Like" disabled />
                  <Text size="xs">Disabled</Text>
                </div>
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      {/* Usage Examples */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Common Usage Patterns</Heading>

            <Stack gap="small">
              <Text weight="medium">Toolbar Actions</Text>
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  padding: '8px',
                  background: 'var(--ink-neutral-10)',
                  borderRadius: '4px',
                }}
              >
                <IconButton variant="tertiary" size="medium" icon="menu" aria-label="Menu" />
                <IconButton variant="tertiary" size="medium" icon="gear" aria-label="Settings" />
                <IconButton
                  variant="tertiary"
                  size="medium"
                  icon="bell"
                  aria-label="Notifications"
                />
              </div>
            </Stack>

            <Stack gap="small">
              <Text weight="medium">Action Buttons</Text>
              <div style={{ display: 'flex', gap: '8px' }}>
                <IconButton
                  variant="brand"
                  size="medium"
                  icon="star-filled"
                  aria-label="Favorite"
                />
                <IconButton
                  variant="secondary"
                  size="medium"
                  icon="carbon-copy"
                  aria-label="Copy"
                />
                <IconButton variant="danger" size="medium" icon="trash" aria-label="Delete" />
              </div>
            </Stack>

            <Stack gap="small">
              <Text weight="medium">Compact Controls</Text>
              <div style={{ display: 'flex', gap: '4px' }}>
                <IconButton
                  variant="secondary"
                  size="small"
                  icon="arrow-left"
                  aria-label="Previous"
                />
                <IconButton variant="secondary" size="small" icon="arrow-right" aria-label="Next" />
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      {/* Design Specs */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Design Specifications</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Sizes
                </Text>
                <Text size="sm">• Medium: 40×40px (default)</Text>
                <Text size="sm">• Small: 32×32px</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Border Radius
                </Text>
                <Text size="sm">• All sizes: 4px (var(--ink-radius-size-xs))</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Variants
                </Text>
                <Text size="sm">• Brand, Primary, Secondary, Tertiary, Danger</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Accessibility
                </Text>
                <Text size="sm">• Always include aria-label</Text>
                <Text size="sm">• Supports keyboard navigation</Text>
                <Text size="sm">• Clear focus indicators</Text>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderComboButtonContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>ComboButton</Heading>
        <Text color="secondary" size="sm">
          Split button combining a primary action with a dropdown menu - uses official Ink design
          tokens
        </Text>
      </div>

      <Divider />

      {/* All Variants */}
      <Card>
        <Card.Body>
          <Stack gap="large">
            <div>
              <Heading level={4}>All Variants</Heading>
              <Text size="sm" color="secondary">
                ComboButton combines a main action button with a dropdown trigger. The white border
                separator is automatically added.
              </Text>
            </div>

            {/* Medium Size */}
            <Stack gap="medium">
              <Text weight="medium">Medium Size (40px - Default)</Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <ComboButton variant="brand">Brand Button</ComboButton>
                <ComboButton variant="primary">Primary Button</ComboButton>
                <ComboButton variant="secondary">Secondary Button</ComboButton>
                <ComboButton variant="tertiary">Tertiary Button</ComboButton>
                <ComboButton variant="brand" disabled>
                  Disabled
                </ComboButton>
              </div>
            </Stack>

            {/* Small Size */}
            <Stack gap="medium">
              <Text weight="medium">Small Size (32px)</Text>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <ComboButton variant="brand" size="small">
                  Brand
                </ComboButton>
                <ComboButton variant="primary" size="small">
                  Primary
                </ComboButton>
                <ComboButton variant="secondary" size="small">
                  Secondary
                </ComboButton>
                <ComboButton variant="tertiary" size="small">
                  Tertiary
                </ComboButton>
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      {/* With Icons */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>With Start Icons</Heading>
            <Text size="sm" color="secondary">
              Add icons to enhance visual communication
            </Text>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <ComboButton variant="brand" startIcon="plus">
                New Item
              </ComboButton>
              <ComboButton variant="primary" startIcon="download">
                Download
              </ComboButton>
              <ComboButton variant="secondary" startIcon="gear">
                Settings
              </ComboButton>
            </div>
          </Stack>
        </Card.Body>
      </Card>

      {/* Compact Mode */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Compact Mode (Tertiary Only)</Heading>
            <Text size="sm" color="secondary">
              Icon-only compact variant for toolbars. Only available for tertiary variant.
            </Text>

            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Medium Compact
                </Text>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <ComboButton variant="tertiary" compact startIcon="image">
                    Settings
                  </ComboButton>
                  <ComboButton variant="tertiary" compact startIcon="star">
                    Favorite
                  </ComboButton>
                  <ComboButton variant="tertiary" compact startIcon="bell">
                    Notifications
                  </ComboButton>
                </div>
              </Stack>

              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Small Compact
                </Text>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <ComboButton variant="tertiary" size="small" compact startIcon="image">
                    Settings
                  </ComboButton>
                  <ComboButton variant="tertiary" size="small" compact startIcon="star">
                    Favorite
                  </ComboButton>
                  <ComboButton variant="tertiary" size="small" compact startIcon="bell">
                    Notifications
                  </ComboButton>
                </div>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      {/* Interactive Example */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Interactive Example</Heading>
            <Text size="sm" color="secondary">
              ComboButton supports separate click handlers for main action and dropdown trigger
            </Text>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <ComboButton
                variant="brand"
                onClick={() => alert('Main action clicked!')}
                onDropdownClick={() => alert('Dropdown clicked!')}
              >
                Click Me
              </ComboButton>
              <ComboButton
                variant="primary"
                size="small"
                startIcon="plus"
                onClick={() => alert('Create new item')}
                onDropdownClick={() => alert('Show create options')}
              >
                Create
              </ComboButton>
            </div>
          </Stack>
        </Card.Body>
      </Card>

      {/* Design Specifications */}
      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Design Specifications</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Sizes
                </Text>
                <Text size="sm">• Medium: 40px height (default)</Text>
                <Text size="sm">• Small: 32px height</Text>
                <Text size="sm">• Compact: Icon-only mode for tertiary</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Border & Spacing
                </Text>
                <Text size="sm">• Border radius: 4px (var(--ink-radius-size-xs))</Text>
                <Text size="sm">• Separator: 1px white border</Text>
                <Text size="sm">• Min width (main): 80px</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  Variants
                </Text>
                <Text size="sm">• Brand: Bright vibrant purple</Text>
                <Text size="sm">• Primary: Dark purple</Text>
                <Text size="sm">• Secondary: Outlined</Text>
                <Text size="sm">• Tertiary: Minimal/Ghost (supports compact)</Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium" size="sm">
                  States
                </Text>
                <Text size="sm">• Default, Hover, Active, Focus</Text>
                <Text size="sm">• Disabled: var(--ink-opacity-disabled)</Text>
                <Text size="sm">• Independent button interactions</Text>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderInputContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Input</Heading>
        <Text color="secondary" size="sm">
          Text input field for single-line user input
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Input States</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default</Text>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={setInputValue}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Helper Text</Text>
                <Input
                  label="Email"
                  placeholder="email@example.com"
                  helperText="We'll never share your email"
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Error State</Text>
                <Input
                  label="Username"
                  placeholder="Enter username"
                  error="Username already taken"
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled</Text>
                <Input label="Disabled Input" placeholder="Cannot edit" disabled />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Required</Text>
                <Input label="Required Field" placeholder="This field is required" required />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Password Type</Text>
                <Input type="password" label="Password" placeholder="Enter password" />
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderTextAreaContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>TextArea</Heading>
        <Text color="secondary" size="sm">
          Multi-line text input for longer content - 8px vertical padding, 16px horizontal, 4px
          radius
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>States</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default (with placeholder)</Text>
                <TextArea
                  label="Label"
                  placeholder="Ex: The ideal height for a Text Area component is 4 lines tall, with a minimum of 2 lines. This text can become placeholder text by setting the color to font-color-subtle"
                  rows={4}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Value</Text>
                <TextArea
                  label="Label"
                  value="Ex: The ideal height for a Text Area component is 4 lines tall, with a minimum of 2 lines. This text can become placeholder text by setting the color to font-color-subtle"
                  onChange={(e) => {}}
                  rows={4}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Description</Text>
                <TextArea
                  label="Label"
                  description="This is helper text to provide additional context"
                  placeholder="Enter your text..."
                  rows={4}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Character Count</Text>
                <TextArea
                  label="Label"
                  value="Ex: The ideal height for a Text Area component is 4 lines tall, with a minimum of 2 lines. This text can become placeholder text by setting the color to font-color-subtle"
                  onChange={(e) => {}}
                  maxLength={200}
                  characterCount
                  rows={4}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Error State</Text>
                <TextArea
                  label="Label"
                  value="Ex: The ideal height for a Text Area component is 4 lines tall, with a minimum of 2 lines. This text can become placeholder text by setting the color to font-color-subtle"
                  onChange={(e) => {}}
                  error="This is an error message"
                  maxLength={200}
                  characterCount
                  rows={4}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Read-Only</Text>
                <TextArea
                  label="Label"
                  value="Ex: The ideal height for a Text Area component is 4 lines tall, with a minimum of 2 lines. This text can become placeholder text by setting the color to font-color-subtle"
                  readOnly
                  rows={4}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled</Text>
                <TextArea
                  label="Label"
                  value="Ex: The ideal height for a Text Area component is 4 lines tall, with a minimum of 2 lines. This text can become placeholder text by setting the color to font-color-subtle"
                  disabled
                  maxLength={200}
                  characterCount
                  rows={4}
                />
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderSelectContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Select</Heading>
        <Text color="secondary" size="sm">
          Dropdown selection from a list of options
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Select Variations</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default</Text>
                <Select label="Choose an option" value={selectValue} onChange={setSelectValue}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Helper Text</Text>
                <Select label="Category" helperText="Select a category">
                  <option value="">Select...</option>
                  <option value="cat1">Category 1</option>
                  <option value="cat2">Category 2</option>
                </Select>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Error State</Text>
                <Select label="Priority" error="Please select a priority">
                  <option value="">Select...</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Select>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled</Text>
                <Select label="Disabled Select" disabled>
                  <option value="">Cannot select</option>
                </Select>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderCheckboxContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Checkbox</Heading>
        <Text color="secondary" size="sm">
          Binary selection control for options
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Checkbox States</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Interactive</Text>
                <Checkbox
                  label="Accept terms and conditions"
                  checked={checkboxValue}
                  onChange={setCheckboxValue}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Checked</Text>
                <Checkbox label="Checked checkbox" checked={true} onChange={() => {}} />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Unchecked</Text>
                <Checkbox label="Unchecked checkbox" checked={false} onChange={() => {}} />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled</Text>
                <Checkbox label="Disabled checkbox" checked={false} disabled onChange={() => {}} />
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderRadioContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Radio</Heading>
        <Text color="secondary" size="sm">
          Single selection from multiple options
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Radio Group</Heading>
            <Stack gap="small">
              <Text weight="medium">Choose an option</Text>
              <Radio
                label="Option 1"
                name="demo-radio"
                value="option1"
                checked={radioValue === 'option1'}
                onChange={() => setRadioValue('option1')}
              />
              <Radio
                label="Option 2"
                name="demo-radio"
                value="option2"
                checked={radioValue === 'option2'}
                onChange={() => setRadioValue('option2')}
              />
              <Radio
                label="Option 3"
                name="demo-radio"
                value="option3"
                checked={radioValue === 'option3'}
                onChange={() => setRadioValue('option3')}
              />
              <Radio
                label="Disabled Option"
                name="demo-radio"
                value="option4"
                checked={false}
                disabled
                onChange={() => {}}
              />
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderSwitchContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Switch</Heading>
        <Text color="secondary" size="sm">
          Toggle control for on/off states
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Switch States</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Interactive</Text>
                <Switch
                  label="Enable notifications"
                  checked={switchValue}
                  onChange={setSwitchValue}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">On State</Text>
                <Switch label="Enabled" checked={true} onChange={() => {}} />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Off State</Text>
                <Switch label="Disabled" checked={false} onChange={() => {}} />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled</Text>
                <Switch label="Cannot toggle" checked={false} disabled onChange={() => {}} />
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderSliderContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Slider</Heading>
        <Text color="secondary" size="sm">
          Range input for selecting numeric values
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Slider Variations</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default (Value: {sliderValue})</Text>
                <Slider
                  label="Volume"
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={setSliderValue}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Step</Text>
                <Slider
                  label="Rating (0-10)"
                  min={0}
                  max={10}
                  step={1}
                  value={5}
                  onChange={() => {}}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Custom Range</Text>
                <Slider
                  label="Price ($50-$500)"
                  min={50}
                  max={500}
                  step={10}
                  value={250}
                  onChange={() => {}}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled</Text>
                <Slider
                  label="Cannot adjust"
                  min={0}
                  max={100}
                  value={50}
                  disabled
                  onChange={() => {}}
                />
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderBadgeContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Badge</Heading>
        <Text color="secondary" size="sm">
          Small label for status, count, or category indication
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Badge Variants</Heading>
            <Stack direction="horizontal" gap="medium" wrap>
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Badge Sizes</Heading>
            <Stack direction="horizontal" gap="medium" align="center">
              <Badge size="small">Small</Badge>
              <Badge size="medium">Medium</Badge>
              <Badge size="large">Large</Badge>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Badge with Icons</Heading>
            <Stack direction="horizontal" gap="medium" wrap>
              <Badge variant="success">
                <Icon name="check" size="xsmall" />
                Verified
              </Badge>
              <Badge variant="warning">
                <Icon name="alert-triangle" size="xsmall" />
                Warning
              </Badge>
              <Badge variant="danger">
                <Icon name="x" size="xsmall" />
                Error
              </Badge>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderAlertBadgeContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>AlertBadge</Heading>
        <Text color="secondary" size="sm">
          Notification indicator for alerts, counts, and status - appears as number badge or dot
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Emphasis (Red)</Heading>
            <Text size="sm" color="secondary">
              High-priority alerts and notifications
            </Text>
            <Stack direction="horizontal" gap="large" align="center">
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <AlertBadge value={1} kind="emphasis" />
                <AlertBadge value={9} kind="emphasis" />
                <AlertBadge value={99} kind="emphasis" />
                <AlertBadge value={150} kind="emphasis" />
                <AlertBadge dot kind="emphasis" />
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Subtle (Gray)</Heading>
            <Text size="sm" color="secondary">
              Low-priority notifications and informational indicators
            </Text>
            <Stack direction="horizontal" gap="large" align="center">
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <AlertBadge value={1} kind="subtle" />
                <AlertBadge value={9} kind="subtle" />
                <AlertBadge value={99} kind="subtle" />
                <AlertBadge value={150} kind="subtle" />
                <AlertBadge dot kind="subtle" />
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Usage Examples</Heading>
            <Text size="sm" color="secondary">
              Common use cases with icons and avatars
            </Text>
            <Stack gap="medium">
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <Icon name="bell" size="medium" />
                  <div style={{ position: 'absolute', top: '-6px', right: '-6px' }}>
                    <AlertBadge value={3} kind="emphasis" />
                  </div>
                </div>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <Icon name="mail" size="medium" />
                  <div style={{ position: 'absolute', top: '-6px', right: '-6px' }}>
                    <AlertBadge value={12} kind="emphasis" />
                  </div>
                </div>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <Avatar name="John Doe" size="medium" />
                  <div style={{ position: 'absolute', top: '-2px', right: '-2px' }}>
                    <AlertBadge dot kind="emphasis" />
                  </div>
                </div>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <Avatar name="Jane Smith" size="medium" />
                  <div style={{ position: 'absolute', top: '-2px', right: '-2px' }}>
                    <AlertBadge value={5} kind="subtle" />
                  </div>
                </div>
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderChipContent = () => (
    <Stack gap="xlarge">
      <div>
        <Heading level={3}>Chip</Heading>
        <Text color="secondary" size="sm">
          Compact interactive element for tags, filters, and selections - 32px height, 4px radius
        </Text>
      </div>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Basic Chips</Heading>
        <Stack direction="horizontal" gap="medium" wrap>
          <Chip>Default Chip</Chip>
          <Chip>Tag Label</Chip>
          <Chip>Category</Chip>
          <Chip>Filter Option</Chip>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Chips with Remove Button</Heading>
        <Stack direction="horizontal" gap="medium" wrap>
          <Chip onRemove={() => console.log('Chip removed')}>Removable</Chip>
          <Chip onRemove={() => console.log('Tag removed')}>JavaScript</Chip>
          <Chip onRemove={() => console.log('Filter removed')}>React</Chip>
          <Chip onRemove={() => console.log('Category removed')}>TypeScript</Chip>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Clickable Chips</Heading>
        <Stack direction="horizontal" gap="medium" wrap>
          <Chip onClick={() => alert('Chip clicked!')}>Click Me</Chip>
          <Chip onClick={() => alert('Filter selected')}>Filter</Chip>
          <Chip onClick={() => alert('Tag selected')} onRemove={() => console.log('Removed')}>
            Click & Remove
          </Chip>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Chips with Start Elements</Heading>
        <Stack direction="horizontal" gap="medium" wrap>
          <Chip startElement={<Avatar size="xsmall" name="John Doe" />} onRemove={() => {}}>
            John Doe
          </Chip>
          <Chip startElement={<Avatar size="xsmall" name="Jane Smith" />} onRemove={() => {}}>
            Jane Smith
          </Chip>
          <Chip startElement={<Icon name="check" size="small" />}>Verified</Chip>
          <Chip startElement={<Icon name="star" size="small" />} onRemove={() => {}}>
            Favorite
          </Chip>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>States</Heading>
        <Stack direction="horizontal" gap="medium" wrap>
          <Chip>Default</Chip>
          <Chip onClick={() => {}}>Hover (hover me)</Chip>
          <Chip disabled>Disabled</Chip>
          <Chip disabled onRemove={() => {}}>
            Disabled with Remove
          </Chip>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Use Cases</Heading>
        <Stack gap="medium">
          <div>
            <Text weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
              Selected Filters:
            </Text>
            <Stack direction="horizontal" gap="small" wrap>
              <Chip onRemove={() => {}}>Status: Active</Chip>
              <Chip onRemove={() => {}}>Category: Design</Chip>
              <Chip onRemove={() => {}}>Date: Last 7 days</Chip>
            </Stack>
          </div>

          <div>
            <Text weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
              Team Members:
            </Text>
            <Stack direction="horizontal" gap="small" wrap>
              <Chip startElement={<Avatar size="xsmall" name="Alice Brown" />} onRemove={() => {}}>
                Alice Brown
              </Chip>
              <Chip startElement={<Avatar size="xsmall" name="Bob Wilson" />} onRemove={() => {}}>
                Bob Wilson
              </Chip>
              <Chip startElement={<Avatar size="xsmall" name="Carol Davis" />} onRemove={() => {}}>
                Carol Davis
              </Chip>
            </Stack>
          </div>

          <div>
            <Text weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
              Tech Stack:
            </Text>
            <Stack direction="horizontal" gap="small" wrap>
              <Chip onClick={() => alert('React selected')}>React</Chip>
              <Chip onClick={() => alert('TypeScript selected')}>TypeScript</Chip>
              <Chip onClick={() => alert('Node.js selected')}>Node.js</Chip>
              <Chip onClick={() => alert('PostgreSQL selected')}>PostgreSQL</Chip>
            </Stack>
          </div>
        </Stack>
      </Stack>
    </Stack>
  );

  const renderFilterTagContent = () => (
    <Stack gap="xlarge">
      <div>
        <Heading level={3}>Filter Tag</Heading>
        <Text color="secondary" size="sm">
          Interactive tags for filtering data - 32px height, 4px radius, with dropdown or
          dismissible variants
        </Text>
      </div>

      <Divider />

      <Stack gap="xlarge">
        <div>
          <Heading level={4}>Inactive Filter Tags (with dropdown)</Heading>
          <Stack direction="horizontal" gap="small" wrap>
            <FilterTag label="Status" />
            <FilterTag label="Date Range" />
            <FilterTag label="Category" />
            <FilterTag label="Priority" />
          </Stack>
        </div>

        <div>
          <Heading level={4}>Active Filter Tags</Heading>
          <Stack direction="horizontal" gap="small" wrap>
            <FilterTag label="Status: Active" active />
            <FilterTag label="Date: Last 7 days" active />
            <FilterTag label="Category: Design" active />
            <FilterTag label="Priority: High" active />
          </Stack>
        </div>

        <div>
          <Heading level={4}>Dismissible Filter Tags</Heading>
          <Stack direction="horizontal" gap="small" wrap>
            <FilterTag
              label="Status: Active"
              active
              dismissible
              onDismiss={() => console.log('Removed')}
            />
            <FilterTag
              label="Date: Last 7 days"
              active
              dismissible
              onDismiss={() => console.log('Removed')}
            />
            <FilterTag
              label="Category: Design"
              active
              dismissible
              onDismiss={() => console.log('Removed')}
            />
          </Stack>
        </div>

        <div>
          <Heading level={4}>Without Dropdown Trigger</Heading>
          <Stack direction="horizontal" gap="small" wrap>
            <FilterTag label="Applied Filter 1" active showTrigger={false} />
            <FilterTag label="Applied Filter 2" active showTrigger={false} />
            <FilterTag label="Applied Filter 3" active showTrigger={false} />
          </Stack>
        </div>

        <div>
          <Heading level={4}>States</Heading>
          <Grid columns={2} gap="medium">
            <Stack gap="small">
              <Text weight="medium">Default</Text>
              <FilterTag label="Filter Tag" />
            </Stack>
            <Stack gap="small">
              <Text weight="medium">Active</Text>
              <FilterTag label="Filter Tag" active />
            </Stack>
            <Stack gap="small">
              <Text weight="medium">Disabled</Text>
              <FilterTag label="Filter Tag" disabled />
            </Stack>
            <Stack gap="small">
              <Text weight="medium">Active + Disabled</Text>
              <FilterTag label="Filter Tag" active disabled />
            </Stack>
          </Grid>
        </div>

        <Divider />

        <div>
          <Heading level={4}>Use Cases</Heading>
          <Stack gap="large">
            <div>
              <Text weight="medium" size="sm">
                Search Filters
              </Text>
              <Stack direction="horizontal" gap="small" wrap style={{ marginTop: '8px' }}>
                <FilterTag label="Status" onClick={() => alert('Open status filter')} />
                <FilterTag label="Date Range" onClick={() => alert('Open date filter')} />
                <FilterTag label="Assignee" onClick={() => alert('Open assignee filter')} />
              </Stack>
            </div>

            <div>
              <Text weight="medium" size="sm">
                Active Filters
              </Text>
              <Stack direction="horizontal" gap="small" wrap style={{ marginTop: '8px' }}>
                <FilterTag
                  label="Status: Signed"
                  active
                  dismissible
                  onDismiss={() => console.log('Remove status filter')}
                />
                <FilterTag
                  label="Date: This month"
                  active
                  dismissible
                  onDismiss={() => console.log('Remove date filter')}
                />
                <FilterTag
                  label="Assignee: John Doe"
                  active
                  dismissible
                  onDismiss={() => console.log('Remove assignee filter')}
                />
              </Stack>
            </div>
          </Stack>
        </div>
      </Stack>
    </Stack>
  );

  const renderStatusLightContent = () => (
    <Stack gap="xlarge">
      <div>
        <Heading level={3}>Status Light</Heading>
        <Text color="secondary" size="sm">
          Visual indicator for status with optional text label - 8px dot, 24px container, 4px radius
        </Text>
      </div>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Status Kinds with Background</Heading>
        <Stack gap="medium">
          <StatusLight kind="neutral">Status light</StatusLight>
          <StatusLight kind="success">Status light</StatusLight>
          <StatusLight kind="warning">Status light</StatusLight>
          <StatusLight kind="alert">Status light</StatusLight>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Without Background (No Fill)</Heading>
        <Stack gap="medium">
          <StatusLight kind="neutral" filled={false}>
            Status light
          </StatusLight>
          <StatusLight kind="success" filled={false}>
            Status light
          </StatusLight>
          <StatusLight kind="warning" filled={false}>
            Status light
          </StatusLight>
          <StatusLight kind="alert" filled={false}>
            Status light
          </StatusLight>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Use Cases</Heading>
        <Stack gap="medium">
          <div>
            <Text weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
              Document Status (With Background):
            </Text>
            <Stack gap="small">
              <StatusLight kind="success">Signed</StatusLight>
              <StatusLight kind="warning">Pending signature</StatusLight>
              <StatusLight kind="alert">Expired</StatusLight>
              <StatusLight kind="neutral">Draft</StatusLight>
            </Stack>
          </div>

          <div>
            <Text weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
              System Health (Without Background):
            </Text>
            <Stack gap="small">
              <StatusLight kind="success" filled={false}>
                All systems operational
              </StatusLight>
              <StatusLight kind="warning" filled={false}>
                Degraded performance
              </StatusLight>
              <StatusLight kind="alert" filled={false}>
                System outage
              </StatusLight>
            </Stack>
          </div>
        </Stack>
      </Stack>
    </Stack>
  );

  const renderAvatarContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Avatar</Heading>
        <Text color="secondary" size="sm">
          Visual representation of a user or entity
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Avatar Sizes</Heading>
            <Stack direction="horizontal" gap="medium" align="center">
              <Stack gap="xsmall" align="center">
                <Avatar name="John Doe" size="xsmall" />
                <Text size="xs">XSmall</Text>
              </Stack>
              <Stack gap="xsmall" align="center">
                <Avatar name="John Doe" size="small" />
                <Text size="xs">Small</Text>
              </Stack>
              <Stack gap="xsmall" align="center">
                <Avatar name="John Doe" size="medium" />
                <Text size="xs">Medium</Text>
              </Stack>
              <Stack gap="xsmall" align="center">
                <Avatar name="John Doe" size="large" />
                <Text size="xs">Large</Text>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Avatar with Images</Heading>
            <Stack direction="horizontal" gap="medium">
              <Avatar name="User with Image" src="https://i.pravatar.cc/150?img=1" size="large" />
              <Avatar name="Another User" src="https://i.pravatar.cc/150?img=2" size="large" />
              <Avatar name="Third User" src="https://i.pravatar.cc/150?img=3" size="large" />
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Avatar Group - All Sizes</Heading>
            <Stack gap="large">
              {/* XSmall with initials */}
              <Stack gap="small">
                <Text size="sm" weight="semibold">
                  XSmall (24px)
                </Text>
                <Stack direction="horizontal" gap="large">
                  <AvatarGroup
                    max={3}
                    size="xsmall"
                    avatars={[
                      { initials: 'AP', colorIndex: 0 },
                      { initials: 'AP', colorIndex: 2 },
                      { initials: 'AP', colorIndex: 4 },
                      { initials: 'AP', colorIndex: 1 },
                      { initials: 'AP', colorIndex: 3 },
                      { initials: 'AP', colorIndex: 5 },
                      { initials: 'AP', colorIndex: 6 },
                    ]}
                  />
                  <AvatarGroup
                    max={3}
                    size="xsmall"
                    avatars={[
                      { src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1' },
                      { src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2' },
                      { src: 'https://i.pravatar.cc/150?img=3', alt: 'User 3' },
                      { src: 'https://i.pravatar.cc/150?img=4', alt: 'User 4' },
                      { src: 'https://i.pravatar.cc/150?img=5', alt: 'User 5' },
                    ]}
                  />
                </Stack>
              </Stack>

              {/* Small */}
              <Stack gap="small">
                <Text size="sm" weight="semibold">
                  Small (32px)
                </Text>
                <Stack direction="horizontal" gap="large">
                  <AvatarGroup
                    max={3}
                    size="small"
                    avatars={[
                      { initials: 'AP', colorIndex: 0 },
                      { initials: 'AP', colorIndex: 2 },
                      { initials: 'AP', colorIndex: 4 },
                      { initials: 'AP', colorIndex: 1 },
                      { initials: 'AP', colorIndex: 3 },
                      { initials: 'AP', colorIndex: 5 },
                    ]}
                  />
                  <AvatarGroup
                    max={3}
                    size="small"
                    avatars={[
                      { src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1' },
                      { src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2' },
                      { src: 'https://i.pravatar.cc/150?img=3', alt: 'User 3' },
                      { src: 'https://i.pravatar.cc/150?img=4', alt: 'User 4' },
                    ]}
                  />
                </Stack>
              </Stack>

              {/* Medium */}
              <Stack gap="small">
                <Text size="sm" weight="semibold">
                  Medium (40px)
                </Text>
                <Stack direction="horizontal" gap="large">
                  <AvatarGroup
                    max={3}
                    size="medium"
                    avatars={[
                      { initials: 'AP', colorIndex: 0 },
                      { initials: 'AP', colorIndex: 2 },
                      { initials: 'AP', colorIndex: 4 },
                      { initials: 'AP', colorIndex: 1 },
                      { initials: 'AP', colorIndex: 3 },
                    ]}
                  />
                  <AvatarGroup
                    max={3}
                    size="medium"
                    avatars={[
                      { src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1' },
                      { src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2' },
                      { src: 'https://i.pravatar.cc/150?img=3', alt: 'User 3' },
                      { src: 'https://i.pravatar.cc/150?img=4', alt: 'User 4' },
                    ]}
                  />
                </Stack>
              </Stack>

              {/* Large */}
              <Stack gap="small">
                <Text size="sm" weight="semibold">
                  Large (48px)
                </Text>
                <Stack direction="horizontal" gap="large">
                  <AvatarGroup
                    max={3}
                    size="large"
                    avatars={[
                      { initials: 'AP', colorIndex: 0 },
                      { initials: 'AP', colorIndex: 2 },
                      { initials: 'AP', colorIndex: 4 },
                      { initials: 'AP', colorIndex: 1 },
                    ]}
                  />
                  <AvatarGroup
                    max={3}
                    size="large"
                    avatars={[
                      { src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1' },
                      { src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2' },
                      { src: 'https://i.pravatar.cc/150?img=3', alt: 'User 3' },
                      { src: 'https://i.pravatar.cc/150?img=4', alt: 'User 4' },
                    ]}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderSpinnerContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Spinner</Heading>
        <Text color="secondary" size="sm">
          Loading indicator for async operations
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Sizes - Default Kind</Heading>
            <Text size="sm" color="secondary">
              Small (16px), Medium (40px), Large (80px)
            </Text>
            <Stack direction="horizontal" gap="large" align="center">
              <div style={{ textAlign: 'center' }}>
                <Spinner size="small" kind="default" label="Small spinner" />
                <Text size="sm" color="secondary" style={{ marginTop: '8px' }}>
                  Small
                </Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Spinner size="medium" kind="default" label="Medium spinner" />
                <Text size="sm" color="secondary" style={{ marginTop: '8px' }}>
                  Medium
                </Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Spinner size="large" kind="default" label="Large spinner" />
                <Text size="sm" color="secondary" style={{ marginTop: '8px' }}>
                  Large
                </Text>
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Kind Variants</Heading>
            <Text size="sm" color="secondary">
              Default (blue) and Subtle (gray)
            </Text>
            <Stack direction="horizontal" gap="large" align="center">
              <div style={{ textAlign: 'center' }}>
                <Spinner size="large" kind="default" label="Default spinner" />
                <Text size="sm" color="secondary" style={{ marginTop: '8px' }}>
                  Default
                </Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Spinner size="large" kind="subtle" label="Subtle spinner" />
                <Text size="sm" color="secondary" style={{ marginTop: '8px' }}>
                  Subtle
                </Text>
              </div>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderDividerContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Divider</Heading>
        <Text color="secondary" size="sm">
          Visual separator between content sections
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Horizontal Divider</Heading>
            <Text>Content above divider</Text>
            <Divider />
            <Text>Content below divider</Text>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>In Layout</Heading>
            <Text>Section 1</Text>
            <Divider />
            <Text>Section 2</Text>
            <Divider />
            <Text>Section 3</Text>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderComboBoxContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>ComboBox</Heading>
        <Text color="secondary" size="sm">
          Searchable dropdown with autocomplete functionality
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="xlarge">
            <Heading level={4}>ComboBox Variations</Heading>
            <Stack gap="xlarge">
              <Stack gap="small" style={{ maxWidth: '400px' }}>
                <Text weight="medium">Default</Text>
                <ComboBox
                  label="Select a fruit"
                  options={comboBoxOptions}
                  value={comboBoxValue}
                  onChange={setComboBoxValue}
                  placeholder="Search fruits..."
                />
              </Stack>
              <Stack gap="small" style={{ maxWidth: '400px' }}>
                <Text weight="medium">With Description</Text>
                <ComboBox
                  label="Choose item"
                  options={comboBoxOptions}
                  value={comboBoxValue}
                  onChange={setComboBoxValue}
                  placeholder="Type to search..."
                  description="Start typing to filter options"
                />
              </Stack>
              <Stack gap="small" style={{ maxWidth: '400px' }}>
                <Text weight="medium">Error State</Text>
                <ComboBox
                  label="Required field"
                  options={comboBoxOptions}
                  value={comboBoxValue}
                  onChange={setComboBoxValue}
                  placeholder="Select..."
                  error="Please select an option"
                />
              </Stack>
              <Stack gap="small" style={{ maxWidth: '400px' }}>
                <Text weight="medium">Disabled</Text>
                <ComboBox
                  label="Disabled ComboBox"
                  options={comboBoxOptions}
                  value={comboBoxValue}
                  onChange={setComboBoxValue}
                  disabled
                  placeholder="Cannot select"
                />
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderSearchInputContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>SearchInput</Heading>
        <Text color="secondary" size="sm">
          Input field optimized for search functionality
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>SearchInput Variations</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default</Text>
                <SearchInput
                  placeholder="Search..."
                  value={searchValue}
                  onChange={setSearchValue}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Label</Text>
                <SearchInput
                  label="Search users"
                  placeholder="Enter username..."
                  value=""
                  onChange={() => {}}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Large Size</Text>
                <SearchInput placeholder="Search..." size="large" value="" onChange={() => {}} />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled</Text>
                <SearchInput placeholder="Cannot search" disabled value="" onChange={() => {}} />
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderFileInputContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>FileInput</Heading>
        <Text color="secondary" size="sm">
          File upload control with drag and drop support
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>FileInput Variations</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default</Text>
                <FileInput
                  label="Upload file"
                  value={fileInputValue}
                  onChange={setFileInputValue}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Description</Text>
                <FileInput
                  label="Upload image"
                  description="Supported formats: JPG, PNG, GIF"
                  value={[]}
                  onChange={() => {}}
                />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Multiple Files</Text>
                <FileInput label="Upload documents" multiple value={[]} onChange={() => {}} />
              </Stack>
              <Stack gap="small">
                <Text weight="medium">With Size Limit</Text>
                <FileInput
                  label="Upload (Max 5MB)"
                  maxSize={5 * 1024 * 1024}
                  value={[]}
                  onChange={() => {}}
                />
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderAlertContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Alert</Heading>
        <Text color="secondary" size="sm">
          Contextual feedback messages for user actions
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Alert Kinds</Heading>
            <Stack gap="medium">
              <Alert kind="info" title="Information">
                This is an informational alert with some details.
              </Alert>
              <Alert kind="success" title="Success">
                Your changes have been saved successfully.
              </Alert>
              <Alert kind="warning" title="Warning">
                Please review the following items before proceeding.
              </Alert>
              <Alert kind="error" title="Error">
                An error occurred while processing your request.
              </Alert>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Alert Without Title</Heading>
            <Stack gap="medium">
              <Alert kind="info">Simple informational message without a title.</Alert>
              <Alert kind="success">Operation completed successfully.</Alert>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderBannerContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Banner</Heading>
        <Text color="secondary" size="sm">
          Horizontal notification bars for important messages
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Banner Kinds</Heading>
            <Stack gap="medium">
              <Banner kind="information" icon="info">
                This is an informational banner with some details.
              </Banner>
              <Banner kind="success" icon="check-circle">
                Your changes have been saved successfully.
              </Banner>
              <Banner kind="warning" icon="warning">
                Please review the following items before proceeding.
              </Banner>
              <Banner kind="danger" icon="error">
                An error occurred while processing your request.
              </Banner>
              <Banner kind="promo" icon="star">
                New features are now available! Check them out.
              </Banner>
              <Banner kind="subtle" icon="info">
                This is a subtle banner for less prominent messages.
              </Banner>
              <Banner kind="neutral" icon="info">
                This is a neutral dark banner for high contrast.
              </Banner>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Banner Shapes</Heading>
            <Stack gap="medium">
              <Banner kind="information" icon="info" shape="square">
                Square banner with sharp corners.
              </Banner>
              <Banner kind="information" icon="info" shape="round">
                Round banner with rounded corners.
              </Banner>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Banner with Action Button</Heading>
            <Stack gap="medium">
              <Banner
                kind="information"
                icon="info"
                action={{
                  label: 'Learn More',
                  onClick: () => console.log('Learn more clicked'),
                }}
              >
                Check out our new features and improvements.
              </Banner>
              <Banner
                kind="success"
                icon="check-circle"
                shape="round"
                action={{
                  label: 'View Details',
                  onClick: () => console.log('View details clicked'),
                }}
              >
                Your operation completed successfully.
              </Banner>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Banner with Line Wrap</Heading>
            <Stack gap="medium">
              <Banner kind="information" icon="info" lineWrap={false}>
                This banner has lineWrap set to false, so long text will be truncated with ellipsis
                instead of wrapping to multiple lines.
              </Banner>
              <Banner kind="information" icon="info" lineWrap={true}>
                This banner has lineWrap set to true, so long text will wrap to multiple lines
                instead of being truncated with ellipsis.
              </Banner>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Banner with Bottom Border</Heading>
            <Stack gap="medium">
              <Banner kind="information" icon="info" bottomBorder={true}>
                This banner has a bottom border for visual separation.
              </Banner>
              <Banner kind="warning" icon="warning" bottomBorder={true} shape="square">
                Warning banner with bottom border and square shape.
              </Banner>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Banner Without Close Button</Heading>
            <Stack gap="medium">
              <Banner kind="information" icon="info" closable={false}>
                This banner cannot be dismissed.
              </Banner>
              <Banner
                kind="promo"
                icon="star"
                closable={false}
                action={{
                  label: 'Upgrade Now',
                  onClick: () => console.log('Upgrade clicked'),
                }}
              >
                Upgrade to premium for more features!
              </Banner>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Banner Without Icon</Heading>
            <Stack gap="medium">
              <Banner kind="information">Simple banner message without an icon.</Banner>
              <Banner kind="success" shape="round">
                Success message without an icon.
              </Banner>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderCalloutContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Callout</Heading>
        <Text color="secondary" size="sm">
          Contextual overlay with heading, body text, and actions
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="xlarge" align="center">
            <Heading level={4}>Width Variants</Heading>
            <Stack gap="xlarge" align="center">
              <Callout
                heading="Small Callout"
                width="small"
                primaryAction={{ label: 'Primary', onClick: () => alert('Primary clicked') }}
                secondaryAction={{ label: 'Secondary', onClick: () => alert('Secondary clicked') }}
              >
                An Ink is a liquid containing various pigments or dyes used for coloring a surface
                to render an image or text.
              </Callout>

              <Callout
                heading="Medium Callout"
                width="medium"
                primaryAction={{ label: 'Primary', onClick: () => alert('Primary clicked') }}
                secondaryAction={{ label: 'Secondary', onClick: () => alert('Secondary clicked') }}
              >
                An Ink is a liquid containing various pigments or dyes used for coloring a surface
                to render an image or text.
              </Callout>

              <Callout
                heading="Large Callout"
                width="large"
                primaryAction={{ label: 'Primary', onClick: () => alert('Primary clicked') }}
                secondaryAction={{ label: 'Secondary', onClick: () => alert('Secondary clicked') }}
              >
                An Ink is a liquid containing various pigments or dyes used for coloring a surface
                to render an image or text.
              </Callout>

              <Callout
                heading="Extra Large Callout"
                width="xlarge"
                primaryAction={{ label: 'Primary', onClick: () => alert('Primary clicked') }}
                secondaryAction={{ label: 'Secondary', onClick: () => alert('Secondary clicked') }}
              >
                An Ink is a liquid containing various pigments or dyes used for coloring a surface
                to render an image or text.
              </Callout>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="xlarge" align="center">
            <Heading level={4}>Text Alignment</Heading>
            <Stack gap="xlarge" align="center">
              <Callout
                heading="Start Aligned"
                alignment="start"
                width="large"
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                An Ink is a liquid containing various pigments or dyes used for coloring a surface.
              </Callout>

              <Callout
                heading="Center Aligned"
                alignment="center"
                width="large"
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                An Ink is a liquid containing various pigments or dyes used for coloring a surface.
              </Callout>

              <Callout
                heading="End Aligned"
                alignment="end"
                width="large"
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                An Ink is a liquid containing various pigments or dyes used for coloring a surface.
              </Callout>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="xlarge" align="center">
            <Heading level={4}>Caret Location</Heading>
            <Stack gap="xlarge" align="center">
              <Callout
                heading="Caret Above"
                location="above"
                width="medium"
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                Caret positioned above the callout card.
              </Callout>

              <Callout
                heading="Caret Below"
                location="below"
                width="medium"
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                Caret positioned below the callout card.
              </Callout>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="xlarge" align="center">
            <Heading level={4}>Glass Effects</Heading>
            <Stack gap="xlarge" align="center">
              <Callout
                heading="No Glass Effect"
                glass="none"
                width="medium"
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                Solid background with no glass effect.
              </Callout>

              <Callout
                heading="Glass Frost"
                glass="frost"
                width="medium"
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                Frosted glass effect with backdrop blur.
              </Callout>

              <Callout
                heading="Glass Tint"
                glass="tint"
                width="medium"
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                Tinted glass effect with transparency.
              </Callout>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="xlarge" align="center">
            <Heading level={4}>Action Buttons</Heading>
            <Stack gap="xlarge" align="center">
              <Callout
                heading="Primary Only"
                width="medium"
                primaryAction={{ label: 'Primary', onClick: () => alert('Primary clicked') }}
              >
                Callout with only a primary action button.
              </Callout>

              <Callout
                heading="Both Actions"
                width="medium"
                primaryAction={{ label: 'Primary', onClick: () => alert('Primary clicked') }}
                secondaryAction={{ label: 'Secondary', onClick: () => alert('Secondary clicked') }}
              >
                Callout with both primary and secondary actions.
              </Callout>

              <Callout heading="No Actions" width="medium">
                Callout without any action buttons.
              </Callout>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="xlarge" align="center">
            <Heading level={4}>Closable</Heading>
            <Stack gap="xlarge" align="center">
              <Callout
                heading="With Close Button"
                width="medium"
                closable={true}
                onClose={() => alert('Close clicked')}
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                Click the X button in the top-right to close.
              </Callout>

              <Callout
                heading="Without Close Button"
                width="medium"
                closable={false}
                primaryAction={{ label: 'Button', onClick: () => alert('Clicked') }}
              >
                This callout cannot be dismissed.
              </Callout>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderLinkContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Link</Heading>
        <Text color="secondary" size="sm">
          Navigational element for internal and external links
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Link Kinds</Heading>
            <Stack gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default (Cobalt Blue)</Text>
                <Link kind="default" href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Subtle (Neutral)</Text>
                <Link kind="subtle" href="#">
                  Download the App
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Link Sizes</Heading>
            <Stack gap="medium">
              <Stack gap="small">
                <Text weight="medium">Medium (16px)</Text>
                <Link kind="default" size="medium" href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Small (14px)</Text>
                <Link kind="default" size="small" href="#">
                  Download the App
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Discrete Mode</Heading>
            <Text size="sm" color="secondary">
              Discrete links only show underline on hover/active
            </Text>
            <Stack gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default (Always Underlined)</Text>
                <Stack direction="horizontal" gap="medium">
                  <Link kind="default" discrete={false} href="#">
                    Download the App
                  </Link>
                  <Link kind="subtle" discrete={false} href="#">
                    Download the App
                  </Link>
                </Stack>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Discrete (Underline on Hover)</Text>
                <Stack direction="horizontal" gap="medium">
                  <Link kind="default" discrete={true} href="#">
                    Download the App
                  </Link>
                  <Link kind="subtle" discrete={true} href="#">
                    Download the App
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Link States</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default State</Text>
                <Link kind="default" href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Visited (Purple)</Text>
                <Text size="sm" color="secondary">
                  Simulated visited state
                </Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled</Text>
                <Link kind="default" href="#" disabled>
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Disabled Subtle</Text>
                <Link kind="subtle" href="#" disabled>
                  Download the App
                </Link>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>External Links</Heading>
            <Stack gap="medium">
              <Stack gap="small">
                <Text weight="medium">With External Icon</Text>
                <Link kind="default" href="https://example.com" external>
                  Visit External Site
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Small External Link</Text>
                <Link kind="default" size="small" href="https://example.com" external>
                  Visit External Site
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Links in Context</Heading>
            <Stack gap="medium">
              <Stack gap="small">
                <Text weight="medium">Inline Link in Text</Text>
                <Text>
                  This is a paragraph with an{' '}
                  <Link kind="default" href="#">
                    inline link
                  </Link>{' '}
                  in the middle of the text.
                </Text>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Multiple Links</Text>
                <Text>
                  You can{' '}
                  <Link kind="default" href="#">
                    download the app
                  </Link>{' '}
                  or{' '}
                  <Link kind="default" href="#">
                    read the documentation
                  </Link>{' '}
                  to get started.
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>All Combinations</Heading>
            <Grid columns={2} gap="medium">
              <Stack gap="small">
                <Text weight="medium">Default, Medium, Underlined</Text>
                <Link kind="default" size="medium" discrete={false} href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Default, Medium, Discrete</Text>
                <Link kind="default" size="medium" discrete={true} href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Default, Small, Underlined</Text>
                <Link kind="default" size="small" discrete={false} href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Default, Small, Discrete</Text>
                <Link kind="default" size="small" discrete={true} href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Subtle, Medium, Underlined</Text>
                <Link kind="subtle" size="medium" discrete={false} href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Subtle, Medium, Discrete</Text>
                <Link kind="subtle" size="medium" discrete={true} href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Subtle, Small, Underlined</Text>
                <Link kind="subtle" size="small" discrete={false} href="#">
                  Download the App
                </Link>
              </Stack>
              <Stack gap="small">
                <Text weight="medium">Subtle, Small, Discrete</Text>
                <Link kind="subtle" size="small" discrete={true} href="#">
                  Download the App
                </Link>
              </Stack>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderTooltipContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Tooltip</Heading>
        <Text color="secondary" size="sm">
          Contextual information that appears on hover
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Tooltip Examples</Heading>
            <Stack direction="horizontal" gap="large" wrap>
              <Tooltip content="This is a tooltip">
                <Button kind="secondary">Hover for tooltip</Button>
              </Tooltip>
              <Tooltip content="Delete this item permanently">
                <IconButton kind="danger" icon="trash" label="Delete" />
              </Tooltip>
              <Tooltip content="Additional information here">
                <Badge variant="info">Info Badge</Badge>
              </Tooltip>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderDropdownContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Dropdown</Heading>
        <Text color="secondary" size="sm">
          Menu that appears when triggered, containing a list of actions
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Dropdown Menu</Heading>
            <Dropdown
              items={[
                { label: 'Profile', onClick: () => alert('Profile clicked') },
                { label: 'Settings', onClick: () => alert('Settings clicked') },
                { divider: true },
                { label: 'Logout', onClick: () => alert('Logout clicked') },
              ]}
            >
              <Button kind="secondary">Open Menu</Button>
            </Dropdown>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderCardContent = () => (
    <Stack gap="xlarge">
      <div>
        <Heading level={3}>Card Container</Heading>
        <Text color="secondary" size="sm">
          Container component for grouping related content - 8px radius, 12px padding
        </Text>
      </div>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Background Variants</Heading>
        <Grid columns={3} gap="medium">
          <Card variant="light">
            <Card.Header>
              <Heading level={5}>Light (Default)</Heading>
            </Card.Header>
            <Card.Body>
              <Text>White background with subtle border.</Text>
            </Card.Body>
            <Card.Footer>
              <Text size="sm" color="secondary">
                Footer
              </Text>
            </Card.Footer>
          </Card>

          <Card variant="dark">
            <Card.Header>
              <Heading level={5}>Dark</Heading>
            </Card.Header>
            <Card.Body>
              <Text>Dark purple background for inverse themes.</Text>
            </Card.Body>
            <Card.Footer>
              <Text size="sm" color="secondary">
                Footer
              </Text>
            </Card.Footer>
          </Card>

          <Card variant="secondary">
            <Card.Header>
              <Heading level={5}>Secondary</Heading>
            </Card.Header>
            <Card.Body>
              <Text>Light gray background for subtle cards.</Text>
            </Card.Body>
            <Card.Footer>
              <Text size="sm" color="secondary">
                Footer
              </Text>
            </Card.Footer>
          </Card>
        </Grid>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>States</Heading>
        <Grid columns={2} gap="medium">
          <Card variant="light">
            <Card.Body>
              <Stack gap="small">
                <Heading level={5}>Default State</Heading>
                <Text>Normal interactive card.</Text>
              </Stack>
            </Card.Body>
            <Card.Footer>
              <Button kind="primary" size="small">
                Action
              </Button>
            </Card.Footer>
          </Card>

          <Card variant="light" disabled>
            <Card.Body>
              <Stack gap="small">
                <Heading level={5}>Disabled State</Heading>
                <Text>Card with 0.2 opacity and no interaction.</Text>
              </Stack>
            </Card.Body>
            <Card.Footer>
              <Button kind="primary" size="small">
                Action
              </Button>
            </Card.Footer>
          </Card>
        </Grid>
      </Stack>

      <Divider />

      <Stack gap="xlarge">
        <Heading level={4}>Padding Options</Heading>
        <Grid columns={2} gap="medium">
          <Card variant="light">
            <Card.Body>
              <Stack gap="small">
                <Heading level={5}>Default Padding</Heading>
                <Text>12px padding on all sections.</Text>
              </Stack>
            </Card.Body>
          </Card>

          <Card variant="light" noPadding>
            <Card.Body>
              <Stack gap="small">
                <Heading level={5}>No Padding</Heading>
                <Text>Content extends to edges.</Text>
              </Stack>
            </Card.Body>
          </Card>
        </Grid>
      </Stack>
    </Stack>
  );

  const renderModalContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Modal</Heading>
        <Text color="secondary" size="sm">
          Overlay dialog for focused content and interactions
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Modal Sizes</Heading>
            <Grid columns={3} gap="medium">
              <Button kind="secondary" onClick={() => setSmallModalOpen(true)}>
                Small Modal
              </Button>
              <Button kind="secondary" onClick={() => setMediumModalOpen(true)}>
                Medium Modal
              </Button>
              <Button kind="secondary" onClick={() => setLargeModalOpen(true)}>
                Large Modal
              </Button>
              <Button kind="secondary" onClick={() => setXlargeModalOpen(true)}>
                XLarge Modal
              </Button>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      {/* Modal Components */}
      <Modal
        open={smallModalOpen}
        onClose={() => setSmallModalOpen(false)}
        size="small"
        title="Small Modal"
        footer={
          <>
            <Button kind="secondary" onClick={() => setSmallModalOpen(false)}>
              Cancel
            </Button>
            <Button kind="brand" onClick={() => setSmallModalOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <Text>This is a small modal dialog.</Text>
      </Modal>

      <Modal
        open={mediumModalOpen}
        onClose={() => setMediumModalOpen(false)}
        size="medium"
        title="Medium Modal"
        footer={
          <>
            <Button kind="secondary" onClick={() => setMediumModalOpen(false)}>
              Cancel
            </Button>
            <Button kind="brand" onClick={() => setMediumModalOpen(false)}>
              Save
            </Button>
          </>
        }
      >
        <Text>This is a medium-sized modal dialog.</Text>
      </Modal>

      <Modal
        open={largeModalOpen}
        onClose={() => setLargeModalOpen(false)}
        size="large"
        title="Large Modal"
        footer={
          <>
            <Button kind="secondary" onClick={() => setLargeModalOpen(false)}>
              Cancel
            </Button>
            <Button kind="brand" onClick={() => setLargeModalOpen(false)}>
              Apply
            </Button>
          </>
        }
      >
        <Stack gap="medium">
          <Text>This is a large modal with more content.</Text>
          <Text>It can contain multiple paragraphs and elements.</Text>
        </Stack>
      </Modal>

      <Modal
        open={xlargeModalOpen}
        onClose={() => setXlargeModalOpen(false)}
        size="xlarge"
        title="Extra Large Modal"
        footer={
          <>
            <Button kind="secondary" onClick={() => setXlargeModalOpen(false)}>
              Cancel
            </Button>
            <Button kind="brand" onClick={() => setXlargeModalOpen(false)}>
              Continue
            </Button>
          </>
        }
      >
        <Stack gap="medium">
          <Text>This is an extra large modal for extensive content.</Text>
          <Text>Perfect for forms or detailed information displays.</Text>
        </Stack>
      </Modal>
    </Stack>
  );

  const renderTabsContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Tabs</Heading>
        <Text color="secondary" size="sm">
          Navigation component for switching between related views
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body style={{ padding: 0 }}>
          <Tabs
            items={[
              {
                id: 'tab1',
                label: 'Tab 1',
                content: (
                  <Stack gap="medium">
                    <Heading level={5}>Tab 1 Content</Heading>
                    <Text>This is the content for the first tab.</Text>
                  </Stack>
                ),
              },
              {
                id: 'tab2',
                label: 'Tab 2',
                content: (
                  <Stack gap="medium">
                    <Heading level={5}>Tab 2 Content</Heading>
                    <Text>This is the content for the second tab.</Text>
                  </Stack>
                ),
              },
              {
                id: 'tab3',
                label: 'Tab 3',
                content: (
                  <Stack gap="medium">
                    <Heading level={5}>Tab 3 Content</Heading>
                    <Text>This is the content for the third tab.</Text>
                  </Stack>
                ),
              },
            ]}
          />
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderAccordionContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Accordion</Heading>
        <Text color="secondary" size="sm">
          Collapsible content sections
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Accordion
            items={[
              {
                id: 'acc1',
                title: 'Section 1',
                content: 'Content for the first accordion section.',
              },
              {
                id: 'acc2',
                title: 'Section 2',
                content: 'Content for the second accordion section.',
              },
              {
                id: 'acc3',
                title: 'Section 3',
                content: 'Content for the third accordion section.',
              },
            ]}
          />
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderTableContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Table</Heading>
        <Text color="secondary" size="sm">
          Structured data display in rows and columns
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Data Table</Heading>
            <Table data={tableData} columns={tableColumns} />
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Striped Table</Heading>
            <Table data={tableData} columns={tableColumns} striped />
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Hoverable Table</Heading>
            <Table data={tableData} columns={tableColumns} hoverable />
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderBreadcrumbContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Breadcrumb</Heading>
        <Text color="secondary" size="sm">
          Navigation trail showing current location in hierarchy
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Breadcrumb Navigation</Heading>
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Products', href: '#' },
                { label: 'Electronics', href: '#' },
                { label: 'Laptops' },
              ]}
            />
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Short Breadcrumb</Heading>
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Settings' }]} />
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderPaginationContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Pagination</Heading>
        <Text color="secondary" size="sm">
          Navigation between pages of content
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Pagination Example</Heading>
            <Pagination
              currentPage={1}
              totalPages={10}
              onPageChange={(page) => console.log('Page:', page)}
            />
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>Middle Page</Heading>
            <Pagination
              currentPage={5}
              totalPages={10}
              onPageChange={(page) => console.log('Page:', page)}
            />
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  const renderStepperContent = () => {
    const stepperSteps = [
      { id: 'step1', title: 'Account', description: 'Create your account' },
      { id: 'step2', title: 'Profile', description: 'Set up your profile' },
      { id: 'step3', title: 'Preferences', description: 'Choose preferences' },
      { id: 'step4', title: 'Complete', description: 'Finish setup' },
    ];

    return (
      <Stack gap="large">
        <div>
          <Heading level={3}>Stepper (Progress Stepper)</Heading>
          <Text color="secondary" size="sm">
            Interactive progress indicator for multi-step processes with clickable navigation
          </Text>
        </div>

        <Divider />

        {/* Interactive Clickable Stepper */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={4}>Interactive Stepper (Clickable)</Heading>
              <Text size="sm" color="secondary">
                Click on completed steps to navigate back
              </Text>
              <Stepper
                steps={stepperSteps}
                activeStep={activeStepIndex}
                clickable
                onStepClick={(index) => setActiveStepIndex(index)}
              />
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--ink-neutral-20)',
                }}
              >
                <button
                  onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                  disabled={activeStepIndex === 0}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--ink-neutral-40)',
                    borderRadius: 'var(--ink-radius-md)',
                    background: 'var(--ink-white)',
                    cursor: activeStepIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: activeStepIndex === 0 ? 0.5 : 1,
                    fontFamily: 'var(--ink-font-family)',
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setActiveStepIndex(Math.min(stepperSteps.length - 1, activeStepIndex + 1))
                  }
                  disabled={activeStepIndex === stepperSteps.length - 1}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--ink-cobalt-100)',
                    borderRadius: 'var(--ink-radius-md)',
                    background: 'var(--ink-cobalt-100)',
                    color: 'var(--ink-white)',
                    cursor: activeStepIndex === stepperSteps.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: activeStepIndex === stepperSteps.length - 1 ? 0.5 : 1,
                    fontFamily: 'var(--ink-font-family)',
                  }}
                >
                  Next
                </button>
              </div>
            </Stack>
          </Card.Body>
        </Card>

        {/* Static Progress States */}
        <Grid columns={2} gap="medium">
          <Card>
            <Card.Body>
              <Stack gap="medium">
                <Heading level={4}>First Step</Heading>
                <Stepper steps={stepperSteps} activeStep={0} />
              </Stack>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Stack gap="medium">
                <Heading level={4}>All Completed</Heading>
                <Stepper steps={stepperSteps} activeStep={4} />
              </Stack>
            </Card.Body>
          </Card>
        </Grid>

        {/* Vertical Orientation */}
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={4}>Vertical Orientation</Heading>
              <Stepper steps={stepperSteps} activeStep={2} orientation="vertical" />
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  };

  const renderListContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>List</Heading>
        <Text color="secondary" size="sm">
          Vertical collection of items
        </Text>
      </div>

      <Divider />

      <Grid columns={2} gap="medium">
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Simple List</Heading>
              <List
                items={[
                  { id: '1', content: 'First item' },
                  { id: '2', content: 'Second item' },
                  { id: '3', content: 'Third item' },
                ]}
              />
            </Stack>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>List with Icons</Heading>
              <List
                items={[
                  {
                    id: '1',
                    icon: 'check',
                    content: 'Completed task',
                  },
                  {
                    id: '2',
                    icon: 'alert-circle',
                    content: 'Pending task',
                  },
                  {
                    id: '3',
                    icon: 'x',
                    content: 'Failed task',
                  },
                ]}
              />
            </Stack>
          </Card.Body>
        </Card>
      </Grid>
    </Stack>
  );

  const renderStackContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Stack</Heading>
        <Text color="secondary" size="sm">
          Layout component for arranging children with consistent spacing
        </Text>
      </div>

      <Divider />

      <Grid columns={2} gap="medium">
        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Vertical Stack</Heading>
              <Stack gap="small">
                <Badge variant="primary">Item 1</Badge>
                <Badge variant="secondary">Item 2</Badge>
                <Badge variant="success">Item 3</Badge>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Horizontal Stack</Heading>
              <Stack direction="horizontal" gap="small">
                <Badge variant="primary">Item 1</Badge>
                <Badge variant="secondary">Item 2</Badge>
                <Badge variant="success">Item 3</Badge>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>With Alignment</Heading>
              <Stack gap="small" align="center">
                <Text>Centered content</Text>
                <Button size="small">Action</Button>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={5}>Different Gaps</Heading>
              <Stack gap="xlarge">
                <Text>XLarge gap</Text>
                <Text>between items</Text>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Grid>
    </Stack>
  );

  const renderGridContent = () => (
    <Stack gap="large">
      <div>
        <Heading level={3}>Grid</Heading>
        <Text color="secondary" size="sm">
          Responsive grid layout system
        </Text>
      </div>

      <Divider />

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>2 Column Grid</Heading>
            <Grid columns={2} gap="medium">
              <Card>
                <Card.Body>
                  <Text>Column 1</Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text>Column 2</Text>
                </Card.Body>
              </Card>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>3 Column Grid</Heading>
            <Grid columns={3} gap="medium">
              <Card>
                <Card.Body>
                  <Text>Column 1</Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text>Column 2</Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text>Column 3</Text>
                </Card.Body>
              </Card>
            </Grid>
          </Stack>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Stack gap="medium">
            <Heading level={4}>4 Column Grid</Heading>
            <Grid columns={4} gap="small">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <Card key={num}>
                  <Card.Body>
                    <Text align="center">Item {num}</Text>
                  </Card.Body>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  // Main content renderer based on active subpage
  const renderActiveContent = () => {
    switch (activeSubpage) {
      // Atoms - Foundation
      case 'colors':
        return renderColorsContent();
      case 'color-pairing':
        return renderColorPairingContent();
      case 'typography':
        return renderTypographyContent();
      case 'icons':
        return renderIconsContent();
      case 'spacing':
        return renderSpacingContent();
      case 'border-radius':
        return renderBorderRadiusContent();
      case 'alias-tokens':
        return renderAliasTokensContent();

      // Atoms - Form Controls
      case 'button':
        return renderButtonContent();
      case 'iconbutton':
        return renderIconButtonContent();
      case 'combobutton':
        return renderComboButtonContent();
      case 'input':
        return renderInputContent();
      case 'textarea':
        return renderTextAreaContent();
      case 'select':
        return renderSelectContent();
      case 'checkbox':
        return renderCheckboxContent();
      case 'radio':
        return renderRadioContent();
      case 'switch':
        return renderSwitchContent();
      case 'slider':
        return renderSliderContent();

      // Atoms - Display
      case 'badge':
        return renderBadgeContent();
      case 'alert-badge':
        return renderAlertBadgeContent();
      case 'chip':
        return renderChipContent();
      case 'filtertag':
        return renderFilterTagContent();
      case 'statuslight':
        return renderStatusLightContent();
      case 'avatar':
        return renderAvatarContent();
      case 'spinner':
        return renderSpinnerContent();
      case 'divider':
        return renderDividerContent();

      // Molecules
      case 'combobox':
        return renderComboBoxContent();
      case 'searchinput':
        return renderSearchInputContent();
      case 'fileinput':
        return renderFileInputContent();
      case 'alert':
        return renderAlertContent();
      case 'banner':
        return renderBannerContent();
      case 'callout':
        return renderCalloutContent();
      case 'link':
        return renderLinkContent();
      case 'tooltip':
        return renderTooltipContent();
      case 'dropdown':
        return renderDropdownContent();

      // Organisms
      case 'card':
        return renderCardContent();
      case 'modal':
        return renderModalContent();
      case 'tabs':
        return renderTabsContent();
      case 'accordion':
        return renderAccordionContent();
      case 'table':
        return renderTableContent();
      case 'breadcrumb':
        return renderBreadcrumbContent();
      case 'pagination':
        return renderPaginationContent();
      case 'stepper':
        return renderStepperContent();
      case 'list':
        return renderListContent();
      case 'stack':
        return renderStackContent();
      case 'grid':
        return renderGridContent();

      default:
        return null;
    }
  };

  const tabItems = [
    {
      id: 'foundation',
      label: 'Foundation',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['foundation']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['actions']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'content-display',
      label: 'Content Display',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['content-display']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'forms-inputs',
      label: 'Forms and Inputs',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['forms-inputs']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'lists-tables',
      label: 'Lists and Tables',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['lists-tables']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'loading-status',
      label: 'Loading and Status',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['loading-status']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'feedback',
      label: 'Feedback',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['feedback']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'navigational',
      label: 'Navigational',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['navigational']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'menus',
      label: 'Menus',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['menus']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
    {
      id: 'popovers',
      label: 'Popovers',
      content: (
        <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
          <SidebarNav
            links={sidebarLinks['popovers']}
            activeSubpage={activeSubpage}
            onSubpageChange={setActiveSubpage}
          />
          <div style={{ flex: 1, minWidth: 0, padding: '24px 32px 32px 32px', height: '100%' }}>
            {renderActiveContent()}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--ink-neutral-5)',
      }}
    >
      {/* DEPRECATION NOTICE */}
      <Banner
        kind="warning"
        icon="alert-triangle"
        style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
      >
        <Stack gap="xsmall">
          <Text weight="semibold">⚠️ This showcase is deprecated</Text>
          <Text size="sm">
            Please use{' '}
            <Link href="/showcase2" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Showcase 2
            </Link>{' '}
            for the comprehensive, architecture-based component view with all 57 components fully
            documented.
          </Text>
        </Stack>
      </Banner>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Vertical Navigation */}
        <VerticalNavigation
          items={navigationItems}
          activeItemId={viewMode}
          activeSubItemId={viewMode === 'design-system' ? activeTab : activePattern}
          onItemClick={handleNavigationItemClick}
          onSubItemClick={handleNavigationSubItemClick}
          collapsed={navCollapsed}
          onCollapsedChange={setNavCollapsed}
          width={280}
          logo={
            navCollapsed ? (
              <img
                src="/assets/docusign-logo.svg"
                alt="DocuSign"
                style={{ width: '32px', height: 'auto' }}
              />
            ) : (
              <img
                src="/assets/docusign-logo.svg"
                alt="DocuSign"
                style={{ width: '119.25px', height: '24px', objectFit: 'contain' }}
              />
            )
          }
        />

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            background: 'var(--ink-neutral-5)',
          }}
        >
          {/* Design System View */}
          {viewMode === 'design-system' && (
            <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
              <SidebarNav
                links={sidebarLinks[activeTab] || []}
                activeSubpage={activeSubpage}
                onSubpageChange={setActiveSubpage}
              />
              <div style={{ flex: 1, minWidth: 0, padding: '24px 16px' }}>
                {renderActiveContent()}
              </div>
            </div>
          )}

          {/* Patterns View */}
          {viewMode === 'patterns' && (
            <div style={{ padding: '24px 16px' }}>
              {/* Global Nav Pattern */}
              {activePattern === 'global-nav' && (
                <Stack gap="large">
                  <Card>
                    <Card.Body>
                      <Stack gap="medium">
                        <div>
                          <Heading level={3}>Global Navigation</Heading>
                          <Text color="secondary" size="sm">
                            A horizontal navigation header pattern with app switcher, logo,
                            navigation items, and user actions
                          </Text>
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Stack gap="medium">
                        <Heading level={4}>Full Featured</Heading>
                        <div style={{ marginTop: '16px' }}>
                          <GlobalNav
                            logo={
                              <img
                                src="/assets/docusign-logo.svg"
                                alt="DocuSign"
                                style={{ width: '119.25px', height: '24px', objectFit: 'contain' }}
                              />
                            }
                            navItems={[
                              {
                                id: 'home',
                                label: 'Home',
                                href: '#',
                                active: globalNavFullActive === 'home',
                                onClick: () => setGlobalNavFullActive('home'),
                              },
                              {
                                id: 'agreements',
                                label: 'Agreements',
                                href: '#',
                                active: globalNavFullActive === 'agreements',
                                onClick: () => setGlobalNavFullActive('agreements'),
                              },
                              {
                                id: 'templates',
                                label: 'Templates',
                                href: '#',
                                active: globalNavFullActive === 'templates',
                                onClick: () => setGlobalNavFullActive('templates'),
                              },
                              {
                                id: 'insights',
                                label: 'Insights',
                                href: '#',
                                active: globalNavFullActive === 'insights',
                                onClick: () => setGlobalNavFullActive('insights'),
                              },
                            ]}
                            showAppSwitcher={true}
                            showSearch={true}
                            showNotifications={true}
                            notificationCount={3}
                            showSettings={true}
                            user={{
                              name: 'John Doe',
                            }}
                            onAppSwitcherClick={() => console.log('App switcher clicked')}
                            onSearchClick={() => console.log('Search clicked')}
                            onNotificationClick={() => console.log('Notifications clicked')}
                            onSettingsClick={() => console.log('Settings clicked')}
                            onUserMenuClick={() => console.log('User menu clicked')}
                          />
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Stack gap="medium">
                        <Heading level={4}>Minimal (No Search/Notifications)</Heading>
                        <div style={{ marginTop: '16px' }}>
                          <GlobalNav
                            logo={
                              <img
                                src="/assets/docusign-logo.svg"
                                alt="DocuSign"
                                style={{ width: '119.25px', height: '24px', objectFit: 'contain' }}
                              />
                            }
                            navItems={[
                              {
                                id: 'home',
                                label: 'Home',
                                href: '#',
                                active: globalNavMinimalActive === 'home',
                                onClick: () => setGlobalNavMinimalActive('home'),
                              },
                              {
                                id: 'agreements',
                                label: 'Agreements',
                                href: '#',
                                active: globalNavMinimalActive === 'agreements',
                                onClick: () => setGlobalNavMinimalActive('agreements'),
                              },
                              {
                                id: 'templates',
                                label: 'Templates',
                                href: '#',
                                active: globalNavMinimalActive === 'templates',
                                onClick: () => setGlobalNavMinimalActive('templates'),
                              },
                              {
                                id: 'insights',
                                label: 'Insights',
                                href: '#',
                                active: globalNavMinimalActive === 'insights',
                                onClick: () => setGlobalNavMinimalActive('insights'),
                              },
                            ]}
                            showAppSwitcher={true}
                            user={{
                              name: 'Jane Smith',
                            }}
                            onUserMenuClick={() => console.log('User menu clicked')}
                          />
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Stack gap="medium">
                        <Heading level={4}>Simple (No App Switcher or User)</Heading>
                        <div style={{ marginTop: '16px' }}>
                          <GlobalNav
                            logo={
                              <img
                                src="/assets/docusign-logo.svg"
                                alt="DocuSign"
                                style={{ width: '119.25px', height: '24px', objectFit: 'contain' }}
                              />
                            }
                            navItems={[
                              {
                                id: 'home',
                                label: 'Home',
                                href: '#',
                                active: globalNavSimpleActive === 'home',
                                onClick: () => setGlobalNavSimpleActive('home'),
                              },
                              {
                                id: 'agreements',
                                label: 'Agreements',
                                href: '#',
                                active: globalNavSimpleActive === 'agreements',
                                onClick: () => setGlobalNavSimpleActive('agreements'),
                              },
                              {
                                id: 'templates',
                                label: 'Templates',
                                href: '#',
                                active: globalNavSimpleActive === 'templates',
                                onClick: () => setGlobalNavSimpleActive('templates'),
                              },
                            ]}
                            showAppSwitcher={false}
                          />
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>
              )}

              {/* Local Nav Pattern */}
              {activePattern === 'local-nav' && (
                <Stack gap="large">
                  <Card>
                    <Card.Body>
                      <Stack gap="medium">
                        <div>
                          <Heading level={3}>Local Navigation</Heading>
                          <Text color="secondary" size="sm">
                            Local navigation sidebar for application sections and pages - left
                            sidebar navigation pattern
                          </Text>
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Stack gap="medium">
                        <Heading level={4}>Interactive Example</Heading>
                        <div
                          style={{
                            display: 'flex',
                            height: '600px',
                            border: '1px solid var(--ink-neutral-20)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          <LocalNav
                            headerLabel="Start"
                            sections={[
                              {
                                id: 'agreements',
                                title: 'All Agreements',
                                icon: 'envelope',
                                collapsible: true,
                                defaultExpanded: true,
                                items: [
                                  {
                                    id: 'drafts',
                                    label: 'Drafts',
                                    nested: true,
                                    onClick: () => setLocalNavActive('drafts'),
                                  },
                                  {
                                    id: 'in-progress',
                                    label: 'In Progress',
                                    nested: true,
                                    onClick: () => setLocalNavActive('in-progress'),
                                  },
                                  {
                                    id: 'completed',
                                    label: 'Completed',
                                    nested: true,
                                    onClick: () => setLocalNavActive('completed'),
                                  },
                                  {
                                    id: 'deleted',
                                    label: 'Deleted',
                                    nested: true,
                                    onClick: () => setLocalNavActive('deleted'),
                                  },
                                ],
                              },
                              {
                                id: 'folders-section',
                                title: 'FOLDERS',
                                headerLabel: true,
                                headerAction: {
                                  icon: 'plus',
                                  label: 'New Folder',
                                  onClick: () => console.log('New Folder clicked'),
                                },
                                items: [
                                  {
                                    id: 'folders',
                                    label: 'Folders',
                                    icon: 'folder',
                                    hasMenu: true,
                                    onMenuClick: (e) => {
                                      console.log('Folders menu clicked');
                                    },
                                    onClick: () => setLocalNavActive('folders'),
                                  },
                                  {
                                    id: 'all-parties',
                                    label: 'All Parties',
                                    icon: 'people',
                                    badge: 'New',
                                    onClick: () => setLocalNavActive('all-parties'),
                                  },
                                  {
                                    id: 'employees',
                                    label: 'Employees',
                                    icon: 'user',
                                    onClick: () => setLocalNavActive('employees'),
                                  },
                                ],
                              },
                              {
                                id: 'tools',
                                items: [
                                  {
                                    id: 'requests',
                                    label: 'Requests',
                                    icon: 'envelope',
                                    badge: 'New',
                                    onClick: () => setLocalNavActive('requests'),
                                  },
                                  {
                                    id: 'maestro-workflows',
                                    label: 'Maestro Workflows',
                                    icon: 'settings',
                                    onClick: () => setLocalNavActive('maestro-workflows'),
                                  },
                                  {
                                    id: 'workspaces',
                                    label: 'Workspaces',
                                    icon: 'layout-grid',
                                    onClick: () => setLocalNavActive('workspaces'),
                                  },
                                  {
                                    id: 'powerforms',
                                    label: 'Powerforms',
                                    icon: 'document',
                                    onClick: () => setLocalNavActive('powerforms'),
                                  },
                                  {
                                    id: 'bulk-send',
                                    label: 'Bulk Send',
                                    icon: 'send',
                                    onClick: () => setLocalNavActive('bulk-send'),
                                  },
                                ],
                              },
                            ]}
                            activeItemId={localNavActive}
                            onHeaderClick={() => console.log('Header clicked')}
                            footerToggle={{
                              label: 'New navigation',
                              checked: newNavEnabled,
                              onChange: setNewNavEnabled,
                              icon: 'lock',
                            }}
                          />
                          <div
                            style={{ flex: 1, padding: '32px', background: 'var(--ink-neutral-5)' }}
                          >
                            <Stack gap="medium">
                              <Heading level={3}>Main Content Area</Heading>
                              <Text color="secondary">
                                Active item: <strong>{localNavActive}</strong>
                              </Text>
                              <Text color="secondary" size="sm">
                                Click items in the sidebar to navigate
                              </Text>
                            </Stack>
                          </div>
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>
              )}
            </div>
          )}

          {/* Layouts View */}
          {viewMode === 'layouts' && (
            <div style={{ padding: '24px 16px' }}>
              <LayoutsDemo />
            </div>
          )}

          {/* Experiments View */}
          {viewMode === 'experiments' && (
            <div style={{ padding: '24px 16px' }}>
              <Card>
                <Card.Body>
                  <Stack gap="medium">
                    <Heading level={3}>Experiments</Heading>
                    <Text color="secondary" size="sm">
                      Experimental features and prototypes - Coming soon
                    </Text>
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
