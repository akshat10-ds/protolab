/**
 * MarkdownMessage Component
 *
 * Renders AI responses as formatted markdown with clickable citations.
 * Supports: headers, tables, lists, blockquotes, bold, italic, and citation links.
 *
 * Citations are embedded as [Text]¹ or [¹] and link to document viewer.
 */

import React, { useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button, Icon } from '@/design-system';
import type { CitationData } from '../../data/agreement-studio-types';
import styles from './MarkdownMessage.module.css';

/**
 * CitationWithTooltip Component
 * Handles tooltip positioning to escape overflow:hidden containers
 */
interface CitationWithTooltipProps {
  citationId: string;
  citation: CitationData;
  displayText?: string;
  onCitationClick: (citation: CitationData) => void;
}

const CitationWithTooltip: React.FC<CitationWithTooltipProps> = ({
  citationId,
  citation,
  displayText,
  onCitationClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const handleMouseEnter = useCallback(() => {
    if (buttonRef.current) {
      // Get position of the button/chip element specifically
      const rect = buttonRef.current.getBoundingClientRect();
      const tooltipWidth = 280;

      // Position tooltip below the button, aligned to button's left edge
      let left = rect.left;
      const top = rect.bottom + 8; // 8px below the button

      // Keep tooltip within viewport
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
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Render tooltip in a portal to escape any parent transforms
  const tooltip = isHovered
    ? createPortal(
        <span
          className={`${styles.citationTooltip} ${styles.citationTooltipVisible}`}
          style={tooltipStyle}
        >
          <span className={styles.citationTooltipLabel}>Source</span>
          <span className={styles.citationTooltipTitle}>{citation.documentTitle}</span>
          <span className={styles.citationTooltipExcerpt}>
            "
            {citation.excerpt.length > 100
              ? `${citation.excerpt.substring(0, 100)}...`
              : citation.excerpt}
            "
          </span>
        </span>,
        document.body
      )
    : null;

  return (
    <span className={styles.citationWrapper}>
      {displayText}
      <button
        ref={buttonRef}
        type="button"
        className={styles.citationButton}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onCitationClick(citation)}
      >
        <span className={styles.citationChip}>{citationId}</span>
      </button>
      {tooltip}
    </span>
  );
};

export interface MarkdownMessageProps {
  /** Markdown content to render */
  content: string;
  /** Map of citation IDs to citation data */
  citations: Record<string, CitationData>;
  /** Callback when a citation is clicked */
  onCitationClick: (citation: CitationData) => void;
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({
  content,
  citations,
  onCitationClick,
}) => {
  const renderedContent = useMemo(() => {
    return parseMarkdown(content, citations, onCitationClick);
  }, [content, citations, onCitationClick]);

  return <div className={styles.markdownMessage}>{renderedContent}</div>;
};

/**
 * Simple markdown parser that converts markdown to React elements
 */
function parseMarkdown(
  content: string,
  citations: Record<string, CitationData>,
  onCitationClick: (citation: CitationData) => void
): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  const getKey = () => `md-${keyCounter++}`;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line - skip
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      elements.push(<hr key={getKey()} className={styles.hr} />);
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={getKey()} className={styles.h3}>
          {parseInline(line.slice(4), citations, onCitationClick, getKey)}
        </h4>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={getKey()} className={styles.h2}>
          {parseInline(line.slice(3), citations, onCitationClick, getKey)}
        </h3>
      );
      i++;
      continue;
    }

    // Table detection
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, citations, onCitationClick, getKey));
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={getKey()} className={styles.blockquote}>
          {quoteLines.map((ql, idx) => (
            <React.Fragment key={idx}>
              {parseInline(ql, citations, onCitationClick, getKey)}
              {idx < quoteLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={getKey()} className={styles.ul}>
          {listItems.map((item, idx) => (
            <li key={idx} className={styles.li}>
              {parseInline(item, citations, onCitationClick, getKey)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Italic metadata line (starts and ends with *)
    if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      elements.push(
        <p key={getKey()} className={styles.metadata}>
          {parseInline(line, citations, onCitationClick, getKey)}
        </p>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={getKey()} className={styles.p}>
        {parseInline(line, citations, onCitationClick, getKey)}
      </p>
    );
    i++;
  }

  return elements;
}

/**
 * Parse inline markdown elements (bold, italic, citations)
 */
function parseInline(
  text: string,
  citations: Record<string, CitationData>,
  onCitationClick: (citation: CitationData) => void,
  getKey: () => string
): React.ReactNode {
  const elements: React.ReactNode[] = [];

  // Combined regex for all inline patterns
  // Matches: **bold**, *italic*, [text]¹, [¹], ⚠️ emoji
  const inlineRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\][¹²³⁴⁵⁶⁷⁸⁹⁰]+|\[[¹²³⁴⁵⁶⁷⁸⁹⁰]+\]|⚠️)/g;

  let lastIndex = 0;
  let match;

  while ((match = inlineRegex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const matchedText = match[0];

    // Bold
    if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
      elements.push(
        <strong key={getKey()} className={styles.strong}>
          {matchedText.slice(2, -2)}
        </strong>
      );
    }
    // Italic
    else if (matchedText.startsWith('*') && matchedText.endsWith('*')) {
      elements.push(
        <em key={getKey()} className={styles.em}>
          {matchedText.slice(1, -1)}
        </em>
      );
    }
    // Citation with text [text]¹
    else if (matchedText.match(/^\[[^\]]+\][¹²³⁴⁵⁶⁷⁸⁹⁰]+$/)) {
      const bracketEnd = matchedText.lastIndexOf(']');
      const displayText = matchedText.slice(1, bracketEnd);
      const superscript = matchedText.slice(bracketEnd + 1);
      const citationId = superscriptToNumber(superscript);
      const citation = citations[citationId];

      if (citation) {
        elements.push(
          <CitationWithTooltip
            key={getKey()}
            citationId={citationId}
            citation={citation}
            displayText={displayText}
            onCitationClick={onCitationClick}
          />
        );
      } else {
        elements.push(
          <span key={getKey()} className={styles.citationWrapper}>
            {displayText}
            <span className={styles.citationChip}>{citationId}</span>
          </span>
        );
      }
    }
    // Citation number only [¹]
    else if (matchedText.match(/^\[[¹²³⁴⁵⁶⁷⁸⁹⁰]+\]$/)) {
      const superscript = matchedText.slice(1, -1);
      const citationId = superscriptToNumber(superscript);
      const citation = citations[citationId];

      if (citation) {
        elements.push(
          <CitationWithTooltip
            key={getKey()}
            citationId={citationId}
            citation={citation}
            onCitationClick={onCitationClick}
          />
        );
      } else {
        elements.push(
          <span key={getKey()} className={styles.citationChip}>
            {citationId}
          </span>
        );
      }
    }
    // Warning emoji
    else if (matchedText === '⚠️') {
      elements.push(
        <span key={getKey()} className={styles.warningEmoji}>
          ⚠️
        </span>
      );
    }

    lastIndex = match.index + matchedText.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length === 1 ? elements[0] : elements;
}

/**
 * TableWithCopy Component
 * Renders a table with a copy CSV button
 */
interface TableWithCopyProps {
  headerCells: string[];
  dataRows: string[][];
  citations: Record<string, CitationData>;
  onCitationClick: (citation: CitationData) => void;
  getKey: () => string;
}

const TableWithCopy: React.FC<TableWithCopyProps> = ({
  headerCells,
  dataRows,
  citations,
  onCitationClick,
  getKey,
}) => {
  const [copied, setCopied] = useState(false);

  // Strip citation markers from text for CSV export
  const stripCitations = (text: string): string => {
    return text
      .replace(/\[[^\]]+\][¹²³⁴⁵⁶⁷⁸⁹⁰]+/g, (match) => {
        // Extract just the text inside brackets
        const bracketEnd = match.lastIndexOf(']');
        return match.slice(1, bracketEnd);
      })
      .replace(/\[[¹²³⁴⁵⁶⁷⁸⁹⁰]+\]/g, '') // Remove standalone citation numbers
      .trim();
  };

  const handleCopyCSV = useCallback(() => {
    // Build CSV string
    const csvRows = [
      headerCells.map(stripCitations).join(','),
      ...dataRows.map((row) => row.map(stripCitations).join(',')),
    ];
    const csvString = csvRows.join('\n');

    // Copy to clipboard
    navigator.clipboard.writeText(csvString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [headerCells, dataRows]);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headerCells.map((cell, idx) => (
                <th key={idx}>{parseInline(cell, citations, onCitationClick, getKey)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>{parseInline(cell, citations, onCitationClick, getKey)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.tableFooter}>
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
  );
};

/**
 * Render a markdown table
 */
function renderTable(
  lines: string[],
  citations: Record<string, CitationData>,
  onCitationClick: (citation: CitationData) => void,
  getKey: () => string
): React.ReactNode {
  if (lines.length < 2) return null;

  // Parse header row
  const headerCells = lines[0]
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean);

  // Skip separator row (index 1)
  // Parse data rows
  const dataRows = lines.slice(2).map((line) =>
    line
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean)
  );

  return (
    <TableWithCopy
      key={getKey()}
      headerCells={headerCells}
      dataRows={dataRows}
      citations={citations}
      onCitationClick={onCitationClick}
      getKey={getKey}
    />
  );
}

/**
 * Convert superscript numbers to regular numbers for citation lookup
 */
function superscriptToNumber(superscript: string): string {
  const superscriptMap: Record<string, string> = {
    '¹': '1',
    '²': '2',
    '³': '3',
    '⁴': '4',
    '⁵': '5',
    '⁶': '6',
    '⁷': '7',
    '⁸': '8',
    '⁹': '9',
    '⁰': '0',
  };

  return superscript
    .split('')
    .map((char) => superscriptMap[char] || char)
    .join('');
}

export default MarkdownMessage;
