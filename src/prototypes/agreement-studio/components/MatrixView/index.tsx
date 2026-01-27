/**
 * MatrixView Component
 *
 * Cross-document analysis grid for Agreement Studio.
 * Displays extracted data from multiple documents with:
 * - Cell status indicators (found, warning, not_found, uncertain)
 * - Row-level risk scoring (high, medium, low)
 * - Clickable citations with hover preview
 * - CSV export capability
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Icon, Tooltip } from '@/design-system';
import type { MatrixData, MatrixCell as MatrixCellType, CitationData, RiskLevel } from '../../data/agreement-studio-types';
import { MatrixCell } from './MatrixCell';
import { MatrixRiskBadge } from './MatrixRiskBadge';
import styles from './MatrixView.module.css';

export interface MatrixViewProps {
  /** Matrix data to display */
  data: MatrixData;
  /** Map of citation IDs to citation data (for tooltip fallback) */
  citations: Record<string, CitationData>;
  /** Callback when a citation is clicked */
  onCitationClick: (citation: CitationData) => void;
  /** Callback when user wants to add a column (future feature) */
  onAddColumn?: (query: string) => void;
  /** Whether the matrix is still streaming/loading */
  isStreaming?: boolean;
}

export const MatrixView: React.FC<MatrixViewProps> = ({
  data,
  citations,
  onCitationClick,
  onAddColumn,
  isStreaming = false,
}) => {
  const [copied, setCopied] = useState(false);

  // Calculate risk summary counts
  const riskCounts = useMemo(() => {
    const counts = { high: 0, medium: 0, low: 0 };
    data.rows.forEach((row) => {
      if (row.riskLevel) {
        counts[row.riskLevel]++;
      }
    });
    return counts;
  }, [data.rows]);

  // Generate CSV content from matrix data
  const generateCSV = useCallback((): string => {
    const headers = ['Agreement', ...data.columns.map((col) => col.header), 'Risk'];
    const rows = data.rows.map((row) => {
      const cells = data.columns.map((col) => {
        const cell = row.cells[col.id];
        if (!cell) return '';
        if (cell.value === null) return 'N/A';
        return cell.value;
      });
      return [row.documentTitle, ...cells, row.riskLevel || ''];
    });

    // Escape CSV values (wrap in quotes if contains comma, quote, or newline)
    const escapeCSV = (value: string): string => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    return [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) => row.map(escapeCSV).join(',')),
    ].join('\n');
  }, [data]);

  // Handle CSV copy
  const handleCopyCSV = useCallback(() => {
    const csv = generateCSV();
    navigator.clipboard.writeText(csv).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [generateCSV]);

  // Build risk summary text
  const riskSummaryText = useMemo(() => {
    const parts: string[] = [];
    if (riskCounts.high > 0) parts.push(`${riskCounts.high} high risk`);
    if (riskCounts.medium > 0) parts.push(`${riskCounts.medium} medium`);
    if (riskCounts.low > 0) parts.push(`${riskCounts.low} low`);
    return parts.join(' \u00B7 '); // middot separator
  }, [riskCounts]);

  return (
    <div className={styles.matrixContainer}>
      {/* Header */}
      <div className={styles.matrixHeader}>
        <div className={styles.matrixHeaderLeft}>
          <h3 className={styles.matrixTitle}>{data.title}</h3>
          {riskSummaryText && (
            <span className={styles.riskSummary}>{riskSummaryText}</span>
          )}
        </div>
        <div className={styles.matrixHeaderActions}>
          <Button
            kind="tertiary"
            size="small"
            startElement={<Icon name={copied ? 'status-check' : 'duplicate'} size="small" />}
            onClick={handleCopyCSV}
          >
            {copied ? 'Copied' : 'Copy CSV'}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.agreementColumn}>Agreement</th>
              {data.columns.map((col) => (
                <th key={col.id} style={col.width ? { width: col.width } : undefined}>
                  {col.header}
                </th>
              ))}
              <th className={styles.riskColumn}>Risk</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr
                key={row.documentId}
                className={`${styles.tableRow} ${row.riskLevel ? styles[`risk${capitalize(row.riskLevel)}`] : ''}`}
              >
                <td className={styles.agreementCell}>
                  <span className={styles.documentTitle}>{row.documentTitle}</span>
                </td>
                {data.columns.map((col) => {
                  const cell = row.cells[col.id];
                  return (
                    <td key={col.id}>
                      {cell ? (
                        <MatrixCell
                          cell={cell}
                          onCitationClick={onCitationClick}
                        />
                      ) : (
                        <span className={styles.emptyCell}>—</span>
                      )}
                    </td>
                  );
                })}
                <td className={styles.riskCell}>
                  {row.riskLevel && (
                    <MatrixRiskBadge
                      level={row.riskLevel}
                      reason={row.riskReason}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with citation count */}
      <div className={styles.matrixFooter}>
        <span className={styles.citationCount}>
          {Object.keys(citations).length > 0
            ? `${countCitations(data)} citations from ${data.rows.length} documents`
            : `${data.rows.length} documents analyzed`}
        </span>
      </div>
    </div>
  );
};

// Helper to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Count total citations in the matrix
function countCitations(data: MatrixData): number {
  let count = 0;
  data.rows.forEach((row) => {
    Object.values(row.cells).forEach((cell) => {
      if (cell.citation) count++;
    });
  });
  return count;
}

export default MatrixView;
