/**
 * AgreementStudio Prototype - French Localization
 *
 * French version of the AI-powered contract analysis demo - "Préparation Renouvellement Acme".
 * Features:
 * - Rich categorized AI responses (Finances, Risques, Modifications Clés)
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
  Link,
  Modal,
  Input,
  Spinner,
  Tooltip,
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
} from './agreement-studio-data-fr';

// =============================================================================
// NOTE: Types extracted to ./agreement-studio-types.ts
// NOTE: Mock data (French) extracted to ./agreement-studio-data-fr.ts
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
      Discuter avec {agreementCount} contrats {searchTerm}
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
            aria-label="Plus d'options"
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
          startElement={<Icon name="check" size={16} />}
        >
          Continuer
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
              aria-label="Retour au chat"
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
          <Tooltip content="Ouvrir dans Navigator">
            <IconButton icon="external-link" size="small" kind="tertiary" aria-label="Ouvrir dans Navigator" />
          </Tooltip>
          <IconButton icon="close" size="small" kind="tertiary" onClick={onClose} aria-label="Fermer" />
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
                  <span className={styles.canvasCompanyAddress}>123 Parc d'Affaires, Bureau 400</span>
                  <span className={styles.canvasCompanyAddress}>Paris, France 75008</span>
                </div>
              </div>
              <div className={styles.canvasDocType}>
                {citation?.documentTitle?.includes('CSP') ? 'CONTRAT DE SERVICES PRINCIPAL' :
                 citation?.documentTitle?.includes('Bon de Commande') ? 'BON DE COMMANDE' :
                 citation?.documentTitle?.includes('EDT') ? 'ÉNONCÉ DE TRAVAIL' :
                 citation?.documentTitle?.includes('Avenant') ? 'AVENANT' : 'CONTRAT'}
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
                  Aller à la citation (page {pageData?.pageNumber})
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
        <h3 className={styles.conflictViewTitle}>CONFLITS DÉTECTÉS</h3>
        <span className={styles.conflictViewCount}>{conflicts.length} trouvé(s)</span>
        <div className={styles.conflictViewHeaderActions}>
          <IconButton
            icon="overflow-horizontal"
            size="small"
            variant="tertiary"
            aria-label="Plus d'options"
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
              <span className={styles.conflictRecommendationLabel}>Recommandation :</span>
              <span className={styles.conflictRecommendationText}>
                {conflict.recommendation}
                {conflict.recommendationCitation && (
                  <button
                    type="button"
                    className={styles.citation}
                    onClick={() => onCitationClick(conflict.recommendationCitation!)}
                  >
                    [Voir Source]
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
          startElement={<Icon name="check" size={16} />}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

// =============================================================================
// ShareModal Component - Share conversation with team members
// =============================================================================

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (email: string, permission: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, onShare }) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('view');

  const handleShare = useCallback(() => {
    if (email.trim()) {
      onShare(email, permission);
      setEmail('');
      setPermission('view');
    }
  }, [email, permission, onShare]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <div className={styles.shareModal}>
        <h2 className={styles.shareModalTitle}>Partager la Conversation</h2>

        <div className={styles.shareModalField}>
          <label className={styles.shareModalLabel}>Adresse e-mail</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="collegue@entreprise.com"
          />
        </div>

        <div className={styles.shareModalField}>
          <label className={styles.shareModalLabel}>Niveau d'autorisation</label>
          <Dropdown
            items={[
              { label: 'Peut voir', onClick: () => setPermission('view'), selected: permission === 'view' },
              { label: 'Peut modifier', onClick: () => setPermission('edit'), selected: permission === 'edit' },
            ]}
          >
            <Button
              kind="secondary"
              size="small"
              endElement={<Icon name="chevron-down" size="small" />}
            >
              {permission === 'view' ? 'Peut voir' : 'Peut modifier'}
            </Button>
          </Dropdown>
        </div>

        <div className={styles.shareModalActions}>
          <Button kind="tertiary" size="small" onClick={onClose}>
            Annuler
          </Button>
          <Button kind="primary" size="small" onClick={handleShare} disabled={!email.trim()}>
            Partager
          </Button>
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
          aria-label="Fermer"
        />
      </div>
      <div className={styles.expandedPromptContent}>
        <p className={styles.expandedPromptLabel}>Cette analyse va :</p>
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
          Lancer l'analyse
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
}

const DEFAULT_PANEL_WIDTH = 360;
const MIN_PANEL_WIDTH = 360;
const MAX_PANEL_WIDTH = window.innerWidth;
const INLINE_HISTORY_THRESHOLD = 800;
const WIDE_PANEL_WIDTH_PERCENT = 0.4; // 40% of page width

const AIPanel: React.FC<AIPanelProps> = ({
  isOpen,
  onClose,
  userName = 'Utilisateur',
  panelWidth,
  onWidthChange,
  onStartResize,
  onEndResize,
  isResizing,
  agreementCount,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>('1');
  const panelRef = useRef<HTMLDivElement>(null);

  // Attention animation for context source pill
  const [showContextAttention, setShowContextAttention] = useState(false);
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

  // Expanded prompt state
  const [expandedAction, setExpandedAction] = useState<ExtendedSuggestedAction | null>(null);

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

  const useInlineHistory = panelWidth >= INLINE_HISTORY_THRESHOLD;

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
    setToastState({ visible: true, message: 'Vérification des autorisations...', status: 'loading' });

    // Simulate verification delay
    setTimeout(() => {
      setToastState({ visible: true, message: 'Utilisateur vérifié. Invitation envoyée.', status: 'success' });

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setToastState((prev) => ({ ...prev, visible: false }));
      }, 3000);
    }, 1500);
  }, []);

  const handleCitationClick = useCallback((citation: CitationData) => {
    setActiveCitation(citation);
    setIsDocumentCanvasOpen(true);
    // Auto-expand to fullscreen if not already expanded (to show document canvas properly)
    if (panelWidth < window.innerWidth - 50) {
      onWidthChange(window.innerWidth);
    }
  }, [panelWidth, onWidthChange]);

  const handleCloseDocumentCanvas = useCallback(() => {
    setIsDocumentCanvasOpen(false);
  }, []);

  const handleCloseExpandedPrompt = useCallback(() => {
    setExpandedAction(null);
  }, []);

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
    const scriptedResponse = SCRIPTED_RESPONSES[content];
    const conflictResponse = CONFLICT_RESPONSES[content];

    setTimeout(() => {
      const aiMessageId = `ai-${Date.now()}`;
      let responseText = `Je comprends que vous posez une question sur "${content}". Permettez-moi d'analyser les 15 contrats Acme pour vous fournir des informations précises.`;

      if (scriptedResponse) {
        responseText = `J'ai analysé les 15 contrats Acme pour identifier les termes en vigueur. Voici ce que j'ai trouvé :`;
      } else if (conflictResponse) {
        responseText = `J'ai recoupé les 15 contrats Acme pour identifier les dispositions contradictoires. Voici ce que j'ai trouvé :`;
      }

      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // If scripted response, add it to the rich messages map
      if (scriptedResponse) {
        setRichMessages((prev) => new Map(prev).set(aiMessageId, scriptedResponse));
      }

      // If conflict response, add it to the conflict messages map
      if (conflictResponse) {
        setConflictMessages((prev) => new Map(prev).set(aiMessageId, conflictResponse));
      }

      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    // Find if this is an action with expansion details
    const action = QUICK_ACTIONS.find(a => a.label === suggestion);
    if (action?.expansion) {
      // Show expanded prompt card
      setExpandedAction(action);
    } else {
      // Send message directly for questions without expansion (mark as from suggestion)
      handleSendMessage(suggestion, true);
    }
  }, [handleSendMessage]);

  const handleRunExpandedPrompt = useCallback(() => {
    if (expandedAction) {
      handleSendMessage(expandedAction.label, true);
      setExpandedAction(null);
    }
  }, [expandedAction, handleSendMessage]);

  // Custom message renderer for rich messages and conflicts
  const renderMessage = useCallback((message: ChatMessage) => {
    const richData = richMessages.get(message.id);
    const conflictData = conflictMessages.get(message.id);

    if (message.role === 'assistant') {
      // Feedback buttons component for AI responses
      const feedbackButtons = (
        <div className={styles.messageFeedback}>
          <Tooltip content="Bonne réponse">
            <IconButton
              icon="thumbs-up"
              size="small"
              variant="tertiary"
              aria-label="Bonne réponse"
            />
          </Tooltip>
          <Tooltip content="Mauvaise réponse">
            <IconButton
              icon="thumbs-down"
              size="small"
              variant="tertiary"
              aria-label="Mauvaise réponse"
            />
          </Tooltip>
          <Tooltip content="Copier">
            <IconButton
              icon="duplicate"
              size="small"
              variant="tertiary"
              aria-label="Copier la réponse"
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
          <span className={styles.selectedLabel}>Sélectionné</span>
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
        <h3 className={styles.historyTitle}>Historique des Conversations</h3>
        <IconButton
          icon="close"
          size="small"
          kind="tertiary"
          onClick={() => setIsHistoryOpen(false)}
          aria-label="Fermer l'historique"
        />
      </div>
      <div className={styles.historyList}>
        <div className={styles.historyGroup}>
          <div className={styles.historyGroupLabel}>Aujourd'hui</div>
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
          <div className={styles.historyGroupLabel}>Hier</div>
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
          <div className={styles.historyGroupLabel}>7 Derniers Jours</div>
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
                <span>Agrandir !</span>
              </div>
              <button
                type="button"
                className={styles.resizeTooltipDismiss}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowResizeTooltip(false);
                }}
                aria-label="Fermer l'info-bulle"
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
          <Tooltip content="Historique">
            <IconButton
              icon="menu"
              size="small"
              kind="tertiary"
              onClick={handleToggleHistory}
              aria-label="Afficher l'historique"
            />
          </Tooltip>
        </div>
        {messages.length > 0 && (
          <div className={styles.sharedHeaderCenter}>
            <h2 className={styles.sharedHeaderTitle}>Préparation Renouvellement Acme</h2>
          </div>
        )}
        <div className={styles.sharedHeaderRight}>
          <Tooltip content="Partager">
            <IconButton
              icon="share-desktop"
              size="small"
              kind="tertiary"
              onClick={handleOpenShareModal}
              aria-label="Partager la conversation"
            />
          </Tooltip>
          <Tooltip content="Nouvelle conversation">
            <IconButton
              icon="plus"
              size="small"
              kind="tertiary"
              onClick={handleNewChat}
              aria-label="Nouvelle conversation"
            />
          </Tooltip>
          <Tooltip content="Agrandir">
            <IconButton
              icon="container-enlarge"
              size="small"
              kind="tertiary"
              onClick={handleToggleExpand}
              aria-label="Agrandir"
            />
          </Tooltip>
          <Tooltip content="Fermer">
            <IconButton
              icon="close"
              size="small"
              kind="tertiary"
              onClick={onClose}
              aria-label="Fermer"
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
              assistantName="Docusign IA"
              welcomeTitle="Que souhaitez-vous savoir sur Acme ?"
              suggestedActions={QUICK_ACTIONS}
              suggestedQuestions={SUGGESTED_QUESTIONS}
              onSuggestionClick={handleSuggestionClick}
              placeholder="Poser une question sur les contrats Acme..."
              showHeader={false}
              onClose={onClose}
              onShowHistory={handleToggleHistory}
              onNewChat={handleNewChat}
              onMaximize={handleToggleExpand}
              maxHeight="100%"
              className={styles.aiChatContainer}
              renderMessage={renderMessage}
              contextSource={agreementCount ? {
                count: agreementCount,
                label: 'contrats',
                onClick: () => console.log('Voir source contexte'),
              } : undefined}
              showContextAttention={showContextAttention}
            />

            {/* Expanded Prompt Overlay */}
            {expandedAction && (
              <div className={styles.expandedPromptOverlay}>
                <ExpandedPrompt
                  action={expandedAction}
                  onRun={handleRunExpandedPrompt}
                  onClose={handleCloseExpandedPrompt}
                />
              </div>
            )}
          </div>
        </div>

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
      />

      {/* Toast Notification */}
      <Toast
        isVisible={toastState.visible}
        message={toastState.message}
        status={toastState.status}
      />
    </div>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export function AgreementStudioFR() {
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
    { id: 'home', label: 'Accueil' },
    { id: 'agreements', label: 'Contrats', active: true },
    { id: 'templates', label: 'Modèles' },
    { id: 'reports', label: 'Rapports' },
    { id: 'admin', label: 'Administration' },
  ];

  const localNavSections = [
    {
      id: 'main',
      items: [
        { id: 'all-agreements', label: 'Tous les Contrats', icon: 'envelope' as const },
        { id: 'drafts', label: 'Brouillons', nested: true },
        { id: 'in-progress', label: 'En Cours', nested: true },
        { id: 'completed', label: 'Terminés', nested: true, active: true },
        { id: 'deleted', label: 'Supprimés', nested: true },
      ],
    },
    {
      id: 'folders',
      items: [
        { id: 'folders', label: 'Dossiers', icon: 'folder' as const, hasMenu: true },
      ],
    },
    {
      id: 'features',
      hasDivider: true,
      items: [
        { id: 'parties', label: 'Parties', icon: 'building-person' as const, badge: 'Nouveau' },
        { id: 'requests', label: 'Demandes', icon: 'ticket' as const, badge: 'Nouveau' },
        { id: 'maestro-workflows', label: 'Workflows Maestro', icon: 'workflow' as const, badge: 'Nouveau' },
        { id: 'workspaces', label: 'Espaces de Travail', icon: 'transaction' as const },
        { id: 'powerforms', label: 'PowerForms', icon: 'flash' as const },
        { id: 'bulk-send', label: 'Envoi Groupé', icon: 'document-stack' as const },
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
        header: 'Nom du Fichier',
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
        header: 'Statut',
        sortable: true,
        width: '120px',
        cell: (row) => (
          <div className={dataTableStyles.statusCell}>
            <span className={dataTableStyles.statusDot} data-status={row.status} />
            <div className={dataTableStyles.statusText}>
              <span className={dataTableStyles.statusLabel}>
                {row.status === 'active' ? 'Actif' : row.status === 'inactive' ? 'Inactif' : 'Expiré'}
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
        header: 'Type de Contrat',
        sortable: true,
        width: '140px',
      },
      {
        key: 'contractValue',
        header: 'Valeur du Contrat',
        sortable: true,
        width: '160px',
        alignment: 'right',
        cell: (row) => row.contractValue || '—',
      },
      {
        key: 'effectiveDate',
        header: 'Date d\'Effet',
        sortable: true,
        width: '130px',
        cell: (row) => row.effectiveDate || '—',
      },
      {
        key: 'expirationDate',
        header: 'Date d\'Expiration',
        sortable: true,
        width: '140px',
        cell: (row) => row.expirationDate || '—',
      },
      {
        key: 'agreementId',
        header: 'ID Contrat',
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
          console.log('Menu actions ligne');
        }}
      />
    ),
    []
  );

  const selectionActions: DataTableAction[] = useMemo(
    () => [
      {
        id: 'download',
        label: 'Télécharger',
        icon: 'download',
        onClick: (rows) => console.log('Télécharger:', rows),
      },
      {
        id: 'delete',
        label: 'Supprimer',
        icon: 'trash',
        variant: 'danger',
        onClick: (rows) => console.log('Supprimer:', rows),
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
        onClick={() => console.log('Nouveau contrat')}
        onDropdownClick={() => console.log('Menu nouveau')}
      >
        Nouveau
      </ComboButton>
      <ComboButton
        variant="tertiary"
        size="medium"
        startIcon="settings"
        onClick={() => console.log('Paramètres')}
        onDropdownClick={() => console.log('Menu paramètres')}
      />
    </>
  );

  const [selectedView, setSelectedView] = useState<'documents' | 'envelopes'>('documents');

  const viewSelectorItems = [
    {
      label: 'Documents',
      description: 'Analyser les données contractuelles avec l\'IA',
      icon: <Icon name="document" size="medium" />,
      selected: selectedView === 'documents',
      onClick: () => setSelectedView('documents'),
    },
    {
      label: 'Enveloppes',
      description: 'Voir les signatures et l\'activité',
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
            headerLabel: 'Démarrer',
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
                title={submittedSearch ? 'Résultats de Recherche' : 'Terminés'}
                showAIBadge
                aiBadgeText="Assisté par IA"
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
                      label: `Discuter avec ${acmeAgreementCount} contrats`,
                      onClick: handleOpenAIChat,
                    }}
                  >
                    <strong>{acmeAgreementCount} contrats Acme</strong> trouvés. Utilisez l'IA pour analyser les termes, trouver les conflits et résumer les dispositions clés.
                  </Banner>
                ) : !submittedSearch ? (
                  // Default banner - renewal notice
                  <Banner
                    kind="promo"
                    customIcon={<IrisIcon />}
                    closable
                    onClose={() => setShowBanner(false)}
                    action={{
                      label: 'Voir les contrats à renouveler',
                      href: '#',
                      onClick: () => console.log('Voir renouvellements'),
                    }}
                  >
                    <strong>10 contrats</strong> avec des dates de préavis de renouvellement dans les 30 prochains jours.
                  </Banner>
                ) : undefined
              ) : undefined
            }
            filterBar={
              <FilterBar
                viewSelector={
                  <Dropdown items={viewSelectorItems} header="Sélectionner une vue" iconStyle="boxed">
                    <Button
                      kind="secondary"
                      size="small"
                      endElement={<Icon name="chevron-down" size="small" />}
                    >
                      {selectedView === 'documents' ? 'Documents' : 'Enveloppes'}
                    </Button>
                  </Dropdown>
                }
                search={{
                  value: searchValue,
                  onChange: setSearchValue,
                  onSubmit: handleSearchSubmit,
                  placeholder: 'Rechercher des contrats...',
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
                    Filtres
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
      />
    </div>
  );
}

export default AgreementStudioFR;
