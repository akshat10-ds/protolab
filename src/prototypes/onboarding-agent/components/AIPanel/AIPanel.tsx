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
} from '@/design-system';

// Types
import type {
  RichMessageData,
  CitationData,
  ConflictData,
  Agreement,
  ExtendedSuggestedAction,
  ThinkingStep,
  AgentAction,
} from '../../data/agreement-studio-types';

// Data - Using onboarding-specific content
import {
  ONBOARDING_CHECKLIST,
  SUGGESTED_QUESTIONS,
  CHAT_HISTORY,
  STORED_CONVERSATIONS,
  SCRIPTED_RESPONSES,
  CONFLICT_RESPONSES,
  AGENT_ACTIONS,
  TOOL_CALLS,
  WELCOME_CONFIG,
} from '../../data/onboarding-data';
import type { ToolCall, ToolCallType, OnboardingStep } from '../../data/onboarding-data';

// Tool-based UI Components
import { ProfileForm, BrandingTool, AgentDelegation } from '../ToolUI';
import type { ProfileData, BrandColors, AgentType } from '../ToolUI';

// Components
import { Toast } from '../Toast';
import { ShareModal } from '../ShareModal';
import { RichMessage } from '../RichMessage';
import { DocumentCanvas } from '../DocumentCanvas';
import { AgreementsSidebar } from '../AgreementsSidebar';
import { ConflictView } from '../ConflictView';
import { ThinkingSteps } from '../ThinkingSteps';
import { AgentActionCard } from '../AgentActionCard';

import styles from './AIPanel.module.css';

// Breakpoint for narrow mode (canvas takes full width with back button)
const NARROW_BREAKPOINT = 700;
// Breakpoint for showing header icons in overflow menu
const OVERFLOW_THRESHOLD = 420;

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
  const panelRef = useRef<HTMLDivElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);
  const savedScrollPositionRef = useRef<number>(0);

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

  // Rich message and document viewer state
  const [richMessages, setRichMessages] = useState<Map<string, RichMessageData>>(new Map());
  const [conflictMessages, setConflictMessages] = useState<Map<string, ConflictData[]>>(new Map());
  const [isDocumentCanvasOpen, setIsDocumentCanvasOpen] = useState(false);
  const [activeCitation, setActiveCitation] = useState<CitationData | null>(null);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);

  // Agent thinking and action state
  const [thinkingSteps, setThinkingSteps] = useState<Map<string, ThinkingStep[]>>(new Map());
  const [agentActions, setAgentActions] = useState<Map<string, AgentAction[]>>(new Map());
  const [streamingText, setStreamingText] = useState<string>('');
  const [activeToolCall, setActiveToolCall] = useState<{ name: string; params?: Record<string, string> } | null>(null);

  // Tool-based UI state
  const [toolUIs, setToolUIs] = useState<Map<string, { type: ToolCallType; params: Record<string, unknown> }>>(new Map());
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);
  const [hasCompletedProfiling, setHasCompletedProfiling] = useState(false);
  const [delegationStatus, setDelegationStatus] = useState<Map<string, 'connecting' | 'active' | 'complete' | 'error'>>(new Map());

  // Onboarding checklist state - track completed steps
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Track which long user messages are expanded (collapsed by default)
  const [expandedUserMessages, setExpandedUserMessages] = useState<Set<string>>(new Set());

  // Controlled input state for expanded prompts
  const [chatInputValue, setChatInputValue] = useState('');

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

  const useInlineHistory = panelWidth >= INLINE_HISTORY_THRESHOLD;

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        // Allow Cmd/Ctrl+Enter in input to send message
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
          e.preventDefault();
          // Trigger send if there's input value
          if (chatInputValue.trim()) {
            const inputEl = chatWrapperRef.current?.querySelector('textarea, input[type="text"]');
            if (inputEl) {
              // Dispatch a submit event or trigger the send handler
              const form = inputEl.closest('form');
              if (form) {
                form.requestSubmit();
              }
            }
          }
        }
        return;
      }

      // Escape key handling
      if (e.key === 'Escape') {
        e.preventDefault();
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
    chatInputValue,
    handleCloseDocumentCanvas,
    onClose,
  ]);

  const handleSendMessage = useCallback((content: string, fromSuggestion = false) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      metadata: fromSuggestion ? { fromSuggestion: true } : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    // Check for tool call (branding, send, Q&A)
    const toolCallKey = Object.keys(TOOL_CALLS).find(
      (key) => content === key || content.toLowerCase().includes(key.toLowerCase())
    );
    const toolCallData = toolCallKey ? TOOL_CALLS[toolCallKey] : undefined;

    // Check if this is a scripted prompt (rich message or conflict)
    // Match by exact key, content starting with key, OR action marker in expanded prompts
    const scriptedKey = Object.keys(SCRIPTED_RESPONSES).find(
      (key) =>
        content === key || content.startsWith(`${key}:`) || content.includes(`[Action: ${key}]`)
    );
    const conflictKey = Object.keys(CONFLICT_RESPONSES).find(
      (key) =>
        content === key || content.startsWith(`${key}:`) || content.includes(`[Action: ${key}]`)
    );

    // Check for thinking sequence
    const thinkingKey = Object.keys(THINKING_SEQUENCES).find(
      (key) =>
        content === key || content.startsWith(`${key}:`) || content.includes(`[Action: ${key}]`)
    );

    const scriptedResponse = scriptedKey ? SCRIPTED_RESPONSES[scriptedKey] : undefined;
    const conflictResponse = conflictKey ? CONFLICT_RESPONSES[conflictKey] : undefined;
    const thinkingSequence = thinkingKey ? THINKING_SEQUENCES[thinkingKey] : undefined;
    const actionsForKey = thinkingKey ? AGENT_ACTIONS[thinkingKey] : undefined;

    const aiMessageId = `ai-${Date.now()}`;

    // If this is a tool call, show thinking steps first then render the tool UI
    if (toolCallData && thinkingSequence) {
      // Initialize thinking steps (all pending)
      const initialSteps = thinkingSequence.map(step => ({ ...step, status: 'pending' as const }));
      setThinkingSteps(prev => new Map(prev).set(aiMessageId, initialSteps));
      setIsLoading(false);

      // Add a placeholder AI message
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Progressive step reveal
      let stepIndex = 0;
      const stepDurations = [400, 600, 500, 400];

      const progressToolStep = () => {
        if (stepIndex < initialSteps.length) {
          setThinkingSteps(prev => {
            const steps = prev.get(aiMessageId) || [];
            const updatedSteps = steps.map((s, i) => {
              if (i === stepIndex) return { ...s, status: 'active' as const, progress: 0 };
              if (i < stepIndex) return { ...s, status: 'complete' as const, duration: stepDurations[i] };
              return s;
            });
            return new Map(prev).set(aiMessageId, updatedSteps);
          });

          let progress = 0;
          const progressInterval = setInterval(() => {
            progress += 15;
            setThinkingSteps(prev => {
              const steps = prev.get(aiMessageId) || [];
              const updatedSteps = steps.map((s, i) => {
                if (i === stepIndex) return { ...s, progress: Math.min(progress, 100) };
                return s;
              });
              return new Map(prev).set(aiMessageId, updatedSteps);
            });

            if (progress >= 100) {
              clearInterval(progressInterval);
              stepIndex++;
              setTimeout(progressToolStep, 150);
            }
          }, stepDurations[stepIndex] / 7);
        } else {
          // All steps complete - now render the tool UI
          setThinkingSteps(prev => {
            const steps = prev.get(aiMessageId) || [];
            const updatedSteps = steps.map((s, i) => ({
              ...s,
              status: 'complete' as const,
              duration: stepDurations[i] || 400,
            }));
            return new Map(prev).set(aiMessageId, updatedSteps);
          });

          // Set an intro message based on tool type
          let introText = '';
          if (toolCallData.type === 'branding_tool') {
            introText = "I found your brand colors! Here's what I detected:";
          } else if (toolCallData.type === 'agent_delegation') {
            introText = `I'll connect you with the ${toolCallData.params?.targetAgent === 'send' ? 'Send' : 'Q&A'} Agent to help with this.`;
          } else if (toolCallData.type === 'profile_form') {
            introText = "Let me learn more about your business to personalize your experience.";
          }

          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: introText } : msg))
          );

          // Add the tool UI
          setToolUIs(prev => new Map(prev).set(aiMessageId, {
            type: toolCallData.type,
            params: toolCallData.params || {},
          }));

          // For delegation, simulate the connection process
          if (toolCallData.type === 'agent_delegation') {
            setDelegationStatus(prev => new Map(prev).set(aiMessageId, 'connecting'));
            setTimeout(() => {
              setDelegationStatus(prev => new Map(prev).set(aiMessageId, 'active'));
            }, 1500);
          }
        }
      };

      setTimeout(progressToolStep, 400);
      return;
    }

    // If we have a thinking sequence, show it with progressive reveal
    if (thinkingSequence) {
      // Initialize thinking steps (all pending)
      const initialSteps = thinkingSequence.map(step => ({ ...step, status: 'pending' as const }));
      setThinkingSteps(prev => new Map(prev).set(aiMessageId, initialSteps));
      setIsLoading(false);

      // Add a placeholder AI message for the thinking steps
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Progressive step reveal with simulated tool calls
      let stepIndex = 0;
      const stepDurations = [300, 450, 800, 600, 700, 500, 400]; // Variable durations for realism

      const progressStep = () => {
        if (stepIndex < initialSteps.length) {
          // Mark current step as active
          setThinkingSteps(prev => {
            const steps = prev.get(aiMessageId) || [];
            const updatedSteps = steps.map((s, i) => {
              if (i === stepIndex) return { ...s, status: 'active' as const, progress: 0 };
              if (i < stepIndex) return { ...s, status: 'complete' as const, duration: stepDurations[i] };
              return s;
            });
            return new Map(prev).set(aiMessageId, updatedSteps);
          });

          // Simulate streaming text for active step
          const streamingPhrases = [
            'Parsing document metadata...',
            'Extracting clause definitions...',
            'Cross-referencing terms...',
            'Analyzing precedence rules...',
            'Generating recommendations...',
          ];
          setStreamingText(streamingPhrases[stepIndex % streamingPhrases.length] || '');

          // Simulate tool call for some steps
          if (stepIndex === 2 || stepIndex === 4) {
            setActiveToolCall({
              name: stepIndex === 2 ? 'extract_clauses' : 'analyze_conflicts',
              params: { documents: '15', format: 'structured' },
            });
          } else {
            setActiveToolCall(null);
          }

          // Progress through the step
          let progress = 0;
          const progressInterval = setInterval(() => {
            progress += 10;
            setThinkingSteps(prev => {
              const steps = prev.get(aiMessageId) || [];
              const updatedSteps = steps.map((s, i) => {
                if (i === stepIndex) return { ...s, progress: Math.min(progress, 100) };
                return s;
              });
              return new Map(prev).set(aiMessageId, updatedSteps);
            });

            if (progress >= 100) {
              clearInterval(progressInterval);
              stepIndex++;
              setTimeout(progressStep, 200); // Small delay between steps
            }
          }, stepDurations[stepIndex] / 10);
        } else {
          // All steps complete - clear streaming state
          setStreamingText('');
          setActiveToolCall(null);

          // Mark all steps as complete
          setThinkingSteps(prev => {
            const steps = prev.get(aiMessageId) || [];
            const updatedSteps = steps.map((s, i) => ({
              ...s,
              status: 'complete' as const,
              duration: stepDurations[i] || 500,
            }));
            return new Map(prev).set(aiMessageId, updatedSteps);
          });

          // Now stream the response text
          let responseText = `I understand you're asking about "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}". Let me analyze the 15 Acme agreements to provide you with accurate information.`;

          if (scriptedResponse) {
            responseText = `I've analyzed all 15 Acme agreements to identify the prevailing terms. Here's what I found:`;
          } else if (conflictResponse) {
            responseText = `I've cross-referenced all 15 Acme agreements to identify conflicting provisions. Here's what I found:`;
          }

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

              // Add agent actions if available
              if (actionsForKey) {
                setAgentActions(prev => new Map(prev).set(aiMessageId, actionsForKey));
              }
            }
          }, 30);
        }
      };

      // Start the thinking progression
      setTimeout(progressStep, 500);
    } else {
      // No thinking sequence - use original behavior
      setTimeout(() => {
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
        }, 30); // 30ms per word for smooth streaming
      }, 1500); // Show skeleton loader for a moment before response
    }
  }, []);

  // Compute checklist with completion states for display
  const checklistWithStatus = useMemo(() => {
    return ONBOARDING_CHECKLIST.map((step) => ({
      ...step,
      completed: completedSteps.has(step.id),
    }));
  }, [completedSteps]);

  // Convert checklist to suggestedActions format for AIChat
  const suggestedActions = useMemo(() => {
    return checklistWithStatus.map((step) => ({
      label: step.label,
      description: step.description,
      icon: step.icon,
      completed: step.completed,
    }));
  }, [checklistWithStatus]);

  // Compute checklist title with progress indicator
  const checklistTitle = useMemo(() => {
    const total = ONBOARDING_CHECKLIST.length;
    const completed = completedSteps.size;
    return `${WELCOME_CONFIG.checklistTitle} · ${completed} of ${total} done`;
  }, [completedSteps]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      // Check if this is a checklist item that triggers a tool UI
      const toolCallData = TOOL_CALLS[suggestion];

      if (toolCallData) {
        // Create user message
        const userMsg: ChatMessage = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: suggestion,
          timestamp: new Date(),
        };

        // Create AI response with tool UI
        const aiMsgId = `ai-${Date.now()}`;
        const aiMsg: ChatMessage = {
          id: aiMsgId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg, aiMsg]);

        // Set up the tool UI for this message
        setToolUIs((prev) => {
          const newMap = new Map(prev);
          newMap.set(aiMsgId, {
            type: toolCallData.type,
            params: (toolCallData.params || {}) as Record<string, unknown>,
          });
          return newMap;
        });

        // If it's an agent delegation, set the delegation status
        if (toolCallData.type === 'agent_delegation') {
          setDelegationStatus((prev) => {
            const newMap = new Map(prev);
            newMap.set(aiMsgId, 'connecting');
            return newMap;
          });
          // Simulate connection
          setTimeout(() => {
            setDelegationStatus((prev) => {
              const newMap = new Map(prev);
              newMap.set(aiMsgId, 'active');
              return newMap;
            });
          }, 1500);
        }
      } else {
        // For questions, send message directly
        handleSendMessage(suggestion, true);
      }
    },
    [handleSendMessage]
  );

  // Agent action handlers
  const handleExecuteAction = useCallback((actionId: string, messageId: string) => {
    setAgentActions(prev => {
      const actions = prev.get(messageId) || [];
      const updatedActions = actions.map(action => {
        if (action.id === actionId) {
          return { ...action, status: 'executing' as const };
        }
        return action;
      });
      return new Map(prev).set(messageId, updatedActions);
    });

    // Simulate action execution
    setTimeout(() => {
      setAgentActions(prev => {
        const actions = prev.get(messageId) || [];
        const updatedActions = actions.map(action => {
          if (action.id === actionId) {
            return {
              ...action,
              status: 'complete' as const,
              result: {
                success: true,
                output: 'Action completed successfully.',
                artifacts: action.type === 'draft' ? ['Amendment_Draft_v1.docx'] : undefined,
              },
            };
          }
          return action;
        });
        return new Map(prev).set(messageId, updatedActions);
      });
    }, 2000);
  }, []);

  const handleCancelAction = useCallback((actionId: string, messageId: string) => {
    setAgentActions(prev => {
      const actions = prev.get(messageId) || [];
      const updatedActions = actions.map(action => {
        if (action.id === actionId) {
          return { ...action, status: 'cancelled' as const };
        }
        return action;
      });
      return new Map(prev).set(messageId, updatedActions);
    });
  }, []);

  const handleRetryAction = useCallback((actionId: string, messageId: string) => {
    // Reset to proposed and then execute
    setAgentActions(prev => {
      const actions = prev.get(messageId) || [];
      const updatedActions = actions.map(action => {
        if (action.id === actionId) {
          return { ...action, status: 'proposed' as const, result: undefined };
        }
        return action;
      });
      return new Map(prev).set(messageId, updatedActions);
    });
  }, []);

  // Track pending branding prompt message ID
  const [pendingBrandingPromptId, setPendingBrandingPromptId] = useState<string | null>(null);

  // Handler for profile form completion
  const handleProfileComplete = useCallback((profile: ProfileData) => {
    setUserProfile(profile);
    setHasCompletedProfiling(true);
    // Mark profile step as complete
    setCompletedSteps(prev => new Set(prev).add('profile'));

    const industryLabel = profile.industry === 'other' && profile.industryOther
      ? profile.industryOther
      : profile.industry?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'your industry';
    const roleLabel = profile.role?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'your role';

    // Add user's confirmation message with profile context
    const userConfirmMessage: ChatMessage = {
      id: `user-profile-confirm-${Date.now()}`,
      role: 'user',
      content: 'Confirmed',
      timestamp: new Date(),
      metadata: {
        profileConfirmation: true,
        profileData: {
          industry: industryLabel,
          role: roleLabel,
        },
      },
    };
    setMessages(prev => [...prev, userConfirmMessage]);

    // Add AI response after a brief delay for natural feel
    setTimeout(() => {
      const confirmMessageId = `ai-profile-${Date.now()}`;
      const confirmMessage: ChatMessage = {
        id: confirmMessageId,
        role: 'assistant',
        content: `Great! I've set up your profile. Would you like to set up your brand colors next? This will make your envelopes look professional and on-brand.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, confirmMessage]);
      setPendingBrandingPromptId(confirmMessageId);
    }, 500);
  }, []);

  // Handler when user clicks Yes to branding setup
  const handleAcceptBranding = useCallback(() => {
    // Add user's "Yes" response
    const userYesMessage: ChatMessage = {
      id: `user-yes-${Date.now()}`,
      role: 'user',
      content: 'Yes, let\'s set up branding',
      timestamp: new Date(),
      metadata: { fromSuggestion: true },
    };
    setMessages(prev => [...prev, userYesMessage]);
    setPendingBrandingPromptId(null);

    // Show branding tool after a brief delay
    setTimeout(() => {
      const brandingMessageId = `ai-branding-chain-${Date.now()}`;
      const brandingMessage: ChatMessage = {
        id: brandingMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, brandingMessage]);

      // Add the branding tool UI
      setToolUIs(prev => new Map(prev).set(brandingMessageId, {
        type: 'branding_tool',
        params: {
          detectedColors: { primary: '#4C00FB', secondary: '#00875C' },
          companyName: 'Your Company',
          websiteUrl: 'yourcompany.com',
        },
      }));
    }, 500);
  }, []);

  // Handler when user clicks No to branding setup
  const handleDeclineBranding = useCallback(() => {
    // Add user's "No" response
    const userNoMessage: ChatMessage = {
      id: `user-no-${Date.now()}`,
      role: 'user',
      content: 'Maybe later',
      timestamp: new Date(),
      metadata: { fromSuggestion: true },
    };
    setMessages(prev => [...prev, userNoMessage]);
    setPendingBrandingPromptId(null);

    // Add acknowledgment from agent
    setTimeout(() => {
      const ackMessage: ChatMessage = {
        id: `ai-ack-${Date.now()}`,
        role: 'assistant',
        content: 'No problem! You can set up your brand colors anytime from the checklist. What else can I help you with?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, ackMessage]);
    }, 500);
  }, []);

  // Handler for branding tool completion
  const handleBrandingApply = useCallback((colors: BrandColors) => {
    // Mark branding step as complete
    setCompletedSteps(prev => new Set(prev).add('branding'));
    // Add a success message
    const successMessage: ChatMessage = {
      id: `ai-branding-${Date.now()}`,
      role: 'assistant',
      content: `Your brand colors have been applied! Primary: ${colors.primary}, Secondary: ${colors.secondary}. These will now appear on all your envelopes.`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, successMessage]);
  }, []);

  // Handler for sending sample envelope
  const handleSendSample = useCallback(() => {
    // Simulate sending a sample
    setToastState({ visible: true, message: 'Sending sample envelope...', status: 'loading' });
    setTimeout(() => {
      setToastState({ visible: true, message: 'Sample envelope sent to your email!', status: 'success' });
      setTimeout(() => setToastState(prev => ({ ...prev, visible: false })), 3000);
    }, 2000);
  }, []);

  // Handler for returning from delegated agent
  const handleReturnFromDelegation = useCallback((messageId: string) => {
    setDelegationStatus(prev => {
      const newMap = new Map(prev);
      newMap.delete(messageId);
      return newMap;
    });
  }, []);

  // Custom message renderer for rich messages, conflicts, thinking steps, tool UIs, and agent actions
  const renderMessage = useCallback(
    (message: ChatMessage) => {
      const richData = richMessages.get(message.id);
      const conflictData = conflictMessages.get(message.id);
      const stepsData = thinkingSteps.get(message.id);
      const actionsData = agentActions.get(message.id);
      const toolUIData = toolUIs.get(message.id);
      const delegationState = delegationStatus.get(message.id);

      if (message.role === 'assistant') {
        // Render tool-based UIs
        if (toolUIData) {
          switch (toolUIData.type) {
            case 'profile_form':
              return (
                <div className={styles.richMessageWrapper}>
                  {message.content && <p className={styles.richMessageIntro}>{message.content}</p>}
                  <ProfileForm
                    detectedValues={toolUIData.params?.detectedValues as { company?: string; industry?: string }}
                    onComplete={handleProfileComplete}
                  />
                </div>
              );
            case 'branding_tool':
              return (
                <div className={styles.richMessageWrapper}>
                  {message.content && <p className={styles.richMessageIntro}>{message.content}</p>}
                  <BrandingTool
                    detectedColors={toolUIData.params?.detectedColors as BrandColors}
                    companyName={toolUIData.params?.companyName as string}
                    websiteUrl={toolUIData.params?.websiteUrl as string}
                    onApply={handleBrandingApply}
                    onSendSample={handleSendSample}
                  />
                </div>
              );
            case 'agent_delegation':
              return (
                <div className={styles.richMessageWrapper}>
                  {message.content && <p className={styles.richMessageIntro}>{message.content}</p>}
                  <AgentDelegation
                    targetAgent={toolUIData.params?.targetAgent as AgentType}
                    status={delegationState || 'connecting'}
                    taskDescription={toolUIData.params?.taskDescription as string}
                    onCancel={() => handleReturnFromDelegation(message.id)}
                    onReturn={() => handleReturnFromDelegation(message.id)}
                  />
                </div>
              );
            default:
              break;
          }
        }

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

        // Check if this is the branding prompt message - show Yes/No buttons
        const isBrandingPrompt = pendingBrandingPromptId === message.id;
        if (isBrandingPrompt) {
          return (
            <div className={styles.richMessageWrapper}>
              <p className={styles.richMessageIntro}>{message.content}</p>
              <div className={styles.promptActions}>
                <Button kind="primary" size="small" onClick={handleAcceptBranding}>
                  Yes, set up branding
                </Button>
                <Button kind="tertiary" size="small" onClick={handleDeclineBranding}>
                  Maybe later
                </Button>
              </div>
              {feedbackButtons}
            </div>
          );
        }

        // Render with thinking steps (agent reasoning visualization)
        if (stepsData && stepsData.length > 0) {
          // Check if any step is still active
          const hasActiveStep = stepsData.some(s => s.status === 'active');

          return (
            <div className={styles.richMessageWrapper}>
              {/* Thinking Steps - always show when available */}
              <ThinkingSteps
                steps={stepsData}
                streamingText={hasActiveStep ? streamingText : undefined}
                toolCall={hasActiveStep ? activeToolCall || undefined : undefined}
                className={styles.thinkingStepsContainer}
              />

              {/* Only show content after thinking completes */}
              {message.content && (
                <p className={styles.richMessageIntro}>{message.content}</p>
              )}

              {/* Rich message data (e.g., Prevailing Terms Analysis) */}
              {richData && (
                <RichMessage data={richData} onCitationClick={handleCitationClick} />
              )}

              {/* Conflict view (side-by-side comparison) */}
              {conflictData && (
                <ConflictView conflicts={conflictData} onCitationClick={handleCitationClick} />
              )}

              {/* Agent Actions - proposed next steps */}
              {actionsData && actionsData.length > 0 && (
                <div className={styles.agentActionsContainer}>
                  <h4 className={styles.agentActionsTitle}>
                    <Icon name="ai-spark" size="small" />
                    Suggested Actions
                  </h4>
                  <div className={styles.agentActionsList}>
                    {actionsData.map(action => (
                      <AgentActionCard
                        key={action.id}
                        action={action}
                        onExecute={() => handleExecuteAction(action.id, message.id)}
                        onCancel={() => handleCancelAction(action.id, message.id)}
                        onRetry={() => handleRetryAction(action.id, message.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {feedbackButtons}
            </div>
          );
        }

        // Render rich message (e.g., Prevailing Terms Analysis) - without thinking steps
        if (richData) {
          return (
            <div className={styles.richMessageWrapper}>
              <p className={styles.richMessageIntro}>{message.content}</p>
              <RichMessage data={richData} onCitationClick={handleCitationClick} />
              {feedbackButtons}
            </div>
          );
        }

        // Render conflict view (side-by-side comparison) - without thinking steps
        if (conflictData) {
          return (
            <div className={styles.richMessageWrapper}>
              <p className={styles.richMessageIntro}>{message.content}</p>
              <ConflictView conflicts={conflictData} onCitationClick={handleCitationClick} />
              {feedbackButtons}
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

      // Render profile confirmation with context above
      if (message.role === 'user' && message.metadata?.profileConfirmation) {
        const profileData = message.metadata.profileData as { industry: string; role: string };
        return (
          <div className={styles.selectedMessage}>
            <div className={styles.profileContextLine}>
              <Icon name="building-company" size={14} />
              <span>{profileData.industry}</span>
              <Icon name="user" size={14} />
              <span>{profileData.role}</span>
            </div>
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
    [richMessages, conflictMessages, thinkingSteps, agentActions, toolUIs, delegationStatus, streamingText, activeToolCall, handleCitationClick, handleExecuteAction, handleCancelAction, handleRetryAction, handleProfileComplete, handleBrandingApply, handleSendSample, handleReturnFromDelegation, expandedUserMessages, pendingBrandingPromptId, handleAcceptBranding, handleDeclineBranding]
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
    setRichMessages(new Map());
    setConflictMessages(new Map());
    setActiveHistoryId(null);
    setIsDocumentCanvasOpen(false);
    // Increment key to replay welcome animations
    setWelcomeKey((k) => k + 1);
    setActiveCitation(null);
  }, []);

  const handleHistoryItemClick = useCallback(
    (id: string) => {
      setActiveHistoryId(id);

      // Load stored conversation for this history item
      const storedMessages = STORED_CONVERSATIONS[id];
      if (storedMessages) {
        setMessages(storedMessages);
        // Clear rich messages and conflicts when switching conversations
        setRichMessages(new Map());
        setConflictMessages(new Map());
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

  const historyPanelClasses = useInlineHistory
    ? [
        styles.historyPanel,
        styles.historyPanelInline,
        !isHistoryOpen ? styles.historyPanelInlineHidden : '',
      ]
        .filter(Boolean)
        .join(' ')
    : [styles.historyPanel, isHistoryOpen ? styles.historyPanelOpen : ''].filter(Boolean).join(' ');

  const historyOverlayClasses = [
    styles.historyOverlay,
    !useInlineHistory && isHistoryOpen ? styles.historyOverlayVisible : '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderHistoryContent = () => (
    <>
      <div className={styles.historyHeader}>
        <h3 className={styles.historyTitle}>Chat History</h3>
        <IconButton
          icon="close"
          size="small"
          kind="tertiary"
          onClick={() => setIsHistoryOpen(false)}
          aria-label="Close history"
        />
      </div>
      <div className={styles.historyList}>
        <div className={styles.historyGroup}>
          <div className={styles.historyGroupLabel}>Today</div>
          {CHAT_HISTORY.today.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.historyItem} ${activeHistoryId === item.id ? styles.historyItemActive : ''}`}
              onClick={() => handleHistoryItemClick(item.id)}
            >
              <span className={styles.historyItemIcon}>
                <Icon name="comment" size={16} />
              </span>
              <div className={styles.historyItemContent}>
                <p className={styles.historyItemTitle}>{item.title}</p>
                <span className={styles.historyItemMeta}>
                  {item.time} · {item.messages} messages
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.historyGroup}>
          <div className={styles.historyGroupLabel}>Yesterday</div>
          {CHAT_HISTORY.yesterday.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.historyItem} ${activeHistoryId === item.id ? styles.historyItemActive : ''}`}
              onClick={() => handleHistoryItemClick(item.id)}
            >
              <span className={styles.historyItemIcon}>
                <Icon name="comment" size={16} />
              </span>
              <div className={styles.historyItemContent}>
                <p className={styles.historyItemTitle}>{item.title}</p>
                <span className={styles.historyItemMeta}>
                  {item.time} · {item.messages} messages
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.historyGroup}>
          <div className={styles.historyGroupLabel}>Last 7 Days</div>
          {CHAT_HISTORY.lastWeek.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.historyItem} ${activeHistoryId === item.id ? styles.historyItemActive : ''}`}
              onClick={() => handleHistoryItemClick(item.id)}
            >
              <span className={styles.historyItemIcon}>
                <Icon name="comment" size={16} />
              </span>
              <div className={styles.historyItemContent}>
                <p className={styles.historyItemTitle}>{item.title}</p>
                <span className={styles.historyItemMeta}>
                  {item.time} · {item.messages} messages
                </span>
              </div>
            </button>
          ))}
        </div>
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

      {/* Shared Header - spans full width */}
      <div className={styles.sharedHeader}>
        <div className={styles.sharedHeaderLeft}>
          <Tooltip content="History">
            <IconButton
              icon="menu"
              size="small"
              kind="tertiary"
              onClick={handleToggleHistory}
              aria-label="Show history"
            />
          </Tooltip>
        </div>
        {messages.length > 0 && (
          <div className={styles.sharedHeaderCenter}>
            <h2 className={styles.sharedHeaderTitle}>Onboarding Assistant</h2>
          </div>
        )}
        <div className={styles.sharedHeaderRight}>
          {/* Show all icons when panel is wide enough */}
          {panelWidth >= OVERFLOW_THRESHOLD ? (
            <>
              <Tooltip content="Share">
                <IconButton
                  icon="share-web"
                  size="small"
                  kind="tertiary"
                  onClick={handleOpenShareModal}
                  aria-label="Share"
                />
              </Tooltip>
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
            /* Overflow menu for narrow panel */
            <Dropdown
              items={[
                {
                  label: 'Share',
                  icon: <Icon name="share-web" size="small" />,
                  onClick: handleOpenShareModal,
                },
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
          {/* Close button always visible */}
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

      <div className={styles.aiPanelLayout}>
        {useInlineHistory && <div className={historyPanelClasses}>{renderHistoryContent()}</div>}

        <div
          className={`${styles.aiPanelContent} ${isNarrowMode && isDocumentCanvasOpen ? styles.aiPanelContentHidden : ''}`}
        >
          {!useInlineHistory && (
            <>
              <div className={historyOverlayClasses} onClick={() => setIsHistoryOpen(false)} />
              <div className={historyPanelClasses}>{renderHistoryContent()}</div>
            </>
          )}

          <div ref={chatWrapperRef} className={contentWrapperClasses}>
            <AIChat
              key={welcomeKey}
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              userName={userName}
              assistantName="Docusign AI"
              welcomeTitle={WELCOME_CONFIG.title}
              suggestedActions={suggestedActions}
              suggestedActionsTitle={checklistTitle}
              suggestedQuestions={SUGGESTED_QUESTIONS}
              suggestedQuestionsTitle={WELCOME_CONFIG.questionsTitle}
              onSuggestionClick={handleSuggestionClick}
              placeholder="Ask anything about DocuSign..."
              showHeader={false}
              onClose={onClose}
              onShowHistory={handleToggleHistory}
              onNewChat={handleNewChat}
              onMaximize={handleToggleExpand}
              maxHeight="100%"
              className={styles.aiChatContainer}
              renderMessage={renderMessage}
              contextSource={
                agreements.length > 0
                  ? {
                      count: selectedAgreementIds.size,
                      label: 'agreements',
                      onClick: handleOpenAgreementsSidebar,
                    }
                  : undefined
              }
              showContextAttention={showContextAttention}
              showInputAttention={showInputAttention}
              inputValue={chatInputValue}
              onInputChange={setChatInputValue}
            />
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
