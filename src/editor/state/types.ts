/**
 * TypeScript types for the Visual Editor
 */

// Unique identifier for nodes in the canvas
export type NodeId = string;

// A node in the component tree (represents a component instance on canvas)
export interface EditorNode {
  id: NodeId;
  type: string;                    // Component name: 'Button', 'Card', 'Stack', etc.
  props: Record<string, unknown>;  // Component props
  children: NodeId[];              // Child node IDs (for container components)
  parentId: NodeId | null;         // Parent node ID (null for root nodes)
}

// Drop target information during drag operations
export interface DropTarget {
  parentId: NodeId | null;         // Target parent (null = root level)
  index: number;                   // Position within parent's children
  position: {                      // Visual indicator position
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Drag state for tracking active drag operations
export interface DragState {
  isDragging: boolean;
  dragType: 'new' | 'move';        // Adding new component vs. moving existing
  componentType?: string;          // Component type being dragged (for 'new')
  nodeId?: NodeId;                 // Node being moved (for 'move')
  dropTarget: DropTarget | null;
}

// View mode for the editor
export type EditorMode = 'edit' | 'preview';

// Active panel in the properties sidebar
export type ActivePanel = 'properties' | 'tokens' | 'code';

// Complete editor state
export interface EditorState {
  // Document state (persisted)
  nodes: Record<NodeId, EditorNode>;
  rootIds: NodeId[];               // Top-level node IDs (order matters)

  // UI state
  selectedNodeId: NodeId | null;
  hoveredNodeId: NodeId | null;
  isDirty: boolean;                // Has unsaved changes

  // View state
  zoom: number;
  panX: number;
  panY: number;

  // Mode
  mode: EditorMode;
  activePanel: ActivePanel;

  // Project
  projectName: string;
}

// History state for undo/redo
export interface HistoryEntry {
  nodes: Record<NodeId, EditorNode>;
  rootIds: NodeId[];
  selectedNodeId: NodeId | null;
}

export interface HistoryState {
  past: HistoryEntry[];
  future: HistoryEntry[];
  maxSize: number;
}

// Token state (separate from editor state)
export interface TokenState {
  tokens: Record<string, string>;         // Token name -> current value
  originalTokens: Record<string, string>; // Original values from file
  modifiedTokens: Record<string, string>; // Pending changes
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;
}

// Prop definition for component registry
export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'select'
  | 'color'
  | 'spacing'
  | 'icon'
  | 'node';  // For children prop (accepts other components)

export interface PropDefinition {
  name: string;
  type: PropType;
  options?: string[];              // For 'select' type
  defaultValue: unknown;
  description: string;
  required?: boolean;
  group?: string;                  // For grouping in UI (e.g., 'Style', 'Behavior')
}

// Component metadata for registry
export interface ComponentMeta {
  name: string;                    // Display name
  type: string;                    // Import name (e.g., 'Button')
  layer: 1 | 2 | 3 | 4 | 5 | 6;   // Design system layer
  category: string;                // Subcategory (e.g., 'Form', 'Navigation')
  description: string;
  props: PropDefinition[];
  acceptsChildren: boolean;        // Can contain child components
  childTypes?: string[];           // Allowed child types (empty = any)
  icon: string;                    // Icon name for palette
}

// Token categories for organization
export type TokenCategory =
  | 'color-primitives'
  | 'semantic-colors'
  | 'component-colors'
  | 'spacing'
  | 'typography'
  | 'radius'
  | 'shadow'
  | 'animation'
  | 'z-index';

export interface TokenGroup {
  category: TokenCategory;
  label: string;
  tokens: string[];                // Token names in this group
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SaveComponentRequest {
  filename: string;
  code: string;
}

export interface SaveProjectRequest {
  nodes: Record<NodeId, EditorNode>;
  rootIds: NodeId[];
  name: string;
}

// Layer info for UI
export interface LayerInfo {
  id: number;
  name: string;
  description: string;
  color: string;                   // Badge color
}

export const LAYERS: LayerInfo[] = [
  { id: 2, name: 'Utilities', description: 'Layout helpers', color: 'blue' },
  { id: 3, name: 'Primitives', description: 'Atomic components', color: 'green' },
  { id: 4, name: 'Composites', description: 'Composed components', color: 'purple' },
  { id: 5, name: 'Patterns', description: 'UI patterns', color: 'orange' },
  { id: 6, name: 'Layouts', description: 'Page templates', color: 'red' },
];
