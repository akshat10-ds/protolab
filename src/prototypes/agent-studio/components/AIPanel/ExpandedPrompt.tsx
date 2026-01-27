/**
 * ExpandedPrompt Component
 *
 * Shows detailed breakdown of what an AI prompt will do before running.
 * Displays analysis steps, document count, and estimated time.
 */

import React from 'react';
import { Button, IconButton, Icon } from '@/design-system';
import type { ExtendedSuggestedAction } from '../../data/agreement-studio-types';
import styles from './ExpandedPrompt.module.css';

export interface ExpandedPromptProps {
  action: ExtendedSuggestedAction;
  onRun: () => void;
  onClose: () => void;
}

export const ExpandedPrompt: React.FC<ExpandedPromptProps> = ({ action, onRun, onClose }) => {
  if (!action.expansion) return null;

  return (
    <div className={styles.expandedPrompt}>
      <div className={styles.expandedPromptHeader}>
        <div className={styles.expandedPromptTitle}>
          <Icon name={(action.icon as any) || 'bolt'} size={20} />
          <span>{action.label}</span>
        </div>
        <IconButton
          icon="close"
          size="small"
          kind="tertiary"
          onClick={onClose}
          aria-label="Close"
        />
      </div>
      <div className={styles.expandedPromptContent}>
        <p className={styles.expandedPromptLabel}>This analysis will:</p>
        <ul className={styles.expandedPromptSteps}>
          {action.expansion.steps.map((step, index) => (
            <li key={index}>
              <Icon name="check" size={14} />
              <span>{step}</span>
            </li>
          ))}
        </ul>
        <div className={styles.expandedPromptMeta}>
          <span className={styles.expandedPromptMetaItem}>
            <Icon name="document" size={14} />
            {action.expansion.documentsToAnalyze} documents
          </span>
          <span className={styles.expandedPromptMetaItem}>
            <Icon name="clock" size={14} />
            {action.expansion.estimatedTime}
          </span>
        </div>
      </div>
      <div className={styles.expandedPromptActions}>
        <Button kind="primary" size="small" onClick={onRun}>
          <Icon name="control-play" size={14} />
          Run analysis
        </Button>
      </div>
    </div>
  );
};
