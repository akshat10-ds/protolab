/**
 * RichMessage Component
 *
 * Renders categorized AI responses with tables, lists, and citations.
 * Features:
 * - Multiple section types (table, list, text)
 * - Clickable citations that link to document viewer
 * - Tool-call style card with header and footer actions
 *
 * This component is a candidate for design system extraction.
 */

import React from 'react';
import { Button, IconButton, Icon } from '@/design-system';
import type {
  RichMessageData,
  RichTableData,
  RichListItem,
  CitationData,
} from '../../data/agreement-studio-types';
import styles from './RichMessage.module.css';

export interface RichMessageProps {
  data: RichMessageData;
  onCitationClick: (citation: CitationData) => void;
}

export const RichMessage: React.FC<RichMessageProps> = ({ data, onCitationClick }) => {
  // Count total citations in the message
  const citationCount = React.useMemo(() => {
    let count = 0;
    data.sections.forEach((section) => {
      if (section.type === 'table') {
        const tableData = section.content as RichTableData;
        tableData.rows.forEach((row) => {
          row.cells.forEach((cell) => {
            if (typeof cell !== 'string' && cell.citation) {
              count++;
            }
          });
        });
      } else if (section.type === 'list') {
        const listData = section.content as RichListItem[];
        listData.forEach((item) => {
          if (item.citation) {
            count++;
          }
        });
      }
    });
    return count;
  }, [data]);

  const renderCitation = (citation: CitationData, displayText: string) => (
    <span className={styles.citationWrapper}>
      <button type="button" className={styles.citation} onClick={() => onCitationClick(citation)}>
        [{displayText}]
      </button>
      <span className={styles.citationTooltip}>
        <span className={styles.citationTooltipLabel}>Source</span>
        <span className={styles.citationTooltipTitle}>{citation.documentTitle}</span>
        <span className={styles.citationTooltipExcerpt}>
          "
          {citation.excerpt.length > 100
            ? `${citation.excerpt.substring(0, 100)}...`
            : citation.excerpt}
          "
        </span>
      </span>
    </span>
  );

  const renderCellContent = (cell: string | { text: string; citation?: CitationData }) => {
    if (typeof cell === 'string') {
      return cell;
    }
    if (cell.citation) {
      return renderCitation(cell.citation, cell.text);
    }
    return cell.text;
  };

  const renderTableSection = (content: RichTableData) => (
    <table className={styles.richTable}>
      <thead>
        <tr>
          {content.headers.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.cells.map((cell, cellIndex) => (
              <td key={cellIndex}>{renderCellContent(cell)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderListSection = (content: RichListItem[]) => (
    <ul className={styles.richList}>
      {content.map((item, index) => (
        <li key={index} className={styles.richListItem}>
          {item.text}
          {item.citation && (
            <>
              {' '}
              {renderCitation(
                item.citation,
                item.citation.documentTitle.split(' - ')[1] || item.citation.section
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.richMessage}>
      {/* Tool Call Header */}
      <div className={styles.richMessageHeader}>
        <h3 className={styles.richMessageTitle}>{data.title}</h3>
        <span className={styles.richMessageSubtitle}>{data.subtitle}</span>
        {citationCount > 0 && (
          <span className={styles.citationBadge}>
            <Icon name="link" size={12} />
            {citationCount} {citationCount === 1 ? 'citation' : 'citations'}
          </span>
        )}
        <div className={styles.richMessageHeaderActions}>
          <IconButton
            icon="overflow-horizontal"
            size="small"
            variant="tertiary"
            aria-label="More options"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.richMessageContent}>
        {data.sections.map((section) => (
          <div key={section.id} className={styles.richMessageSection}>
            <div className={styles.richMessageSectionHeader}>
              <span className={styles.richMessageSectionIcon}>
                <Icon name={section.icon as any} size={16} />
              </span>
              <h4 className={styles.richMessageSectionTitle}>{section.title}</h4>
            </div>
            {section.type === 'table' && renderTableSection(section.content as RichTableData)}
            {section.type === 'list' && renderListSection(section.content as RichListItem[])}
            {section.type === 'text' && <p>{section.content as string}</p>}
          </div>
        ))}
      </div>

      {/* Tool Call Footer */}
      <div className={styles.richMessageFooter}>
        <Button
          kind="primary"
          size="small"
          fullWidth
          startElement={<Icon name="document" size={16} />}
        >
          Draft revised agreement
        </Button>
      </div>
    </div>
  );
};
