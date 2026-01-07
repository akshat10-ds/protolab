/**
 * Editor State Management with Zustand
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  EditorState,
  EditorNode,
  NodeId,
  EditorMode,
  ActivePanel,
  HistoryEntry,
} from './types';
import { componentRegistry } from '../registry/componentRegistry';

// Generate unique IDs
let idCounter = 0;
export const generateId = (): NodeId => {
  idCounter += 1;
  return `node-${Date.now()}-${idCounter}`;
};

// Initial editor state
const initialState: EditorState = {
  nodes: {},
  rootIds: [],
  selectedNodeId: null,
  hoveredNodeId: null,
  isDirty: false,
  zoom: 1,
  panX: 0,
  panY: 0,
  mode: 'edit',
  activePanel: 'properties',
  projectName: 'Untitled',
};

// History for undo/redo
interface HistoryStore {
  past: HistoryEntry[];
  future: HistoryEntry[];
  maxSize: number;
}

const initialHistory: HistoryStore = {
  past: [],
  future: [],
  maxSize: 50,
};

// Editor actions interface
interface EditorActions {
  // Node CRUD
  addNode: (type: string, parentId?: NodeId | null, index?: number) => NodeId;
  updateNodeProps: (id: NodeId, props: Partial<EditorNode['props']>) => void;
  deleteNode: (id: NodeId) => void;
  moveNode: (id: NodeId, newParentId: NodeId | null, index: number) => void;
  duplicateNode: (id: NodeId) => NodeId | null;

  // Selection
  selectNode: (id: NodeId | null) => void;
  hoverNode: (id: NodeId | null) => void;

  // View
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  setMode: (mode: EditorMode) => void;
  setActivePanel: (panel: ActivePanel) => void;

  // History
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;

  // Document
  setDirty: (dirty: boolean) => void;
  setProjectName: (name: string) => void;
  loadProject: (data: { nodes: Record<NodeId, EditorNode>; rootIds: NodeId[]; name: string }) => void;
  clearCanvas: () => void;

  // Export
  exportState: () => { nodes: Record<NodeId, EditorNode>; rootIds: NodeId[] };
}

// Combined store type
type EditorStore = EditorState & HistoryStore & EditorActions;

// Create the store
export const useEditorStore = create<EditorStore>()(
  immer((set, get) => ({
    // Initial state
    ...initialState,
    ...initialHistory,

    // Add a new node to the canvas
    addNode: (type: string, parentId: NodeId | null = null, index?: number) => {
      const id = generateId();
      const meta = componentRegistry[type];

      if (!meta) {
        console.warn(`Component type "${type}" not found in registry`);
        return id;
      }

      // Build default props from registry
      const defaultProps: Record<string, unknown> = {};
      meta.props.forEach((prop) => {
        if (prop.defaultValue !== undefined) {
          defaultProps[prop.name] = prop.defaultValue;
        }
      });

      const newNode: EditorNode = {
        id,
        type,
        props: defaultProps,
        children: [],
        parentId,
      };

      get().pushHistory();

      set((state) => {
        state.nodes[id] = newNode;

        if (parentId && state.nodes[parentId]) {
          // Add to parent's children
          const insertIndex = index ?? state.nodes[parentId].children.length;
          state.nodes[parentId].children.splice(insertIndex, 0, id);
        } else {
          // Add to root
          const insertIndex = index ?? state.rootIds.length;
          state.rootIds.splice(insertIndex, 0, id);
        }

        state.selectedNodeId = id;
        state.isDirty = true;
      });

      return id;
    },

    // Update node props
    updateNodeProps: (id: NodeId, props: Partial<EditorNode['props']>) => {
      get().pushHistory();

      set((state) => {
        if (state.nodes[id]) {
          state.nodes[id].props = { ...state.nodes[id].props, ...props };
          state.isDirty = true;
        }
      });
    },

    // Delete a node (and all descendants)
    deleteNode: (id: NodeId) => {
      get().pushHistory();

      set((state) => {
        const node = state.nodes[id];
        if (!node) return;

        // Recursively collect all descendant IDs
        const collectDescendants = (nodeId: NodeId): NodeId[] => {
          const n = state.nodes[nodeId];
          if (!n) return [];
          return [nodeId, ...n.children.flatMap(collectDescendants)];
        };

        const toDelete = collectDescendants(id);

        // Remove from parent's children or root
        if (node.parentId && state.nodes[node.parentId]) {
          state.nodes[node.parentId].children = state.nodes[node.parentId].children.filter(
            (cid) => cid !== id
          );
        } else {
          state.rootIds = state.rootIds.filter((rid) => rid !== id);
        }

        // Delete all nodes
        toDelete.forEach((nid) => {
          delete state.nodes[nid];
        });

        // Clear selection if deleted
        if (toDelete.includes(state.selectedNodeId ?? '')) {
          state.selectedNodeId = null;
        }

        state.isDirty = true;
      });
    },

    // Move a node to a new parent/position
    moveNode: (id: NodeId, newParentId: NodeId | null, index: number) => {
      get().pushHistory();

      set((state) => {
        const node = state.nodes[id];
        if (!node) return;

        // Prevent moving a node into itself or its descendants
        const isDescendant = (ancestorId: NodeId, checkId: NodeId | null): boolean => {
          if (!checkId) return false;
          if (ancestorId === checkId) return true;
          const checkNode = state.nodes[checkId];
          return checkNode ? isDescendant(ancestorId, checkNode.parentId) : false;
        };

        if (newParentId && isDescendant(id, newParentId)) {
          console.warn('Cannot move node into itself or its descendants');
          return;
        }

        // Remove from old parent
        if (node.parentId && state.nodes[node.parentId]) {
          state.nodes[node.parentId].children = state.nodes[node.parentId].children.filter(
            (cid) => cid !== id
          );
        } else {
          state.rootIds = state.rootIds.filter((rid) => rid !== id);
        }

        // Add to new parent
        if (newParentId && state.nodes[newParentId]) {
          state.nodes[newParentId].children.splice(index, 0, id);
          node.parentId = newParentId;
        } else {
          state.rootIds.splice(index, 0, id);
          node.parentId = null;
        }

        state.isDirty = true;
      });
    },

    // Duplicate a node (shallow - only the node itself, not children)
    duplicateNode: (id: NodeId) => {
      const node = get().nodes[id];
      if (!node) return null;

      const newId = generateId();

      get().pushHistory();

      set((state) => {
        const duplicated: EditorNode = {
          id: newId,
          type: node.type,
          props: { ...node.props },
          children: [], // Don't copy children
          parentId: node.parentId,
        };

        state.nodes[newId] = duplicated;

        // Insert after original
        if (node.parentId && state.nodes[node.parentId]) {
          const siblings = state.nodes[node.parentId].children;
          const originalIndex = siblings.indexOf(id);
          siblings.splice(originalIndex + 1, 0, newId);
        } else {
          const originalIndex = state.rootIds.indexOf(id);
          state.rootIds.splice(originalIndex + 1, 0, newId);
        }

        state.selectedNodeId = newId;
        state.isDirty = true;
      });

      return newId;
    },

    // Selection
    selectNode: (id: NodeId | null) => {
      set((state) => {
        state.selectedNodeId = id;
      });
    },

    hoverNode: (id: NodeId | null) => {
      set((state) => {
        state.hoveredNodeId = id;
      });
    },

    // View controls
    setZoom: (zoom: number) => {
      set((state) => {
        state.zoom = Math.max(0.25, Math.min(2, zoom));
      });
    },

    setPan: (x: number, y: number) => {
      set((state) => {
        state.panX = x;
        state.panY = y;
      });
    },

    setMode: (mode: EditorMode) => {
      set((state) => {
        state.mode = mode;
        if (mode === 'preview') {
          state.selectedNodeId = null;
        }
      });
    },

    setActivePanel: (panel: ActivePanel) => {
      set((state) => {
        state.activePanel = panel;
      });
    },

    // History (undo/redo)
    pushHistory: () => {
      set((state) => {
        const entry: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          rootIds: [...state.rootIds],
          selectedNodeId: state.selectedNodeId,
        };

        state.past.push(entry);
        if (state.past.length > state.maxSize) {
          state.past.shift();
        }
        state.future = []; // Clear redo stack
      });
    },

    undo: () => {
      set((state) => {
        if (state.past.length === 0) return;

        const current: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          rootIds: [...state.rootIds],
          selectedNodeId: state.selectedNodeId,
        };

        const previous = state.past.pop()!;
        state.future.push(current);

        state.nodes = previous.nodes;
        state.rootIds = previous.rootIds;
        state.selectedNodeId = previous.selectedNodeId;
        state.isDirty = true;
      });
    },

    redo: () => {
      set((state) => {
        if (state.future.length === 0) return;

        const current: HistoryEntry = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          rootIds: [...state.rootIds],
          selectedNodeId: state.selectedNodeId,
        };

        const next = state.future.pop()!;
        state.past.push(current);

        state.nodes = next.nodes;
        state.rootIds = next.rootIds;
        state.selectedNodeId = next.selectedNodeId;
        state.isDirty = true;
      });
    },

    // Document management
    setDirty: (dirty: boolean) => {
      set((state) => {
        state.isDirty = dirty;
      });
    },

    setProjectName: (name: string) => {
      set((state) => {
        state.projectName = name;
        state.isDirty = true;
      });
    },

    loadProject: (data) => {
      set((state) => {
        state.nodes = data.nodes;
        state.rootIds = data.rootIds;
        state.projectName = data.name;
        state.selectedNodeId = null;
        state.past = [];
        state.future = [];
        state.isDirty = false;
      });
    },

    clearCanvas: () => {
      get().pushHistory();
      set((state) => {
        state.nodes = {};
        state.rootIds = [];
        state.selectedNodeId = null;
        state.isDirty = true;
      });
    },

    exportState: () => {
      const { nodes, rootIds } = get();
      return { nodes, rootIds };
    },
  }))
);

// Selector hooks for performance
export const useSelectedNode = () =>
  useEditorStore((state) =>
    state.selectedNodeId ? state.nodes[state.selectedNodeId] : null
  );

export const useRootNodes = () =>
  useEditorStore((state) => state.rootIds.map((id) => state.nodes[id]).filter(Boolean));

export const useCanUndo = () => useEditorStore((state) => state.past.length > 0);
export const useCanRedo = () => useEditorStore((state) => state.future.length > 0);
