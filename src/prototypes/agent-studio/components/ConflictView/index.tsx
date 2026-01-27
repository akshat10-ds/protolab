/**
 * ConflictView Component
 *
 * Side-by-side clause comparison for conflict detection.
 * Shows conflicting clauses from different documents with recommendations.
 */

import React from 'react';
import { Button, IconButton, Icon } from '@/design-system';
import type { ConflictData, CitationData } from '../../data/agreement-studio-types';
import styles from './ConflictView.module.css';

export interface ConflictViewProps {
  conflicts: ConflictData[];
  onCitationClick: (citation: CitationData) => void;
}

export const ConflictView: React.FC<ConflictViewProps> = ({ conflicts, onCitationClick }) => {
  return (
    <div className={styles.conflictView}>
      {/* Tool Call Header */}
      <div className={styles.conflictViewHeader}>
        <h3 className={styles.conflictViewTitle}>CONFLICTS DETECTED</h3>
        <span className={styles.conflictViewCount}>{conflicts.length} found</span>
        <div className={styles.conflictViewHeaderActions}>
          <IconButton
            icon="overflow-horizontal"
            size="small"
            variant="tertiary"
            aria-label="More options"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.conflictViewContent}>
        {conflicts.map((conflict) => (
          <div key={conflict.id} className={styles.conflictCard}>
            <div className={styles.conflictCardHeader}>
              <Icon name="status-warn" size={16} />
              <span className={styles.conflictCardTitle}>{conflict.title}</span>
            </div>
            <p className={styles.conflictDescription}>{conflict.description}</p>

            <div className={styles.conflictComparison}>
              {conflict.clauses.map((clause, index) => (
                <div key={index} className={styles.conflictClause}>
                  <div className={styles.conflictClauseHeader}>
                    <span className={styles.conflictClauseTitle}>{clause.documentTitle}</span>
                    <span className={styles.conflictClauseSection}>{clause.section}</span>
                  </div>
                  <div className={styles.conflictClauseText}>{clause.text}</div>
                </div>
              ))}
            </div>

            <div className={styles.conflictRecommendation}>
              <Icon name="check" size={16} />
              <span className={styles.conflictRecommendationLabel}>Recommendation:</span>
              <span className={styles.conflictRecommendationText}>
                {conflict.recommendation}
                {conflict.recommendationCitation && (
                  <button
                    type="button"
                    className={styles.citation}
                    onClick={() => onCitationClick(conflict.recommendationCitation!)}
                  >
                    [View Source]
                  </button>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tool Call Footer */}
      <div className={styles.conflictViewFooter}>
        <Button kind="primary" size="small" fullWidth startElement={<Icon name="plus" size={16} />}>
          Create obligation
        </Button>
      </div>
    </div>
  );
};
