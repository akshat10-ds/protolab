/**
 * ThinkingSteps Component
 *
 * Shows the agent's reasoning process as a collapsible accordion.
 * Models real agentic behavior: action → result → next action emerges.
 *
 * - When streaming: steps animate in sequentially, showing action then result
 * - When complete: stays expanded so user can review AI's work
 * - User controls collapse (trust through transparency)
 * - "Answer now" button to skip thinking and get result immediately
 */

import React, { useEffect, useState } from 'react';
import { Spinner, Icon, Button } from '@/design-system';
import styles from './ThinkingSteps.module.css';

// Note: Spinner is still used inside individual steps

export interface ThinkingStep {
  id: string;
  /** What the agent is doing */
  action: string;
  /** What the agent found/learned - informs the next step */
  result?: string;
}

export interface ThinkingStepsProps {
  /** Array of thinking steps to display */
  steps: ThinkingStep[];
  /** Whether the AI is still streaming/thinking */
  isStreaming: boolean;
  /** Start expanded (default: true) */
  defaultExpanded?: boolean;
  /** Controlled expanded state (overrides internal state) */
  isExpanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Callback when all thinking steps complete (content will start streaming) */
  onThinkingComplete?: () => void;
  /** Callback when a step changes state (for scroll behavior) */
  onStepChange?: (stepIndex: number, state: 'active' | 'complete') => void;
  /** Callback when user clicks "Answer now" to skip thinking */
  onAnswerNow?: () => void;
}

type StepState = 'hidden' | 'active' | 'complete';

export const ThinkingSteps: React.FC<ThinkingStepsProps> = ({
  steps,
  isStreaming,
  defaultExpanded = true,
  isExpanded: controlledExpanded,
  onExpandedChange,
  onThinkingComplete,
  onStepChange,
  onAnswerNow,
}) => {
  // Control expanded state
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  // Use controlled or internal state
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    const newExpanded = !expanded;
    if (isControlled) {
      onExpandedChange?.(newExpanded);
    } else {
      setInternalExpanded(newExpanded);
    }
  };

  // Track which step is currently animating and its state
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [stepStates, setStepStates] = useState<StepState[]>([]);

  // Animation timing - REDUCED by ~40% for snappier feel
  const getActionDuration = (action: string): number => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes('scanning') || lowerAction.includes('searching')) {
      return 1500 + Math.random() * 600;
    }
    if (
      lowerAction.includes('reading') ||
      lowerAction.includes('opening') ||
      lowerAction.includes('checking')
    ) {
      return 1200 + Math.random() * 300;
    }
    if (lowerAction.includes('fetching')) {
      return 1000 + Math.random() * 300;
    }
    if (
      lowerAction.includes('extracting') ||
      lowerAction.includes('calculating') ||
      lowerAction.includes('applying')
    ) {
      return 900 + Math.random() * 300;
    }
    if (
      lowerAction.includes('loading') ||
      lowerAction.includes('generating') ||
      lowerAction.includes('linking')
    ) {
      return 700 + Math.random() * 300;
    }
    return 1000 + Math.random() * 300;
  };

  const RESULT_DURATION = 500;

  // Animate steps sequentially when streaming
  useEffect(() => {
    if (!isStreaming || steps.length === 0) {
      setVisibleSteps(steps.length);
      setStepStates(steps.map(() => 'complete'));
      return;
    }

    setVisibleSteps(0);
    setStepStates([]);

    let currentStep = 0;
    const timers: NodeJS.Timeout[] = [];

    const animateStep = () => {
      if (currentStep >= steps.length) return;

      setVisibleSteps(currentStep + 1);
      setStepStates((prev) => {
        const next = [...prev];
        next[currentStep] = 'active';
        return next;
      });
      onStepChange?.(currentStep, 'active');

      const actionDuration = getActionDuration(steps[currentStep].action);
      const completeTimer = setTimeout(() => {
        setStepStates((prev) => {
          const next = [...prev];
          next[currentStep] = 'complete';
          return next;
        });
        onStepChange?.(currentStep, 'complete');

        const nextTimer = setTimeout(() => {
          currentStep++;
          if (currentStep >= steps.length) {
            onThinkingComplete?.();
          } else {
            animateStep();
          }
        }, RESULT_DURATION);
        timers.push(nextTimer);
      }, actionDuration);
      timers.push(completeTimer);
    };

    animateStep();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isStreaming, steps.length, onThinkingComplete, onStepChange]);

  if (steps.length === 0) {
    return null;
  }

  // Count completed steps to determine if thinking is still active
  const completedCount = stepStates.filter((s) => s === 'complete').length;
  const isThinkingActive = isStreaming && completedCount < steps.length;

  return (
    <div className={styles.thinkingSteps}>
      {/* Custom header row with Answer now button */}
      <div className={styles.headerRow}>
        <button
          type="button"
          className={styles.headerToggle}
          onClick={handleToggle}
          aria-expanded={expanded}
        >
          <span className={styles.headerTitle}>Thinking</span>
          {/* Answer now button - only show during active thinking, before chevron */}
          {isThinkingActive && onAnswerNow && (
            <span
              className={styles.answerNowWrapper}
              onClick={(e) => {
                e.stopPropagation();
                onAnswerNow();
              }}
            >
              <Button kind="tertiary" size="small">
                Answer now
              </Button>
            </span>
          )}
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            className={styles.headerChevron}
          />
        </button>
      </div>

      {/* Collapsible content */}
      {expanded && (
        <div className={styles.stepsList}>
          {steps.slice(0, visibleSteps).map((step, index) => {
            const state = stepStates[index] || 'hidden';
            const isActive = state === 'active';
            const isComplete = state === 'complete';

            return (
              <div
                key={step.id}
                className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isComplete ? styles.stepComplete : ''}`}
              >
                <div className={styles.stepHeader}>
                  {isActive && (
                    <span className={styles.stepIndicator}>
                      <Spinner size="small" />
                    </span>
                  )}
                  <span className={styles.stepActionText}>{step.action}</span>
                </div>
                {step.result && isComplete && (
                  <div className={styles.stepResult}>{step.result}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
