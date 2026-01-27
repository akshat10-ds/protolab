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
  agreementCount?: number;
  searchTerm?: string;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({
  onClick,
  agreementCount = 15,
  searchTerm = 'Acme',
}) => (
  <button type="button" className={styles.floatingCTA} onClick={onClick}>
    <span className={styles.floatingCTAIcon}>
      <Icon name="ai-spark-filled" size={24} />
    </span>
    <span className={styles.floatingCTAText}>
      Chat with {agreementCount} {searchTerm} agreements
    </span>
  </button>
);
