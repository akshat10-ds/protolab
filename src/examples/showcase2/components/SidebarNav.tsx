import React from 'react';
import { Stack, Text } from '@/design-system';

export type LayerView =
  | 'tokens'
  | 'utilities'
  | 'primitives'
  | 'composites'
  | 'patterns'
  | 'layouts';

export interface SidebarNavProps {
  activeLayer: LayerView;
  activeSubpage: string;
  onLayerChange: (layer: LayerView) => void;
  onSubpageChange: (subpage: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeLayer,
  activeSubpage,
  onLayerChange,
  onSubpageChange,
}) => {
  const layerSubpages: Record<LayerView, { id: string; label: string }[]> = {
    tokens: [
      { id: 'color-primitives', label: 'Color Primitives' },
      { id: 'semantic-colors', label: 'Semantic Colors' },
      { id: 'typography', label: 'Typography Primitives' },
      { id: 'semantic-typography', label: 'Semantic Typography' },
      { id: 'component-tokens', label: 'Component Tokens' },
      { id: 'state-tokens', label: 'State Tokens' },
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
    { id: 'tokens', label: 'Layer 1: Tokens', count: 9 },
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
          <Stack key={layer.id} gap="small">
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
              <Stack gap="small">
                <Text
                  size="sm"
                  weight="semibold"
                  color={activeLayer === layer.id ? 'primary' : 'primary'}
                  style={activeLayer === layer.id ? { color: 'var(--ink-cobalt-100)' } : undefined}
                >
                  {layer.label}
                </Text>
                <Text size="xs" color="secondary">
                  {layer.count} items
                </Text>
              </Stack>
            </button>

            {activeLayer === layer.id && (
              <Stack gap="small" style={{ paddingLeft: '24px' }}>
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
                    <Text
                      size="sm"
                      color={activeSubpage === subpage.id ? 'primary' : 'primary'}
                      style={
                        activeSubpage === subpage.id
                          ? { color: 'var(--ink-cobalt-100)' }
                          : undefined
                      }
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
