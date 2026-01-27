/**
 * Iteration Lab
 *
 * A dedicated space for iterating on new components with pin-based feedback.
 * Click anywhere on the preview to place a pin and add feedback.
 */

import React, { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import {
  Stack,
  Inline,
  Card,
  Button,
  IconButton,
  TextArea,
  Text,
  Heading,
  Badge,
  Divider,
  Select,
  Spinner,
  Banner,
} from '@/design-system';
import { AIChat, ChatMessage } from '@/design-system/5-patterns';
import styles from './IterationLab.module.css';

// Lazy load prototype components
const DocuSignLanding = lazy(() => import('@/prototypes/DocuSignLanding'));
const DataTableTest = lazy(() => import('./DataTableTest'));

// Available components to iterate on
const AVAILABLE_COMPONENTS = [
  { id: 'DataTableTest', label: 'DataTable Test', description: 'Sticky columns & hover test' },
  { id: 'AIChat', label: 'AIChat (Pattern)', description: 'AI conversation interface' },
  { id: 'DocuSignLanding', label: 'Docusign Landing', description: 'Landing page prototype' },
] as const;

// Element info captured from click
interface ElementInfo {
  tagName: string;
  className: string;
  textContent: string;
  selector: string;
  componentName?: string;
}

// Pin-based feedback
interface FeedbackPin {
  id: string;
  number: number;
  x: number; // percentage from left
  y: number; // percentage from top
  timestamp: Date;
  component: string;
  category: 'visual' | 'ux' | 'bug' | 'suggestion' | 'general';
  content: string;
  resolved: boolean;
  element?: ElementInfo; // The actual element that was clicked
}

const STORAGE_KEY = 'iteration-lab-feedback-v2';

// Load feedback from localStorage
const loadFeedback = (): FeedbackPin[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((item: FeedbackPin) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
    }
  } catch (e) {
    console.error('Failed to load feedback:', e);
  }
  return [];
};

// Save feedback to localStorage
const saveFeedback = (items: FeedbackPin[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save feedback:', e);
  }
};

export default function IterationLab() {
  const [activeComponent, setActiveComponent] = useState<string>('DataTableTest');
  const previewRef = useRef<HTMLDivElement>(null);

  // Feedback state
  const [feedback, setFeedback] = useState<FeedbackPin[]>(loadFeedback);
  const [pinMode, setPinMode] = useState(false);
  const [pendingPin, setPendingPin] = useState<{
    x: number;
    y: number;
    element?: ElementInfo;
  } | null>(null);
  const [newFeedback, setNewFeedback] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState<FeedbackPin['category']>('visual');
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(true);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // AIChat demo state - start empty to show zero query state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Persist feedback changes
  useEffect(() => {
    saveFeedback(feedback);
  }, [feedback]);

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  }, []);

  // Get next pin number
  const getNextPinNumber = useCallback(() => {
    const componentFeedback = feedback.filter(
      (f) => f.component === activeComponent && !f.resolved
    );
    return componentFeedback.length > 0
      ? Math.max(...componentFeedback.map((f) => f.number)) + 1
      : 1;
  }, [feedback, activeComponent]);

  // Build a CSS selector for an element
  const buildSelector = useCallback((el: HTMLElement): string => {
    const parts: string[] = [];
    let current: HTMLElement | null = el;

    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();

      // Add class names (filter out CSS module hashes)
      const classes = Array.from(current.classList)
        .filter((c) => !c.match(/^_[a-z]+_[a-z0-9]+$/i)) // Filter CSS module classes
        .slice(0, 2); // Max 2 classes
      if (classes.length > 0) {
        selector += '.' + classes.join('.');
      }

      // Add role if present
      const role = current.getAttribute('role');
      if (role) {
        selector += `[role="${role}"]`;
      }

      parts.unshift(selector);

      // Stop at component wrapper
      if (current.classList.contains(styles.componentWrapper)) break;

      current = current.parentElement;
    }

    return parts.slice(-3).join(' > '); // Last 3 levels
  }, []);

  // Get component name from element
  const getComponentName = useCallback((el: HTMLElement): string | undefined => {
    // Check for data attributes or class patterns
    const dataComponent = el.closest('[data-component]')?.getAttribute('data-component');
    if (dataComponent) return dataComponent;

    // Check for common component patterns in class names
    const classMatch = el.className.match(/(?:^|\s)(message|input|button|avatar|bubble|typing)/i);
    if (classMatch) return classMatch[1];

    // Check parent elements
    const parent = el.closest('[class*="message"], [class*="input"], [class*="bubble"]');
    if (parent) {
      const match = parent.className.match(/(?:^|\s)([a-zA-Z]+)(?:Message|Input|Bubble|Area)/);
      if (match) return match[0].trim();
    }

    return undefined;
  }, []);

  // Handle click on preview to place pin
  const handlePreviewClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!pinMode) return;

      const rect = previewRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Capture element info
      const target = e.target as HTMLElement;
      const elementInfo: ElementInfo = {
        tagName: target.tagName.toLowerCase(),
        className: Array.from(target.classList)
          .filter((c) => !c.match(/^_[a-z]+_[a-z0-9]+$/i))
          .join(' '),
        textContent: (target.textContent || '').slice(0, 50).trim(),
        selector: buildSelector(target),
        componentName: getComponentName(target),
      };

      setPendingPin({ x, y, element: elementInfo });
      setSelectedPinId(null);
    },
    [pinMode, buildSelector, getComponentName]
  );

  // Add feedback for pending pin
  const handleAddFeedback = useCallback(() => {
    if (!newFeedback.trim() || !pendingPin) return;

    const pin: FeedbackPin = {
      id: Date.now().toString(),
      number: getNextPinNumber(),
      x: pendingPin.x,
      y: pendingPin.y,
      timestamp: new Date(),
      component: activeComponent,
      category: feedbackCategory,
      content: newFeedback.trim(),
      resolved: false,
      element: pendingPin.element,
    };

    setFeedback((prev) => [...prev, pin]);
    setNewFeedback('');
    setPendingPin(null);
    setPinMode(false);
  }, [newFeedback, pendingPin, feedbackCategory, activeComponent, getNextPinNumber]);

  // Cancel pending pin
  const handleCancelPin = useCallback(() => {
    setPendingPin(null);
    setNewFeedback('');
  }, []);

  // Toggle feedback resolved
  const toggleResolved = useCallback((id: string) => {
    setFeedback((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resolved: !item.resolved } : item))
    );
  }, []);

  // Delete feedback
  const deleteFeedback = useCallback(
    (id: string) => {
      setFeedback((prev) => prev.filter((item) => item.id !== id));
      if (selectedPinId === id) setSelectedPinId(null);
    },
    [selectedPinId]
  );

  // Export feedback as JSON
  const exportFeedback = useCallback(() => {
    const componentFeedback = feedback.filter((f) => f.component === activeComponent);
    const exportData = {
      exportedAt: new Date().toISOString(),
      component: activeComponent,
      pins: componentFeedback.map((f) => ({
        pin: f.number,
        position: `${f.x.toFixed(1)}%, ${f.y.toFixed(1)}%`,
        category: f.category,
        feedback: f.content,
        resolved: f.resolved,
        timestamp: f.timestamp.toISOString(),
      })),
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    showToast('Feedback copied to clipboard!', 'success');
  }, [feedback, activeComponent, showToast]);

  // Submit for review - writes to file for Claude to read
  const submitForReview = useCallback(async () => {
    const componentFeedback = feedback.filter(
      (f) => f.component === activeComponent && !f.resolved
    );
    if (componentFeedback.length === 0) {
      showToast('No unresolved feedback to submit. Add some pins first!', 'info');
      return;
    }

    const reviewData = {
      submittedAt: new Date().toISOString(),
      component: activeComponent,
      totalPins: componentFeedback.length,
      feedback: componentFeedback.map((f) => ({
        pin: f.number,
        category: f.category,
        position: { x: Math.round(f.x), y: Math.round(f.y) },
        content: f.content,
        element: f.element
          ? {
              tagName: f.element.tagName,
              selector: f.element.selector,
              textContent: f.element.textContent,
              componentName: f.element.componentName,
            }
          : undefined,
      })),
    };

    try {
      // Write to a file via the dev server's API
      const response = await fetch('/__submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        showToast(
          `${componentFeedback.length} feedback item(s) submitted! Tell Claude: "review the feedback"`,
          'success'
        );
      } else {
        throw new Error('Server error');
      }
    } catch {
      // Fallback: copy to clipboard if server not available
      const reviewText = `## Feedback for ${activeComponent}\n\n${componentFeedback
        .map(
          (f) =>
            `### Pin ${f.number} [${f.category.toUpperCase()}]\n**Position**: ${f.x.toFixed(0)}% from left, ${f.y.toFixed(0)}% from top\n**Feedback**: ${f.content}\n`
        )
        .join('\n')}`;
      navigator.clipboard.writeText(reviewText);
      showToast(`${componentFeedback.length} feedback item(s) copied to clipboard!`, 'success');
    }
  }, [feedback, activeComponent, showToast]);

  // AIChat handlers
  const handleSendMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I received: "${content.slice(0, 80)}${content.length > 80 ? '...' : ''}"`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const categoryColors: Record<
    FeedbackPin['category'],
    'info' | 'success' | 'danger' | 'warning' | 'neutral'
  > = {
    visual: 'info',
    ux: 'success',
    bug: 'danger',
    suggestion: 'warning',
    general: 'neutral',
  };

  const componentFeedback = feedback.filter((f) => f.component === activeComponent);
  const unresolvedCount = componentFeedback.filter((f) => !f.resolved).length;
  const visiblePins = componentFeedback.filter((f) => !f.resolved);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <Inline gap="medium" align="center">
          <Heading level={4}>Iteration Lab</Heading>
          <Select
            value={activeComponent}
            onChange={(e) => setActiveComponent(e.target.value)}
            size="small"
            className={styles.componentSelect}
          >
            {AVAILABLE_COMPONENTS.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.label}
              </option>
            ))}
          </Select>
          {unresolvedCount > 0 && <Badge variant="warning">{unresolvedCount} pins</Badge>}
        </Inline>
        <Inline gap="small">
          <IconButton
            icon="layout-detail"
            size="small"
            kind={showFeedbackPanel ? 'secondary' : 'tertiary'}
            onClick={() => setShowFeedbackPanel(!showFeedbackPanel)}
            aria-label={showFeedbackPanel ? 'Hide panel' : 'Show panel'}
          />
        </Inline>
      </header>

      <div className={styles.content}>
        {/* Component Preview */}
        <main className={`${styles.preview} ${activeComponent === 'DataTableTest' ? styles.fullscreen : ''}`}>
          <div className={styles.previewHeader}>
            <Inline gap="small" align="center">
              <Text variant="label" color="secondary">
                {AVAILABLE_COMPONENTS.find((c) => c.id === activeComponent)?.description ||
                  'Preview'}
              </Text>
              {pinMode && (
                <Badge variant="warning" size="small">
                  Click to place pin
                </Badge>
              )}
            </Inline>
            {activeComponent === 'AIChat' && (
              <Button kind="tertiary" size="small" onClick={() => setMessages([])}>
                Reset Chat
              </Button>
            )}
          </div>

          <div
            ref={previewRef}
            className={styles.previewArea}
            data-pin-mode={pinMode}
            onClick={handlePreviewClick}
          >
            {/* Render existing pins */}
            {visiblePins.map((pin) => (
              <div
                key={pin.id}
                className={styles.pin}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                data-highlighted={hoveredPinId === pin.id || selectedPinId === pin.id}
                data-category={pin.category}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPinId(selectedPinId === pin.id ? null : pin.id);
                }}
                onMouseEnter={() => setHoveredPinId(pin.id)}
                onMouseLeave={() => setHoveredPinId(null)}
              >
                {pin.number}
              </div>
            ))}

            {/* Render pending pin */}
            {pendingPin && (
              <div
                className={styles.pin}
                style={{ left: `${pendingPin.x}%`, top: `${pendingPin.y}%` }}
                data-pending="true"
              >
                ?
              </div>
            )}

            {/* Render the selected component */}
            <div className={styles.componentWrapper}>
              <Suspense
                fallback={
                  <div className={styles.loadingWrapper}>
                    <Spinner size="large" />
                  </div>
                }
              >
                {activeComponent === 'DataTableTest' && <DataTableTest />}
                {activeComponent === 'AIChat' && (
                  <AIChat
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    assistantName="Docusign"
                    userName="Akshat"
                    suggestedActions={[
                      { label: 'Send an envelope', description: 'using Iris', icon: 'bolt' },
                    ]}
                    suggestedQuestions={[
                      'How does Docusign AI work?',
                      'How do I manage my billing?',
                    ]}
                    onSuggestionClick={(suggestion) => handleSendMessage(suggestion)}
                    showTimestamps={false}
                    showActions
                    maxHeight="100%"
                    placeholder="Ask anything about DocuSign..."
                    showHeader
                    onShowHistory={() => console.log('Show history')}
                    onNewChat={() => setMessages([])}
                    onMaximize={() => console.log('Maximize')}
                    onClose={() => console.log('Close')}
                  />
                )}
                {activeComponent === 'DocuSignLanding' && <DocuSignLanding />}
              </Suspense>
            </div>
          </div>
        </main>

        {/* Feedback Panel */}
        {showFeedbackPanel && (
          <aside className={styles.feedbackPanel}>
            <div className={styles.feedbackHeader}>
              <Stack gap="small">
                <Inline gap="small" align="center" justify="space-between">
                  <Text variant="label" weight="medium">
                    Feedback
                  </Text>
                  {componentFeedback.length > 0 && (
                    <IconButton
                      icon="trash"
                      size="small"
                      kind="tertiary"
                      onClick={() => {
                        if (confirm('Clear all feedback for this component?')) {
                          setFeedback((prev) =>
                            prev.filter((f) => f.component !== activeComponent)
                          );
                        }
                      }}
                      aria-label="Clear all feedback"
                    />
                  )}
                </Inline>
                <Button
                  kind={pinMode ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => {
                    setPinMode(!pinMode);
                    setPendingPin(null);
                  }}
                  startElement={<span>{pinMode ? '📍' : '📌'}</span>}
                  fullWidth
                >
                  {pinMode ? 'Click Preview to Pin' : 'Add Pin'}
                </Button>
              </Stack>
            </div>

            {/* New Feedback Form (when pin is pending) */}
            {pendingPin && (
              <Card className={styles.feedbackForm}>
                <Stack gap="medium">
                  <Inline gap="small" align="center">
                    <div className={styles.miniPin}>?</div>
                    <Text variant="label" weight="medium">
                      New Pin
                    </Text>
                  </Inline>

                  {pendingPin.element && (
                    <div className={styles.elementInfo}>
                      <Text variant="caption" color="secondary">
                        <strong>Element:</strong> {`<${pendingPin.element.tagName}>`}
                        {pendingPin.element.componentName &&
                          ` (${pendingPin.element.componentName})`}
                      </Text>
                      {pendingPin.element.textContent && (
                        <Text variant="caption" color="secondary">
                          <strong>Text:</strong> "{pendingPin.element.textContent.slice(0, 30)}
                          {pendingPin.element.textContent.length > 30 ? '...' : ''}"
                        </Text>
                      )}
                      <Text variant="caption" className={styles.selectorText}>
                        <strong>Path:</strong> {pendingPin.element.selector}
                      </Text>
                    </div>
                  )}

                  <div className={styles.categoryRow}>
                    <Inline gap="small" wrap>
                      {(['visual', 'ux', 'bug', 'suggestion', 'general'] as const).map((cat) => (
                        <button
                          key={cat}
                          className={styles.categoryButton}
                          data-active={feedbackCategory === cat}
                          data-category={cat}
                          onClick={() => setFeedbackCategory(cat)}
                        >
                          <Badge variant={categoryColors[cat]} size="small">
                            {cat}
                          </Badge>
                        </button>
                      ))}
                    </Inline>
                  </div>

                  <TextArea
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && newFeedback.trim()) {
                        e.preventDefault();
                        handleAddFeedback();
                      }
                    }}
                    placeholder="What should change here?"
                    rows={3}
                    autoFocus
                  />

                  <Inline gap="small">
                    <Button
                      kind="primary"
                      size="small"
                      onClick={handleAddFeedback}
                      disabled={!newFeedback.trim()}
                    >
                      Add
                    </Button>
                    <Button kind="tertiary" size="small" onClick={handleCancelPin}>
                      Cancel
                    </Button>
                  </Inline>
                </Stack>
              </Card>
            )}

            {!pendingPin && (
              <>
                <Divider />

                {/* Feedback List */}
                <div className={styles.feedbackList}>
                  {componentFeedback
                    .sort((a, b) => a.number - b.number)
                    .map((pin) => (
                      <div
                        key={pin.id}
                        className={styles.feedbackItem}
                        data-resolved={pin.resolved}
                        data-highlighted={hoveredPinId === pin.id || selectedPinId === pin.id}
                        onMouseEnter={() => setHoveredPinId(pin.id)}
                        onMouseLeave={() => setHoveredPinId(null)}
                        onClick={() => setSelectedPinId(selectedPinId === pin.id ? null : pin.id)}
                      >
                        <div className={styles.feedbackItemHeader}>
                          <Inline gap="small" align="center">
                            <div
                              className={styles.miniPin}
                              data-category={pin.category}
                              data-resolved={pin.resolved}
                            >
                              {pin.number}
                            </div>
                            <Badge variant={categoryColors[pin.category]} size="small">
                              {pin.category}
                            </Badge>
                          </Inline>
                          <Inline gap="small">
                            <IconButton
                              icon={pin.resolved ? 'check-circle' : 'check'}
                              size="small"
                              kind="tertiary"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleResolved(pin.id);
                              }}
                              aria-label={pin.resolved ? 'Mark unresolved' : 'Mark resolved'}
                            />
                            <IconButton
                              icon="trash"
                              size="small"
                              kind="tertiary"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteFeedback(pin.id);
                              }}
                              aria-label="Delete"
                            />
                          </Inline>
                        </div>
                        <Text variant="body" className={styles.feedbackContent}>
                          {pin.content}
                        </Text>
                        <Text variant="caption" color="secondary">
                          {pin.timestamp.toLocaleTimeString()}
                        </Text>
                      </div>
                    ))}

                  {componentFeedback.length === 0 && (
                    <div className={styles.emptyFeedback}>
                      <Stack gap="small" align="center">
                        <Text variant="body" color="secondary" align="center">
                          No pins yet
                        </Text>
                        <Text variant="caption" color="secondary" align="center">
                          Click "Add Pin" above to start
                        </Text>
                      </Stack>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                {componentFeedback.length > 0 && (
                  <div className={styles.feedbackFooter}>
                    <Button
                      kind="primary"
                      size="small"
                      onClick={submitForReview}
                      disabled={unresolvedCount === 0}
                      fullWidth
                    >
                      Submit for Review ({unresolvedCount})
                    </Button>
                    <Button kind="tertiary" size="small" onClick={exportFeedback} fullWidth>
                      Export JSON
                    </Button>
                  </div>
                )}
              </>
            )}
          </aside>
        )}
      </div>

      {/* Toast notification */}
      {toast && (
        <div className={styles.toast}>
          <Banner
            kind={
              toast.type === 'success'
                ? 'success'
                : toast.type === 'error'
                  ? 'danger'
                  : 'information'
            }
            icon={
              toast.type === 'success' ? 'check' : toast.type === 'error' ? 'status-warn' : 'info'
            }
            shape="round"
            onClose={() => setToast(null)}
          >
            {toast.message}
          </Banner>
        </div>
      )}
    </div>
  );
}
