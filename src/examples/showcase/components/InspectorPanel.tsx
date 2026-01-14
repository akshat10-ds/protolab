/**
 * InspectorPanel - Figma-style property editor for components
 *
 * Features:
 * - Edit component props with live preview
 * - View/edit related design tokens
 * - Copy generated code
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Icon, Switch, Input, Select } from '@/design-system';
import { componentRegistry, AVAILABLE_ICONS } from '@/editor/registry/componentRegistry';
import type { LayerView } from './SidebarNav';
import styles from './InspectorPanel.module.css';

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
  'alert-badge': 'AlertBadge',
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
  // Patterns
  globalnav: 'GlobalNav',
  localnav: 'LocalNav',
  // Layouts
  'docusign-shell': 'DocuSignShell',
  // Utilities
  stack: 'Stack',
  grid: 'Grid',
  inline: 'Inline',
  container: 'Container',
  spacer: 'Spacer',
};

// Token categories for organizing display
type TokenCategory =
  | 'colors'
  | 'spacing'
  | 'typography'
  | 'radius'
  | 'shadows'
  | 'animation'
  | 'zIndex';

const TOKEN_CATEGORY_LABELS: Record<TokenCategory, string> = {
  colors: 'Colors',
  spacing: 'Spacing',
  typography: 'Typography',
  radius: 'Border Radius',
  shadows: 'Shadows',
  animation: 'Animation',
  zIndex: 'Z-Index',
};

// Detect token category from token name
const getTokenCategory = (tokenName: string): TokenCategory => {
  if (tokenName.includes('spacing')) return 'spacing';
  if (
    tokenName.includes('font-size') ||
    tokenName.includes('font-weight') ||
    tokenName.includes('font-family') ||
    tokenName.includes('line-height')
  )
    return 'typography';
  if (tokenName.includes('radius')) return 'radius';
  if (tokenName.includes('shadow') || tokenName.includes('elevation')) return 'shadows';
  if (tokenName.includes('transition') || tokenName.includes('animation')) return 'animation';
  if (tokenName.includes('z-')) return 'zIndex';
  return 'colors';
};

// Detect value type from resolved value
const getValueType = (
  value: string
):
  | 'color'
  | 'spacing'
  | 'typography'
  | 'radius'
  | 'shadow'
  | 'animation'
  | 'zIndex'
  | 'unknown' => {
  if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')) return 'color';
  if (value.match(/^\d+(\.\d+)?(px|rem|em)$/)) return 'spacing';
  if (value.match(/^\d+(\.\d+)?$/)) return 'zIndex';
  if (value.match(/^(normal|bold|\d{3})$/)) return 'typography';
  if (value.includes('box-shadow') || value.match(/^\d+px\s+\d+px/)) return 'shadow';
  if (value.includes('ms') || value.includes('ease') || value.includes('linear'))
    return 'animation';
  return 'unknown';
};

// Improved color detection that handles more formats
const isColorValue = (value: string): boolean => {
  if (!value) return false;
  const lower = value.toLowerCase().trim();
  return (
    lower.startsWith('#') ||
    lower.startsWith('rgb') ||
    lower.startsWith('hsl') ||
    ['white', 'black', 'transparent', 'inherit', 'currentcolor'].includes(lower)
  );
};

// Convert color value to hex format for HTML color input
const toHexColor = (value: string): string => {
  if (!value) return '#cccccc';
  const trimmed = value.trim();

  // Already a valid 6-digit hex
  if (trimmed.match(/^#[0-9a-fA-F]{6}$/)) return trimmed;

  // 3-digit hex - expand to 6 digits
  if (trimmed.match(/^#[0-9a-fA-F]{3}$/)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }

  // RGB format
  const rgbMatch = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
  }

  // Named colors
  const namedColors: Record<string, string> = {
    white: '#ffffff',
    black: '#000000',
    transparent: '#000000',
  };
  if (namedColors[trimmed.toLowerCase()]) {
    return namedColors[trimmed.toLowerCase()];
  }

  return '#cccccc'; // fallback
};

// Tokens related to each component type - expanded for all primitives
const componentTokens: Record<string, { name: string; token: string; category: TokenCategory }[]> =
  {
    // Form Primitives
    Button: [
      { name: 'Brand BG', token: '--ink-button-brand-bg', category: 'colors' },
      { name: 'Brand Hover', token: '--ink-button-brand-bg-hover', category: 'colors' },
      { name: 'Primary BG', token: '--ink-button-primary-bg', category: 'colors' },
      { name: 'Primary Hover', token: '--ink-button-primary-bg-hover', category: 'colors' },
      { name: 'Primary Text', token: '--ink-button-primary-text', category: 'colors' },
      { name: 'Secondary BG', token: '--ink-button-secondary-bg', category: 'colors' },
      { name: 'Secondary Border', token: '--ink-button-secondary-border', category: 'colors' },
      { name: 'Font Size', token: '--ink-font-button-size', category: 'typography' },
      { name: 'Border Radius', token: '--ink-radius-size-s', category: 'radius' },
      { name: 'Spacing', token: '--ink-spacing-200', category: 'spacing' },
    ],
    IconButton: [
      { name: 'Primary BG', token: '--ink-button-primary-bg', category: 'colors' },
      { name: 'Icon Color', token: '--ink-icon-color-default', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-s', category: 'radius' },
    ],
    ComboButton: [
      { name: 'Brand BG', token: '--ink-button-brand-bg', category: 'colors' },
      { name: 'Brand Hover', token: '--ink-button-brand-bg-hover', category: 'colors' },
      { name: 'Primary BG', token: '--ink-cta-bg-color-primary-default', category: 'colors' },
      { name: 'Primary Text', token: '--ink-button-primary-text', category: 'colors' },
      { name: 'Secondary BG', token: '--ink-cta-bg-color-secondary-default', category: 'colors' },
      {
        name: 'Secondary Border',
        token: '--ink-cta-border-color-secondary-default',
        category: 'colors',
      },
      { name: 'Tertiary BG', token: '--ink-cta-bg-color-tertiary-default', category: 'colors' },
      { name: 'Tertiary Hover', token: '--ink-cta-bg-color-tertiary-hover', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-xs', category: 'radius' },
      { name: 'Transition', token: '--ink-transition-fast', category: 'animation' },
    ],
    Input: [
      { name: 'Background', token: '--ink-form-bg-default', category: 'colors' },
      { name: 'Border', token: '--ink-form-border-default', category: 'colors' },
      { name: 'Border Hover', token: '--ink-form-border-hover', category: 'colors' },
      { name: 'Border Active', token: '--ink-form-border-active', category: 'colors' },
      { name: 'Error Border', token: '--ink-form-border-error', category: 'colors' },
      { name: 'Font Size', token: '--ink-font-size-md', category: 'typography' },
      { name: 'Border Radius', token: '--ink-radius-size-xs', category: 'radius' },
      { name: 'Padding', token: '--ink-spacing-200', category: 'spacing' },
    ],
    Select: [
      { name: 'Background', token: '--ink-form-bg-default', category: 'colors' },
      { name: 'Border', token: '--ink-form-border-default', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-xs', category: 'radius' },
    ],
    Checkbox: [
      { name: 'Checked BG', token: '--ink-form-checked-bg', category: 'colors' },
      { name: 'Border', token: '--ink-form-border-default', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-xs', category: 'radius' },
    ],
    Radio: [
      { name: 'Checked BG', token: '--ink-form-checked-bg', category: 'colors' },
      { name: 'Border', token: '--ink-form-border-default', category: 'colors' },
    ],
    Switch: [
      { name: 'Track BG', token: '--ink-form-bg-default', category: 'colors' },
      { name: 'Checked BG', token: '--ink-form-checked-bg', category: 'colors' },
      { name: 'Transition', token: '--ink-transition-fast', category: 'animation' },
    ],
    TextArea: [
      { name: 'Background', token: '--ink-form-bg-default', category: 'colors' },
      { name: 'Border', token: '--ink-form-border-default', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-xs', category: 'radius' },
    ],
    Slider: [
      { name: 'Track BG', token: '--ink-neutral-30', category: 'colors' },
      { name: 'Fill BG', token: '--ink-cobalt-100', category: 'colors' },
      { name: 'Thumb BG', token: '--ink-white-100', category: 'colors' },
    ],
    // Data Primitives
    Badge: [
      { name: 'Default BG', token: '--ink-status-bg-default', category: 'colors' },
      { name: 'Success BG', token: '--ink-status-bg-success', category: 'colors' },
      { name: 'Warning BG', token: '--ink-status-bg-warning', category: 'colors' },
      { name: 'Error BG', token: '--ink-status-bg-error', category: 'colors' },
      { name: 'Font Size', token: '--ink-font-badge-size', category: 'typography' },
      { name: 'Border Radius', token: '--ink-radius-size-full', category: 'radius' },
      { name: 'Padding', token: '--ink-spacing-100', category: 'spacing' },
    ],
    AlertBadge: [
      { name: 'Emphasis BG', token: '--ink-message-bg-alert', category: 'colors' },
      { name: 'Subtle BG', token: '--ink-status-bg-subtle-inverse', category: 'colors' },
      { name: 'Text Color', token: '--ink-font-color-inverse', category: 'colors' },
      { name: 'Border Color', token: '--ink-border-emphasis-inverse', category: 'colors' },
      { name: 'Font Size', token: '--ink-font-badge-size', category: 'typography' },
      { name: 'Border Radius', token: '--ink-radius-full', category: 'radius' },
    ],
    Avatar: [
      { name: 'Background 1', token: '--ink-recipient-bg-100', category: 'colors' },
      { name: 'Background 2', token: '--ink-recipient-bg-200', category: 'colors' },
      { name: 'Background 3', token: '--ink-recipient-bg-300', category: 'colors' },
      { name: 'Border', token: '--ink-border-default', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-full', category: 'radius' },
    ],
    Chip: [
      { name: 'Background', token: '--ink-item-bg-default', category: 'colors' },
      { name: 'Background Hover', token: '--ink-item-bg-hover', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-full', category: 'radius' },
      { name: 'Padding', token: '--ink-spacing-100', category: 'spacing' },
    ],
    StatusLight: [
      { name: 'Success', token: '--ink-status-bg-success', category: 'colors' },
      { name: 'Warning', token: '--ink-status-bg-warning', category: 'colors' },
      { name: 'Error', token: '--ink-status-bg-error', category: 'colors' },
      { name: 'Info', token: '--ink-status-bg-information', category: 'colors' },
    ],
    ProgressBar: [
      { name: 'Track BG', token: '--ink-bar-bg-default', category: 'colors' },
      { name: 'Fill BG', token: '--ink-bar-fill-default', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-full', category: 'radius' },
    ],
    Spinner: [
      { name: 'Color', token: '--ink-cobalt-100', category: 'colors' },
      { name: 'Animation', token: '--ink-transition-normal', category: 'animation' },
    ],
    // Container Primitives
    Card: [
      { name: 'Background', token: '--ink-bg-default', category: 'colors' },
      { name: 'Border', token: '--ink-border-default', category: 'colors' },
      { name: 'Shadow', token: '--ink-shadow-sm', category: 'shadows' },
      { name: 'Border Radius', token: '--ink-radius-size-m', category: 'radius' },
      { name: 'Padding', token: '--ink-spacing-300', category: 'spacing' },
    ],
    Divider: [
      { name: 'Color', token: '--ink-border-default', category: 'colors' },
      { name: 'Spacing', token: '--ink-spacing-200', category: 'spacing' },
    ],
    Callout: [
      { name: 'Info BG', token: '--ink-message-bg-information', category: 'colors' },
      { name: 'Success BG', token: '--ink-message-bg-success', category: 'colors' },
      { name: 'Warning BG', token: '--ink-message-bg-warning', category: 'colors' },
      { name: 'Error BG', token: '--ink-message-bg-error', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-s', category: 'radius' },
      { name: 'Padding', token: '--ink-spacing-300', category: 'spacing' },
    ],
    Banner: [
      { name: 'Information BG', token: '--ink-cobalt-10', category: 'colors' },
      { name: 'Danger BG', token: '--ink-bg-color-error', category: 'colors' },
      { name: 'Success BG', token: '--ink-bg-color-success', category: 'colors' },
      { name: 'Warning BG', token: '--ink-bg-color-warning', category: 'colors' },
      { name: 'Promo BG', token: '--ink-purple-10', category: 'colors' },
      { name: 'Subtle BG', token: '--ink-neutral-fade-5', category: 'colors' },
      { name: 'Neutral BG', token: '--ink-neutral-110', category: 'colors' },
      { name: 'Border Radius (round)', token: '--ink-radius-size-s', category: 'radius' },
      { name: 'Padding', token: '--ink-spacing-200', category: 'spacing' },
    ],
    Dropdown: [
      { name: 'Glass BG', token: '--ink-bg-glass-frost', category: 'colors' },
      { name: 'Border', token: '--ink-neutral-fade-10', category: 'colors' },
      { name: 'Shadow', token: '--ink-shadow-elevated', category: 'shadows' },
      { name: 'Header Color', token: '--ink-font-color-neutral-subtle', category: 'colors' },
      { name: 'Item Hover', token: '--ink-neutral-fade-5', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-m', category: 'radius' },
      { name: 'Padding', token: '--ink-spacing-100', category: 'spacing' },
      { name: 'Z-Index', token: '--ink-z-dropdown', category: 'zIndex' },
    ],
    Tooltip: [
      { name: 'Background', token: '--ink-neutral-140', category: 'colors' },
      { name: 'Text', token: '--ink-white-100', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-xs', category: 'radius' },
      { name: 'Shadow', token: '--ink-shadow-md', category: 'shadows' },
      { name: 'Z-Index', token: '--ink-z-tooltip', category: 'zIndex' },
    ],
    Skeleton: [
      { name: 'Background', token: '--ink-neutral-20', category: 'colors' },
      { name: 'Animation BG', token: '--ink-neutral-30', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-xs', category: 'radius' },
    ],
    // Typography Primitives
    Text: [
      { name: 'Primary', token: '--ink-font-primary', category: 'colors' },
      { name: 'Secondary', token: '--ink-font-secondary', category: 'colors' },
      { name: 'Tertiary', token: '--ink-font-tertiary', category: 'colors' },
      { name: 'Font Size XS', token: '--ink-font-size-xs', category: 'typography' },
      { name: 'Font Size SM', token: '--ink-font-size-sm', category: 'typography' },
      { name: 'Font Size MD', token: '--ink-font-size-md', category: 'typography' },
      { name: 'Font Size LG', token: '--ink-font-size-lg', category: 'typography' },
    ],
    Heading: [
      { name: 'Color', token: '--ink-font-primary', category: 'colors' },
      { name: 'H1 Size', token: '--ink-font-heading-h1-size', category: 'typography' },
      { name: 'H2 Size', token: '--ink-font-heading-h2-size', category: 'typography' },
      { name: 'H3 Size', token: '--ink-font-heading-h3-size', category: 'typography' },
      { name: 'Font Weight', token: '--ink-font-weight-semibold', category: 'typography' },
    ],
    Link: [
      { name: 'Default', token: '--ink-font-link', category: 'colors' },
      { name: 'Hover', token: '--ink-font-link-hover', category: 'colors' },
      { name: 'Visited', token: '--ink-font-link-visited', category: 'colors' },
    ],
    Icon: [
      { name: 'Default', token: '--ink-icon-color-default', category: 'colors' },
      { name: 'Secondary', token: '--ink-icon-color-secondary', category: 'colors' },
      { name: 'Disabled', token: '--ink-icon-color-disabled', category: 'colors' },
    ],
    // Composites
    Accordion: [
      { name: 'Header Hover BG', token: '--ink-item-bg-color-hover', category: 'colors' },
      { name: 'Selected BG', token: '--ink-item-bg-color-selected-subtle', category: 'colors' },
      { name: 'Border Color', token: '--ink-border-color-subtle', category: 'colors' },
      { name: 'Title Color', token: '--ink-font-color-default', category: 'colors' },
      { name: 'Subtitle Color', token: '--ink-font-color-subtle', category: 'colors' },
      { name: 'Icon Color', token: '--ink-icon-color-secondary', category: 'colors' },
      { name: 'Border Radius', token: '--ink-radius-size-s', category: 'radius' },
      { name: 'Header Padding', token: '--ink-spacing-3', category: 'spacing' },
      { name: 'Content Padding', token: '--ink-spacing-4', category: 'spacing' },
      { name: 'Transition', token: '--ink-transition-normal', category: 'animation' },
    ],
  };

interface InspectorPanelProps {
  activeLayer: LayerView;
  activeSubpage: string;
  liveProps: Record<string, unknown>;
  onPropsChange: (props: Record<string, unknown>) => void;
  onResetProps: () => void;
  onClose: () => void;
}

type ActiveTab = 'props' | 'tokens' | 'code';

export function InspectorPanel({
  activeLayer,
  activeSubpage,
  liveProps,
  onPropsChange,
  onResetProps,
  onClose,
}: InspectorPanelProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('props');
  const [tokens, setTokens] = useState<Record<string, string>>({});
  const [categorizedTokens, setCategorizedTokens] = useState<
    Record<string, Record<string, string>>
  >({});
  const [modifiedTokens, setModifiedTokens] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [previewKey, setPreviewKey] = useState(0); // Force re-render on token change

  // Get component type from subpage
  const componentType = subpageToComponent[activeSubpage];
  const meta = componentType ? componentRegistry[componentType] : null;

  // Load tokens from API
  useEffect(() => {
    const fetchTokens = async () => {
      setTokensLoading(true);
      try {
        const res = await fetch('/api/tokens');
        const data = await res.json();
        if (data.success) {
          setTokens(data.data.tokens);
          setCategorizedTokens(data.data.categorized);
        }
      } catch (error) {
        console.error('Failed to load tokens:', error);
      }
      setTokensLoading(false);
    };
    fetchTokens();
  }, []);

  // Initialize props from registry when component changes
  useEffect(() => {
    if (meta && Object.keys(liveProps).length === 0) {
      const defaultProps: Record<string, unknown> = {};
      meta.props.forEach((prop) => {
        if (prop.defaultValue !== undefined) {
          defaultProps[prop.name] = prop.defaultValue;
        }
      });
      onPropsChange(defaultProps);
    }
  }, [meta, liveProps, onPropsChange]);

  // Handle prop change
  const handlePropChange = useCallback(
    (propName: string, value: unknown) => {
      onPropsChange({ ...liveProps, [propName]: value });
    },
    [liveProps, onPropsChange]
  );

  // Handle token change (live preview via CSS variable - scoped to preview only)
  const handleTokenChange = useCallback(
    (tokenName: string, value: string) => {
      setModifiedTokens((prev) => ({ ...prev, [tokenName]: value }));

      // Resolve the value if it's a token reference
      let resolvedValue = value;
      if (value.startsWith('var(') && Object.keys(tokens).length > 0) {
        const varMatch = value.match(/var\((--[^)]+)\)/);
        if (varMatch && tokens[varMatch[1]]) {
          resolvedValue = tokens[varMatch[1]];
        }
      }

      // Apply live preview ONLY to the preview container (not globally)
      const previewContainer = document.querySelector('[data-inspector-preview="true"]');
      if (previewContainer) {
        (previewContainer as HTMLElement).style.setProperty(tokenName, resolvedValue);
      }

      // Force re-render of preview components
      setPreviewKey((k) => k + 1);
    },
    [tokens]
  );

  // Get available tokens for dropdown based on category and token type
  const getAvailableTokensForCategory = useCallback(
    (category: TokenCategory, currentToken?: string): { name: string; value: string }[] => {
      const result: { name: string; value: string }[] = [];

      // Map our internal categories to API categories
      const categoryMapping: Record<TokenCategory, string[]> = {
        colors: ['color-primitives', 'semantic-colors', 'component-colors'],
        spacing: ['spacing'],
        typography: ['typography'],
        radius: ['radius'],
        shadows: ['shadow'],
        animation: ['animation'],
        zIndex: ['z-index'],
      };

      const apiCategories = categoryMapping[category] || [];

      // Determine token type for more specific filtering
      const tokenType = currentToken ? getTokenType(currentToken) : null;

      apiCategories.forEach((apiCat) => {
        const catTokens = categorizedTokens[apiCat];
        if (catTokens) {
          Object.entries(catTokens).forEach(([name, value]) => {
            // For typography, filter by specific type (size, weight, family, line-height)
            if (category === 'typography' && tokenType) {
              if (tokenType === 'size' && !name.includes('size')) return;
              if (tokenType === 'weight' && !name.includes('weight')) return;
              if (tokenType === 'family' && !name.includes('family')) return;
              if (tokenType === 'line-height' && !name.includes('line-height')) return;
            }

            // For colors, prefer semantic/component tokens over primitives
            if (category === 'colors') {
              // Prioritize component and semantic colors, skip raw color primitives unless needed
              if (apiCat === 'color-primitives' && result.length > 20) return;
            }

            result.push({ name, value });
          });
        }
      });

      // Limit results to prevent overwhelming dropdowns
      return result.slice(0, 30);
    },
    [categorizedTokens]
  );

  // Helper to determine token type for filtering
  const getTokenType = (token: string): string | null => {
    const lower = token.toLowerCase();
    if (lower.includes('size')) return 'size';
    if (lower.includes('weight')) return 'weight';
    if (lower.includes('family')) return 'family';
    if (lower.includes('line-height')) return 'line-height';
    return null;
  };

  // Save tokens to file
  const handleSaveTokens = async () => {
    try {
      const mergedTokens = { ...tokens, ...modifiedTokens };
      await fetch('/api/tokens/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: mergedTokens }),
      });
      setTokens(mergedTokens);
      setModifiedTokens({});
    } catch (error) {
      console.error('Failed to save tokens:', error);
    }
  };

  // Generate code from props
  const generateCode = useCallback(() => {
    if (!componentType) return '';

    const propsEntries = Object.entries(liveProps).filter(
      ([key, val]) => val !== undefined && val !== '' && key !== 'children'
    );

    const propsStr = propsEntries
      .map(([key, val]) => {
        if (typeof val === 'string') return `  ${key}="${val}"`;
        if (typeof val === 'boolean') return val ? `  ${key}` : '';
        return `  ${key}={${JSON.stringify(val)}}`;
      })
      .filter(Boolean)
      .join('\n');

    const children = liveProps.children as string | undefined;

    if (!children && !propsStr) {
      return `<${componentType} />`;
    }

    if (!children) {
      return `<${componentType}\n${propsStr}\n/>`;
    }

    if (!propsStr) {
      return `<${componentType}>\n  ${children}\n</${componentType}>`;
    }

    return `<${componentType}\n${propsStr}\n>\n  ${children}\n</${componentType}>`;
  }, [componentType, liveProps]);

  // Copy code to clipboard
  const handleCopyCode = useCallback(() => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generateCode]);

  // Get relevant tokens for current component
  // Get tokens and filter by current variant/kind
  const relevantTokens = useMemo(() => {
    if (!componentType) return [];

    const allTokens = componentTokens[componentType] || [];

    // For components with variants (like Button), filter to show only relevant tokens
    const currentKind = liveProps.kind as string | undefined;
    const currentVariant = liveProps.variant as string | undefined;
    const variantKey = currentKind || currentVariant;

    if (!variantKey) return allTokens;

    // Filter tokens based on variant - keep tokens that:
    // 1. Match the current variant (case-insensitive)
    // 2. Are common tokens (not variant-specific) like spacing, radius, typography
    return allTokens.filter((tokenDef) => {
      const tokenLower = tokenDef.token.toLowerCase();
      const nameLower = tokenDef.name.toLowerCase();
      const variantLower = variantKey.toLowerCase();

      // Always include non-color tokens (spacing, typography, radius, etc.)
      if (tokenDef.category !== 'colors') return true;

      // For color tokens, check if it matches the current variant
      // e.g., "primary" matches "--ink-button-primary-bg"
      if (tokenLower.includes(variantLower) || nameLower.includes(variantLower)) {
        return true;
      }

      // Exclude other variant-specific tokens
      const otherVariants = [
        'brand',
        'primary',
        'secondary',
        'tertiary',
        'danger',
        'success',
        'warning',
        'error',
        'info',
      ];
      const isOtherVariant = otherVariants.some(
        (v) => v !== variantLower && (tokenLower.includes(v) || nameLower.toLowerCase().includes(v))
      );

      return !isOtherVariant;
    });
  }, [componentType, liveProps.kind, liveProps.variant]);

  // Resolve token value (handle var() references)
  const resolveTokenValue = (value: string): string => {
    const match = value.match(/var\((--[^)]+)\)/);
    if (match && tokens[match[1]]) {
      return resolveTokenValue(tokens[match[1]]);
    }
    return value;
  };

  // Check if we're on a component page (not tokens)
  const isComponentPage = activeLayer !== 'tokens' && componentType;

  if (!isComponentPage) {
    return (
      <aside className={styles.inspectorPanel}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.componentName}>Inspector</span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <Icon name="close" size="small" />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.emptyState}>
            <Icon name="settings" size="large" className={styles.emptyIcon} />
            <div className={styles.emptyText}>
              Select a component from the sidebar to inspect and edit its properties.
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.inspectorPanel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Icon name={meta?.icon || 'star'} size="small" className={styles.componentIcon} />
          <span className={styles.componentName}>{meta?.name || componentType}</span>
          <span className={styles.layerBadge} data-layer={activeLayer}>
            L{meta?.layer}
          </span>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <Icon name="close" size="small" />
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={styles.tab}
          data-active={activeTab === 'props'}
          onClick={() => setActiveTab('props')}
        >
          Props
        </button>
        <button
          className={styles.tab}
          data-active={activeTab === 'tokens'}
          onClick={() => setActiveTab('tokens')}
        >
          Tokens
        </button>
        <button
          className={styles.tab}
          data-active={activeTab === 'code'}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Props Tab */}
        {activeTab === 'props' && meta && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Properties</div>
              {meta.props.length > 0 && (
                <button
                  className={styles.resetButton}
                  onClick={onResetProps}
                  title="Reset to Default"
                >
                  <Icon name="refresh" size="small" />
                  Reset
                </button>
              )}
            </div>
            {meta.props.length === 0 ? (
              <div className={styles.emptyText}>No configurable props for this component.</div>
            ) : (
              meta.props.map((propDef) => (
                <div key={propDef.name} className={styles.propRow}>
                  <label className={styles.propLabel}>{propDef.name}</label>
                  <div className={styles.propInput}>
                    {propDef.type === 'string' && (
                      <input
                        type="text"
                        className={styles.propInputSmall}
                        value={(liveProps[propDef.name] as string) || ''}
                        onChange={(e) => handlePropChange(propDef.name, e.target.value)}
                        placeholder={propDef.description}
                      />
                    )}
                    {propDef.type === 'number' && (
                      <input
                        type="number"
                        className={styles.propInputSmall}
                        value={(liveProps[propDef.name] as number) || ''}
                        onChange={(e) => handlePropChange(propDef.name, Number(e.target.value))}
                      />
                    )}
                    {propDef.type === 'boolean' && (
                      <div className={styles.propSwitch}>
                        <Switch
                          checked={Boolean(liveProps[propDef.name])}
                          onChange={(checked) => handlePropChange(propDef.name, checked)}
                        />
                      </div>
                    )}
                    {propDef.type === 'select' && propDef.options && (
                      <select
                        className={styles.propSelect}
                        value={(liveProps[propDef.name] as string) || ''}
                        onChange={(e) => handlePropChange(propDef.name, e.target.value)}
                      >
                        <option value="">Select...</option>
                        {propDef.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                    {propDef.type === 'icon' && (
                      <select
                        className={styles.propSelect}
                        value={(liveProps[propDef.name] as string) || ''}
                        onChange={(e) => handlePropChange(propDef.name, e.target.value)}
                      >
                        <option value="">None</option>
                        {AVAILABLE_ICONS.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tokens Tab */}
        {activeTab === 'tokens' && (
          <div className={styles.section}>
            {tokensLoading ? (
              <div className={styles.emptyText}>Loading tokens...</div>
            ) : relevantTokens.length === 0 ? (
              <div className={styles.emptyText}>
                No specific tokens mapped for this component yet.
              </div>
            ) : (
              // Group tokens by category
              (() => {
                const grouped = relevantTokens.reduce(
                  (acc, tokenDef) => {
                    const cat = tokenDef.category;
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(tokenDef);
                    return acc;
                  },
                  {} as Record<TokenCategory, typeof relevantTokens>
                );

                const categoryOrder: TokenCategory[] = [
                  'colors',
                  'spacing',
                  'typography',
                  'radius',
                  'shadows',
                  'animation',
                  'zIndex',
                ];

                return categoryOrder.map((category) => {
                  const categoryTokens = grouped[category];
                  if (!categoryTokens || categoryTokens.length === 0) return null;

                  return (
                    <div key={category} className={styles.tokenCategory}>
                      <div className={styles.tokenCategoryHeader}>
                        <span className={styles.tokenCategoryLabel}>
                          {TOKEN_CATEGORY_LABELS[category]}
                        </span>
                        <span className={styles.tokenCategoryCount}>{categoryTokens.length}</span>
                      </div>
                      {categoryTokens.map(({ name, token }) => {
                        const currentValue = modifiedTokens[token] || tokens[token] || '';
                        const resolvedValue = resolveTokenValue(currentValue);
                        const isColor = isColorValue(resolvedValue);

                        return (
                          <div key={token} className={styles.tokenRow}>
                            {/* Color Preview */}
                            {category === 'colors' && (
                              <input
                                type="color"
                                className={styles.tokenSwatch}
                                value={toHexColor(resolvedValue)}
                                onChange={(e) => handleTokenChange(token, e.target.value)}
                                style={{
                                  backgroundColor: isColor
                                    ? resolvedValue
                                    : 'var(--ink-neutral-30)',
                                }}
                              />
                            )}

                            {/* Spacing Preview */}
                            {category === 'spacing' && (
                              <div className={styles.tokenPreviewSpacing}>
                                <div
                                  className={styles.spacingBar}
                                  style={{ width: resolvedValue || '16px' }}
                                />
                              </div>
                            )}

                            {/* Typography Preview */}
                            {category === 'typography' && (
                              <div className={styles.tokenPreviewTypography}>
                                <span
                                  className={styles.typographySample}
                                  style={{
                                    fontSize: token.includes('size') ? resolvedValue : undefined,
                                    fontWeight: token.includes('weight')
                                      ? resolvedValue
                                      : undefined,
                                  }}
                                >
                                  Aa
                                </span>
                              </div>
                            )}

                            {/* Radius Preview */}
                            {category === 'radius' && (
                              <div className={styles.tokenPreviewRadius}>
                                <div
                                  className={styles.radiusBox}
                                  style={{ borderRadius: resolvedValue || '4px' }}
                                />
                              </div>
                            )}

                            {/* Shadow Preview */}
                            {category === 'shadows' && (
                              <div className={styles.tokenPreviewShadow}>
                                <div
                                  className={styles.shadowBox}
                                  style={{
                                    boxShadow: resolvedValue || '0 2px 4px rgba(0,0,0,0.1)',
                                  }}
                                />
                              </div>
                            )}

                            {/* Animation Preview */}
                            {category === 'animation' && (
                              <div className={styles.tokenPreviewAnimation}>
                                <div className={styles.animationIcon}>⏱</div>
                              </div>
                            )}

                            {/* Z-Index Preview */}
                            {category === 'zIndex' && (
                              <div className={styles.tokenPreviewZIndex}>
                                <div className={styles.zIndexLayers}>
                                  <div className={styles.zIndexLayer} />
                                  <div className={styles.zIndexLayer} />
                                  <div className={styles.zIndexLayer} />
                                </div>
                              </div>
                            )}

                            <div className={styles.tokenInfo}>
                              <div className={styles.tokenName}>{name}</div>
                              <div className={styles.tokenValue}>{token}</div>
                            </div>
                            <select
                              className={styles.tokenSelect}
                              value={modifiedTokens[token] || '__current__'}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue !== '__current__') {
                                  handleTokenChange(token, newValue);
                                }
                              }}
                            >
                              <option value="__current__">
                                Current: {resolvedValue.slice(0, 12)}
                                {resolvedValue.length > 12 ? '...' : ''}
                              </option>
                              {getAvailableTokensForCategory(category, token).map(
                                ({ name: tokenName }) => (
                                  <option key={tokenName} value={`var(${tokenName})`}>
                                    {tokenName.replace('--ink-', '')}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  );
                });
              })()
            )}
          </div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLabel}>JSX</span>
              <button className={styles.copyButton} data-copied={copied} onClick={handleCopyCode}>
                <Icon name={copied ? 'check' : 'copy'} size="small" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>{generateCode()}</pre>
          </div>
        )}
      </div>

      {/* Save Button (for tokens) */}
      {activeTab === 'tokens' && Object.keys(modifiedTokens).length > 0 && (
        <div className={styles.saveSection}>
          <button className={styles.saveButton} onClick={handleSaveTokens}>
            Save Token Changes
          </button>
        </div>
      )}
    </aside>
  );
}

export default InspectorPanel;
