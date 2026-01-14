/**
 * useChatMessages Hook
 *
 * Manages chat message state with streaming support:
 * - Message list management
 * - Rich message data (tables, lists)
 * - Conflict message data
 * - Loading state
 * - Scripted response matching
 * - Text streaming simulation
 */

import { useState, useCallback } from 'react';
import type { ChatMessage } from '@/design-system';
import type { RichMessageData, ConflictData } from '../data/agreement-studio-types';

export interface UseChatMessagesOptions {
  /** Map of triggers to rich message responses */
  scriptedResponses?: Record<string, RichMessageData>;
  /** Map of triggers to conflict responses */
  conflictResponses?: Record<string, ConflictData[]>;
  /** Streaming speed in ms per word */
  streamingSpeed?: number;
  /** Initial thinking delay in ms */
  thinkingDelay?: number;
}

export interface UseChatMessagesReturn {
  /** Current message list */
  messages: ChatMessage[];
  /** Whether AI is currently generating a response */
  isLoading: boolean;
  /** Map of message IDs to rich message data */
  richMessages: Map<string, RichMessageData>;
  /** Map of message IDs to conflict data */
  conflictMessages: Map<string, ConflictData[]>;
  /** Set of expanded user message IDs */
  expandedUserMessages: Set<string>;
  /** Send a new message and trigger AI response */
  sendMessage: (content: string, fromSuggestion?: boolean) => void;
  /** Toggle expansion of a user message */
  toggleUserMessageExpansion: (messageId: string) => void;
  /** Clear all messages and start fresh */
  clearMessages: () => void;
  /** Load stored messages (for history switching) */
  loadMessages: (messages: ChatMessage[]) => void;
  /** Set messages directly */
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const DEFAULT_STREAMING_SPEED = 30;
const DEFAULT_THINKING_DELAY = 800;

export function useChatMessages({
  scriptedResponses = {},
  conflictResponses = {},
  streamingSpeed = DEFAULT_STREAMING_SPEED,
  thinkingDelay = DEFAULT_THINKING_DELAY,
}: UseChatMessagesOptions = {}): UseChatMessagesReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [richMessages, setRichMessages] = useState<Map<string, RichMessageData>>(new Map());
  const [conflictMessages, setConflictMessages] = useState<Map<string, ConflictData[]>>(new Map());
  const [expandedUserMessages, setExpandedUserMessages] = useState<Set<string>>(new Set());

  const sendMessage = useCallback(
    (content: string, fromSuggestion = false) => {
      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
        metadata: fromSuggestion ? { fromSuggestion: true } : undefined,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Check if this is a scripted prompt (rich message or conflict)
      // Match by exact key, content starting with key, OR action marker in expanded prompts
      const scriptedKey = Object.keys(scriptedResponses).find(
        (key) =>
          content === key || content.startsWith(`${key}:`) || content.includes(`[Action: ${key}]`)
      );
      const conflictKey = Object.keys(conflictResponses).find(
        (key) =>
          content === key || content.startsWith(`${key}:`) || content.includes(`[Action: ${key}]`)
      );

      const scriptedResponse = scriptedKey ? scriptedResponses[scriptedKey] : undefined;
      const conflictResponse = conflictKey ? conflictResponses[conflictKey] : undefined;

      // Simulate initial thinking delay
      setTimeout(() => {
        const aiMessageId = `ai-${Date.now()}`;
        let responseText = `I understand you're asking about "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}". Let me analyze the 15 Acme agreements to provide you with accurate information.`;

        if (scriptedResponse) {
          responseText = `I've analyzed all 15 Acme agreements to identify the prevailing terms. Here's what I found:`;
        } else if (conflictResponse) {
          responseText = `I've cross-referenced all 15 Acme agreements to identify conflicting provisions. Here's what I found:`;
        }

        // Start with empty message for streaming effect
        const aiMessage: ChatMessage = {
          id: aiMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);

        // Stream text word by word
        const words = responseText.split(' ');
        let currentIndex = 0;

        const streamInterval = setInterval(() => {
          if (currentIndex < words.length) {
            const partialText = words.slice(0, currentIndex + 1).join(' ');
            setMessages((prev) =>
              prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: partialText } : msg))
            );
            currentIndex++;
          } else {
            clearInterval(streamInterval);

            // After streaming completes, add rich message data if applicable
            if (scriptedResponse) {
              setRichMessages((prev) => new Map(prev).set(aiMessageId, scriptedResponse));
            }
            if (conflictResponse) {
              setConflictMessages((prev) => new Map(prev).set(aiMessageId, conflictResponse));
            }
          }
        }, streamingSpeed);
      }, thinkingDelay);
    },
    [scriptedResponses, conflictResponses, streamingSpeed, thinkingDelay]
  );

  const toggleUserMessageExpansion = useCallback((messageId: string) => {
    setExpandedUserMessages((prev) => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setRichMessages(new Map());
    setConflictMessages(new Map());
    setExpandedUserMessages(new Set());
  }, []);

  const loadMessages = useCallback((newMessages: ChatMessage[]) => {
    setMessages(newMessages);
    // Clear rich messages and conflicts when loading different conversation
    setRichMessages(new Map());
    setConflictMessages(new Map());
    setExpandedUserMessages(new Set());
  }, []);

  return {
    messages,
    isLoading,
    richMessages,
    conflictMessages,
    expandedUserMessages,
    sendMessage,
    toggleUserMessageExpansion,
    clearMessages,
    loadMessages,
    setMessages,
  };
}
