/**
 * Prompt Expansion Demo
 *
 * 2 variations of the Tab-to-expand interaction with async server simulation:
 * 1. Inline Hint - "[Tab] to expand" appears after typing pause, smart positioning
 * 2. Ghost Preview - Shows expansion hint as faded text, skeleton loading on expand
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Icon } from '@/design-system';
import styles from './PromptExpansionDemo.module.css';

// ============================================================================
// Async Server Simulation
// ============================================================================

/**
 * Simulates fetching an expanded prompt from a server.
 * In production, this would be an actual API call.
 */
const fetchExpandedPrompt = async (shortPrompt: string): Promise<string> => {
  // Simulate network delay (800-1200ms)
  const delay = 800 + Math.random() * 400;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Return expanded prompt (simulating server response)
  return `${shortPrompt}, focusing on key terms, payment obligations, and critical deadlines. Explain in clear language suitable for non-legal reviewers. Format the response as bullet points organized by section.`;
};

// Ghost hint text (shown before server response)
const GHOST_HINT_TEXT = `, focusing on key terms and obligations...`;

// Debounce delay for showing the Tab hint (ms)
const TYPING_PAUSE_DELAY = 800;

// ============================================================================
// Context Source Pill (Agreement Studio style)
// ============================================================================

interface ContextSourcePillProps {
  count: number;
  label: string;
  onClick?: () => void;
}

const ContextSourcePill: React.FC<ContextSourcePillProps> = ({ count, label, onClick }) => {
  return (
    <button type="button" className={styles.contextSourcePill} onClick={onClick}>
      <Icon name="document-stack" size="small" />
      <span>
        {count} {label}
      </span>
      <Icon name="chevron-down" size="small" />
    </button>
  );
};

// ============================================================================
// Send Button (Agreement Studio style)
// ============================================================================

interface SendButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      type="button"
      className={styles.sendButton}
      disabled={disabled}
      onClick={onClick}
      aria-label="Send message"
    >
      <Icon name="arrow-up" size="small" />
    </button>
  );
};

// ============================================================================
// Skeleton Loading (shared between both variants)
// ============================================================================

const SkeletonLoading: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
    </div>
  );
};

// ============================================================================
// 1. INLINE HINT - "[Tab] to expand" appears after typing pause
// ============================================================================

const TabInlineHint: React.FC = () => {
  const [prompt, setPrompt] = useState('summarize the contract');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(40, textarea.scrollHeight)}px`;
    }
  }, [prompt, displayText, isAnimating]);

  // Debounced hint display - show after user stops typing
  useEffect(() => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Hide hint immediately when typing
    setShowHint(false);

    // Only set timeout if focused and has content
    if (isFocused && prompt.trim().length > 0 && !isLoading && !isAnimating) {
      typingTimeoutRef.current = setTimeout(() => {
        setShowHint(true);
      }, TYPING_PAUSE_DELAY);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [prompt, isFocused, isLoading, isAnimating]);

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab' && textAreaRef.current && !isLoading && !isAnimating) {
        const textarea = textAreaRef.current;
        const isAtEnd = textarea.selectionStart === textarea.value.length;

        if (isAtEnd && prompt.trim()) {
          e.preventDefault();

          // Hide hint and start loading
          setShowHint(false);
          setIsLoading(true);

          try {
            // Fetch expanded prompt from "server"
            const expanded = await fetchExpandedPrompt(prompt);

            // Fade in animation - set full text immediately with CSS transition
            setIsLoading(false);
            setIsAnimating(true);
            setDisplayText(expanded);

            // End animation after fade completes
            setTimeout(() => {
              setPrompt(expanded);
              setIsAnimating(false);
              setDisplayText('');
            }, 400);
          } catch {
            setIsLoading(false);
          }
        }
      }
    },
    [prompt, isLoading, isAnimating]
  );

  const isProcessing = isLoading || isAnimating;
  const shouldShowHint = showHint && !isProcessing;

  return (
    <div className={styles.variant}>
      <div className={styles.variantHeader}>
        <span className={styles.variantNumber}>1</span>
        <div>
          <h3 className={styles.variantTitle}>Inline Hint</h3>
          <p className={styles.variantHint}>Hint appears after typing pause, smart positioning</p>
        </div>
      </div>

      <div className={styles.inputArea}>
        <div
          className={`${styles.inputContainer} ${isLoading ? styles.inputLoading : ''} ${isAnimating ? styles.inputAnimating : ''}`}
        >
          <div className={styles.inputContent}>
            {isLoading ? (
              <div className={styles.loadingArea}>
                <SkeletonLoading />
              </div>
            ) : (
              <div className={styles.textareaWithHint}>
                <textarea
                  ref={textAreaRef}
                  value={isAnimating ? displayText : prompt}
                  onChange={(e) => !isProcessing && setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    setShowHint(false);
                  }}
                  placeholder="Ask anything about selected agreements..."
                  className={`${styles.textInput} ${isAnimating ? styles.textInputTypewriting : ''}`}
                  readOnly={isProcessing}
                  rows={1}
                />
                {shouldShowHint && (
                  <span className={styles.tabHintInline}>
                    <span className={styles.tabKey}>Tab</span> to expand prompt
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={styles.inputActions}>
            <ContextSourcePill count={15} label="agreements" />
            <SendButton disabled={!prompt.trim() || isProcessing} />
          </div>
        </div>
        <p className={styles.disclaimer}>
          Responses are generated with AI and are not legal advice.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// 2. GHOST PREVIEW - Shows expansion hint as faded text
// ============================================================================

const TabGhostPreview: React.FC = () => {
  const [prompt, setPrompt] = useState('summarize the contract');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(40, textarea.scrollHeight)}px`;
    }
  }, [prompt, displayText, isAnimating]);

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab' && textAreaRef.current && !isLoading && !isAnimating) {
        const textarea = textAreaRef.current;
        const isAtEnd = textarea.selectionStart === textarea.value.length;

        if (isAtEnd && prompt.trim()) {
          e.preventDefault();

          // Start loading (ghost text transforms to skeleton)
          setIsLoading(true);

          try {
            // Fetch expanded prompt from "server"
            const expanded = await fetchExpandedPrompt(prompt);

            // Fade in animation - set full text immediately with CSS transition
            setIsLoading(false);
            setIsAnimating(true);
            setDisplayText(expanded);

            // End animation after fade completes
            setTimeout(() => {
              setPrompt(expanded);
              setIsAnimating(false);
              setDisplayText('');
            }, 400);
          } catch {
            setIsLoading(false);
          }
        }
      }
    },
    [prompt, isLoading, isAnimating]
  );

  const showGhost = isFocused && prompt.trim().length > 0 && !isAnimating && !isLoading;
  const isProcessing = isLoading || isAnimating;

  return (
    <div className={styles.variant}>
      <div className={styles.variantHeader}>
        <span className={styles.variantNumber}>2</span>
        <div>
          <h3 className={styles.variantTitle}>Ghost Preview</h3>
          <p className={styles.variantHint}>Expansion hint shown, skeleton loading on Tab</p>
        </div>
      </div>

      <div className={styles.inputArea}>
        <div
          className={`${styles.inputContainer} ${isLoading ? styles.inputLoading : ''} ${isAnimating ? styles.inputAnimating : ''}`}
        >
          <div className={styles.inputContent}>
            <div className={styles.ghostContainer}>
              <textarea
                ref={textAreaRef}
                value={isAnimating ? displayText : prompt}
                onChange={(e) => !isProcessing && setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask anything about selected agreements..."
                className={styles.textInput}
                readOnly={isProcessing}
                rows={1}
              />
              {showGhost && (
                <span className={styles.ghostText}>
                  {GHOST_HINT_TEXT}
                  <span className={styles.ghostTabHint}>
                    <span className={styles.tabKeySmall}>↹</span>
                  </span>
                </span>
              )}
              {isLoading && (
                <div className={styles.loadingArea}>
                  <SkeletonLoading />
                </div>
              )}
            </div>
          </div>
          <div className={styles.inputActions}>
            <ContextSourcePill count={15} label="agreements" />
            <SendButton disabled={!prompt.trim() || isProcessing} />
          </div>
        </div>
        <p className={styles.disclaimer}>
          Responses are generated with AI and are not legal advice.
        </p>
      </div>

      <p className={styles.variantNote}>
        Ghost text hints at expansion. Press Tab to fetch and apply.
      </p>
    </div>
  );
};

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

export const PromptExpansionDemo: React.FC = () => {
  return (
    <div className={styles.demoPage}>
      <header className={styles.demoHeader}>
        <h1 className={styles.demoTitle}>Tab to Expand — 2 Variations</h1>
        <p className={styles.demoSubtitle}>
          Type a prompt, then press Tab at the end to expand it (simulates async server request)
        </p>
      </header>

      <div className={styles.demoGrid}>
        <TabInlineHint />
        <TabGhostPreview />
      </div>
    </div>
  );
};

export default PromptExpansionDemo;
