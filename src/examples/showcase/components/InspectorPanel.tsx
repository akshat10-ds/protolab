/**
 * InspectorPanel - Figma-style property editor for components
 *
 * Features:
 * - Edit component props with live preview
 * - View/edit related design tokens
 * - Copy generated code
 */

import React, { useState, useEffect, useCallback } from 'react';
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

// Tokens related to each component type
const componentTokens: Record<string, { name: string; token: string }[]> = {
  Button: [
    { name: 'Primary BG', token: '--ink-button-primary-bg' },
    { name: 'Primary Hover', token: '--ink-button-primary-bg-hover' },
    { name: 'Primary Text', token: '--ink-button-primary-text' },
    { name: 'Brand BG', token: '--ink-button-brand-bg' },
    { name: 'Secondary BG', token: '--ink-button-secondary-bg' },
    { name: 'Secondary Border', token: '--ink-button-secondary-border' },
  ],
  Input: [
    { name: 'Background', token: '--ink-form-bg-default' },
    { name: 'Border', token: '--ink-form-border-default' },
    { name: 'Border Hover', token: '--ink-form-border-hover' },
    { name: 'Border Active', token: '--ink-form-border-active' },
    { name: 'Error Border', token: '--ink-form-border-error' },
  ],
  Card: [
    { name: 'Background', token: '--ink-bg-default' },
    { name: 'Border', token: '--ink-border-default' },
    { name: 'Shadow SM', token: '--ink-shadow-sm' },
  ],
  Badge: [
    { name: 'Default BG', token: '--ink-status-bg-default' },
    { name: 'Success BG', token: '--ink-status-bg-success' },
    { name: 'Warning BG', token: '--ink-status-bg-warning' },
    { name: 'Error BG', token: '--ink-status-bg-error' },
  ],
  Avatar: [
    { name: 'Recipient BG', token: '--ink-recipient-bg-100' },
    { name: 'Border', token: '--ink-border-default' },
  ],
};

interface InspectorPanelProps {
  activeLayer: LayerView;
  activeSubpage: string;
  liveProps: Record<string, unknown>;
  onPropsChange: (props: Record<string, unknown>) => void;
  onClose: () => void;
}

type ActiveTab = 'props' | 'tokens' | 'code';

export function InspectorPanel({
  activeLayer,
  activeSubpage,
  liveProps,
  onPropsChange,
  onClose,
}: InspectorPanelProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('props');
  const [tokens, setTokens] = useState<Record<string, string>>({});
  const [modifiedTokens, setModifiedTokens] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [tokensLoading, setTokensLoading] = useState(false);

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

  // Handle token change (live preview via CSS variable)
  const handleTokenChange = useCallback((tokenName: string, value: string) => {
    setModifiedTokens((prev) => ({ ...prev, [tokenName]: value }));
    // Apply live preview
    document.documentElement.style.setProperty(tokenName, value);
  }, []);

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
  const relevantTokens = componentType ? componentTokens[componentType] || [] : [];

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
            <Icon name="x" size="small" />
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
          <Icon name="x" size="small" />
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
            <div className={styles.sectionTitle}>Properties</div>
            {meta.props.map((propDef) => (
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
                        onChange={(e) => handlePropChange(propDef.name, e.target.checked)}
                        size="small"
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
            ))}
          </div>
        )}

        {/* Tokens Tab */}
        {activeTab === 'tokens' && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Related Tokens</div>
            {relevantTokens.length === 0 ? (
              <div className={styles.emptyText}>
                No specific tokens mapped for this component yet.
              </div>
            ) : (
              relevantTokens.map(({ name, token }) => {
                const currentValue = modifiedTokens[token] || tokens[token] || '';
                const resolvedValue = resolveTokenValue(currentValue);
                const isColor = resolvedValue.startsWith('#') || resolvedValue.startsWith('rgb');

                return (
                  <div key={token} className={styles.tokenRow}>
                    {isColor && (
                      <input
                        type="color"
                        className={styles.tokenSwatch}
                        value={resolvedValue}
                        onChange={(e) => handleTokenChange(token, e.target.value)}
                        style={{ backgroundColor: resolvedValue }}
                      />
                    )}
                    {!isColor && (
                      <div
                        className={styles.tokenSwatch}
                        style={{ background: 'var(--ink-neutral-20)' }}
                      />
                    )}
                    <div className={styles.tokenInfo}>
                      <div className={styles.tokenName}>{name}</div>
                      <div className={styles.tokenValue}>{token}</div>
                    </div>
                    <input
                      type="text"
                      className={styles.tokenInput}
                      value={modifiedTokens[token] || ''}
                      placeholder={resolvedValue.slice(0, 10)}
                      onChange={(e) => handleTokenChange(token, e.target.value)}
                    />
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLabel}>JSX</span>
              <button
                className={styles.copyButton}
                data-copied={copied}
                onClick={handleCopyCode}
              >
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
