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
  Link,
} from '@/design-system';
import styles from './AgreementStudio.module.css';

// Types and Data - extracted to separate files for better organization
import type { Agreement } from './data/agreement-studio-types';
import { ALL_AGREEMENTS } from './data/agreement-studio-data';

// Extracted components
import { FloatingCTA } from './components/FloatingCTA';
import { AIPanel, DEFAULT_PANEL_WIDTH } from './components/AIPanel';

// =============================================================================
// NOTE: Types extracted to ./data/agreement-studio-types.ts
// NOTE: Mock data extracted to ./data/agreement-studio-data.ts
// NOTE: Simple components extracted to ./components/
// =============================================================================

// =============================================================================
// Logo Component
// =============================================================================

const DocuSignLogo = () => (
  <img src="/assets/docusign-logo.svg" alt="DocuSign" className={styles.logo} />
);

// Panel width percentage for "wide" mode
const WIDE_PANEL_WIDTH_PERCENT = 0.4; // 40% of page width

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

  // Track previous window width for resize handling
  const prevWindowWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1920);

  // Handle window resize - keep panel at fullscreen if it was fullscreen
  useEffect(() => {
    const handleWindowResize = () => {
      const currentWindowWidth = window.innerWidth;
      const prevWindowWidth = prevWindowWidthRef.current;

      // If panel was at/near fullscreen, keep it at fullscreen
      if (panelWidth >= prevWindowWidth - 50) {
        setPanelWidth(currentWindowWidth);
      }
      // If panel is wider than the new window width, clamp it
      else if (panelWidth > currentWindowWidth) {
        setPanelWidth(currentWindowWidth);
      }

      prevWindowWidthRef.current = currentWindowWidth;
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [panelWidth]);

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
      items: [{ id: 'folders', label: 'Folders', icon: 'folder' as const, hasMenu: true }],
    },
    {
      id: 'features',
      hasDivider: true,
      items: [
        { id: 'parties', label: 'Parties', icon: 'building-person' as const, badge: 'New' },
        { id: 'requests', label: 'Requests', icon: 'ticket' as const, badge: 'New' },
        {
          id: 'maestro-workflows',
          label: 'Maestro Workflows',
          icon: 'workflow' as const,
          badge: 'New',
        },
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
  const isAcmeSearch =
    submittedSearch.toLowerCase().includes('acme') && filteredAgreements.length > 0;
  const acmeAgreementCount = filteredAgreements.filter((a) =>
    a.fileName.toLowerCase().includes('acme')
  ).length;

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
              {row.fileStatus === 'uploaded' ? '↑' : '✓'} {row.fileStatusDetail}
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
              <span className={dataTableStyles.statusLabel}>{capitalize(row.status)}</span>
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

  const selectionActions: DataTableAction[] = useMemo(
    () => [
      {
        id: 'ai-chat',
        label: 'Chat',
        icon: 'ai-spark-filled',
        onClick: () => handleOpenAIChat(),
      },
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
    [handleOpenAIChat]
  );

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
    ? {
        width: `calc(100% - ${panelWidth}px)`,
        transition: isResizing ? 'none' : 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      }
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
          <div
            className={`${styles.pageContent} ${isSearchTransitioning ? styles.pageContentTransitioning : ''}`}
          >
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
                      <strong>{acmeAgreementCount} Acme agreements</strong> found. Use AI to analyze
                      terms, find conflicts, and summarize key provisions.
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

        {!isAIChatOpen && (
          <FloatingCTA
            onClick={handleOpenAIChat}
            text={isAcmeSearch ? `Chat with ${acmeAgreementCount} agreements` : 'Try Docusign AI'}
            agreementCount={acmeAgreementCount}
            searchTerm="Acme"
          />
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
        agreementCount={
          selectedRows.size > 0 ? selectedRows.size : isAcmeSearch ? acmeAgreementCount : undefined
        }
        agreements={
          selectedRows.size > 0
            ? filteredAgreements.filter((a) => selectedRows.has(a.id))
            : isAcmeSearch
              ? filteredAgreements.filter((a) => a.fileName.toLowerCase().includes('acme'))
              : []
        }
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
