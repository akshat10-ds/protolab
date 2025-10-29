import React, { useState, useEffect } from 'react';
import {
  Stack,
  Grid,
  Inline,
  Container,
  Spacer,
  Button,
  IconButton,
  Link,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  TextArea,
  Slider,
  Stepper,
  Badge,
  Avatar,
  AvatarGroup,
  Chip,
  AlertBadge,
  StatusLight,
  Divider,
  Card,
  Skeleton,
  Heading,
  Text,
  Spinner,
  ProgressBar,
  Callout,
  Banner,
  Tooltip,
  Icon,
  SearchInput,
  FileInput,
  ComboBox,
  DatePicker,
  FileUpload,
  FilterTag,
  Breadcrumb,
  Pagination,
  Tabs,
  Accordion,
  ComboButton,
  Modal,
  Dropdown,
  Alert,
  Table,
  List,
} from '@/design-system';
import type { TableColumn, FileInputFile, ComboBoxOption } from '@/design-system';
import { iconPaths } from '@/design-system/3-primitives/Icon/iconPaths';
import { GlobalNav, LocalNav } from '@/design-system/5-patterns';
import type { NavigationItem } from '@/design-system/5-patterns';

type LayerView = 'tokens' | 'utilities' | 'primitives' | 'composites' | 'patterns' | 'layouts';
type SubPage = string;

// Sidebar component
const SidebarNav = ({
  activeLayer,
  activeSubpage,
  onLayerChange,
  onSubpageChange,
}: {
  activeLayer: LayerView;
  activeSubpage: string;
  onLayerChange: (layer: LayerView) => void;
  onSubpageChange: (subpage: string) => void;
}) => {
  const layerSubpages: Record<LayerView, { id: string; label: string }[]> = {
    tokens: [
      { id: 'color-primitives', label: 'Color Primitives' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'border-radius', label: 'Border & Radius' },
      { id: 'shadows', label: 'Shadows' },
    ],
    utilities: [
      { id: 'stack', label: 'Stack' },
      { id: 'grid', label: 'Grid' },
      { id: 'inline', label: 'Inline' },
      { id: 'container', label: 'Container' },
      { id: 'spacer', label: 'Spacer' },
    ],
    primitives: [
      { id: 'button', label: 'Button' },
      { id: 'iconbutton', label: 'IconButton' },
      { id: 'link', label: 'Link' },
      { id: 'input', label: 'Input' },
      { id: 'select', label: 'Select' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio', label: 'Radio' },
      { id: 'switch', label: 'Switch' },
      { id: 'textarea', label: 'TextArea' },
      { id: 'slider', label: 'Slider' },
      { id: 'stepper', label: 'Stepper' },
      { id: 'badge', label: 'Badge' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'chip', label: 'Chip' },
      { id: 'alert-badge', label: 'AlertBadge' },
      { id: 'status-light', label: 'StatusLight' },
      { id: 'divider', label: 'Divider' },
      { id: 'card', label: 'Card' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'typography', label: 'Typography' },
      { id: 'spinner', label: 'Spinner' },
      { id: 'progressbar', label: 'ProgressBar' },
      { id: 'callout', label: 'Callout' },
      { id: 'banner', label: 'Banner' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'icon', label: 'Icon' },
    ],
    composites: [
      { id: 'searchinput', label: 'SearchInput' },
      { id: 'fileinput', label: 'FileInput' },
      { id: 'combobox', label: 'ComboBox' },
      { id: 'datepicker', label: 'DatePicker' },
      { id: 'fileupload', label: 'FileUpload' },
      { id: 'filtertag', label: 'FilterTag' },
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'accordion', label: 'Accordion' },
      { id: 'combobutton', label: 'ComboButton' },
      { id: 'modal', label: 'Modal' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'alert', label: 'Alert' },
      { id: 'table', label: 'Table' },
      { id: 'list', label: 'List' },
    ],
    patterns: [
      { id: 'globalnav', label: 'GlobalNav' },
      { id: 'localnav', label: 'LocalNav' },
      { id: 'verticalnav', label: 'VerticalNavigation' },
    ],
    layouts: [
      { id: 'dashboard', label: 'DashboardLayout' },
      { id: 'auth', label: 'AuthLayout' },
    ],
  };

  const layers: { id: LayerView; label: string; count: number }[] = [
    { id: 'tokens', label: 'Layer 1: Tokens', count: 5 },
    { id: 'utilities', label: 'Layer 2: Utilities', count: 5 },
    { id: 'primitives', label: 'Layer 3: Primitives', count: 26 },
    { id: 'composites', label: 'Layer 4: Composites', count: 18 },
    { id: 'patterns', label: 'Layer 5: Patterns', count: 3 },
    { id: 'layouts', label: 'Layer 6: Layouts', count: 2 },
  ];

  return (
    <div
      style={{
        width: '280px',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        background: 'var(--ink-white)',
        borderRight: '1px solid var(--ink-neutral-20)',
        padding: '24px 0',
      }}
    >
      <Stack gap="large">
        {layers.map((layer) => (
          <Stack key={layer.id} gap="xsmall">
            <button
              onClick={() => {
                onLayerChange(layer.id);
                onSubpageChange(layerSubpages[layer.id][0].id);
              }}
              style={{
                padding: '8px 24px',
                background: activeLayer === layer.id ? 'var(--ink-cobalt-10)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (activeLayer !== layer.id) {
                  e.currentTarget.style.background = 'var(--ink-neutral-10)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeLayer !== layer.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Stack gap="xxsmall">
                <Text
                  size="sm"
                  weight="semibold"
                  color={activeLayer === layer.id ? 'brand' : 'primary'}
                >
                  {layer.label}
                </Text>
                <Text size="xs" color="secondary">
                  {layer.count} items
                </Text>
              </Stack>
            </button>

            {activeLayer === layer.id && (
              <Stack gap="xxsmall" style={{ paddingLeft: '24px' }}>
                {layerSubpages[layer.id].map((subpage) => (
                  <button
                    key={subpage.id}
                    onClick={() => onSubpageChange(subpage.id)}
                    style={{
                      padding: '6px 8px',
                      background: activeSubpage === subpage.id ? 'var(--ink-cobalt-10)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: '4px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (activeSubpage !== subpage.id) {
                        e.currentTarget.style.background = 'var(--ink-neutral-10)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSubpage !== subpage.id) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <Text
                      size="sm"
                      color={activeSubpage === subpage.id ? 'brand' : 'primary'}
                    >
                      {subpage.label}
                    </Text>
                  </button>
                ))}
              </Stack>
            )}
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export default function ComponentShowcase2() {
  const [activeLayer, setActiveLayer] = useState<LayerView>('primitives');
  const [activeSubpage, setActiveSubpage] = useState<string>('button');

  // Component states
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [comboBoxValue, setComboBoxValue] = useState('');
  const [fileInputValue, setFileInputValue] = useState<FileInputFile[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const [activeTab, setActiveTab] = useState('tab1');
  const [globalNavActive, setGlobalNavActive] = useState('insights');
  const [localNavActive, setLocalNavActive] = useState('in-progress');

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const comboBoxOptions: ComboBoxOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const tableColumns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
  ];

  const tableData = [
    { name: 'Project Alpha', status: 'Active', date: '2024-01-15' },
    { name: 'Project Beta', status: 'Pending', date: '2024-01-20' },
    { name: 'Project Gamma', status: 'Completed', date: '2024-01-25' },
  ];

  // Scroll to top when subpage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSubpage]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ink-neutral-5)' }}>
      {/* Sidebar */}
      <SidebarNav
        activeLayer={activeLayer}
        activeSubpage={activeSubpage}
        onLayerChange={setActiveLayer}
        onSubpageChange={setActiveSubpage}
      />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', maxWidth: '1400px' }}>
        <Stack gap="xlarge">
          {/* Header */}
          <Stack gap="small">
            <Heading level={1}>Ink Design System</Heading>
            <Text color="secondary">
              Comprehensive component showcase organized by architectural layers
            </Text>
          </Stack>

          {/* Content based on active subpage */}
          {/* LAYER 1: TOKENS */}
          {activeLayer === 'tokens' && activeSubpage === 'color-primitives' && (
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={2}>Color Primitives</Heading>
                <Text color="secondary">
                  The foundation color palette with semantic meanings
                </Text>
              </Stack>

              <Card>
                <Card.Body>
                  <Stack gap="large">
                    <Stack gap="medium">
                      <Heading level={3}>Cobalt (Brand)</Heading>
                      <Grid columns={5} gap="small">
                        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140].map(shade => (
                          <div key={shade} style={{ textAlign: 'center' }}>
                            <div style={{
                              background: `var(--ink-cobalt-${shade})`,
                              height: '64px',
                              borderRadius: '8px',
                              border: '1px solid var(--ink-neutral-20)',
                            }} />
                            <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                              {shade}
                            </Text>
                          </div>
                        ))}
                      </Grid>
                    </Stack>

                    <Stack gap="medium">
                      <Heading level={3}>Neutral (Grays)</Heading>
                      <Grid columns={5} gap="small">
                        {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(shade => (
                          <div key={shade} style={{ textAlign: 'center' }}>
                            <div style={{
                              background: `var(--ink-neutral-${shade})`,
                              height: '64px',
                              borderRadius: '8px',
                              border: '1px solid var(--ink-neutral-20)',
                            }} />
                            <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                              {shade}
                            </Text>
                          </div>
                        ))}
                      </Grid>
                    </Stack>

                    <Stack gap="medium">
                      <Heading level={3}>Green (Success)</Heading>
                      <Grid columns={5} gap="small">
                        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map(shade => (
                          <div key={shade} style={{ textAlign: 'center' }}>
                            <div style={{
                              background: `var(--ink-green-${shade})`,
                              height: '64px',
                              borderRadius: '8px',
                              border: '1px solid var(--ink-neutral-20)',
                            }} />
                            <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                              {shade}
                            </Text>
                          </div>
                        ))}
                      </Grid>
                    </Stack>

                    <Stack gap="medium">
                      <Heading level={3}>Red (Error)</Heading>
                      <Grid columns={5} gap="small">
                        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130].map(shade => (
                          <div key={shade} style={{ textAlign: 'center' }}>
                            <div style={{
                              background: `var(--ink-red-${shade})`,
                              height: '64px',
                              borderRadius: '8px',
                              border: '1px solid var(--ink-neutral-20)',
                            }} />
                            <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                              {shade}
                            </Text>
                          </div>
                        ))}
                      </Grid>
                    </Stack>

                    <Stack gap="medium">
                      <Heading level={3}>Orange (Warning)</Heading>
                      <Grid columns={5} gap="small">
                        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(shade => (
                          <div key={shade} style={{ textAlign: 'center' }}>
                            <div style={{
                              background: `var(--ink-orange-${shade})`,
                              height: '64px',
                              borderRadius: '8px',
                              border: '1px solid var(--ink-neutral-20)',
                            }} />
                            <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                              {shade}
                            </Text>
                          </div>
                        ))}
                      </Grid>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card>
            </Stack>
          )}

          {/* LAYER 3: PRIMITIVES - Button */}
          {activeLayer === 'primitives' && activeSubpage === 'button' && (
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={2}>Button</Heading>
                <Text color="secondary">
                  Primary action component with multiple variants and states
                </Text>
                <Alert kind="info" title="Layer 3: Primitive">
                  <Text size="sm">
                    Uses only tokens (Layer 1) and utilities (Layer 2). No dependencies on other components.
                  </Text>
                </Alert>
              </Stack>

              <Card>
                <Card.Body>
                  <Stack gap="xlarge">
                    <Stack gap="medium">
                      <Heading level={3}>All Variants</Heading>
                      <Grid columns={5} gap="medium">
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">Brand</Text>
                          <Button variant="brand">Brand Button</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">Primary</Text>
                          <Button variant="primary">Primary Button</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">Secondary</Text>
                          <Button variant="secondary">Secondary Button</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">Tertiary</Text>
                          <Button variant="tertiary">Tertiary Button</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">Danger</Text>
                          <Button variant="danger">Danger Button</Button>
                        </Stack>
                      </Grid>
                    </Stack>

                    <Divider />

                    <Stack gap="medium">
                      <Heading level={3}>Sizes</Heading>
                      <Stack gap="small" align="center" direction="horizontal">
                        <Button variant="brand" size="small">Small</Button>
                        <Button variant="brand" size="medium">Medium (Default)</Button>
                        <Button variant="brand" size="large">Large</Button>
                      </Stack>
                    </Stack>

                    <Divider />

                    <Stack gap="medium">
                      <Heading level={3}>With Icons</Heading>
                      <Grid columns={3} gap="medium">
                        <Button variant="brand" startIcon="plus">Start Icon</Button>
                        <Button variant="primary" endIcon="arrow-right">End Icon</Button>
                        <Button variant="secondary" startIcon="download" endIcon="external">Both Icons</Button>
                      </Grid>
                    </Stack>

                    <Divider />

                    <Stack gap="medium">
                      <Heading level={3}>States</Heading>
                      <Grid columns={3} gap="medium">
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">Loading</Text>
                          <Button variant="brand" loading>Loading...</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">Disabled</Text>
                          <Button variant="brand" disabled>Disabled</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">Full Width</Text>
                          <Button variant="brand" fullWidth>Full Width</Button>
                        </Stack>
                      </Grid>
                    </Stack>

                    <Divider />

                    <Stack gap="medium">
                      <Heading level={3}>Rounded (Pill)</Heading>
                      <Inline gap="medium">
                        <Button variant="brand" rounded>Rounded Brand</Button>
                        <Button variant="primary" rounded>Rounded Primary</Button>
                        <Button variant="secondary" rounded>Rounded Secondary</Button>
                      </Inline>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card>
            </Stack>
          )}

          {/* Add more component showcases as needed... */}
          {/* This is a framework - you can add the rest similarly */}

          {/* Placeholder for other subpages */}
          {!((activeLayer === 'tokens' && activeSubpage === 'color-primitives') ||
             (activeLayer === 'primitives' && activeSubpage === 'button')) && (
            <Card>
              <Card.Body>
                <Stack gap="medium" align="center" style={{ padding: '60px 20px' }}>
                  <Icon name="construction" size="xlarge" />
                  <Heading level={3}>{activeSubpage}</Heading>
                  <Text color="secondary" style={{ textAlign: 'center' }}>
                    This section is being built with comprehensive examples.
                    <br />
                    Check back soon for detailed component variations and usage examples.
                  </Text>
                  <Text size="sm" color="secondary" style={{ textAlign: 'center' }}>
                    Layer: {activeLayer} | Component: {activeSubpage}
                  </Text>
                </Stack>
              </Card.Body>
            </Card>
          )}
        </Stack>
      </div>
    </div>
  );
}
