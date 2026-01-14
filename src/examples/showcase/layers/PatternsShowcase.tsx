import React, { useState, useCallback, useMemo } from 'react';
import { Badge, Icon, AIIcon, IconButton, Button, Link, Dropdown, SearchInput } from '@/design-system';
import { GlobalNav, LocalNav, AIChat, ChatMessage, DataTable, DataTableColumn, DataTableAction, DataTablePaginationConfig, PageSizeOption, PageHeader, FilterBar, dataTableStyles } from '@/design-system/5-patterns';
import DocuSignLogo from '@/assets/Docusign Horizontal Black.svg';
import styles from '../Showcase.module.css';

export interface PatternsShowcaseProps {
  activeSubpage: string;
}

// Header menu items for LocalNav Start button dropdown
const headerMenuItems = [
  { id: 'envelopes', label: 'Envelopes', icon: 'envelope' as const, hasSubmenu: true },
  { id: 'create-request', label: 'Create Request', icon: 'document-plus' as const },
  { id: 'maestro', label: 'Maestro Workflows', icon: 'workflow' as const, hasSubmenu: true },
  { id: 'powerform', label: 'Create PowerForm', icon: 'bolt' as const },
  { id: 'workspace', label: 'Create Workspace', icon: 'folder-plus' as const },
];

const docuSignLogo = (
  <img src={DocuSignLogo} alt="DocuSign" style={{ height: '24px', width: 'auto' }} />
);

export const PatternsShowcase: React.FC<PatternsShowcaseProps> = ({ activeSubpage }) => {
  // GlobalNav state
  const [globalNavActive, setGlobalNavActive] = React.useState('agreements');

  // LocalNav state
  const [localNavActive, setLocalNavActive] = React.useState('completed');
  const [localNavLocked, setLocalNavLocked] = React.useState(true);

  // GlobalNav items - DocuSign style
  const globalNavItems = [
    {
      id: 'home',
      label: 'Home',
      active: globalNavActive === 'home',
      onClick: () => setGlobalNavActive('home'),
    },
    {
      id: 'agreements',
      label: 'Agreements',
      active: globalNavActive === 'agreements',
      onClick: () => setGlobalNavActive('agreements'),
    },
    {
      id: 'templates',
      label: 'Templates',
      active: globalNavActive === 'templates',
      onClick: () => setGlobalNavActive('templates'),
    },
    {
      id: 'reports',
      label: 'Reports',
      active: globalNavActive === 'reports',
      onClick: () => setGlobalNavActive('reports'),
    },
    {
      id: 'admin',
      label: 'Admin',
      active: globalNavActive === 'admin',
      onClick: () => setGlobalNavActive('admin'),
    },
  ];

  // LocalNav sections - DocuSign Agreements style
  const localNavSections = [
    {
      id: 'main',
      items: [
        {
          id: 'all-agreements',
          label: 'All Agreements',
          icon: 'envelope' as const,
          active: localNavActive === 'all-agreements',
          onClick: () => setLocalNavActive('all-agreements'),
        },
        {
          id: 'drafts',
          label: 'Drafts',
          nested: true,
          active: localNavActive === 'drafts',
          onClick: () => setLocalNavActive('drafts'),
        },
        {
          id: 'in-progress',
          label: 'In Progress',
          nested: true,
          active: localNavActive === 'in-progress',
          onClick: () => setLocalNavActive('in-progress'),
        },
        {
          id: 'completed',
          label: 'Completed',
          nested: true,
          active: localNavActive === 'completed',
          onClick: () => setLocalNavActive('completed'),
        },
        {
          id: 'deleted',
          label: 'Deleted',
          nested: true,
          active: localNavActive === 'deleted',
          onClick: () => setLocalNavActive('deleted'),
        },
      ],
    },
    {
      id: 'folders',
      items: [
        {
          id: 'folders',
          label: 'Folders',
          icon: 'folder' as const,
          hasMenu: true,
          active: localNavActive === 'folders',
          onClick: () => setLocalNavActive('folders'),
        },
      ],
    },
    {
      id: 'features',
      hasDivider: true,
      items: [
        {
          id: 'parties',
          label: 'Parties',
          icon: 'building-person' as const,
          badge: 'New',
          active: localNavActive === 'parties',
          onClick: () => setLocalNavActive('parties'),
        },
        {
          id: 'requests',
          label: 'Requests',
          icon: 'ticket' as const,
          badge: 'New',
          active: localNavActive === 'requests',
          onClick: () => setLocalNavActive('requests'),
        },
        {
          id: 'maestro-workflows',
          label: 'Maestro Workflows',
          icon: 'workflow' as const,
          badge: 'New',
          active: localNavActive === 'maestro-workflows',
          onClick: () => setLocalNavActive('maestro-workflows'),
        },
        {
          id: 'workspaces',
          label: 'Workspaces',
          icon: 'transaction' as const,
          active: localNavActive === 'workspaces',
          onClick: () => setLocalNavActive('workspaces'),
        },
        {
          id: 'powerforms',
          label: 'PowerForms',
          icon: 'flash' as const,
          active: localNavActive === 'powerforms',
          onClick: () => setLocalNavActive('powerforms'),
        },
        {
          id: 'bulk-send',
          label: 'Bulk Send',
          icon: 'document-stack' as const,
          active: localNavActive === 'bulk-send',
          onClick: () => setLocalNavActive('bulk-send'),
        },
      ],
    },
  ];

  if (activeSubpage === 'globalnav') {
    return (
      <div className={styles.tokenPage}>
        {/* Default GlobalNav - DocuSign Style */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default GlobalNav</h3>
          </div>
          <div style={{ margin: '-1px -1px 0 -1px', overflow: 'hidden' }}>
            <GlobalNav
              logo={docuSignLogo}
              navItems={globalNavItems}
              showAppSwitcher={false}
              showSearch
              searchVariant="pill"
              showNotifications
              notificationCount={1}
              showSettings
              settingsIcon="filter"
              user={{ name: 'AM' }}
            />
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoGrid}>
            <Badge variant="neutral">Logo</Badge>
            <Badge variant="neutral">Primary navigation</Badge>
            <Badge variant="neutral">Search pill</Badge>
            <Badge variant="neutral">Notifications</Badge>
            <Badge variant="neutral">Settings/Filter</Badge>
            <Badge variant="neutral">Help</Badge>
            <Badge variant="neutral">User avatar</Badge>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'localnav') {
    return (
      <div className={styles.tokenPage}>
        {/* Default LocalNav - DocuSign Agreements Style */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default LocalNav</h3>
          </div>
          <div className={styles.localNavPreviewContainer}>
            <LocalNav
              headerLabel="Start"
              headerIcon="plus"
              headerMenuItems={headerMenuItems}
              sections={localNavSections}
              activeItemId={localNavActive}
              isLocked={localNavLocked}
              onLockChange={setLocalNavLocked}
            />
          </div>
          <div className={styles.demoRow}>
            <Badge variant={localNavLocked ? 'success' : 'warning'}>
              {localNavLocked ? 'Locked (Expanded)' : 'Unlocked (Collapsible)'}
            </Badge>
            <span className={styles.demoDesc}>Click lock icon to toggle collapse behavior</span>
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoGrid}>
            <Badge variant="neutral">Start dropdown</Badge>
            <Badge variant="neutral">Nested items</Badge>
            <Badge variant="neutral">Item badges</Badge>
            <Badge variant="neutral">Context menus</Badge>
            <Badge variant="neutral">Active indicators</Badge>
            <Badge variant="neutral">Icon support</Badge>
            <Badge variant="neutral">Lock/unlock</Badge>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'aichat') {
    return <AIChatDemo />;
  }

  if (activeSubpage === 'datatable') {
    return <DataTableDemo />;
  }

  if (activeSubpage === 'filterbar') {
    return <FilterBarDemo />;
  }

  if (activeSubpage === 'pageheader') {
    return (
      <div className={styles.tokenPage}>
        {/* Default - Full Example (Title + AIBadge + Actions) */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default (Title + AIBadge + Actions)</h3>
          </div>
          <div className={styles.patternPreviewContainerFull}>
            <PageHeader
              title="Navigator"
              showAIBadge
              actions={
                <>
                  <IconButton icon="filter" variant="tertiary" size="medium" />
                  <IconButton icon="settings" variant="tertiary" size="medium" />
                  <Button kind="secondary" startElement={<Icon name="plus" size="small" />}>
                    New Agreement
                  </Button>
                </>
              }
            />
          </div>
        </div>

        {/* With Actions Only */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Actions (No Badge)</h3>
          </div>
          <div className={styles.patternPreviewContainerFull}>
            <PageHeader
              title="Templates"
              actions={
                <>
                  <IconButton icon="settings" variant="tertiary" size="medium" />
                  <Button kind="secondary" startElement={<Icon name="plus" size="small" />}>
                    New Template
                  </Button>
                </>
              }
            />
          </div>
        </div>

        {/* With Custom AIBadge Text */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Custom AIBadge Text</h3>
          </div>
          <div className={styles.patternPreviewContainerFull}>
            <PageHeader
              title="Completed"
              showAIBadge
              aiBadgeText="AI Powered"
            />
          </div>
        </div>

        {/* Basic PageHeader */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic (Title Only)</h3>
          </div>
          <div className={styles.patternPreviewContainerFull}>
            <PageHeader title="Agreements" />
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoGrid}>
            <Badge variant="neutral">H1 Title (32px/400)</Badge>
            <Badge variant="neutral">Optional AIBadge</Badge>
            <Badge variant="neutral">Right-aligned actions</Badge>
            <Badge variant="neutral">12px title-badge gap</Badge>
            <Badge variant="neutral">8px action gap</Badge>
          </div>
        </div>

        {/* Props Overview */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Props</h3>
          </div>
          <div className={styles.demoGrid}>
            <Badge variant="info">title (required)</Badge>
            <Badge variant="info">showAIBadge</Badge>
            <Badge variant="info">aiBadgeText</Badge>
            <Badge variant="info">actions</Badge>
            <Badge variant="info">className</Badge>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// AIChat Demo Component
const AIChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm here to help you with your documents. How can I assist you today?",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '2',
      role: 'user',
      content: 'I need help understanding the signature process for my contract.',
      timestamp: new Date(Date.now() - 45000),
    },
    {
      id: '3',
      role: 'assistant',
      content:
        "I'd be happy to help you understand the signature process! Here's a quick overview:\n\n1. Upload your document\n2. Add signature fields\n3. Send to recipients\n4. Track completion\n\nWould you like me to walk you through any specific step?",
      timestamp: new Date(Date.now() - 30000),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  // Sample suggested actions for zero query state
  const suggestedActions = [
    {
      label: 'Send a document',
      description: 'Upload and send documents for signature',
      icon: 'send',
    },
    {
      label: 'Check agreement status',
      description: 'View the status of your pending agreements',
      icon: 'document',
    },
  ];

  // Sample suggested questions for zero query state
  const suggestedQuestions = [
    'How do I add a signature field?',
    'What happens after I send a document?',
    'How can I track who has signed?',
  ];

  const handleSendMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Thanks for your message! I received: "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}"`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleMessageAction = useCallback((action: string, message: ChatMessage) => {
    if (action === 'copy') {
      navigator.clipboard.writeText(message.content);
    }
  }, []);

  return (
    <div className={styles.tokenPage}>
      {/* Interactive Demo */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Interactive Demo</h3>
          <button
            onClick={() => setShowEmpty(!showEmpty)}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--ink-radius-size-xs)',
              border: '1px solid var(--ink-border-default)',
              background: 'var(--ink-bg-default)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            {showEmpty ? 'Show Conversation' : 'Show Empty State'}
          </button>
        </div>
        <div className={styles.chatPreviewContainer}>
          <AIChat
            messages={showEmpty ? [] : messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            assistantName="DocuSign Assistant"
            userName={showEmpty ? 'Akshat' : 'You'}
            welcomeTitle={showEmpty ? 'Welcome to DocuSign' : undefined}
            suggestedActions={showEmpty ? suggestedActions : undefined}
            suggestedQuestions={showEmpty ? suggestedQuestions : undefined}
            onSuggestionClick={handleSendMessage}
            showTimestamps
            showActions
            onMessageAction={handleMessageAction}
            maxHeight="100%"
            placeholder="Type a message..."
            showHeader
            onShowHistory={() => console.log('Show history')}
            onNewChat={() => console.log('New chat')}
            onMaximize={() => console.log('Maximize')}
            onClose={() => console.log('Close')}
          />
        </div>
      </div>

      {/* Loading State Demo */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Loading State</h3>
        </div>
        <div className={styles.chatPreviewSmall}>
          <AIChat
            messages={[
              {
                id: 'loading-1',
                role: 'user',
                content: 'What documents do I have pending?',
                timestamp: new Date(),
              },
            ]}
            onSendMessage={() => {}}
            isLoading={true}
            assistantName="Assistant"
            maxHeight="100%"
            disabled
          />
        </div>
      </div>

      {/* Key Features */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Features</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="neutral">Message bubbles</Badge>
          <Badge variant="neutral">User/Assistant avatars</Badge>
          <Badge variant="neutral">Typing indicator</Badge>
          <Badge variant="neutral">Copy message</Badge>
          <Badge variant="neutral">Timestamps</Badge>
          <Badge variant="neutral">Error states</Badge>
          <Badge variant="neutral">Welcome message</Badge>
          <Badge variant="neutral">Auto-scroll</Badge>
          <Badge variant="neutral">Keyboard shortcuts</Badge>
        </div>
      </div>

      {/* Props Overview */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Props</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="info">messages</Badge>
          <Badge variant="info">onSendMessage</Badge>
          <Badge variant="info">isLoading</Badge>
          <Badge variant="info">assistantName</Badge>
          <Badge variant="info">showTimestamps</Badge>
          <Badge variant="info">showActions</Badge>
          <Badge variant="info">maxHeight</Badge>
          <Badge variant="info">disabled</Badge>
        </div>
      </div>
    </div>
  );
};

// DataTable Demo Component - Production Match (Navigator Style)
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

const DEMO_DATA: Agreement[] = [
  {
    id: '1',
    agreementId: 'a1868aa8-11c6-4656-a078-0af9ade15b50',
    fileName: '01_people_ai_guidebook.pdf',
    fileStatus: 'uploaded',
    fileStatusDetail: 'View Job',
    parties: ['HR Department'],
    status: 'inactive',
    agreementType: 'Handbook',
    isAIAssisted: true,
  },
  {
    id: '2',
    agreementId: '7f233bd9-4bec-41a0-aab5-7774c2d167a1',
    fileName: 'Restricted Access Request Form 1726 (4).docx',
    fileStatus: 'completed',
    fileStatusDetail: 'Please DocuSign this document: DocuSign...',
    parties: ['Akshat Mishra', '+2 More'],
    status: 'active',
    agreementType: 'Form',
    effectiveDate: '5/20/2025',
    isAIAssisted: true,
  },
  {
    id: '3',
    agreementId: 'd1f08e9f-a726-4fd7-8d89-220fc14bdf5f',
    fileName: 'Offer Letter 1.pdf',
    fileStatus: 'uploaded',
    fileStatusDetail: 'View Job',
    parties: ['Kenneth L. Harris', 'Universal Bioenergy Inc'],
    status: 'expired',
    statusDate: '3/31/2016',
    agreementType: 'Offer Letter',
    contractValue: '$27,600.00 USD',
    effectiveDate: '3/26/2015',
    expirationDate: '3/31/2016',
    isAIAssisted: true,
  },
  {
    id: '4',
    agreementId: 'ba0feac4-5d33-429c-9cdc-d9198121428b',
    fileName: '1100.L0005-US01 - Inventor-approved Application...',
    fileStatus: 'completed',
    fileStatusDetail: 'SIGNATURE REQUIRED BY 2/14/2025',
    parties: [],
    status: 'inactive',
    agreementType: 'Miscellaneous',
    isAIAssisted: true,
  },
  {
    id: '5',
    agreementId: '100b0b4e-7756-46d2-aaa5-593984a3e3f1',
    fileName: '1100.L0005-US01 - Inventor-approved Application...',
    fileStatus: 'completed',
    fileStatusDetail: 'SIGNATURE REQUIRED BY 2/14/2025',
    parties: [],
    status: 'inactive',
    agreementType: 'Form',
    isAIAssisted: true,
  },
  {
    id: '6',
    agreementId: 'af0ffe1e-ccb5-422e-b68b-0a3beef6330c',
    fileName: '1100.L0005-US01 Combined Declaration and Assignment...',
    fileStatus: 'completed',
    fileStatusDetail: 'SIGNATURE REQUIRED BY 2/14/2025',
    parties: ['Inventor', 'Docusign Inc.'],
    status: 'active',
    agreementType: 'Miscellaneous',
    effectiveDate: '2/4/2025',
    isAIAssisted: true,
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
    parties: ['MiniQ Inc.'],
    status: 'active',
    agreementType: 'C_Mariya_27s...',
    effectiveDate: '11/19/2024',
    isAIAssisted: true,
  },
];

const DataTableDemo: React.FC = () => {
  // Selection state
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string | undefined>('name');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending' | null>('ascending');

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSizeOption>(5);

  // Define columns - Production Navigator style
  const columns: DataTableColumn<Agreement>[] = useMemo(() => [
    {
      key: 'aiAssisted',
      header: '',
      width: '40px',
      sticky: true,
      cell: (row) => (
        row.isAIAssisted ? (
          <span className={dataTableStyles.aiSparkle}>
            <AIIcon name="ai-spark-filled" size={14} />
          </span>
        ) : null
      ),
    },
    {
      key: 'fileName',
      header: 'File Name',
      sortable: true,
      width: '260px',
      sticky: true,
      className: dataTableStyles.columnBorderRight,
      cell: (row) => (
        <div className={dataTableStyles.cellContent}>
          <Link discrete size="small" href="#" className={dataTableStyles.cellPrimary}>{row.fileName}</Link>
          <span className={dataTableStyles.cellSecondary}>
            {row.fileStatus === 'uploaded' ? '↑' : '✓'}{' '}
            {row.fileStatus === 'uploaded' ? 'Uploaded: ' : 'Completed envelope: '}
            <Link kind="subtle" size="xs" href="#">{row.fileStatusDetail}</Link>
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
              // "+X More" links don't have chip background
              const isMoreLink = party.startsWith('+');
              if (isMoreLink) {
                return (
                  <a key={i} href="#" className={dataTableStyles.partyMoreLink}>{party}</a>
                );
              }
              // Regular party names have chip background
              return (
                <span key={i} className={dataTableStyles.partyChip}>
                  <a href="#" className={dataTableStyles.partyLink}>{party}</a>
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
          <span
            className={dataTableStyles.statusDot}
            data-status={row.status}
          />
          <div className={dataTableStyles.statusText}>
            <span className={dataTableStyles.statusLabel}>
              {row.status === 'expired' ? 'Inactive' : row.status.charAt(0).toUpperCase() + row.status.slice(1)}
            </span>
            {row.statusDate && (
              <span className={dataTableStyles.statusDate}>Expired {row.statusDate}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'agreementType',
      header: 'Agreement Type',
      sortable: true,
      width: '130px',
    },
    {
      key: 'contractValue',
      header: 'Total Contract Value',
      sortable: true,
      width: '150px',
      alignment: 'right',
      cell: (row) => row.contractValue || '—',
    },
    {
      key: 'effectiveDate',
      header: 'Effective Date',
      sortable: true,
      width: '120px',
      cell: (row) => row.effectiveDate || '—',
    },
    {
      key: 'agreementId',
      header: 'Agreement ID',
      width: '130px',
      cell: (row) => (
        <span className={dataTableStyles.agreementId}>{row.agreementId}</span>
      ),
    },
  ], []);

  // Row actions renderer - renders in the column control cell, aligned with header icon
  const renderRowActions = useCallback(() => (
    <IconButton
      icon="more-vertical"
      variant="tertiary"
      size="medium"
      onClick={(e) => {
        e.stopPropagation();
        console.log('Row action menu');
      }}
    />
  ), []);

  // Selection actions
  const selectionActions: DataTableAction[] = useMemo(() => [
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
  ], []);

  // Pagination config
  const pagination: DataTablePaginationConfig = useMemo(() => ({
    page,
    pageSize,
    totalItems: DEMO_DATA.length,
    onPageChange: setPage,
    onPageSizeChange: (size) => {
      setPageSize(size);
      setPage(1);
    },
    showInfo: true,
  }), [page, pageSize]);

  // Handle sort
  const handleSortChange = useCallback((column: string, direction: 'ascending' | 'descending' | null) => {
    setSortColumn(direction ? column : undefined);
    setSortDirection(direction);
  }, []);

  // Get paginated data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return DEMO_DATA.slice(start, start + pageSize);
  }, [page, pageSize]);

  return (
    <div className={styles.tokenPage}>
      {/* Interactive Demo */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Production Match Demo</h3>
        </div>
        <p style={{ marginBottom: '16px', color: 'var(--ink-font-color-secondary)' }}>
          Exact visual match to DocuSign Navigator table with hover/selected states, sorting, pagination, and selection actions.
        </p>
        <div style={{ border: '1px solid var(--ink-border-color-subtle)', borderRadius: '8px', overflow: 'auto', maxHeight: '500px', maxWidth: '800px' }}>
          <DataTable
            columns={columns}
            data={paginatedData}
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
          />
        </div>
      </div>

      {/* Row Height Variants */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Row Height Variants</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="neutral">Compact (48px)</Badge>
          <Badge variant="neutral">Default (56px)</Badge>
          <Badge variant="neutral">Tall (96px)</Badge>
        </div>
      </div>

      {/* Key Features */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Features</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="neutral">Production hover state</Badge>
          <Badge variant="neutral">Production selected state</Badge>
          <Badge variant="neutral">Column sorting</Badge>
          <Badge variant="neutral">Row selection</Badge>
          <Badge variant="neutral">Selection action bar</Badge>
          <Badge variant="neutral">Column control modal</Badge>
          <Badge variant="neutral">Pagination footer</Badge>
          <Badge variant="neutral">Sticky header/footer</Badge>
        </div>
      </div>

      {/* Props Overview */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Props</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="info">columns</Badge>
          <Badge variant="info">data</Badge>
          <Badge variant="info">getRowKey</Badge>
          <Badge variant="info">selectable</Badge>
          <Badge variant="info">selectedRows</Badge>
          <Badge variant="info">onSelectionChange</Badge>
          <Badge variant="info">sortColumn</Badge>
          <Badge variant="info">sortDirection</Badge>
          <Badge variant="info">onSortChange</Badge>
          <Badge variant="info">pagination</Badge>
          <Badge variant="info">showColumnControl</Badge>
          <Badge variant="info">rowHeight</Badge>
        </div>
      </div>
    </div>
  );
};

// FilterBar Demo Component
const FilterBarDemo: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  // View selector dropdown items
  const viewItems = [
    {
      label: 'Documents',
      description: 'Analyze agreement data with AI',
      icon: <Icon name="document" size="small" />,
      onClick: () => console.log('Documents selected'),
    },
    {
      label: 'Envelopes',
      description: 'View signatures and activity',
      icon: <Icon name="envelope" size="small" />,
      onClick: () => console.log('Envelopes selected'),
    },
  ];

  // Filter menu items
  const filterItems = [
    {
      label: 'Sets',
      onClick: () => console.log('Sets'),
    },
    {
      label: 'Status',
      onClick: () => console.log('Status'),
    },
    {
      label: 'Parties',
      icon: <Icon name="people" size="small" />,
      onClick: () => console.log('Parties'),
    },
    {
      label: 'Agreement Type',
      onClick: () => console.log('Agreement Type'),
    },
    { divider: true, label: '' },
    {
      label: 'All Filters',
      onClick: () => console.log('All Filters'),
    },
  ];

  return (
    <div className={styles.tokenPage}>
      {/* Default FilterBar */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Default (All Elements)</h3>
        </div>
        <div className={styles.patternPreviewContainerFull}>
          <FilterBar
            viewSelector={
              <Dropdown items={viewItems}>
                <Button kind="secondary" size="small" endElement={<Icon name="chevron-down" size="small" />}>
                  Documents
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
              <Dropdown items={filterItems}>
                <Button kind="secondary" size="small" startElement={<Icon name="filter" size="small" />}>
                  Filters
                </Button>
              </Dropdown>
            }
          />
        </div>
      </div>

      {/* Search Only */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Search Only</h3>
        </div>
        <div className={styles.patternPreviewContainerFull}>
          <FilterBar
            search={{
              value: searchValue,
              onChange: setSearchValue,
              placeholder: 'Search...',
            }}
          />
        </div>
      </div>

      {/* With Custom Actions */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>With Multiple Actions</h3>
        </div>
        <div className={styles.patternPreviewContainerFull}>
          <FilterBar
            search={{
              value: searchValue,
              onChange: setSearchValue,
              placeholder: 'Search agreements...',
            }}
            quickActions={[
              <IconButton key="bookmark" icon="bookmark" variant="secondary" size="small" />,
              <IconButton key="download" icon="download" variant="secondary" size="small" />,
              <IconButton key="refresh" icon="refresh" variant="secondary" size="small" />,
            ]}
            filters={
              <Button kind="secondary" size="small" startElement={<Icon name="filter" size="small" />}>
                Filters
              </Button>
            }
          />
        </div>
      </div>

      {/* Key Features */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Features</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="neutral">View selector dropdown</Badge>
          <Badge variant="neutral">SearchInput integration</Badge>
          <Badge variant="neutral">AI indicator dot</Badge>
          <Badge variant="neutral">Quick action buttons</Badge>
          <Badge variant="neutral">Filters dropdown</Badge>
          <Badge variant="neutral">Flexible composition</Badge>
        </div>
      </div>

      {/* Props Overview */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Props</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="info">viewSelector</Badge>
          <Badge variant="info">search</Badge>
          <Badge variant="info">showSearchIndicator</Badge>
          <Badge variant="info">quickActions</Badge>
          <Badge variant="info">filters</Badge>
          <Badge variant="info">gap</Badge>
          <Badge variant="info">className</Badge>
        </div>
      </div>
    </div>
  );
};
