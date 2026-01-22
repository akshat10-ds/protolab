/**
 * DocumentPreviewCard Component
 *
 * Displays a generated document card with summary details
 * and action buttons. Designed for AI-generated documents.
 */

import React from 'react';
import { Button, Icon } from '@/design-system';
import styles from './DocumentPreviewCard.module.css';

export interface DocumentDetail {
  label: string;
  value: string;
}

export interface DocumentPreviewCardProps {
  /** Document title */
  title: string;
  /** Label above title (e.g., "Draft Amendment") */
  label?: string;
  /** Status badge text */
  status?: string;
  /** Detail rows to display */
  details: DocumentDetail[];
  /** Callback for Download button */
  onDownload?: () => void;
  /** Callback for Open in Word button */
  onOpenFullView?: () => void;
}

export const DocumentPreviewCard: React.FC<DocumentPreviewCardProps> = ({
  title,
  label = 'Draft Document',
  status = 'Ready for Review',
  details,
  onDownload,
  onOpenFullView,
}) => {
  return (
    <div className={styles.documentPreviewCard}>
      {/* Header with label and status */}
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <div className={styles.badge}>
          <Icon name="status-check" size={12} />
          {status}
        </div>
      </div>

      {/* Title */}
      <h4 className={styles.title}>{title}</h4>

      {/* Details grid */}
      <div className={styles.details}>
        {details.map((detail, index) => (
          <div key={index} className={styles.detailItem}>
            <span className={styles.detailLabel}>{detail.label}</span>
            <span className={styles.detailValue}>{detail.value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button
          kind="secondary"
          size="small"
          startElement={<Icon name="download" size="small" />}
          onClick={onDownload}
        >
          Download
        </Button>
        <Button
          kind="tertiary"
          size="small"
          startElement={<Icon name="external-link" size="small" />}
          onClick={onOpenFullView}
        >
          Open in Word
        </Button>
      </div>
    </div>
  );
};

export default DocumentPreviewCard;
