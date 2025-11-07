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
  Popover,
  Dropdown,
  Drawer,
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
      { id: 'icons', label: 'Icons' },
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
      { id: 'popover', label: 'Popover' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'drawer', label: 'Drawer' },
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

  // Layer 1: Token Data
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

  // Layer 1: Token Render Functions
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
              <Icon name="star" size="xsmall" />
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
              <Icon name="star" size="small" />
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
              <Icon name="star" size="medium" />
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
              <Icon name="star" size="large" />
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
              <Icon name="star" size="xlarge" />
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
                {iconNames.length} icons extracted from the official @ds/icons package. All icons
                are monochromatic and designed for UI use.
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

  // Layer 2: Utility Render Functions
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
                <Text color="secondary">The foundation color palette with semantic meanings</Text>
              </Stack>

              <Card>
                <Card.Body>
                  <Stack gap="large">
                    <Stack gap="medium">
                      <Heading level={3}>Cobalt (Brand)</Heading>
                      <Grid columns={5} gap="small">
                        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140].map(
                          (shade) => (
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
                          )
                        )}
                      </Grid>
                    </Stack>

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
                    Uses only tokens (Layer 1) and utilities (Layer 2). No dependencies on other
                    components.
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
                          <Button variant="brand">Brand Button</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">
                            Primary
                          </Text>
                          <Button variant="primary">Primary Button</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">
                            Secondary
                          </Text>
                          <Button variant="secondary">Secondary Button</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">
                            Tertiary
                          </Text>
                          <Button variant="tertiary">Tertiary Button</Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">
                            Danger
                          </Text>
                          <Button variant="danger">Danger Button</Button>
                        </Stack>
                      </Grid>
                    </Stack>

                    <Divider />

                    <Stack gap="medium">
                      <Heading level={3}>Sizes</Heading>
                      <Stack gap="small" align="center" direction="horizontal">
                        <Button variant="brand" size="small">
                          Small
                        </Button>
                        <Button variant="brand" size="medium">
                          Medium (Default)
                        </Button>
                        <Button variant="brand" size="large">
                          Large
                        </Button>
                      </Stack>
                    </Stack>

                    <Divider />

                    <Stack gap="medium">
                      <Heading level={3}>With Icons</Heading>
                      <Grid columns={3} gap="medium">
                        <Button variant="brand" startIcon="plus">
                          Start Icon
                        </Button>
                        <Button variant="primary" endIcon="arrow-right">
                          End Icon
                        </Button>
                        <Button variant="secondary" startIcon="download" endIcon="external">
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
                          <Button variant="brand" loading>
                            Loading...
                          </Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">
                            Disabled
                          </Text>
                          <Button variant="brand" disabled>
                            Disabled
                          </Button>
                        </Stack>
                        <Stack gap="small">
                          <Text size="sm" weight="semibold">
                            Full Width
                          </Text>
                          <Button variant="brand" fullWidth>
                            Full Width
                          </Button>
                        </Stack>
                      </Grid>
                    </Stack>

                    <Divider />

                    <Stack gap="medium">
                      <Heading level={3}>Rounded (Pill)</Heading>
                      <Inline gap="medium">
                        <Button variant="brand" rounded>
                          Rounded Brand
                        </Button>
                        <Button variant="primary" rounded>
                          Rounded Primary
                        </Button>
                        <Button variant="secondary" rounded>
                          Rounded Secondary
                        </Button>
                      </Inline>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card>
            </Stack>
          )}

          {/* LAYER 1: TOKENS - Typography */}
          {activeLayer === 'tokens' && activeSubpage === 'typography' && (
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={2}>Typography</Heading>
                <Text color="secondary">
                  Complete type system with Display, Heading, Body, and Detail categories
                </Text>
              </Stack>

              <Card>
                <Card.Body>{renderTypographyContent()}</Card.Body>
              </Card>
            </Stack>
          )}

          {/* LAYER 1: TOKENS - Icons */}
          {activeLayer === 'tokens' && activeSubpage === 'icons' && (
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={2}>Icons</Heading>
                <Text color="secondary">
                  Monochromatic SVG icons with consistent sizing and line weight
                </Text>
              </Stack>

              <Card>
                <Card.Body>{renderIconsContent()}</Card.Body>
              </Card>
            </Stack>
          )}

          {/* LAYER 1: TOKENS - Spacing */}
          {activeLayer === 'tokens' && activeSubpage === 'spacing' && (
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={2}>Spacing</Heading>
                <Text color="secondary">Consistent spacing scale based on an 8px grid system</Text>
              </Stack>

              <Card>
                <Card.Body>{renderSpacingContent()}</Card.Body>
              </Card>
            </Stack>
          )}

          {/* LAYER 1: TOKENS - Border & Radius */}
          {activeLayer === 'tokens' && activeSubpage === 'border-radius' && (
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={2}>Border & Radius</Heading>
                <Text color="secondary">
                  Border width and corner radius tokens for consistent edge styling
                </Text>
              </Stack>

              <Card>
                <Card.Body>{renderBorderRadiusContent()}</Card.Body>
              </Card>
            </Stack>
          )}

          {/* LAYER 2: UTILITIES - Stack */}
          {activeLayer === 'utilities' && activeSubpage === 'stack' && (
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={2}>Stack</Heading>
                <Text color="secondary">
                  Layout component for arranging children with consistent spacing
                </Text>
              </Stack>

              <Card>
                <Card.Body>{renderStackContent()}</Card.Body>
              </Card>
            </Stack>
          )}

          {/* LAYER 2: UTILITIES - Grid */}
          {activeLayer === 'utilities' && activeSubpage === 'grid' && (
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={2}>Grid</Heading>
                <Text color="secondary">Responsive grid layout system</Text>
              </Stack>

              <Card>
                <Card.Body>{renderGridContent()}</Card.Body>
              </Card>
            </Stack>
          )}

          {/* Add more component showcases as needed... */}
          {/* This is a framework - you can add the rest similarly */}

          {/* Placeholder for other subpages */}
          {!(
            (activeLayer === 'tokens' && activeSubpage === 'color-primitives') ||
            (activeLayer === 'tokens' && activeSubpage === 'typography') ||
            (activeLayer === 'tokens' && activeSubpage === 'icons') ||
            (activeLayer === 'tokens' && activeSubpage === 'spacing') ||
            (activeLayer === 'tokens' && activeSubpage === 'border-radius') ||
            (activeLayer === 'utilities' && activeSubpage === 'stack') ||
            (activeLayer === 'utilities' && activeSubpage === 'grid') ||
            (activeLayer === 'primitives' && activeSubpage === 'button')
          ) && (
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
