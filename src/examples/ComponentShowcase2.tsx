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
import type { TableColumn, FileInputFile, ComboBoxOption, Step } from '@/design-system';
import { iconPaths } from '@/design-system/3-primitives/Icon/iconPaths';
import { GlobalNav, LocalNav, VerticalNavigation } from '@/design-system/5-patterns';
import type { NavigationItem } from '@/design-system/5-patterns';
import { DashboardLayout, AuthLayout } from '@/design-system/6-layouts';

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
    { id: 'composites', label: 'Layer 4: Composites', count: 16 },
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
        background: 'var(--ink-white-100)',
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
                      background:
                        activeSubpage === subpage.id ? 'var(--ink-cobalt-10)' : 'transparent',
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
                    <Text size="sm" color={activeSubpage === subpage.id ? 'brand' : 'primary'}>
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
  const [verticalNavActiveItem, setVerticalNavActiveItem] = useState('dashboard');
  const [verticalNavActiveSubItem, setVerticalNavActiveSubItem] = useState('overview');
  const [verticalNavCollapsed, setVerticalNavCollapsed] = useState(false);
  const [localNavToggle, setLocalNavToggle] = useState(false);

  // Layer 4 Composite states
  const [accordionOpenItems, setAccordionOpenItems] = useState<string[]>(['1']);
  const [paginationPage, setPaginationPage] = useState(1);
  const [tableSelectedRows, setTableSelectedRows] = useState<Set<string | number>>(new Set());
  const [tableSortColumn, setTableSortColumn] = useState<string | undefined>();
  const [tableSortDirection, setTableSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(null);
  const [fileUploadFiles, setFileUploadFiles] = useState<any[]>([]);
  const [alertVisible, setAlertVisible] = useState(true);
  const [breadcrumbItems] = useState([
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ]);

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

  const renderContent = () => {
    // LAYER 1: TOKENS
    if (activeLayer === 'tokens' && activeSubpage === 'color-primitives') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Color Primitives</Heading>
            <Text color="secondary">The foundation color palette with semantic meanings</Text>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Cobalt (Brand)</Heading>
                  <Grid columns={5} gap="small">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140].map((shade) => (
                      <div key={shade} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            background: `var(--ink-cobalt-${shade})`,
                            height: '64px',
                            borderRadius: '8px',
                            border: '1px solid var(--ink-neutral-20)',
                          }}
                        />
                        <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                          {shade}
                        </Text>
                      </div>
                    ))}
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Neutral (Grays)</Heading>
                  <Grid columns={5} gap="small">
                    {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((shade) => (
                      <div key={shade} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            background: `var(--ink-neutral-${shade})`,
                            height: '64px',
                            borderRadius: '8px',
                            border: '1px solid var(--ink-neutral-20)',
                          }}
                        />
                        <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                          {shade}
                        </Text>
                      </div>
                    ))}
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Green (Success)</Heading>
                  <Grid columns={5} gap="small">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((shade) => (
                      <div key={shade} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            background: `var(--ink-green-${shade})`,
                            height: '64px',
                            borderRadius: '8px',
                            border: '1px solid var(--ink-neutral-20)',
                          }}
                        />
                        <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                          {shade}
                        </Text>
                      </div>
                    ))}
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Red (Error)</Heading>
                  <Grid columns={5} gap="small">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130].map((shade) => (
                      <div key={shade} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            background: `var(--ink-red-${shade})`,
                            height: '64px',
                            borderRadius: '8px',
                            border: '1px solid var(--ink-neutral-20)',
                          }}
                        />
                        <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                          {shade}
                        </Text>
                      </div>
                    ))}
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Orange (Warning)</Heading>
                  <Grid columns={5} gap="small">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((shade) => (
                      <div key={shade} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            background: `var(--ink-orange-${shade})`,
                            height: '64px',
                            borderRadius: '8px',
                            border: '1px solid var(--ink-neutral-20)',
                          }}
                        />
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
      );
    }

    if (activeLayer === 'tokens' && activeSubpage === 'typography') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Typography Tokens</Heading>
            <Text color="secondary">Font families, sizes, weights, and line heights</Text>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Font Family</Heading>
                  <div style={{ fontFamily: 'var(--ink-font-family)' }}>
                    <Text>DS Indigo (System Font Stack)</Text>
                    <Text size="sm" color="secondary">
                      --ink-font-family
                    </Text>
                  </div>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Font Sizes</Heading>
                  <Stack gap="small">
                    <div style={{ fontSize: 'var(--ink-font-size-xs)' }}>
                      <Text>Extra Small (12px)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-size-xs
                      </Text>
                    </div>
                    <div style={{ fontSize: 'var(--ink-font-size-sm)' }}>
                      <Text>Small (14px)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-size-sm
                      </Text>
                    </div>
                    <div style={{ fontSize: 'var(--ink-font-size-md)' }}>
                      <Text>Medium (16px)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-size-md
                      </Text>
                    </div>
                    <div style={{ fontSize: 'var(--ink-font-size-lg)' }}>
                      <Text>Large (18px)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-size-lg
                      </Text>
                    </div>
                    <div style={{ fontSize: 'var(--ink-font-size-xl)' }}>
                      <Text>Extra Large (20px)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-size-xl
                      </Text>
                    </div>
                    <div style={{ fontSize: 'var(--ink-font-size-2xl)' }}>
                      <Text>2X Large (24px)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-size-2xl
                      </Text>
                    </div>
                    <div style={{ fontSize: 'var(--ink-font-size-3xl)' }}>
                      <Text>3X Large (30px)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-size-3xl
                      </Text>
                    </div>
                    <div style={{ fontSize: 'var(--ink-font-size-4xl)' }}>
                      <Text>4X Large (36px)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-size-4xl
                      </Text>
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Font Weights</Heading>
                  <Stack gap="small">
                    <div style={{ fontWeight: 'var(--ink-font-weight-light)' }}>
                      <Text>Light (300)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-weight-light
                      </Text>
                    </div>
                    <div style={{ fontWeight: 'var(--ink-font-weight-regular)' }}>
                      <Text>Regular (400)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-weight-regular
                      </Text>
                    </div>
                    <div style={{ fontWeight: 'var(--ink-font-weight-medium)' }}>
                      <Text>Medium (500)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-weight-medium
                      </Text>
                    </div>
                    <div style={{ fontWeight: 'var(--ink-font-weight-semibold)' }}>
                      <Text>Semibold (600)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-weight-semibold
                      </Text>
                    </div>
                    <div style={{ fontWeight: 'var(--ink-font-weight-bold)' }}>
                      <Text>Bold (700)</Text>
                      <Text size="xs" color="secondary">
                        --ink-font-weight-bold
                      </Text>
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Line Heights</Heading>
                  <Stack gap="small">
                    <div style={{ lineHeight: 'var(--ink-line-height-tight)' }}>
                      <Text>Tight (1.25)</Text>
                      <Text size="xs" color="secondary">
                        --ink-line-height-tight
                      </Text>
                    </div>
                    <div style={{ lineHeight: 'var(--ink-line-height-normal)' }}>
                      <Text>Normal (1.5)</Text>
                      <Text size="xs" color="secondary">
                        --ink-line-height-normal
                      </Text>
                    </div>
                    <div style={{ lineHeight: 'var(--ink-line-height-relaxed)' }}>
                      <Text>Relaxed (1.75)</Text>
                      <Text size="xs" color="secondary">
                        --ink-line-height-relaxed
                      </Text>
                    </div>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    if (activeLayer === 'tokens' && activeSubpage === 'spacing') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Spacing Tokens</Heading>
            <Text color="secondary">Consistent spacing scale for padding, margin, and gaps</Text>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="medium">
                <Heading level={3}>Spacing Scale</Heading>
                <Stack gap="small">
                  {[
                    { token: '--ink-spacing-0', value: '0px' },
                    { token: '--ink-spacing-50', value: '4px' },
                    { token: '--ink-spacing-100', value: '8px' },
                    { token: '--ink-spacing-150', value: '12px' },
                    { token: '--ink-spacing-200', value: '16px' },
                    { token: '--ink-spacing-250', value: '20px' },
                    { token: '--ink-spacing-300', value: '24px' },
                    { token: '--ink-spacing-400', value: '32px' },
                    { token: '--ink-spacing-500', value: '40px' },
                    { token: '--ink-spacing-600', value: '48px' },
                    { token: '--ink-spacing-700', value: '64px' },
                  ].map(({ token, value }) => (
                    <div key={token} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div
                        style={{
                          width: value,
                          height: '32px',
                          background: 'var(--ink-cobalt-60)',
                          borderRadius: '4px',
                        }}
                      />
                      <Stack gap="xxsmall">
                        <Text size="sm" weight="semibold">
                          {value}
                        </Text>
                        <Text size="xs" color="secondary">
                          {token}
                        </Text>
                      </Stack>
                    </div>
                  ))}
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    if (activeLayer === 'tokens' && activeSubpage === 'border-radius') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Border & Radius Tokens</Heading>
            <Text color="secondary">Border radius values for consistent rounded corners</Text>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="medium">
                <Heading level={3}>Border Radius Scale</Heading>
                <Grid columns={3} gap="medium">
                  {[
                    { token: '--ink-radius-size-xs', value: '4px' },
                    { token: '--ink-radius-size-s', value: '8px' },
                    { token: '--ink-radius-size-m', value: '12px' },
                    { token: '--ink-radius-size-l', value: '16px' },
                    { token: '--ink-radius-size-full', value: '9999px' },
                  ].map(({ token, value }) => (
                    <div key={token} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '100px',
                          height: '100px',
                          background: 'var(--ink-cobalt-60)',
                          borderRadius: value,
                          margin: '0 auto 8px',
                        }}
                      />
                      <Stack gap="xxsmall">
                        <Text size="sm" weight="semibold">
                          {value}
                        </Text>
                        <Text size="xs" color="secondary">
                          {token}
                        </Text>
                      </Stack>
                    </div>
                  ))}
                </Grid>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    if (activeLayer === 'tokens' && activeSubpage === 'shadows') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Shadow Tokens</Heading>
            <Text color="secondary">Elevation shadows for depth and hierarchy</Text>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="medium">
                <Heading level={3}>Shadow Scale</Heading>
                <Grid columns={2} gap="medium">
                  {[
                    { token: '--ink-shadow-xs', label: 'Extra Small' },
                    { token: '--ink-shadow-sm', label: 'Small' },
                    { token: '--ink-shadow-md', label: 'Medium' },
                    { token: '--ink-shadow-lg', label: 'Large' },
                    { token: '--ink-shadow-xl', label: 'Extra Large' },
                    { token: '--ink-elevation-low', label: 'Elevation Low' },
                    { token: '--ink-elevation-medium', label: 'Elevation Medium' },
                    { token: '--ink-elevation-high', label: 'Elevation High' },
                  ].map(({ token, label }) => (
                    <div key={token}>
                      <div
                        style={{
                          width: '100%',
                          height: '80px',
                          background: 'var(--ink-white-100)',
                          boxShadow: `var(${token})`,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '8px',
                        }}
                      >
                        <Text weight="semibold">{label}</Text>
                      </div>
                      <Text size="xs" color="secondary" style={{ textAlign: 'center' }}>
                        {token}
                      </Text>
                    </div>
                  ))}
                </Grid>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 2: UTILITIES
    if (activeLayer === 'utilities' && activeSubpage === 'stack') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Stack</Heading>
            <Text color="secondary">
              Flexbox layout utility for vertical and horizontal stacking
            </Text>
            <Alert kind="info" title="Layer 2: Utility">
              <Text size="sm">
                Pure layout component. No visual styling. Uses only CSS Flexbox.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Direction: Vertical (Default)</Heading>
                  <Stack gap="small">
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-cobalt-10)',
                        borderRadius: '4px',
                      }}
                    >
                      Item 1
                    </div>
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-cobalt-20)',
                        borderRadius: '4px',
                      }}
                    >
                      Item 2
                    </div>
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-cobalt-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item 3
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Direction: Horizontal</Heading>
                  <Stack direction="horizontal" gap="small">
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-cobalt-10)',
                        borderRadius: '4px',
                      }}
                    >
                      Item 1
                    </div>
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-cobalt-20)',
                        borderRadius: '4px',
                      }}
                    >
                      Item 2
                    </div>
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-cobalt-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item 3
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Gap Sizes</Heading>
                  <Stack gap="small">
                    <Text size="sm" weight="semibold">
                      XXSmall Gap
                    </Text>
                    <Stack gap="xxsmall">
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                    </Stack>

                    <Text size="sm" weight="semibold">
                      XSmall Gap
                    </Text>
                    <Stack gap="xsmall">
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                    </Stack>

                    <Text size="sm" weight="semibold">
                      Small Gap
                    </Text>
                    <Stack gap="small">
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                    </Stack>

                    <Text size="sm" weight="semibold">
                      Medium Gap
                    </Text>
                    <Stack gap="medium">
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                    </Stack>

                    <Text size="sm" weight="semibold">
                      Large Gap
                    </Text>
                    <Stack gap="large">
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                    </Stack>

                    <Text size="sm" weight="semibold">
                      XLarge Gap
                    </Text>
                    <Stack gap="xlarge">
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                      <div
                        style={{
                          padding: '8px',
                          background: 'var(--ink-green-30)',
                          borderRadius: '4px',
                        }}
                      >
                        Item
                      </div>
                    </Stack>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Alignment Options</Heading>
                  <Grid columns={2} gap="medium">
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Align: Start (Default)
                      </Text>
                      <div
                        style={{
                          background: 'var(--ink-neutral-10)',
                          padding: '12px',
                          borderRadius: '4px',
                        }}
                      >
                        <Stack align="start" gap="small">
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '80px',
                            }}
                          >
                            Short
                          </div>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '120px',
                            }}
                          >
                            Medium
                          </div>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '160px',
                            }}
                          >
                            Longer Item
                          </div>
                        </Stack>
                      </div>
                    </Stack>

                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Align: Center
                      </Text>
                      <div
                        style={{
                          background: 'var(--ink-neutral-10)',
                          padding: '12px',
                          borderRadius: '4px',
                        }}
                      >
                        <Stack align="center" gap="small">
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '80px',
                            }}
                          >
                            Short
                          </div>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '120px',
                            }}
                          >
                            Medium
                          </div>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '160px',
                            }}
                          >
                            Longer Item
                          </div>
                        </Stack>
                      </div>
                    </Stack>

                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Align: End
                      </Text>
                      <div
                        style={{
                          background: 'var(--ink-neutral-10)',
                          padding: '12px',
                          borderRadius: '4px',
                        }}
                      >
                        <Stack align="end" gap="small">
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '80px',
                            }}
                          >
                            Short
                          </div>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '120px',
                            }}
                          >
                            Medium
                          </div>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                              width: '160px',
                            }}
                          >
                            Longer Item
                          </div>
                        </Stack>
                      </div>
                    </Stack>

                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Align: Stretch
                      </Text>
                      <div
                        style={{
                          background: 'var(--ink-neutral-10)',
                          padding: '12px',
                          borderRadius: '4px',
                        }}
                      >
                        <Stack align="stretch" gap="small">
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                            }}
                          >
                            Short
                          </div>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                            }}
                          >
                            Medium
                          </div>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-orange-40)',
                              borderRadius: '4px',
                            }}
                          >
                            Longer Item
                          </div>
                        </Stack>
                      </div>
                    </Stack>
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    if (activeLayer === 'utilities' && activeSubpage === 'grid') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Grid</Heading>
            <Text color="secondary">
              CSS Grid layout utility for multi-column responsive layouts
            </Text>
            <Alert kind="info" title="Layer 2: Utility">
              <Text size="sm">Pure layout component. Uses CSS Grid for responsive columns.</Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Column Configurations</Heading>
                  <Stack gap="large">
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        2 Columns
                      </Text>
                      <Grid columns={2} gap="small">
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-cobalt-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 1
                        </div>
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-cobalt-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 2
                        </div>
                      </Grid>
                    </div>

                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        3 Columns
                      </Text>
                      <Grid columns={3} gap="small">
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-green-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 1
                        </div>
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-green-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 2
                        </div>
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-green-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 3
                        </div>
                      </Grid>
                    </div>

                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        4 Columns
                      </Text>
                      <Grid columns={4} gap="small">
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-orange-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 1
                        </div>
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-orange-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 2
                        </div>
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-orange-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 3
                        </div>
                        <div
                          style={{
                            padding: '16px',
                            background: 'var(--ink-orange-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Col 4
                        </div>
                      </Grid>
                    </div>

                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        6 Columns
                      </Text>
                      <Grid columns={6} gap="small">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            style={{
                              padding: '16px',
                              background: 'var(--ink-purple-20)',
                              borderRadius: '4px',
                              textAlign: 'center',
                            }}
                          >
                            {i}
                          </div>
                        ))}
                      </Grid>
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Gap Sizes</Heading>
                  <Stack gap="large">
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Small Gap
                      </Text>
                      <Grid columns={3} gap="small">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            style={{
                              padding: '12px',
                              background: 'var(--ink-cobalt-30)',
                              borderRadius: '4px',
                              textAlign: 'center',
                            }}
                          >
                            Item {i}
                          </div>
                        ))}
                      </Grid>
                    </div>

                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Medium Gap
                      </Text>
                      <Grid columns={3} gap="medium">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            style={{
                              padding: '12px',
                              background: 'var(--ink-cobalt-30)',
                              borderRadius: '4px',
                              textAlign: 'center',
                            }}
                          >
                            Item {i}
                          </div>
                        ))}
                      </Grid>
                    </div>

                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Large Gap
                      </Text>
                      <Grid columns={3} gap="large">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            style={{
                              padding: '12px',
                              background: 'var(--ink-cobalt-30)',
                              borderRadius: '4px',
                              textAlign: 'center',
                            }}
                          >
                            Item {i}
                          </div>
                        ))}
                      </Grid>
                    </div>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    if (activeLayer === 'utilities' && activeSubpage === 'inline') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Inline</Heading>
            <Text color="secondary">
              Horizontal layout utility that wraps items to multiple lines
            </Text>
            <Alert kind="info" title="Layer 2: Utility">
              <Text size="sm">
                Similar to Stack horizontal, but allows wrapping for inline content like tags or
                chips.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Default Inline Layout</Heading>
                  <Inline gap="small">
                    {[
                      'React',
                      'TypeScript',
                      'Node.js',
                      'Express',
                      'PostgreSQL',
                      'Docker',
                      'Kubernetes',
                      'AWS',
                    ].map((tech) => (
                      <Chip key={tech} label={tech} />
                    ))}
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Gap Sizes</Heading>
                  <Stack gap="large">
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        XSmall Gap
                      </Text>
                      <Inline gap="xsmall">
                        {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </Inline>
                    </div>

                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Small Gap
                      </Text>
                      <Inline gap="small">
                        {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </Inline>
                    </div>

                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Medium Gap
                      </Text>
                      <Inline gap="medium">
                        {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </Inline>
                    </div>

                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Large Gap
                      </Text>
                      <Inline gap="large">
                        {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </Inline>
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Wrapping Behavior</Heading>
                  <Text size="sm" color="secondary">
                    Resize window to see items wrap to new lines
                  </Text>
                  <Inline gap="small">
                    {[
                      'JavaScript',
                      'Python',
                      'Java',
                      'C++',
                      'Ruby',
                      'Go',
                      'Rust',
                      'Swift',
                      'Kotlin',
                      'PHP',
                      'C#',
                      'TypeScript',
                      'Scala',
                      'Elixir',
                      'Haskell',
                    ].map((lang) => (
                      <Chip key={lang} label={lang} />
                    ))}
                  </Inline>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    if (activeLayer === 'utilities' && activeSubpage === 'container') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Container</Heading>
            <Text color="secondary">Max-width wrapper for centered content layouts</Text>
            <Alert kind="info" title="Layer 2: Utility">
              <Text size="sm">
                Centers content with a maximum width. Responsive and adds horizontal padding.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Size: Small (640px)</Heading>
                  <div style={{ background: 'var(--ink-neutral-10)', padding: '16px' }}>
                    <Container size="small">
                      <div
                        style={{
                          background: 'var(--ink-cobalt-20)',
                          padding: '16px',
                          borderRadius: '4px',
                        }}
                      >
                        <Text>Content in small container</Text>
                      </div>
                    </Container>
                  </div>
                </Stack>

                <Stack gap="medium">
                  <Heading level={3}>Size: Medium (768px)</Heading>
                  <div style={{ background: 'var(--ink-neutral-10)', padding: '16px' }}>
                    <Container size="medium">
                      <div
                        style={{
                          background: 'var(--ink-green-20)',
                          padding: '16px',
                          borderRadius: '4px',
                        }}
                      >
                        <Text>Content in medium container</Text>
                      </div>
                    </Container>
                  </div>
                </Stack>

                <Stack gap="medium">
                  <Heading level={3}>Size: Large (1024px)</Heading>
                  <div style={{ background: 'var(--ink-neutral-10)', padding: '16px' }}>
                    <Container size="large">
                      <div
                        style={{
                          background: 'var(--ink-orange-20)',
                          padding: '16px',
                          borderRadius: '4px',
                        }}
                      >
                        <Text>Content in large container</Text>
                      </div>
                    </Container>
                  </div>
                </Stack>

                <Stack gap="medium">
                  <Heading level={3}>Size: XLarge (1280px)</Heading>
                  <div style={{ background: 'var(--ink-neutral-10)', padding: '16px' }}>
                    <Container size="xlarge">
                      <div
                        style={{
                          background: 'var(--ink-purple-20)',
                          padding: '16px',
                          borderRadius: '4px',
                        }}
                      >
                        <Text>Content in xlarge container</Text>
                      </div>
                    </Container>
                  </div>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    if (activeLayer === 'utilities' && activeSubpage === 'spacer') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Spacer</Heading>
            <Text color="secondary">
              Flexible or fixed spacing utility for precise layout control
            </Text>
            <Alert kind="info" title="Layer 2: Utility">
              <Text size="sm">
                Creates vertical or horizontal space. Can be fixed size or flexible to fill
                available space.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Fixed Sizes</Heading>
                  <Stack gap="large">
                    {['small', 'medium', 'large', 'xlarge'].map((size) => (
                      <div key={size}>
                        <Text
                          size="sm"
                          weight="semibold"
                          style={{ marginBottom: '8px', display: 'block' }}
                        >
                          Size: {size}
                        </Text>
                        <div style={{ background: 'var(--ink-neutral-10)', borderRadius: '4px' }}>
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-cobalt-30)',
                              borderRadius: '4px 4px 0 0',
                            }}
                          >
                            Before
                          </div>
                          <Spacer size={size as any} />
                          <div
                            style={{
                              padding: '8px',
                              background: 'var(--ink-cobalt-30)',
                              borderRadius: '0 0 4px 4px',
                            }}
                          >
                            After
                          </div>
                        </div>
                      </div>
                    ))}
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Flexible Spacer</Heading>
                  <Text size="sm" color="secondary">
                    Pushes content apart in a flex container
                  </Text>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'var(--ink-neutral-10)',
                      padding: '16px',
                      borderRadius: '4px',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Left
                    </div>
                    <Spacer />
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Right
                    </div>
                  </div>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Horizontal Spacer</Heading>
                  <div
                    style={{
                      display: 'flex',
                      background: 'var(--ink-neutral-10)',
                      padding: '16px',
                      borderRadius: '4px',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-orange-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item 1
                    </div>
                    <Spacer size="large" direction="horizontal" />
                    <div
                      style={{
                        padding: '12px',
                        background: 'var(--ink-orange-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item 2
                    </div>
                  </div>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Button (Enhanced)
    if (activeLayer === 'primitives' && activeSubpage === 'button') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Button</Heading>
            <Text color="secondary">
              Primary action component with multiple variants and states
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Uses only tokens (Layer 1) and utilities (Layer 2). No dependencies on other
                components.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>All Variants (kind)</Heading>
                  <Grid columns={5} gap="medium">
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Brand
                      </Text>
                      <Button kind="brand">Brand</Button>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Primary
                      </Text>
                      <Button kind="primary">Primary</Button>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Secondary
                      </Text>
                      <Button kind="secondary">Secondary</Button>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Tertiary
                      </Text>
                      <Button kind="tertiary">Tertiary</Button>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Danger
                      </Text>
                      <Button kind="danger">Danger</Button>
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>All Sizes</Heading>
                  <Stack direction="horizontal" gap="medium" align="center">
                    <Button kind="brand" size="small">
                      Small
                    </Button>
                    <Button kind="brand" size="medium">
                      Medium
                    </Button>
                    <Button kind="brand" size="large">
                      Large
                    </Button>
                    <Button kind="brand" size="xlarge">
                      XLarge
                    </Button>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Icons (startElement / endElement)</Heading>
                  <Grid columns={3} gap="medium">
                    <Button kind="brand" startElement={<Icon name="plus" size="sm" />}>
                      Start Icon
                    </Button>
                    <Button kind="primary" endElement={<Icon name="arrow-right" size="sm" />}>
                      End Icon
                    </Button>
                    <Button
                      kind="secondary"
                      startElement={<Icon name="download" size="sm" />}
                      endElement={<Icon name="external-link" size="sm" />}
                    >
                      Both Icons
                    </Button>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Grid columns={3} gap="medium">
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Loading
                      </Text>
                      <Button kind="brand" loading>
                        Loading...
                      </Button>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Disabled
                      </Text>
                      <Button kind="brand" disabled>
                        Disabled
                      </Button>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Active
                      </Text>
                      <Button kind="brand" active>
                        Active State
                      </Button>
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Full Width</Heading>
                  <Button kind="brand" fullWidth>
                    Full Width Button
                  </Button>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Rounded (Pill)</Heading>
                  <Inline gap="medium">
                    <Button kind="brand" rounded>
                      Rounded Brand
                    </Button>
                    <Button kind="primary" rounded>
                      Rounded Primary
                    </Button>
                    <Button kind="secondary" rounded>
                      Rounded Secondary
                    </Button>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Menu Trigger</Heading>
                  <Inline gap="medium">
                    <Button kind="brand" menuTrigger>
                      Options
                    </Button>
                    <Button kind="secondary" menuTrigger>
                      More Actions
                    </Button>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>As Link (href)</Heading>
                  <Inline gap="medium">
                    <Button kind="brand" href="https://www.docusign.com" target="_blank">
                      Visit DocuSign
                    </Button>
                    <Button
                      kind="secondary"
                      href="#"
                      endElement={<Icon name="external-link" size="sm" />}
                    >
                      External Link
                    </Button>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Inverted (for dark backgrounds)</Heading>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      padding: '32px',
                      borderRadius: '8px',
                    }}
                  >
                    <Inline gap="medium">
                      <Button inverted kind="primary">
                        Primary Inverted
                      </Button>
                      <Button inverted kind="secondary">
                        Secondary Inverted
                      </Button>
                      <Button inverted kind="tertiary">
                        Tertiary Inverted
                      </Button>
                    </Inline>
                  </div>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - IconButton
    if (activeLayer === 'primitives' && activeSubpage === 'iconbutton') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>IconButton</Heading>
            <Text color="secondary">
              Button component with icon-only content for compact actions
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Uses only tokens and utilities. Wraps Icon component in a button interface.
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
                      <Text size="sm" weight="semibold">
                        Brand
                      </Text>
                      <IconButton icon="heart" variant="brand" aria-label="Favorite" />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Primary
                      </Text>
                      <IconButton icon="settings" variant="primary" aria-label="Settings" />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Secondary
                      </Text>
                      <IconButton icon="search" variant="secondary" aria-label="Search" />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Tertiary
                      </Text>
                      <IconButton
                        icon="more-horizontal"
                        variant="tertiary"
                        aria-label="More options"
                      />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Danger
                      </Text>
                      <IconButton icon="trash" variant="danger" aria-label="Delete" />
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Inline gap="medium" align="center">
                    <IconButton icon="plus" variant="brand" size="small" aria-label="Add (small)" />
                    <IconButton
                      icon="plus"
                      variant="brand"
                      size="medium"
                      aria-label="Add (medium)"
                    />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Common Icons</Heading>
                  <Inline gap="small">
                    <IconButton icon="edit" variant="secondary" aria-label="Edit" />
                    <IconButton icon="copy" variant="secondary" aria-label="Copy" />
                    <IconButton icon="download" variant="secondary" aria-label="Download" />
                    <IconButton icon="share" variant="secondary" aria-label="Share" />
                    <IconButton icon="close" variant="secondary" aria-label="Close" />
                    <IconButton icon="refresh" variant="secondary" aria-label="Refresh" />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <Inline gap="medium">
                    <IconButton
                      icon="heart"
                      variant="brand"
                      disabled
                      aria-label="Disabled favorite"
                    />
                    <IconButton
                      icon="settings"
                      variant="primary"
                      disabled
                      aria-label="Disabled settings"
                    />
                  </Inline>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Link
    if (activeLayer === 'primitives' && activeSubpage === 'link') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Link</Heading>
            <Text color="secondary">Hyperlink component with various styles and states</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Uses only tokens. Provides accessible link styling with hover and focus states.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Kinds</Heading>
                  <Stack gap="small">
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Default
                      </Text>
                      <Link kind="default" href="#">
                        This is a default link
                      </Link>
                    </div>
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Subtle
                      </Text>
                      <Link kind="subtle" href="#">
                        This is a subtle link
                      </Link>
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Stack gap="small">
                    <Link size="small" href="#">
                      Small link
                    </Link>
                    <Link size="medium" href="#">
                      Medium link (default)
                    </Link>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Discrete Mode</Heading>
                  <Text size="sm" color="secondary">
                    Only shows underline on hover
                  </Text>
                  <Link discrete href="#">
                    Hover to see underline
                  </Link>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>External Links</Heading>
                  <Stack gap="small">
                    <Link external href="https://www.docusign.com">
                      External link with icon
                    </Link>
                    <Link external kind="subtle" href="https://www.docusign.com">
                      Subtle external link
                    </Link>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <Link disabled href="#">
                    Disabled link
                  </Link>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>In Context</Heading>
                  <Text>
                    This is a paragraph with a <Link href="#">regular link</Link> and also a{' '}
                    <Link kind="subtle" href="#">
                      subtle link
                    </Link>{' '}
                    embedded in the text.
                  </Text>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Input
    if (activeLayer === 'primitives' && activeSubpage === 'input') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Input</Heading>
            <Text color="secondary">
              Text input field with label, description, and error states
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Accessible form input with built-in validation states and helper text.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Grid columns={2} gap="medium">
                    <Input
                      label="Small Input"
                      size="small"
                      placeholder="Enter text..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Input
                      label="Medium Input (Default)"
                      size="medium"
                      placeholder="Enter text..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Description</Heading>
                  <Input
                    label="Email Address"
                    description="We'll never share your email with anyone else."
                    placeholder="you@example.com"
                    type="email"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Required Field</Heading>
                  <Input label="Required Field" required placeholder="This field is required" />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Error State</Heading>
                  <Input
                    label="Username"
                    error="This username is already taken"
                    placeholder="Enter username"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <Input
                    label="Disabled Input"
                    disabled
                    placeholder="Cannot edit this"
                    value="Disabled value"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Hidden Label</Heading>
                  <Input label="Search" hideLabel placeholder="Search..." />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Input Types</Heading>
                  <Grid columns={2} gap="medium">
                    <Input label="Text" type="text" placeholder="Text input" />
                    <Input label="Email" type="email" placeholder="email@example.com" />
                    <Input label="Password" type="password" placeholder="Enter password" />
                    <Input label="Number" type="number" placeholder="123" />
                    <Input label="Date" type="date" />
                    <Input label="Time" type="time" />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Custom Width</Heading>
                  <Input label="Custom Width Input" width="300px" placeholder="300px wide" />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Checkbox
    if (activeLayer === 'primitives' && activeSubpage === 'checkbox') {
      const [checkboxStates, setCheckboxStates] = React.useState({
        basic: false,
        withDesc: false,
        indeterminate: true,
        checked: true,
      });

      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Checkbox</Heading>
            <Text color="secondary">Checkbox input for selecting one or multiple options</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Accessible checkbox with custom styling and indeterminate state support.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Basic Checkbox</Heading>
                  <Checkbox
                    label="I agree to the terms and conditions"
                    checked={checkboxStates.basic}
                    onChange={(e) =>
                      setCheckboxStates({ ...checkboxStates, basic: e.target.checked })
                    }
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Description</Heading>
                  <Checkbox
                    label="Send me email notifications"
                    description="Receive updates about your account activity"
                    checked={checkboxStates.withDesc}
                    onChange={(e) =>
                      setCheckboxStates({ ...checkboxStates, withDesc: e.target.checked })
                    }
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Stack gap="small">
                    <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
                    <Checkbox
                      label="Checked"
                      checked={checkboxStates.checked}
                      onChange={(e) =>
                        setCheckboxStates({ ...checkboxStates, checked: e.target.checked })
                      }
                    />
                    <Checkbox
                      label="Indeterminate"
                      indeterminate
                      checked={checkboxStates.indeterminate}
                      onChange={(e) =>
                        setCheckboxStates({ ...checkboxStates, indeterminate: e.target.checked })
                      }
                    />
                    <Checkbox
                      label="Disabled Unchecked"
                      disabled
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      label="Disabled Checked"
                      disabled
                      checked={true}
                      onChange={() => {}}
                    />
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Error State</Heading>
                  <Checkbox
                    label="You must agree to continue"
                    error="This field is required"
                    checked={false}
                    onChange={() => {}}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Checkbox Group</Heading>
                  <Text size="sm" weight="semibold">
                    Select your interests:
                  </Text>
                  <Stack gap="small">
                    <Checkbox label="Technology" />
                    <Checkbox label="Design" />
                    <Checkbox label="Business" />
                    <Checkbox label="Marketing" />
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Radio
    if (activeLayer === 'primitives' && activeSubpage === 'radio') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Radio</Heading>
            <Text color="secondary">Radio button for selecting one option from a group</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Accessible radio input with custom styling. Use the same name prop to group radios.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Radio Group</Heading>
                  <Stack gap="small">
                    <Radio
                      label="Option 1"
                      name="radio-group"
                      value="option1"
                      checked={radioValue === 'option1'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <Radio
                      label="Option 2"
                      name="radio-group"
                      value="option2"
                      checked={radioValue === 'option2'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <Radio
                      label="Option 3"
                      name="radio-group"
                      value="option3"
                      checked={radioValue === 'option3'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Description</Heading>
                  <Stack gap="small">
                    <Radio
                      label="Standard Shipping"
                      description="Arrives in 5-7 business days"
                      name="shipping"
                      value="standard"
                    />
                    <Radio
                      label="Express Shipping"
                      description="Arrives in 2-3 business days"
                      name="shipping"
                      value="express"
                    />
                    <Radio
                      label="Overnight Shipping"
                      description="Arrives next business day"
                      name="shipping"
                      value="overnight"
                    />
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <Stack gap="small">
                    <Radio label="Available Option" name="disabled-group" value="available" />
                    <Radio
                      label="Disabled Option"
                      name="disabled-group"
                      value="disabled"
                      disabled
                    />
                    <Radio
                      label="Disabled & Selected"
                      name="disabled-group"
                      value="selected"
                      disabled
                      checked
                      onChange={() => {}}
                    />
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Error State</Heading>
                  <Radio
                    label="Invalid option"
                    error="This option is not available"
                    name="error-group"
                    value="error"
                  />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Switch
    if (activeLayer === 'primitives' && activeSubpage === 'switch') {
      const [switches, setSwitches] = React.useState({
        basic: false,
        withLabel: true,
        leftLabel: false,
        withDesc: false,
      });

      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Switch</Heading>
            <Text color="secondary">Toggle switch for binary on/off states</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Toggle control for settings and preferences. Provides immediate state change
                feedback.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Basic Switch (No Label)</Heading>
                  <Switch
                    checked={switches.basic}
                    onChange={(checked) => setSwitches({ ...switches, basic: checked })}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Label</Heading>
                  <Switch
                    label="Enable notifications"
                    checked={switches.withLabel}
                    onChange={(checked) => setSwitches({ ...switches, withLabel: checked })}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Label Position</Heading>
                  <Stack gap="medium">
                    <Switch
                      label="Label on Right (Default)"
                      labelPosition="right"
                      checked={switchValue}
                      onChange={setSwitchValue}
                    />
                    <Switch
                      label="Label on Left"
                      labelPosition="left"
                      checked={switches.leftLabel}
                      onChange={(checked) => setSwitches({ ...switches, leftLabel: checked })}
                    />
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Description</Heading>
                  <Switch
                    label="Dark Mode"
                    description="Switch to dark theme across the application"
                    checked={switches.withDesc}
                    onChange={(checked) => setSwitches({ ...switches, withDesc: checked })}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Stack gap="small">
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Off State
                      </Text>
                      <Switch label="Disabled" checked={false} onChange={() => {}} />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        On State
                      </Text>
                      <Switch label="Enabled" checked={true} onChange={() => {}} />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Disabled Off
                      </Text>
                      <Switch label="Disabled" disabled checked={false} onChange={() => {}} />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Disabled On
                      </Text>
                      <Switch label="Disabled" disabled checked={true} onChange={() => {}} />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - TextArea
    if (activeLayer === 'primitives' && activeSubpage === 'textarea') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>TextArea</Heading>
            <Text color="secondary">Multi-line text input with rich features</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Supports auto-expand, character count, and multiple resize modes.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Basic TextArea</Heading>
                  <TextArea
                    label="Comments"
                    placeholder="Enter your comments..."
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Description</Heading>
                  <TextArea
                    label="Bio"
                    description="Tell us about yourself"
                    placeholder="Write a short bio..."
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Required Field</Heading>
                  <TextArea
                    label="Required Feedback"
                    required
                    placeholder="This field is required"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Custom Rows</Heading>
                  <Grid columns={2} gap="medium">
                    <TextArea label="Small (3 rows)" rows={3} placeholder="3 rows" />
                    <TextArea label="Large (8 rows)" rows={8} placeholder="8 rows" />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Resize Modes</Heading>
                  <Grid columns={2} gap="medium">
                    <TextArea
                      label="Vertical (Default)"
                      resize="vertical"
                      placeholder="Can resize vertically"
                    />
                    <TextArea
                      label="Horizontal"
                      resize="horizontal"
                      placeholder="Can resize horizontally"
                    />
                    <TextArea label="Both" resize="both" placeholder="Can resize both ways" />
                    <TextArea label="None" resize="none" placeholder="Cannot resize" />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Character Count</Heading>
                  <TextArea
                    label="Tweet"
                    characterCount
                    maxLength={280}
                    placeholder="What's happening?"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Allow Over Limit</Heading>
                  <TextArea
                    label="Flexible Input"
                    characterCount
                    maxLength={50}
                    allowOverLimit
                    placeholder="You can type over the limit (shows warning)"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Auto Expand</Heading>
                  <TextArea
                    label="Auto-expanding TextArea"
                    autoExpand
                    placeholder="This textarea will grow as you type..."
                    description="The textarea expands to fit content"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Error State</Heading>
                  <TextArea
                    label="Description"
                    error="Description must be at least 50 characters"
                    placeholder="Enter description..."
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <TextArea
                    label="Disabled TextArea"
                    disabled
                    value="This content cannot be edited"
                  />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Select
    if (activeLayer === 'primitives' && activeSubpage === 'select') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Select</Heading>
            <Text color="secondary">Dropdown selection component with label and validation</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Native select element with consistent styling and accessibility features.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Grid columns={2} gap="medium">
                    <Select
                      label="Small Select"
                      size="small"
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                    <Select
                      label="Medium Select (Default)"
                      size="medium"
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Description</Heading>
                  <Select label="Country" description="Select your country of residence">
                    <option value="">Select a country...</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                  </Select>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Required Field</Heading>
                  <Select label="Required Select" required>
                    <option value="">Choose an option...</option>
                    <option value="1">First Option</option>
                    <option value="2">Second Option</option>
                  </Select>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Error State</Heading>
                  <Select label="Invalid Selection" error="Please select a valid option">
                    <option value="">Select...</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                  </Select>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <Select label="Disabled Select" disabled>
                    <option value="1">Cannot change this</option>
                  </Select>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Hidden Label</Heading>
                  <Select label="Filter by status" hideLabel>
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Option Groups</Heading>
                  <Select label="Grouped Options">
                    <optgroup label="Fruits">
                      <option value="apple">Apple</option>
                      <option value="banana">Banana</option>
                      <option value="orange">Orange</option>
                    </optgroup>
                    <optgroup label="Vegetables">
                      <option value="carrot">Carrot</option>
                      <option value="broccoli">Broccoli</option>
                      <option value="spinach">Spinach</option>
                    </optgroup>
                  </Select>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Slider
    if (activeLayer === 'primitives' && activeSubpage === 'slider') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Slider</Heading>
            <Text color="secondary">
              Input control for selecting a numeric value within a range
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Accessible range input with visual feedback and keyboard support.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Basic Slider</Heading>
                  <Slider label="Volume" value={sliderValue} onChange={setSliderValue} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Value Display</Heading>
                  <Slider
                    label="Brightness"
                    value={sliderValue}
                    onChange={setSliderValue}
                    showValue
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Custom Range</Heading>
                  <Slider
                    label="Price Range"
                    min={0}
                    max={1000}
                    step={50}
                    value={sliderValue}
                    onChange={setSliderValue}
                    showValue
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Description</Heading>
                  <Slider
                    label="Quality"
                    description="Adjust image quality (higher values = larger file size)"
                    min={1}
                    max={100}
                    value={75}
                    onChange={setSliderValue}
                    showValue
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Step Increments</Heading>
                  <Grid columns={2} gap="medium">
                    <Slider
                      label="Step: 1"
                      min={0}
                      max={10}
                      step={1}
                      value={5}
                      onChange={setSliderValue}
                      showValue
                    />
                    <Slider
                      label="Step: 5"
                      min={0}
                      max={100}
                      step={5}
                      value={50}
                      onChange={setSliderValue}
                      showValue
                    />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <Slider label="Disabled Slider" value={50} onChange={() => {}} disabled />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Hidden Label</Heading>
                  <Slider
                    label="Volume Control"
                    hideLabel
                    value={sliderValue}
                    onChange={setSliderValue}
                    showValue
                  />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Stepper
    if (activeLayer === 'primitives' && activeSubpage === 'stepper') {
      const steps: Step[] = [
        { id: '1', title: 'Account', description: 'Create your account' },
        { id: '2', title: 'Profile', description: 'Add profile information' },
        { id: '3', title: 'Preferences', description: 'Set your preferences' },
        { id: '4', title: 'Review', description: 'Review and confirm' },
      ];

      const verticalSteps: Step[] = [
        { id: '1', title: 'Completed Step', description: 'This step is done' },
        { id: '2', title: 'Active Step', description: 'Currently on this step' },
        { id: '3', title: 'Upcoming Step', description: 'Not started yet' },
      ];

      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Stepper</Heading>
            <Text color="secondary">Progress indicator for multi-step workflows</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">Shows user progress through a linear sequence of steps.</Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Horizontal Stepper</Heading>
                  <Stepper steps={steps} activeStep={activeStepIndex} />
                  <Inline gap="small">
                    <Button
                      kind="secondary"
                      size="small"
                      onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                      disabled={activeStepIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      kind="brand"
                      size="small"
                      onClick={() =>
                        setActiveStepIndex(Math.min(steps.length - 1, activeStepIndex + 1))
                      }
                      disabled={activeStepIndex === steps.length - 1}
                    >
                      Next
                    </Button>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Vertical Stepper</Heading>
                  <Stepper steps={verticalSteps} activeStep={1} orientation="vertical" />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Clickable Steps</Heading>
                  <Stepper
                    steps={steps}
                    activeStep={activeStepIndex}
                    clickable
                    onStepClick={(index) => setActiveStepIndex(index)}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Descriptions</Heading>
                  <Stepper steps={steps} activeStep={1} showDescription={false} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Connectors</Heading>
                  <Stepper steps={steps} activeStep={1} showConnector={false} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Custom Icons</Heading>
                  <Stepper
                    steps={[
                      { id: '1', title: 'Login', icon: <Icon name="user" size="small" /> },
                      { id: '2', title: 'Verify', icon: <Icon name="check" size="small" /> },
                      { id: '3', title: 'Complete', icon: <Icon name="star" size="small" /> },
                    ]}
                    activeStep={1}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Error State</Heading>
                  <Stepper
                    steps={[
                      { id: '1', title: 'Step 1', status: 'completed' },
                      { id: '2', title: 'Step 2', status: 'error' },
                      { id: '3', title: 'Step 3', status: 'upcoming' },
                    ]}
                    activeStep={1}
                  />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Badge
    if (activeLayer === 'primitives' && activeSubpage === 'badge') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Badge</Heading>
            <Text color="secondary">
              Small label component for status, categories, and metadata
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">Compact component for displaying tags, statuses, and counts.</Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>All Variants</Heading>
                  <Inline gap="small">
                    <Badge variant="subtle">Subtle</Badge>
                    <Badge variant="emphasis">Emphasis</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="alert">Alert</Badge>
                    <Badge variant="promo">Promo</Badge>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Status Badges</Heading>
                  <Inline gap="small">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="warning">Pending</Badge>
                    <Badge variant="alert">Inactive</Badge>
                    <Badge variant="subtle">Draft</Badge>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Category Badges</Heading>
                  <Inline gap="small">
                    <Badge>Design</Badge>
                    <Badge>Engineering</Badge>
                    <Badge>Marketing</Badge>
                    <Badge>Sales</Badge>
                    <Badge>Support</Badge>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Count Badges</Heading>
                  <Inline gap="small">
                    <Badge variant="emphasis">12</Badge>
                    <Badge variant="alert">99+</Badge>
                    <Badge variant="success">3 new</Badge>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>In Context</Heading>
                  <Stack gap="small">
                    <Inline gap="small" align="center">
                      <Text>Project Status:</Text>
                      <Badge variant="success">On Track</Badge>
                    </Inline>
                    <Inline gap="small" align="center">
                      <Text>Priority:</Text>
                      <Badge variant="alert">High</Badge>
                    </Inline>
                    <Inline gap="small" align="center">
                      <Text>Version:</Text>
                      <Badge variant="subtle">v2.1.0</Badge>
                    </Inline>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Avatar
    if (activeLayer === 'primitives' && activeSubpage === 'avatar') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Avatar</Heading>
            <Text color="secondary">User profile picture or initials display</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Shows user images, initials, or placeholder icon with consistent sizing.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Inline gap="medium" align="end">
                    <Stack gap="xsmall" align="center">
                      <Avatar size="xsmall" initials="XS" />
                      <Text size="xs" color="secondary">
                        XSmall
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Avatar size="small" initials="SM" />
                      <Text size="xs" color="secondary">
                        Small
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Avatar size="medium" initials="MD" />
                      <Text size="xs" color="secondary">
                        Medium
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Avatar size="large" initials="LG" />
                      <Text size="xs" color="secondary">
                        Large
                      </Text>
                    </Stack>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Initials</Heading>
                  <Inline gap="small">
                    <Avatar initials="JD" />
                    <Avatar initials="AB" />
                    <Avatar initials="MK" />
                    <Avatar initials="SC" />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Shapes</Heading>
                  <Inline gap="medium">
                    <Stack gap="xsmall" align="center">
                      <Avatar shape="circle" initials="CR" />
                      <Text size="xs" color="secondary">
                        Circle
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Avatar shape="square" initials="SQ" />
                      <Text size="xs" color="secondary">
                        Square
                      </Text>
                    </Stack>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Color Indices</Heading>
                  <Inline gap="small">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((colorIndex) => (
                      <Avatar
                        key={colorIndex}
                        initials={`C${colorIndex}`}
                        colorIndex={colorIndex as any}
                      />
                    ))}
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Images</Heading>
                  <Inline gap="small">
                    <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                    <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                    <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Placeholder (No Initials)</Heading>
                  <Avatar />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Avatar Group</Heading>
                  <AvatarGroup max={4}>
                    <Avatar initials="JD" />
                    <Avatar initials="AB" />
                    <Avatar initials="MK" />
                    <Avatar initials="SC" />
                    <Avatar initials="TW" />
                    <Avatar initials="LM" />
                  </AvatarGroup>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Chip
    if (activeLayer === 'primitives' && activeSubpage === 'chip') {
      const [chips, setChips] = React.useState(['React', 'TypeScript', 'Node.js', 'Express']);

      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Chip</Heading>
            <Text color="secondary">Compact element for tags, filters, and selections</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Interactive pills for tags, removable items, and filter indicators.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Basic Chips</Heading>
                  <Inline gap="small">
                    <Chip>React</Chip>
                    <Chip>TypeScript</Chip>
                    <Chip>JavaScript</Chip>
                    <Chip>CSS</Chip>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Start Element</Heading>
                  <Inline gap="small">
                    <Chip startElement={<Avatar size="xsmall" initials="JD" />}>John Doe</Chip>
                    <Chip startElement={<Avatar size="xsmall" initials="AB" />}>Alice Brown</Chip>
                    <Chip startElement={<Icon name="star" size="small" />}>Favorite</Chip>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Removable Chips</Heading>
                  <Inline gap="small">
                    {chips.map((chip) => (
                      <Chip key={chip} onRemove={() => setChips(chips.filter((c) => c !== chip))}>
                        {chip}
                      </Chip>
                    ))}
                  </Inline>
                  {chips.length === 0 && <Text color="secondary">All chips removed</Text>}
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Clickable Chips</Heading>
                  <Inline gap="small">
                    <Chip onClick={() => alert('All clicked')}>All</Chip>
                    <Chip onClick={() => alert('Active clicked')}>Active</Chip>
                    <Chip onClick={() => alert('Archived clicked')}>Archived</Chip>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <Inline gap="small">
                    <Chip disabled>Disabled</Chip>
                    <Chip disabled onRemove={() => {}}>
                      Disabled with Remove
                    </Chip>
                    <Chip disabled onClick={() => {}}>
                      Disabled Clickable
                    </Chip>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Filter Tags</Heading>
                  <Inline gap="small">
                    <Chip onRemove={() => {}}>Status: Active</Chip>
                    <Chip onRemove={() => {}}>Date: Last 7 days</Chip>
                    <Chip onRemove={() => {}}>Category: Design</Chip>
                  </Inline>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - AlertBadge
    if (activeLayer === 'primitives' && activeSubpage === 'alert-badge') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>AlertBadge</Heading>
            <Text color="secondary">
              Notification badge showing numeric alerts or indicator dots
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Used for notification counts and alert indicators on buttons, icons, or avatars.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>With Numbers</Heading>
                  <Inline gap="large" align="center">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                      <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                        <AlertBadge value={5} />
                      </div>
                    </div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <IconButton icon="mail" variant="secondary" aria-label="Messages" />
                      <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                        <AlertBadge value={12} />
                      </div>
                    </div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <IconButton icon="shopping-cart" variant="secondary" aria-label="Cart" />
                      <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                        <AlertBadge value={120} />
                      </div>
                    </div>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Kinds</Heading>
                  <Inline gap="large" align="center">
                    <Stack gap="xsmall" align="center">
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                        <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                          <AlertBadge kind="emphasis" value={8} />
                        </div>
                      </div>
                      <Text size="xs" color="secondary">
                        Emphasis
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                        <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                          <AlertBadge kind="subtle" value={3} />
                        </div>
                      </div>
                      <Text size="xs" color="secondary">
                        Subtle
                      </Text>
                    </Stack>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Dot Indicator</Heading>
                  <Inline gap="large" align="center">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                      <div style={{ position: 'absolute', top: '-2px', right: '-2px' }}>
                        <AlertBadge dot />
                      </div>
                    </div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <IconButton icon="mail" variant="secondary" aria-label="Messages" />
                      <div style={{ position: 'absolute', top: '-2px', right: '-2px' }}>
                        <AlertBadge dot kind="subtle" />
                      </div>
                    </div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar initials="JD" />
                      <div style={{ position: 'absolute', top: '2px', right: '2px' }}>
                        <AlertBadge dot />
                      </div>
                    </div>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>On Avatars</Heading>
                  <Inline gap="medium">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar initials="AB" size="large" />
                      <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                        <AlertBadge value={5} />
                      </div>
                    </div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar initials="CD" size="large" />
                      <div style={{ position: 'absolute', top: '0', right: '0' }}>
                        <AlertBadge dot />
                      </div>
                    </div>
                  </Inline>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - StatusLight
    if (activeLayer === 'primitives' && activeSubpage === 'status-light') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>StatusLight</Heading>
            <Text color="secondary">
              Colored indicator dot with optional label for status display
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Visual status indicator with semantic colors for states like online, offline,
                success, error.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>All Kinds</Heading>
                  <Stack gap="small">
                    <StatusLight kind="neutral">Neutral</StatusLight>
                    <StatusLight kind="success">Success / Active</StatusLight>
                    <StatusLight kind="warning">Warning / Pending</StatusLight>
                    <StatusLight kind="alert">Alert / Error</StatusLight>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Filled (Default)</Heading>
                  <Inline gap="medium">
                    <StatusLight kind="success" filled>
                      Online
                    </StatusLight>
                    <StatusLight kind="warning" filled>
                      Away
                    </StatusLight>
                    <StatusLight kind="alert" filled>
                      Busy
                    </StatusLight>
                    <StatusLight kind="neutral" filled>
                      Offline
                    </StatusLight>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Not Filled</Heading>
                  <Inline gap="medium">
                    <StatusLight kind="success" filled={false}>
                      Online
                    </StatusLight>
                    <StatusLight kind="warning" filled={false}>
                      Away
                    </StatusLight>
                    <StatusLight kind="alert" filled={false}>
                      Busy
                    </StatusLight>
                    <StatusLight kind="neutral" filled={false}>
                      Offline
                    </StatusLight>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Label</Heading>
                  <Inline gap="medium">
                    <StatusLight kind="success" />
                    <StatusLight kind="warning" />
                    <StatusLight kind="alert" />
                    <StatusLight kind="neutral" />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>In Context</Heading>
                  <Stack gap="small">
                    <Card>
                      <Card.Body>
                        <Inline gap="small" align="center">
                          <Avatar initials="JD" />
                          <Stack gap="xxsmall">
                            <Text weight="semibold">John Doe</Text>
                            <StatusLight kind="success" filled={false}>
                              Online
                            </StatusLight>
                          </Stack>
                        </Inline>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Stack gap="small">
                          <Text weight="semibold">System Status</Text>
                          <Stack gap="xsmall">
                            <StatusLight kind="success">API Server: Operational</StatusLight>
                            <StatusLight kind="success">Database: Operational</StatusLight>
                            <StatusLight kind="warning">Cache: Degraded Performance</StatusLight>
                          </Stack>
                        </Stack>
                      </Card.Body>
                    </Card>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Divider
    if (activeLayer === 'primitives' && activeSubpage === 'divider') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Divider</Heading>
            <Text color="secondary">Visual separator between content sections</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Creates visual separation with customizable orientation and spacing.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Horizontal (Default)</Heading>
                  <Stack gap="small">
                    <Text>Content above divider</Text>
                    <Divider />
                    <Text>Content below divider</Text>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Spacing Options</Heading>
                  <Stack gap="large">
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        No Spacing
                      </Text>
                      <Text>Content</Text>
                      <Divider spacing="none" />
                      <Text>Content</Text>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Small Spacing
                      </Text>
                      <Text>Content</Text>
                      <Divider spacing="small" />
                      <Text>Content</Text>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Medium Spacing (Default)
                      </Text>
                      <Text>Content</Text>
                      <Divider spacing="medium" />
                      <Text>Content</Text>
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Large Spacing
                      </Text>
                      <Text>Content</Text>
                      <Divider spacing="large" />
                      <Text>Content</Text>
                    </Stack>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Vertical</Heading>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100px' }}
                  >
                    <Text>Left</Text>
                    <Divider orientation="vertical" />
                    <Text>Middle</Text>
                    <Divider orientation="vertical" />
                    <Text>Right</Text>
                  </div>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Card
    if (activeLayer === 'primitives' && activeSubpage === 'card') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Card</Heading>
            <Text color="secondary">
              Container component with Header, Body, and Footer sections
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">Flexible container with semantic sections and variant styles.</Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Basic Card</Heading>
                  <Card>
                    <Card.Body>
                      <Text>Simple card with just body content</Text>
                    </Card.Body>
                  </Card>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Header and Footer</Heading>
                  <Card>
                    <Card.Header>
                      <Heading level={4}>Card Title</Heading>
                    </Card.Header>
                    <Card.Body>
                      <Text>
                        Card body content goes here. This is the main content area of the card.
                      </Text>
                    </Card.Body>
                    <Card.Footer>
                      <Inline gap="small">
                        <Button kind="primary" size="small">
                          Action
                        </Button>
                        <Button kind="tertiary" size="small">
                          Cancel
                        </Button>
                      </Inline>
                    </Card.Footer>
                  </Card>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Variants</Heading>
                  <Grid columns={2} gap="medium">
                    <Card variant="light">
                      <Card.Body>
                        <Stack gap="small">
                          <Text weight="semibold">Light (Default)</Text>
                          <Text size="sm" color="secondary">
                            White background
                          </Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                    <Card variant="secondary">
                      <Card.Body>
                        <Stack gap="small">
                          <Text weight="semibold">Secondary</Text>
                          <Text size="sm" color="secondary">
                            Gray background
                          </Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                    <Card variant="dark">
                      <Card.Body>
                        <Stack gap="small">
                          <Text weight="semibold">Dark</Text>
                          <Text size="sm" color="secondary">
                            Purple gradient background
                          </Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled State</Heading>
                  <Card disabled>
                    <Card.Body>
                      <Text>Disabled card with reduced opacity</Text>
                    </Card.Body>
                  </Card>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>No Padding</Heading>
                  <Card noPadding>
                    <div style={{ background: 'var(--ink-neutral-20)', padding: '16px' }}>
                      <Text>Card with noPadding prop - custom internal padding</Text>
                    </div>
                  </Card>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Nested Cards</Heading>
                  <Card>
                    <Card.Header>
                      <Heading level={4}>Outer Card</Heading>
                    </Card.Header>
                    <Card.Body>
                      <Stack gap="medium">
                        <Text>This card contains another card inside it</Text>
                        <Card variant="secondary">
                          <Card.Body>
                            <Text>Inner nested card</Text>
                          </Card.Body>
                        </Card>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Skeleton
    if (activeLayer === 'primitives' && activeSubpage === 'skeleton') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Skeleton</Heading>
            <Text color="secondary">Loading placeholder that mimics content structure</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Shows loading state with animated placeholders before content loads.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Variants</Heading>
                  <Grid columns={2} gap="medium">
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Text (Default)
                      </Text>
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="90%" />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Circular
                      </Text>
                      <Skeleton variant="circular" size="md" />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Rectangular
                      </Text>
                      <Skeleton variant="rectangular" width="100%" height={100} />
                    </Stack>
                    <Stack gap="small">
                      <Text size="sm" weight="semibold">
                        Rounded
                      </Text>
                      <Skeleton variant="rounded" width="100%" height={100} />
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Circular Sizes</Heading>
                  <Inline gap="medium" align="end">
                    <Stack gap="xsmall" align="center">
                      <Skeleton variant="circular" size="xs" />
                      <Text size="xs" color="secondary">
                        XS
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Skeleton variant="circular" size="sm" />
                      <Text size="xs" color="secondary">
                        SM
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Skeleton variant="circular" size="md" />
                      <Text size="xs" color="secondary">
                        MD
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Skeleton variant="circular" size="lg" />
                      <Text size="xs" color="secondary">
                        LG
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Skeleton variant="circular" size="xl" />
                      <Text size="xs" color="secondary">
                        XL
                      </Text>
                    </Stack>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Multiple Lines</Heading>
                  <Skeleton variant="text" lines={5} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Animation</Heading>
                  <Skeleton variant="text" animated={false} width="100%" />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Card Loading Example</Heading>
                  <Card>
                    <Card.Body>
                      <Stack gap="medium">
                        <Inline gap="medium">
                          <Skeleton variant="circular" size="lg" />
                          <Stack gap="small" style={{ flex: 1 }}>
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="40%" />
                          </Stack>
                        </Inline>
                        <Skeleton variant="rectangular" width="100%" height={200} />
                        <Skeleton variant="text" lines={3} />
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Typography
    if (activeLayer === 'primitives' && activeSubpage === 'typography') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Typography (Heading & Text)</Heading>
            <Text color="secondary">Text and heading components with semantic styling</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Provides consistent typography with size, weight, and color variants.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Heading Levels</Heading>
                  <Stack gap="small">
                    <Heading level={1}>Heading Level 1</Heading>
                    <Heading level={2}>Heading Level 2</Heading>
                    <Heading level={3}>Heading Level 3</Heading>
                    <Heading level={4}>Heading Level 4</Heading>
                    <Heading level={5}>Heading Level 5</Heading>
                    <Heading level={6}>Heading Level 6</Heading>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Text Sizes</Heading>
                  <Stack gap="small">
                    <Text size="xs">Extra Small Text (12px)</Text>
                    <Text size="sm">Small Text (14px)</Text>
                    <Text size="md">Medium Text (16px) - Default</Text>
                    <Text size="lg">Large Text (18px)</Text>
                    <Text size="xl">Extra Large Text (20px)</Text>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Text Weights</Heading>
                  <Stack gap="small">
                    <Text weight="light">Light Weight (300)</Text>
                    <Text weight="regular">Regular Weight (400) - Default</Text>
                    <Text weight="medium">Medium Weight (500)</Text>
                    <Text weight="semibold">Semibold Weight (600)</Text>
                    <Text weight="bold">Bold Weight (700)</Text>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Text Colors</Heading>
                  <Stack gap="small">
                    <Text color="primary">Primary Color (Default)</Text>
                    <Text color="secondary">Secondary Color</Text>
                    <Text color="tertiary">Tertiary Color</Text>
                    <Text color="success">Success Color</Text>
                    <Text color="error">Error Color</Text>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Text As Different Elements</Heading>
                  <Stack gap="small">
                    <Text as="p">As Paragraph (default)</Text>
                    <Text as="span">As Span</Text>
                    <Text as="div">As Div</Text>
                    <Text as="label">As Label</Text>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Heading As Different Elements</Heading>
                  <Text size="sm" color="secondary">
                    Visual level 3, semantic h2
                  </Text>
                  <Heading level={3} as="h2">
                    Heading Level 3 Styled as H2
                  </Heading>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Combinations</Heading>
                  <Stack gap="small">
                    <Text size="lg" weight="bold" color="primary">
                      Large Bold Primary Text
                    </Text>
                    <Text size="sm" weight="medium" color="secondary">
                      Small Medium Secondary Text
                    </Text>
                    <Text size="xs" weight="light" color="tertiary">
                      Extra Small Light Tertiary Text
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Spinner
    if (activeLayer === 'primitives' && activeSubpage === 'spinner') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Spinner</Heading>
            <Text color="secondary">Animated loading indicator</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">Shows loading state with customizable size and styling.</Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Inline gap="large" align="center">
                    <Stack gap="xsmall" align="center">
                      <Spinner size="small" />
                      <Text size="xs" color="secondary">
                        Small
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Spinner size="medium" />
                      <Text size="xs" color="secondary">
                        Medium
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Spinner size="large" />
                      <Text size="xs" color="secondary">
                        Large (Default)
                      </Text>
                    </Stack>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Kinds</Heading>
                  <Inline gap="large" align="center">
                    <Stack gap="xsmall" align="center">
                      <Spinner kind="default" />
                      <Text size="xs" color="secondary">
                        Default
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Spinner kind="subtle" />
                      <Text size="xs" color="secondary">
                        Subtle
                      </Text>
                    </Stack>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Label (Hidden)</Heading>
                  <Spinner label="Loading data..." />
                  <Text size="sm" color="secondary">
                    Label is hidden but accessible to screen readers
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Visible Label</Heading>
                  <Spinner label="Loading..." showLabel />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>In Context</Heading>
                  <Card>
                    <Card.Body>
                      <Stack gap="medium" align="center">
                        <Spinner />
                        <Text color="secondary">Loading your content...</Text>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - ProgressBar
    if (activeLayer === 'primitives' && activeSubpage === 'progressbar') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>ProgressBar</Heading>
            <Text color="secondary">Visual progress indicator for operations and tasks</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Shows completion progress with customizable variants and labels.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Stack gap="medium">
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Small
                      </Text>
                      <ProgressBar value={60} size="small" />
                    </div>
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Medium (Default)
                      </Text>
                      <ProgressBar value={60} size="medium" />
                    </div>
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Large
                      </Text>
                      <ProgressBar value={60} size="large" />
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Variants</Heading>
                  <Stack gap="medium">
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Primary
                      </Text>
                      <ProgressBar value={50} variant="primary" />
                    </div>
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Success
                      </Text>
                      <ProgressBar value={100} variant="success" />
                    </div>
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Warning
                      </Text>
                      <ProgressBar value={75} variant="warning" />
                    </div>
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Error
                      </Text>
                      <ProgressBar value={25} variant="error" />
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Label (Outside)</Heading>
                  <ProgressBar value={65} showLabel />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Label (Inside)</Heading>
                  <ProgressBar value={65} showLabel labelInside size="large" />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Custom Label</Heading>
                  <ProgressBar value={45} showLabel label="45 of 100 files processed" />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Indeterminate (Loading)</Heading>
                  <ProgressBar indeterminate />
                  <Text size="sm" color="secondary">
                    Use when progress is unknown
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Striped</Heading>
                  <ProgressBar value={70} striped />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Animated Stripes</Heading>
                  <ProgressBar value={70} striped animated />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Progress Stages</Heading>
                  <Stack gap="medium">
                    <div>
                      <Text
                        size="sm"
                        color="secondary"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Starting
                      </Text>
                      <ProgressBar value={10} />
                    </div>
                    <div>
                      <Text
                        size="sm"
                        color="secondary"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        In Progress
                      </Text>
                      <ProgressBar value={50} variant="primary" />
                    </div>
                    <div>
                      <Text
                        size="sm"
                        color="secondary"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Almost Done
                      </Text>
                      <ProgressBar value={90} variant="success" />
                    </div>
                    <div>
                      <Text
                        size="sm"
                        color="secondary"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Complete
                      </Text>
                      <ProgressBar value={100} variant="success" showLabel />
                    </div>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Callout
    if (activeLayer === 'primitives' && activeSubpage === 'callout') {
      const [calloutStates, setCalloutStates] = React.useState({
        basic: true,
        withImage: true,
        withActions: true,
      });

      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Callout</Heading>
            <Text color="secondary">
              Prominent message box with heading, content, and optional actions
            </Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Used for important messages, tooltips, and contextual information with caret
                positioning.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Caret Locations</Heading>
                  <Grid columns={2} gap="large">
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '16px', display: 'block' }}
                      >
                        Above
                      </Text>
                      {calloutStates.basic && (
                        <Callout
                          heading="Callout Above"
                          location="above"
                          onClose={() => setCalloutStates({ ...calloutStates, basic: false })}
                        >
                          This callout points upward
                        </Callout>
                      )}
                    </div>
                    <div>
                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ marginBottom: '16px', display: 'block' }}
                      >
                        Below
                      </Text>
                      <Callout heading="Callout Below" location="below" closable={false}>
                        This callout points downward
                      </Callout>
                    </div>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Width Variants</Heading>
                  <Stack gap="medium">
                    <Callout heading="Small Width" width="small" closable={false}>
                      Compact callout for short messages
                    </Callout>
                    <Callout heading="Medium Width" width="medium" closable={false}>
                      Standard width for most use cases
                    </Callout>
                    <Callout heading="Large Width" width="large" closable={false}>
                      Wider callout for more content
                    </Callout>
                    <Callout heading="XLarge Width" width="xlarge" closable={false}>
                      Maximum width for detailed information
                    </Callout>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Text Alignment</Heading>
                  <Grid columns={3} gap="medium">
                    <Callout heading="Start (Default)" alignment="start" closable={false}>
                      Left-aligned text content
                    </Callout>
                    <Callout heading="Center" alignment="center" closable={false}>
                      Center-aligned text content
                    </Callout>
                    <Callout heading="End" alignment="end" closable={false}>
                      Right-aligned text content
                    </Callout>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Actions</Heading>
                  {calloutStates.withActions && (
                    <Callout
                      heading="Confirm Action"
                      primaryAction={{ label: 'Confirm', onClick: () => alert('Confirmed!') }}
                      secondaryAction={{
                        label: 'Cancel',
                        onClick: () => setCalloutStates({ ...calloutStates, withActions: false }),
                      }}
                      onClose={() => setCalloutStates({ ...calloutStates, withActions: false })}
                    >
                      Are you sure you want to proceed with this action?
                    </Callout>
                  )}
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Glass Effects</Heading>
                  <Stack gap="medium">
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '24px',
                        borderRadius: '8px',
                      }}
                    >
                      <Stack gap="medium">
                        <Callout heading="No Glass" glass="none" closable={false}>
                          Standard solid background
                        </Callout>
                        <Callout heading="Frost Effect" glass="frost" closable={false}>
                          Frosted glass appearance
                        </Callout>
                        <Callout heading="Tint Effect" glass="tint" closable={false}>
                          Tinted transparent background
                        </Callout>
                      </Stack>
                    </div>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Close Button</Heading>
                  <Callout heading="Information" closable={false}>
                    This callout cannot be dismissed
                  </Callout>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Banner
    if (activeLayer === 'primitives' && activeSubpage === 'banner') {
      const [bannerStates, setBannerStates] = React.useState({
        info: true,
        warning: true,
        success: true,
      });

      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Banner</Heading>
            <Text color="secondary">Full-width notification bar for important messages</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Used for system-wide notifications, alerts, and announcements at the top or bottom
                of pages.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>All Kinds</Heading>
                  <Stack gap="small">
                    {bannerStates.info && (
                      <Banner
                        kind="information"
                        icon="info"
                        onClose={() => setBannerStates({ ...bannerStates, info: false })}
                      >
                        This is an informational message
                      </Banner>
                    )}
                    <Banner kind="success" icon="check-circle">
                      Your changes have been saved successfully
                    </Banner>
                    {bannerStates.warning && (
                      <Banner
                        kind="warning"
                        icon="alert-triangle"
                        onClose={() => setBannerStates({ ...bannerStates, warning: false })}
                      >
                        Please review your settings before continuing
                      </Banner>
                    )}
                    <Banner kind="danger" icon="alert-circle">
                      An error occurred while processing your request
                    </Banner>
                    <Banner kind="promo" icon="star">
                      Special offer: Get 50% off your first purchase!
                    </Banner>
                    <Banner kind="subtle">This is a subtle banner without strong colors</Banner>
                    <Banner kind="neutral">This is a neutral banner for general information</Banner>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Action Button</Heading>
                  <Banner
                    kind="information"
                    icon="info"
                    action={{ label: 'Learn More', onClick: () => alert('Learn more clicked') }}
                  >
                    New features are available in this release
                  </Banner>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Shape Variants</Heading>
                  <Stack gap="small">
                    <Banner kind="information" shape="square">
                      Square corners (default)
                    </Banner>
                    <Banner kind="success" shape="round">
                      Rounded corners
                    </Banner>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Line Wrap</Heading>
                  <Banner kind="information" lineWrap>
                    This is a longer banner message that demonstrates the line wrap feature. When
                    lineWrap is enabled, long messages will wrap to multiple lines instead of being
                    truncated. This is useful for important announcements or detailed notifications
                    that need more space.
                  </Banner>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Bottom Border</Heading>
                  <Banner kind="information" bottomBorder>
                    Banner with bottom border for visual separation
                  </Banner>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Icon</Heading>
                  <Banner kind="information">Banner without an icon</Banner>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Close Button</Heading>
                  <Banner kind="warning" icon="alert-triangle" closable={false}>
                    This banner cannot be dismissed
                  </Banner>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Tooltip
    if (activeLayer === 'primitives' && activeSubpage === 'tooltip') {
      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Tooltip</Heading>
            <Text color="secondary">Contextual information displayed on hover or focus</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Provides additional context for UI elements. Appears on hover with customizable
                positioning.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Positions</Heading>
                  <Grid columns={2} gap="large">
                    <Stack gap="medium" align="center">
                      <Tooltip content="Tooltip on top" position="top">
                        <Button>Top</Button>
                      </Tooltip>
                    </Stack>
                    <Stack gap="medium" align="center">
                      <Tooltip content="Tooltip on bottom" position="bottom">
                        <Button>Bottom</Button>
                      </Tooltip>
                    </Stack>
                    <Stack gap="medium" align="center">
                      <Tooltip content="Tooltip on left" position="left">
                        <Button>Left</Button>
                      </Tooltip>
                    </Stack>
                    <Stack gap="medium" align="center">
                      <Tooltip content="Tooltip on right" position="right">
                        <Button>Right</Button>
                      </Tooltip>
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Different Triggers</Heading>
                  <Inline gap="medium">
                    <Tooltip content="Tooltip on button">
                      <Button kind="brand">Hover me</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip on icon button">
                      <IconButton icon="help-circle" variant="secondary" aria-label="Help" />
                    </Tooltip>
                    <Tooltip content="Tooltip on link">
                      <Link href="#">Hover this link</Link>
                    </Tooltip>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Custom Delay</Heading>
                  <Inline gap="medium">
                    <Tooltip content="Instant tooltip" delay={0}>
                      <Button>No Delay</Button>
                    </Tooltip>
                    <Tooltip content="Normal tooltip" delay={200}>
                      <Button>200ms Delay (Default)</Button>
                    </Tooltip>
                    <Tooltip content="Slow tooltip" delay={1000}>
                      <Button>1000ms Delay</Button>
                    </Tooltip>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Disabled Tooltip</Heading>
                  <Tooltip content="This tooltip is disabled" disabled>
                    <Button>Hover me (No tooltip)</Button>
                  </Tooltip>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>In Context</Heading>
                  <Card variant="secondary">
                    <Card.Body>
                      <Stack gap="small">
                        <Inline gap="small" align="center">
                          <Text weight="semibold">Account Settings</Text>
                          <Tooltip content="Configure your account preferences and personal information">
                            <IconButton
                              icon="help-circle"
                              variant="tertiary"
                              size="small"
                              aria-label="Help"
                            />
                          </Tooltip>
                        </Inline>
                        <Text size="sm" color="secondary">
                          Manage your profile and preferences
                        </Text>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Long Content</Heading>
                  <Tooltip content="This is a longer tooltip that demonstrates how the tooltip component handles multi-line content when needed">
                    <Button>Tooltip with Long Text</Button>
                  </Tooltip>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LAYER 3: PRIMITIVES - Icon
    if (activeLayer === 'primitives' && activeSubpage === 'icon') {
      const iconNames = Object.keys(iconPaths) as (keyof typeof iconPaths)[];
      const popularIcons = [
        'check',
        'close',
        'plus',
        'minus',
        'edit',
        'trash',
        'copy',
        'download',
        'upload',
        'search',
        'filter',
        'settings',
        'user',
        'users',
        'heart',
        'star',
        'bell',
        'mail',
        'calendar',
        'clock',
        'home',
        'folder',
        'file',
        'image',
        'video',
        'music',
        'link',
        'external-link',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrow-down',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'chevron-down',
        'info',
        'alert-circle',
        'alert-triangle',
        'check-circle',
        'error',
        'help-circle',
        'more-horizontal',
        'more-vertical',
        'menu',
      ];

      return (
        <Stack gap="large">
          <Stack gap="medium">
            <Heading level={2}>Icon</Heading>
            <Text color="secondary">SVG icon component from the design system icon library</Text>
            <Alert kind="info" title="Layer 3: Primitive">
              <Text size="sm">
                Provides access to {iconNames.length}+ icons with consistent sizing and coloring.
              </Text>
            </Alert>
          </Stack>

          <Card>
            <Card.Body>
              <Stack gap="xlarge">
                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Inline gap="large" align="end">
                    <Stack gap="xsmall" align="center">
                      <Icon name="star" size="small" />
                      <Text size="xs" color="secondary">
                        Small (16px)
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Icon name="star" size="medium" />
                      <Text size="xs" color="secondary">
                        Medium (24px)
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Icon name="star" size={32} />
                      <Text size="xs" color="secondary">
                        Custom (32px)
                      </Text>
                    </Stack>
                    <Stack gap="xsmall" align="center">
                      <Icon name="star" size={48} />
                      <Text size="xs" color="secondary">
                        Custom (48px)
                      </Text>
                    </Stack>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Colors</Heading>
                  <Inline gap="medium">
                    <Icon name="heart" color="currentColor" />
                    <Icon name="heart" color="var(--ink-cobalt-60)" />
                    <Icon name="heart" color="var(--ink-red-60)" />
                    <Icon name="heart" color="var(--ink-green-60)" />
                    <Icon name="heart" color="var(--ink-orange-60)" />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Popular Icons</Heading>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                      gap: '16px',
                    }}
                  >
                    {popularIcons.map((iconName) => (
                      <Tooltip key={iconName} content={iconName}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = 'var(--ink-neutral-10)')
                          }
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <Icon name={iconName} size="medium" />
                          <Text
                            size="xs"
                            color="secondary"
                            style={{ textAlign: 'center', wordBreak: 'break-word' }}
                          >
                            {iconName}
                          </Text>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>All Available Icons</Heading>
                  <Text size="sm" color="secondary">
                    {iconNames.length} icons available
                  </Text>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                      gap: '8px',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      padding: '8px',
                      background: 'var(--ink-neutral-5)',
                      borderRadius: '4px',
                    }}
                  >
                    {iconNames.map((iconName) => (
                      <Tooltip key={iconName} content={iconName}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = 'var(--ink-neutral-20)')
                          }
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <Icon name={iconName} size="small" />
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Accessibility</Heading>
                  <Inline gap="medium">
                    <Icon name="check" aria-label="Success" />
                    <Icon name="error" aria-label="Error" />
                    <Icon name="warning" aria-hidden />
                  </Inline>
                  <Text size="sm" color="secondary">
                    Use aria-label for meaningful icons, aria-hidden for decorative ones
                  </Text>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // ==================== LAYER 4: COMPOSITES ====================

    // SearchInput
    if (activeSubpage === 'searchinput') {
      const suggestions = searchValue
        ? [
            { id: '1', label: 'React Components', description: 'Build reusable UI elements' },
            { id: '2', label: 'TypeScript Patterns', description: 'Type-safe development' },
            { id: '3', label: 'CSS Modules', description: 'Scoped styling solution' },
          ].filter((s) => s.label.toLowerCase().includes(searchValue.toLowerCase()))
        : [];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>SearchInput</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Search input with suggestions, debouncing, and keyboard navigation. Composed
                    from Input (Layer 3) with search functionality.
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Default Search</Heading>
                  <SearchInput
                    placeholder="Search..."
                    value={searchValue}
                    onChange={setSearchValue}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Suggestions</Heading>
                  <SearchInput
                    placeholder="Search documentation..."
                    value={searchValue}
                    onChange={setSearchValue}
                    suggestions={suggestions}
                    onSuggestionSelect={(suggestion) => {
                      console.log('Selected:', suggestion);
                      setSearchValue(suggestion.label);
                    }}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Grid columns={2} gap="medium">
                    <Stack gap="small">
                      <Text weight="medium">Loading</Text>
                      <SearchInput placeholder="Searching..." loading defaultValue="query" />
                    </Stack>
                    <Stack gap="small">
                      <Text weight="medium">Disabled</Text>
                      <SearchInput placeholder="Search..." disabled />
                    </Stack>
                    <Stack gap="small">
                      <Text weight="medium">Not Clearable</Text>
                      <SearchInput
                        placeholder="Search..."
                        clearable={false}
                        defaultValue="Fixed text"
                      />
                    </Stack>
                    <Stack gap="small">
                      <Text weight="medium">With Search Handler</Text>
                      <SearchInput
                        placeholder="Press Enter to search..."
                        onSearch={(value) => alert(`Searching for: ${value}`)}
                      />
                    </Stack>
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // FileInput
    if (activeSubpage === 'fileinput') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>FileInput</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    File input with drag-and-drop, validation, and file preview. Composed from
                    Button (Layer 3) and Icon (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Single File</Heading>
                  <FileInput
                    label="Upload Document"
                    value={fileInputValue}
                    onChange={setFileInputValue}
                    accept=".pdf,.doc,.docx"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Multiple Files</Heading>
                  <FileInput
                    label="Upload Images"
                    description="Select multiple image files"
                    value={fileInputValue}
                    onChange={setFileInputValue}
                    accept="image/*"
                    multiple
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Size Limit</Heading>
                  <FileInput
                    label="Upload (Max 2MB)"
                    value={fileInputValue}
                    onChange={setFileInputValue}
                    maxSize={2 * 1024 * 1024}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Grid columns={2} gap="medium">
                    <FileInput
                      label="With Error"
                      error="File size exceeds limit"
                      value={[]}
                      onChange={() => {}}
                    />
                    <FileInput label="Disabled" disabled value={[]} onChange={() => {}} />
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // ComboBox
    if (activeSubpage === 'combobox') {
      const comboBoxOptions: ComboBoxOption[] = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'solid', label: 'Solid', disabled: true },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>ComboBox</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Searchable dropdown with keyboard navigation. Composed from Input (Layer 3) and
                    Icon (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Default ComboBox</Heading>
                  <ComboBox
                    label="Select Framework"
                    options={comboBoxOptions}
                    value={comboBoxValue}
                    onChange={setComboBoxValue}
                    placeholder="Choose a framework..."
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Description</Heading>
                  <ComboBox
                    label="Frontend Framework"
                    description="Select your preferred frontend framework"
                    options={comboBoxOptions}
                    value={comboBoxValue}
                    onChange={setComboBoxValue}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Grid columns={2} gap="medium">
                    <ComboBox
                      label="With Error"
                      error="Please select a framework"
                      options={comboBoxOptions}
                      value=""
                      onChange={() => {}}
                    />
                    <ComboBox
                      label="Disabled"
                      disabled
                      options={comboBoxOptions}
                      value=""
                      onChange={() => {}}
                    />
                    <ComboBox
                      label="Required"
                      required
                      options={comboBoxOptions}
                      value=""
                      onChange={() => {}}
                    />
                    <ComboBox
                      label="With Long List"
                      options={Array.from({ length: 20 }, (_, i) => ({
                        value: `item-${i}`,
                        label: `Option ${i + 1}`,
                      }))}
                      value=""
                      onChange={() => {}}
                    />
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // DatePicker
    if (activeSubpage === 'datepicker') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>DatePicker</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Date picker with calendar popup and date range validation. Composed from Input
                    (Layer 3) and Icon (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Basic DatePicker</Heading>
                  <DatePicker
                    label="Select Date"
                    value={datePickerValue}
                    onChange={setDatePickerValue}
                    placeholder="Choose a date"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Date Formats</Heading>
                  <Grid columns={3} gap="medium">
                    <DatePicker
                      label="US Format (MM/DD/YYYY)"
                      format="MM/DD/YYYY"
                      value={datePickerValue}
                      onChange={setDatePickerValue}
                    />
                    <DatePicker
                      label="European (DD/MM/YYYY)"
                      format="DD/MM/YYYY"
                      value={datePickerValue}
                      onChange={setDatePickerValue}
                    />
                    <DatePicker
                      label="ISO (YYYY-MM-DD)"
                      format="YYYY-MM-DD"
                      value={datePickerValue}
                      onChange={setDatePickerValue}
                    />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Constraints</Heading>
                  <Grid columns={2} gap="medium">
                    <DatePicker
                      label="Future Dates Only"
                      minDate={new Date()}
                      value={datePickerValue}
                      onChange={setDatePickerValue}
                      helperText="Only dates from today onwards"
                    />
                    <DatePicker
                      label="Past Dates Only"
                      maxDate={new Date()}
                      value={datePickerValue}
                      onChange={setDatePickerValue}
                      helperText="Only dates up to today"
                    />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Grid columns={2} gap="medium">
                    <DatePicker
                      label="With Error"
                      error
                      helperText="Please select a valid date"
                      value={null}
                      onChange={() => {}}
                    />
                    <DatePicker label="Disabled" disabled value={null} onChange={() => {}} />
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // FileUpload
    if (activeSubpage === 'fileupload') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>FileUpload</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Drag-and-drop file upload with progress tracking. Composed from Icon (Layer 3)
                    and ProgressBar (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Default File Upload</Heading>
                  <FileUpload
                    label="Upload Files"
                    helperText="Drag and drop files or click to browse"
                    onFileChange={setFileUploadFiles}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Single File</Heading>
                  <FileUpload
                    label="Profile Picture"
                    multiple={false}
                    accept="image/*"
                    maxSize={5 * 1024 * 1024}
                    helperText="JPG, PNG or GIF. Max 5MB"
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With File Type Restrictions</Heading>
                  <Grid columns={2} gap="medium">
                    <FileUpload
                      label="Documents Only"
                      accept=".pdf,.doc,.docx"
                      helperText="PDF, DOC, DOCX"
                    />
                    <FileUpload
                      label="Images Only"
                      accept="image/*"
                      helperText="Any image format"
                    />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Grid columns={2} gap="medium">
                    <FileUpload
                      label="Limited Files (Max 3)"
                      maxFiles={3}
                      helperText="Upload up to 3 files"
                    />
                    <FileUpload label="Disabled" disabled placeholder="Upload is disabled" />
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // FilterTag
    if (activeSubpage === 'filtertag') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>FilterTag</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Interactive filter tag with active state and dismiss option. Composed from
                    Button (Layer 3) and Icon (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Basic Filter Tags</Heading>
                  <Inline gap="small">
                    <FilterTag label="All Items" />
                    <FilterTag label="In Progress" />
                    <FilterTag label="Completed" />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Active State</Heading>
                  <Inline gap="small">
                    <FilterTag label="All Items" active />
                    <FilterTag label="In Progress" />
                    <FilterTag label="Completed" />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Dismissible</Heading>
                  <Inline gap="small">
                    <FilterTag
                      label="React"
                      dismissible
                      active
                      onDismiss={() => alert('Removed React')}
                    />
                    <FilterTag
                      label="TypeScript"
                      dismissible
                      active
                      onDismiss={() => alert('Removed TypeScript')}
                    />
                    <FilterTag
                      label="Node.js"
                      dismissible
                      active
                      onDismiss={() => alert('Removed Node.js')}
                    />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Trigger Icon</Heading>
                  <Inline gap="small">
                    <FilterTag label="Category" showTrigger={false} />
                    <FilterTag label="Status" showTrigger={false} />
                    <FilterTag label="Priority" showTrigger={false} />
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Inline gap="small">
                    <FilterTag label="Disabled" disabled />
                    <FilterTag label="Disabled Active" active disabled />
                    <FilterTag label="Disabled Dismissible" dismissible disabled />
                  </Inline>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // Breadcrumb
    if (activeSubpage === 'breadcrumb') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>Breadcrumb</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Navigation breadcrumb trail showing page hierarchy. Composed from Link (Layer 3)
                    and Text (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Default Breadcrumb</Heading>
                  <Breadcrumb items={breadcrumbItems} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Icons</Heading>
                  <Breadcrumb
                    items={[
                      { label: 'Home', href: '/', icon: <Icon name="home" size="small" /> },
                      {
                        label: 'Products',
                        href: '/products',
                        icon: <Icon name="package" size="small" />,
                      },
                      { label: 'Details', icon: <Icon name="info" size="small" /> },
                    ]}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Custom Separator</Heading>
                  <Grid columns={1} gap="medium">
                    <Breadcrumb items={breadcrumbItems} separator=">" />
                    <Breadcrumb items={breadcrumbItems} separator="·" />
                    <Breadcrumb
                      items={breadcrumbItems}
                      separator={<Icon name="chevron-right" size="small" />}
                    />
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With MaxItems</Heading>
                  <Breadcrumb
                    items={[
                      { label: 'Home', href: '/' },
                      { label: 'Products', href: '/products' },
                      { label: 'Electronics', href: '/products/electronics' },
                      { label: 'Computers', href: '/products/electronics/computers' },
                      { label: 'Laptops', href: '/products/electronics/computers/laptops' },
                      { label: 'Gaming' },
                    ]}
                    maxItems={4}
                  />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // Pagination
    if (activeSubpage === 'pagination') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>Pagination</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Navigate through paginated content. Composed from Button (Layer 3) and Icon
                    (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Full Mode</Heading>
                  <Pagination
                    currentPage={paginationPage}
                    totalPages={10}
                    onPageChange={setPaginationPage}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Simple Mode</Heading>
                  <Pagination
                    mode="simple"
                    currentPage={paginationPage}
                    totalPages={10}
                    onPageChange={setPaginationPage}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Many Pages</Heading>
                  <Pagination currentPage={15} totalPages={50} onPageChange={setPaginationPage} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without First/Last Buttons</Heading>
                  <Pagination
                    currentPage={paginationPage}
                    totalPages={10}
                    showFirstLast={false}
                    onPageChange={setPaginationPage}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Items Per Page</Heading>
                  <Pagination
                    currentPage={paginationPage}
                    totalPages={10}
                    showItemsPerPage
                    itemsPerPage={25}
                    onPageChange={setPaginationPage}
                    onItemsPerPageChange={(items) => console.log('Items per page:', items)}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Pagination currentPage={5} totalPages={10} disabled onPageChange={() => {}} />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // Tabs
    if (activeSubpage === 'tabs') {
      const tabItems = [
        {
          id: 'tab1',
          label: 'Overview',
          content: (
            <Stack gap="medium" style={{ padding: '20px' }}>
              <Heading level={4}>Overview Tab</Heading>
              <Text>This is the overview content with detailed information about the project.</Text>
            </Stack>
          ),
        },
        {
          id: 'tab2',
          label: 'Details',
          content: (
            <Stack gap="medium" style={{ padding: '20px' }}>
              <Heading level={4}>Details Tab</Heading>
              <Text>Detailed specifications and technical information.</Text>
            </Stack>
          ),
        },
        {
          id: 'tab3',
          label: 'Settings',
          content: (
            <Stack gap="medium" style={{ padding: '20px' }}>
              <Heading level={4}>Settings Tab</Heading>
              <Text>Configure your preferences and settings here.</Text>
            </Stack>
          ),
        },
        {
          id: 'tab4',
          label: 'Disabled',
          content: <div>Should not see this</div>,
          disabled: true,
        },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>Tabs</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Tab navigation for organizing content. Composed from Button (Layer 3) and layout
                    utilities.
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Default Tabs</Heading>
                  <Tabs tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Rich Content</Heading>
                  <Tabs
                    tabs={[
                      {
                        id: 'analytics',
                        label: 'Analytics',
                        content: (
                          <Stack gap="medium" style={{ padding: '20px' }}>
                            <Heading level={4}>Analytics Dashboard</Heading>
                            <Grid columns={3} gap="medium">
                              <Card>
                                <Card.Body>
                                  <Stack gap="small">
                                    <Text size="sm" color="secondary">
                                      Total Views
                                    </Text>
                                    <Heading level={2}>12,345</Heading>
                                    <Text size="sm" color="success">
                                      ↑ 12.5%
                                    </Text>
                                  </Stack>
                                </Card.Body>
                              </Card>
                              <Card>
                                <Card.Body>
                                  <Stack gap="small">
                                    <Text size="sm" color="secondary">
                                      Conversions
                                    </Text>
                                    <Heading level={2}>1,234</Heading>
                                    <Text size="sm" color="success">
                                      ↑ 8.2%
                                    </Text>
                                  </Stack>
                                </Card.Body>
                              </Card>
                              <Card>
                                <Card.Body>
                                  <Stack gap="small">
                                    <Text size="sm" color="secondary">
                                      Revenue
                                    </Text>
                                    <Heading level={2}>$45K</Heading>
                                    <Text size="sm" color="success">
                                      ↑ 15.3%
                                    </Text>
                                  </Stack>
                                </Card.Body>
                              </Card>
                            </Grid>
                          </Stack>
                        ),
                      },
                      {
                        id: 'reports',
                        label: 'Reports',
                        content: (
                          <Stack gap="medium" style={{ padding: '20px' }}>
                            <Heading level={4}>Reports</Heading>
                            <Text>Generate and download custom reports here.</Text>
                          </Stack>
                        ),
                      },
                    ]}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Many Tabs</Heading>
                  <Tabs
                    tabs={Array.from({ length: 7 }, (_, i) => ({
                      id: `tab-${i}`,
                      label: `Tab ${i + 1}`,
                      content: <div style={{ padding: '20px' }}>Content for Tab {i + 1}</div>,
                    }))}
                  />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // Accordion
    if (activeSubpage === 'accordion') {
      const accordionItems = [
        {
          id: '1',
          title: 'What is React?',
          content:
            'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and efficiently update the DOM.',
        },
        {
          id: '2',
          title: 'What is TypeScript?',
          content:
            'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to the language.',
        },
        {
          id: '3',
          title: 'What are Design Systems?',
          content:
            'Design systems are collections of reusable components and patterns that help maintain consistency across products.',
        },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>Accordion</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Expandable content sections. Composed from Button (Layer 3), Icon (Layer 3), and
                    layout utilities.
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Default (Single Open)</Heading>
                  <Accordion items={accordionItems} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Allow Multiple Open</Heading>
                  <Accordion
                    items={accordionItems}
                    allowMultiple
                    openItems={accordionOpenItems}
                    onOpenItemsChange={setAccordionOpenItems}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Icons</Heading>
                  <Accordion
                    items={[
                      {
                        id: '1',
                        title: 'Features',
                        icon: <Icon name="star" size="small" />,
                        content: (
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            <li>Fast and performant</li>
                            <li>Easy to use</li>
                            <li>Highly customizable</li>
                          </ul>
                        ),
                      },
                      {
                        id: '2',
                        title: 'Documentation',
                        icon: <Icon name="book" size="small" />,
                        content: 'Comprehensive documentation with examples and API references.',
                      },
                      {
                        id: '3',
                        title: 'Support',
                        icon: <Icon name="help-circle" size="small" />,
                        content: '24/7 support available for all users.',
                      },
                    ]}
                    allowMultiple
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Not Bordered</Heading>
                  <Accordion items={accordionItems} bordered={false} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Disabled Item</Heading>
                  <Accordion
                    items={[
                      { id: '1', title: 'Available Item', content: 'This item can be opened.' },
                      {
                        id: '2',
                        title: 'Disabled Item',
                        content: 'Should not see this.',
                        disabled: true,
                      },
                      { id: '3', title: 'Another Available', content: 'This is also available.' },
                    ]}
                  />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // ComboButton
    if (activeSubpage === 'combobutton') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>ComboButton</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Split button with primary action and dropdown menu. Composed from Button (Layer
                    3) and Icon (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Variants</Heading>
                  <Inline gap="medium">
                    <ComboButton
                      variant="brand"
                      onClick={() => alert('Main action')}
                      onDropdownClick={() => alert('Dropdown clicked')}
                    >
                      Brand
                    </ComboButton>
                    <ComboButton
                      variant="primary"
                      onClick={() => alert('Main action')}
                      onDropdownClick={() => alert('Dropdown clicked')}
                    >
                      Primary
                    </ComboButton>
                    <ComboButton
                      variant="secondary"
                      onClick={() => alert('Main action')}
                      onDropdownClick={() => alert('Dropdown clicked')}
                    >
                      Secondary
                    </ComboButton>
                    <ComboButton
                      variant="tertiary"
                      onClick={() => alert('Main action')}
                      onDropdownClick={() => alert('Dropdown clicked')}
                    >
                      Tertiary
                    </ComboButton>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Inline gap="medium">
                    <ComboButton
                      size="small"
                      onClick={() => alert('Small')}
                      onDropdownClick={() => alert('Dropdown')}
                    >
                      Small
                    </ComboButton>
                    <ComboButton
                      size="medium"
                      onClick={() => alert('Medium')}
                      onDropdownClick={() => alert('Dropdown')}
                    >
                      Medium
                    </ComboButton>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Icons</Heading>
                  <Inline gap="medium">
                    <ComboButton
                      startIcon="download"
                      onClick={() => alert('Download')}
                      onDropdownClick={() => alert('Options')}
                    >
                      Download
                    </ComboButton>
                    <ComboButton
                      startIcon="save"
                      variant="primary"
                      onClick={() => alert('Save')}
                      onDropdownClick={() => alert('Save options')}
                    >
                      Save
                    </ComboButton>
                    <ComboButton
                      startIcon="share"
                      variant="secondary"
                      onClick={() => alert('Share')}
                      onDropdownClick={() => alert('Share options')}
                    >
                      Share
                    </ComboButton>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Compact Mode (Tertiary)</Heading>
                  <Inline gap="medium">
                    <ComboButton
                      variant="tertiary"
                      compact
                      startIcon="more-horizontal"
                      onClick={() => alert('Action')}
                      onDropdownClick={() => alert('Menu')}
                    >
                      Compact
                    </ComboButton>
                  </Inline>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>States</Heading>
                  <Inline gap="medium">
                    <ComboButton disabled onClick={() => {}} onDropdownClick={() => {}}>
                      Disabled
                    </ComboButton>
                  </Inline>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // Modal
    if (activeSubpage === 'modal') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>Modal</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Dialog overlay for focused content. Composed from Card (Layer 3), Button (Layer
                    3), and IconButton (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Trigger Modal</Heading>
                  <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

                  <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Modal Title"
                    footer={
                      <>
                        <Button kind="secondary" onClick={() => setModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button kind="brand" onClick={() => setModalOpen(false)}>
                          Confirm
                        </Button>
                      </>
                    }
                  >
                    <Stack gap="medium">
                      <Text>This is a basic modal with title, content, and footer.</Text>
                      <Text color="secondary">
                        Click outside the modal or press ESC to close it.
                      </Text>
                    </Stack>
                  </Modal>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Modal Sizes</Heading>
                  <Inline gap="small">
                    <Button
                      size="small"
                      kind="secondary"
                      onClick={() => {
                        const size = 'small';
                        // Would need separate state for each size demo
                      }}
                    >
                      Small
                    </Button>
                    <Button
                      size="small"
                      kind="secondary"
                      onClick={() => {
                        const size = 'medium';
                      }}
                    >
                      Medium
                    </Button>
                    <Button
                      size="small"
                      kind="secondary"
                      onClick={() => {
                        const size = 'large';
                      }}
                    >
                      Large
                    </Button>
                    <Button
                      size="small"
                      kind="secondary"
                      onClick={() => {
                        const size = 'xlarge';
                      }}
                    >
                      XLarge
                    </Button>
                  </Inline>
                  <Text size="sm" color="secondary">
                    Available sizes: small, medium (default), large, xlarge
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Modal Features</Heading>
                  <Grid columns={2} gap="small">
                    <Badge variant="neutral">closeOnBackdropClick</Badge>
                    <Badge variant="neutral">closeOnEscape</Badge>
                    <Badge variant="neutral">Custom footer</Badge>
                    <Badge variant="neutral">Scrollable content</Badge>
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // Dropdown
    if (activeSubpage === 'dropdown') {
      const dropdownItems = [
        { label: 'Edit', icon: <Icon name="edit" size="small" />, onClick: () => alert('Edit') },
        {
          label: 'Duplicate',
          icon: <Icon name="copy" size="small" />,
          onClick: () => alert('Duplicate'),
        },
        {
          label: 'Archive',
          icon: <Icon name="archive" size="small" />,
          onClick: () => alert('Archive'),
        },
        { divider: true },
        {
          label: 'Delete',
          icon: <Icon name="trash-2" size="small" />,
          onClick: () => alert('Delete'),
        },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>Dropdown</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Context menu with keyboard navigation. Composed from Button (Layer 3) and Icon
                    (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Default Dropdown</Heading>
                  <Dropdown items={dropdownItems}>
                    <Button>Actions</Button>
                  </Dropdown>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Icons</Heading>
                  <Dropdown items={dropdownItems}>
                    <Button startIcon="more-vertical">Options</Button>
                  </Dropdown>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Descriptions</Heading>
                  <Dropdown
                    items={[
                      {
                        label: 'Create Analysis',
                        description: 'Analyze and autofill attributes',
                        onClick: () => alert('Create Analysis'),
                      },
                      {
                        label: 'Create Mapping',
                        description: 'Connect CLM attributes to AI models',
                        onClick: () => alert('Create Mapping'),
                      },
                      {
                        label: 'Apply in Bulk',
                        description: 'Upload CSV to apply values',
                        onClick: () => alert('Apply in Bulk'),
                      },
                    ]}
                  >
                    <Button>Create</Button>
                  </Dropdown>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Shortcuts</Heading>
                  <Dropdown
                    items={[
                      { label: 'Undo', shortcut: 'Ctrl+Z', onClick: () => alert('Undo') },
                      { label: 'Redo', shortcut: 'Ctrl+Y', onClick: () => alert('Redo') },
                      { divider: true },
                      { label: 'Cut', shortcut: 'Ctrl+X', onClick: () => alert('Cut') },
                      { label: 'Copy', shortcut: 'Ctrl+C', onClick: () => alert('Copy') },
                      { label: 'Paste', shortcut: 'Ctrl+V', onClick: () => alert('Paste') },
                    ]}
                  >
                    <Button>Edit</Button>
                  </Dropdown>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Positions</Heading>
                  <Grid columns={4} gap="medium">
                    <Dropdown items={dropdownItems} position="bottom">
                      <Button size="small" kind="secondary">
                        Bottom
                      </Button>
                    </Dropdown>
                    <Dropdown items={dropdownItems} position="top">
                      <Button size="small" kind="secondary">
                        Top
                      </Button>
                    </Dropdown>
                    <Dropdown items={dropdownItems} position="left">
                      <Button size="small" kind="secondary">
                        Left
                      </Button>
                    </Dropdown>
                    <Dropdown items={dropdownItems} position="right">
                      <Button size="small" kind="secondary">
                        Right
                      </Button>
                    </Dropdown>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Disabled Items</Heading>
                  <Dropdown
                    items={[
                      { label: 'Active Item', onClick: () => alert('Active') },
                      { label: 'Disabled Item', disabled: true, onClick: () => {} },
                      { label: 'Another Active', onClick: () => alert('Active') },
                    ]}
                  >
                    <Button>Menu</Button>
                  </Dropdown>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // Alert
    if (activeSubpage === 'alert') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>Alert</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Contextual feedback messages. Composed from Icon (Layer 3), Button (Layer 3),
                    and Text (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Alert Kinds</Heading>
                  <Stack gap="small">
                    <Alert kind="information">
                      This is an informational message to help guide the user.
                    </Alert>
                    <Alert kind="success">Your changes have been saved successfully!</Alert>
                    <Alert kind="warning">Please review your information before proceeding.</Alert>
                    <Alert kind="danger">An error occurred while processing your request.</Alert>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Titles</Heading>
                  <Stack gap="small">
                    <Alert kind="information" title="Information">
                      We have updated our privacy policy. Please review the changes.
                    </Alert>
                    <Alert kind="success" title="Success!">
                      Your profile has been updated successfully.
                    </Alert>
                    <Alert kind="warning" title="Warning">
                      Your subscription will expire in 3 days.
                    </Alert>
                    <Alert kind="danger" title="Error">
                      Failed to save changes. Please try again.
                    </Alert>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Dismissible</Heading>
                  {alertVisible && (
                    <Alert
                      kind="information"
                      title="Dismissible Alert"
                      onClose={() => setAlertVisible(false)}
                    >
                      This alert can be dismissed by clicking the close button.
                    </Alert>
                  )}
                  {!alertVisible && (
                    <Button size="small" kind="secondary" onClick={() => setAlertVisible(true)}>
                      Show Alert
                    </Button>
                  )}
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Actions</Heading>
                  <Alert
                    kind="warning"
                    title="Action Required"
                    action={{
                      label: 'View Details',
                      onClick: () => alert('Action clicked'),
                    }}
                  >
                    You have pending documents that require your signature.
                  </Alert>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Shapes</Heading>
                  <Stack gap="small">
                    <Alert kind="information" shape="square">
                      Square corners (default)
                    </Alert>
                    <Alert kind="information" shape="round">
                      Rounded corners
                    </Alert>
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Other Kinds</Heading>
                  <Stack gap="small">
                    <Alert kind="promo">Special promotion: Get 20% off your next purchase!</Alert>
                    <Alert kind="subtle">
                      Subtle information message with lower visual weight.
                    </Alert>
                    <Alert kind="neutral">Neutral message without specific sentiment.</Alert>
                    <Alert kind="neutralDark">Neutral dark message for better contrast.</Alert>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // Table
    if (activeSubpage === 'table') {
      const sampleData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'Viewer',
          status: 'inactive',
        },
        {
          id: 4,
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'Editor',
          status: 'active',
        },
        {
          id: 5,
          name: 'Charlie Davis',
          email: 'charlie@example.com',
          role: 'Admin',
          status: 'pending',
        },
      ];

      const basicColumns: TableColumn[] = [
        { key: 'name', header: 'Name', sortable: true },
        { key: 'email', header: 'Email', sortable: true },
        { key: 'role', header: 'Role', sortable: true },
        {
          key: 'status',
          header: 'Status',
          sortable: true,
          cell: (row) => {
            const variant =
              row.status === 'active'
                ? 'success'
                : row.status === 'pending'
                  ? 'warning'
                  : 'neutral';
            return <Badge variant={variant}>{row.status}</Badge>;
          },
        },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>Table</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Data table with sorting, selection, and pagination. Composed from Checkbox
                    (Layer 3) and Icon (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Basic Table</Heading>
                  <Table columns={basicColumns} data={sampleData} />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Sorting</Heading>
                  <Table
                    columns={basicColumns}
                    data={sampleData}
                    sortColumn={tableSortColumn}
                    sortDirection={tableSortDirection}
                    onSortChange={(col, dir) => {
                      setTableSortColumn(col);
                      setTableSortDirection(dir);
                    }}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Selection</Heading>
                  <Table
                    columns={basicColumns}
                    data={sampleData}
                    selectable
                    selectedRows={tableSelectedRows}
                    onSelectionChange={setTableSelectedRows}
                    getRowKey={(row) => row.id}
                  />
                  <Text size="sm" color="secondary">
                    Selected: {tableSelectedRows.size} row(s)
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Variants</Heading>
                  <Stack gap="small">
                    <Text weight="medium">Bordered</Text>
                    <Table
                      columns={basicColumns}
                      data={sampleData.slice(0, 3)}
                      variant="bordered"
                    />
                    <Text weight="medium">Striped</Text>
                    <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="striped" />
                  </Stack>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Grid columns={1} gap="medium">
                    <Stack gap="small">
                      <Text weight="medium">Small</Text>
                      <Table columns={basicColumns} data={sampleData.slice(0, 2)} size="small" />
                    </Stack>
                    <Stack gap="small">
                      <Text weight="medium">Large</Text>
                      <Table columns={basicColumns} data={sampleData.slice(0, 2)} size="large" />
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Hoverable Rows</Heading>
                  <Table
                    columns={basicColumns}
                    data={sampleData.slice(0, 3)}
                    hoverable
                    onRowClick={(row) => alert(`Clicked: ${row.name}`)}
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Empty State</Heading>
                  <Table
                    columns={basicColumns}
                    data={[]}
                    emptyMessage="No users found. Try adjusting your filters."
                  />
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Loading State</Heading>
                  <Table columns={basicColumns} data={[]} loading />
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // List
    if (activeSubpage === 'list') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>List</Heading>
                    <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Structured list with rich content support. Composed from Icon (Layer 3), Badge
                    (Layer 3), Avatar (Layer 3), and Button (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Basic List</Heading>
                  <List>
                    <List.Item>First item in the list</List.Item>
                    <List.Item>Second item in the list</List.Item>
                    <List.Item>Third item in the list</List.Item>
                    <List.Item>Fourth item in the list</List.Item>
                  </List>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Descriptions</Heading>
                  <List>
                    <List.Item description="Additional information about the first item">
                      First item
                    </List.Item>
                    <List.Item description="Additional information about the second item">
                      Second item
                    </List.Item>
                    <List.Item description="Additional information about the third item">
                      Third item
                    </List.Item>
                  </List>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Icons</Heading>
                  <List>
                    <List.Item startElement={<Icon name="file" />}>Document.pdf</List.Item>
                    <List.Item startElement={<Icon name="image" />}>Image.jpg</List.Item>
                    <List.Item startElement={<Icon name="folder" />}>Folder</List.Item>
                  </List>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With End Elements</Heading>
                  <List>
                    <List.Item
                      startElement={<Icon name="file" />}
                      endElement={<Badge variant="success">Active</Badge>}
                    >
                      Contract_2024.pdf
                    </List.Item>
                    <List.Item
                      startElement={<Icon name="file" />}
                      endElement={<Badge variant="warning">Pending</Badge>}
                    >
                      Invoice_March.pdf
                    </List.Item>
                    <List.Item
                      startElement={<Icon name="file" />}
                      endElement={<Badge variant="error">Expired</Badge>}
                    >
                      Agreement_2023.pdf
                    </List.Item>
                  </List>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Meta Information</Heading>
                  <List>
                    <List.Item meta="2 hours ago">New message from John</List.Item>
                    <List.Item meta="5 hours ago">Document shared by Sarah</List.Item>
                    <List.Item meta="Yesterday">Meeting reminder</List.Item>
                  </List>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Clickable List</Heading>
                  <List hoverable>
                    <List.Item
                      clickable
                      startElement={<Icon name="home" />}
                      onClick={() => alert('Home')}
                    >
                      Home
                    </List.Item>
                    <List.Item
                      clickable
                      startElement={<Icon name="user" />}
                      onClick={() => alert('Profile')}
                    >
                      Profile
                    </List.Item>
                    <List.Item
                      clickable
                      startElement={<Icon name="settings" />}
                      onClick={() => alert('Settings')}
                    >
                      Settings
                    </List.Item>
                  </List>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Variants</Heading>
                  <Grid columns={1} gap="medium">
                    <Stack gap="small">
                      <Text weight="medium">Bordered</Text>
                      <List variant="bordered">
                        <List.Item>Item in bordered list</List.Item>
                        <List.Item>Another item</List.Item>
                      </List>
                    </Stack>
                    <Stack gap="small">
                      <Text weight="medium">Divided</Text>
                      <List variant="divided">
                        <List.Item>Item with divider</List.Item>
                        <List.Item>Another item</List.Item>
                        <List.Item>Last item</List.Item>
                      </List>
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Sizes</Heading>
                  <Grid columns={3} gap="medium">
                    <Stack gap="small">
                      <Text weight="medium">Small</Text>
                      <List size="small">
                        <List.Item startElement={<Icon name="star" size="small" />}>
                          Small item
                        </List.Item>
                        <List.Item startElement={<Icon name="heart" size="small" />}>
                          Another small
                        </List.Item>
                      </List>
                    </Stack>
                    <Stack gap="small">
                      <Text weight="medium">Medium</Text>
                      <List size="medium">
                        <List.Item startElement={<Icon name="star" />}>Medium item</List.Item>
                        <List.Item startElement={<Icon name="heart" />}>Another medium</List.Item>
                      </List>
                    </Stack>
                    <Stack gap="small">
                      <Text weight="medium">Large</Text>
                      <List size="large">
                        <List.Item startElement={<Icon name="star" />}>Large item</List.Item>
                        <List.Item startElement={<Icon name="heart" />}>Another large</List.Item>
                      </List>
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Ordered List</Heading>
                  <List ordered>
                    <List.Item>First step in the process</List.Item>
                    <List.Item>Second step in the process</List.Item>
                    <List.Item>Third step in the process</List.Item>
                  </List>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Disabled Items</Heading>
                  <List>
                    <List.Item clickable onClick={() => alert('Active')}>
                      Active item
                    </List.Item>
                    <List.Item clickable disabled>
                      Disabled item
                    </List.Item>
                    <List.Item clickable onClick={() => alert('Active')}>
                      Another active
                    </List.Item>
                  </List>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // ========================================
    // LAYER 5: PATTERNS
    // ========================================

    // GlobalNav
    if (activeSubpage === 'globalnav') {
      const globalNavItems = [
        {
          id: 'insights',
          label: 'Insights',
          active: globalNavActive === 'insights',
          onClick: () => setGlobalNavActive('insights'),
        },
        {
          id: 'campaigns',
          label: 'Campaigns',
          active: globalNavActive === 'campaigns',
          onClick: () => setGlobalNavActive('campaigns'),
        },
        {
          id: 'audiences',
          label: 'Audiences',
          active: globalNavActive === 'audiences',
          onClick: () => setGlobalNavActive('audiences'),
        },
        {
          id: 'reports',
          label: 'Reports',
          active: globalNavActive === 'reports',
          onClick: () => setGlobalNavActive('reports'),
        },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>GlobalNav</Heading>
                    <AlertBadge variant="warning">Layer 5: Pattern</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Global navigation bar with branding, primary navigation, and utility actions.
                    Composed from Avatar (Layer 3) and Icon (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Complete GlobalNav</Heading>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <GlobalNav
                      logo={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              background: 'var(--ink-brand-500)',
                              borderRadius: '6px',
                            }}
                          />
                          <Text weight="semibold">Acme</Text>
                        </div>
                      }
                      navItems={globalNavItems}
                      showAppSwitcher={true}
                      onAppSwitcherClick={() => alert('App switcher clicked')}
                      showSearch={true}
                      onSearchClick={() => alert('Search clicked')}
                      showNotifications={true}
                      onNotificationClick={() => alert('Notifications clicked')}
                      notificationCount={5}
                      showSettings={true}
                      onSettingsClick={() => alert('Settings clicked')}
                      user={{
                        name: 'Jane Doe',
                      }}
                      onUserMenuClick={() => alert('User menu clicked')}
                    />
                  </div>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Notification Badge</Heading>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <GlobalNav
                      logo={<Text weight="bold">Brand</Text>}
                      navItems={globalNavItems.slice(0, 3)}
                      showNotifications={true}
                      notificationCount={99}
                      onNotificationClick={() => alert('99+ notifications')}
                      user={{ name: 'John Smith' }}
                    />
                  </div>
                  <Text size="sm" color="secondary">
                    Notification count displays as "99+" when exceeding 99
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Minimal Configuration</Heading>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <GlobalNav logo={<Heading level={4}>Logo</Heading>} navItems={globalNavItems} />
                  </div>
                  <Text size="sm" color="secondary">
                    Only logo and navigation items - utility actions are optional
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With All Utilities</Heading>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <GlobalNav
                      logo={<Text weight="bold">Platform</Text>}
                      navItems={[
                        { id: 'home', label: 'Home', active: true },
                        { id: 'products', label: 'Products' },
                        { id: 'analytics', label: 'Analytics' },
                      ]}
                      showAppSwitcher={true}
                      showSearch={true}
                      showNotifications={true}
                      notificationCount={12}
                      showSettings={true}
                      user={{
                        name: 'Alex Chen',
                        avatar: 'https://i.pravatar.cc/150?img=8',
                      }}
                      onUserMenuClick={() => alert('User profile')}
                    />
                  </div>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Active States</Heading>
                  <Text size="sm" color="secondary">
                    Click navigation items to see active state styling
                  </Text>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <GlobalNav
                      logo={<Text weight="bold">Demo</Text>}
                      navItems={globalNavItems}
                      user={{ name: 'Demo User' }}
                    />
                  </div>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Key Features</Heading>
                  <Grid columns={2} gap="small">
                    <Badge variant="neutral">App switcher</Badge>
                    <Badge variant="neutral">Primary navigation</Badge>
                    <Badge variant="neutral">Search integration</Badge>
                    <Badge variant="neutral">Notification center</Badge>
                    <Badge variant="neutral">Settings access</Badge>
                    <Badge variant="neutral">User profile menu</Badge>
                    <Badge variant="neutral">Active state tracking</Badge>
                    <Badge variant="neutral">Avatar support</Badge>
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // LocalNav
    if (activeSubpage === 'localnav') {
      const localNavSections = [
        {
          id: 'status',
          title: 'Status',
          headerLabel: true,
          items: [
            {
              id: 'in-progress',
              label: 'In Progress',
              icon: 'clock' as const,
              badge: '3',
              active: localNavActive === 'in-progress',
              onClick: () => setLocalNavActive('in-progress'),
            },
            {
              id: 'completed',
              label: 'Completed',
              icon: 'check-circle' as const,
              active: localNavActive === 'completed',
              onClick: () => setLocalNavActive('completed'),
            },
            {
              id: 'archived',
              label: 'Archived',
              icon: 'archive' as const,
              active: localNavActive === 'archived',
              onClick: () => setLocalNavActive('archived'),
            },
          ],
        },
        {
          id: 'projects',
          title: 'Projects',
          collapsible: true,
          defaultExpanded: true,
          items: [
            {
              id: 'website-redesign',
              label: 'Website Redesign',
              icon: 'layout' as const,
              hasMenu: true,
              onMenuClick: () => alert('Project menu'),
              active: localNavActive === 'website-redesign',
              onClick: () => setLocalNavActive('website-redesign'),
            },
            {
              id: 'mobile-app',
              label: 'Mobile App',
              icon: 'smartphone' as const,
              badge: '12',
              hasMenu: true,
              onMenuClick: () => alert('Project menu'),
              active: localNavActive === 'mobile-app',
              onClick: () => setLocalNavActive('mobile-app'),
            },
            {
              id: 'dashboard-v2',
              label: 'Dashboard v2',
              icon: 'bar-chart' as const,
              hasMenu: true,
              onMenuClick: () => alert('Project menu'),
              active: localNavActive === 'dashboard-v2',
              onClick: () => setLocalNavActive('dashboard-v2'),
            },
          ],
        },
        {
          id: 'teams',
          title: 'Teams',
          collapsible: true,
          defaultExpanded: false,
          items: [
            {
              id: 'design',
              label: 'Design Team',
              icon: 'users' as const,
              active: localNavActive === 'design',
              onClick: () => setLocalNavActive('design'),
            },
            {
              id: 'engineering',
              label: 'Engineering',
              icon: 'code' as const,
              active: localNavActive === 'engineering',
              onClick: () => setLocalNavActive('engineering'),
            },
            {
              id: 'marketing',
              label: 'Marketing',
              icon: 'megaphone' as const,
              active: localNavActive === 'marketing',
              onClick: () => setLocalNavActive('marketing'),
            },
          ],
        },
      ];

      const simpleSection = [
        {
          id: 'main',
          items: [
            { id: 'overview', label: 'Overview', icon: 'home' as const, active: true },
            { id: 'activity', label: 'Activity', icon: 'activity' as const, badge: '5' },
            { id: 'settings', label: 'Settings', icon: 'settings' as const },
          ],
        },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>LocalNav</Heading>
                    <AlertBadge variant="warning">Layer 5: Pattern</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Context-aware secondary navigation for pages and workspaces. Composed from Icon
                    (Layer 3), Badge (Layer 3), Switch (Layer 3), and Tooltip (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Full-Featured LocalNav</Heading>
                  <div
                    style={{
                      maxWidth: '300px',
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <LocalNav
                      headerLabel="My Workspace"
                      sections={localNavSections}
                      onHeaderClick={() => alert('Workspace switcher clicked')}
                      activeItemId={localNavActive}
                      footerToggle={{
                        label: 'New navigation',
                        checked: localNavToggle,
                        onChange: setLocalNavToggle,
                        icon: 'zap',
                      }}
                    />
                  </div>
                  <Text size="sm" color="secondary">
                    Click items to see active states, expand/collapse sections, and toggle footer
                    switch
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Collapsible Sections</Heading>
                  <Grid columns={2} gap="medium">
                    <div
                      style={{
                        border: '1px solid var(--ink-border-default)',
                        borderRadius: 'var(--ink-radius-size-xs)',
                      }}
                    >
                      <LocalNav
                        headerLabel="Projects"
                        sections={localNavSections}
                        activeItemId={localNavActive}
                      />
                    </div>
                    <Stack gap="small">
                      <Text weight="medium">Features shown:</Text>
                      <List size="small">
                        <List.Item startElement={<Icon name="check" size="small" />}>
                          Section headers (label & collapsible)
                        </List.Item>
                        <List.Item startElement={<Icon name="check" size="small" />}>
                          Item badges for counts
                        </List.Item>
                        <List.Item startElement={<Icon name="check" size="small" />}>
                          Context menu buttons
                        </List.Item>
                        <List.Item startElement={<Icon name="check" size="small" />}>
                          Active state indicators
                        </List.Item>
                      </List>
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Simple Navigation</Heading>
                  <div
                    style={{
                      maxWidth: '280px',
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <LocalNav
                      headerLabel="Dashboard"
                      sections={simpleSection}
                      onHeaderClick={() => alert('Dashboard selector')}
                    />
                  </div>
                  <Text size="sm" color="secondary">
                    Minimal configuration with single section and no headers
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Header Action</Heading>
                  <div
                    style={{
                      maxWidth: '300px',
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <LocalNav
                      headerLabel="Documents"
                      sections={[
                        {
                          id: 'folders',
                          title: 'Folders',
                          headerLabel: true,
                          headerAction: {
                            icon: 'folder-plus',
                            label: 'New folder',
                            onClick: () => alert('Creating new folder...'),
                          },
                          items: [
                            {
                              id: 'design',
                              label: 'Design Files',
                              icon: 'folder' as const,
                              badge: '24',
                            },
                            {
                              id: 'docs',
                              label: 'Documentation',
                              icon: 'folder' as const,
                              badge: '8',
                            },
                            {
                              id: 'assets',
                              label: 'Assets',
                              icon: 'folder' as const,
                              badge: '156',
                            },
                          ],
                        },
                      ]}
                    />
                  </div>
                  <Text size="sm" color="secondary">
                    Section header with action button (hover over "Folders")
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Key Features</Heading>
                  <Grid columns={2} gap="small">
                    <Badge variant="neutral">Header dropdown</Badge>
                    <Badge variant="neutral">Collapsible sections</Badge>
                    <Badge variant="neutral">Item badges</Badge>
                    <Badge variant="neutral">Context menus</Badge>
                    <Badge variant="neutral">Active indicators</Badge>
                    <Badge variant="neutral">Icon support</Badge>
                    <Badge variant="neutral">Footer toggle</Badge>
                    <Badge variant="neutral">Tooltips</Badge>
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // VerticalNavigation
    if (activeSubpage === 'verticalnav') {
      const verticalNavItems: NavigationItem[] = [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'layout',
          items: [
            { id: 'overview', label: 'Overview', icon: 'home' },
            { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
            { id: 'reports', label: 'Reports', icon: 'file-text' },
          ],
        },
        {
          id: 'users',
          label: 'Users',
          icon: 'users',
          items: [
            { id: 'all-users', label: 'All Users', icon: 'users' },
            { id: 'teams', label: 'Teams', icon: 'users' },
            { id: 'permissions', label: 'Permissions', icon: 'shield' },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          icon: 'file-text',
          items: [
            { id: 'pages', label: 'Pages', icon: 'file' },
            { id: 'media', label: 'Media', icon: 'image' },
            { id: 'documents', label: 'Documents', icon: 'folder' },
          ],
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: 'settings',
        },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>VerticalNavigation</Heading>
                    <AlertBadge variant="warning">Layer 5: Pattern</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Hierarchical sidebar navigation with expandable sub-items. Composed from Icon
                    (Layer 3) and Tooltip (Layer 3).
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Expanded Navigation</Heading>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                      display: 'inline-block',
                    }}
                  >
                    <VerticalNavigation
                      items={verticalNavItems}
                      activeItemId={verticalNavActiveItem}
                      activeSubItemId={verticalNavActiveSubItem}
                      onItemClick={(itemId) => {
                        setVerticalNavActiveItem(itemId);
                        setVerticalNavCollapsed(false);
                      }}
                      onSubItemClick={(itemId, subItemId) => {
                        setVerticalNavActiveItem(itemId);
                        setVerticalNavActiveSubItem(subItemId);
                      }}
                      collapsed={verticalNavCollapsed}
                      onCollapsedChange={setVerticalNavCollapsed}
                      logo={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px',
                          }}
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              background: 'var(--ink-brand-500)',
                              borderRadius: '6px',
                            }}
                          />
                          <Text weight="bold">Admin</Text>
                        </div>
                      }
                      footer={
                        <Stack gap="small" style={{ padding: '16px' }}>
                          <Inline gap="small" align="center">
                            <Avatar name="Admin User" size="small" />
                            <Stack gap="xsmall">
                              <Text size="sm" weight="medium">
                                Admin User
                              </Text>
                              <Text size="xs" color="secondary">
                                admin@example.com
                              </Text>
                            </Stack>
                          </Inline>
                        </Stack>
                      }
                    />
                  </div>
                  <Text size="sm" color="secondary">
                    Click items to navigate, click chevron icon in header to collapse
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Collapsed Navigation</Heading>
                  <Grid columns={2} gap="medium">
                    <div
                      style={{
                        border: '1px solid var(--ink-border-default)',
                        borderRadius: 'var(--ink-radius-size-xs)',
                        display: 'inline-block',
                      }}
                    >
                      <VerticalNavigation
                        items={verticalNavItems}
                        activeItemId="users"
                        collapsed={true}
                        logo={
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '8px',
                            }}
                          >
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                background: 'var(--ink-brand-500)',
                                borderRadius: '6px',
                              }}
                            />
                          </div>
                        }
                      />
                    </div>
                    <Stack gap="small">
                      <Text weight="medium">Collapsed State</Text>
                      <Text size="sm" color="secondary">
                        Shows only icons with tooltips on hover. Logo adjusts automatically.
                        Sub-items are hidden in collapsed mode.
                      </Text>
                      <List size="small">
                        <List.Item startElement={<Icon name="check" size="small" />}>
                          Icons remain visible
                        </List.Item>
                        <List.Item startElement={<Icon name="check" size="small" />}>
                          Tooltips show labels
                        </List.Item>
                        <List.Item startElement={<Icon name="check" size="small" />}>
                          Width: 64px
                        </List.Item>
                      </List>
                    </Stack>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Logo or Footer</Heading>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                      display: 'inline-block',
                    }}
                  >
                    <VerticalNavigation
                      items={[
                        { id: 'home', label: 'Home', icon: 'home' },
                        { id: 'explore', label: 'Explore', icon: 'compass' },
                        { id: 'notifications', label: 'Notifications', icon: 'bell' },
                        { id: 'messages', label: 'Messages', icon: 'message-circle' },
                        { id: 'profile', label: 'Profile', icon: 'user' },
                      ]}
                      activeItemId="home"
                      width={240}
                    />
                  </div>
                  <Text size="sm" color="secondary">
                    Simple navigation without logo or footer sections
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Nested Sub-Items</Heading>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                      display: 'inline-block',
                    }}
                  >
                    <VerticalNavigation
                      items={verticalNavItems}
                      activeItemId="dashboard"
                      activeSubItemId="analytics"
                      onItemClick={(itemId) => setVerticalNavActiveItem(itemId)}
                      onSubItemClick={(itemId, subItemId) => {
                        setVerticalNavActiveItem(itemId);
                        setVerticalNavActiveSubItem(subItemId);
                      }}
                      logo={
                        <Text weight="bold" style={{ padding: '16px' }}>
                          Navigation
                        </Text>
                      }
                    />
                  </div>
                  <Text size="sm" color="secondary">
                    Items with sub-items expand when clicked. Active states track both item and
                    sub-item.
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Custom Width</Heading>
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                      display: 'inline-block',
                    }}
                  >
                    <VerticalNavigation
                      items={verticalNavItems.slice(0, 3)}
                      activeItemId="users"
                      width={320}
                      logo={
                        <Text weight="bold" style={{ padding: '16px' }}>
                          Wide Navigation
                        </Text>
                      }
                    />
                  </div>
                  <Text size="sm" color="secondary">
                    Width can be customized (default: 280px, shown: 320px)
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Key Features</Heading>
                  <Grid columns={2} gap="small">
                    <Badge variant="neutral">Hierarchical items</Badge>
                    <Badge variant="neutral">Expandable sub-items</Badge>
                    <Badge variant="neutral">Collapse/expand</Badge>
                    <Badge variant="neutral">Active states</Badge>
                    <Badge variant="neutral">Icon support</Badge>
                    <Badge variant="neutral">Tooltips (collapsed)</Badge>
                    <Badge variant="neutral">Custom width</Badge>
                    <Badge variant="neutral">Logo & footer slots</Badge>
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // ========================================
    // LAYER 6: LAYOUTS
    // ========================================

    // DashboardLayout
    if (activeSubpage === 'dashboard') {
      const dashboardNavItems: NavigationItem[] = [
        { id: 'home', label: 'Home', icon: 'home' },
        { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
        { id: 'users', label: 'Users', icon: 'users' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
      ];

      const dashboardGlobalNavItems = [
        { id: 'overview', label: 'Overview', active: true },
        { id: 'team', label: 'Team' },
        { id: 'projects', label: 'Projects' },
      ];

      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>DashboardLayout</Heading>
                    <AlertBadge variant="success">Layer 6: Layout</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Complete dashboard layout template with sidebar navigation, header, and content
                    area. Composes GlobalNav and VerticalNavigation patterns.
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Full Dashboard Layout</Heading>
                  <div
                    style={{
                      border: '2px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-sm)',
                      overflow: 'hidden',
                      height: '600px',
                    }}
                  >
                    <DashboardLayout
                      navigation={
                        <VerticalNavigation
                          items={dashboardNavItems}
                          activeItemId="home"
                          logo={
                            <div style={{ padding: '16px' }}>
                              <Text weight="bold">Dashboard</Text>
                            </div>
                          }
                          footer={
                            <div
                              style={{
                                padding: '16px',
                                borderTop: '1px solid var(--ink-border-default)',
                              }}
                            >
                              <Inline gap="small" align="center">
                                <Avatar name="User" size="small" />
                                <Text size="sm" weight="medium">
                                  User
                                </Text>
                              </Inline>
                            </div>
                          }
                        />
                      }
                      header={
                        <GlobalNav
                          logo={<Text weight="bold">Admin Panel</Text>}
                          navItems={dashboardGlobalNavItems}
                          showSearch={true}
                          showNotifications={true}
                          notificationCount={3}
                          user={{ name: 'Admin User' }}
                        />
                      }
                    >
                      <Stack gap="large" style={{ padding: '24px' }}>
                        <Stack gap="small">
                          <Heading level={2}>Dashboard Overview</Heading>
                          <Text color="secondary">Welcome to your dashboard</Text>
                        </Stack>

                        <Grid columns={3} gap="medium">
                          <Card>
                            <Card.Body>
                              <Stack gap="small">
                                <Text color="secondary" size="sm">
                                  Total Users
                                </Text>
                                <Heading level={1}>1,234</Heading>
                                <Badge variant="success">+12% this month</Badge>
                              </Stack>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Body>
                              <Stack gap="small">
                                <Text color="secondary" size="sm">
                                  Active Sessions
                                </Text>
                                <Heading level={1}>856</Heading>
                                <Badge variant="info">Real-time</Badge>
                              </Stack>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Body>
                              <Stack gap="small">
                                <Text color="secondary" size="sm">
                                  Revenue
                                </Text>
                                <Heading level={1}>$45.2K</Heading>
                                <Badge variant="success">+8% this week</Badge>
                              </Stack>
                            </Card.Body>
                          </Card>
                        </Grid>

                        <Card>
                          <Card.Header title="Recent Activity" />
                          <Card.Body>
                            <List>
                              <List.Item
                                startElement={<Icon name="user-plus" />}
                                meta="2 minutes ago"
                              >
                                New user registered
                              </List.Item>
                              <List.Item
                                startElement={<Icon name="file-text" />}
                                meta="15 minutes ago"
                              >
                                Report generated
                              </List.Item>
                              <List.Item startElement={<Icon name="settings" />} meta="1 hour ago">
                                Settings updated
                              </List.Item>
                            </List>
                          </Card.Body>
                        </Card>
                      </Stack>
                    </DashboardLayout>
                  </div>
                  <Text size="sm" color="secondary">
                    Complete layout with VerticalNavigation (left), GlobalNav (top), and content
                    area
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Without Header</Heading>
                  <div
                    style={{
                      border: '2px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-sm)',
                      overflow: 'hidden',
                      height: '400px',
                    }}
                  >
                    <DashboardLayout
                      navigation={
                        <VerticalNavigation
                          items={dashboardNavItems}
                          activeItemId="analytics"
                          logo={
                            <div style={{ padding: '16px' }}>
                              <Text weight="bold">App</Text>
                            </div>
                          }
                        />
                      }
                    >
                      <Stack gap="large" style={{ padding: '24px' }}>
                        <Heading level={2}>Analytics Dashboard</Heading>
                        <Grid columns={2} gap="medium">
                          <Card>
                            <Card.Header title="Page Views" />
                            <Card.Body>
                              <Heading level={1}>12,543</Heading>
                              <Text color="secondary" size="sm">
                                Last 30 days
                              </Text>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Header title="Conversions" />
                            <Card.Body>
                              <Heading level={1}>342</Heading>
                              <Text color="secondary" size="sm">
                                Last 30 days
                              </Text>
                            </Card.Body>
                          </Card>
                        </Grid>
                      </Stack>
                    </DashboardLayout>
                  </div>
                  <Text size="sm" color="secondary">
                    Layout without global navigation header
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>With Sidebar</Heading>
                  <div
                    style={{
                      border: '2px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-sm)',
                      overflow: 'hidden',
                      height: '500px',
                    }}
                  >
                    <DashboardLayout
                      navigation={
                        <VerticalNavigation
                          items={dashboardNavItems}
                          activeItemId="users"
                          logo={
                            <div style={{ padding: '16px' }}>
                              <Text weight="bold">Users</Text>
                            </div>
                          }
                        />
                      }
                      sidebar={
                        <div style={{ padding: '24px', background: 'var(--ink-neutral-5)' }}>
                          <Stack gap="medium">
                            <Heading level={4}>Filters</Heading>
                            <Stack gap="small">
                              <Checkbox defaultChecked>Active Users</Checkbox>
                              <Checkbox>Inactive Users</Checkbox>
                              <Checkbox>Admins Only</Checkbox>
                            </Stack>
                            <Divider />
                            <Heading level={4}>Actions</Heading>
                            <Stack gap="small">
                              <Button size="small" fullWidth>
                                Export CSV
                              </Button>
                              <Button size="small" kind="secondary" fullWidth>
                                Print Report
                              </Button>
                            </Stack>
                          </Stack>
                        </div>
                      }
                    >
                      <Stack gap="large" style={{ padding: '24px' }}>
                        <Stack gap="small">
                          <Heading level={2}>User Management</Heading>
                          <Text color="secondary">Manage and filter users</Text>
                        </Stack>
                        <Card>
                          <Card.Header title="Users List" />
                          <Card.Body>
                            <List>
                              <List.Item startElement={<Avatar name="John Doe" size="small" />}>
                                John Doe
                              </List.Item>
                              <List.Item startElement={<Avatar name="Jane Smith" size="small" />}>
                                Jane Smith
                              </List.Item>
                              <List.Item startElement={<Avatar name="Bob Johnson" size="small" />}>
                                Bob Johnson
                              </List.Item>
                            </List>
                          </Card.Body>
                        </Card>
                      </Stack>
                    </DashboardLayout>
                  </div>
                  <Text size="sm" color="secondary">
                    Layout with optional right sidebar for filters or actions
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Minimal Configuration</Heading>
                  <div
                    style={{
                      border: '2px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-sm)',
                      overflow: 'hidden',
                      height: '300px',
                    }}
                  >
                    <DashboardLayout>
                      <Stack gap="large" style={{ padding: '24px' }}>
                        <Heading level={2}>Simple Dashboard</Heading>
                        <Text color="secondary">
                          Navigation and header are optional. Use this for simple single-page
                          dashboards.
                        </Text>
                        <Card>
                          <Card.Body>
                            <Text>Main content area</Text>
                          </Card.Body>
                        </Card>
                      </Stack>
                    </DashboardLayout>
                  </div>
                  <Text size="sm" color="secondary">
                    Only content area - navigation and header are optional
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Key Features</Heading>
                  <Grid columns={2} gap="small">
                    <Badge variant="neutral">Sidebar navigation slot</Badge>
                    <Badge variant="neutral">Global header slot</Badge>
                    <Badge variant="neutral">Main content area</Badge>
                    <Badge variant="neutral">Optional right sidebar</Badge>
                    <Badge variant="neutral">Responsive layout</Badge>
                    <Badge variant="neutral">Full-height design</Badge>
                    <Badge variant="neutral">Flexible composition</Badge>
                    <Badge variant="neutral">All slots optional</Badge>
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // AuthLayout
    if (activeSubpage === 'auth') {
      return (
        <Stack gap="large">
          <Card>
            <Card.Body>
              <Stack gap="large">
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Heading level={2}>AuthLayout</Heading>
                    <AlertBadge variant="success">Layer 6: Layout</AlertBadge>
                  </Inline>
                  <Text color="secondary">
                    Centered layout template for authentication flows (login, signup, password
                    reset). Three variants: default, split, and minimal.
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Default Variant</Heading>
                  <div
                    style={{
                      border: '2px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-sm)',
                      overflow: 'hidden',
                      height: '500px',
                    }}
                  >
                    <AuthLayout
                      logo={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              background: 'var(--ink-brand-500)',
                              borderRadius: '8px',
                            }}
                          />
                          <Text weight="bold" size="xl">
                            Acme Corp
                          </Text>
                        </div>
                      }
                      footer={
                        <Stack gap="small" align="center">
                          <Inline gap="medium">
                            <Link href="#">Privacy Policy</Link>
                            <Link href="#">Terms of Service</Link>
                            <Link href="#">Contact</Link>
                          </Inline>
                          <Text size="sm" color="secondary">
                            © 2024 Acme Corp. All rights reserved.
                          </Text>
                        </Stack>
                      }
                    >
                      <Stack gap="large">
                        <Stack gap="small" align="center">
                          <Heading level={2}>Welcome back</Heading>
                          <Text color="secondary">Sign in to your account</Text>
                        </Stack>
                        <Stack gap="medium">
                          <Stack gap="small">
                            <Text size="sm" weight="medium">
                              Email
                            </Text>
                            <Input type="email" placeholder="you@example.com" fullWidth />
                          </Stack>
                          <Stack gap="small">
                            <Text size="sm" weight="medium">
                              Password
                            </Text>
                            <Input type="password" placeholder="••••••••" fullWidth />
                          </Stack>
                          <Inline justify="space-between" align="center">
                            <Checkbox>Remember me</Checkbox>
                            <Link href="#">Forgot password?</Link>
                          </Inline>
                          <Button kind="brand" fullWidth>
                            Sign in
                          </Button>
                        </Stack>
                        <Divider />
                        <Text size="sm" color="secondary" style={{ textAlign: 'center' }}>
                          Don't have an account? <Link href="#">Sign up</Link>
                        </Text>
                      </Stack>
                    </AuthLayout>
                  </div>
                  <Text size="sm" color="secondary">
                    Centered form with logo on top and footer at bottom
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Split Variant</Heading>
                  <div
                    style={{
                      border: '2px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-sm)',
                      overflow: 'hidden',
                      height: '500px',
                    }}
                  >
                    <AuthLayout
                      variant="split"
                      logo={
                        <Stack gap="medium" align="center">
                          <div
                            style={{
                              width: '60px',
                              height: '60px',
                              background: 'white',
                              borderRadius: '12px',
                            }}
                          />
                          <Text weight="bold" size="xl" style={{ color: 'white' }}>
                            Platform
                          </Text>
                          <Text style={{ color: 'white', opacity: 0.9 }}>
                            Build amazing products with our design system
                          </Text>
                        </Stack>
                      }
                      footer={
                        <Text size="sm" color="secondary" style={{ textAlign: 'center' }}>
                          © 2024 Platform Inc.
                        </Text>
                      }
                    >
                      <Stack gap="large">
                        <Stack gap="small">
                          <Heading level={2}>Create account</Heading>
                          <Text color="secondary">Get started in minutes</Text>
                        </Stack>
                        <Stack gap="medium">
                          <Stack gap="small">
                            <Text size="sm" weight="medium">
                              Full Name
                            </Text>
                            <Input placeholder="John Doe" fullWidth />
                          </Stack>
                          <Stack gap="small">
                            <Text size="sm" weight="medium">
                              Email
                            </Text>
                            <Input type="email" placeholder="you@example.com" fullWidth />
                          </Stack>
                          <Stack gap="small">
                            <Text size="sm" weight="medium">
                              Password
                            </Text>
                            <Input type="password" placeholder="Create a password" fullWidth />
                          </Stack>
                          <Checkbox>
                            I agree to the <Link href="#">Terms of Service</Link> and{' '}
                            <Link href="#">Privacy Policy</Link>
                          </Checkbox>
                          <Button kind="brand" fullWidth>
                            Create account
                          </Button>
                        </Stack>
                        <Text size="sm" color="secondary" style={{ textAlign: 'center' }}>
                          Already have an account? <Link href="#">Sign in</Link>
                        </Text>
                      </Stack>
                    </AuthLayout>
                  </div>
                  <Text size="sm" color="secondary">
                    Split layout with branded left side and form on right
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Minimal Variant</Heading>
                  <div
                    style={{
                      border: '2px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-sm)',
                      overflow: 'hidden',
                      height: '400px',
                    }}
                  >
                    <AuthLayout
                      variant="minimal"
                      logo={
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '24px',
                          }}
                        >
                          <div
                            style={{
                              width: '48px',
                              height: '48px',
                              background: 'var(--ink-brand-500)',
                              borderRadius: '10px',
                            }}
                          />
                        </div>
                      }
                    >
                      <Stack gap="large">
                        <Stack gap="small" align="center">
                          <Heading level={2}>Reset password</Heading>
                          <Text color="secondary" size="sm" style={{ textAlign: 'center' }}>
                            Enter your email and we'll send you a reset link
                          </Text>
                        </Stack>
                        <Stack gap="medium">
                          <Stack gap="small">
                            <Text size="sm" weight="medium">
                              Email
                            </Text>
                            <Input type="email" placeholder="you@example.com" fullWidth />
                          </Stack>
                          <Button kind="brand" fullWidth>
                            Send reset link
                          </Button>
                        </Stack>
                        <Text size="sm" color="secondary" style={{ textAlign: 'center' }}>
                          <Link href="#">Back to sign in</Link>
                        </Text>
                      </Stack>
                    </AuthLayout>
                  </div>
                  <Text size="sm" color="secondary">
                    Clean minimal layout for simple auth flows
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Social Login Example</Heading>
                  <div
                    style={{
                      border: '2px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-sm)',
                      overflow: 'hidden',
                      height: '500px',
                    }}
                  >
                    <AuthLayout
                      logo={
                        <Text weight="bold" size="xl">
                          Welcome
                        </Text>
                      }
                      footer={
                        <Text size="sm" color="secondary">
                          Protected by reCAPTCHA
                        </Text>
                      }
                    >
                      <Stack gap="large">
                        <Stack gap="small" align="center">
                          <Heading level={2}>Sign in</Heading>
                          <Text color="secondary">Choose your preferred method</Text>
                        </Stack>
                        <Stack gap="small">
                          <Button kind="secondary" fullWidth>
                            <Inline gap="small" align="center" justify="center">
                              <Icon name="chrome" />
                              Continue with Google
                            </Inline>
                          </Button>
                          <Button kind="secondary" fullWidth>
                            <Inline gap="small" align="center" justify="center">
                              <Icon name="github" />
                              Continue with GitHub
                            </Inline>
                          </Button>
                        </Stack>
                        <Inline gap="small" align="center">
                          <Divider />
                          <Text size="sm" color="secondary" style={{ whiteSpace: 'nowrap' }}>
                            or continue with email
                          </Text>
                          <Divider />
                        </Inline>
                        <Stack gap="medium">
                          <Input type="email" placeholder="Email address" fullWidth />
                          <Input type="password" placeholder="Password" fullWidth />
                          <Button kind="brand" fullWidth>
                            Sign in
                          </Button>
                        </Stack>
                      </Stack>
                    </AuthLayout>
                  </div>
                  <Text size="sm" color="secondary">
                    Login form with social authentication options
                  </Text>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Key Features</Heading>
                  <Grid columns={2} gap="small">
                    <Badge variant="neutral">Three variants</Badge>
                    <Badge variant="neutral">Centered layout</Badge>
                    <Badge variant="neutral">Logo support</Badge>
                    <Badge variant="neutral">Footer support</Badge>
                    <Badge variant="neutral">Split background</Badge>
                    <Badge variant="neutral">Responsive design</Badge>
                    <Badge variant="neutral">Full-height layout</Badge>
                    <Badge variant="neutral">Flexible content</Badge>
                  </Grid>
                </Stack>

                <Divider />

                <Stack gap="medium">
                  <Heading level={3}>Variant Comparison</Heading>
                  <Grid columns={3} gap="small">
                    <Stack gap="xsmall">
                      <Text weight="medium">Default</Text>
                      <Text size="sm" color="secondary">
                        Simple centered form with logo and footer
                      </Text>
                    </Stack>
                    <Stack gap="xsmall">
                      <Text weight="medium">Split</Text>
                      <Text size="sm" color="secondary">
                        Branded left panel with form on right
                      </Text>
                    </Stack>
                    <Stack gap="xsmall">
                      <Text weight="medium">Minimal</Text>
                      <Text size="sm" color="secondary">
                        Clean layout with no decorative elements
                      </Text>
                    </Stack>
                  </Grid>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Stack>
      );
    }

    // For any other sections not yet implemented, show placeholder
    return (
      <Card>
        <Card.Body>
          <Stack gap="medium" align="center" style={{ padding: '60px 20px' }}>
            <Icon name="construction" size={64} />
            <Heading level={3}>{activeSubpage}</Heading>
            <Text color="secondary" style={{ textAlign: 'center' }}>
              This comprehensive showcase section is being built.
              <br />
              Check back for detailed component variations and usage examples.
            </Text>
            <Text size="sm" color="secondary" style={{ textAlign: 'center' }}>
              Layer: {activeLayer} | Component: {activeSubpage}
            </Text>
          </Stack>
        </Card.Body>
      </Card>
    );
  };

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

          {/* Dynamic Content */}
          {renderContent()}
        </Stack>
      </div>
    </div>
  );
}
