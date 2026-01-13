/**
 * NavigatorAgreements Prototype
 *
 * DocuSign Navigator Agreements list page with:
 * - GlobalNav with DocuSign logo
 * - LocalNav with agreement sections
 * - PageHeader with AI-Assisted badge
 * - Alert banner for renewal notices
 * - Action bar with filters
 * - DataTable with agreement data
 * - Pagination
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  DocuSignShell,
  GlobalNav,
  LocalNav,
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
  Badge,
  Stack,
} from '@/design-system';
import styles from './NavigatorAgreements.module.css';

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
// Logo Component
// =============================================================================

const DocuSignLogo = () => (
  <img src="/assets/docusign-logo.svg" alt="DocuSign" className={styles.logo} />
);

// =============================================================================
// Main Component
// =============================================================================

export function NavigatorAgreements() {
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

  // Footer toggle state - ON by default per production
  const [newNavEnabled, setNewNavEnabled] = useState(true);

  // LocalNav collapse state - starts locked (expanded) as default
  const [isNavLocked, setIsNavLocked] = useState(true);

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

  const localNavSections = [
    {
      id: 'main',
      items: [
        { id: 'all-agreements', label: 'All Agreements', icon: 'envelope' as const },
        { id: 'drafts', label: 'Drafts' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'completed', label: 'Completed', active: true },
        { id: 'deleted', label: 'Deleted' },
      ],
    },
    {
      id: 'folders',
      title: 'Folders',
      hasDivider: true,
      headerLabel: true,
      headerAction: {
        icon: 'overflow-horizontal' as const,
        label: 'Folder options',
        onClick: () => console.log('Folder options'),
      },
      items: [],
    },
    {
      id: 'features',
      hasDivider: true,
      items: [
        { id: 'parties', label: 'Parties', icon: 'people' as const, badge: 'New' },
        { id: 'requests', label: 'Requests', icon: 'document' as const, badge: 'New' },
        { id: 'maestro', label: 'Maestro Workflows', icon: 'refresh' as const, badge: 'New' },
        { id: 'workspaces', label: 'Workspaces', icon: 'people' as const },
        { id: 'powerforms', label: 'PowerForms', icon: 'bolt' as const },
        { id: 'bulk-send', label: 'Bulk Send', icon: 'duplicate' as const },
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
      totalItems: 38, // Matches screenshot
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

  return (
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
        footerToggle: {
          label: 'New navigation',
          checked: newNavEnabled,
          onChange: setNewNavEnabled,
        },
      }}
    >
      <Stack gap="none" className={styles.content}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <PageHeader
            title="Completed"
            showAIBadge
            aiBadgeText="AI-Assisted"
            actions={pageHeaderActions}
          />
        </div>

        {/* Alert Banner */}
        {showBanner && (
          <div className={styles.banner}>
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
              <strong>0 agreements</strong> with renewal notice dates in the next 30 days.
            </Banner>
          </div>
        )}

        {/* Action Bar */}
        <div className={styles.actionBar}>
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
        </div>

        {/* Data Table */}
        <div className={styles.tableWrapper}>
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
          />
        </div>
      </Stack>
    </DocuSignShell>
  );
}

// =============================================================================
// Helpers
// =============================================================================

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default NavigatorAgreements;
