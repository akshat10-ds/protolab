/**
 * AgreementStudio Prototype
 *
 * Scripted demo for AI-powered contract analysis - "Acme Renewal Prep" scenario.
 * Features:
 * - Rich categorized AI responses (Financials, Risk, Key Changes)
 * - Clickable citations with document viewer
 * - Domain-specific expandable prompts
 * - Share modal with permission toast
 * - Conflict detection visualization
 *
 * Based on the 10-step demo scenario for contract renewal analysis.
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  DocuSignShell,
  AgreementTableView,
  PageHeader,
  FilterBar,
  DataTable,
  DataTableColumn,
  DataTableAction,
  DataTablePaginationConfig,
  PageSizeOption,
  dataTableStyles,
  Banner,
  IrisIcon,
  Dropdown,
  Button,
  IconButton,
  ComboButton,
  Icon,
  AIIcon,
  AIBadge,
  AIChat,
  ChatMessage,
  Checkbox,
  Link,
  Modal,
  Input,
  Spinner,
  Tooltip,
  Text,
} from '@/design-system';
import styles from './AgreementStudio.module.css';

// Types and Data - extracted to separate files for better organization
import type {
  RichMessageData,
  RichTableData,
  RichListItem,
  CitationData,
  ConflictData,
  Agreement,
  ExtendedSuggestedAction,
} from './agreement-studio-types';
import {
  ALL_AGREEMENTS,
  QUICK_ACTIONS,
  SUGGESTED_QUESTIONS,
  CHAT_HISTORY,
  STORED_CONVERSATIONS,
  SCRIPTED_RESPONSES,
  DOCUMENT_PAGES,
  CONFLICT_RESPONSES,
} from './agreement-studio-data';

// =============================================================================
// NOTE: Types extracted to ./agreement-studio-types.ts
// NOTE: Mock data extracted to ./agreement-studio-data.ts
// =============================================================================

// =============================================================================
// Logo Component
// =============================================================================

const DocuSignLogo = () => (
  <img src="/assets/docusign-logo.svg" alt="DocuSign" className={styles.logo} />
);

// =============================================================================
// Floating CTA Button Component
// =============================================================================

interface FloatingCTAProps {
  onClick: () => void;
  agreementCount?: number;
  searchTerm?: string;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({
  onClick,
  agreementCount = 15,
  searchTerm = 'Acme'
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

// =============================================================================
// RichMessage Component - Renders categorized AI responses
// =============================================================================

interface RichMessageProps {
  data: RichMessageData;
  onCitationClick: (citation: CitationData) => void;
}

const RichMessage: React.FC<RichMessageProps> = ({ data, onCitationClick }) => {
  const renderCellContent = (cell: string | { text: string; citation?: CitationData }) => {
    if (typeof cell === 'string') {
      return cell;
    }
    if (cell.citation) {
      return (
        <button
          type="button"
          className={styles.citation}
          onClick={() => onCitationClick(cell.citation!)}
        >
          [{cell.text}]
        </button>
      );
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
              <button
                type="button"
                className={styles.citation}
                onClick={() => onCitationClick(item.citation!)}
              >
                [{item.citation.documentTitle.split(' - ')[1] || item.citation.section}]
              </button>
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

// =============================================================================
// DocumentCanvas Component - Full canvas view for documents (Gemini-style)
// =============================================================================

// Breakpoint for narrow mode (canvas takes full width with back button)
const NARROW_BREAKPOINT = 700;

interface DocumentCanvasProps {
  isOpen: boolean;
  citation: CitationData | null;
  onClose: () => void;
  isNarrowMode: boolean;
}

const DocumentCanvas: React.FC<DocumentCanvasProps> = ({ isOpen, citation, onClose, isNarrowMode }) => {
  const pageData = citation ? DOCUMENT_PAGES[citation.id] : null;
  const [selectedPage, setSelectedPage] = useState(1);

  // Reset to citation page when citation changes
  useEffect(() => {
    if (pageData) {
      setSelectedPage(pageData.pageNumber);
    }
  }, [pageData]);

  // Generate mock page thumbnails
  const pageThumbnails = pageData
    ? Array.from({ length: pageData.totalPages }, (_, i) => i + 1)
    : [];

  // Wrapper classes for animation and responsive layout
  const wrapperClasses = [
    styles.documentCanvasWrapper,
    isOpen ? styles.documentCanvasWrapperOpen : '',
    isNarrowMode && isOpen ? styles.documentCanvasWrapperFullWidth : '',
  ].filter(Boolean).join(' ');

  const canvasClasses = styles.documentCanvas;

  return (
    <div className={wrapperClasses}>
      <div className={canvasClasses}>
      {/* Canvas Header/Toolbar */}
      <div className={styles.canvasHeader}>
        <div className={styles.canvasHeaderLeft}>
          {/* Back button in narrow mode */}
          {isNarrowMode && (
            <button
              className={styles.canvasBackButton}
              onClick={onClose}
              aria-label="Back to chat"
            >
              <Icon name="arrow-left" size={18} />
            </button>
          )}
          <Icon name="document" size={18} />
          <span className={styles.canvasTitle}>{citation?.documentTitle || 'Document'}</span>
        </div>
        <div className={styles.canvasHeaderCenter}>
          {/* Page navigation in header */}
          <button
            className={styles.canvasNavButton}
            disabled={selectedPage <= 1}
            onClick={() => setSelectedPage(p => p - 1)}
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <span className={styles.canvasPageIndicator}>
            {selectedPage} / {pageData?.totalPages || 1}
          </span>
          <button
            className={styles.canvasNavButton}
            disabled={selectedPage >= (pageData?.totalPages || 1)}
            onClick={() => setSelectedPage(p => p + 1)}
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
        <div className={styles.canvasHeaderRight}>
          <Tooltip content="Open in Navigator">
            <IconButton icon="external-link" size="small" kind="tertiary" aria-label="Open in Navigator" />
          </Tooltip>
          <IconButton icon="close" size="small" kind="tertiary" onClick={onClose} aria-label="Close" />
        </div>
      </div>

      {/* Canvas Body */}
      <div className={styles.canvasBody}>
        {/* Thumbnails sidebar */}
        <div className={styles.canvasThumbnails}>
          {pageThumbnails.map((pageNum) => (
            <button
              key={pageNum}
              className={`${styles.canvasThumb} ${pageNum === selectedPage ? styles.canvasThumbActive : ''}`}
              onClick={() => setSelectedPage(pageNum)}
            >
              <div className={styles.canvasThumbPage}>
                {pageNum === pageData?.pageNumber && (
                  <div className={styles.canvasThumbHighlight} />
                )}
              </div>
              <span className={styles.canvasThumbNum}>{pageNum}</span>
            </button>
          ))}
        </div>

        {/* Document content area */}
        <div className={styles.canvasContent}>
          <div className={styles.canvasDocument}>
            {/* Document letterhead */}
            <div className={styles.canvasLetterhead}>
              <div className={styles.canvasCompanyLogo}>
                <div className={styles.canvasLogoIcon}>A</div>
                <div className={styles.canvasCompanyInfo}>
                  <span className={styles.canvasCompanyName}>ACME CORPORATION</span>
                  <span className={styles.canvasCompanyAddress}>123 Business Park Drive, Suite 400</span>
                  <span className={styles.canvasCompanyAddress}>San Francisco, CA 94102</span>
                </div>
              </div>
              <div className={styles.canvasDocType}>
                {citation?.documentTitle?.includes('MSA') ? 'MASTER SERVICES AGREEMENT' :
                 citation?.documentTitle?.includes('Order Form') ? 'ORDER FORM' :
                 citation?.documentTitle?.includes('SOW') ? 'STATEMENT OF WORK' :
                 citation?.documentTitle?.includes('Amendment') ? 'AMENDMENT' : 'AGREEMENT'}
              </div>
            </div>

            <div className={styles.canvasDivider} />

            {/* Section header */}
            {pageData && (
              <h3 className={styles.canvasSectionTitle}>{pageData.sectionTitle}</h3>
            )}

            {/* Document text */}
            {pageData && selectedPage === pageData.pageNumber ? (
              <div className={styles.canvasTextContent}>
                <div className={styles.canvasText}>
                  {pageData.beforeText.split('\n').map((line, i) => (
                    <p key={`before-${i}`}>{line || '\u00A0'}</p>
                  ))}
                </div>

                {/* Highlighted citation */}
                <div className={styles.canvasCitation}>
                  <div className={styles.canvasCitationBadge}>
                    <Icon name="ai-spark" size={14} />
                    <span>Citation {citation?.id?.replace('cit-', '')}</span>
                  </div>
                  <p className={styles.canvasCitationText}>
                    <mark className={styles.canvasCitationHighlight}>{pageData.highlightedText}</mark>
                  </p>
                </div>

                <div className={styles.canvasText}>
                  {pageData.afterText.split('\n').map((line, i) => (
                    <p key={`after-${i}`}>{line || '\u00A0'}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.canvasPlaceholder}>
                <Icon name="document" size={40} />
                <p>Page {selectedPage}</p>
                <button
                  className={styles.canvasJumpButton}
                  onClick={() => setSelectedPage(pageData?.pageNumber || 1)}
                >
                  Jump to citation (page {pageData?.pageNumber})
                </button>
              </div>
            )}

            {/* Page footer */}
            <div className={styles.canvasPageFooter}>
              <span>Page {selectedPage}</span>
              <span>{citation?.documentTitle}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

// =============================================================================
// AgreementsSidebar Component - Shows agreements loaded in context
// Simplified checkbox UI with shared element transition to doc preview
// =============================================================================

interface AgreementsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  agreements: Agreement[];
  onAgreementClick: (agreement: Agreement, itemRect: DOMRect | null) => void;
  /** Selected agreement IDs (controlled state from parent) */
  selectedIds: Set<string>;
  /** Callback when selection changes */
  onSelectionChange: (selectedIds: Set<string>) => void;
}

const AgreementsSidebar: React.FC<AgreementsSidebarProps> = ({
  isOpen,
  onClose,
  agreements,
  onAgreementClick,
  selectedIds,
  onSelectionChange,
}) => {
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [rippleId, setRippleId] = useState<string | null>(null);

  const allSelected = selectedIds.size === agreements.length;

  // Trigger ripple animation on a checkbox
  const triggerRipple = useCallback((id: string) => {
    setRippleId(id);
    setTimeout(() => setRippleId(null), 400); // Match animation duration
  }, []);

  const handleSelectAll = useCallback(() => {
    triggerRipple('select-all');
    if (allSelected) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(agreements.map(a => a.id)));
    }
  }, [allSelected, agreements, onSelectionChange, triggerRipple]);

  // Simple toggle function for checkbox onChange
  const toggleItem = useCallback((id: string) => {
    triggerRipple(id);
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onSelectionChange(next);
  }, [selectedIds, onSelectionChange, triggerRipple]);

  // Click handler that also stops propagation
  const handleToggleItem = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem(id);
  }, [toggleItem]);

  const handleItemClick = useCallback((agreement: Agreement) => {
    const itemEl = itemRefs.current.get(agreement.id);
    const rect = itemEl?.getBoundingClientRect() || null;
    onAgreementClick(agreement, rect);
  }, [onAgreementClick]);

  const wrapperClasses = [
    styles.agreementsSidebarWrapper,
    isOpen ? styles.agreementsSidebarWrapperOpen : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <div className={styles.agreementsSidebar}>
        {/* Header with close button */}
        <div className={styles.agreementsSidebarHeader}>
          <span className={styles.agreementsSidebarHeaderTitle}>Sources</span>
          <IconButton
            icon="close"
            size="small"
            kind="tertiary"
            onClick={onClose}
            aria-label="Close"
          />
        </div>

        {/* Select All Row */}
        <button
          type="button"
          className={styles.agreementsSidebarSelectAll}
          onClick={handleSelectAll}
        >
          <span className={styles.agreementsSidebarSelectAllText}>Select all sources</span>
          {/* Wrap checkbox in div to capture click - parent button handles the toggle */}
          <div
            role="presentation"
            className={`${styles.agreementsSidebarCheckbox} ${rippleId === 'select-all' ? styles.checkboxRipple : ''}`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
          >
            <Checkbox
              checked={allSelected}
              onChange={handleSelectAll}
              label=""
              showLabel={false}
            />
          </div>
        </button>

        {/* Divider */}
        <div className={styles.agreementsSidebarDivider} />

        {/* Agreement List */}
        <div className={styles.agreementsSidebarList}>
          {agreements.map((agreement) => {
            const isSelected = selectedIds.has(agreement.id);
            return (
              <button
                key={agreement.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(agreement.id, el);
                  else itemRefs.current.delete(agreement.id);
                }}
                type="button"
                className={styles.agreementsSidebarItem}
                onClick={() => handleItemClick(agreement)}
              >
                <div className={styles.agreementsSidebarItemIcon}>
                  <Icon name="document" size={18} />
                </div>
                <span className={styles.agreementsSidebarItemTitle}>
                  {agreement.fileName}
                </span>
                {/* Checkbox wrapper - only onChange handles toggle, wrapper just stops propagation */}
                <div
                  role="presentation"
                  className={`${styles.agreementsSidebarCheckbox} ${rippleId === agreement.id ? styles.checkboxRipple : ''}`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                    }
                  }}
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleItem(agreement.id)}
                    label=""
                    showLabel={false}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// ConflictView Component - Side-by-side clause comparison
// =============================================================================

interface ConflictViewProps {
  conflicts: ConflictData[];
  onCitationClick: (citation: CitationData) => void;
}

const ConflictView: React.FC<ConflictViewProps> = ({ conflicts, onCitationClick }) => {
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
                  <div className={styles.conflictClauseText}>
                    {clause.text}
                  </div>
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
        <Button
          kind="primary"
          size="small"
          fullWidth
          startElement={<Icon name="plus" size={16} />}
        >
          Create obligation
        </Button>
      </div>
    </div>
  );
};

// =============================================================================
// ShareModal Component - Share conversation with team members (Google Docs style)
// =============================================================================

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (email: string, permission: string) => void;
  onCopyLink: () => void;
  shareLink: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, onShare, onCopyLink, shareLink }) => {
  const [email, setEmail] = useState('');
  const [emailPermission, setEmailPermission] = useState<'view' | 'edit'>('view');
  const [linkPermission, setLinkPermission] = useState<'anyone' | 'restricted'>('restricted');
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareLink);
    setShowCopied(true);
    onCopyLink();
    setTimeout(() => setShowCopied(false), 2000);
  }, [shareLink, onCopyLink]);

  const handleShare = useCallback(() => {
    if (email.trim()) {
      onShare(email, emailPermission);
      setEmail('');
      setEmailPermission('view');
    }
  }, [email, emailPermission, onShare]);

  const footerContent = (
    <div className={styles.shareModalFooter}>
      <Button kind="tertiary" size="medium" onClick={onClose}>
        Cancel
      </Button>
      <Button kind="primary" size="medium" onClick={handleShare} disabled={!email.trim()}>
        Share
      </Button>
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="medium"
      title="Share"
      footer={footerContent}
    >
      <div className={styles.shareModalContent}>
        {/* Link Sharing Section */}
        <div className={styles.shareModalSection}>
          <div className={styles.shareModalSectionHeader}>
            <Icon name="link" size="small" />
            <Text variant="label" weight="medium">Get link</Text>
          </div>

          <div className={styles.shareLinkRow}>
            <Input
              label="Share link"
              hideLabel
              value={shareLink}
              readOnly
              className={styles.shareLinkInput}
            />
            <Dropdown
              items={[
                {
                  label: 'Anyone with the link',
                  onClick: () => setLinkPermission('anyone'),
                  selected: linkPermission === 'anyone'
                },
                {
                  label: 'Restricted',
                  onClick: () => setLinkPermission('restricted'),
                  selected: linkPermission === 'restricted'
                },
              ]}
            >
              <Button kind="secondary" size="medium" endElement={<Icon name="chevron-down" size="small" />}>
                {linkPermission === 'anyone' ? 'Anyone with link' : 'Restricted'}
              </Button>
            </Dropdown>
          </div>

          <Button
            kind="secondary"
            size="medium"
            startElement={<Icon name="duplicate" size="small" />}
            onClick={handleCopyLink}
          >
            {showCopied ? 'Copied!' : 'Copy link'}
          </Button>
        </div>

        {/* Divider */}
        <hr className={styles.shareModalDivider} />

        {/* Email Invite Section */}
        <div className={styles.shareModalSection}>
          <div className={styles.shareModalSectionHeader}>
            <Icon name="envelope" size="small" />
            <Text variant="label" weight="medium">Invite people</Text>
          </div>

          <div className={styles.shareEmailRow}>
            <Input
              label="Email address"
              hideLabel
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className={styles.shareEmailInput}
            />
            <Dropdown
              items={[
                {
                  label: 'Can view',
                  onClick: () => setEmailPermission('view'),
                  selected: emailPermission === 'view'
                },
                {
                  label: 'Can edit',
                  onClick: () => setEmailPermission('edit'),
                  selected: emailPermission === 'edit'
                },
              ]}
            >
              <Button kind="secondary" size="medium" endElement={<Icon name="chevron-down" size="small" />}>
                {emailPermission === 'view' ? 'Can view' : 'Can edit'}
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// =============================================================================
// Toast Notification Component
// =============================================================================

interface ToastProps {
  isVisible: boolean;
  message: string;
  status: 'loading' | 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ isVisible, message, status }) => {
  return (
    <div className={`${styles.toast} ${isVisible ? styles.toastVisible : ''}`}>
      <span className={styles.toastIcon}>
        {status === 'loading' && (
          <span className={styles.toastIconLoading}>
            <Spinner size="small" />
          </span>
        )}
        {status === 'success' && (
          <span className={styles.toastIconSuccess}>
            <Icon name="status-check" size={20} />
          </span>
        )}
        {status === 'error' && (
          <span className={styles.toastIconError}>
            <Icon name="status-warn" size={20} />
          </span>
        )}
      </span>
      <span className={styles.toastMessage}>{message}</span>
    </div>
  );
};

// =============================================================================
// ExpandedPrompt Component - Shows detailed breakdown before running
// =============================================================================

interface ExpandedPromptProps {
  action: ExtendedSuggestedAction;
  onRun: () => void;
  onClose: () => void;
}

const ExpandedPrompt: React.FC<ExpandedPromptProps> = ({ action, onRun, onClose }) => {
  if (!action.expansion) return null;

  return (
    <div className={styles.expandedPrompt}>
      <div className={styles.expandedPromptHeader}>
        <div className={styles.expandedPromptTitle}>
          <Icon name={action.icon as any || 'bolt'} size={20} />
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

// =============================================================================
// AI Panel Component (uses AIChat pattern)
// =============================================================================

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  panelWidth: number;
  onWidthChange: (width: number) => void;
  onStartResize: () => void;
  onEndResize: () => void;
  isResizing: boolean;
  /** Number of agreements loaded in context */
  agreementCount?: number;
  /** Agreements loaded in context */
  agreements?: Agreement[];
}

const DEFAULT_PANEL_WIDTH = 360;
const MIN_PANEL_WIDTH = 360;
const MAX_PANEL_WIDTH = window.innerWidth;
const INLINE_HISTORY_THRESHOLD = 800;
const WIDE_PANEL_WIDTH_PERCENT = 0.4; // 40% of page width

const AIPanel: React.FC<AIPanelProps> = ({
  isOpen,
  onClose,
  userName = 'Akshat',
  panelWidth,
  onWidthChange,
  onStartResize,
  onEndResize,
  isResizing,
  agreementCount,
  agreements = [],
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>('1');
  const panelRef = useRef<HTMLDivElement>(null);

  // Attention animation for context source pill
  const [showContextAttention, setShowContextAttention] = useState(false);
  // Attention animation for input container (triggered on quick action click)
  const [showInputAttention, setShowInputAttention] = useState(false);
  const prevIsOpenRef = useRef(isOpen);

  // Trigger attention animation when panel opens with context loaded
  useEffect(() => {
    const wasJustOpened = isOpen && !prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (wasJustOpened && agreementCount && agreementCount > 0) {
      // Small delay to let the panel animate open first
      const timer = setTimeout(() => {
        setShowContextAttention(true);
        // Reset after animation completes
        const resetTimer = setTimeout(() => {
          setShowContextAttention(false);
        }, 1500);
        return () => clearTimeout(resetTimer);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, agreementCount]);

  // Rich message and document viewer state
  const [richMessages, setRichMessages] = useState<Map<string, RichMessageData>>(new Map());
  const [conflictMessages, setConflictMessages] = useState<Map<string, ConflictData[]>>(new Map());
  const [isDocumentCanvasOpen, setIsDocumentCanvasOpen] = useState(false);
  const [activeCitation, setActiveCitation] = useState<CitationData | null>(null);

  // Controlled input state for expanded prompts
  const [chatInputValue, setChatInputValue] = useState('');

  // Share modal and toast state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastState, setToastState] = useState<{ visible: boolean; message: string; status: 'loading' | 'success' | 'error' }>({
    visible: false,
    message: '',
    status: 'loading',
  });

  // "Go wide!" tooltip state - shows on first open to encourage resize discovery
  const [showResizeTooltip, setShowResizeTooltip] = useState(false);
  const hasShownTooltipRef = useRef(false);

  // Agreements sidebar state
  const [isAgreementsSidebarOpen, setIsAgreementsSidebarOpen] = useState(false);

  // Selected agreements state (lifted from AgreementsSidebar for count display)
  const [selectedAgreementIds, setSelectedAgreementIds] = useState<Set<string>>(
    () => new Set(agreements.map(a => a.id))
  );

  // Keep selected IDs in sync when agreements list changes
  useEffect(() => {
    setSelectedAgreementIds(new Set(agreements.map(a => a.id)));
  }, [agreements]);

  const useInlineHistory = panelWidth >= INLINE_HISTORY_THRESHOLD;

  // Generate full prompt text from quick action with readable formatting
  const generateExpandedPromptText = useCallback((action: ExtendedSuggestedAction): string => {
    if (!action.expansion) return action.label;

    // Join steps with double line breaks for readability
    // The steps already contain formatted content (ROLE:, TASK:, etc.)
    const formattedSteps = action.expansion.steps.join('\n\n');

    // Include action label marker at end for scripted response matching
    return `${formattedSteps}\n\n---\n[Action: ${action.label}]\n[Analyzing ${action.expansion.documentsToAnalyze} documents]`;
  }, []);

  // Narrow mode: canvas takes full width with back button
  const isNarrowMode = panelWidth < NARROW_BREAKPOINT;

  // Show tooltip after panel opens (with delay for smooth animation)
  // Only show when opening at narrow width
  useEffect(() => {
    if (isOpen && !hasShownTooltipRef.current && panelWidth <= DEFAULT_PANEL_WIDTH) {
      const timer = setTimeout(() => {
        setShowResizeTooltip(true);
        hasShownTooltipRef.current = true;

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          setShowResizeTooltip(false);
        }, 5000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, panelWidth]);

  const handleOpenShareModal = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  const handleCloseShareModal = useCallback(() => {
    setIsShareModalOpen(false);
  }, []);

  const handleShare = useCallback((email: string, permission: string) => {
    setIsShareModalOpen(false);

    // Show loading toast
    setToastState({ visible: true, message: 'Checking permissions...', status: 'loading' });

    // Simulate verification delay
    setTimeout(() => {
      setToastState({ visible: true, message: 'User verified. Invitation sent.', status: 'success' });

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setToastState((prev) => ({ ...prev, visible: false }));
      }, 3000);
    }, 1500);
  }, []);

  // Share link for the current conversation
  const shareLink = useMemo(() => {
    return `https://app.docusign.com/chat/${activeHistoryId || 'new'}`;
  }, [activeHistoryId]);

  // Quick copy link handler (for header button)
  const handleQuickCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareLink);
    setToastState({ visible: true, message: 'Link copied to clipboard', status: 'success' });
    setTimeout(() => setToastState((prev) => ({ ...prev, visible: false })), 2000);
  }, [shareLink]);

  // Copy link handler (for share modal - just logs for analytics)
  const handleCopyLinkFromModal = useCallback(() => {
    console.log('Link copied from share modal');
  }, []);

  // Agreements sidebar handlers
  const handleOpenAgreementsSidebar = useCallback(() => {
    // Close document canvas if open (mutual exclusivity)
    if (isDocumentCanvasOpen) {
      setIsDocumentCanvasOpen(false);
      setActiveCitation(null);
      setDocPreviewSource(null);
    }
    // Clear input to reset height
    setChatInputValue('');
    setIsAgreementsSidebarOpen(true);
    // Expand panel to show sidebar properly if too narrow
    if (panelWidth < 700) {
      onWidthChange(Math.max(panelWidth, 700));
    }
  }, [panelWidth, onWidthChange, isDocumentCanvasOpen]);

  const handleCloseAgreementsSidebar = useCallback(() => {
    setIsAgreementsSidebarOpen(false);
  }, []);

  // Track where doc preview was opened from (for state restoration on close)
  const [docPreviewSource, setDocPreviewSource] = useState<'sidebar' | 'citation' | null>(null);

  // Shared element transition state
  const [transitionState, setTransitionState] = useState<{
    isAnimating: boolean;
    sourceRect: DOMRect | null;
    agreement: Agreement | null;
  }>({ isAnimating: false, sourceRect: null, agreement: null });

  const handleAgreementClick = useCallback((agreement: Agreement, itemRect: DOMRect | null) => {
    // Create citation for the document
    const citation: CitationData = {
      id: `cit-${agreement.id}`,
      documentId: agreement.id,
      documentTitle: agreement.fileName,
      section: 'Section 1.1',
      excerpt: 'Agreement document preview',
    };

    // Mark that doc preview was opened from sidebar
    setDocPreviewSource('sidebar');

    // Set the citation for the document canvas
    setActiveCitation(citation);

    // If we have the source rect, play a subtle departure animation
    if (itemRect) {
      // Start the ghost departure animation
      setTransitionState({
        isAnimating: true,
        sourceRect: itemRect,
        agreement,
      });

      // End transition state after animation completes (250ms)
      setTimeout(() => {
        setTransitionState({ isAnimating: false, sourceRect: null, agreement: null });
      }, 250);
    }

    // Close sidebar and open doc canvas immediately - let CSS handle the animations
    setIsAgreementsSidebarOpen(false);
    setIsDocumentCanvasOpen(true);

    // Expand panel for smooth transition
    if (panelWidth < window.innerWidth - 50) {
      onWidthChange(window.innerWidth);
    }
  }, [panelWidth, onWidthChange]);

  const handleCitationClick = useCallback((citation: CitationData) => {
    // Close agreements sidebar if open (mutual exclusivity)
    if (isAgreementsSidebarOpen) {
      setIsAgreementsSidebarOpen(false);
    }
    // Mark that doc preview was opened from citation (not sidebar)
    setDocPreviewSource('citation');
    setActiveCitation(citation);
    setIsDocumentCanvasOpen(true);
    // Auto-expand to fullscreen if not already expanded (to show document canvas properly)
    if (panelWidth < window.innerWidth - 50) {
      onWidthChange(window.innerWidth);
    }
  }, [panelWidth, onWidthChange, isAgreementsSidebarOpen]);

  const handleCloseDocumentCanvas = useCallback(() => {
    setIsDocumentCanvasOpen(false);

    // If doc preview was opened from sidebar, reopen the sidebar
    if (docPreviewSource === 'sidebar') {
      setIsAgreementsSidebarOpen(true);
    }

    // Reset source tracker
    setDocPreviewSource(null);
  }, [docPreviewSource]);


  const handleSendMessage = useCallback((content: string, fromSuggestion = false) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      metadata: fromSuggestion ? { fromSuggestion: true } : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    // Check if this is a scripted prompt (rich message or conflict)
    // Match by exact key, content starting with key, OR action marker in expanded prompts
    const scriptedKey = Object.keys(SCRIPTED_RESPONSES).find(
      key => content === key || content.startsWith(`${key}:`) || content.includes(`[Action: ${key}]`)
    );
    const conflictKey = Object.keys(CONFLICT_RESPONSES).find(
      key => content === key || content.startsWith(`${key}:`) || content.includes(`[Action: ${key}]`)
    );

    // Debug logging - remove after testing
    console.log('=== Message Matching Debug ===');
    console.log('Content includes [Action: Summarize Prevailing Terms]:', content.includes('[Action: Summarize Prevailing Terms]'));
    console.log('Content includes [Action: Check for Conflicts]:', content.includes('[Action: Check for Conflicts]'));
    console.log('scriptedKey:', scriptedKey);
    console.log('conflictKey:', conflictKey);
    console.log('Content last 100 chars:', content.slice(-100));

    const scriptedResponse = scriptedKey ? SCRIPTED_RESPONSES[scriptedKey] : undefined;
    const conflictResponse = conflictKey ? CONFLICT_RESPONSES[conflictKey] : undefined;

    // Simulate initial thinking delay
    setTimeout(() => {
      const aiMessageId = `ai-${Date.now()}`;
      let responseText = `I understand you're asking about "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}". Let me analyze the 15 Acme agreements to provide you with accurate information.`;

      if (scriptedResponse) {
        responseText = `I've analyzed all 15 Acme agreements to identify the prevailing terms. Here's what I found:`;
      } else if (conflictResponse) {
        responseText = `I've cross-referenced all 15 Acme agreements to identify conflicting provisions. Here's what I found:`;
      }

      // Start with empty message for streaming effect
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);

      // Stream text word by word
      const words = responseText.split(' ');
      let currentIndex = 0;

      const streamInterval = setInterval(() => {
        if (currentIndex < words.length) {
          const partialText = words.slice(0, currentIndex + 1).join(' ');
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, content: partialText } : msg
            )
          );
          currentIndex++;
        } else {
          clearInterval(streamInterval);

          // After streaming completes, add rich message data if applicable
          if (scriptedResponse) {
            setRichMessages((prev) => new Map(prev).set(aiMessageId, scriptedResponse));
          }
          if (conflictResponse) {
            setConflictMessages((prev) => new Map(prev).set(aiMessageId, conflictResponse));
          }
        }
      }, 30); // 30ms per word for smooth streaming
    }, 800); // Reduced initial delay since streaming adds perceived time
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    // Find if this is an action with expansion details
    const action = QUICK_ACTIONS.find(a => a.label === suggestion);
    if (action?.expansion) {
      // Populate input field with expanded prompt for user to edit before submitting
      const expandedText = generateExpandedPromptText(action);
      setChatInputValue(expandedText);
      // Trigger ripple animation on input to draw attention
      setShowInputAttention(true);
      setTimeout(() => setShowInputAttention(false), 700);
    } else {
      // Send message directly for questions without expansion (mark as from suggestion)
      handleSendMessage(suggestion, true);
    }
  }, [handleSendMessage, generateExpandedPromptText]);


  // Custom message renderer for rich messages and conflicts
  const renderMessage = useCallback((message: ChatMessage) => {
    const richData = richMessages.get(message.id);
    const conflictData = conflictMessages.get(message.id);

    if (message.role === 'assistant') {
      // Feedback buttons component for AI responses
      const feedbackButtons = (
        <div className={styles.messageFeedback}>
          <Tooltip content="Good response">
            <IconButton
              icon="thumbs-up"
              size="small"
              variant="tertiary"
              aria-label="Good response"
            />
          </Tooltip>
          <Tooltip content="Bad response">
            <IconButton
              icon="thumbs-down"
              size="small"
              variant="tertiary"
              aria-label="Bad response"
            />
          </Tooltip>
          <Tooltip content="Copy">
            <IconButton
              icon="duplicate"
              size="small"
              variant="tertiary"
              aria-label="Copy response"
            />
          </Tooltip>
        </div>
      );

      // Render rich message (e.g., Prevailing Terms Analysis)
      if (richData) {
        return (
          <div className={styles.richMessageWrapper}>
            <p className={styles.richMessageIntro}>{message.content}</p>
            <RichMessage data={richData} onCitationClick={handleCitationClick} />
            {feedbackButtons}
          </div>
        );
      }

      // Render conflict view (side-by-side comparison)
      if (conflictData) {
        return (
          <div className={styles.richMessageWrapper}>
            <p className={styles.richMessageIntro}>{message.content}</p>
            <ConflictView conflicts={conflictData} onCitationClick={handleCitationClick} />
            {feedbackButtons}
          </div>
        );
      }
    }

    // Render user message from suggestion with special "Selected" styling
    if (message.role === 'user' && message.metadata?.fromSuggestion) {
      return (
        <div className={styles.selectedMessage}>
          <span className={styles.selectedLabel}>Selected</span>
          <div className={styles.selectedBubble}>
            <Icon name="status-check" size={16} />
            <span>{message.content}</span>
          </div>
        </div>
      );
    }

    return null; // Return null to use default rendering
  }, [richMessages, conflictMessages, handleCitationClick]);

  // Handle drag resize
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onStartResize();

    // Dismiss the "Go wide!" tooltip when user starts dragging
    setShowResizeTooltip(false);

    const startX = e.clientX;
    const startWidth = panelWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const newWidth = Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, startWidth + deltaX));
      onWidthChange(newWidth);
    };

    const handleMouseUp = () => {
      onEndResize();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [panelWidth, onWidthChange, onStartResize, onEndResize]);

  const handleToggleExpand = useCallback(() => {
    if (panelWidth >= window.innerWidth - 50) {
      onWidthChange(MIN_PANEL_WIDTH);
    } else {
      onWidthChange(window.innerWidth);
    }
  }, [panelWidth, onWidthChange]);

  const handleToggleHistory = useCallback(() => {
    setIsHistoryOpen((prev) => !prev);
  }, []);

  const handleNewChat = useCallback(() => {
    // Clear current conversation and start fresh
    setMessages([]);
    setRichMessages(new Map());
    setConflictMessages(new Map());
    setActiveHistoryId(null);
    setIsDocumentCanvasOpen(false);
    setActiveCitation(null);
    setExpandedAction(null);
  }, []);

  const handleHistoryItemClick = useCallback((id: string) => {
    setActiveHistoryId(id);

    // Load stored conversation for this history item
    const storedMessages = STORED_CONVERSATIONS[id];
    if (storedMessages) {
      setMessages(storedMessages);
      // Clear rich messages and conflicts when switching conversations
      setRichMessages(new Map());
      setConflictMessages(new Map());
    }

    if (!useInlineHistory) {
      setIsHistoryOpen(false);
    }
  }, [useInlineHistory]);

  const isExpanded = panelWidth > 600;

  const panelClasses = [
    styles.aiPanel,
    isOpen ? styles.aiPanelOpen : '',
    isResizing ? styles.aiPanelResizing : '',
    isExpanded ? styles.aiPanelExpanded : '',
  ].filter(Boolean).join(' ');

  const contentWrapperClasses = [
    styles.aiChatContentWrapper,
    !isExpanded ? styles.aiChatContentWrapperNarrow : '',
  ].filter(Boolean).join(' ');

  const historyPanelClasses = useInlineHistory
    ? [
        styles.historyPanel,
        styles.historyPanelInline,
        !isHistoryOpen ? styles.historyPanelInlineHidden : '',
      ].filter(Boolean).join(' ')
    : [
        styles.historyPanel,
        isHistoryOpen ? styles.historyPanelOpen : '',
      ].filter(Boolean).join(' ');

  const historyOverlayClasses = [
    styles.historyOverlay,
    !useInlineHistory && isHistoryOpen ? styles.historyOverlayVisible : '',
  ].filter(Boolean).join(' ');

  const renderHistoryContent = () => (
    <>
      <div className={styles.historyHeader}>
        <h3 className={styles.historyTitle}>Chat History</h3>
        <IconButton
          icon="close"
          size="small"
          kind="tertiary"
          onClick={() => setIsHistoryOpen(false)}
          aria-label="Close history"
        />
      </div>
      <div className={styles.historyList}>
        <div className={styles.historyGroup}>
          <div className={styles.historyGroupLabel}>Today</div>
          {CHAT_HISTORY.today.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.historyItem} ${activeHistoryId === item.id ? styles.historyItemActive : ''}`}
              onClick={() => handleHistoryItemClick(item.id)}
            >
              <span className={styles.historyItemIcon}>
                <Icon name="comment" size={16} />
              </span>
              <div className={styles.historyItemContent}>
                <p className={styles.historyItemTitle}>{item.title}</p>
                <span className={styles.historyItemMeta}>
                  {item.time} · {item.messages} messages
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.historyGroup}>
          <div className={styles.historyGroupLabel}>Yesterday</div>
          {CHAT_HISTORY.yesterday.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.historyItem} ${activeHistoryId === item.id ? styles.historyItemActive : ''}`}
              onClick={() => handleHistoryItemClick(item.id)}
            >
              <span className={styles.historyItemIcon}>
                <Icon name="comment" size={16} />
              </span>
              <div className={styles.historyItemContent}>
                <p className={styles.historyItemTitle}>{item.title}</p>
                <span className={styles.historyItemMeta}>
                  {item.time} · {item.messages} messages
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.historyGroup}>
          <div className={styles.historyGroupLabel}>Last 7 Days</div>
          {CHAT_HISTORY.lastWeek.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.historyItem} ${activeHistoryId === item.id ? styles.historyItemActive : ''}`}
              onClick={() => handleHistoryItemClick(item.id)}
            >
              <span className={styles.historyItemIcon}>
                <Icon name="comment" size={16} />
              </span>
              <div className={styles.historyItemContent}>
                <p className={styles.historyItemTitle}>{item.title}</p>
                <span className={styles.historyItemMeta}>
                  {item.time} · {item.messages} messages
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div
      ref={panelRef}
      className={panelClasses}
      style={{ width: isOpen ? panelWidth : 0 }}
    >
      {isOpen && (
        <div
          className={styles.dragHandle}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.dragHandleBar} />

          {/* "Go wide!" discoverability tooltip */}
          {showResizeTooltip && (
            <div className={styles.resizeTooltip}>
              <div className={styles.resizeTooltipContent}>
                <Icon name="arrow-left" size={14} />
                <span>Go wide!</span>
              </div>
              <button
                type="button"
                className={styles.resizeTooltipDismiss}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowResizeTooltip(false);
                }}
                aria-label="Dismiss tooltip"
              >
                <Icon name="close" size={12} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Shared Header - spans full width */}
      <div className={styles.sharedHeader}>
        <div className={styles.sharedHeaderLeft}>
          <Tooltip content="History">
            <IconButton
              icon="menu"
              size="small"
              kind="tertiary"
              onClick={handleToggleHistory}
              aria-label="Show history"
            />
          </Tooltip>
        </div>
        {messages.length > 0 && (
          <div className={styles.sharedHeaderCenter}>
            <h2 className={styles.sharedHeaderTitle}>Acme Renewal Prep</h2>
          </div>
        )}
        <div className={styles.sharedHeaderRight}>
          <Tooltip content="Share">
            <IconButton
              icon="share-web"
              size="small"
              kind="tertiary"
              onClick={handleOpenShareModal}
              aria-label="Share"
            />
          </Tooltip>
          <Tooltip content="New chat">
            <IconButton
              icon="plus"
              size="small"
              kind="tertiary"
              onClick={handleNewChat}
              aria-label="New chat"
            />
          </Tooltip>
          <Tooltip content="Maximize">
            <IconButton
              icon="container-enlarge"
              size="small"
              kind="tertiary"
              onClick={handleToggleExpand}
              aria-label="Maximize"
            />
          </Tooltip>
          <Tooltip content="Close">
            <IconButton
              icon="close"
              size="small"
              kind="tertiary"
              onClick={onClose}
              aria-label="Close"
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles.aiPanelLayout}>
        {useInlineHistory && (
          <div className={historyPanelClasses}>
            {renderHistoryContent()}
          </div>
        )}

        <div className={`${styles.aiPanelContent} ${isNarrowMode && isDocumentCanvasOpen ? styles.aiPanelContentHidden : ''}`}>
          {!useInlineHistory && (
            <>
              <div
                className={historyOverlayClasses}
                onClick={() => setIsHistoryOpen(false)}
              />
              <div className={historyPanelClasses}>
                {renderHistoryContent()}
              </div>
            </>
          )}

          <div className={contentWrapperClasses}>
            <AIChat
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              userName={userName}
              assistantName="Docusign AI"
              welcomeTitle="What would you like to know?"
              suggestedActions={QUICK_ACTIONS}
              suggestedQuestions={SUGGESTED_QUESTIONS}
              onSuggestionClick={handleSuggestionClick}
              placeholder="Ask anything about selected agreements..."
              showHeader={false}
              onClose={onClose}
              onShowHistory={handleToggleHistory}
              onNewChat={handleNewChat}
              onMaximize={handleToggleExpand}
              maxHeight="100%"
              className={styles.aiChatContainer}
              renderMessage={renderMessage}
              contextSource={agreements.length > 0 ? {
                count: selectedAgreementIds.size,
                label: 'agreements',
                onClick: handleOpenAgreementsSidebar,
              } : undefined}
              showContextAttention={showContextAttention}
              showInputAttention={showInputAttention}
              inputValue={chatInputValue}
              onInputChange={setChatInputValue}
            />

          </div>
        </div>

        {/* Agreements Sidebar - Shows loaded agreements in context */}
        <AgreementsSidebar
          isOpen={isAgreementsSidebarOpen}
          onClose={handleCloseAgreementsSidebar}
          agreements={agreements}
          onAgreementClick={handleAgreementClick}
          selectedIds={selectedAgreementIds}
          onSelectionChange={setSelectedAgreementIds}
        />

        {/* Document Canvas - Gemini-style split view when citation clicked */}
        <DocumentCanvas
          isOpen={isDocumentCanvasOpen}
          citation={activeCitation}
          onClose={handleCloseDocumentCanvas}
          isNarrowMode={isNarrowMode}
        />
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        onShare={handleShare}
        onCopyLink={handleCopyLinkFromModal}
        shareLink={shareLink}
      />

      {/* Toast Notification */}
      <Toast
        isVisible={toastState.visible}
        message={toastState.message}
        status={toastState.status}
      />

      {/* Shared Element Transition Ghost */}
      {transitionState.isAnimating && transitionState.sourceRect && transitionState.agreement && (
        <div
          className={styles.transitionGhost}
          style={{
            '--source-top': `${transitionState.sourceRect.top}px`,
            '--source-left': `${transitionState.sourceRect.left}px`,
            '--source-width': `${transitionState.sourceRect.width}px`,
            '--source-height': `${transitionState.sourceRect.height}px`,
          } as React.CSSProperties}
        >
          <div className={styles.transitionGhostContent}>
            <Icon name="document" size={18} />
            <span>{transitionState.agreement.fileName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export function AgreementStudio() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending' | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSizeOption>(25);
  const [searchValue, setSearchValue] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState(''); // Only updates on Enter/submit
  const [isSearchTransitioning, setIsSearchTransitioning] = useState(false);
  const [isNavLocked, setIsNavLocked] = useState(true);
  const [prevNavLocked, setPrevNavLocked] = useState(true);

  useEffect(() => {
    if (isAIChatOpen) {
      setPrevNavLocked(isNavLocked);
      setIsNavLocked(false);
    } else {
      setIsNavLocked(prevNavLocked);
    }
  }, [isAIChatOpen]);

  const globalNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'agreements', label: 'Agreements', active: true },
    { id: 'templates', label: 'Templates' },
    { id: 'reports', label: 'Reports' },
    { id: 'admin', label: 'Admin' },
  ];

  const localNavSections = [
    {
      id: 'main',
      items: [
        { id: 'all-agreements', label: 'All Agreements', icon: 'envelope' as const },
        { id: 'drafts', label: 'Drafts', nested: true },
        { id: 'in-progress', label: 'In Progress', nested: true },
        { id: 'completed', label: 'Completed', nested: true, active: true },
        { id: 'deleted', label: 'Deleted', nested: true },
      ],
    },
    {
      id: 'folders',
      items: [
        { id: 'folders', label: 'Folders', icon: 'folder' as const, hasMenu: true },
      ],
    },
    {
      id: 'features',
      hasDivider: true,
      items: [
        { id: 'parties', label: 'Parties', icon: 'building-person' as const, badge: 'New' },
        { id: 'requests', label: 'Requests', icon: 'ticket' as const, badge: 'New' },
        { id: 'maestro-workflows', label: 'Maestro Workflows', icon: 'workflow' as const, badge: 'New' },
        { id: 'workspaces', label: 'Workspaces', icon: 'transaction' as const },
        { id: 'powerforms', label: 'PowerForms', icon: 'flash' as const },
        { id: 'bulk-send', label: 'Bulk Send', icon: 'document-stack' as const },
      ],
    },
  ];

  // Handle search submission (Enter key) with page transition effect
  const handleSearchSubmit = useCallback(() => {
    const trimmedSearch = searchValue.trim();
    if (trimmedSearch === submittedSearch) return; // No change, skip transition

    // Start transition - fade out
    setIsSearchTransitioning(true);

    // After fade out, update search and fade back in
    setTimeout(() => {
      setSubmittedSearch(trimmedSearch);
      setPage(1); // Reset to first page on new search
      setShowBanner(true); // Show banner for new search results

      // Fade back in
      setTimeout(() => {
        setIsSearchTransitioning(false);
      }, 50);
    }, 200);
  }, [searchValue, submittedSearch]);

  // Filter agreements based on submitted search (not live typing)
  const filteredAgreements = useMemo(() => {
    if (!submittedSearch) {
      return ALL_AGREEMENTS;
    }
    const searchLower = submittedSearch.toLowerCase();
    return ALL_AGREEMENTS.filter(
      (agreement) =>
        agreement.fileName.toLowerCase().includes(searchLower) ||
        agreement.parties.some((party) => party.toLowerCase().includes(searchLower)) ||
        agreement.agreementType.toLowerCase().includes(searchLower)
    );
  }, [submittedSearch]);

  // Check if we're showing Acme search results
  const isAcmeSearch = submittedSearch.toLowerCase().includes('acme') && filteredAgreements.length > 0;
  const acmeAgreementCount = filteredAgreements.filter(a => a.fileName.toLowerCase().includes('acme')).length;

  const columns: DataTableColumn<Agreement>[] = useMemo(
    () => [
      {
        key: 'aiAssisted',
        header: '',
        width: '40px',
        sticky: true,
        cell: (row) =>
          row.isAIAssisted ? (
            <span className={dataTableStyles.aiSparkle}>
              <AIIcon name="ai-spark-filled" size={14} />
            </span>
          ) : null,
      },
      {
        key: 'fileName',
        header: 'File Name',
        sortable: true,
        width: '300px',
        sticky: true,
        className: dataTableStyles.columnBorderRight,
        cell: (row) => (
          <div className={dataTableStyles.cellContent}>
            <Link discrete size="small" href="#" className={dataTableStyles.cellPrimary}>
              {row.fileName}
            </Link>
            <span className={dataTableStyles.cellSecondary}>
              {row.fileStatus === 'uploaded' ? '↑' : '✓'}{' '}
              {row.fileStatusDetail}
            </span>
          </div>
        ),
      },
      {
        key: 'parties',
        header: 'Parties',
        width: '200px',
        cell: (row) => (
          <div className={dataTableStyles.cellContent}>
            {row.parties.length > 0 ? (
              row.parties.map((party, i) => (
                <span key={i} className={dataTableStyles.partyChip}>
                  <a href="#" className={dataTableStyles.partyLink}>
                    {party}
                  </a>
                </span>
              ))
            ) : (
              <span className={dataTableStyles.cellSecondary}>—</span>
            )}
          </div>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        width: '120px',
        cell: (row) => (
          <div className={dataTableStyles.statusCell}>
            <span className={dataTableStyles.statusDot} data-status={row.status} />
            <div className={dataTableStyles.statusText}>
              <span className={dataTableStyles.statusLabel}>
                {capitalize(row.status)}
              </span>
              {row.statusDate && (
                <span className={dataTableStyles.statusDate}>{row.statusDate}</span>
              )}
            </div>
          </div>
        ),
      },
      {
        key: 'agreementType',
        header: 'Agreement Type',
        sortable: true,
        width: '140px',
      },
      {
        key: 'contractValue',
        header: 'Contract Value',
        sortable: true,
        width: '160px',
        alignment: 'right',
        cell: (row) => row.contractValue || '—',
      },
      {
        key: 'effectiveDate',
        header: 'Effective Date',
        sortable: true,
        width: '130px',
        cell: (row) => row.effectiveDate || '—',
      },
      {
        key: 'expirationDate',
        header: 'Expiration Date',
        sortable: true,
        width: '140px',
        cell: (row) => row.expirationDate || '—',
      },
      {
        key: 'agreementId',
        header: 'Agreement ID',
        width: '140px',
        cell: (row) => <span className={dataTableStyles.agreementId}>{row.agreementId}</span>,
      },
    ],
    []
  );

  const renderRowActions = useCallback(
    () => (
      <IconButton
        icon="more-vertical"
        variant="tertiary"
        size="medium"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Row action menu');
        }}
      />
    ),
    []
  );

  const selectionActions: DataTableAction[] = useMemo(
    () => [
      {
        id: 'download',
        label: 'Download',
        icon: 'download',
        onClick: (rows) => console.log('Download:', rows),
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'trash',
        variant: 'danger',
        onClick: (rows) => console.log('Delete:', rows),
      },
    ],
    []
  );

  const pagination: DataTablePaginationConfig = useMemo(
    () => ({
      page,
      pageSize,
      totalItems: 15,
      onPageChange: setPage,
      onPageSizeChange: (size) => {
        setPageSize(size);
        setPage(1);
      },
      showInfo: true,
    }),
    [page, pageSize]
  );

  const handleSortChange = useCallback(
    (column: string, direction: 'ascending' | 'descending' | null) => {
      setSortColumn(direction ? column : undefined);
      setSortDirection(direction);
    },
    []
  );

  const handleOpenAIChat = useCallback(() => {
    setIsAIChatOpen(true);
    // Open to 40% of page width by default for a more spacious feel
    const wideWidth = Math.floor(window.innerWidth * WIDE_PANEL_WIDTH_PERCENT);
    setPanelWidth(wideWidth);
  }, []);

  const handleCloseAIChat = useCallback(() => {
    setIsAIChatOpen(false);
    setPanelWidth(DEFAULT_PANEL_WIDTH);
  }, []);

  const handleWidthChange = useCallback((newWidth: number) => {
    setPanelWidth(newWidth);
  }, []);

  const handleStartResize = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleEndResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const pageHeaderActions = (
    <>
      <ComboButton
        variant="secondary"
        size="medium"
        startIcon="plus"
        onClick={() => console.log('New agreement')}
        onDropdownClick={() => console.log('New dropdown')}
      >
        New
      </ComboButton>
      <ComboButton
        variant="tertiary"
        size="medium"
        startIcon="settings"
        onClick={() => console.log('Settings')}
        onDropdownClick={() => console.log('Settings dropdown')}
      />
    </>
  );

  const [selectedView, setSelectedView] = useState<'documents' | 'envelopes'>('documents');

  const viewSelectorItems = [
    {
      label: 'Documents',
      description: 'Analyze agreement data with AI',
      icon: <Icon name="document" size="medium" />,
      selected: selectedView === 'documents',
      onClick: () => setSelectedView('documents'),
    },
    {
      label: 'Envelopes',
      description: 'View signatures and activity',
      icon: <Icon name="envelope" size="medium" />,
      selected: selectedView === 'envelopes',
      onClick: () => setSelectedView('envelopes'),
    },
  ];

  const mainContentStyle = isAIChatOpen
    ? { width: `calc(100% - ${panelWidth}px)`, transition: isResizing ? 'none' : 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)' }
    : {};

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.mainContent} style={mainContentStyle}>
        <DocuSignShell
          globalNav={{
            logo: <DocuSignLogo />,
            navItems: globalNavItems,
            showSearch: true,
            searchVariant: 'pill',
            showSettings: true,
            settingsIcon: 'settings',
            user: { name: 'Akshat Mishra' },
          }}
          localNav={{
            headerLabel: 'Start',
            headerIcon: 'plus',
            sections: localNavSections,
            activeItemId: 'completed',
            allowCollapsibility: true,
            isLocked: isNavLocked,
            onLockChange: setIsNavLocked,
          }}
        >
          <div className={`${styles.pageContent} ${isSearchTransitioning ? styles.pageContentTransitioning : ''}`}>
          <AgreementTableView
            pageHeader={
              <PageHeader
                title={submittedSearch ? 'Search Results' : 'Completed'}
                showAIBadge
                aiBadgeText="AI-Assisted"
                actions={pageHeaderActions}
              />
            }
            banner={
              showBanner ? (
                isAcmeSearch ? (
                  // Banner for Acme search results - CTA to chat
                  <Banner
                    kind="promo"
                    customIcon={<IrisIcon />}
                    closable
                    onClose={() => setShowBanner(false)}
                    action={{
                      label: `Chat with ${acmeAgreementCount} agreements`,
                      onClick: handleOpenAIChat,
                    }}
                  >
                    <strong>{acmeAgreementCount} Acme agreements</strong> found. Use AI to analyze terms, find conflicts, and summarize key provisions.
                  </Banner>
                ) : !submittedSearch ? (
                  // Default banner - renewal notice
                  <Banner
                    kind="promo"
                    customIcon={<IrisIcon />}
                    closable
                    onClose={() => setShowBanner(false)}
                    action={{
                      label: 'View renewing contracts',
                      href: '#',
                      onClick: () => console.log('View renewing'),
                    }}
                  >
                    <strong>10 agreements</strong> with renewal notice dates in the next 30 days.
                  </Banner>
                ) : undefined
              ) : undefined
            }
            filterBar={
              <FilterBar
                viewSelector={
                  <Dropdown items={viewSelectorItems} header="Select a view" iconStyle="boxed">
                    <Button
                      kind="secondary"
                      size="small"
                      endElement={<Icon name="chevron-down" size="small" />}
                    >
                      {selectedView === 'documents' ? 'Documents' : 'Envelopes'}
                    </Button>
                  </Dropdown>
                }
                search={{
                  value: searchValue,
                  onChange: setSearchValue,
                  onSubmit: handleSearchSubmit,
                  placeholder: 'Search agreements...',
                }}
                showSearchIndicator
                quickActions={[
                  <IconButton key="bookmark" icon="bookmark" variant="secondary" size="small" />,
                ]}
                filters={
                  <Button
                    kind="secondary"
                    size="small"
                    startElement={<Icon name="filter" size="small" />}
                  >
                    Filters
                  </Button>
                }
              />
            }
          >
            <DataTable
              columns={columns}
              data={filteredAgreements}
              getRowKey={(row) => row.id}
              selectable
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
              selectionActions={selectionActions}
              pagination={pagination}
              showColumnControl
              renderRowActions={renderRowActions}
              rowHeight="tall"
              stickyHeader
              stickyFooter
            />
          </AgreementTableView>
          </div>
        </DocuSignShell>

        {!isAIChatOpen && isAcmeSearch && (
          <FloatingCTA onClick={handleOpenAIChat} agreementCount={acmeAgreementCount} searchTerm="Acme" />
        )}
      </div>

      <AIPanel
        isOpen={isAIChatOpen}
        onClose={handleCloseAIChat}
        userName="Akshat"
        panelWidth={panelWidth}
        onWidthChange={handleWidthChange}
        onStartResize={handleStartResize}
        onEndResize={handleEndResize}
        isResizing={isResizing}
        agreementCount={isAcmeSearch ? acmeAgreementCount : undefined}
        agreements={isAcmeSearch ? filteredAgreements.filter(a => a.fileName.toLowerCase().includes('acme')) : []}
      />
    </div>
  );
}

// =============================================================================
// Helpers
// =============================================================================

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default AgreementStudio;
