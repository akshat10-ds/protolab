/**
 * FloatingCTA Component
 *
 * Floating call-to-action button that appears when agreements are selected/searched.
 * Displays agreement count and prompts user to open AI chat.
 */

import React from 'react';
import { Icon } from '@/design-system';
import styles from './FloatingCTA.module.css';

export interface FloatingCTAProps {
  onClick: () => void;
  /** Custom text to display. If not provided, defaults to agreement count text */
  text?: string;
  agreementCount?: number;
  searchTerm?: string;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({
  onClick,
  text,
  agreementCount = 15,
  searchTerm = 'Acme',
}) => {
  const displayText = text ?? `Chat with ${agreementCount} ${searchTerm} agreements`;

  return (
    <button type="button" className={styles.floatingCTA} onClick={onClick}>
      <span className={styles.floatingCTAIcon}>
        <Icon name="ai-spark-filled" size={24} />
      </span>
      <span className={styles.floatingCTAText}>{displayText}</span>
    </button>
  );
};
