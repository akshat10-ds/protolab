import React, { useState, useEffect } from 'react';
import { Stack, Icon } from '@/design-system';
import styles from '../Showcase.module.css';

export type LayerView =
  | 'tokens'
  | 'utilities'
  | 'primitives'
  | 'composites'
  | 'patterns'
  | 'layouts';

export const layerSubpages: Record<LayerView, { id: string; label: string }[]> = {
  tokens: [
    { id: 'color-primitives', label: 'Color Primitives' },
    { id: 'semantic-colors', label: 'Semantic Colors' },
    { id: 'typography-tokens', label: 'Typography Primitives' },
    { id: 'semantic-typography', label: 'Semantic Typography' },
    { id: 'component-tokens', label: 'Component Tokens' },
    { id: 'state-tokens', label: 'State Tokens' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'border-radius', label: 'Border & Radius' },
    { id: 'shadows', label: 'Shadows' },
    { id: 'motion', label: 'Motion' },
    { id: 'link-tokens', label: 'Link Tokens' },
    { id: 'fab-tokens', label: 'FAB Tokens' },
    { id: 'gradients', label: 'Gradients' },
    { id: 'tag-tokens', label: 'Tag Tokens' },
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
    { id: 'badge', label: 'Badge' },
    { id: 'avatar', label: 'Avatar' },
    { id: 'alert-badge', label: 'AlertBadge' },
    { id: 'status-light', label: 'StatusLight' },
    { id: 'divider', label: 'Divider' },
    { id: 'card', label: 'Card' },
    { id: 'skeleton', label: 'Skeleton' },
    { id: 'typography', label: 'Typography' },
    { id: 'spinner', label: 'Spinner' },
    { id: 'progressbar', label: 'ProgressBar' },
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
    { id: 'stepper', label: 'Stepper' },
    { id: 'combobutton', label: 'ComboButton' },
    { id: 'modal', label: 'Modal' },
    { id: 'dropdown', label: 'Dropdown' },
    { id: 'callout', label: 'Callout' },
    { id: 'alert', label: 'Alert' },
    { id: 'banner', label: 'Banner' },
    { id: 'ai-badge', label: 'AIBadge' },
    { id: 'chip', label: 'Chip' },
    { id: 'table', label: 'Table' },
    { id: 'list', label: 'List' },
  ],
  patterns: [
    { id: 'globalnav', label: 'GlobalNav' },
    { id: 'localnav', label: 'LocalNav' },
    { id: 'aichat', label: 'AIChat' },
  ],
  layouts: [{ id: 'docusign-shell', label: 'DocuSignShell' }],
};

const layers: { id: LayerView; label: string; number: string; count: number }[] = [
  { id: 'tokens', label: 'Tokens', number: '01', count: 14 },
  { id: 'utilities', label: 'Utilities', number: '02', count: 5 },
  { id: 'primitives', label: 'Primitives', number: '03', count: 22 },
  { id: 'composites', label: 'Composites', number: '04', count: 21 },
  { id: 'patterns', label: 'Patterns', number: '05', count: 3 },
  { id: 'layouts', label: 'Layouts', number: '06', count: 1 },
];

export interface SidebarNavProps {
  activeLayer: LayerView;
  activeSubpage: string;
  onLayerChange: (layer: LayerView) => void;
  onSubpageChange: (subpage: string) => void;
  onOpenSearch: () => void;
}

const STORAGE_KEY = 'showcase-expanded-layers';

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeLayer,
  activeSubpage,
  onLayerChange,
  onSubpageChange,
  onOpenSearch,
}) => {
  // Initialize expanded state from localStorage
  const [expandedLayers, setExpandedLayers] = useState<Set<LayerView>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return new Set(JSON.parse(stored) as LayerView[]);
      }
    } catch {
      // Ignore localStorage errors
    }
    return new Set([activeLayer]);
  });

  // Persist expanded state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...expandedLayers]));
    } catch {
      // Ignore localStorage errors
    }
  }, [expandedLayers]);

  // Auto-expand when navigating to a new layer (but don't prevent manual collapse)
  useEffect(() => {
    setExpandedLayers((prev) => new Set([...prev, activeLayer]));
  }, [activeLayer]);

  const toggleLayer = (layerId: LayerView) => {
    setExpandedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  return (
    <div className={styles.sidebar}>
      {/* Search Trigger */}
      <div className={styles.sidebarSearch}>
        <button onClick={onOpenSearch} className={styles.searchTrigger}>
          <Icon name="search" size={14} />
          <span>Search...</span>
          <kbd>⌘K</kbd>
        </button>
      </div>

      {/* Navigation */}
      <div className={styles.sidebarNav}>
        <Stack gap="none">
          {layers.map((layer) => {
            const isExpanded = expandedLayers.has(layer.id);
            const isActive = activeLayer === layer.id;

            return (
              <Stack key={layer.id} gap="none">
                {/* Layer Header */}
                <button
                  onClick={() => {
                    if (isActive) {
                      toggleLayer(layer.id);
                    } else {
                      onLayerChange(layer.id);
                      onSubpageChange(layerSubpages[layer.id][0].id);
                    }
                  }}
                  className={styles.layerButton}
                  data-active={isActive}
                >
                  <Icon
                    name="chevron-right"
                    size={12}
                    className={styles.layerChevron}
                    data-expanded={isExpanded}
                  />
                  <span className={styles.layerNumber}>{layer.number}</span>
                  <span className={styles.layerLabel} data-active={isActive}>
                    {layer.label}
                  </span>
                  <span className={styles.layerCount}>{layer.count}</span>
                </button>

                {/* Subpages */}
                {isExpanded && (
                  <div className={styles.subpageList}>
                    {layerSubpages[layer.id].map((subpage) => {
                      const isSubpageActive = isActive && activeSubpage === subpage.id;

                      return (
                        <button
                          key={subpage.id}
                          onClick={() => {
                            onLayerChange(layer.id);
                            onSubpageChange(subpage.id);
                          }}
                          className={styles.subpageButton}
                          data-active={isSubpageActive}
                        >
                          {subpage.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </Stack>
            );
          })}
        </Stack>
      </div>
    </div>
  );
};
