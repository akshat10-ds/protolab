/**
 * useChatHistory Hook
 *
 * Manages chat history sidebar state and conversation switching:
 * - Open/close history panel
 * - Active conversation tracking
 * - Inline vs overlay mode based on panel width
 */

import { useState, useCallback } from 'react';
import type { ChatMessage } from '@/design-system';

export interface HistoryItem {
  id: string;
  title: string;
  time: string;
  messages: number;
}

export interface ChatHistoryData {
  today: HistoryItem[];
  yesterday: HistoryItem[];
  lastWeek: HistoryItem[];
}

export interface UseChatHistoryOptions {
  /** Initial active history item ID */
  initialActiveId?: string | null;
  /** Stored conversations map (id -> messages) */
  storedConversations?: Record<string, ChatMessage[]>;
  /** Panel width threshold for inline history mode */
  inlineThreshold?: number;
  /** Current panel width */
  panelWidth: number;
}

export interface UseChatHistoryReturn {
  /** Whether history panel is open */
  isHistoryOpen: boolean;
  /** ID of currently active history item */
  activeHistoryId: string | null;
  /** Whether to show history inline (wide panels) or as overlay */
  useInlineHistory: boolean;
  /** Toggle history panel visibility */
  toggleHistory: () => void;
  /** Open history panel */
  openHistory: () => void;
  /** Close history panel */
  closeHistory: () => void;
  /** Set the active history item and load its messages */
  selectHistoryItem: (id: string) => ChatMessage[] | undefined;
  /** Clear active history (for new chat) */
  clearActiveHistory: () => void;
  /** Set active history ID directly */
  setActiveHistoryId: (id: string | null) => void;
}

const DEFAULT_INLINE_THRESHOLD = 800;

export function useChatHistory({
  initialActiveId = '1',
  storedConversations = {},
  inlineThreshold = DEFAULT_INLINE_THRESHOLD,
  panelWidth,
}: UseChatHistoryOptions): UseChatHistoryReturn {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(initialActiveId);

  const useInlineHistory = panelWidth >= inlineThreshold;

  const toggleHistory = useCallback(() => {
    setIsHistoryOpen((prev) => !prev);
  }, []);

  const openHistory = useCallback(() => {
    setIsHistoryOpen(true);
  }, []);

  const closeHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  const selectHistoryItem = useCallback(
    (id: string): ChatMessage[] | undefined => {
      setActiveHistoryId(id);

      // Auto-close history in overlay mode
      if (!useInlineHistory) {
        setIsHistoryOpen(false);
      }

      return storedConversations[id];
    },
    [storedConversations, useInlineHistory]
  );

  const clearActiveHistory = useCallback(() => {
    setActiveHistoryId(null);
  }, []);

  return {
    isHistoryOpen,
    activeHistoryId,
    useInlineHistory,
    toggleHistory,
    openHistory,
    closeHistory,
    selectHistoryItem,
    clearActiveHistory,
    setActiveHistoryId,
  };
}
