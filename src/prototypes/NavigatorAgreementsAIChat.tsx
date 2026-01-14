/**
 * NavigatorAgreementsAIChat Prototype
 *
 * DocuSign Navigator Agreements list page with AI Chat functionality.
 * Features:
 * - Floating CTA button extending from right edge (collapsed state)
 * - AI Chat panel sliding in from right (expanded state)
 * - Content pushes left and LocalNav collapses when panel opens
 * - Uses existing AIChat pattern component
 *
 * Based on Figma designs:
 * - Collapsed: node-id=18195:323613
 * - Expanded: node-id=18195:323615
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
  SuggestedAction,
  Link,
} from '@/design-system';
import styles from './NavigatorAgreementsAIChat.module.css';

// =============================================================================
// Types
// =============================================================================

interface Agreement {
  id: string;
  agreementId: string;
  fileName: string;
  fileStatus: 'uploaded' | 'completed' | 'pending';
  fileStatusDetail: string;
  parties: string[];
  status: 'active' | 'inactive' | 'expired';
  statusDate?: string;
  agreementType: string;
  contractValue?: string;
  effectiveDate?: string;
  expirationDate?: string;
  isAIAssisted?: boolean;
}

// =============================================================================
// Demo Data - Matches screenshot
// =============================================================================

const DEMO_DATA: Agreement[] = [
  {
    id: '1',
    agreementId: 'a1868ad8-11c6-4656-a078-0af9ade15b50',
    fileName: '01_people_ai_guidebook.pdf',
    fileStatus: 'uploaded',
    fileStatusDetail: 'View Job',
    parties: [],
    status: 'inactive',
    agreementType: 'Handbook',
    isAIAssisted: true,
  },
  {
    id: '2',
    agreementId: '7f233bd9-4bec-41a0-aab5-7774c2d167a1',
    fileName: 'Restricted Access Request Form 1726...',
    fileStatus: 'completed',
    fileStatusDetail: 'Please DocuSign this...',
    parties: ['Akshat Mishra', '+2 More'],
    status: 'active',
    agreementType: 'Form',
    effectiveDate: '5/20/2025',
    isAIAssisted: true,
  },
  {
    id: '3',
    agreementId: 'd11088ef-d726-4fd7-8d89-220fc14bdf5f',
    fileName: 'Offer Letter 1.pdf',
    fileStatus: 'uploaded',
    fileStatusDetail: 'View Job',
    parties: ['KENNETH L. HARRIS', 'UNIVERSAL BIOENERGY INC'],
    status: 'inactive',
    statusDate: 'Expired 3/31/2016',
    agreementType: 'Offer Letter',
    contractValue: '$27,600.00 USD',
    effectiveDate: '3/26/2015',
    expirationDate: '3/31/2016',
    isAIAssisted: false,
  },
  {
    id: '4',
    agreementId: 'ba0feac4-5d33-429c-9cdc-d9198121428b',
    fileName: '1100.L0005-US01 - Inventor-approved...',
    fileStatus: 'completed',
    fileStatusDetail: '[SIGNATURE REQUIRE...',
    parties: [],
    status: 'inactive',
    agreementType: 'Miscellaneous',
    isAIAssisted: true,
  },
  {
    id: '5',
    agreementId: '100b0b4e-7756-46d2-aaa5-593984a3e3f1',
    fileName: '1100.L0005-US01 - Inventor-approved...',
    fileStatus: 'completed',
    fileStatusDetail: '[SIGNATURE REQUIRE...',
    parties: [],
    status: 'inactive',
    agreementType: 'Form',
    isAIAssisted: true,
  },
  {
    id: '6',
    agreementId: 'af0ffe1e-ccb5-422e-b68b-0a3beef6330c',
    fileName: '1100.L0005-US01 Combined Declaration...',
    fileStatus: 'completed',
    fileStatusDetail: '[SIGNATURE REQUIRE...',
    parties: ['INVENTOR', 'Docusign, Inc.'],
    status: 'active',
    agreementType: 'Miscellaneous',
    effectiveDate: '2/4/2025',
    isAIAssisted: false,
  },
  {
    id: '7',
    agreementId: '99e31c68-8ee0-4000-966e-c6543fb3d0d2',
    fileName: 'reseller6.pdf',
    fileStatus: 'uploaded',
    fileStatusDetail: 'View Job',
    parties: ['[INSERT FULL NAME OF RES...', 'Voyager Worldwide'],
    status: 'inactive',
    agreementType: 'C_Mariya_27s...',
    isAIAssisted: true,
  },
  {
    id: '8',
    agreementId: '021ca20b-ea88-4e8c-a51a-5faf92d0334e',
    fileName: 'reseller8.pdf',
    fileStatus: 'uploaded',
    fileStatusDetail: 'View Job',
    parties: ['MiniQ, Inc.'],
    status: 'active',
    agreementType: 'C_Mariya_27s...',
    effectiveDate: '11/19/2024',
    isAIAssisted: false,
  },
];

// =============================================================================
// Quick Actions & Questions for Zero Query State
// =============================================================================

const QUICK_ACTIONS: SuggestedAction[] = [
  {
    label: 'Get signatures',
    description: 'Upload a document to sign or send for signature',
    icon: 'envelope',
  },
  {
    label: 'Summarize agreements',
    icon: 'document-stack',
  },
  {
    label: 'Ask a question about agreements',
    icon: 'document-stack',
  },
];

const SUGGESTED_QUESTIONS = [
  'What is an envelope?',
  'How do I manage my billing?',
];

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
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onClick, agreementCount = 10 }) => (
  <button type="button" className={styles.floatingCTA} onClick={onClick}>
    <span className={styles.floatingCTAIcon}>
      <AIIcon name="ai-spark-filled" size={24} />
    </span>
    <span className={styles.floatingCTAText}>
      Start Q&amp;A with {agreementCount} agreements
    </span>
  </button>
);

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
}

const MIN_PANEL_WIDTH = 360;
const MAX_PANEL_WIDTH = window.innerWidth;
const INLINE_HISTORY_THRESHOLD = 800; // Width at which history becomes inline sidebar

// Mock chat history data
const CHAT_HISTORY = {
  today: [
    { id: '1', title: 'Contract renewal questions', time: '2:30 PM', messages: 4 },
    { id: '2', title: 'NDA template assistance', time: '11:15 AM', messages: 8 },
  ],
  yesterday: [
    { id: '3', title: 'Bulk send help', time: '4:45 PM', messages: 3 },
    { id: '4', title: 'Agreement status inquiry', time: '10:00 AM', messages: 6 },
  ],
  lastWeek: [
    { id: '5', title: 'Signature workflow setup', time: 'Mon', messages: 12 },
    { id: '6', title: 'Template customization', time: 'Sun', messages: 5 },
    { id: '7', title: 'Integration questions', time: 'Fri', messages: 9 },
  ],
};

const AIPanel: React.FC<AIPanelProps> = ({
  isOpen,
  onClose,
  userName = 'Akshat',
  panelWidth,
  onWidthChange,
  onStartResize,
  onEndResize,
  isResizing,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback((content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `I understand you're asking about "${content}". Let me help you with that. This is a demo response from the AI assistant.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    handleSendMessage(suggestion);
  }, [handleSendMessage]);

  // Handle drag resize
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onStartResize();

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

  // Toggle between default and full width
  const handleToggleExpand = useCallback(() => {
    if (panelWidth >= window.innerWidth - 50) {
      // Shrink to default
      onWidthChange(MIN_PANEL_WIDTH);
    } else {
      // Expand to full width
      onWidthChange(window.innerWidth);
    }
  }, [panelWidth, onWidthChange]);

  // Toggle history panel
  const handleToggleHistory = useCallback(() => {
    setIsHistoryOpen((prev) => !prev);
  }, []);

  // Smart history: inline when wide enough, overlay when narrow
  const useInlineHistory = panelWidth >= INLINE_HISTORY_THRESHOLD;

  // Handle history item click - only close in overlay mode
  const handleHistoryItemClick = useCallback((id: string) => {
    setActiveHistoryId(id);
    // In a real app, this would load the conversation
    // Only close panel in overlay mode (narrow panel)
    if (!useInlineHistory) {
      setIsHistoryOpen(false);
    }
  }, [useInlineHistory]);

  // Consider panel "expanded" when wider than 600px (beyond default sidebar width)
  const isExpanded = panelWidth > 600;

  // Determine panel classes based on state
  const panelClasses = [
    styles.aiPanel,
    isOpen ? styles.aiPanelOpen : '',
    isResizing ? styles.aiPanelResizing : '',
    isExpanded ? styles.aiPanelExpanded : '',
  ].filter(Boolean).join(' ');

  // Content wrapper classes - constrain width when expanded
  const contentWrapperClasses = [
    styles.aiChatContentWrapper,
    !isExpanded ? styles.aiChatContentWrapperNarrow : '',
  ].filter(Boolean).join(' ');

  // History panel classes - smart mode switching
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

  // Overlay only needed in non-inline mode
  const historyOverlayClasses = [
    styles.historyOverlay,
    !useInlineHistory && isHistoryOpen ? styles.historyOverlayVisible : '',
  ].filter(Boolean).join(' ');

  // Render the history panel content (reused in both modes)
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
        {/* Today */}
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

        {/* Yesterday */}
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

        {/* Last Week */}
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
      {/* Drag Handle */}
      {isOpen && (
        <div
          className={styles.dragHandle}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.dragHandleBar} />
        </div>
      )}

      {/* Layout container for inline history + content */}
      <div className={styles.aiPanelLayout}>
        {/* Inline History (when wide enough) */}
        {useInlineHistory && (
          <div className={historyPanelClasses}>
            {renderHistoryContent()}
          </div>
        )}

        {/* Main content area */}
        <div className={styles.aiPanelContent}>
          {/* Overlay History (when narrow) - positioned inside content area */}
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

          {/* Content wrapper for max-width constraint when expanded */}
          <div className={contentWrapperClasses}>
            <AIChat
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              userName={userName}
              assistantName="Docusign AI"
              welcomeTitle="What would you like to do?"
              suggestedActions={QUICK_ACTIONS}
              suggestedQuestions={SUGGESTED_QUESTIONS}
              onSuggestionClick={handleSuggestionClick}
              placeholder="Ask anything about the Docusign"
              showHeader={true}
              onClose={onClose}
              onShowHistory={handleToggleHistory}
              onMaximize={handleToggleExpand}
              maxHeight="100%"
              className={styles.aiChatContainer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// Main Component
// =============================================================================

const DEFAULT_PANEL_WIDTH = 360;

export function NavigatorAgreementsAIChat() {
  // AI Chat state
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  // Banner state
  const [showBanner, setShowBanner] = useState(true);

  // Selection state
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string | undefined>('fileName');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending' | null>(
    'ascending'
  );

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSizeOption>(25);

  // Search state
  const [searchValue, setSearchValue] = useState('');

  // LocalNav collapse state - starts locked (expanded) as default
  const [isNavLocked, setIsNavLocked] = useState(true);

  // Store previous nav state to restore when AI panel closes
  const [prevNavLocked, setPrevNavLocked] = useState(true);

  // Collapse sidebar when AI panel opens
  useEffect(() => {
    if (isAIChatOpen) {
      // Store current state before collapsing
      setPrevNavLocked(isNavLocked);
      // Collapse the sidebar
      setIsNavLocked(false);
    } else {
      // Restore previous state when closing
      setIsNavLocked(prevNavLocked);
    }
  }, [isAIChatOpen]); // Only react to isAIChatOpen changes

  // =============================================================================
  // Navigation Configuration
  // =============================================================================

  const globalNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'agreements', label: 'Agreements', active: true },
    { id: 'templates', label: 'Templates' },
    { id: 'reports', label: 'Reports' },
    { id: 'admin', label: 'Admin' },
  ];

  // LocalNav sections
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

  // =============================================================================
  // Column Definitions
  // =============================================================================

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
        width: '280px',
        sticky: true,
        className: dataTableStyles.columnBorderRight,
        cell: (row) => (
          <div className={dataTableStyles.cellContent}>
            <Link discrete size="small" href="#" className={dataTableStyles.cellPrimary}>
              {row.fileName}
            </Link>
            <span className={dataTableStyles.cellSecondary}>
              {row.fileStatus === 'uploaded' ? '↑' : '✓'}{' '}
              {row.fileStatus === 'uploaded' ? 'Uploaded: ' : 'Completed envelope: '}
              <Link kind="subtle" size="xs" href="#">
                {row.fileStatusDetail}
              </Link>
            </span>
          </div>
        ),
      },
      {
        key: 'parties',
        header: 'Parties',
        width: '180px',
        cell: (row) => (
          <div className={dataTableStyles.cellContent}>
            {row.parties.length > 0 ? (
              row.parties.map((party, i) => {
                const isMoreLink = party.startsWith('+');
                if (isMoreLink) {
                  return (
                    <a key={i} href="#" className={dataTableStyles.partyMoreLink}>
                      {party}
                    </a>
                  );
                }
                return (
                  <span key={i} className={dataTableStyles.partyChip}>
                    <a href="#" className={dataTableStyles.partyLink}>
                      {party}
                    </a>
                  </span>
                );
              })
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
                {row.status === 'expired' ? 'Inactive' : capitalize(row.status)}
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
        header: 'Total Contract Value',
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

  // =============================================================================
  // Row Actions
  // =============================================================================

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

  // =============================================================================
  // Selection Actions
  // =============================================================================

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

  // =============================================================================
  // Pagination Config
  // =============================================================================

  const pagination: DataTablePaginationConfig = useMemo(
    () => ({
      page,
      pageSize,
      totalItems: 38,
      onPageChange: setPage,
      onPageSizeChange: (size) => {
        setPageSize(size);
        setPage(1);
      },
      showInfo: true,
    }),
    [page, pageSize]
  );

  // =============================================================================
  // Handlers
  // =============================================================================

  const handleSortChange = useCallback(
    (column: string, direction: 'ascending' | 'descending' | null) => {
      setSortColumn(direction ? column : undefined);
      setSortDirection(direction);
    },
    []
  );

  const handleOpenAIChat = useCallback(() => {
    setIsAIChatOpen(true);
    setPanelWidth(DEFAULT_PANEL_WIDTH);
  }, []);

  const handleCloseAIChat = useCallback(() => {
    setIsAIChatOpen(false);
    setPanelWidth(DEFAULT_PANEL_WIDTH); // Reset width when closing
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

  // =============================================================================
  // Page Header Actions
  // =============================================================================

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

  // =============================================================================
  // Filter Dropdown Items - View Selector
  // =============================================================================

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

  // =============================================================================
  // Render
  // =============================================================================

  // Calculate main content width based on panel width
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
        <AgreementTableView
          pageHeader={
            <PageHeader
              title="Completed"
              showAIBadge
              aiBadgeText="AI-Assisted"
              actions={pageHeaderActions}
            />
          }
          banner={
            showBanner ? (
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
                placeholder: 'Try keywords, phrases, or a question',
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
            data={DEMO_DATA}
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
      </DocuSignShell>

      {/* Floating CTA Button (shown when AI panel is closed) */}
      {!isAIChatOpen && <FloatingCTA onClick={handleOpenAIChat} agreementCount={10} />}
      </div>

      {/* AI Chat Panel */}
      <AIPanel
        isOpen={isAIChatOpen}
        onClose={handleCloseAIChat}
        userName="Akshat"
        panelWidth={panelWidth}
        onWidthChange={handleWidthChange}
        onStartResize={handleStartResize}
        onEndResize={handleEndResize}
        isResizing={isResizing}
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

export default NavigatorAgreementsAIChat;
