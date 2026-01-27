/**
 * MatrixCell Component
 *
 * Renders a single cell in the matrix with:
 * - Value display
 * - Status indicator (warning icon, dash for not found)
 * - Clickable citation chip with hover tooltip
 */

import React, { useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/design-system';
import type { MatrixCell as MatrixCellType, CitationData } from '../../data/agreement-studio-types';
import styles from './MatrixView.module.css';

export interface MatrixCellProps {
  /** Cell data */
  cell: MatrixCellType;
  /** Callback when citation is clicked */
  onCitationClick: (citation: CitationData) => void;
}

export const MatrixCell: React.FC<MatrixCellProps> = ({
  cell,
  onCitationClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const handleMouseEnter = useCallback(() => {
    if (buttonRef.current && cell.citation) {
      const rect = buttonRef.current.getBoundingClientRect();
      const tooltipWidth = 280;

      // Position tooltip below the cell
      let left = rect.left;
      const top = rect.bottom + 8;

      // Keep within viewport
      if (left + tooltipWidth > window.innerWidth - 16) {
        left = window.innerWidth - tooltipWidth - 16;
      }
      left = Math.max(16, left);

      setTooltipStyle({
        top: `${top}px`,
        left: `${left}px`,
      });
      setIsHovered(true);
    }
  }, [cell.citation]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    if (cell.citation) {
      onCitationClick(cell.citation);
    }
  }, [cell.citation, onCitationClick]);

  // Render status icon based on cell status
  const renderStatusIcon = () => {
    switch (cell.status) {
      case 'warning':
        return <span className={styles.warningIcon}>⚠️</span>;
      case 'not_found':
        return null; // Handled by "—" in value display
      case 'uncertain':
        return <span className={styles.uncertainIcon}>?</span>;
      case 'loading':
        return <span className={styles.loadingIcon}>...</span>;
      default:
        return null;
    }
  };

  // Render the tooltip in a portal
  const tooltip =
    isHovered && cell.citation
      ? createPortal(
          <div
            className={`${styles.cellTooltip} ${styles.cellTooltipVisible}`}
            style={tooltipStyle}
          >
            <span className={styles.cellTooltipLabel}>Source</span>
            <span className={styles.cellTooltipTitle}>
              {cell.citation.documentTitle}
            </span>
            <span className={styles.cellTooltipSection}>
              {cell.citation.section}
            </span>
            <span className={styles.cellTooltipExcerpt}>
              "
              {cell.citation.excerpt.length > 120
                ? `${cell.citation.excerpt.substring(0, 120)}...`
                : cell.citation.excerpt}
              "
            </span>
          </div>,
          document.body
        )
      : null;

  // Handle not found status
  if (cell.status === 'not_found') {
    return (
      <div className={styles.cellContent}>
        <span className={styles.notFoundValue}>—</span>
        {cell.note && (
          <span className={styles.cellNote}>{cell.note}</span>
        )}
      </div>
    );
  }

  return (
    <div className={styles.cellContent}>
      <div className={styles.cellValueRow}>
        {renderStatusIcon()}
        <span
          className={`${styles.cellValue} ${cell.status === 'warning' ? styles.cellValueWarning : ''}`}
        >
          {cell.value || '—'}
        </span>
        {cell.citation && (
          <button
            ref={buttonRef}
            type="button"
            className={styles.citationButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            aria-label={`View source: ${cell.citation.documentTitle}`}
          >
            <span className={styles.citationChip}>
              <Icon name="document" size={10} />
            </span>
          </button>
        )}
        {tooltip}
      </div>
      {cell.note && (
        <span className={styles.cellNote}>{cell.note}</span>
      )}
    </div>
  );
};

export default MatrixCell;
