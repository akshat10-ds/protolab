/**
 * AIPanel Component
 *
 * Main AI chat panel for agreement analysis.
 * Features:
 * - Rich categorized AI responses
 * - Clickable citations with document viewer
 * - Chat history sidebar
 * - Share modal with permissions
 * - Resizable panel
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  Button,
  IconButton,
  Icon,
  AIChat,
  ChatMessage,
  Checkbox,
  Tooltip,
  Dropdown,
  List,
} from '@/design-system';

// Types
import type {
  CitationData,
  Agreement,
  ExtendedSuggestedAction,
  MarkdownResponseData,
  MatrixResponseData,
  Prompt,
} from '../../data/agreement-studio-types';

// Data
import {
  QUICK_ACTIONS,
  CHAT_HISTORY,
  STORED_CONVERSATIONS,
  MARKDOWN_RESPONSES,
  MATRIX_RESPONSES,
  SUPPORT_ACTIONS,
  SUPPORT_QUESTIONS,
} from '../../data/agreement-studio-data';

// Components
import { Toast } from '../Toast';
import { ShareModal } from '../ShareModal';
import { MarkdownMessage } from '../MarkdownMessage';
import { DocumentCanvas } from '../DocumentCanvas';
import { AgreementsSidebar } from '../AgreementsSidebar';
import { DocumentPreviewCard } from '../DocumentPreviewCard';
import { PromptLibrary } from '../PromptLibrary';
import { PromptEditor } from '../PromptEditor';
import { ThinkingSteps } from '../ThinkingSteps';
import { MatrixView } from '../MatrixView';

import styles from './AIPanel.module.css';

// Breakpoint for narrow mode (canvas takes full width with back button)
const NARROW_BREAKPOINT = 700;
// Breakpoint for showing header icons in overflow menu
const OVERFLOW_THRESHOLD = 420;
// Breakpoint for sidebar to become inline (side-by-side) vs overlay
const SIDEBAR_INLINE_THRESHOLD = 600;

export interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  panelWidth: number;
  onWidthChange: (width: number) => void;
  onStartResize: () => void;
  onEndResize: () => void;
  isResizing: boolean;
  /** Number of agreements loaded in context */
  agreementCount?: number;
  /** Agreements loaded in context */
  agreements?: Agreement[];
}

export const DEFAULT_PANEL_WIDTH = 360;
const MIN_PANEL_WIDTH = 360;
// MAX_PANEL_WIDTH is now calculated dynamically in handleMouseMove to handle window resizes
const INLINE_HISTORY_THRESHOLD = 800;

// Panel view types for navigation
type PanelView = 'chat' | 'prompts' | 'prompt-edit';

export const AIPanel: React.FC<AIPanelProps> = ({
  isOpen,
  onClose,
  userName = 'Akshat',
  panelWidth,
  onWidthChange,
  onStartResize,
  onEndResize,
  isResizing,
  agreementCount,
  agreements = [],
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>('1');

  // Navigation state for sidebar views
  const [currentView, setCurrentView] = useState<PanelView>('chat');
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);

  // User-created prompts state
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);
  const savedScrollPositionRef = useRef<number>(0);

  // Smart scroll tracking - only auto-scroll if user is near bottom
  const isUserNearBottomRef = useRef(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Scroll-to-top enforcement for Gemini-style pattern
  // Stores the target scroll position to maintain during streaming
  const maintainScrollPositionRef = useRef<number | null>(null);
  const scrollObserverRef = useRef<MutationObserver | null>(null);
  const scrollEnforcementRafRef = useRef<number | null>(null);

  // Skip/Stop generation controls
  const [canSkip, setCanSkip] = useState(false);
  const skipRequestedRef = useRef(false);
  const stopRequestedRef = useRef(false);

  // Smart scroll helper - scrolls to show specific content without following during streaming
  const scrollToElement = useCallback((selector: string, behavior: ScrollBehavior = 'smooth') => {
    if (!chatWrapperRef.current) return;
    const scrollContainer = chatWrapperRef.current.querySelector('[class*="messagesContainer"]');
    const targetElement = chatWrapperRef.current.querySelector(selector);
    if (scrollContainer && targetElement) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const scrollTop = (scrollContainer as HTMLElement).scrollTop;
      // Scroll so target is near the top of the container with some padding
      const targetOffset = targetRect.top - containerRect.top + scrollTop - 20;
      (scrollContainer as HTMLElement).scrollTo({ top: targetOffset, behavior });
    }
  }, []);

  // Check if user is near bottom of scroll container
  const checkIfNearBottom = useCallback(() => {
    if (!chatWrapperRef.current) return true;
    const scrollContainer = chatWrapperRef.current.querySelector('[class*="messagesContainer"]');
    if (!scrollContainer) return true;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer as HTMLElement;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom < 100; // Within 100px of bottom
  }, []);

  // Scroll to bottom of chat (for showing new AI response start)
  // If force=false, only scrolls if user is already near bottom
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth', force = false) => {
    if (!chatWrapperRef.current) return;
    if (!force && !isUserNearBottomRef.current) {
      // User scrolled up, show "scroll to bottom" button instead
      setShowScrollToBottom(true);
      return;
    }
    const scrollContainer = chatWrapperRef.current.querySelector('[class*="messagesContainer"]');
    if (scrollContainer) {
      (scrollContainer as HTMLElement).scrollTo({
        top: (scrollContainer as HTMLElement).scrollHeight,
        behavior,
      });
      setShowScrollToBottom(false);
    }
  }, []);

  // Stop enforcing scroll position (called when streaming completes or user manually scrolls)
  const stopScrollEnforcement = useCallback(() => {
    maintainScrollPositionRef.current = null;
    if (scrollObserverRef.current) {
      scrollObserverRef.current.disconnect();
      scrollObserverRef.current = null;
    }
    if (scrollEnforcementRafRef.current !== null) {
      cancelAnimationFrame(scrollEnforcementRafRef.current);
      scrollEnforcementRafRef.current = null;
    }
  }, []);

  // Scroll so the user's message is at the absolute TOP of the viewport
  // This creates empty space below for the AI response to stream into (Gemini-style)
  // Uses a MutationObserver to continuously enforce scroll position during streaming
  const scrollToNewResponseTop = useCallback(() => {
    if (!chatWrapperRef.current) return;

    // Find the scroll container - AIChat uses .messageList which has overflow-y: auto
    const scrollContainer = chatWrapperRef.current.querySelector(
      '[class*="messageList"]'
    ) as HTMLElement;
    if (!scrollContainer) return;

    // Helper to find user message and calculate target scroll
    const calculateTargetScroll = (): number | null => {
      const messagesStack = scrollContainer.querySelector('[class*="messages"]');
      if (!messagesStack) return null;

      const children = Array.from(messagesStack.children);
      // Last child is the messagesEndRef div, second-to-last is AI message, third-to-last is user message
      if (children.length < 3) return null;

      // Get the user message that triggered the response (third from end, before AI message and endRef)
      const userMessageElement = children[children.length - 3] as HTMLElement;
      if (!userMessageElement) return null;

      return Math.max(0, userMessageElement.offsetTop - 16);
    };

    const targetScrollTop = calculateTargetScroll();
    if (targetScrollTop === null) return;

    // Apply scroll immediately
    scrollContainer.scrollTop = targetScrollTop;
    setShowScrollToBottom(false);

    // Store target for enforcement
    maintainScrollPositionRef.current = targetScrollTop;

    // Set up MutationObserver to re-enforce scroll position when DOM changes
    // This handles React re-renders and content streaming that would otherwise reset scroll
    if (scrollObserverRef.current) {
      scrollObserverRef.current.disconnect();
    }

    scrollObserverRef.current = new MutationObserver(() => {
      if (maintainScrollPositionRef.current !== null) {
        // Re-calculate target position by re-querying the DOM (not using stale closure)
        const freshTarget = calculateTargetScroll();
        if (freshTarget !== null) {
          maintainScrollPositionRef.current = freshTarget;
          scrollContainer.scrollTop = freshTarget;
        }
      }
    });

    // Observe changes to the scroll container's children (streaming content)
    scrollObserverRef.current.observe(scrollContainer, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Also use requestAnimationFrame loop for the first 2 seconds to aggressively enforce scroll
    // This catches any scroll resets that MutationObserver might miss
    const startTime = Date.now();
    const ENFORCEMENT_DURATION = 2000; // 2 seconds

    const enforceLoop = () => {
      if (maintainScrollPositionRef.current === null) return;
      if (Date.now() - startTime > ENFORCEMENT_DURATION) return;

      const freshTarget = calculateTargetScroll();
      if (freshTarget !== null && Math.abs(scrollContainer.scrollTop - freshTarget) > 10) {
        scrollContainer.scrollTop = freshTarget;
        maintainScrollPositionRef.current = freshTarget;
      }

      scrollEnforcementRafRef.current = requestAnimationFrame(enforceLoop);
    };

    scrollEnforcementRafRef.current = requestAnimationFrame(enforceLoop);
  }, []);

  // Track scroll position to know if user is near bottom
  // Also detect user manual scroll to stop scroll enforcement
  useEffect(() => {
    const scrollContainer = chatWrapperRef.current?.querySelector('[class*="messageList"]');
    if (!scrollContainer) return;

    let lastScrollTop = (scrollContainer as HTMLElement).scrollTop;

    const handleScroll = () => {
      const currentScrollTop = (scrollContainer as HTMLElement).scrollTop;
      const nearBottom = checkIfNearBottom();
      isUserNearBottomRef.current = nearBottom;

      if (nearBottom) {
        setShowScrollToBottom(false);
      }

      // If scroll position changed significantly from the enforced position,
      // user likely scrolled manually - stop enforcement
      if (maintainScrollPositionRef.current !== null) {
        const diff = Math.abs(currentScrollTop - maintainScrollPositionRef.current);
        // Allow small tolerance (5px) for minor adjustments, but if user scrolled > 50px, stop enforcement
        if (diff > 50) {
          stopScrollEnforcement();
          // Show scroll-to-bottom button since user scrolled away
          if (!nearBottom) {
            setShowScrollToBottom(true);
          }
        }
      }

      lastScrollTop = currentScrollTop;
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [checkIfNearBottom, stopScrollEnforcement]);

  // Cleanup scroll observer and RAF on unmount
  useEffect(() => {
    return () => {
      if (scrollObserverRef.current) {
        scrollObserverRef.current.disconnect();
      }
      if (scrollEnforcementRafRef.current !== null) {
        cancelAnimationFrame(scrollEnforcementRafRef.current);
      }
    };
  }, []);

  // Attention animation for context source pill
  const [showContextAttention, setShowContextAttention] = useState(false);
  // Attention animation for input container (triggered on quick action click)
  const [showInputAttention, setShowInputAttention] = useState(false);
  // Key to force re-mount of welcome content for entrance animations
  const [welcomeKey, setWelcomeKey] = useState(0);
  const prevIsOpenRef = useRef(isOpen);

  // Trigger animations when panel opens
  useEffect(() => {
    const wasJustOpened = isOpen && !prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (wasJustOpened) {
      // Increment key to replay welcome animations
      setWelcomeKey((k) => k + 1);

      // Trigger context attention if agreements loaded
      if (agreementCount && agreementCount > 0) {
        // Small delay to let the panel animate open first
        const timer = setTimeout(() => {
          setShowContextAttention(true);
          // Reset after animation completes
          const resetTimer = setTimeout(() => {
            setShowContextAttention(false);
          }, 1500);
          return () => clearTimeout(resetTimer);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, agreementCount]);

  // Markdown message and document viewer state
  const [markdownMessages, setMarkdownMessages] = useState<Map<string, MarkdownResponseData>>(
    new Map()
  );
  // Matrix message state for cross-document analysis
  const [matrixMessages, setMatrixMessages] = useState<Map<string, MatrixResponseData>>(new Map());
  // Track which AI messages are currently streaming (for ThinkingSteps animation)
  const [streamingMessageIds, setStreamingMessageIds] = useState<Set<string>>(new Set());
  // Track partially streamed markdown content for progressive reveal
  const [streamingMarkdownContent, setStreamingMarkdownContent] = useState<Map<string, string>>(
    new Map()
  );
  // Track thinking steps expanded state per message (auto-collapse when content starts)
  const [thinkingExpandedState, setThinkingExpandedState] = useState<Map<string, boolean>>(
    new Map()
  );
  // Track last response for "yes" to advance through scenario
  const [lastResponseKey, setLastResponseKey] = useState<string | null>(null);
  const [isDocumentCanvasOpen, setIsDocumentCanvasOpen] = useState(false);
  const [activeCitation, setActiveCitation] = useState<CitationData | null>(null);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);

  // Track which long user messages are expanded (collapsed by default)
  const [expandedUserMessages, setExpandedUserMessages] = useState<Set<string>>(new Set());

  // Controlled input state for expanded prompts
  const [chatInputValue, setChatInputValue] = useState('');

  // Slash command menu state
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState('');
  const [slashSelectedIndex, setSlashSelectedIndex] = useState(0);

  // Dynamic chat title based on content
  const [chatTitle, setChatTitle] = useState<string>('New Chat');

  // Share modal and toast state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastState, setToastState] = useState<{
    visible: boolean;
    message: string;
    status: 'loading' | 'success' | 'error';
  }>({
    visible: false,
    message: '',
    status: 'loading',
  });

  // "Go wide!" tooltip state - shows on first open to encourage resize discovery
  const [showResizeTooltip, setShowResizeTooltip] = useState(false);
  const hasShownTooltipRef = useRef(false);

  // Agreements sidebar state
  const [isAgreementsSidebarOpen, setIsAgreementsSidebarOpen] = useState(false);

  // Selected agreements state (lifted from AgreementsSidebar for count display)
  const [selectedAgreementIds, setSelectedAgreementIds] = useState<Set<string>>(
    () => new Set(agreements.map((a) => a.id))
  );

  // Keep selected IDs in sync when agreements list changes
  useEffect(() => {
    setSelectedAgreementIds(new Set(agreements.map((a) => a.id)));
  }, [agreements]);

  // Sidebar mode: inline (side-by-side) when wide enough, otherwise overlay
  const useSidebarInline = panelWidth >= SIDEBAR_INLINE_THRESHOLD;
  // For backwards compatibility
  const useInlineHistory = useSidebarInline;

  // Sidebar uses overlay mode when narrow (slides over content with shadow)
  const useSidebarOverlay = !useSidebarInline;

  // Generate full prompt text from quick action with readable formatting
  const generateExpandedPromptText = useCallback((action: ExtendedSuggestedAction): string => {
    if (!action.expansion) return action.label;

    // Join steps with double line breaks for readability
    // The steps already contain formatted content (ROLE:, TASK:, etc.)
    const formattedSteps = action.expansion.steps.join('\n\n');

    // Include action label marker at end for scripted response matching
    return `${formattedSteps}\n\n---\n[Action: ${action.label}]\n[Analyzing ${action.expansion.documentsToAnalyze} documents]`;
  }, []);

  // Narrow mode: canvas takes full width with back button
  const isNarrowMode = panelWidth < NARROW_BREAKPOINT;

  // Show tooltip after panel opens (with delay for smooth animation)
  // Only show when opening at narrow width
  useEffect(() => {
    if (isOpen && !hasShownTooltipRef.current && panelWidth <= DEFAULT_PANEL_WIDTH) {
      const timer = setTimeout(() => {
        setShowResizeTooltip(true);
        hasShownTooltipRef.current = true;

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          setShowResizeTooltip(false);
        }, 5000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, panelWidth]);

  const handleOpenShareModal = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  const handleCloseShareModal = useCallback(() => {
    setIsShareModalOpen(false);
  }, []);

  const handleShare = useCallback((email: string, permission: string) => {
    setIsShareModalOpen(false);

    // Show loading toast
    setToastState({ visible: true, message: 'Checking permissions...', status: 'loading' });

    // Simulate verification delay
    setTimeout(() => {
      setToastState({
        visible: true,
        message: 'User verified. Invitation sent.',
        status: 'success',
      });

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setToastState((prev) => ({ ...prev, visible: false }));
      }, 3000);
    }, 1500);
  }, []);

  // Share link for the current conversation
  const shareLink = useMemo(() => {
    return `https://app.docusign.com/chat/${activeHistoryId || 'new'}`;
  }, [activeHistoryId]);

  // Quick copy link handler (for header button)
  const handleQuickCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareLink);
    setToastState({ visible: true, message: 'Link copied to clipboard', status: 'success' });
    setTimeout(() => setToastState((prev) => ({ ...prev, visible: false })), 2000);
  }, [shareLink]);

  // Copy link handler (for share modal - just logs for analytics)
  const handleCopyLinkFromModal = useCallback(() => {
    console.log('Link copied from share modal');
  }, []);

  // Track where doc preview was opened from (for state restoration on close)
  const [docPreviewSource, setDocPreviewSource] = useState<'sidebar' | 'citation' | null>(null);

  // Agreements sidebar handlers
  const handleOpenAgreementsSidebar = useCallback(() => {
    // Close document canvas if open (mutual exclusivity)
    if (isDocumentCanvasOpen) {
      setIsDocumentCanvasOpen(false);
      setActiveCitation(null);
      setDocPreviewSource(null);
    }
    // Clear input to reset height
    setChatInputValue('');
    setIsAgreementsSidebarOpen(true);
    // Expand panel to show sidebar properly if too narrow
    if (panelWidth < 700) {
      onWidthChange(Math.max(panelWidth, 700));
    }
  }, [panelWidth, onWidthChange, isDocumentCanvasOpen]);

  const handleCloseAgreementsSidebar = useCallback(() => {
    setIsAgreementsSidebarOpen(false);
  }, []);

  // Clear all selected agreements (dismisses the source filter)
  const handleClearAgreements = useCallback(() => {
    setSelectedAgreementIds(new Set());
  }, []);

  // Shared element transition state
  const [transitionState, setTransitionState] = useState<{
    isAnimating: boolean;
    sourceRect: DOMRect | null;
    agreement: Agreement | null;
  }>({ isAnimating: false, sourceRect: null, agreement: null });

  const handleAgreementClick = useCallback(
    (agreement: Agreement, itemRect: DOMRect | null) => {
      // Create citation for the document
      const citation: CitationData = {
        id: `cit-${agreement.id}`,
        documentId: agreement.id,
        documentTitle: agreement.fileName,
        section: 'Section 1.1',
        excerpt: 'Agreement document preview',
      };

      // Mark that doc preview was opened from sidebar
      setDocPreviewSource('sidebar');

      // Set the citation for the document canvas
      setActiveCitation(citation);

      // If we have the source rect, play a subtle departure animation
      if (itemRect) {
        // Start the ghost departure animation
        setTransitionState({
          isAnimating: true,
          sourceRect: itemRect,
          agreement,
        });

        // End transition state after animation completes (250ms)
        setTimeout(() => {
          setTransitionState({ isAnimating: false, sourceRect: null, agreement: null });
        }, 250);
      }

      // Close sidebar and open doc canvas immediately - let CSS handle the animations
      setIsAgreementsSidebarOpen(false);
      setIsDocumentCanvasOpen(true);

      // Expand panel for smooth transition
      if (panelWidth < window.innerWidth - 50) {
        onWidthChange(window.innerWidth);
      }
    },
    [panelWidth, onWidthChange]
  );

  const handleCitationClick = useCallback(
    (citation: CitationData) => {
      // Save scroll position before opening document canvas
      if (chatWrapperRef.current) {
        const scrollContainer = chatWrapperRef.current.querySelector(
          '[class*="messagesContainer"]'
        );
        if (scrollContainer) {
          savedScrollPositionRef.current = scrollContainer.scrollTop;
        }
      }
      // Close agreements sidebar if open (mutual exclusivity)
      if (isAgreementsSidebarOpen) {
        setIsAgreementsSidebarOpen(false);
      }
      // Mark that doc preview was opened from citation (not sidebar)
      setDocPreviewSource('citation');
      setActiveCitation(citation);
      setIsDocumentCanvasOpen(true);
      // Show loading skeleton briefly for polish
      setIsDocumentLoading(true);
      setTimeout(() => {
        setIsDocumentLoading(false);
      }, 400);
      // Auto-expand to fullscreen if not already expanded (to show document canvas properly)
      if (panelWidth < window.innerWidth - 50) {
        onWidthChange(window.innerWidth);
      }
    },
    [panelWidth, onWidthChange, isAgreementsSidebarOpen]
  );

  const handleCloseDocumentCanvas = useCallback(() => {
    setIsDocumentCanvasOpen(false);

    // If doc preview was opened from sidebar, reopen the sidebar
    if (docPreviewSource === 'sidebar') {
      setIsAgreementsSidebarOpen(true);
    }

    // Reset source tracker
    setDocPreviewSource(null);

    // Restore scroll position after closing document canvas
    // Use setTimeout to ensure the DOM has updated
    setTimeout(() => {
      if (chatWrapperRef.current) {
        const scrollContainer = chatWrapperRef.current.querySelector(
          '[class*="messagesContainer"]'
        );
        if (scrollContainer && savedScrollPositionRef.current > 0) {
          scrollContainer.scrollTo({ top: savedScrollPositionRef.current, behavior: 'smooth' });
        }
      }
    }, 100);
  }, [docPreviewSource]);

  // Slash command detection - monitor input for "/" prefix
  useEffect(() => {
    if (chatInputValue.startsWith('/')) {
      setShowSlashMenu(true);
      setSlashFilter(chatInputValue.slice(1).toLowerCase());
      setSlashSelectedIndex(0); // Reset selection when filter changes
    } else {
      setShowSlashMenu(false);
      setSlashFilter('');
    }
  }, [chatInputValue]);

  // Filter prompts based on slash filter
  const filteredSlashPrompts = useMemo(() => {
    const allPrompts = QUICK_ACTIONS.map((action) => ({
      id: action.label.toLowerCase().replace(/\s+/g, '-'),
      title: action.label,
      description: action.description || '',
      icon: action.icon || 'bolt',
      createdBy: action.createdBy || 'You',
      isSystem: action.isSystem || false,
    }));

    if (!slashFilter) {
      return allPrompts.slice(0, 4); // Show first 4 when no filter
    }

    return allPrompts
      .filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(slashFilter) ||
          prompt.description.toLowerCase().includes(slashFilter)
      )
      .slice(0, 4); // Max 4 visible
  }, [slashFilter]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key handling
      if (e.key === 'Escape') {
        e.preventDefault();
        // If streaming, skip to completion first
        if (canSkip) {
          skipRequestedRef.current = true;
          setCanSkip(false);
          return;
        }
        if (isDocumentCanvasOpen) {
          // Close document canvas first
          handleCloseDocumentCanvas();
        } else if (isHistoryOpen) {
          // Close history sidebar
          setIsHistoryOpen(false);
        } else if (isAgreementsSidebarOpen) {
          // Close agreements sidebar
          setIsAgreementsSidebarOpen(false);
        } else if (isOpen) {
          // Close the AI panel
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    isDocumentCanvasOpen,
    isHistoryOpen,
    isAgreementsSidebarOpen,
    handleCloseDocumentCanvas,
    onClose,
    canSkip,
  ]);

  // Generate a chat title from message content
  const generateChatTitle = useCallback((content: string): string => {
    // If it's a slash command, use a cleaned up version
    if (content.startsWith('/')) {
      const commandName = content
        .slice(1)
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return commandName;
    }

    // For regular messages, take first ~40 chars and clean up
    let title = content.trim();

    // Remove common question starters for cleaner titles
    title = title.replace(
      /^(what|how|can you|please|i need to|help me|show me|find|get|list)\s+/i,
      ''
    );

    // Capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);

    // Truncate if too long
    if (title.length > 40) {
      title = title.substring(0, 40).trim();
      // Try to cut at a word boundary
      const lastSpace = title.lastIndexOf(' ');
      if (lastSpace > 25) {
        title = title.substring(0, lastSpace);
      }
      title += '...';
    }

    return title || 'New Chat';
  }, []);

  const handleSendMessage = useCallback(
    (content: string, fromSuggestion = false) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
        metadata: fromSuggestion ? { fromSuggestion: true } : undefined,
      };

      // Generate title from first user message
      setMessages((prev) => {
        const isFirstMessage = prev.length === 0;
        if (isFirstMessage) {
          setChatTitle(generateChatTitle(content));
        }
        return [...prev, userMessage];
      });

      setIsLoading(true);

      // Check if this is a scripted prompt (markdown response)
      // Match case-insensitively by exact key, content starting with key, OR action marker
      const contentLower = content.toLowerCase().trim();

      // Define scenario flow: "yes" advances through these steps
      const scenarioFlow: Record<string, string> = {
        'Calculate Price Adjustment': 'yes', // After summary, "yes" triggers pricing history
        yes: 'sure', // After pricing history, "yes" triggers calculation
        'Show pricing history': 'sure', // Same as above
      };

      // Check if user said "yes" and determine what step to show
      let markdownKey: string | undefined;
      const isAffirmative = [
        'yes',
        'sure',
        'ok',
        'okay',
        'go ahead',
        'search',
        'calculate',
      ].includes(contentLower);

      if (isAffirmative && lastResponseKey) {
        // Advance to next step based on last response
        if (lastResponseKey === 'Calculate Price Adjustment') {
          markdownKey = 'yes'; // Show pricing history
        } else if (lastResponseKey === 'yes' || lastResponseKey === 'Show pricing history') {
          markdownKey = 'sure'; // Show calculation
        } else if (
          lastResponseKey === 'sure' ||
          lastResponseKey === 'search' ||
          lastResponseKey === 'calculate'
        ) {
          markdownKey = 'draft'; // Show draft amendment
        }
      }

      // If not an affirmative advancing the flow, do normal matching
      if (!markdownKey) {
        markdownKey = Object.keys(MARKDOWN_RESPONSES).find(
          (key) =>
            contentLower === key.toLowerCase() ||
            content.startsWith(`${key}:`) ||
            content.includes(`[Action: ${key}]`)
        );
      }

      const markdownResponse = markdownKey ? MARKDOWN_RESPONSES[markdownKey] : undefined;

      // Check for matrix responses (Turn 4 of risk assessment journey)
      const matrixKey = Object.keys(MATRIX_RESPONSES).find(
        (key) =>
          contentLower === key.toLowerCase() || content.toLowerCase().includes(key.toLowerCase())
      );
      const matrixResponse = matrixKey ? MATRIX_RESPONSES[matrixKey] : undefined;

      // Check if response has thinking steps (ThinkingSteps serves as loading indicator)
      const hasThinkingSteps =
        (markdownResponse?.thinkingSteps && markdownResponse.thinkingSteps.length > 0) ||
        (matrixResponse?.thinkingSteps && matrixResponse.thinkingSteps.length > 0);

      const aiMessageId = `ai-${Date.now()}`;
      let responseText = `I couldn't find a specific answer for that. Could you try rephrasing your question?`;

      if (matrixResponse) {
        // For matrix responses, use the introContent or a generic intro
        responseText = matrixResponse.introContent || `Here's the analysis:`;
      } else if (markdownResponse) {
        // Determine intro text based on the action
        if (markdownKey === 'Summarize Prevailing Terms') {
          responseText = `I've analyzed all 15 Acme agreements to identify the prevailing terms. Here's what I found:`;
        } else if (markdownKey === 'Check for Conflicts') {
          responseText = `I've cross-referenced all 15 Acme agreements to identify conflicting provisions. Here's what I found:`;
        } else {
          // Generic intro for other markdown responses
          responseText = `Here's what I found:`;
        }
      }

      if (hasThinkingSteps) {
        // Reset skip/stop state
        skipRequestedRef.current = false;
        stopRequestedRef.current = false;
        setCanSkip(true);

        // For responses with thinking steps: show ThinkingSteps immediately
        const aiMessage: ChatMessage = {
          id: aiMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);

        // Add markdown or matrix data immediately so ThinkingSteps renders
        if (matrixResponse) {
          setMatrixMessages((prev) => new Map(prev).set(aiMessageId, matrixResponse));
        } else if (markdownResponse) {
          setMarkdownMessages((prev) => new Map(prev).set(aiMessageId, markdownResponse));
        }
        // Mark as streaming for ThinkingSteps animation
        setStreamingMessageIds((prev) => new Set(prev).add(aiMessageId));
        // Start with thinking steps expanded
        setThinkingExpandedState((prev) => new Map(prev).set(aiMessageId, true));

        // Scroll so the user message + new AI response appear at the TOP (Gemini pattern)
        // Use a single delayed scroll after React has finished initial renders
        setTimeout(() => {
          scrollToNewResponseTop();
        }, 150);

        // Calculate delay for thinking animation (reduced by ~40% for snappier feel)
        // Each step: ~1.5-2s action + 0.5s result = ~2s average per step
        const thinkingSteps =
          matrixResponse?.thinkingSteps || markdownResponse?.thinkingSteps || [];
        const thinkingDuration = thinkingSteps.length * 2000 + 300;

        // Helper to complete streaming immediately (for skip)
        const completeStreaming = () => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: responseText } : msg))
          );
          setStreamingMarkdownContent((prev) => {
            const next = new Map(prev);
            next.delete(aiMessageId);
            return next;
          });
          setStreamingMessageIds((prev) => {
            const next = new Set(prev);
            next.delete(aiMessageId);
            return next;
          });
          setCanSkip(false);
          setLastResponseKey(matrixKey || markdownKey || null);
          // Stop scroll enforcement when streaming completes
          stopScrollEnforcement();
          scrollToBottom('smooth', true);
        };

        // After thinking animation completes, start text streaming
        setTimeout(() => {
          // Check if skip was requested during thinking
          if (skipRequestedRef.current || stopRequestedRef.current) {
            completeStreaming();
            return;
          }

          // For matrix responses, complete immediately (no markdown to stream)
          if (matrixResponse) {
            completeStreaming();
            return;
          }

          // Don't scroll here - keep user message at top (Gemini pattern)

          // Parse markdown content into semantic chunks for smarter streaming
          const fullContent = markdownResponse?.content || '';
          const introWords = responseText.split(' ');

          // Split content into semantic chunks: lines, but buffer table rows together
          const rawLines = fullContent.split('\n');
          const semanticChunks: string[] = [];
          let tableBuffer: string[] = [];

          for (const line of rawLines) {
            if (line.trim().startsWith('|')) {
              // Buffer table rows
              tableBuffer.push(line);
            } else {
              // Flush table buffer if we have one
              if (tableBuffer.length > 0) {
                semanticChunks.push(tableBuffer.join('\n'));
                tableBuffer = [];
              }
              semanticChunks.push(line);
            }
          }
          // Flush remaining table buffer
          if (tableBuffer.length > 0) {
            semanticChunks.push(tableBuffer.join('\n'));
          }

          let introIndex = 0;
          let chunkIndex = 0;
          let wordIndexInChunk = 0;

          // Stream intro text first, then markdown content by words/chunks
          const streamNextChunk = () => {
            // Check for skip/stop
            if (skipRequestedRef.current || stopRequestedRef.current) {
              completeStreaming();
              return;
            }

            // Phase 1: Stream intro text word by word
            if (introIndex < introWords.length) {
              const chunkSize = Math.floor(Math.random() * 3) + 1;
              const endIndex = Math.min(introIndex + chunkSize, introWords.length);
              const partialText = introWords.slice(0, endIndex).join(' ');

              setMessages((prev) =>
                prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: partialText } : msg))
              );

              introIndex = endIndex;
              // Don't auto-scroll during streaming - keep user message at top (Gemini pattern)

              const lastWord = introWords[endIndex - 1] || '';
              let delay = 20 + Math.random() * 25;
              if (lastWord.match(/[.!?]$/)) delay += 60;
              else if (lastWord.match(/[,;:]$/)) delay += 30;

              setTimeout(streamNextChunk, delay);
              return;
            }

            // Phase 2: Stream markdown content by semantic chunks
            if (chunkIndex < semanticChunks.length) {
              // Auto-collapse thinking steps when markdown content starts
              if (chunkIndex === 0 && wordIndexInChunk === 0) {
                setThinkingExpandedState((prev) => new Map(prev).set(aiMessageId, false));
              }

              const currentChunk = semanticChunks[chunkIndex];
              const isTable = currentChunk.includes('|');
              const isHeader = currentChunk.startsWith('#');
              const isList = currentChunk.startsWith('-') || currentChunk.match(/^\d+\./);

              // Tables render as complete blocks
              if (isTable) {
                const completedChunks = semanticChunks.slice(0, chunkIndex + 1);
                setStreamingMarkdownContent((prev) =>
                  new Map(prev).set(aiMessageId, completedChunks.join('\n'))
                );
                chunkIndex++;
                wordIndexInChunk = 0;
                // Don't auto-scroll - keep user message at top (Gemini pattern)
                setTimeout(streamNextChunk, 80 + Math.random() * 40); // Pause after table
                return;
              }

              // Headers and list items render as complete lines
              if (isHeader || isList || currentChunk.trim() === '') {
                const completedChunks = semanticChunks.slice(0, chunkIndex + 1);
                setStreamingMarkdownContent((prev) =>
                  new Map(prev).set(aiMessageId, completedChunks.join('\n'))
                );
                chunkIndex++;
                wordIndexInChunk = 0;
                // Don't auto-scroll - keep user message at top (Gemini pattern)
                const delay = currentChunk.trim() === '' ? 30 : 50 + Math.random() * 30;
                setTimeout(streamNextChunk, delay);
                return;
              }

              // Regular text: stream word by word
              const words = currentChunk.split(' ');
              const wordsPerChunk = 2 + Math.floor(Math.random() * 3); // 2-4 words at a time
              wordIndexInChunk = Math.min(wordIndexInChunk + wordsPerChunk, words.length);

              const partialLine = words.slice(0, wordIndexInChunk).join(' ');
              const completedChunks = semanticChunks.slice(0, chunkIndex);
              const partialMarkdown = [...completedChunks, partialLine].join('\n');

              setStreamingMarkdownContent((prev) =>
                new Map(prev).set(aiMessageId, partialMarkdown)
              );
              // Don't auto-scroll - keep user message at top (Gemini pattern)

              if (wordIndexInChunk >= words.length) {
                // Line complete, move to next chunk
                chunkIndex++;
                wordIndexInChunk = 0;
                const lastWord = words[words.length - 1] || '';
                let delay = 25 + Math.random() * 20;
                if (lastWord.match(/[.!?]$/)) delay += 50;
                else if (lastWord.match(/[,;:]$/)) delay += 25;
                setTimeout(streamNextChunk, delay);
              } else {
                // Continue streaming words in current line
                setTimeout(streamNextChunk, 15 + Math.random() * 20);
              }
              return;
            }

            // Phase 3: All done - mark streaming complete
            completeStreaming();
          };

          streamNextChunk();
        }, thinkingDuration);
      } else {
        // For responses without thinking steps: use skeleton delay
        setTimeout(() => {
          const aiMessage: ChatMessage = {
            id: aiMessageId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          setIsLoading(false);

          // Scroll to show the new AI message
          setTimeout(() => scrollToBottom('smooth'), 50);

          // Stream text with variable timing for realistic feel
          const words = responseText.split(' ');
          let currentIndex = 0;

          const streamNextChunk = () => {
            if (currentIndex >= words.length) {
              // After streaming completes, add markdown message data if applicable
              if (markdownResponse && markdownKey) {
                setMarkdownMessages((prev) => new Map(prev).set(aiMessageId, markdownResponse));
                setLastResponseKey(markdownKey);
              }
              return;
            }

            // Stream 1-3 words at a time (like real LLM tokens)
            const chunkSize = Math.floor(Math.random() * 3) + 1;
            const endIndex = Math.min(currentIndex + chunkSize, words.length);
            const partialText = words.slice(0, endIndex).join(' ');

            setMessages((prev) =>
              prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: partialText } : msg))
            );

            currentIndex = endIndex;

            // Variable delay: slower at punctuation, faster for common words
            const lastWord = words[endIndex - 1] || '';
            let delay = 25 + Math.random() * 30; // Base: 25-55ms
            if (lastWord.match(/[.!?]$/))
              delay += 80; // Pause at sentences
            else if (lastWord.match(/[,;:]$/))
              delay += 40; // Smaller pause at commas
            else if (lastWord.match(/\*\*$/)) delay += 20; // Slight pause at bold markers

            setTimeout(streamNextChunk, delay);
          };

          streamNextChunk();
        }, 1500); // Show skeleton for non-thinking responses
      }
    },
    [lastResponseKey, scrollToNewResponseTop, stopScrollEnforcement, scrollToBottom]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      // First check if this is a support action (no sources state)
      const supportAction = SUPPORT_ACTIONS.find((a) => a.label === suggestion);
      if (supportAction?.actionType) {
        switch (supportAction.actionType) {
          case 'auto-load-renewals': {
            // Auto-load agreements with upcoming renewals and start the flow
            // For demo: select first 5 agreements as "renewal" agreements
            const renewalAgreements = agreements.slice(0, 5);
            const renewalIds = new Set(renewalAgreements.map((a) => a.id));
            setSelectedAgreementIds(renewalIds);
            // Show attention on the context source
            setShowContextAttention(true);
            setTimeout(() => setShowContextAttention(false), 800);
            // Send the renewal analysis request
            setTimeout(() => {
              handleSendMessage('Show me upcoming renewal dates and key terms', true);
            }, 300);
            return;
          }
          case 'select-source':
            // Open the agreements sidebar to let user select agreements
            handleOpenAgreementsSidebar();
            return;
          case 'help':
            // Send help message
            handleSendMessage(suggestion, true);
            return;
        }
      }

      // Find if this is an action with expansion details (prompts state)
      const action = QUICK_ACTIONS.find((a) => a.label === suggestion);
      if (action?.expansion) {
        // Populate input field with expanded prompt for user to edit before submitting
        const expandedText = generateExpandedPromptText(action);
        setChatInputValue(expandedText);
        // Trigger ripple animation on input to draw attention
        setShowInputAttention(true);
        setTimeout(() => setShowInputAttention(false), 700);
      } else {
        // Send message directly for questions without expansion (mark as from suggestion)
        handleSendMessage(suggestion, true);
      }
    },
    [handleSendMessage, generateExpandedPromptText, agreements, handleOpenAgreementsSidebar]
  );

  // Handle slash command selection
  const handleSlashSelect = useCallback(
    (prompt: { id: string; title: string; description: string; icon: string }) => {
      const commandText = `/${prompt.id}`;
      setShowSlashMenu(false);
      setChatInputValue('');
      handleSendMessage(commandText, true); // Show /command in chat and run
    },
    [handleSendMessage]
  );

  // Handle input keydown - intercept Enter when slash menu is open
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent): boolean => {
      if (!showSlashMenu || filteredSlashPrompts.length === 0) {
        return false; // Let AIChat handle it normally
      }

      // Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSlashSelectedIndex((prev) => (prev + 1) % filteredSlashPrompts.length);
        return true;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSlashSelectedIndex(
          (prev) => (prev - 1 + filteredSlashPrompts.length) % filteredSlashPrompts.length
        );
        return true;
      }

      // Enter to select
      if (e.key === 'Enter') {
        e.preventDefault();
        const selectedPrompt = filteredSlashPrompts[slashSelectedIndex];
        if (selectedPrompt) {
          const commandText = `/${selectedPrompt.id}`;
          setShowSlashMenu(false);
          setChatInputValue('');
          handleSendMessage(commandText, true);
        }
        return true; // Prevent AIChat from also sending
      }

      // Escape to close
      if (e.key === 'Escape') {
        e.preventDefault();
        setChatInputValue('');
        setShowSlashMenu(false);
        return true;
      }

      return false;
    },
    [showSlashMenu, filteredSlashPrompts, slashSelectedIndex, handleSendMessage]
  );

  // Skip streaming - jump to final result
  const handleSkip = useCallback(() => {
    skipRequestedRef.current = true;
    setCanSkip(false);
  }, []);

  // Stop generation - halt where we are
  const handleStop = useCallback(() => {
    stopRequestedRef.current = true;
    setCanSkip(false);
  }, []);

  // Scroll to bottom button click
  const handleScrollToBottomClick = useCallback(() => {
    scrollToBottom('smooth', true);
    setShowScrollToBottom(false);
  }, [scrollToBottom]);

  // Custom message renderer for markdown and matrix messages
  const renderMessage = useCallback(
    (message: ChatMessage) => {
      const markdownData = markdownMessages.get(message.id);
      const matrixData = matrixMessages.get(message.id);

      if (message.role === 'assistant') {
        // Feedback buttons component for AI responses
        const feedbackButtons = (
          <div className={styles.messageFeedback}>
            <Tooltip content="Good response">
              <IconButton
                icon="thumbs-up"
                size="small"
                variant="tertiary"
                aria-label="Good response"
              />
            </Tooltip>
            <Tooltip content="Bad response">
              <IconButton
                icon="thumbs-down"
                size="small"
                variant="tertiary"
                aria-label="Bad response"
              />
            </Tooltip>
            <Tooltip content="Copy">
              <IconButton
                icon="duplicate"
                size="small"
                variant="tertiary"
                aria-label="Copy response"
              />
            </Tooltip>
          </div>
        );

        // Render matrix message (Risk Assessment Matrix - Turn 4)
        if (matrixData) {
          const isMessageStreaming = streamingMessageIds.has(message.id);

          return (
            <div className={styles.richMessageWrapper}>
              {matrixData.thinkingSteps && matrixData.thinkingSteps.length > 0 && (
                <ThinkingSteps
                  steps={matrixData.thinkingSteps}
                  isStreaming={isMessageStreaming}
                  isExpanded={thinkingExpandedState.get(message.id) ?? !isMessageStreaming}
                  onExpandedChange={(expanded) => {
                    setThinkingExpandedState((prev) => new Map(prev).set(message.id, expanded));
                  }}
                  onStepChange={() => {
                    // Don't auto-scroll during thinking - keep user message at top (Gemini pattern)
                  }}
                  onAnswerNow={handleSkip}
                />
              )}
              {/* Show intro text */}
              {message.content && <p className={styles.richMessageIntro}>{message.content}</p>}
              {/* Show matrix after streaming completes */}
              {!isMessageStreaming && (
                <>
                  <MatrixView
                    data={matrixData.matrix}
                    citations={matrixData.citations}
                    onCitationClick={handleCitationClick}
                  />
                  {/* Summary content below matrix */}
                  {matrixData.summaryContent && (
                    <p className={styles.matrixSummary}>{matrixData.summaryContent}</p>
                  )}
                </>
              )}
              {!isMessageStreaming && feedbackButtons}
            </div>
          );
        }

        // Render markdown message (Prevailing Terms or Conflicts)
        if (markdownData) {
          const isMessageStreaming = streamingMessageIds.has(message.id);
          const partialMarkdown = streamingMarkdownContent.get(message.id);
          // Show markdown when we have partial content OR streaming is complete
          const showMarkdown = partialMarkdown !== undefined || !isMessageStreaming;
          // Use partial content while streaming, full content when complete
          const markdownToRender = partialMarkdown ?? markdownData.content;

          return (
            <div className={styles.richMessageWrapper}>
              {markdownData.thinkingSteps && markdownData.thinkingSteps.length > 0 && (
                <ThinkingSteps
                  steps={markdownData.thinkingSteps}
                  isStreaming={isMessageStreaming}
                  isExpanded={thinkingExpandedState.get(message.id) ?? !isMessageStreaming}
                  onExpandedChange={(expanded) => {
                    setThinkingExpandedState((prev) => new Map(prev).set(message.id, expanded));
                  }}
                  onStepChange={() => {
                    // Don't auto-scroll during thinking - keep user message at top (Gemini pattern)
                  }}
                  onAnswerNow={handleSkip}
                />
              )}
              {/* Show intro text once it starts streaming (message.content is populated) */}
              {message.content && (
                <p className={styles.richMessageIntro}>
                  {message.content}
                  {/* Pulsing cursor while streaming intro (before markdown starts) */}
                  {isMessageStreaming && !partialMarkdown && (
                    <span className={styles.streamingCursor} />
                  )}
                </p>
              )}
              {/* Show markdown as it streams in */}
              {showMarkdown && markdownToRender && (
                <>
                  <MarkdownMessage
                    content={markdownToRender}
                    citations={markdownData.citations}
                    onCitationClick={handleCitationClick}
                  />
                  {/* Pulsing cursor at end of streaming markdown */}
                  {isMessageStreaming && partialMarkdown && (
                    <span className={styles.streamingCursor} />
                  )}
                </>
              )}
              {!isMessageStreaming && markdownData.documentPreview && (
                <DocumentPreviewCard
                  title={markdownData.documentPreview.title}
                  label={markdownData.documentPreview.label}
                  status={markdownData.documentPreview.status}
                  details={markdownData.documentPreview.details}
                  onDownload={() => {
                    // Simulate download
                    setToastState({
                      visible: true,
                      message: 'Downloading Amendment #4...',
                      status: 'loading',
                    });
                    setTimeout(() => {
                      setToastState({
                        visible: true,
                        message: 'Amendment #4 downloaded successfully',
                        status: 'success',
                      });
                      setTimeout(
                        () => setToastState((prev) => ({ ...prev, visible: false })),
                        2000
                      );
                    }, 1500);
                  }}
                  onOpenFullView={() => {
                    // Open document in canvas
                    const citation = {
                      id: 'draft-preview',
                      documentId: markdownData.documentPreview?.documentId || 'draft-amendment-4',
                      documentTitle: markdownData.documentPreview?.title || 'Draft Amendment',
                      section: '§1.1 Price Adjustment',
                      excerpt: 'Draft amendment for 2025 pricing adjustment',
                    };
                    handleCitationClick(citation);
                  }}
                />
              )}
              {!isMessageStreaming && feedbackButtons}
            </div>
          );
        }
      }

      // Render user message from suggestion with special "Selected" styling
      if (message.role === 'user' && message.metadata?.fromSuggestion) {
        return (
          <div className={styles.selectedMessage}>
            <span className={styles.selectedLabel}>Selected</span>
            <div className={styles.selectedBubble}>
              <Icon name="status-check" size={16} />
              <span>{message.content}</span>
            </div>
          </div>
        );
      }

      // Render long user messages as collapsible (collapsed by default)
      if (message.role === 'user') {
        const isLongMessage =
          message.content.length > 300 || (message.content.match(/\n/g) || []).length > 5;
        const isExpanded = expandedUserMessages.has(message.id);

        if (isLongMessage) {
          const toggleExpand = () => {
            setExpandedUserMessages((prev) => {
              const next = new Set(prev);
              if (next.has(message.id)) {
                next.delete(message.id);
              } else {
                next.add(message.id);
              }
              return next;
            });
          };

          return (
            <div className={styles.collapsibleUserMessage}>
              <div
                className={`${styles.collapsibleContent} ${isExpanded ? styles.expanded : styles.collapsed}`}
              >
                {message.content}
              </div>
              <Tooltip text={isExpanded ? 'Collapse' : 'Expand'} location="before">
                <button
                  type="button"
                  className={styles.expandCollapseButton}
                  onClick={toggleExpand}
                >
                  <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size="small" />
                </button>
              </Tooltip>
            </div>
          );
        }
      }

      return null; // Return null to use default rendering
    },
    [
      markdownMessages,
      matrixMessages,
      handleCitationClick,
      expandedUserMessages,
      streamingMessageIds,
      streamingMarkdownContent,
      thinkingExpandedState,
      handleSkip,
      scrollToBottom,
    ]
  );

  // Handle drag resize
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onStartResize();

      // Dismiss the "Go wide!" tooltip when user starts dragging
      setShowResizeTooltip(false);

      const startX = e.clientX;
      const startWidth = panelWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = startX - moveEvent.clientX;
        // Use window.innerWidth dynamically to handle window resizes
        const maxWidth = window.innerWidth;
        const newWidth = Math.min(maxWidth, Math.max(MIN_PANEL_WIDTH, startWidth + deltaX));
        onWidthChange(newWidth);
      };

      const handleMouseUp = () => {
        onEndResize();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [panelWidth, onWidthChange, onStartResize, onEndResize]
  );

  const handleToggleExpand = useCallback(() => {
    if (panelWidth >= window.innerWidth - 50) {
      // Collapse to 40% of window width (matches initial open width)
      const wideWidth = Math.floor(window.innerWidth * 0.4);
      onWidthChange(wideWidth);
    } else {
      onWidthChange(window.innerWidth);
    }
  }, [panelWidth, onWidthChange]);

  const handleToggleHistory = useCallback(() => {
    setIsHistoryOpen((prev) => !prev);
  }, []);

  const handleNewChat = useCallback(() => {
    // Clear current conversation and start fresh
    setMessages([]);
    setMarkdownMessages(new Map());
    setMatrixMessages(new Map());
    setActiveHistoryId(null);
    setIsDocumentCanvasOpen(false);
    setCurrentView('chat'); // Return to chat view
    // Increment key to replay welcome animations
    setWelcomeKey((k) => k + 1);
    setActiveCitation(null);
    setChatTitle('New Chat'); // Reset title for new chat
  }, []);

  const handleHistoryItemClick = useCallback(
    (id: string, title: string) => {
      setActiveHistoryId(id);
      setCurrentView('chat'); // Return to chat view when clicking history item
      setChatTitle(title); // Set the chat title from history

      // Load stored conversation for this history item
      const storedMessages = STORED_CONVERSATIONS[id];
      if (storedMessages) {
        setMessages(storedMessages);
        // Clear markdown and matrix messages when switching conversations
        setMarkdownMessages(new Map());
        setMatrixMessages(new Map());
      }

      if (!useInlineHistory) {
        setIsHistoryOpen(false);
      }
    },
    [useInlineHistory]
  );

  const isExpanded = panelWidth > 600;

  const panelClasses = [
    styles.aiPanel,
    isOpen ? styles.aiPanelOpen : '',
    isResizing ? styles.aiPanelResizing : '',
    isExpanded ? styles.aiPanelExpanded : '',
  ]
    .filter(Boolean)
    .join(' ');

  const contentWrapperClasses = [
    styles.aiChatContentWrapper,
    !isExpanded ? styles.aiChatContentWrapperNarrow : '',
  ]
    .filter(Boolean)
    .join(' ');

  const historyPanelClasses = useSidebarInline
    ? [
        styles.historyPanel,
        styles.historyPanelInline,
        !isHistoryOpen ? styles.historyPanelInlineHidden : '',
      ]
        .filter(Boolean)
        .join(' ')
    : [
        styles.historyPanel,
        styles.historyPanelOverlay,
        isHistoryOpen ? styles.historyPanelOpen : '',
      ]
        .filter(Boolean)
        .join(' ');

  const historyOverlayClasses = [
    styles.historyOverlay,
    !useInlineHistory && isHistoryOpen ? styles.historyOverlayVisible : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Handle prompt library navigation
  const handleNavigateToPrompts = useCallback(() => {
    setCurrentView('prompts');
    setActiveHistoryId(null); // Clear history selection when navigating to prompts
    if (!useInlineHistory) {
      setIsHistoryOpen(false);
    }
  }, [useInlineHistory]);

  // Handle prompt edit navigation
  const handleEditPrompt = useCallback(
    (promptId: string) => {
      setEditingPromptId(promptId);
      setCurrentView('prompt-edit');
      if (!useInlineHistory) {
        setIsHistoryOpen(false);
      }
    },
    [useInlineHistory]
  );

  // Handle prompt creation
  const handleCreatePrompt = useCallback(() => {
    setEditingPromptId(null); // null means creating new
    setCurrentView('prompt-edit');
    if (!useInlineHistory) {
      setIsHistoryOpen(false);
    }
  }, [useInlineHistory]);

  // Handle back from prompt editor
  const handleBackFromEditor = useCallback(() => {
    setCurrentView('prompts');
    setEditingPromptId(null);
  }, []);

  // Handle saving a prompt (create or update)
  const handleSavePrompt = useCallback((promptData: Omit<Prompt, 'id'> & { id?: string }) => {
    if (promptData.id) {
      // Update existing prompt
      setUserPrompts((prev) =>
        prev.map((p) => (p.id === promptData.id ? { ...p, ...promptData } : p))
      );
    } else {
      // Create new prompt with unique ID
      const newPrompt: Prompt = {
        ...promptData,
        id: `custom-${Date.now()}`,
      };
      setUserPrompts((prev) => [...prev, newPrompt]);
    }
    // Return to library after save
    setCurrentView('prompts');
    setEditingPromptId(null);
  }, []);

  // Find the prompt being edited
  const editingPrompt = useMemo(() => {
    if (!editingPromptId) return null;
    return userPrompts.find((p) => p.id === editingPromptId) || null;
  }, [editingPromptId, userPrompts]);

  // Handle selecting a prompt from the library (runs it)
  const handleSelectPrompt = useCallback(
    (prompt: Prompt) => {
      setCurrentView('chat');
      // Send the prompt as a message
      handleSendMessage(prompt.title);
    },
    [handleSendMessage]
  );

  const renderHistoryContent = () => (
    <>
      <div className={styles.sidebarHeader}>
        <Tooltip content="Close menu">
          <IconButton
            icon="menu"
            size="small"
            kind="tertiary"
            onClick={() => setIsHistoryOpen(false)}
            aria-label="Close menu"
          />
        </Tooltip>
      </div>

      {/* Navigation Section */}
      <div className={styles.sidebarNav}>
        <button
          type="button"
          className={`${styles.sidebarNavItem} ${currentView === 'prompts' ? styles.sidebarNavItemActive : ''}`}
          onClick={handleNavigateToPrompts}
        >
          <span>Prompt Library</span>
          <Icon name="chevron-right" size={14} className={styles.sidebarNavChevron} />
        </button>
      </div>

      {/* Divider */}
      <div className={styles.sidebarDivider} />

      <div className={styles.historyList}>
        <List size="small" hoverable className={styles.historyListComponent}>
          {[...CHAT_HISTORY.today, ...CHAT_HISTORY.yesterday, ...CHAT_HISTORY.lastWeek].map(
            (item) => (
              <List.Item
                key={item.id}
                clickable
                selected={activeHistoryId === item.id}
                onClick={() => handleHistoryItemClick(item.id, item.title)}
              >
                {item.title}
              </List.Item>
            )
          )}
        </List>
      </div>
    </>
  );

  return (
    <div ref={panelRef} className={panelClasses} style={{ width: isOpen ? panelWidth : 0 }}>
      {isOpen && (
        <div className={styles.dragHandle} onMouseDown={handleMouseDown}>
          <div className={styles.dragHandleBar} />

          {/* "Go wide!" discoverability tooltip */}
          {showResizeTooltip && (
            <div className={styles.resizeTooltip}>
              <div className={styles.resizeTooltipContent}>
                <Icon name="arrow-left" size={14} />
                <span>Go wide!</span>
              </div>
              <button
                type="button"
                className={styles.resizeTooltipDismiss}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowResizeTooltip(false);
                }}
                aria-label="Dismiss tooltip"
              >
                <Icon name="close" size={12} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Layout - Sidebar and Content as siblings, each with own header */}
      <div className={styles.aiPanelLayout}>
        {/* Sidebar - inline when wide, overlay when narrow */}
        <div className={historyPanelClasses}>{renderHistoryContent()}</div>

        {/* Overlay backdrop - only for overlay mode */}
        <div className={historyOverlayClasses} onClick={() => setIsHistoryOpen(false)} />

        {/* Main content area - contains shared header + content body */}
        <div className={styles.aiPanelContent}>
          {/* Content Header - shared across chat, sidebar, and doc canvas */}
          <div className={styles.contentHeader}>
            <div className={styles.contentHeaderLeft}>
              {currentView === 'prompt-edit' ? (
                <Tooltip content="Back to Prompts">
                  <IconButton
                    icon="arrow-left"
                    size="small"
                    kind="tertiary"
                    onClick={handleBackFromEditor}
                    aria-label="Back to Prompts"
                  />
                </Tooltip>
              ) : !isHistoryOpen ? (
                <Tooltip content="Menu">
                  <IconButton
                    icon="menu"
                    size="small"
                    kind="tertiary"
                    onClick={handleToggleHistory}
                    aria-label="Show menu"
                  />
                </Tooltip>
              ) : null}
            </div>
            <div className={styles.contentHeaderCenter}>
              {currentView === 'prompts' && (
                <h2 className={styles.contentHeaderTitle}>Prompt Library</h2>
              )}
              {currentView === 'prompt-edit' && (
                <h2 className={styles.contentHeaderTitle}>
                  {editingPromptId ? 'Edit Prompt' : 'New Prompt'}
                </h2>
              )}
              {currentView === 'chat' && messages.length > 0 && (
                <h2 className={styles.contentHeaderTitle}>{chatTitle}</h2>
              )}
            </div>
            <div className={styles.contentHeaderRight}>
              {panelWidth >= OVERFLOW_THRESHOLD ? (
                <>
                  <Tooltip content="New chat">
                    <IconButton
                      icon="plus"
                      size="small"
                      kind="tertiary"
                      onClick={handleNewChat}
                      aria-label="New chat"
                    />
                  </Tooltip>
                  <Tooltip content="Maximize">
                    <IconButton
                      icon="container-enlarge"
                      size="small"
                      kind="tertiary"
                      onClick={handleToggleExpand}
                      aria-label="Maximize"
                    />
                  </Tooltip>
                </>
              ) : (
                <Dropdown
                  items={[
                    {
                      label: 'New chat',
                      icon: <Icon name="plus" size="small" />,
                      onClick: handleNewChat,
                    },
                    {
                      label: 'Maximize',
                      icon: <Icon name="container-enlarge" size="small" />,
                      onClick: handleToggleExpand,
                    },
                  ]}
                  position="bottom"
                  align="end"
                >
                  <IconButton
                    icon="overflow-horizontal"
                    size="small"
                    kind="tertiary"
                    aria-label="More options"
                  />
                </Dropdown>
              )}
              <Tooltip content="Close">
                <IconButton
                  icon="close"
                  size="small"
                  kind="tertiary"
                  onClick={onClose}
                  aria-label="Close"
                />
              </Tooltip>
            </div>
          </div>

          {/* Content Body - flex row containing chat, sidebar, and doc canvas */}
          <div className={styles.contentBody}>
            {/* Chat Area */}
            <div
              className={`${styles.chatArea} ${isNarrowMode && isDocumentCanvasOpen ? styles.chatAreaHidden : ''}`}
            >
              <div ref={chatWrapperRef} className={contentWrapperClasses}>
                {/* Chat View */}
                {currentView === 'chat' && (
                  <div
                    key="chat-view"
                    className={styles.viewTransition}
                    style={{ display: 'contents' }}
                  >
                    <AIChat
                      key={welcomeKey}
                      messages={messages}
                      onSendMessage={handleSendMessage}
                      isLoading={isLoading}
                      userName={userName}
                      assistantName="Docusign AI"
                      welcomeTitle={
                        selectedAgreementIds.size > 0
                          ? 'What would you like to know?'
                          : 'How can I help you today?'
                      }
                      suggestedActions={
                        selectedAgreementIds.size > 0 ? QUICK_ACTIONS : SUPPORT_ACTIONS
                      }
                      suggestedActionsTitle={selectedAgreementIds.size > 0 ? 'Prompts' : 'Actions'}
                      onSuggestedActionsHeaderClick={
                        selectedAgreementIds.size > 0 ? handleNavigateToPrompts : undefined
                      }
                      suggestedQuestions={
                        selectedAgreementIds.size > 0 ? undefined : SUPPORT_QUESTIONS
                      }
                      suggestedQuestionsTitle="Questions you can ask"
                      onSuggestionClick={handleSuggestionClick}
                      placeholder={
                        selectedAgreementIds.size > 0
                          ? 'Ask anything about selected agreements...'
                          : 'Ask a question or search for agreements...'
                      }
                      showHeader={false}
                      onClose={onClose}
                      onShowHistory={handleToggleHistory}
                      onNewChat={handleNewChat}
                      onMaximize={handleToggleExpand}
                      maxHeight="100%"
                      className={styles.aiChatContainer}
                      renderMessage={renderMessage}
                      contextSource={
                        agreements.length > 0 && selectedAgreementIds.size > 0
                          ? {
                              count: selectedAgreementIds.size,
                              label: 'agreements',
                              onClick: handleOpenAgreementsSidebar,
                              onClear: handleClearAgreements,
                            }
                          : undefined
                      }
                      showContextAttention={showContextAttention}
                      showInputAttention={showInputAttention}
                      inputValue={chatInputValue}
                      onInputChange={setChatInputValue}
                      isStreaming={canSkip}
                      onStop={handleStop}
                      disableAutoScroll={true}
                      onInputKeyDown={handleInputKeyDown}
                    />

                    {/* Slash Command Menu - positioned above input */}
                    {showSlashMenu && filteredSlashPrompts.length > 0 && (
                      <div className={styles.slashMenuWrapper}>
                        <div className={styles.slashMenu}>
                          {filteredSlashPrompts.map((prompt, index) => (
                            <button
                              key={prompt.id}
                              type="button"
                              className={`${styles.slashMenuItem} ${index === slashSelectedIndex ? styles.slashMenuItemSelected : ''}`}
                              onClick={() => handleSlashSelect(prompt)}
                              onMouseEnter={() => setSlashSelectedIndex(index)}
                            >
                              <span className={styles.slashMenuItemCommand}>/{prompt.id}</span>
                              <span className={styles.slashMenuItemMeta}>
                                {prompt.description}
                                <span className={styles.slashMenuItemDot}>·</span>
                                {prompt.createdBy}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scroll to bottom button - appears when user scrolls up during streaming */}
                    {showScrollToBottom && (
                      <button
                        type="button"
                        className={styles.scrollToBottomButton}
                        onClick={handleScrollToBottomClick}
                      >
                        <Icon name="arrow-down" size={14} />
                        New content
                      </button>
                    )}
                  </div>
                )}

                {/* Prompt Library View */}
                {currentView === 'prompts' && (
                  <div key="prompts-view" className={styles.viewTransition}>
                    <PromptLibrary
                      onSelectPrompt={handleSelectPrompt}
                      onEditPrompt={handleEditPrompt}
                      onCreatePrompt={handleCreatePrompt}
                      userPrompts={userPrompts}
                    />
                  </div>
                )}

                {/* Prompt Editor View */}
                {currentView === 'prompt-edit' && (
                  <div key="prompt-edit-view" className={styles.viewTransition}>
                    <PromptEditor
                      promptId={editingPromptId}
                      existingPrompt={editingPrompt}
                      onSave={handleSavePrompt}
                      onCancel={handleBackFromEditor}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Agreements Sidebar - Shows loaded agreements in context */}
            <AgreementsSidebar
              isOpen={isAgreementsSidebarOpen}
              onClose={handleCloseAgreementsSidebar}
              agreements={agreements}
              onAgreementClick={handleAgreementClick}
              selectedIds={selectedAgreementIds}
              onSelectionChange={setSelectedAgreementIds}
            />

            {/* Document Canvas - Gemini-style split view when citation clicked */}
            <DocumentCanvas
              isOpen={isDocumentCanvasOpen}
              citation={activeCitation}
              onClose={handleCloseDocumentCanvas}
              isNarrowMode={isNarrowMode}
              isLoading={isDocumentLoading}
            />
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        onShare={handleShare}
        onCopyLink={handleCopyLinkFromModal}
        shareLink={shareLink}
      />

      {/* Toast Notification */}
      <Toast
        isVisible={toastState.visible}
        message={toastState.message}
        status={toastState.status}
      />

      {/* Shared Element Transition Ghost */}
      {transitionState.isAnimating && transitionState.sourceRect && transitionState.agreement && (
        <div
          className={styles.transitionGhost}
          style={
            {
              '--source-top': `${transitionState.sourceRect.top}px`,
              '--source-left': `${transitionState.sourceRect.left}px`,
              '--source-width': `${transitionState.sourceRect.width}px`,
              '--source-height': `${transitionState.sourceRect.height}px`,
            } as React.CSSProperties
          }
        >
          <div className={styles.transitionGhostContent}>
            <Icon name="document" size={18} />
            <span>{transitionState.agreement.fileName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
