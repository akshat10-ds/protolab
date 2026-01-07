import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Stack, Icon } from '@/design-system';
import { SidebarNav, LayerView, layerSubpages } from './showcase/components/SidebarNav';
import { InspectorPanel } from './showcase/components/InspectorPanel';
import { TokensShowcase } from './showcase/layers/TokensShowcase';
import { UtilitiesShowcase } from './showcase/layers/UtilitiesShowcase';
import { PrimitivesShowcase } from './showcase/layers/PrimitivesShowcase';
import { CompositesShowcase } from './showcase/layers/CompositesShowcase';
import { PatternsShowcase } from './showcase/layers/PatternsShowcase';
import { LayoutsShowcase } from './showcase/layers/LayoutsShowcase';
import { InteractivePreview } from './showcase/components/InteractivePreview';
import { componentRegistry } from '@/editor/registry/componentRegistry';
import styles from './showcase/Showcase.module.css';

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

const layerLabels: Record<LayerView, string> = {
  tokens: 'Tokens',
  utilities: 'Utilities',
  primitives: 'Primitives',
  composites: 'Composites',
  patterns: 'Patterns',
  layouts: 'Layouts',
};

const layerNumbers: Record<LayerView, string> = {
  tokens: 'L1',
  utilities: 'L2',
  primitives: 'L3',
  composites: 'L4',
  patterns: 'L5',
  layouts: 'L6',
};

const componentDescriptions: Record<string, string> = {
  button: 'Primary action component with multiple variants and states',
  iconbutton: 'Icon-only button for compact actions',
  link: 'Navigation and action links with various styles',
  input: 'Text input field with validation states',
  select: 'Dropdown selection component',
  checkbox: 'Binary selection control',
  radio: 'Single selection from multiple options',
  switch: 'Toggle control for binary settings',
  textarea: 'Multi-line text input',
  slider: 'Range selection control',
  stepper: 'Numeric increment/decrement control',
  badge: 'Status and count indicators',
  avatar: 'User representation component',
  chip: 'Compact interactive elements',
  'alert-badge': 'Notification count indicator',
  'status-light': 'Visual status indicator',
  divider: 'Content separation element',
  card: 'Content container with optional sections',
  skeleton: 'Loading placeholder',
  typography: 'Text styling components',
  spinner: 'Loading indicator',
  progressbar: 'Progress visualization',
  callout: 'Highlighted information block',
  banner: 'Full-width notification',
  tooltip: 'Contextual information overlay',
  icon: 'Iconography system',
  // Composites
  searchinput: 'Input with search functionality',
  fileinput: 'File selection input',
  combobox: 'Searchable dropdown selection',
  datepicker: 'Date selection component',
  fileupload: 'Drag and drop file upload',
  filtertag: 'Removable filter indicators',
  breadcrumb: 'Navigation path indicator',
  pagination: 'Page navigation controls',
  tabs: 'Content organization with tabs',
  accordion: 'Collapsible content sections',
  combobutton: 'Button with dropdown actions',
  modal: 'Overlay dialog component',
  dropdown: 'Contextual action menu',
  alert: 'Inline notification component',
  table: 'Data table with sorting and selection',
  list: 'Structured list component',
  // Patterns
  globalnav: 'Application header navigation',
  localnav: 'Section-level navigation',
  // Layouts
  'docusign-shell': 'Application shell layout',
  // Tokens
  'color-primitives': 'Base color palette',
  'semantic-colors': 'Purpose-driven color tokens',
  'typography-tokens': 'Type scale and styles',
  'semantic-typography': 'Text style tokens',
  'component-tokens': 'Component-specific values',
  'state-tokens': 'Interactive state colors',
  spacing: 'Spacing scale',
  'border-radius': 'Corner radius values',
  shadows: 'Elevation shadows',
  // Utilities
  stack: 'Vertical layout utility',
  grid: 'Grid layout utility',
  inline: 'Horizontal layout utility',
  container: 'Content container utility',
  spacer: 'Spacing utility',
};

export default function ComponentShowcase() {
  const [activeLayer, setActiveLayer] = useState<LayerView>('primitives');
  const [activeSubpage, setActiveSubpage] = useState<string>('button');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [liveProps, setLiveProps] = useState<Record<string, unknown>>({});
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Reset live props and selection when component changes
  useEffect(() => {
    setLiveProps({});
    setSelectedComponentId(null);
  }, [activeSubpage]);

  // Handle component selection from showcase examples
  const handleComponentSelect = useCallback(
    (componentId: string, props: Record<string, unknown>) => {
      setSelectedComponentId(componentId);
      setLiveProps(props);
      // Auto-open inspector if closed
      if (!inspectorOpen) {
        setInspectorOpen(true);
      }
    },
    [inspectorOpen]
  );

  // Reset props to default values from component registry
  const handleResetProps = useCallback(() => {
    const componentType = subpageToComponent[activeSubpage];
    if (!componentType) return;

    const meta = componentRegistry[componentType];
    if (!meta) return;

    const defaultProps: Record<string, unknown> = {};
    meta.props.forEach((prop) => {
      if (prop.defaultValue !== undefined) {
        defaultProps[prop.name] = prop.defaultValue;
      }
    });

    setLiveProps(defaultProps);
    setSelectedComponentId(null);
  }, [activeSubpage]);

  // Handle click outside to deselect
  const handleContentClick = useCallback(
    (e: React.MouseEvent) => {
      // Check if click is on a selectable component or its descendants
      const target = e.target as HTMLElement;
      const isOnSelectable = target.closest('[data-selectable-component]');

      // Only deselect if clicking on empty space (not on a selectable component)
      if (!isOnSelectable && selectedComponentId) {
        setSelectedComponentId(null);
      }
    },
    [selectedComponentId]
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Scroll to top when subpage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSubpage]);

  // Show back to top button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cmd+K to open command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
        setSearchQuery('');
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus command palette input when opened
  useEffect(() => {
    if (showCommandPalette) {
      setTimeout(() => commandInputRef.current?.focus(), 50);
    }
  }, [showCommandPalette]);

  // Get current subpage label
  const getCurrentSubpageLabel = () => {
    const subpages = layerSubpages[activeLayer];
    const current = subpages.find((s) => s.id === activeSubpage);
    return current?.label || activeSubpage;
  };

  // Handle search result selection
  const handleSearchSelect = useCallback((layer: LayerView, subpageId: string) => {
    setActiveLayer(layer);
    setActiveSubpage(subpageId);
    setSearchQuery('');
    setShowCommandPalette(false);
  }, []);

  // Get search results grouped by layer
  const getSearchResults = () => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const results: Record<LayerView, { id: string; label: string }[]> = {
      tokens: [],
      utilities: [],
      primitives: [],
      composites: [],
      patterns: [],
      layouts: [],
    };

    for (const [layerId, subpages] of Object.entries(layerSubpages)) {
      for (const subpage of subpages) {
        if (subpage.label.toLowerCase().includes(query) || subpage.id.includes(query)) {
          results[layerId as LayerView].push(subpage);
        }
      }
    }

    return results;
  };

  const searchResults = getSearchResults();
  const hasResults = searchResults && Object.values(searchResults).some((arr) => arr.length > 0);

  const renderContent = () => {
    switch (activeLayer) {
      case 'tokens':
        return <TokensShowcase activeSubpage={activeSubpage} />;
      case 'utilities':
        return <UtilitiesShowcase activeSubpage={activeSubpage} />;
      case 'primitives':
        return (
          <PrimitivesShowcase
            activeSubpage={activeSubpage}
            selectedComponentId={selectedComponentId}
            onComponentSelect={handleComponentSelect}
          />
        );
      case 'composites':
        return <CompositesShowcase activeSubpage={activeSubpage} />;
      case 'patterns':
        return <PatternsShowcase activeSubpage={activeSubpage} />;
      case 'layouts':
        return <LayoutsShowcase activeSubpage={activeSubpage} />;
      default:
        return null;
    }
  };

  const layerColors: Record<LayerView, { bg: string; text: string }> = {
    tokens: { bg: '#FFF5E6', text: '#B35900' },
    utilities: { bg: '#E6F7FF', text: '#0066CC' },
    primitives: { bg: '#F0FFF4', text: '#2E7D32' },
    composites: { bg: '#FFF0F5', text: '#C2185B' },
    patterns: { bg: '#F3E5F5', text: '#7B1FA2' },
    layouts: { bg: '#E8EAF6', text: '#3F51B5' },
  };

  return (
    <div className={styles.showcaseContainer}>
      {/* Sidebar */}
      <SidebarNav
        activeLayer={activeLayer}
        activeSubpage={activeSubpage}
        onLayerChange={setActiveLayer}
        onSubpageChange={setActiveSubpage}
        onOpenSearch={() => setShowCommandPalette(true)}
      />

      {/* Main Content */}
      <div
        className={styles.mainContent}
        key={activeSubpage}
        data-inspector-open={inspectorOpen}
        onClick={handleContentClick}
      >
        <Stack gap="large">
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <span
              className={styles.breadcrumbLink}
              onClick={() => setActiveSubpage(layerSubpages[activeLayer][0].id)}
            >
              {layerLabels[activeLayer]}
            </span>
            <Icon name="chevron-right" size={12} className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbLink}>{getCurrentSubpageLabel()}</span>
          </div>

          {/* Component Header */}
          <div className={styles.componentHeader}>
            <span className={styles.layerBadge} data-layer={activeLayer}>
              {layerNumbers[activeLayer]}
            </span>
            <div>
              <h1 className={styles.componentTitle}>{getCurrentSubpageLabel()}</h1>
              <p className={styles.componentDesc}>
                {componentDescriptions[activeSubpage] || 'Component documentation'}
              </p>
            </div>
          </div>

          {/* Interactive Preview - only show for components (not tokens) */}
          {activeLayer !== 'tokens' && (
            <InteractivePreview activeSubpage={activeSubpage} liveProps={liveProps} />
          )}

          {/* Dynamic Content */}
          <div className={styles.contentSection}>{renderContent()}</div>
        </Stack>
      </div>

      {/* Inspector Toggle Button */}
      <button
        className={styles.inspectorToggle}
        data-open={inspectorOpen}
        onClick={() => setInspectorOpen(!inspectorOpen)}
        aria-label={inspectorOpen ? 'Close inspector' : 'Open inspector'}
      >
        <Icon name={inspectorOpen ? 'chevron-right' : 'chevron-left'} size={16} />
      </button>

      {/* Inspector Panel */}
      {inspectorOpen && (
        <InspectorPanel
          activeLayer={activeLayer}
          activeSubpage={activeSubpage}
          liveProps={liveProps}
          onPropsChange={setLiveProps}
          onResetProps={handleResetProps}
          onClose={() => setInspectorOpen(false)}
        />
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <Icon name="chevron-up" size={16} />
        </button>
      )}

      {/* Command Palette */}
      {showCommandPalette && (
        <div
          className={styles.commandPaletteOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCommandPalette(false);
          }}
        >
          <div className={styles.commandPalette}>
            <div className={styles.commandPaletteHeader}>
              <Icon name="search" size={18} className={styles.commandPaletteIcon} />
              <input
                ref={commandInputRef}
                type="text"
                className={styles.commandPaletteInput}
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <kbd className={styles.commandPaletteKbd}>esc</kbd>
            </div>
            <div className={styles.commandPaletteResults}>
              {!searchQuery.trim() ? (
                <div className={styles.commandPaletteEmpty}>
                  Type to search across all components...
                </div>
              ) : !hasResults ? (
                <div className={styles.commandPaletteEmpty}>No results for "{searchQuery}"</div>
              ) : (
                Object.entries(searchResults!).map(([layerId, items]) => {
                  if (items.length === 0) return null;
                  const layer = layerId as LayerView;
                  return (
                    <div key={layerId} className={styles.commandPaletteGroup}>
                      <div className={styles.commandPaletteGroupLabel}>{layerLabels[layer]}</div>
                      {items.map((item) => (
                        <button
                          key={item.id}
                          className={styles.commandPaletteItem}
                          onClick={() => handleSearchSelect(layer, item.id)}
                        >
                          <span className={styles.commandPaletteItemName}>{item.label}</span>
                          <span
                            className={styles.commandPaletteItemBadge}
                            style={{
                              background: layerColors[layer].bg,
                              color: layerColors[layer].text,
                            }}
                          >
                            {layerNumbers[layer]}
                          </span>
                        </button>
                      ))}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
