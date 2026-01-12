/**
 * Visual Editor App
 *
 * Main editor interface with:
 * - Component Palette (left sidebar)
 * - Canvas (center)
 * - Properties Panel (right sidebar)
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  Button,
  IconButton,
  Icon,
  Input,
  Select,
  Checkbox,
  Switch,
  Stack,
  Text,
  SearchInput,
} from '@/design-system';
import { useEditorStore, useSelectedNode, useCanUndo, useCanRedo } from './state/editorStore';
import {
  componentRegistry,
  getComponentsByLayer,
  AVAILABLE_ICONS,
} from './registry/componentRegistry';
import type { EditorNode, NodeId, ComponentMeta, ActivePanel } from './state/types';
import styles from './EditorApp.module.css';

// ============================================================================
// Component Map - Maps component types to actual React components
// ============================================================================

import * as DesignSystem from '@/design-system';

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
  AlertBadge: DesignSystem.AlertBadge,
  Avatar: DesignSystem.Avatar,
  Chip: DesignSystem.Chip,
  Divider: DesignSystem.Divider,
  Card: DesignSystem.Card,
  Skeleton: DesignSystem.Skeleton,
  Heading: DesignSystem.Heading,
  Text: DesignSystem.Text,
  Spinner: DesignSystem.Spinner,
  ProgressBar: DesignSystem.ProgressBar,
  StatusLight: DesignSystem.StatusLight,
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

  // Layer 6: Layouts
  DocuSignShell: DesignSystem.DocuSignShell,
};

// ============================================================================
// Canvas Node Component
// ============================================================================

interface CanvasNodeProps {
  nodeId: NodeId;
}

const CanvasNode: React.FC<CanvasNodeProps> = ({ nodeId }) => {
  const node = useEditorStore((state) => state.nodes[nodeId]);
  const selectedNodeId = useEditorStore((state) => state.selectedNodeId);
  const selectNode = useEditorStore((state) => state.selectNode);
  const hoverNode = useEditorStore((state) => state.hoverNode);

  if (!node) return null;

  const Component = componentMap[node.type];
  if (!Component) {
    return <div>Unknown component: {node.type}</div>;
  }

  const isSelected = selectedNodeId === nodeId;
  const meta = componentRegistry[node.type];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectNode(nodeId);
  };

  // Build props, filtering out empty strings
  const componentProps: Record<string, unknown> = {};
  Object.entries(node.props).forEach(([key, value]) => {
    if (value !== '' && value !== undefined) {
      componentProps[key] = value;
    }
  });

  // Render children for container components
  const childElements = node.children.map((childId) => (
    <CanvasNode key={childId} nodeId={childId} />
  ));

  return (
    <div
      className={styles.canvasNode}
      data-selected={isSelected}
      onClick={handleClick}
      onMouseEnter={() => hoverNode(nodeId)}
      onMouseLeave={() => hoverNode(null)}
    >
      <span className={styles.nodeLabel}>{meta?.name || node.type}</span>
      <Component {...componentProps}>
        {childElements.length > 0 ? childElements : componentProps.children}
      </Component>
    </div>
  );
};

// ============================================================================
// Component Palette
// ============================================================================

interface ComponentPaletteProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ searchQuery, onSearchChange }) => {
  const [expandedLayers, setExpandedLayers] = useState<Record<number, boolean>>({
    2: true,
    3: true,
    4: true,
    5: false,
    6: false,
  });

  const addNode = useEditorStore((state) => state.addNode);

  const layers = [
    { id: 2, name: 'Utilities' },
    { id: 3, name: 'Primitives' },
    { id: 4, name: 'Composites' },
    { id: 5, name: 'Patterns' },
    { id: 6, name: 'Layouts' },
  ];

  const toggleLayer = (layerId: number) => {
    setExpandedLayers((prev) => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDoubleClick = (componentType: string) => {
    addNode(componentType);
  };

  const filteredComponents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const result: Record<number, ComponentMeta[]> = {};

    layers.forEach((layer) => {
      const components = getComponentsByLayer(layer.id);
      result[layer.id] = components.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    });

    return result;
  }, [searchQuery]);

  return (
    <div className={styles.palette}>
      <div className={styles.paletteHeader}>
        <SearchInput
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.paletteSearch}
          size="small"
        />
      </div>

      <div className={styles.paletteContent}>
        {layers.map((layer) => {
          const components = filteredComponents[layer.id] || [];
          if (searchQuery && components.length === 0) return null;

          return (
            <div key={layer.id} className={styles.layerSection}>
              <button className={styles.layerHeader} onClick={() => toggleLayer(layer.id)}>
                <span className={styles.layerBadge} data-layer={layer.id}>
                  L{layer.id}
                </span>
                <span>{layer.name}</span>
                <span className={styles.chevron} data-expanded={expandedLayers[layer.id]}>
                  <Icon name="chevron-right" size="small" />
                </span>
              </button>

              {expandedLayers[layer.id] && (
                <div className={styles.componentList}>
                  {components.map((component) => (
                    <div
                      key={component.type}
                      className={styles.componentItem}
                      draggable
                      onDragStart={(e) => handleDragStart(e, component.type)}
                      onDoubleClick={() => handleDoubleClick(component.type)}
                      title={component.description}
                    >
                      <Icon
                        name={component.icon as keyof typeof DesignSystem.iconPaths}
                        size="small"
                        className={styles.componentItemIcon}
                      />
                      <span className={styles.componentItemName}>{component.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// Canvas
// ============================================================================

const Canvas: React.FC = () => {
  const rootIds = useEditorStore((state) => state.rootIds);
  const addNode = useEditorStore((state) => state.addNode);
  const selectNode = useEditorStore((state) => state.selectNode);
  const zoom = useEditorStore((state) => state.zoom);
  const setZoom = useEditorStore((state) => state.setZoom);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      addNode(componentType);
    }
  };

  const handleCanvasClick = () => {
    selectNode(null);
  };

  return (
    <div className={styles.canvasArea}>
      <div className={styles.canvasToolbar}>
        <div className={styles.zoomControls}>
          <IconButton
            icon="minus"
            label="Zoom out"
            size="small"
            kind="tertiary"
            onClick={() => setZoom(zoom - 0.1)}
            disabled={zoom <= 0.25}
          />
          <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <IconButton
            icon="plus"
            label="Zoom in"
            size="small"
            kind="tertiary"
            onClick={() => setZoom(zoom + 0.1)}
            disabled={zoom >= 2}
          />
        </div>
      </div>

      <div className={styles.canvas} onClick={handleCanvasClick}>
        <div
          className={styles.canvasFrame}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          <div
            className={styles.canvasDropZone}
            data-drag-over={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {rootIds.length === 0 ? (
              <div className={styles.canvasEmpty}>
                <Icon name="layout-grid" size="large" className={styles.canvasEmptyIcon} />
                <div className={styles.canvasEmptyTitle}>Start building</div>
                <div className={styles.canvasEmptyText}>
                  Drag components from the palette or double-click to add
                </div>
              </div>
            ) : (
              <Stack gap="medium">
                {rootIds.map((id) => (
                  <CanvasNode key={id} nodeId={id} />
                ))}
              </Stack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Properties Panel
// ============================================================================

const PropertiesPanel: React.FC = () => {
  const selectedNode = useSelectedNode();
  const activePanel = useEditorStore((state) => state.activePanel);
  const setActivePanel = useEditorStore((state) => state.setActivePanel);
  const updateNodeProps = useEditorStore((state) => state.updateNodeProps);
  const deleteNode = useEditorStore((state) => state.deleteNode);
  const duplicateNode = useEditorStore((state) => state.duplicateNode);
  const nodes = useEditorStore((state) => state.nodes);
  const rootIds = useEditorStore((state) => state.rootIds);

  const meta = selectedNode ? componentRegistry[selectedNode.type] : null;

  const handlePropChange = (propName: string, value: unknown) => {
    if (selectedNode) {
      updateNodeProps(selectedNode.id, { [propName]: value });
    }
  };

  const generateCode = useCallback(() => {
    const imports = new Set<string>();

    const nodeToJSX = (nodeId: NodeId, indent: number = 0): string => {
      const node = nodes[nodeId];
      if (!node) return '';

      imports.add(node.type);
      const spaces = '  '.repeat(indent);

      const propsEntries = Object.entries(node.props).filter(
        ([key, val]) => val !== undefined && val !== '' && key !== 'children'
      );

      const propsStr = propsEntries
        .map(([key, val]) => {
          if (typeof val === 'string') return `${key}="${val}"`;
          if (typeof val === 'boolean') return val ? key : '';
          return `${key}={${JSON.stringify(val)}}`;
        })
        .filter(Boolean)
        .join(' ');

      const childrenJSX =
        node.children.length > 0
          ? node.children.map((id) => nodeToJSX(id, indent + 1)).join('\n')
          : typeof node.props.children === 'string'
            ? node.props.children
            : '';

      if (!childrenJSX) {
        return `${spaces}<${node.type}${propsStr ? ' ' + propsStr : ''} />`;
      }

      const isInlineContent = typeof childrenJSX === 'string' && !childrenJSX.includes('\n');

      if (isInlineContent) {
        return `${spaces}<${node.type}${propsStr ? ' ' + propsStr : ''}>${childrenJSX}</${node.type}>`;
      }

      return `${spaces}<${node.type}${propsStr ? ' ' + propsStr : ''}>
${childrenJSX}
${spaces}</${node.type}>`;
    };

    const jsx = rootIds.map((id) => nodeToJSX(id, 2)).join('\n');
    const importsList = Array.from(imports).sort().join(', ');

    return `import { ${importsList} } from '@/design-system';

export default function GeneratedComponent() {
  return (
${jsx}
  );
}
`;
  }, [nodes, rootIds]);

  const handleCopyCode = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={styles.propertiesPanel}>
      <div className={styles.panelTabs}>
        <button
          className={styles.panelTab}
          data-active={activePanel === 'properties'}
          onClick={() => setActivePanel('properties')}
        >
          Properties
        </button>
        <button
          className={styles.panelTab}
          data-active={activePanel === 'tokens'}
          onClick={() => setActivePanel('tokens')}
        >
          Tokens
        </button>
        <button
          className={styles.panelTab}
          data-active={activePanel === 'code'}
          onClick={() => setActivePanel('code')}
        >
          Code
        </button>
      </div>

      <div className={styles.panelContent}>
        {activePanel === 'properties' && (
          <>
            {!selectedNode ? (
              <div className={styles.panelEmpty}>
                <Icon name="select" size="large" className={styles.panelEmptyIcon} />
                <div className={styles.panelEmptyText}>
                  Select a component to edit its properties
                </div>
              </div>
            ) : (
              <>
                <div className={styles.selectedComponentHeader}>
                  <Icon
                    name={(meta?.icon as keyof typeof DesignSystem.iconPaths) || 'star'}
                    className={styles.selectedComponentIcon}
                  />
                  <div className={styles.selectedComponentInfo}>
                    <div className={styles.selectedComponentName}>{meta?.name}</div>
                    <div className={styles.selectedComponentType}>
                      Layer {meta?.layer} - {meta?.category}
                    </div>
                  </div>
                </div>

                <div className={styles.propSection}>
                  <div className={styles.propSectionTitle}>Actions</div>
                  <Stack direction="horizontal" gap="small">
                    <Button
                      kind="secondary"
                      size="small"
                      onClick={() => duplicateNode(selectedNode.id)}
                    >
                      Duplicate
                    </Button>
                    <Button kind="danger" size="small" onClick={() => deleteNode(selectedNode.id)}>
                      Delete
                    </Button>
                  </Stack>
                </div>

                <div className={styles.propSection}>
                  <div className={styles.propSectionTitle}>Properties</div>
                  {meta?.props.map((propDef) => (
                    <div key={propDef.name} className={styles.propRow}>
                      <label className={styles.propLabel}>{propDef.name}</label>
                      {propDef.type === 'string' && (
                        <Input
                          size="small"
                          value={(selectedNode.props[propDef.name] as string) || ''}
                          onChange={(e) => handlePropChange(propDef.name, e.target.value)}
                          placeholder={propDef.description}
                          className={styles.propInput}
                          hideLabel
                        />
                      )}
                      {propDef.type === 'number' && (
                        <Input
                          size="small"
                          type="number"
                          value={String(selectedNode.props[propDef.name] || '')}
                          onChange={(e) => handlePropChange(propDef.name, Number(e.target.value))}
                          className={styles.propInput}
                          hideLabel
                        />
                      )}
                      {propDef.type === 'boolean' && (
                        <Switch
                          checked={Boolean(selectedNode.props[propDef.name])}
                          onChange={(e) => handlePropChange(propDef.name, e.target.checked)}
                          size="small"
                        />
                      )}
                      {propDef.type === 'select' && propDef.options && (
                        <Select
                          size="small"
                          value={(selectedNode.props[propDef.name] as string) || ''}
                          onChange={(e) => handlePropChange(propDef.name, e.target.value)}
                          className={styles.propInput}
                          hideLabel
                        >
                          <option value="">Select...</option>
                          {propDef.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Select>
                      )}
                      {propDef.type === 'icon' && (
                        <Select
                          size="small"
                          value={(selectedNode.props[propDef.name] as string) || ''}
                          onChange={(e) => handlePropChange(propDef.name, e.target.value)}
                          className={styles.propInput}
                          hideLabel
                        >
                          <option value="">None</option>
                          {AVAILABLE_ICONS.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {activePanel === 'tokens' && (
          <div className={styles.panelEmpty}>
            <Icon name="star" size="large" className={styles.panelEmptyIcon} />
            <div className={styles.panelEmptyText}>Token editor coming soon</div>
          </div>
        )}

        {activePanel === 'code' && (
          <>
            <div className={styles.codeActions}>
              <Button kind="secondary" size="small" onClick={handleCopyCode}>
                <Icon name="carbon-copy" size="small" /> Copy Code
              </Button>
            </div>
            <pre className={styles.codePreview}>{generateCode()}</pre>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Main Editor App
// ============================================================================

const EditorApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const mode = useEditorStore((state) => state.mode);
  const setMode = useEditorStore((state) => state.setMode);
  const isDirty = useEditorStore((state) => state.isDirty);
  const projectName = useEditorStore((state) => state.projectName);
  const setProjectName = useEditorStore((state) => state.setProjectName);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const clearCanvas = useEditorStore((state) => state.clearCanvas);
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const handleSave = async () => {
    const state = useEditorStore.getState();
    try {
      await fetch(`/api/projects/${projectName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: state.nodes,
          rootIds: state.rootIds,
          name: state.projectName,
        }),
      });
      useEditorStore.getState().setDirty(false);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  return (
    <div className={styles.editorContainer}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.logo}>
            <Icon name="layout-grid" />
            <span>Visual Editor</span>
          </div>
          <input
            type="text"
            className={styles.projectName}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          {isDirty && <span className={styles.dirtyIndicator} title="Unsaved changes" />}
        </div>

        <div className={styles.toolbarCenter}>
          <div className={styles.modeToggle}>
            <button
              className={styles.modeButton}
              data-active={mode === 'edit'}
              onClick={() => setMode('edit')}
            >
              Edit
            </button>
            <button
              className={styles.modeButton}
              data-active={mode === 'preview'}
              onClick={() => setMode('preview')}
            >
              Preview
            </button>
          </div>
        </div>

        <div className={styles.toolbarRight}>
          <IconButton
            icon="arrow-left"
            label="Undo"
            kind="tertiary"
            size="small"
            onClick={undo}
            disabled={!canUndo}
          />
          <IconButton
            icon="arrow-right"
            label="Redo"
            kind="tertiary"
            size="small"
            onClick={redo}
            disabled={!canRedo}
          />
          <IconButton
            icon="trash"
            label="Clear canvas"
            kind="tertiary"
            size="small"
            onClick={clearCanvas}
          />
          <Button kind="primary" size="small" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>

      {/* Main Area */}
      <div className={styles.mainArea}>
        {mode === 'edit' && (
          <ComponentPalette searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        )}
        <Canvas />
        {mode === 'edit' && <PropertiesPanel />}
      </div>
    </div>
  );
};

export default EditorApp;
