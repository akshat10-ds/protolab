/**
 * usePanelResize Hook
 *
 * Encapsulates drag-to-resize logic for panels with:
 * - Min/max width constraints
 * - Mouse event handling for drag operations
 * - Resize state tracking for CSS transitions
 * - Toggle expand/collapse functionality
 */

import { useState, useCallback, useEffect, useRef } from 'react';

export interface UsePanelResizeOptions {
  /** Initial panel width */
  initialWidth: number;
  /** Minimum allowed width */
  minWidth: number;
  /** Maximum allowed width (defaults to window.innerWidth) */
  maxWidth?: number;
  /** Default width when collapsing from expanded state */
  defaultWidth?: number;
}

export interface UsePanelResizeReturn {
  /** Current panel width */
  panelWidth: number;
  /** Whether the panel is currently being resized */
  isResizing: boolean;
  /** Set the panel width directly */
  setWidth: (width: number) => void;
  /** Start resize operation (call on mousedown) */
  startResize: () => void;
  /** End resize operation (call on mouseup) */
  endResize: () => void;
  /** Mouse down handler for drag handle */
  handleMouseDown: (e: React.MouseEvent) => void;
  /** Toggle between expanded (full width) and default width */
  toggleExpand: () => void;
  /** Whether the panel is at or near full width */
  isExpanded: boolean;
  /** Reset to initial width */
  reset: () => void;
}

export function usePanelResize({
  initialWidth,
  minWidth,
  maxWidth: maxWidthProp,
  defaultWidth = minWidth,
}: UsePanelResizeOptions): UsePanelResizeReturn {
  const [panelWidth, setPanelWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);

  // Track previous window width to detect resize direction
  const prevWindowWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1920);

  // Get current max width (use prop if provided, otherwise window width)
  const getMaxWidth = useCallback(() => {
    return maxWidthProp ?? (typeof window !== 'undefined' ? window.innerWidth : 1920);
  }, [maxWidthProp]);

  // Handle window resize - adjust panel width if it was at/near fullscreen
  useEffect(() => {
    const handleWindowResize = () => {
      const currentWindowWidth = window.innerWidth;
      const prevWindowWidth = prevWindowWidthRef.current;

      // If panel was at fullscreen (or near it), keep it at fullscreen
      if (panelWidth >= prevWindowWidth - 50) {
        setPanelWidth(currentWindowWidth);
      }
      // If panel is wider than the new window width, clamp it
      else if (panelWidth > currentWindowWidth) {
        setPanelWidth(currentWindowWidth);
      }

      prevWindowWidthRef.current = currentWindowWidth;
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [panelWidth]);

  const startResize = useCallback(() => {
    setIsResizing(true);
  }, []);

  const endResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const setWidth = useCallback(
    (width: number) => {
      const maxWidth = getMaxWidth();
      const clampedWidth = Math.min(maxWidth, Math.max(minWidth, width));
      setPanelWidth(clampedWidth);
    },
    [minWidth, getMaxWidth]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startResize();

      const startX = e.clientX;
      const startWidth = panelWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        // Panel is on the right, so we invert delta (drag left = increase width)
        const deltaX = startX - moveEvent.clientX;
        // Use dynamic max width to handle window resizes
        const maxWidth = getMaxWidth();
        const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + deltaX));
        setPanelWidth(newWidth);
      };

      const handleMouseUp = () => {
        endResize();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [panelWidth, minWidth, getMaxWidth, startResize, endResize]
  );

  const toggleExpand = useCallback(() => {
    const currentMax = getMaxWidth();
    // Consider "expanded" if within 50px of full width
    if (panelWidth >= currentMax - 50) {
      setPanelWidth(defaultWidth);
    } else {
      setPanelWidth(currentMax);
    }
  }, [panelWidth, getMaxWidth, defaultWidth]);

  const isExpanded = panelWidth > 600;

  const reset = useCallback(() => {
    setPanelWidth(initialWidth);
  }, [initialWidth]);

  return {
    panelWidth,
    isResizing,
    setWidth,
    startResize,
    endResize,
    handleMouseDown,
    toggleExpand,
    isExpanded,
    reset,
  };
}
